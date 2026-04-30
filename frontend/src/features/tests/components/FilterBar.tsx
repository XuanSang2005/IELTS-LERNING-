import type { Difficulty, Skill } from '@shared/schemas/test'

export type SkillFilter = Skill | 'all'
export type DifficultyFilter = Difficulty | 'all'

export interface TestFilters {
  skill: SkillFilter
  difficulty: DifficultyFilter
  includePro: boolean
}

interface FilterBarProps {
  value: TestFilters
  onChange: (next: TestFilters) => void
}

const SKILL_OPTS: Array<{ value: SkillFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'listening', label: 'Listening' },
  { value: 'reading', label: 'Reading' },
  { value: 'writing', label: 'Writing' },
  { value: 'speaking', label: 'Speaking' },
]

const DIFFICULTY_OPTS: Array<{ value: DifficultyFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
        active
          ? 'border-claret bg-claret text-ivory'
          : 'border-line text-graphite hover:border-ink hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <div className="sticky top-[64px] z-30 border-y border-line bg-ivory py-3 md:top-[88px] md:py-4">
      <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center gap-x-8 gap-y-3 px-6 md:px-10 xl:px-14">
        <div className="flex items-center gap-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-graphite">SKILL</p>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTS.map((o) => (
              <Chip
                key={o.value}
                active={value.skill === o.value}
                onClick={() => onChange({ ...value, skill: o.value })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-graphite">LEVEL</p>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_OPTS.map((o) => (
              <Chip
                key={o.value}
                active={value.difficulty === o.value}
                onClick={() => onChange({ ...value, difficulty: o.value })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-graphite">
          <input
            type="checkbox"
            checked={value.includePro}
            onChange={(e) => onChange({ ...value, includePro: e.target.checked })}
            className="h-3 w-3 accent-claret"
          />
          INCLUDE PRO-ONLY
        </label>
      </div>
    </div>
  )
}
