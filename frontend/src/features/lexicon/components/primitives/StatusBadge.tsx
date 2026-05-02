export type WordStatus = 'new' | 'learning' | 'mastered'

interface StatusBadgeProps {
  status: WordStatus
}

const STATUS_LABEL: Record<WordStatus, string> = {
  new: 'NEW',
  learning: 'LEARNING',
  mastered: 'MASTERED',
}

const STATUS_CLASS: Record<WordStatus, string> = {
  new: 'border-claret/40 bg-claret/8 text-claret',
  learning: 'border-mustard/50 bg-mustard/10 text-mustard',
  mastered: 'border-teal/50 bg-teal/10 text-teal',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.22em] ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
