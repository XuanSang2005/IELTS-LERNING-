import type { BandLevel } from '@shared/schemas/practice'
import { BAND_OPTIONS } from '../data/band-options'

interface BandSelectorProps {
  selected: BandLevel | null
  onSelect: (level: BandLevel) => void
  busy?: boolean
}

export function BandSelector({ selected, onSelect, busy }: BandSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {BAND_OPTIONS.map((opt, idx) => {
        const active = selected === opt.level
        return (
          <button
            key={opt.level}
            type="button"
            onClick={() => onSelect(opt.level)}
            disabled={busy}
            className={`group relative overflow-hidden border p-7 text-left transition-all duration-300 disabled:cursor-wait ${
              active
                ? 'border-ink bg-ink text-ivory'
                : 'border-line bg-ivory text-ink hover:border-ink'
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors ${
                active ? 'bg-claret' : 'bg-transparent group-hover:bg-claret'
              }`}
            />
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                active ? 'text-ivory/70' : 'text-graphite'
              }`}
            >
              OPTION {String(idx + 1).padStart(2, '0')} · {opt.range.toUpperCase()}
            </p>
            <h3
              className={`mt-3 font-fraunces text-[26px] leading-none ${
                active ? 'text-ivory' : 'text-ink'
              }`}
            >
              {opt.label}.
            </h3>
            <p
              className={`mt-3 font-fraunces text-[19px] italic leading-relaxed ${
                active ? 'text-ivory/80' : 'text-graphite'
              }`}
            >
              "{opt.body}"
            </p>
          </button>
        )
      })}
    </div>
  )
}
