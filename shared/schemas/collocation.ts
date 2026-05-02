import { z } from 'zod'
import { LessonRegisterSchema } from './lesson'
import { FrequencyTierSchema } from './vocabulary'

/**
 * The structural pattern a collocation follows. Used to group entries on the
 * lexicon page so candidates can drill into a specific pairing type.
 */
export const CollocationPatternSchema = z.enum([
  'verb-noun', // make a decision, draw a conclusion
  'adjective-noun', // common practice, vested interest
  'noun-noun', // crime rate, climate change
  'verb-preposition', // depend on, refer to
  'adjective-preposition', // aware of, prone to
  'adverb-adjective', // highly effective, deeply concerned
  'verb-adverb', // reply promptly, multitask effectively
  'verb', // get promoted, fall ill — verb chunks
  'noun-adjective', // free and fair, slightly more permissive
  'verb-adjective', // remain stable, stay active
  'noun-preposition', // freedom of speech, right to vote
  'preposition', // in stark contrast, compared with — multi-word prepositional phrases
  'adverb-verb', // closely resemble, simultaneously occurred
  'noun', // global village, world peace — fixed noun phrases
  'adjective', // free and fair — adjective chunks
])
export type CollocationPattern = z.infer<typeof CollocationPatternSchema>

export const CollocationSchema = z.object({
  id: z.string().min(1),
  /** The collocation itself, e.g. "make a decision". */
  phrase: z.string().min(1),
  /** Structural family — the rule that lets candidates form analogous pairs. */
  pattern: CollocationPatternSchema,
  /** Plain meaning of the unit, written for B1+ readers. */
  definition: z.string().min(1),
  /** Sentence-length, examiner-grade illustration. */
  example: z.string().min(1),
  /** Target register for the unit as a whole — most useful pairings sit B2+. */
  register: LessonRegisterSchema,
  /** Optional thematic tag (society, environment, technology, …). */
  topic: z.string().optional(),
  /**
   * Up to four near-equivalents the candidate can swap in. Order is editorial,
   * not algorithmic — first item is the most common natural alternative.
   */
  alternatives: z.array(z.string().min(1)).max(4).default([]),
  /** Optional usage caveat — e.g. "uncountable", "always plural", "AmE only". */
  note: z.string().optional(),
  /** BNC/COCA frequency tier — see LEXICON-LEVEL-SPEC.md. */
  frequencyTier: FrequencyTierSchema.optional(),
})
export type Collocation = z.infer<typeof CollocationSchema>
