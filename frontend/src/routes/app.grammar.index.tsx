import { createFileRoute } from '@tanstack/react-router'
import { GrammarPage } from '@/features/grammar/components/GrammarPage'

export const Route = createFileRoute('/app/grammar/')({
  component: GrammarPage,
})
