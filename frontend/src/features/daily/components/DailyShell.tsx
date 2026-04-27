import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { DailyStepDefinition } from '../data/step-config'

interface DailyShellProps {
  step: DailyStepDefinition
  children: ReactNode
  canContinue?: boolean
  continueLabel?: string
  isLastStep?: boolean
  onContinue: () => void
  onPrev?: () => void
  footnote?: string
}

/**
 * Per-step wrapper. The chapter-opener header is gone — the page-level
 * full-width progress bar carries the navigation context — so the shell
 * dives straight into the step body and ends with the action bar. Step
 * components own their internal eyebrows for inline context.
 */
export function DailyShell({
  step,
  children,
  canContinue = true,
  continueLabel,
  isLastStep = false,
  onContinue,
  onPrev,
  footnote,
}: DailyShellProps) {
  const label = continueLabel ?? (isLastStep ? 'Complete the session' : 'Continue')
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div>{children}</div>

      <div aria-hidden="true" className="mt-16 h-px w-full bg-line" />

      <footer className="mt-6 flex flex-wrap items-center gap-6">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="group font-geist text-[15px] text-ink"
          >
            <span className="text-claret">←</span>{' '}
            <span className="relative">
              Previous step
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
          </button>
        )}

        <span
          aria-hidden="true"
          className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-graphite md:inline"
        >
          PAGE {String(step.number).padStart(2, '0')} / 05
        </span>

        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="group relative ml-auto inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">{label}</span>
          <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </footer>
      {footnote && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          {footnote}
        </p>
      )}
    </motion.article>
  )
}
