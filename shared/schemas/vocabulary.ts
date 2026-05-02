import { z } from 'zod'
import { LessonRegisterSchema } from './lesson'

export const PartOfSpeechSchema = z.enum(['noun', 'verb', 'adjective', 'adverb', 'phrase'])
export type PartOfSpeech = z.infer<typeof PartOfSpeechSchema>

/**
 * Word frequency tier — see LEXICON-LEVEL-SPEC.md §1 axis 2.
 * K1–K6+ map to BNC/COCA frequency bands (top 1000–6000+).
 * AWL = Academic Word List (Coxhead) — overrides K rank for academic items.
 *
 * Optional in the schema so existing pre-Lexicon vocab seeds remain valid;
 * required by content-production policy for any new Lexicon item.
 */
export const FrequencyTierSchema = z.enum(['K1', 'K2', 'K3', 'K4', 'K5', 'K6+', 'AWL'])
export type FrequencyTier = z.infer<typeof FrequencyTierSchema>

export const VocabSynonymSchema = z.object({
  word: z.string().min(1),
  register: LessonRegisterSchema,
  nuance: z.string().optional(),
})
export type VocabSynonym = z.infer<typeof VocabSynonymSchema>

export const VocabWordSchema = z.object({
  id: z.string().min(1),
  headword: z.string().min(1),
  partOfSpeech: PartOfSpeechSchema,
  definition: z.string().min(1),
  example: z.string().min(1),
  register: LessonRegisterSchema,
  topic: z.string().optional(),
  frequency: z.enum(['high', 'medium', 'low']).default('high'),
  synonyms: z.array(VocabSynonymSchema).min(2).max(8),
  /** BNC/COCA frequency tier — see LEXICON-LEVEL-SPEC.md. */
  frequencyTier: FrequencyTierSchema.optional(),
  /**
   * Brief connotation tag, e.g. "Negative — implies stubborn refusal" for
   * `obstinate`. Required by content policy for Advanced + Mastery levels;
   * optional for Intermediate; omitted for Foundation.
   */
  connotationNote: z.string().optional(),
  /**
   * IPA pronunciation, e.g. "/kwɒˈtɪdiən/". Optional; rendered when present.
   */
  pronunciationIPA: z.string().optional(),
  /**
   * Brief etymology line, e.g. "From Latin quotidianus, from quotidie (daily)".
   */
  etymology: z.string().optional(),
  /**
   * Optional URL to a pronunciation audio clip. When absent, the UI falls back
   * to the browser's Web Speech synthesis API.
   */
  audioUrl: z.string().url().optional(),
})
export type VocabWord = z.infer<typeof VocabWordSchema>
