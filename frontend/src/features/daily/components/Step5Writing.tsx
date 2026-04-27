import { useMemo, useState } from 'react'
import type { DailyWriting } from '@shared/schemas/daily-unit'
import type { BandLevel } from '@shared/schemas/practice'
import {
  useRetryGradingMutation,
  useSubmissionQuery,
  useTodaySubmissionQuery,
} from '@/features/practice/hooks/submissions'
import { useCreateSubmissionMutation } from '@/features/practice/hooks/submissions'
import { useIncrementWordsMutation } from '@/features/practice/hooks/practice-mutations'
import { DAILY_STEPS, WRITING_MIN_WORDS_BY_LEVEL } from '../data/step-config'
import { DailyShell } from './DailyShell'

const STEP = DAILY_STEPS[4]

const CATEGORY_LABEL: Record<string, string> = {
  'task-response': 'Task Response',
  'coherence-cohesion': 'Coherence & Cohesion',
  'lexical-resource': 'Lexical Resource',
  'grammatical-range': 'Grammatical Range',
}

interface Step5WritingProps {
  writing: DailyWriting | null | undefined
  level: BandLevel
  onAdvance: () => void
  onPrev: () => void
}

function countWords(text: string): number {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length
}

export function Step5Writing({ writing, level, onAdvance, onPrev }: Step5WritingProps) {
  const [draft, setDraft] = useState('')
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const createSubmission = useCreateSubmissionMutation()
  const incrementWords = useIncrementWordsMutation()
  const retryGrading = useRetryGradingMutation()

  // After submission, poll backend for the graded result.
  const todayQuery = useTodaySubmissionQuery()
  const submissionQuery = useSubmissionQuery(submittedId)
  const submission = submittedId ? submissionQuery.data : todayQuery.data

  const minWords = writing?.minWords ?? WRITING_MIN_WORDS_BY_LEVEL[level]
  const words = useMemo(() => countWords(draft), [draft])
  const canSubmit = words >= minWords && !submittedId && !createSubmission.isPending

  if (!writing) {
    return (
      <DailyShell step={STEP} onContinue={onAdvance} onPrev={onPrev} isLastStep>
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ PROMPT FORTHCOMING
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            Today’s prompt is still in the editor’s hands.
          </h3>
        </div>
      </DailyShell>
    )
  }

  const handleSubmit = async () => {
    if (words < minWords) return
    setSubmitError(null)
    try {
      const sub = await createSubmission.mutateAsync({
        type: 'task2',
        prompt: writing.prompt,
        content: draft.trim(),
        wordCount: words,
        sessionDate: new Date().toISOString().slice(0, 10),
      })
      setSubmittedId(sub.id)
      incrementWords.mutate(words)
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message.toLowerCase().includes('limit')
          ? 'You have reached today’s grading limit. Return tomorrow.'
          : 'The signal is weak. Try again in a moment.',
      )
    }
  }

  const isGraded = submission?.status === 'graded' && submission.grading
  const isGrading = submission?.status === 'submitted' || submission?.status === 'grading'
  const isFailed = submission?.status === 'failed'

  const footnote = isGraded
    ? 'The examiner has read your essay.'
    : isGrading
      ? 'The examiner is reading…'
      : submittedId
        ? 'Submitted.'
        : words < minWords
          ? `${minWords - words} more words to reach the minimum.`
          : 'Minimum reached. Send to the examiner.'

  return (
    <DailyShell
      step={STEP}
      canContinue={Boolean(isGraded || isFailed || submittedId)}
      onContinue={onAdvance}
      onPrev={onPrev}
      isLastStep
      footnote={footnote}
      continueLabel={isGraded || isFailed ? 'Complete the session' : 'Skip and complete'}
    >
      <div className="flex flex-col gap-12">
        {/* Prompt + editor — full width */}
        <section className="w-full">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ PROMPT · MIN {minWords} WORDS
          </p>
          <p className="mt-3 w-full font-fraunces text-[clamp(22px,2vw,28px)] italic leading-relaxed text-ink">
            “{writing.prompt}”
          </p>
          {writing.guidance && (
            <p className="mt-3 w-full font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              GUIDANCE · {writing.guidance}
            </p>
          )}

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Begin writing…"
            rows={20}
            disabled={Boolean(submittedId) || createSubmission.isPending}
            className="mt-8 block w-full resize-none border border-line bg-transparent p-8 font-fraunces text-[20px] leading-[1.7] text-ink placeholder:text-graphite/50 focus:border-claret focus:outline-none disabled:opacity-70"
          />

          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
              WORDS ·{' '}
              <span className={words >= minWords ? 'text-sage' : 'text-ink'}>{words}</span> /{' '}
              {minWords}
            </p>

            {!submittedId ? (
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={!canSubmit}
                className="group relative ml-auto inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-7 py-3 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                <span className="relative z-10">
                  {createSubmission.isPending ? 'Sending…' : 'Send to examiner'}
                </span>
                <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            ) : (
              <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                ◆ SENT TO EXAMINER
              </p>
            )}
          </div>

          {submitError && (
            <p className="mt-4 border-l-2 border-claret pl-4 font-fraunces text-[18px] italic text-claret">
              {submitError}
            </p>
          )}
        </section>

        {/* Examiner panel — full-width band that appears beneath the editor after submission. */}
        {submittedId && (
          <aside className="w-full border-t border-line pt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              ◆ EXAMINER
            </p>
            <div className="mt-3 border border-line bg-ivory p-6 md:p-10">
              {isGrading ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                    ◆ AT WORK
                  </p>
                  <p className="mt-2 font-fraunces text-[19px] italic leading-relaxed text-graphite">
                    Reading carefully. Usually ten to twenty seconds.
                  </p>
                </div>
              ) : isFailed ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                    ◆ UNAVAILABLE
                  </p>
                  <p className="mt-2 font-fraunces text-[18px] italic leading-relaxed text-graphite">
                    The examiner could not read your essay this time.
                  </p>
                  <button
                    type="button"
                    onClick={() => submission && void retryGrading.mutateAsync(submission.id)}
                    disabled={retryGrading.isPending}
                    className="mt-4 border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-ivory disabled:opacity-60"
                  >
                    {retryGrading.isPending ? 'Retrying…' : 'Ask again'}
                  </button>
                </div>
              ) : isGraded && submission?.grading ? (
                <ExaminerReport grading={submission.grading} />
              ) : null}
            </div>
          </aside>
        )}
      </div>
    </DailyShell>
  )
}

