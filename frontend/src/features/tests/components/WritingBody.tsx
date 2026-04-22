import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import type { Test } from '@shared/schemas/test'
import { ApiError } from '@/lib/api-client'
import { useSubmitWritingTestMutation } from '@/features/tests/hooks/useWritingTestSubmission'
import {
  clearEssayDrafts,
  loadEssayDraft,
  saveEssayDraft,
} from '@/features/tests/utils/essay-drafts'
import { Timer } from './Timer'
import { EssayEditor } from './EssayEditor'

interface WritingBodyProps {
  test: Test
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function WritingBody({ test }: WritingBodyProps) {
  const navigate = useNavigate()
  const tasks = useMemo(
    () => test.tasks ?? [],
    [test.tasks],
  )
  const task1 = tasks.find((t) => t.task === 1)
  const task2 = tasks.find((t) => t.task === 2)

  const [activeTask, setActiveTask] = useState<1 | 2>(1)
  const [task1Text, setTask1Text] = useState<string>(() => loadEssayDraft(test.id, 1))
  const [task2Text, setTask2Text] = useState<string>(() => loadEssayDraft(test.id, 2))
  const [timeLeft, setTimeLeft] = useState(() => test.fullDurationMinutes * 60)
  const [showSubmit, setShowSubmit] = useState(false)
  const [expired, setExpired] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const submitMutation = useSubmitWritingTestMutation()
  const grading = submitMutation.isPending

  // Autosave on change (debounced via a simple effect — writes are cheap).
  useEffect(() => {
    saveEssayDraft(test.id, 1, task1Text)
  }, [test.id, task1Text])
  useEffect(() => {
    saveEssayDraft(test.id, 2, task2Text)
  }, [test.id, task2Text])

  // Timer tick.
  useEffect(() => {
    if (expired || grading) return
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
  }, [expired, grading])

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

  async function handleSubmit() {
    if (grading) return
    setSubmitError(null)
    try {
      const submission = await submitMutation.mutateAsync({
        testId: test.id,
        task1Text,
        task2Text,
      })
      clearEssayDrafts(test.id)
      void navigate({
        to: '/tests/$testId/results',
        params: { testId: test.id },
        search: { resultId: submission.id },
      })
    } catch (err) {
      if (err instanceof ApiError) {
        const body = err.body as { message?: string } | string | undefined
        setSubmitError(
          typeof body === 'object' && body?.message
            ? body.message
            : typeof body === 'string'
              ? body
              : err.message,
        )
      } else {
        setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
      }
    }
  }

  if (!task1 || !task2) {
    return (
      <div className="mx-auto max-w-[1720px] px-6 py-20 md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-claret">
          This Writing test is missing a task. Please return to the library.
        </p>
      </div>
    )
  }

  const activePrompt = activeTask === 1 ? task1 : task2
  const activeValue = activeTask === 1 ? task1Text : task2Text
  const setActiveValue = activeTask === 1 ? setTask1Text : setTask2Text
  const task1Words = countWords(task1Text)
  const task2Words = countWords(task2Text)

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-line bg-ivory">
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between gap-4 px-6 py-3 md:px-10 xl:px-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              WRITING · {test.title.toUpperCase()}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">
              TASK {activeTask} OF II · {activePrompt.minutes} MIN SUGGESTED
            </p>
          </div>
          <Timer remainingSeconds={timeLeft} />
        </div>
        <div className="h-[2px] bg-line">
          <div
            className="h-full bg-claret transition-all duration-500"
            style={{
              width: `${Math.min(100, ((task1Words + task2Words) / (task1.wordMin + task2.wordMin)) * 100)}%`,
            }}
          />
        </div>
      </header>

      {/* Task tabs */}
      <div className="border-b border-line bg-ivory">
        <div className="mx-auto flex max-w-[1720px] px-6 md:px-10 xl:px-14">
          {([task1, task2] as const).map((t) => {
            const isActive = activeTask === t.task
            const words = t.task === 1 ? task1Words : task2Words
            return (
              <button
                key={t.task}
                type="button"
                onClick={() => setActiveTask(t.task)}
                className={`group relative px-6 py-5 text-left transition-colors ${
                  isActive ? '-mb-[2px] border-b-2 border-b-claret' : ''
                }`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                    isActive ? 'text-claret' : 'text-graphite'
                  }`}
                >
                  TASK {t.task === 1 ? 'I' : 'II'} · {t.minutes} MIN
                </p>
                <p
                  className={`mt-1 font-fraunces text-[22px] leading-none ${
                    isActive ? 'text-ink' : 'text-graphite group-hover:text-ink'
                  }`}
                >
                  {t.title}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-graphite">
                  <span className={words < t.wordMin ? 'text-claret' : 'text-sage'}>
                    {words}
                  </span>{' '}
                  / {t.wordMin} MIN
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Body — prompt left, editor right */}
      <main className="flex-1">
        <div className="mx-auto grid max-w-[1720px] grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[420px_1fr] lg:gap-12 xl:px-14">
          <section className="lg:sticky lg:top-[120px] lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
              TASK {activePrompt.task === 1 ? 'I' : 'II'} · PROMPT
            </p>
            <h2 className="mt-3 font-fraunces text-[clamp(28px,3vw,36px)] leading-[1.1] text-ink">
              {activePrompt.title}
            </h2>
            <p className="mt-5 font-fraunces text-[19px] leading-[1.7] text-ink">
              {activePrompt.prompt}
            </p>
            {activePrompt.imageUrl && (
              <div className="mt-6 border border-line bg-bone/40 p-4">
                <img
                  src={activePrompt.imageUrl}
                  alt={`${activePrompt.title} — reference image`}
                  className="w-full"
                />
              </div>
            )}
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              WRITE AT LEAST {activePrompt.wordMin} WORDS
            </p>
          </section>

          <section>
            <EssayEditor
              value={activeValue}
              onChange={setActiveValue}
              wordMin={activePrompt.wordMin}
              placeholder="Begin writing…"
              ariaLabel={`Task ${activePrompt.task} essay`}
            />
          </section>
        </div>
      </main>

      {/* Footer submit bar */}
      <footer className="sticky bottom-0 z-30 border-t border-line bg-ivory">
        <div className="mx-auto flex max-w-[1720px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10 xl:px-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            TASK 1 ·{' '}
            <span className={task1Words < task1.wordMin ? 'text-claret' : 'text-ink'}>
              {task1Words}
            </span>{' '}
            / {task1.wordMin} ◆ TASK 2 ·{' '}
            <span className={task2Words < task2.wordMin ? 'text-claret' : 'text-ink'}>
              {task2Words}
            </span>{' '}
            / {task2.wordMin}
          </p>
          {submitError && (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-claret">
              ◆ {submitError}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowSubmit(true)}
            disabled={grading}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Submit the test</span>
            <span className="relative z-10 text-claret">→</span>
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {showSubmit && !grading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6"
          >
            <div className="w-full max-w-[440px] border border-line bg-ivory p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                ◆ SUBMIT FOR MARKING?
              </p>
              <h2 className="mt-4 font-fraunces text-[24px] leading-none text-ink">
                Close the session.
              </h2>
              <p className="mt-3 font-fraunces text-[18px] italic leading-snug text-graphite">
                Task 1: {task1Words} words. Task 2: {task2Words} words. Once submitted, the
                marker returns within moments.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmit(false)}
                  className="border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite transition-colors hover:border-ink hover:text-ink"
                >
                  RETURN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmit(false)
                    void handleSubmit()
                  }}
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

        {(expired || grading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ivory"
          >
            <div className="text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                ◆ {expired ? 'TIME' : 'MARKING'}
              </p>
              <h2 className="mt-4 font-fraunces text-[clamp(48px,6vw,88px)] leading-none text-ink">
                {expired ? 'Time.' : 'Reading your writing…'}
              </h2>
              <p className="mt-3 font-fraunces text-[20px] italic text-graphite">
                The marker returns in a moment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
