import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import type { Test } from '@shared/schemas/test'
import {
  gradeSpeaking,
  saveSpeakingMockSubmission,
} from '@/features/tests/utils/speaking-mock'
import { MockRecorder } from './MockRecorder'

interface SpeakingBodyProps {
  test: Test
}

export function SpeakingBody({ test }: SpeakingBodyProps) {
  const navigate = useNavigate()
  const parts = useMemo(() => test.parts ?? [], [test.parts])

  const [partIndex, setPartIndex] = useState(0)
  const [partDurations, setPartDurations] = useState<number[]>([])
  const [grading, setGrading] = useState(false)

  if (parts.length < 3) {
    return (
      <div className="mx-auto max-w-[1720px] px-6 py-20 md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-claret">
          This Speaking test is missing a part. Please return to the library.
        </p>
      </div>
    )
  }

  const currentPart = parts[partIndex]!
  const isLast = partIndex === parts.length - 1
  const totalSecondsBudget = parts.reduce((s, p) => s + p.speakSeconds + p.prepSeconds, 0)
  const secondsUsed = partDurations.reduce((a, b) => a + b, 0)

  async function handleStopRecord(duration: number) {
    const next = [...partDurations, duration]
    setPartDurations(next)
    if (isLast) {
      setGrading(true)
      const submission = await gradeSpeaking(test, { partDurations: next })
      saveSpeakingMockSubmission(submission)
      void navigate({
        to: '/tests/$testId/results',
        params: { testId: test.id },
        search: { resultId: submission.id },
      })
    } else {
      setPartIndex((i) => i + 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-line bg-ivory">
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between gap-4 px-6 py-3 md:px-10 xl:px-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              SPEAKING · {test.title.toUpperCase()}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">
              PART {currentPart.part} OF III · {currentPart.title.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="h-[2px] bg-line">
          <div
            className="h-full bg-claret transition-all duration-500"
            style={{ width: `${Math.min(100, (secondsUsed / totalSecondsBudget) * 100)}%` }}
          />
        </div>
      </header>

      {/* Part navigation strip (read-only — can't go back) */}
      <div className="border-b border-line bg-ivory">
        <div className="mx-auto flex max-w-[1720px] px-6 md:px-10 xl:px-14">
          {parts.map((p, i) => {
            const state = i < partIndex ? 'done' : i === partIndex ? 'active' : 'pending'
            return (
              <div
                key={p.part}
                className={`flex-1 px-4 py-4 ${
                  state === 'active' ? '-mb-[2px] border-b-2 border-b-claret' : ''
                }`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                    state === 'done'
                      ? 'text-sage'
                      : state === 'active'
                        ? 'text-claret'
                        : 'text-graphite'
                  }`}
                >
                  PART {p.part === 1 ? 'I' : p.part === 2 ? 'II' : 'III'}
                </p>
                <p
                  className={`mt-1 font-fraunces text-[18px] leading-none ${
                    state === 'pending' ? 'text-graphite' : 'text-ink'
                  }`}
                >
                  {p.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Body */}
      <main className="flex-1">
        <div className="mx-auto grid max-w-[1720px] grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_420px] lg:gap-12 xl:px-14">
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
              PART {currentPart.part === 1 ? 'I' : currentPart.part === 2 ? 'II' : 'III'} ·{' '}
              PROMPT
            </p>
            <h2 className="mt-3 font-fraunces text-[clamp(28px,3vw,40px)] leading-[1.1] text-ink">
              {currentPart.title}
            </h2>

            {currentPart.part === 2 ? (
              <div className="mt-8 border border-line bg-bone/40 p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                  CUE CARD
                </p>
                <p className="mt-4 whitespace-pre-line font-fraunces text-[20px] leading-[1.6] text-ink">
                  {currentPart.questions[0]}
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                  {Math.round(currentPart.prepSeconds / 60)} MIN PREP ·{' '}
                  {Math.round(currentPart.speakSeconds / 60)} MIN SPEAKING
                </p>
              </div>
            ) : (
              <ol className="mt-8 space-y-4">
                {currentPart.questions.map((q, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-4 border-b border-line/70 pb-4"
                  >
                    <span className="w-6 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-fraunces text-[20px] leading-snug text-ink">
                      {q}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <p className="mt-8 font-fraunces text-[17px] italic leading-snug text-graphite">
              Speak as you would in the examination room. When the recorder fills, we move to
              the next part.
            </p>
          </section>

          <aside className="lg:sticky lg:top-[160px] lg:self-start">
            <MockRecorder
              key={`${test.id}-${currentPart.part}`}
              maxSeconds={currentPart.speakSeconds}
              onStop={handleStopRecord}
              label={`PART ${currentPart.part} · ANSWER`}
            />
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {grading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ivory"
          >
            <div className="text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                ◆ MARKING
              </p>
              <h2 className="mt-4 font-fraunces text-[clamp(48px,6vw,88px)] leading-none text-ink">
                Listening back…
              </h2>
              <p className="mt-3 font-fraunces text-[20px] italic text-graphite">
                The examiner returns in a moment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
