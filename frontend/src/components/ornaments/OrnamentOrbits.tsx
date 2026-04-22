import { motion } from 'framer-motion'

/**
 * Three concentric orbits with a single drifting mark.
 * Evokes spaced repetition \u2014 the same point returned to on a schedule.
 */
export function OrnamentOrbits({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.8">
        <circle cx="120" cy="120" r="42" opacity="0.45" />
        <circle cx="120" cy="120" r="72" opacity="0.3" />
        <circle cx="120" cy="120" r="104" opacity="0.18" />
      </g>
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '120px 120px' }}
      >
        <circle cx="192" cy="120" r="3" fill="#6B1F1A" />
      </motion.g>
      <motion.g
        initial={{ rotate: 180 }}
        animate={{ rotate: 540 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '120px 120px' }}
      >
        <circle cx="162" cy="120" r="2" fill="#5A6B54" />
      </motion.g>
    </svg>
  )
}
