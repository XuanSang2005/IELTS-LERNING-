import { useMemo, useState } from 'react'
import type { NoticingItem, ReviewQuality } from '@shared/schemas/practice'
import type { SessionStep } from '@/features/practice/utils/session-planner'
import { useNoticingItems } from '@/features/practice/hooks/practice-queries'
import { useReviewItemMutation } from '@/features/practice/hooks/practice-mutations'
import { StepShell } from './StepShell'

interface FlashcardReviewStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  itemIds: string[]
  onAdvance: () => void
  onPrev?: () => void
}

const RATING_BUTTONS: Array<{ quality: ReviewQuality; label: string }> = [
  { quality: 'forgot', label: 'Forgot' },
  { quality: 'hard', label: 'Hard' },
  { quality: 'good', label: 'Good' },
  { quality: 'easy', label: 'Easy' },
]

export function FlashcardReviewStep({
  step,
  stepNumber,
  totalSteps,
  itemIds,
  onAdvance,
  onPrev,
}: FlashcardReviewStepProps) {
  const allItems = useNoticingItems()
  const reviewItem = useReviewItemMutation()

  const deck = useMemo<NoticingItem[]>(() => {
    const byId = new Map(allItems.map((i) => [i.id, i] as const))
    return itemIds.map((id) => byId.get(id)).filter((x): x is NoticingItem => Boolean(x))
  }, [itemIds, allItems])

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const current = deck[index]
  const allDone = index >= deck.length

  const handleRate = async (quality: ReviewQuality) => {
    if (!current) return
    await reviewItem.mutateAsync({ id: current.id, quality })
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  if (deck.length === 0) {
    return (
      <StepShell
        step={step}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        onContinue={onAdvance}
        onPrev={onPrev}
      >
        <div className="max-w-[64ch] border-l-2 border-claret pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            ◆ NOTHING TO RECALL
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            No items waiting from yesterday.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            The room is quiet. Capture something today and it will be here tomorrow.
          </p>
        </div>
      </StepShell>
    )
  }

  return (
    <StepShell
      step={step}
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      canContinue={allDone}
      onContinue={onAdvance}
      onPrev={onPrev}
      footnote={
        allDone
          ? `${deck.length} reviewed.`
          : `${deck.length - index} remaining.`
      }
    >
      {allDone ? (
        <div className="max-w-[64ch] border-l-2 border-sage pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
            ◆ DECK COMPLETE
          </p>
          <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
            All {deck.length} reviewed.
          </h3>
          <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
            The schedule adjusts itself from here.
          </p>
        </div>
      ) : current ? (
        <div className="max-w-[64ch]">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
              ◆ CARD {String(index + 1).padStart(2, '0')} / {String(deck.length).padStart(2, '0')}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              {current.category} · EASE {current.ease.toFixed(2)}
            </p>
          </div>

          <h3 className="mt-6 font-fraunces text-[32px] italic leading-tight text-ink">
            {current.text}
          </h3>

          {revealed ? (
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                CONTEXT
              </p>
              <p className="mt-2 font-fraunces text-[21px] italic leading-relaxed text-graphite">
                &ldquo;{current.context}&rdquo;
              </p>
              {current.note && (
                <p className="mt-4 border-l-2 border-sage pl-4 font-fraunces text-[18px] italic text-graphite">
                  {current.note}
                </p>
              )}

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {RATING_BUTTONS.map((r) => (
                  <button
                    key={r.quality}
                    type="button"
                    onClick={() => void handleRate(r.quality)}
                    disabled={reviewItem.isPending}
                    className="border border-line bg-ivory px-3 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite transition-colors hover:border-ink hover:text-ink disabled:cursor-wait disabled:opacity-60"
                  >
                    {r.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-8 border border-ink px-5 py-2.5 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory"
            >
              Reveal context
            </button>
          )}
        </div>
      ) : null}
    </StepShell>
  )
}
