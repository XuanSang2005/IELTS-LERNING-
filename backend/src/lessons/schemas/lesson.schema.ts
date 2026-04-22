import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type LessonDocument = HydratedDocument<LessonDoc>

@Schema({ _id: false })
class ExampleSub {
  @Prop({ required: true }) text!: string
  @Prop({ required: true, enum: ['B1', 'B2', 'C1'] }) register!: 'B1' | 'B2' | 'C1'
  @Prop() gloss?: string
}
const ExampleSchema = SchemaFactory.createForClass(ExampleSub)

@Schema({ _id: false })
class MistakeSub {
  @Prop({ required: true }) wrong!: string
  @Prop({ required: true }) right!: string
  @Prop({ required: true }) why!: string
}
const MistakeSchema = SchemaFactory.createForClass(MistakeSub)

@Schema({ _id: false })
class ExerciseSub {
  @Prop({ required: true }) id!: string
  @Prop({ required: true, enum: ['gap-fill', 'rewrite', 'choice'] })
  kind!: 'gap-fill' | 'rewrite' | 'choice'
  @Prop({ required: true }) prompt!: string
  @Prop({ type: [String] }) choices?: string[]
  @Prop({ required: true }) answer!: string
  @Prop() explanation?: string
}
const ExerciseSchema = SchemaFactory.createForClass(ExerciseSub)

@Schema({ _id: false })
class NoticingSub {
  @Prop({ required: true }) text!: string
  @Prop({ required: true }) context!: string
  @Prop() note?: string
}
const NoticingSchema = SchemaFactory.createForClass(NoticingSub)

@Schema({ _id: false })
class ExtensionSub {
  @Prop({ required: true }) prompt!: string
  @Prop({ required: true }) minWords!: number
}
const ExtensionSchema = SchemaFactory.createForClass(ExtensionSub)

// No `collection:` default — this schema is registered under three physical
// collections (grammar_lessons / collocations_lessons / linking_lessons) via
// MongooseModule.forFeature in LessonsModule. Vocabulary has no lesson model.
@Schema({ timestamps: true })
export class LessonDoc {
  @Prop({ required: true, unique: true, index: true })
  slug!: string

  @Prop({ required: true, index: true, min: 1, max: 120 })
  day!: number

  @Prop({ required: true, index: true, min: 1, max: 12 })
  week!: number

  @Prop({ required: true, enum: [1, 2, 3, 4] })
  phase!: 1 | 2 | 3 | 4

  @Prop({ required: true, enum: ['grammar', 'vocabulary', 'collocations', 'linking'], index: true })
  discipline!: 'grammar' | 'vocabulary' | 'collocations' | 'linking'

  @Prop({
    required: true,
    enum: ['foundation', 'intermediate', 'advanced', 'mastery'],
    index: true,
  })
  level!: 'foundation' | 'intermediate' | 'advanced' | 'mastery'

  @Prop({ required: true }) title!: string
  @Prop({ required: true }) subtitle!: string
  @Prop({ required: true }) hook!: string
  @Prop({ required: true }) theory!: string

  @Prop({ type: [ExampleSchema], required: true }) examples!: ExampleSub[]
  @Prop({ type: [MistakeSchema], required: true }) mistakes!: MistakeSub[]
  @Prop({ type: [ExerciseSchema], required: true }) practice!: ExerciseSub[]
  @Prop({ type: ExtensionSchema, required: true }) extension!: ExtensionSub
  @Prop({ type: [NoticingSchema], required: true }) noticing!: NoticingSub[]

  @Prop({ required: true, min: 5, max: 180 })
  estimatedMinutes!: number

  @Prop({ required: true })
  publishedAt!: string
}

export const LessonMongooseSchema = SchemaFactory.createForClass(LessonDoc)
