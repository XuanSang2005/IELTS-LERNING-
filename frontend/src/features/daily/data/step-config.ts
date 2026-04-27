import type { BandLevel } from '@shared/schemas/practice'

/**
 * Five fixed steps. Per-level minute estimates inform the masthead total
 * and the sidebar duration tags. Numbers are conservative — a focused
 * candidate finishes faster.
 */
export type DailyStepKind = 'review' | 'reading' | 'listening' | 'vocab' | 'writing'

export interface DailyStepDefinition {
  number: 1 | 2 | 3 | 4 | 5
  kind: DailyStepKind
  title: string
  tagline: string
  /** Mono section glyph rendered in the masthead and sidebar. */
  ornament: string
}

export const DAILY_STEPS: readonly DailyStepDefinition[] = [
  {
    number: 1,
    kind: 'review',
    title: 'Review',
    tagline: 'Yesterday’s ten words and the grammar that carried them.',
    ornament: '§ I',
  },
  {
    number: 2,
    kind: 'reading',
    title: 'Reading',
    tagline: 'One passage. Five questions. Marked as you choose.',
    ornament: '§ II',
  },
  {
    number: 3,
    kind: 'listening',
    title: 'Listening',
    tagline: 'A short recording. Five questions in the same hand.',
    ornament: '§ III',
  },
  {
    number: 4,
    kind: 'vocab',
    title: 'Vocabulary',
    tagline: 'Ten words you met in the reading. Learn them by tomorrow.',
    ornament: '§ IV',
  },
  {
    number: 5,
    kind: 'writing',
    title: 'Writing',
    tagline: 'A short response on today’s topic, examined within minutes.',
    ornament: '§ V',
  },
] as const

/**
 * Writing-step minimum word count, scaled per BandLevel. Drawn from the
 * IELTS Task-2 conventions adapted to a daily exercise: shorter than a
 * full Task 2 (250 / 300) but enough to show argument structure.
 */
export const WRITING_MIN_WORDS_BY_LEVEL: Record<BandLevel, number> = {
  foundation: 80,
  intermediate: 120,
  advanced: 200,
  mastery: 250,
}

/** Per-level estimated total minutes for the masthead summary. */
export const ESTIMATED_MINUTES_BY_LEVEL: Record<BandLevel, number> = {
  foundation: 35,
  intermediate: 50,
  advanced: 65,
  mastery: 80,
}

/** Per-step minute budget — sums to ESTIMATED_MINUTES_BY_LEVEL. */
export const STEP_MINUTES_BY_LEVEL: Record<BandLevel, Record<DailyStepKind, number>> = {
  foundation: { review: 4, reading: 10, listening: 8, vocab: 5, writing: 8 },
  intermediate: { review: 5, reading: 15, listening: 10, vocab: 6, writing: 14 },
  advanced: { review: 6, reading: 20, listening: 13, vocab: 7, writing: 19 },
  mastery: { review: 7, reading: 25, listening: 16, vocab: 8, writing: 24 },
}
