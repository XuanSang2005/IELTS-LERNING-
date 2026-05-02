import { Injectable, NotFoundException } from '@nestjs/common'
import type {
  DiagnosticResult,
  DiagnosticSubmissionDto,
  DiagnosticTest,
} from '@shared/schemas/diagnostic'
import type { BandRange } from '@shared/schemas/practice'
import { AiGradingService } from '../submissions/ai-grading.service'
import { UsersService } from '../users/users.service'
import { diagnosticV1 } from './data/diagnostic-v1'
import { gradeSection } from './utils/grade'
import {
  bandToLevel,
  clampBand,
  estimateSpeakingFromWriting,
  ieltsRound,
  rangeFromOverall,
} from './utils/overall-band'

@Injectable()
export class DiagnosticService {
  constructor(
    private readonly users: UsersService,
    private readonly aiGrading: AiGradingService,
  ) {}

  /** Returns the static v1 test (no per-user variation in v1). */
  getTest(): DiagnosticTest {
    return diagnosticV1
  }

  async submit(userId: string, dto: DiagnosticSubmissionDto): Promise<DiagnosticResult> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')

    if (dto.testId !== diagnosticV1.id) {
      throw new NotFoundException(`Unknown diagnostic test: ${dto.testId}`)
    }

    // Auto-grade L + R (server-authoritative).
    const listening = gradeSection(diagnosticV1.listening.questions, dto.listeningAnswers)
    const reading = gradeSection(diagnosticV1.reading.questions, dto.readingAnswers)

    // Grade writing. Skip the (slow) AI grader entirely when no real client
    // is configured — diagnostic v1 is the first impression of the product
    // and must stay snappy. The grader's mock-mode word-count heuristic
    // adds nothing the user can act on.
    let writingBand: number
    let writingSummary: string
    if (this.aiGrading.hasRealClient) {
      const writingResult = await this.aiGrading.gradeTask2({
        prompt: diagnosticV1.writing.prompt,
        essay: dto.writingText,
      })
      writingBand = clampBand(writingResult.overallBand)
      writingSummary = writingResult.overallNote
    } else {
      writingBand = 6.5
      writingSummary =
        'Mock grading — your essay was received. Configure ANTHROPIC_API_KEY on the backend to enable Claude examiner feedback.'
    }

    // Estimate speaking + compute overall.
    const speakingEstimated = estimateSpeakingFromWriting(writingBand)
    const rawOverall = (listening.band + reading.band + writingBand + speakingEstimated) / 4
    const overallBand = ieltsRound(rawOverall)
    const recommendedLevel = bandToLevel(overallBand)

    const takenAt = new Date().toISOString()
    const result: DiagnosticResult = {
      takenAt,
      durationSeconds: dto.durationSeconds,
      listening,
      reading,
      writing: { band: writingBand, summary: writingSummary },
      speakingEstimated,
      overallBand,
      recommendedLevel,
    }

    // Update profile: write currentBand + diagnosticResult + diagnosticCompletedAt
    const newBand: BandRange = {
      level: recommendedLevel,
      estimatedBand: overallBand,
      range: rangeFromOverall(overallBand),
      confidence: 'high',
      setBy: 'diagnostic',
      updatedAt: takenAt,
    }
    user.profile = {
      ...user.profile,
      currentBand: newBand,
      diagnosticResult: result,
      diagnosticCompletedAt: takenAt,
      // If user previously skipped, completing supersedes that.
      diagnosticSkippedAt: null,
    }
    await user.save()

    return result
  }

  async markSkipped(userId: string): Promise<{ skippedAt: string }> {
    const user = await this.users.findById(userId)
    if (!user) throw new NotFoundException('User not found')
    const skippedAt = new Date().toISOString()
    user.profile = {
      ...user.profile,
      diagnosticSkippedAt: skippedAt,
    }
    await user.save()
    return { skippedAt }
  }
}
