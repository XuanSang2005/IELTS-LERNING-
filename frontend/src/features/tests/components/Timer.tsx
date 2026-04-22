import { motion } from 'framer-motion'
import { formatClock } from '@/features/tests/utils/format-time'

interface TimerProps {
  remainingSeconds: number
}

export function Timer({ remainingSeconds }: TimerProps) {
  const critical = remainingSeconds <= 120
  const urgent = remainingSeconds <= 30

  return (
    <div className="text-right">
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-graphite">REMAINING</p>
      <motion.p
        key={Math.floor(remainingSeconds)}
        initial={{ scale: urgent ? 1.04 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15 }}
        className={`mt-0.5 font-mono text-[22px] tabular-nums ${
          critical ? 'text-claret' : 'text-ink'
        }`}
      >
        {formatClock(Math.max(0, remainingSeconds))}
      </motion.p>
    </div>
  )
}
