import { useMemo, useState } from 'react'
import type { DailyReading } from '@shared/schemas/daily-unit'
import { DAILY_STEPS } from '../data/step-config'
import { DailyShell } from './DailyShell'
import { QuestionCard } from './QuestionCard'

const STEP = DAILY_STEPS[1]

interface Step2ReadingProps {
  reading: DailyReading | null | undefined
  onAdvance: () => void
  onPrev: () => void
}

export function Step2Reading({ reading, onAdvance, onPrev }: Step2ReadingProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  if (!reading) {
    return (
      <DailyShell step={STEP} onContinue={onAdvance} onPrev={onPrev}>
        <ForthcomingPlaceholder kind="reading" />
      </DailyShell>
    )
  }

  const answered = Object.keys(answers).length
  const total = reading.questions.length
  const allAnswered = answered === total

  const correctCount = useMemo(
    () => reading.questions.filter((q) => answers[q.id] === q.correctKey).length,
    [answers, reading.questions],
  )

  const handleSelect = (questionId: string, key: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: key }))
  }

  const footnote = allAnswered
    ? `${correctCount} / ${total} correct.`
    : `${total - answered} of ${total} questions remaining.`

  return (
    <DailyShell
      step={STEP}
      canContinue={allAnswered}
      onContinue={onAdvance}
      onPrev={onPrev}
      footnote={footnote}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Passage */}
        <section className="lg:col-span-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            ◆ PASSAGE · {reading.wordCount} WORDS · {reading.topic.toUpperCase()}
          </p>
          <h3 className="mt-3 font-fraunces text-[clamp(28px,3vw,40px)] leading-[1.05] text-ink">
            {reading.title}
          </h3>
          <div className="mt-8 max-w-[64ch] space-y-5 font-fraunces text-[19px] leading-[1.75] text-ink md:text-[20px]">
            {reading.body.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Questions */}
        <section className="lg:col-span-5 lg:sticky lg:top-8 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ QUESTIONS · {answered} / {total} ANSWERED
          </p>
          <div className="mt-2 max-h-[78vh] overflow-y-auto pr-2">
            {reading.questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                selected={answers[q.id]}
                onSelect={(key) => handleSelect(q.id, key)}
              />
            ))}
          </div>
        </section>
      </div>
    </DailyShell>
  )
}

export function ForthcomingPlaceholder({ kind }: { kind: 'reading' | 'listening' }) {
  return (
    <div className="max-w-[64ch] border-l-2 border-claret pl-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        ◆ EDITION FORTHCOMING
      </p>
      <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
        Today’s {kind} is still in the editor’s hands.
      </h3>
      <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
        New material is released every few days. Continue to the rest of today’s session and
        return when the next issue arrives.
      </p>
    </div>
  )
}
