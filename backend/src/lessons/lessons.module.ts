import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'
import { LessonMongooseSchema } from './schemas/lesson.schema'
import {
  COLLOCATION_LESSON,
  GRAMMAR_LESSON,
  LINKING_LESSON,
  VOCABULARY_LESSON,
} from './lessons.constants'

// Four physical collections sharing one LessonDocument schema. Splitting them
// keeps per-discipline reseeds atomic and lets us index/query each surface
// independently as content scales.
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GRAMMAR_LESSON, schema: LessonMongooseSchema, collection: 'grammar_lessons' },
      { name: VOCABULARY_LESSON, schema: LessonMongooseSchema, collection: 'vocabulary_lessons' },
      { name: COLLOCATION_LESSON, schema: LessonMongooseSchema, collection: 'collocation_lessons' },
      { name: LINKING_LESSON, schema: LessonMongooseSchema, collection: 'linking_lessons' },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
