import { z } from 'zod'
import { BandLevelSchema, DisciplineSchema, PhaseSchema } from './practice'

export const LessonRegisterSchema = z.enum(['B1', 'B2', 'C1'])
export type LessonRegister = z.infer<typeof LessonRegisterSchema>

export const LessonExampleSchema = z.object({
  text: z.string().min(1),
  register: LessonRegisterSchema,
  gloss: z.string().optional(),
})
export type LessonExample = z.infer<typeof LessonExampleSchema>

export const LessonMistakeSchema = z.object({
  wrong: z.string().min(1),
  right: z.string().min(1),
  why: z.string().min(1),
})
export type LessonMistake = z.infer<typeof LessonMistakeSchema>

export const LessonExerciseKindSchema = z.enum(['gap-fill', 'rewrite', 'choice'])
export type LessonExerciseKind = z.infer<typeof LessonExerciseKindSchema>

export const LessonExerciseSchema = z.object({
  id: z.string().min(1),
  kind: LessonExerciseKindSchema,
  prompt: z.string().min(1),
  choices: z.array(z.string()).optional(),
  answer: z.string().min(1),
  explanation: z.string().optional(),
})
export type LessonExercise = z.infer<typeof LessonExerciseSchema>

export const LessonNoticingSchema = z.object({
  text: z.string().min(1),
  context: z.string().min(1),
  note: z.string().optional(),
})
export type LessonNoticing = z.infer<typeof LessonNoticingSchema>

export const LessonExtensionSchema = z.object({
  prompt: z.string().min(1),
  minWords: z.number().int().min(40).max(500),
})
export type LessonExtension = z.infer<typeof LessonExtensionSchema>

export const LessonSchema = z.object({
  id: z.string().min(1),
  day: z.number().int().min(1).max(120),
  week: z.number().int().min(1).max(12),
  phase: PhaseSchema,
  discipline: DisciplineSchema,
  level: BandLevelSchema,
  title: z.string().min(1),
  subtitle: z.string().min(1),
  hook: z.string().min(1),
  theory: z.string().min(1),
  examples: z.array(LessonExampleSchema).length(3),
  mistakes: z.array(LessonMistakeSchema).length(3),
  practice: z.array(LessonExerciseSchema).min(3).max(8),
  extension: LessonExtensionSchema,
  noticing: z.array(LessonNoticingSchema).min(3).max(7),
  estimatedMinutes: z.number().int().min(5).max(180),
  publishedAt: z.string(),
})
export type Lesson = z.infer<typeof LessonSchema>

export const LessonSummarySchema = LessonSchema.pick({
  id: true,
  day: true,
  week: true,
  phase: true,
  discipline: true,
  level: true,
  title: true,
  subtitle: true,
  estimatedMinutes: true,
  publishedAt: true,
})
export type LessonSummary = z.infer<typeof LessonSummarySchema>
