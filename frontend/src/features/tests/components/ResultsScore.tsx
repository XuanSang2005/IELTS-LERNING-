import { useEffect, useState } from 'react'
import type { TestResult } from '@shared/schemas/test'
import { formatBandRange } from '@/features/tests/utils/band-conversion'
import { formatClock } from '@/features/tests/utils/format-time'

interface ResultsScoreProps {
  result: TestResult
  testTitle: string
}

export function ResultsScore({ result, testTitle }: ResultsScoreProps) {
  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const duration = 1200
    const id = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setAnimated(Math.floor(eased * result.rawScore))
      if (t === 1) window.clearInterval(id)
    }, 40)
    return () => window.clearInterval(id)
  }, [result.rawScore])

  const submittedAt = new Date(result.submittedAt)
  const submittedLabel = submittedAt.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-[1720px] px-6 py-14 md:px-10 xl:px-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ TEST COMPLETE · {result.testId.toUpperCase()} · {testTitle.toUpperCase()}
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(44px,6vw,84px)] leading-[0.95] tracking-tight text-ink">
          {formatBandRange(result.bandRange)}
        </h1>
        <p className="mt-4 max-w-[60ch] font-fraunces text-[22px] italic leading-relaxed text-graphite">
          You answered <span className="text-ink">{animated}</span> of {result.totalQuestions} correctly.
          Submitted at {submittedLabel}. Time spent:{' '}
          {formatClock(result.timeSpentSeconds)}.
        </p>
      </div>
    </header>
  )
}
