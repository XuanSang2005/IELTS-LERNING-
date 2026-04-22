import { useState } from 'react'
import type { Payment } from '@shared/schemas/payment'

const vndFormatter = new Intl.NumberFormat('vi-VN')

interface Field {
  label: string
  value: string
  mono?: boolean
  emphasis?: boolean
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (key: string, value: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => {
        setCopied((prev) => (prev === key ? null : prev))
      }, 1800)
    } catch {
      // Silent — copy is a convenience. Users can still select manually.
    }
  }

  return { copied, copy }
}

function Row({
  label,
  value,
  mono = true,
  emphasis = false,
  copyKey,
  onCopy,
  copied,
}: Field & { copyKey: string; onCopy: (k: string, v: string) => void; copied: string | null }) {
  const isCopied = copied === copyKey
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-3 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
        {label}
      </span>
      <span
        className={`break-words text-right md:text-left ${
          mono ? 'font-mono' : 'font-geist'
        } ${
          emphasis
            ? 'font-fraunces text-[22px] italic text-claret'
            : 'text-[15px] text-ink tabular-nums'
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onCopy(copyKey, value)}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite transition-colors duration-200 hover:text-claret"
        aria-label={`Copy ${label.toLowerCase()}`}
      >
        {isCopied ? '✓ COPIED' : 'COPY'}
      </button>
    </div>
  )
}

export function BankDetails({ payment }: { payment: Payment }) {
  const { copied, copy } = useCopy()
  const amount = vndFormatter.format(payment.amountVnd)

  return (
    <section className="border border-line bg-ivory p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
          § II · TRANSFER MANUALLY
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          FIG. 02
        </span>
      </div>

      <div className="mt-2">
        <Row
          copyKey="bank"
          label="BANK"
          value={`${payment.bank.bankName} (${payment.bank.bankCode})`}
          mono={false}
          onCopy={copy}
          copied={copied}
        />
        <Row
          copyKey="accountNo"
          label="ACCOUNT №"
          value={payment.bank.accountNo}
          onCopy={copy}
          copied={copied}
        />
        <Row
          copyKey="accountHolder"
          label="BENEFICIARY"
          value={payment.bank.accountHolder}
          mono={false}
          onCopy={copy}
          copied={copied}
        />
        <Row
          copyKey="amount"
          label="AMOUNT"
          value={`${amount} ₫`}
          onCopy={copy}
          copied={copied}
        />
        <Row
          copyKey="reference"
          label="CONTENT"
          value={payment.reference}
          emphasis
          onCopy={copy}
          copied={copied}
        />
      </div>

      <p className="mt-4 font-fraunces text-[15px] italic leading-snug text-graphite">
        The transfer <em>content</em> must match the reference exactly. Without it, the transfer
        cannot be matched to your account and will remain unreconciled.
      </p>
    </section>
  )
}
