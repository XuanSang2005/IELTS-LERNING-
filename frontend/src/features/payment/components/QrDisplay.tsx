import { useState } from 'react'
import type { Payment } from '@shared/schemas/payment'

/**
 * Renders the pre-signed VietQR image. The backend returns the full URL
 * (img.vietqr.io/...) so the frontend never handles bank credentials or
 * talks to Casso directly — it just <img>s a static URL.
 *
 * If the image fails to load (rare: VietQR CDN hiccup, no network), we
 * fall back to the bank-transfer details panel that sits next to this —
 * users can always transfer manually.
 */
export function QrDisplay({ payment }: { payment: Payment }) {
  const [failed, setFailed] = useState(false)
  const dimmed = payment.status !== 'pending'

  return (
    <figure className="relative">
      <figcaption className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        PL. 01 · SCAN TO PAY
      </figcaption>

      <div
        className={`relative aspect-square w-full border border-line bg-ivory p-6 transition-opacity duration-300 md:p-8 ${
          dimmed ? 'opacity-40 grayscale' : ''
        }`}
      >
        {/* Editorial corner crop marks */}
        <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-ink/40" aria-hidden />
        <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-ink/40" aria-hidden />
        <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-ink/40" aria-hidden />
        <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-ink/40" aria-hidden />

        {failed ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-fraunces text-[20px] italic text-graphite">
              The QR preview could not load.
            </p>
            <p className="mt-3 font-geist text-[14px] text-graphite">
              Transfer manually with the bank details to the right.
            </p>
          </div>
        ) : (
          <img
            src={payment.qrUrl}
            alt={`VietQR for ${payment.productLabel}. Reference ${payment.reference}.`}
            onError={() => setFailed(true)}
            loading="eager"
            className="h-full w-full object-contain"
          />
        )}
      </div>

      <p className="mt-4 text-center font-fraunces text-[17px] italic leading-snug text-graphite">
        Open any Vietnamese banking app, choose <em>Quét QR</em>, aim at the square above. Bank,
        account, amount, and reference auto-fill.
      </p>
    </figure>
  )
}
