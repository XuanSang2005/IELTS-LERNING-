import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'
import { LessonMongooseSchema } from './schemas/lesson.schema'
import {
  COLLOCATIONS_LESSON,
  GRAMMAR_LESSON,
  LINKING_LESSON,
  VOCABULARY_LESSON,
} from './lessons.constants'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GRAMMAR_LESSON, schema: LessonMongooseSchema, collection: 'grammar_lessons' },
      { name: VOCABULARY_LESSON, schema: LessonMongooseSchema, collection: 'vocabulary_lessons' },
      {
        name: COLLOCATIONS_LESSON,
        schema: LessonMongooseSchema,
        collection: 'collocations_lessons',
      },
      { name: LINKING_LESSON, schema: LessonMongooseSchema, collection: 'linking_lessons' },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
