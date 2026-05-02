import { useCallback, useEffect, useRef, useState } from 'react'
import { TRANSLATION_MAX_LENGTH } from '@shared/schemas/translation'

interface SelectionInfo {
  text: string
  /** Selection bounding rect in viewport coords. Use for popover positioning. */
  rect: DOMRect
}

interface UseSelectionPopoverResult {
  containerRef: React.RefObject<HTMLDivElement | null>
  selection: SelectionInfo | null
  /** Programmatically clear the popover (e.g. after the user closes it). */
  clear: () => void
}

const MIN_LENGTH = 2

/**
 * Watches for completed text selections inside the wrapped container.
 *
 * Only reacts on `mouseup` and `keyup` (selection complete) — never on
 * `selectionchange` (which fires every pixel of the drag and causes visible
 * jank in the popover).
 *
 * Selection inside form inputs/textareas is ignored.
 */
export function useSelectionPopover(): UseSelectionPopoverResult {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [selection, setSelection] = useState<SelectionInfo | null>(null)
  // Tracks the dismissed selection so the popover doesn't immediately
  // re-fire after the user closes it (until they start a new selection).
  const dismissedTextRef = useRef<string | null>(null)
  // Tracks the active selection text so equal-text events don't re-render.
  const lastTextRef = useRef<string | null>(null)

  const clear = useCallback(() => {
    if (lastTextRef.current) dismissedTextRef.current = lastTextRef.current
    lastTextRef.current = null
    setSelection(null)
  }, [])

  useEffect(() => {
    function evaluateSelection() {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return
      const text = sel.toString().trim()
      if (text.length < MIN_LENGTH || text.length > TRANSLATION_MAX_LENGTH) return
      // Same text the user just dismissed — don't re-show.
      if (dismissedTextRef.current === text) return
      // Same text already showing — skip the re-render.
      if (lastTextRef.current === text) return

      const range = sel.getRangeAt(0)
      const node = range.commonAncestorContainer
      const container = containerRef.current
      if (!container || !node || !container.contains(node)) return

      const parentEl =
        node.nodeType === Node.ELEMENT_NODE
          ? (node as Element)
          : node.parentElement
      if (parentEl?.closest('input, textarea, [contenteditable]')) return

      const rect = range.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return

      lastTextRef.current = text
      setSelection({ text, rect })
    }

    function onMouseUp() {
      // Defer one frame so the browser has finalized the selection range.
      window.setTimeout(evaluateSelection, 0)
    }

    function onKeyUp(e: KeyboardEvent) {
      // Only react to the keys that complete a keyboard selection.
      if (e.shiftKey || e.key === 'Shift') {
        window.setTimeout(evaluateSelection, 0)
      }
    }

    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return { containerRef, selection, clear }
}
