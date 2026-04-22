import { useMemo } from 'react'
import type { SessionStep } from '@/features/practice/utils/session-planner'
import { useNoticingItems } from '@/features/practice/hooks/practice-queries'
import { StepShell } from './StepShell'

interface SaveItemsStepProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  suggestedItems: string[]
  onAdvance: () => void
  onPrev?: () => void
}

export function SaveItemsStep({
  step,
  stepNumber,
  totalSteps,
  suggestedItems,
  onAdvance,
  onPrev,
}: SaveItemsStepProps) {
  const items = useNoticingItems()
  const resolved = useMemo(() => {
    const byId = new Map(items.map((i) => [i.id, i] as const))
    return suggestedItems
      .map((id) => byId.get(id))
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
  }, [suggestedItems, items])

  return (
    <StepShell
      step={step}
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      onContinue={onAdvance}
      onPrev={onPrev}
    >
      <div className="max-w-[64ch]">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ PLAN FOR TOMORROW
        </p>
        <h3 className="mt-4 font-fraunces text-[26px] leading-tight text-ink">
          Three chunks. No more.
        </h3>
        <p className="mt-3 font-fraunces text-[20px] italic leading-relaxed text-graphite">
          Choose carefully. What you return to tomorrow is what the examiner will eventually
          notice.
        </p>

        {resolved.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {resolved.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="flex items-baseline gap-3 border-b border-line/60 py-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                  ◆
                </span>
                <span className="font-fraunces text-[21px] italic text-ink">{item.text}</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {item.category}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 border-l-2 border-line pl-4 font-fraunces text-[19px] italic text-graphite">
            Nothing captured in this session to carry forward. Visit the review room and mark three
            items worth revisiting.
          </p>
        )}
      </div>
    </StepShell>
  )
}
