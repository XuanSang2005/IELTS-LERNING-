import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type DailyLogDocument = HydratedDocument<DailyLog>

@Schema({ timestamps: true })
export class DailyLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId

  @Prop({ required: true })
  date!: string

  @Prop({ type: [Number], default: [] })
  stepsCompleted!: number[]

  @Prop({ required: true, default: 0 })
  itemsCaptured!: number

  @Prop({ required: true, default: 0 })
  wordsWritten!: number

  @Prop({ required: true, default: 0 })
  minutesSpent!: number
}

export const DailyLogSchema = SchemaFactory.createForClass(DailyLog)
// compound uniqueness per user+date
DailyLogSchema.index({ userId: 1, date: 1 }, { unique: true })
