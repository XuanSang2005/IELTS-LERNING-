import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type {
  CreateSubmissionDto,
  Submission as SubmissionShape,
  SubmissionStatus,
} from '@shared/schemas/submission'
import { DailyQuotaService } from '../common/daily-quota.service'
import { PracticeService } from '../practice/practice.service'
import { AiGradingService } from './ai-grading.service'
import { Submission, SubmissionDocument } from './schemas/submission.schema'

const COST_PER_INPUT_TOKEN = 3 / 1_000_000
const COST_PER_OUTPUT_TOKEN = 15 / 1_000_000

function toSubmission(doc: SubmissionDocument): SubmissionShape {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    type: doc.type,
    prompt: doc.prompt,
    content: doc.content,
    wordCount: doc.wordCount,
    status: doc.status,
    grading: doc.grading ?? null,
    error: doc.error ?? null,
    sessionId: doc.sessionId,
    sessionDate: doc.sessionDate,
    submittedAt: doc.submittedAt,
    gradedAt: doc.gradedAt ?? null,
  }
}

@Injectable()
export class SubmissionsService {
  private readonly logger = new Logger(SubmissionsService.name)

  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
    private readonly aiGrading: AiGradingService,
    private readonly practiceService: PracticeService,
    private readonly quota: DailyQuotaService,
  ) {}

  async create(userId: string, dto: CreateSubmissionDto): Promise<SubmissionShape> {
    // Shared daily quota across essay submissions + Writing test submissions.
    await this.quota.incrementOrThrow(userId)

    const uid = new Types.ObjectId(userId)
    const created = await this.submissionModel.create({
      userId: uid,
      type: dto.type,
      prompt: dto.prompt,
      content: dto.content,
      wordCount: dto.wordCount,
      status: 'submitted' as SubmissionStatus,
      grading: null,
      error: null,
      sessionId: dto.sessionId,
      sessionDate: dto.sessionDate,
      submittedAt: new Date().toISOString(),
      gradedAt: null,
    })

    // Fire and forget \u2014 grading happens async.
    void this.queueGrading(created._id.toString()).catch((err) => {
      this.logger.error('Grading queue failed', err instanceof Error ? err.stack : err)
    })

    return toSubmission(created)
  }

  async queueGrading(submissionId: string): Promise<void> {
    if (!Types.ObjectId.isValid(submissionId)) return
    const doc = await this.submissionModel.findById(submissionId).exec()
    if (!doc) return
    if (doc.status === 'graded') return

    doc.status = 'grading'
    doc.error = null
    await doc.save()

    try {
      const result = await this.aiGrading.gradeTask2({
        prompt: doc.prompt,
        essay: doc.content,
      })

      doc.status = 'graded'
      doc.grading = result
      doc.gradedAt = result.gradedAt
      doc.error = null
      await doc.save()

      const costEstimate = estimateCost(result.tokensUsed ?? 0)
      this.logger.log(
        `grading_complete userId=${doc.userId.toString()} submissionId=${submissionId} band=${result.overallBand} tokens=${result.tokensUsed ?? 0} costUSD=${costEstimate.toFixed(4)}`,
      )

      try {
        await this.practiceService.recordWritingBand(doc.userId.toString(), result.overallBand)
      } catch (err) {
        this.logger.warn(
          `recordWritingBand failed for user ${doc.userId.toString()}: ${String(err)}`,
        )
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      doc.status = 'failed'
      doc.error = message
      await doc.save()
      this.logger.error(`grading_failed submissionId=${submissionId}: ${message}`)
    }
  }

  async findById(userId: string, submissionId: string): Promise<SubmissionShape | null> {
    if (!Types.ObjectId.isValid(submissionId)) return null
    const doc = await this.submissionModel.findById(submissionId).exec()
    if (!doc) return null
    if (doc.userId.toString() !== userId) return null
    return toSubmission(doc)
  }

  async findLatest(userId: string): Promise<SubmissionShape | null> {
    const doc = await this.submissionModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .sort({ submittedAt: -1 })
      .exec()
    return doc ? toSubmission(doc) : null
  }

  async findToday(userId: string, sessionDate: string): Promise<SubmissionShape | null> {
    const doc = await this.submissionModel
      .findOne({
        userId: new Types.ObjectId(userId),
        sessionDate,
      })
      .sort({ submittedAt: -1 })
      .exec()
    return doc ? toSubmission(doc) : null
  }

  async retryGrading(userId: string, submissionId: string): Promise<SubmissionShape> {
    const existing = await this.findById(userId, submissionId)
    if (!existing) throw new NotFoundException('Submission not found')
    void this.queueGrading(submissionId).catch((err) => {
      this.logger.error('Retry grading failed', err instanceof Error ? err.stack : err)
    })
    return existing
  }
}

function estimateCost(totalTokens: number): number {
  // Ballpark: treat as ~30% output, 70% input for a grading response.
  const input = totalTokens * 0.7
  const output = totalTokens * 0.3
  return input * COST_PER_INPUT_TOKEN + output * COST_PER_OUTPUT_TOKEN
}
