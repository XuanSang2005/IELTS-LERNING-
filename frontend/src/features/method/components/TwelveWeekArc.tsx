import { Link } from '@tanstack/react-router'
import { PHASES } from '../data/method-content'

export function TwelveWeekArc() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. III —</span>{' '}
              <span className="text-claret">The Arc</span>
            </p>
            <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
              A programme in <em className="italic">four</em> movements.
            </h2>
          </div>
          <p
            aria-hidden="true"
            className="font-fraunces text-[clamp(80px,10vw,140px)] leading-none text-line"
          >
            12
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <li key={p.num}>
              <Link
                to="/study"
                search={{ discipline: 'grammar' }}
                className="group flex flex-col border-t-2 border-ink pt-6 transition-colors duration-200 hover:border-claret"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                  PHASE {p.num} · {p.weeks}
                </p>
                <h3 className="mt-4 font-fraunces text-[clamp(26px,2.4vw,34px)] leading-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[18px]">
                  {p.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                  <span className="relative">
                    Read the phase
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
