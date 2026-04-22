import { useState } from 'react'
import { Nav } from '@/features/landing/components/Nav'
import { StudyHeader } from './components/StudyHeader'
import { DisciplineTabs } from './components/DisciplineTabs'
import { FeaturedLesson } from './components/FeaturedLesson'
import { LessonGrid } from './components/LessonGrid'
import { LibrarySidebar } from './components/LibrarySidebar'
import type { Discipline } from './data/lessons'

const FOOTER_ITEMS = [
  { label: 'EDITION', value: '№ 08' },
  { label: 'PUBLISHED', value: 'WEEKLY' },
  { label: 'COHORT', value: 'IV' },
  { label: 'OFFICE', value: 'LONDON — MMXXIV' },
]

interface StudyProps {
  initialDiscipline?: Discipline
}

export function Study({ initialDiscipline }: StudyProps = {}) {
  const [active, setActive] = useState<Discipline>(initialDiscipline ?? 'linking')

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <StudyHeader />
      <DisciplineTabs active={active} onChange={setActive} />
      <FeaturedLesson />

      {/* Main content: grid + sidebar */}
      <div className="mx-auto w-full max-w-[1720px] px-6 pb-24 md:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LessonGrid active={active} />
          </div>
          <div className="lg:col-span-4">
            <LibrarySidebar />
          </div>
        </div>
      </div>

      {/* Footer trust strip */}
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 md:justify-between md:px-10 xl:px-14">
          {FOOTER_ITEMS.map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden="true" className="hidden text-[10px] text-claret md:inline">
                  ◆
                </span>
              )}
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                  {label}
                </span>
                <span className="mt-0.5 block font-fraunces text-[20px] text-ink">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
