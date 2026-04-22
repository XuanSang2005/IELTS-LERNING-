import { useEffect, useState } from 'react'

function format(ms: number): { mm: string; ss: string } {
  const total = Math.ceil(ms / 1000)
  const mm = Math.floor(total / 60)
  const ss = total % 60
  return { mm: String(mm).padStart(2, '0'), ss: String(ss).padStart(2, '0') }
}

/**
 * Ticks once per second and derives remaining time from `expiresAt` at
 * render time. Stops the interval once `active` is false (terminal
 * statuses) — the parent is polling for the terminal state separately.
 */
export function CountdownTimer({
  expiresAt,
  active,
}: {
  expiresAt: string
  active: boolean
}) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [active])

  const ms = Math.max(0, new Date(expiresAt).getTime() - now)
  const { mm, ss } = format(ms)
  const urgent = active && ms > 0 && ms < 60_000

  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        SESSION EXPIRES IN
      </span>
      <span
        className={`font-mono tabular-nums text-[22px] leading-none ${
          urgent ? 'text-claret' : 'text-ink'
        }`}
      >
        {mm}:{ss}
      </span>
    </div>
  )
}
