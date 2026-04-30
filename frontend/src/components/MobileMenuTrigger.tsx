interface MobileMenuTriggerProps {
  open: boolean
  onClick: () => void
  controlsId?: string
}

export function MobileMenuTrigger({ open, onClick, controlsId }: MobileMenuTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="group relative flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink transition-colors duration-200 hover:border-ink active:bg-ink/5 lg:hidden"
    >
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      <span aria-hidden="true" className="relative block h-[14px] w-5">
        <span
          className={`absolute left-0 right-0 top-0 h-px bg-ink transition-transform duration-200 ${
            open ? 'translate-y-[6px] rotate-45' : ''
          }`}
        />
        <span
          className={`absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-ink transition-opacity duration-150 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 right-0 h-px bg-ink transition-transform duration-200 ${
            open ? '-translate-y-[6px] -rotate-45' : ''
          }`}
        />
      </span>
      <span className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-claret transition-transform duration-200 group-hover:scale-x-100" />
    </button>
  )
}
