import { z } from 'zod'

export const SubmissionTypeSchema = z.enum(['task2', 'task1-academic', 'task1-general'])
export type SubmissionType = z.infer<typeof SubmissionTypeSchema>

export const SubmissionStatusSchema = z.enum(['submitted', 'grading', 'graded', 'failed'])
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>

export const BandCriterionSchema = z.object({
  band: z.number().min(0).max(9),
  notes: z.string(),
})
export type BandCriterion = z.infer<typeof BandCriterionSchema>

export const AnnotationCategorySchema = z.enum([
  'task-response',
  'coherence-cohesion',
  'lexical-resource',
  'grammatical-range',
])
export type AnnotationCategory = z.infer<typeof AnnotationCategorySchema>

export const AnnotationSeveritySchema = z.enum(['minor', 'moderate', 'major'])
export type AnnotationSeverity = z.infer<typeof AnnotationSeveritySchema>

export const AnnotationSchema = z.object({
  id: z.string(),
  start: z.number().int().min(0),
  end: z.number().int().min(0),
  category: AnnotationCategorySchema,
  severity: AnnotationSeveritySchema,
  comment: z.string(),
  suggestion: z.string().optional(),
})
export type Annotation = z.infer<typeof AnnotationSchema>

/**
 * The AI-returned grading payload. `gradedAt`, `modelVersion`, and `tokensUsed`
 * are stamped by the grading service, not produced by the model.
 */
export const GradingResultSchema = z.object({
  taskResponse: BandCriterionSchema,
  coherenceCohesion: BandCriterionSchema,
  lexicalResource: BandCriterionSchema,
  grammaticalRange: BandCriterionSchema,
  overallBand: z.number().min(0).max(9),
  overallNote: z.string(),
  annotations: z.array(AnnotationSchema),
  gradedAt: z.string(),
  modelVersion: z.string(),
  tokensUsed: z.number().int().optional(),
})
export type GradingResult = z.infer<typeof GradingResultSchema>

/** Subset the AI is actually asked to produce \u2014 the service adds the rest. */
export const ModelGradingResultSchema = GradingResultSchema.omit({
  gradedAt: true,
  modelVersion: true,
  tokensUsed: true,
})
export type ModelGradingResult = z.infer<typeof ModelGradingResultSchema>

export const SubmissionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: SubmissionTypeSchema,
  prompt: z.string(),
  content: z.string().min(1),
  wordCount: z.number().int(),
  status: SubmissionStatusSchema,
  grading: GradingResultSchema.nullable(),
  error: z.string().nullable(),
  sessionId: z.string().optional(),
  sessionDate: z.string(),
  submittedAt: z.string(),
  gradedAt: z.string().nullable(),
})
export type Submission = z.infer<typeof SubmissionSchema>

/**
 * Session-date check: ISO must be within the last 48h. Prevents backdating.
 */
function recentSessionDate(iso: string): boolean {
  const parsed = new Date(iso).getTime()
  if (Number.isNaN(parsed)) return false
  const diff = Date.now() - parsed
  return diff >= 0 && diff < 48 * 3600 * 1000
}

export const CreateSubmissionDtoSchema = z.object({
  type: SubmissionTypeSchema,
  prompt: z.string().min(1),
  content: z
    .string()
    .min(50, 'At least fifty words')
    .max(1500, 'Essay exceeds the maximum length')
    .refine((s) => s.trim().length >= 50, 'Essay is mostly whitespace'),
  wordCount: z.number().int().positive(),
  sessionDate: z.string().refine(recentSessionDate, 'Invalid session date'),
  sessionId: z.string().optional(),
})
export type CreateSubmissionDto = z.infer<typeof CreateSubmissionDtoSchema>
