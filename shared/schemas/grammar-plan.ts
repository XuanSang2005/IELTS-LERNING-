import { z } from 'zod'
import { BandLevelSchema, PhaseSchema, type BandLevel } from './practice'

export const WeekNumberSchema = z.number().int().min(1).max(12)
export type WeekNumber = z.infer<typeof WeekNumberSchema>

export const GrammarWeekStubSchema = z.object({
  week: WeekNumberSchema,
  phase: PhaseSchema,
  level: BandLevelSchema,
  structureName: z.string().min(1),
  tagline: z.string().min(1),
  goalOneLiner: z.string().min(1),
  lessonId: z.string().optional(),
})
export type GrammarWeekStub = z.infer<typeof GrammarWeekStubSchema>

export const GrammarLevelDescriptorSchema = z.object({
  level: BandLevelSchema,
  label: z.string().min(1),
  bandRange: z.string().min(1),
  subtitle: z.string().min(1),
})
export type GrammarLevelDescriptor = z.infer<typeof GrammarLevelDescriptorSchema>

export const GRAMMAR_LEVELS: readonly GrammarLevelDescriptor[] = [
  {
    level: 'foundation',
    label: 'Foundation',
    bandRange: 'BAND 4.5 — 5.5',
    subtitle: 'The grammar you were promised in school, finally made solid.',
  },
  {
    level: 'intermediate',
    label: 'Intermediate',
    bandRange: 'BAND 5.5 — 6.5',
    subtitle: 'The load-bearing structures of academic English.',
  },
  {
    level: 'advanced',
    label: 'Advanced',
    bandRange: 'BAND 6.5 — 7.5',
    subtitle: 'The structures examiners reward. Practised without ornament.',
  },
  {
    level: 'mastery',
    label: 'Mastery',
    bandRange: 'BAND 7.5 — 8.5+',
    subtitle: 'The final polish. Stylistic variation under timed conditions.',
  },
] as const

export const DEFAULT_GRAMMAR_LEVEL: BandLevel = 'intermediate'

export const GrammarPhaseDescriptorSchema = z.object({
  phase: PhaseSchema,
  roman: z.enum(['I', 'II', 'III', 'IV']),
  name: z.string().min(1),
  weekRange: z.string().min(1),
  description: z.string().min(1),
})
export type GrammarPhaseDescriptor = z.infer<typeof GrammarPhaseDescriptorSchema>

export const GRAMMAR_PHASES: readonly GrammarPhaseDescriptor[] = [
  {
    phase: 1,
    roman: 'I',
    name: 'Orientation',
    weekRange: 'Week 01',
    description:
      'Before grammar, the shape of a sentence. Clauses, subjects, verbs — the architecture you will refine for eleven weeks.',
  },
  {
    phase: 2,
    roman: 'II',
    name: 'Foundations',
    weekRange: 'Weeks 02 — 05',
    description:
      'The four load-bearing structures of academic English. Conditionals, passives, relatives, noun phrases — each rehearsed until automatic.',
  },
  {
    phase: 3,
    roman: 'III',
    name: 'Refinement',
    weekRange: 'Weeks 06 — 09',
    description:
      'Band 7 and above. Inversion, cleft sentences, hedging, cohesion — the structures examiners reward, practised without ornament.',
  },
  {
    phase: 4,
    roman: 'IV',
    name: 'Examination',
    weekRange: 'Weeks 10 — 12',
    description:
      'The final approach. Concession patterns, cause-and-consequence linking, and the mixed-error drill that rehearses test-day conditions.',
  },
] as const

export function phaseForWeek(week: WeekNumber): 1 | 2 | 3 | 4 {
  if (week === 1) return 1
  if (week <= 5) return 2
  if (week <= 9) return 3
  return 4
}
