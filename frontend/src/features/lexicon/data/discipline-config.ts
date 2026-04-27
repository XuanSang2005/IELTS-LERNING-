import type { LexiconDiscipline } from '@shared/schemas/lexicon'

/**
 * Per-discipline display copy used by the LexiconPage masthead and tab nav.
 * The body text (numbers, quotes) is editorial — written for the brand voice,
 * not derived from data. Numbers are conservative ranges; do not auto-derive
 * them from `data.length` because the count fluctuates with reseeds.
 */
export interface DisciplineConfig {
  id: LexiconDiscipline
  /** Display label in the tab nav. */
  tabLabel: string
  /** Mono prefix above the H1 (after "◆ THE LEXICON · "). */
  metaSuffix: string
  /** H1 — same family every time, only the noun changes. */
  headline: string
  /** Editorial blockquote rendered under the H1. JSX-safe plain string. */
  quote: string
  /** Brand identifier for the Polaroid edition label. */
  edition: string
  /** Empty-state copy when filters return zero results. */
  emptyState: string
  /** Plural noun used in the count strip ("48 ENTRIES" / "30 PAIRINGS"). */
  unitLabel: string
}

export const DISCIPLINE_CONFIG: Record<LexiconDiscipline, DisciplineConfig> = {
  vocabulary: {
    id: 'vocabulary',
    tabLabel: 'Vocabulary',
    metaSuffix: 'FIFTY HEADWORDS, TWO HUNDRED SYNONYMS',
    headline: 'The lexicon.',
    quote:
      'A Band 6 essay says important four times. A Band 7 essay says it once — then reaches for crucial, pivotal, instrumental.',
    edition: 'LEXICON № I',
    emptyState: 'Nothing matches. Loosen the filter, or try another word.',
    unitLabel: 'ENTRIES',
  },
  collocations: {
    id: 'collocations',
    tabLabel: 'Collocations',
    metaSuffix: 'FORTY PAIRINGS, SIX PATTERNS',
    headline: 'The pairings.',
    quote:
      'A Band 6 candidate writes a big problem. A Band 7 candidate writes a pressing concern. The English you reach for is the English you have rehearsed.',
    edition: 'LEXICON № II',
    emptyState: 'No pairings match this filter. Loosen it, or try another word.',
    unitLabel: 'PAIRINGS',
  },
  linking: {
    id: 'linking',
    tabLabel: 'Linking',
    metaSuffix: 'FORTY DEVICES, EIGHT FUNCTIONS',
    headline: 'The cohesion.',
    quote:
      'A Band 6 essay leans on and, but, so. A Band 7 essay reaches for moreover, conversely, on balance — without ever sounding rehearsed.',
    edition: 'LEXICON № III',
    emptyState: 'No devices match this filter. Loosen it, or try another phrase.',
    unitLabel: 'DEVICES',
  },
}
