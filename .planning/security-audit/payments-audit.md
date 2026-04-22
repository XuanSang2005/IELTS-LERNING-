# Payments Module Security Audit

**Date:** 2026-04-22
**Auditor:** Claude (audit-only, no code modified)
**Status of module at audit time:** dev-local, not yet accepting real money

## Scope

- `backend/src/payments/payments.controller.ts`
- `backend/src/payments/payments.service.ts`
- `backend/src/payments/payments.module.ts`
- `backend/src/payments/schemas/payment.schema.ts`
- `backend/src/pricing/pricing.controller.ts`
- `backend/src/pricing/pricing.module.ts`
- `backend/src/common/zod-validation.pipe.ts`
- `backend/src/main.ts` (bootstrap, CORS)
- `backend/.env.example`
- `shared/schemas/payment.ts`
- `frontend/src/features/payment/hooks/payment-queries.ts`
- `frontend/src/features/payment/components/BankDetails.tsx`
- `frontend/src/routes/pricing.tsx`
- `frontend/src/routes/pay.$paymentId.tsx`

## Summary

| Severity | Count |
|---|---|
| 🔴 Critical | 3 |
| 🟡 High     | 4 |
| 🟢 Medium   | 9 |
| ℹ️ Low / Observational | 4 |

**Overall risk:** **HIGH** while dev-local. **DO NOT** point this at a real
bank account + Casso production webhook without addressing all Critical + High
findings. Several Medium items (rate limiting, IDOR-via-id-leak, observability)
should also land before live launch.

---

## 🔴 CRITICAL findings

### 🔴 CRITICAL-1 — No body-integrity check: webhook trusts client-supplied `amount` and `when`

**Location:** `backend/src/payments/payments.controller.ts:87-128`, `backend/src/payments/payments.service.ts:122-191`

**Issue:** Authentication is an **Apikey header only**. There is no HMAC or
signature over the request body. Anyone who ever obtains the Apikey
(log leakage, misconfigured reverse-proxy access log, leaked `.env`, insider,
shared Casso test key, rotated-but-still-valid key) can send arbitrary webhook
payloads and the server will happily trust `tx.amount`, `tx.when`,
`tx.description`, and `tx.tid`.

This is the industry-standard weakness of bearer-token webhooks. Casso itself
does not publish an HMAC scheme at the time of writing, so this is partially a
Casso-protocol limitation — but the app compounds it by doing zero
cross-verification against a *second* source of truth (e.g. Casso's REST
`GET /v2/transactions` fetch to confirm the tid actually exists on Casso's
side).

**Impact:** Attacker with the key — or any request that gets past the key
check — can upgrade arbitrary users to Pro by:

- Reading `MRDxxxxxx` references (via any enumeration vector, see HIGH-2)
- Posting `{ error:0, data:[{ tid:"attacker-chosen", amount:199000, description:"MRDxxxxxx", when:<now> }] }`

No transfer ever hits the bank. User is Pro.

**Exploit scenario:**
1. Attacker obtains `CASSO_WEBHOOK_SECRET` (leaked via ops mistake, CI logs, etc.).
2. Attacker creates their own Meridian account → hits `/pricing` → gets back a `reference` like `MRDABC123`.
3. Attacker crafts a webhook POST to `/webhook/casso` with `Authorization: Apikey <leaked>` and `amount` = their real quoted amount, `when` = `new Date().toISOString()`.
4. Service finds `MRDABC123` pending with matching amount, flips to `paid`.
5. Attacker is Pro without transferring a cent.

**Fix (layered):**
1. **Defense-in-depth:** After a webhook arrives, call Casso's REST API
   (`GET /v2/transactions?tid=<tx.tid>`) with a *separately-scoped* API key
   and confirm the transaction exists server-side before flipping.
   The webhook becomes a trigger, not the source of truth.
2. If Casso adds body-signing in the future, add HMAC verification with a raw
   body, pre-JSON-parse (see CRITICAL-2 about body rewriting).
3. Add IP allowlisting as a belt-and-braces layer (MEDIUM-3).

**Effort:** Medium (add a `CassoApiClient` that fetches the tid; add a
`CASSO_READ_API_KEY` env var; call it inside `applyCassoTransactions` before
the atomic flip).

---

### 🔴 CRITICAL-2 — Replay window is checked against `tx.when`, which is attacker-controlled

