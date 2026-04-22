import { Link } from '@tanstack/react-router'
import type { Payment } from '@shared/schemas/payment'

/**
 * Terminal-state panel shown in place of the pending layout once a payment
 * reaches `paid`, `expired`, or `failed`. Editorial, not celebratory.
 */
export function PaymentStatePanel({ payment }: { payment: Payment }) {
  if (payment.status === 'paid') return <PaidPanel payment={payment} />
  if (payment.status === 'expired') return <ExpiredPanel />
  if (payment.status === 'failed') return <FailedPanel />
  return null
}

function PaidPanel({ payment }: { payment: Payment }) {
  const settledAt = payment.paidAt
    ? new Date(payment.paidAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—'

  return (
    <section className="border border-sage/40 bg-sage/5 p-10 md:p-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sage">
        § · SETTLEMENT CONFIRMED
      </p>
      <h2 className="mt-4 font-fraunces text-[clamp(32px,4vw,52px)] leading-[1.05] text-ink">
        The library <em className="italic">opens</em>.
      </h2>
      <p className="mt-5 max-w-prose font-fraunces text-[20px] italic leading-relaxed text-graphite">
        Your transfer has settled and Meridian Pro is enabled on your account. A receipt has been
        filed under your profile.
      </p>

      <dl className="mt-8 grid max-w-md gap-3 border-t border-line pt-6 font-geist text-[14px]">
        <div className="flex items-baseline justify-between">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            MEMBERSHIP
          </dt>
          <dd className="text-ink">{payment.productLabel}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            SETTLED
          </dt>
          <dd className="font-mono tabular-nums text-ink">{settledAt}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            REFERENCE
          </dt>
          <dd className="font-mono text-ink">{payment.reference}</dd>
        </div>
      </dl>

      <Link
        to="/app"
        className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
      >
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
        <span className="relative z-10">Continue to the library</span>
        <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </section>
  )
}

function ExpiredPanel() {
  return (
    <section className="border border-line bg-bone p-10 md:p-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        § · SESSION CLOSED
      </p>
      <h2 className="mt-4 font-fraunces text-[clamp(32px,4vw,52px)] leading-[1.05] text-ink">
        The session <em className="italic">expired</em>.
      </h2>
      <p className="mt-5 max-w-prose font-fraunces text-[20px] italic leading-relaxed text-graphite">
        Payment sessions hold for fifteen minutes. Yours has closed without a matching transfer.
        Nothing was charged.
      </p>
      <p className="mt-3 max-w-prose font-geist text-[14px] leading-relaxed text-graphite">
        If you transferred and this page still shows expired, the reference may have been mistyped.
        Reach out and we'll reconcile manually.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          to="/pricing"
          className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
        >
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
          <span className="relative z-10">Open a new session</span>
          <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          to="/app"
          className="group font-geist text-[14px] text-ink"
        >
          <span className="relative">
            Return to the dashboard
            <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
          </span>
        </Link>
      </div>
    </section>
  )
}

function FailedPanel() {
  return (
    <section className="border border-claret/40 bg-claret/5 p-10 md:p-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        § · TRANSFER DECLINED
      </p>
      <h2 className="mt-4 font-fraunces text-[clamp(32px,4vw,52px)] leading-[1.05] text-ink">
        We could not <em className="italic">reconcile</em> this transfer.
      </h2>
      <p className="mt-5 max-w-prose font-fraunces text-[20px] italic leading-relaxed text-graphite">
        The amount or reference did not match what we expected. If money has already left your bank,
        please contact us — nothing will be left unresolved.
      </p>

      <Link
        to="/pricing"
        className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
      >
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
        <span className="relative z-10">Start a new session</span>
        <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </section>
  )
}
