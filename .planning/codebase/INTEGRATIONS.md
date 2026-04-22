# External Integrations

**Analysis Date:** 2026-04-22

## APIs & External Services

**AI / LLM — Anthropic Claude (wired, server-side only):**
- Service: Anthropic Messages API
- SDK: `@anthropic-ai/sdk` `^0.90.0` (backend dependency)
- Client construction: `backend/src/submissions/ai-grading.service.ts`
  - `new Anthropic({ apiKey })` in the `AiGradingService` constructor
  - If `ANTHROPIC_API_KEY` is absent, `client` is set to `null` and the service returns deterministic mock grading (`mockTask2Grade`, `mockWritingTestGrade`) — the end-to-end flow works without a key
- Model in use (grading):
  - `claude-sonnet-4-5-20250929` — constant `MODEL_VERSION` at `backend/src/submissions/ai-grading.service.ts:10`
  - Called from `AiGradingService.gradeTask2` and `AiGradingService.gradeWritingTest`
  - `max_tokens: 2000`; system prompts in `backend/src/submissions/prompts/task2-grading.ts` and `prompts/writing-test-grading.ts`
  - Response JSON is stripped of code fences, parsed, then validated with `ModelGradingResultSchema` from `shared/schemas/submission.ts`
  - Token usage (`input_tokens + output_tokens`) is captured and returned as `tokensUsed` on `GradingResult`
- Model planned but not yet wired:
  - `claude-haiku-4-5-20251001` — intended for the per-phrase EN→VN translation feature (see `CLAUDE.md` → "AI integration"). No translation endpoint or module exists yet in `backend/src/`.
- Auth: `ANTHROPIC_API_KEY` env var (backend-only; never exposed to the browser)
- Rate limiting: `backend/src/common/daily-quota.service.ts` enforces `DAILY_LIMIT = 10` AI-grading calls per user per day via an atomic `findOneAndUpdate` + `$inc` on the `DailyQuota` Mongo collection. Call `incrementOrThrow(userId)` BEFORE hitting Claude so tokens are never paid for rejected requests.

**AI — Other:**
- `FAL_KEY` appears in `frontend/.env.local` (a gitignored personal override). It is **not** referenced in any committed source or Zod env schema and is not a recognised integration. Treat as stray.

## Data Storage

**Databases:**
- MongoDB (wired)
  - Client: Mongoose `^9.4.1` via `@nestjs/mongoose` `^11.0.4`
  - Connection: `MongooseModule.forRootAsync` in `backend/src/app.module.ts`, reading `MONGODB_URI` via `ConfigService`
  - Feature collections modelled under `backend/src/**/schemas/`:
    - `users/schemas/` — credentials, trial state, Pro flag
    - `submissions/schemas/` — Writing Task 2 submissions + grading results
    - `test-submissions/` — full Writing test submissions
    - `practice/` — daily loop + SRS data
    - `lessons/schemas/`, `vocabulary/schemas/`, `tests/schemas/`
    - `common/schemas/` — shared documents including `daily-quota.schema`

**File Storage:**
- None wired. All lesson / vocabulary / test content lives in local TypeScript seed files under `backend/src/<module>/data/` and `shared/seeds/`.

**Caching:**
- None (no Redis, no Memcached, no in-memory LRU package). `CLAUDE.md` notes translations should be "cached aggressively" but no cache layer exists yet.

## Authentication & Identity

**Auth Provider:**
- Custom JWT auth (wired)
  - Module: `backend/src/auth/auth.module.ts`
  - Login/register: `backend/src/auth/auth.service.ts`
    - bcrypt cost factor `12`
    - Returns `{ token, user }` matching `AuthResponseSchema` in `shared/schemas/auth.ts`
  - JWT strategy: `backend/src/auth/jwt.strategy.ts` — `passport-jwt`, Bearer header extraction, enforces expiration
  - Token settings: `JWT_SECRET` + `JWT_EXPIRES_IN` (default `24h`) via `ConfigService`
  - Guard: `backend/src/common/jwt-auth.guard.ts`
  - Pro gating: `backend/src/common/pro.guard.ts` — 403 with `{ code: 'pro_required', message: 'Meridian Pro continues the programme.' }` for non-Pro / expired-trial users
  - Current-user decorator: `backend/src/common/current-user.decorator.ts`
