import { Link, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import type { DiagnosticResult } from '@shared/schemas/diagnostic'
import type { BandLevel } from '@shared/schemas/practice'
import { useDiagnosticState } from '../hooks/useDiagnosticState'
import { diagnosticResultKey } from '../hooks/useSubmitDiagnostic'
import { formatBand } from '../utils/grade-mapping'
import { DiagnosticProgressRail } from './primitives/DiagnosticProgressRail'
import { DiagnosticGradingScreen } from './DiagnosticGradingScreen'

const ease = [0.22, 1, 0.36, 1] as const

const LEVEL_NAME: Record<BandLevel, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  mastery: 'Mastery',
}

const LEVEL_DESCRIPTOR: Record<BandLevel, string> = {
  foundation:
    'Partial command. Cope with overall meaning in most situations. Many mistakes; basic communication.',
  intermediate:
    'Effective command. Inaccuracies and misunderstandings, but generally understands and uses fairly complex language.',
  advanced:
    'Operational command. Misunderstandings in unfamiliar situations; handles complex language well.',
  mastery:
    'Fully operational command. Occasional unsystematic inaccuracies; handles unfamiliar topics well.',
}

const SKILL_LABELS: ReadonlyArray<{ key: 'listening' | 'reading' | 'writing' | 'speaking'; label: string }> = [
  { key: 'listening', label: 'LISTENING' },
  { key: 'reading', label: 'READING' },
  { key: 'writing', label: 'WRITING' },
  { key: 'speaking', label: 'SPEAKING' },
]

export function DiagnosticResultScreen() {
  const navigate = useNavigate()
  const reset = useDiagnosticState((s) => s.reset)
  // Subscribe to the cache so the page re-renders the moment the submit
  // mutation populates the result. Disabled queryFn = read-only subscription.
  const { data: result } = useQuery<DiagnosticResult | null>({
    queryKey: diagnosticResultKey,
    queryFn: () => null,
    enabled: false,
    initialData: null,
  })

  // Mutation is in-flight — show grading screen.
  if (!result) return <DiagnosticGradingScreen />

  const handleBegin = () => {
    reset()
    void navigate({ to: '/app' })
  }

  const skillBand = (k: (typeof SKILL_LABELS)[number]['key']) => {
    if (k === 'listening') return result.listening.band
    if (k === 'reading') return result.reading.band
    if (k === 'writing') return result.writing.band
    return result.speakingEstimated
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 py-12 md:py-16">
      <DiagnosticProgressRail active={4} />

      <div className="mt-12 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret"
        >
          ◆ DIAGNOSTIC · COMPLETE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-6 font-fraunces text-[clamp(56px,8vw,120px)] font-normal leading-[0.95] tracking-[-0.025em] text-ink"
        >
          <span className="text-claret">{formatBand(result.overallBand - 0.5)}</span>
          <span className="text-graphite"> – </span>
          <span className="text-claret">{formatBand(result.overallBand + 0.5)}</span>
          <span className="text-claret">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-6 max-w-[60ch] font-fraunces text-[18px] italic leading-relaxed text-graphite md:text-[20px]"
        >
          {LEVEL_DESCRIPTOR[result.recommendedLevel]}
        </motion.p>
      </div>

      {/* Per-skill mini strip */}
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.42 }}
        className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 border-y border-line md:grid-cols-4"
      >
        {SKILL_LABELS.map((s, i) => {
          const isLastInRow = i === SKILL_LABELS.length - 1
          return (
            <li
              key={s.key}
              className={`flex flex-col items-center gap-2 px-5 py-6 ${
                !isLastInRow ? 'md:border-r md:border-line' : ''
              } ${i < SKILL_LABELS.length - 2 ? 'border-b border-line md:border-b-0' : ''}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-claret">
                {s.label}
              </span>
              <span className="font-fraunces text-[36px] leading-none text-ink md:text-[44px]">
                {formatBand(skillBand(s.key))}
              </span>
              {s.key === 'speaking' && (
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-graphite/70">
                  ESTIMATED
                </span>
              )}
            </li>
          )
        })}
      </motion.ul>

      {/* Recommended programme */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        className="mx-auto mt-12 max-w-[680px] border border-line bg-bone/30 p-8 text-center md:p-10"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite">
          ◆ YOUR PROGRAMME
        </p>
        <h3 className="mt-4 font-fraunces text-[28px] leading-tight text-ink md:text-[32px]">
          We've placed you in <em className="not-italic text-claret">{LEVEL_NAME[result.recommendedLevel]}</em>.
        </h3>
        <p className="mt-3 font-fraunces text-[16px] italic leading-snug text-graphite md:text-[17px]">
          Twelve weeks. Four phases. Today's first lesson is ready.
        </p>

        <button
          type="button"
          onClick={handleBegin}
          className="group relative mt-7 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
        >
          <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">Begin the programme</span>
          <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="mt-10 text-center font-fraunces text-[14px] italic leading-snug text-graphite/70 md:text-[15px]"
      >
        You can recalibrate later from the dashboard.{' '}
        <Link to="/method" className="text-claret underline-offset-4 hover:underline">
          Read the method
        </Link>
        .
      </motion.p>
    </div>
  )
}
