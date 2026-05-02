interface YesterdayNoteProps {
  /** Recently captured items / words to surface as "from yesterday's notebook". */
  items?: ReadonlyArray<{ text: string; meta?: string }>
}

const FALLBACK_ITEMS = [
  { text: 'discernible', meta: 'C1 · adj.' },
  { text: 'a meaningful contribution', meta: 'collocation' },
  { text: 'notwithstanding', meta: 'linking · contrast' },
] as const

/**
 * Side card showing 1-3 items captured in yesterday's session. Editorial
 * fragment — no actions, just a quiet visual anchor for the right column of
 * Today's Session.
 */
export function YesterdayNote({ items = FALLBACK_ITEMS }: YesterdayNoteProps) {
  return (
    <aside className="relative border-l border-line pl-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">
        ◆ FROM YESTERDAY
      </p>
      <p className="mt-3 max-w-[34ch] font-fraunces text-[18px] italic leading-[1.5] text-graphite md:text-[20px]">
        &ldquo;Three small things, each one carried forward — that is the whole method.&rdquo;
      </p>

      <ul className="mt-7 space-y-4">
        {items.slice(0, 3).map((item, i) => (
          <li key={`${item.text}-${i}`} className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              № {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-fraunces text-[20px] leading-tight text-ink md:text-[22px]">
                {item.text}
              </p>
              {item.meta && (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {item.meta}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        — NOTEBOOK · CARRIED FORWARD
      </p>
    </aside>
  )
}
