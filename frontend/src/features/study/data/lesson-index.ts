import type { BandLevel, Discipline } from '@shared/schemas/practice'
import type { Lesson } from '@shared/schemas/study'

/**
 * Discipline × level buckets for adaptive-session lessons.
 * Phase 4 populates each bucket with seed content; empty arrays are legal
 * and the session planner falls back to a placeholder when a bucket is empty.
 */
export const LESSON_INDEX: Record<Discipline, Record<BandLevel, Lesson[]>> = {
  grammar: {
    foundation: [],
    intermediate: [],
    advanced: [],
    mastery: [],
  },
  vocabulary: {
    foundation: [],
    intermediate: [],
    advanced: [],
    mastery: [],
  },
  collocations: {
    foundation: [],
    intermediate: [],
    advanced: [],
    mastery: [],
  },
  linking: {
    foundation: [],
    intermediate: [],
    advanced: [],
    mastery: [],
  },
}

export function getLessons(discipline: Discipline, level: BandLevel): Lesson[] {
  return LESSON_INDEX[discipline][level]
}

/**
 * Deterministic pick — rotates through the bucket by day-of-year so the
 * same user sees a different lesson day to day without randomness breaking
 * SSR or tests. Returns `null` when the bucket is empty.
 */
export function pickLessonForDate(
  discipline: Discipline,
  level: BandLevel,
  isoDate: string,
): Lesson | null {
  const bucket = getLessons(discipline, level)
  if (bucket.length === 0) return null
  const dayIndex = daysSinceEpoch(isoDate)
  return bucket[dayIndex % bucket.length] ?? null
}

function daysSinceEpoch(isoDate: string): number {
  const ms = new Date(isoDate).getTime()
  return Math.floor(ms / 86_400_000)
}
