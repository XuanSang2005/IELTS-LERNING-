import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MockRecorderProps {
  /** Maximum seconds — when reached, auto-stops and calls onStop. */
  maxSeconds: number
  /** Fired when the user stops OR time runs out. Passes captured duration. */
  onStop: (durationSeconds: number) => void
  /** Small contextual label, e.g. "Part 1 answer". */
  label?: string
}

type Phase = 'idle' | 'recording' | 'stopped'

function fmt(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function MockRecorder({ maxSeconds, onStop, label }: MockRecorderProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<number | null>(null)
  const onStopRef = useRef(onStop)

  // Keep the latest onStop in the ref without writing to it during render.
  useEffect(() => {
    onStopRef.current = onStop
  }, [onStop])

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setPhase((prev) => (prev === 'recording' ? 'stopped' : prev))
    setElapsed((current) => {
      onStopRef.current(current)
      return current
    })
  }

  const start = () => {
    setPhase('recording')
    setElapsed(0)
    intervalRef.current = window.setInterval(() => {
      setElapsed((s) => {
        const next = s + 1
        // Auto-stop from within the interval callback (an external-system
        // subscription, not an effect body) once the cap is reached.
        if (next >= maxSeconds) stop()
        return next
      })
    }, 1000)
  }

  // Cleanup.
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [])

  const pct = Math.min(100, (elapsed / maxSeconds) * 100)

  return (
    <div className="border border-line bg-bone/40 p-6">
      {label && (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
          {label}
        </p>
      )}

      {/* Progress ring replaced by a horizontal strip for the editorial brand */}
      <div className="mt-5 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {phase === 'recording' && (
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-3 w-3 rounded-full bg-claret"
            />
          )}
          {phase !== 'recording' && (
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-full ${
                phase === 'stopped' ? 'bg-sage' : 'border border-line'
              }`}
            />
          )}
          <span className="font-mono text-[18px] uppercase tracking-[0.22em] text-ink">
            {fmt(elapsed)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            / {fmt(maxSeconds)}
          </span>
        </div>

        {phase === 'idle' && (
          <button
            type="button"
            onClick={start}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-6 py-3 font-geist text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Begin recording</span>
            <span className="relative z-10 text-claret">●</span>
          </button>
        )}

        {phase === 'recording' && (
          <button
            type="button"
            onClick={stop}
            className="border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            Stop ■
          </button>
        )}

        {phase === 'stopped' && (
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-sage">
            ◆ Captured
          </span>
        )}
      </div>

      <div className="mt-4 h-px bg-line">
        <div
          className={`h-full transition-all ${
            phase === 'recording' ? 'bg-claret' : phase === 'stopped' ? 'bg-sage' : 'bg-line'
          }`}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>

      <p className="mt-4 font-fraunces text-[15px] italic leading-snug text-graphite">
        This is a mock recorder — no audio is captured. Pretend you are speaking for the
        full duration; we measure timing, not voice.
      </p>
    </div>
  )
}
