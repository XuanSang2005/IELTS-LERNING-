import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { AudioPlayer } from '@/features/tests/components/AudioPlayer'
import { QuestionRenderer } from '@/features/tests/components/questions/QuestionRenderer'
import { DiagnosticProgressRail } from './primitives/DiagnosticProgressRail'
import { useDiagnosticTest } from '../hooks/useDiagnosticTest'
import { useDiagnosticState } from '../hooks/useDiagnosticState'

export function DiagnosticListeningStep() {
  const navigate = useNavigate()
  const { data: test, isPending, isError } = useDiagnosticTest()
  const answers = useDiagnosticState((s) => s.listeningAnswers)
  const setAnswer = useDiagnosticState((s) => s.setListeningAnswer)
  const setStep = useDiagnosticState((s) => s.setStep)

  if (isPending) return <LoadingShell label="Opening the test…" />
  if (isError || !test) return <ErrorShell />

  const allAnswered = test.listening.questions.every((q) => answers[q.id] !== undefined)

  const onContinue = () => {
    setStep('reading')
    void navigate({ to: '/onboarding/diagnostic/reading' })
  }

  return (
    <div className="mx-auto w-full max-w-[1540px] px-6 py-10 md:px-10 md:py-14 xl:px-14">
      <DiagnosticProgressRail active={1} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        {/* Test-page-style section header */}
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
          {test.listening.sectionTitle.toUpperCase()}
        </p>

        {/* Audio player — same component as the test page */}
        <div className="mt-6">
          <AudioPlayer
            audioUrl={test.listening.audioUrl}
            transcript={test.listening.transcript}
          />
        </div>

        {/* Group instruction + questions */}
        <div className="mt-8">
          <p className="mb-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
            {test.listening.instruction}
          </p>
          {test.listening.questions.map((q) => (
            <QuestionRenderer
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5 border-t border-line pt-8">
          <button
            type="button"
            onClick={onContinue}
            disabled={!allAnswered}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Continue to reading</span>
            <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          {!allAnswered && (
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">
              Answer all {test.listening.questions.length} to continue
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function LoadingShell({ label }: { label: string }) {
  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-20 text-center">
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="font-fraunces text-[24px] italic text-graphite"
      >
        {label}
      </motion.p>
    </div>
  )
}

function ErrorShell() {
  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-20 text-center">
      <p className="font-fraunces text-[20px] italic text-claret">
        The test is momentarily out of reach. Please refresh.
      </p>
    </div>
  )
}
