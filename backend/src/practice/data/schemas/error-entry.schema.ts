import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type ErrorEntryDocument = HydratedDocument<ErrorEntry>

@Schema({ timestamps: true })
export class ErrorEntry {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId

  @Prop({
    required: true,
    enum: ['grammar', 'lexis', 'cohesion', 'task-fulfillment', 'pronunciation'],
  })
  category!: 'grammar' | 'lexis' | 'cohesion' | 'task-fulfillment' | 'pronunciation'

  @Prop({ required: true })
  original!: string

  @Prop({ required: true })
  correction!: string

  @Prop()
  note?: string

  @Prop({ required: true })
  date!: string

  @Prop()
  source?: string
}

export const ErrorEntrySchema = SchemaFactory.createForClass(ErrorEntry)
