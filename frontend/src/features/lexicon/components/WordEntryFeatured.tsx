import { motion } from 'framer-motion'
import {
  isCollocationItem,
  isLinkingItem,
  isVocabularyItem,
  type LexiconItem,
} from '@shared/schemas/lexicon-items'
import { OrnamentDivider } from './primitives/OrnamentDivider'
import { Pill } from './primitives/Pill'
import { PronunciationButton } from './primitives/PronunciationButton'
import { StatusBadge, type WordStatus } from './primitives/StatusBadge'
import { SynonymChip } from './primitives/SynonymChip'

interface WordEntryFeaturedProps {
  item: LexiconItem
  index: number
  status?: WordStatus
}

const REGISTER_PILL: Record<'B1' | 'B2' | 'C1', string> = {
  B1: 'border-graphite/30 text-graphite',
  B2: 'border-sage/40 text-sage',
  C1: 'border-claret/40 text-claret',
}

/**
 * Full-width featured variant — chapter-opener composition. Centred metadata
 * band, oversized centred headline, left-aligned reading column. Bookends the
 * day's lesson on entry #0 and the last entry.
 */
export function WordEntryFeatured({ item, index, status = 'new' }: WordEntryFeaturedProps) {
  const numeral = String(index + 1).padStart(2, '0')
  const entryLabel = index === 0 ? 'OPENING ENTRY' : 'CLOSING ENTRY'

  return (
    <motion.article
      id={`word-${item.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-ivory"
    >
      {/* Top accent rule — claret signature */}
      <div className="h-[3px] w-full bg-claret" />

      <div className="mx-auto w-full max-w-[1100px] px-6 py-10 md:px-10 md:py-14">
        {/* Centred metadata band: chapter mark + pills + status */}
        <div className="flex flex-col items-center gap-4 border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
            <span className="text-claret">◆ № {numeral}</span>
            <span className="mx-2 text-line">·</span>
            <span>{entryLabel}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FeaturedPills item={item} />
            <StatusBadge status={status} />
          </div>
        </div>

        <FeaturedBody item={item} />
      </div>

      {/* Bottom hairline */}
      <div className="h-px w-full bg-line" />
    </motion.article>
  )
}

function FeaturedPills({ item }: { item: LexiconItem }) {
  if (isVocabularyItem(item)) {
    return (
      <>
        <Pill className="border-claret/40 text-claret">{item.partOfSpeech.toUpperCase()}</Pill>
        <Pill className={REGISTER_PILL[item.register]}>{item.register}</Pill>
        {item.topic && <Pill className="border-line text-graphite">{item.topic}</Pill>}
      </>
    )
  }
  if (isCollocationItem(item)) {
    return (
      <>
        <Pill className="border-claret/40 text-claret">{item.pattern.replace(/-/g, ' + ').toUpperCase()}</Pill>
        <Pill className={REGISTER_PILL[item.register]}>{item.register}</Pill>
      </>
    )
  }
  if (isLinkingItem(item)) {
    return (
      <>
        <Pill className="border-claret/40 text-claret">{item.function.toUpperCase()}</Pill>
        <Pill className={REGISTER_PILL[item.register]}>{item.register}</Pill>
      </>
    )
  }
  return null
}

function FeaturedBody({ item }: { item: LexiconItem }) {
  if (isVocabularyItem(item)) {
    return (
      <>
        {/* Centred headline + IPA */}
        <div className="mt-10 flex flex-col items-center text-center">
          <h3 className="font-fraunces text-[clamp(48px,6vw,96px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink capitalize">
            {item.headword}
            <span className="text-claret">.</span>
          </h3>
          <div className="mt-4">
            <PronunciationButton
              ipa={item.pronunciationIPA}
              audioUrl={item.audioUrl}
              word={item.headword}
            />
          </div>
          {item.etymology && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              ETYMOLOGY · {item.etymology}
            </p>
          )}
        </div>

        {/* Reading frame — centred, left-aligned text */}
        <div className="mx-auto mt-10 max-w-[68ch]">
          <p className="font-fraunces text-[19px] leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-fraunces first-letter:text-[48px] first-letter:leading-[0.9] first-letter:text-claret md:text-[21px]">
            {item.definition}
          </p>
          <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[19px]">
            {item.example}
          </blockquote>
          {item.connotationNote && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ochre">
              ◆ NUANCE&nbsp;&nbsp;
              <span className="font-fraunces text-[14px] normal-case tracking-normal text-graphite">
                {item.connotationNote}
              </span>
            </p>
          )}
        </div>

        {item.synonyms.length > 0 && (
          <div className="mx-auto mt-8 flex max-w-[68ch] flex-wrap items-center justify-center gap-x-2 gap-y-2 border-t border-line pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">SYN</span>
            {item.synonyms.map((s) => (
              <SynonymChip key={s.word} word={s.word} register={s.register} nuance={s.nuance} />
            ))}
          </div>
        )}
      </>
    )
  }

  // Colloc + linking — same centred chapter-opener treatment
  const phrase = 'phrase' in item ? item.phrase : ''
  return (
    <>
      <div className="mt-10 text-center">
        <h3 className="font-fraunces text-[clamp(40px,5vw,76px)] font-normal leading-[1] tracking-[-0.02em] text-ink capitalize">
          {phrase}
          <span className="text-claret">.</span>
        </h3>
      </div>

      <div className="mx-auto mt-10 max-w-[68ch]">
        {'definition' in item && item.definition && (
          <p className="font-fraunces text-[19px] leading-relaxed text-ink md:text-[21px]">
            {item.definition}
          </p>
        )}
        {'example' in item && item.example && (
          <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[17px] italic leading-relaxed text-graphite md:text-[19px]">
            {item.example}
          </blockquote>
        )}
      </div>
    </>
  )
}

export { OrnamentDivider }
