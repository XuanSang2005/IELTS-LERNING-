import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconWeekProgress } from '@shared/schemas/lexicon-progress'
import { LEXICON_DAILY_TARGETS } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { User, type UserDocument } from '../../users/schemas/user.schema'
import {
  LexiconProgressDoc,
  type LexiconProgressDocument,
} from '../schemas/lexicon-progress.schema'
import { SrsService } from '../srs/srs.service'
import { addDaysUtc, startOfDayInTz } from '../srs/tz-helper'

const DAY_COMPLETION_RATIO = 0.8

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(LexiconProgressDoc.name)
    private readonly progressModel: Model<LexiconProgressDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly srsService: SrsService,
  ) {}

  async findUserWeekProgress(params: {
    userId: string
    discipline: LexiconDiscipline
    level: BandLevel
  }): Promise<LexiconWeekProgress[]> {
    const userObjectId = new Types.ObjectId(params.userId)
    const persistedDocs = await this.progressModel
      .find({ userId: userObjectId, discipline: params.discipline, level: params.level })
      .lean()
      .exec()
    const persistedByWeek = new Map<number, LexiconProgressDocument>()
    for (const d of persistedDocs) persistedByWeek.set(d.week, d as LexiconProgressDocument)

    // daysCompleted derived from srs_cards interactions in user-local timezone.
    const userDoc = await this.userModel
      .findById(userObjectId, { userTimezone: 1, createdAt: 1 })
      .lean()
      .exec()
    const userTimezone = userDoc?.userTimezone ?? 'UTC'

    const dailyTarget = LEXICON_DAILY_TARGETS[params.discipline]
    const threshold = Math.max(1, Math.ceil(dailyTarget * DAY_COMPLETION_RATIO))

    // For each week 1..12, derive daysCompleted by counting interactions per
    // user-local day. Reference epoch: user's account creation, falling back
    // to the start of the calendar year if unavailable.
    const accountStart = userDoc && 'createdAt' in userDoc ? new Date(userDoc.createdAt as Date) : new Date()
    const weekZeroStart = startOfDayInTz(accountStart, userTimezone)

    const out: LexiconWeekProgress[] = []
    for (let week = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; week <= 12; week = (week + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12) {
      const persisted = persistedByWeek.get(week)
      const daysCompleted: (1 | 2 | 3 | 4 | 5 | 6 | 7)[] = []

      for (let day = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7; day <= 7; day = (day + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7) {
        const dayOffsetFromStart = (week - 1) * 7 + (day - 1)
        const startUtc = addDaysUtc(weekZeroStart, dayOffsetFromStart)
        const endUtc = new Date(startUtc.getTime() + 24 * 60 * 60_000 - 1)
        const { introduced, reviewed } = await this.srsService.countInteractionsInRange({
          userId: params.userId,
          discipline: params.discipline,
          startUtc,
          endUtc,
        })
        if (introduced + reviewed >= threshold) daysCompleted.push(day)
      }

      out.push({
        discipline: params.discipline,
        level: params.level,
        week,
        daysCompleted,
        practiceScores: persisted?.practiceScores ?? {},
        reviewPassed: persisted?.reviewPassed ?? false,
      })
      if (week === 12) break
    }
    return out
  }

  async submitPracticeScore(params: {
    userId: string
    discipline: LexiconDiscipline
    level: BandLevel
    week: number
    day: number
    score: number
  }): Promise<void> {
    const userObjectId = new Types.ObjectId(params.userId)
    const dayKey = String(params.day)
    await this.progressModel
      .updateOne(
        {
          userId: userObjectId,
          discipline: params.discipline,
          level: params.level,
          week: params.week,
        },
        {
          $set: { [`practiceScores.${dayKey}`]: params.score },
          $setOnInsert: { reviewPassed: false },
        },
        { upsert: true },
      )
      .exec()
  }

  async submitWeekQuiz(params: {
    userId: string
    discipline: LexiconDiscipline
    level: BandLevel
    week: number
    score: number
  }): Promise<{ reviewPassed: boolean }> {
    const userObjectId = new Types.ObjectId(params.userId)
    const reviewPassed = params.score >= 80
    await this.progressModel
      .updateOne(
        {
          userId: userObjectId,
          discipline: params.discipline,
          level: params.level,
          week: params.week,
        },
        {
          $set: { reviewPassed },
        },
        { upsert: true },
      )
      .exec()
    return { reviewPassed }
  }
}
