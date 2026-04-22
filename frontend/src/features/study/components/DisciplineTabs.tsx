import {
  disciplineChapters,
  disciplineLabels,
  lessons,
  type Discipline,
} from '../data/lessons'

interface DisciplineTabsProps {
  active: Discipline
  onChange: (d: Discipline) => void
}

const ORDER: Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']

export function DisciplineTabs({ active, onChange }: DisciplineTabsProps) {
  return (
    <div className="sticky top-[72px] z-30 border-y border-line bg-ivory md:top-[84px]">
      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 xl:px-14">
        <div className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {ORDER.map((d) => {
            const isActive = d === active
            return (
              <button
                key={d}
                type="button"
                onClick={() => onChange(d)}
                className={`group flex flex-col items-center gap-1 border-b-2 py-6 text-center transition-colors duration-200 ${
                  isActive
                    ? 'border-claret'
                    : 'border-transparent hover:border-line'
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  {disciplineChapters[d]}
                </span>
                <span
                  className={`font-fraunces text-[24px] leading-none transition-colors ${
                    isActive ? 'text-claret' : 'text-ink'
                  }`}
                >
                  {disciplineLabels[d]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  {lessons[d].length} LESSONS
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
