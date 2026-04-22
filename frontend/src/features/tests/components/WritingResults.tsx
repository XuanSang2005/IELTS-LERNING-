import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { Test } from '@shared/schemas/test'
import type { WritingTestSubmission } from '@shared/schemas/test-ai-submission'
import { CriteriaBar } from './CriteriaBar'

interface WritingResultsProps {
  test: Test
  submission: WritingTestSubmission
}

export function WritingResults({ test, submission }: WritingResultsProps) {
  const task1 = test.tasks?.find((t) => t.task === 1)
  const task2 = test.tasks?.find((t) => t.task === 2)

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-line">
        <div className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
            ◆ WRITING · MARKED
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

      {/* Submitted writing */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
            ◆ YOUR WRITING
          </p>
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <article>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                TASK I · {task1?.title ?? 'Task 1'}
              </p>
              <pre className="mt-4 whitespace-pre-wrap border-l-2 border-line pl-5 font-fraunces text-[18px] leading-[1.7] text-ink">
                {submission.task1Text || <span className="italic text-graphite">No response.</span>}
              </pre>
            </article>
            <article>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                TASK II · {task2?.title ?? 'Task 2'}
              </p>
              <pre className="mt-4 whitespace-pre-wrap border-l-2 border-line pl-5 font-fraunces text-[18px] leading-[1.7] text-ink">
                {submission.task2Text || <span className="italic text-graphite">No response.</span>}
              </pre>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
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
