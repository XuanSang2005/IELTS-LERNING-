import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import { LEXICON_PHASES } from '@shared/schemas/lexicon-plan'
import type { BandLevel } from '@shared/schemas/practice'
import { useLexiconPlan } from '../hooks/useLexiconPlan'
import { useLexiconProgressQuery } from '../hooks/useLexiconProgressQuery'
import { LexiconWeekTile } from './LexiconWeekTile'

interface LexiconRoadmapProps {
  discipline: LexiconDiscipline
  level: BandLevel
}

export function LexiconRoadmap({ discipline, level }: LexiconRoadmapProps) {
  const planQuery = useLexiconPlan(discipline, level)
  const progressQuery = useLexiconProgressQuery(discipline, level)

  if (planQuery.isPending) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-6 py-20 text-center md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-graphite">Opening the roadmap…</p>
      </div>
    )
  }

  if (planQuery.isError || !planQuery.data) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-6 py-20 text-center md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-claret">
          The roadmap is momentarily out of reach. Please refresh.
        </p>
      </div>
    )
  }

  // Coming-soon stub: backend returned a plan with no weeks yet (Foundation /
  // Advanced / Mastery in MVP). Render an editorial holding card.
  if (planQuery.data.weeks.length === 0 || planQuery.data.comingSoon) {
    return (
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 text-center md:px-10 xl:px-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          ◆ COMING SOON
        </p>
        <h2 className="mt-6 font-fraunces text-[34px] italic leading-[1.05] text-ink md:text-[44px]">
          This arc opens with the next cohort.
        </h2>
        <p className="mt-6 font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]">
          The library prepares its volumes. While you wait, the
          <em className="not-italic text-claret"> Intermediate</em> arc remains the most
          carefully kept on the shelf — return to it from the level selector above.
        </p>
      </div>
    )
  }

  const progressByWeek = new Map(progressQuery.data?.map((p) => [p.week, p]) ?? [])

  return (
    <div className="mx-auto w-full max-w-[1720px] px-6 pb-20 md:px-10 xl:px-14">
      {LEXICON_PHASES.map((phase, phaseIdx) => {
        const weeks = planQuery.data!.weeks.filter((w) => w.phase === phase.phase)
        return (
          <section
            key={phase.phase}
            className={`${phaseIdx === 0 ? '' : 'mt-20 border-t border-line pt-16'} md:mt-24`}
          >
            {/* Phase header */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-14">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
                  ◆ PHASE {phase.roman}
                </p>
                <h2 className="mt-4 font-fraunces text-[34px] leading-[1.05] text-ink md:text-[38px]">
                  {phase.name}
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                  {phase.weekRange}
                </p>
              </div>
              <p className="font-fraunces text-[18px] italic leading-relaxed text-graphite md:mt-11 md:text-[20px]">
                {phase.description}
              </p>
            </div>

            {/* Week tiles — phase has 3 weeks (3+3+3+3 boundaries) */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-8">
              {weeks.map((stub, i) => (
                <LexiconWeekTile
                  key={`${level}-${discipline}-${stub.week}`}
                  stub={stub}
                  discipline={discipline}
                  progress={progressByWeek.get(stub.week)}
                  index={i}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
