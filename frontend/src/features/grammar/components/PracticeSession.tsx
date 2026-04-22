import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Lesson, LessonExercise } from '@shared/schemas/lesson'
import type { BandLevel } from '@shared/schemas/practice'
import { useGrammarProgress } from '@/stores/grammar-progress-store'

interface PracticeSessionProps {
  week: number
  level: BandLevel
  lesson: Lesson
  onRequestReview: () => void
}

interface AttemptState {
  input: string
  submitted: boolean
  correct: boolean
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?;,]+$/, '')
}

function isCorrect(ex: LessonExercise, input: string): boolean {
  return normalize(input) === normalize(ex.answer)
}

const KIND_META: Record<
  'gap-fill' | 'rewrite' | 'choice',
  { label: string; hint: string }
> = {
  'gap-fill': { label: 'GAP-FILL', hint: 'Fill the blank with the correct form.' },
  rewrite: { label: 'REWRITE', hint: 'Rewrite the sentence as instructed.' },
  choice: { label: 'MULTIPLE CHOICE', hint: 'Select the one correct option.' },
}

/** Full-width hairline + centred mono label. Matches the tests/atlas/lesson
 *  separator style. */
function SectionHeader({
  numeral,
  title,
  meta,
  noDivider = false,
}: {
  numeral?: string
  title: string
  meta?: string
  noDivider?: boolean
}) {
  return (
    <div className={`text-center ${noDivider ? '' : 'border-t border-line pt-10'}`}>
      <p className="font-mono text-[15px] uppercase tracking-[0.32em] md:text-[17px]">
        {numeral && (
          <>
            <span className="font-semibold text-claret">§ {numeral}</span>
            <span className="mx-4 text-line">·</span>
          </>
        )}
        <span className="font-semibold text-ink">{title}</span>
      </p>
      {meta && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-graphite">
          {meta}
        </p>
      )}
    </div>
  )
}

/** Large roman-ish numeral displayed to the left of the prompt so each
 *  exercise has its own visual anchor. */
