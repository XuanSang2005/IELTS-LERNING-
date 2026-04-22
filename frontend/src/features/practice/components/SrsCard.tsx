import type { NoticingItem } from '@/schemas/practice'
import { daysUntil, formatHuman } from '../utils/dates'

interface SrsCardProps {
  item: NoticingItem
}

const CATEGORY: Record<NoticingItem['category'], string> = {
  grammar: 'GRAMMAR',
  vocabulary: 'VOCABULARY',
  collocations: 'COLLOCATIONS',
  linking: 'LINKING',
}

export function SrsCard({ item }: SrsCardProps) {
  const days = daysUntil(item.nextReviewDate)
  const nextLabel =
    item.retired
      ? 'RETIRED'
      : days <= 0
        ? 'DUE TODAY'
        : days === 1
          ? 'NEXT REVIEW · TOMORROW'
          : `NEXT REVIEW · IN ${days} DAYS`
  const dueStyle = item.retired
    ? 'text-sage'
    : days <= 0
      ? 'text-claret'
      : 'text-graphite'

  return (
    <article
      className={`border border-line bg-bone p-6 ${item.retired ? 'opacity-70' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          {item.retired && <span className="mr-1 text-sage">◆</span>}
          {CATEGORY[item.category]}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
          CAPTURED · {formatHuman(item.capturedDate)}
        </span>
      </div>

      <h3 className="mt-4 font-fraunces text-[24px] italic leading-tight text-ink">
        {item.text}
      </h3>
      <p className="mt-3 font-fraunces text-[18px] italic leading-relaxed text-graphite">
        "{item.context}"
      </p>

      <div className="my-5 border-t border-line" />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className={dueStyle}>{nextLabel}</span>
        <span aria-hidden="true" className="text-line">·</span>
        <span className="text-graphite">EASE · {item.ease.toFixed(2)}</span>
        <span aria-hidden="true" className="text-line">·</span>
        <span className="text-graphite">REVIEWED · {item.reviewCount}X</span>
      </div>
    </article>
  )
}
