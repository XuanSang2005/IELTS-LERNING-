import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { BandLevel } from '@shared/schemas/practice'
import { useSubmitWeekQuiz } from '../hooks/useSubmitWeekQuiz'
import { useWeekItems } from '../hooks/useWeekItems'
import { buildPracticeExercises, type PracticeExercise } from '../utils/exercise-builders'
import { shuffle } from '../utils/shuffle'

interface WeekQuizProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
}

const TARGET_QUESTIONS = 25
const PREV_WEEK_SPILLOVER = 5
const PASS_THRESHOLD = 80

/**
 * Cumulative end-of-week quiz. 25 questions from the current week's items
 * + 5 spillover from the previous week. Score >= 80 marks reviewPassed.
 */
export function WeekQuiz({ discipline, level, week }: WeekQuizProps) {
  const currentItems = useWeekItems({ discipline, level, week })
  const prevItems = useWeekItems({
    discipline,
    level,
    week: Math.max(1, week - 1),
  })
  const submit = useSubmitWeekQuiz({ discipline, level })

  const exercises = useMemo<PracticeExercise[]>(() => {
    if (!currentItems.data) return []
    const fromCurrent = buildPracticeExercises(shuffle(currentItems.data)).slice(
      0,
      TARGET_QUESTIONS,
    )
    if (week <= 1 || !prevItems.data) return fromCurrent
    const fromPrev = buildPracticeExercises(shuffle(prevItems.data)).slice(0, PREV_WEEK_SPILLOVER)
    return [...fromCurrent, ...fromPrev]
  }, [currentItems.data, prevItems.data, week])

  const [activeIdx, setActiveIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [resultPassed, setResultPassed] = useState(false)

  if (currentItems.isPending) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
        Composing the week quiz…
      </p>
    )
  }

  if (currentItems.isError) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-claret">
        The quiz is momentarily out of reach. Please refresh.
      </p>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ WEEK QUIZ
        </p>
        <p className="mt-4 max-w-[52ch] mx-auto font-fraunces text-[22px] italic leading-relaxed text-graphite">
          Not enough items seeded for a full quiz yet. Once the week's content lands, twenty-five
          questions will appear here.
        </p>
      </div>
    )
  }

  const total = exercises.length
  const correctCount = exercises.filter((ex) => {
    const choice = answers[ex.id]
    if (!choice) return false
    return ex.options.find((o) => o.id === choice)?.isCorrect === true
  }).length
  const score = Math.round((correctCount / total) * 100)
  const allAnswered = exercises.every((ex) => Boolean(answers[ex.id]))

  if (submitted) {
    return (
      <div className="mx-auto max-w-[640px] py-16 text-center">
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.28em] ${
            resultPassed ? 'text-sage' : 'text-claret'
          }`}
        >
          ◆ WEEK QUIZ {resultPassed ? 'PASSED' : 'INCOMPLETE'}
        </p>
        <p className="mt-6 font-fraunces text-[clamp(64px,8vw,96px)] leading-none text-ink">
          {correctCount}
          <span className="text-graphite"> / {total}</span>
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
          SCORE · {score}% · THRESHOLD · {PASS_THRESHOLD}%
        </p>
        <p className="mt-6 max-w-[52ch] mx-auto font-fraunces text-[20px] italic leading-relaxed text-graphite">
          {resultPassed
            ? 'Week sealed. The roadmap tile now carries its mark — return tomorrow for the next week.'
            : 'A few more passes through the daily review and the threshold opens. The library has not closed the chapter yet.'}
        </p>
        <Link
          to="/app/lexicon"
          search={discipline === 'vocabulary' ? {} : { discipline }}
          className="mt-10 inline-block border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          Return to roadmap
        </Link>
      </div>
    )
  }

  const active = exercises[activeIdx]!
  const userChoice = answers[active.id]

  return (
    <div className="mx-auto max-w-[820px] py-8 md:py-10">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ WEEK QUIZ · {activeIdx + 1} / {total}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          {Object.keys(answers).length} / {total} ANSWERED
        </p>
      </div>

      <h3 className="font-fraunces text-[26px] leading-tight text-ink md:text-[28px]">
        {active.prompt}
      </h3>

      {active.context && (
        <blockquote className="mt-5 border-l-2 border-claret pl-5 font-fraunces text-[20px] italic leading-[1.5] text-graphite md:text-[22px]">
          &ldquo;{active.context}&rdquo;
        </blockquote>
      )}

      <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {active.options.map((opt) => {
          const selected = userChoice === opt.id
          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [active.id]: opt.id }))}
                className={`flex w-full items-baseline justify-between gap-4 border px-5 py-4 text-left font-fraunces text-[19px] leading-snug transition-colors md:text-[20px] ${
                  selected
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-line bg-transparent text-ink hover:border-ink'
                }`}
                aria-pressed={selected}
              >
                <span>{opt.text}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
          className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← PREV
        </button>

        {activeIdx < total - 1 ? (
          <button
            type="button"
            onClick={() => setActiveIdx((i) => Math.min(total - 1, i + 1))}
            className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-ink hover:text-ink"
          >
            NEXT →
          </button>
        ) : (
          <button
            type="button"
            disabled={!allAnswered || submit.isPending}
            onClick={() => {
              submit.mutate(
                { discipline, level, week, score },
                {
                  onSuccess: (res) => {
                    setResultPassed(res.reviewPassed)
                    setSubmitted(true)
                  },
                },
              )
            }}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-claret" />
            <span className="relative z-10">
              {submit.isPending ? 'Submitting…' : 'Submit week quiz'}
            </span>
            <span className="relative z-10 text-claret">→</span>
          </button>
        )}
      </div>
    </div>
  )
}
