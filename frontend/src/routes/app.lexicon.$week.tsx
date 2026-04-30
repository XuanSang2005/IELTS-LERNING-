import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import { WeekPage } from '@/features/lexicon/components/WeekPage'
import { useLexiconLevel } from '@/stores/lexicon-level-store'

const searchSchema = z.object({
  discipline: LexiconDisciplineSchema.optional().default('vocabulary'),
  day: z.coerce.number().int().min(1).max(7).optional().default(1),
  tab: z.enum(['lesson', 'practice', 'review', 'week-quiz']).optional().default('lesson'),
})

const paramsSchema = z.object({
  week: z.string(),
})

export const Route = createFileRoute('/app/lexicon/$week')({
  component: WeekRoute,
  validateSearch: searchSchema,
  parseParams: (raw) => paramsSchema.parse(raw),
})

function WeekRoute() {
  const { week } = Route.useParams()
  const search = Route.useSearch()
  const levelByDiscipline = useLexiconLevel((s) => s.byDiscipline)
  const level = levelByDiscipline[search.discipline]
  const weekNumber = Number(week)

  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 12) {
    return (
      <div className="mx-auto w-full max-w-[1720px] px-6 py-20 md:px-10 xl:px-14">
        <p className="font-fraunces text-[24px] italic text-claret">
          Week {week} is out of range. Return to the roadmap.
        </p>
      </div>
    )
  }

  return (
    <WeekPage
      discipline={search.discipline}
      level={level}
      week={weekNumber}
      day={search.day}
      tab={search.tab}
    />
  )
}
