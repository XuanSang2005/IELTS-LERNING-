import { create } from 'zustand'
import type { Answer, AnswerValue, TestMode } from '@shared/schemas/test'

interface RunnerState {
  testId: string | null
  mode: TestMode | null
  startedAt: string | null
  answers: Record<string, Answer>
  currentQuestionId: string | null
  flagged: Record<string, boolean>

  start: (testId: string, mode: TestMode) => void
  setAnswer: (questionId: string, value: AnswerValue) => void
  toggleFlag: (questionId: string) => void
  setCurrentQuestion: (questionId: string | null) => void
  reset: () => void
}

const INITIAL: Pick<
  RunnerState,
  'testId' | 'mode' | 'startedAt' | 'answers' | 'currentQuestionId' | 'flagged'
> = {
  testId: null,
  mode: null,
  startedAt: null,
  answers: {},
  currentQuestionId: null,
  flagged: {},
}

export const useTestRunnerStore = create<RunnerState>((set) => ({
  ...INITIAL,
  start: (testId, mode) =>
    set({
      ...INITIAL,
      testId,
      mode,
      startedAt: new Date().toISOString(),
    }),
  setAnswer: (questionId, value) =>
    set((s) => ({
      answers: {
        ...s.answers,
        [questionId]: {
          questionId,
          value,
          flaggedForReview: s.answers[questionId]?.flaggedForReview ?? false,
        },
      },
    })),
  toggleFlag: (questionId) =>
    set((s) => ({
      flagged: { ...s.flagged, [questionId]: !s.flagged[questionId] },
      answers: s.answers[questionId]
        ? {
            ...s.answers,
            [questionId]: {
              ...s.answers[questionId],
              flaggedForReview: !s.flagged[questionId],
            },
          }
        : s.answers,
    })),
  setCurrentQuestion: (questionId) => set({ currentQuestionId: questionId }),
  reset: () => set({ ...INITIAL }),
}))
