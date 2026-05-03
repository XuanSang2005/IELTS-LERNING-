import type { PracticeExercise } from '../utils/exercise-builders'

interface ExerciseReviewProps {
  exercises: PracticeExercise[]
  answers: Record<string, string>
  /** Optional eyebrow label, defaults to "ANSWER KEY". */
  label?: string
}

/**
 * Editorial answer key shown after a Practice / Review / Week Quiz session.
 * Lists every exercise with the user's pick highlighted alongside the
 * correct option so the student can see what they got wrong and why.
 */
export function ExerciseReview({ exercises, answers, label = 'ANSWER KEY' }: ExerciseReviewProps) {
  return (
    <section className="mx-auto mt-16 max-w-[820px] border-t border-line pt-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">◆ {label}</p>
      <h3 className="mt-3 font-fraunces text-[28px] leading-tight text-ink md:text-[32px]">
        Review the <em className="italic">answers</em>.
      </h3>

      <ol className="mt-10 space-y-10">
        {exercises.map((ex, idx) => {
          const userChoiceId = answers[ex.id]
          const correct = ex.options.find((o) => o.isCorrect)
          const wasAnswered = Boolean(userChoiceId)
          const wasCorrect =
            wasAnswered && ex.options.find((o) => o.id === userChoiceId)?.isCorrect === true

          return (
            <li
              key={ex.id}
              className="border-t border-line/60 pt-8 first:border-t-0 first:pt-0"
            >
              <div className="flex items-baseline gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
                  № {String(idx + 1).padStart(2, '0')}
                </p>
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
                    wasCorrect ? 'text-sage' : 'text-claret'
                  }`}
                >
                  {!wasAnswered ? 'NOT ANSWERED' : wasCorrect ? 'CORRECT' : 'INCORRECT'}
                </p>
              </div>

              <p className="mt-3 font-fraunces text-[20px] leading-snug text-ink md:text-[22px]">
                {ex.prompt}
              </p>

              {ex.context && (
                <blockquote className="mt-4 border-l-2 border-line pl-4 font-fraunces text-[17px] italic leading-[1.5] text-graphite md:text-[18px]">
                  &ldquo;{ex.context}&rdquo;
                </blockquote>
              )}

              <ul className="mt-5 grid grid-cols-1 gap-2 md:auto-rows-fr md:grid-cols-2">
                {ex.options.map((opt) => {
                  const isUserChoice = opt.id === userChoiceId
                  const isCorrect = opt.isCorrect
                  let cls = 'border-line bg-transparent text-graphite/70'
                  let badge: { sym: string; tone: string } | null = null
                  if (isCorrect) {
                    cls = 'border-sage bg-sage/10 text-ink'
                    badge = { sym: '✓', tone: 'text-sage' }
                  } else if (isUserChoice) {
                    cls = 'border-claret bg-claret/10 text-claret'
                    badge = { sym: '✗', tone: 'text-claret' }
                  }
                  return (
                    <li key={opt.id} className="h-full">
                      <div
                        className={`flex h-full w-full items-center justify-between gap-4 border px-4 py-3 text-left font-fraunces text-[17px] leading-snug md:text-[18px] ${cls}`}
                      >
                        <span>{opt.text}</span>
                        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                          {isUserChoice && (
                            <span className="text-graphite">YOUR PICK</span>
                          )}
                          {badge && (
                            <span aria-hidden="true" className={badge.tone}>
                              {badge.sym}
                            </span>
                          )}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>

              {!wasCorrect && correct && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                  CORRECT ANSWER · <span className="text-ink">{correct.text}</span>
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
