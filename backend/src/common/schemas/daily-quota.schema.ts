import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type DailyQuotaDocument = HydratedDocument<DailyQuota>

/**
 * Per-user daily counter for AI-grading calls. One row per (user, date).
 * Atomic increments via `findOneAndUpdate` — no read-modify-write race.
 */
@Schema({ collection: 'daily_quotas' })
export class DailyQuota {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId!: Types.ObjectId

  /** ISO date (YYYY-MM-DD) for the user's "day". Indexed with userId. */
  @Prop({ required: true, index: true })
  date!: string

  @Prop({ required: true, default: 0 })
  count!: number
}

export const DailyQuotaSchema = SchemaFactory.createForClass(DailyQuota)
DailyQuotaSchema.index({ userId: 1, date: 1 }, { unique: true })
