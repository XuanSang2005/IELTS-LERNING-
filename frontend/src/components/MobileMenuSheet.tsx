import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollLock } from '@/hooks/useScrollLock'

interface MobileMenuSheetProps {
  open: boolean
  onClose: () => void
  id?: string
  children: ReactNode
  footer?: ReactNode
  eyebrow?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export function MobileMenuSheet({
  open,
  onClose,
  id,
  children,
  footer,
  eyebrow = 'NAVIGATION',
}: MobileMenuSheetProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" id={id} role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-[min(86vw,380px)] flex-col border-l border-line bg-ivory shadow-[0_0_60px_-10px_rgba(20,18,16,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                ◆ {eyebrow}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors duration-200 hover:border-ink active:bg-ink/5"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M3 3 L13 13 M13 3 L3 13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-7">{children}</div>

            {footer && <div className="border-t border-line px-6 py-5">{footer}</div>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
