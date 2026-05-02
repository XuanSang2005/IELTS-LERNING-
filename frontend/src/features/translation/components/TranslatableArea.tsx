import { useEffect, type ReactNode } from 'react'
import { useSelectionPopover } from '../hooks/useSelectionPopover'
import { TranslationPopover } from './TranslationPopover'

interface TranslatableAreaProps {
  children: ReactNode
  /** Optional className applied to the wrapping div. */
  className?: string
}

/**
 * Wraps an editorial region. Any text the user highlights inside this area
 * triggers a floating English → Vietnamese translation popover.
 *
 * Usage:
 *   <TranslatableArea>
 *     <article>...long-form content...</article>
 *   </TranslatableArea>
 */
export function TranslatableArea({ children, className }: TranslatableAreaProps) {
  const { containerRef, selection, clear } = useSelectionPopover()

  // Outside-click clear (clicks anywhere outside the popover OR the selection
  // are treated as dismiss). Popover stops propagation in its onMouseDown so
  // its own clicks don't dismiss.
  useEffect(() => {
    if (!selection) return
    function onPointer() {
      // Window-level click after popover children have had a chance to stop it.
      clear()
    }
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('mousedown', onPointer)
    }
  }, [selection, clear])

  return (
    <div ref={containerRef} className={className}>
      {children}
      {selection && (
        <TranslationPopover
          text={selection.text}
          rect={selection.rect}
          onClose={clear}
        />
      )}
    </div>
  )
}
