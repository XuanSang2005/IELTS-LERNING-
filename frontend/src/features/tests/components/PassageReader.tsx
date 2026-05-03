import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReadingPassage } from '@shared/schemas/test'

interface PassageReaderProps {
  passage: ReadingPassage
}

const HIGHLIGHT_CLASS = 'bg-ochre/30 text-ink rounded-[1px]'

interface ToolbarState {
  x: number
  y: number
  mode: 'add' | 'remove'
  /** When mode === 'remove', the <mark> node to unwrap. */
  markEl?: HTMLElement
}

/**
 * Reading passage with in-place highlight tooling. Mirrors the real IELTS
 * computer-based test: select text → floating button → text gets a coloured
 * wash. Click an existing highlight → option to remove it.
 *
 * Implementation notes:
 *  - We bypass React's normal child rendering for the body via a ref + manual
 *    `innerHTML` assignment. Once mounted, we mutate the DOM directly to
 *    insert/remove `<mark>` elements; React would otherwise overwrite the
 *    edits on the next re-render.
 *  - Highlights live for the lifetime the passage is mounted. Switching
 *    passages resets them — that matches what IELTS candidates expect when a
 *    test session ends.
 *  - The toolbar is `position: fixed` so it floats over the test runner's
 *    independent scroll columns without being clipped.
 */
export function PassageReader({ passage }: PassageReaderProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [toolbar, setToolbar] = useState<ToolbarState | null>(null)

  // Manual innerHTML so React doesn't overwrite our DOM-level highlight edits.
  // Keyed on passage.bodyHtml so switching passages resets the body cleanly.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.innerHTML = passage.bodyHtml
    setToolbar(null)
  }, [passage.bodyHtml])

  const findEnclosingMark = useCallback(
    (node: Node | null): HTMLElement | null => {
      let cur: Node | null = node
      while (cur && cur !== bodyRef.current) {
        if (cur.nodeType === Node.ELEMENT_NODE && (cur as HTMLElement).tagName === 'MARK') {
          return cur as HTMLElement
        }
        cur = cur.parentNode
      }
      return null
    },
    [],
  )

  // Show the toolbar after a selection settles. Listening on `mouseup` rather
  // than `selectionchange` avoids flicker mid-drag.
  useEffect(() => {
    const onMouseUp = () => {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) {
        setToolbar(null)
        return
      }
      const range = sel.getRangeAt(0)
      if (!bodyRef.current?.contains(range.commonAncestorContainer)) {
        setToolbar(null)
        return
      }

      // Click on (collapsed selection inside) an existing highlight → offer remove.
      const enclosingMark = findEnclosingMark(range.commonAncestorContainer)
      if (sel.isCollapsed) {
        if (enclosingMark) {
          const rect = enclosingMark.getBoundingClientRect()
          setToolbar({
            x: rect.left + rect.width / 2,
            y: rect.top - 36,
            mode: 'remove',
            markEl: enclosingMark,
          })
        } else {
          setToolbar(null)
        }
        return
      }

      // Non-empty selection → offer add (or remove if entirely inside one mark).
      const rect = range.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        setToolbar(null)
        return
      }
      setToolbar({
        x: rect.left + rect.width / 2,
        y: rect.top - 36,
        mode: enclosingMark ? 'remove' : 'add',
        markEl: enclosingMark ?? undefined,
      })
    }
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [findEnclosingMark])

  // Hide the toolbar when the user clicks elsewhere or scrolls the column.
  useEffect(() => {
    if (!toolbar) return
    const onScrollOrResize = () => setToolbar(null)
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [toolbar])

  function applyHighlight() {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return
    const range = sel.getRangeAt(0)
    if (!bodyRef.current?.contains(range.commonAncestorContainer)) return

    const mark = document.createElement('mark')
    mark.className = HIGHLIGHT_CLASS
    try {
      range.surroundContents(mark)
    } catch {
      // surroundContents throws when the range crosses element boundaries
      // (e.g. spans a paragraph break or partially overlaps a previous mark).
      // Fallback: extract + reinsert under a new mark.
      const contents = range.extractContents()
      mark.appendChild(contents)
      range.insertNode(mark)
    }
    sel.removeAllRanges()
    setToolbar(null)
  }

  function removeHighlight(markEl: HTMLElement | undefined) {
    const target = markEl ?? findEnclosingMark(window.getSelection()?.anchorNode ?? null)
    if (!target || !bodyRef.current?.contains(target)) return
    const parent = target.parentNode
    if (!parent) return
    while (target.firstChild) parent.insertBefore(target.firstChild, target)
    parent.removeChild(target)
    parent.normalize?.()
    window.getSelection()?.removeAllRanges()
    setToolbar(null)
  }

  return (
    <article className="prose-none">
      <h2 className="font-fraunces text-[clamp(26px,3vw,36px)] leading-tight text-ink">
        {passage.title}
      </h2>
      <div
        ref={bodyRef}
        className="mt-6 space-y-5 font-fraunces text-[17px] leading-[1.7] text-ink md:text-[19px] md:leading-[1.65] lg:text-[20px] [&_em]:italic [&_strong]:font-medium [&_strong]:text-claret [&_mark]:bg-ochre/30 [&_mark]:rounded-[1px] [&_mark]:text-ink"
      />

      {toolbar && (
        <div
          role="toolbar"
          aria-label="Highlight controls"
          style={{
            position: 'fixed',
            left: toolbar.x,
            top: toolbar.y,
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
          className="pointer-events-auto"
        >
          <button
            type="button"
            onMouseDown={(e) => {
              // Prevent the click from collapsing our text selection before
              // applyHighlight() reads it.
              e.preventDefault()
            }}
            onClick={() =>
              toolbar.mode === 'add'
                ? applyHighlight()
                : removeHighlight(toolbar.markEl)
            }
            className="group inline-flex items-center gap-2 border border-ink bg-ivory px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink shadow-[0_8px_20px_-8px_rgba(20,18,16,0.35)] transition-colors hover:bg-ink hover:text-ivory"
          >
            <span aria-hidden="true" className="text-ochre group-hover:text-ivory">
              ◆
            </span>
            {toolbar.mode === 'add' ? 'Highlight' : 'Remove highlight'}
          </button>
        </div>
      )}
    </article>
  )
}
