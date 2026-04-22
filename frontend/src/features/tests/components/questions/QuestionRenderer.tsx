import type { AnswerValue, Question } from '@shared/schemas/test'
import { BlankInput, OptionRow, QuestionFrame } from './primitives'
import { asArray, asRecord, asString } from './answer-utils'

interface QuestionRendererProps {
  question: Question
  value: AnswerValue | undefined
  onChange: (value: AnswerValue) => void
  disabled?: boolean
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  disabled,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <QuestionFrame number={question.number} prompt={question.prompt}>
          <div className="space-y-1">
            {question.options.map((opt) => (
              <OptionRow
                key={opt.key}
                optionKey={opt.key}
                text={opt.text}
                selected={asString(value) === opt.key}
                onSelect={() => onChange(opt.key)}
                disabled={disabled}
              />
            ))}
          </div>
        </QuestionFrame>
      )

    case 'multi-select': {
      const selected = asArray(value)
      return (
        <QuestionFrame
          number={question.number}
          prompt={
            question.prompt ??
            `Choose ${question.selectCount} answers that apply.`
          }
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-claret">
            CHOOSE {question.selectCount}
          </p>
          <div className="space-y-1">
            {question.options.map((opt) => {
              const isSel = selected.includes(opt.key)
              return (
                <OptionRow
                  key={opt.key}
                  optionKey={opt.key}
                  text={opt.text}
                  selected={isSel}
                  variant="square"
                  onSelect={() => {
                    if (isSel) {
                      onChange(selected.filter((k) => k !== opt.key))
                    } else if (selected.length < question.selectCount) {
                      onChange([...selected, opt.key])
                    } else {
                      // replace the oldest selection if limit reached
                      onChange([...selected.slice(1), opt.key])
                    }
                  }}
                  disabled={disabled}
                />
              )
            })}
          </div>
        </QuestionFrame>
      )
    }

    case 'true-false-not-given':
    case 'yes-no-not-given': {
      const options =
        question.type === 'true-false-not-given'
          ? (['TRUE', 'FALSE', 'NOT GIVEN'] as const)
          : (['YES', 'NO', 'NOT GIVEN'] as const)
      const current = asString(value)
      return (
        <QuestionFrame number={question.number}>
          <p className="mb-4 font-fraunces text-[20px] leading-relaxed text-ink">
            {question.statement}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                disabled={disabled}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  current === opt
                    ? 'border-claret bg-claret text-ivory'
                    : 'border-line text-graphite hover:border-ink hover:text-ink'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </QuestionFrame>
      )
    }

    case 'matching': {
      const map = asRecord(value)
      return (
        <QuestionFrame number={question.number} prompt={question.prompt}>
          <div className="space-y-3">
            {question.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_220px]"
              >
                <span className="font-fraunces text-[19px] leading-relaxed text-ink">
                  {item.text}
                </span>
                <select
                  value={map[item.id] ?? ''}
                  disabled={disabled}
                  onChange={(e) => onChange({ ...map, [item.id]: e.target.value })}
                  className="border border-line bg-ivory px-3 py-2 font-geist text-[18px] text-ink focus:border-claret focus:outline-none"
                >
                  <option value="">— choose —</option>
                  {question.options.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.key} · {o.text}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </QuestionFrame>
      )
    }

    case 'plan-map-diagram': {
      const map = asRecord(value)
      return (
        <QuestionFrame number={question.number} prompt={question.prompt}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px]">
            <div className="border border-line bg-bone p-3">
              <img
                src={question.imageUrl}
                alt="Map / diagram"
                className="h-auto w-full"
              />
            </div>
            <div className="space-y-3">
              {question.labels.map((label, i) => (
                <div key={label.id} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-claret font-mono text-[11px] text-claret">
                    {i + 1}
                  </span>
                  <span className="font-fraunces text-[18px] italic text-graphite">
                    {label.id}
                  </span>
                  <select
                    value={map[label.id] ?? ''}
                    disabled={disabled}
                    onChange={(e) => onChange({ ...map, [label.id]: e.target.value })}
                    className="ml-auto border border-line bg-ivory px-2 py-1 font-geist text-[15px] text-ink focus:border-claret focus:outline-none"
                  >
                    <option value="">—</option>
                    {question.options.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.key}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </QuestionFrame>
      )
    }

    case 'form-completion':
    case 'note-table-completion':
    case 'summary-completion': {
      const map = asRecord(value)
      const template =
        question.type === 'note-table-completion'
          ? question.tableHtml
          : question.type === 'form-completion'
            ? question.template
            : question.summaryTemplate
      // Split template by {blankN} placeholders and inline inputs.
      const parts = template.split(/(\{[^}]+\})/g)
      const wordBank =
        question.type === 'summary-completion' ? question.wordBank : undefined

      const inlineNode = (blankId: string) => {
        const blank = question.blanks.find((b) => b.id === blankId)
        if (!blank) return null
        if (wordBank) {
          return (
            <select
              key={blankId}
              value={map[blankId] ?? ''}
              disabled={disabled}
              onChange={(e) => onChange({ ...map, [blankId]: e.target.value })}
              className="mx-1 inline-block border-0 border-b border-line bg-transparent pb-0.5 font-geist text-[19px] text-ink focus:border-claret focus:outline-none"
            >
              <option value="">—</option>
              {wordBank.map((w) => (
                <option key={w.key} value={w.key}>
                  {w.key} · {w.text}
                </option>
              ))}
            </select>
          )
        }
        return (
          <BlankInput
            key={blankId}
            value={map[blankId] ?? ''}
            onChange={(v) => onChange({ ...map, [blankId]: v })}
            maxWords={blank.maxWords}
            disabled={disabled}
          />
        )
      }

      return (
        <QuestionFrame number={question.number} prompt={question.prompt}>
          {question.type === 'note-table-completion' ? (
            // Table HTML supports inline placeholders — render via split & reassemble.
            <div className="font-fraunces text-[19px] leading-relaxed text-ink">
              {renderSplitTemplate(parts, inlineNode, true)}
            </div>
          ) : (
            <p className="font-fraunces text-[20px] leading-relaxed text-ink">
              {renderSplitTemplate(parts, inlineNode)}
            </p>
          )}
        </QuestionFrame>
      )
    }

    case 'flow-chart-completion': {
      const map = asRecord(value)
      return (
        <QuestionFrame number={question.number} prompt={question.prompt}>
          <ol className="space-y-4">
            {question.steps.map((step, i) => {
              const parts = step.text.split(/(\{[^}]+\})/g)
              return (
                <li key={step.id} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-claret font-mono text-[11px] text-claret">
                    {i + 1}
                  </span>
                  <p className="font-fraunces text-[19px] leading-relaxed text-ink">
                    {parts.map((p, idx) => {
                      const m = p.match(/^\{([^}]+)\}$/)
                      if (!m) return <span key={idx}>{p}</span>
                      const blankId = m[1]
                      const blank = question.blanks.find((b) => b.id === blankId)
                      if (!blank) return null
                      return (
                        <BlankInput
                          key={idx}
                          value={map[blankId] ?? ''}
                          onChange={(v) => onChange({ ...map, [blankId]: v })}
                          maxWords={blank.maxWords}
                          disabled={disabled}
                        />
                      )
                    })}
                  </p>
                </li>
              )
            })}
          </ol>
        </QuestionFrame>
      )
    }

    case 'sentence-completion': {
      const current = asString(value)
      return (
        <QuestionFrame number={question.number}>
          <p className="font-fraunces text-[20px] leading-relaxed text-ink">
            {question.sentenceBefore}{' '}
            <BlankInput
              value={current}
              onChange={(v) => onChange(v)}
              maxWords={question.maxWords}
              disabled={disabled}
            />{' '}
            {question.sentenceAfter}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
            ≤ {question.maxWords} WORD{question.maxWords === 1 ? '' : 'S'}
          </p>
        </QuestionFrame>
      )
    }

    case 'short-answer': {
      return (
        <QuestionFrame number={question.number}>
          <p className="font-fraunces text-[20px] leading-relaxed text-ink">
            {question.question}
          </p>
          <div className="mt-3">
            <BlankInput
              value={asString(value)}
              onChange={(v) => onChange(v)}
              maxWords={question.maxWords}
              disabled={disabled}
              width="16rem"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
            ≤ {question.maxWords} WORD{question.maxWords === 1 ? '' : 'S'}
          </p>
        </QuestionFrame>
      )
    }

    case 'matching-information': {
      return (
        <QuestionFrame number={question.number}>
          <p className="mb-3 font-fraunces text-[19px] leading-relaxed text-ink">
            {question.statement}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
              PARAGRAPH
            </span>
            <select
              value={asString(value)}
              disabled={disabled}
              onChange={(e) => onChange(e.target.value)}
              className="border border-line bg-ivory px-3 py-2 font-geist text-[18px] text-ink focus:border-claret focus:outline-none"
            >
              <option value="">—</option>
              {question.paragraphLabels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </QuestionFrame>
      )
    }

    case 'matching-headings': {
      return (
        <QuestionFrame
          number={question.number}
          prompt={`Choose the correct heading for paragraph ${question.paragraphId}.`}
        >
          <div className="space-y-1">
            {question.headings.map((h) => (
              <OptionRow
                key={h.key}
                optionKey={h.key}
                text={h.text}
                selected={asString(value) === h.key}
                onSelect={() => onChange(h.key)}
                disabled={disabled}
              />
            ))}
          </div>
        </QuestionFrame>
      )
    }
  }
}

function renderSplitTemplate(
  parts: string[],
  renderBlank: (id: string) => React.ReactNode,
  isHtml = false,
): React.ReactNode {
  return parts.map((p, idx) => {
    const m = p.match(/^\{([^}]+)\}$/)
    if (m) return <span key={idx}>{renderBlank(m[1])}</span>
    if (isHtml) return <span key={idx} dangerouslySetInnerHTML={{ __html: p }} />
    return <span key={idx}>{p}</span>
  })
}
