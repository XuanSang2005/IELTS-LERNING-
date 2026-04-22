const STATS = [
  { label: 'AVG. GAIN', value: '+1.7 BANDS' },
  { label: 'COHORT SIZE', value: '14 CANDIDATES' },
  { label: 'PASS RATE (7.0+)', value: '94%' },
  { label: 'FEATURED IN', value: 'THE TIMES · FT · MONOCLE' },
]

export function TrustStrip() {
  return (
    <section className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center px-8 py-4 md:justify-between md:px-14">
        {STATS.map(({ label, value }, i) => (
          <div key={label} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="mx-5 self-center text-[10px] text-claret">
                ◆
              </span>
            )}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                {label}
              </span>
              <span className="mt-0.5 block font-fraunces text-[22px] text-ink">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
