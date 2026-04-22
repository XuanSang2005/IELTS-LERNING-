import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import type { Discipline, NoticingItem } from '@shared/schemas/practice'
import { DisciplineSchema } from '@shared/schemas/practice'

// Form-level schema — sourceRef/note are always strings in the form state,
// trimmed + coerced to undefined in the submit handler.
const FormSchema = z.object({
  text: z.string().min(1, 'Required').max(200),
  category: DisciplineSchema,
  context: z.string().min(1, 'Required').max(500),
  sourceRef: z.string().max(100),
  note: z.string().max(500),
})

interface ItemFormProps {
  initial?: NoticingItem
  submitLabel: string
  onSubmit: (values: {
    text: string
    category: Discipline
    context: string
    sourceRef?: string
    note?: string
  }) => Promise<void> | void
  busy?: boolean
}

const DISCIPLINE_OPTS: Array<{ key: Discipline; short: string; label: string }> = [
  { key: 'grammar', short: 'GR', label: 'Grammar' },
  { key: 'vocabulary', short: 'VO', label: 'Vocabulary' },
  { key: 'collocations', short: 'CL', label: 'Collocations' },
  { key: 'linking', short: 'LI', label: 'Linking' },
]

export function ItemForm({ initial, submitLabel, onSubmit, busy }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      text: initial?.text ?? '',
      category: initial?.category ?? ('vocabulary' as Discipline),
      context: initial?.context ?? '',
      sourceRef: initial?.sourceRef ?? '',
      note: initial?.note ?? '',
    },
    validators: { onChange: FormSchema },
    onSubmit: async ({ value }) => {
      await onSubmit({
        text: value.text.trim(),
        category: value.category,
        context: value.context.trim(),
        sourceRef: value.sourceRef?.trim() || undefined,
        note: value.note?.trim() || undefined,
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
      className="space-y-6"
    >
      {/* Category picker */}
      <form.Field
        name="category"
        children={(field) => (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              DISCIPLINE
            </p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {DISCIPLINE_OPTS.map((d) => {
                const active = field.state.value === d.key
                return (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => field.handleChange(d.key)}
                    className={`border px-3 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                      active
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-line text-graphite hover:border-ink hover:text-ink'
                    }`}
                    title={d.label}
                  >
                    {d.short}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      />

      {/* Item text */}
      <form.Field
        name="text"
        children={(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite"
            >
              THE ITEM
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="bear in mind"
              className="mt-2 block w-full border-0 border-b border-line bg-transparent pb-1 pt-1 font-fraunces text-[22px] italic text-ink placeholder:text-graphite/50 focus:border-b-2 focus:border-claret focus:outline-none"
            />
            <p className="mt-1 font-fraunces text-[12px] italic leading-snug text-graphite">
              A phrase, not a sentence.
            </p>
          </div>
        )}
      />

      {/* Context */}
      <form.Field
        name="context"
        children={(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite"
            >
              CONTEXT
            </label>
            <textarea
              id={field.name}
              name={field.name}
              rows={3}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Where you encountered it, how it was used."
              className="mt-2 block w-full resize-none border border-line bg-transparent p-3 font-fraunces text-[19px] italic text-ink placeholder:text-graphite/50 focus:border-claret focus:outline-none"
            />
          </div>
        )}
      />

      {/* Source ref */}
      <form.Field
        name="sourceRef"
        children={(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite"
            >
              SOURCE · OPTIONAL
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Netflix, a podcast, a book, a lesson…"
              className="mt-2 block w-full border-0 border-b border-line bg-transparent pb-1 pt-1 font-geist text-[18px] text-ink placeholder:text-graphite/50 focus:border-b-2 focus:border-claret focus:outline-none"
            />
          </div>
        )}
      />

      {/* Note */}
      <form.Field
        name="note"
        children={(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite"
            >
              NOTE · OPTIONAL
            </label>
            <textarea
              id={field.name}
              name={field.name}
              rows={2}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Why it caught your attention."
              className="mt-2 block w-full resize-none border border-line bg-transparent p-3 font-fraunces text-[18px] italic text-ink placeholder:text-graphite/50 focus:border-claret focus:outline-none"
            />
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting || busy}
            className="group relative mt-4 inline-flex w-full items-center justify-between overflow-hidden bg-ink-warm px-9 py-[17px] font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">
              {isSubmitting || busy ? 'Saving…' : submitLabel}
            </span>
            <span className="relative z-10 text-[15px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        )}
      />
    </form>
  )
}
