import { useNavigate } from '@tanstack/react-router'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { Polaroid } from '@/components/ui/Polaroid'
import { useUserBandLevel } from '@/features/practice/hooks/practice-queries'
import { Route as LexiconIndexRoute } from '@/routes/app.lexicon.index'
import { useLexiconDiscipline } from '@/stores/lexicon-discipline-store'
import { DISCIPLINE_CONFIG } from '../data/discipline-config'
import { DisciplineNav } from './DisciplineNav'
import { LexiconRoadmap } from './LexiconRoadmap'
import { RetentionPanel } from './RetentionPanel'

export function LexiconPage() {
  const search = LexiconIndexRoute.useSearch()
  const navigate = useNavigate()
  const persistedActive = useLexiconDiscipline((s) => s.active)
  const setPersistedActive = useLexiconDiscipline((s) => s.setActive)

  // URL search param wins; falls back to persisted store choice.
  const active: LexiconDiscipline = search.discipline ?? persistedActive

  const level = useUserBandLevel()

  function setActive(next: LexiconDiscipline) {
    setPersistedActive(next)
    void navigate({
      to: '/app/lexicon',
      search: next === 'vocabulary' ? {} : { discipline: next },
      replace: true,
    })
  }

  const config = DISCIPLINE_CONFIG[active]

  return (
    <div className="w-full pb-20">
      {/* Masthead */}
      <header className="border-b-2 border-line">
        <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-11 md:grid-cols-12 md:gap-14 md:px-10 xl:px-14">
          <div className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] md:text-[13px]">
              <span className="mr-2 text-claret">◆</span>
              <span className="text-claret">THE LEXICON</span>
              <span className="mx-2 text-graphite">·</span>
              <span className="text-graphite">WEEKS I — XII · FOUR LEVELS</span>
            </p>
            <h1 className="mt-5 font-fraunces text-[clamp(52px,6.4vw,88px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
              {config.headline}
            </h1>
            <blockquote className="mt-6 border-l-2 border-claret pl-5 font-fraunces text-[clamp(20px,1.6vw,28px)] italic leading-[1.4] text-graphite">
              &ldquo;{config.quote}&rdquo;
            </blockquote>
            <p className="mt-3 pl-5 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
              — EDITORIAL NOTE, VOL. I
            </p>
          </div>
          <div className="hidden md:col-span-5 md:flex md:justify-end">
            <Polaroid
              src="/images/editions/edition-02.jpg"
              alt="A library reading room in low light, ranks of spines on dark timber shelves."
              tint="sage"
              edition={config.edition}
              rotate={3}
              className="w-full max-w-[320px]"
            />
          </div>
        </div>
      </header>

      {/* Discipline switcher row */}
      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 xl:px-14">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-b border-line py-7 md:py-8">
          <DisciplineNav active={active} onChange={setActive} />
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            CADENCE · 10 NEW WORDS / 7 PAIRINGS / 2 CONNECTORS PER DAY
          </p>
        </div>
      </div>

      {/* Colophon */}
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:px-10 md:py-16 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ THE TWELVE-WEEK ARC · {DISCIPLINE_LABEL[active].toUpperCase()}
          </p>
          <div className="max-w-[62ch] font-fraunces text-[20px] leading-relaxed text-ink md:text-[22px]">
            <p>
              Twelve themes, four phases. Each week opens seven daily lessons. Items move through a
              five-box review schedule — every word you meet returns until your hand finds it without
              looking.
            </p>
            <p className="mt-4 font-geist text-[16px] leading-relaxed text-graphite">
              Three doors per day. Lesson presents the items. Practice is active recall — definitions,
              gap-fills, synonym matches. Review is the spaced-repetition queue, surfaced from
              everything you have ever introduced.
            </p>
          </div>
        </div>
      </section>

      <LexiconRoadmap discipline={active} level={level} />

      {/* Retention metrics — folded under the roadmap so it's visible without
          a click-through but doesn't compete with the editorial masthead. */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1720px] px-6 py-12 md:px-10 md:py-14 xl:px-14">
          <RetentionPanel discipline={active} />
        </div>
      </section>

      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-14 text-center md:px-10 md:py-16 xl:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ A NOTE ON PACE
          </p>
          <p className="mt-5 max-w-[62ch] font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[21px]">
            Ten new words a day — when you keep up with review. Slip a day, and the queue catches up
            with you; the library will quietly pause new intake until you are level again.
          </p>
        </div>
      </footer>
    </div>
  )
}

const DISCIPLINE_LABEL: Record<LexiconDiscipline, string> = {
  vocabulary: 'Vocabulary',
  collocations: 'Collocations',
  linking: 'Linking devices',
}
