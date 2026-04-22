import type { ReactNode } from 'react'

interface FormErrorNoteProps {
  children: ReactNode
}

/** Editorial form-level error — claret left rule + Fraunces italic copy. */
export function FormErrorNote({ children }: FormErrorNoteProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="border-l-2 border-claret bg-claret/5 py-3 pl-4 pr-3 font-fraunces text-[19px] italic leading-snug text-ink"
    >
      {children}
    </div>
  )
}
