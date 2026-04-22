import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TestSchema } from './schemas/test.schema'
import { TestsController } from './tests.controller'
import { TestsService } from './tests.service'
import { LISTENING_TEST, READING_TEST, SPEAKING_TEST, WRITING_TEST } from './tests.constants'

// Physically-separate collection per skill. No generic `tests` collection any more.
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LISTENING_TEST, schema: TestSchema, collection: 'listening_tests' },
      { name: READING_TEST, schema: TestSchema, collection: 'reading_tests' },
      { name: WRITING_TEST, schema: TestSchema, collection: 'writing_tests' },
      { name: SPEAKING_TEST, schema: TestSchema, collection: 'speaking_tests' },
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
