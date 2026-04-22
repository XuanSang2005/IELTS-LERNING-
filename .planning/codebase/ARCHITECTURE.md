# Architecture

**Analysis Date:** 2026-04-22

## Pattern Overview

**Overall:** Folder-based monorepo with two runtime workspaces (`frontend/`, `backend/`) joined by a shared Zod-schema package (`shared/`). Frontend follows a **feature-based SPA** pattern (React + TanStack Router file-based routes). Backend follows a **NestJS modular monolith** (one module per bounded context). Both sides are **schema-first**: every wire-format shape is a Zod schema in `shared/schemas/`, and runtime types are inferred from those schemas.

**Key Characteristics:**
- Monorepo, not workspaces — each folder has its own `package.json`; the root `package.json` holds only Git hooks and cross-workspace orchestrators (`typecheck`, `lint`, `format`).
- Shared Zod schemas are the single source of truth for request/response/state contracts (`shared/schemas/*.ts`), imported by both runtimes via the `@shared/*` path alias.
- Frontend does **no direct HTTP** — every server call flows through `apiFetch<T>()` in `frontend/src/lib/api-client.ts`, which injects the Bearer token and auto-redirects on 401.
- Server state and client state are strictly separated: TanStack Query owns server data, Zustand owns local device state.
- AI provider (Anthropic) is isolated to the backend — the frontend never holds the API key.
- Route-based auth gating: the `/app` and `/tests` runner routes use TanStack Router `beforeLoad` guards against `useAuthStore`. Pro gating is backend-side via `ProGuard`.

## Layers

**Frontend — Routes layer:**
- Purpose: URL-driven composition of features; entry point for every page.
- Location: `frontend/src/routes/`
- Contains: `createFileRoute(...)` modules and the root layout (`__root.tsx`). Dot-named filenames encode nesting (e.g. `app.session.complete.tsx`).
- Depends on: features, stores, `@tanstack/react-router`.
- Used by: `routeTree.gen.ts` (auto-generated) via `createRouter` in `frontend/src/app/providers.tsx`.

**Frontend — Features layer:**
- Purpose: Vertical slices of product functionality. Each feature owns its UI, feature-local hooks, pure utilities, and static data.
- Location: `frontend/src/features/<name>/{components,hooks,utils,data}/`
- Contains: React components (PascalCase), TanStack Query hooks (`*-queries.ts`), mutation hooks (`*-mutations.ts`), pure functions, seed data.
- Depends on: `lib/api-client`, `stores/*`, `@shared/schemas/*`.
- Used by: routes in `frontend/src/routes/`.

**Frontend — Library layer (`lib/`):**
- Purpose: Cross-feature infrastructure — HTTP, env, auth helpers, TanStack Query client.
- Location: `frontend/src/lib/`
- Files: `api-client.ts` (Bearer-injected fetch + `ApiError`), `env.ts` (Zod-validated `import.meta.env`), `auth.ts` (login/signup/logout + legacy-localStorage migration), `query-client.ts` (shared `QueryClient`).
- Depends on: `stores/auth-store`, `@shared/schemas`.
- Used by: every feature making HTTP calls.

**Frontend — State layer:**
- Purpose: Non-server device/session state.
- Location: `frontend/src/stores/`
- Contains: Zustand stores, one per concern. `auth-store.ts` (persisted to `localStorage` key `meridian-auth-v1`, re-validated on rehydrate with `AuthResponseSchema`), `test-runner-store.ts` (ephemeral in-memory answers during a mock).
- Depends on: `@shared/schemas/*`.
- Used by: features + route guards.

**Frontend — Shell layer:**
- Purpose: Cross-cutting UI chrome (header, ornaments, shared UI primitives).
- Location: `frontend/src/components/{layout,ornaments,ui}/`
- Note: This directory is reserved for components that are NOT feature-specific; feature-local components MUST live under `features/<name>/components/` per CLAUDE.md.

**Backend — Controllers layer:**
- Purpose: HTTP-facing. Validate DTOs with Zod via `ZodValidationPipe`, attach auth guards, delegate to services.
- Location: `backend/src/<module>/<module>.controller.ts`
- Pattern: `@Controller('practice')` + `@UseGuards(JwtAuthGuard)` + `@UsePipes(new ZodValidationPipe(SomeDtoSchema))` + `@CurrentUser()` param decorator for the JWT subject.

