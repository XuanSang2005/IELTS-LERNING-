import type { SessionStep } from '@/features/practice/utils/session-planner'
import { LessonStep } from './LessonStep'
import { DrillStep } from './DrillStep'
import { NoticeCaptureStep } from './NoticeCaptureStep'
import { FlashcardReviewStep } from './FlashcardReviewStep'
import { WritingTaskStep } from './WritingTaskStep'
import { AIFeedbackStep } from './AIFeedbackStep'
import { SaveItemsStep } from './SaveItemsStep'

interface StepRouterProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  submissionId?: string
  onAdvance: () => void
  /** Advance while writing a new `submissionId` into the URL search params. */
  onAdvanceWithSubmission?: (submissionId: string) => void
  onPrev?: () => void
}

export function StepRouter({
  step,
  stepNumber,
  totalSteps,
  submissionId,
  onAdvance,
  onAdvanceWithSubmission,
  onPrev,
}: StepRouterProps) {
  const common = { step, stepNumber, totalSteps, onAdvance, onPrev }
  switch (step.action.type) {
    case 'read-lesson':
      return <LessonStep {...common} mode="read" lessonId={step.action.lessonId} />
    case 'watch-lesson':
      return <LessonStep {...common} mode="watch" lessonId={step.action.lessonId} />
    case 'drill-exercises':
      return (
        <DrillStep
          {...common}
          lessonId={step.action.lessonId}
          questionCount={step.action.questionCount}
        />
      )
    case 'notice-capture':
      return <NoticeCaptureStep {...common} targetCount={step.action.targetCount} />
    case 'flashcard-review':
      return <FlashcardReviewStep {...common} itemIds={step.action.itemIds} />
    case 'writing-task':
      return (
        <WritingTaskStep
          {...common}
          prompt={step.action.prompt}
          minWords={step.action.minWords}
          onAdvanceWithSubmission={onAdvanceWithSubmission}
        />
      )
    case 'ai-feedback':
      return (
        <AIFeedbackStep
          {...common}
          submissionId={submissionId ?? step.action.submissionId}
        />
      )
    case 'save-items':
      return <SaveItemsStep {...common} suggestedItems={step.action.suggestedItems} />
  }
}
