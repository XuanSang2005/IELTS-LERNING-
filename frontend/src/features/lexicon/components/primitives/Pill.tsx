import type { ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  className?: string
}

/** Small uppercase mono chip used as a metadata tag in word headers. */
export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.22em] ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
