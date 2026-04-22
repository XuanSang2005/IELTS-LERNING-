import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import type { WeekNumber } from '@shared/schemas/grammar-plan'
import { WeekPage } from '@/features/grammar/components/WeekPage'

const SearchSchema = z.object({
  tab: z.enum(['lesson', 'practice', 'review']).optional(),
})

export const Route = createFileRoute('/app/grammar/$week')({
  validateSearch: SearchSchema,
  beforeLoad: ({ params }) => {
    const n = Number(params.week)
    if (!Number.isInteger(n) || n < 1 || n > 12) {
      throw redirect({ to: '/app/grammar' })
    }
  },
  component: GrammarWeekRoute,
})

function GrammarWeekRoute() {
  const { week } = Route.useParams()
  const { tab } = Route.useSearch()
  return <WeekPage week={Number(week) as WeekNumber} initialTab={tab ?? 'lesson'} />
}
