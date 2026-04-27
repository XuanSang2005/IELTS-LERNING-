import { type ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  useDueItems,
  usePracticeState,
  useProfile,
  useTodayLog,
} from '@/features/practice/hooks/practice-queries'
import { Polaroid } from '@/components/ui/Polaroid'
import type { BandLevel, Discipline, UserProfile } from '@/schemas/practice'
import {
  DAILY_STEPS,
  ESTIMATED_MINUTES_BY_LEVEL,
  STEP_MINUTES_BY_LEVEL,
} from '@/features/daily/data/step-config'

export const Route = createFileRoute('/app/')({
  component: Dashboard,
})

const DISCIPLINE_LABELS: Record<Discipline, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  collocations: 'Collocations',
  linking: 'Linking Devices',
}
const DISCIPLINE_ORDER: Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']

const PHASE_NAME: Record<1 | 2 | 3 | 4, { numeral: string; name: string; note: string }> = {
  1: { numeral: 'I', name: 'Diagnosis', note: 'Find the ceiling. Understand the errors.' },
  2: { numeral: 'II', name: 'Foundations', note: 'Repair the grammar and lexis that score below seven.' },
  3: { numeral: 'III', name: 'Polish', note: 'Refine rhythm, register, and the habits of Band 8.' },
  4: { numeral: 'IV', name: 'Examination', note: 'Simulate the paper under test conditions.' },
}

const EDITORS_NOTES: Record<BandLevel, string> = {
  foundation: 'Begin slowly. Each step lays a stone for the chapter that follows.',
  intermediate: 'The structures are within reach. Today, attend to accuracy before fluency.',
  advanced: 'Yesterday’s drills showed hesitation. We’ll loop those before the writing task.',
  mastery: 'Examiner-level register. The habits of an eight, sustained over twelve sentences.',
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatUKDate(d = new Date()): string {
  return d
    .toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase()
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

function nextFridayLabel(): string {
  const now = new Date()
  const day = now.getDay()
  const offset = (5 - day + 7) % 7 || 7
  const fri = new Date(now)
  fri.setDate(now.getDate() + offset)
  const label = fri
    .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
    .toUpperCase()
  return `${label} · 19:00 ICT`
}

/* ───── Chapter divider ───── */

function ChapterDivider({
  numeral,
  title,
  meta,
}: {
  numeral: string
  title: string
  meta?: string
}) {
  return (
    <div className="relative pb-10 pt-16">
      {/* stitched tape */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-12 flex h-12 w-[300px] -translate-x-1/2 -rotate-[1.4deg] items-center justify-center bg-claret"
        style={{ boxShadow: '0 6px 12px -6px rgba(20,18,16,0.35)' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-[3px]"
          style={{ border: '1px dashed rgba(246,241,231,0.5)' }}
        />
        <span className="relative font-mono text-[10px] uppercase tracking-[0.28em] text-ivory">
          CHAPTER {numeral}
        </span>
      </div>
      <div className="mt-16 flex items-baseline justify-between gap-4 border-b border-line pb-2.5">
        <h3 className="m-0 font-fraunces text-[36px] font-normal italic leading-none text-ink">
          {title}
          <em className="text-claret">.</em>
        </h3>
        {meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            {meta}
          </span>
        )}
      </div>
    </div>
  )
}

/* ───── Ruled page ───── */

function RuledPage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative pb-7 pl-[60px] pr-5 pt-2 ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent 0 31px, rgba(201,191,168,0.45) 31px 32px)',
        backgroundSize: '100% 32px',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 top-0 w-px bg-claret"
        style={{ opacity: 0.55 }}
      />
      {children}
    </div>
  )
}

/* ───── Primary CTA (signature button) ───── */

const PRIMARY_BUTTON_CLASS =
  'group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]'

function PrimaryContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  )
}

const TEXT_LINK_CLASS = 'group inline-flex items-center gap-2 font-geist text-[14px] text-ink'

function TextLinkContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
      </span>
      <span className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret">
        ↗
      </span>
    </>
  )
}

/* ───── Notebook sections ───── */

