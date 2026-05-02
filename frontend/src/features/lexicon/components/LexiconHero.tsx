import { motion } from 'framer-motion'
import { isVocabularyItem, type LexiconItem } from '@shared/schemas/lexicon-items'
import type { LexiconWeekStub } from '@shared/schemas/lexicon-plan'
import { OrnamentPlate } from '@/components/ornaments/OrnamentPlate'
import { Polaroid } from '@/components/ui/Polaroid'
import { PronunciationButton } from './primitives/PronunciationButton'

interface LexiconHeroProps {
  stub: LexiconWeekStub | undefined
  phaseRoman: string
  phaseName: string
  week: number
  totalWords: number
  masteredCount: number
  reviewingCount: number
  newCount: number
  /** First item of the day, promoted to "Word of the day" panel. */
  featuredItem: LexiconItem | undefined
}

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Editorial hero mirroring the landing/grammar layout grammar: 12-col grid,
 * OrnamentPlate + chapter eyebrow on the left, polaroid Word of the Day on
 * the right. Keeps the two halves visually balanced without a tinted card.
 */
export function LexiconHero({
  stub,
  phaseRoman,
  phaseName,
  week,
  totalWords,
  masteredCount,
  reviewingCount,
  newCount,
  featuredItem,
}: LexiconHeroProps) {
  const themeName = stub?.themeName ?? 'Week'
  const themeWords = themeName.split(/\s+/)
  const lastWord = themeWords.at(-1) ?? themeName
  const leadingWords = themeWords.slice(0, -1).join(' ')

  return (
    <section className="border-b border-line">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-12 md:px-10 md:py-16 xl:px-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — 7 cols */}
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="flex items-start gap-6">
                <OrnamentPlate
                  figure={`PL. ${String(week).padStart(2, '0')}`}
                  className="hidden md:block"
                />
                <div className="pt-3">
                  <p className="font-mono text-[clamp(10px,0.85vw,12px)] uppercase tracking-[0.25em]">
                    <span className="text-graphite">
                      CH. {phaseRoman} · WEEK {String(week).padStart(2, '0')} —
                    </span>{' '}
                    <span className="text-claret">{phaseName}</span>
                  </p>
                  {stub && (
                    <p className="mt-3 max-w-[42ch] font-fraunces text-[clamp(15px,1.3vw,18px)] italic leading-relaxed text-graphite">
                      {stub.tagline}
                    </p>
                  )}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1 className="mt-8 font-fraunces text-[clamp(42px,5vw,84px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
                {leadingWords && <span className="block">{leadingWords}</span>}
                <span className="block">
                  <span className="relative inline-block">
                    <em className="font-normal italic">{lastWord}</em>
                    <svg
                      className="absolute -bottom-1 left-0 h-[10px] w-full"
                      viewBox="0 0 200 10"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2,6 Q50,2 100,5 T198,4"
                        stroke="#6B1F1A"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-claret">.</span>
                </span>
              </h1>
            </FadeUp>

            {stub && (
              <FadeUp delay={0.32}>
                <div className="mt-8 grid max-w-[780px] grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] md:gap-10">
                  <div className="border-l-2 border-claret pl-5">
                    <p className="font-geist text-[clamp(15px,1.15vw,18px)] leading-[1.6] text-graphite">
                      {stub.goalOneLiner}
                    </p>
                  </div>
                  <div className="min-w-[140px] border-l border-line pl-5">
                    <span className="block font-mono text-[clamp(9px,0.75vw,11px)] uppercase tracking-[0.25em] text-graphite">
                      Today's intake
                    </span>
                    <span className="mt-1 block font-fraunces text-[clamp(20px,2vw,26px)] text-ink">
                      {totalWords} items
                    </span>
                    <span className="block font-fraunces text-[clamp(13px,1.1vw,15px)] italic text-graphite">
                      read with attention
                    </span>
                  </div>
                </div>
              </FadeUp>
            )}

            <FadeUp delay={0.42}>
              <dl className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-6">
                <Stat label="MASTERED" value={masteredCount} tone="teal" />
                <Stat label="REVIEWING" value={reviewingCount} tone="mustard" />
                <Stat label="NEW" value={newCount} tone="claret" />
              </dl>
            </FadeUp>
          </div>

          {/* RIGHT — 5 cols, Word of the day */}
          <div className="relative lg:col-span-5 lg:pt-12">
            <FadeUp delay={0.25}>
              <FeaturedPanel item={featuredItem} />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: 'claret' | 'teal' | 'mustard'
}) {
  const labelTone =
    tone === 'teal'
      ? 'text-teal'
      : tone === 'mustard'
        ? 'text-mustard'
        : tone === 'claret'
          ? 'text-claret'
          : 'text-graphite'
  const valueTone =
    tone === 'teal'
      ? 'text-teal'
      : tone === 'mustard'
        ? 'text-mustard'
        : tone === 'claret'
          ? 'text-claret'
          : 'text-ink'
  return (
    <div className="flex items-baseline gap-2">
      <dt className={`font-mono text-[10px] uppercase tracking-[0.22em] ${labelTone}`}>{label}</dt>
      <dd className={`font-fraunces text-[24px] ${valueTone}`}>{value}</dd>
    </div>
  )
}

