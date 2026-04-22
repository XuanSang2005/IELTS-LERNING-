import { recentlyOpened } from '../data/lessons'

export function LibrarySidebar() {
  return (
    <aside className="space-y-0 border-l border-line pl-0 lg:pl-10">
      {/* Block 1 — Word of the Day */}
      <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          LEXICON / DAY MMXCVII
        </p>
        <h3 className="mt-3 font-fraunces text-[44px] leading-none text-ink">Meticulous</h3>
        <p className="mt-2 font-geist text-[18px] italic text-graphite">/məˈtɪkjʊləs/</p>
        <p className="mt-3 font-geist text-[18px] leading-relaxed text-graphite">
          <em>adj.</em> — showing great attention to detail; very careful and precise.
        </p>
        <blockquote className="mt-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
          "Meridian is a meticulous programme for candidates unafraid of slow work."
        </blockquote>
        <a
          href="#notebook"
          className="mt-4 inline-block border-b border-line font-geist text-[15px] text-ink transition-colors hover:border-ink"
        >
          Add to notebook ↗
        </a>
      </section>

      {/* Block 2 — Connector in Focus */}
      <section className="border-t border-line py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          CONNECTOR / IN FOCUS
        </p>
        <h3 className="mt-3 font-fraunces text-[36px] leading-none text-ink">Notwithstanding</h3>
        <p className="mt-3 font-geist text-[18px] leading-relaxed text-graphite">
          A formal contrast connector. More weight than <em>however</em>, less ceremony than{' '}
          <em>nevertheless</em>.
        </p>
        <blockquote className="mt-4 font-fraunces text-[19px] italic leading-relaxed text-graphite">
          "Notwithstanding the difficulty, the candidate reached Band 8."
        </blockquote>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
          <span>REGISTER · FORMAL</span>
          <span aria-hidden="true" className="text-claret">◆</span>
          <span>POSITION · INITIAL OR MEDIAL</span>
        </div>
      </section>

      {/* Block 3 — Recently Opened */}
      <section className="border-t border-line py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          READING ROOM / RECENT
        </p>
        <ul className="mt-4 space-y-5">
          {recentlyOpened.map((item) => (
            <li key={item.number}>
              <a href={`#lesson-${item.number}`} className="group block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  {item.number}
                </span>
                <span className="mt-1 block font-fraunces text-[19px] leading-snug text-ink transition-colors group-hover:text-claret">
                  {item.title}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  {item.seen}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
