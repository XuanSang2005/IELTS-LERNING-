import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson } from '@shared/schemas/lesson'
import type { BandLevel } from '@shared/schemas/practice'
import { useGrammarProgress } from '@/stores/grammar-progress-store'

interface ReviewSessionProps {
  week: number
  level: BandLevel
  lesson: Lesson
  onBackToRoadmap: () => void
}

type Rating = 'got-it' | 'not-yet'

/** Full-width hairline + centred mono label. Matches LessonReader /
 *  PracticeSession. Pass `noDivider` to drop the top rule when the preceding
 *  element already provides one (sticky tab bar). */
function SectionHeader({
  numeral,
  title,
  meta,
  noDivider = false,
}: {
  numeral?: string
  title: string
  meta?: string
  noDivider?: boolean
}) {
  return (
    <div className={`text-center ${noDivider ? '' : 'border-t border-line pt-10'}`}>
      <p className="font-mono text-[15px] uppercase tracking-[0.32em] md:text-[17px]">
        {numeral && (
          <>
            <span className="font-semibold text-claret">§ {numeral}</span>
            <span className="mx-4 text-line">·</span>
          </>
        )}
        <span className="font-semibold text-ink">{title}</span>
      </p>
      {meta && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-graphite">
          {meta}
        </p>
      )}
    </div>
  )
}

