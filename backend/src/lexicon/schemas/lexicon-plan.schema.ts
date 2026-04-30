import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'

@Schema({ _id: false })
class LexiconWeekStubSub {
  @Prop({ required: true, min: 1, max: 12 }) week!: number
  @Prop({ required: true, min: 1, max: 4 }) phase!: number
  @Prop({ required: true }) themeName!: string
  @Prop({ required: true }) tagline!: string
  @Prop({ required: true }) goalOneLiner!: string
  @Prop({ required: true }) itemsPerDay!: number
  @Prop({ required: true }) totalItems!: number
}
const LexiconWeekStubSubSchema = SchemaFactory.createForClass(LexiconWeekStubSub)

@Schema({ timestamps: true, collection: 'lexicon_plans' })
export class LexiconPlanDoc {
  @Prop({
    required: true,
    enum: ['vocabulary', 'collocations', 'linking'],
    index: true,
  })
  discipline!: 'vocabulary' | 'collocations' | 'linking'

  @Prop({
    required: true,
    enum: ['foundation', 'intermediate', 'advanced', 'mastery'],
    index: true,
  })
  level!: 'foundation' | 'intermediate' | 'advanced' | 'mastery'

  @Prop({ type: [LexiconWeekStubSubSchema], required: true })
  weeks!: LexiconWeekStubSub[]
}

export type LexiconPlanDocument = HydratedDocument<LexiconPlanDoc>
export const LexiconPlanMongooseSchema = SchemaFactory.createForClass(LexiconPlanDoc)

LexiconPlanMongooseSchema.index({ discipline: 1, level: 1 }, { unique: true })
