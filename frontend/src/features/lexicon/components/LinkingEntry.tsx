import { motion } from 'framer-motion'
import type { LinkingDevice, LinkingFunction, LinkingPosition } from '@shared/schemas/linking-device'
import { Pill } from './primitives/Pill'
import { StatusBadge, type WordStatus } from './primitives/StatusBadge'

const REGISTER_PILL: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'border-graphite/30 text-graphite',
  B2: 'border-sage/40 text-sage',
  C1: 'border-claret/40 text-claret',
}

const FUNCTION_LABEL: Record<LinkingFunction, string> = {
  addition: 'ADDITION',
  contrast: 'CONTRAST',
  cause: 'CAUSE',
  effect: 'EFFECT',
  concession: 'CONCESSION',
  exemplification: 'EXAMPLE',
  sequence: 'SEQUENCE',
  summary: 'SUMMARY',
}

const POSITION_LABEL: Record<LinkingPosition, string> = {
  initial: 'Initial',
  medial: 'Medial',
  final: 'Final',
}

interface LinkingEntryProps {
  item: LinkingDevice
  index: number
  status?: WordStatus
}

export function LinkingEntry({ item, index, status = 'new' }: LinkingEntryProps) {
  return (
    <motion.article
      id={`word-${item.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.02, 0.4) }}
      className="group relative scroll-mt-28 border border-line bg-ivory px-6 py-5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(107,31,26,0.18)] md:px-8 md:py-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-2 select-none font-fraunces text-[64px] leading-none text-claret/8 md:text-[80px]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">
            № {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-fraunces text-[24px] leading-[1.05] text-ink capitalize md:text-[28px]">
            {item.phrase}
            <span className="text-claret">.</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Pill className="border-claret/40 text-claret">{FUNCTION_LABEL[item.function]}</Pill>
          <Pill className={REGISTER_PILL[item.register]}>{item.register}</Pill>
          <StatusBadge status={status} />
        </div>
      </div>

      <blockquote className="relative mt-4 border-l-2 border-claret pl-4 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
        {item.example}
      </blockquote>

      {item.note && (
        <p className="relative mt-3 max-w-[68ch] font-mono text-[10px] uppercase tracking-[0.22em] text-ochre">
          ◆ NOTE&nbsp;&nbsp;
          <span className="font-fraunces text-[14px] normal-case tracking-normal text-graphite">
            {item.note}
          </span>
        </p>
      )}

      <div className="relative mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">POS</span>
        {item.positions.map((p) => (
          <span
            key={p}
            className="inline-flex items-center border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite"
          >
            {POSITION_LABEL[p]}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
