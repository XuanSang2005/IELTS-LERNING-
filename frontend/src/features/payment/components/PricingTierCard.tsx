import type { PaymentProduct } from '@shared/schemas/payment'

const vndFormatter = new Intl.NumberFormat('vi-VN')

type TierProduct = PaymentProduct | 'free'

interface Tier {
  product: TierProduct
  label: string
  tagline: string
  priceVnd: number
  cadence: string
  features: readonly string[]
  highlighted?: boolean
  ornament: string
  ctaLabel?: string
}

export function PricingTierCard({
  tier,
  busy,
  onChoose,
}: {
  tier: Tier
  busy: boolean
  onChoose: (product: TierProduct) => void
}) {
  const price = vndFormatter.format(tier.priceVnd)
  const isFree = tier.product === 'free'
  const defaultCta = isFree ? 'Begin your assessment' : 'Continue the programme'
  const busyCta = isFree ? 'Opening…' : 'Opening session…'

  return (
    <article
      className={`relative flex h-full flex-col border p-8 md:p-10 ${
        tier.highlighted
          ? 'border-ink bg-ivory shadow-[0_24px_50px_-30px_rgba(107,31,26,0.35)]'
          : 'border-line bg-ivory'
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-8 bg-claret px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory">
          RECOMMENDED
        </span>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        {tier.ornament}
      </p>
      <h3 className="mt-4 font-fraunces text-[clamp(26px,2.4vw,34px)] leading-[1.05] text-ink">
        {tier.label}
      </h3>
      <p className="mt-3 font-fraunces text-[18px] italic leading-relaxed text-graphite">
        {tier.tagline}
      </p>

      <div className="mt-6 flex flex-nowrap items-baseline gap-2 overflow-hidden border-t border-line pt-6">
        <span className="whitespace-nowrap font-fraunces text-[clamp(28px,3vw,44px)] leading-none text-ink">
          {price}
        </span>
        <span className="whitespace-nowrap font-mono text-[12px] text-graphite">₫</span>
        <span className="ml-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          / {tier.cadence}
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-3 font-geist text-[14px] leading-relaxed text-ink">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="text-claret" aria-hidden>
              §
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onChoose(tier.product)}
        disabled={busy}
        className="group relative mt-8 inline-flex items-center justify-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
        <span className="relative z-10">
          {busy ? busyCta : (tier.ctaLabel ?? defaultCta)}
        </span>
      </button>
    </article>
  )
}

export type { Tier }
