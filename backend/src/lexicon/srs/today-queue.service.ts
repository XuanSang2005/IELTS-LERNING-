import { Injectable, Logger } from '@nestjs/common'
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
  private readonly logger = new Logger(TodayQueueService.name)

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

    const allDueRaw = await this.srsService.findDueCards(userId, discipline, endLocal)

    // Drop orphan cards (item deleted from catalogue but card still exists).
    // We must filter BEFORE applying the cap so the user's queue reflects
    // real renderable items, not zombie counts.
    const dueItemsRaw = await this.lexiconService.findItemsByIds(
      allDueRaw.map((c) => c.itemId),
    )
    const dueItemsById = new Map(dueItemsRaw.map((it) => [it.id, it]))
    const orphanIds = allDueRaw
      .filter((c) => !dueItemsById.has(c.itemId))
      .map((c) => c.itemId)
    if (orphanIds.length > 0) {
      this.logger.warn(
        `Orphan SRS cards detected (user=${userId}, discipline=${discipline}): ${orphanIds.join(', ')}`,
      )
    }
    const allDue = allDueRaw.filter((c) => dueItemsById.has(c.itemId))

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
      newItems = await this.lexiconService.findNextNewItems({
        userId,
        discipline,
        level,
        limit: remainingNewQuota,
      })
    }

    // dueItems hydrated from the pre-filtered map (orphans already dropped above).
    const dueItems = dueReviews.map((c) => dueItemsById.get(c.itemId)!)

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
