import { Injectable } from '@nestjs/common'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import {
  SRS_DAILY_NEW_TARGETS,
  SRS_DAILY_REVIEW_CAPS,
  SRS_NEW_INTRO_THRESHOLDS,
  type TodayQueue,
} from '@shared/schemas/srs'
import { LexiconService } from '../lexicon.service'
import { SrsService } from './srs.service'
import { endOfDayInTz, startOfDayInTz } from './tz-helper'

@Injectable()
export class TodayQueueService {
  constructor(
    private readonly srsService: SrsService,
    private readonly lexiconService: LexiconService,
  ) {}

  async getTodayQueue(params: {
    userId: string
    discipline: LexiconDiscipline
    level: 'foundation' | 'intermediate' | 'advanced' | 'mastery'
    userTimezone: string
    now: Date
  }): Promise<TodayQueue> {
    const { userId, discipline, level, userTimezone, now } = params
    const startLocal = startOfDayInTz(now, userTimezone)
    const endLocal = endOfDayInTz(now, userTimezone)

    const allDue = await this.srsService.findDueCards(userId, discipline, endLocal)
    const cap = SRS_DAILY_REVIEW_CAPS[discipline]
    const dueReviews = allDue.slice(0, cap)
    const spilloverCount = Math.max(0, allDue.length - cap)

    const paused = allDue.length > SRS_NEW_INTRO_THRESHOLDS[discipline]

    const { introduced } = await this.srsService.countInteractionsInRange({
      userId,
      discipline,
      startUtc: startLocal,
      endUtc: endLocal,
    })
    const introducedTodayCount = introduced
    const remainingNewQuota = Math.max(0, SRS_DAILY_NEW_TARGETS[discipline] - introducedTodayCount)

    let newItems: TodayQueue['newItems'] = []
    if (!paused && remainingNewQuota > 0) {
      const introducedIds = await this.srsService.findIntroducedCardIds(userId, discipline)
      newItems = await this.lexiconService.findNextNewItems({
        discipline,
        level,
        excludeIds: introducedIds,
        limit: remainingNewQuota,
      })
    }

    // Hydrate due items in the same order as dueReviews so the SrsDeck can
    // render the full card without a second round-trip.
    const dueItemsRaw = await this.lexiconService.findItemsByIds(
      dueReviews.map((c) => c.itemId),
    )
    const dueItemsById = new Map(dueItemsRaw.map((it) => [it.id, it]))
    const dueItems = dueReviews
      .map((c) => dueItemsById.get(c.itemId))
      .filter((it): it is NonNullable<typeof it> => Boolean(it))

    return {
      discipline,
      newItems,
      dueReviews,
      dueItems,
      paused,
      pauseReason: paused ? 'review_backlog' : null,
      spilloverCount,
      introducedTodayCount,
      remainingNewQuota,
    }
  }
}
