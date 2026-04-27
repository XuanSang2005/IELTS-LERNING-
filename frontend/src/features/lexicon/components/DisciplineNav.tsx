import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { LEXICON_DISCIPLINES } from '@shared/schemas/lexicon'
import { DISCIPLINE_CONFIG } from '../data/discipline-config'

interface DisciplineNavProps {
  active: LexiconDiscipline
  onChange: (next: LexiconDiscipline) => void
}

/**
 * Switcher between the three lexicon disciplines. Renders an inline group of
 * pills with no row wrapper of its own — the parent control row owns the
 * border + padding so DISCIPLINE, SEARCH and the entry count can share a
 * single horizontal flex line.
 */
export function DisciplineNav({ active, onChange }: DisciplineNavProps) {
  return (
    <div
      role="tablist"
      aria-label="Lexicon discipline"
      className="flex flex-wrap items-center gap-3"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite md:text-[12px]">
        DISCIPLINE
      </span>
      <div className="flex flex-wrap gap-2">
        {LEXICON_DISCIPLINES.map((id) => {
          const cfg = DISCIPLINE_CONFIG[id]
          const isActive = id === active
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className={`border px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.24em] transition-colors duration-150 md:text-[13px] ${
                isActive
                  ? 'border-ink bg-ink text-ivory'
                  : 'border-line bg-transparent text-ink hover:border-ink'
              }`}
            >
              {cfg.tabLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}