function NotebookSession({
  level,
  stepsDone,
}: {
  level: BandLevel
  stepsDone: number
}) {
  const totalSteps = DAILY_STEPS.length
  const allDone = stepsDone >= totalSteps
  const editorsNote = EDITORS_NOTES[level]
  const totalMinutes = ESTIMATED_MINUTES_BY_LEVEL[level]
  const stepMinutes = STEP_MINUTES_BY_LEVEL[level]
  return (
    <section>
      <ChapterDivider
        numeral="I"
        title="Today's session"
        meta={`${totalMinutes} MIN · ${totalSteps} STEPS`}
      />
      <RuledPage>
        <p className="m-0 max-w-[52ch] pt-1 font-fraunces text-[22px] italic leading-[1.45] text-graphite">
          Review yesterday. Read. Listen. Learn ten words. Write something short and have it
          examined.
        </p>

        {/* Editor's note — margin annotation style */}
        <div className="relative mt-6 border-l-2 border-claret pl-6">
          <span
            className="absolute -top-0.5 left-[-36px] font-mono text-[10px] tracking-[0.25em] text-claret"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top' }}
          >
            NOTE
          </span>
          <p className="m-0 font-geist text-[15px] leading-[1.7] text-ink">{editorsNote}</p>
        </div>

        {/* Handwritten-style checklist */}
        <ol className="m-0 mt-8 list-none p-0">
          {DAILY_STEPS.map((s) => {
            const isDone = stepsDone >= s.number
            const isCurrent = stepsDone + 1 === s.number
            const ringClass = isDone
              ? 'border-sage bg-sage text-ivory'
              : isCurrent
                ? 'border-claret bg-claret/10 text-claret'
                : 'border-line bg-transparent text-claret'
            return (
              <li
                key={s.number}
                className="flex items-baseline gap-5 border-b border-dashed border-line py-2.5"
              >
                <span
                  className={`inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] font-fraunces text-[14px] ${ringClass}`}
                >
                  {isDone ? '✓' : isCurrent ? '●' : ''}
                </span>
                <span className="flex-1">
                  <span
                    className={`font-fraunces text-[24px] ${isDone ? 'text-sage line-through decoration-line' : 'text-ink'}`}
                  >
                    {s.title}
                  </span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
                  {stepMinutes[s.kind]} MIN
                </span>
              </li>
            )
          })}
        </ol>

        <div className="mt-9 flex flex-wrap items-center gap-7">
          {allDone ? (
            <p className="m-0 font-fraunces text-[20px] italic text-sage">
              <span className="mr-2 not-italic text-claret">◆</span>Complete. Return tomorrow at
              nine.
            </p>
          ) : (
            <Link
              to="/app/session"
              search={{
                step: (Math.min(stepsDone + 1, totalSteps) as 1 | 2 | 3 | 4 | 5),
              }}
              className={PRIMARY_BUTTON_CLASS}
            >
              <PrimaryContent>
                {stepsDone === 0 ? "Begin today's session" : `Resume at step ${stepsDone + 1}`}
              </PrimaryContent>
            </Link>
          )}
          <Link to="/method" className={TEXT_LINK_CLASS}>
            <TextLinkContent>Read the method</TextLinkContent>
          </Link>
        </div>
      </RuledPage>
    </section>
  )
}

function NotebookPhase({ profile }: { profile: UserProfile }) {
  const phase = PHASE_NAME[profile.phase]
  return (
    <section>
      <ChapterDivider
        numeral="II"
        title={`The phase — ${phase.name}`}
        meta={`WEEK ${String(profile.currentWeek).padStart(2, '0')} / XII`}
      />
      <RuledPage>
        <p className="mt-1.5 max-w-[54ch] font-fraunces text-[20px] italic leading-[1.5] text-graphite">
          {phase.note}
        </p>
        <div className="mt-7 grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, i) => {
            const wk = i + 1
            const isCurrent = wk === profile.currentWeek
            const isPast = wk < profile.currentWeek
            const phaseOf = wk <= 2 ? 1 : wk <= 6 ? 2 : wk <= 10 ? 3 : 4
            return (
              <div key={wk} className="text-center">
                <div
                  className={`relative flex h-14 items-center justify-center border border-line ${
                    isCurrent ? 'bg-claret' : isPast ? 'bg-bone' : 'bg-transparent'
                  }`}
                >
                  <span
                    className={`font-fraunces text-[22px] ${
                      isCurrent ? 'not-italic text-ivory' : 'italic text-graphite'
                    }`}
                  >
                    {String(wk).padStart(2, '0')}
                  </span>
                  {isCurrent && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] text-claret">
                      ▲
                    </span>
                  )}
                </div>
                <span
                  className={`mt-2.5 block font-mono text-[9px] uppercase tracking-[0.2em] ${
                    isCurrent ? 'text-claret' : 'text-graphite'
                  }`}
                >
                  Ph.{PHASE_NAME[phaseOf].numeral}
                </span>
              </div>
            )
          })}
        </div>
      </RuledPage>
    </section>
  )
}

