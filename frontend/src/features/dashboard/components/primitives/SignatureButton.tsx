import type { ReactNode } from 'react'

/**
 * Class string for the signature filled CTA. Use on a `<Link>` so TanStack
 * Router can typecheck `to` + `search` against the actual route. Pair with
 * `<SignatureContent>` to render the children + signature claret bottom rule
 * + arrow.
 */
export const SIGNATURE_BUTTON_CLASS =
  'group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]'

export function SignatureContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 text-[13px] text-claret transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  )
}
