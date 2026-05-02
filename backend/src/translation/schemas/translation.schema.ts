import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TranslationDocument = HydratedDocument<Translation>

interface ExamplePair {
  en: string
  vi: string
}

@Schema({ timestamps: true, collection: 'translations' })
export class Translation {
  /** Lowercased + trimmed + whitespace-collapsed cache key. Unique. */
  @Prop({ required: true, unique: true, index: true })
  normalized!: string

  /** Original text the first user submitted that produced this entry. */
  @Prop({ required: true })
  text!: string

  @Prop({ required: true })
  vi!: string

  @Prop({ type: [{ en: String, vi: String, _id: false }], default: [] })
  examples!: ExamplePair[]
}

export const TranslationSchema = SchemaFactory.createForClass(Translation)
