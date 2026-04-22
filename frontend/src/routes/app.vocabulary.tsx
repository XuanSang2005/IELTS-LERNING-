import { createFileRoute } from '@tanstack/react-router'
import { VocabularyPage } from '@/features/vocabulary/components/VocabularyPage'

export const Route = createFileRoute('/app/vocabulary')({
  component: VocabularyPage,
})
