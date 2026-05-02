import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticReadingStep } from '@/features/diagnostic/components/DiagnosticReadingStep'

export const Route = createFileRoute('/onboarding/diagnostic/reading')({
  component: DiagnosticReadingStep,
})
