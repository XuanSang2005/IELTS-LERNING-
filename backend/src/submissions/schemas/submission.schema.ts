import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import type { GradingResult, SubmissionStatus, SubmissionType } from '@shared/schemas/submission'

export type SubmissionDocument = HydratedDocument<Submission>

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId

  @Prop({ type: String, required: true, enum: ['task2', 'task1-academic', 'task1-general'] })
  type!: SubmissionType

  @Prop({ required: true })
  prompt!: string

  @Prop({ required: true })
  content!: string

  @Prop({ required: true })
  wordCount!: number

  @Prop({
    type: String,
    required: true,
    enum: ['submitted', 'grading', 'graded', 'failed'],
    index: true,
    default: 'submitted',
  })
  status!: SubmissionStatus

  @Prop({ type: Object, default: null })
  grading!: GradingResult | null

  @Prop({ type: String, default: null })
  error!: string | null

  @Prop()
  sessionId?: string

  @Prop({ required: true, index: true })
  sessionDate!: string

  @Prop({ required: true })
  submittedAt!: string

  @Prop({ type: String, default: null })
  gradedAt!: string | null
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission)
