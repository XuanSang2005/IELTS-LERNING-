import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import type { StepNumber } from '@shared/schemas/practice'
import { Route as DailyRoute } from '@/routes/app.session.index'
import { useProfile, useTodayLog } from '@/features/practice/hooks/practice-queries'
import {
  useCompleteStepMutation,
  useReassessBandMutation,
} from '@/features/practice/hooks/practice-mutations'
import { useDailyReview, useDailyToday, dailyDayFromIsoDate } from '../hooks/use-daily-unit'
import { DailyProgressHeader } from './DailyProgressHeader'
import { Step1Review } from './Step1Review'
import { Step2Reading } from './Step2Reading'
import { Step3Listening } from './Step3Listening'
import { Step4Vocab } from './Step4Vocab'
import { Step5Writing } from './Step5Writing'
import { DailyComplete } from './DailyComplete'

type StepNum = 1 | 2 | 3 | 4 | 5

export function DailyPage() {
  const { step: searchStep } = DailyRoute.useSearch()
  const navigate = useNavigate()

  const profile = useProfile()
  const todayLog = useTodayLog()
  const level = profile?.currentBand.level
  const today = useDailyToday(level, Boolean(level))
  const review = useDailyReview(level, Boolean(level))
  const completeStep = useCompleteStepMutation()
  const reassessBand = useReassessBandMutation()

  const day = useMemo(() => dailyDayFromIsoDate(new Date().toISOString().slice(0, 10)), [])

  const [activeNumber, setActiveNumber] = useState<StepNum>(searchStep)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    setActiveNumber(searchStep)
  }, [searchStep])

  if (!profile || !level) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        <p className="font-fraunces text-[24px] italic text-graphite">Opening today’s session…</p>
      </div>
    )
  }

  const goToStep = (n: StepNum) => {
    setActiveNumber(n)
    void navigate({
      to: '/app/session',
      search: { step: n },
      replace: true,
    })
  }

  const handleAdvance = async () => {
    const stepNum = activeNumber as StepNumber
    if (stepNum >= 1 && stepNum <= 5 && !todayLog.stepsCompleted.includes(stepNum)) {
      try {
        await completeStep.mutateAsync(stepNum)
      } catch {
        /* non-fatal */
      }
    }
    if (activeNumber < 5) {
      goToStep((activeNumber + 1) as StepNum)
      return
    }
    try {
      await reassessBand.mutateAsync()
    } catch {
      /* best-effort */
    }
    setShowComplete(true)
  }

  const handlePrev = activeNumber > 1 ? () => goToStep((activeNumber - 1) as StepNum) : undefined

  if (showComplete) {
    return (
      <DailyComplete
        level={level}
        day={day}
        onRestart={() => {
          setShowComplete(false)
            goToStep(1)
        }}
      />
    )
  }

  return (
    <div className="relative w-full">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-10 md:px-10 md:py-12 xl:px-14">
        <main className="relative min-w-0">
          <DailyProgressHeader
            day={day}
            level={level}
            activeNumber={activeNumber}
            completed={todayLog.stepsCompleted.length}
            onSelect={goToStep}
          />

          <div className="mt-12">
            <AnimatePresence mode="wait">
              {activeNumber === 1 && (
                <Step1Review
                  key="step-1"
                  review={review.data}
                  isLoading={review.isLoading}
                  onAdvance={() => void handleAdvance()}
                />
              )}
              {activeNumber === 2 && (
                <Step2Reading
                  key="step-2"
                  reading={today.data?.reading}
                  onAdvance={() => void handleAdvance()}
                  onPrev={handlePrev ?? (() => goToStep(1))}
                />
              )}
              {activeNumber === 3 && (
                <Step3Listening
                  key="step-3"
                  listening={today.data?.listening}
                  onAdvance={() => void handleAdvance()}
                  onPrev={handlePrev ?? (() => goToStep(2))}
                />
              )}
              {activeNumber === 4 && (
                <Step4Vocab
                  key="step-4"
                  onAdvance={() => void handleAdvance()}
                  onPrev={handlePrev ?? (() => goToStep(3))}
                />
              )}
              {activeNumber === 5 && (
                <Step5Writing
                  key="step-5"
                  writing={today.data?.writing}
                  level={level}
                  onAdvance={() => void handleAdvance()}
                  onPrev={handlePrev ?? (() => goToStep(4))}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
