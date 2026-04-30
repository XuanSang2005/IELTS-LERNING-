import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, type HydratedDocument } from 'mongoose'

@Schema({ timestamps: true, collection: 'lexicon_progress' })
export class LexiconProgressDoc {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId!: Types.ObjectId

  @Prop({
    required: true,
    enum: ['vocabulary', 'collocations', 'linking'],
    index: true,
  })
  discipline!: 'vocabulary' | 'collocations' | 'linking'

  @Prop({
    required: true,
    enum: ['foundation', 'intermediate', 'advanced', 'mastery'],
  })
  level!: 'foundation' | 'intermediate' | 'advanced' | 'mastery'

  @Prop({ required: true, min: 1, max: 12 })
  week!: number

  /**
   * Map<dayNumberAsString, score 0-100>. Persisted from DayPractice
   * submissions — bonus signal only, not a gating mechanism.
   */
  @Prop({ type: Object, default: {} })
  practiceScores!: Record<string, number>

  /** True once WeekQuiz score >= 80. */
  @Prop({ type: Boolean, default: false })
  reviewPassed!: boolean
}

export type LexiconProgressDocument = HydratedDocument<LexiconProgressDoc>
export const LexiconProgressMongooseSchema = SchemaFactory.createForClass(LexiconProgressDoc)

LexiconProgressMongooseSchema.index(
  { userId: 1, discipline: 1, level: 1, week: 1 },
  { unique: true },
)
