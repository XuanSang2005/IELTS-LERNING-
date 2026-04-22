export function PaymentInstructions() {
  return (
    <aside className="border-t border-b border-line py-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
        INSTRUCTIONS · READ ONCE
      </p>
      <ul className="mt-3 space-y-2 font-geist text-[14px] leading-relaxed text-ink">
        <li className="flex gap-3">
          <span className="font-mono text-[12px] text-claret">i.</span>
          <span>
            Transfer the <em className="font-fraunces italic">exact</em> amount shown. Round numbers
            match faster.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-[12px] text-claret">ii.</span>
          <span>
            Paste the reference into the transfer <em className="font-fraunces italic">content</em>{' '}
            field. Without it, reconciliation is manual.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-[12px] text-claret">iii.</span>
          <span>
            Keep this page open. It will update on its own within a few seconds of the transfer
            clearing your bank.
          </span>
        </li>
      </ul>
    </aside>
  )
}
