import { Link } from '@tanstack/react-router'

export function MethodClosing() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-24 md:px-10 md:py-32 xl:px-14">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-graphite">§ —</span>{' '}
            <span className="text-claret">Editorial Note</span>
          </p>
          <p className="mt-8 font-fraunces text-[clamp(26px,2.8vw,40px)] italic leading-[1.15] text-ink">
            “No fast path to Band 9. Only a considered one, and an unconsidered one.”
          </p>
          <p className="mt-6 font-fraunces text-[18px] italic text-graphite">
            — The founder, Band 8.5 Overall
          </p>

          <div className="mt-14">
            <Link
              to="/signup"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
            >
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
              <span className="relative z-10">Begin your assessment</span>
              <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
