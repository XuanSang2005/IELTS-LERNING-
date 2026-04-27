import type { Discipline } from '@shared/schemas/practice'

export const PRINCIPLES = [
  { num: 'I', title: 'Diagnose.', body: 'Find the plateau before breaking it.' },
  { num: 'II', title: 'Chunks, not words.', body: 'Multi-word units, always.' },
  { num: 'III', title: 'Feedback in minutes.', body: 'AI grading, same-day review.' },
  { num: 'IV', title: 'Examiner’s eye.', body: 'Read your work as Cambridge does.' },
  { num: 'V', title: 'Repetition over breadth.', body: 'Narrower programme, practised deeper.' },
] as const

export interface DisciplineCopy {
  num: string
  name: string
  tag: string
  discipline: Discipline
  /** Editorial release label when not yet published. */
  releaseLabel?: string
}

/**
 * The four disciplines. Each links to `/study?discipline=...` when available.
 * `releaseLabel` (e.g. "№ 09") marks future-issue disciplines that don't have
 * a route yet; the card renders as a non-clickable editorial placeholder.
 */
export const DISCIPLINES: readonly DisciplineCopy[] = [
  { num: 'I', name: 'Grammar', tag: 'Architecture', discipline: 'grammar' },
  { num: 'II', name: 'Vocabulary', tag: 'Range', discipline: 'vocabulary' },
  {
    num: 'III',
    name: 'Collocations',
    tag: 'Natural pairing',
    discipline: 'collocations',
    releaseLabel: '№ 09',
  },
  {
    num: 'IV',
    name: 'Linking',
    tag: 'Cohesion',
    discipline: 'linking',
    releaseLabel: '№ 10',
  },
] as const

export const PHASES = [
  { num: 'I', weeks: 'Week 01', title: 'Orientation', body: 'Diagnostic. Band descriptors.' },
  { num: 'II', weeks: 'Weeks 02 — 05', title: 'Foundations', body: 'Rotation. Templates.' },
  { num: 'III', weeks: 'Weeks 06 — 09', title: 'Refinement', body: 'Error drills. Two mocks.' },
  { num: 'IV', weeks: 'Weeks 10 — 12', title: 'Examination', body: 'Weekly mocks. Rehearsal.' },
] as const

export const ESSENTIAL_LOOP = ['Input', 'Apply', 'Review'] as const
export const COMPLETE_LOOP = ['Input', 'Notice', 'Recall', 'Apply', 'Feedback', 'Review'] as const

/**
 * One marketing-voice line per band level. Keys match BandLevelSchema; the
 * actual band ranges and labels come from `GRAMMAR_LEVELS` so this page never
 * drifts from the canonical pedagogy data.
 */
export const RANGE_LINES: Record<'foundation' | 'intermediate' | 'advanced' | 'mastery', string> = {
  foundation: 'The architecture, taught explicitly.',
  intermediate: 'Fluency, precision, nerve.',
  advanced: 'Register and idiom, under pressure.',
  mastery: 'The final, examiner-aware edges.',
}

export const FOOTER_ITEMS = [
  { label: 'EDITION', value: '№ 08' },
  { label: 'PUBLISHED', value: 'WEEKLY' },
  { label: 'COHORT', value: 'IV' },
  { label: 'OFFICE', value: 'LONDON — MMXXIV' },
] as const
