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
import { LinkingEntry } from './LinkingEntry'
import { VocabularyEntry } from './VocabularyEntry'

interface DayLessonProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
  day: number
}

/**
 * Review-only lesson view (plan Decision #11). Renders the day's items via
 * the existing entry components; never POSTs to /srs/me/introduce — that's
 * the Daily Loop's responsibility.
 */
export function DayLesson({ discipline, level, week, day }: DayLessonProps) {
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

  return (
    <div className="mt-2">
      <header className="mb-8 border-b border-line pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ LESSON · DAY {day} · {query.data.length} ITEMS
        </p>
        <p className="mt-3 max-w-[60ch] font-fraunces text-[18px] italic leading-relaxed text-graphite">
          Read each entry once with attention. Active recall begins in Practice; the spaced
          schedule begins in Review.
        </p>
      </header>

      {query.data.map((item, index) => (
        <ItemRow key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}

function ItemRow({ item, index }: { item: LexiconItem; index: number }) {
  if (isVocabularyItem(item)) return <VocabularyEntry word={item} index={index} />
  if (isCollocationItem(item)) return <CollocationEntry item={item} index={index} />
  if (isLinkingItem(item)) return <LinkingEntry item={item} index={index} />
  return null
}
