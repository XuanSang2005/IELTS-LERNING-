import type { Payment } from '@shared/schemas/payment'

const vndFormatter = new Intl.NumberFormat('vi-VN')

export function OrderSummary({ payment }: { payment: Payment }) {
  return (
    <section className="border border-line bg-bone/40 p-6 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        § I · ORDER SUMMARY
      </p>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <h2 className="font-fraunces text-[clamp(24px,2.2vw,32px)] italic leading-none text-ink">
          {payment.productLabel}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
          REF · {payment.reference}
        </span>
      </div>

      <dl className="mt-5 space-y-2 font-geist text-[14px] text-graphite">
        <div className="flex items-baseline justify-between gap-4">
          <dt>Subtotal</dt>
          <dd className="font-mono tabular-nums text-ink">
            {vndFormatter.format(payment.amountVnd)} ₫
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt>Transfer fee</dt>
          <dd className="font-mono tabular-nums text-ink">0 ₫</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
          TOTAL DUE
        </span>
        <span className="font-fraunces text-[clamp(28px,3vw,40px)] leading-none text-claret">
          {vndFormatter.format(payment.amountVnd)}
          <span className="ml-1 text-[20px] text-graphite">₫</span>
        </span>
      </div>
    </section>
  )
}
