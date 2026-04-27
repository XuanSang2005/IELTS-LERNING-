import { motion } from 'framer-motion'
import type { LinkingDevice, LinkingFunction, LinkingPosition } from '@shared/schemas/linking-device'

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
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

function entryNumeral(n: number): string {
  return `№ ${String(n + 1).padStart(2, '0')}`
}

interface LinkingEntryProps {
  item: LinkingDevice
  index: number
}

export function LinkingEntry({ item, index }: LinkingEntryProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.02, 0.6) }}
      className="border-b border-line py-10 md:py-12"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        {/* Identifier */}
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            {entryNumeral(index)}
            <span className="mx-2 text-ochre">◆</span>
            <span className="text-claret">{FUNCTION_LABEL[item.function]}</span>
            <span className="mx-2">·</span>
            <span className={REGISTER_TINT[item.register]}>{item.register}</span>
          </p>
          <h3 className="mt-3 font-fraunces text-[40px] italic leading-[1.05] text-ink md:text-[48px]">
            {item.phrase}
            <em className="not-italic text-claret">.</em>
          </h3>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            POSITION&nbsp;·&nbsp;
            {item.positions.map((p) => POSITION_LABEL[p]).join(' · ')}
          </p>
        </div>

        {/* Example */}
        <div className="md:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ EXAMPLE
          </p>
          <blockquote className="mt-3 border-l-2 border-claret pl-5 font-fraunces text-[19px] italic leading-[1.5] text-ink md:text-[22px]">
            {item.example}
          </blockquote>
          {item.note && (
            <p className="mt-5 max-w-[60ch] font-fraunces text-[15px] italic leading-relaxed text-graphite md:text-[16px]">
              <span className="font-mono text-[10px] not-italic uppercase tracking-[0.28em] text-ochre">
                ◆ NOTE&nbsp;&nbsp;
              </span>
              {item.note}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}
