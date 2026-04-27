import { z } from 'zod'
import { LessonRegisterSchema } from './lesson'

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
})
export type Collocation = z.infer<typeof CollocationSchema>