function NotebookDisciplines({ profile }: { profile: UserProfile }) {
  return (
    <section>
      <ChapterDivider numeral="III" title="The four disciplines" meta="LEDGER" />
      <RuledPage>
        <div className="mt-1">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_120px_1fr_60px] border-b-2 border-ink py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              Discipline
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              Lessons
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              Completion
            </span>
            <span className="text-right font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              %
            </span>
          </div>
          {DISCIPLINE_ORDER.map((d, i) => {
            const { completed, total } = profile.disciplineProgress[d]
            const pct = total ? Math.round((completed / total) * 100) : 0
            const ticks = 16
            const filledTicks = total ? Math.round((completed / total) * ticks) : 0
            return (
              <Link
                key={d}
                to="/study"
                search={{ discipline: d }}
                className="group grid grid-cols-[1fr_120px_1fr_60px] items-center border-b border-line py-3.5 transition-colors duration-200 hover:bg-bone/40"
              >
                <span className="font-fraunces text-[24px] text-ink">
                  <span className="mr-2.5 text-claret">№ {String(i + 1).padStart(2, '0')}</span>
                  <span className="border-b border-transparent transition-colors duration-200 group-hover:border-ink">
                    {DISCIPLINE_LABELS[d]}
                  </span>
                </span>
                <span className="font-mono text-[12px] tracking-[0.2em] text-ink">
                  {completed} / {total}
                </span>
                <span className="flex gap-[3px]">
                  {Array.from({ length: ticks }).map((_, k) => {
                    const filled = k < filledTicks
                    return (
                      <span
                        key={k}
                        className={`inline-block h-3.5 w-0.5 ${filled ? 'bg-claret' : 'bg-line'}`}
                        style={{ transform: `rotate(${k % 2 ? 3 : -3}deg)` }}
                      />
                    )
                  })}
                </span>
                <span className="text-right font-fraunces text-[22px] text-claret">
                  {pct}
                  <span className="text-[14px] text-graphite">%</span>
                </span>
              </Link>
            )
          })}
        </div>
      </RuledPage>
    </section>
  )
}

function NotebookBand({ profile }: { profile: UserProfile }) {
  const b = profile.currentBand
  const lo = ((b.range[0] - 4) / 5) * 100
  const hi = ((b.range[1] - 4) / 5) * 100
  const targetPct = ((profile.targetBand - 4) / 5) * 100
  return (
    <section>
      <ChapterDivider numeral="IV" title="Your level" meta="FOLDOUT PLATE" />
      <RuledPage>
        <div className="relative mt-2 border border-ink bg-bone px-10 py-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1.5 border border-line"
          />
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.3em] text-claret">
            FOLDOUT ◆ BAND SCALE
          </p>
          <div className="mt-3 flex items-baseline justify-between gap-6">
            <h4 className="m-0 font-fraunces text-[72px] leading-none text-ink">
              <span className="text-claret">{b.range[0].toFixed(1)}</span>
              <span className="text-[40px] italic text-graphite"> – {b.range[1].toFixed(1)}</span>
            </h4>
            <div className="text-right">
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                TARGET
              </span>
              <span className="block font-fraunces text-[36px] text-claret">
                {profile.targetBand.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="relative mt-8 h-[60px]">
            <div className="absolute left-0 right-0 top-5 h-px bg-ink" />
            {Array.from({ length: 11 }).map((_, i) => {
              const v = 4 + i * 0.5
              const isMajor = v % 1 === 0
              const l = ((v - 4) / 5) * 100
              return (
                <span key={i}>
                  <div
                    className={`absolute w-px bg-ink ${isMajor ? 'top-3 h-4' : 'top-4 h-2'}`}
                    style={{ left: `${l}%` }}
                  />
                  {isMajor && (
                    <span
                      className="absolute top-8 -translate-x-1/2 font-mono text-[10px] tracking-[0.22em] text-graphite"
                      style={{ left: `${l}%` }}
                    >
                      {v.toFixed(1)}
                    </span>
                  )}
                </span>
              )
            })}
            <div
              className="absolute top-[18px] h-[5px] bg-claret"
              style={{ left: `${lo}%`, width: `${hi - lo}%` }}
            />
            <div
              className="absolute top-2 h-6 w-0.5 bg-claret"
              style={{ left: `${targetPct}%`, transform: 'translateX(-1px)' }}
            />
          </div>
          <p className="m-0 mt-[18px] font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
            CONFIDENCE <span className="text-ink">{b.confidence.toUpperCase()}</span>{' '}
            &nbsp;◆&nbsp; SOURCE <span className="text-ink">{b.setBy.toUpperCase()}</span>
          </p>
        </div>

        <div className="mt-6">
          <Link
            to="/onboarding/band"
            search={{ redirect: '/app' }}
            className={PRIMARY_BUTTON_CLASS}
          >
            <PrimaryContent>Recalibrate your band</PrimaryContent>
          </Link>
        </div>
      </RuledPage>
    </section>
  )
}

