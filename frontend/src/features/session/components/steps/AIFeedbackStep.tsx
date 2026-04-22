import { useMemo, useState } from 'react'
import type { Annotation, Submission } from '@shared/schemas/submission'
import type { SessionStep } from '@/features/practice/utils/session-planner'
import {
  useRetryGradingMutation,
  useSubmissionQuery,
  useTodaySubmissionQuery,
} from '@/features/practice/hooks/submissions'
import { StepShell } from './StepShell'
import { EssayWithAnnotations } from './EssayWithAnnotations'
import { BandBreakdownCard } from './BandBreakdownCard'

interface AIFeedbackStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  submissionId: string
  onAdvance: () => void
  onPrev?: () => void
}

const CATEGORY_LABEL: Record<Annotation['category'], string> = {
  'task-response': 'Task Response',
  'coherence-cohesion': 'Coherence & Cohesion',
  'lexical-resource': 'Lexical Resource',
  'grammatical-range': 'Grammatical Range',
}

const SEVERITY_LABEL: Record<Annotation['severity'], string> = {
  minor: 'MINOR',
  moderate: 'MODERATE',
  major: 'MAJOR',
}

export function AIFeedbackStep({
  step,
  stepNumber,
  totalSteps,
  submissionId,
  onAdvance,
  onPrev,
}: AIFeedbackStepProps) {
  // URL submissionId wins; otherwise fall back to today's most-recent submission.
  const hasUrlId = submissionId && submissionId !== 'latest' && submissionId.length > 0
  const todayQuery = useTodaySubmissionQuery()
  const targetId = hasUrlId ? submissionId : todayQuery.data?.id ?? null

  const submissionQuery = useSubmissionQuery(targetId)
  const retryGrading = useRetryGradingMutation()

  const submission: Submission | null | undefined = useMemo(() => {
    if (hasUrlId) return submissionQuery.data
    return todayQuery.data
  }, [hasUrlId, submissionQuery.data, todayQuery.data])

  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null)

  const common = { step, stepNumber, totalSteps, onContinue: onAdvance, onPrev }

  // State 1 — no submission exists
  if (!hasUrlId && todayQuery.isSuccess && !todayQuery.data) {
    return (
      <StepShell {...common}>
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            ◆ EXAMINER · AWAITING
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            Nothing to read yet.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            The examiner returns when you have written. Complete today&rsquo;s writing step first.
          </p>
        </div>
      </StepShell>
    )
  }

  // Loading the submission itself
  if (!submission) {
    return (
      <StepShell {...common}>
        <div className="max-w-[64ch]">
          <p className="font-fraunces text-[21px] italic text-graphite">
            Opening the examiner&rsquo;s folder&hellip;
          </p>
        </div>
      </StepShell>
    )
  }

  // State 2 — grading in progress
  if (submission.status === 'submitted' || submission.status === 'grading') {
    return (
      <StepShell {...common}>
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            ◆ EXAMINER · AT WORK
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            Your essay is being read.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            Usually ten to twenty seconds. This page will update when the examiner finishes.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            STATUS · {submission.status.toUpperCase()}
          </p>
        </div>
      </StepShell>
    )
  }

  // State 4 — grading failed
  if (submission.status === 'failed') {
    return (
      <StepShell {...common}>
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            ◆ EXAMINER · UNAVAILABLE
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            The examiner could not read your essay.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            This sometimes happens. Your essay is saved &mdash; ask the examiner to try again.
          </p>
          {submission.error && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              REASON · {submission.error}
            </p>
          )}
          <button
            type="button"
            onClick={() => void retryGrading.mutateAsync(submission.id)}
            disabled={retryGrading.isPending}
            className="mt-6 border border-ink px-5 py-2.5 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory disabled:cursor-wait disabled:opacity-60"
          >
            {retryGrading.isPending ? 'Retrying…' : 'Ask again'}
          </button>
        </div>
      </StepShell>
    )
  }

  // State 3 — graded successfully
  const grading = submission.grading
  if (!grading) {
    // Shouldn't happen; defensive fallback.
    return (
      <StepShell {...common}>
        <p className="font-fraunces text-[21px] italic text-graphite">
          The folder is empty. Please refresh.
        </p>
      </StepShell>
    )
  }

  const activeAnnotation =
    activeAnnotationId != null
      ? grading.annotations.find((a) => a.id === activeAnnotationId) ?? null
      : null

  return (
    <StepShell {...common}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
            ◆ YOUR ESSAY · ANNOTATED
          </p>
          <div className="mt-4 border border-line bg-bone p-8 md:p-10">
            <EssayWithAnnotations
              text={submission.content}
              annotations={grading.annotations}
              activeId={activeAnnotationId}
              onSelect={(a) => setActiveAnnotationId(a.id)}
            />
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            {grading.annotations.length} ANNOTATION{grading.annotations.length === 1 ? '' : 'S'} ·
            CLICK ANY UNDERLINED PASSAGE FOR THE COMMENT
          </p>

          <BandBreakdownCard grading={grading} />

          <div className="mt-8 border-l-2 border-claret pl-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
              EXAMINER&rsquo;S NOTE
            </p>
            <p className="font-fraunces text-[21px] italic leading-relaxed text-graphite">
              {grading.overallNote}
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
            ANNOTATION DETAIL
          </p>
          {activeAnnotation ? (
            <div className="mt-4 border border-line bg-ivory p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-claret">
                {CATEGORY_LABEL[activeAnnotation.category]} ·{' '}
                {SEVERITY_LABEL[activeAnnotation.severity]}
              </p>
              <p className="mt-4 font-fraunces text-[20px] leading-relaxed text-ink">
                {activeAnnotation.comment}
              </p>
              {activeAnnotation.suggestion && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                    SUGGESTION
                  </p>
                  <p className="mt-2 font-fraunces text-[19px] italic leading-relaxed text-graphite">
                    {activeAnnotation.suggestion}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setActiveAnnotationId(null)}
                className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite hover:text-ink"
              >
                Close
              </button>
            </div>
          ) : (
            <p className="mt-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
              Tap any underlined passage in the essay to read the examiner&rsquo;s comment.
            </p>
          )}
        </aside>
      </div>
    </StepShell>
  )
}
