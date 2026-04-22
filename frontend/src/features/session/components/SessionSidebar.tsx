import type { SessionStep } from '@/features/practice/utils/session-planner'

interface SessionSidebarProps {
  steps: SessionStep[]
  currentIndex: number
  completedCount: number
  onSelect: (index: number) => void
}

export function SessionSidebar({
  steps,
  currentIndex,
  completedCount,
  onSelect,
}: SessionSidebarProps) {
  const total = steps.reduce((s, x) => s + x.minutes, 0)
  return (
    <nav className="lg:sticky lg:top-8 lg:self-start">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
        TODAY&rsquo;S SESSION
      </p>
      <ul className="mt-4 space-y-1 border-l border-line pl-5">
        {steps.map((step, i) => {
          const active = i === currentIndex
          const done = i < completedCount
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={`group relative -ml-5 flex w-full items-baseline gap-4 border-l-2 py-3 pl-4 pr-2 text-left transition-colors ${
                  active
                    ? 'border-claret'
                    : done
                      ? 'border-sage/60'
                      : 'border-transparent hover:border-ink/40'
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                    active ? 'text-claret' : done ? 'text-sage' : 'text-graphite'
                  }`}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-fraunces text-[20px] leading-tight ${
                      active ? 'text-ink' : done ? 'text-sage' : 'text-ink/70'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                    {step.minutes} MIN
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
        {completedCount} / {steps.length} DONE · {total} MIN TOTAL
      </p>
    </nav>
  )
}
