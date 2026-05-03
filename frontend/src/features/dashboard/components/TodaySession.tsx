import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { BandLevel } from '@/schemas/practice'
import {
  DAILY_STEPS,
  ESTIMATED_MINUTES_BY_LEVEL,
  STEP_MINUTES_BY_LEVEL,
  type DailyStepKind,
} from '@/features/daily/data/step-config'
import { useYesterdayReview } from '@/features/lexicon/hooks/useYesterdayReview'
import { DisciplineShortcuts } from './DisciplineShortcuts'
import { SIGNATURE_BUTTON_CLASS, SignatureContent } from './primitives/SignatureButton'
import { TEXT_LINK_CLASS, TextLinkContent } from './primitives/TextLink'

const EDITORS_NOTES: Record<BandLevel, string> = {
  foundation: 'Begin slowly. Each step lays a stone for the chapter that follows.',
  intermediate: 'The structures are within reach. Today, attend to accuracy before fluency.',
  advanced: 'Yesterday’s drills showed hesitation. We’ll loop those before the writing task.',
  mastery: 'Examiner-level register. The habits of an eight, sustained over twelve sentences.',
}

interface TodaySessionProps {
  level: BandLevel
  stepsDone: number
  weekNumber: number
}

/**
 * Today's session — single bordered editorial frame. Vertical composition:
 * top bar → featured next-step chapter opener → horizontal step timeline →
 * discipline shortcuts → yesterday's items band → CTA cluster.
 */
