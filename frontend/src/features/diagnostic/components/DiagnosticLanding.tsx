import { Link, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useDiagnosticState } from '../hooks/useDiagnosticState'
import { useSkipDiagnostic } from '../hooks/useSubmitDiagnostic'

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Diagnostic intro page — explains the flow + offers a skip path. */
export function DiagnosticLanding() {
  const navigate = useNavigate()
  const start = useDiagnosticState((s) => s.start)
  const reset = useDiagnosticState((s) => s.reset)
  const skip = useSkipDiagnostic()

  const handleBegin = () => {
    reset()
    start()
    void navigate({ to: '/onboarding/diagnostic/listening' })
  }

  const handleSkip = async () => {
    await skip.mutateAsync()
    void navigate({ to: '/onboarding/band', search: { redirect: '/app' } })
  }

  return (
    <div className="mx-auto flex w-full max-w-[920px] flex-col items-center px-6 py-16 text-center md:py-20">
      <FadeUp>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
          <span className="text-claret">◆ ORIENTATION</span>
          <span className="mx-2 text-line">·</span>
          <span className="text-graphite">CH. I — DIAGNOSTIC</span>
        </p>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h1 className="mt-6 font-fraunces text-[clamp(40px,5vw,72px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
          Find your working band
          <span className="text-claret">.</span>
        </h1>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p className="mt-6 max-w-[60ch] font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]">
          Thirty minutes. Five listening questions, five reading questions, one short essay. The
          examiner reads your writing within minutes. We use the result to place you in the right
          twelve-week programme.
        </p>
      </FadeUp>

      <FadeUp delay={0.3}>
        <ul className="mt-10 grid max-w-[640px] grid-cols-1 gap-px bg-line sm:grid-cols-3">
          <li className="bg-ivory px-5 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">§ I</p>
            <p className="mt-2 font-fraunces text-[18px] text-ink">Listening</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              5 Q · ~8 MIN
            </p>
          </li>
          <li className="bg-ivory px-5 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">§ II</p>
            <p className="mt-2 font-fraunces text-[18px] text-ink">Reading</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              5 Q · ~10 MIN
            </p>
          </li>
          <li className="bg-ivory px-5 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">§ III</p>
            <p className="mt-2 font-fraunces text-[18px] text-ink">Writing</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              150+ WORDS · ~12 MIN
            </p>
          </li>
        </ul>
      </FadeUp>

      <FadeUp delay={0.42}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
          <button
            type="button"
            onClick={handleBegin}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Begin diagnostic</span>
            <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={() => void handleSkip()}
            disabled={skip.isPending}
            className="group inline-flex items-center gap-2 font-geist text-[14px] text-ink disabled:opacity-50"
          >
            <span className="relative">
              I already know my band — pick manually
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret">
              ↗
            </span>
          </button>
        </div>
      </FadeUp>

      <FadeUp delay={0.55}>
        <p className="mt-10 font-fraunces text-[14px] italic leading-snug text-graphite/70 md:text-[15px]">
          You can recalibrate later from the dashboard.{' '}
          <Link to="/method" className="text-claret underline-offset-4 hover:underline">
            Read the method
          </Link>
          .
        </p>
      </FadeUp>
    </div>
  )
}