function ExerciseNumeral({ index, total }: { index: number; total: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-start">
      <span className="font-fraunces text-[44px] italic leading-none text-claret md:text-[64px]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="mt-2 block h-px w-8 bg-line" aria-hidden="true" />
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        of {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

export function PracticeSession({ week, level, lesson, onRequestReview }: PracticeSessionProps) {
  const exercises = lesson.practice
  const recordPractice = useGrammarProgress((s) => s.recordPractice)

  const [attempts, setAttempts] = useState<Record<string, AttemptState>>(() => {
    const init: Record<string, AttemptState> = {}
    for (const ex of exercises) init[ex.id] = { input: '', submitted: false, correct: false }
    return init
  })

  const score = useMemo(() => {
    const correctCount = Object.values(attempts).filter((a) => a.correct).length
    const submittedCount = Object.values(attempts).filter((a) => a.submitted).length
    return { correctCount, submittedCount, total: exercises.length }
  }, [attempts, exercises.length])

  const allSubmitted = score.submittedCount === exercises.length
  const [finalized, setFinalized] = useState(false)

  const setInput = (id: string, input: string) =>
    setAttempts((prev) => ({ ...prev, [id]: { ...prev[id], input } }))

  const submit = (ex: LessonExercise) => {
    setAttempts((prev) => ({
      ...prev,
      [ex.id]: { ...prev[ex.id], submitted: true, correct: isCorrect(ex, prev[ex.id].input) },
    }))
  }

  const finalize = () => {
    recordPractice(level, week, score.correctCount / score.total)
    setFinalized(true)
  }

  const resetAll = () => {
    const init: Record<string, AttemptState> = {}
    for (const ex of exercises) init[ex.id] = { input: '', submitted: false, correct: false }
    setAttempts(init)
    setFinalized(false)
  }

  const percent = Math.round((score.correctCount / score.total) * 100)
  const answeredPct = (score.submittedCount / exercises.length) * 100

  return (
    <div className="mx-auto w-full max-w-[1720px]">
      {/* SECTION: Practice header + live score. No top divider — the sticky
          tab bar above already provides one. */}
      <section className="pb-12">
        <SectionHeader
          numeral="V"
          title="Practice"
          meta={`${exercises.length} EXERCISES · ANSWER EACH · SCORE AUTOMATICALLY`}
          noDivider
        />

        {/* Prominent score display */}
        <div className="mx-auto mt-10 flex max-w-[1100px] flex-col items-center gap-6 border border-line bg-bone px-8 py-8 md:flex-row md:items-end md:justify-between md:px-12 md:py-10">
          <div className="flex items-baseline gap-4">
            <span className="font-fraunces text-[72px] leading-none text-claret md:text-[88px]">
              {String(score.correctCount).padStart(2, '0')}
            </span>
            <span className="font-fraunces text-[36px] italic leading-none text-graphite md:text-[44px]">
              / {String(exercises.length).padStart(2, '0')}
            </span>
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
              CORRECT
            </span>
          </div>
          <div className="w-full max-w-[420px] md:ml-auto">
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
              <span>PROGRESS</span>
              <span
                className={
                  allSubmitted
                    ? percent >= 70
                      ? 'text-sage'
                      : 'text-claret'
                    : 'text-ink'
                }
              >
                {allSubmitted
                  ? `${percent}%`
                  : `${score.submittedCount}/${exercises.length}`}
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-claret"
                initial={false}
                animate={{ width: `${answeredPct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Exercises. Each exercise is its own section. */}
      <ol>
        {exercises.map((ex, i) => {
          const attempt = attempts[ex.id]
          const kindMeta = KIND_META[ex.kind]
          const statusColor = attempt.submitted
            ? attempt.correct
              ? 'text-sage'
              : 'text-claret'
            : 'text-graphite'
          return (
            <li key={ex.id}>
              <SectionHeader
                numeral={String(i + 1).padStart(2, '0')}
                title={kindMeta.label}
                meta={kindMeta.hint}
              />
              <div className="mx-auto mt-10 max-w-[1100px] pb-16">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:gap-10"
                >
                  <ExerciseNumeral index={i} total={exercises.length} />

                  <div className="min-w-0">
                    {/* PROMPT — big, editorial, Fraunces for literary feel */}
                    <p className="font-fraunces text-[22px] leading-[1.45] text-ink md:text-[26px]">
                      {ex.prompt}
                    </p>

                    {/* ANSWER UI */}
                    {ex.kind === 'choice' && ex.choices ? (
                      <div className="mt-7 space-y-3">
                        {ex.choices.map((c, choiceIdx) => {
                          const checked = attempt.input === c
                          const isCorrectChoice =
                            attempt.submitted && normalize(c) === normalize(ex.answer)
                          const isWrongChoice =
                            attempt.submitted && checked && !attempt.correct
                          const tone = attempt.submitted
                            ? isCorrectChoice
                              ? 'border-sage bg-sage/10'
                              : isWrongChoice
                                ? 'border-claret bg-claret/5'
                                : 'border-line bg-ivory opacity-70'
                            : checked
                              ? 'border-ink bg-bone shadow-[0_10px_20px_-12px_rgba(20,18,16,0.25)]'
                              : 'border-line bg-ivory hover:border-ink hover:bg-bone'
                          return (
                            <label
                              key={c}
                              className={`group flex cursor-pointer items-start gap-4 border-2 px-5 py-4 transition-all md:px-6 md:py-5 ${tone} ${attempt.submitted ? 'cursor-default' : ''}`}
                            >
                              <span
                                aria-hidden="true"
                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[12px] font-semibold transition-colors ${
                                  checked || isCorrectChoice
                                    ? 'border-claret bg-claret text-ivory'
                                    : 'border-line bg-ivory text-graphite group-hover:border-ink'
                                }`}
                              >
                                {String.fromCharCode(65 + choiceIdx)}
                              </span>
                              <input
                                type="radio"
                                name={ex.id}
                                value={c}
                                checked={checked}
                                disabled={attempt.submitted}
                                onChange={() => setInput(ex.id, c)}
                                className="sr-only"
                              />
                              <span className="pt-1 font-geist text-[17px] leading-snug text-ink md:text-[18px]">
                                {c}
                              </span>
                              {isCorrectChoice && (
                                <span className="ml-auto shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-sage">
                                  ✓ CORRECT
                                </span>
                              )}
                            </label>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="mt-7">
                        <label
                          htmlFor={`input-${ex.id}`}
                          className="mb-3 block font-mono text-[11px] uppercase tracking-[0.28em] text-graphite"
                        >
                          Your answer
                        </label>
                        <input
                          id={`input-${ex.id}`}
                          type="text"
                          value={attempt.input}
                          disabled={attempt.submitted}
                          onChange={(e) => setInput(ex.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && attempt.input.trim() && !attempt.submitted)
                              submit(ex)
                          }}
                          placeholder="Type your answer…"
                          className="w-full border-2 border-line bg-ivory px-5 py-4 font-fraunces text-[20px] italic text-ink placeholder:text-line/80 focus:border-claret focus:outline-none focus:shadow-[0_0_0_4px_rgba(107,31,26,0.08)] disabled:opacity-80 md:text-[22px]"
                        />
                      </div>
                    )}

                    {/* SUBMIT / FEEDBACK */}
                    {!attempt.submitted ? (
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => submit(ex)}
                          disabled={!attempt.input.trim()}
                          className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[13px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:bg-line disabled:text-graphite disabled:shadow-none disabled:hover:translate-y-0"
                        >
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                          <span className="relative z-10">Submit answer</span>
                          <span className="relative z-10 text-[14px] text-claret transition-transform group-hover:translate-x-1 group-disabled:text-graphite">
                            →
                          </span>
                        </button>
                        {ex.kind !== 'choice' && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                            ⏎ enter to submit
                          </span>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`mt-6 border-l-4 p-5 md:p-6 ${
                          attempt.correct
                            ? 'border-sage bg-sage/8'
                            : 'border-claret bg-claret/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[14px] font-semibold ${
                              attempt.correct
                                ? 'bg-sage text-ivory'
                                : 'bg-claret text-ivory'
                            }`}
                          >
                            {attempt.correct ? '✓' : '✗'}
                          </span>
                          <p
                            className={`font-mono text-[12px] font-semibold uppercase tracking-[0.28em] ${statusColor}`}
                          >
                            {attempt.correct ? 'CORRECT' : 'NOT QUITE'}
                          </p>
                        </div>
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                          Accepted answer
                        </p>
                        <p className="mt-1 font-fraunces text-[20px] italic leading-snug text-ink md:text-[22px]">
                          &ldquo;{ex.answer}&rdquo;
                        </p>
                        {ex.explanation && (
                          <>
                            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                              Why
                            </p>
                            <p className="mt-1 font-geist text-[15px] leading-relaxed text-ink md:text-[16px]">
                              {ex.explanation}
                            </p>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </li>
          )
        })}
      </ol>

      {/* SECTION: Finalise */}
      <section className="pb-10">
        <SectionHeader title="Your progress" />
        <div className="mx-auto mt-10 max-w-[960px]">
          {!allSubmitted ? (
            <p className="text-center font-fraunces text-[20px] italic text-graphite md:text-[22px]">
              Answer every exercise to finalise the session.
            </p>
          ) : !finalized ? (
            <div className="flex flex-col items-center gap-8 border-2 border-line bg-bone px-8 py-10 text-center md:px-12 md:py-12">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-claret">
                  ◆ Session complete
                </p>
                <p className="mt-4 font-fraunces text-[56px] leading-none text-ink md:text-[72px]">
                  {percent}
                  <span className="text-[32px] text-graphite md:text-[44px]">%</span>
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
                  {score.correctCount} OF {exercises.length} CORRECT
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={finalize}
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-7 py-3.5 font-geist text-[13px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
                >
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                  <span className="relative z-10">Record score</span>
                  <span className="relative z-10 text-[14px] text-claret transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite transition-colors hover:text-claret"
                >
                  Reset session
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8 border-2 border-sage bg-sage/10 px-8 py-10 text-center md:px-12 md:py-12">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sage">
                  ◆ Recorded
                </p>
                <p className="mt-4 font-fraunces text-[48px] italic leading-tight text-ink md:text-[56px]">
                  {score.correctCount} of {exercises.length}.
                </p>
                <p className="mt-3 max-w-[52ch] font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[20px]">
                  Your best attempt is in the ledger. Move to review, or try again to improve.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={onRequestReview}
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-7 py-3.5 font-geist text-[13px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
                >
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                  <span className="relative z-10">Proceed to review</span>
                  <span className="relative z-10 text-[14px] text-claret transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite transition-colors hover:text-claret"
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
