import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type PaymentDocument = HydratedDocument<Payment>

@Schema({ _id: false })
class BankSub {
  @Prop({ required: true }) bankName!: string
  @Prop({ required: true }) bankCode!: string
  @Prop({ required: true }) bankBin!: string
  @Prop({ required: true }) accountNo!: string
  @Prop({ required: true }) accountHolder!: string
}
const BankSchema = SchemaFactory.createForClass(BankSub)

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId

  @Prop({ required: true, enum: ['pro-monthly', 'pro-cohort'] })
  product!: 'pro-monthly' | 'pro-cohort'

  @Prop({ required: true })
  productLabel!: string

  @Prop({ required: true })
  amountVnd!: number

  /**
   * The code we expect to see in the bank-transfer description. We match
   * inbound Casso webhook transactions against this value to confirm payment.
   * Unique + indexed for fast reconciliation.
   */
  @Prop({ required: true, unique: true, index: true })
  reference!: string

  @Prop({
    required: true,
    enum: ['pending', 'paid', 'failed', 'expired'],
    default: 'pending',
    index: true,
  })
  status!: 'pending' | 'paid' | 'failed' | 'expired'

  @Prop({ type: BankSchema, required: true })
  bank!: BankSub

  @Prop({ required: true })
  qrUrl!: string

  @Prop({ type: Date, required: true, index: true })
  expiresAt!: Date

  @Prop({ type: Date, default: null })
  paidAt!: Date | null

  @Prop({ type: String, default: null })
  cassoTxId!: string | null
}

export const PaymentMongooseSchema = SchemaFactory.createForClass(Payment)

// Sparse unique index on cassoTxId — enforces webhook idempotency at the DB
// layer. Two concurrent webhooks carrying the same Casso transaction id can
// never both succeed; the second insert-or-update raises a duplicate-key
// error and the controller returns without double-upgrading the user.
PaymentMongooseSchema.index(
  { cassoTxId: 1 },
  { unique: true, partialFilterExpression: { cassoTxId: { $type: 'string' } } },
)
