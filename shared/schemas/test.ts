import { z } from 'zod'

export const QuestionTypeSchema = z.enum([
  'multiple-choice',
  'multi-select',
  'matching',
  'plan-map-diagram',
  'form-completion',
  'note-table-completion',
  'flow-chart-completion',
  'sentence-completion',
  'short-answer',
  'true-false-not-given',
  'yes-no-not-given',
  'matching-information',
  'matching-headings',
  'summary-completion',
])
export type QuestionType = z.infer<typeof QuestionTypeSchema>

export const SkillSchema = z.enum(['listening', 'reading', 'writing', 'speaking'])
export type Skill = z.infer<typeof SkillSchema>

export const DifficultySchema = z.enum(['foundation', 'intermediate', 'advanced'])
export type Difficulty = z.infer<typeof DifficultySchema>

export const TestModeSchema = z.enum(['full', 'short'])
export type TestMode = z.infer<typeof TestModeSchema>

const BaseQuestion = z.object({
  id: z.string(),
  number: z.number().int().min(1),
  type: QuestionTypeSchema,
  prompt: z.string().optional(),
  explanation: z.string(),
})

const TextBlank = z.object({
  id: z.string(),
  correctAnswer: z.string(),
  acceptableVariants: z.array(z.string()).default([]),
  maxWords: z.number().int().default(3),
})

const KeyTextOption = z.object({ key: z.string(), text: z.string() })

export const QuestionSchema = z.discriminatedUnion('type', [
  BaseQuestion.extend({
    type: z.literal('multiple-choice'),
    options: z.array(KeyTextOption),
    correctAnswer: z.string(),
  }),
  BaseQuestion.extend({
    type: z.literal('multi-select'),
    options: z.array(KeyTextOption),
    correctAnswers: z.array(z.string()),
    selectCount: z.number().int(),
  }),
  BaseQuestion.extend({
    type: z.literal('matching'),
    items: z.array(z.object({ id: z.string(), text: z.string() })),
    options: z.array(KeyTextOption),
    correctMapping: z.record(z.string(), z.string()),
  }),
  BaseQuestion.extend({
    type: z.literal('plan-map-diagram'),
    imageUrl: z.string(),
    labels: z.array(
      z.object({
        id: z.string(),
        x: z.number(),
        y: z.number(),
      }),
    ),
    options: z.array(KeyTextOption),
    correctMapping: z.record(z.string(), z.string()),
  }),
  BaseQuestion.extend({
    type: z.literal('form-completion'),
    template: z.string(),
    blanks: z.array(TextBlank),
  }),
  BaseQuestion.extend({
    type: z.literal('note-table-completion'),
    tableHtml: z.string(),
    blanks: z.array(TextBlank),
  }),
  BaseQuestion.extend({
    type: z.literal('flow-chart-completion'),
    steps: z.array(z.object({ id: z.string(), text: z.string(), hasBlank: z.boolean() })),
    blanks: z.array(TextBlank),
  }),
  BaseQuestion.extend({
    type: z.literal('sentence-completion'),
    sentenceBefore: z.string(),
    sentenceAfter: z.string(),
    correctAnswer: z.string(),
    acceptableVariants: z.array(z.string()).default([]),
    maxWords: z.number().int().default(3),
  }),
  BaseQuestion.extend({
    type: z.literal('short-answer'),
    question: z.string(),
    correctAnswer: z.string(),
    acceptableVariants: z.array(z.string()).default([]),
    maxWords: z.number().int().default(3),
  }),
  BaseQuestion.extend({
    type: z.literal('true-false-not-given'),
    statement: z.string(),
    correctAnswer: z.enum(['TRUE', 'FALSE', 'NOT GIVEN']),
  }),
  BaseQuestion.extend({
    type: z.literal('yes-no-not-given'),
    statement: z.string(),
    correctAnswer: z.enum(['YES', 'NO', 'NOT GIVEN']),
  }),
  BaseQuestion.extend({
    type: z.literal('matching-information'),
    statement: z.string(),
    paragraphLabels: z.array(z.string()),
    correctAnswer: z.string(),
  }),
  BaseQuestion.extend({
    type: z.literal('matching-headings'),
    paragraphId: z.string(),
    headings: z.array(KeyTextOption),
    correctAnswer: z.string(),
  }),
  BaseQuestion.extend({
    type: z.literal('summary-completion'),
    summaryTemplate: z.string(),
    wordBank: z.array(KeyTextOption).optional(),
    blanks: z.array(TextBlank),
  }),
])
export type Question = z.infer<typeof QuestionSchema>

export const QuestionGroupSchema = z.object({
  id: z.string(),
  instruction: z.string(),
  questions: z.array(QuestionSchema),
})
export type QuestionGroup = z.infer<typeof QuestionGroupSchema>

export const ListeningSectionSchema = z.object({
  id: z.string(),
  number: z.number().int().min(1).max(4),
  title: z.string(),
  audioUrl: z.string().nullable(),
  transcript: z.string(),
  groups: z.array(QuestionGroupSchema),
})
export type ListeningSection = z.infer<typeof ListeningSectionSchema>

