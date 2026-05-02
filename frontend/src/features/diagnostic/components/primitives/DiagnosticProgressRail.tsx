interface DiagnosticProgressRailProps {
  /** 1-based active step (1 = Listening, 2 = Reading, 3 = Writing, 4 = Result). */
  active: 1 | 2 | 3 | 4
}

const STEPS: ReadonlyArray<{ numeral: string; title: string }> = [
  { numeral: '§ I', title: 'Listening' },
  { numeral: '§ II', title: 'Reading' },
  { numeral: '§ III', title: 'Writing' },
  { numeral: '§ IV', title: 'Result' },
]

/** Top-of-page itinerary rail showing where the user is in the diagnostic. */
export function DiagnosticProgressRail({ active }: DiagnosticProgressRailProps) {
  return (
    <ol className="relative mx-auto grid max-w-[820px] grid-cols-4 gap-2">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] right-[12%] top-[10px] h-px bg-line"
      />
      {STEPS.map((s, i) => {
        const stepIndex = (i + 1) as 1 | 2 | 3 | 4
        const isDone = stepIndex < active
        const isCurrent = stepIndex === active
        const dotClass = isDone
          ? 'bg-sage border-sage'
          : isCurrent
            ? 'bg-claret border-claret ring-4 ring-claret/15'
            : 'bg-ivory border-line'
        const titleTone = isDone
          ? 'text-sage'
          : isCurrent
            ? 'text-ink'
            : 'text-graphite/70'
        return (
          <li key={s.numeral} className="relative z-10 flex flex-col items-center gap-2">
            <span className={`block h-5 w-5 border ${dotClass}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              {s.numeral}
            </span>
            <span className={`font-fraunces text-[15px] leading-tight md:text-[16px] ${titleTone}`}>
              {s.title}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
