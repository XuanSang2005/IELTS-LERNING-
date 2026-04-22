# Codebase Concerns

**Analysis Date:** 2026-04-22

Severity legend: **[HIGH]** = ship-blocker or silent data loss; **[MED]** = needs a plan before scale; **[LOW]** = housekeeping / discipline.

---

## Tech Debt

### [HIGH] Zero automated test coverage, anywhere

- Issue: No `*.test.*` or `*.spec.*` files exist in `frontend/src/`, `backend/src/`, or `shared/`. Jest is configured in `backend/package.json` (lines 18–23, 68–84) and `backend/test/jest-e2e.json` exists, but there is not a single spec yet. The frontend has no test runner installed at all (no vitest / jest in `frontend/package.json`).
- Files: entire repo — confirmed by `find "frontend/src" "backend/src" "shared" -name "*.test.*" -o -name "*.spec.*"` returning empty.
- Impact: Every change relies on manual QA + `typecheck` (pre-push hook in `.husky/pre-push`). Refactors to `practice.service.ts` (504 LOC), `ai-grading.service.ts` (244 LOC), the Zod migration path in `frontend/src/lib/auth.ts:61-88`, the SM-2 scheduler in `backend/src/practice/sm2.ts`, and the daily-quota race logic in `backend/src/common/daily-quota.service.ts:28-49` can regress silently.
- Fix approach: Before next user-facing phase, install `vitest` on the frontend and write unit specs for the three highest-risk pure modules first — `shared/utils/band-calculator.ts`, `backend/src/practice/sm2.ts`, `backend/src/common/daily-quota.service.ts`. Then add a Nest e2e spec covering `/auth/register → /auth/login → /auth/me` round-trip.

### [HIGH] Practice state is localStorage-backed on the client even though the backend endpoints exist

- Issue: `features/tests/` still writes test history and essay drafts straight to `localStorage` instead of calling the backend. The migration helper at `frontend/src/lib/auth.ts:61-88` (`migrateLocalPracticeIfPresent`) demonstrates the intended shape, but the tests feature never flipped over.
- Files:
  - `frontend/src/features/tests/hooks/useTestHistoryQuery.ts:4` (`HISTORY_KEY = 'meridian-test-history-v1'`), `:10`, `:25` — reads/writes history from `localStorage`
  - `frontend/src/features/tests/hooks/useTestHistoryQuery.ts:40` — explicit `// TODO(backend-swap): POST /api/tests/:id/results`
  - `frontend/src/features/tests/utils/essay-drafts.ts:12-28` — Writing Task 1/2 drafts persist only in `localStorage`
  - `frontend/src/features/tests/utils/speaking-mock.ts:69-88` — speaking submissions stored only in `localStorage`
- Impact: A user clearing site data, switching browsers, or using incognito loses their Writing drafts mid-session and their entire mock test history. There is no server backup even though `backend/src/test-submissions/test-submissions.controller.ts` exists.
- Fix approach: Wire `useSaveResultMutation` to `POST /test-submissions`. Port `essay-drafts.ts` to a debounced `PATCH /test-submissions/draft` endpoint (add to `TestSubmissionsController`). Keep `localStorage` as a 24h offline buffer, not the source of truth.

### [MED] Auth store persists user state unvalidated across backend contract changes

- Issue: `frontend/src/stores/auth-store.ts:24-34` revalidates persisted auth with `AuthResponseSchema.safeParse` on rehydrate, which is correct — but the store is keyed `meridian-auth-v1` and the User shape can drift (e.g. new `trialEndsAt` field added at `backend/src/auth/auth.controller.ts:47`). When the shape drifts the user is silently logged out.
- Files: `frontend/src/stores/auth-store.ts:21`, `shared/schemas/auth.ts`
- Impact: Quiet session loss on deploy, no user-facing message.
- Fix approach: Bump the version key (`meridian-auth-v2`) whenever the `AuthUser` shape changes, or implement a real migration function in the zustand `persist` config.

