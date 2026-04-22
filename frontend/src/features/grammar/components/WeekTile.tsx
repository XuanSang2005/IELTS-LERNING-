import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { BandLevel } from '@shared/schemas/practice'
import type { GrammarWeekStub } from '@shared/schemas/grammar-plan'
import { useGrammarProgress } from '@/stores/grammar-progress-store'
import { useWeekLesson } from '@/features/grammar/hooks/grammar-queries'

interface WeekTileProps {
  stub: GrammarWeekStub
  index: number
  level: BandLevel
}

function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let out = ''
  let v = n
  for (const [val, sym] of map) {
    while (v >= val) {
      out += sym
      v -= val
    }
  }
  return out || 'I'
}

const TILTS = ['-0.6deg', '0.4deg', '-0.4deg', '0.6deg'] as const

type TabKey = 'lesson' | 'practice' | 'review'

interface TabPillProps {
  week: number
  tab: TabKey
  label: string
  done: boolean
  disabled: boolean
}

function TabPill({ week, tab, label, done, disabled }: TabPillProps) {
  const dot = (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rounded-full ${done ? 'bg-claret' : 'bg-line'}`}
    />
  )

  if (disabled) {
    return (
      <span className="flex items-center gap-1.5 text-graphite/60">
        {dot}
        {label}
      </span>
    )
  }

  return (
    <Link
      to="/app/grammar/$week"
      params={{ week: String(week) }}
      search={{ tab }}
      className="flex items-center gap-1.5 transition-colors hover:text-claret"
    >
      {dot}
      {label}
    </Link>
  )
}

export function WeekTile({ stub, index, level }: WeekTileProps) {
  const { summary, isPublished } = useWeekLesson(stub.week, level)
  const progress = useGrammarProgress((s) => s.byLevel[level]?.[stub.week])
  const lessonRead = progress?.lessonRead ?? false
  const practiceDone = (progress?.practiceScore ?? 0) > 0
  const reviewPassed = progress?.reviewPassed ?? false

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.05 }}
      style={{ transform: `rotate(${TILTS[index % TILTS.length]})` }}
      className="relative"
    >
      <div className="group flex h-full flex-col gap-4 border border-line bg-bone p-6 transition-shadow duration-200 hover:shadow-[0_20px_40px_-18px_rgba(107,31,26,0.25)] md:p-7">
        {/* Main body — clicks go to the lesson tab. */}
        <Link
          to="/app/grammar/$week"
          params={{ week: String(stub.week) }}
          search={{ tab: 'lesson' }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-claret">
              WEEK {String(stub.week).padStart(2, '0')} · CH. {toRoman(stub.week)}
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                isPublished ? 'text-sage' : 'text-graphite'
              }`}
            >
              {isPublished ? 'PUBLISHED' : 'IN PREPARATION'}
            </span>
          </div>

          <span className="block h-px w-10 bg-line" aria-hidden="true" />

          <h3 className="font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
            {stub.structureName}
          </h3>

          <p className="font-fraunces text-[15px] italic leading-snug text-graphite">
            &ldquo;{stub.tagline}&rdquo;
          </p>

          <p className="font-geist text-[14px] leading-relaxed text-ink/80">{stub.goalOneLiner}</p>
        </Link>

        {/* Progress / tab-shortcut row. Each pill is its own Link so the
            user can jump straight to lesson, practice, or review from the
            roadmap. Disabled on unpublished weeks because there is no lesson
            to mount practice/review against. */}
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          <div className="flex items-center gap-4">
            <TabPill
              week={stub.week}
              tab="lesson"
              label="LESSON"
              done={lessonRead}
              disabled={false}
            />
            <TabPill
              week={stub.week}
              tab="practice"
              label="PRACTICE"
              done={practiceDone}
              disabled={!isPublished}
            />
            <TabPill
              week={stub.week}
              tab="review"
              label="REVIEW"
              done={reviewPassed}
              disabled={!isPublished}
            />
          </div>
          <Link
            to="/app/grammar/$week"
            params={{ week: String(stub.week) }}
            search={{ tab: 'lesson' }}
            className="flex items-center gap-2 text-claret transition-colors hover:text-ink"
          >
            {isPublished && summary ? `${summary.estimatedMinutes} MIN` : ''}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