**Backend — Services layer:**
- Purpose: Business logic. Holds the Mongoose `Model<T>` injections and domain rules.
- Location: `backend/src/<module>/<module>.service.ts`
- Pattern: `@Injectable()` class with `@InjectModel(Foo.name) private readonly fooModel: Model<FooDocument>`. Each service returns shared-schema shapes (not Mongoose documents) via small `toFoo(doc)` mappers.

**Backend — Persistence layer:**
- Purpose: Mongoose schema definitions (class-based, `@nestjs/mongoose` decorators).
- Location: `backend/src/<module>/schemas/*.schema.ts` (e.g. `users/schemas/user.schema.ts`, `submissions/schemas/submission.schema.ts`). A few modules use nested `data/schemas/` (e.g. `practice/data/schemas/noticing-item.schema.ts`).
- Pattern: `@Schema({ timestamps: true })` class, `@Prop(...)` fields, `SchemaFactory.createForClass(Foo)` export, `HydratedDocument<Foo>` type alias.

**Backend — Cross-cutting (`common/`):**
- Purpose: Auth guards, decorators, shared validation pipe, shared services that span modules.
- Location: `backend/src/common/`
- Files: `jwt-auth.guard.ts`, `pro.guard.ts`, `current-user.decorator.ts`, `zod-validation.pipe.ts`, `daily-quota.service.ts` (with `schemas/daily-quota.schema.ts`), `common.module.ts` (re-exports `DailyQuotaService`, `ProGuard`, and `UsersModule`).

**Backend — AI boundary:**
- Purpose: Isolates Anthropic SDK usage. Frontend never imports Anthropic.
- Location: `backend/src/submissions/ai-grading.service.ts`
- Pattern: `new Anthropic({ apiKey })` constructed from `ConfigService`. Model constant `claude-sonnet-4-5-20250929`. Prompts live in `backend/src/submissions/prompts/*.ts`. If `ANTHROPIC_API_KEY` is unset, a deterministic mock is returned (so dev works offline).

**Shared layer:**
- Purpose: Single source of truth for wire-format shapes and pure cross-runtime utilities.
- Location: `shared/schemas/*.ts`, `shared/utils/*.ts`, `shared/seeds/`
- Contains: `auth.ts`, `practice.ts`, `study.ts`, `submission.ts`, `test.ts`, `test-ai-submission.ts`, `lesson.ts`, `vocabulary.ts`; `utils/band-calculator.ts`; `seeds/tests/`.
- Consumed via `@shared/*` alias from both `frontend/` (vite alias + tsconfig paths) and `backend/` (tsconfig paths).

## Data Flow

**Standard read flow (dashboard renders practice state):**

1. Route component in `frontend/src/routes/app.index.tsx` mounts.
2. A feature hook (e.g. `usePracticeState()` in `frontend/src/features/practice/hooks/practice-queries.ts`) registers `useQuery({ queryKey: ['practice','state'], queryFn: () => apiFetch('/practice/state'), enabled: Boolean(token) })`.
3. `apiFetch<T>()` in `frontend/src/lib/api-client.ts` prepends `VITE_API_URL`, attaches `Authorization: Bearer ${token}` from `useAuthStore.getState()`, fetches, and parses JSON.
4. NestJS routes the request: `JwtAuthGuard` (Passport JWT strategy in `backend/src/auth/jwt.strategy.ts`) validates the token and injects `req.user = { userId, email }`.
5. `PracticeController` (`backend/src/practice/practice.controller.ts`) invokes `PracticeService.getState(userId)`.
6. `PracticeService` loads Mongoose documents, maps them with `toNoticingItem`/`toErrorEntry`/`toDailyLog`, and returns a `PracticeStateShape` (imported from `@shared/schemas/practice`).
7. Response deserialises into TanStack Query's cache keyed by `['practice','state']`; downstream hooks (`useProfile`, `useNoticingItems`, `useDueItems`) derive views with `useMemo`.

**Standard write flow (submit essay for AI grading):**

1. Form component calls a mutation hook → `apiFetch('/submissions', { method: 'POST', body: JSON.stringify(dto) })`.
2. `SubmissionsController` validates with `ZodValidationPipe(CreateSubmissionDtoSchema)`.
3. `SubmissionsService.create()` first calls `DailyQuotaService.incrementOrThrow(userId)` — atomic Mongo upsert + `$inc`, throws `BadRequestException` at 11 calls/day.
4. Creates a `Submission` document with `status='submitted'`, returns immediately, and fires `this.queueGrading(id)` **fire-and-forget** (no job queue — plain async).
5. `queueGrading` calls `AiGradingService.gradeTask2({prompt, essay})` which calls Anthropic, strips code fences, `JSON.parse`s, validates with `ModelGradingResultSchema`, and writes `status='graded'` + `grading` payload back.
6. On failure: `status='failed'`, `error` string stored. Frontend polls `/submissions/:id` or `/submissions/today` for status.

