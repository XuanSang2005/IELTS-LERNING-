import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { SessionStep } from '@/features/practice/utils/session-planner'
import { ItemForm } from '@/features/review/components/ItemForm'
import { ReviewModal } from '@/features/review/components/ReviewModal'
import { useAddNoticingItemMutation } from '@/features/practice/hooks/practice-mutations'
import { StepShell } from './StepShell'

interface NoticeCaptureStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  targetCount: number
  onAdvance: () => void
  onPrev?: () => void
}

export function NoticeCaptureStep({
  step,
  stepNumber,
  totalSteps,
  targetCount,
  onAdvance,
  onPrev,
}: NoticeCaptureStepProps) {
  const addItem = useAddNoticingItemMutation()
  const [captured, setCaptured] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSubmit = async (values: {
    text: string
    category: 'grammar' | 'vocabulary' | 'collocations' | 'linking'
    context: string
    sourceRef?: string
    note?: string
  }) => {
    await addItem.mutateAsync(values)
    setCaptured((prev) => [...prev, values.text])
    setDialogOpen(false)
  }

  const remaining = Math.max(0, targetCount - captured.length)
  const canContinue = captured.length >= targetCount

  return (
    <>
      <StepShell
        step={step}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        canContinue={canContinue}
        onContinue={onAdvance}
        onPrev={onPrev}
        footnote={
          canContinue
            ? `${captured.length} captured. Well done.`
            : `${remaining} more to capture before you continue.`
        }
      >
        <div className="max-w-[64ch]">
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
              ◆ NOTICING &middot; {captured.length} / {targetCount}
            </p>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-5 py-2.5 font-geist text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
            >
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
              <span className="relative z-10">Capture an item</span>
              <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                +
              </span>
            </button>
          </div>

          {captured.length === 0 ? (
            <p className="mt-6 font-fraunces text-[21px] italic leading-relaxed text-graphite">
              Nothing captured yet. Open a lesson, an article, a podcast &mdash; the discipline is
              to notice what would otherwise slip past.
            </p>
          ) : (
            <ul className="mt-6 space-y-2">
              {captured.map((text, i) => (
                <li
                  key={`${text}-${i}`}
                  className="flex items-baseline gap-3 border-b border-line/60 py-2"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                    №&nbsp;{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-fraunces text-[21px] italic text-ink">{text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </StepShell>

      <AnimatePresence>
        {dialogOpen && (
          <ReviewModal
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            eyebrow="◆ NEW ITEM"
            title={
              <>
                Capture a <em className="italic">chunk</em>.
              </>
            }
          >
            <ItemForm
              submitLabel="Add to the room"
              busy={addItem.isPending}
              onSubmit={handleSubmit}
            />
          </ReviewModal>
        )}
      </AnimatePresence>
    </>
  )
}
