import { Link } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { lexiconPhaseForWeek, LEXICON_PHASES } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { useLexiconPlan } from '../hooks/useLexiconPlan'
import { useLexiconProgressQuery } from '../hooks/useLexiconProgressQuery'
import { DayLesson } from './DayLesson'
import { DayPractice } from './DayPractice'
import { DayReview } from './DayReview'
import { WeekQuiz } from './WeekQuiz'

type Tab = 'lesson' | 'practice' | 'review' | 'week-quiz'

interface WeekPageProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
  day: number
  tab: Tab
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

export function WeekPage({ discipline, level, week, day, tab }: WeekPageProps) {
  const planQuery = useLexiconPlan(discipline, level)
  const progressQuery = useLexiconProgressQuery(discipline, level)

  const stub = planQuery.data?.weeks.find((w) => w.week === week)
  const weekProgress = progressQuery.data?.find((p) => p.week === week)
  const phase = LEXICON_PHASES.find((p) => p.phase === lexiconPhaseForWeek(week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12))

  return (
    <div className="w-full pb-20">
      {/* Masthead */}
      <header className="border-b border-line">
        <div className="mx-auto w-full max-w-[1720px] px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14 xl:px-14">
          <Link
            to="/app/lexicon"
            search={discipline === 'vocabulary' ? {} : { discipline }}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-claret"
          >
            <span aria-hidden="true">←</span> Return to roadmap
          </Link>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ WEEK {String(week).padStart(2, '0')} · CH. {toRoman(week)}
            <span className="mx-2 text-graphite">·</span>
            <span className="text-graphite">
              {phase ? `PHASE ${phase.roman} · ${phase.name.toUpperCase()}` : ''}
            </span>
          </p>

          <h1 className="mt-3 font-fraunces text-[clamp(40px,5vw,72px)] leading-[1.05] text-ink">
            {stub?.themeName ?? 'Week'}
          </h1>

          {stub && (
            <blockquote className="mt-5 max-w-[60ch] border-l-2 border-claret pl-5 font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
              &ldquo;{stub.tagline}&rdquo;
            </blockquote>
          )}

          {stub && (
            <p className="mt-3 max-w-[60ch] font-geist text-[15px] leading-relaxed text-ink/80 md:text-[16px]">
              {stub.goalOneLiner}
            </p>
          )}
        </div>
      </header>

      {/* Day strip */}
      <section className="border-b border-line bg-bone/30">
        <div className="mx-auto w-full max-w-[1720px] px-6 py-6 md:px-10 md:py-7 xl:px-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            DAY ·
          </p>
          <div className="mt-3 -mx-2 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible">
            {Array.from({ length: 7 }, (_, i) => {
              const d = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7
              const active = d === day
              const done = weekProgress?.daysCompleted.includes(d) ?? false
              return (
                <Link
                  key={d}
                  to="/app/lexicon/$week"
                  params={{ week: String(week) }}
                  search={{ discipline, day: d, tab }}
                  className={`flex h-12 w-12 shrink-0 snap-start items-center justify-center border font-mono text-[14px] transition-colors md:h-11 md:w-11 ${
                    active
                      ? 'border-ink bg-ink text-ivory'
                      : done
                        ? 'border-claret bg-claret/10 text-claret hover:border-ink'
                        : 'border-line text-graphite hover:border-ink hover:text-ink'
                  }`}
                  aria-label={`Day ${d}${done ? ' completed' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {d}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tab strip */}
      <section className="border-b-2 border-line">
        <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-between gap-1 px-6 md:px-10 xl:px-14">
          <div className="flex items-center gap-1">
            {(['lesson', 'practice', 'review'] as const).map((t) => {
              const active = t === tab
              return (
                <Link
                  key={t}
                  to="/app/lexicon/$week"
                  params={{ week: String(week) }}
                  search={{ discipline, day, tab: t }}
                  className={`group relative px-5 py-4 font-mono text-[11px] uppercase tracking-[0.28em] transition-colors md:text-[12px] ${
                    active ? 'text-claret' : 'text-graphite hover:text-ink'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {t}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-[2px] bg-claret"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Week quiz access — gated when all 7 days complete */}
          {(() => {
            const daysCompleteCount = weekProgress?.daysCompleted.length ?? 0
            const quizUnlocked = daysCompleteCount >= 7
            const isQuizTab = tab === 'week-quiz'
            const passed = weekProgress?.reviewPassed ?? false
            return (
              <Link
                to="/app/lexicon/$week"
                params={{ week: String(week) }}
                search={{ discipline, day, tab: 'week-quiz' }}
                disabled={!quizUnlocked}
                className={`group relative px-5 py-4 font-mono text-[11px] uppercase tracking-[0.28em] transition-colors md:text-[12px] ${
                  isQuizTab
                    ? 'text-claret'
                    : quizUnlocked
                      ? passed
                        ? 'text-sage hover:text-ink'
                        : 'text-ink hover:text-claret'
                      : 'text-graphite/50 pointer-events-none cursor-not-allowed'
                }`}
                aria-current={isQuizTab ? 'page' : undefined}
              >
                ◆ WEEK QUIZ
                {passed && <span className="ml-2">· PASSED</span>}
                {!quizUnlocked && (
                  <span className="ml-2 text-graphite/60">· {daysCompleteCount}/7</span>
                )}
                {isQuizTab && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-[2px] bg-claret"
                  />
                )}
              </Link>
            )
          })()}
        </div>
      </section>

      {/* Tab body */}
      <div className="mx-auto w-full max-w-[1720px] px-6 pt-8 md:px-10 md:pt-10 xl:px-14">
        {tab === 'lesson' && (
          <DayLesson discipline={discipline} level={level} week={week} day={day} />
        )}
        {tab === 'practice' && (
          <DayPractice discipline={discipline} level={level} week={week} day={day} />
        )}
        {tab === 'review' && (
          <DayReview discipline={discipline} level={level} week={week} day={day} />
        )}
        {tab === 'week-quiz' && (
          <WeekQuiz discipline={discipline} level={level} week={week} />
        )}
      </div>
    </div>
  )
}

