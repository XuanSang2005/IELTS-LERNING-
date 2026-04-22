import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'
import { LessonMongooseSchema } from './schemas/lesson.schema'
import { GRAMMAR_LESSON } from './lessons.constants'

// Grammar-only: vocabulary, collocations, and linking lesson collections were
// removed because no frontend surface reads them. Add more registrations here
// (and seed entries + pages) when those disciplines come online.
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GRAMMAR_LESSON, schema: LessonMongooseSchema, collection: 'grammar_lessons' },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
