import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, type HydratedDocument } from 'mongoose'

@Schema({ timestamps: true, collection: 'srs_cards' })
export class SrsCardDoc {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId!: Types.ObjectId

  @Prop({ required: true, index: true })
  itemId!: string

  @Prop({
    required: true,
    enum: ['vocabulary', 'collocations', 'linking'],
    index: true,
  })
  discipline!: 'vocabulary' | 'collocations' | 'linking'

  @Prop({ type: Number, required: true, min: 1, max: 5, default: 1 })
  box!: 1 | 2 | 3 | 4 | 5

  @Prop({
    type: String,
    required: true,
    enum: ['introduced', 'learning', 'mature'],
    default: 'introduced',
    index: true,
  })
  status!: 'introduced' | 'learning' | 'mature'

  @Prop({ type: Date, default: null })
  lastReviewedAt!: Date | null

  @Prop({ type: Date, required: true, index: true })
  nextDueAt!: Date

  @Prop({ type: Number, default: 0 })
  totalReviews!: number

  @Prop({ type: Number, default: 0 })
  totalCorrect!: number

  @Prop({ type: Date, required: true })
  introducedAt!: Date
}

export type SrsCardDocument = HydratedDocument<SrsCardDoc>
export const SrsCardMongooseSchema = SchemaFactory.createForClass(SrsCardDoc)

// Idempotency guarantee — one card per (user, item).
SrsCardMongooseSchema.index({ userId: 1, itemId: 1 }, { unique: true })
// Due-queue lookup.
SrsCardMongooseSchema.index({ userId: 1, discipline: 1, nextDueAt: 1 })
