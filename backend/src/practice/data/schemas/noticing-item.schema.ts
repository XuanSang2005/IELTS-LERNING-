import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type NoticingItemDocument = HydratedDocument<NoticingItem>

@Schema({ timestamps: true })
export class NoticingItem {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId

  @Prop({ required: true })
  text!: string

  @Prop({ required: true, enum: ['grammar', 'vocabulary', 'collocations', 'linking'] })
  category!: 'grammar' | 'vocabulary' | 'collocations' | 'linking'

  @Prop({ required: true })
  context!: string

  @Prop({ required: true, enum: ['system', 'user'], default: 'user' })
  source!: 'system' | 'user'

  @Prop()
  sourceRef?: string

  @Prop()
  note?: string

  @Prop({ required: true })
  capturedDate!: string

  @Prop({ required: true, index: true })
  nextReviewDate!: string

  @Prop({ required: true, default: 0 })
  interval!: number

  @Prop({ required: true, default: 2.5 })
  ease!: number

  @Prop({ required: true, default: 0 })
  reviewCount!: number

  @Prop({ required: true, default: false })
  retired!: boolean

  @Prop()
  editedAt?: string
}

export const NoticingItemSchema = SchemaFactory.createForClass(NoticingItem)
