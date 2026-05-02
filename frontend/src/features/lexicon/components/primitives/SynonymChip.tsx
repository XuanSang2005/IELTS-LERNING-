type Register = 'B1' | 'B2' | 'C1'

const REGISTER_PILL: Record<Register, string> = {
  B1: 'border-graphite/30 text-graphite',
  B2: 'border-sage/40 text-sage',
  C1: 'border-claret/40 text-claret',
}

const REGISTER_TINT: Record<Register, string> = {
  B1: 'text-graphite/70',
  B2: 'text-sage/80',
  C1: 'text-claret/70',
}

interface SynonymChipProps {
  word: string
  register: Register
  nuance?: string
}

/** Inline chip — register tint, optional nuance shown as hover tooltip. */
export function SynonymChip({ word, register, nuance }: SynonymChipProps) {
  return (
    <span
      className={`group relative inline-flex items-baseline gap-1.5 border px-2.5 py-1 font-fraunces text-[15px] text-ink transition-colors hover:border-claret hover:text-claret ${REGISTER_PILL[register]}`}
      title={nuance ?? undefined}
    >
      <span>{word}</span>
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.2em] ${REGISTER_TINT[register]}`}
      >
        {register}
      </span>
      {nuance && (
        <span className="absolute left-1/2 top-full z-10 mt-1 hidden w-max max-w-[260px] -translate-x-1/2 border border-line bg-bone px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink shadow-[0_4px_12px_-4px_rgba(107,31,26,0.25)] group-hover:block">
          {nuance}
        </span>
      )}
    </span>
  )
}
