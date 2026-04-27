import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import type { BandLevel } from '@shared/schemas/practice'
import type {
  DailyDayNumber,
  DailyGrammarFocus,
  DailyListening,
  DailyReading,
  DailyVocabItem,
  DailyWriting,
} from '@shared/schemas/daily-unit'

export type DailyUnitDocument = HydratedDocument<DailyUnitDoc>

/**
 * Single physical collection — `daily_units` — keyed by composite
 * `(day, level)`. Mongoose-side we keep the rich nested objects as plain
 * Mixed types so we don't double-validate (Zod is the source of truth at
 * the API boundary; Mongoose just persists what's accepted).
 */
@Schema({ timestamps: true, collection: 'daily_units' })
export class DailyUnitDoc {
  @Prop({ required: true, unique: true, index: true })
  slug!: string

  @Prop({ type: Number, required: true, enum: [1, 2, 3, 4, 5], index: true })
  day!: DailyDayNumber

  @Prop({
    type: String,
    required: true,
    enum: ['foundation', 'intermediate', 'advanced', 'mastery'],
    index: true,
  })
  level!: BandLevel

  @Prop({ type: Object, required: true })
  reading!: DailyReading

  @Prop({ type: Object, required: true })
  listening!: DailyListening

  @Prop({ type: Array, required: true })
  vocabDeck!: DailyVocabItem[]

  @Prop({ type: Object, required: true })
  grammarFocus!: DailyGrammarFocus

  @Prop({ type: Object, required: true })
  writing!: DailyWriting

  @Prop({ required: true })
  publishedAt!: string
}

export const DailyUnitMongooseSchema = SchemaFactory.createForClass(DailyUnitDoc)
// Composite index — the most-common query is "today's unit for this user level".
DailyUnitMongooseSchema.index({ day: 1, level: 1 }, { unique: true })
