import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import type { CriterionFeedback, TestSubmissionStatus } from '@shared/schemas/test-ai-submission'

export type TestSubmissionDocument = HydratedDocument<TestSubmission>

/**
 * A candidate's submission to a Writing or Speaking practice test.
 * Persists the raw input (essay texts for Writing) and the AI-graded result
 * once grading completes.
 *
 * Speaking-specific fields are provisioned but intentionally unused in this
 * spec — they ship when Speaking support lands. The discriminator is `skill`.
 */
@Schema({ timestamps: true, collection: 'test_submissions' })
export class TestSubmission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId

  @Prop({ required: true, index: true })
  testId!: string

  @Prop({ type: String, required: true, enum: ['writing', 'speaking'], index: true })
  skill!: 'writing' | 'speaking'

  /** Writing-specific. */
  @Prop({ type: String })
  task1Text?: string

  @Prop({ type: String })
  task2Text?: string

  /** Speaking-specific — reserved for the next spec. */
  @Prop({ type: [Number], default: undefined })
  partDurations?: number[]

  @Prop({
    type: String,
    required: true,
    enum: ['submitted', 'grading', 'graded', 'failed'],
    index: true,
    default: 'submitted',
  })
  status!: TestSubmissionStatus

  // Stored as a loose Object — the shape is enforced by the Zod schema in
  // shared/, which also describes what the frontend reads.
  @Prop({
    type: {
      overall: Number,
      criteria: [Object],
      summary: String,
    },
    default: null,
    _id: false,
  })
  grading!: {
    overall: number
    criteria: CriterionFeedback[]
    summary: string
  } | null

  @Prop({ type: String, default: null })
  error!: string | null

  @Prop({ required: true })
  submittedAt!: string

  @Prop({ type: String, default: null })
  gradedAt!: string | null
}

export const TestSubmissionSchema = SchemaFactory.createForClass(TestSubmission)