### [MED] Auth has two concurrent User shapes

- Issue: `backend/src/auth/auth.controller.ts:43-49` returns `AuthUser` (includes `trialEndsAt`, `isPro`), but `frontend/src/stores/auth-store.ts:3` imports `User` from `@shared/schemas/auth`. If `User` ≠ `AuthUser`, rehydrate silently drops fields.
- Files: `shared/schemas/auth.ts`, `backend/src/auth/auth.controller.ts:40-50`, `frontend/src/stores/auth-store.ts:3`
- Fix approach: Collapse to a single `AuthUser` schema in `shared/schemas/auth.ts`; re-export `User` as an alias for one release.

### [LOW] Signup/login route naming mismatch is tracked only by TODO

- Issue: `frontend/src/lib/auth.ts:26` and `:34` flag that the FE calls `/auth/login` and `/auth/register`, which matches the backend (`auth.controller.ts:24, 31`). Fine today, but the TODO implies the contract is considered provisional.
- Files: `frontend/src/lib/auth.ts:26, 34`
- Fix approach: Either delete the TODOs (contract is stable) or write a tiny contract test.

---

## Known Bugs

### [MED] `daily-quota.service.ts` decrement-after-increment leaves transient over-limit counts

- Symptom: Under concurrent grading requests, a user's counter may briefly hit `DAILY_LIMIT + k` before being decremented. Another concurrent read via `usedToday()` between the increment and the rollback will observe the inflated value.
- Files: `backend/src/common/daily-quota.service.ts:28-49`
- Trigger: Two `POST /submissions` fired within ~10ms of each other when the user is at the boundary.
- Workaround: None; the service acknowledges the race in comments at line 33-36.
- Fix approach: Switch to a conditional `$inc` (`updateOne` with `{ count: { $lt: DAILY_LIMIT } }` filter) and throw on `modifiedCount === 0`. One round-trip, no rollback window.

### [LOW] `apiFetch` hard-redirects to `/login` on 401, bypassing TanStack Router

- Symptom: On token expiry, `frontend/src/lib/api-client.ts:18-25` calls `window.location.href = …` instead of `router.navigate(…)`. Full page reload, lost in-memory form state (e.g. a half-written Task 2 essay).
- Files: `frontend/src/lib/api-client.ts:18-25`
- Fix approach: Inject the router into `api-client` or surface a `401` event the root layout listens for, then call `router.navigate({ to: '/login', search: { redirect } })`.

---

## Security Considerations

### [HIGH] Anthropic API key must stay server-side — currently fine, guard it

- Risk: CLAUDE.md forbids frontend exposure. Audit result: `grep` for `VITE_ANTHROPIC` / `ANTHROPIC_API_KEY` in `frontend/` returns **zero matches**. The key is read only in `backend/src/submissions/ai-grading.service.ts:33`. Good as of today.
- Files: `backend/src/submissions/ai-grading.service.ts:33`, `backend/.env` (not read, listed only)
- Current mitigation: Frontend calls `apiFetch('/submissions', …)`; backend wraps Anthropic SDK.
- Recommendation: Add a CI check or a lint rule (e.g. `eslint-plugin-no-secrets`) that fails the build if any `VITE_*ANTHROPIC*` or `sk-ant-*` literal appears in `frontend/`. Do **not** let this regress silently.

### [HIGH] `JWT_SECRET=change-me-in-production` in `backend/.env.example:3`

- Risk: The scaffold default is a known-public string. If a developer copies `.env.example → .env` without editing, every issued JWT is trivially forgeable.
- Files: `backend/.env.example:3`
- Current mitigation: Comment-only.
- Recommendation: At NestJS bootstrap (`backend/src/main.ts`), throw if `JWT_SECRET === 'change-me-in-production'` or is shorter than 32 chars. Fail fast, not silently.

### [MED] CORS is single-origin via env

