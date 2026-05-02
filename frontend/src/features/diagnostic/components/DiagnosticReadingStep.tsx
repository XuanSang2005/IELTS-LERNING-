import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { QuestionRenderer } from '@/features/tests/components/questions/QuestionRenderer'
import { DiagnosticProgressRail } from './primitives/DiagnosticProgressRail'
import { useDiagnosticTest } from '../hooks/useDiagnosticTest'
import { useDiagnosticState } from '../hooks/useDiagnosticState'

export function DiagnosticReadingStep() {
  const navigate = useNavigate()
  const { data: test, isPending, isError } = useDiagnosticTest()
  const answers = useDiagnosticState((s) => s.readingAnswers)
  const setAnswer = useDiagnosticState((s) => s.setReadingAnswer)
  const setStep = useDiagnosticState((s) => s.setStep)
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage')

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-[920px] px-6 py-20 text-center">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="font-fraunces text-[24px] italic text-graphite"
        >
          Opening the passage…
        </motion.p>
      </div>
    )
  }
  if (isError || !test) {
    return (
      <div className="mx-auto w-full max-w-[920px] px-6 py-20 text-center">
        <p className="font-fraunces text-[20px] italic text-claret">
          The passage is momentarily out of reach. Please refresh.
        </p>
      </div>
    )
  }

  const allAnswered = test.reading.questions.every((q) => answers[q.id] !== undefined)

  const onContinue = () => {
    setStep('writing')
    void navigate({ to: '/onboarding/diagnostic/writing' })
  }

  return (
    <div className="mx-auto w-full max-w-[1540px] px-6 py-10 md:px-10 md:py-14 xl:px-14">
      <DiagnosticProgressRail active={2} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
          PASSAGE I / I · {test.reading.passageTitle.toUpperCase()}
        </p>

        {/* Mobile tabs — passage / questions */}
        <div className="mt-6 mb-6 flex border-b border-line md:hidden">
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

        <div className="mt-6 grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          {/* Passage column — mirrors PassageReader styling */}
          <article
            className={`${mobileTab === 'passage' ? 'block' : 'hidden'} md:block md:pr-4 lg:pr-6`}
          >
            <h2 className="font-fraunces text-[clamp(26px,3vw,36px)] leading-tight text-ink">
              {test.reading.passageTitle}
            </h2>
            <div
              className="mt-6 space-y-5 font-fraunces text-[17px] leading-[1.7] text-ink md:text-[19px] md:leading-[1.65] lg:text-[20px] [&_em]:italic [&_strong]:font-medium [&_strong]:text-claret"
              dangerouslySetInnerHTML={{ __html: test.reading.passageHtml }}
            />
          </article>

          {/* Questions column */}
          <section
            className={`${mobileTab === 'questions' ? 'block' : 'hidden'} md:block md:pl-4 lg:pl-6`}
          >
            <p className="mb-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
              {test.reading.instruction}
            </p>
            {test.reading.questions.map((q) => (
              <QuestionRenderer
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={(v) => setAnswer(q.id, v)}
              />
            ))}
          </section>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5 border-t border-line pt-8">
          <button
            type="button"
            onClick={onContinue}
            disabled={!allAnswered}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Continue to writing</span>
            <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          {!allAnswered && (
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">
              Answer all {test.reading.questions.length} to continue
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
