import type { BandLevel } from '@shared/schemas/practice'
import { BAND_OPTIONS } from '../data/band-options'

interface BandSelectorProps {
  selected: BandLevel | null
  onSelect: (level: BandLevel) => void
  busy?: boolean
}

const ROMAN = ['I', 'II', 'III', 'IV'] as const

export function BandSelector({ selected, onSelect, busy }: BandSelectorProps) {
  return (
    <div className="border-t border-line">
      {BAND_OPTIONS.map((opt, idx) => {
        const active = selected === opt.level
        return (
          <button
            key={opt.level}
            type="button"
            onClick={() => onSelect(opt.level)}
            disabled={busy}
            aria-pressed={active}
            className={`group relative flex w-full items-start gap-5 border-b border-line px-5 py-7 text-left transition-colors duration-300 md:gap-8 md:px-7 md:py-9 ${
              active
                ? 'border-l-2 border-l-claret bg-bone/60'
                : 'border-l-2 border-l-transparent hover:bg-bone/40'
            } disabled:cursor-wait`}
          >
            {/* Roman numeral — editorial left-rail */}
            <span
              aria-hidden="true"
              className={`shrink-0 font-fraunces text-[34px] italic leading-none md:w-10 md:text-[44px] ${
                active ? 'text-claret' : 'text-line'
              }`}
            >
              {ROMAN[idx]}
            </span>

            {/* Main column — pill + label + body */}
            <div className="min-w-0 flex-1">
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.28em] md:text-[12px] ${
                  active ? 'text-claret' : 'text-graphite'
                }`}
              >
                {opt.range.replace('Band ', 'B').replace('–', '—').toUpperCase()}
              </p>
              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
                <h3 className="shrink-0 font-fraunces text-[26px] leading-none text-ink md:text-[32px]">
                  {opt.label}.
                </h3>
                <p className="font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[19px]">
                  &ldquo;{opt.body}&rdquo;
                </p>
              </div>
            </div>

            {/* Right rail — state indicator */}
            <span
              aria-hidden="true"
              className={`mt-2 hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] md:inline-block ${
                active ? 'text-claret' : 'text-line group-hover:text-graphite'
              }`}
            >
              {active ? '◆ Selected' : ''}
            </span>
          </button>
        )
      })}
    </div>
  )
}
