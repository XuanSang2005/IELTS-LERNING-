import { z } from 'zod'

export const DisciplineSchema = z.enum(['grammar', 'vocabulary', 'collocations', 'linking'])
export type Discipline = z.infer<typeof DisciplineSchema>

export const ErrorCategorySchema = z.enum([
  'grammar',
  'lexis',
  'cohesion',
  'task-fulfillment',
  'pronunciation',
])
export type ErrorCategory = z.infer<typeof ErrorCategorySchema>

export const PhaseSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
export type Phase = z.infer<typeof PhaseSchema>

export const ReviewQualitySchema = z.enum(['forgot', 'hard', 'good', 'easy'])
export type ReviewQuality = z.infer<typeof ReviewQualitySchema>

export const StepNumberSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
])
export type StepNumber = z.infer<typeof StepNumberSchema>

export const NoticingItemSourceSchema = z.enum(['system', 'user'])
export type NoticingItemSource = z.infer<typeof NoticingItemSourceSchema>

export const NoticingItemSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  category: DisciplineSchema,
  context: z.string(),
  /** Where the item came from: 'system' = seeded/imported, 'user' = captured by the learner. */
  source: NoticingItemSourceSchema.default('user'),
  /** Optional human-readable provenance: "Lesson 03", "Netflix: The Queen's Gambit". */
  sourceRef: z.string().optional(),
  /** User-written note on why the item caught attention — editable on any item. */
  note: z.string().optional(),
  capturedDate: z.string(),
  nextReviewDate: z.string(),
  interval: z.number().int().min(0),
  ease: z.number().min(1.3).max(2.8),
  reviewCount: z.number().int().min(0),
  retired: z.boolean(),
  editedAt: z.string().optional(),
})
export type NoticingItem = z.infer<typeof NoticingItemSchema>

export const AddNoticingItemDtoSchema = z.object({
  text: z.string().min(1).max(200),
  category: DisciplineSchema,
  context: z.string().min(1).max(500),
  sourceRef: z.string().max(100).optional(),
  note: z.string().max(500).optional(),
})
export type AddNoticingItemDto = z.infer<typeof AddNoticingItemDtoSchema>

export const UpdateNoticingItemDtoSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  category: DisciplineSchema.optional(),
  context: z.string().min(1).max(500).optional(),
  sourceRef: z.string().max(100).optional(),
  note: z.string().max(500).optional(),
})
export type UpdateNoticingItemDto = z.infer<typeof UpdateNoticingItemDtoSchema>

export const NoteOnItemDtoSchema = z.object({
  note: z.string().max(500),
})
export type NoteOnItemDto = z.infer<typeof NoteOnItemDtoSchema>

export const ReviewItemDtoSchema = z.object({
  quality: ReviewQualitySchema,
})
export type ReviewItemDto = z.infer<typeof ReviewItemDtoSchema>

export const ErrorEntrySchema = z.object({
  id: z.string(),
  category: ErrorCategorySchema,
  original: z.string(),
  correction: z.string(),
  note: z.string().optional(),
  date: z.string(),
  source: z.string().optional(),
})
export type ErrorEntry = z.infer<typeof ErrorEntrySchema>

export const AddErrorDtoSchema = z.object({
  category: ErrorCategorySchema,
  original: z.string().min(1),
  correction: z.string().min(1),
  note: z.string().optional(),
  source: z.string().optional(),
})
export type AddErrorDto = z.infer<typeof AddErrorDtoSchema>

export const DailyLogSchema = z.object({
  date: z.string(),
  stepsCompleted: z.array(StepNumberSchema),
  itemsCaptured: z.number().int().min(0),
  wordsWritten: z.number().int().min(0),
  minutesSpent: z.number().int().min(0),
})
export type DailyLog = z.infer<typeof DailyLogSchema>

export const IncrementWordsDtoSchema = z.object({
  n: z.number().int().min(0).max(10_000),
})
export type IncrementWordsDto = z.infer<typeof IncrementWordsDtoSchema>

export const DisciplineProgressSchema = z.object({
  completed: z.number().int().min(0),
  total: z.number().int().min(0),
})
export type DisciplineProgress = z.infer<typeof DisciplineProgressSchema>

export const BandLevelSchema = z.enum(['foundation', 'intermediate', 'advanced', 'mastery'])
export type BandLevel = z.infer<typeof BandLevelSchema>

export const BandRangeSchema = z.object({
  level: BandLevelSchema,
  estimatedBand: z.number().min(4).max(9),
  range: z.tuple([z.number(), z.number()]),
  confidence: z.enum(['low', 'medium', 'high']),
  setBy: z.enum(['diagnostic', 'algorithm', 'user-override']),
  updatedAt: z.string(),
})
export type BandRange = z.infer<typeof BandRangeSchema>

export const PerformanceMetricsSchema = z.object({
  weeklyTestScores: z
    .array(
      z.object({
        week: z.number().int(),
        skill: z.enum(['listening', 'reading']),
        rawScore: z.number(),
        total: z.number(),
        band: z.number(),
      }),
    )
    .default([]),
  reviewAccuracy: z
    .array(
      z.object({
        week: z.number().int(),
        correctCount: z.number().int(),
        totalCount: z.number().int(),
        averageEase: z.number(),
      }),
    )
    .default([]),
  writingBands: z
    .array(
      z.object({
        week: z.number().int(),
        band: z.number(),
      }),
    )
    .default([]),
})
export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>

export const UserProfileSchema = z.object({
  name: z.string(),
  startingBand: z.number().min(0).max(9),
  targetBand: z.number().min(0).max(9),
  currentWeek: z.number().int().min(1).max(12),
  phase: PhaseSchema,
  startDate: z.string(),
  disciplineProgress: z.object({
    grammar: DisciplineProgressSchema,
    vocabulary: DisciplineProgressSchema,
    collocations: DisciplineProgressSchema,
    linking: DisciplineProgressSchema,
  }),
  currentBand: BandRangeSchema,
  performance: PerformanceMetricsSchema,
  lastBandReassessment: z.string().nullable(),
})
export type UserProfile = z.infer<typeof UserProfileSchema>

export const UpdateProfileDtoSchema = UserProfileSchema.partial()
export type UpdateProfileDto = z.infer<typeof UpdateProfileDtoSchema>

export const SetBandDtoSchema = z.object({
  level: BandLevelSchema,
})
export type SetBandDto = z.infer<typeof SetBandDtoSchema>

export const PracticeStateSchema = z.object({
  profile: UserProfileSchema,
  noticingItems: z.array(NoticingItemSchema),
  errors: z.array(ErrorEntrySchema),
  dailyLogs: z.array(DailyLogSchema),
})
export type PracticeStateShape = z.infer<typeof PracticeStateSchema>
