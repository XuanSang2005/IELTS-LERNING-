import { Link } from '@tanstack/react-router'

interface DisciplineShortcutsProps {
  weekNumber: number
}

/**
 * Two-card shortcut row giving a direct entry to the user's current-week
 * Grammar and Vocabulary lessons. Sits between the agenda checklist and the
 * primary daily-loop CTA — offers a "discipline-first" path alongside the
 * "linear-loop" path.
 */
export function DisciplineShortcuts({ weekNumber }: DisciplineShortcutsProps) {
  const weekStr = String(weekNumber).padStart(2, '0')

  return (
    <div className="mt-10 grid grid-cols-1 border-t border-line md:grid-cols-2">
      {/* Grammar */}
      <Link
        to="/app/grammar/$week"
        params={{ week: String(weekNumber) }}
        search={{ tab: 'lesson' }}
        className="group relative flex flex-col gap-3 overflow-hidden border-b border-line bg-ivory p-6 transition-colors duration-200 hover:bg-bone/60 md:border-b-0 md:border-r"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-claret transition-transform duration-300 group-hover:scale-x-100"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
          <span className="text-claret">◆</span> GRAMMAR · WEEK {weekStr}
        </p>
        <h5 className="font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
          Continue today's lesson
          <span className="text-claret">.</span>
        </h5>
        <p className="flex items-baseline justify-between gap-3 font-fraunces text-[15px] italic text-graphite">
          <span>Begin with conditionals</span>
          <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </Link>

      {/* Vocabulary */}
      <Link
        to="/app/lexicon/$week"
        params={{ week: String(weekNumber) }}
        search={{ discipline: 'vocabulary', day: 1, tab: 'lesson' }}
        className="group relative flex flex-col gap-3 overflow-hidden bg-ivory p-6 transition-colors duration-200 hover:bg-bone/60"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-claret transition-transform duration-300 group-hover:scale-x-100"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
          <span className="text-claret">◆</span> VOCABULARY · WEEK {weekStr}
        </p>
        <h5 className="font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
          Continue today's lesson
          <span className="text-claret">.</span>
        </h5>
        <p className="flex items-baseline justify-between gap-3 font-fraunces text-[15px] italic text-graphite">
          <span>Anchor K1–K2 vocabulary</span>
          <span className="text-claret transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </Link>
    </div>
  )
}
