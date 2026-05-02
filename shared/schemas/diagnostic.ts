import { z } from 'zod'
import { QuestionSchema } from './test'

// Inline-mirror of `BandLevelSchema` from practice.ts. Kept local so this
// module can be imported by practice.ts without a circular dependency.
const DiagnosticBandLevelSchema = z.enum(['foundation', 'intermediate', 'advanced', 'mastery'])

/**
 * Static diagnostic test served by GET /diagnostic/test. Single curated
 * version (`diagnostic-v1`) seeded backend-side. Reuses the existing
 * `QuestionSchema` so the frontend `<QuestionRenderer>` works as-is.
 */
export const DiagnosticListeningSectionSchema = z.object({
  /** Optional MP3 URL. If null, AudioPlayer falls back to Web Speech TTS. */
  audioUrl: z.string().nullable(),
  /** Full transcript — drives the TTS fallback and the "show transcript" reveal. */
  transcript: z.string(),
  /** Section header copy — mirrors the /test page Listening layout. */
  sectionTitle: z.string(),
  /** Group instruction shown above the question list. */
  instruction: z.string(),
  questions: z.array(QuestionSchema).length(5),
})

export const DiagnosticReadingSectionSchema = z.object({
  passageTitle: z.string(),
  passageHtml: z.string(),
  /** Group instruction shown above the question list. */
  instruction: z.string(),
  questions: z.array(QuestionSchema).length(5),
})

export const DiagnosticWritingPromptSchema = z.object({
  prompt: z.string(),
  minWords: z.number().int().nonnegative().default(150),
  taskType: z.enum(['task-2-discuss', 'task-2-opinion']).default('task-2-discuss'),
})

export const DiagnosticTestSchema = z.object({
  id: z.string(),
  version: z.string(),
  estimatedMinutes: z.number().int().positive(),
  listening: DiagnosticListeningSectionSchema,
  reading: DiagnosticReadingSectionSchema,
  writing: DiagnosticWritingPromptSchema,
})
export type DiagnosticTest = z.infer<typeof DiagnosticTestSchema>

/**
 * Submission shape posted by the frontend on completion.
 * Listening/reading answers are keyed by `question.id`. Values may be a
 * single string (multiple-choice / true-false / short-answer / sentence-completion),
 * an array of strings (multi-select), or a record (matching / form-completion blanks).
 */
export const DiagnosticAnswerValueSchema = z.union([
  z.string(),
  z.array(z.string()),
  z.record(z.string(), z.string()),
])
export type DiagnosticAnswerValue = z.infer<typeof DiagnosticAnswerValueSchema>

export const DiagnosticSubmissionDtoSchema = z.object({
  testId: z.string(),
  durationSeconds: z.number().int().nonnegative(),
  listeningAnswers: z.record(z.string(), DiagnosticAnswerValueSchema),
  readingAnswers: z.record(z.string(), DiagnosticAnswerValueSchema),
  writingText: z.string().min(1),
})
export type DiagnosticSubmissionDto = z.infer<typeof DiagnosticSubmissionDtoSchema>

/**
 * Per-skill result. `band` is half-band (4.0–9.0) computed from
 * correct/total via the grade-mapping table.
 */
export const DiagnosticSkillScoreSchema = z.object({
  correct: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  band: z.number().min(0).max(9),
})

export const DiagnosticWritingScoreSchema = z.object({
  band: z.number().min(0).max(9),
  summary: z.string(),
})

/**
 * Persisted on UserProfile.diagnosticResult. Front-of-house UI on the
 * result screen + dashboard band display reads from this.
 */
export const DiagnosticResultSchema = z.object({
  takenAt: z.string().datetime(),
  durationSeconds: z.number().int().nonnegative(),
  listening: DiagnosticSkillScoreSchema,
  reading: DiagnosticSkillScoreSchema,
  writing: DiagnosticWritingScoreSchema,
  /** Heuristic placeholder until real audio capture lands: writing - 0.5. */
  speakingEstimated: z.number().min(0).max(9),
  /** Average of 4 skills, IELTS-rounded. */
  overallBand: z.number().min(0).max(9),
  recommendedLevel: DiagnosticBandLevelSchema,
})
export type DiagnosticResult = z.infer<typeof DiagnosticResultSchema>
