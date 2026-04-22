import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from '../common/common.module'
import { SubmissionsModule } from '../submissions/submissions.module'
import { TestsModule } from '../tests/tests.module'
import { TestSubmission, TestSubmissionSchema } from './schemas/test-submission.schema'
import { TestSubmissionsController } from './test-submissions.controller'
import { TestSubmissionsService } from './test-submissions.service'

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    TestsModule,
    SubmissionsModule, // re-exports AiGradingService
    MongooseModule.forFeature([{ name: TestSubmission.name, schema: TestSubmissionSchema }]),
  ],
  controllers: [TestSubmissionsController],
  providers: [TestSubmissionsService],
})
export class TestSubmissionsModule {}
