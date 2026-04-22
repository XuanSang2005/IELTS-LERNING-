export type WeekTab = 'lesson' | 'practice' | 'review'

interface WeekTabsProps {
  value: WeekTab
  onChange: (tab: WeekTab) => void
  practiceDisabled?: boolean
  reviewDisabled?: boolean
  lessonRead?: boolean
  practiceDone?: boolean
  reviewPassed?: boolean
}

const TABS: Array<{ value: WeekTab; label: string; numeral: string }> = [
  { value: 'lesson', label: 'Lesson', numeral: 'I' },
  { value: 'practice', label: 'Practice', numeral: 'II' },
  { value: 'review', label: 'Review', numeral: 'III' },
]

export function WeekTabs({
  value,
  onChange,
  practiceDisabled = false,
  reviewDisabled = false,
  lessonRead = false,
  practiceDone = false,
  reviewPassed = false,
}: WeekTabsProps) {
  const completions: Record<WeekTab, boolean> = {
    lesson: lessonRead,
    practice: practiceDone,
    review: reviewPassed,
  }
  const disabled: Record<WeekTab, boolean> = {
    lesson: false,
    practice: practiceDisabled,
    review: reviewDisabled,
  }

  return (
    <div className="sticky top-[72px] z-20 border-line bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1720px] items-center justify-center gap-2 px-6 py-3 md:gap-4 md:px-10 xl:px-14">
        {TABS.map((t) => {
          const isActive = value === t.value
          const isDisabled = disabled[t.value]
          const isDone = completions[t.value]
          return (
            <button
              key={t.value}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(t.value)}
              className={`group relative flex items-center gap-3 border px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.22em] transition-colors duration-200 md:px-5 ${
                isDisabled
                  ? 'cursor-not-allowed border-line bg-transparent text-line'
                  : isActive
                    ? 'border-claret bg-claret text-ivory'
                    : 'border-line text-graphite hover:border-ink hover:text-ink'
              }`}
            >
              <span
                className={`text-[10px] ${
                  isDisabled
                    ? 'text-line'
                    : isActive
                      ? 'text-ivory/80'
                      : 'text-claret'
                }`}
              >
                § {t.numeral}
              </span>
              <span>{t.label}</span>
              {isDone && !isDisabled && (
                <span
                  aria-hidden="true"
                  className={`ml-1 inline-block h-1.5 w-1.5 rounded-full ${
                    isActive ? 'bg-ivory' : 'bg-claret'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
