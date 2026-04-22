---
type: quick
slug: casso-payment-page
created: 2026-04-22
status: complete
---

# Summary — Casso payment page

End-to-end bank-transfer checkout for Meridian Pro, using Casso as the bank
reconciliation layer and VietQR for the user-facing QR.

## What exists now

### Backend (`a:\Ielts lerning\backend\`)

Already scaffolded before this task — verified, lint-clean, builds:

- `src/payments/payments.service.ts` — mints references, persists payments,
  reconciles inbound Casso transactions, handles lazy expiry.
- `src/payments/payments.controller.ts` — `POST /payments`, `GET /payments/:id`,
  `GET /payments/:id/status`, plus `POST /webhook/casso` with API-key auth.
- `src/payments/schemas/payment.schema.ts` — Mongoose model with unique
  `reference` index and `expiresAt` index.
- `src/pricing/pricing.controller.ts` — read-only `GET /pricing` sourcing VND
  amounts from env, never hardcoded.
- Both modules registered in `app.module.ts`.
- `.env.example` documents every required var: `CASSO_WEBHOOK_SECRET`,
  `MERIDIAN_BANK_*`, `PRO_MONTHLY_PRICE_VND`, `PRO_COHORT_PRICE_VND`,
  `PAYMENT_TTL_MINUTES`.

### Frontend — new in this task

Components under `frontend/src/features/payment/components/`:

- `PaymentStatusBadge.tsx` — four-state editorial pill (pending/paid/failed/expired).
- `CountdownTimer.tsx` — mm:ss until `expiresAt`; turns claret under 60s; halts
  interval on terminal states. Rewritten to derive `ms` from a single `now`
  tick state to satisfy `react-hooks/set-state-in-effect`.
- `QrDisplay.tsx` — renders the pre-signed VietQR image with crop marks,
  dimmed on terminal states, graceful fallback if the CDN fails.
- `BankDetails.tsx` — copy-to-clipboard rows for bank, account №, beneficiary,
  amount, and reference. Reference is emphasized in claret italic Fraunces.
- `PaymentFlowSteps.tsx` — 4-step walkthrough (arrive → transfer → reconcile → open).
- `PaymentInstructions.tsx` — three-bullet instructional aside.
- `PaymentStatePanel.tsx` — terminal-state panels for paid / expired / failed.
- `PricingTierCard.tsx` — monthly + cohort tier cards with signature CTA.
- `OrderSummary.tsx` — already existed, reused.

Routes:

- `routes/pricing.tsx` — public `/pricing` page. Unauth users bounce to signup
  with a redirect back. Auth users create a payment and land on `/pay/:id`.
- `routes/pay.$paymentId.tsx` — authenticated `/pay/:paymentId` page.
  Fetches detail once, polls status every 4s while `pending`, merges live
  status onto cached detail, renders pending (QR + bank) or terminal panel.

Hooks under `features/payment/hooks/payment-queries.ts` (already scaffolded):
`usePricing`, `useCreatePaymentMutation`, `usePayment`, `usePaymentStatus`,
`useRefreshPayment`. Auto-polling pauses on terminal statuses via
`refetchInterval` returning `false`.

## Payment flow (what actually happens)

1. User visits `/pricing`, chooses a tier → `POST /payments { product }`.
2. Backend mints an `MRDxxxxxx` reference, inserts a `pending` Payment row
   with a 15-minute TTL, builds a VietQR `img.vietqr.io/...` URL encoding
   bank + amount + reference, returns the full Payment shape.
3. Frontend navigates to `/pay/:paymentId`. Page shows the QR, bank info,
   and a live countdown. Frontend polls `GET /payments/:id/status` every 4s.
4. User transfers from any VN banking app. The transfer description carries
   the `MRDxxxxxx` reference.
5. Casso's service monitors our bank account and `POST`s to `/webhook/casso`
   within seconds. The controller authenticates with a bearer API key
   (`CASSO_WEBHOOK_SECRET`), validates the payload with Zod, extracts the
   reference, and flips the matching payment to `paid`.
6. On the next poll tick, the frontend sees `status: 'paid'` and swaps the
   pending layout for the `PaidPanel`. Countdown stops, CTA routes to `/app`.

Expiry is lazy — on every read, if `Date.now() > expiresAt` and status is
still `pending`, the service marks `expired` before returning.

## Where real config goes

Replace the placeholders in `backend/.env`:

| Key | What to set | Source |
|-----|-------------|--------|
| `CASSO_WEBHOOK_SECRET` | API key Casso sends as `Authorization: Apikey …` | Casso dashboard → Integrations → Webhook |
| `MERIDIAN_BANK_NAME` / `_CODE` / `_BIN` / `_ACCOUNT_NO` / `_ACCOUNT_HOLDER` | Meridian's real receiving account | Bank app or `https://api.vietqr.io/v2/banks` for BIN lookup |
| `PRO_MONTHLY_PRICE_VND` / `PRO_COHORT_PRICE_VND` | Prices in VND (integer, no decimals) | Business decision — still TBD per CLAUDE.md, sample values in `.env.example` |
| `PAYMENT_TTL_MINUTES` | Session lifetime | Default 15 is fine |

Frontend env (`frontend/.env`) only needs `VITE_API_URL` — already configured.

## Verification

Run from the repo root:

```bash
# Frontend
cd frontend && npm run typecheck && npm run lint

# Backend
cd backend && npm run build && npm run lint
```

All four pass as of this commit.

## Out of scope (deliberate)

- **Receipts and invoicing.** The `PaidPanel` shows a settlement card but
  does not email a PDF. When we bring on real paying users, add a Resend
  integration here.
- **Payment history.** AppNav's avatar menu still links "Billing" to
  `/profile`. A dedicated `/billing` page with all past payments is a
  separate task.
- **Dunning / retry for `failed`.** Current flow just tells the user to
  start a new session and reach out for manual reconciliation.
- **Real Casso dashboard setup.** The user configures Casso → bank account
  linking and webhook URL outside the codebase, then pastes the API key
  into `.env`.

## Notes for future maintainers

- The reference regex in `PaymentsService.extractReference` is `/MRD[A-Z0-9]{6}/`.
  If the `mintReference` format ever changes, update both places and
  migrate any in-flight pending payments.
- `PaymentsService.applyCassoTransactions` ignores outgoing transfers
  (`tx.amount <= 0`) and silently skips amount mismatches beyond 1000 VND
  tolerance — these are logged for manual follow-up.
- Status polling uses TanStack Query's `refetchInterval` callback form,
  which stops on terminal status to avoid wasted requests.
- Frontend never sees the bank credentials directly — it only renders
  whatever shape the backend returns, including the pre-signed VietQR URL.
