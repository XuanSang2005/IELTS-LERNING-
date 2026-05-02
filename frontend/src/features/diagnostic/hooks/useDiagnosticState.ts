import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnswerValue } from '@shared/schemas/test'

type DiagnosticStep = 'landing' | 'listening' | 'reading' | 'writing' | 'grading' | 'result'

interface DiagnosticState {
  step: DiagnosticStep
  startedAt: number | null
  listeningAnswers: Record<string, AnswerValue>
  readingAnswers: Record<string, AnswerValue>
  writingText: string
  setStep: (step: DiagnosticStep) => void
  start: () => void
  setListeningAnswer: (questionId: string, value: AnswerValue) => void
  setReadingAnswer: (questionId: string, value: AnswerValue) => void
  setWritingText: (text: string) => void
  reset: () => void
}

const INITIAL: Pick<
  DiagnosticState,
  'step' | 'startedAt' | 'listeningAnswers' | 'readingAnswers' | 'writingText'
> = {
  step: 'landing',
  startedAt: null,
  listeningAnswers: {},
  readingAnswers: {},
  writingText: '',
}

/**
 * Persisted local state for an in-flight diagnostic. Survives page refresh
 * via localStorage; cleared on `reset()` after the result is shown.
 */
export const useDiagnosticState = create<DiagnosticState>()(
  persist(
    (set) => ({
      ...INITIAL,
      setStep: (step) => set({ step }),
      start: () => set({ step: 'listening', startedAt: Date.now() }),
      setListeningAnswer: (questionId, value) =>
        set((s) => ({
          listeningAnswers: { ...s.listeningAnswers, [questionId]: value },
        })),
      setReadingAnswer: (questionId, value) =>
        set((s) => ({
          readingAnswers: { ...s.readingAnswers, [questionId]: value },
        })),
      setWritingText: (text) => set({ writingText: text }),
      reset: () => set(INITIAL),
    }),
    {
      name: 'meridian-diagnostic-v1',
      version: 1,
    },
  ),
)
