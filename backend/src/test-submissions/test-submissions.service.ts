import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type {
  CreateWritingTestSubmissionDto,
  PersistedWritingTestSubmission,
  WritingTestSubmission,
} from '@shared/schemas/test-ai-submission'
import { DailyQuotaService } from '../common/daily-quota.service'
import { AiGradingService } from '../submissions/ai-grading.service'
import { TestsService } from '../tests/tests.service'
import { TestSubmission, TestSubmissionDocument } from './schemas/test-submission.schema'

function toPersisted(doc: TestSubmissionDocument): PersistedWritingTestSubmission {
  const grading = doc.grading
    ? ({
        id: doc._id.toString(),
        testId: doc.testId,
        skill: 'writing' as const,
        submittedAt: doc.submittedAt,
        task1Text: doc.task1Text ?? '',
        task2Text: doc.task2Text ?? '',
        overall: doc.grading.overall,
        criteria: doc.grading.criteria as WritingTestSubmission['criteria'],
        summary: doc.grading.summary,
      } satisfies WritingTestSubmission)
    : null

  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    testId: doc.testId,
    skill: 'writing',
    task1Text: doc.task1Text ?? '',
    task2Text: doc.task2Text ?? '',
    status: doc.status,
    grading,
    error: doc.error,
    submittedAt: doc.submittedAt,
    gradedAt: doc.gradedAt,
  }
}

@Injectable()
export class TestSubmissionsService {
  private readonly logger = new Logger(TestSubmissionsService.name)

  constructor(
    @InjectModel(TestSubmission.name)
    private readonly model: Model<TestSubmissionDocument>,
    private readonly aiGrading: AiGradingService,
    private readonly quota: DailyQuotaService,
    private readonly tests: TestsService,
  ) {}

  async createWriting(
    userId: string,
    dto: CreateWritingTestSubmissionDto,
  ): Promise<PersistedWritingTestSubmission> {
    const test = await this.tests.findById(dto.testId)
    if (!test) throw new NotFoundException('Test not found')
    if (test.skill !== 'writing') {
      throw new BadRequestException('That test is not a Writing test')
    }

    // Rate-limit BEFORE creating the row so a rejected submission doesn't
    // leave a ghost record.
    await this.quota.incrementOrThrow(userId)

    const uid = new Types.ObjectId(userId)
    const created = await this.model.create({
      userId: uid,
      testId: dto.testId,
      skill: 'writing',
      task1Text: dto.task1Text,
      task2Text: dto.task2Text,
      status: 'submitted',
      grading: null,
      error: null,
      submittedAt: new Date().toISOString(),
      gradedAt: null,
    })

    void this.queueWritingGrading(created._id.toString()).catch((err) => {
      this.logger.error(
        'Writing grading queue failed',
        err instanceof Error ? err.stack : String(err),
      )
    })

    return toPersisted(created)
  }

  async queueWritingGrading(submissionId: string): Promise<void> {
    if (!Types.ObjectId.isValid(submissionId)) return
    const doc = await this.model.findById(submissionId).exec()
    if (!doc) return
    if (doc.status === 'graded') return
    if (doc.skill !== 'writing') return

    doc.status = 'grading'
    doc.error = null
    await doc.save()

    try {
      const test = await this.tests.findById(doc.testId)
      if (!test || test.skill !== 'writing' || !test.tasks) {
        throw new Error('Test no longer available')
      }
      const task1 = test.tasks.find((t) => t.task === 1)
      const task2 = test.tasks.find((t) => t.task === 2)
      if (!task1 || !task2) throw new Error('Test is missing a task definition')

      const result = await this.aiGrading.gradeWritingTest({
        testId: doc.testId,
        task1,
        task2,
        task1Text: doc.task1Text ?? '',
        task2Text: doc.task2Text ?? '',
      })

      doc.status = 'graded'
      doc.grading = {
        overall: result.overall,
        criteria: result.criteria,
        summary: result.summary,
      }
      doc.gradedAt = new Date().toISOString()
      doc.error = null
      await doc.save()

      this.logger.log(
        `writing_grading_complete userId=${doc.userId.toString()} submissionId=${submissionId} band=${result.overall}`,
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      doc.status = 'failed'
      doc.error = message
      await doc.save()
      this.logger.error(`writing_grading_failed submissionId=${submissionId}: ${message}`)
    }
  }

  async findById(
    userId: string,
    submissionId: string,
  ): Promise<PersistedWritingTestSubmission | null> {
    if (!Types.ObjectId.isValid(submissionId)) return null
    const doc = await this.model.findById(submissionId).exec()
    if (!doc) return null
    if (doc.userId.toString() !== userId) return null
    return toPersisted(doc)
  }

  async findLatestForTest(
    userId: string,
    testId: string,
  ): Promise<PersistedWritingTestSubmission | null> {
    const doc = await this.model
      .findOne({
        userId: new Types.ObjectId(userId),
        testId,
      })
      .sort({ submittedAt: -1 })
      .exec()
    return doc ? toPersisted(doc) : null
  }

  async retryGrading(
    userId: string,
    submissionId: string,
  ): Promise<PersistedWritingTestSubmission> {
    const existing = await this.findById(userId, submissionId)
    if (!existing) throw new NotFoundException('Submission not found')
    void this.queueWritingGrading(submissionId).catch((err) => {
      this.logger.error(
        'Retry writing grading failed',
        err instanceof Error ? err.stack : String(err),
      )
    })
    return existing
  }
}
