/** Shared hairline text input for form/table/sentence/short-answer blanks. */
export function BlankInput({
  value,
  onChange,
  placeholder,
  maxWords,
  disabled,
  width = '9rem',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  maxWords?: number
  disabled?: boolean
  width?: string
}) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? (maxWords ? `≤ ${maxWords} words` : '')}
      style={{ width }}
      className="mx-1 inline-block border-0 border-b border-line bg-transparent px-0 pb-0.5 font-geist text-[19px] text-ink placeholder:text-graphite/50 focus:border-b-2 focus:border-claret focus:outline-none disabled:opacity-50"
    />
  )
}

/** Radio-style A/B/C/D option row. */
export function OptionRow({
  optionKey,
  text,
  selected,
  onSelect,
  variant = 'circle',
  disabled,
}: {
  optionKey: string
  text: string
  selected: boolean
  onSelect: () => void
  variant?: 'circle' | 'square'
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className="group flex w-full items-start gap-4 py-2 text-left transition-colors hover:bg-bone disabled:opacity-50"
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
          variant === 'circle' ? 'rounded-full' : ''
        } ${
          selected
            ? 'border-claret bg-claret text-ivory'
            : 'border-line text-graphite group-hover:border-ink group-hover:text-ink'
        }`}
      >
        {optionKey}
      </span>
      <span className="font-geist text-[19px] leading-relaxed text-ink">{text}</span>
    </button>
  )
}

/** Question frame — Mono header + content slot. */
export function QuestionFrame({
  number,
  prompt,
  children,
}: {
  number: number
  prompt?: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-line py-6 first:border-t-0 first:pt-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        QUESTION {String(number).padStart(2, '0')}
      </p>
      {prompt && (
        <p className="mt-2 font-geist text-[18px] leading-relaxed text-graphite">{prompt}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  )
}

