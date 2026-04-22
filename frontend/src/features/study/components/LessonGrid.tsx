import { AnimatePresence, motion } from 'framer-motion'
import { lessons, type Discipline } from '../data/lessons'
import { LessonCard } from './LessonCard'

interface LessonGridProps {
  active: Discipline
  onOpenLesson?: (id: string) => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function LessonGrid({ active, onOpenLesson }: LessonGridProps) {
  const items = lessons[active]

  return (
    <div className="min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: i * 0.04 }}
            >
              <LessonCard lesson={lesson} onOpen={onOpenLesson} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
