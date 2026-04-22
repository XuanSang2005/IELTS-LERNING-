import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import type { QuestionType } from '@shared/schemas/test'
import { useTestQuery } from '@/features/tests/hooks/useTestQuery'
import {
  findLatestResultForTest,
  findResultById,
} from '@/features/tests/hooks/useTestHistoryQuery'
import {
  useWritingTestSubmissionQuery,
  useRegradeWritingTestMutation,
} from '@/features/tests/hooks/useWritingTestSubmission'
import {
  findLatestSpeakingMockSubmission,
  findSpeakingMockSubmissionById,
} from '@/features/tests/utils/speaking-mock'
import { useAuthStore } from '@/stores/auth-store'
import { ResultsScore } from '@/features/tests/components/ResultsScore'
import { ResultsLocked } from '@/features/tests/components/ResultsLocked'
import { ResultsExplanations } from '@/features/tests/components/ResultsExplanations'
import { ResultsTranscript } from '@/features/tests/components/ResultsTranscript'
import { ResultsVocabulary } from '@/features/tests/components/ResultsVocabulary'
import { WritingResults } from '@/features/tests/components/WritingResults'
import { SpeakingResults } from '@/features/tests/components/SpeakingResults'

const resultsSearchSchema = z.object({
  resultId: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/tests/$testId/results')({
  component: ResultsPage,
  validateSearch: resultsSearchSchema,
})

type Tab = 'explanations' | 'transcript' | 'vocabulary'

const TYPE_LABEL: Record<QuestionType, string> = {
  'multiple-choice': 'Multiple choice',
  'multi-select': 'Multi-select',
  matching: 'Matching',
  'plan-map-diagram': 'Map / diagram',
  'form-completion': 'Form completion',
  'note-table-completion': 'Table completion',
  'flow-chart-completion': 'Flow-chart',
  'sentence-completion': 'Sentence completion',
  'short-answer': 'Short answer',
  'true-false-not-given': 'True / False / NG',
  'yes-no-not-given': 'Yes / No / NG',
  'matching-information': 'Matching information',
  'matching-headings': 'Matching headings',
  'summary-completion': 'Summary completion',
}

