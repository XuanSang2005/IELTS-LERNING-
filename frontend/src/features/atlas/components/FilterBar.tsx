import type { FamilyFilter } from '@shared/schemas/atlas'

interface FilterBarProps {
  value: FamilyFilter
  onChange: (next: FamilyFilter) => void
  total: number
  shown: number
}

const OPTIONS: Array<{ value: FamilyFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'I', label: 'I' },
  { value: 'II', label: 'II' },
  { value: 'III', label: 'III' },
  { value: 'IV', label: 'IV' },
  { value: 'V', label: 'V' },
]

export function FilterBar({ value, onChange, total, shown }: FilterBarProps) {
  return (
    <div className="sticky top-[72px] z-30 border-y border-line bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4 md:px-10 xl:px-14">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            FAMILY
          </p>
          <div className="flex flex-wrap gap-2">
            {OPTIONS.map((o) => {
              const active = value === o.value
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => onChange(o.value)}
                  className={`border px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.25em] transition-colors ${
                    active
                      ? 'border-claret bg-claret text-ivory'
                      : 'border-line text-graphite hover:border-ink hover:text-ink'
                  }`}
                >
                  {o.label}
                </button>
              )
            })}
          </div>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
          {shown} OF {total} SPECIMENS SHOWN
        </p>
      </div>
    </div>
  )
}