**Location:** `backend/src/payments/payments.controller.ts:108-123`

**Issue:** The replay guard compares `Date.parse(tx.when)` against `Date.now()`
with a 300s window. But **`tx.when` is a field of the request body** — a
forging attacker sets it to whatever they want. An attacker replaying a
captured payload just updates `when` to "now." The check only protects
against *accidental* replay (Casso redelivery of a stale event), not against
deliberate replay.

**Impact:** The existing timestamp check provides ~zero replay-attack value
against a motivated attacker, despite being advertised as "replay protection"
in the controller banner comment. Combined with CRITICAL-1, the overall
webhook is more exposed than it reads.

**Exploit scenario:**
1. Attacker captures one legitimate webhook body (or just has the key — see CRITICAL-1).
2. Attacker posts a new request with the same `tid` but a fresh `when`.
3. `when` is fresh → passes the age check.
4. Idempotency catches the same-`tid` case (good) — but a new `tid` in a
   forged body (CRITICAL-1) still wins.

**Fix:**
- Require Casso to sign a timestamp header (if/when Casso exposes one); verify
  against that header with HMAC.
- Until then, treat timestamp validation as *best effort only*, and rely on
  CRITICAL-1's defense-in-depth (Casso REST verification) as the actual
  anti-forgery control.
- Document in code that `tx.when` is untrusted.

**Effort:** Small (documentation + mindset change); Medium if you add a
per-tid nonce table with a TTL in Mongo for stricter dedup of same-`tid`
replays (current unique index already handles that — see positive findings).

---

### 🔴 CRITICAL-3 — `.env.example` ships with a sample real-looking bank account

**Location:** `backend/.env.example:37-41`

**Issue:**
```env
MERIDIAN_BANK_NAME=MB Bank
MERIDIAN_BANK_CODE=MB
MERIDIAN_BANK_BIN=970422
MERIDIAN_BANK_ACCOUNT_NO=0123456789
MERIDIAN_BANK_ACCOUNT_HOLDER=NGUYEN VAN A
```

Three issues:
1. `0123456789` is a plausible-looking account number — if a dev copies
   `.env.example` → `.env` without changing it, and another human's real MB
   account happens to match `0123456789`, **money gets transferred to a
   stranger**. Currency is VND, so the amount is non-trivial.
2. `bankInfo()` in the service raises on missing env, but **does not raise on
   example-looking values** — there's no assertion like "fail if BANK_ACCOUNT_NO
   matches the example."
3. `NGUYEN VAN A` is a placeholder name, but will be rendered verbatim on the
   `BankDetails` UI. If deployed accidentally, users see a suspicious
   placeholder name and may suspect a phishing page (brand damage).

**Impact:** Real financial loss to innocent third party; reputational damage.

**Exploit scenario:** Unintentional misconfiguration, not malicious exploit.
Classic "demo creds in prod" bug that has hit many fintech startups.

**Fix:**
- Change `.env.example` values to obviously-bogus markers:
  `MERIDIAN_BANK_ACCOUNT_NO=REPLACE-WITH-REAL-ACCOUNT-NO`
  `MERIDIAN_BANK_ACCOUNT_HOLDER=REPLACE-WITH-REAL-BENEFICIARY-NAME`
- Add a runtime guard in `PaymentsService.bankInfo()`: if `accountNo` matches
  the literal string `REPLACE-WITH-REAL-ACCOUNT-NO` **or** `0123456789`, throw
  before creating any payment.
- Add a NODE_ENV=production sanity check that refuses to boot if the values
  are the known-demo strings.

**Effort:** Small.

---

## 🟡 HIGH findings

### 🟡 HIGH-1 — `/webhook/casso` has no rate limit; trivially DoS-able

**Location:** `backend/src/payments/payments.controller.ts:78` (Controller),
`backend/src/main.ts` (no global throttler)

**Issue:** The webhook accepts arbitrary POST size with `ZodValidationPipe`
parsing the body. No `@Throttle` from `@nestjs/throttler`, no body-size
limit beyond NestJS/express default (100kb). An attacker who knows the URL
can:
- Spam `ForbiddenException` 401s (CPU/log churn — cheap for attacker,
  expensive for us).
- Flood legitimate-looking-but-invalid payloads that pass auth but fail amount
  match, to fill logs and warn about mismatches.
