import { useMemo, useRef, useState } from 'react'
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
import { useReviewMutation } from '../hooks/useReviewMutation'
import { useTodayQueue } from '../hooks/useTodayQueue'
import { TodayQueueBanner } from './TodayQueueBanner'

interface SrsDeckProps {
  discipline: LexiconDiscipline
  level: BandLevel
}

/**
 * Combined queue entry — either an SRS card already due, or a fresh item.
 * Backend guarantees `item` is non-null for `due` entries (orphan cards are
 * filtered server-side before the queue is returned).
 */
type DeckEntry =
  | { kind: 'new'; item: LexiconItem }
  | { kind: 'due'; card: SrsCard; item: LexiconItem }

/**
 * Canonical daily intake. Plan Decision #11 — this is the only path that
 * introduces SRS cards. The backend's POST /review now auto-introduces a card
 * if it doesn't exist, so the client only fires one mutation per rating.
 */
export function SrsDeck({ discipline, level }: SrsDeckProps) {
  const queue = useTodayQueue(discipline, level)
  const review = useReviewMutation({ discipline, level })

  const [revealed, setRevealed] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // Debounce: ignore subsequent clicks within 400ms of the last accepted one,
  // even if the mutation hasn't responded. Prevents double-fire on iOS taps.
  const lastClickRef = useRef<number>(0)

  // Combine new + due into a single ordered deck. New items first so the
  // student gets fresh exposure before launching into the spaced reviews.
  const deck = useMemo<DeckEntry[]>(() => {
    if (!queue.data) return []
    const news: DeckEntry[] = queue.data.newItems.map((item) => ({ kind: 'new', item }))
    const dueItemsById = new Map(queue.data.dueItems.map((it) => [it.id, it]))
    const dues: DeckEntry[] = queue.data.dueReviews.flatMap((card) => {
      const item = dueItemsById.get(card.itemId)
      return item ? [{ kind: 'due' as const, card, item }] : []
    })
    return [...news, ...dues]
  }, [queue.data])

  if (queue.isPending) {
    return (
      <p className="py-16 text-center font-fraunces text-[24px] italic text-graphite">
        Opening today's queue…
      </p>
    )
  }

  if (queue.isError || !queue.data) {
    const err = queue.error as { status?: number; message?: string } | null
    const isNetwork = !err?.status // fetch threw before getting a response
    return (
      <div className="space-y-4 py-16 text-center">
        <p className="font-fraunces text-[24px] italic text-claret">
          {isNetwork
            ? 'No connection to the library. Check your network.'
            : "The queue is momentarily out of reach."}
        </p>
        <button
          type="button"
          onClick={() => queue.refetch()}
          className="border-2 border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          Try again
        </button>
      </div>
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

  function handleRate(rating: ReviewRating) {
    const now = Date.now()
    if (now - lastClickRef.current < 400) return
    lastClickRef.current = now

    // Optimistic advance — UI moves immediately, mutation fires in background.
    // On error: rollback both index and reveal state so the user can retry.
    setRevealed(false)
    setActiveIdx((i) => i + 1)
    setErrorMessage(null)
    review.mutate(
      { itemId, rating },
      {
        onError: (err: unknown) => {
          setActiveIdx((i) => Math.max(0, i - 1))
          setRevealed(true)
          const status = (err as { status?: number })?.status
          if (status === 409) {
            setErrorMessage(
              'Daily new-item quota reached. Continue with reviews — new items resume tomorrow.',
            )
          } else if (status === 401) {
            setErrorMessage('Your session has closed. Please sign in again.')
          } else {
            setErrorMessage('Could not save that review. Tap a rating to retry.')
          }
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
        <NewCardBody item={active.item} revealed={revealed} />
      </motion.article>

      {errorMessage && (
        <p className="border-l-2 border-claret bg-claret/5 px-4 py-3 font-fraunces text-[15px] italic text-claret">
          {errorMessage}
        </p>
      )}

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
          <RatingButton label="Again" tone="claret" disabled={false} onClick={() => handleRate('again')} />
          <RatingButton label="Good" tone="ink" disabled={false} onClick={() => handleRate('good')} />
          <RatingButton label="Easy" tone="sage" disabled={false} onClick={() => handleRate('easy')} />
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

