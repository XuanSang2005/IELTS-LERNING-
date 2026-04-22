import { motion } from 'framer-motion'
import { FAMILY_META, type Specimen } from '@shared/schemas/atlas'

interface SpecimenCardProps {
  specimen: Specimen
  index?: number
}

function formatPlate(plate: number): string {
  return `PL. ${String(plate).padStart(3, '0')}`
}

function formatBandCost(cost: number): string {
  return `−${cost.toFixed(cost % 1 === 0 ? 0 : 2).replace(/0$/, '').replace(/\.$/, '')}`
}

function FrequencyDots({ value }: { value: number }) {
  return (
    <span
      aria-label={`Frequency ${value} of 5`}
      className="inline-flex items-center gap-[3px] font-mono text-[12px] leading-none"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value ? 'text-claret' : 'text-line'}
          aria-hidden="true"
        >
          {i < value ? '●' : '○'}
        </span>
      ))}
    </span>
  )
}

function BandCostBar({ cost }: { cost: number }) {
  const widthPct = Math.min(100, Math.max(0, cost * 100))
  return (
    <span
      aria-label={`Band cost minus ${cost}`}
      className="relative inline-block h-px w-16 bg-line align-middle"
    >
      <span
        className="absolute left-0 top-0 h-px bg-claret"
        style={{ width: `${widthPct}%` }}
      />
    </span>
  )
}

export function SpecimenCard({ specimen, index = 0 }: SpecimenCardProps) {
  const family = FAMILY_META[specimen.family]
  const tilt = index % 2 === 0 ? '-0.4deg' : '0.4deg'

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.04 }}
      style={{ transform: `rotate(${tilt})` }}
      id={`specimen-${specimen.plate}`}
      className="relative border border-line bg-bone p-6 md:p-8"
    >
      {/* Eyebrow: plate number left, family + freq + band cost right */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
        <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-claret">
          {formatPlate(specimen.plate)}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
          <span>
            FAMILY {family.numeral.replace('VOL. ', '')} <span className="text-line">·</span>{' '}
            <span className="text-ink">{family.name}</span>
          </span>
          <span className="flex items-center gap-2">
            FREQUENCY <FrequencyDots value={specimen.frequency} />
          </span>
          <span className="flex items-center gap-2">
            BAND COST <BandCostBar cost={specimen.bandCost} />
            <span className="text-claret">{formatBandCost(specimen.bandCost)}</span>
          </span>
        </div>
      </header>

      {/* Wrong / Right pair */}
      <div className="mt-6 space-y-3">
        <p className="flex items-baseline gap-3 font-fraunces text-[19px] italic leading-snug text-graphite md:text-[21px]">
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[16px] not-italic text-claret"
          >
            {'✗'}
          </span>
          <span className="text-claret line-through decoration-claret/60">{specimen.wrong}</span>
        </p>
        <p className="flex items-baseline gap-3 font-fraunces text-[19px] italic leading-snug text-ink md:text-[21px]">
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[16px] not-italic text-sage"
          >
            {'✓'}
          </span>
          <span className="border-b-2 border-claret/50 pb-0.5">{specimen.right}</span>
        </p>
      </div>

      {/* Founder note */}
      <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[18px]">
        <span aria-hidden="true" className="mr-2 font-mono text-[11px] not-italic tracking-[0.25em] text-claret">
          ◆ NOTE
        </span>
        {specimen.note}
      </blockquote>

      {/* See also */}
      {specimen.seeAlso.length > 0 && (
        <footer className="mt-6 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
          SEE ALSO{' '}
          {specimen.seeAlso.map((p, i) => (
            <span key={p}>
              {i > 0 && <span className="mx-1.5 text-line">·</span>}
              <a
                href={`#specimen-${p}`}
                className="text-ink transition-colors hover:text-claret"
              >
                {'№ '}
                {String(p).padStart(3, '0')}
              </a>
            </span>
          ))}
        </footer>
      )}
    </motion.article>
  )
}