- Run timing attacks against the key compare. The per-request HTTP timing
  outweighs the bcrypt-timing-level leak, but add defense: rate-limit.

**Impact:** DoS, log flooding, tiny timing side-channel amplification.

**Fix:**
- Add `@nestjs/throttler` with a conservative policy on the webhook: e.g. 60
  requests/minute/IP. Casso's real traffic is orders of magnitude below that.
- Keep the JwtAuthGuard endpoints throttled too (separate bucket).

**Effort:** Small — add ThrottlerModule to app.module, apply `@Throttle` to
webhook + user endpoints.

---

### 🟡 HIGH-2 — MongoDB ObjectId ids leak in URLs and JSON; enumerable + non-public

**Location:** `backend/src/payments/payments.controller.ts:47-51`, frontend route
`/pay/$paymentId`

**Issue:** Payment ids are Mongo `ObjectId`s. They're **not** truly random —
the first 4 bytes are a monotonically-increasing timestamp, the next 5 are a
per-process random, the last 3 are a counter. So an attacker who sees one of
their own payment ids can guess the order of magnitude of others'. Combined
with IDOR checks (which ARE present via `doc.userId.toString() !== userId`),
this doesn't let someone else view your payment — but it does leak:

- Approximate creation time of other users' payments (timestamp in id).
- Daily transaction volume (counter delta in id).

IDOR is correctly enforced, so this is business-intelligence leakage, not
account takeover.

Additionally, `reference` (`MRDxxxxxx`) is only 6 alphanumeric chars = ~36^6
= 2.2B space. That's fine for collision (backend checks unique) but
**feasibly brute-forceable via the webhook** if CRITICAL-1 is exploited. Once
you brute-force a reference that's currently pending, you can upgrade that
user.

**Impact:**
- Competitor intelligence (daily payment volume).
- Amplifies CRITICAL-1 severity: attacker does not need to guess references
  from real users — they can brute them.

**Fix:**
- Switch payment `id` to a 128-bit random token (nanoid, 21 chars). Keep the
  Mongo `_id` as `_id` internally but expose a public `paymentToken` that is
  NOT enumerable. Currently the API uses `_id` directly — changing this is a
  small lift.
- Lengthen `reference` to 10+ alphanumeric chars (36^10 ≈ 3.6 × 10^15, >> 1M
  guesses).
- Add rate-limiting (HIGH-1) to the webhook so brute force is slow.

**Effort:** Medium.

---

### 🟡 HIGH-3 — `amountVnd` tolerance of ±1000 VND on an integer currency

**Location:** `backend/src/payments/payments.service.ts:151`

**Issue:**
```ts
amountVnd: { $gte: tx.amount - 1000, $lte: tx.amount + 1000 },
```

VND has **no minor unit** (no cents). Banks do not round VND. A ±1000 VND
(=~$0.04) tolerance is:
1. Unnecessary (no rounding ever happens).
2. A free discount vector: if two tiers were ever priced within 1000 VND of
   each other, an attacker transferring the cheaper tier's amount could be
   credited with the more expensive tier. (Currently tiers are 199,000 and
   1,499,000, so no overlap — but the code is fragile to future price
   changes.)
3. Does not prevent **underpayment** past the tolerance: if user transfers
   100,000 when owing 199,000, the row stays pending (correct). But the
   attacker who controls the webhook (CRITICAL-1) can forge `tx.amount` to
   anything in the range.

**Impact:** Minor today, but silently breaks if tiers ever get priced close
together; risk compounds with CRITICAL-1.

**Fix:** Require exact match: `amountVnd: tx.amount`. Log mismatch for manual
reconciliation (as the code already does). If a bank ever does split a
transfer into two entries (rare), handle manually.

**Effort:** Tiny — one-line change.

---

### 🟡 HIGH-4 — No rate limit on `POST /payments` (authenticated)

**Location:** `backend/src/payments/payments.controller.ts:30-37`

**Issue:** An authenticated user can call `POST /payments` unlimited times.
Each call creates a new Mongo document with a reference, BIN, account info,
timestamps. No throttle, no daily cap.

**Impact:**
- Individual misbehavior: user scripts the endpoint, creates thousands of
  rows per minute, fills the collection.
