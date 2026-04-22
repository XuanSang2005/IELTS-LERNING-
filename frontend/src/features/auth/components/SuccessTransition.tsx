import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function SuccessTransition() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease, delay: 0.2 }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
        ◆ ADMISSION CONFIRMED
      </p>
      <h2 className="mt-4 font-fraunces text-[36px] leading-[1.1] text-ink">
        The programme <em className="italic">begins</em>.
      </h2>
      <p className="mt-4 max-w-[36ch] font-fraunces text-[21px] italic leading-relaxed text-graphite">
        Seven days. Three loops. Full access.
      </p>
      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        OPENING THE LIBRARY…
      </p>
    </motion.div>
  )
}
