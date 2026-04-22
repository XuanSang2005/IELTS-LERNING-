import type { SessionStep } from '@/features/practice/utils/session-planner'
import { StepShell } from './StepShell'

interface LessonStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  mode: 'read' | 'watch'
  lessonId: string
  onAdvance: () => void
  onPrev?: () => void
}

/**
 * Renders a read/watch step. When the lesson bucket is empty (placeholder id),
 * show editorial copy instead of real content \u2014 Phase 4 will seed real lessons.
 */
export function LessonStep({
  step,
  stepNumber,
  totalSteps,
  mode,
  lessonId,
  onAdvance,
  onPrev,
}: LessonStepProps) {
  const isPlaceholder = lessonId.startsWith('placeholder-')

  return (
    <StepShell
      step={step}
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      onContinue={onAdvance}
      onPrev={onPrev}
    >
      {isPlaceholder ? (
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            ◆ EDITION FORTHCOMING
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            The {mode === 'watch' ? 'film' : 'article'} for today is still in the editor&rsquo;s
            hands.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            Every lesson is written by a Band 8.5 tutor and edited for register. New
            {mode === 'watch' ? ' recordings' : ' articles'} are released every few days &mdash;
            check back soon.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            LESSON ID &middot; {lessonId}
          </p>
        </div>
      ) : (
        <div className="max-w-[64ch] border border-line bg-bone p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            LESSON &middot; {lessonId}
          </p>
          <p className="mt-4 font-fraunces text-[21px] italic leading-relaxed text-graphite">
            {mode === 'watch' ? 'Watch the lesson above.' : 'Read the article above.'} Return here
            when you are finished.
          </p>
        </div>
      )}
    </StepShell>
  )
}
