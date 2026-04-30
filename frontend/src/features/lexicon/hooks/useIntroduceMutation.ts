import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { BandLevel } from '@shared/schemas/practice'
import type { IntroduceItemDto, SrsCard } from '@shared/schemas/srs'
import { apiFetch } from '@/lib/api-client'

/**
 * Idempotent introduce. Backend guarantees one card per (user, item) via
 * unique compound index, so calling twice is safe — second call returns the
 * existing card.
 */
export function useIntroduceMutation(opts: {
  discipline: LexiconDiscipline
  level: BandLevel
}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: IntroduceItemDto) =>
      apiFetch<SrsCard>('/lexicon/srs/me/introduce', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['lexicon', 'srs', 'today', opts.discipline, opts.level],
      })
    },
  })
}
