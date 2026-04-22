import { motion } from 'framer-motion'
import { useProfile } from '@/features/practice/hooks/practice-queries'

const PHASE_COPY: Record<1 | 2 | 3 | 4, { name: string }> = {
  1: { name: 'I · Diagnosis.' },
  2: { name: 'II · Foundations.' },
  3: { name: 'III · Polish.' },
  4: { name: 'IV · Examination.' },
}

export function PhaseCard() {
  const profile = useProfile()
  if (!profile) return null
  const copy = PHASE_COPY[profile.phase]
  const [numeral, ...rest] = copy.name.split(' · ')
  const title = rest.join(' · ').replace(/\.$/, '')

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-5"
    >
      <h3 className="font-fraunces text-[clamp(32px,3.6vw,48px)] leading-none text-ink">
        <span className="text-claret">{numeral}</span>
        <span aria-hidden="true" className="mx-4 text-line">·</span>
        {title}
        <em className="not-italic text-claret">.</em>
      </h3>

      <div className="flex items-center gap-3">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`h-2 w-2 rounded-full ${
              n === profile.phase ? 'bg-claret' : 'border border-line bg-ivory'
            }`}
            aria-label={`Phase ${n}`}
          />
        ))}
        <span className="ml-3 font-mono text-[clamp(11px,0.9vw,14px)] uppercase tracking-[0.22em] text-graphite">
          WEEK {String(profile.currentWeek).padStart(2, '0')} / XII
        </span>
      </div>
    </motion.section>
  )
}
