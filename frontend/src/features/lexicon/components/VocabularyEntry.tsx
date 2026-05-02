import { motion } from 'framer-motion'
import type { VocabWord } from '@shared/schemas/vocabulary'
import { Pill } from './primitives/Pill'
import { PronunciationButton } from './primitives/PronunciationButton'
import { StatusBadge, type WordStatus } from './primitives/StatusBadge'
import { SynonymChip } from './primitives/SynonymChip'

const REGISTER_PILL: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'border-graphite/30 text-graphite',
  B2: 'border-sage/40 text-sage',
  C1: 'border-claret/40 text-claret',
}

interface VocabularyEntryProps {
  word: VocabWord
  index: number
  status?: WordStatus
}

export function VocabularyEntry({ word, index, status = 'new' }: VocabularyEntryProps) {
  return (
    <motion.article
      id={`word-${word.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.02, 0.4) }}
      className="group relative scroll-mt-28 border border-line bg-ivory px-6 py-5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(107,31,26,0.18)] md:px-8 md:py-6"
    >
      {/* Watermark numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-2 select-none font-fraunces text-[64px] leading-none text-claret/8 md:text-[80px]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Header */}
      <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">
            № {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-fraunces text-[28px] leading-none text-ink capitalize md:text-[32px]">
            {word.headword}
            <span className="text-claret">.</span>
          </h3>
          {(word.pronunciationIPA || word.audioUrl) && (
            <PronunciationButton
              ipa={word.pronunciationIPA}
              audioUrl={word.audioUrl}
              word={word.headword}
              compact
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Pill className="border-claret/40 text-claret">{word.partOfSpeech.toUpperCase()}</Pill>
          <Pill className={REGISTER_PILL[word.register]}>{word.register}</Pill>
          {word.topic && <Pill className="border-line text-graphite">{word.topic}</Pill>}
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Etymology line (if present) */}
      {word.etymology && (
        <p className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/80">
          ETYMOLOGY · {word.etymology}
        </p>
      )}

      {/* Definition */}
      <p className="relative mt-4 max-w-[68ch] font-fraunces text-[17px] leading-snug text-ink md:text-[18px]">
        {word.definition}
      </p>

      {/* Example */}
      <blockquote className="relative mt-4 border-l-2 border-claret pl-4 font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[17px]">
        {word.example}
      </blockquote>

      {/* Connotation note */}
      {word.connotationNote && (
        <p className="relative mt-3 max-w-[68ch] font-mono text-[10px] uppercase tracking-[0.22em] text-ochre">
          ◆ NUANCE&nbsp;&nbsp;
          <span className="font-fraunces text-[14px] normal-case tracking-normal text-graphite">
            {word.connotationNote}
          </span>
        </p>
      )}

      {/* Synonyms */}
      {word.synonyms.length > 0 && (
        <div className="relative mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite/70">SYN</span>
          {word.synonyms.map((s) => (
            <SynonymChip key={s.word} word={s.word} register={s.register} nuance={s.nuance} />
          ))}
        </div>
      )}
    </motion.article>
  )
}
