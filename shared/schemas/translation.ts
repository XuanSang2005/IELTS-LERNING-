import { z } from 'zod'

/** Max length user can request in one go. Prevents whole-paragraph selections
 * from blowing up cost + latency. Backend enforces; frontend hides the
 * popover beyond this. */
export const TRANSLATION_MAX_LENGTH = 200

export const TranslationRequestSchema = z.object({
  text: z.string().min(1).max(TRANSLATION_MAX_LENGTH),
})
export type TranslationRequest = z.infer<typeof TranslationRequestSchema>

export const TranslationExampleSchema = z.object({
  en: z.string(),
  vi: z.string(),
})
export type TranslationExample = z.infer<typeof TranslationExampleSchema>

export const TranslationResponseSchema = z.object({
  /** The original text the user submitted, untouched. */
  text: z.string(),
  /** Lowercased + trimmed + whitespace-collapsed key used for caching. */
  normalized: z.string(),
  /** Vietnamese translation. */
  vi: z.string(),
  /** 0-3 example pairs. Optional, may be empty. */
  examples: z.array(TranslationExampleSchema).default([]),
  /** True if served from the Mongo cache rather than a fresh Claude call. */
  fromCache: z.boolean(),
})
export type TranslationResponse = z.infer<typeof TranslationResponseSchema>

/** Normalize a phrase to its cache key. Must match the backend impl. */
export function normalizeForCache(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}
