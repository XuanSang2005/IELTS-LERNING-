import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticWritingStep } from '@/features/diagnostic/components/DiagnosticWritingStep'

export const Route = createFileRoute('/onboarding/diagnostic/writing')({
  component: DiagnosticWritingStep,
})
