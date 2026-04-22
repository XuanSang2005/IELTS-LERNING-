/**
 * Editorial "plate" mark \u2014 a small framed rosette with a figure number.
 * Used as a corner decoration on page headers.
 */
interface OrnamentPlateProps {
  figure?: string
  className?: string
}

export function OrnamentPlate({ figure = 'PL. I', className = '' }: OrnamentPlateProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="h-[112px] w-[112px] text-claret"
          fill="none"
          stroke="currentColor"
        >
          {/* outer hairline frame with corner cuts */}
          <rect x="6" y="6" width="108" height="108" strokeWidth="0.7" opacity="0.5" />
          <rect x="14" y="14" width="92" height="92" strokeWidth="0.5" opacity="0.35" />
          {/* rosette: 8-fold */}
          <g strokeWidth="0.6" opacity="0.7" style={{ transformOrigin: '60px 60px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="60"
                y1="34"
                x2="60"
                y2="86"
                transform={`rotate(${i * 22.5} 60 60)`}
                opacity={0.35}
              />
            ))}
            <circle cx="60" cy="60" r="14" strokeWidth="0.7" />
            <circle cx="60" cy="60" r="2.4" fill="currentColor" stroke="none" />
          </g>
        </svg>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-graphite">
        {figure}
      </p>
    </div>
  )
}
