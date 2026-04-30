import { useMemo, useState } from 'react'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { BandLevel } from '@shared/schemas/practice'
import { useDayItems } from '../hooks/useDayItems'
import { buildPracticeExercises, type PracticeExercise } from '../utils/exercise-builders'

interface DayReviewProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
  day: number
}

const TARGET_QUESTIONS = 10

/**
 * Recap-only quiz for the items of one day. Uses the same exercise builders
 * as DayPractice but caps at 10 questions and shows immediate feedback after
 * each answer. Does NOT touch SRS state (plan Decision #11) and does NOT
 * persist progress — that lives in WeekQuiz / SrsDeck.
 */
export function DayReview({ discipline, level, week, day }: DayReviewProps) {
  const itemsQuery = useDayItems({ discipline, level, week, day })

  const exercises = useMemo<PracticeExercise[]>(() => {
    if (!itemsQuery.data) return []
    return buildPracticeExercises(itemsQuery.data).slice(0, TARGET_QUESTIONS)
  }, [itemsQuery.data])

  const [activeIdx, setActiveIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)

  if (itemsQuery.isPending) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
        Composing today's recap…
      </p>
    )
  }

  if (itemsQuery.isError) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-claret">
        The recap is momentarily out of reach. Please refresh.
      </p>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ REVIEW
        </p>
        <p className="mt-4 max-w-[52ch] mx-auto font-fraunces text-[22px] italic leading-relaxed text-graphite">
          {discipline === 'vocabulary'
            ? "No items to recap yet. Once today's vocabulary is seeded, ten quick questions will appear here."
            : `Recap for ${discipline} ships in a later iteration.`}
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

  if (done) {
    return (
      <div className="mx-auto max-w-[640px] py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ RECAP COMPLETE
        </p>
        <p className="mt-6 font-fraunces text-[clamp(64px,8vw,96px)] leading-none text-ink">
          {correctCount}
          <span className="text-graphite"> / {total}</span>
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
          {score}% · QUICK RECALL
        </p>
        <p className="mt-6 max-w-[52ch] mx-auto font-fraunces text-[20px] italic leading-relaxed text-graphite">
          The full spaced-repetition pass lives in the Daily Loop. This recap doesn't change the
          schedule — it tests whether today's items have settled.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setAnswers({})
            setRevealedIds(new Set())
            setActiveIdx(0)
          }}
          className="mt-10 border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          Recap again
        </button>
      </div>
    )
  }

  const active = exercises[activeIdx]!
  const userChoice = answers[active.id]
  const revealed = revealedIds.has(active.id)
  const isCorrect = revealed && active.options.find((o) => o.id === userChoice)?.isCorrect === true

  return (
    <div className="mx-auto max-w-[820px] py-8 md:py-10">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ RECAP {activeIdx + 1} / {total}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          {revealedIds.size} REVEALED
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
          const isThisCorrect = opt.isCorrect
          let visualState = 'border-line bg-transparent text-ink hover:border-ink'
          if (revealed) {
            if (isThisCorrect) visualState = 'border-sage bg-sage/10 text-ink'
            else if (selected) visualState = 'border-claret bg-claret/10 text-claret'
            else visualState = 'border-line bg-transparent text-graphite/60'
          } else if (selected) {
            visualState = 'border-ink bg-ink text-ivory'
          }
          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => setAnswers((prev) => ({ ...prev, [active.id]: opt.id }))}
                className={`flex w-full items-baseline justify-between gap-4 border px-5 py-4 text-left font-fraunces text-[19px] leading-snug transition-colors disabled:cursor-default md:text-[20px] ${visualState}`}
                aria-pressed={selected}
              >
                <span>{opt.text}</span>
                {revealed && isThisCorrect && (
                  <span aria-hidden="true" className="font-mono text-[12px] uppercase tracking-[0.22em] text-sage">
                    ✓
                  </span>
                )}
                {revealed && selected && !isThisCorrect && (
                  <span aria-hidden="true" className="font-mono text-[12px] uppercase tracking-[0.22em] text-claret">
                    ✗
                  </span>
                )}
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

        {!revealed && userChoice && (
          <button
            type="button"
            onClick={() => setRevealedIds((prev) => new Set(prev).add(active.id))}
            className="border border-claret px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-claret transition-colors hover:bg-claret hover:text-ivory"
          >
            REVEAL
          </button>
        )}

        {revealed && (
          <p className="font-mono text-[11px] uppercase tracking-[0.28em]">
            <span className={isCorrect ? 'text-sage' : 'text-claret'}>
              {isCorrect ? 'CORRECT' : 'INCORRECT'}
            </span>
          </p>
        )}

        {activeIdx < total - 1 ? (
          <button
            type="button"
            onClick={() => setActiveIdx((i) => Math.min(total - 1, i + 1))}
            disabled={!revealed}
            className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            NEXT →
          </button>
        ) : (
          <button
            type="button"
            disabled={!revealed}
            onClick={() => setDone(true)}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-claret" />
            <span className="relative z-10">Close recap</span>
            <span className="relative z-10 text-claret">→</span>
          </button>
        )}
      </div>
    </div>
  )
}
