import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { LexiconWeekStub } from '@shared/schemas/lexicon-plan'
import type { LexiconWeekProgress } from '@shared/schemas/lexicon-progress'

interface LexiconWeekTileProps {
  stub: LexiconWeekStub
  discipline: LexiconDiscipline
  progress?: LexiconWeekProgress
  index: number
}

const TILTS = ['-0.6deg', '0.4deg', '-0.4deg', '0.6deg'] as const

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

export function LexiconWeekTile({ stub, discipline, progress, index }: LexiconWeekTileProps) {
  const daysCompleted = progress?.daysCompleted.length ?? 0
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
      <Link
        to="/app/lexicon/$week"
        params={{ week: String(stub.week) }}
        search={{ discipline, day: 1, tab: 'lesson' }}
        className="group flex h-full flex-col gap-4 border border-line bg-bone p-6 transition-shadow duration-200 hover:shadow-[0_20px_40px_-18px_rgba(107,31,26,0.25)] md:p-7"
      >
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-claret">
            WEEK {String(stub.week).padStart(2, '0')} · CH. {toRoman(stub.week)}
          </span>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
              reviewPassed ? 'text-sage' : 'text-graphite'
            }`}
          >
            {reviewPassed ? '◆ REVIEW PASSED' : `${daysCompleted} / 7 DAYS`}
          </span>
        </div>

        <span className="block h-px w-10 bg-line" aria-hidden="true" />

        <h3 className="font-fraunces text-[22px] leading-tight text-ink md:text-[24px]">
          {stub.themeName}
        </h3>

        <p className="font-fraunces text-[15px] italic leading-snug text-graphite">
          &ldquo;{stub.tagline}&rdquo;
        </p>

        <p className="font-geist text-[14px] leading-relaxed text-ink/80">{stub.goalOneLiner}</p>

        {/* Progress dots — one per day, filled if completed */}
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }, (_, i) => {
              const day = i + 1
              const done = progress?.daysCompleted.includes(day as 1 | 2 | 3 | 4 | 5 | 6 | 7) ?? false
              return (
                <span
                  key={day}
                  aria-hidden="true"
                  className={`inline-block h-2 w-2 rounded-full ${done ? 'bg-claret' : 'bg-line'}`}
                />
              )
            })}
          </div>
          <span className="flex items-center gap-2 text-claret">
            {stub.itemsPerDay}/DAY
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
