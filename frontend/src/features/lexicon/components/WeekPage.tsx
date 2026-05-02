import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { lexiconPhaseForWeek, LEXICON_PHASES } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { useLexiconPlan } from '../hooks/useLexiconPlan'
import { useLexiconProgressQuery } from '../hooks/useLexiconProgressQuery'
import { DayLesson } from './DayLesson'
import { DayPractice } from './DayPractice'
import { DayReview } from './DayReview'
import { DayTimeline } from './DayTimeline'
import { StepperSubNav } from './StepperSubNav'
import { WeekQuiz } from './WeekQuiz'

type Tab = 'lesson' | 'practice' | 'review' | 'week-quiz'

interface WeekPageProps {
  discipline: LexiconDiscipline
  level: BandLevel
  week: number
  day: number
  tab: Tab
}

export function WeekPage({ discipline, level, week, day, tab }: WeekPageProps) {
  const planQuery = useLexiconPlan(discipline, level)
  const progressQuery = useLexiconProgressQuery(discipline, level)

  const stub = planQuery.data?.weeks.find((w) => w.week === week)
  const themeName = stub?.themeName ?? 'Week'
  const phase = LEXICON_PHASES.find(
    (p) =>
      p.phase ===
      lexiconPhaseForWeek(week as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12),
  )
  const weekProgress = progressQuery.data?.find((p) => p.week === week)

  const daysCompleteCount = weekProgress?.daysCompleted.length ?? 0
  const quizUnlocked = daysCompleteCount >= 7
  const quizPassed = weekProgress?.reviewPassed ?? false
  const lessonComplete = (weekProgress?.daysCompleted ?? []).includes(
    day as 1 | 2 | 3 | 4 | 5 | 6 | 7,
  )
  const practiceScore = weekProgress?.practiceScores[String(day)]
  const practiceComplete = typeof practiceScore === 'number'

  return (
    <div className="w-full pb-20">
      {/* Hero — eyebrow + theme + tagline, centred */}
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-[1720px] flex-col items-center px-6 py-10 text-center md:px-10 md:py-14 xl:px-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
            <span className="text-graphite">CH. {phase?.roman ?? 'I'} · WEEK {String(week).padStart(2, '0')}</span>
            <span className="mx-2 text-line">·</span>
            <span className="text-claret">{(phase?.name ?? 'Phase').toUpperCase()}</span>
          </p>

          <h1 className="mt-5 font-fraunces text-[clamp(40px,5.5vw,80px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
            {themeName}
            <span className="text-claret">.</span>
          </h1>

          {stub?.tagline && (
            <p className="mt-5 max-w-[52ch] font-fraunces text-[16px] italic leading-relaxed text-graphite md:text-[18px]">
              {stub.tagline}
            </p>
          )}

          <span aria-hidden="true" className="mt-7 block h-px w-12 bg-claret" />
        </div>
      </section>

      {/* Day timeline */}
      <DayTimeline
        discipline={discipline}
        week={week}
        day={day}
        tab={tab}
        daysCompleted={weekProgress?.daysCompleted ?? []}
      />

      {/* Stepper sub-nav */}
      <StepperSubNav
        discipline={discipline}
        week={week}
        day={day}
        tab={tab}
        lessonComplete={lessonComplete}
        practiceComplete={practiceComplete}
        reviewComplete={lessonComplete}
        quizUnlocked={quizUnlocked}
        quizPassed={quizPassed}
        daysCompleteCount={daysCompleteCount}
      />

      {/* Tab body */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 md:px-10 md:pt-14 xl:px-14">
        {tab === 'lesson' && (
          <DayLesson
            discipline={discipline}
            level={level}
            week={week}
            day={day}
            nextDayTheme={planQuery.data?.weeks.find((w) => w.week === week)?.themeName}
          />
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
