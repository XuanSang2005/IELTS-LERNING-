import { createFileRoute } from '@tanstack/react-router'
import { AtlasPage } from '@/features/atlas/components/AtlasPage'

export const Route = createFileRoute('/atlas')({
  component: AtlasRoute,
})

function AtlasRoute() {
  return <AtlasPage />
}
