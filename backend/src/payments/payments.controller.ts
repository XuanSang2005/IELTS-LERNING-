import { timingSafeEqual } from 'node:crypto'
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CassoWebhookPayloadSchema, CreatePaymentDtoSchema } from '@shared/schemas/payment'
import type { CassoWebhookPayload, CreatePaymentDto } from '@shared/schemas/payment'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { JwtAuthGuard } from '../common/jwt-auth.guard'
import { CurrentUser } from '../common/current-user.decorator'
import type { AuthenticatedUser } from '../common/current-user.decorator'
import { PaymentsService } from './payments.service'

// Reject any transaction whose reported `when` is older than this. Casso
// delivers webhooks within seconds of a bank transfer; 5 minutes is generous.
// Configurable via `CASSO_WEBHOOK_MAX_AGE_SECONDS` in case of clock drift.
const DEFAULT_MAX_AGE_SECONDS = 300

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly service: PaymentsService,
    private readonly config: ConfigService,
  ) {}

  // ─────────────────────── authenticated endpoints ───────────────────────

  /** Create a new payment session for the current user. */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreatePaymentDtoSchema)) dto: CreatePaymentDto,
  ) {
    return this.service.createPayment(user.userId, dto.product)
  }

  /** Full payment detail — used by the payment page on first load. */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.service.findById(id, user.userId)
  }

  /** Lightweight status-only endpoint — polled every few seconds. */
  @Get(':id/status')
  @UseGuards(JwtAuthGuard)
  async status(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.service.getStatus(id, user.userId)
  }
}

// ─────────────────────── Casso webhook (public) ───────────────────────
//
// Casso POSTs here as soon as a bank transfer is detected on our account.
// NO JwtAuthGuard — this is a service-to-service call. We enforce three
// security layers below:
//
//   1. Authentication — `Authorization: Apikey <CASSO_WEBHOOK_SECRET>`
//      compared with `crypto.timingSafeEqual` (no short-circuit leak).
//   2. Replay protection — each transaction's `when` must be within
//      `CASSO_WEBHOOK_MAX_AGE_SECONDS` (default 300s). Older transactions
//      are rejected to prevent replaying captured webhook bodies.
//   3. Idempotency — enforced end-to-end in `applyCassoTransactions`:
//      unique sparse index on `cassoTxId` + atomic findOneAndUpdate on the
//      pending row. Duplicate webhook deliveries cannot double-upgrade.
//
// If you rotate `CASSO_WEBHOOK_SECRET` in the Casso dashboard, also update
// the env var and redeploy.
@Controller('webhook/casso')
export class CassoWebhookController {
  private readonly logger = new Logger(CassoWebhookController.name)

  constructor(
    private readonly service: PaymentsService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  async receive(
    @Headers('authorization') authHeader: string | undefined,
    @Body(new ZodValidationPipe(CassoWebhookPayloadSchema)) body: CassoWebhookPayload,
  ) {
    // ── Layer 1: authenticate the caller ──────────────────────────────
    const expected = this.config.get<string>('CASSO_WEBHOOK_SECRET')
    if (!expected) throw new ForbiddenException('Webhook secret not configured')
    const provided = (authHeader ?? '').replace(/^Apikey\s+/i, '').trim()
    if (!this.keysMatch(provided, expected)) {
      this.logger.warn('Casso webhook rejected: bad/missing Apikey header')
      throw new ForbiddenException('Invalid webhook token')
    }

    if (body.error !== 0) return { ok: true, matched: 0, skipped: 0 }

    // ── Layer 2: drop stale / replayed transactions ───────────────────
    const maxAgeMs = this.maxAgeSeconds() * 1000
    const now = Date.now()
    const fresh: typeof body.data = []
    let skipped = 0
    for (const tx of body.data) {
      const whenMs = Date.parse(tx.when)
      if (!Number.isFinite(whenMs)) {
        this.logger.warn(`Casso tx ${tx.tid} dropped: unparseable 'when'`)
        skipped += 1
        continue
      }
      if (Math.abs(now - whenMs) > maxAgeMs) {
        this.logger.warn(
          `Casso tx ${tx.tid} dropped: age ${Math.round((now - whenMs) / 1000)}s exceeds max`,
        )
        skipped += 1
        continue
      }
      fresh.push(tx)
    }

    // ── Layer 3: idempotent apply (handled inside the service) ────────
    const result = await this.service.applyCassoTransactions(fresh)
    return { ok: true, ...result, skipped }
  }

  /**
   * Constant-time compare so we don't leak the secret length or prefix via
   * response-time side channels. Buffers must be equal length for
   * `timingSafeEqual`; unequal lengths are a mismatch by definition.
   */
  private keysMatch(provided: string, expected: string): boolean {
    if (!provided) return false
    const a = Buffer.from(provided, 'utf8')
    const b = Buffer.from(expected, 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  }

  private maxAgeSeconds(): number {
    const raw = this.config.get<string | number>('CASSO_WEBHOOK_MAX_AGE_SECONDS')
    const n = typeof raw === 'string' ? parseInt(raw, 10) : raw
    if (!n || !Number.isFinite(n) || n <= 0) return DEFAULT_MAX_AGE_SECONDS
    return n
  }
}
