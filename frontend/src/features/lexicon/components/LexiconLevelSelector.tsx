import { LEXICON_LEVELS } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'

interface LexiconLevelSelectorProps {
  value: BandLevel
  onChange: (next: BandLevel) => void
}

export function LexiconLevelSelector({ value, onChange }: LexiconLevelSelectorProps) {
  return (
    <section className="border-b border-line bg-ivory">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-10 md:px-10 md:py-12 xl:px-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              ◆ CHOOSE YOUR LEVEL
            </p>
            <p className="mt-3 max-w-[52ch] font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[19px]">
              Four arcs, twelve weeks each. Begin where your band actually sits — vocabulary that
              reaches above your level remains an ornament rather than a tool.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            CURRENT · {LEXICON_LEVELS.find((l) => l.level === value)?.label.toUpperCase()}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {LEXICON_LEVELS.map((meta) => {
            const active = value === meta.level
            return (
              <button
                key={meta.level}
                type="button"
                onClick={() => onChange(meta.level)}
                aria-pressed={active}
                className={`group flex flex-col items-start gap-3 border p-5 text-left transition-colors duration-200 md:p-6 ${
                  active
                    ? 'border-claret bg-bone shadow-[0_18px_36px_-22px_rgba(107,31,26,0.35)]'
                    : 'border-line bg-ivory/60 hover:border-ink'
                }`}
              >
                <span className="flex w-full items-center justify-between">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
                      active ? 'text-claret' : 'text-graphite'
                    }`}
                  >
                    {meta.bandRange}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2 w-2 rounded-full transition-colors ${
                      active ? 'bg-claret' : 'bg-line group-hover:bg-ink'
                    }`}
                  />
                </span>
                <span className="font-fraunces text-[24px] leading-tight text-ink md:text-[26px]">
                  {meta.label}
                </span>
                <span className="font-fraunces text-[14px] italic leading-snug text-graphite md:text-[15px]">
                  {meta.subtitle}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
