import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import type { Answer, AnswerValue, Question, Test, TestMode } from '@shared/schemas/test'
import { useTestRunnerStore } from '@/stores/test-runner-store'

interface RunnerShape {
  answers: Record<string, Answer>
  flagged: Record<string, boolean>
  setAnswer: (id: string, v: AnswerValue) => void
}
import { flattenQuestions, scoreTest } from '@/features/tests/utils/scoring'
import { useSaveResultMutation } from '@/features/tests/hooks/useTestHistoryQuery'
import { Timer } from './Timer'
import { NavFooter } from './NavFooter'
import { AudioPlayer } from './AudioPlayer'
import { PassageReader } from './PassageReader'
import { QuestionRenderer } from './questions/QuestionRenderer'
import { WritingBody } from './WritingBody'
import { SpeakingBody } from './SpeakingBody'

const ROMAN = ['I', 'II', 'III', 'IV'] as const

interface TestRunnerProps {
  test: Test
  mode: TestMode
}

export function TestRunner({ test, mode }: TestRunnerProps) {
  // Writing and Speaking use their own shells — different data shape, different flow.
  if (test.skill === 'writing') return <WritingBody test={test} />
  if (test.skill === 'speaking') return <SpeakingBody test={test} />
  return <ListeningReadingRunner test={test} mode={mode} />
}

