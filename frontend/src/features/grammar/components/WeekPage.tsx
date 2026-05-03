import { useEffect, useState } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import type { WeekNumber } from '@shared/schemas/grammar-plan'
import { GRAMMAR_LEVELS, GRAMMAR_PHASES } from '@shared/schemas/grammar-plan'
import { Polaroid } from '@/components/ui/Polaroid'
import { getStub } from '@/features/grammar/data/week-stubs'
import { useWeekLesson, useLessonById } from '@/features/grammar/hooks/grammar-queries'
import { useUserBandLevel } from '@/features/practice/hooks/practice-queries'
import { useGrammarProgress } from '@/stores/grammar-progress-store'
import { LessonReader } from './LessonReader'
import { PracticeSession } from './PracticeSession'
import { ReviewSession } from './ReviewSession'
import { WeekTabs, type WeekTab } from './WeekTabs'

interface WeekPageProps {
  week: WeekNumber
  initialTab?: WeekTab
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

export function WeekPage({ week, initialTab = 'lesson' }: WeekPageProps) {
  const level = useUserBandLevel()
  const stub = getStub(level, week)
  const phase = GRAMMAR_PHASES.find((p) => p.phase === stub.phase)!
  const levelMeta = GRAMMAR_LEVELS.find((l) => l.level === level)!
  const navigate = useNavigate()

  const { summary, isPublished, isPending: summaryPending } = useWeekLesson(week, level)
  const {
    data: lesson,
    isPending: lessonPending,
    isError: lessonError,
  } = useLessonById(summary?.id ?? null)
  // Consider lesson still loading while either the summary fetch or the full
  // lesson fetch is in-flight. Without this, there is a gap where the summary
  // arrives but the lesson body has not, and no branch renders anything.
  const isPending = summaryPending || (isPublished && lessonPending && !lesson)

  const progress = useGrammarProgress((s) => s.byLevel[level]?.[week])
  const markLessonRead = useGrammarProgress((s) => s.markLessonRead)

  const [tab, setTab] = useState<WeekTab>(initialTab)
  const router = useRouter()
  const changeTab = (next: WeekTab) => {
    setTab(next)
    // Keep the URL in sync so back/forward and deep-linking work.
    void router.navigate({
      to: '/app/grammar/$week',
      params: { week: String(week) },
      search: { tab: next },
      replace: true,
    })
  }

  // Mark lesson read after 2s on lesson tab when a real lesson is loaded.
  useEffect(() => {
    if (tab !== 'lesson' || !lesson) return
    const t = window.setTimeout(() => markLessonRead(level, week), 2000)
    return () => window.clearTimeout(t)
  }, [tab, lesson, week, level, markLessonRead])

  const practiceDisabled = !lesson
  const reviewDisabled = !lesson
  const lessonRead = progress?.lessonRead ?? false
  const practiceDone = (progress?.practiceScore ?? 0) > 0
  const reviewPassed = progress?.reviewPassed ?? false

  return (
    <div className="w-full pb-20">
      {/* Masthead — centered editorial article header, flanked by a pair of
          polaroids on large screens */}
      <header className="border-b-2 border-line">
        <div className="mx-auto w-full max-w-[1720px] px-6 py-10 md:px-10 md:py-14 xl:px-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,1fr)] lg:gap-16">
            {/* LEFT polaroid — hidden on small screens */}
            <div className="hidden lg:flex lg:justify-end">
              <Polaroid
                src="/images/editions/edition-02.jpg"
                alt="A hand annotating a page of manuscript."
                tint="claret"
                edition={`CHAPTER · ${toRoman(week)}`}
                orientation="portrait"
                rotate={-6}
                className="w-full max-w-[240px]"
              />
            </div>

            {/* CENTER — masthead content */}
            <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
            {/* Eyebrow metadata — one line, centered */}
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              <span>◆ {levelMeta.label.toUpperCase()}</span>
              <span className="text-line">·</span>
              <span>PHASE {phase.roman}</span>
              <span className="text-line">·</span>
              <span>CH. {toRoman(week)}</span>
              <span className="text-line">·</span>
              <span className="text-graphite">
                WEEK {String(week).padStart(2, '0')} / 12
              </span>
              <span className="text-line">·</span>
              <span className="text-graphite">{levelMeta.bandRange}</span>
            </p>

            {/* Chapter numeral as decorative display */}
            <p className="mt-6 font-fraunces text-[64px] italic leading-none text-claret md:text-[80px]">
              CH. {toRoman(week)}
            </p>

            {/* Title */}
            <h1 className="mt-6 font-fraunces text-[clamp(38px,4.5vw,60px)] font-normal leading-[1.02] -tracking-[0.01em] text-ink">
              {stub.structureName}
            </h1>

            {/* Tagline — centered blockquote without border to keep symmetry */}
            <blockquote className="mt-6 max-w-[52ch] font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
              &ldquo;{stub.tagline}&rdquo;
            </blockquote>

            {/* Hairline divider for editorial pacing */}
            <span className="mt-6 block h-px w-16 bg-line" aria-hidden="true" />

            {/* Goal one-liner */}
            <p className="mt-6 max-w-[62ch] font-geist text-[15px] leading-relaxed text-ink/80 md:text-[16px]">
              {stub.goalOneLiner}
            </p>
            </div>

            {/* RIGHT polaroid — hidden on small screens */}
            <div className="hidden lg:flex lg:justify-start">
              <Polaroid
                src="/images/editions/edition-04.jpg"
                alt="An open notebook with scribbled grammar notes."
                tint="sage"
                edition={levelMeta.label.toUpperCase()}
                orientation="portrait"
                rotate={6}
                className="w-full max-w-[240px]"
              />
            </div>
          </div>
        </div>
      </header>

      <WeekTabs
        value={tab}
        onChange={changeTab}
        practiceDisabled={practiceDisabled}
        reviewDisabled={reviewDisabled}
        lessonRead={lessonRead}
        practiceDone={practiceDone}
        reviewPassed={reviewPassed}
      />

      {/* Body */}
      <section className="mx-auto w-full max-w-[1720px] px-6 py-12 md:px-10 md:py-16 xl:px-14">
        {isPending && (
          <p className="font-fraunces text-[22px] italic text-graphite">Opening the week…</p>
        )}

        {!isPending && lessonError && (
          <div className="mx-auto max-w-[620px] border-l-2 border-claret py-6 pl-6 md:py-8 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              ◆ OUT OF REACH
            </p>
            <h2 className="mt-5 font-fraunces text-[30px] leading-tight text-ink md:text-[34px]">
              The lesson is momentarily out of reach.
            </h2>
            <p className="mt-4 font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[20px]">
              Refresh the page, or sign in again if the library has closed your session.
            </p>
          </div>
        )}

        {!isPending && !lessonError && !isPublished && (
          <div className="mx-auto max-w-[620px] border-l-2 border-claret py-6 pl-6 md:py-8 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
              ◆ IN PREPARATION
            </p>
            <h2 className="mt-5 font-fraunces text-[30px] leading-tight text-ink md:text-[34px]">
              Week {toRoman(week)} of the {levelMeta.label} arc is in preparation.
            </h2>
            <p className="mt-4 font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[20px]">
              The lesson is being drafted. Return tomorrow, or attend to a week already published.
              Practice and review are available once the lesson is in the library.
            </p>
          </div>
        )}

        {isPublished && lesson && tab === 'lesson' && (
          <LessonReader lesson={lesson} onContinueToPractice={() => changeTab('practice')} />
        )}
        {isPublished && lesson && tab === 'practice' && (
          <PracticeSession
            week={week}
            level={level}
            lesson={lesson}
            onRequestReview={() => changeTab('review')}
          />
        )}
        {isPublished && lesson && tab === 'review' && (
          <ReviewSession
            week={week}
            level={level}
            lesson={lesson}
            onBackToRoadmap={() => navigate({ to: '/app/grammar' })}
          />
        )}
      </section>
    </div>
  )
}
