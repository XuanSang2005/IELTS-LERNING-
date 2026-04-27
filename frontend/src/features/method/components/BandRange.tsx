import { Link } from '@tanstack/react-router'
import { GRAMMAR_LEVELS } from '@shared/schemas/grammar-plan'
import { RANGE_LINES } from '../data/method-content'

/**
 * Pull the four band ranges from the canonical `GRAMMAR_LEVELS` so the
 * Method page never drifts from the level data the rest of the app uses.
 * The marketing-voice one-liner per level lives in `RANGE_LINES`.
 */
const RANGES = GRAMMAR_LEVELS.map((level) => ({
  level: level.label,
  band: level.bandRange.replace(/^BAND\s+/, ''),
  line: RANGE_LINES[level.level],
}))

export function BandRange() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-graphite">CH. V —</span>{' '}
            <span className="text-claret">Band, a range</span>
          </p>
          <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(28px,3.6vw,56px)] leading-[1.02] tracking-[-0.01em] text-ink">
            Band is a <em className="italic">range</em>, never a number.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {RANGES.map((r) => (
            <Link
              key={r.level}
              to="/signup"
              className="group flex flex-col bg-ivory p-6 transition-colors duration-200 hover:bg-bone md:p-8"
            >
              <p className="font-fraunces text-[clamp(30px,3.2vw,42px)] leading-none text-ink">
                {r.band}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                {r.level}
              </p>
              <p className="mt-4 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
                {r.line}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                <span className="relative">
                  Begin here
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-claret/40 transition-colors duration-200 group-hover:bg-claret" />
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 max-w-[54ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-graphite">
          .25 rounds up to .5 · .75 rounds up to the next whole.
        </p>
      </div>
    </section>
  )
}
