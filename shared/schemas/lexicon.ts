import { z } from 'zod'

/**
 * The three lexicon disciplines. Mirrors `Discipline` in `practice.ts` but
 * narrowed to the items the Lexicon page renders — the lesson catalogue and
 * the lexicon catalogue have overlapping but not identical category sets.
 *
 * `vocabulary` is the singular form (one VocabWord per entry), whereas
 * `collocations` and `linking` are plural collective nouns that match how
 * the API resources are named.
 */
export const LexiconDisciplineSchema = z.enum(['vocabulary', 'collocations', 'linking'])
export type LexiconDiscipline = z.infer<typeof LexiconDisciplineSchema>

export const LEXICON_DISCIPLINES: readonly LexiconDiscipline[] = [
  'vocabulary',
  'collocations',
  'linking',
] as const
