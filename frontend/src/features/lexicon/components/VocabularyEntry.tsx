import { motion } from 'framer-motion'
import type { VocabWord } from '@shared/schemas/vocabulary'

const REGISTER_TINT: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'text-graphite',
  B2: 'text-sage',
  C1: 'text-claret',
}

function entryNumeral(n: number): string {
  return `№ ${String(n + 1).padStart(2, '0')}`
}

interface VocabularyEntryProps {
  word: VocabWord
  index: number
}

export function VocabularyEntry({ word, index }: VocabularyEntryProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.02, 0.6) }}
      className="border-b border-line py-10 md:py-12"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        {/* Identifier */}
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
            {entryNumeral(index)}
            <span className="mx-2 text-ochre">◆</span>
            <span className="text-claret">{word.partOfSpeech.toUpperCase()}</span>
            <span className="mx-2">·</span>
            <span className={REGISTER_TINT[word.register]}>{word.register}</span>
          </p>
          <h3 className="mt-3 font-fraunces text-[48px] italic leading-none text-ink md:text-[56px]">
            {word.headword}
            <em className="not-italic text-claret">.</em>
          </h3>
          <p className="mt-4 max-w-[32ch] font-fraunces text-[17px] italic leading-snug text-graphite md:text-[18px]">
            {word.definition}
          </p>
          {word.topic && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              TOPIC · {word.topic}
            </p>
          )}
        </div>

        {/* Example */}
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ EXAMPLE
          </p>
          <blockquote className="mt-3 border-l-2 border-claret pl-5 font-fraunces text-[19px] italic leading-[1.5] text-ink md:text-[21px]">
            {word.example}
          </blockquote>
        </div>

        {/* Synonyms */}
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ SYNONYMS · {word.synonyms.length}
          </p>
          <ul className="mt-3 space-y-3">
            {word.synonyms.map((s) => (
              <li
                key={s.word}
                className="grid grid-cols-[1fr_auto] items-baseline gap-3 border-b border-dashed border-line pb-2.5"
              >
                <span>
                  <span className="font-fraunces text-[22px] text-ink md:text-[24px]">
                    {s.word}
                  </span>
                  {s.nuance && (
                    <span className="ml-2 font-fraunces text-[14px] italic text-graphite md:text-[15px]">
                      — {s.nuance}
                    </span>
                  )}
                </span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.22em] ${REGISTER_TINT[s.register]}`}
                >
                  {s.register}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}
