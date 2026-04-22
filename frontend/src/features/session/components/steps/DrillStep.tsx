import type { SessionStep } from '@/features/practice/utils/session-planner'
import { StepShell } from './StepShell'

interface DrillStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  lessonId: string
  questionCount: number
  onAdvance: () => void
  onPrev?: () => void
}

export function DrillStep({
  step,
  stepNumber,
  totalSteps,
  lessonId,
  questionCount,
  onAdvance,
  onPrev,
}: DrillStepProps) {
  const isPlaceholder = lessonId.startsWith('placeholder-')

  return (
    <StepShell
      step={step}
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      onContinue={onAdvance}
      onPrev={onPrev}
    >
      <div className="max-w-[64ch] border-l-2 border-claret pl-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
          ◆ DRILL &middot; {questionCount} QUESTIONS
        </p>
        <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
          {isPlaceholder
            ? "The drill set is being typeset."
            : 'Work through the questions below.'}
        </h3>
        <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
          {isPlaceholder
            ? "Each lesson ships with ten calibrated questions. They arrive alongside the article they practise."
            : 'Each question gives immediate feedback. Return to this step when you reach the end.'}
        </p>
      </div>
    </StepShell>
  )
}
