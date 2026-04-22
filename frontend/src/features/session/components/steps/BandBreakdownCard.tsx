import type { GradingResult } from '@shared/schemas/submission'

interface Props {
  grading: GradingResult
}

const CRITERIA: Array<{ key: keyof Pick<GradingResult, 'taskResponse' | 'coherenceCohesion' | 'lexicalResource' | 'grammaticalRange'>; label: string }> = [
  { key: 'taskResponse', label: 'Task Response' },
  { key: 'coherenceCohesion', label: 'Coherence & Cohesion' },
  { key: 'lexicalResource', label: 'Lexical Resource' },
  { key: 'grammaticalRange', label: 'Grammatical Range & Accuracy' },
]

export function BandBreakdownCard({ grading }: Props) {
  return (
    <div className="mt-8 border border-line bg-ivory p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
        BAND BREAKDOWN
      </p>

      <div className="mt-6 space-y-4">
        {CRITERIA.map((c) => {
          const band = grading[c.key]
          return (
            <div
              key={c.key}
              className="flex items-start justify-between gap-6 border-b border-line/60 pb-4"
            >
              <div className="flex-1">
                <p className="font-fraunces text-[21px] text-ink">{c.label}</p>
                <p className="mt-1 max-w-[52ch] font-fraunces text-[15px] italic leading-relaxed text-graphite">
                  {band.notes}
                </p>
              </div>
              <p className="font-fraunces text-[32px] tabular-nums text-claret">
                {band.band.toFixed(1)}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink">
          OVERALL BAND
        </p>
        <p className="font-fraunces text-[48px] tabular-nums text-claret">
          {grading.overallBand.toFixed(1)}
        </p>
      </div>
    </div>
  )
}
