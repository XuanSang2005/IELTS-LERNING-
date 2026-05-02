import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import {
  isCollocationItem,
  isLinkingItem,
  isVocabularyItem,
  type LexiconItem,
} from '@shared/schemas/lexicon-items'
import type { BandLevel } from '@shared/schemas/practice'
import { useDayItems } from '../hooks/useDayItems'
import { CollocationEntry } from './CollocationEntry'
import { DayCompletionCTA } from './DayCompletionCTA'
import { LinkingEntry } from './LinkingEntry'
import { LiteraryInterlude } from './LiteraryInterlude'
import { OrnamentDivider } from './primitives/OrnamentDivider'
import { VocabularyEntry } from './VocabularyEntry'
import { WordEntryFeatured } from './WordEntryFeatured'

interface DayLessonProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
  day: number
  /** Theme of the next day, for the closing CTA preview. */
  nextDayTheme?: string
}

/**
 * Refactored DayLesson — magazine asymmetric layout with sticky TOC sidebar
 * and rhythm pattern: featured opening (#0), 3 standard, interlude, 3 standard,
 * interlude, 3 standard, featured closing (last). Falls back to plain stack
 * for fewer than 7 items.
 */
export function DayLesson({ discipline, level, week, day, nextDayTheme }: DayLessonProps) {
  const query = useDayItems({ discipline, level, week, day })

  if (query.isPending) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
        Opening today's lesson…
      </p>
    )
  }

  if (query.isError || !query.data) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-claret">
        The lesson is momentarily out of reach. Please refresh.
      </p>
    )
  }

  if (query.data.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ NO ITEMS YET
        </p>
        <p className="mt-4 font-fraunces text-[24px] italic text-graphite">
          The lesson for this day is in preparation. Return shortly.
        </p>
      </div>
    )
  }

  const items = query.data
  const lastIndex = items.length - 1

  return (
    <div>
      <div>
        <header className="mb-8 flex flex-col items-center border-b border-line pb-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ LESSON · DAY {day} · {items.length} ITEMS
          </p>
          <p className="mt-3 font-fraunces text-[18px] italic leading-relaxed text-graphite whitespace-nowrap">
            Read each entry once with attention. Active recall begins in Practice; the spaced schedule begins in Review.
          </p>
        </header>

        <div className="flex flex-col gap-10 md:gap-14">
          {items.map((item, index) => {
            const isFeatured = index === 0 || index === lastIndex
            const interludeAfter = !isFeatured && (index === 3 || index === 6) && items.length >= 7

            return (
              <div key={item.id} className="flex flex-col gap-10 md:gap-14">
                {isFeatured ? (
                  <WordEntryFeatured item={item} index={index} />
                ) : (
                  <>
                    <ItemRow item={item} index={index} />
                    {/* Ornament between standard cards */}
                    {!interludeAfter && index < lastIndex && <OrnamentDivider />}
                  </>
                )}

                {interludeAfter && <LiteraryInterlude {...interludeFor(items, index)} />}
              </div>
            )
          })}
        </div>

        <DayCompletionCTA
          discipline={discipline}
          week={week}
          day={day}
          itemCount={items.length}
          nextDayTheme={nextDayTheme}
        />
      </div>
    </div>
  )
}

function ItemRow({ item, index }: { item: LexiconItem; index: number }) {
  if (isVocabularyItem(item)) return <VocabularyEntry word={item} index={index} />
  if (isCollocationItem(item)) return <CollocationEntry item={item} index={index} />
  if (isLinkingItem(item)) return <LinkingEntry item={item} index={index} />
  return null
}

/**
 * Picks a quote and attribution from a nearby item's example to use as the
 * literary interlude. Avoids needing dedicated CMS copy in v1.
 */
function interludeFor(items: LexiconItem[], anchorIndex: number): {
  quote: string
  attribution: string
} {
  const candidate = items[Math.min(anchorIndex - 1, items.length - 1)]
  if (candidate && 'example' in candidate && candidate.example) {
    const head = isVocabularyItem(candidate)
      ? candidate.headword
      : 'phrase' in candidate
        ? candidate.phrase
        : 'this entry'
    return {
      quote: candidate.example,
      attribution: `Meridian editorial — on "${head}"`,
    }
  }
  return {
    quote: 'A patient reader returns to a paragraph she could already have moved past.',
    attribution: 'Meridian editorial',
  }
}