- Risk: `CORS_ORIGIN=http://localhost:5173` in `backend/.env.example:5` is fine for dev, but production will need the deployed Vercel URL. If misconfigured, the frontend either can't call the backend or, worse, wildcard gets added as a shortcut.
- Files: `backend/.env.example:5`, `backend/src/main.ts`
- Recommendation: Document allowed origins in README; never allow `*` once auth is live.

### [LOW] No rate limiting on `/auth/login` or `/auth/register`

- Risk: `AuthController` in `backend/src/auth/auth.controller.ts:24-36` has no throttle. Credential stuffing is unblocked.
- Files: `backend/src/auth/auth.controller.ts`
- Recommendation: Add `@nestjs/throttler` with a conservative default (e.g. 10/min/IP) before the MVP is public.

---

## Performance Bottlenecks

### [LOW] `practice.service.ts` is 504 lines

- Problem: Single service handling noticing items, errors, daily logs, SRS, band reassessment, and import. Any query added naively risks loading the full state per request.
- Files: `backend/src/practice/practice.service.ts` (504 LOC)
- Cause: Every mutation writes back the entire `PracticeState` shape.
- Improvement path: Split into `NoticingItemsService`, `ErrorsService`, `DailyLogsService`, `SrsService`. Keep `practice.service.ts` as an aggregator.

### [LOW] Test history capped at 50 client-side

- Problem: `useTestHistoryQuery.ts:43` slices `next.slice(0, 50)` — silent data loss past 50 tests.
- Files: `frontend/src/features/tests/hooks/useTestHistoryQuery.ts:43`
- Improvement path: Moot once it's server-backed (see [HIGH] practice-state item above).

---

## Fragile Areas

### [HIGH] Backend skeleton state — what exists vs what's still planned

Present and wired:
- `backend/src/auth/` — `AuthController`, `AuthService`, `jwt.strategy.ts` (register, login, `/auth/me`)
- `backend/src/users/` — `UsersService` + `schemas/user.schema.ts` (email, name, `trialEndsAt`, `isPro`)
- `backend/src/common/` — `ZodValidationPipe`, `JwtAuthGuard`, `ProGuard`, `DailyQuotaService`, `CurrentUser` decorator
- `backend/src/practice/` — controller with 15+ endpoints (state, noticing items, errors, daily logs, import, SM-2 at `sm2.ts`)
- `backend/src/submissions/` — Writing Task 2 grading with `AiGradingService` wrapping Anthropic SDK, with mock fallback when `ANTHROPIC_API_KEY` empty
- `backend/src/tests/`, `backend/src/test-submissions/`, `backend/src/lessons/`, `backend/src/vocabulary/` — all instantiated, controllers present
- Mongoose connected via `@nestjs/mongoose` in `backend/src/app.module.ts:17-23`

Conspicuously absent:
- **No `/pricing` endpoint** — `CLAUDE.md:65` requires frontend to read pricing from API. No `PricingModule`, no `PricingController` anywhere in `backend/src/`. `PRO_MONTHLY_PRICE_VND` / `PRO_COHORT_PRICE_VND` are **not** in `backend/.env.example` either.
- **No Speaking grading** — only Writing Task 2 is wired (`ai-grading.service.ts:49, 93`). No audio upload endpoint, no transcription, no Speaking submission schema outside the UI stub at `frontend/src/features/tests/utils/speaking-mock.ts`.
- **No translation endpoint** — `grep "translate\|translation"` in `backend/src/` returns nothing. Per-word VN popover feature from `CLAUDE.md:111-117` has zero backend surface.
- **No diagnostic flow** — `frontend/src/routes/onboarding.band.tsx` collects a self-reported band. No diagnostic test, no placement logic. Matches the roadmap which puts diagnostic post-MVP.
- **No livestream module** — no embed endpoint, no archive schema, no admin/upload flow.
- **No email / retention jobs** — no scheduler, no Resend client, no daily 7 AM digest (CLAUDE.md retention strategy §1).
- **No payment integration** — no VNPay/Momo module; unsurprising pre-pricing.

