import type { BandLevel } from '@shared/schemas/practice'
import { GRAMMAR_PHASES } from '@shared/schemas/grammar-plan'
import { getArc } from '@/features/grammar/data/week-stubs'
import { WeekTile } from './WeekTile'

interface PhasesRoadmapProps {
  level: BandLevel
}

export function PhasesRoadmap({ level }: PhasesRoadmapProps) {
  const arc = getArc(level)

  return (
    <div className="mx-auto w-full max-w-[1720px] px-6 pb-20 md:px-10 xl:px-14">
      {GRAMMAR_PHASES.map((phase, phaseIdx) => {
        const weeks = arc.filter((s) => s.phase === phase.phase)
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
              <p className="font-fraunces text-[18px] italic leading-relaxed whitespace-nowrap text-graphite md:mt-11 md:text-[20px]">
                {phase.description}
              </p>
            </div>

            {/* Week tiles */}
            <div
              className={`mt-10 grid grid-cols-1 gap-6 md:mt-14 md:gap-8 ${
                weeks.length === 1
                  ? 'md:grid-cols-1'
                  : weeks.length === 3
                    ? 'sm:grid-cols-2 md:grid-cols-3'
                    : 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {weeks.map((stub, i) => (
                <WeekTile key={`${level}-${stub.week}`} stub={stub} index={i} level={level} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
