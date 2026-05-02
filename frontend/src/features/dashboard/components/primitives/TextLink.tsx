import type { ReactNode } from 'react'

/**
 * Class string for the tertiary text link. Use on a `<Link>` so TanStack
 * Router can typecheck `to` + `search`. Pair with `<TextLinkContent>` to render
 * children + hairline underline + claret arrow on hover.
 */
export const TEXT_LINK_CLASS =
  'group inline-flex items-center gap-2 font-geist text-[14px] text-ink'

export function TextLinkContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full bg-line transition-colors duration-200 group-hover:bg-ink" />
      </span>
      <span className="text-[13px] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-claret">
        ↗
      </span>
    </>
  )
}
