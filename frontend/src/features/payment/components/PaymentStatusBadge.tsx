import type { PaymentStatus } from '@shared/schemas/payment'

const STATUS_COPY: Record<PaymentStatus, { label: string; tone: string }> = {
  pending: {
    label: 'AWAITING TRANSFER',
    tone: 'border-ochre/60 text-ochre bg-ochre/10',
  },
  paid: {
    label: 'PAID · SETTLED',
    tone: 'border-sage/60 text-sage bg-sage/10',
  },
  failed: {
    label: 'DECLINED',
    tone: 'border-claret/60 text-claret bg-claret/10',
  },
  expired: {
    label: 'SESSION CLOSED',
    tone: 'border-line text-graphite bg-bone',
  },
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const copy = STATUS_COPY[status]
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] ${copy.tone}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'pending'
            ? 'bg-ochre animate-pulse'
            : status === 'paid'
              ? 'bg-sage'
              : status === 'failed'
                ? 'bg-claret'
                : 'bg-graphite'
        }`}
        aria-hidden
      />
      {copy.label}
    </span>
  )
}
