import { motion } from 'framer-motion'
import { FAMILY_META, type Family, type FamilyFilter } from '@shared/schemas/atlas'

interface FamilyIndexProps {
  counts: Record<Family, number>
  active: FamilyFilter
  onSelect: (value: FamilyFilter) => void
}

const FAMILIES: Family[] = ['I', 'II', 'III', 'IV', 'V']
const TILTS = ['-1.2deg', '0.8deg', '-0.6deg', '1.1deg', '-0.9deg'] as const

export function FamilyIndex({ counts, active, onSelect }: FamilyIndexProps) {
  return (
    <section className="mx-auto max-w-[1720px] border-b border-line px-6 py-14 md:px-10 md:py-20 xl:px-14">
      <div className="mb-8 flex items-baseline justify-between gap-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ THE FIVE FAMILIES
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
          SELECT A VOLUME TO FILTER
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {FAMILIES.map((roman, i) => {
          const meta = FAMILY_META[roman]
          const isActive = active === roman
          const count = counts[roman] ?? 0
          return (
            <motion.button
              key={roman}
              type="button"
              onClick={() => onSelect(isActive ? 'all' : roman)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              style={{ transform: `rotate(${TILTS[i]})` }}
              className={`group flex flex-col gap-4 border p-5 text-left transition-colors duration-200 md:p-6 ${
                isActive
                  ? 'border-claret bg-ivory'
                  : 'border-line bg-ivory/60 hover:border-ink'
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
                § {meta.numeral}
              </span>
              <span className="block h-px w-8 bg-line" aria-hidden="true" />
              <span className="font-fraunces text-[24px] leading-[1.05] text-ink md:text-[26px]">
                {meta.name}
              </span>
              <span className="font-fraunces text-[15px] italic leading-snug text-graphite">
                &ldquo;{meta.tagline}&rdquo;
              </span>
              <span className="mt-auto flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                <span>
                  {count} specimen{count === 1 ? '' : 's'}
                </span>
                <span
                  className={`transition-colors ${isActive ? 'text-claret' : 'text-line group-hover:text-claret'}`}
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
