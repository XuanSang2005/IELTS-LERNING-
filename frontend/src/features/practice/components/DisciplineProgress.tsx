import { motion } from 'framer-motion'
import { useProfile } from '@/features/practice/hooks/practice-queries'
import type { Discipline } from '@/schemas/practice'

const LABELS: Record<Discipline, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  collocations: 'Collocations',
  linking: 'Linking Devices',
}

const ORDER: Discipline[] = ['grammar', 'vocabulary', 'collocations', 'linking']

export function DisciplineProgress() {
  const profile = useProfile()
  if (!profile) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
    >
      <ul className="space-y-7">
        {ORDER.map((d, i) => {
          const { completed, total } = profile.disciplineProgress[d]
          const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
          return (
            <li key={d}>
              <div className="flex items-baseline justify-between">
                <span className="font-fraunces text-[clamp(22px,2.2vw,28px)] text-ink">
                  {LABELS[d]}
                </span>
                <span className="font-mono text-[clamp(11px,0.9vw,14px)] uppercase tracking-[0.22em] text-graphite">
                  {completed} / {total}
                </span>
              </div>
              <div className="mt-3 h-px w-full bg-line">
                <motion.div
                  className="h-full bg-claret"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </motion.section>
  )
}
