import type { Lesson } from '@shared/schemas/lesson'

const REGISTER_META: Record<'B1' | 'B2' | 'C1', { label: string; bg: string; text: string }> = {
  B1: { label: 'B1 · INTERMEDIATE', bg: 'bg-graphite/10', text: 'text-graphite' },
  B2: { label: 'B2 · UPPER', bg: 'bg-sage/15', text: 'text-sage' },
  C1: { label: 'C1 · ADVANCED', bg: 'bg-claret/10', text: 'text-claret' },
}

interface LessonReaderProps {
  lesson: Lesson
  onContinueToPractice?: () => void
}

/** Single full-width hairline + centred mono label. Matches the divider
 *  style used on the tests/atlas pages. Pass `noDivider` to drop the top
 *  rule when the preceding element (e.g. the sticky tab bar) already
 *  provides one — avoids two hairlines stacking with only padding between. */
function SectionHeader({
  numeral,
  title,
  noDivider = false,
}: {
  numeral: string
  title: string
  noDivider?: boolean
}) {
  return (
    <div className={`text-center ${noDivider ? '' : 'border-t border-line pt-10'}`}>
      <p className="font-mono text-[15px] uppercase tracking-[0.32em] md:text-[17px]">
        <span className="font-semibold text-claret">§ {numeral}</span>
        <span className="mx-4 text-line">·</span>
        <span className="font-semibold text-ink">{title}</span>
      </p>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 *  Theory parsing & rendering
 *
 *  The author-written theory is one paragraph of mixed content: named
 *  formulas ("Zero: If + present, present."), parenthetical examples, a
 *  numbered function list, and a closing rule. Rendering it as one block of
 *  prose wastes the structure. Instead, we classify each sentence and render
 *  formulas as card blocks, numbered lists as ordered lists, and rules as
 *  marginalia — so the eye lands on the shape of the grammar first.
 * ──────────────────────────────────────────────────────────────────────── */

type TheoryBlock =
  | { kind: 'formula'; label: string; formula: string; example?: string }
  | { kind: 'numberedList'; label: string; items: string[] }
  | { kind: 'definition'; label: string; body: string }
  | { kind: 'rule'; text: string }
  | { kind: 'prose'; text: string }

const RULE_STARTERS =
  /^(Use|Never|Avoid|Always|Do not|Don't|Reserve|Match|Drop|Watch|Form|Choose|Replace|Reject|Prefer|Note|Remember)\b/i

/** Split theory text into sentences, respecting parens, brackets, and double
 *  quotes so periods inside `"Because I was tired."` or `(If water boils.)`
 *  don't break the surrounding sentence into fragments. */
function splitSentences(text: string): string[] {
  const sentences: string[] = []
  let current = ''
  let paren = 0
  let brack = 0
  let inQuote = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '(') paren++
    else if (ch === ')') paren = Math.max(0, paren - 1)
    else if (ch === '[') brack++
    else if (ch === ']') brack = Math.max(0, brack - 1)
    else if (ch === '"') inQuote = !inQuote
    current += ch
    if (paren === 0 && brack === 0 && !inQuote && /[.!?]/.test(ch)) {
      const next = text[i + 1]
      if (!next || /\s/.test(next)) {
        const trimmed = current.trim()
        if (trimmed) sentences.push(trimmed)
        current = ''
      }
    }
  }
  const tail = current.trim()
  if (tail) sentences.push(tail)
  return sentences.length > 0 ? sentences : [text]
}

/** A sentence is a standalone example if it is short, plain declarative, and
 *  carries no teaching markers (colon, brackets, +, parenthetical, directive
 *  opener). Those belong in §III Examples, not here. */
function isStandaloneExample(sentence: string): boolean {
  const trimmed = sentence.trim().replace(/[.!?]+$/, '')
  const words = trimmed.split(/\s+/).length
  if (words > 10) return false
  if (/[:[\]+]/.test(trimmed)) return false
  if (/\([^)]+\)/.test(trimmed)) return false
  if (/^(Use|Never|Avoid|Always|Do not|Don't|Formula|Reserve|Match|Drop|Watch|Form|Choose|Replace|Reject|Prefer|Note|Remember|Function)\b/i.test(trimmed)) {
    return false
  }
  return true
}

function classifySentence(sentence: string): TheoryBlock {
  const trimmed = sentence.trim()

  // Numbered list pattern: "Label: (1) item; (2) item; (3) item."
  const listMatch = trimmed.match(/^([A-Z][^:]{0,30}):\s*\(1\)\s*(.+?)[.!?]*$/)
  if (listMatch) {
    const [, label, rest] = listMatch
    const items = rest
      .split(/;\s*\(\d+\)\s*/)
      .map((s) => s.trim().replace(/[.;,]+$/, ''))
      .filter(Boolean)
    if (items.length >= 2) return { kind: 'numberedList', label, items }
  }

  // Formula pattern: "Label: body. (example)" — body must contain a "+" or a
  // bare auxiliary, and the label must be short.
  const formulaMatch = trimmed.match(
    /^([A-Z][^:]{0,40}):\s*(.+?)(?:\.\s*\(([^)]+)\)\.?|\.)\s*$/,
  )
  if (formulaMatch) {
    const [, label, formula, example] = formulaMatch
    const looksLikeFormula =
      /\s\+\s/.test(formula) ||
      /\+[a-z]/i.test(formula) ||
      /\b(be|have|had|will|would|should|past perfect|present perfect|past|present)\b/i.test(formula)
    if (looksLikeFormula && label.length <= 40) {
      return {
        kind: 'formula',
        label: label.trim(),
        formula: formula.trim(),
        example: example?.trim(),
      }
    }
  }

  // Definition pattern: "Label: body." where body is quoted OR short and not
  // a formula. Catches register definitions ("Formal: \"The committee…\""),
  // term glosses, and short labelled phrases.
  const defMatch = trimmed.match(/^([A-Z][\w\s-]{1,25}):\s*(.+?)\.?\s*$/)
  if (defMatch) {
    const [, rawLabel, rawBody] = defMatch
    const label = rawLabel.trim()
    const body = rawBody.trim().replace(/\.$/, '')
    const isQuoted = /^["'](.+)["']$/.test(body)
    // Don't classify long prose that happens to have a colon as a definition.
    if (label.length <= 25 && (isQuoted || body.length <= 120)) {
      const clean = body.replace(/^["']|["']$/g, '').trim()
      return { kind: 'definition', label, body: clean }
    }
  }

  // Directive rule
  if (RULE_STARTERS.test(trimmed)) return { kind: 'rule', text: trimmed }

  return { kind: 'prose', text: trimmed }
}

function parseTheory(text: string): TheoryBlock[] {
  return splitSentences(text)
    .filter((s) => !isStandaloneExample(s))
    .map(classifySentence)
}

/** Render formula body with three layers of visual clarity:
 *   - `∎ + ∎` operator (whitespace both sides) → oversized claret `+`
 *   - `+s` / `+ed` / `-ing` / `-er` suffix notation → small mono claret chip
 *   - Grammar keywords (present, past, subject, verb…) → claret-tinted pill
 *  A `+` attached directly to letters (`+s`) is morphology, NOT an operator,
 *  so it keeps its small form. */
function renderFormulaBody(formula: string) {
  const KEYWORDS = [
    'If',
    'will',
    'would',
    'have',
    'had',
    'has',
    'been',
    'be',
    'base',
    'past perfect',
    'past participle',
    'present perfect',
    'present',
    'past',
    'subject',
    'verb',
    'object',
    'complement',
  ]
  const keywordRe = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g')
  const suffixRe = /([-+][a-z]{1,4}\b)/gi

  // Layer 1: split on operator ` + ` (whitespace on both sides only).
  const operatorParts = formula.split(/(\s+\+\s+)/g)
  return operatorParts.map((part, i) => {
    if (/^\s+\+\s+$/.test(part)) {
      return (
        <span
          key={i}
          aria-hidden="true"
          className="mx-1.5 align-middle font-mono text-[22px] font-bold text-claret md:text-[24px]"
        >
          +
        </span>
      )
    }
    // Layer 2: within non-operator chunks, detect suffix tags like +s, +ed, -ing.
    const suffixParts = part.split(suffixRe)
    return (
      <span key={i}>
        {suffixParts.map((sub, j) => {
          if (/^[-+][a-z]{1,4}$/i.test(sub)) {
            return (
              <span
                key={j}
                className="mx-0.5 rounded-sm bg-claret/10 px-1 font-mono text-[0.92em] font-semibold text-claret"
              >
                {sub}
              </span>
            )
          }
          // Layer 3: highlight grammar keywords in the remainder.
          const pieces = sub.split(keywordRe)
          return (
            <span key={j}>
              {pieces.map((piece, k) => {
                if (KEYWORDS.some((kw) => kw.toLowerCase() === piece.toLowerCase())) {
                  return (
                    <span
                      key={k}
                      className="rounded-sm bg-claret/10 px-1.5 py-0.5 font-semibold text-claret"
                    >
                      {piece}
                    </span>
                  )
                }
                return <span key={k}>{piece}</span>
              })}
            </span>
          )
        })}
      </span>
    )
  })
}

/** Formula row — each formula gets its own lifted ivory card with a claret
 *  tag label floating on the top border, like a museum specimen card. If the
 *  formula body contains `;` separators it's a multi-rule definition — split
 *  into stacked lines for clarity. */
function FormulaRow({ label, formula }: { label: string; formula: string }) {
  const subRules = formula
    .split(/;\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
  const isMultiRule = subRules.length > 1

  return (
    <div className="relative overflow-x-auto border border-claret/40 bg-ivory px-4 py-7 shadow-[0_12px_30px_-18px_rgba(107,31,26,0.25)] sm:px-6 md:px-8 md:py-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-claret"
      />
      <span className="absolute -top-2.5 left-6 bg-ivory px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-claret">
        ◆ {label}
      </span>
      <span className="absolute -top-2.5 right-6 bg-ivory px-2 font-mono text-[10px] uppercase tracking-[0.35em] text-graphite">
        FORMULA
      </span>
      {isMultiRule ? (
        <ul className="space-y-3">
          {subRules.map((rule, i) => (
            <li
              key={i}
              className="flex flex-wrap items-start gap-x-3 gap-y-1 font-mono text-[16px] leading-[1.7] text-ink md:text-[20px]"
            >
              <span
                aria-hidden="true"
                className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 bg-claret"
              />
              <span>{renderFormulaBody(rule)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="wrap-break-word font-mono text-[16px] leading-[1.75] text-ink md:text-[21px]">
          {renderFormulaBody(formula)}
        </p>
      )}
    </div>
  )
}

function NumberedListRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="relative border border-line bg-ivory px-6 py-7 shadow-[0_12px_30px_-18px_rgba(20,18,16,0.12)] md:px-8 md:py-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-sage"
      />
      <span className="absolute -top-2.5 left-6 bg-ivory px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-claret">
        ◆ {label}
      </span>
      <ol className="mt-2 space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-5">
            <span
              aria-hidden="true"
              className="shrink-0 font-fraunces text-[32px] italic leading-none text-claret md:text-[38px]"
            >
              {i + 1}
            </span>
            <span className="pt-1.5 font-geist text-[17px] leading-relaxed text-ink md:text-[19px]">
              {renderInline(item)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function RuleRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <span
        aria-hidden="true"
        className="mt-[9px] inline-block h-2 w-2 shrink-0 rotate-45 bg-claret"
      />
      <p className="font-fraunces text-[18px] italic leading-snug text-ink md:text-[20px]">
        {renderInline(text)}
      </p>
    </div>
  )
}

interface Definition {
  label: string
  body: string
}

/** Consecutive "Label: body" definitions render as a comparison panel —
 *  left rail label in mono claret, right quoted body in Fraunces italic.
 *  Used for register triplets, term glosses, and any labelled contrast list. */
function DefinitionGroupCard({ defs }: { defs: Definition[] }) {
  return (
    <div className="relative border border-claret/40 bg-ivory px-6 py-5 shadow-[0_12px_30px_-18px_rgba(107,31,26,0.25)] md:px-8 md:py-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-claret"
      />
      <div className="divide-y divide-line">
        {defs.map((d, i) => (
          <div
            key={i}
            className="grid grid-cols-1 items-baseline gap-x-6 gap-y-1 py-4 first:pt-1 last:pb-1 md:grid-cols-[160px_1fr]"
          >
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-claret">
              ◆ {d.label}
            </span>
            <p className="font-fraunces text-[19px] italic leading-snug text-ink md:text-[22px]">
              &ldquo;{d.body}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProseParagraph({ text }: { text: string }) {
  return (
    <p className="font-geist text-[17px] leading-[1.85] text-ink md:text-[19px]">
      {renderInline(text)}
    </p>
  )
}

/** Drop example-like parentheticals — a sentence in parens that starts with
 *  an uppercase letter (optionally quoted) and ends with a period. Keeps
 *  word-lists `(know, believe, contain)`, notation `(+ [object] or
 *  [complement])`, and numeric refs `(1)` / `(2)` intact. */
function stripExampleParentheticals(text: string): string {
  return text
    .replace(/\s*\(["']?[A-Z][^)]*?[.!?]["']?\s*\)/g, '')
    .replace(/\s*,\s*,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function renderInline(text: string) {
  const parts = text.split(/(\([^)]*\))/g)
  return parts.map((part, i) => {
    if (part.startsWith('(') && part.endsWith(')')) {
      return (
        <em key={i} className="font-fraunces italic text-graphite">
          {part}
        </em>
      )
    }
    return <span key={i}>{part}</span>
  })
}

/** Walks block list and collapses consecutive `definition` blocks into a
 *  single DefinitionGroupCard so labelled contrasts (Formal / Semi-formal /
 *  Literary, etc.) render as one comparison panel instead of 3 loose rows. */
function renderBlocks(blocks: TheoryBlock[]) {
  const out: React.ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    if (block.kind === 'definition') {
      const defs: Definition[] = []
      while (i < blocks.length && blocks[i].kind === 'definition') {
        const d = blocks[i] as Extract<TheoryBlock, { kind: 'definition' }>
        defs.push({ label: d.label, body: d.body })
        i += 1
      }
      out.push(<DefinitionGroupCard key={`def-${i}`} defs={defs} />)
      continue
    }
    if (block.kind === 'formula') {
      out.push(<FormulaRow key={i} label={block.label} formula={block.formula} />)
    } else if (block.kind === 'numberedList') {
      out.push(<NumberedListRow key={i} label={block.label} items={block.items} />)
    } else if (block.kind === 'rule') {
      out.push(<RuleRow key={i} text={stripExampleParentheticals(block.text)} />)
    } else {
      out.push(
        <ProseParagraph key={i} text={stripExampleParentheticals(block.text)} />,
      )
    }
    i += 1
  }
  return out
}

/** Theory renderer: parses the author's paragraph into semantic blocks and
 *  wraps the whole thing in a lifted manuscript panel. Examples are not
 *  rendered here — they live in §III. */
function Theory({ text }: { text: string }) {
  const blocks = parseTheory(text)
  return (
    <div className="mx-auto max-w-[900px]">
      <div className="relative border-2 border-line bg-bone px-6 py-10 shadow-[0_30px_60px_-30px_rgba(107,31,26,0.25)] md:px-10 md:py-12">
        {/* Claret accent top bar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-claret"
        />
        {/* Centered THEORY header with ornamental dividers */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-12 bg-line" />
          <span className="font-mono text-[12px] uppercase tracking-[0.35em] text-claret">
            ◆ Theory ◆
          </span>
          <span aria-hidden="true" className="h-px w-12 bg-line" />
        </div>
        <div className="space-y-5">{renderBlocks(blocks)}</div>
      </div>
    </div>
  )
}

export function LessonReader({ lesson, onContinueToPractice }: LessonReaderProps) {
  return (
    <article className="mx-auto w-full max-w-[1440px]">
      {/* HOOK — centred pull quote, sets the stakes. No top divider — the
          sticky tab bar above already provides one. */}
      <section aria-labelledby="sec-hook" className="pb-14">
        <SectionHeader numeral="I" title="Hook" noDivider />
        <div className="mt-10 flex flex-col items-center text-center">
          <blockquote
            id="sec-hook"
            className="max-w-[60ch] font-fraunces text-[24px] italic leading-[1.45] text-ink md:text-[30px]"
          >
            &ldquo;{lesson.hook}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* THEORY — readable paragraphs, parentheticals muted as asides */}
      <section aria-labelledby="sec-theory" className="pb-14">
        <SectionHeader numeral="II" title="Theory" />
        <h2 id="sec-theory" className="sr-only">
          Theory
        </h2>
        <div className="mt-10">
          <Theory text={lesson.theory} />
        </div>
      </section>

      {/* EXAMPLES — register-tagged cards, 3 across on desktop, centred */}
      <section aria-labelledby="sec-examples" className="pb-14">
        <SectionHeader numeral="III" title="Examples across registers" />
        <h2 id="sec-examples" className="sr-only">
          Examples
        </h2>
        <ul className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-3">
          {lesson.examples.map((ex, i) => {
            const meta = REGISTER_META[ex.register]
            return (
              <li
                key={i}
                className={`border border-line ${meta.bg} p-5 text-center transition-shadow duration-200 hover:shadow-[0_18px_36px_-20px_rgba(20,18,16,0.2)]`}
              >
                <p
                  className={`font-mono text-[11px] uppercase tracking-[0.25em] ${meta.text}`}
                >
                  {meta.label}
                </p>
                <p className="mt-3 font-fraunces text-[20px] italic leading-snug text-ink md:text-[22px]">
                  &ldquo;{ex.text}&rdquo;
                </p>
                {ex.gloss && (
                  <p className="mt-2 font-geist text-[14px] leading-relaxed text-graphite md:text-[15px]">
                    {ex.gloss}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      {/* COMMON MISTAKES — three-part cards: wrong / right / why */}
      <section aria-labelledby="sec-mistakes" className="pb-14">
        <SectionHeader numeral="IV" title="Common mistakes" />
        <h2 id="sec-mistakes" className="sr-only">
          Common mistakes
        </h2>
        <ul className="mx-auto mt-10 max-w-[1200px] space-y-5">
          {lesson.mistakes.map((m, i) => (
            <li key={i} className="overflow-hidden border border-line bg-ivory">
              <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
                {/* WRONG */}
                <div className="flex items-start gap-3 bg-claret/5 p-6">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-claret/60 font-mono text-[12px] font-semibold text-claret"
                  >
                    ✗
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
                      Wrong
                    </p>
                    <p className="mt-2 font-fraunces text-[18px] italic leading-snug text-graphite line-through decoration-claret/60 md:text-[19px]">
                      {m.wrong}
                    </p>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="flex items-start gap-3 bg-sage/10 p-6">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-sage/70 font-mono text-[12px] font-semibold text-sage"
                  >
                    ✓
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sage">
                      Right
                    </p>
                    <p className="mt-2 font-fraunces text-[18px] italic leading-snug text-ink md:text-[19px]">
                      {m.right}
                    </p>
                  </div>
                </div>
              </div>
              {/* WHY */}
              <div className="border-t border-line bg-bone/50 px-6 py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
                  ◆ Why
                </p>
                <p className="mt-2 font-geist text-[15px] leading-relaxed text-ink md:text-[16px]">
                  {m.why}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* EXTENSION — Task 2 prompt as a call-to-action panel */}
      <section aria-labelledby="sec-extension" className="pb-14">
        <SectionHeader numeral="V" title="Extension — Task 2" />
        <h2 id="sec-extension" className="sr-only">
          Extension
        </h2>
        <div className="mx-auto mt-10 max-w-[900px] border-2 border-claret/40 bg-claret/5 p-7 md:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ Writing prompt
          </p>
          <p className="mt-4 font-fraunces text-[20px] italic leading-relaxed text-ink md:text-[23px]">
            {lesson.extension.prompt}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-claret/20 pt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
            <span>Minimum words · {lesson.extension.minWords}</span>
            <span>Write in your notebook · bring to review</span>
          </div>
        </div>
      </section>

      {/* Footer CTA — continue to practice */}
      {onContinueToPractice && (
        <div className="mt-16 flex flex-col items-center gap-8 border-t-2 border-line pt-12 text-center">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-claret">
              ◆ Ready to apply
            </p>
            <p className="mt-4 font-fraunces text-[24px] italic leading-snug text-ink md:text-[28px]">
              The lesson is read. The shape is learned. Now rehearse it.
            </p>
          </div>
          <button
            type="button"
            onClick={onContinueToPractice}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink-warm px-7 py-3.5 font-geist text-[13px] font-medium uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
          >
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-claret" />
            <span className="relative z-10">Begin practice</span>
            <span className="relative z-10 text-[14px] text-claret transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      )}
    </article>
  )
}
