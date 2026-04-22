const STEPS = [
  {
    label: '№ 01',
    title: 'You arrive.',
    body: 'A private session opens with your reference code. The library holds it for fifteen minutes.',
  },
  {
    label: '№ 02',
    title: 'You transfer.',
    body: 'Scan the QR with any Vietnamese banking app, or copy the bank details and transfer manually.',
  },
  {
    label: '№ 03',
    title: 'The desk reads.',
    body: 'Our reconciliation service notices your transfer within seconds of it clearing the bank.',
  },
  {
    label: '№ 04',
    title: 'The gate opens.',
    body: 'This page updates itself. Pro is enabled on your account. No email, no wait.',
  },
] as const

export function PaymentFlowSteps() {
  return (
    <section className="border-t border-line pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-claret">
        § III · HOW PAYMENT PROCEEDS
      </p>
      <h2 className="mt-3 font-fraunces text-[clamp(26px,3vw,36px)] leading-[1.05] text-ink">
        Four quiet <em className="italic">steps</em>.
      </h2>

      <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.label} className="relative border-l border-line pl-5">
            <span className="absolute -left-[2px] top-0 h-6 w-[3px] bg-claret" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
              {step.label}
            </p>
            <h3 className="mt-2 font-fraunces text-[22px] italic leading-none text-ink">
              {step.title}
            </h3>
            <p className="mt-3 font-geist text-[14px] leading-relaxed text-graphite">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
