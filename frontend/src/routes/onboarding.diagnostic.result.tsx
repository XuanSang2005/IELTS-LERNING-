import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticResultScreen } from '@/features/diagnostic/components/DiagnosticResultScreen'

export const Route = createFileRoute('/onboarding/diagnostic/result')({
  component: DiagnosticResultScreen,
})
