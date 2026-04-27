import type { Lesson } from '@shared/schemas/lesson'
import { FOUNDATION_LESSONS } from './foundation-lessons'
import { INTERMEDIATE_LESSONS } from './intermediate-lessons'
import { ADVANCED_LESSONS } from './advanced-lessons'
import { MASTERY_LESSONS } from './mastery-lessons'

/**
 * Grammar lessons only. The /study catalogue and /app/grammar arc consume
 * these. Daily-session content lives in `daily/` (a separate module backed
 * by the `daily_units` collection) and never touches this seed.
 */
export const LESSON_SEED: Lesson[] = [
  ...FOUNDATION_LESSONS,
  ...INTERMEDIATE_LESSONS,
  ...ADVANCED_LESSONS,
  ...MASTERY_LESSONS,
]
