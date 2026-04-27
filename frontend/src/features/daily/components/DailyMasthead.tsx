import { motion } from 'framer-motion'
import type { BandLevel } from '@shared/schemas/practice'
import { Polaroid } from '@/components/ui/Polaroid'
import { ESTIMATED_MINUTES_BY_LEVEL } from '../data/step-config'

const LEVEL_LABEL: Record<BandLevel, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  mastery: 'Mastery',
}

const ROMAN: Record<1 | 2 | 3 | 4 | 5, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }

/**
 * Per-day polaroid rotation. Cycles through the four edition images we
 * have on disk, alternating tint so the masthead never feels static
 * across the 5-day arc. Day 5 wraps back to edition-01 with a fresh tint.
 */
const POLAROID_BY_DAY: Record<
  1 | 2 | 3 | 4 | 5,
  {
    src: string
    alt: string
    tint: 'claret' | 'sage'
    edition: string
    rotate: number
  }
> = {
  1: {
    src: '/images/editions/edition-01.jpg',
    alt: 'A library reading room in late afternoon light, ranks of dark timber shelves either side.',
    tint: 'claret',
    edition: 'DAY I · LIBRARY',
    rotate: -4,
  },
  2: {
    src: '/images/editions/edition-02.jpg',
    alt: 'Open volumes annotated in pencil, a ribbon marker resting at the spine.',
    tint: 'sage',
    edition: 'DAY II · ANNOTATION',
    rotate: 3,
  },
  3: {
    src: '/images/editions/edition-03.jpg',
    alt: 'A fountain pen lying across handwritten notes on cream paper.',
    tint: 'claret',
    edition: 'DAY III · MANUSCRIPT',
    rotate: -3,
  },
  4: {
    src: '/images/editions/edition-04.jpg',
    alt: 'A college cloister at dawn, mist between the columns.',
    tint: 'sage',
    edition: 'DAY IV · CLOISTER',
    rotate: 5,
  },
  5: {
    src: '/images/editions/edition-01.jpg',
    alt: 'The same reading room, returned to at week’s end.',
    tint: 'claret',
    edition: 'DAY V · RETURN',
    rotate: 4,
  },
}

const WEEKDAY_LABEL = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const
const MONTH_LABEL = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const

function formatEditorialDate(d: Date): string {
  const wd = WEEKDAY_LABEL[d.getDay()]
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = MONTH_LABEL[d.getMonth()]
  const yy = d.getFullYear()
  return `${wd} ${dd} ${mm} ${yy}`
}

interface DailyMastheadProps {
  day: 1 | 2 | 3 | 4 | 5
  level: BandLevel
  /** Steps the user has completed today (0-5). */
  completedCount: number
}

export function DailyMasthead({ day, level, completedCount }: DailyMastheadProps) {
  const minutes = ESTIMATED_MINUTES_BY_LEVEL[level]
  const polaroid = POLAROID_BY_DAY[day]
  const dateLabel = formatEditorialDate(new Date())

  return (
    <header className="relative overflow-hidden border-b border-line">
      {/* Oversized day numeral as decorative background — sits behind text, fades into ivory */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-[60px] right-[58%] select-none font-fraunces text-[clamp(280px,30vw,440px)] italic leading-none text-line/40 md:right-[55%] lg:right-[52%]"
      >
        {ROMAN[day]}
      </p>

      <div className="relative mx-auto w-full max-w-[1720px] px-6 pb-12 pt-12 md:px-10 md:pt-14 xl:px-14">
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12 md:gap-14">
          {/* ── LEFT — text block ──────────────────────────────────────── */}
          <div className="md:col-span-7">
            {/* Masthead line — newspaper plate */}
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] md:text-[12px]">
              <span className="mr-2 text-claret">◆</span>
              <span className="text-claret">ISSUE Nº {ROMAN[day]}</span>
              <span className="mx-2 text-graphite">·</span>
              <span className="text-graphite">{dateLabel}</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              {LEVEL_LABEL[level].toUpperCase()} · {minutes} MIN · DAY {ROMAN[day]} OF V
            </p>

            {/* Headline with hand-drawn underline accent under "five" */}
            <h1 className="mt-7 font-fraunces text-[clamp(46px,6vw,84px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
              Today, in{' '}
              <span className="relative inline-block">
                <em className="font-normal italic">five</em>
                <svg
                  className="absolute -bottom-1.5 left-0 h-[10px] w-full"
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
              </span>{' '}
              steps.
            </h1>

            {/* Editorial blockquote-style subhead */}
            <blockquote className="mt-7 max-w-[60ch] border-l-2 border-claret pl-5 font-fraunces text-[clamp(19px,1.5vw,23px)] italic leading-relaxed text-graphite">
              Review yesterday. Read. Listen. Learn ten words from the reading. Write something
              short and have it examined.
            </blockquote>
            <p className="mt-3 pl-5 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
              — TODAY’S BRIEF
            </p>

            {/* Progress strip — inline, claret ticks */}
            <ProgressStrip completed={completedCount} />
          </div>

          {/* ── RIGHT — polaroid (hidden on mobile, hand-placed feel) ──── */}
          <div className="hidden md:col-span-5 md:flex md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 16, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: polaroid.rotate }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <Polaroid
                src={polaroid.src}
                alt={polaroid.alt}
                tint={polaroid.tint}
                edition={polaroid.edition}
                orientation="portrait"
                rotate={0}
                className="w-full max-w-[320px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}

function ProgressStrip({ completed }: { completed: number }) {
  const total = 5
  const allDone = completed >= total
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        PROGRESS
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < completed
          return (
            <motion.span
              key={i}
              initial={false}
              animate={{ scaleY: done ? 1 : 0.6, opacity: done ? 1 : 0.55 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              className={`block h-5 w-2.5 ${done ? 'bg-ink' : 'bg-line'}`}
              aria-label={done ? `Step ${i + 1} complete` : `Step ${i + 1} pending`}
            />
          )
        })}
      </div>
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.28em] ${allDone ? 'text-sage' : 'text-graphite'}`}
      >
        {completed} / {total} {allDone ? '— SESSION CLOSED' : 'STEPS COMPLETE'}
      </span>
    </div>
  )
}
