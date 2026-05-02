import { useState } from 'react'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import type { BandLevel } from '@shared/schemas/practice'
import { BandSelector } from '@/features/practice/components/BandSelector'
import { useSkipDiagnostic } from '@/features/diagnostic/hooks/useSubmitDiagnostic'
import { useProfile } from '@/features/practice/hooks/practice-queries'
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
  const skipDiagnostic = useSkipDiagnostic()
  const profile = useProfile()
  const [selected, setSelected] = useState<BandLevel | null>(null)

  const handleContinue = async () => {
    if (!selected) return
    await setBand.mutateAsync(selected)
    // Mark the diagnostic as skipped so the /app gate doesn't re-prompt.
    // Safe to call even if user has previously completed (won't unset
    // diagnosticCompletedAt — both fields can coexist).
    if (!profile?.diagnosticCompletedAt && !profile?.diagnosticSkippedAt) {
      try {
        await skipDiagnostic.mutateAsync()
      } catch {
        // Non-fatal; gate will re-prompt on next visit.
      }
    }
    const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app'
    void navigate({ to: target })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-ivory">
      {/* Ornamental Roman numeral — editorial "page number" in the corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 select-none font-fraunces text-[22vw] italic leading-none text-line/25 md:-right-16 md:top-16 md:text-[18vw]"
      >
        IV
      </span>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
        {/* Top meta rail */}
        <div className="flex items-center justify-between border-b border-line pb-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-claret">
            CH. I · Orientation
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-graphite">
            № 003
          </p>
        </div>

        {/* Two-column spread — chapter identity left, ladder right */}
        <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-[minmax(320px,420px)_1fr] md:gap-16 xl:gap-24">
          {/* ── Left · Chapter frame ─────────────────────────────────── */}
          <aside>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
              ◆ Before you begin
            </p>
            <h1 className="mt-6 font-fraunces text-[clamp(40px,5.2vw,68px)] leading-[0.98] tracking-[-0.01em] text-ink">
              What is your{' '}
              <span className="relative inline-block italic">
                current
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-claret"
                />
              </span>{' '}
              working band?
            </h1>

            <div className="mt-10 border-t border-line pt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
                ◆ The ladder
              </p>
              <p className="mt-4 font-fraunces text-[19px] italic leading-relaxed text-graphite md:text-[20px]">
                Locate yourself honestly. The first diagnostic refines the estimate. You may
                change your level whenever the work demands it.
              </p>
            </div>
          </aside>

          {/* ── Right · Band ladder ──────────────────────────────────── */}
          <section aria-labelledby="band-ladder">
            <div className="mb-5 flex items-baseline justify-between">
              <p
                id="band-ladder"
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-graphite"
              >
                The four working bands · I — IV
              </p>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-line md:inline">
                Ascending
              </p>
            </div>

            <BandSelector
              selected={selected}
              onSelect={setSelected}
              busy={setBand.isPending}
            />
          </section>
        </div>

        {/* ── Commit rail ─────────────────────────────────────────────── */}
        <footer className="mt-16 border-t-2 border-line pt-8 md:mt-20 md:pt-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[52ch] font-geist text-[14px] leading-relaxed text-graphite md:text-[15px]">
              A diagnostic test will refine your band range within the first week. Nothing is
              locked.
            </p>

            {selected ? (
              <button
                type="button"
                onClick={() => void handleContinue()}
                disabled={setBand.isPending}
                className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                <span className="relative z-10">
                  {setBand.isPending ? 'Setting your level…' : 'Begin the programme'}
                </span>
                <span className="relative z-10 text-[14px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            ) : (
              <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.3em] text-line">
                Choose a band above to continue
              </p>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
