interface EssayEditorProps {
  value: string
  onChange: (next: string) => void
  wordMin: number
  placeholder?: string
  ariaLabel: string
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function EssayEditor({
  value,
  onChange,
  wordMin,
  placeholder,
  ariaLabel,
}: EssayEditorProps) {
  const words = countWords(value)
  const belowMin = words < wordMin
  const pct = Math.min(100, (words / wordMin) * 100)

  return (
    <div className="flex h-full flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="min-h-[420px] flex-1 resize-none border border-line bg-bone/40 p-6 font-fraunces text-[19px] leading-[1.7] text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none md:text-[20px]"
        spellCheck
      />
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="h-px bg-line">
            <div
              className={`h-full transition-all duration-300 ${
                belowMin ? 'bg-claret' : 'bg-sage'
              }`}
              style={{ width: `${pct}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          <span className={belowMin ? 'text-claret' : 'text-ink'}>{words}</span> /{' '}
          {wordMin} MIN
        </p>
      </div>
    </div>
  )
}
