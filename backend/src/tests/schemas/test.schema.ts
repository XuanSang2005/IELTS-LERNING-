import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import type {
  ListeningSection,
  MockTestFeedback,
  ReadingPassage,
  Skill,
  SpeakingPrompt,
  WritingPrompt,
  Difficulty,
} from '@shared/schemas/test'

export type TestDocument = HydratedDocument<Test>

@Schema({ timestamps: true, collection: 'tests' })
export class Test {
  /**
   * Stable external id (e.g. "writing-001"). Used as the lookup key everywhere;
   * we don't expose Mongo's _id to the frontend. Indexed unique.
   */
  @Prop({ required: true, unique: true, index: true })
  externalId!: string

  @Prop({
    type: String,
    required: true,
    enum: ['listening', 'reading', 'writing', 'speaking'],
    index: true,
  })
  skill!: Skill

  @Prop({ required: true })
  title!: string

  @Prop({ required: true })
  description!: string

  @Prop({
    type: String,
    required: true,
    enum: ['foundation', 'intermediate', 'advanced'],
  })
  difficulty!: Difficulty

  @Prop({ required: true })
  fullDurationMinutes!: number

  @Prop({ required: true, default: 20 })
  shortDurationMinutes!: number

  @Prop({ required: true })
  totalQuestions!: number

  @Prop({ type: Boolean, default: false, index: true })
  isPro!: boolean

  @Prop({ required: true })
  publishedAt!: string

  @Prop({ type: [String], default: [] })
  tags!: string[]

  @Prop({ type: Number })
  participantsCount?: number

  @Prop({ type: Number })
  playsCount?: number

  // Skill-specific content — exactly one set is populated per document.
  @Prop({ type: [Object], default: undefined })
  sections?: ListeningSection[]

  @Prop({ type: [Object], default: undefined })
  passages?: ReadingPassage[]

  @Prop({ type: [Object], default: undefined })
  tasks?: WritingPrompt[]

  @Prop({ type: [Object], default: undefined })
  parts?: SpeakingPrompt[]

  @Prop({ type: Object, default: undefined })
  mockFeedback?: MockTestFeedback
}

export const TestSchema = SchemaFactory.createForClass(Test)
