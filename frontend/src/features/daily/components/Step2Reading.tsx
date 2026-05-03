import { useEffect, useMemo, useState } from 'react'
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

  // Hooks must run on every render — keep above the early return.
  const correctCount = useMemo(
    () =>
      reading
        ? reading.questions.filter((q) => answers[q.id] === q.correctKey).length
        : 0,
    [answers, reading],
  )

  // Lock the document scrollbar while this step is mounted — the two
  // independent column scrollbars handle all overflow inside the step.
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

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
      <Step2ReadingBody
        reading={reading}
        answers={answers}
        answered={answered}
        total={total}
        onSelect={handleSelect}
      />
    </DailyShell>
  )
}

interface Step2ReadingBodyProps {
  reading: DailyReading
  answers: Record<string, string>
  answered: number
  total: number
  onSelect: (questionId: string, key: string) => void
}

function Step2ReadingBody({
  reading,
  answers,
  answered,
  total,
  onSelect,
}: Step2ReadingBodyProps) {
  // Mirror the test page (TestRunner ReadingBody): a 50/50 split with generous
  // gutters, mobile tab toggle, independent column scroll. Drops the cramped
  // 7:5 split + max-h-[78vh] of the previous layout.
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('questions')

  return (
    <div className="flex flex-col">
      {/* Mobile tabs */}
      <div className="mb-6 flex shrink-0 border-b border-line md:hidden">
        {(['passage', 'questions'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setMobileTab(t)}
            className={`flex-1 border-b-2 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
              mobileTab === t
                ? 'border-claret text-claret'
                : 'border-transparent text-graphite hover:text-ink'
            }`}
          >
            {t === 'passage' ? 'Passage' : 'Questions'}
          </button>
        ))}
      </div>

      {/* Two independent scroll columns — passage scrollbar sits in the
         page-middle gutter, questions scrollbar on the right. Mirrors the
         reading test page (TestRunner ReadingBody). Body height fills the
         viewport minus the daily nav header (~140px) + DailyShell footer
         (~120px) so both columns overflow even on shorter passages. */}
      <div className="grid h-[calc(100svh-260px)] min-h-[560px] grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        {/* Passage — scrolls inside its own column */}
        <section
          className={`${mobileTab === 'passage' ? 'block' : 'hidden'} min-h-0 overflow-y-auto md:block md:pr-4 lg:pr-6`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            ◆ PASSAGE · {reading.wordCount} WORDS · {reading.topic.toUpperCase()}
          </p>
          <h3 className="mt-3 font-fraunces text-[clamp(28px,3vw,40px)] leading-[1.05] text-ink">
            {reading.title}
          </h3>
          <div className="mt-8 space-y-5 font-fraunces text-[19px] leading-[1.75] text-ink md:text-[20px]">
            {reading.body.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Questions — scrolls inside its own column */}
        <section
          className={`${mobileTab === 'questions' ? 'block' : 'hidden'} min-h-0 overflow-y-auto md:block md:pl-4 lg:pl-6`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
            ◆ QUESTIONS · {answered} / {total} ANSWERED
          </p>
          <div className="mt-2">
            {reading.questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                selected={answers[q.id]}
                onSelect={(key) => onSelect(q.id, key)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
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
