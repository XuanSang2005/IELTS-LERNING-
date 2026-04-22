import { motion } from 'framer-motion'
import { disciplineLabels, progressData, type Discipline } from '../data/lessons'

const ease = [0.22, 1, 0.36, 1] as const
const ORDER: Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']

export function StudyHeader() {
  const overall = ORDER.reduce(
    (acc, d) => ({
      done: acc.done + progressData[d].done,
      total: acc.total + progressData[d].total,
    }),
    { done: 0, total: 0 },
  )

  return (
    <header className="border-b border-line">
      <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-12 xl:px-14">
        {/* Left — title + pullquote (8 cols) */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret"
          >
            EDITION № 08 / WEEK III
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="mt-6 font-fraunces text-[clamp(56px,8vw,104px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink"
          >
            The Library.
          </motion.h1>
          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-8 max-w-[54ch] font-fraunces text-[24px] italic leading-[1.4] text-graphite md:text-[24px]"
          >
            "Study is not the accumulation of facts, but the patient forming of habits."
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.26 }}
            className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite"
          >
            — EDITORIAL NOTE, WEEK III
          </motion.p>
        </div>

        {/* Right — Candidate Progress (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="lg:col-span-4"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
            CANDIDATE PROGRESS
          </p>
          <div className="mt-3 border-t border-line" />
          <ul className="mt-5 space-y-5">
            {ORDER.map((d, i) => {
              const { done, total } = progressData[d]
              const pct = Math.round((done / total) * 100)
              return (
                <li key={d}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-fraunces text-[22px] text-ink">
                      {disciplineLabels[d]}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                      {done} / {total} lessons
                    </span>
                  </div>
                  <div className="mt-2 h-px w-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                      className="h-full bg-claret"
                    />
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            OVERALL · {overall.done} / {overall.total} LESSONS
          </p>
        </motion.div>
      </div>
    </header>
  )
}
