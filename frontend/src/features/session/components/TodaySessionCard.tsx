import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTodayLog } from '@/features/practice/hooks/practice-queries'
import { useSessionBlueprint } from '../hooks/use-session-blueprint'

export function TodaySessionCard() {
  const blueprint = useSessionBlueprint()
  const todayLog = useTodayLog()
  const stepsDoneCount = todayLog.stepsCompleted.length

  if (!blueprint) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-fraunces text-[clamp(17px,1.5vw,24px)] italic text-graphite">
          Opening today&rsquo;s session&hellip;
        </p>
      </motion.section>
    )
  }

  const totalSteps = blueprint.steps.length
  const allDone = stepsDoneCount >= totalSteps

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="font-fraunces text-[clamp(32px,4vw,48px)] leading-[1.05] text-ink">
        {blueprint.title}
      </h2>

      <p className="mt-3 max-w-[54ch] font-fraunces text-[clamp(16px,1.45vw,22px)] italic leading-relaxed text-graphite">
        {blueprint.tagline}
      </p>

      <ul className="mt-8 border-t border-line pt-4">
        {blueprint.steps.map((step, i) => {
          const stepNumber = i + 1
          const done = stepsDoneCount >= stepNumber
          return (
            <li
              key={step.id}
              className="flex items-baseline justify-between border-b border-line/60 py-2.5 text-[clamp(13px,1.1vw,16px)]"
            >
              <span
                className={`font-mono uppercase tracking-[0.22em] ${
                  done ? 'text-sage' : 'text-graphite'
                }`}
              >
                {done ? '◆' : '○'} {String(stepNumber).padStart(2, '0')} ·{' '}
                <span className={done ? 'text-sage' : 'text-ink'}>{step.title}</span>
              </span>
              <span className="font-mono uppercase tracking-[0.22em] text-graphite">
                {step.minutes} MIN
              </span>
            </li>
          )
        })}
      </ul>

      {allDone ? (
        <p className="mt-8 font-fraunces text-[clamp(17px,1.5vw,24px)] italic leading-relaxed text-sage">
          <span className="mr-2 not-italic text-claret">◆</span>Complete. Return tomorrow at nine.
        </p>
      ) : (
        <Link
          to="/app/session"
          search={{ step: (Math.min(stepsDoneCount + 1, totalSteps) as 1 | 2 | 3 | 4 | 5 | 6) }}
          className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[clamp(12px,0.95vw,14px)] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">
            {stepsDoneCount === 0 ? "Begin today's session" : `Resume at step ${stepsDoneCount + 1}`}
          </span>
          <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </motion.section>
  )
}
