import { z } from 'zod'
import { LexiconDisciplineSchema, type LexiconDiscipline } from './lexicon'
import { BandLevelSchema, PhaseSchema, type BandLevel } from './practice'

export const LexiconWeekNumberSchema = z.number().int().min(1).max(12)
export type LexiconWeekNumber = z.infer<typeof LexiconWeekNumberSchema>

export const LexiconDayNumberSchema = z.number().int().min(1).max(7)
export type LexiconDayNumber = z.infer<typeof LexiconDayNumberSchema>

export const LexiconWeekStubSchema = z.object({
  discipline: LexiconDisciplineSchema,
  level: BandLevelSchema,
  phase: PhaseSchema,
  week: LexiconWeekNumberSchema,
  themeName: z.string().min(1),
  tagline: z.string().min(1),
  goalOneLiner: z.string().min(1),
  itemsPerDay: z.number().int().min(1),
  totalItems: z.number().int().min(1),
})
export type LexiconWeekStub = z.infer<typeof LexiconWeekStubSchema>

export const LexiconLevelDescriptorSchema = z.object({
  level: BandLevelSchema,
  label: z.string().min(1),
  bandRange: z.string().min(1),
  subtitle: z.string().min(1),
})
export type LexiconLevelDescriptor = z.infer<typeof LexiconLevelDescriptorSchema>

export const LEXICON_LEVELS: readonly LexiconLevelDescriptor[] = [
  {
    level: 'foundation',
    label: 'Foundation',
    bandRange: 'BAND 4.5 — 5.5',
    subtitle: 'The first thousand academic words. Steady acquisition under structure.',
  },
  {
    level: 'intermediate',
    label: 'Intermediate',
    bandRange: 'BAND 5.5 — 6.5',
    subtitle: 'The lexis the examiner expects to hear. Phrases over single words.',
  },
  {
    level: 'advanced',
    label: 'Advanced',
    bandRange: 'BAND 6.5 — 7.5',
    subtitle: 'Less-common items deployed with precision. Register fluent.',
  },
  {
    level: 'mastery',
    label: 'Mastery',
    bandRange: 'BAND 7.5 — 8.5+',
    subtitle: 'Stylistic range under pressure. The vocabulary of the editorial page.',
  },
] as const

export const DEFAULT_LEXICON_LEVEL: BandLevel = 'intermediate'

export const LexiconPhaseDescriptorSchema = z.object({
  phase: PhaseSchema,
  roman: z.enum(['I', 'II', 'III', 'IV']),
  name: z.string().min(1),
  weekRange: z.string().min(1),
  weeks: z.array(LexiconWeekNumberSchema).length(3),
  description: z.string().min(1),
})
export type LexiconPhaseDescriptor = z.infer<typeof LexiconPhaseDescriptorSchema>

/**
 * 3+3+3+3 symmetric phase boundaries. Locked in plan Decision #9 — chosen over
 * the asymmetric 1+4+4+3 grammar pattern because vocab acquisition benefits
 * from a regular weekly rhythm rather than a single orientation week.
 */
export const LEXICON_PHASES: readonly LexiconPhaseDescriptor[] = [
  {
    phase: 1,
    roman: 'I',
    name: 'Introduction',
    weekRange: 'Weeks 01 — 03',
    weeks: [1, 2, 3],
    description:
      'The most-cited frequency band first. Anchor the words that ship the heaviest load — recognised before they are produced.',
  },
  {
    phase: 2,
    roman: 'II',
    name: 'Build',
    weekRange: 'Weeks 04 — 06',
    weeks: [4, 5, 6],
    description:
      'Topical clusters now. Education, environment, technology, society — the four examiner topics, carried by their own lexis.',
  },
  {
    phase: 3,
    roman: 'III',
    name: 'Push',
    weekRange: 'Weeks 07 — 09',
    weeks: [7, 8, 9],
    description:
      'Academic register C1. The less-common items, the precise verbs of argument, the hedges and qualifiers of the educated essay.',
  },
  {
    phase: 4,
    roman: 'IV',
    name: 'Consolidate',
    weekRange: 'Weeks 10 — 12',
    weeks: [10, 11, 12],
    description:
      'Integrative use under timed conditions. Spaced review weighted heavier than fresh intake; lexis appears across all four skills.',
  },
] as const

export function lexiconPhaseForWeek(week: LexiconWeekNumber): 1 | 2 | 3 | 4 {
  if (week <= 3) return 1
  if (week <= 6) return 2
  if (week <= 9) return 3
  return 4
}

/**
 * Per-discipline daily intake target. Locked in plan Decision #5.
 * Vocab 10/day — the editorial cadence. Colloc 7/day — chunks take longer
 * to internalise. Linking 2/day — the C1+ connector inventory is small.
 */
export const LEXICON_DAILY_TARGETS: Record<LexiconDiscipline, number> = {
  vocabulary: 10,
  collocations: 7,
  linking: 2,
} as const

export function lexiconWeekTotal(discipline: LexiconDiscipline): number {
  return LEXICON_DAILY_TARGETS[discipline] * 7
}

export const LexiconPlanSchema = z.object({
  discipline: LexiconDisciplineSchema,
  level: BandLevelSchema,
  weeks: z.array(LexiconWeekStubSchema).length(12),
})
export type LexiconPlan = z.infer<typeof LexiconPlanSchema>
