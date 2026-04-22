import { useState } from 'react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import type { BandLevel } from '@shared/schemas/practice'
import { AppNav } from '@/features/practice/components/AppNav'
import { BandSelector } from '@/features/practice/components/BandSelector'
import { BAND_OPTIONS } from '@/features/practice/data/band-options'
import { useProfile } from '@/features/practice/hooks/practice-queries'
import { useSetBandMutation } from '@/features/practice/hooks/practice-mutations'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
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

function formatSource(setBy: 'diagnostic' | 'algorithm' | 'user-override'): string {
  switch (setBy) {
    case 'diagnostic':
      return 'SET BY DIAGNOSTIC'
    case 'algorithm':
      return 'SET BY ALGORITHM'
    case 'user-override':
      return 'SET BY YOU'
  }
}

function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const profile = useProfile()
  const setBand = useSetBandMutation()
  const [editing, setEditing] = useState(false)
  const [choice, setChoice] = useState<BandLevel | null>(null)

  const band = profile?.currentBand
  const currentLabel = band
    ? BAND_OPTIONS.find((o) => o.level === band.level)?.label ?? band.level
    : '—'

  const handleSave = async () => {
    if (!choice) return
    await setBand.mutateAsync(choice)
    setEditing(false)
    setChoice(null)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <AppNav />
      <div className="mx-auto max-w-[820px] px-6 py-16 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
          ◆ PROFILE &amp; SETTINGS
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(40px,5vw,64px)] leading-tight text-ink">
          {user?.name ?? 'Candidate'}.
        </h1>
        <p className="mt-3 font-fraunces text-[21px] italic leading-relaxed text-graphite">
          {user?.email}
        </p>

        {/* Band recalibration */}
        <section className="mt-14 border-t border-line pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
                YOUR CURRENT LEVEL
              </p>
              <h2 className="mt-3 font-fraunces text-[36px] leading-none text-ink">
                {currentLabel}
                <em className="italic">.</em>
              </h2>
            </div>
            {band && (
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                  BAND {band.range[0].toFixed(1)} – {band.range[1].toFixed(1)}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {formatSource(band.setBy)} · CONFIDENCE {band.confidence.toUpperCase()}
                </p>
              </div>
            )}
          </div>

          {!editing ? (
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => {
                  setEditing(true)
                  setChoice(band?.level ?? null)
                }}
                className="font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ink px-5 py-2.5 border border-ink transition-colors duration-200 hover:bg-ink hover:text-ivory"
              >
                Recalibrate
              </button>
              <p className="font-fraunces text-[18px] italic text-graphite">
                Your estimate will refine as you work through sessions and tests.
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <p className="font-fraunces text-[21px] italic leading-relaxed text-graphite">
                Choose the description that matches you today.
              </p>
              <div className="mt-6">
                <BandSelector
                  selected={choice}
                  onSelect={setChoice}
                  busy={setBand.isPending}
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={!choice || setBand.isPending}
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-7 py-3 font-geist text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
                  <span className="relative z-10">
                    {setBand.isPending ? 'Saving…' : 'Save level'}
                  </span>
                  <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false)
                    setChoice(null)
                  }}
                  disabled={setBand.isPending}
                  className="group font-geist text-[18px] text-ink"
                >
                  <span className="relative">
                    Keep current level
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <p className="font-fraunces text-[21px] italic leading-relaxed text-graphite">
            The rest of the profile room is still being furnished. Billing and cohort settings will
            live here.
          </p>
          <Link
            to="/app"
            className="group mt-8 inline-flex items-center gap-2 font-geist text-[18px] text-ink"
          >
            <span className="text-claret">←</span>
            <span className="relative">
              Return to the dashboard
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
          </Link>
        </section>
      </div>
    </div>
  )
}
