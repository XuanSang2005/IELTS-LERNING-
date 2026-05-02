import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticLanding } from '@/features/diagnostic/components/DiagnosticLanding'

export const Route = createFileRoute('/onboarding/diagnostic/')({
  component: DiagnosticLanding,
})
