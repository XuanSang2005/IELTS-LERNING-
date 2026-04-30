import {
  SRS_INTERVAL_DAYS,
  type ReviewRating,
  type SrsBox,
  type SrsCard,
  type SrsCardStatus,
} from '@shared/schemas/srs'
import { addDaysUtc } from './tz-helper'

/**
 * Pure Leitner 5-box engine. Plan Decision #2 + #8.
 *
 * Rating semantics:
 *   again → box 1 (full demote, regardless of current box)
 *   good  → box +1 (capped at 5)
 *   easy  → box +2 (capped at 5)
 *
 * Status invariant (plan Decision #14): any review (including 'again')
 * moves the card off `introduced`. A card never returns to `introduced`
 * once `totalReviews >= 1`.
 */
export function processReview(card: SrsCard, rating: ReviewRating, now: Date): SrsCard {
  const nextBox: SrsBox =
    rating === 'again'
      ? 1
      : rating === 'good'
        ? (Math.min(5, card.box + 1) as SrsBox)
        : (Math.min(5, card.box + 2) as SrsBox)

  // Status derived from box + the fact that totalReviews >= 1 after this call.
  const newStatus: SrsCardStatus = nextBox >= 4 ? 'mature' : 'learning'

  return {
    ...card,
    box: nextBox,
    status: newStatus,
    lastReviewedAt: now.toISOString(),
    nextDueAt: addDaysUtc(now, SRS_INTERVAL_DAYS[nextBox]).toISOString(),
    totalReviews: card.totalReviews + 1,
    totalCorrect: card.totalCorrect + (rating !== 'again' ? 1 : 0),
  }
}

/**
 * Builds the initial SRS card for a freshly-introduced item. Box 1, status
 * `introduced`, due in 1 day. Idempotent at the caller level via unique
 * `(userId, itemId)` index.
 */
export function buildInitialCard(params: {
  itemId: string
  discipline: SrsCard['discipline']
  now: Date
}): SrsCard {
  const { itemId, discipline, now } = params
  return {
    itemId,
    discipline,
    box: 1,
    status: 'introduced',
    lastReviewedAt: null,
    nextDueAt: addDaysUtc(now, SRS_INTERVAL_DAYS[1]).toISOString(),
    totalReviews: 0,
    totalCorrect: 0,
    introducedAt: now.toISOString(),
  }
}
