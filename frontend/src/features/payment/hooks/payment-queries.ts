import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  CreatePaymentDto,
  Payment,
  PaymentStatusResponse,
  Pricing,
} from '@shared/schemas/payment'
import { apiFetch } from '@/lib/api-client'
import { useAuthStore } from '@/stores/auth-store'

/** Public pricing read from server env. Never hardcode on the client. */
export function usePricing() {
  return useQuery({
    queryKey: ['pricing'],
    queryFn: () => apiFetch<Pricing>('/pricing'),
    staleTime: 5 * 60_000,
  })
}

/** Start a new payment session. */
export function useCreatePaymentMutation() {
  return useMutation({
    mutationFn: (dto: CreatePaymentDto) =>
      apiFetch<Payment>('/payments', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
  })
}

/** Full payment detail — fetched once when the page loads. */
export function usePayment(id: string | null) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => apiFetch<Payment>(`/payments/${id}`),
    enabled: Boolean(token) && !!id,
    staleTime: Infinity, // detail doesn't change — status is polled separately
  })
}

/**
 * Lightweight status poller. Re-fetches every `intervalMs` while status is
 * still `pending`; stops polling once terminal (paid / failed / expired).
 *
 * Set `intervalMs` to 0 to poll only on manual refetch.
 */
export function usePaymentStatus(id: string | null, intervalMs = 4000) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['payment', id, 'status'],
    queryFn: () => apiFetch<PaymentStatusResponse>(`/payments/${id}/status`),
    enabled: Boolean(token) && !!id,
    refetchInterval: (q) => {
      const data = q.state.data as PaymentStatusResponse | undefined
      if (!data) return intervalMs
      if (data.status === 'pending') return intervalMs
      return false
    },
    refetchIntervalInBackground: false,
  })
}

/** Manual refresh — invalidates both detail and status queries. */
export function useRefreshPayment() {
  const qc = useQueryClient()
  return (id: string) => {
    void qc.invalidateQueries({ queryKey: ['payment', id] })
  }
}
