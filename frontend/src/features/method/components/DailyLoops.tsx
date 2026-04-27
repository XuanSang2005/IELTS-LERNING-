import { Link } from '@tanstack/react-router'
import { COMPLETE_LOOP, ESSENTIAL_LOOP } from '../data/method-content'

export function DailyLoops() {
  return (
    <section className="border-t border-line bg-bone/50">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-graphite">CH. IV —</span>{' '}
            <span className="text-claret">The Loop</span>
          </p>
          <h2 className="mt-6 whitespace-nowrap font-fraunces text-[clamp(32px,4vw,60px)] leading-[1.02] tracking-[-0.01em] text-ink">
            Two loops. <em className="italic">One</em> commitment.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <LoopCard
            label="Essential"
            minutes="30 min"
            steps={ESSENTIAL_LOOP}
            sub="For weekdays. Keeps the muscle warm."
          />
          <LoopCard
            label="Complete"
            minutes="90 min"
            steps={COMPLETE_LOOP}
            sub="For weekends. Where the band moves."
          />
        </div>
      </div>
    </section>
  )
}

function LoopCard({
  label,
  minutes,
  steps,
  sub,
}: {
  label: string
  minutes: string
  steps: ReadonlyArray<string>
  sub: string
}) {
  return (
    <Link
      to="/signup"
      className="group block border-t-2 border-ink bg-ivory p-8 transition-colors duration-200 hover:border-claret md:p-12"
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-fraunces text-[clamp(32px,3.6vw,44px)] leading-none text-ink">
          {label}.
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-claret">
          {minutes}
        </span>
      </div>

      <ol className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-baseline gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="font-mono text-[14px] text-claret">
                →
              </span>
            )}
            <span className="font-fraunces text-[clamp(20px,1.9vw,26px)] italic text-ink">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-10 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
        {sub}
      </p>

      <span className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
        <span className="relative">
          Begin this loop
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
  )
}
