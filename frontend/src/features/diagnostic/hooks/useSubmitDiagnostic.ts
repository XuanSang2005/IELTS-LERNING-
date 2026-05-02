import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  DiagnosticResult,
  DiagnosticSubmissionDto,
} from '@shared/schemas/diagnostic'
import { apiFetch } from '@/lib/api-client'
import { practiceStateKey } from '@/features/practice/hooks/practice-queries'

export const diagnosticResultKey = ['diagnostic', 'result'] as const

export function useSubmitDiagnostic() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: DiagnosticSubmissionDto) =>
      apiFetch<DiagnosticResult>('/diagnostic/submit', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: (result) => {
      // Cache the result for the result screen.
      qc.setQueryData(diagnosticResultKey, result)
      // Profile changed (currentBand + diagnostic fields) — invalidate.
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}

export function useSkipDiagnostic() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => apiFetch<{ skippedAt: string }>('/diagnostic/skip', { method: 'POST' }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: practiceStateKey })
    },
  })
}
