import { createFileRoute, redirect } from '@tanstack/react-router'
import type { Payment, PaymentStatus } from '@shared/schemas/payment'
import {
  usePayment,
  usePaymentStatus,
  useRefreshPayment,
} from '@/features/payment/hooks/payment-queries'
import { OrderSummary } from '@/features/payment/components/OrderSummary'
import { BankDetails } from '@/features/payment/components/BankDetails'
import { QrDisplay } from '@/features/payment/components/QrDisplay'
import { PaymentStatusBadge } from '@/features/payment/components/PaymentStatusBadge'
import { CountdownTimer } from '@/features/payment/components/CountdownTimer'
import { PaymentFlowSteps } from '@/features/payment/components/PaymentFlowSteps'
import { PaymentInstructions } from '@/features/payment/components/PaymentInstructions'
import { PaymentStatePanel } from '@/features/payment/components/PaymentStatePanel'
import { AppNav } from '@/features/practice/components/AppNav'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/pay/$paymentId')({
  component: PaymentPage,
  beforeLoad: ({ location }) => {
    // Payment pages are per-user; a signed-out visitor can't resolve their own
    // payment session. Bounce through /login and come back here.
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname + location.searchStr },
      })
    }
  },
})

function PaymentPage() {
  const { paymentId } = Route.useParams()
  const detail = usePayment(paymentId)

  // Poll status every 4s while the backend says `pending`. The hook stops
  // polling automatically once the status becomes terminal.
  const status = usePaymentStatus(paymentId, 4000)
  const refresh = useRefreshPayment()

  return (
    <div className="min-h-screen bg-ivory">
      <AppNav />
      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-10 md:px-10 md:pt-14">
        {detail.isLoading && <LoadingState />}
        {detail.isError && <ErrorState message={describeError(detail.error)} />}
        {detail.data && (
          <PaymentContent
            payment={applyLiveStatus(detail.data, status.data?.status)}
            refreshing={detail.isFetching || status.isFetching}
            onRefresh={() => refresh(paymentId)}
          />
        )}
      </main>
    </div>
  )
}

function applyLiveStatus(payment: Payment, liveStatus?: PaymentStatus): Payment {
  // Status poller has the freshest read. Merge it onto the detail so the
  // children render a single consistent status.
  if (!liveStatus || liveStatus === payment.status) return payment
  return { ...payment, status: liveStatus }
}

function PaymentContent({
  payment,
  refreshing,
  onRefresh,
}: {
  payment: Payment
  refreshing: boolean
  onRefresh: () => void
}) {
  const isPending = payment.status === 'pending'

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
            ◆ PAYMENT · SESSION {payment.reference}
          </p>
          <h1 className="mt-3 font-fraunces text-[clamp(36px,4.5vw,60px)] leading-[0.95] -tracking-[0.02em] text-ink">
            Complete your <em className="italic">transfer</em>.
          </h1>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <PaymentStatusBadge status={payment.status} />
          {isPending && <CountdownTimer expiresAt={payment.expiresAt} active={isPending} />}
        </div>
      </header>

      {!isPending ? (
        <div className="mt-10">
          <PaymentStatePanel payment={payment} />
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="space-y-8">
              <OrderSummary payment={payment} />
              <PaymentInstructions />
              <BankDetails payment={payment} />
            </div>
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <QrDisplay payment={payment} />
              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="group w-full border border-ink bg-ivory px-5 py-3 font-geist text-[12px] font-medium uppercase tracking-[0.22em] text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`text-claret transition-transform duration-300 ${
                      refreshing ? 'animate-spin' : 'group-hover:rotate-90'
                    }`}
                    aria-hidden
                  >
                    ↻
                  </span>
                  <span>{refreshing ? 'Checking…' : 'Check payment status'}</span>
                </span>
              </button>
              <p className="text-center font-fraunces text-[15px] italic leading-snug text-graphite">
                This page checks every few seconds on its own. The button is for when you'd like to
                check <em>right now</em>.
              </p>
            </div>
          </div>

          <PaymentFlowSteps />
        </>
      )}
    </>
  )
}

function LoadingState() {
  return (
    <div className="border border-line bg-ivory p-12 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">
        OPENING SESSION
      </p>
      <p className="mt-4 font-fraunces text-[22px] italic text-graphite">
        The desk is preparing your transfer details…
      </p>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="border border-claret/40 bg-claret/5 p-12 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-claret">
        SESSION COULD NOT BE LOADED
      </p>
      <p className="mt-4 font-fraunces text-[22px] italic leading-relaxed text-ink">{message}</p>
    </div>
  )
}

function describeError(err: unknown): string {
  if (err instanceof Error && err.message) return err.message
  return 'The payment session could not be retrieved. It may have been closed, or the link has expired.'
}
