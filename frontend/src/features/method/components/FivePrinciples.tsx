import { PRINCIPLES } from '../data/method-content'

export function FivePrinciples() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
              <span className="text-graphite">CH. I —</span>{' '}
              <span className="text-claret">Principles</span>
            </p>
            <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
              Five rules that <em className="italic">govern</em> the work.
            </h2>
          </div>
          <p
            aria-hidden="true"
            className="font-fraunces text-[clamp(80px,10vw,140px)] leading-none text-line"
          >
            05
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-2 gap-px bg-line md:grid-cols-3 lg:grid-cols-5">
          {PRINCIPLES.map((p) => (
            <li key={p.num} className="flex flex-col bg-ivory p-6 md:p-8">
              <span
                aria-hidden="true"
                className="font-fraunces text-[clamp(48px,5vw,80px)] italic leading-none text-claret/80"
              >
                {p.num}
              </span>
              <h3 className="mt-6 font-fraunces text-[clamp(20px,1.6vw,24px)] leading-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 font-fraunces text-[15px] italic leading-relaxed text-graphite md:text-[16px]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
