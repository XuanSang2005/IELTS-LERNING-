import { motion } from 'framer-motion'
import type { Collocation, CollocationPattern } from '@shared/schemas/collocation'
import { Pill } from './primitives/Pill'
import { StatusBadge, type WordStatus } from './primitives/StatusBadge'

const REGISTER_PILL: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'border-graphite/30 text-graphite',
  B2: 'border-sage/40 text-sage',
  C1: 'border-claret/40 text-claret',
}

const PATTERN_LABEL: Record<CollocationPattern, string> = {
  'verb-noun': 'V + N',
  'adjective-noun': 'ADJ + N',
  'noun-noun': 'N + N',
  'verb-preposition': 'V + PREP',
  'adjective-preposition': 'ADJ + PREP',
  'adverb-adjective': 'ADV + ADJ',
  'verb-adverb': 'V + ADV',
  verb: 'V CHUNK',
  'noun-adjective': 'N + ADJ',
  'verb-adjective': 'V + ADJ',
  'noun-preposition': 'N + PREP',
  preposition: 'PREP CHUNK',
  'adverb-verb': 'ADV + V',
  noun: 'N CHUNK',
  adjective: 'ADJ CHUNK',
}

interface CollocationEntryProps {
  item: Collocation
  index: number
  status?: WordStatus
}

export function CollocationEntry({ item, index, status = 'new' }: CollocationEntryProps) {
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
          <Pill className="border-claret/40 text-claret">{PATTERN_LABEL[item.pattern]}</Pill>
          <Pill className={REGISTER_PILL[item.register]}>{item.register}</Pill>
          {item.topic && <Pill className="border-line text-graphite">{item.topic}</Pill>}
          <StatusBadge status={status} />
        </div>
      </div>

      <p className="relative mt-4 max-w-[68ch] font-fraunces text-[17px] leading-snug text-ink md:text-[18px]">
        {item.definition}
      </p>

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

      {item.alternatives.length > 0 && (
        <div className="relative mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">ALT</span>
          {item.alternatives.map((alt) => (
            <span
              key={alt}
              className="inline-flex items-center border border-line px-2.5 py-1 font-fraunces text-[15px] text-ink transition-colors hover:border-claret hover:text-claret"
            >
              {alt}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}
