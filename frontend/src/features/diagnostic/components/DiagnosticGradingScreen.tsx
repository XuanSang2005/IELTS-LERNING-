import { motion } from 'framer-motion'

/**
 * Loading state shown while the writing essay is being graded by Claude.
 * Sits between the writing submit and the result render. Shows shimmer.
 */
export function DiagnosticGradingScreen() {
  return (
    <div className="mx-auto flex w-full max-w-[920px] flex-col items-center px-6 py-24 text-center md:py-32">
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret"
      >
        ◆ EXAMINER IS READING
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-fraunces text-[clamp(28px,3.5vw,44px)] italic leading-[1.2] text-graphite"
      >
        The examiner is reading your essay.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 max-w-[52ch] font-fraunces text-[16px] italic leading-relaxed text-graphite/80 md:text-[17px]"
      >
        Listening and reading have been graded. The writing band typically takes a minute. Please
        do not close this page.
      </motion.p>
    </div>
  )
}
