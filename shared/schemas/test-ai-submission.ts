import { z } from 'zod'

/**
 * AI-graded submission shape for Writing and Speaking practice tests.
 *
 * Kept separate from `Submission` in `submission.ts`, which is the backend
 * single-essay grading entity. This shape is produced by the client-side
 * mock grader (`mock-grade.ts`) during the scaffold phase; when real Claude
 * grading is wired in, only the producer changes — consumers keep the same
 * type.
 */

/** IELTS band — 0 to 9 in 0.5 increments. */
export const BandNumberSchema = z.number().min(0).max(9).multipleOf(0.5)
export type BandNumber = z.infer<typeof BandNumberSchema>

export const CriterionFeedbackSchema = z.object({
  name: z.string(),
  band: BandNumberSchema,
  feedback: z.string(),
})
export type CriterionFeedback = z.infer<typeof CriterionFeedbackSchema>

const CriterionTupleSchema = z.tuple([
  CriterionFeedbackSchema,
  CriterionFeedbackSchema,
  CriterionFeedbackSchema,
  CriterionFeedbackSchema,
])

export const WritingTestSubmissionSchema = z.object({
  id: z.string(),
  testId: z.string(),
  skill: z.literal('writing'),
  submittedAt: z.string(),
  task1Text: z.string(),
  task2Text: z.string(),
  overall: BandNumberSchema,
  criteria: CriterionTupleSchema,
  summary: z.string(),
})
export type WritingTestSubmission = z.infer<typeof WritingTestSubmissionSchema>

export const SpeakingTestSubmissionSchema = z.object({
  id: z.string(),
  testId: z.string(),
  skill: z.literal('speaking'),
  submittedAt: z.string(),
  partDurations: z.array(z.number().int().nonnegative()),
  overall: BandNumberSchema,
  criteria: CriterionTupleSchema,
  summary: z.string(),
})
export type SpeakingTestSubmission = z.infer<typeof SpeakingTestSubmissionSchema>

export const AiTestSubmissionSchema = z.discriminatedUnion('skill', [
  WritingTestSubmissionSchema,
  SpeakingTestSubmissionSchema,
])
export type AiTestSubmission = z.infer<typeof AiTestSubmissionSchema>

/**
 * Request body for creating a Writing test submission. Task texts are kept
 * modestly-lower-bounded so the backend can short-circuit obvious empty
 * submissions without paying Claude tokens for them.
 */
export const CreateWritingTestSubmissionDtoSchema = z.object({
  testId: z.string().min(1),
  task1Text: z.string().min(50, 'Task 1 is too short'),
  task2Text: z.string().min(50, 'Task 2 is too short'),
})
export type CreateWritingTestSubmissionDto = z.infer<typeof CreateWritingTestSubmissionDtoSchema>

/**
 * Persisted test-submission shape returned by the backend. Extends the
 * AI-graded result with status/ownership metadata so the frontend can
 * poll for grading progress. `grading` is populated only when status='graded'.
 */
const TestSubmissionStatusSchema = z.enum(['submitted', 'grading', 'graded', 'failed'])
export type TestSubmissionStatus = z.infer<typeof TestSubmissionStatusSchema>

export const PersistedWritingTestSubmissionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  testId: z.string(),
  skill: z.literal('writing'),
  task1Text: z.string(),
  task2Text: z.string(),
  status: TestSubmissionStatusSchema,
  grading: WritingTestSubmissionSchema.nullable(),
  error: z.string().nullable(),
  submittedAt: z.string(),
  gradedAt: z.string().nullable(),
})
export type PersistedWritingTestSubmission = z.infer<typeof PersistedWritingTestSubmissionSchema>
