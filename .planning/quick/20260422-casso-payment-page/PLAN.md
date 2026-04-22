---
type: quick
slug: casso-payment-page
created: 2026-04-22
---

# Plan — Casso payment page

Build the user-facing payment flow on top of the backend scaffold that already
landed in this working tree. Backend (payments + pricing modules, Mongoose
schema, Casso webhook, VietQR URL builder) is in place and wired into
`AppModule`. What's missing is the frontend UI + routes and the final wiring.

## Scope

Ship a working bank-transfer payment flow:

1. `/pricing` — public page that lists tiers, creates a payment session.
2. `/pay/:paymentId` — authenticated payment page with QR, bank details,
   countdown, status polling, and manual refresh.
3. Editorial states for `pending`, `paid`, `failed`, `expired`.

## Backend (already done, verify only)

- [x] `backend/src/payments/*` — service, controller, Casso webhook, schema
- [x] `backend/src/pricing/*` — read-only pricing endpoint
- [x] `shared/schemas/payment.ts` — Zod contracts
- [x] `backend/.env.example` — all Casso / bank / pricing env vars
- [x] Registered in `app.module.ts`

## Frontend task list

- [ ] Components in `features/payment/components/`:
  - `PaymentStatusBadge.tsx` — editorial pill per status
  - `CountdownTimer.tsx` — mm:ss until `expiresAt`, pauses on terminal states
  - `QrDisplay.tsx` — VietQR image, skeleton, error fallback
  - `BankDetails.tsx` — labeled rows + per-field "copy" affordance
  - `PaymentFlowSteps.tsx` — 4-step editorial walkthrough
  - `PaymentInstructions.tsx` — reference-code emphasis + transfer hint
  - `PaymentStatePanel.tsx` — pending / paid / expired / failed conditional copy
  - `PricingTierCard.tsx` — monthly + cohort editorial cards
- [ ] Routes:
  - `routes/pricing.tsx` — public, creates payment then navigates
  - `routes/pay.$paymentId.tsx` — authenticated, wires everything together
- [ ] Regenerate route tree, run typecheck + lint.

## Out of scope

- Real Casso account setup (user provides `CASSO_WEBHOOK_SECRET` + real bank
  data in `.env`; `.env.example` documents it).
- Payment history / billing portal. Dropdown in AppNav already links to
  `/profile` with "Billing" copy; that destination stays as-is for now.
- Receipts / invoices.
- Payment failure flow beyond the `failed` status (no dunning, no retry).
