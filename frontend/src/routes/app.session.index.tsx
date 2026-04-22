import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import type { StepNumber } from '@shared/schemas/practice'
import { SessionSidebar } from '@/features/session/components/SessionSidebar'
import { StepRouter } from '@/features/session/components/steps/StepRouter'
import { useSessionBlueprint } from '@/features/session/hooks/use-session-blueprint'
import {
  useCompleteStepMutation,
  useReassessBandMutation,
} from '@/features/practice/hooks/practice-mutations'
import { useTodayLog, useProfile } from '@/features/practice/hooks/practice-queries'

const searchSchema = z.object({
  step: z.number().int().min(1).max(6).catch(1),
  submissionId: z.string().optional(),
})

export const Route = createFileRoute('/app/session/')({
  component: SessionPage,
  validateSearch: searchSchema,
})

function SessionPage() {
  const { step: searchStep, submissionId } = Route.useSearch()
  const navigate = useNavigate()
  const blueprint = useSessionBlueprint()
  const profile = useProfile()
  const todayLog = useTodayLog()
  const completeStep = useCompleteStepMutation()
  const reassessBand = useReassessBandMutation()

  const totalSteps = blueprint?.steps.length ?? 0
  const clampedStep = useMemo(() => {
    if (totalSteps === 0) return 1
    return Math.max(1, Math.min(searchStep, totalSteps))
  }, [searchStep, totalSteps])

  const [activeIndex, setActiveIndex] = useState(clampedStep - 1)
  useEffect(() => {
    setActiveIndex(clampedStep - 1)
  }, [clampedStep])

  if (!blueprint || !profile) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <p className="font-fraunces text-[24px] italic text-graphite">
          Opening today&rsquo;s session&hellip;
        </p>
      </div>
    )
  }

  const completedCount = todayLog.stepsCompleted.length
  const activeStep = blueprint.steps[activeIndex]
  const stepNumber = activeIndex + 1

  const goToStep = (index: number, extras?: { submissionId?: string }) => {
    const safe = Math.max(0, Math.min(index, blueprint.steps.length - 1))
    const next = (safe + 1) as 1 | 2 | 3 | 4 | 5 | 6
    void navigate({
      to: '/app/session',
      search: { step: next, submissionId: extras?.submissionId ?? submissionId },
      replace: true,
    })
  }

  const handleAdvance = async () => {
    const stepNum = stepNumber as StepNumber
    if (stepNum >= 1 && stepNum <= 6 && !todayLog.stepsCompleted.includes(stepNum)) {
      try {
        await completeStep.mutateAsync(stepNum)
      } catch {
        /* non-fatal */
      }
    }
    if (stepNumber < blueprint.steps.length) {
      goToStep(activeIndex + 1)
      return
    }
    try {
      await reassessBand.mutateAsync()
    } catch {
      /* best-effort */
    }
    void navigate({ to: '/app/session/complete' })
  }

  const handlePrev = activeIndex > 0 ? () => goToStep(activeIndex - 1) : undefined

  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[280px_1fr] lg:gap-16 xl:px-14">
      <SessionSidebar
        steps={blueprint.steps}
        currentIndex={activeIndex}
        completedCount={completedCount}
        onSelect={(i) => goToStep(i)}
      />
      <main>
        <AnimatePresence mode="wait">
          <StepRouter
            key={activeStep.id}
            step={activeStep}
            stepNumber={stepNumber}
            totalSteps={blueprint.steps.length}
            submissionId={submissionId}
            onAdvance={() => void handleAdvance()}
            onAdvanceWithSubmission={(id) => {
              if (stepNumber < blueprint.steps.length) {
                goToStep(activeIndex + 1, { submissionId: id })
              }
            }}
            onPrev={handlePrev}
          />
        </AnimatePresence>
      </main>
    </div>
  )
}
