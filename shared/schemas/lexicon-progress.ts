import { z } from 'zod'
import { LexiconDisciplineSchema } from './lexicon'
import { LexiconDayNumberSchema, LexiconWeekNumberSchema } from './lexicon-plan'
import { BandLevelSchema } from './practice'

/**
 * Per-week progress for one (user, discipline, level, week). Plan Decision #14
 * defines `daysCompleted` as DERIVED on-read from srs_cards aggregation —
 * not persisted directly. Backend computes from review interactions in the
 * user-local timezone (cache 60s).
 *
 * `practiceScores` and `reviewPassed` ARE persisted because they come from
 * explicit submissions (DayPractice score, WeekQuiz score).
 */
export const LexiconWeekProgressSchema = z.object({
  discipline: LexiconDisciplineSchema,
  level: BandLevelSchema,
  week: LexiconWeekNumberSchema,
  /** Derived: days where user reviewed >= 80% of items introduced that day. */
  daysCompleted: z.array(LexiconDayNumberSchema),
  /** Persisted: keyed by day number string ("1".."7"), value 0-100. */
  practiceScores: z.record(z.string(), z.number().min(0).max(100)).default({}),
  /** Persisted: true once WeekQuiz score >= 80. */
  reviewPassed: z.boolean().default(false),
})
export type LexiconWeekProgress = z.infer<typeof LexiconWeekProgressSchema>

export const SubmitPracticeScoreDtoSchema = z.object({
  discipline: LexiconDisciplineSchema,
  level: BandLevelSchema,
  week: LexiconWeekNumberSchema,
  day: LexiconDayNumberSchema,
  score: z.number().int().min(0).max(100),
})
export type SubmitPracticeScoreDto = z.infer<typeof SubmitPracticeScoreDtoSchema>

export const SubmitWeekQuizDtoSchema = z.object({
  discipline: LexiconDisciplineSchema,
  level: BandLevelSchema,
  week: LexiconWeekNumberSchema,
  score: z.number().int().min(0).max(100),
})
export type SubmitWeekQuizDto = z.infer<typeof SubmitWeekQuizDtoSchema>
