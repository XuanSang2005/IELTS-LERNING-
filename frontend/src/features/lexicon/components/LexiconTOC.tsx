import { useEffect, useState } from 'react'
import {
  isCollocationItem,
  isLinkingItem,
  isVocabularyItem,
  type LexiconItem,
} from '@shared/schemas/lexicon-items'

interface LexiconTOCProps {
  items: LexiconItem[]
  /** Map of itemId → status (derived from SRS or progress). */
  statusMap?: Map<string, 'new' | 'learning' | 'mastered'>
}

const DOT_CLASS: Record<'new' | 'learning' | 'mastered', string> = {
  new: 'bg-claret/30',
  learning: 'bg-mustard',
  mastered: 'bg-teal',
}

/**
 * Sticky TOC for word entries. Uses IntersectionObserver to highlight the
 * currently visible item; clicking smoothly scrolls into view.
 */
export function LexiconTOC({ items, statusMap }: LexiconTOCProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const id = visible[0].target.getAttribute('id')?.replace(/^word-/, '')
          if (id) setActiveId(id)
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )
    items.forEach((it) => {
      const el = document.getElementById(`word-${it.id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault()
    const el = document.getElementById(`word-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  if (items.length === 0) return null

  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        ◆ {items.length} words · this day
      </p>
      <ol className="mt-4 space-y-1">
        {items.map((it, i) => {
          const isActive = activeId === it.id
          const status = statusMap?.get(it.id) ?? 'new'
          return (
            <li key={it.id}>
              <a
                href={`#word-${it.id}`}
                onClick={(e) => handleClick(e, it.id)}
                className={`group flex items-baseline gap-3 border-l-2 py-1.5 pl-3 pr-2 transition-colors ${
                  isActive
                    ? 'border-claret text-ink'
                    : 'border-transparent text-graphite hover:border-line hover:text-ink'
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CLASS[status]}`}
                  aria-hidden="true"
                />
                <span className="font-fraunces text-[15px] leading-snug capitalize">
                  {labelOf(it)}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

function labelOf(it: LexiconItem): string {
  if (isVocabularyItem(it)) return it.headword
  if (isCollocationItem(it)) return it.phrase
  if (isLinkingItem(it)) return it.phrase
  return ''
}