export const VocabularyEntrySchema = z.object({
  term: z.string(),
  definition: z.string(),
  translation: z.string().optional(),
})
export type VocabularyEntry = z.infer<typeof VocabularyEntrySchema>

export const ReadingPassageSchema = z.object({
  id: z.string(),
  number: z.number().int().min(1).max(3),
  title: z.string(),
  bodyHtml: z.string(),
  wordCount: z.number().int(),
  vocabulary: z.array(VocabularyEntrySchema).default([]),
  groups: z.array(QuestionGroupSchema),
})
export type ReadingPassage = z.infer<typeof ReadingPassageSchema>

export const WritingPromptSchema = z.object({
  task: z.union([z.literal(1), z.literal(2)]),
  title: z.string(),
  prompt: z.string(),
  imageUrl: z.string().optional(),
  wordMin: z.number().int(),
  minutes: z.number().int(),
})
export type WritingPrompt = z.infer<typeof WritingPromptSchema>

export const SpeakingPromptSchema = z.object({
  part: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  title: z.string(),
  /** For Part 1 and 3 these are the discussion questions; for Part 2 the first entry is the long-turn card prompt. */
  questions: z.array(z.string()).min(1),
  prepSeconds: z.number().int(),
  speakSeconds: z.number().int(),
})
export type SpeakingPrompt = z.infer<typeof SpeakingPromptSchema>

/**
 * Canned per-test feedback used by the Writing/Speaking mock grader during the
 * scaffold phase. Replaced by real Claude grading later — at that point this
 * field can be removed from seed data.
 */
export const MockTestFeedbackSchema = z.object({
  summary: z.string(),
  criteriaFeedback: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  criteriaOffsets: z.tuple([z.number(), z.number(), z.number(), z.number()]),
})
export type MockTestFeedback = z.infer<typeof MockTestFeedbackSchema>

export const TestSchema = z
  .object({
    id: z.string(),
    skill: SkillSchema,
    title: z.string(),
    description: z.string(),
    difficulty: DifficultySchema,
    fullDurationMinutes: z.number().int(),
    shortDurationMinutes: z.number().int().default(20),
    totalQuestions: z.number().int(),
    sections: z.array(ListeningSectionSchema).optional(),
    passages: z.array(ReadingPassageSchema).optional(),
    tasks: z.array(WritingPromptSchema).optional(),
    parts: z.array(SpeakingPromptSchema).optional(),
    mockFeedback: MockTestFeedbackSchema.optional(),
    isPro: z.boolean().default(false),
    publishedAt: z.string(),
    /** Editorial tags, e.g. ["IELTS Academic", "Listening"]. Optional; defaults to empty. */
    tags: z.array(z.string()).default([]),
    /** Stats shown on the test card; missing fields render as em-dashes. */
    participantsCount: z.number().int().nonnegative().optional(),
    playsCount: z.number().int().nonnegative().optional(),
  })
  .refine(
    (t) => {
      switch (t.skill) {
        case 'listening':
          return !!t.sections
        case 'reading':
          return !!t.passages
        case 'writing':
          return !!t.tasks && t.tasks.length === 2
        case 'speaking':
          return !!t.parts && t.parts.length === 3
      }
    },
    {
      message:
        'Listening needs sections, Reading needs passages, Writing needs 2 tasks, Speaking needs 3 parts',
    },
  )
export type Test = z.infer<typeof TestSchema>

export const AnswerValueSchema = z.union([
  z.string(),
  z.array(z.string()),
  z.record(z.string(), z.string()),
])
export type AnswerValue = z.infer<typeof AnswerValueSchema>

export const AnswerSchema = z.object({
  questionId: z.string(),
  value: AnswerValueSchema,
  flaggedForReview: z.boolean().default(false),
})
export type Answer = z.infer<typeof AnswerSchema>

export const TestSubmissionSchema = z.object({
  testId: z.string(),
  mode: TestModeSchema,
  startedAt: z.string(),
  submittedAt: z.string(),
  answers: z.array(AnswerSchema),
  timeSpentSeconds: z.number().int(),
})
export type TestSubmission = z.infer<typeof TestSubmissionSchema>

export const ResultQuestionSchema = z.object({
  questionId: z.string(),
  userAnswer: z.union([AnswerValueSchema, z.null()]),
  correctAnswer: AnswerValueSchema,
  isCorrect: z.boolean(),
  explanation: z.string(),
  questionType: QuestionTypeSchema,
})
export type ResultQuestion = z.infer<typeof ResultQuestionSchema>

export const TestResultSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  testId: z.string(),
  submittedAt: z.string(),
  rawScore: z.number().int(),
  totalQuestions: z.number().int(),
  estimatedBand: z.number(),
  bandRange: z.tuple([z.number(), z.number()]),
  timeSpentSeconds: z.number().int(),
  mode: TestModeSchema,
  results: z.array(ResultQuestionSchema),
  byQuestionType: z.record(
    z.string(),
    z.object({ correct: z.number().int(), total: z.number().int() }),
  ) as unknown as z.ZodType<Partial<Record<QuestionType, { correct: number; total: number }>>>,
})
export type TestResult = z.infer<typeof TestResultSchema>
