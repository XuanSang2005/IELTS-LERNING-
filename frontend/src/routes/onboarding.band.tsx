import { useState } from 'react'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import type { BandLevel } from '@shared/schemas/practice'
import { BandSelector } from '@/features/practice/components/BandSelector'
import { useSetBandMutation } from '@/features/practice/hooks/practice-mutations'
import { useAuthStore } from '@/stores/auth-store'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/onboarding/band')({
  component: OnboardingBandPage,
  validateSearch: searchSchema,
  beforeLoad: ({ location }) => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname + location.searchStr },
      })
    }
  },
})

function OnboardingBandPage() {
  const navigate = useNavigate()
  const { redirect: redirectTo } = Route.useSearch()
  const setBand = useSetBandMutation()
  const [selected, setSelected] = useState<BandLevel | null>(null)

  const handleContinue = async () => {
    if (!selected) return
    await setBand.mutateAsync(selected)
    const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app'
    void navigate({ to: target })
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-[920px] px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ BEFORE YOU BEGIN
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(40px,6vw,72px)] leading-[1.02] tracking-tight text-ink">
          What is your <em className="italic">current</em> working band?
        </h1>
        <p className="mt-5 max-w-[54ch] font-fraunces text-[21px] italic leading-relaxed text-graphite">
          Pick the description that matches you today. Meridian will shape each session to fit. The
          first diagnostic will refine this.
        </p>

        <div className="mt-10">
          <BandSelector selected={selected} onSelect={setSelected} busy={setBand.isPending} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
            A DIAGNOSTIC TEST WILL REFINE THIS · YOU CAN CHANGE YOUR LEVEL ANYTIME
          </p>
          <button
            type="button"
            onClick={() => void handleContinue()}
            disabled={!selected || setBand.isPending}
            className="group relative ml-auto inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">
              {setBand.isPending ? 'Setting your level…' : 'Begin the programme'}
            </span>
            <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
