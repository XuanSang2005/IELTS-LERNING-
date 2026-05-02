import { Link } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'

type Tab = 'lesson' | 'practice' | 'review' | 'week-quiz'

interface StepperSubNavProps {
  discipline: LexiconDiscipline
  week: number
  day: number
  tab: Tab
  /** Whether the day's lesson has been read at least once. */
  lessonComplete?: boolean
  /** Whether practice score has been recorded for this day. */
  practiceComplete?: boolean
  /** Whether the day has been reviewed (any rating). */
  reviewComplete?: boolean
  /** Whether week quiz is unlocked (all 7 days complete). */
  quizUnlocked: boolean
  quizPassed: boolean
  daysCompleteCount: number
}

const STEPS: ReadonlyArray<{ key: 'lesson' | 'practice' | 'review'; label: string; index: number }> = [
  { key: 'lesson', label: 'Lesson', index: 1 },
  { key: 'practice', label: 'Practice', index: 2 },
  { key: 'review', label: 'Review', index: 3 },
]

/**
 * Stepped progress sub-nav. Shows day flow as 1 → 2 → 3 with state markers
 * (✓ done, ● current, ○ pending). Week quiz pill remains on the right with
 * its own gating logic.
 */
export function StepperSubNav({
  discipline,
  week,
  day,
  tab,
  lessonComplete,
  practiceComplete,
  reviewComplete,
  quizUnlocked,
  quizPassed,
  daysCompleteCount,
}: StepperSubNavProps) {
  const stateOf = (k: 'lesson' | 'practice' | 'review') => {
    const isCurrent = tab === k
    const completed =
      (k === 'lesson' && lessonComplete) ||
      (k === 'practice' && practiceComplete) ||
      (k === 'review' && reviewComplete)
    if (isCurrent) return 'current' as const
    return completed ? 'done' : ('pending' as const)
  }

  return (
    <section className="border-b-2 border-line">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-1">
            <span className="mr-3 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-graphite md:inline">
              DAY {day} ·
            </span>
            {STEPS.map((step, i) => {
              const state = stateOf(step.key)
              return (
                <div key={step.key} className="flex items-center">
                  <Link
                    to="/app/lexicon/$week"
                    params={{ week: String(week) }}
                    search={{ discipline, day, tab: step.key }}
                    className="group flex items-center gap-2 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-claret"
                    aria-current={state === 'current' ? 'page' : undefined}
                  >
                    <Mark state={state} />
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.28em] transition-colors ${
                        state === 'current'
                          ? 'text-claret'
                          : state === 'done'
                            ? 'text-teal'
                            : 'text-graphite group-hover:text-ink'
                      }`}
                    >
                      {step.label}
                    </span>
                  </Link>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-1 h-px w-6 bg-line md:w-8"
                    />
                  )}
                </div>
              )
            })}
          </div>

          <Link
            to="/app/lexicon/$week"
            params={{ week: String(week) }}
            search={{ discipline, day, tab: 'week-quiz' }}
            disabled={!quizUnlocked}
            className={`group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] transition-colors ${
              tab === 'week-quiz'
                ? 'text-claret'
                : quizUnlocked
                  ? quizPassed
                    ? 'text-teal hover:text-ink'
                    : 'text-ink hover:text-claret'
                  : 'pointer-events-none cursor-not-allowed text-graphite/50'
            }`}
            aria-current={tab === 'week-quiz' ? 'page' : undefined}
          >
            ◆ Week quiz
            {quizPassed && <span className="ml-2">· passed</span>}
            {!quizUnlocked && <span className="ml-2 text-graphite/60">· {daysCompleteCount}/7</span>}
            {tab === 'week-quiz' && (
              <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-[2px] bg-claret" />
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}

function Mark({ state }: { state: 'done' | 'current' | 'pending' }) {
  if (state === 'done') {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center border border-teal bg-teal/15 font-mono text-[10px] text-teal">
        ✓
      </span>
    )
  }
  if (state === 'current') {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center border border-claret bg-claret/10 font-mono text-[10px] text-claret">
        ●
      </span>
    )
  }
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center border border-line font-mono text-[10px] text-graphite">
      ○
    </span>
  )
}
