import { z } from 'zod'
import { LexiconDisciplineSchema } from './lexicon'
import { LexiconItemSchema } from './lexicon-items'

/**
 * Leitner box index. Plan Decision #2 fixes 5 boxes with intervals
 * 1d / 3d / 7d / 14d / 30d.
 */
export const SrsBoxSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])
export type SrsBox = z.infer<typeof SrsBoxSchema>

export const SRS_INTERVAL_DAYS: Record<SrsBox, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
} as const

/**
 * Item lifecycle status. Plan Decision #14 locks the derivation rule:
 *   unseen     = no SrsCard row
 *   introduced = totalReviews === 0
 *   learning   = totalReviews >= 1 AND box <= 3
 *   mature     = box >= 4
 *
 * Any review (including 'again') moves a card off `introduced`. A card never
 * returns to `introduced` once it has been rated at least once.
 */
export const SrsCardStatusSchema = z.enum(['unseen', 'introduced', 'learning', 'mature'])
export type SrsCardStatus = z.infer<typeof SrsCardStatusSchema>

export const SrsCardSchema = z.object({
  itemId: z.string().min(1),
  discipline: LexiconDisciplineSchema,
  box: SrsBoxSchema,
  status: SrsCardStatusSchema,
  lastReviewedAt: z.string().datetime().nullable(),
  nextDueAt: z.string().datetime(),
  totalReviews: z.number().int().nonnegative(),
  totalCorrect: z.number().int().nonnegative(),
  introducedAt: z.string().datetime(),
})
export type SrsCard = z.infer<typeof SrsCardSchema>

/**
 * Three-button rating system (plan Decision #8).
 *   again → box 1 (full demote)
 *   good  → box +1 (max 5)
 *   easy  → box +2 (max 5)
 */
export const ReviewRatingSchema = z.enum(['again', 'good', 'easy'])
export type ReviewRating = z.infer<typeof ReviewRatingSchema>

export const SubmitReviewDtoSchema = z.object({
  itemId: z.string().min(1),
  rating: ReviewRatingSchema,
})
export type SubmitReviewDto = z.infer<typeof SubmitReviewDtoSchema>

export const IntroduceItemDtoSchema = z.object({
  itemId: z.string().min(1),
})
export type IntroduceItemDto = z.infer<typeof IntroduceItemDtoSchema>

/**
 * Per-discipline thresholds and caps. Plan Decisions #6 and #7.
 *   NEW_INTRO_THRESHOLDS — pause new introductions when due-queue exceeds this
 *   DAILY_REVIEW_CAPS    — maximum cards surfaced per day (rest spillover)
 *   DAILY_NEW_TARGETS    — daily fresh-introduction quota
 */
export const SRS_NEW_INTRO_THRESHOLDS = {
  vocabulary: 50,
  collocations: 35,
  linking: 20,
} as const

export const SRS_DAILY_REVIEW_CAPS = {
  vocabulary: 60,
  collocations: 40,
  linking: 25,
} as const

export const SRS_DAILY_NEW_TARGETS = {
  vocabulary: 10,
  collocations: 7,
  linking: 2,
} as const

export const TodayPauseReasonSchema = z.enum(['review_backlog'])
export type TodayPauseReason = z.infer<typeof TodayPauseReasonSchema>

export const TodayQueueSchema = z.object({
  discipline: LexiconDisciplineSchema,
  newItems: z.array(LexiconItemSchema),
  dueReviews: z.array(SrsCardSchema),
  /** Item details hydrated for each card in `dueReviews`, in the same order. */
  dueItems: z.array(LexiconItemSchema),
  paused: z.boolean(),
  pauseReason: TodayPauseReasonSchema.nullable(),
  spilloverCount: z.number().int().nonnegative(),
  introducedTodayCount: z.number().int().nonnegative(),
  remainingNewQuota: z.number().int().nonnegative(),
})
export type TodayQueue = z.infer<typeof TodayQueueSchema>

/**
 * Aggregated retention metrics for the analytics view (Wave 10).
 * Per-box accuracy = totalCorrect / totalReviews across cards currently in
 * each box, plus card counts for queue health.
 */
export const RetentionMetricsSchema = z.object({
  discipline: LexiconDisciplineSchema,
  perBox: z.array(
    z.object({
      box: SrsBoxSchema,
      cardCount: z.number().int().nonnegative(),
      reviewCount: z.number().int().nonnegative(),
      accuracy: z.number().min(0).max(1),
    }),
  ),
  totalIntroduced: z.number().int().nonnegative(),
  totalMature: z.number().int().nonnegative(),
  totalLearning: z.number().int().nonnegative(),
})
export type RetentionMetrics = z.infer<typeof RetentionMetricsSchema>
