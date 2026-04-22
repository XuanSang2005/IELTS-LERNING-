import { z } from 'zod'

export const PaymentStatusSchema = z.enum(['pending', 'paid', 'failed', 'expired'])
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>

export const PaymentProductSchema = z.enum(['pro-monthly', 'pro-cohort'])
export type PaymentProduct = z.infer<typeof PaymentProductSchema>

// Bank details the user scans / transfers to. Surfaced via env on the server.
export const BankInfoSchema = z.object({
  bankName: z.string().min(1),
  bankCode: z.string().min(1), // VietQR bank code, e.g. 'MB', 'VCB', 'TCB'
  bankBin: z.string().min(6).max(6), // VietQR BIN, e.g. '970422' for MB
  accountNo: z.string().min(1),
  accountHolder: z.string().min(1),
})
export type BankInfo = z.infer<typeof BankInfoSchema>

export const PaymentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  product: PaymentProductSchema,
  productLabel: z.string(),
  amountVnd: z.number().int().positive(),
  reference: z.string().min(6).max(40),
  status: PaymentStatusSchema,
  bank: BankInfoSchema,
  /** Pre-rendered VietQR URL. Frontend <img src>s this. */
  qrUrl: z.string().url(),
  createdAt: z.string(),
  expiresAt: z.string(),
  paidAt: z.string().nullable(),
  /** Optional Casso transaction id once paid — useful for reconciliation. */
  cassoTxId: z.string().nullable(),
})
export type Payment = z.infer<typeof PaymentSchema>

export const CreatePaymentDtoSchema = z.object({
  product: PaymentProductSchema,
})
export type CreatePaymentDto = z.infer<typeof CreatePaymentDtoSchema>

export const PaymentStatusResponseSchema = z.object({
  id: z.string(),
  status: PaymentStatusSchema,
  paidAt: z.string().nullable(),
  expiresAt: z.string(),
})
export type PaymentStatusResponse = z.infer<typeof PaymentStatusResponseSchema>

// Public pricing endpoint — read from server env, never hardcoded on frontend.
export const PricingSchema = z.object({
  pro: z.object({
    monthly: z.object({
      vnd: z.number().int().positive(),
      label: z.string(),
    }),
    cohort: z.object({
      vnd: z.number().int().positive(),
      label: z.string(),
    }),
  }),
  currency: z.literal('VND'),
})
export type Pricing = z.infer<typeof PricingSchema>

// ──── Casso webhook payload (simplified) ──────────────────────────
// https://docs.casso.vn — shape stable across v2 webhook.
export const CassoTransactionSchema = z.object({
  id: z.number(),
  tid: z.string(),
  description: z.string(), // contains the reference — this is what we match on
  amount: z.number(), // positive for incoming transfers
  when: z.string(), // ISO timestamp
  bankSubAccId: z.string().optional(),
  subAccId: z.string().optional(),
  corresponsiveAccount: z.string().optional(),
})
export type CassoTransaction = z.infer<typeof CassoTransactionSchema>

export const CassoWebhookPayloadSchema = z.object({
  error: z.number(),
  data: z.array(CassoTransactionSchema),
})
export type CassoWebhookPayload = z.infer<typeof CassoWebhookPayloadSchema>
