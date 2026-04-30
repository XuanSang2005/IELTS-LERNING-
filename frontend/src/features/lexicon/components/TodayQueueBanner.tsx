import type { TodayQueue } from '@shared/schemas/srs'

interface TodayQueueBannerProps {
  queue: TodayQueue
}

/**
 * Status strip rendered atop SrsDeck. Communicates pause state, today's
 * intake counts, and any spillover that won't fit in the daily review cap.
 */
export function TodayQueueBanner({ queue }: TodayQueueBannerProps) {
  const newCount = queue.newItems.length
  const dueCount = queue.dueReviews.length

  if (queue.paused) {
    return (
      <div className="border border-claret bg-claret/5 px-5 py-4 md:px-6 md:py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          ◆ NEW WORDS · PAUSED
        </p>
        <p className="mt-2 font-fraunces text-[18px] italic leading-relaxed text-ink md:text-[20px]">
          The library has paused new intake while you catch up. {dueCount} review
          {dueCount === 1 ? '' : 's'} due today
          {queue.spilloverCount > 0 ? `, ${queue.spilloverCount} more queued for tomorrow` : ''}.
        </p>
      </div>
    )
  }

  if (newCount === 0 && dueCount === 0) {
    return (
      <div className="border border-line bg-bone/40 px-5 py-4 md:px-6 md:py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sage">
          ◆ INBOX CLOSED
        </p>
        <p className="mt-2 font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]">
          Nothing waiting today. Return tomorrow — the schedule will surface what is due.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-line bg-ivory px-5 py-4 md:px-6 md:py-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        ◆ TODAY · {newCount} NEW · {dueCount} DUE
        {queue.spilloverCount > 0 && (
          <span className="ml-2 text-graphite">· {queue.spilloverCount} spillover</span>
        )}
      </p>
      <p className="mt-2 font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]">
        {newCount > 0
          ? `Today's ten begin with ${newCount} fresh ${
              newCount === 1 ? 'word' : 'words'
            }, then ${dueCount} review${dueCount === 1 ? '' : 's'} from the schedule.`
          : `${dueCount} review${dueCount === 1 ? '' : 's'} from the schedule today.`}
      </p>
    </div>
  )
}
