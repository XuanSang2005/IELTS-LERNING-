import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { TestMode } from '@shared/schemas/test'
import { useTestQuery } from '@/features/tests/hooks/useTestQuery'
import { TestRunner } from '@/features/tests/components/TestRunner'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/tests/$testId/')({
  component: TestIntroOrRunnerPage,
})

function TestIntroOrRunnerPage() {
  const { testId } = Route.useParams()
  const { data: test, isPending } = useTestQuery(testId)
  const [mode, setMode] = useState<TestMode>('full')
  const [begun, setBegun] = useState(false)
  const user = useAuthStore((s) => s.user)
  const isPro = user?.isPro ?? false
  const hasValidTrial = user?.trialEndsAt ? new Date(user.trialEndsAt) > new Date() : false
  const canAccessPro = isPro || hasValidTrial

  if (isPending) {
    return (
      <div className="mx-auto max-w-[1720px] px-6 py-20 md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-graphite">Opening the test…</p>
      </div>
    )
  }
  if (!test) {
    return (
      <div className="mx-auto max-w-[1720px] px-6 py-20 md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-graphite">
          No test found under that name.
        </p>
        <Link to="/tests" className="mt-4 inline-block border-b border-line font-geist text-[18px] text-ink">
          Return to library ↗
        </Link>
      </div>
    )
  }

  if (test.isPro && !canAccessPro) {
    return <ProGateIntro testTitle={test.title} />
  }

  if (begun) {
    return <TestRunner test={test} mode={mode} />
  }

  const durationMinutes = mode === 'full' ? test.fullDurationMinutes : test.shortDurationMinutes

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[900px] px-6 py-16 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ READY TO BEGIN · {test.id.toUpperCase()}
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(40px,5vw,64px)] leading-[1] tracking-tight text-ink">
          {test.title}
        </h1>
        <p className="mt-4 max-w-[56ch] font-fraunces text-[22px] italic leading-relaxed text-graphite">
          {test.description}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="border-t border-line pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">FORMAT</p>
            <p className="mt-3 font-fraunces text-[24px] text-ink">
              {test.skill === 'listening'
                ? 'Listening'
                : test.skill === 'reading'
                  ? 'Reading'
                  : test.skill === 'writing'
                    ? 'Writing'
                    : 'Speaking'}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              {test.skill === 'listening' && `${test.totalQuestions} QUESTIONS · FOUR SECTIONS`}
              {test.skill === 'reading' && `${test.totalQuestions} QUESTIONS · TWO PASSAGES`}
              {test.skill === 'writing' && 'TWO TASKS · SHARED CLOCK'}
              {test.skill === 'speaking' && 'THREE PARTS · SEQUENTIAL'}
            </p>
          </div>

          <div className="border-t border-line pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              DURATION
            </p>
            <div className="mt-4 space-y-3">
              {(['full', 'short'] as TestMode[]).map((m) => (
                <label key={m} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="mode"
                    value={m}
                    checked={mode === m}
                    onChange={() => setMode(m)}
                    className="h-3 w-3 accent-claret"
                  />
                  <span className="font-fraunces text-[20px] text-ink">
                    {m === 'full' ? 'Full' : 'Short'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                    {m === 'full'
                      ? `${test.fullDurationMinutes} MIN · ALL ${test.totalQuestions} Q`
                      : `${test.shortDurationMinutes} MIN · HALF SELECTION`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <details className="mt-10 border-t border-line pt-6">
          <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.25em] text-graphite hover:text-ink">
            Rules of the room
          </summary>
          <ul className="mt-4 space-y-2 font-fraunces text-[19px] italic leading-relaxed text-graphite">
            {test.skill === 'listening' && (
              <li>Audio plays once. Make notes as you listen.</li>
            )}
            {test.skill === 'reading' && (
              <li>Passages are open throughout. Read slowly.</li>
            )}
            {test.skill === 'writing' && (
              <>
                <li>One clock for both tasks. Switch between them freely.</li>
                <li>Drafts autosave. A reload will not lose your work.</li>
              </>
            )}
            {test.skill === 'speaking' && (
              <>
                <li>Parts flow in order. You cannot return to an earlier part.</li>
                <li>This is a mock recorder — we measure timing, not voice.</li>
              </>
            )}
            <li>
              {test.skill === 'writing' || test.skill === 'speaking'
                ? 'Grading is indicative — AI feedback will replace the mock once live.'
                : 'Answers are submitted automatically when the timer ends.'}
            </li>
            {(test.skill === 'listening' || test.skill === 'reading') && (
              <>
                <li>You may flag any question to revisit it before submitting.</li>
                <li>There is no partial credit. Spelling matters.</li>
              </>
            )}
          </ul>
        </details>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setBegun(true)}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Begin the test — {durationMinutes} min</span>
            <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <Link
            to="/tests"
            className="group inline-flex items-center gap-1 font-geist text-[18px] text-ink"
          >
            <span className="relative">
              Return to library
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProGateIntro({ testTitle }: { testTitle: string }) {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[720px] px-6 py-20 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          PRO — MEMBERSHIP REQUIRED
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(36px,5vw,64px)] leading-tight text-ink">
          <em className="italic">{testTitle}</em> is reserved for Pro candidates.
        </h1>
        <p className="mt-4 max-w-[52ch] font-fraunces text-[22px] italic leading-relaxed text-graphite">
          The advanced-tier tests are part of the programme. Meridian Pro includes every test,
          every explanation, and every transcript.
        </p>
        <a
          href="#upgrade"
          className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">Continue the programme</span>
          <span className="relative z-10 text-[15px] text-claret group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  )
}