### [MED] Auth is wired FE↔BE but the login/signup route components are thin

- `frontend/src/routes/login.tsx` (36 lines) and `frontend/src/routes/signup.tsx` (36 lines) are scaffolds that delegate to `features/auth/components/LoginForm.tsx` / `SignupForm.tsx`. No profile/email-verification/password-reset flows exist.
- Files: `frontend/src/routes/login.tsx`, `signup.tsx`, `frontend/src/features/auth/components/`
- Safe modification: Add new auth routes as sibling files under `frontend/src/routes/`; regenerate `routeTree.gen.ts`.

### [MED] Design-system drift — no automated enforcement of `@theme` tokens

- Files: `frontend/src/styles/globals.css` (tokens); components with literal hex values include `components/ui/Polaroid.tsx:52` (`bg-[#F2EDE0]`), `components/ornaments/OrnamentOrbits.tsx:26, 34`, `features/auth/components/AuthShell.tsx:30, 117`, `features/method/Method.tsx:63`, `features/landing/components/SpecimenCard.tsx:53`, `features/landing/components/Hero.tsx:239`, `features/landing/components/BackgroundOrnaments.tsx:12, 20`.
- Why fragile: Most of these hex values happen to match token values (`#6B1F1A` claret, `#B58A3C` ochre) but some don't (`#F2EDE0` ≠ any token and should likely be `bone` `#EEE7D8`). When the palette moves, these SVG strokes and gradients don't.
- Current check: None. CLAUDE.md says "no hex in JSX" but nothing enforces it.
- Fix approach: Add an ESLint rule (`no-restricted-syntax` on `Literal[value=/#[0-9a-fA-F]{3,6}/]`) scoped to `frontend/src/**/*.tsx`, with an allowlist for inline SVG `stroke`/`fill`. Or add a pre-commit grep that fails on new `bg-[#…]` / `text-[#…]` arbitrary values.

### [LOW] `frontend/src/routeTree.gen.ts` is generated — hand-edits will be overwritten

- Files: `frontend/src/routeTree.gen.ts:1-9` declares `// @ts-nocheck` and "This file was automatically generated by TanStack Router. You should NOT make any changes in this file as it will be overwritten."
- Why fragile: Any reviewer or IDE auto-fix that touches this file is silently reverted by `tsr generate` (run on `predev`, `prebuild`, `pretypecheck` in `frontend/package.json:8-10`).
- Safe modification: Edit `frontend/src/routes/*.tsx`, then run `npm run tsr:generate` or restart `npm run dev`.

### [LOW] Git hooks bypass risk (`--no-verify`)

- Files: `.husky/pre-commit` (runs `npx lint-staged`), `.husky/pre-push` (runs `npm --prefix frontend run typecheck`)
- Why fragile: Nothing in the repo structurally prevents `git commit --no-verify` or `git push --no-verify`. CLAUDE.md (line 491) forbids it, but that's policy not enforcement.
- Fix approach: Add a server-side CI job (GitHub Actions) that re-runs `typecheck + lint` on every PR, so skipping hooks locally doesn't skip verification globally. Backend `typecheck` currently runs `nest build`, which is heavier than needed — consider `tsc --noEmit` for the hook.

---

## Scaling Limits

### [MED] AI grading daily limit is hard-coded

- Current capacity: `DAILY_LIMIT = 10` literal at `backend/src/common/daily-quota.service.ts:6`.
- Limit: Per-user quota cannot be tuned per-tier (free vs. Pro) or per-skill (Writing vs. Speaking).
- Scaling path: Move to `config.get('AI_DAILY_LIMIT_PRO')` / `AI_DAILY_LIMIT_FREE`; read from env; allow per-skill split once Speaking lands.

### [LOW] Model version is hard-coded

