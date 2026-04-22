import { useMemo, useState } from 'react'
import type { SessionStep } from '@/features/practice/utils/session-planner'
import { useIncrementWordsMutation } from '@/features/practice/hooks/practice-mutations'
import { useCreateSubmissionMutation } from '@/features/practice/hooks/submissions'
import { StepShell } from './StepShell'

interface WritingTaskStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  prompt: string
  minWords: number
  onAdvance: () => void
  onAdvanceWithSubmission?: (submissionId: string) => void
  onPrev?: () => void
}

function countWords(text: string): number {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function WritingTaskStep({
  step,
  stepNumber,
  totalSteps,
  prompt,
  minWords,
  onAdvance,
  onAdvanceWithSubmission,
  onPrev,
}: WritingTaskStepProps) {
  const [draft, setDraft] = useState('')
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createSubmission = useCreateSubmissionMutation()
  const incrementWords = useIncrementWordsMutation()

  const words = useMemo(() => countWords(draft), [draft])
  const canSubmit = words >= minWords && !submittedId && !createSubmission.isPending

  const handleSubmitEssay = async () => {
    if (words < minWords) return
    setSubmitError(null)
    try {
      const submission = await createSubmission.mutateAsync({
        type: 'task2',
        prompt,
        content: draft.trim(),
        wordCount: words,
        sessionDate: todayIso(),
      })
      setSubmittedId(submission.id)
      incrementWords.mutate(words)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message.toLowerCase().includes('limit')
          ? "You've reached today's limit. Return tomorrow at nine."
          : 'The signal is weak. Try again in a moment.',
      )
    }
  }

  const handleContinue = () => {
    if (submittedId && onAdvanceWithSubmission) {
      onAdvanceWithSubmission(submittedId)
      return
    }
    onAdvance()
  }

  const footnote = submittedId
    ? 'Submitted. The examiner will respond within minutes.'
    : words < minWords
      ? `${minWords - words} more words to reach the minimum.`
      : 'Minimum reached. Submit to send it to the examiner, then continue.'

  return (
    <StepShell
      step={step}
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      canContinue={Boolean(submittedId)}
      onContinue={handleContinue}
      onPrev={onPrev}
      footnote={footnote}
    >
      <div className="max-w-[72ch]">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ PROMPT · MIN {minWords} WORDS
        </p>
        <p className="mt-3 font-fraunces text-[24px] italic leading-relaxed text-ink">
          &ldquo;{prompt}&rdquo;
        </p>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Begin writing&hellip;"
          rows={12}
          disabled={Boolean(submittedId) || createSubmission.isPending}
          className="mt-8 block w-full resize-none border border-line bg-transparent p-5 font-fraunces text-[20px] leading-relaxed text-ink placeholder:text-graphite/50 focus:border-claret focus:outline-none disabled:opacity-70"
        />

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            WORDS · <span className={words >= minWords ? 'text-sage' : 'text-ink'}>{words}</span> /{' '}
            {minWords}
          </p>

          {!submittedId && (
            <button
              type="button"
              onClick={() => void handleSubmitEssay()}
              disabled={!canSubmit}
              className="ml-auto border border-ink px-5 py-2.5 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              {createSubmission.isPending ? 'Submitting…' : 'Send to examiner'}
            </button>
          )}
          {submittedId && (
            <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
              ◆ SENT
            </p>
          )}
        </div>

        {submitError && (
          <p className="mt-4 border-l-2 border-claret pl-4 font-fraunces text-[18px] italic text-claret">
            {submitError}
          </p>
        )}
      </div>
    </StepShell>
  )
}
