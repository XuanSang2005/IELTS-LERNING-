import { randomBytes } from 'node:crypto'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type {
  BankInfo,
  CassoTransaction,
  Payment as PaymentShape,
  PaymentProduct,
  PaymentStatusResponse,
} from '@shared/schemas/payment'
import { Payment, PaymentDocument } from './schemas/payment.schema'

const DUPLICATE_KEY_ERROR = 11000

function isDuplicateKeyError(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: number }).code === DUPLICATE_KEY_ERROR
  )
}

/**
 * Casso integration (flow notes for future maintainers):
 *
 * 1. Frontend asks `POST /payments` to start a session for a product.
 * 2. We mint a unique `reference` (e.g. `MRD7xk2a`) and insert a `pending`
 *    payment row with a TTL (default 15 min, controlled by PAYMENT_TTL_MINUTES).
 * 3. We return the bank account, the reference, and a pre-rendered **VietQR**
 *    URL (img.vietqr.io) that encodes bank + amount + reference. The user
 *    scans this from any VN banking app — the transfer auto-fills.
 * 4. User transfers from their bank. Real money moves. Our bank records it.
 * 5. Casso monitors our bank account and `POST`s to /webhook/casso within
 *    seconds. The webhook payload includes the transfer `description` (= our
 *    reference) and amount. We validate the bearer token (CASSO_WEBHOOK_SECRET),
 *    look up the payment by reference, and flip status to `paid`.
 * 6. Frontend is polling `GET /payments/:id/status` every few seconds — sees
 *    `paid` and shows success.
 *
 * Expiry: a lazy check on every read. If `Date.now() > expiresAt` and status
 * is still `pending`, we mark `expired` before returning.
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)

  constructor(
    @InjectModel(Payment.name) private readonly model: Model<PaymentDocument>,
    private readonly config: ConfigService,
  ) {}

  async createPayment(userId: string, product: PaymentProduct): Promise<PaymentShape> {
    const amountVnd = this.priceFor(product)
    const productLabel = this.labelFor(product)
    const reference = this.mintReference()
    const ttlMinutes = this.config.get<number>('PAYMENT_TTL_MINUTES') ?? 15
    const expiresAt = new Date(Date.now() + ttlMinutes * 60_000)

    const bank: BankInfo = this.bankInfo()
    const qrUrl = this.buildVietQrUrl(bank, amountVnd, reference)

    const doc = await this.model.create({
      userId: new Types.ObjectId(userId),
      product,
      productLabel,
      amountVnd,
      reference,
      status: 'pending',
      bank,
      qrUrl,
      expiresAt,
      paidAt: null,
      cassoTxId: null,
    })

    return this.toShape(doc)
  }

  async findById(id: string, userId: string): Promise<PaymentShape> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Payment not found')
    const doc = await this.model.findById(id).exec()
    if (!doc) throw new NotFoundException('Payment not found')
    if (doc.userId.toString() !== userId) throw new NotFoundException('Payment not found')
    await this.expireIfNeeded(doc)
    return this.toShape(doc)
  }

  async getStatus(id: string, userId: string): Promise<PaymentStatusResponse> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Payment not found')
    const doc = await this.model.findById(id).exec()
    if (!doc) throw new NotFoundException('Payment not found')
    if (doc.userId.toString() !== userId) throw new NotFoundException('Payment not found')
    await this.expireIfNeeded(doc)
    return {
      id: doc._id.toString(),
      status: doc.status,
      paidAt: doc.paidAt ? doc.paidAt.toISOString() : null,
      expiresAt: doc.expiresAt.toISOString(),
    }
  }

  /**
   * Called from the Casso webhook controller after auth + freshness checks.
   *
   * Idempotency is enforced at two layers:
   *
   *   1. Pre-check: if any payment already has this `cassoTxId`, skip.
   *      Cheap happy-path for webhook redeliveries.
   *   2. Atomic flip: `findOneAndUpdate` matches ONLY rows still in
   *      `pending` and sets them to `paid` in one round trip. Two
   *      concurrent webhooks racing on the same reference cannot both
   *      win — the second sees no match.
   *   3. DB constraint: unique sparse index on `cassoTxId` raises
   *      duplicate-key (11000) on any late duplicate writes we missed.
   *
   * Casso sends an array of transactions; we iterate and match each by
   * reference embedded in the bank-transfer description.
   */
  async applyCassoTransactions(
    txs: CassoTransaction[],
  ): Promise<{ matched: number; duplicates: number; mismatched: number }> {
    let matched = 0
    let duplicates = 0
    let mismatched = 0

    for (const tx of txs) {
      if (tx.amount <= 0) continue // outgoing / refunds — ignore
      const ref = this.extractReference(tx.description)
      if (!ref) continue

      // Idempotency pre-check: was this exact transaction already applied?
      const alreadyProcessed = await this.model.exists({ cassoTxId: tx.tid }).exec()
      if (alreadyProcessed) {
        this.logger.log(`Casso tx ${tx.tid} already applied — skipping duplicate`)
        duplicates += 1
        continue
      }

      // Atomic flip: only a pending row can win, and exactly one webhook can
      // win per reference. If the amount is wrong we don't flip at all.
      let updated: PaymentDocument | null = null
      try {
        updated = await this.model
          .findOneAndUpdate(
            {
              reference: ref,
              status: 'pending',
              amountVnd: { $gte: tx.amount - 1000, $lte: tx.amount + 1000 },
            },
            {
              $set: { status: 'paid', paidAt: new Date(), cassoTxId: tx.tid },
            },
            { new: true },
          )
          .exec()
      } catch (err) {
        // Unique index collision on `cassoTxId`: another concurrent webhook
        // for the same tid won the race. Treat as duplicate, not an error.
        if (isDuplicateKeyError(err)) {
          this.logger.log(`Casso tx ${tx.tid} duplicate-key race — already applied`)
          duplicates += 1
          continue
        }
        throw err
      }

      if (!updated) {
        // No pending row matched — either the reference didn't exist, had
        // already been paid/expired, or the amount was off.
        const existing = await this.model.findOne({ reference: ref }).exec()
        if (!existing) continue
        if (existing.status !== 'pending') {
          duplicates += 1
          continue
        }
        mismatched += 1
        this.logger.warn(
          `Amount mismatch on reference ${ref}: tx=${tx.amount}, expected=${existing.amountVnd}`,
        )
        continue
      }

      matched += 1
      this.logger.log(`Payment ${updated._id.toString()} marked paid (casso tx=${tx.tid})`)
    }

    return { matched, duplicates, mismatched }
  }

  // ─────────────────────── internals ───────────────────────

  private mintReference(): string {
    // 6 url-safe chars; collision is astronomically unlikely at our scale and
    // the unique index on `reference` provides a hard guarantee anyway.
    const suffix = randomBytes(4)
      .toString('base64url')
      .replace(/[-_]/g, '')
      .slice(0, 6)
      .toUpperCase()
    return `MRD${suffix}`
  }

  private extractReference(description: string): string | null {
    const match = description.toUpperCase().match(/MRD[A-Z0-9]{6}/)
    return match ? match[0] : null
  }

  private priceFor(product: PaymentProduct): number {
    const envKey = product === 'pro-monthly' ? 'PRO_MONTHLY_PRICE_VND' : 'PRO_COHORT_PRICE_VND'
    const raw = this.config.get<string | number>(envKey)
    const n = typeof raw === 'string' ? parseInt(raw, 10) : raw
    if (!n || !Number.isFinite(n) || n <= 0) {
      throw new Error(
        `Missing or invalid ${envKey} env var. Set it in backend/.env before accepting payments.`,
      )
    }
    return n
  }

  private labelFor(product: PaymentProduct): string {
    return product === 'pro-monthly' ? 'Meridian Pro · Monthly' : 'Meridian Pro · Cohort IV'
  }

  private bankInfo(): BankInfo {
    const bankName = this.requireEnv('MERIDIAN_BANK_NAME')
    const bankCode = this.requireEnv('MERIDIAN_BANK_CODE')
    const bankBin = this.requireEnv('MERIDIAN_BANK_BIN')
    const accountNo = this.requireEnv('MERIDIAN_BANK_ACCOUNT_NO')
    const accountHolder = this.requireEnv('MERIDIAN_BANK_ACCOUNT_HOLDER')
    return { bankName, bankCode, bankBin, accountNo, accountHolder }
  }

  private requireEnv(key: string): string {
    const v = this.config.get<string>(key)
    if (!v) throw new Error(`Missing ${key} env var`)
    return v
  }

  private buildVietQrUrl(bank: BankInfo, amount: number, reference: string): string {
    // VietQR quick-image endpoint. Returns a PNG encoding the bank transfer
    // payload — any VN banking app scans it and auto-fills account + amount
    // + description. No Casso key required here; Casso reads the transfer
    // from our bank side after it lands.
    const params = new URLSearchParams({
      amount: String(amount),
      addInfo: reference,
      accountName: bank.accountHolder,
    })
    return `https://img.vietqr.io/image/${bank.bankBin}-${bank.accountNo}-compact2.png?${params.toString()}`
  }

  private async expireIfNeeded(doc: PaymentDocument): Promise<void> {
    if (doc.status === 'pending' && doc.expiresAt.getTime() <= Date.now()) {
      doc.status = 'expired'
      await doc.save()
    }
  }

  private toShape(doc: PaymentDocument): PaymentShape {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      product: doc.product,
      productLabel: doc.productLabel,
      amountVnd: doc.amountVnd,
      reference: doc.reference,
      status: doc.status,
      bank: {
        bankName: doc.bank.bankName,
        bankCode: doc.bank.bankCode,
        bankBin: doc.bank.bankBin,
        accountNo: doc.bank.accountNo,
        accountHolder: doc.bank.accountHolder,
      },
      qrUrl: doc.qrUrl,
      createdAt: (doc as unknown as { createdAt: Date }).createdAt.toISOString(),
      expiresAt: doc.expiresAt.toISOString(),
      paidAt: doc.paidAt ? doc.paidAt.toISOString() : null,
      cassoTxId: doc.cassoTxId,
    }
  }
}
