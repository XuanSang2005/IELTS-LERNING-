import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'

const SCORES = [
  { label: 'TASK RESPONSE', score: '8.5' },
  { label: 'COHERENCE', score: '9.0' },
  { label: 'LEXICAL', score: '8.0' },
  { label: 'GRAMMAR', score: '8.5' },
]

export function SpecimenCard() {
  // Mouse-tracked 3D tilt.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springCfg = { stiffness: 150, damping: 18 }
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), springCfg)
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), springCfg)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-[460px] rotate-[-1.5deg] border border-line bg-bone p-8 shadow-[0_30px_60px_-30px_rgba(20,18,16,0.25)] max-md:mx-auto max-md:max-w-[480px] max-md:rotate-0"
      >
        {/* Claret ribbon */}
        <div className="absolute -right-3 -top-3 rotate-[8deg] bg-claret px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory shadow-md">
          Intake № 01
        </div>

        {/* Ornamental corner flourish */}
        <svg
          aria-hidden="true"
          className="absolute left-3 top-3 opacity-40"
          width="28"
          height="28"
          viewBox="0 0 28 28"
        >
          <path
            d="M2 2 L10 2 M2 2 L2 10 M14 14 Q18 10 22 14 Q18 18 14 14"
            stroke="#6B1F1A"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <span className="ml-10 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
          SPECIMEN № 004 / WRITING TASK 2
        </span>

        <p className="mt-5 font-fraunces text-[24px] italic leading-snug text-ink">
          "Some believe that the quality of education is more important than its
          availability..."
        </p>

        <div className="my-5 border-t border-line" />

        <div className="space-y-3">
          {SCORES.map(({ label, score }, i) => (
            <motion.div
              key={label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
                {label}
              </span>
              <span className="font-fraunces text-[22px] text-ink">{score}</span>
            </motion.div>
          ))}
        </div>

        <div className="my-5 border-t border-line" />

        {/* Claret Band 8.5 with ochre diamond */}
        <div className="mt-4 flex items-baseline justify-end gap-2">
          <motion.span
            className="text-[18px] text-ochre"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            ◆
          </motion.span>
          <span className="font-fraunces text-[56px] leading-none text-claret">Band 8.5</span>
        </div>
      </motion.div>
    </div>
  )
}
