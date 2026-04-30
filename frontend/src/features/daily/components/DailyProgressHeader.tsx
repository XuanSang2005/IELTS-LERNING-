import { motion } from 'framer-motion'
import type { BandLevel } from '@shared/schemas/practice'
import {
  DAILY_STEPS,
  ESTIMATED_MINUTES_BY_LEVEL,
  STEP_MINUTES_BY_LEVEL,
} from '../data/step-config'

const ROMAN: Record<1 | 2 | 3 | 4 | 5, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }

const LEVEL_LABEL: Record<BandLevel, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  mastery: 'Mastery',
}

interface DailyProgressHeaderProps {
  day: 1 | 2 | 3 | 4 | 5
  level: BandLevel
  activeNumber: 1 | 2 | 3 | 4 | 5
  completed: number
  onSelect: (n: 1 | 2 | 3 | 4 | 5) => void
}

/**
 * Full-width progress header that replaces the per-step chapter-opener.
 * Lives at the top of the main column, so it remains mounted as the
 * active step changes — the fill animation glides instead of resetting.
 *
 * Layout (single column, three rows):
 *   1. Meta strip — day badge / level / count strip
 *   2. Five-segment label row — Roman numeral + step title, click-to-jump
 *   3. Animated fill track + tick markers + floating ◆ indicator
 */
export function DailyProgressHeader({
  day,
  level,
  activeNumber,
  completed,
  onSelect,
}: DailyProgressHeaderProps) {
  const total = 5
  const totalMinutes = ESTIMATED_MINUTES_BY_LEVEL[level]
  const stepMinutes = STEP_MINUTES_BY_LEVEL[level]
  const allDone = completed >= total

  // Fill ends EXACTLY at a tick — no dangling. The bar covers tick 1 (0%)
  // through tick `last` where `last` is the rightmost tick that's either
  // completed or currently active. With ticks at 0/25/50/75/100, this
  // means a 4-completed session draws the fill to 75% (tick IV) rather
  // than overshooting to 80% (the old `completed/total` ratio).
  const lastTickIndex = Math.max(completed, activeNumber) - 1
  const pct = lastTickIndex < 0 ? 0 : (lastTickIndex / (total - 1)) * 100
  const indicatorPct = ((activeNumber - 1) / (total - 1)) * 100

  return (
    <section className="border-b border-line pb-10">
      {/* ── Meta strip ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] md:text-[12px]">
          <span className="mr-2 text-claret">◆</span>
          <span className="text-claret">DAY {ROMAN[day]} OF V</span>
          <span className="mx-2 text-graphite">·</span>
          <span className="text-graphite">{LEVEL_LABEL[level].toUpperCase()}</span>
          <span className="mx-2 text-graphite">·</span>
          <span className="text-graphite">{totalMinutes} MIN TOTAL</span>
        </p>
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.3em] ${
            allDone ? 'text-sage' : 'text-graphite'
          }`}
        >
          {completed} / {total} {allDone ? 'SESSION CLOSED' : 'STEPS COMPLETE'}
        </p>
      </div>

      {/* ── Five-segment label row — clickable navigation ────────────── */}
      <div className="mt-7 grid grid-cols-5 gap-2 md:gap-4">
        {DAILY_STEPS.map((step) => {
          const n = step.number
          const isCurrent = n === activeNumber
          const isDone = n <= completed
          const titleTone = isCurrent ? 'text-ink' : isDone ? 'text-sage' : 'text-ink/55'
          const numeralTone = isCurrent ? 'text-claret' : isDone ? 'text-ink' : 'text-graphite/70'
          return (
            <button
              key={n}
              type="button"
              onClick={() => onSelect(n)}
              className="group flex flex-col items-start gap-1 text-left transition-colors duration-200"
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.28em] ${numeralTone}`}
              >
                § {ROMAN[n]}
              </span>
              <span
                className={`hidden font-fraunces text-[clamp(20px,2vw,28px)] leading-tight sm:block ${titleTone} ${
                  isCurrent ? 'italic' : ''
                }`}
              >
                {step.title}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-graphite sm:block">
                {stepMinutes[step.kind]} MIN
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Animated track + tick markers + floating ◆ ─────────────── */}
      <div className="relative mt-6 h-1 bg-line">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 h-full bg-ink"
        />

        {/* Square tick markers at each boundary — clickable to jump */}
        {([1, 2, 3, 4, 5] as const).map((n) => {
          const left = ((n - 1) / (total - 1)) * 100
          const isDone = n <= completed
          const isCurrent = n === activeNumber
          const fill = isDone
            ? 'bg-ink border-ink hover:border-claret'
            : isCurrent
              ? 'bg-ivory border-claret'
              : 'bg-ivory border-line hover:border-ink'
          return (
            <button
              key={n}
              type="button"
              onClick={() => onSelect(n)}
              aria-label={`Go to step ${n}`}
              style={{ left: `${left}%` }}
              className={`absolute top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 cursor-pointer border transition-colors duration-200 ${fill}`}
            />
          )
        })}

        {/* "You are here" floating diamond above the active tick */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ left: `${indicatorPct}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-4 -translate-x-1/2 font-mono text-[12px] text-claret"
        >
          ◆
        </motion.span>
      </div>
    </section>
  )
}
