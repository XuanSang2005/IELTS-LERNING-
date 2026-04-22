import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { BandRange } from '@shared/schemas/practice'
import { useProfile } from '@/features/practice/hooks/practice-queries'
import { BAND_OPTIONS } from '../data/band-options'

const SCALE_MIN = 4
const SCALE_MAX = 9
const TICKS: number[] = Array.from(
  { length: (SCALE_MAX - SCALE_MIN) * 2 + 1 },
  (_, i) => SCALE_MIN + i * 0.5,
)

function pct(value: number): number {
  return ((value - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
}

function formatSource(setBy: BandRange['setBy']): string {
  switch (setBy) {
    case 'diagnostic':
      return 'By diagnostic'
    case 'algorithm':
      return 'By algorithm'
    case 'user-override':
      return 'By you'
  }
}

function confidenceBarClasses(confidence: BandRange['confidence']): string {
  switch (confidence) {
    case 'high':
      return 'bg-claret'
    case 'medium':
      return 'bg-claret/55'
    case 'low':
      return 'border-2 border-claret bg-transparent'
  }
}

export function LevelCard() {
  const profile = useProfile()
  if (!profile) return null

  const band = profile.currentBand
  const [rangeLow, rangeHigh] = band.range
  const target = profile.targetBand
  const label =
    BAND_OPTIONS.find((o) => o.level === band.level)?.label ?? band.level
  const confidenceLabel =
    band.confidence[0]?.toUpperCase() + band.confidence.slice(1)

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <h3 className="font-fraunces text-[clamp(36px,4.2vw,56px)] leading-none text-ink">
          {label}
          <em className="italic">.</em>
        </h3>
        <p className="font-mono text-[clamp(11px,0.9vw,14px)] uppercase tracking-[0.25em] text-graphite">
          BAND <span className="text-ink">{rangeLow.toFixed(1)}</span> –{' '}
          <span className="text-ink">{rangeHigh.toFixed(1)}</span>
          <span aria-hidden="true" className="mx-3 text-line">◆</span>
          TARGET <span className="text-ink">{target.toFixed(1)}</span>
        </p>
      </div>

      {/* Band Ruler */}
      <div className="mt-12">
        <div className="relative h-28">
          {/* Target label above the ruler, pointing down */}
          <div
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${pct(target)}%` }}
          >
            <span className="font-mono text-[clamp(10px,0.8vw,13px)] uppercase tracking-[0.3em] text-claret">
              TARGET
            </span>
            <span className="mt-1 font-fraunces text-[clamp(16px,1.4vw,20px)] leading-none text-ink">
              {target.toFixed(1)}
            </span>
            <span aria-hidden="true" className="mt-1 text-[10px] text-claret">
              ▼
            </span>
          </div>

          {/* Ruler baseline */}
          <div className="absolute left-0 right-0 top-[62px] h-px bg-line" />

          {/* Tick marks */}
          {TICKS.map((t) => {
            const isMajor = t % 1 === 0
            return (
              <div
                key={t}
                className={`absolute top-[62px] w-px bg-line ${
                  isMajor ? 'h-4' : 'h-2'
                }`}
                style={{ left: `${pct(t)}%`, transform: 'translate(-0.5px, -50%)' }}
              />
            )
          })}

          {/* Current range bar — horizontal claret segment on the baseline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className={`absolute top-[62px] h-[6px] -translate-y-1/2 ${confidenceBarClasses(
              band.confidence,
            )}`}
            style={{
              left: `${pct(rangeLow)}%`,
              width: `${pct(rangeHigh) - pct(rangeLow)}%`,
              transformOrigin: 'left center',
            }}
            aria-label={`Current band range ${rangeLow} to ${rangeHigh}`}
          />

          {/* Target vertical tick — taller, claret, sits above baseline */}
          <div
            className="absolute top-[52px] h-5 w-[2px] -translate-x-1/2 bg-claret"
            style={{ left: `${pct(target)}%` }}
            aria-hidden="true"
          />

          {/* Tick number labels, below the baseline */}
          {TICKS.map((t) => {
            if (t % 1 !== 0) return null // only major ticks get labels
            return (
              <span
                key={`l-${t}`}
                className="absolute top-[80px] -translate-x-1/2 font-mono text-[clamp(10px,0.8vw,13px)] uppercase tracking-[0.2em] text-graphite"
                style={{ left: `${pct(t)}%` }}
              >
                {t.toFixed(1)}
              </span>
            )
          })}
        </div>

        {/* Legend strip */}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[clamp(10px,0.8vw,13px)] uppercase tracking-[0.25em] text-graphite">
          <span className="inline-flex items-baseline gap-2">
            <span
              aria-hidden="true"
              className={`inline-block h-[6px] w-5 translate-y-[-2px] ${confidenceBarClasses(
                band.confidence,
              )}`}
            />
            CURRENT · BAND {rangeLow.toFixed(1)} – {rangeHigh.toFixed(1)}
          </span>
          <span aria-hidden="true" className="text-line">◆</span>
          <span>CONFIDENCE · <span className="text-ink">{confidenceLabel}</span></span>
          <span aria-hidden="true" className="text-line">◆</span>
          <span>SOURCE · <span className="text-ink">{formatSource(band.setBy)}</span></span>
        </div>
      </div>

      <Link
        to="/profile"
        className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[clamp(12px,0.95vw,14px)] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
      >
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
        <span className="relative z-10">Recalibrate your band</span>
        <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </motion.section>
  )
}
