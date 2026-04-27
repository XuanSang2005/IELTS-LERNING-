import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { DailyPage } from '@/features/daily/components/DailyPage'

const searchSchema = z.object({
  step: z
    .number()
    .int()
    .min(1)
    .max(5)
    .catch(1)
    .transform((n) => n as 1 | 2 | 3 | 4 | 5),
})

export const Route = createFileRoute('/app/session/')({
  component: DailyPage,
  validateSearch: searchSchema,
})