**State Management:**
- **Server state:** TanStack Query. `QueryClient` defined once in `frontend/src/lib/query-client.ts` (`staleTime: 30_000`, `retry: 1`, `refetchOnWindowFocus: false`). QueryKeys are co-located with the feature hook (e.g. `practiceStateKey = ['practice','state']`). Not centralised.
- **Client state:** Zustand. `auth-store` is persisted to `localStorage` via `zustand/middleware.persist` with a schema-validated `merge`. `test-runner-store` is ephemeral. One store per concern.
- **Derived state:** Always via `useMemo` inside feature hooks (see `useDueItems`, `useTodayLog`).
- **Route guards read Zustand imperatively:** `useAuthStore.getState().token` (see `routes/app.tsx` `beforeLoad`).

## Key Abstractions

**Zod schema (`shared/schemas/<domain>.ts`):**
- Purpose: Authoritative definition of a wire-format shape. Runtime validation + compile-time type via `z.infer`.
- Examples: `shared/schemas/auth.ts` (`AuthResponseSchema`, `LoginDtoSchema`), `shared/schemas/practice.ts` (`PracticeStateSchema`, `NoticingItemSchema`), `shared/schemas/submission.ts`, `shared/schemas/test.ts`, `shared/schemas/lesson.ts`.
- Pattern: schemas are consumed by (a) `ZodValidationPipe` on controllers, (b) `schema.safeParse` on localStorage rehydrate, (c) `schema.parse` on AI-returned JSON, (d) `z.infer` for TS types everywhere.

**`apiFetch<T>()` (`frontend/src/lib/api-client.ts`):**
- Purpose: Single HTTP choke-point. There is no axios.
- Behaviour: prepends `VITE_API_URL`, sets `Content-Type`/`Accept`, injects Bearer from `useAuthStore`, parses JSON, throws `ApiError` on non-2xx. On 401, clears the auth store and navigates to `/login?redirect=...`.

**TanStack Query hook (`features/*/hooks/*-queries.ts`):**
- Purpose: Wraps `useQuery` + `apiFetch` + `queryKey`. Feature-local, not centralised.
- Examples: `practice-queries.ts`, `submissions.ts`, `grammar-queries.ts`, `vocabulary-queries.ts`, `useTestQuery.ts`, `useTestsQuery.ts`.

**Zustand store (`frontend/src/stores/<name>-store.ts`):**
- Purpose: Local state with optional persistence.
- Examples: `auth-store.ts` (persisted, schema-validated rehydrate), `test-runner-store.ts` (ephemeral).

**NestJS feature module:**
- Purpose: Bounded context. Bundles a controller + service + its Mongo schema(s).
- Example template: `backend/src/<name>/{<name>.module.ts, <name>.controller.ts, <name>.service.ts, schemas/*.schema.ts}`.
- Current modules (see `backend/src/app.module.ts`): `AuthModule`, `UsersModule`, `PracticeModule`, `SubmissionsModule`, `TestsModule`, `TestSubmissionsModule`, `LessonsModule`, `VocabularyModule`.

**`ZodValidationPipe` (`backend/src/common/zod-validation.pipe.ts`):**
- Purpose: Bridges Zod and Nest's `PipeTransform`. Replaces class-validator/class-transformer — no DTO classes exist in this codebase.
- Usage: `@UsePipes(new ZodValidationPipe(SomeDtoSchema))` or `@Body(new ZodValidationPipe(...))`.

## Entry Points

**Frontend — `frontend/src/main.tsx`:**
- Boots React 19 into `#root` under `StrictMode`, wraps with `<AppProviders />`, imports `@/styles/globals.css`.

**Frontend — `frontend/src/app/providers.tsx`:**
- Creates the TanStack Router instance from the generated `routeTree`, exposes it via `RouterProvider`, wraps with `QueryClientProvider`. Declares the `@tanstack/react-router` module augmentation so `<Link>` is type-safe.
- `defaultPreload: 'intent'` is set here (hover-to-preload).

