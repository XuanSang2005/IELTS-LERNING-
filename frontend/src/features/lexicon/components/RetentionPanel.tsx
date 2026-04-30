import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { useRetentionMetrics } from '../hooks/useRetentionMetrics'

interface RetentionPanelProps {
  discipline: LexiconDiscipline
}

const BOX_INTERVAL_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: '1 day',
  2: '3 days',
  3: '7 days',
  4: '14 days',
  5: '30 days',
}

/**
 * Retention metrics panel for the user's own SRS state. Surfaces per-box
 * accuracy + card counts so the schedule's effectiveness is visible.
 * Shipped as a minimal admin/self-view block; future wave can build a richer
 * dashboard from the same endpoint.
 */
export function RetentionPanel({ discipline }: RetentionPanelProps) {
  const query = useRetentionMetrics(discipline)

  if (query.isPending) {
    return (
      <p className="py-8 text-center font-fraunces text-[18px] italic text-graphite">
        Reading the schedule…
      </p>
    )
  }
  if (query.isError || !query.data) return null

  const m = query.data
  const totalCards = m.totalIntroduced
  if (totalCards === 0) {
    return (
      <div className="border border-line bg-bone/40 p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          ◆ RETENTION · {discipline.toUpperCase()}
        </p>
        <p className="mt-3 font-fraunces text-[18px] italic text-graphite">
          Nothing introduced yet. Open the Daily Loop to begin the schedule.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-line bg-ivory p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ RETENTION · {discipline.toUpperCase()}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          {totalCards} TOTAL · {m.totalMature} MATURE · {m.totalLearning} LEARNING
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {m.perBox.map((row) => {
          const accuracyPct = Math.round(row.accuracy * 100)
          const proportion = totalCards > 0 ? row.cardCount / totalCards : 0
          return (
            <li key={row.box} className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
                BOX {row.box}
                <span className="block text-[9px] text-graphite/70">
                  {BOX_INTERVAL_LABELS[row.box]}
                </span>
              </span>
              <div className="flex items-center gap-3">
                <div className="relative h-1.5 flex-1 bg-line">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 bg-claret"
                    style={{ width: `${proportion * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {row.cardCount} CARDS
                </span>
              </div>
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
                  row.reviewCount === 0
                    ? 'text-graphite/50'
                    : accuracyPct >= 80
                      ? 'text-sage'
                      : 'text-claret'
                }`}
              >
                {row.reviewCount > 0 ? `${accuracyPct}%` : '—'}
              </span>
            </li>
          )
        })}
      </ul>

      <p className="mt-6 max-w-[60ch] font-fraunces text-[15px] italic leading-relaxed text-graphite">
        Per-box accuracy is the share of correct ratings (Good or Easy) among reviews of cards
        currently in that box. Box 5 ought to settle above ninety per cent — anything lower hints
        the interval is too long for that material.
      </p>
    </div>
  )
}
