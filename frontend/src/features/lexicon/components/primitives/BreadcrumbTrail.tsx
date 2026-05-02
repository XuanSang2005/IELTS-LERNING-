import { Link } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'

interface BreadcrumbTrailProps {
  discipline: LexiconDiscipline
  phaseRoman: string
  phaseName: string
  week: number
  day: number
}

/** Roadmap › Phase I · Introduction › Week 01 › Day 1 */
export function BreadcrumbTrail({
  discipline,
  phaseRoman,
  phaseName,
  week,
  day,
}: BreadcrumbTrailProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite"
    >
      <Link
        to="/app/lexicon"
        search={discipline === 'vocabulary' ? {} : { discipline }}
        className="hover:text-claret"
      >
        Roadmap
      </Link>
      <span aria-hidden="true" className="text-line">
        /
      </span>
      <span>
        Phase {phaseRoman} · {phaseName}
      </span>
      <span aria-hidden="true" className="text-line">
        /
      </span>
      <span>Week {String(week).padStart(2, '0')}</span>
      <span aria-hidden="true" className="text-line">
        /
      </span>
      <span className="text-claret">Day {day}</span>
    </nav>
  )
}
