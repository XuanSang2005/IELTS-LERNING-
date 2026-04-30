import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import {
  isCollocationItem,
  isLinkingItem,
  isVocabularyItem,
  type LexiconItem,
} from '@shared/schemas/lexicon-items'
import type { BandLevel } from '@shared/schemas/practice'
import type { ReviewRating, SrsCard } from '@shared/schemas/srs'
import { useIntroduceMutation } from '../hooks/useIntroduceMutation'
import { useReviewMutation } from '../hooks/useReviewMutation'
import { useTodayQueue } from '../hooks/useTodayQueue'
import { TodayQueueBanner } from './TodayQueueBanner'

interface SrsDeckProps {
  discipline: LexiconDiscipline
  level: BandLevel
}

/** Combined queue entry — either an SRS card already due, or a fresh item. */
type DeckEntry =
  | { kind: 'new'; item: LexiconItem }
  | { kind: 'due'; card: SrsCard; item: LexiconItem | null }

/**
 * Canonical daily intake. Plan Decision #11 — this is the only path that
 * introduces SRS cards. Renders cards one at a time with Again / Good / Easy
 * buttons; throttle and pause state come from the backend's TodayQueue.
 */
export function SrsDeck({ discipline, level }: SrsDeckProps) {
  const queue = useTodayQueue(discipline, level)
  const introduce = useIntroduceMutation({ discipline, level })
  const review = useReviewMutation({ discipline, level })

  const [revealed, setRevealed] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [completedItemIds, setCompletedItemIds] = useState<Set<string>>(new Set())

  // Combine new + due into a single ordered deck. New items first so the
  // student gets fresh exposure before launching into the spaced reviews.
  const deck = useMemo<DeckEntry[]>(() => {
    if (!queue.data) return []
    const news: DeckEntry[] = queue.data.newItems.map((item) => ({ kind: 'new', item }))
    const dueItemsById = new Map(queue.data.dueItems.map((it) => [it.id, it]))
    const dues: DeckEntry[] = queue.data.dueReviews.map((card) => ({
      kind: 'due',
      card,
      item: dueItemsById.get(card.itemId) ?? null,
    }))
    return [...news, ...dues]
  }, [queue.data])

  // When a new item lands at activeIdx, idempotently create its SRS card.
  useEffect(() => {
    const entry = deck[activeIdx]
    if (!entry || entry.kind !== 'new') return
    if (completedItemIds.has(entry.item.id)) return
    if (introduce.isPending) return
    introduce.mutate({ itemId: entry.item.id })
  }, [activeIdx, deck, introduce, completedItemIds])

  if (queue.isPending) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
        Opening today's queue…
      </p>
    )
  }

  if (queue.isError || !queue.data) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-claret">
        The queue is momentarily out of reach. Please refresh.
      </p>
    )
  }

  const data = queue.data

  if (deck.length === 0) {
    return <TodayQueueBanner queue={data} />
  }

  if (activeIdx >= deck.length) {
    return (
      <div className="space-y-6">
        <TodayQueueBanner queue={data} />
        <div className="border border-line bg-bone/30 px-6 py-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-sage">
            ◆ QUEUE CLEARED
          </p>
          <p className="mt-3 font-fraunces text-[22px] italic leading-relaxed text-graphite">
            All {deck.length} cards processed. Return tomorrow — the schedule will surface what is
            next.
          </p>
        </div>
      </div>
    )
  }

  const active = deck[activeIdx]!
  const itemId = active.kind === 'new' ? active.item.id : active.card.itemId
  const submitting = review.isPending

  function handleRate(rating: ReviewRating) {
    if (submitting) return
    review.mutate(
      { itemId, rating },
      {
        onSuccess: () => {
          setCompletedItemIds((prev) => new Set(prev).add(itemId))
          setRevealed(false)
          setActiveIdx((i) => i + 1)
        },
      },
    )
  }

  return (
    <div className="space-y-6">
      <TodayQueueBanner queue={data} />

      <div className="flex items-center justify-between border-b border-line pb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          ◆ {active.kind === 'new' ? 'NEW · INTRODUCING' : `REVIEW · BOX ${active.card.box}`}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          {activeIdx + 1} / {deck.length}
        </p>
      </div>

      <motion.article
        key={itemId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="border border-line bg-ivory p-6 md:p-10"
      >
        {active.kind === 'new' ? (
          <NewCardBody item={active.item} revealed={revealed} />
        ) : active.item ? (
          <NewCardBody item={active.item} revealed={revealed} />
        ) : (
          <DueCardBody itemId={itemId} card={active.card} revealed={revealed} />
        )}
      </motion.article>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="w-full border-2 border-ink bg-transparent py-4 font-mono text-[12px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          Reveal
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <RatingButton label="Again" tone="claret" disabled={submitting} onClick={() => handleRate('again')} />
          <RatingButton label="Good" tone="ink" disabled={submitting} onClick={() => handleRate('good')} />
          <RatingButton label="Easy" tone="sage" disabled={submitting} onClick={() => handleRate('easy')} />
        </div>
      )}
    </div>
  )
}