- Files: `backend/src/submissions/ai-grading.service.ts:10` — `const MODEL_VERSION = 'claude-sonnet-4-5-20250929'`
- Limit: A model upgrade or A/B test requires a code change and redeploy.
- Scaling path: Move to env var `ANTHROPIC_MODEL_GRADING`; add a second `ANTHROPIC_MODEL_TRANSLATION` slot for the planned haiku-based translator.

---

## Dependencies at Risk

### [LOW] TypeScript `~6.0.2` on the frontend is pre-release-ish

- Files: `frontend/package.json:49`
- Risk: TypeScript 6 is very new; ecosystem (`typescript-eslint@8.58.0`, `@types/react@19.2.14`) lags. Minor compat issues may appear.
- Impact: Build may break on a random dependency bump.
- Migration plan: Pin exactly (drop `~`) until the ecosystem stabilizes, or revert to `~5.7.3` (what backend uses at `backend/package.json:65`) for parity.

### [LOW] Vite `^8.0.4` is also bleeding-edge

- Files: `frontend/package.json:51`
- Impact: Plugin ecosystem (`@vitejs/plugin-react`, `@tailwindcss/vite`) may have known issues.
- Migration plan: Same advice — pin exact or consider 7.x LTS.

---

## Missing Critical Features (tracked as "planned but absent")

| Feature | Status | Where it's referenced |
|---|---|---|
| Pricing endpoint + frontend paywall copy with live price | **Absent** | `CLAUDE.md:57-65`; no `PricingModule` in `backend/src/`; no price-related env var in `backend/.env.example` |
| Diagnostic onboarding (placement test) | **Absent** | `CLAUDE.md:158`; only self-reported band picker at `frontend/src/routes/onboarding.band.tsx` |
| Speaking AI grading (audio → band + feedback) | **Absent** | Roadmap step 6; stub only at `frontend/src/features/tests/utils/speaking-mock.ts` |
| Translation feature (EN→VN popover) | **Absent** | `CLAUDE.md:111-117`; zero references in `backend/src/` |
| Weekly livestream embed + archive | **Absent** | `CLAUDE.md:225-229`; only marketing copy at `features/landing/components/Hero.tsx` |
| Email automation (daily 7 AM, Sunday digest) | **Absent** | `CLAUDE.md:222-223`; no scheduler, no Resend client |
| Payment integration (VNPay / Momo) | **Absent** | Roadmap step 13 |
| Audio generation for Listening tests | **Stubbed** | `frontend/src/features/tests/utils/audio-generation.ts:1-31` documents the Phase-2 ElevenLabs flow; current playback falls back to Web Speech API |
| Cohort view (anonymized median) | **Absent** | `CLAUDE.md:222` point 4 |

### [MED] Pricing hardcoding — clean today, discipline required

- Audit: `grep -E "99k|499k|PRO_MONTHLY_PRICE_VND|PRO_COHORT_PRICE_VND"` across the repo returns **only** matches inside `CLAUDE.md:62, 65` (the policy itself) and a string inside `Meridian Design System (1)/ui_kits/web/Meridian Dashboard.html` (external design artifact, not imported). `grep -E "VND|₫|vnd"` across `frontend/src/` returns zero matches.
- Impact: Policy is currently honored — no VND amounts leak.
- Fix approach: When pricing lands, expose `GET /pricing` on the backend (reading env), fetch it via a TanStack Query hook at `frontend/src/features/pricing/hooks/usePricingQuery.ts`, and never `const PRICE = 99000` anywhere.

### [LOW] i18n trap — React package ecosystem offers easy footguns

- Risk: `react-i18next`, `next-intl`, `react-intl`, `lingui` are all one `npm i` away. CLAUDE.md (lines 106, 494) forbids them, but nothing enforces it.
- Audit: `grep -n "react-i18next\|i18next"` in the repo matches only `CLAUDE.md:106, 494` — clean today.
- Fix approach: Add a CI job that fails if `frontend/package.json` gains any `i18n*` / `*intl*` dependency. Alternatively, document the rule in `frontend/README.md` and lean on code review.

---

## Data Validation at Boundaries

