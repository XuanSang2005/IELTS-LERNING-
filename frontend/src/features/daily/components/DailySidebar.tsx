import type { BandLevel, StepNumber } from '@shared/schemas/practice'
import {
  DAILY_STEPS,
  STEP_MINUTES_BY_LEVEL,
  type DailyStepDefinition,
} from '../data/step-config'

const ROMAN: Record<1 | 2 | 3 | 4 | 5, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

interface DailySidebarProps {
  /**
   * Kept in the public type so DailyPage can keep passing it without churn —
   * the badge that consumed it has been removed from the rendered output.
   */
  day?: 1 | 2 | 3 | 4 | 5
  level: BandLevel
  activeNumber: 1 | 2 | 3 | 4 | 5
  completedSteps: StepNumber[]
  onSelect: (n: 1 | 2 | 3 | 4 | 5) => void
  /** Optional close callback — when provided, renders a top-right close button. */
  onClose?: () => void
}

/**
 * Editorial sidebar — bone-tinted rail with day badge, weekday masthead,
 * and the five-step ladder connected by a single vertical line. The
 * compact progress bar (Roman labels + tick squares) was removed by
 * request; the step ladder carries all progress information now via
 * filled / hollow markers and per-state typography.
 */
export function DailySidebar({
  level,
  activeNumber,
  completedSteps,
  onSelect,
  onClose,
}: DailySidebarProps) {
  const minutes = STEP_MINUTES_BY_LEVEL[level]
  const dayName = WEEKDAY_NAMES[new Date().getDay()]

  return (
    <aside
      className="border-r border-line bg-bone/40 lg:sticky lg:top-0 lg:self-start lg:min-h-screen"
      aria-label="Today’s session"
    >
      <div className="relative px-10 py-12 md:px-12 md:py-14">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Hide session sidebar"
            className="absolute right-5 top-5 inline-flex h-7 w-7 items-center justify-center border border-line bg-ivory font-mono text-[12px] text-graphite transition-colors duration-150 hover:border-ink hover:text-ink md:right-6 md:top-6"
          >
            ✕
          </button>
        )}

        {/* Weekday masthead */}
        <h2 className="font-fraunces text-[clamp(36px,3.4vw,46px)] font-normal leading-[1.05] tracking-[-0.01em] text-ink">
          {dayName}&rsquo;s
          <br />
          <em className="italic">session</em>
          <em className="not-italic text-claret">.</em>
        </h2>

        {/* Step ladder */}
        <ol className="relative mt-14">
          <span
            aria-hidden="true"
            className="absolute bottom-7 left-[5px] top-7 w-px bg-line"
          />
          {DAILY_STEPS.map((step) => (
            <SidebarStep
              key={step.number}
              step={step}
              isActive={step.number === activeNumber}
              isDone={completedSteps.includes(step.number as StepNumber)}
              minutes={minutes[step.kind]}
              onSelect={() => onSelect(step.number)}
            />
          ))}
        </ol>
      </div>
    </aside>
  )
}

interface SidebarStepProps {
  step: DailyStepDefinition
  isActive: boolean
  isDone: boolean
  minutes: number
  onSelect: () => void
}

function SidebarStep({ step, isActive, isDone, minutes, onSelect }: SidebarStepProps) {
  const markerClass = isDone
    ? 'bg-ink border-ink'
    : isActive
      ? 'bg-claret border-claret'
      : 'bg-ivory border-line'

  const metaTone = isActive ? 'text-claret' : isDone ? 'text-sage' : 'text-graphite'
  const titleTone = isActive ? 'text-ink' : isDone ? 'text-sage' : 'text-ink/55'

  return (
    <li className="relative">
      <button
        type="button"
        onClick={onSelect}
        className="grid w-full grid-cols-[24px_1fr] items-start gap-5 py-6 text-left"
      >
        <span
          aria-hidden="true"
          className={`relative z-10 mt-1.5 block h-3 w-3 border ${markerClass}`}
        />
        <span>
          <span
            className={`block font-mono text-[10px] uppercase tracking-[0.28em] ${metaTone}`}
          >
            § {ROMAN[step.number]} · {minutes} MIN
          </span>
          <span
            className={`mt-1 block font-fraunces text-[clamp(20px,1.65vw,24px)] italic leading-tight ${titleTone}`}
          >
            {step.title}
          </span>
          {isActive && (
            <span className="mt-2 block max-w-[26ch] font-fraunces text-[14px] italic leading-snug text-graphite">
              {step.tagline}
            </span>
          )}
        </span>
      </button>
    </li>
  )
}
