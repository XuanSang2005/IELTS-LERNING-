import { motion } from 'framer-motion'

const SCALE_MIN = 4
const SCALE_MAX = 9
const MAJOR_TICKS = [4, 5, 6, 7, 8, 9]
const HALF_TICKS = [4.5, 5.5, 6.5, 7.5, 8.5]

interface CriteriaBarProps {
  /** 0–9 IELTS band, in half-steps. Clamped to 4–9 for display. */
  band: number
  /** Optional mono label shown above the ruler. */
  label?: string
  /** Small-scale version for tight layouts. */
  compact?: boolean
  /** Stagger delay for the fill animation. */
  delay?: number
}

function pct(value: number): number {
  const clamped = Math.max(SCALE_MIN, Math.min(SCALE_MAX, value))
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
}

export function CriteriaBar({ band, label, compact = false, delay = 0 }: CriteriaBarProps) {
  const bandPct = pct(band)

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            {label}
          </span>
          <span className="font-fraunces text-[20px] leading-none text-ink">
            {band.toFixed(1)}
          </span>
        </div>
      )}
      <div className={`relative ${compact ? 'h-10' : 'h-12'}`}>
        {/* Baseline */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" />

        {/* Half ticks */}
        {HALF_TICKS.map((t) => (
          <div
            key={`h-${t}`}
            className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line"
            style={{ left: `${pct(t)}%`, transform: 'translate(-0.5px, -50%)' }}
          />
        ))}

        {/* Major ticks */}
        {MAJOR_TICKS.map((t) => (
          <div
            key={`m-${t}`}
            className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-line"
            style={{ left: `${pct(t)}%`, transform: 'translate(-0.5px, -50%)' }}
          />
        ))}

        {/* Band fill from left edge to the band position */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
          style={{
            width: `${bandPct}%`,
            transformOrigin: 'left center',
          }}
          className="absolute top-1/2 left-0 h-[4px] -translate-y-1/2 bg-claret"
          aria-hidden="true"
        />

        {/* Band marker dot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: delay + 0.6 }}
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-claret bg-ivory"
          style={{ left: `${bandPct}%` }}
          aria-hidden="true"
        />

        {/* Numeric labels on majors */}
        {MAJOR_TICKS.map((t) => (
          <span
            key={`l-${t}`}
            className="absolute top-full mt-2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-graphite"
            style={{ left: `${pct(t)}%` }}
          >
            {t.toFixed(1)}
          </span>
        ))}
      </div>
    </div>
  )
}