- Frontend consumption:
  - Token stored in Zustand (persisted to `localStorage` under key `meridian-auth-v1`) at `frontend/src/stores/auth-store.ts`
  - `frontend/src/lib/api-client.ts` attaches `Authorization: Bearer <token>` automatically and redirects to `/login` on 401
  - No third-party identity provider (no Auth0, Clerk, Supabase Auth, NextAuth, Firebase Auth)

**Session:**
- Stateless JWT only. No refresh-token rotation; single 24h access token.

## Monitoring & Observability

**Error Tracking:**
- None wired (no Sentry, no Rollbar, no Bugsnag)

**Logs:**
- Backend: Nest's built-in `Logger` (e.g. `this.logger.warn(...)` in `AiGradingService`)
- Frontend: `console.error` only (e.g. `frontend/src/lib/env.ts` on invalid env)

**Analytics:**
- None wired. `CLAUDE.md` earmarks Plausible or PostHog for post-MVP — neither SDK is installed.

## CI/CD & Deployment

**Hosting:**
- Not yet deployed. Planned targets documented in `CLAUDE.md`:
  - Frontend → Vercel (MVP free tier)
  - Backend → Railway or Render ($5-10/month)
  - Database → MongoDB Atlas (M0 during MVP, M10 post-launch)
- No deployment config in the repo (no `vercel.json`, no `Dockerfile`, no `render.yaml`, no `railway.toml`, no Procfile)

**CI Pipeline:**
- None. No `.github/workflows/`, no `.gitlab-ci.yml`, no `.circleci/`
- Local quality gates only:
  - `.husky/pre-commit` → `npx lint-staged` (per-workspace ESLint + Prettier via `.lintstagedrc.cjs`)
  - `.husky/pre-push` → `npm --prefix frontend run typecheck`
- Root `package.json` exposes aggregate scripts: `lint`, `lint:fix`, `format`, `format:check`, `typecheck`

## Environment Configuration

**Frontend — `frontend/.env.example`, validated by `frontend/src/lib/env.ts`:**
- `VITE_API_URL` — string URL, defaults to `http://localhost:4000`
- Any variable not prefixed `VITE_` is invisible to the browser (Vite rule)
- Runtime contract: Zod `envSchema.safeParse(import.meta.env)`; on failure `throw new Error('Invalid environment variables...')` at module load

**Backend — `backend/.env.example`:**
- `PORT` (default `4000`, read in `backend/src/main.ts`)
- `MONGODB_URI` (default `mongodb://localhost:27017/meridian`)
- `JWT_SECRET` (no default — `JwtStrategy` throws `JWT_SECRET not configured` if missing)
- `JWT_EXPIRES_IN` (default `24h`)
- `CORS_ORIGIN` — comma-separated allow-list consumed by `buildOriginMatcher` in `backend/src/main.ts`; `*` or any `NODE_ENV !== 'production'` also allows any `localhost:*`
- `ANTHROPIC_API_KEY` — optional; absence forces deterministic mock grading

**Secrets location:**
- `backend/.env` (gitignored; `.env.example` only is committed)
- `frontend/.env.local` (gitignored)
- No secret manager (no Vault, no AWS Secrets Manager, no Doppler) integration

## Webhooks & Callbacks

**Incoming:**
- None. No webhook controllers, no payment callbacks, no `/hooks/*` routes. `AppController` (`backend/src/app.controller.ts`) is a plain health check.

**Outgoing:**
- Only the Anthropic Messages API call from `AiGradingService.gradeTask2` / `gradeWritingTest`.

## Planned but Not Yet Integrated

Per `CLAUDE.md`, the following are on the roadmap but have **no code, dependency, or env var** in the repo today:

| Area | Planned provider | Status |
|------|------------------|--------|
| Payments | VNPay or Momo | Not wired — no SDK, no `/payments` route, no pricing endpoint (`GET /pricing` referenced in docs, not implemented) |
| Email / transactional | Resend (3000/mo free) | Not wired — no SDK, no templates |
| Analytics | Plausible or PostHog | Not wired — no snippet in `frontend/index.html` |
| Livestream embed | Facebook / YouTube Live | Not wired — no `features/livestream/` directory |
| Translation API | Claude Haiku (`claude-haiku-4-5-20251001`) | Not wired — no translation endpoint, no caching layer |
| Domain | TBD | Placeholder only |

Pricing values are deliberately **not** committed (see `CLAUDE.md` § Business model). Future `/pricing` endpoint must read from env (`PRO_MONTHLY_PRICE_VND`, `PRO_COHORT_PRICE_VND`) — neither key is yet present in `backend/.env.example`.

---

*Integration audit: 2026-04-22*
