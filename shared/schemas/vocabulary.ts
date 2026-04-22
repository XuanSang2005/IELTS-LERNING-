import { z } from 'zod'
import { LessonRegisterSchema } from './lesson'

export const PartOfSpeechSchema = z.enum(['noun', 'verb', 'adjective', 'adverb', 'phrase'])
export type PartOfSpeech = z.infer<typeof PartOfSpeechSchema>

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
})
export type VocabWord = z.infer<typeof VocabWordSchema>
