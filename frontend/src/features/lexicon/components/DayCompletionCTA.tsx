import { Link } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'

interface DayCompletionCTAProps {
  discipline: LexiconDiscipline
  week: number
  day: number
  itemCount: number
  /** Theme name for the next day, if known (e.g. "Household & routines"). */
  nextDayTheme?: string
}

/**
 * Closing chapter-bookend after the final entry. Matches WordEntryFeatured's
 * centred composition: claret top rule, mono eyebrow, headline, tagline, CTA
 * row, optional next-day preview. One filled CTA, one outlined secondary.
 */
export function DayCompletionCTA({
  discipline,
  week,
  day,
  itemCount,
  nextDayTheme,
}: DayCompletionCTAProps) {
  const nextDay = day < 7 ? ((day + 1) as 2 | 3 | 4 | 5 | 6 | 7) : null

  return (
    <section className="relative mt-12 bg-ivory md:mt-16">
      {/* Top accent rule — claret signature */}
      <div className="h-[3px] w-full bg-claret" />

      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-6 py-12 text-center md:px-10 md:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">
          ◆ END OF DAY {day}
        </p>

        <h2 className="mt-5 font-fraunces text-[clamp(28px,3.5vw,48px)] font-normal leading-[1.05] tracking-[-0.01em] text-ink">
          You've read all {itemCount} entries for today
          <span className="text-claret">.</span>
        </h2>

        <p className="mt-5 max-w-[60ch] font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[18px]">
          The lesson is the easy part. Active recall in Practice and the spaced schedule in Review
          are where the words actually settle.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/app/lexicon/$week"
            params={{ week: String(week) }}
            search={{ discipline, day, tab: 'practice' }}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-sans text-[12px] uppercase tracking-[0.22em] font-medium text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-[2px] bg-claret" />
            <span className="relative z-10">Start practice</span>
            <span className="relative z-10 text-claret text-[13px] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            to="/app/lexicon/$week"
            params={{ week: String(week) }}
            search={{ discipline, day, tab: 'review' }}
            className="group inline-flex items-center gap-2 font-sans text-[14px] text-ink"
          >
            <span className="relative">
              Or review now
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-[13px] transition-all duration-200 group-hover:text-claret group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>

        {nextDay && (
          <div className="mt-10 flex flex-col items-center border-t border-line pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
              Tomorrow · Day {nextDay}
            </p>
            <Link
              to="/app/lexicon/$week"
              params={{ week: String(week) }}
              search={{ discipline, day: nextDay, tab: 'lesson' }}
              className="group mt-2 inline-flex items-baseline gap-3 font-fraunces text-[20px] text-ink hover:text-claret md:text-[22px]"
            >
              <span>{nextDayTheme ?? `Day ${nextDay} · open the next entry`}</span>
              <span aria-hidden="true" className="text-claret transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom hairline */}
      <div className="h-px w-full bg-line" />
    </section>
  )
}
