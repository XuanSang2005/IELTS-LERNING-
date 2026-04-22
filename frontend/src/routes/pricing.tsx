import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import type { PaymentProduct, Pricing } from '@shared/schemas/payment'
import {
  useCreatePaymentMutation,
  usePricing,
} from '@/features/payment/hooks/payment-queries'
import { PricingTierCard, type Tier } from '@/features/payment/components/PricingTierCard'
import { Nav } from '@/features/landing/components/Nav'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})

function buildTiers(pricing: Pricing): Tier[] {
  return [
    {
      product: 'free',
      ornament: 'PL. 00 · TRIAL',
      label: 'Free',
      tagline: 'Seven days, three daily loops, the full library — to see if the method suits you.',
      priceVnd: 0,
      cadence: 'forever',
      ctaLabel: 'Begin your assessment',
      features: [
        'Seven-day trial with every Pro feature unlocked',
        'Unlimited daily loops (basic mode) after the trial',
        'Reading and Listening practice tests, answers only',
        'Access to the method and the four disciplines',
        'No card required, no rolling subscription',
      ],
    },
    {
      product: 'pro-monthly',
      ornament: 'PL. 01 · MONTHLY',
      label: pricing.pro.monthly.label,
      tagline: 'Continue at your own cadence. Cancel whenever the programme ends for you.',
      priceVnd: pricing.pro.monthly.vnd,
      cadence: 'month',
      features: [
        'AI-graded Writing with examiner-style feedback',
        'AI-graded Speaking with pronunciation notes',
        'Full diagnostic and personalised twelve-week arc',
        'Friday livestream with the founder (Band 8.5)',
        'Complete spaced repetition, notebook, and error log',
      ],
    },
    {
      product: 'pro-cohort',
      ornament: 'PL. 02 · COHORT IV',
      label: pricing.pro.cohort.label,
      tagline: 'Fourteen candidates, twelve weeks, one library. Enrolment closes when it fills.',
      priceVnd: pricing.pro.cohort.vnd,
      cadence: 'cohort',
      highlighted: true,
      features: [
        'Everything in Monthly, for the full twelve-week arc',
        'Cohort median progress shown against your own',
        'Priority in the Friday Q&A segment',
        'Guaranteed seat — seats are capped at fourteen',
        'No rolling subscription: one fee, one programme',
      ],
    },
  ]
}

function PricingPage() {
  const token = useAuthStore((s) => s.token)
  const navigate = useNavigate()
  const pricing = usePricing()
  const createPayment = useCreatePaymentMutation()
  const [error, setError] = useState<string | null>(null)

  const handleChoose = async (product: PaymentProduct | 'free') => {
    setError(null)

    // Free tier — signed-in users jump straight into the library, guests to
    // signup. No payment session opens.
    if (product === 'free') {
      if (token) void navigate({ to: '/app' })
      else void navigate({ to: '/signup', search: { redirect: '/app' } })
      return
    }

    // Must be authenticated to open a payment session (the backend reads
    // `userId` from the JWT). Unauthenticated users bounce to /signup with
    // a redirect back here.
    if (!token) {
      void navigate({
        to: '/signup',
        search: { redirect: `/pricing?product=${product}` },
      })
      return
    }

    try {
      const payment = await createPayment.mutateAsync({ product })
      void navigate({ to: '/pay/$paymentId', params: { paymentId: payment.id } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not open a payment session. Try again.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Nav minimal />

      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-16 md:px-10 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
          § I · MEMBERSHIP
        </p>
        <h1 className="mt-4 font-fraunces text-[clamp(44px,6vw,80px)] leading-[0.95] -tracking-[0.02em] text-ink">
          Continue the <em className="italic">programme</em>.
        </h1>
        <p className="mt-6 max-w-2xl font-fraunces text-[clamp(18px,1.6vw,22px)] italic leading-relaxed text-graphite">
          Meridian Pro opens every part of the library — AI-graded Writing and Speaking, the
          twelve-week personalised arc, and the Friday livestream with the founder.
        </p>

        {pricing.isLoading && (
          <p className="mt-12 font-fraunces text-[18px] italic text-graphite">
            Pricing is being prepared…
          </p>
        )}
        {pricing.isError && (
          <p className="mt-12 font-fraunces text-[18px] italic text-claret">
            Pricing could not be reached. Please try again in a moment.
          </p>
        )}

        {pricing.data && (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {buildTiers(pricing.data).map((tier) => (
              <PricingTierCard
                key={tier.product}
                tier={tier}
                busy={createPayment.isPending}
                onChoose={handleChoose}
              />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-8 border border-claret/40 bg-claret/5 p-4 font-geist text-[14px] text-claret">
            {error}
          </p>
        )}

        <section className="mt-20 border-t border-line pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
            § II · EDITORIAL NOTE
          </p>
          <p className="mt-4 max-w-2xl font-fraunces text-[18px] italic leading-relaxed text-graphite">
            Payment is by Vietnamese bank transfer, handled through Casso. We reconcile within
            seconds of the transfer clearing — no cards, no processor fees passed back to you.
          </p>
          <Link
            to="/method"
            className="group mt-8 inline-flex items-center gap-2 font-geist text-[14px] text-ink"
          >
            <span className="relative">
              Read the method first
              <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
            </span>
            <span className="text-[13px] text-claret transition-all duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </section>
      </main>
    </div>
  )
}
