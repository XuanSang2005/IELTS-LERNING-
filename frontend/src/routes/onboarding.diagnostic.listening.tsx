import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticListeningStep } from '@/features/diagnostic/components/DiagnosticListeningStep'

export const Route = createFileRoute('/onboarding/diagnostic/listening')({
  component: DiagnosticListeningStep,
})
