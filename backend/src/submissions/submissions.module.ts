import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from '../common/common.module'
import { PracticeModule } from '../practice/practice.module'
import { AiGradingService } from './ai-grading.service'
import { SubmissionsController } from './submissions.controller'
import { SubmissionsService } from './submissions.service'
import { Submission, SubmissionSchema } from './schemas/submission.schema'

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    PracticeModule,
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, AiGradingService],
  exports: [AiGradingService],
})
export class SubmissionsModule {}
