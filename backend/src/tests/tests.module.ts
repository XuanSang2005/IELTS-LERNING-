import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestSchema } from './schemas/test.schema'
import { TestsController } from './tests.controller'
import { TestsService } from './tests.service'
import { LISTENING_TEST, READING_TEST } from './tests.constants'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Test.name, schema: TestSchema },
      { name: LISTENING_TEST, schema: TestSchema, collection: 'listening_tests' },
      { name: READING_TEST, schema: TestSchema, collection: 'reading_tests' },
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
