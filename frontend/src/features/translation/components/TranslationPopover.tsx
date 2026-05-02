import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { TranslationResponse } from '@shared/schemas/translation'
import { useTranslate } from '../hooks/useTranslate'

interface TranslationPopoverProps {
  /** Selected English text. */
  text: string
  /** Selection bounding rect in viewport coords. */
  rect: DOMRect
  /** User dismissed via close button / outside click / ESC. */
  onClose: () => void
}

const POPOVER_WIDTH = 340
const VIEWPORT_PADDING = 12

/**
 * Floating popover with a Vietnamese translation of the highlighted text.
 * Positioned above the selection by default, flipped below if there's no room.
 * Editorial styling — bone background, claret accents, Fraunces VN headline.
 */
export function TranslationPopover({ text, rect, onClose }: TranslationPopoverProps) {
  const translate = useTranslate()
  const [data, setData] = useState<TranslationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch on mount + whenever the selected text changes.
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)
    translate(text)
      .then((res) => {
        if (cancelled) return
        setData(res)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError('Translation momentarily unreachable. Try again.')
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [text, translate])

  // ESC + outside-click close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Position: prefer above the selection. Flip below if too close to top.
  const flipBelow = rect.top < 200
  const top = flipBelow
    ? rect.bottom + window.scrollY + 10
    : rect.top + window.scrollY - 10
  const transform = flipBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)'
  const left = clamp(
    rect.left + rect.width / 2,
    POPOVER_WIDTH / 2 + VIEWPORT_PADDING,
    window.innerWidth - POPOVER_WIDTH / 2 - VIEWPORT_PADDING,
  ) + window.scrollX

  return (
    <motion.div
      role="dialog"
      aria-label={`Translation of "${text}"`}
      initial={{ opacity: 0, y: flipBelow ? -6 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top,
        left,
        transform,
        width: POPOVER_WIDTH,
        zIndex: 50,
      }}
      className="border border-line bg-bone shadow-[0_8px_24px_-12px_rgba(20,18,16,0.3)]"
      onMouseDown={(e) => {
        // Prevent the click from clearing the document selection.
        e.stopPropagation()
      }}
    >
      <header className="flex items-baseline justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-claret">
          ◆ EN → VI
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close translation"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite hover:text-ink"
        >
          Close
        </button>
      </header>

      <div className="px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          {truncate(text, 80)}
        </p>

        {loading && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-3 font-fraunces text-[16px] italic text-graphite"
          >
            Translating…
          </motion.p>
        )}

        {error && (
          <p className="mt-3 font-fraunces text-[14px] italic text-claret">{error}</p>
        )}

        {data && (
          <>
            <p className="mt-3 font-fraunces text-[19px] leading-snug text-ink">
              {data.vi}
            </p>

            {data.examples.length > 0 && (
              <ul className="mt-4 space-y-3 border-t border-line pt-3">
                {data.examples.map((ex, i) => (
                  <li key={i}>
                    <p className="font-fraunces text-[14px] italic leading-snug text-graphite">
                      &ldquo;{ex.en}&rdquo;
                    </p>
                    <p className="mt-1 font-fraunces text-[14px] leading-snug text-ink">
                      {ex.vi}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {data.fromCache && (
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.28em] text-graphite/60">
                ◆ FROM ARCHIVE
              </p>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max)
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1) + '…'
}
