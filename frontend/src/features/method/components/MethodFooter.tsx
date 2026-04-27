import { FOOTER_ITEMS } from '../data/method-content'

export function MethodFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 md:justify-between md:px-10 xl:px-14">
        {FOOTER_ITEMS.map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-4">
            {i > 0 && (
              <span aria-hidden="true" className="hidden text-[10px] text-claret md:inline">
                ◆
              </span>
            )}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
                {label}
              </span>
              <span className="mt-0.5 block font-fraunces text-[20px] text-ink">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </footer>
  )
}
