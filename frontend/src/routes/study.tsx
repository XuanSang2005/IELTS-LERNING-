import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Study } from '@/features/study/Study'

const searchSchema = z.object({
  discipline: z.enum(['grammar', 'vocabulary', 'collocations', 'linking']).optional(),
})

export const Route = createFileRoute('/study')({
  component: StudyRoute,
  validateSearch: searchSchema,
})

function StudyRoute() {
  const { discipline } = Route.useSearch()
  return <Study initialDiscipline={discipline} />
}
