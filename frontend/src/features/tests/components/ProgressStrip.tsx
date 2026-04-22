import { useMemo } from 'react'
import type { QuestionType } from '@shared/schemas/test'
import { useTestHistoryQuery } from '@/features/tests/hooks/useTestHistoryQuery'
import { formatBand } from '@/features/tests/utils/band-conversion'

const TYPE_LABEL: Record<QuestionType, string> = {
  'multiple-choice': 'Multiple choice',
  'multi-select': 'Multi-select',
  matching: 'Matching',
  'plan-map-diagram': 'Map / diagram',
  'form-completion': 'Form completion',
  'note-table-completion': 'Table completion',
  'flow-chart-completion': 'Flow-chart',
  'sentence-completion': 'Sentence completion',
  'short-answer': 'Short answer',
  'true-false-not-given': 'True / False / NG',
  'yes-no-not-given': 'Yes / No / NG',
  'matching-information': 'Matching information',
  'matching-headings': 'Matching headings',
  'summary-completion': 'Summary completion',
}

export function ProgressStrip() {
  const { data: history = [] } = useTestHistoryQuery()

  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        testsTaken: 0,
        avgBand: null as number | null,
        strongestSkill: null as string | null,
        weakestType: null as string | null,
      }
    }

    const listeningResults = history.filter((r) => r.testId.startsWith('listening-'))
    const readingResults = history.filter((r) => r.testId.startsWith('reading-'))

    const avgBand =
      history.reduce((sum, r) => sum + r.estimatedBand, 0) / history.length
    const avgListening = listeningResults.length
      ? listeningResults.reduce((sum, r) => sum + r.estimatedBand, 0) /
        listeningResults.length
      : -Infinity
    const avgReading = readingResults.length
      ? readingResults.reduce((sum, r) => sum + r.estimatedBand, 0) / readingResults.length
      : -Infinity

    const strongestSkill =
      avgListening === -Infinity && avgReading === -Infinity
        ? null
        : avgListening >= avgReading
          ? 'Listening'
          : 'Reading'

    // aggregate by question type across all results
    const typeAgg = new Map<QuestionType, { correct: number; total: number }>()
    for (const r of history) {
      for (const [typeKey, counts] of Object.entries(r.byQuestionType)) {
        const t = typeKey as QuestionType
        const existing = typeAgg.get(t) ?? { correct: 0, total: 0 }
        typeAgg.set(t, {
          correct: existing.correct + counts.correct,
          total: existing.total + counts.total,
        })
      }
    }
    let weakestType: QuestionType | null = null
    let weakestRate = 1
    for (const [type, c] of typeAgg) {
      if (c.total < 2) continue
      const rate = c.correct / c.total
      if (rate < weakestRate) {
        weakestRate = rate
        weakestType = type
      }
    }

    return {
      testsTaken: history.length,
      avgBand,
      strongestSkill,
      weakestType: weakestType ? TYPE_LABEL[weakestType] : null,
    }
  }, [history])

  const blocks = [
    {
      label: 'TESTS TAKEN',
      value: stats.testsTaken === 0 ? '—' : String(stats.testsTaken),
    },
    {
      label: 'AVG. BAND',
      value: stats.avgBand === null ? '—' : formatBand(Math.round(stats.avgBand * 2) / 2),
    },
    {
      label: 'STRONGEST',
      value: stats.strongestSkill ?? '—',
    },
    {
      label: 'WEAKEST TYPE',
      value: stats.weakestType ?? '—',
    },
  ]

  return (
    <section className="border-y border-line">
      <div className="mx-auto max-w-[1720px] px-6 md:px-10 xl:px-14">
        <p className="pt-8 font-mono text-[14px] uppercase tracking-[0.25em] text-graphite">
          YOUR PROGRESS
        </p>
        <div className="grid grid-cols-2 divide-line pb-10 md:grid-cols-4 md:divide-x">
          {blocks.map((b, i) => (
            <div key={b.label} className={`py-7 ${i === 0 ? 'md:pl-0' : 'md:pl-8'}`}>
              <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-graphite">
                {b.label}
              </p>
              <p className="mt-3 font-fraunces text-[40px] leading-none text-ink">{b.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
