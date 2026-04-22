import { z } from 'zod'
import { BandLevelSchema, DisciplineSchema } from './practice'

export const LessonTypeSchema = z.enum([
  'theory',
  'drill',
  'gap-fill',
  'choose-better',
  'write-short',
  'write-long',
  'listen-notice',
  'read-extract',
])
export type LessonType = z.infer<typeof LessonTypeSchema>

export const LessonRelatedItemSchema = z.object({
  text: z.string().min(1),
  category: DisciplineSchema,
  context: z.string().min(1),
})
export type LessonRelatedItem = z.infer<typeof LessonRelatedItemSchema>

const ExampleSchema = z.object({
  register: z.enum(['B1', 'B2', 'C1', 'C2']),
  text: z.string().min(1),
})

const PracticeExerciseSchema = z.object({
  prompt: z.string().min(1),
  answer: z.string().min(1),
})

export const TheoryContentSchema = z.object({
  type: z.literal('theory'),
  hook: z.string().min(1),
  explanation: z.string().min(1),
  examples: z.array(ExampleSchema).min(1),
  commonMistakes: z.array(z.string().min(1)),
  practice: z.array(PracticeExerciseSchema),
  extensionPrompt: z.string().min(1),
})
export type TheoryContent = z.infer<typeof TheoryContentSchema>

export const DrillContentSchema = z.object({
  type: z.literal('drill'),
  instruction: z.string().min(1),
  questions: z
    .array(
      z.object({
        prompt: z.string().min(1),
        options: z.array(z.string()).min(2),
        answerIndex: z.number().int().min(0),
      }),
    )
    .min(1),
})
export type DrillContent = z.infer<typeof DrillContentSchema>

export const GapFillContentSchema = z.object({
  type: z.literal('gap-fill'),
  instruction: z.string().min(1),
  sentences: z
    .array(
      z.object({
        before: z.string(),
        after: z.string(),
        answer: z.string().min(1),
      }),
    )
    .min(1),
})
export type GapFillContent = z.infer<typeof GapFillContentSchema>

export const ChooseBetterContentSchema = z.object({
  type: z.literal('choose-better'),
  instruction: z.string().min(1),
  pairs: z
    .array(
      z.object({
        a: z.string().min(1),
        b: z.string().min(1),
        /** Which option is the examiner's pick (0 = a, 1 = b). */
        betterIndex: z.union([z.literal(0), z.literal(1)]),
        rationale: z.string().min(1),
      }),
    )
    .min(1),
})
export type ChooseBetterContent = z.infer<typeof ChooseBetterContentSchema>

export const WriteShortContentSchema = z.object({
  type: z.literal('write-short'),
  prompt: z.string().min(1),
  minWords: z.number().int().min(20).max(200),
  suggestedChunks: z.array(z.string()).default([]),
})
export type WriteShortContent = z.infer<typeof WriteShortContentSchema>

export const WriteLongContentSchema = z.object({
  type: z.literal('write-long'),
  prompt: z.string().min(1),
  minWords: z.number().int().min(150).max(500),
  suggestedChunks: z.array(z.string()).default([]),
})
export type WriteLongContent = z.infer<typeof WriteLongContentSchema>

export const ListenNoticeContentSchema = z.object({
  type: z.literal('listen-notice'),
  audioUrl: z.string().min(1),
  transcript: z.string().min(1),
  targetCount: z.number().int().min(1).max(20),
})
export type ListenNoticeContent = z.infer<typeof ListenNoticeContentSchema>

export const ReadExtractContentSchema = z.object({
  type: z.literal('read-extract'),
  passage: z.string().min(1),
  targetCount: z.number().int().min(1).max(20),
})
export type ReadExtractContent = z.infer<typeof ReadExtractContentSchema>

export const LessonContentSchema = z.discriminatedUnion('type', [
  TheoryContentSchema,
  DrillContentSchema,
  GapFillContentSchema,
  ChooseBetterContentSchema,
  WriteShortContentSchema,
  WriteLongContentSchema,
  ListenNoticeContentSchema,
  ReadExtractContentSchema,
])
export type LessonContent = z.infer<typeof LessonContentSchema>

export const LessonSchema = z.object({
  id: z.string().min(1),
  discipline: DisciplineSchema,
  level: BandLevelSchema,
  type: LessonTypeSchema,
  estimatedMinutes: z.number().int().min(1).max(120),
  title: z.string().min(1),
  description: z.string().min(1),
  content: LessonContentSchema,
  relatedItems: z.array(LessonRelatedItemSchema).default([]),
})
export type Lesson = z.infer<typeof LessonSchema>