### [HIGH] Frontend → backend boundary is validated; backend → frontend often is not

- Present: every write endpoint uses `ZodValidationPipe` (see `backend/src/auth/auth.controller.ts:25, 32`, every `practice.controller.ts` handler, `submissions.controller.ts:25`). `AuthResponseSchema.parse(res)` is called in the controller at `backend/src/auth/auth.controller.ts:28, 35`. Good.
- Absent: most **read** endpoints return a raw mongoose document shape (`practice.controller.ts:44-46` `getState` returns whatever the service returns). The frontend's `apiFetch<T>()` casts to `T` without validation.
- Files: `frontend/src/lib/api-client.ts:55` — `return payload as T` is a cast, not a parse.
- Impact: A schema drift between backend and shared schemas fails at the usage site with a confusing `TypeError`, not at the network boundary with a schema error.
- Fix approach: Convert `apiFetch<T>` to `apiFetch<S extends ZodType>(schema: S, …)` and call `schema.parse(payload)`. Alternatively, wrap each `useQuery` with `select: (data) => Schema.parse(data)`.

---

## Orphan / Unused Files

### [MED] Dashboard screenshots committed to repo root

- Files: `dashboard-current.png` (46 KB) and `dashboard-mine-1.png` (257 KB) sit at `A:/Ielts lerning/` and are not in `.gitignore`. They appear as untracked in `git status`.
- Impact: Bloats the repo; not obvious what they're for; likely design reference snapshots.
- Fix approach: Move to `docs/superpowers/reference/` (where design specs already live) or add `*.png` at repo root to `.gitignore` if these are throwaway. Confirm with the founder before deleting.

### [MED] `Meridian Design System (1)/` folder committed

- Files: `Meridian Design System (1)/` at repo root — contains `ui_kits/web/Meridian Dashboard.html` and probably assets. Not in `.gitignore`, untracked in `git status`.
- Impact: Folder name with spaces and parenthesized versioning is a smell; it's clearly an exported design-system dump, not source. Grep already had to strip one hit from it (the Task-2 lesson page references `"99k…"` style demo content in the HTML).
- Fix approach: Either check it in under `docs/design-system/` with a normalized name, or add it to `.gitignore` if it's a local working copy. Do not let it remain as a parenthesized orphan.

### [LOW] Empty/placeholder feature stubs

- Files: `frontend/src/features/tests/utils/audio-generation.ts` (31 lines, exports nothing — the file comment at line 29 says "This file intentionally exports nothing — the stub exists so grep finds it."). Fine, but worth noting as an intentional placeholder, not an orphan.

### [LOW] Duplicate Prettier/ESLint config in backend

- Files: `backend/eslint.config.mjs`, `backend/.prettierrc` co-exist with the root `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`. The `backend/` folder runs `npm --prefix backend run lint` / `format` via root `package.json:11-14`.
- Why low: Duplication is intentional (backend & frontend have slightly different rule sets), but it is worth auditing that root and per-package configs don't drift in conflicting directions.

---

## Test Coverage Gaps

### [HIGH] Nothing is tested

- What's not tested: literally all of it — see "Tech Debt" first item.
- Priority for first batch:
  1. `shared/utils/band-calculator.ts` — official IELTS rounding is easy to get wrong and is spec-critical (CLAUDE.md:181-185).
  2. `backend/src/practice/sm2.ts` — spaced repetition math, called on every noticing-item review.
  3. `backend/src/common/daily-quota.service.ts` — has a documented race, worth covering with a concurrency test.
  4. `frontend/src/lib/auth.ts` migration helper — complex Zod parsing + localStorage cleanup; easy to break.
  5. `backend/src/submissions/ai-grading.service.ts` — mock fallback branch (`client === null`) is straightforward to cover without a real API key.
- Risk: Silent regressions in band scoring would erode the product's credibility more than any other failure mode (an 8.5 founder product that grades people wrong is fatal).

---

*Concerns audit: 2026-04-22*
