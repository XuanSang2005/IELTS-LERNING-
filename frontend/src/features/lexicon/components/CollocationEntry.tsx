import { motion } from 'framer-motion'
import type { Collocation, CollocationPattern } from '@shared/schemas/collocation'

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
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

function entryNumeral(n: number): string {
  return `№ ${String(n + 1).padStart(2, '0')}`
}

interface CollocationEntryProps {
  item: Collocation
  index: number
}

export function CollocationEntry({ item, index }: CollocationEntryProps) {
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
            <span className="text-claret">{PATTERN_LABEL[item.pattern]}</span>
            <span className="mx-2">·</span>
            <span className={REGISTER_TINT[item.register]}>{item.register}</span>
          </p>
          <h3 className="mt-3 font-fraunces text-[40px] italic leading-[1.05] text-ink md:text-[48px]">
            {item.phrase}
            <em className="not-italic text-claret">.</em>
          </h3>
          <p className="mt-4 max-w-[36ch] font-fraunces text-[17px] italic leading-snug text-graphite md:text-[18px]">
            {item.definition}
          </p>
          {item.topic && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              TOPIC · {item.topic}
            </p>
          )}
        </div>

        {/* Example */}
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ EXAMPLE
          </p>
          <blockquote className="mt-3 border-l-2 border-claret pl-5 font-fraunces text-[19px] italic leading-[1.5] text-ink md:text-[21px]">
            {item.example}
          </blockquote>
          {item.note && (
            <p className="mt-5 max-w-[44ch] font-fraunces text-[15px] italic leading-relaxed text-graphite md:text-[16px]">
              <span className="font-mono text-[10px] not-italic uppercase tracking-[0.28em] text-ochre">
                ◆ NOTE&nbsp;&nbsp;
              </span>
              {item.note}
            </p>
          )}
        </div>

        {/* Alternatives */}
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ ALTERNATIVES{item.alternatives.length > 0 ? ` · ${item.alternatives.length}` : ''}
          </p>
          {item.alternatives.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {item.alternatives.map((alt) => (
                <li
                  key={alt}
                  className="border-b border-dashed border-line pb-2.5 font-fraunces text-[20px] text-ink md:text-[22px]"
                >
                  {alt}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 font-fraunces text-[16px] italic text-graphite">
              None — this pairing stands alone.
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}