- Cost: Mongo writes, index growth, log volume.
- The **15-minute TTL** does NOT garbage-collect rows — `expireIfNeeded` only
  runs on read, so `pending → expired` rows persist until their owner reads
  them. Dead rows accumulate indefinitely.

**Impact severity:** Not a direct security exploit but a DoS/cost vector from
any compromised user account.

**Fix:**
- `@Throttle({ default: { limit: 10, ttl: 3600000 } })` on `POST /payments` —
  max 10 sessions per user per hour.
- Add a background sweeper or a Mongo TTL index on `expiresAt` that deletes
  `pending` documents N days after expiry (keep paid docs forever for
  reconciliation).

**Effort:** Small.

---

## 🟢 MEDIUM findings

### 🟢 MEDIUM-1 — Webhook logs contain Casso `tid` but never redact Apikey on bad auth

**Location:** `backend/src/payments/payments.controller.ts:97`

The rejection log reads: `Casso webhook rejected: bad/missing Apikey header`.
Good — it does NOT log the provided header value. Verified no `authHeader`
value is printed anywhere. **PASS.**

However, the success path logs the full `tid` (`payments.service.ts:187`) and
the `reference`. These are not secrets, but `tid` is an internal Casso id —
low sensitivity, acceptable.

**Status:** PASS, noted for completeness.

### 🟢 MEDIUM-2 — Polling continues every 4s even when tab is hidden? — **PASS (already handled)**

**Location:** `frontend/src/features/payment/hooks/payment-queries.ts:48-62`

`refetchIntervalInBackground: false` is set. React Query stops polling when
the tab is hidden. Good. No fix needed.

### 🟢 MEDIUM-3 — No IP allowlist for webhook

**Location:** `backend/src/payments/payments.controller.ts:78`