function RatingButton({
  label,
  tone,
  disabled,
  onClick,
}: {
  label: string
  tone: 'claret' | 'ink' | 'sage'
  disabled: boolean
  onClick: () => void
}) {
  const toneClass =
    tone === 'claret'
      ? 'border-claret text-claret hover:bg-claret hover:text-ivory'
      : tone === 'sage'
        ? 'border-sage text-sage hover:bg-sage hover:text-ivory'
        : 'border-ink text-ink hover:bg-ink hover:text-ivory'
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 border-2 py-4 font-mono text-[11px] uppercase tracking-[0.24em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${toneClass}`}
    >
      <span>{label}</span>
    </button>
  )
}

function NewCardBody({ item, revealed }: { item: LexiconItem; revealed: boolean }) {
  const headword = isVocabularyItem(item)
    ? item.headword
    : isCollocationItem(item)
      ? item.phrase
      : isLinkingItem(item)
        ? item.phrase
        : ''

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        {item.discipline.toUpperCase()}
        {isVocabularyItem(item) && (
          <>
            <span className="mx-2 text-line">·</span>
            <span className="text-claret">{item.partOfSpeech.toUpperCase()}</span>
          </>
        )}
      </p>
      <h3 className="mt-3 font-fraunces text-[clamp(36px,5vw,64px)] italic leading-none text-ink">
        {headword}
        <em className="not-italic text-claret">.</em>
      </h3>

      {revealed && (
        <div className="mt-6 space-y-4">
          {isVocabularyItem(item) && (
            <>
              <p className="font-fraunces text-[20px] italic leading-relaxed text-graphite md:text-[22px]">
                {item.definition}
              </p>
              <blockquote className="border-l-2 border-claret pl-5 font-fraunces text-[18px] italic leading-[1.5] text-ink md:text-[19px]">
                {item.example}
              </blockquote>
            </>
          )}
          {isCollocationItem(item) && (
            <>
              <p className="font-fraunces text-[20px] italic leading-relaxed text-graphite md:text-[22px]">
                {item.definition}
              </p>
              <blockquote className="border-l-2 border-claret pl-5 font-fraunces text-[18px] italic leading-[1.5] text-ink md:text-[19px]">
                {item.example}
              </blockquote>
            </>
          )}
          {isLinkingItem(item) && (
            <>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
                FUNCTION · {item.function}
              </p>
              <blockquote className="border-l-2 border-claret pl-5 font-fraunces text-[18px] italic leading-[1.5] text-ink md:text-[19px]">
                {item.example}
              </blockquote>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function DueCardBody({ itemId, card, revealed }: { itemId: string; card: SrsCard; revealed: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        DUE · {card.discipline.toUpperCase()}
        <span className="mx-2 text-line">·</span>
        <span className="text-claret">{card.totalReviews} REVIEW{card.totalReviews === 1 ? '' : 'S'}</span>
      </p>
      <h3 className="mt-3 font-fraunces text-[clamp(28px,4vw,44px)] italic leading-tight text-ink">
        {itemId}
      </h3>
      {revealed && (
        <p className="mt-6 font-fraunces text-[18px] italic leading-relaxed text-graphite">
          (Item details would render here in production — the today endpoint currently returns
          due cards as IDs only. Future iteration hydrates the full item via batched lookup.)
        </p>
      )}
    </div>
  )
}
