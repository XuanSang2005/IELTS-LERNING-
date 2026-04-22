import { motion } from 'framer-motion'

/**
 * Soft color washes only — no decorative icons.
 */
export function BackgroundOrnaments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm ochre wash — bottom-left */}
      <motion.div
        className="absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: 'radial-gradient(circle, #B58A3C 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Soft claret wash — top-right */}
      <motion.div
        className="absolute -right-32 -top-20 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: 'radial-gradient(circle, #6B1F1A 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, -12, 0], y: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