export function ReviewSession({ week, level, lesson, onBackToRoadmap }: ReviewSessionProps) {
  const markReviewPassed = useGrammarProgress((s) => s.markReviewPassed)
  const cards = lesson.noticing

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [ratings, setRatings] = useState<Record<number, Rating>>({})

  const current = cards[index]
  const lastIndex = cards.length - 1
  const done = index >= cards.length

  const summary = useMemo(() => {
    const gotItCount = Object.values(ratings).filter((r) => r === 'got-it').length
    const notYetCount = Object.values(ratings).filter((r) => r === 'not-yet').length
    const notYet = Object.entries(ratings)
      .filter(([, r]) => r === 'not-yet')
      .map(([k]) => Number(k))
    return { gotItCount, notYetCount, notYet, total: cards.length }
  }, [ratings, cards.length])

  const rate = (rating: Rating) => {
    const nextRatings = { ...ratings, [index]: rating }
    setRatings(nextRatings)
    if (index === lastIndex) {
      const allGotIt =
        Object.values(nextRatings).filter((r) => r === 'got-it').length === cards.length
      if (allGotIt) markReviewPassed(level, week)
    }
    setIndex(index + 1)
    setFlipped(false)
  }

  const restart = () => {
    setRatings({})
    setIndex(0)
    setFlipped(false)
  }

  const progressPct = (index / cards.length) * 100

  /* ── DONE STATE ───────────────────────────────────────────────────────── */
  if (done) {
    const passed = summary.gotItCount === summary.total
    return (
      <div className="mx-auto w-full max-w-[1720px]">
        <section className="pb-12">
          <SectionHeader
            numeral="VI"
            title="Review complete"
            meta={`WEEK ${String(week).padStart(2, '0')} · ${String(lesson.week).padStart(2, '0')} OF 12`}
            noDivider
          />
          <div
            className={`mx-auto mt-10 flex max-w-[960px] flex-col items-center gap-8 border-2 px-8 py-12 text-center md:px-12 md:py-14 ${
              passed ? 'border-sage bg-sage/10' : 'border-line bg-bone'
            }`}
          >
            <div>
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.3em] ${passed ? 'text-sage' : 'text-claret'}`}
              >
                {passed ? '◆ Committed to memory' : '◆ A second pass is in order'}
              </p>
              <p className="mt-5 font-fraunces text-[64px] leading-none text-ink md:text-[88px]">
                {summary.gotItCount}
                <span className="font-fraunces text-[34px] italic text-graphite md:text-[44px]">
                  {' '}/ {summary.total}
                </span>
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
                {summary.gotItCount} GOT IT
                <span className="mx-2 text-line">·</span>
                {summary.notYetCount} NOT YET
              </p>
            </div>
            <p className="max-w-[52ch] font-fraunces text-[20px] italic leading-relaxed text-graphite md:text-[22px]">
              {passed ? (
                <>
                  Every noticing marked <em>got it</em> on the first pass. The week is closed in
                  the ledger.
                </>
              ) : (
                <>
                  {summary.gotItCount} of {summary.total} held on first pass. The{' '}
                  {summary.notYet.length} not-yet items will return tomorrow.
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={onBackToRoadmap}
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-7 py-3.5 font-geist text-[13px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
              >
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                <span className="relative z-10">Return to the roadmap</span>
                <span className="relative z-10 text-[14px] text-claret transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={restart}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite transition-colors hover:text-claret"
              >
                Review again
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  /* ── ACTIVE CARD ──────────────────────────────────────────────────────── */
  return (
    <div className="mx-auto w-full max-w-[1720px]">
      <section className="pb-12">
        <SectionHeader
          numeral="VI"
          title="Review"
          meta={`CARD ${String(index + 1).padStart(2, '0')} OF ${String(cards.length).padStart(2, '0')} · TAP TO REVEAL · RATE TO ADVANCE`}
          noDivider
        />

        {/* Prominent score / progress panel */}
        <div className="mx-auto mt-10 flex max-w-[1100px] flex-col items-center gap-6 border border-line bg-bone px-8 py-8 md:flex-row md:items-end md:justify-between md:px-12 md:py-10">
          <div className="flex items-baseline gap-4">
            <span className="font-fraunces text-[64px] leading-none text-claret md:text-[80px]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-fraunces text-[32px] italic leading-none text-graphite md:text-[40px]">
              / {String(cards.length).padStart(2, '0')}
            </span>
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
              CARD
            </span>
          </div>
          <div className="w-full max-w-[420px] md:ml-auto">
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
              <span>
                <span className="text-sage">{summary.gotItCount} GOT</span>
                <span className="mx-2 text-line">·</span>
                <span className="text-claret">{summary.notYetCount} NOT YET</span>
              </span>
              <span className="text-ink">{Math.round(progressPct)}%</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-claret"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="mx-auto mt-12 flex max-w-[1100px] flex-col items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={`${index}-${flipped}`}
              type="button"
              onClick={() => setFlipped((f) => !f)}
              initial={{ opacity: 0, rotateX: flipped ? -8 : 8, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: flipped ? 8 : -8, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full cursor-pointer overflow-hidden border-2 border-line bg-ivory px-8 py-12 text-left shadow-[0_30px_60px_-30px_rgba(107,31,26,0.25)] transition-shadow duration-200 hover:shadow-[0_35px_70px_-25px_rgba(107,31,26,0.35)] md:px-14 md:py-16"
            >
              {/* Accent top bar */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-claret"
              />
              {/* Side label */}
              <span className="absolute -top-3 left-8 bg-ivory px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-claret">
                {flipped ? '◆ CONTEXT' : '◆ NOTICING'}
              </span>
              <span className="absolute -top-3 right-8 bg-ivory px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                № {String(index + 1).padStart(2, '0')}
              </span>

              {!flipped ? (
                <div className="mx-auto max-w-[800px] text-center">
                  <p className="font-fraunces text-[30px] italic leading-[1.25] text-ink md:text-[40px]">
                    {current.text}
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                    <span aria-hidden="true" className="h-px w-8 bg-line" />
                    <span>Tap the card to reveal context</span>
                    <span aria-hidden="true" className="h-px w-8 bg-line" />
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-[800px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                    The noticing
                  </p>
                  <p className="mt-2 font-fraunces text-[22px] italic leading-snug text-ink md:text-[26px]">
                    {current.text}
                  </p>

                  <div className="mt-8 border-t border-line pt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                      Seen in context
                    </p>
                    <p className="mt-2 font-fraunces text-[20px] italic leading-relaxed text-graphite md:text-[22px]">
                      &ldquo;{current.context}&rdquo;
                    </p>
                  </div>

                  {current.note && (
                    <div className="mt-6 border-l-2 border-claret pl-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
                        ◆ Note
                      </p>
                      <p className="mt-2 font-geist text-[15px] leading-relaxed text-ink md:text-[16px]">
                        {current.note}
                      </p>
                    </div>
                  )}

                  <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                    <span aria-hidden="true" className="h-px w-8 bg-line" />
                    <span>Rate how well you held it</span>
                    <span aria-hidden="true" className="h-px w-8 bg-line" />
                  </div>
                </div>
              )}
            </motion.button>
          </AnimatePresence>

          {/* Rating */}
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => rate('not-yet')}
              disabled={!flipped}
              className="group inline-flex items-center gap-3 border-2 border-claret bg-ivory px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.25em] text-claret transition-all duration-200 hover:-translate-y-0.5 hover:bg-claret hover:text-ivory hover:shadow-[0_12px_25px_-12px_rgba(107,31,26,0.5)] disabled:cursor-not-allowed disabled:border-line disabled:text-line disabled:hover:translate-y-0 disabled:hover:bg-ivory disabled:hover:text-line disabled:hover:shadow-none"
            >
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-current font-mono text-[12px]"
              >
                ✗
              </span>
              Not yet
            </button>
            <button
              type="button"
              onClick={() => rate('got-it')}
              disabled={!flipped}
              className="group inline-flex items-center gap-3 border-2 border-sage bg-sage px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.25em] text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-sage/90 hover:shadow-[0_12px_25px_-12px_rgba(90,107,84,0.55)] disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-ivory disabled:hover:translate-y-0 disabled:hover:bg-line disabled:hover:shadow-none"
            >
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-current font-mono text-[12px]"
              >
                ✓
              </span>
              Got it
            </button>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            {flipped ? '⏎ Rate to advance' : 'Reveal first'}
          </p>
        </div>
      </section>
    </div>
  )
}
