interface AuthSubmitProps {
  idleLabel: string
  busyLabel?: string
  busy: boolean
  disabled: boolean
}

/** Signature button per CLAUDE.md — bg-ink-warm, 2px claret bottom rule, claret arrow, hover lift + claret-tinted shadow. */
export function AuthSubmit({
  idleLabel,
  busyLabel = 'Entering…',
  busy,
  disabled,
}: AuthSubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled || busy}
      className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-ink-warm disabled:hover:shadow-none"
    >
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
      <span className="relative z-10">{busy ? busyLabel : idleLabel}</span>
      <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  )
}