function ListeningReadingRunner({ test, mode }: TestRunnerProps) {
  const navigate = useNavigate()
  const runner = useTestRunnerStore()
  const saveResult = useSaveResultMutation()
  const [timeLeft, setTimeLeft] = useState(() => {
    const minutes = mode === 'short' ? test.shortDurationMinutes : test.fullDurationMinutes
    return minutes * 60
  })
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [expired, setExpired] = useState(false)

  const questions: Question[] = useMemo(() => {
    const all = flattenQuestions(test)
    if (mode === 'short') {
      const take = Math.max(1, Math.floor(all.length / 2))
      return all.slice(0, take)
    }
    return all
  }, [test, mode])

  const activeQuestionId = runner.currentQuestionId ?? questions[0]?.id ?? null
  const activeIndex = questions.findIndex((q) => q.id === activeQuestionId)

  // Bootstrap runner state when the component mounts / test changes.
  useEffect(() => {
    runner.start(test.id, mode)
    if (questions[0]) runner.setCurrentQuestion(questions[0].id)
    return () => runner.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id, mode])

  // Tick timer.
  useEffect(() => {
    if (expired) return
    const id = window.setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [expired])

  // Auto-submit on expiry.
  useEffect(() => {
    if (timeLeft === 0 && !expired) {
      setExpired(true)
      window.setTimeout(() => {
        void handleSubmit()
      }, 1500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, expired])

  // Prev/Next navigation between top-level parts — listening sections for
  // listening tests, passages for reading tests.
  const parts = useMemo(() => test.sections ?? test.passages ?? [], [test])

  const sectionFirstQuestionIds = useMemo(() => {
    const firsts: string[] = []
    const seen = new Set<string>()
    for (const part of parts) {
      for (const group of part.groups) {
        for (const q of group.questions) {
          if (questions.some((vq) => vq.id === q.id) && !seen.has(part.id)) {
            firsts.push(q.id)
            seen.add(part.id)
            break
          }
        }
        if (seen.has(part.id)) break
      }
    }
    return firsts
  }, [parts, questions])

  const activeSectionIndex = (() => {
    if (!activeQuestionId) return -1
    return parts.findIndex((s) =>
      s.groups.some((g) => g.questions.some((q) => q.id === activeQuestionId)),
    )
  })()

  const handleJump = (id: string) => runner.setCurrentQuestion(id)
  const handlePrev = () => {
    const prevSectionFirst = sectionFirstQuestionIds[activeSectionIndex - 1]
    if (prevSectionFirst) runner.setCurrentQuestion(prevSectionFirst)
  }
  const handleNext = () => {
    const nextSectionFirst = sectionFirstQuestionIds[activeSectionIndex + 1]
    if (nextSectionFirst) runner.setCurrentQuestion(nextSectionFirst)
  }
  const handleFlagActive = () => {
    if (activeQuestionId) runner.toggleFlag(activeQuestionId)
  }

  async function handleSubmit() {
    if (!runner.startedAt || !runner.testId) return
    const result = scoreTest({
      test,
      answers: runner.answers,
      startedAt: runner.startedAt,
      submittedAt: new Date().toISOString(),
      mode,
    })
    await saveResult.mutateAsync(result)
    void navigate({
      to: '/tests/$testId/results',
      params: { testId: test.id },
      search: { resultId: result.id },
    })
  }

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        handleFlagActive()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  const activeQuestion = questions[activeIndex] ?? questions[0]
  const activePart = activeSectionIndex >= 0 ? parts[activeSectionIndex] : undefined
  const totalParts = parts.length
  const activePartNumeral =
    activePart && 'number' in activePart
      ? ROMAN[(activePart.number as 1 | 2 | 3 | 4) - 1] ?? String(activePart.number)
      : null
  const activePartWordCount =
    activePart && 'wordCount' in activePart ? activePart.wordCount : null

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ivory">
      <header className="shrink-0 border-b border-line bg-ivory">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-3 md:px-10 xl:px-14">
          <div className="min-w-0 flex-1">
            {activePart && activePartNumeral ? (
              <>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                  {test.skill === 'reading' ? 'PASSAGE' : 'SECTION'}{' '}
                  <span className="text-ink">№ {activePartNumeral}</span>
                  <span className="mx-2 text-line" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-graphite">{totalParts} TOTAL</span>
                  {activePartWordCount !== null && (
                    <>
                      <span className="mx-2 text-line" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-graphite">{activePartWordCount} WORDS</span>
                    </>
                  )}
                </p>
                <p className="mt-1 truncate font-fraunces text-[17px] italic leading-tight text-ink">
                  {activePart.title}
                </p>
              </>
            ) : null}
          </div>
          <Timer remainingSeconds={timeLeft} />
        </div>
        <div className="h-[2px] bg-line">
          <div
            className="h-full bg-claret transition-all duration-500"
            style={{
              width: `${
                (Object.keys(runner.answers).length / Math.max(1, questions.length)) * 100
              }%`,
            }}
          />
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        {test.skill === 'listening' ? (
          <ListeningBody test={test} activeQuestion={activeQuestion} runner={runner} />
        ) : (
          <ReadingBody test={test} activeQuestion={activeQuestion} runner={runner} />
        )}
      </main>

      <NavFooter
        questions={questions}
        answers={runner.answers}
        flagged={runner.flagged}
        activeQuestionId={activeQuestionId}
        onJump={handleJump}
        onPrev={handlePrev}
        onNext={handleNext}
        onFlagActive={handleFlagActive}
        onSubmit={() => setShowConfirmSubmit(true)}
        canPrev={activeSectionIndex > 0}
        canNext={
          activeSectionIndex >= 0 &&
          activeSectionIndex < sectionFirstQuestionIds.length - 1
        }
      />

      <AnimatePresence>
        {showConfirmSubmit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6"
          >
            <div className="w-full max-w-[440px] border border-line bg-ivory p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                ◆ SUBMIT THIS TEST?
              </p>
              <h2 className="mt-4 font-fraunces text-[24px] leading-none text-ink">
                Submit your answers.
              </h2>
              <p className="mt-3 font-fraunces text-[19px] italic text-graphite">
                {Object.keys(runner.answers).length} of {questions.length} questions answered.
                Unanswered questions will be marked wrong.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite transition-colors hover:border-ink hover:text-ink"
                >
                  RETURN
                </button>
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-ink-warm px-5 py-2 font-geist text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-ink"
                >
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                  <span className="relative z-10">Submit</span>
                  <span className="relative z-10 text-claret">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {expired && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ivory"
          >
            <div className="text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                ◆ TIME
              </p>
              <h2 className="mt-4 font-fraunces text-[clamp(48px,6vw,88px)] leading-none text-ink">
                Time.
              </h2>
              <p className="mt-3 font-fraunces text-[20px] italic text-graphite">
                Your answers are being marked.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── sub-layouts ─── */

function ListeningBody({
  test,
  activeQuestion,
  runner,
}: {
  test: Test
  activeQuestion: Question | undefined
  runner: RunnerShape
}) {
  const sections = test.sections ?? []
  const activeSection =
    sections.find((s) =>
      s.groups.some((g) => g.questions.some((q) => q.id === activeQuestion?.id)),
    ) ?? sections[0]
  const activeGroup = activeSection?.groups.find((g) =>
    g.questions.some((q) => q.id === activeQuestion?.id),
  )

  if (!activeSection) return null

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mx-auto max-w-[1540px] px-6 py-8 md:px-10 xl:px-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
          SECTION 0{activeSection.number} / IV · {activeSection.title.toUpperCase()}
        </p>

        <div className="mt-6">
          <AudioPlayer audioUrl={activeSection.audioUrl} transcript={activeSection.transcript} />
        </div>

        {activeGroup && (
          <div className="mt-8">
            <p className="mb-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
              {activeGroup.instruction}
            </p>
            {activeGroup.questions.map((q) => (
              <QuestionRenderer
                key={q.id}
                question={q}
                value={runner.answers[q.id]?.value}
                onChange={(v) => runner.setAnswer(q.id, v)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ReadingBody({
  test,
  activeQuestion,
  runner,
}: {
  test: Test
  activeQuestion: Question | undefined
  runner: RunnerShape
}) {
  const passages = test.passages ?? []
  const activePassage =
    passages.find((p) =>
      p.groups.some((g) => g.questions.some((q) => q.id === activeQuestion?.id)),
    ) ?? passages[0]
  const activeGroup = activePassage?.groups.find((g) =>
    g.questions.some((q) => q.id === activeQuestion?.id),
  )

  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('questions')

  if (!activePassage) return null

  return (
    <div className="flex h-full w-full flex-col px-6 pt-8 md:px-10 xl:px-14">
      {/* Mobile tabs */}
      <div className="mb-6 flex shrink-0 border-b border-line lg:hidden">
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

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <section
          className={`${mobileTab === 'passage' ? 'block' : 'hidden'} lg:block lg:overflow-y-auto lg:pb-8 lg:pr-6`}
        >
          <PassageReader passage={activePassage} />
        </section>
        <section
          className={`${mobileTab === 'questions' ? 'block' : 'hidden'} lg:block lg:overflow-y-auto lg:pb-8 lg:pl-6`}
        >
          {activeGroup && (
            <div>
              <p className="mb-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
                {activeGroup.instruction}
              </p>
              {activeGroup.questions.map((q) => (
                <QuestionRenderer
                  key={q.id}
                  question={q}
                  value={runner.answers[q.id]?.value}
                  onChange={(v) => runner.setAnswer(q.id, v)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
