import { Link } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'

type Tab = 'lesson' | 'practice' | 'review' | 'week-quiz'

interface DayTimelineProps {
  discipline: LexiconDiscipline
  week: number
  day: number
  tab: Tab
  daysCompleted: ReadonlyArray<number>
}

const DAY_LABEL: Record<number, string> = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
}

/**
 * Horizontal timeline replacing the 7-square day strip. Each day is a node:
 * filled teal for completed, mustard for "in review" (heuristic: today's
 * day if past a completed one but not yet itself complete), empty for future.
 * Connecting hairline visualises the week's flow.
 */
export function DayTimeline({
  discipline,
  week,
  day,
  tab,
  daysCompleted,
}: DayTimelineProps) {
  const completedSet = new Set<number>(daysCompleted)
  return (
    <section className="border-b border-line bg-bone/30">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-10 md:py-8 xl:px-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
          DAY · {String(week).padStart(2, '0')}/12
        </p>
        <ol
          aria-label="Day timeline"
          className="relative mt-5 flex items-start justify-between gap-1 overflow-x-auto pb-2"
        >
          {/* Connecting hairline */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 right-3 top-3 h-px bg-line md:top-3.5"
          />
          {Array.from({ length: 7 }, (_, i) => {
            const d = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7
            const isToday = d === day
            const completed = completedSet.has(d)
            const future = !completed && !isToday && d > day
            const dotClass = isToday
              ? 'bg-claret border-claret ring-4 ring-claret/15'
              : completed
                ? 'bg-teal border-teal'
                : future
                  ? 'bg-ivory border-line'
                  : 'bg-mustard border-mustard'
            const labelClass = isToday
              ? 'text-claret'
              : completed
                ? 'text-teal'
                : future
                  ? 'text-graphite/60'
                  : 'text-mustard'
            return (
              <li key={d} className="relative z-10 flex flex-1 flex-col items-center min-w-[64px]">
                <Link
                  to="/app/lexicon/$week"
                  params={{ week: String(week) }}
                  search={{ discipline, day: d, tab }}
                  className="group flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-claret"
                  aria-label={`Day ${d}${completed ? ' completed' : ''}${isToday ? ', today' : ''}`}
                  aria-current={isToday ? 'page' : undefined}
                >
                  <span
                    className={`block h-3 w-3 border transition-transform group-hover:scale-110 ${dotClass} ${
                      isToday ? 'h-4 w-4' : ''
                    }`}
                  />
                  <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${labelClass}`}>
                    {DAY_LABEL[d]}
                  </span>
                  <span
                    className={`font-fraunces text-[16px] leading-none ${
                      isToday ? 'text-claret' : completed ? 'text-teal' : 'text-graphite'
                    } ${isToday ? 'md:text-[18px]' : ''}`}
                  >
                    {d}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
