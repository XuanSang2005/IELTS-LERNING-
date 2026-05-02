import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { DiagnosticProgressRail } from './primitives/DiagnosticProgressRail'
import { useDiagnosticTest } from '../hooks/useDiagnosticTest'
import { useDiagnosticState } from '../hooks/useDiagnosticState'
import { useSubmitDiagnostic } from '../hooks/useSubmitDiagnostic'
import { countWords } from '../utils/grade-mapping'

export function DiagnosticWritingStep() {
  const navigate = useNavigate()
  const { data: test, isPending, isError } = useDiagnosticTest()
  const writingText = useDiagnosticState((s) => s.writingText)
  const setWritingText = useDiagnosticState((s) => s.setWritingText)
  const listeningAnswers = useDiagnosticState((s) => s.listeningAnswers)
  const readingAnswers = useDiagnosticState((s) => s.readingAnswers)
  const startedAt = useDiagnosticState((s) => s.startedAt)
  const setStep = useDiagnosticState((s) => s.setStep)
  const submit = useSubmitDiagnostic()

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-[920px] px-6 py-20 text-center">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="font-fraunces text-[24px] italic text-graphite"
        >
          Opening the prompt…
        </motion.p>
      </div>
    )
  }
  if (isError || !test) {
    return (
      <div className="mx-auto w-full max-w-[920px] px-6 py-20 text-center">
        <p className="font-fraunces text-[20px] italic text-claret">
          The prompt is momentarily out of reach. Please refresh.
        </p>
      </div>
    )
  }

  const wordCount = countWords(writingText)
  const minWords = test.writing.minWords
  const meetsMin = wordCount >= minWords

  const onSubmit = async () => {
    if (!meetsMin) return
    setStep('grading')
    void navigate({ to: '/onboarding/diagnostic/result' })
    const durationSeconds = startedAt
      ? Math.round((Date.now() - startedAt) / 1000)
      : 0
    try {
      await submit.mutateAsync({
        testId: test.id,
        durationSeconds,
        listeningAnswers,
        readingAnswers,
        writingText,
      })
      // Result screen reads from useSubmitDiagnostic cache (diagnosticResultKey)
      // and the practiceState invalidation pulls the new currentBand.
    } catch {
      // Stay on grading screen with retry surfaced via mutation state on result page.
    }
  }

  return (
    <div className="mx-auto w-full max-w-[920px] px-6 py-10 md:py-14">
      <DiagnosticProgressRail active={3} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em]">
          <span className="text-claret">§ III · WRITING</span>
          <span className="mx-2 text-line">·</span>
          <span className="text-graphite">{minWords}+ WORDS</span>
        </p>

        <h2 className="mt-4 text-center font-fraunces text-[clamp(28px,3.5vw,44px)] font-normal leading-[1] tracking-[-0.02em] text-ink">
          Write what you think
          <span className="text-claret">.</span>
        </h2>

        <div className="mt-8 border-l-2 border-claret pl-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">
            ◆ PROMPT
          </p>
          <p className="mt-3 font-fraunces text-[18px] leading-relaxed text-ink md:text-[20px]">
            {test.writing.prompt}
          </p>
        </div>

        <div className="mt-8">
          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            placeholder="Begin here…"
            rows={16}
            className="w-full resize-y border border-line bg-ivory px-5 py-4 font-fraunces text-[17px] leading-[1.7] text-ink placeholder:text-graphite/50 focus:border-claret focus:outline-none md:text-[18px]"
          />
          <div className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.28em]">
            <span className={meetsMin ? 'text-sage' : 'text-graphite'}>
              {wordCount} / {minWords} WORDS
            </span>
            <span className="text-graphite/70">
              {meetsMin ? 'Ready to submit' : `${minWords - wordCount} more to continue`}
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => void onSubmit()}
            disabled={!meetsMin || submit.isPending}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">
              {submit.isPending ? 'Submitting…' : 'Submit for grading'}
            </span>
            <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {submit.isError && (
          <p className="mt-6 text-center font-fraunces text-[16px] italic text-claret">
            The examiner is momentarily out of reach. Please try again.
          </p>
        )}
      </motion.div>
    </div>
  )
}
