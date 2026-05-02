import { useQuery } from '@tanstack/react-query'
import type { DiagnosticTest } from '@shared/schemas/diagnostic'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

export const diagnosticTestKey = ['diagnostic', 'test'] as const

export function useDiagnosticTest() {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: diagnosticTestKey,
    queryFn: () => apiFetch<DiagnosticTest>('/diagnostic/test'),
    enabled: Boolean(token),
    staleTime: Infinity, // static seed; never refetch
  })
}
