import { Link } from '@tanstack/react-router'
import { DISCIPLINES, type DisciplineCopy } from '../data/method-content'

export function FourDisciplines() {
  return (
    <section className="border-t border-line bg-bone/50">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. II —</span>{' '}
              <span className="text-claret">Disciplines</span>
            </p>
            <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
              Four domains, <em className="italic">rotated</em> weekly.
            </h2>
          </div>
          <p className="max-w-[32ch] font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[19px]">
            A day never stays in one place long enough to be memorised.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {DISCIPLINES.map((d) => (
            <DisciplineCard key={d.num} discipline={d} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DisciplineCard({ discipline: d }: { discipline: DisciplineCopy }) {
  const cardBody = (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">CH. {d.num}</p>
      <h3 className="mt-6 font-fraunces text-[clamp(32px,3.6vw,48px)] leading-[1.02] text-ink">
        {d.name}
      </h3>
      <p className="mt-4 font-fraunces text-[17px] italic text-graphite md:text-[19px]">
        {d.tag}.
      </p>
    </>
  )

  if (d.releaseLabel) {
    return (
      <article className="flex flex-col bg-ivory p-6 md:p-10">
        {cardBody}
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
          To be published — {d.releaseLabel}
        </p>
      </article>
    )
  }

  return (
    <Link
      to="/study"
      search={{ discipline: d.discipline }}
      className="group flex flex-col bg-ivory p-6 transition-colors duration-200 hover:bg-bone md:p-10"
    >
      {cardBody}
      <p className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
        <span className="relative">
          Read the discipline
          <span className="absolute -bottom-0.5 left-0 h-px w-full bg-claret/40 transition-colors duration-200 group-hover:bg-claret" />
        </span>
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          ↗
        </span>
      </p>
    </Link>
  )
}
