import { useStreak } from '../../hooks/useStreak'

/** Editorial streak counter — uses figure label rather than emoji per brand. */
export function StreakBadge() {
  const { data } = useStreak()
  const days = data?.days ?? 0
  if (days === 0) return null
  return (
    <span
      className="inline-flex items-baseline gap-1.5 border border-claret/40 bg-claret/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-claret"
      title={`Consecutive review days: ${days}`}
    >
      <span aria-hidden="true">FIG.</span>
      <span className="font-fraunces text-[15px] not-italic leading-none text-claret">
        {String(days).padStart(2, '0')}
      </span>
      <span>days</span>
    </span>
  )
}
