import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { Test } from '@shared/schemas/test'
import type { SpeakingTestSubmission } from '@shared/schemas/test-ai-submission'
import { CriteriaBar } from './CriteriaBar'

interface SpeakingResultsProps {
  test: Test
  submission: SpeakingTestSubmission
}

function fmt(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
}

export function SpeakingResults({ test, submission }: SpeakingResultsProps) {
  const totalSeconds = submission.partDurations.reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-line">
        <div className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
            ◆ SPEAKING · MARKED
          </p>
          <h1 className="mt-4 font-fraunces text-[clamp(40px,5vw,72px)] leading-[1] tracking-tight text-ink">
            {test.title}
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                OVERALL BAND
              </p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 font-fraunces text-[clamp(72px,10vw,128px)] leading-none text-claret"
              >
                {submission.overall.toFixed(1)}
              </motion.p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                Mock grading — indicative only.
              </p>
            </div>
            <div className="pt-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                EXAMINER&rsquo;S NOTE
              </p>
              <p className="mt-4 max-w-[60ch] font-fraunces text-[22px] italic leading-relaxed text-graphite">
                {submission.summary}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Duration strip */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1720px] px-6 py-10 md:px-10 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
            SPEAKING DURATION
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {submission.partDurations.map((d, i) => (
              <div key={i}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                  PART {['I', 'II', 'III'][i]}
                </p>
                <p className="mt-2 font-fraunces text-[clamp(22px,2vw,28px)] leading-none text-ink">
                  {fmt(d)}
                </p>
              </div>
            ))}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                TOTAL
              </p>
              <p className="mt-2 font-fraunces text-[clamp(22px,2vw,28px)] leading-none text-claret">
                {fmt(totalSeconds)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Criteria breakdown */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
            ◆ FOUR CRITERIA
          </p>
          <h2 className="mt-3 font-fraunces text-[clamp(32px,3.6vw,48px)] leading-[1.05] text-ink">
            Where the band comes from.
          </h2>

          <ol className="mt-10 space-y-14">
            {submission.criteria.map((c, i) => (
              <li key={c.name}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr] lg:gap-14">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                      CRITERION {['I', 'II', 'III', 'IV'][i]}
                    </p>
                    <h3 className="mt-3 font-fraunces text-[clamp(22px,2vw,28px)] leading-[1.1] text-ink">
                      {c.name}
                    </h3>
                    <p className="mt-4 font-fraunces text-[40px] leading-none text-claret">
                      {c.band.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <CriteriaBar band={c.band} delay={0.1 + i * 0.08} />
                    <p className="mt-6 max-w-[62ch] font-fraunces text-[19px] leading-[1.7] text-ink">
                      {c.feedback}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1720px] flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-10 xl:px-14">
          <Link
            to="/tests"
            className="group inline-flex items-center gap-2 font-geist text-[18px] text-ink"
          >
            <span className="text-claret">←</span>
            <span className="relative">
              Return to library
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
          </Link>
          <Link
            to="/tests/$testId"
            params={{ testId: test.id }}
            className="group inline-flex items-center gap-2 font-geist text-[18px] text-ink"
          >
            <span className="relative">
              Retake this test
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
