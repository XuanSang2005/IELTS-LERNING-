import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { SessionStep } from '@/features/practice/utils/session-planner'

interface StepShellProps {
  step: SessionStep
  stepNumber: number
  totalSteps: number
  children: ReactNode
  canContinue?: boolean
  continueLabel?: string
  onContinue: () => void
  onPrev?: () => void
  footnote?: string
}

export function StepShell({
  step,
  stepNumber,
  totalSteps,
  children,
  canContinue = true,
  continueLabel,
  onContinue,
  onPrev,
  footnote,
}: StepShellProps) {
  const isLast = stepNumber === totalSteps
  const label = continueLabel ?? (isLast ? 'Complete the session' : 'Continue')
  return (
    <motion.article
      key={step.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
        STEP {String(stepNumber).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')} ·{' '}
        {step.kind.toUpperCase()}
      </p>
      <h1 className="mt-4 font-fraunces text-[clamp(36px,4.5vw,56px)] leading-[1.02] tracking-tight text-ink">
        {step.title}
      </h1>
      {step.description && (
        <p className="mt-4 max-w-[60ch] font-fraunces text-[21px] italic leading-relaxed text-graphite">
          {step.description}
        </p>
      )}

      <div className="mt-10">{children}</div>

      <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-6">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="group font-geist text-[18px] text-ink"
          >
            <span className="text-claret">←</span>{' '}
            <span className="relative">
              Previous step
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="group relative ml-auto inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">{label}</span>
          <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
      {footnote && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          {footnote}
        </p>
      )}
    </motion.article>
  )
}
