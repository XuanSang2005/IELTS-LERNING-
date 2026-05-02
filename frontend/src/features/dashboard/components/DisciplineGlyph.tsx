import type { Discipline } from '@/schemas/practice'

interface DisciplineGlyphProps {
  discipline: Discipline
  className?: string
}

/**
 * Tiny SVG chapter-mark, one per discipline. Used at the top of each
 * DisciplineCard above the headline. Hairline, claret, decorative only.
 */
export function DisciplineGlyph({ discipline, className = '' }: DisciplineGlyphProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={`text-claret ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      {discipline === 'grammar' && (
        // Open book — pages meeting at spine
        <>
          <path d="M16 8 L16 26" strokeWidth="1.2" />
          <path d="M16 8 C 12 7, 8 8, 4 10 L 4 24 C 8 22, 12 23, 16 24" />
          <path d="M16 8 C 20 7, 24 8, 28 10 L 28 24 C 24 22, 20 23, 16 24" />
        </>
      )}
      {discipline === 'vocabulary' && (
        // Quill nib
        <>
          <path d="M22 6 L 8 22 L 6 26 L 10 24 L 24 10 Z" />
          <path d="M16 12 L 20 16" />
        </>
      )}
      {discipline === 'collocations' && (
        // Two interlocked rings
        <>
          <circle cx="12" cy="16" r="6" />
          <circle cx="20" cy="16" r="6" />
        </>
      )}
      {discipline === 'linking' && (
        // Chain links
        <>
          <path d="M8 14 C 6 14, 4 16, 4 18 C 4 20, 6 22, 8 22 L 12 22" />
          <path d="M24 22 C 26 22, 28 20, 28 18 C 28 16, 26 14, 24 14 L 20 14" />
          <path d="M11 18 L 21 18" />
        </>
      )}
    </svg>
  )
}