**Frontend — `frontend/src/routes/__root.tsx`:**
- Root layout. Switches between "full-bleed" routes (landing, study, method, login, signup, `/app/*`, `/tests/*`, `/profile`, `/onboarding/*`) and a default chrome that shows the legacy `<Header />` + centred `<main>`.
- Mounts TanStack Router and React Query devtools in dev only.

**Frontend — `frontend/index.html`:** Vite HTML entry that loads `/src/main.tsx`.

**Backend — `backend/src/main.ts`:**
- `NestFactory.create(AppModule, { cors: false })` → enables CORS with an origin matcher that accepts any `localhost:*` in non-production (plus comma-separated `CORS_ORIGIN`) → listens on `process.env.PORT ?? 4000`.

**Backend — `backend/src/app.module.ts`:**
- Wires `ConfigModule.forRoot({ isGlobal: true })`, `MongooseModule.forRootAsync` (URI from `MONGODB_URI`), and every feature module.

**Backend — `backend/src/app.controller.ts`:**
- `GET /` health check returning `{ status: 'ok', service: 'meridian-api', version: '0.1.0' }`.

## Error Handling

**Strategy:** Fail loud on the server; translate to editorial copy on the client.

**Patterns:**
- Backend throws typed Nest exceptions (`UnauthorizedException`, `ConflictException`, `BadRequestException`, `ForbiddenException`, `NotFoundException`). `ZodValidationPipe` throws `BadRequestException({ message, issues })` on validation failure.
- `ai-grading.service.ts` validates model output with `ModelGradingResultSchema.safeParse` and throws descriptive errors — the caller catches and records `status='failed'` + `error` on the submission document.
- Frontend `apiFetch` throws `ApiError(status, statusText, body)`. On 401 it clears the auth store and navigates to `/login?redirect=<current>`.
- Copy translation lives in `frontend/src/lib/auth.ts` → `authErrorCopy(err, mode)` — maps 400/401/404/409/429/5xx to editorial strings.
- Zustand `persist` uses a schema-validated `merge` so corrupted localStorage never crashes rehydrate — falls back to `current` (empty) state.

## Cross-Cutting Concerns

**Logging:**
- Backend: NestJS `Logger` per service (e.g. `SubmissionsService`, `AiGradingService`). Grading logs include `userId`, `submissionId`, `band`, token counts, and an estimated USD cost (see `estimateCost` in `submissions.service.ts`).
- Frontend: `console.error` only; no framework-level logger.

**Validation:**
- Zod is the only validator. No `class-validator`, no `joi`. Controllers use `@UsePipes(new ZodValidationPipe(Schema))`; Zustand `merge` uses `safeParse`; AI output uses `safeParse`.

**Authentication:**
- JWT signed by `@nestjs/jwt` with `JWT_SECRET`/`JWT_EXPIRES_IN` (default `24h`) — see `backend/src/auth/auth.module.ts`. Password hashing via `bcrypt` cost 12 (see `auth.service.ts`).
- Frontend stores the token in the persisted Zustand `auth-store`; `apiFetch` injects `Authorization: Bearer <token>` on every request.
- Route-level gate: `routes/app.tsx` `beforeLoad` redirects to `/login?redirect=...` when no token.
- Server-level gate: `JwtAuthGuard` on every authenticated controller; `ProGuard` (`backend/src/common/pro.guard.ts`) additionally checks `isPro || trialEndsAt > now` and throws a `pro_required` 403 with editorial copy.
- Trials: 7 days set at registration (`UsersService.create` → `trialEndsAt = now + 7d`). Trial state lives on the `User` document.

**Quota / rate limiting:**
- `DailyQuotaService` (`backend/src/common/daily-quota.service.ts`) — shared atomic counter across essay and test-writing submissions, 10 AI gradings per user per UTC day. Stored in its own Mongo collection via `schemas/daily-quota.schema.ts`.

**CORS:** Matcher in `backend/src/main.ts` — `CORS_ORIGIN` comma list plus automatic localhost allow-list outside production.

**Env validation:**
- Frontend: `frontend/src/lib/env.ts` — Zod-parses `import.meta.env`, throws at module load on failure. Only `VITE_API_URL` today.
- Backend: `@nestjs/config` `ConfigService.get(...)`, no Zod env schema yet. `JwtStrategy` throws if `JWT_SECRET` is missing; `AiGradingService` logs a warning and falls back to mocks if `ANTHROPIC_API_KEY` is missing.

---

*Architecture analysis: 2026-04-22*
