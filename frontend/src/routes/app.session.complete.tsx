import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useSessionBlueprint } from '@/features/session/hooks/use-session-blueprint'
import { OrnamentFeather } from '@/components/ornaments/OrnamentFeather'

export const Route = createFileRoute('/app/session/complete')({
  component: SessionCompletePage,
})

function SessionCompletePage() {
  const blueprint = useSessionBlueprint()

  return (
    <div className="relative mx-auto max-w-[720px] px-6 py-24 md:px-10">
      <OrnamentFeather className="absolute -right-8 top-20 hidden h-[260px] w-[160px] rotate-[14deg] text-claret opacity-40 md:block" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ SESSION · COMPLETE
        </p>
        <h1 className="mt-5 font-fraunces text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-tight text-ink">
          {blueprint
            ? `${blueprint.totalMinutes} minutes, ${blueprint.steps.length} steps.`
            : 'Session complete.'}
        </h1>
        <p className="mt-6 max-w-[54ch] font-fraunces text-[24px] italic leading-relaxed text-graphite">
          Return <em className="italic">tomorrow</em>.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-line pt-8">
          <Link
            to="/app"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Return to the dashboard</span>
            <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            to="/app/grammar"
            className="group font-geist text-[18px] text-ink"
          >
            <span className="relative">
              Open the grammar room
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="ml-2 text-claret transition-transform duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
