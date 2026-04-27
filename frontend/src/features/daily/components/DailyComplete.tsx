import { Link } from '@tanstack/react-router'
import type { BandLevel } from '@shared/schemas/practice'

interface DailyCompleteProps {
  level: BandLevel
  day: 1 | 2 | 3 | 4 | 5
  onRestart?: () => void
}

const ROMAN: Record<1 | 2 | 3 | 4 | 5, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }

const LEVEL_LABEL: Record<BandLevel, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  mastery: 'Mastery',
}

export function DailyComplete({ level, day, onRestart }: DailyCompleteProps) {
  return (
    <section className="mx-auto w-full max-w-[860px] px-6 py-20 md:px-10 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em]">
        <span className="mr-2 text-claret">◆</span>
        <span className="text-claret">SESSION CLOSED</span>
        <span className="mx-2 text-graphite">·</span>
        <span className="text-graphite">DAY {ROMAN[day]} OF V</span>
        <span className="mx-2 text-graphite">·</span>
        <span className="text-graphite">{LEVEL_LABEL[level].toUpperCase()}</span>
      </p>

      <h1 className="mt-6 font-fraunces text-[clamp(48px,6vw,80px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
        The library is <em className="italic">closed</em> for today.
      </h1>

      <blockquote className="mt-8 max-w-[64ch] border-l-2 border-claret pl-6 font-fraunces text-[clamp(20px,1.7vw,26px)] italic leading-[1.5] text-graphite">
        “The candidate who plateaus does not lack effort. They lack a system. You returned
        today — that is the system.”
      </blockquote>
      <p className="mt-3 pl-6 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
        — EDITORIAL NOTE, VOL. I
      </p>

      <div className="mt-12 flex flex-wrap gap-6">
        <Link
          to="/app"
          className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">Return to dashboard</span>
          <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className="group inline-flex items-center gap-2 font-geist text-[14px] text-ink"
          >
            <span className="relative">
              Begin again
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-[13px] text-claret transition-transform duration-200">↺</span>
          </button>
        )}
      </div>
    </section>
  )
}
