interface OrnamentDividerProps {
  symbol?: string
  className?: string
}

/** Editorial divider — a centered ornament between two thin lines. */
export function OrnamentDivider({
  symbol = '◆',
  className,
}: OrnamentDividerProps) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`my-10 flex items-center gap-4 md:my-14 ${className ?? ''}`}
    >
      <span className="h-px flex-1 bg-line" />
      <span className="font-mono text-[12px] text-claret/70">{symbol}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
