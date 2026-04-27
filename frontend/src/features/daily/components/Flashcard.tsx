import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FlashcardProps {
  /** Counter strip rendered top-left, e.g. "CARD 03 / 10". */
  eyebrow: string
  /** Front face — usually the term or prompt. */
  front: ReactNode
  /** Back face — definition, example, etc. Empty until revealed. */
  back: ReactNode
  revealed: boolean
  onReveal: () => void
  /** Optional rating bar shown when revealed (e.g. Hard / Good / Easy). */
  rating?: ReactNode
}

/**
 * Editorial flashcard. Two faces stacked; front shrinks to one corner
 * when revealed and the back unfolds beneath it — no actual flip animation
 * (which often feels gimmicky on text-heavy faces).
 */
export function Flashcard({ eyebrow, front, back, revealed, onReveal, rating }: FlashcardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="border border-line bg-ivory p-8 shadow-[0_8px_28px_-12px_rgba(20,18,16,0.18)] md:p-12"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">{eyebrow}</p>

      <div className="mt-6">{front}</div>

      {!revealed ? (
        <div className="mt-10 border-t border-line pt-6">
          <button
            type="button"
            onClick={onReveal}
            className="group relative inline-flex items-center gap-3 border border-ink px-7 py-3 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory"
          >
            <span>Reveal</span>
            <span className="text-[14px] text-claret transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ivory">
              ↓
            </span>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 border-t border-line pt-8"
        >
          <div>{back}</div>
          {rating && <div className="mt-8 border-t border-dashed border-line pt-6">{rating}</div>}
        </motion.div>
      )}
    </motion.article>
  )
}
