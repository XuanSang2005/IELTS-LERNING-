import { Link } from '@tanstack/react-router'
import { SrsDeck } from '@/features/lexicon/components/SrsDeck'
import { useTodayQueue } from '@/features/lexicon/hooks/useTodayQueue'
import { useLexiconLevel } from '@/stores/lexicon-level-store'
import { DAILY_STEPS } from '../data/step-config'
import { DailyShell } from './DailyShell'

const STEP = DAILY_STEPS[3]

interface Step4VocabProps {
  onAdvance: () => void
  onPrev: () => void
}

/**
 * Daily Loop Step 4 — canonical entry for SRS intake (plan Decision #11).
 * Replaces the old passage-driven flashcard deck with the spaced-repetition
 * queue from /lexicon/srs/me/today. Vocabulary discipline by default; the
 * user's persisted level choice picks which content tier surfaces.
 */
export function Step4Vocab({ onAdvance, onPrev }: Step4VocabProps) {
  const level = useLexiconLevel((s) => s.byDiscipline.vocabulary)
  const queue = useTodayQueue('vocabulary', level)

  const total = (queue.data?.newItems.length ?? 0) + (queue.data?.dueReviews.length ?? 0)
  const queueEmpty = total === 0
  // Allow continue once the deck has been exhausted, OR when the queue is
  // empty (paused or nothing due) so user is not stranded.
  const canContinue = queueEmpty || queue.data?.paused === true

  const footnote = queue.data?.paused
    ? `${queue.data.dueReviews.length} reviews waiting. Work through them; new words pause until you catch up.`
    : queueEmpty
      ? 'Inbox closed for today.'
      : `${total} cards in today's queue.`

  return (
    <DailyShell
      step={STEP}
      canContinue={canContinue}
      onContinue={onAdvance}
      onPrev={onPrev}
      footnote={footnote}
    >
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          ◆ TODAY'S TEN — FROM THE LEXICON
          <Link
            to="/app/lexicon"
            search={{}}
            className="ml-3 text-claret hover:text-ink"
          >
            ↗ open lexicon
          </Link>
        </p>

        <div className="mt-6">
          <SrsDeck discipline="vocabulary" level={level} />
        </div>
      </div>
    </DailyShell>
  )
}
