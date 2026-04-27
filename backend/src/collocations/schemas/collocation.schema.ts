import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import type { CollocationPattern } from '@shared/schemas/collocation'

export type CollocationDocument = HydratedDocument<CollocationDoc>

const COLLOCATION_PATTERNS: readonly CollocationPattern[] = [
  'verb-noun',
  'adjective-noun',
  'noun-noun',
  'verb-preposition',
  'adjective-preposition',
  'adverb-adjective',
] as const

@Schema({ timestamps: true, collection: 'collocations' })
export class CollocationDoc {
  @Prop({ required: true, unique: true, index: true })
  slug!: string

  @Prop({ required: true, index: true })
  phrase!: string

  @Prop({ type: String, required: true, enum: COLLOCATION_PATTERNS, index: true })
  pattern!: CollocationPattern

  @Prop({ required: true })
  definition!: string

  @Prop({ required: true })
  example!: string

  @Prop({ type: String, required: true, enum: ['B1', 'B2', 'C1'], index: true })
  register!: 'B1' | 'B2' | 'C1'

  @Prop({ index: true })
  topic?: string

  @Prop({ type: [String], default: [] })
  alternatives!: string[]

  @Prop()
  note?: string
}

export const CollocationMongooseSchema = SchemaFactory.createForClass(CollocationDoc)
