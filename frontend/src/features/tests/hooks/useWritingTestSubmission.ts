import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  CreateWritingTestSubmissionDto,
  PersistedWritingTestSubmission,
} from '@shared/schemas/test-ai-submission'
import { apiFetch } from '@/lib/api-client'

const submissionKey = (id: string) => ['test-submission', id] as const

/**
 * Poll a Writing test submission until it reaches a terminal status
 * (graded or failed). React Query drives the 2-second tick.
 */
export function useWritingTestSubmissionQuery(id: string | undefined) {
  return useQuery({
    queryKey: submissionKey(id ?? '_'),
    enabled: Boolean(id),
    queryFn: () => apiFetch<PersistedWritingTestSubmission>(`/test-submissions/${id}`),
    refetchInterval: (query) => {
      const data = query.state.data
      if (!data) return 2000
      return data.status === 'submitted' || data.status === 'grading' ? 2000 : false
    },
    refetchOnWindowFocus: false,
  })
}

export function useSubmitWritingTestMutation() {
  return useMutation({
    mutationFn: (dto: CreateWritingTestSubmissionDto) =>
      apiFetch<PersistedWritingTestSubmission>('/test-submissions/writing', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
  })
}

export function useRegradeWritingTestMutation() {
  return useMutation({
    mutationFn: (submissionId: string) =>
      apiFetch<PersistedWritingTestSubmission>(
        `/test-submissions/${submissionId}/regrade`,
        { method: 'POST' },
      ),
  })
}
