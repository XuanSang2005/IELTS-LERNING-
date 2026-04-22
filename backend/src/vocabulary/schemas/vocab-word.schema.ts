import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type VocabWordDocument = HydratedDocument<VocabWordDoc>

@Schema({ _id: false })
class SynonymSub {
  @Prop({ required: true }) word!: string
  @Prop({ required: true, enum: ['B1', 'B2', 'C1'] }) register!: 'B1' | 'B2' | 'C1'
  @Prop() nuance?: string
}
const SynonymSchema = SchemaFactory.createForClass(SynonymSub)

@Schema({ timestamps: true, collection: 'vocab_words' })
export class VocabWordDoc {
  @Prop({ required: true, unique: true, index: true })
  slug!: string

  @Prop({ required: true, index: true })
  headword!: string

  @Prop({ required: true, enum: ['noun', 'verb', 'adjective', 'adverb', 'phrase'] })
  partOfSpeech!: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase'

  @Prop({ required: true }) definition!: string
  @Prop({ required: true }) example!: string

  @Prop({ required: true, enum: ['B1', 'B2', 'C1'] })
  register!: 'B1' | 'B2' | 'C1'

  @Prop({ index: true }) topic?: string

  @Prop({ required: true, enum: ['high', 'medium', 'low'], default: 'high', index: true })
  frequency!: 'high' | 'medium' | 'low'

  @Prop({ type: [SynonymSchema], required: true })
  synonyms!: SynonymSub[]
}

export const VocabWordMongooseSchema = SchemaFactory.createForClass(VocabWordDoc)