/* ───── Dashboard ───── */

function Dashboard() {
  const { isPending, isError } = usePracticeState()
  const profile = useProfile()
  const dueCount = useDueItems().length
  const todayLog = useTodayLog()

  if (isPending || !profile) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-10 pb-20 pt-11">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="font-fraunces text-[36px] italic text-graphite"
        >
          Opening the notebook…
        </motion.p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-10 pb-20 pt-11">
        <p className="font-fraunces text-[28px] italic text-claret">
          The library is momentarily out of reach. Please refresh.
        </p>
      </div>
    )
  }

  const firstName = profile.name.split(' ')[0]
  const weekStr = String(profile.currentWeek).padStart(2, '0')
  const stepsDone = todayLog.stepsCompleted.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full pb-20"
    >
      {/* ══════ Notebook header — editorial masthead ══════ */}
      <header className="border-b-2 border-line">
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-10 px-10 pb-16 pt-11 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7">
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.3em]">
            <span className="mr-2 text-claret">◆</span>
            <span className="text-claret">THE NOTEBOOK</span>
            <span className="mx-2 text-graphite">·</span>
            <span className="text-graphite">{formatUKDate()}</span>
            <span className="mx-2 text-graphite">·</span>
            <span className="text-claret">WEEK {weekStr} / XII</span>
          </p>
          <h1 className="mt-5 font-fraunces text-[clamp(56px,7vw,96px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
            {greeting()}, {firstName}.
          </h1>
          <blockquote className="mt-7 border-l-2 border-claret pl-5 font-fraunces text-[clamp(20px,1.6vw,26px)] italic leading-[1.4] text-graphite">
            {dueCount === 0
              ? '"Nothing due today. A quiet library — the notebook lies open, waiting."'
              : `"${dueCount} ${dueCount === 1 ? 'item' : 'items'} await review. The notebook is open; the library is warm."`}
          </blockquote>
          <p className="mt-3 pl-5 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            — EDITORIAL NOTE · LIBRARY {nextFridayLabel()}
          </p>
        </div>
        <div className="hidden md:col-span-5 md:flex md:justify-end">
          <Polaroid
            src="/images/editions/edition-03.jpg"
            alt="A tall arched window with late-afternoon sun streaming through."
            tint="claret"
            edition={`EDITION № ${toRoman(profile.currentWeek)}`}
            rotate={-4}
            className="w-full max-w-[320px]"
          />
        </div>
        </div>
      </header>

      {/* ══════ Notebook chapters ══════ */}
      <div className="mx-auto w-full max-w-[1720px] px-10">
        <NotebookSession level={profile.currentBand.level} stepsDone={stepsDone} />
        <NotebookPhase profile={profile} />
        <NotebookDisciplines profile={profile} />
        <NotebookBand profile={profile} />
      </div>
    </motion.div>
  )
}
