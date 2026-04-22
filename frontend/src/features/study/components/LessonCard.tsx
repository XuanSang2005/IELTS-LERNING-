import { motion } from 'framer-motion'
import type { Lesson } from '../data/lessons'

interface LessonCardProps {
  lesson: Lesson
  onOpen?: (id: string) => void
}

export function LessonCard({ lesson, onOpen }: LessonCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(lesson.id)}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group flex h-full cursor-pointer flex-col border border-line bg-bone p-6 text-left transition-shadow duration-200 hover:shadow-[0_20px_40px_-15px_rgba(107,31,26,0.15)]"
    >
      {/* Top row: number + claret diamond */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
          {lesson.number}
        </span>
        <span aria-hidden="true" className="text-[12px] text-claret">
          ◆
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 font-fraunces text-[24px] leading-[1.15] text-ink">
        {lesson.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-3 font-geist text-[18px] leading-relaxed text-graphite">
        {lesson.excerpt}
      </p>

      {/* Hairline + meta + arrow */}
      <div className="mt-auto pt-6">
        <div className="border-t border-line pt-4" />
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
            {lesson.duration} · {lesson.level}
          </span>
          <span className="text-[18px] text-claret transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </motion.button>
  )
}