Casso publishes egress IPs in their docs. The webhook accepts requests from
any IP. Adding an allowlist is a cheap belt-and-braces layer against CRITICAL-1
(reduces attack surface to "attacker who has both the key AND can egress from
Casso's IP range").

**Fix:** Pull Casso's documented webhook IP range(s) into
`CASSO_WEBHOOK_IP_ALLOWLIST` env (comma-separated CIDRs) and check
`req.ip` in a guard. Trust `X-Forwarded-For` only if the host is behind a
trusted proxy. **Effort:** Small.

### 🟢 MEDIUM-4 — `CassoWebhookController.receive()` processes transactions sequentially in a loop

**Location:** `backend/src/payments/payments.service.ts:129-188`

A single webhook with a large `data[]` array processes transactions
sequentially. No timeout, no chunking. If Casso ever sends a batch of 1000
backfilled transactions, the handler holds the connection for seconds.
Combined with no rate limit (HIGH-1), this is a slowloris-ish DoS vector.

**Fix:** Cap the batch size (e.g. reject >50 transactions) or return 200 fast
and enqueue the processing. **Effort:** Small.

### 🟢 MEDIUM-5 — No CSRF token on state-changing endpoints; relies on JWT-in-header

**Location:** auth flow (JWT in localStorage, sent in `Authorization` header)

JWT in `Authorization: Bearer` (not cookies) makes classical CSRF a non-issue.
**PASS.** Noted because the review asked about authentication.

### 🟢 MEDIUM-6 — CORS allows any localhost in non-prod, no prod config locked

**Location:** `backend/src/main.ts:11-19`

The CORS matcher allows any localhost origin when `NODE_ENV !== 'production'`.
That's fine locally. In production, `CORS_ORIGIN` is comma-separated and
enforced — but if an operator ever sets `CORS_ORIGIN=*`, the matcher
explicitly allows **any** origin:

```ts
const allowAnyLocalhost = list.includes('*') || process.env.NODE_ENV !== 'production'
```

The variable name says "localhost" but the branch is `list.includes('*')` —
meaning `*` enables **any-localhost** bypass in prod, not any-origin. Still,
the naming is confusing; verify nobody thinks `CORS_ORIGIN=*` means "all
origins."

**Fix:** Reject `*` in production with a loud error on bootstrap. Rename or
comment the variable. **Effort:** Tiny.

### 🟢 MEDIUM-7 — QrDisplay URL encodes amount + reference + name in plaintext via 3rd-party CDN

**Location:** `backend/src/payments/payments.service.ts:177-188`

The VietQR image URL is a GET to `img.vietqr.io` with query string
`amount=199000&addInfo=MRDABC123&accountName=NGUYEN%20VAN%20A`. That URL
is visible in:
- Browser history
- Referrer header (if `img.vietqr.io` were to include analytics)
- Proxy logs
- Screenshot shared to support (user pastes full image URL)

It's NOT a secret — all four values are already printed on the page. But it
is delivered by a third party (`vietqr.io`) the user did not consent to.

**Fix:** Proxy the QR image through the backend (`/payments/:id/qr`) so the
third party never sees the user's browser. Bonus: can cache, can swap
providers later. **Effort:** Small-Medium.

### 🟢 MEDIUM-8 — No correlation id / trace id between FE payment creation and BE webhook

**Location:** whole flow

When a payment ends up stuck, there's no single id to grep across frontend
logs, backend logs, and Casso dashboard. Today you have `payment._id`,
`reference`, `cassoTxId` — all in different namespaces.

**Fix:** Log `reference` on every backend handler (create, find, status,
webhook-match, webhook-mismatch) and surface it in the frontend
`console.info` when a payment is created. That string already exists — just
unify the log format. **Effort:** Tiny.

### 🟢 MEDIUM-9 — `GET /payments/:id` returns full `bank` block on every read

**Location:** `backend/src/payments/payments.service.ts:197-214`

Every call to `GET /payments/:id` returns the bank account info (account
number, holder name). For the owner of the payment, that's fine — they need
it to transfer. But the *status* endpoint (`GET /payments/:id/status`) does
NOT return bank info, which is good.

**Status:** PASS, by design.

---

## ℹ️ LOW / observational

### ℹ️ LOW-1 — `usePaymentStatus` polls indefinitely on terminal states (refetchInterval returns `false`) — **PASS**

The hook correctly stops polling on terminal states.

### ℹ️ LOW-2 — BankDetails copy button — no XSS risk

Values are rendered as React children (auto-escaped) and passed to
`navigator.clipboard.writeText` (string, not HTML). No `dangerouslySetInnerHTML`.
`aria-label` uses template literal with `label.toLowerCase()` — label is a
compile-time constant. **PASS.**

### ℹ️ LOW-3 — Redirect after signup uses `redirectTo` param

**Location:** `frontend/src/routes/pricing.tsx:68` → `/signup?redirect=/pricing?product=pro-monthly`

The redirect string includes user-supplied-ish query. Check: in `login.tsx`
and `signup.tsx` the redirect is validated with
`redirectParam && redirectParam.startsWith('/')`. That prevents
`redirect=https://evil.com` (open redirect). **PASS.**

However, the current call constructs the redirect by string-concatenating
`?product=${product}` without `encodeURIComponent`. `product` is a Zod enum
(`pro-monthly` | `pro-cohort`), so no special chars — but future enum changes
could break this. **Recommendation:** use `URLSearchParams` for safety.

### ℹ️ LOW-4 — Pricing endpoint is public — by design

`GET /pricing` has no auth guard. Intentional — the landing page and the
public `/pricing` route both need it. **PASS.**

---

## State machine audit (requested item D)

Documented states: `pending`, `paid`, `expired`, `failed`.

Transitions observed in code:
| From | To | Where | Reachable? |
|---|---|---|---|
| `pending` | `paid` | `applyCassoTransactions` (atomic flip) | ✅ |
| `pending` | `expired` | `expireIfNeeded` (lazy on read) | ✅ |
| `pending` | `failed` | **nowhere in code** | ❌ never set |
| `paid` | any | blocked by `status: 'pending'` filter | ✅ correctly blocked |
| `expired` | `paid` | blocked by same filter | ✅ correctly blocked |
| `failed` | any | n/a (never entered) | — |

**Findings:**
1. `failed` is declared in the enum, rendered by the UI's `PaymentStatePanel`,
   but **never assigned** by backend code. Dead state. Either implement a path
   (e.g. admin can manually mark `failed` for chargeback/dispute) or remove
   from enum.
2. The `paid` → ??? reversal is correctly blocked by the atomic update filter.
3. Race: user transfers at second 14:59 of the TTL, webhook arrives at
   second 15:03. `expireIfNeeded` only runs on a `findById`/`getStatus` call,
   NOT in `applyCassoTransactions`. So the atomic flip sees `pending` (not
   yet expired in DB) at 15:03 even though `expiresAt < now` — **the payment
   flips to `paid` correctly**. Good behavior, but document it: late webhooks
   after expiry DO still get honored. This is what you want in a bank-transfer
   world but should be explicit.

---

## Idempotency audit (requested item B)

| Check | Status | Notes |
|---|---|---|
| Unique index on `cassoTxId` | ✅ PASS | Sparse unique partial index |
| Pre-check before processing | ✅ PASS | `model.exists({ cassoTxId })` |
| Atomic update on pending row | ✅ PASS | `findOneAndUpdate` with status filter |
| Duplicate-key race caught | ✅ PASS | `isDuplicateKeyError` handler |
| `paid → pending` backslide | ✅ PASS | Filter blocks it |
| Unique index on `reference` | ✅ PASS | `@Prop({ unique: true })` |
| Paid payment can be re-paid | ✅ PASS | Atomic filter prevents it |

**Verdict:** Idempotency is robustly enforced end-to-end.

---

## Positive findings (do NOT regress these)

1. ✅ Timing-safe compare on Apikey header (`crypto.timingSafeEqual`).
2. ✅ Length-gated timing-safe compare (buffers checked for equal length
   before `timingSafeEqual` call).
3. ✅ Unique sparse index on `cassoTxId`; unique index on `reference`.
4. ✅ Atomic `findOneAndUpdate` for payment status flip.
5. ✅ IDOR check on `findById`/`getStatus`: `doc.userId.toString() !== userId`
   returns NotFound (no existence oracle via different error codes).
6. ✅ ObjectId validity check before query (`Types.ObjectId.isValid(id)`).
7. ✅ Webhook rejects non-zero `body.error` early.
8. ✅ Zod validation on every request body (typed DTO + runtime check).
9. ✅ Pricing read from env, not hardcoded.
10. ✅ Bank info read from env, not hardcoded.
11. ✅ `refetchIntervalInBackground: false` on polling hook (tab hidden =
    no polling).
12. ✅ Frontend redirect guard (`startsWith('/')`) — open-redirect safe.
13. ✅ Apikey secret never logged on rejection.
14. ✅ `tx.amount <= 0` filtered (refunds/outgoing ignored).
15. ✅ `mintReference` uses `crypto.randomBytes` (CSPRNG).
16. ✅ CSRF non-issue — JWT in Authorization header, not cookies.

---

## Recommended remediation order

### Before ANY production deployment

1. **CRITICAL-3** (fix env placeholders + startup assertion) — 20 minutes.
2. **CRITICAL-1** (defense-in-depth: fetch Casso REST to confirm tid) — 2-3 hours.
3. **HIGH-3** (remove ±1000 VND tolerance) — 5 minutes.
4. **HIGH-2** (opaque paymentToken + longer reference) — 2 hours.
5. **HIGH-1, HIGH-4** (rate limiting via `@nestjs/throttler`) — 1 hour.
6. **CRITICAL-2** (document that `tx.when` is untrusted; rely on CRITICAL-1
   fix for actual replay protection) — 10 minutes of comments; already mostly
   mitigated.

### Before live launch

7. **MEDIUM-3** (Casso IP allowlist) — 1 hour.
8. **MEDIUM-4** (batch-size cap) — 15 minutes.
9. **MEDIUM-6** (reject CORS `*` in prod) — 10 minutes.
10. **MEDIUM-7** (proxy VietQR image) — 2 hours.
11. **MEDIUM-8** (correlation id unification) — 30 minutes.

### Nice to have

12. Remove or implement `failed` state (state-machine cleanup).
13. Monitoring/alerting on `mismatched`, `duplicates`, auth failures.
14. Payments-stuck detector: cron that flags any `pending` older than
    `expiresAt + 30min` still without reconciliation.

---

## Unclear / needs product decision

- **U-1.** What should happen when a user transfers the wrong amount? Current
  behavior: payment stays `pending`, webhook logs a warning, attention is
  never automatically drawn. Product decision: manual reconciliation only, or
  build a refund-recommender flow?
- **U-2.** Late webhook (post-expiry): currently honored — is that the
  business rule we want? If the trial window has closed, do we still want to
  grant Pro retroactively?
- **U-3.** Should `failed` status be reachable programmatically (e.g. admin
  marks a chargeback), or removed from the enum?
