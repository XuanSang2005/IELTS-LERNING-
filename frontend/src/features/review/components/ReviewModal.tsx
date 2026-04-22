import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface ReviewModalProps {
  open: boolean
  onClose: () => void
  eyebrow: string
  title: ReactNode
  children: ReactNode
  maxWidth?: string
}

const ease = [0.22, 1, 0.36, 1] as const

/** Editorial modal shell — claret eyebrow, Fraunces heading, dismissable on Esc / backdrop. */
export function ReviewModal({
  open,
  onClose,
  eyebrow,
  title,
  children,
  maxWidth = '560px',
}: ReviewModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="relative w-full border border-line bg-ivory p-10"
        style={{ maxWidth }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite hover:text-ink"
        >
          Close
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">{eyebrow}</p>
        <h2 className="mt-3 font-fraunces text-[36px] leading-tight text-ink">{title}</h2>
        <div className="mt-8">{children}</div>
      </motion.div>
    </motion.div>
  )
}