function ExaminerReport({ grading }: { grading: NonNullable<NonNullable<ReturnType<typeof useTodaySubmissionQuery>['data']>['grading']> }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        ◆ BAND ESTIMATE
      </p>
      <p className="mt-2 font-fraunces text-[clamp(40px,4vw,56px)] leading-none text-ink">
        {grading.overallBand.toFixed(1)}
      </p>

      <ul className="mt-6 space-y-3 border-t border-line pt-4">
        {(['taskResponse', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange'] as const).map(
          (key) => {
            const c = grading[key]
            const label =
              key === 'taskResponse'
                ? CATEGORY_LABEL['task-response']
                : key === 'coherenceCohesion'
                  ? CATEGORY_LABEL['coherence-cohesion']
                  : key === 'lexicalResource'
                    ? CATEGORY_LABEL['lexical-resource']
                    : CATEGORY_LABEL['grammatical-range']
            return (
              <li key={key} className="border-b border-dashed border-line pb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                    {label}
                  </span>
                  <span className="font-fraunces text-[22px] italic text-claret">
                    {c.band.toFixed(1)}
                  </span>
                </div>
                <p className="mt-1 font-fraunces text-[15px] italic leading-relaxed text-graphite md:text-[16px]">
                  {c.notes}
                </p>
              </li>
            )
          },
        )}
      </ul>

      <p className="mt-5 border-l-2 border-claret pl-4 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
        {grading.overallNote}
      </p>
    </div>
  )
}
