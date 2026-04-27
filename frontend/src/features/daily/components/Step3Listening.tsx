import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { DailyListening } from '@shared/schemas/daily-unit'
import { DAILY_STEPS } from '../data/step-config'
import { DailyShell } from './DailyShell'
import { QuestionCard } from './QuestionCard'
import { ForthcomingPlaceholder } from './Step2Reading'

const STEP = DAILY_STEPS[2]

interface Step3ListeningProps {
  listening: DailyListening | null | undefined
  onAdvance: () => void
  onPrev: () => void
}

export function Step3Listening({ listening, onAdvance, onPrev }: Step3ListeningProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [played, setPlayed] = useState(false)

  if (!listening) {
    return (
      <DailyShell step={STEP} onContinue={onAdvance} onPrev={onPrev}>
        <ForthcomingPlaceholder kind="listening" />
      </DailyShell>
    )
  }

  const answered = Object.keys(answers).length
  const total = listening.questions.length
  const allAnswered = answered === total

  const correctCount = useMemo(
    () => listening.questions.filter((q) => answers[q.id] === q.correctKey).length,
    [answers, listening.questions],
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
      <div className="flex flex-col gap-12">
        {/* Row 1 — Title + audio panel, centered */}
        <section className="mx-auto w-full max-w-[1100px] text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            ◆ RECORDING · {listening.topic.toUpperCase()}
          </p>
          <h3 className="mt-3 font-fraunces text-[clamp(28px,3vw,40px)] leading-[1.05] text-ink">
            {listening.title}
          </h3>

          <div className="mt-8 border border-line bg-bone p-8 text-left md:p-10">
            {!played ? (
              <div className="flex flex-col items-center gap-5">
                <button
                  type="button"
                  onClick={() => setPlayed(true)}
                  className="group inline-flex items-center gap-4 border border-ink bg-ivory px-7 py-4 font-geist text-[13px] font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory"
                >
                  <span aria-hidden="true" className="text-[18px] text-claret group-hover:text-ivory">
                    ▶
                  </span>
                  <span>Play the recording</span>
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                  AUDIO FORTHCOMING · TRANSCRIPT STANDS IN
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sage">
                  ◆ RECORDING IN PROGRESS
                </p>
                <p className="mt-3 font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
                  Audio is forthcoming. For now, the transcript stands in for the recording —
                  use it as you would the audio.
                </p>
                <button
                  type="button"
                  onClick={() => setTranscriptOpen((o) => !o)}
                  className="group mt-6 inline-flex items-center gap-2 font-geist text-[14px] text-ink"
                >
                  <span className="relative">
                    {transcriptOpen ? 'Hide transcript' : 'Show transcript'}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                  </span>
                  <span className="text-[13px] text-claret transition-transform duration-200">
                    {transcriptOpen ? '↑' : '↓'}
                  </span>
                </button>
                {transcriptOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 space-y-4 border-l-2 border-claret pl-5 font-fraunces text-[18px] leading-[1.75] text-ink md:text-[19px]"
                  >
                    {listening.transcript.split(/\n\n+/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Row 2 — Questions, full width below */}
        <section className="w-full border-t border-line pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
              ◆ QUESTIONS · {answered} / {total} ANSWERED
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              SCORE · <span className="text-claret">{correctCount}</span> / {total}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {listening.questions.map((q) => (
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