function ResultsPage() {
  const { testId } = Route.useParams()
  const { resultId } = Route.useSearch()
  const { data: test } = useTestQuery(testId)
  const user = useAuthStore((s) => s.user)
  const isPro = user?.isPro ?? false
  const hasValidTrial = user?.trialEndsAt ? new Date(user.trialEndsAt) > new Date() : false
  const canAccessPro = isPro || hasValidTrial

  // All hooks above any early return.
  const [tab, setTab] = useState<Tab>('explanations')
  const result = resultId ? findResultById(resultId) : findLatestResultForTest(testId)
  const weakest = useMemo(() => {
    if (!result) return null
    let weakestType: QuestionType | null = null
    let weakestRate = 1
    for (const [typeKey, counts] of Object.entries(result.byQuestionType)) {
      if (counts.total < 1) continue
      const rate = counts.correct / counts.total
      if (rate < weakestRate) {
        weakestRate = rate
        weakestType = typeKey as QuestionType
      }
    }
    return weakestType ? { type: weakestType, ...result.byQuestionType[weakestType]! } : null
  }, [result])

  // Writing submissions are backend-persisted and polled.
  const writingQuery = useWritingTestSubmissionQuery(
    test?.skill === 'writing' && resultId ? resultId : undefined,
  )
  const regrade = useRegradeWritingTestMutation()

  // Writing — polling branch
  if (test && test.skill === 'writing') {
    if (!resultId) {
      return (
        <NoSubmissionShell message="No submission id — take the test from the library." />
      )
    }
    const sub = writingQuery.data
    if (writingQuery.isError) {
      return <NoSubmissionShell message="Could not load your submission." />
    }
    if (!sub || sub.status === 'submitted' || sub.status === 'grading') {
      return <GradingShell />
    }
    if (sub.status === 'failed') {
      return (
        <FailureShell
          message={sub.error ?? 'Grading failed. Please try again.'}
          onRetry={() => regrade.mutate(sub.id)}
          retrying={regrade.isPending}
        />
      )
    }
    if (!sub.grading) {
      return <NoSubmissionShell message="Submission is missing its grading payload." />
    }
    return <WritingResults test={test} submission={sub.grading} />
  }

  // Speaking — temporary client-side mock until its backend spec lands.
  if (test && test.skill === 'speaking') {
    const submission = resultId
      ? findSpeakingMockSubmissionById(resultId)
      : findLatestSpeakingMockSubmission(testId)
    if (!submission) {
      return (
        <NoSubmissionShell message="No submission found. Return to the library to take the test." />
      )
    }
    return <SpeakingResults test={test} submission={submission} />
  }

  if (!test || !result) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:px-10">
          <p className="font-fraunces text-[24px] italic text-graphite">
            No result found. Return to the library to take the test.
          </p>
          <Link
            to="/tests"
            className="mt-4 inline-block border-b border-line font-geist text-[18px] text-ink"
          >
            Return to library ↗
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <ResultsScore result={result} testTitle={test.title} />

      <div className="mx-auto max-w-[1720px] px-6 py-10 md:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left 7 cols — summary */}
          <section className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              SCORE SUMMARY
            </p>
            <p className="mt-3 font-fraunces text-[64px] leading-none text-ink">
              {result.rawScore} <span className="text-graphite">/ {result.totalQuestions}</span>
            </p>
            {weakest && (
              <p className="mt-6 max-w-[48ch] font-fraunces text-[21px] italic leading-relaxed text-graphite">
                A solid foundation. Your weakest question type is{' '}
                <em className="not-italic text-ink">{TYPE_LABEL[weakest.type]}</em> —{' '}
                {weakest.correct} of {weakest.total} correct.
              </p>
            )}
          </section>

          {/* Right 5 cols — by question type */}
          <section className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              BY QUESTION TYPE
            </p>
            <ul className="mt-5 space-y-4">
              {Object.entries(result.byQuestionType).map(([typeKey, counts]) => {
                const type = typeKey as QuestionType
                const pct = counts.total === 0 ? 0 : Math.round((counts.correct / counts.total) * 100)
                const isWeak = weakest?.type === type
                return (
                  <li key={type}>
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`font-fraunces text-[19px] ${
                          isWeak
                            ? 'border-b-2 border-claret text-claret'
                            : 'text-ink'
                        }`}
                      >
                        {TYPE_LABEL[type]}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                        {counts.correct} / {counts.total}
                      </span>
                    </div>
                    <div className="mt-2 h-px w-full bg-line">
                      <div
                        className={`h-full ${isWeak ? 'bg-claret' : 'bg-ink'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>

      {!canAccessPro ? (
        <ResultsLocked />
      ) : (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1720px] px-6 py-12 md:px-10 xl:px-14">
            <div className="flex flex-wrap gap-0 divide-x divide-line border-y border-line">
              {(
                [
                  { key: 'explanations', label: 'Answers & Explanations' },
                  test.skill === 'listening'
                    ? { key: 'transcript', label: 'Transcript' }
                    : { key: 'vocabulary', label: 'Vocabulary' },
                ] as Array<{ key: Tab; label: string }>
              ).map((t) => {
                const active = tab === t.key
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className={`border-b-2 px-6 py-4 font-fraunces text-[20px] transition-colors ${
                      active
                        ? 'border-claret text-claret'
                        : 'border-transparent text-ink hover:text-claret'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-10">
              {tab === 'explanations' && <ResultsExplanations test={test} result={result} />}
              {tab === 'transcript' && <ResultsTranscript test={test} />}
              {tab === 'vocabulary' && <ResultsVocabulary test={test} />}
            </div>
          </div>
        </section>
      )}

      {/* Footer links */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1720px] flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-10 xl:px-14">
          <Link
            to="/tests"
            className="group inline-flex items-center gap-2 font-geist text-[18px] text-ink"
          >
            <span className="text-claret">←</span>
            <span className="relative">
              Return to library
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
          </Link>
          <Link
            to="/tests/$testId"
            params={{ testId }}
            className="group inline-flex items-center gap-2 font-geist text-[18px] text-ink"
          >
            <span className="relative">
              Retake this test
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </footer>
    </div>
  )
}

function NoSubmissionShell({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[900px] px-6 py-20 md:px-10">
        <p className="font-fraunces text-[24px] italic text-graphite">{message}</p>
        <Link
          to="/tests"
          className="mt-4 inline-block border-b border-line font-geist text-[18px] text-ink"
        >
          Return to library ↗
        </Link>
      </div>
    </div>
  )
}

function GradingShell() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[900px] px-6 py-24 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ MARKING
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(40px,5vw,72px)] leading-none text-ink">
          Reading your writing…
        </h1>
        <p className="mt-4 font-fraunces text-[20px] italic text-graphite">
          The examiner returns in a moment.
        </p>
      </div>
    </div>
  )
}

function FailureShell({
  message,
  onRetry,
  retrying,
}: {
  message: string
  onRetry: () => void
  retrying: boolean
}) {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[900px] px-6 py-24 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ MARKING FAILED
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(32px,4vw,56px)] leading-tight text-ink">
          The marker stumbled.
        </h1>
        <p className="mt-4 max-w-[60ch] font-fraunces text-[20px] italic leading-relaxed text-graphite">
          {message}
        </p>
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-8 py-[14px] font-geist text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">{retrying ? 'Retrying…' : 'Try again'}</span>
          <span className="relative z-10 text-claret">→</span>
        </button>
      </div>
    </div>
  )
}
