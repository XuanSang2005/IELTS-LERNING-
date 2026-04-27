import { motion } from 'framer-motion'
import type { DailyQuestion } from '@shared/schemas/daily-unit'

interface QuestionCardProps {
  question: DailyQuestion
  /** The choice key the user selected. `undefined` until they answer. */
  selected: string | undefined
  onSelect: (key: string) => void
}

/**
 * Self-marking multiple-choice card. Locks after first selection; shows
 * inline feedback (sage = correct, claret = incorrect) and the explanation
 * directly underneath. No "submit" button — the click IS the submit.
 */
export function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {
  const answered = selected !== undefined
  const isCorrect = answered && selected === question.correctKey
  const correctChoice = question.choices.find((c) => c.key === question.correctKey)

  return (
    <article className="border-b border-line py-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          № {String(question.number).padStart(2, '0')}
        </span>
        {answered && (
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
              isCorrect ? 'text-sage' : 'text-claret'
            }`}
          >
            ◆ {isCorrect ? 'CORRECT' : 'INCORRECT'}
          </span>
        )}
      </div>

      <p className="mt-4 max-w-[64ch] font-fraunces text-[20px] leading-relaxed text-ink md:text-[22px]">
        {question.prompt}
      </p>

      <ul className="mt-6 space-y-2">
        {question.choices.map((choice) => {
          const isPicked = selected === choice.key
          const isAnswerKey = choice.key === question.correctKey
          const tint = !answered
            ? 'border-line bg-transparent text-ink hover:border-ink hover:bg-bone'
            : isAnswerKey
              ? 'border-sage bg-sage/10 text-ink'
              : isPicked
                ? 'border-claret bg-claret/10 text-ink'
                : 'border-line bg-transparent text-ink/60'
          return (
            <li key={choice.key}>
              <button
                type="button"
                onClick={() => !answered && onSelect(choice.key)}
                disabled={answered}
                className={`flex w-full items-baseline gap-4 border px-5 py-3.5 text-left font-fraunces text-[18px] leading-relaxed transition-colors duration-150 md:text-[19px] ${tint} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-claret">
                  {choice.key}
                </span>
                <span className="flex-1">{choice.text}</span>
                {answered && isAnswerKey && (
                  <span aria-hidden="true" className="text-sage">
                    ✓
                  </span>
                )}
                {answered && !isAnswerKey && isPicked && (
                  <span aria-hidden="true" className="text-claret">
                    ✗
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 border-l-2 border-claret pl-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ EXPLANATION
          </p>
          <p className="mt-2 font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[19px]">
            {question.explanation}
          </p>
          {!isCorrect && correctChoice && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
              CORRECT ANSWER · {correctChoice.key}. {correctChoice.text}
            </p>
          )}
        </motion.div>
      )}
    </article>
  )
}
