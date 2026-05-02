import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  normalizeForCache,
  type TranslationResponse,
} from '@shared/schemas/translation'
import { apiFetch } from '@/lib/api-client'

/**
 * Imperative translate-on-demand. Caches results in TanStack Query at
 * `['translation', normalized]` so the same word/phrase doesn't re-POST
 * within a session. The backend has its own Mongo cache for cross-session
 * persistence.
 */
export function useTranslate() {
  const qc = useQueryClient()

  return useCallback(
    async (text: string): Promise<TranslationResponse> => {
      const normalized = normalizeForCache(text)
      const cacheKey = ['translation', normalized] as const

      // Session cache hit — return immediately, no network.
      const cached = qc.getQueryData<TranslationResponse>(cacheKey)
      if (cached) return cached

      const fresh = await apiFetch<TranslationResponse>('/translation', {
        method: 'POST',
        body: JSON.stringify({ text }),
      })
      qc.setQueryData<TranslationResponse>(cacheKey, fresh)
      return fresh
    },
    [qc],
  )
}
