/**
 * Simplified feather / quill \u2014 hairline strokes, editorial.
 * Used on writing-focused pages.
 */
export function OrnamentFeather({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 260"
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      {/* spine */}
      <path d="M 100 12 C 80 80, 62 150, 40 240" />
      {/* vanes \u2014 left */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13
        const x1 = 100 - (80 - 40) * t
        const y1 = 12 + (240 - 12) * t
        const length = 22 + (1 - t) * 12
        const angle = -62 + t * 10
        const rad = (angle * Math.PI) / 180
        const x2 = x1 + Math.cos(rad) * length
        const y2 = y1 + Math.sin(rad) * length
        return <line key={`L-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.45 - t * 0.2} />
      })}
      {/* vanes \u2014 right */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13
        const x1 = 100 - (80 - 40) * t
        const y1 = 12 + (240 - 12) * t
        const length = 20 + (1 - t) * 10
        const angle = 42 - t * 8
        const rad = (angle * Math.PI) / 180
        const x2 = x1 + Math.cos(rad) * length
        const y2 = y1 + Math.sin(rad) * length
        return <line key={`R-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.4 - t * 0.18} />
      })}
      {/* nib */}
      <path d="M 40 240 L 34 252 L 30 246 Z" fill="currentColor" opacity="0.7" stroke="none" />
    </svg>
  )
}