export function TodaySession({ level, stepsDone, weekNumber }: TodaySessionProps) {
  const totalSteps = DAILY_STEPS.length
  const allDone = stepsDone >= totalSteps
  const editorsNote = EDITORS_NOTES[level]
  const totalMinutes = ESTIMATED_MINUTES_BY_LEVEL[level]
  const stepMinutes = STEP_MINUTES_BY_LEVEL[level]

  // Pull yesterday's introduced items from SRS. Hide the band entirely on
  // Day 1 (no history at all) — first-time users have nothing to review.
  const yesterdayQuery = useYesterdayReview()
  const yesterday = yesterdayQuery.data
  const showYesterdayBand = Boolean(
    yesterday && yesterday.hasAnyHistory && yesterday.items.length > 0,
  )

  // Determine the focal step (current next step, or the final step if complete)
  const focalIndex = allDone ? totalSteps - 1 : Math.min(stepsDone, totalSteps - 1)
  const focalStep = DAILY_STEPS[focalIndex]
  const focalMinutes = stepMinutes[focalStep.kind]

  return (
    <section>
      <div className="mx-auto w-full max-w-[1720px] px-6 py-6 md:px-10 md:py-8 xl:px-14">
        <article className="relative mx-auto max-w-[1100px] border-x border-b border-line bg-bone/30">
          {/* Top accent rule — claret signature */}
          <div className="h-[3px] w-full bg-claret" />

          {/* ── TOP BAR ── */}
          <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
              <span className="text-claret">◆ AGENDA</span>
              <span className="mx-2 text-line">·</span>
              <span className="text-graphite">CH. I</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
              {totalMinutes} MIN
              <span className="mx-2 text-line">·</span>
              {totalSteps} STEPS
            </p>
          </header>

          {/* ── FEATURED NEXT STEP ── */}
          <div className="flex flex-col items-center px-6 pb-8 pt-8 text-center md:px-10 md:pb-10 md:pt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
              <span className="text-claret">{focalStep.ornament}</span>
              <span className="mx-2 text-line">·</span>
              <span className={allDone ? 'text-sage' : 'text-claret'}>
                {allDone ? 'COMPLETE' : 'NEXT'}
              </span>
              <span className="mx-2 text-line">·</span>
              <span className="text-graphite">{focalMinutes} MIN</span>
            </p>

            <motion.h3
              key={focalStep.number}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-3 font-fraunces text-[clamp(40px,5vw,72px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink"
            >
              <span className="relative inline-block">
                {focalStep.title}
                <svg
                  className="pointer-events-none absolute -bottom-1 left-0 h-[10px] w-full"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2,6 Q50,2 100,5 T198,4"
                    stroke="#6B1F1A"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-claret">.</span>
            </motion.h3>

            <p className="mt-4 max-w-[52ch] font-fraunces text-[16px] italic leading-snug text-graphite md:text-[18px]">
              {focalStep.tagline}
            </p>

            {!allDone && (
              <div className="mt-5">
                <Link
                  to="/app/session"
                  search={{ step: (focalIndex + 1) as 1 | 2 | 3 | 4 | 5 }}
                  className={SIGNATURE_BUTTON_CLASS}
                >
                  <SignatureContent>
                    Begin step {focalStep.ornament.replace('§ ', '')}
                  </SignatureContent>
                </Link>
              </div>
            )}

            <p className="mt-4 max-w-[60ch] font-fraunces text-[13px] italic leading-snug text-graphite/70 md:text-[14px]">
              {editorsNote}
            </p>
          </div>

          {/* ── HORIZONTAL STEP TIMELINE ── */}
          <div className="border-t border-line bg-ivory/60 px-6 py-6 md:px-10">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
              ITINERARY
            </p>
            <ol className="relative mx-auto mt-4 grid max-w-[820px] grid-cols-5 gap-2">
              {/* Connecting hairline through dot midpoints */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[10%] right-[10%] top-[10px] h-px bg-line"
              />
              {DAILY_STEPS.map((s) => {
                const isDone = stepsDone >= s.number
                const isCurrent = s.number === focalIndex + 1 && !allDone
                const dotClass = isDone
                  ? 'bg-sage border-sage'
                  : isCurrent
                    ? 'bg-claret border-claret ring-4 ring-claret/15'
                    : 'bg-ivory border-line'
                const titleTone = isDone
                  ? 'text-sage'
                  : isCurrent
                    ? 'text-ink'
                    : 'text-graphite/70'
                return (
                  <li key={s.number} className="relative z-10 flex flex-col items-center gap-2">
                    <Link
                      to="/app/session"
                      search={{ step: s.number }}
                      className="group flex flex-col items-center gap-2 outline-none"
                      aria-label={`Step ${s.number} — ${s.title}`}
                    >
                      <span
                        className={`block h-5 w-5 border transition-transform group-hover:scale-110 ${dotClass}`}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                        {s.ornament}
                      </span>
                      <span
                        className={`font-fraunces text-[15px] leading-tight md:text-[16px] ${titleTone}`}
                      >
                        {s.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/60">
                        {stepMinutes[s.kind as DailyStepKind]}'
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* ── DISCIPLINE SHORTCUTS ── */}
          <div className="border-t border-line">
            <p className="border-b border-line px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-graphite md:px-10">
              <span className="text-claret">◆</span> OR CONTINUE A DISCIPLINE
            </p>
            <div className="px-2 md:px-4">
              <DisciplineShortcuts weekNumber={weekNumber} />
            </div>
          </div>

          {/* ── FROM YESTERDAY (compact band) ──
             Hidden on Day 1 (no SRS history yet) and on rest days
             (had history but introduced nothing yesterday). */}
          {showYesterdayBand && (
            <div className="border-t border-line px-6 py-5 md:px-10">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
                <span className="text-claret">◆ FROM YESTERDAY</span>
                {yesterday!.items.map((item, i) => (
                  <span key={item.itemId} className="flex items-baseline gap-2">
                    {i > 0 && <span className="text-line">·</span>}
                    <span className="font-fraunces text-[14px] normal-case tracking-normal text-ink">
                      &ldquo;{item.text}&rdquo;
                    </span>
                    <span className="text-graphite/70">{item.meta}</span>
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* ── BOTTOM CTA CLUSTER ── */}
          <div className="flex flex-wrap items-center justify-center gap-7 border-t border-line px-6 py-6 md:px-10 md:py-7">
            {allDone ? (
              <p className="font-fraunces text-[20px] italic text-sage">
                <span className="mr-2 not-italic text-claret">◆</span>Complete. Return tomorrow at nine.
              </p>
            ) : (
              <Link
                to="/app/session"
                search={{ step: Math.min(stepsDone + 1, totalSteps) as 1 | 2 | 3 | 4 | 5 }}
                className={SIGNATURE_BUTTON_CLASS}
              >
                <SignatureContent>
                  {stepsDone === 0 ? "Begin today's session" : `Resume at step ${stepsDone + 1}`}
                </SignatureContent>
              </Link>
            )}
            <Link to="/method" className={TEXT_LINK_CLASS}>
              <TextLinkContent>Read the method</TextLinkContent>
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
