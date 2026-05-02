import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArchiveStrip } from '@/features/dashboard/components/ArchiveStrip'
import { BandScale } from '@/features/dashboard/components/BandScale'
import { DashboardHero } from '@/features/dashboard/components/DashboardHero'
import { DisciplineGrid } from '@/features/dashboard/components/DisciplineGrid'
import { PhaseStrip } from '@/features/dashboard/components/PhaseStrip'
import { TodaySession } from '@/features/dashboard/components/TodaySession'
import { OrnamentDivider } from '@/features/lexicon/components/primitives/OrnamentDivider'
import {
  useDueItems,
  usePracticeState,
  useProfile,
  useTodayLog,
} from '@/features/practice/hooks/practice-queries'

export const Route = createFileRoute('/app/')({
  component: Dashboard,
})

function Dashboard() {
  const { isPending, isError } = usePracticeState()
  const profile = useProfile()
  const dueCount = useDueItems().length
  const todayLog = useTodayLog()

  if (isPending || !profile) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-10 pb-20 pt-11">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="font-fraunces text-[36px] italic text-graphite"
        >
          Opening the notebook…
        </motion.p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-10 pb-20 pt-11">
        <p className="font-fraunces text-[28px] italic text-claret">
          The library is momentarily out of reach. Please refresh.
        </p>
      </div>
    )
  }

  const firstName = profile.name.split(' ')[0]
  const stepsDone = todayLog.stepsCompleted.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full pb-20"
    >
      <DashboardHero
        firstName={firstName}
        weekNumber={profile.currentWeek}
        dueCount={dueCount}
      />
      <DashboardSeparator />
      <PhaseStrip profile={profile} />
      <DashboardSeparator />
      <TodaySession
        level={profile.currentBand.level}
        stepsDone={stepsDone}
        weekNumber={profile.currentWeek}
      />
      <DashboardSeparator />
      <DisciplineGrid profile={profile} />
      <DashboardSeparator />
      <BandScale profile={profile} />
      <DashboardSeparator />
      <ArchiveStrip />
    </motion.div>
  )
}

function DashboardSeparator() {
  return (
    <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 xl:px-14">
      <OrnamentDivider className="my-0" />
    </div>
  )
}
