import { z } from 'zod'
import { BandLevelSchema } from './practice'
import { LessonRegisterSchema } from './lesson'
import { PartOfSpeechSchema } from './vocabulary'

/**
 * Daily session content model — one unit per `(day, level)` pair, totalling
 * 5 days × 4 levels = 20 units. Each unit packages everything five steps need:
 * yesterday's review surface (vocab + grammar focus), today's reading +
 * listening passages, today's vocab deck (drawn from the reading), and
 * today's writing prompt (topic-aligned with the reading).
 *
 * Day numbering is 1-indexed and bound to the 5-cycle. The frontend resolves
 * "today" via `daysSinceEpoch(today) % 5 + 1`; "yesterday" is the previous
 * cycle index, wrapping at day 1 → day 5.
 */

export const DailyDayNumberSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])
export type DailyDayNumber = z.infer<typeof DailyDayNumberSchema>

/* ── Question (slim multiple-choice for MVP) ───────────────────────────── */

export const DailyChoiceSchema = z.object({
  key: z.string().min(1),
  text: z.string().min(1),
})
export type DailyChoice = z.infer<typeof DailyChoiceSchema>

export const DailyQuestionSchema = z.object({
  id: z.string().min(1),
  number: z.number().int().min(1).max(20),
  prompt: z.string().min(1),
  choices: z.array(DailyChoiceSchema).min(2).max(5),
  /** The `key` of the correct choice. */
  correctKey: z.string().min(1),
  explanation: z.string().min(1),
})
export type DailyQuestion = z.infer<typeof DailyQuestionSchema>

/* ── Reading passage ───────────────────────────────────────────────────── */

export const DailyReadingSchema = z.object({
  title: z.string().min(1),
  /** Plain-text body. Paragraphs separated by `\n\n`. */
  body: z.string().min(1),
  wordCount: z.number().int().min(50).max(2000),
  /** Topic tag — used by the writing step to verify topical alignment. */
  topic: z.string().min(1),
  questions: z.array(DailyQuestionSchema).min(3).max(8),
})
export type DailyReading = z.infer<typeof DailyReadingSchema>

/* ── Listening passage (text-mock; no audio in MVP) ───────────────────── */

export const DailyListeningSchema = z.object({
  title: z.string().min(1),
  /** Spoken-form transcript shown in lieu of audio while we ship. */
  transcript: z.string().min(1),
  /** Optional audio asset; null until we record/source. */
  audioUrl: z.string().nullable().default(null),
  topic: z.string().min(1),
  questions: z.array(DailyQuestionSchema).min(3).max(8),
})
export type DailyListening = z.infer<typeof DailyListeningSchema>

/* ── Vocab deck (10 items per reading) ────────────────────────────────── */

export const DailyVocabItemSchema = z.object({
  term: z.string().min(1),
  partOfSpeech: PartOfSpeechSchema,
  definition: z.string().min(1),
  /** Example sentence — ideally lifted directly from the reading. */
  example: z.string().min(1),
  register: LessonRegisterSchema,
  /** Optional Vietnamese gloss for the in-context translation popover. */
  vi: z.string().optional(),
})
export type DailyVocabItem = z.infer<typeof DailyVocabItemSchema>

/* ── Grammar focus (reviewed at Step 1 the following day) ─────────────── */

export const DailyGrammarFocusSchema = z.object({
  topic: z.string().min(1),
  ruleSummary: z.string().min(1),
  examples: z.array(z.string().min(1)).min(2).max(4),
})
export type DailyGrammarFocus = z.infer<typeof DailyGrammarFocusSchema>

/* ── Writing prompt ───────────────────────────────────────────────────── */

export const DailyWritingSchema = z.object({
  prompt: z.string().min(1),
  /** Length scaled per BandLevel — foundation 80, intermediate 120, advanced 200, mastery 250. */
  minWords: z.number().int().min(50).max(500),
  /** One-line guidance for the candidate (e.g. "use 3 connectors from today"). */
  guidance: z.string().optional(),
})
export type DailyWriting = z.infer<typeof DailyWritingSchema>

/* ── DailyUnit ─────────────────────────────────────────────────────────── */

export const DailyUnitSchema = z.object({
  id: z.string().min(1),
  day: DailyDayNumberSchema,
  level: BandLevelSchema,
  reading: DailyReadingSchema,
  listening: DailyListeningSchema,
  vocabDeck: z.array(DailyVocabItemSchema).length(10),
  grammarFocus: DailyGrammarFocusSchema,
  writing: DailyWritingSchema,
  publishedAt: z.string(),
})
export type DailyUnit = z.infer<typeof DailyUnitSchema>

/**
 * Compact review surface — what Step 1 needs from yesterday's unit. The
 * service projects to this shape so the frontend doesn't load a full unit
 * just to render flashcards + a grammar card.
 */
export const DailyReviewSetSchema = z.object({
  /** The day number that produced this content (yesterday's day index). */
  fromDay: DailyDayNumberSchema,
  vocab: z.array(DailyVocabItemSchema),
  grammarFocus: DailyGrammarFocusSchema,
})
export type DailyReviewSet = z.infer<typeof DailyReviewSetSchema>
