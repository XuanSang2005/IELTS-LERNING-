const LOCKED_FEATURES = [
  'EXPLANATION PER QUESTION',
  'AUDIO TRANSCRIPT',
  'VOCABULARY LIST',
  'MISTAKE PATTERNS OVER TIME',
]

export function ResultsLocked() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 xl:px-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          PRO — MEMBERSHIP REQUIRED
        </p>
        <h2 className="mt-4 font-fraunces text-[clamp(32px,4vw,52px)] leading-tight text-ink">
          Beyond this point, the examiner reads.
        </h2>
        <p className="mt-4 max-w-[58ch] font-fraunces text-[21px] italic leading-relaxed text-graphite">
          Detailed explanations for every question. The transcript of what you heard. A vocabulary
          list of terms worth remembering. Meridian Pro continues the programme.
        </p>

        <ul className="mt-8 space-y-3">
          {LOCKED_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="4" y="11" width="16" height="10" rx="1" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <a
          href="#upgrade"
          className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">Continue the programme</span>
          <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  )
}
