import type { AnswerValue, Question, Test, TestResult } from '@shared/schemas/test'
import { flattenQuestions } from '@/features/tests/utils/scoring'

interface ResultsExplanationsProps {
  test: Test
  result: TestResult
}

function questionTitle(q: Question | undefined, fallback: string): string {
  if (!q) return fallback
  if ('prompt' in q && q.prompt) return q.prompt
  if (q.type === 'true-false-not-given' || q.type === 'yes-no-not-given') return q.statement
  if (q.type === 'matching-information') return q.statement
  if (q.type === 'short-answer') return q.question
  if (q.type === 'sentence-completion')
    return `${q.sentenceBefore} ___ ${q.sentenceAfter}`.trim()
  return fallback
}

function acceptableVariantsFor(q: Question | undefined): string[] {
  if (!q) return []
  if (q.type === 'sentence-completion' || q.type === 'short-answer') {
    return q.acceptableVariants ?? []
  }
  return []
}

/**
 * Look up display text for a matching item or option from the question source.
 * Used by renderMapping so the mapping reads like a sentence, not like a diff.
 */
function textLookup(q: Question | undefined) {
  return {
    item: (id: string): string => {
      if (!q) return id
      if (q.type === 'matching') {
        return q.items.find((i) => i.id === id)?.text ?? id
      }
      if (q.type === 'plan-map-diagram') {
        return q.labels.find((l) => l.id === id)?.id ?? id
      }
      return id
    },
    option: (key: string): string => {
      if (!q) return key
      if (q.type === 'matching' || q.type === 'plan-map-diagram') {
        const opt = q.options.find((o) => o.key === key)
        return opt ? `${opt.key} · ${opt.text}` : key
      }
      if (
        q.type === 'form-completion' ||
        q.type === 'note-table-completion' ||
        q.type === 'flow-chart-completion'
      ) {
        const blank = q.blanks.find((b) => b.id === key)
        return blank ? blank.correctAnswer : key
      }
      if (q.type === 'summary-completion') {
        const blank = q.blanks.find((b) => b.id === key)
        if (!blank) return key
        if (q.wordBank) {
          const option = q.wordBank.find((w) => w.key === blank.correctAnswer)
          return option ? `${option.key} · ${option.text}` : blank.correctAnswer
        }
        return blank.correctAnswer
      }
      return key
    },
  }
}

/** Renders a single answer value — string, array, or mapping — with editorial weight. */
function AnswerBlock({
  value,
  question,
  notAnswered,
}: {
  value: AnswerValue | null
  question: Question | undefined
  notAnswered?: boolean
}) {
  if (notAnswered || value === null || value === undefined) {
    return (
      <p className="font-fraunces text-[24px] italic leading-tight tracking-tight text-graphite">
        — not answered
      </p>
    )
  }

  if (typeof value === 'string') {
    return (
      <p className="font-fraunces text-[24px] leading-tight tracking-tight text-ink">{value}</p>
    )
  }

  if (Array.isArray(value)) {
    return (
      <p className="font-fraunces text-[24px] leading-tight tracking-tight text-ink">
        {value.join(', ')}
      </p>
    )
  }

  // Object / mapping — render as small list with claret arrow.
  const lookup = textLookup(question)
  const entries = Object.entries(value)
  if (entries.length === 0) {
    return (
      <p className="font-fraunces text-[24px] italic leading-tight tracking-tight text-graphite">
        — empty
      </p>
    )
  }
  return (
    <div className="space-y-1">
      {entries.map(([itemId, optionKey]) => (
        <div
          key={itemId}
          className="font-fraunces text-[22px] leading-tight tracking-tight text-ink"
        >
          {lookup.item(itemId)}
          <span aria-hidden="true" className="mx-2 text-claret">
            →
          </span>
          {lookup.option(optionKey)}
        </div>
      ))}
    </div>
  )
}

export function ResultsExplanations({ test, result }: ResultsExplanationsProps) {
  const allQuestions = flattenQuestions(test)
  const byId = new Map(allQuestions.map((q) => [q.id, q]))

  return (
    <div className="space-y-0">
      {result.results.map((r) => {
        const q = byId.get(r.questionId)
        const number = q?.number ?? 0
        const variants = acceptableVariantsFor(q)
        const notAnswered =
          r.userAnswer === null ||
          r.userAnswer === undefined ||
          (typeof r.userAnswer === 'string' && r.userAnswer.trim() === '')
        const columnBorder = r.isCorrect ? 'border-sage' : 'border-claret'

        return (
          <div
            key={r.questionId}
            className="border-t border-line py-7 first:border-t-0 first:pt-0"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                QUESTION {String(number).padStart(2, '0')} · {r.questionType.toUpperCase()}
              </p>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 ${
                  r.isCorrect ? 'text-sage' : 'text-claret'
                }`}
              >
                {r.isCorrect ? '◆ CORRECT' : '× INCORRECT'}
              </span>
            </div>

            <p className="mt-3 font-fraunces text-[20px] leading-relaxed text-ink">
              {questionTitle(q, `Question ${number}`)}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className={`border-l-2 ${columnBorder} pl-4`}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                  Your answer
                </p>
                <AnswerBlock
                  value={r.userAnswer ?? null}
                  question={q}
                  notAnswered={notAnswered}
                />
              </div>
              <div className="pl-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                  Correct answer
                </p>
                <AnswerBlock value={r.correctAnswer} question={q} />
                {variants.length > 0 && (
                  <p className="mt-1 font-fraunces text-[18px] italic leading-snug text-graphite">
                    or: {variants.join(' / ')}
                  </p>
                )}
              </div>
            </div>

            {r.explanation && (
              <p className="mt-5 border-l-2 border-claret pl-4 font-fraunces text-[18px] italic leading-relaxed text-graphite">
                {r.explanation}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
