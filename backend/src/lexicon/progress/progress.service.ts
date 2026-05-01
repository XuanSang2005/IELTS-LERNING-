import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconWeekProgress } from '@shared/schemas/lexicon-progress'
import { LEXICON_DAILY_TARGETS } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { SRS_DAY_COMPLETION_RATIO } from '@shared/schemas/srs'
import { User, type UserDocument } from '../../users/schemas/user.schema'
import {
  LexiconProgressDoc,
  type LexiconProgressDocument,
} from '../schemas/lexicon-progress.schema'
import { SrsCardDoc, type SrsCardDocument } from '../schemas/srs-card.schema'
import { SrsService } from '../srs/srs.service'
import { addDaysUtc, startOfDayInTz } from '../srs/tz-helper'

const TOTAL_DAYS = 84 // 12 weeks * 7 days

interface DayBucket {
  dateKey: string // YYYY-MM-DD in user-local timezone
  count: number
}

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(LexiconProgressDoc.name)
    private readonly progressModel: Model<LexiconProgressDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(SrsCardDoc.name) private readonly cardModel: Model<SrsCardDocument>,
    private readonly srsService: SrsService,
  ) {}

  async findUserWeekProgress(params: {
    userId: string
    discipline: LexiconDiscipline
    level: BandLevel
  }): Promise<LexiconWeekProgress[]> {
    const userObjectId = new Types.ObjectId(params.userId)

    // 3 queries fan-out in parallel — replaces the 168-query nested loop.
    const [persistedDocs, userDoc, epochDate] = await Promise.all([
      this.progressModel
        .find({ userId: userObjectId, discipline: params.discipline, level: params.level })
        .lean()
        .exec(),
      this.userModel.findById(userObjectId, { userTimezone: 1 }).lean().exec(),
      this.srsService.findEarliestIntroducedAt(params.userId, params.discipline),
    ])

    const persistedByWeek = new Map<number, LexiconProgressDocument>()
    for (const d of persistedDocs) persistedByWeek.set(d.week, d as LexiconProgressDocument)

    const userTimezone = userDoc?.userTimezone ?? 'UTC'

    // Epoch = first time the user introduced *any* item in this discipline.
    // If they've never started, return all 12 weeks empty (no completion can
    // be derived). Replaces the previous user.createdAt logic which would
    // produce empty progress for users who registered long before starting.
    if (!epochDate) {
      return emptyProgress(params.discipline, params.level)
    }
    const weekZeroStart = startOfDayInTz(epochDate, userTimezone)
    const rangeEnd = addDaysUtc(weekZeroStart, TOTAL_DAYS)

    const dailyTarget = LEXICON_DAILY_TARGETS[params.discipline]
    const threshold = Math.max(1, Math.ceil(dailyTarget * SRS_DAY_COMPLETION_RATIO))

    // Single aggregation: bucket all interactions in the 84-day window by
    // user-local date, splitting into introduced and reviewed counts.
    // $facet runs both buckets in one round-trip.
    const aggResult = await this.cardModel
      .aggregate<{ introduced: DayBucket[]; reviewed: DayBucket[] }>([
        {
          $match: {
            userId: userObjectId,
            discipline: params.discipline,
            $or: [
              { introducedAt: { $gte: weekZeroStart, $lt: rangeEnd } },
              { lastReviewedAt: { $gte: weekZeroStart, $lt: rangeEnd } },
            ],
          },
        },
        {
          $facet: {
            introduced: [
              { $match: { introducedAt: { $gte: weekZeroStart, $lt: rangeEnd } } },
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: '$introducedAt',
                      timezone: userTimezone,
                    },
                  },
                  count: { $sum: 1 },
                },
              },
              { $project: { _id: 0, dateKey: '$_id', count: 1 } },
            ],
            reviewed: [
              { $match: { lastReviewedAt: { $gte: weekZeroStart, $lt: rangeEnd } } },
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: '$lastReviewedAt',
                      timezone: userTimezone,
                    },
                  },
                  count: { $sum: 1 },
                },
              },
              { $project: { _id: 0, dateKey: '$_id', count: 1 } },
            ],
          },
        },
      ])
      .exec()

    const facet = aggResult[0] ?? { introduced: [], reviewed: [] }
    const introducedByDay = new Map<string, number>()
    const reviewedByDay = new Map<string, number>()
    for (const b of facet.introduced) {
      introducedByDay.set(b.dateKey, b.count)
    }
    for (const b of facet.reviewed) {
      reviewedByDay.set(b.dateKey, b.count)
    }

    // Map each (week, day) slot to its user-local date key, then read counts.
    const out: LexiconWeekProgress[] = []
    for (let week = 1; week <= 12; week++) {
      const persisted = persistedByWeek.get(week)
      const daysCompleted: (1 | 2 | 3 | 4 | 5 | 6 | 7)[] = []

      for (let day = 1; day <= 7; day++) {
        const dayOffsetFromStart = (week - 1) * 7 + (day - 1)
        const dayStart = addDaysUtc(weekZeroStart, dayOffsetFromStart)
        const dateKey = formatDateKeyInTz(dayStart, userTimezone)
        const introduced = introducedByDay.get(dateKey) ?? 0
        const reviewed = reviewedByDay.get(dateKey) ?? 0
        if (introduced + reviewed >= threshold) {
          daysCompleted.push(day as 1 | 2 | 3 | 4 | 5 | 6 | 7)
        }
      }

      out.push({
        discipline: params.discipline,
        level: params.level,
        week: week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        daysCompleted,
        practiceScores: persisted?.practiceScores ?? {},
        reviewPassed: persisted?.reviewPassed ?? false,
      })
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

/**
 * Empty progress shape for users who haven't yet introduced any item in this
 * discipline. All 12 weeks present, all empty.
 */
function emptyProgress(
  discipline: LexiconDiscipline,
  level: BandLevel,
): LexiconWeekProgress[] {
  const out: LexiconWeekProgress[] = []
  for (let week = 1; week <= 12; week++) {
    out.push({
      discipline,
      level,
      week: week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
      daysCompleted: [],
      practiceScores: {},
      reviewPassed: false,
    })
  }
  return out
}

/**
 * Format a UTC instant as YYYY-MM-DD in the user-local timezone — matches the
 * format produced by Mongo's $dateToString so we can intersect the two sets.
 */
function formatDateKeyInTz(instant: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant)
}