function FeaturedPanel({ item }: { item: LexiconItem | undefined }) {
  if (!item) return null

  const headword = isVocabularyItem(item)
    ? item.headword
    : 'phrase' in item
      ? item.phrase
      : ''
  const definition =
    'definition' in item && item.definition ? item.definition : null
  const topic = isVocabularyItem(item) ? item.topic : undefined
  const ipa = isVocabularyItem(item) ? item.pronunciationIPA : undefined
  const audioUrl = isVocabularyItem(item) ? item.audioUrl : undefined
  const tint = polaroidTint(topic)

  return (
    <aside className="flex flex-col items-center md:items-start">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        ◆ {isVocabularyItem(item) ? 'WORD OF THE DAY' : 'ITEM OF THE DAY'}
      </p>

      <div className="mt-5 self-center md:self-start">
        <Polaroid
          src={polaroidSrc(topic, headword)}
          alt={`Editorial photograph for "${headword}"`}
          tint={tint}
          edition={`№ 01 · ${headword.toUpperCase()}`}
          orientation="portrait"
          rotate={-2}
          className="w-[260px] md:w-[300px]"
        />
      </div>

      <div className="mt-6 w-full">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="font-fraunces text-[28px] leading-none text-ink capitalize md:text-[32px]">
            {headword}
            <span className="text-claret">.</span>
          </h2>
          {(ipa || audioUrl) && (
            <PronunciationButton
              ipa={ipa}
              audioUrl={audioUrl}
              word={headword}
              compact
            />
          )}
        </div>
        {definition && (
          <p className="mt-2 font-fraunces text-[15px] italic leading-snug text-graphite md:text-[16px]">
            {definition}
          </p>
        )}
        <a
          href={`#word-${item.id}`}
          className="group mt-4 inline-flex items-center gap-2 font-geist text-[14px] text-ink"
        >
          <span className="relative">
            Read the entry
            <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
          </span>
          <span className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret">
            ↓
          </span>
        </a>
      </div>
    </aside>
  )
}

function polaroidSrc(topic: string | undefined, headword: string): string {
  const t = (topic ?? 'daily-life').toLowerCase()
  const map: Record<string, string> = {
    'daily-life': 'morning,window,cup',
    people: 'portrait,family',
    education: 'books,study,desk',
    work: 'office,desk,typewriter',
    environment: 'forest,landscape,tree',
    society: 'street,city,architecture',
    technology: 'machine,wires,circuit',
    health: 'walking,nature,calm',
    culture: 'gallery,art,sculpture',
    travel: 'train,journey,landscape',
    money: 'coins,paper,ledger',
    media: 'newspaper,typewriter,print',
  }
  const query = map[t] ?? 'editorial,still-life'
  const sig = encodeURIComponent(headword.toLowerCase())
  return `https://source.unsplash.com/featured/400x500/?${encodeURIComponent(query)}&sig=${sig}`
}

function polaroidTint(topic: string | undefined): 'claret' | 'sage' {
  const t = (topic ?? '').toLowerCase()
  return t.includes('environment') || t.includes('health') || t.includes('travel')
    ? 'sage'
    : 'claret'
}
