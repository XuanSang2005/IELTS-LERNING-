import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { LexiconDisciplineSchema } from '@shared/schemas/lexicon'
import { LexiconPage } from '@/features/lexicon/components/LexiconPage'

const searchSchema = z.object({
  discipline: LexiconDisciplineSchema.optional(),
})

export const Route = createFileRoute('/app/lexicon/')({
  component: LexiconPage,
  validateSearch: searchSchema,
})
