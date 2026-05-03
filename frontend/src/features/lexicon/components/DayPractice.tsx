import { useMemo, useState } from 'react'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { BandLevel } from '@shared/schemas/practice'
import { useDayItems } from '../hooks/useDayItems'
import { useSubmitPracticeScore } from '../hooks/useSubmitPracticeScore'
import { useWeekItems } from '../hooks/useWeekItems'
import { buildPracticeExercises, type PracticeExercise } from '../utils/exercise-builders'
import { ExerciseReview } from './ExerciseReview'

interface DayPracticeProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
  day: number
}

const TYPE_LABEL: Record<PracticeExercise['type'], string> = {
  'definition-to-word': 'DEFINITION → WORD',
  'word-to-definition': 'WORD → DEFINITION',
  'gap-fill': 'GAP-FILL',
  'word-to-synonym': 'CLOSEST SYNONYM',
  'colloc-phrase-to-def': 'PHRASE → DEFINITION',
  'colloc-def-to-phrase': 'DEFINITION → PHRASE',
  'colloc-gap-fill': 'GAP-FILL',
  'colloc-phrase-to-example': 'PHRASE → EXAMPLE',
  'linking-phrase-to-function': 'PHRASE → FUNCTION',
  'linking-function-to-phrase': 'FUNCTION → PHRASE',
  'linking-gap-fill': 'GAP-FILL',
}

export function DayPractice({ discipline, level, week, day }: DayPracticeProps) {
  const itemsQuery = useDayItems({ discipline, level, week, day })
  // Linking has only 2 items/day — too thin for distractor-heavy questions.
  // Fetch the full week (14 items) as the distractor pool for linking only.
  const weekItemsQuery = useWeekItems(
    { discipline, level, week },
    { enabled: discipline === 'linking' },
  )
  const submitScore = useSubmitPracticeScore({ discipline, level })

  const exercises = useMemo<PracticeExercise[]>(() => {
    if (!itemsQuery.data) return []
    const pool =
      discipline === 'linking' && weekItemsQuery.data ? weekItemsQuery.data : itemsQuery.data
    return buildPracticeExercises(itemsQuery.data, pool)
  }, [itemsQuery.data, weekItemsQuery.data, discipline])

  const [activeIdx, setActiveIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (itemsQuery.isPending) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
        Composing today's practice…
      </p>
    )
  }

  if (itemsQuery.isError) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-claret">
        The practice is momentarily out of reach. Please refresh.
      </p>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ PRACTICE
        </p>
        <p className="mt-4 max-w-[52ch] mx-auto font-fraunces text-[22px] italic leading-relaxed text-graphite">
          Today's {discipline} day has no items seeded yet. Once content lands, exercises
          will appear here.
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
      <div className="py-8 md:py-10">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ PRACTICE COMPLETE
          </p>
          <p className="mt-6 font-fraunces text-[clamp(64px,8vw,96px)] leading-none text-ink">
            {correctCount}
            <span className="text-graphite"> / {total}</span>
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            SCORE · {score}%
          </p>
          <p className="mt-6 max-w-[52ch] mx-auto font-fraunces text-[20px] italic leading-relaxed text-graphite">
            {score >= 80
              ? 'Comfortable. Carry on to Review when the day is closed.'
              : 'A working score. Return to the lesson, then come back.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setAnswers({})
              setActiveIdx(0)
            }}
            className="mt-10 border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            Try again
          </button>
        </div>

        <ExerciseReview exercises={exercises} answers={answers} />
      </div>
    )
  }

  const active = exercises[activeIdx]!
  const userChoice = answers[active.id]
  const answered = userChoice !== undefined
  const correctOption = active.options.find((o) => o.isCorrect)
  const userWasCorrect =
    answered && active.options.find((o) => o.id === userChoice)?.isCorrect === true

  return (
    <div className="mx-auto max-w-[820px] py-8 md:py-10">
      {/* Progress strip */}
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ EXERCISE {activeIdx + 1} / {total}
          <span className="mx-2 text-graphite">·</span>
          <span className="text-graphite">{TYPE_LABEL[active.type]}</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          {Object.keys(answers).length} ANSWERED
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

      <ul className="mt-8 grid grid-cols-1 gap-3 md:auto-rows-fr md:grid-cols-2">
        {active.options.map((opt) => {
          const isPicked = userChoice === opt.id
          const isAnswerKey = opt.isCorrect
          let tint = 'border-line bg-transparent text-ink hover:border-ink'
          if (answered) {
            if (isAnswerKey) tint = 'border-sage bg-sage/10 text-ink'
            else if (isPicked) tint = 'border-claret bg-claret/10 text-claret'
            else tint = 'border-line bg-transparent text-graphite/60'
          } else if (isPicked) {
            tint = 'border-ink bg-ink text-ivory'
          }
          return (
            <li key={opt.id} className="h-full">
              <button
                type="button"
                disabled={answered}
                onClick={() =>
                  !answered && setAnswers((prev) => ({ ...prev, [active.id]: opt.id }))
                }
                className={`group flex h-full w-full items-center justify-between gap-4 border px-5 py-4 text-left font-fraunces text-[19px] leading-snug transition-colors disabled:cursor-default md:text-[20px] ${tint}`}
                aria-pressed={isPicked}
              >
                <span>{opt.text}</span>
                {answered && isAnswerKey && (
                  <span aria-hidden="true" className="font-mono text-[12px] uppercase tracking-[0.22em] text-sage">
                    ✓
                  </span>
                )}
                {answered && isPicked && !isAnswerKey && (
                  <span aria-hidden="true" className="font-mono text-[12px] uppercase tracking-[0.22em] text-claret">
                    ✗
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <div className="mt-6 border-l-2 border-claret pl-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ {userWasCorrect ? 'CORRECT' : 'INCORRECT'}
          </p>
          {!userWasCorrect && correctOption && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
              CORRECT ANSWER · <span className="text-ink">{correctOption.text}</span>
            </p>
          )}
        </div>
      )}

      {/* Nav */}
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
            disabled={!allAnswered || submitScore.isPending}
            onClick={() => {
              submitScore.mutate(
                {
                  discipline,
                  level,
                  week,
                  day: day as 1 | 2 | 3 | 4 | 5 | 6 | 7,
                  score,
                },
                { onSuccess: () => setSubmitted(true) },
              )
            }}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-claret" />
            <span className="relative z-10">
              {submitScore.isPending ? 'Submitting…' : 'Submit practice'}
            </span>
            <span className="relative z-10 text-claret">→</span>
          </button>
        )}
      </div>
    </div>
  )
}
