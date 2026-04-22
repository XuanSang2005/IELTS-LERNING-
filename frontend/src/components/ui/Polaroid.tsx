import { useState } from 'react'

type Tint = 'claret' | 'sage'
type Orientation = 'portrait' | 'landscape'

interface PolaroidProps {
  src: string
  alt: string
  tint: Tint
  edition: string
  orientation?: Orientation
  rotate?: number
  className?: string
}

const TINT_BG: Record<Tint, string> = {
  claret: 'bg-claret',
  sage: 'bg-sage',
}

const ASPECT: Record<Orientation, string> = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[5/4]',
}

const GRAIN_DATA_URI =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.28 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

export function Polaroid({
  src,
  alt,
  tint,
  edition,
  orientation = 'portrait',
  rotate = 0,
  className = '',
}: PolaroidProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {/* Backing frame — creates stacked-photo depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 bg-ink-warm"
      />

      {/* Front frame (paper) */}
      <figure className="relative bg-[#F2EDE0] p-3 pb-[64px] shadow-[0_18px_38px_-14px_rgba(107,31,26,0.45)]">
        <div className={`relative ${ASPECT[orientation]} w-full overflow-hidden ${TINT_BG[tint]}`}>
          {!failed ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover mix-blend-multiply [filter:grayscale(0.9)_sepia(0.3)_contrast(1.18)_brightness(1.05)]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70 mix-blend-overlay"
              style={{ backgroundImage: GRAIN_DATA_URI, backgroundSize: '180px 180px' }}
            />
          )}
        </div>

        {/* Edition banner — overlaps bottom paper area */}
        <figcaption className="absolute bottom-[16px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-claret px-6 py-2.5 shadow-[0_4px_10px_-4px_rgba(20,18,16,0.4)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1 border border-ochre/60"
          />
          <span className="relative font-mono text-[11px] uppercase tracking-[0.25em] text-ivory">
            {edition}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
