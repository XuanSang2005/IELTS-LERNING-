# Codebase Structure

**Analysis Date:** 2026-04-22

## Directory Layout

```
Ielts lerning/                                  # repo root (Meridian monorepo)
├── .claude/                                    # GSD agents, commands, hooks (not runtime code)
│   ├── agents/                                 # gsd-*.md agent definitions
│   ├── commands/gsd/                           # slash-command definitions
│   ├── hooks/                                  # GSD workflow hooks (JS/SH)
│   └── get-shit-done/                          # GSD framework support files
├── .husky/                                     # Git hooks
│   ├── pre-commit                              # runs lint-staged
│   └── pre-push                                # runs typecheck
├── .lintstagedrc.cjs                           # lint-staged config (frontend + backend)
├── .planning/codebase/                         # GSD codebase analysis docs (this file lives here)
├── .prettierignore / .prettierrc.json          # root Prettier config
├── .vscode/                                    # editor settings
├── CLAUDE.md                                   # master project guidance (read first)
├── backend/                                    # NestJS API workspace
│   ├── .env / .env.example                     # backend env (MONGODB_URI, JWT_SECRET, ANTHROPIC_API_KEY, PORT, CORS_ORIGIN)
│   ├── dist/                                   # `nest build` output (gitignored)
│   ├── eslint.config.mjs                       # backend ESLint flat config
│   ├── nest-cli.json                           # Nest CLI config
│   ├── package.json                            # backend deps + scripts
│   ├── src/                                    # NestJS source (see "Backend src" below)
│   ├── test/jest-e2e.json                      # Jest e2e config
│   ├── tsconfig.json                           # backend tsconfig (paths `@shared/*` → `../shared/*`)
│   └── tsconfig.build.json                     # build-time tsconfig
├── frontend/                                   # React + Vite SPA workspace
│   ├── .env.example / .env.local               # frontend env (VITE_API_URL)
│   ├── .tanstack/                              # TanStack tooling cache
│   ├── dist/                                   # `vite build` output (gitignored)
│   ├── eslint.config.js                        # frontend ESLint flat config
│   ├── index.html                              # Vite HTML entry
│   ├── package.json                            # frontend deps + scripts
│   ├── public/                                 # static assets (favicon.svg, icons.svg, images/)
│   ├── src/                                    # React source (see "Frontend src" below)
│   ├── tsconfig.app.json                       # app tsconfig (paths `@/*`, `@shared/*`)
│   ├── tsconfig.json / tsconfig.node.json      # composite tsconfigs
│   ├── tsr.config.json                         # TanStack Router CLI config
│   └── vite.config.ts                          # Vite + Tailwind v4 + router plugin + aliases
├── shared/                                     # Cross-FE/BE code (pure TS, no runtime framework)
│   ├── schemas/                                # Zod schemas (source of truth for wire shapes)
│   ├── seeds/tests/                            # seed JSON/TS for practice tests
│   ├── utils/band-calculator.ts                # pure IELTS band math
│   └── tsconfig.json                           # compiler config (schemas only)
├── docs/superpowers/specs/                     # design specs (learn page, dashboard, writing, tests)
├── scripts/generate-editions.mjs               # build-time content generator
├── node_modules/                               # root-level hoisted deps (husky, lint-staged)
├── package.json                                # root: Git hooks + cross-workspace scripts + zod dep
└── package-lock.json
```

### Frontend src (`frontend/src/`)

```
src/
├── app/
│   └── providers.tsx                           # QueryClientProvider + RouterProvider; createRouter(routeTree)
├── components/                                 # Cross-feature chrome ONLY (no feature-specific code)
│   ├── layout/Header.tsx                       # legacy default-layout header
│   ├── ornaments/                              # decorative SVGs (OrnamentFeather, OrnamentOrbits, OrnamentPlate)
│   └── ui/Polaroid.tsx                         # shared UI primitive
├── features/                                   # Vertical product slices (see "Feature folders" below)
│   ├── auth/components/                        # AuthShell, AuthInput, AuthSubmit, FormErrorNote, LoginForm, SignupForm, SuccessTransition
│   ├── grammar/
│   │   ├── components/GrammarPage.tsx
│   │   └── hooks/grammar-queries.ts
│   ├── landing/components/                     # Nav, Hero, TrustStrip, SpecimenCard, BackgroundOrnaments
│   ├── method/Method.tsx                       # single-file feature (no sub-folders)
│   ├── practice/
│   │   ├── components/                         # AppNav, BandSelector, DisciplineProgress, LevelCard, PhaseCard, SrsCard
│   │   ├── data/band-options.ts
│   │   ├── hooks/                              # practice-queries.ts, practice-mutations.ts, submissions.ts
│   │   └── utils/                              # dates.ts, session-planner.ts, sm2.ts
│   ├── review/components/                      # ItemForm, ReviewModal
│   ├── session/
│   │   ├── components/                         # SessionSidebar, TodaySessionCard, steps/{AIFeedbackStep, BandBreakdownCard, DrillStep, EssayWithAnnotations, FlashcardReviewStep, LessonStep, NoticeCaptureStep, SaveItemsStep, StepRouter, StepShell, WritingTaskStep}
│   │   └── hooks/use-session-blueprint.ts
│   ├── study/
│   │   ├── Study.tsx                           # top-level feature component
│   │   ├── components/                         # DisciplineTabs, FeaturedLesson, LessonCard, LessonGrid, LibrarySidebar, StudyHeader
│   │   └── data/                               # lesson-index.ts, lessons.ts
│   ├── tests/
│   │   ├── components/                         # AudioPlayer, CriteriaBar, EssayEditor, FilterBar, MockRecorder, NavFooter, PassageReader, ProgressStrip, ResultsExplanations/Locked/Score/Transcript/Vocabulary, SpeakingBody, SpeakingResults, TestCard, TestLibrary, TestRunner, Timer, WritingBody, WritingResults, questions/{primitives, QuestionRenderer, answer-utils}
│   │   ├── hooks/                              # useTestQuery, useTestsQuery, useTestHistoryQuery, useWritingTestSubmission
│   │   └── utils/                              # audio-generation, band-conversion, essay-drafts, format-time, scoring, speaking-mock
│   └── vocabulary/
│       ├── components/VocabularyPage.tsx
│       └── hooks/vocabulary-queries.ts
├── lib/                                        # Cross-feature infrastructure
│   ├── api-client.ts                           # apiFetch<T>() + ApiError; single HTTP choke-point
│   ├── auth.ts                                 # login/signup/logout/authErrorCopy/migrateLocalPracticeIfPresent
│   ├── env.ts                                  # Zod-validated import.meta.env (VITE_API_URL)
│   └── query-client.ts                         # shared TanStack Query client
├── routes/                                     # TanStack Router file-based routes (see "Routes" below)
├── routeTree.gen.ts                            # GENERATED — do not edit
├── schemas/practice.ts                         # frontend-local schema shim (mostly empty; prefer shared/schemas/)
├── stores/                                     # Zustand stores (one per concern)
│   ├── auth-store.ts                           # persisted to localStorage (meridian-auth-v1), schema-validated rehydrate
│   └── test-runner-store.ts                    # ephemeral mock-test runner state
├── styles/globals.css                          # Tailwind v4 + @theme tokens (ivory, bone, ink, claret, ...)
└── main.tsx                                    # React entry — createRoot(#root).render(<AppProviders />)
```

### Frontend routes (`frontend/src/routes/`)

```
routes/
├── __root.tsx                                  # root layout; decides full-bleed vs default chrome
├── index.tsx                                   # "/" landing
├── about.tsx                                   # "/about"
├── login.tsx                                   # "/login"
├── signup.tsx                                  # "/signup"
├── method.tsx                                  # "/method"
├── profile.tsx                                 # "/profile"
├── study.tsx                                   # "/study"
├── onboarding.band.tsx                         # "/onboarding/band"
├── app.tsx                                     # "/app" layout + auth beforeLoad guard
├── app.index.tsx                               # "/app" dashboard
├── app.grammar.tsx                             # "/app/grammar"
├── app.notebook.tsx                            # "/app/notebook"
├── app.vocabulary.tsx                          # "/app/vocabulary"
├── app.session.tsx                             # "/app/session" layout
├── app.session.index.tsx                       # "/app/session"
├── app.session.complete.tsx                    # "/app/session/complete"
├── tests.tsx                                   # "/tests" layout
├── tests.index.tsx                             # "/tests"
├── tests.$testId.tsx                           # "/tests/:testId" layout (runner hides AppNav)
├── tests.$testId.index.tsx                     # "/tests/:testId"
└── tests.$testId.results.tsx                   # "/tests/:testId/results"
```

### Backend src (`backend/src/`)

```
src/
├── main.ts                                     # NestFactory bootstrap + CORS + port listen
├── app.module.ts                               # ConfigModule, MongooseModule.forRootAsync, every feature module
├── app.controller.ts                           # GET / health
├── auth/
│   ├── auth.module.ts                          # Passport + @nestjs/jwt async registration
│   ├── auth.controller.ts                      # POST /auth/register, /auth/login, GET /auth/me
│   ├── auth.service.ts                         # bcrypt cost 12, register/login, buildResponse → AuthResponseSchema
│   └── jwt.strategy.ts                         # Passport JWT from Bearer header, payload { sub, email }
├── common/                                     # cross-cutting
│   ├── common.module.ts                        # re-exports DailyQuotaService, ProGuard, UsersModule
│   ├── current-user.decorator.ts               # @CurrentUser() → { userId, email }
│   ├── daily-quota.service.ts                  # atomic 10/day AI-grading counter
│   ├── jwt-auth.guard.ts                       # AuthGuard('jwt') wrapper
│   ├── pro.guard.ts                            # isPro || trialActive gate with editorial 403 copy
│   ├── zod-validation.pipe.ts                  # PipeTransform<unknown, T> using Zod safeParse
│   └── schemas/daily-quota.schema.ts           # Mongoose schema for the quota counter
├── lessons/
│   ├── lessons.constants.ts                    # slug/day constants
│   ├── lessons.controller.ts                   # /lessons, /lessons/today, /lessons/day/:day, /lessons/:id
│   ├── lessons.module.ts
│   ├── lessons.service.ts                      # seed-on-boot + Mongo lookup
│   ├── data/lesson-seed.ts                     # static seed content
│   └── schemas/lesson.schema.ts                # Mongoose lesson schema
├── practice/
│   ├── practice.controller.ts                  # /practice/{state, profile, band, noticing-items, errors, daily-logs, import}
│   ├── practice.module.ts
│   ├── practice.service.ts                     # SRS + daily-log + profile + localStorage import migration
│   ├── sm2.ts                                  # SM-2 spaced-repetition algorithm
│   ├── data/grammar-seed.ts                    # GRAMMAR_SYSTEM_ITEMS seeded into new accounts
│   └── data/schemas/                           # daily-log.schema.ts, error-entry.schema.ts, noticing-item.schema.ts
├── submissions/                                # essay-only writing submissions (legacy daily submission)
│   ├── ai-grading.service.ts                   # Anthropic SDK wrapper; model claude-sonnet-4-5-20250929; mock fallback
│   ├── submissions.controller.ts               # /submissions create/list/retry
│   ├── submissions.module.ts
│   ├── submissions.service.ts                  # fire-and-forget grading queue, daily-quota enforced
│   ├── prompts/                                # task2-grading.ts, writing-test-grading.ts (system prompts)
│   └── schemas/submission.schema.ts
├── tests/                                      # mock test catalogue (reading/listening/writing/speaking)
│   ├── tests.constants.ts
│   ├── tests.controller.ts
│   ├── tests.module.ts
│   ├── tests.service.ts                        # seeds from shared/seeds/tests on boot
│   └── schemas/test.schema.ts
├── test-submissions/                           # mock test submissions (reading/listening/writing/speaking results)
│   ├── test-submissions.controller.ts
│   ├── test-submissions.module.ts
│   ├── test-submissions.service.ts
│   └── schemas/test-submission.schema.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts                        # findByEmail/findById/create (sets trialEndsAt = now+7d) / updateProfile
│   └── schemas/user.schema.ts                  # email, passwordHash, name, trialEndsAt, isPro, profile (UserProfile)
└── vocabulary/
    ├── vocabulary.controller.ts
    ├── vocabulary.module.ts
    ├── vocabulary.service.ts
    ├── data/vocab-seed.ts
    └── schemas/vocab-word.schema.ts
```

### Shared (`shared/`)

```
shared/
├── schemas/                                    # every wire-format shape (Zod source of truth)
│   ├── auth.ts                                 # LoginDto, SignupDto/RegisterDto, User, AuthResponse
│   ├── lesson.ts                               # Lesson + filter shapes
│   ├── practice.ts                             # Discipline, Phase, NoticingItem, ErrorEntry, DailyLog, UserProfile, PracticeStateShape + all DTOs
│   ├── study.ts                                # study catalogue
│   ├── submission.ts                           # Submission, CreateSubmissionDto, GradingResult, ModelGradingResultSchema
│   ├── test.ts                                 # Test, Question, WritingPrompt, Answer, AnswerValue, TestMode
│   ├── test-ai-submission.ts                   # WritingTestSubmission shape
│   └── vocabulary.ts
├── seeds/tests/                                # seed data for mock tests
├── utils/band-calculator.ts                    # calculateBand, levelToMidBand, levelToRange
└── tsconfig.json                               # compile schemas/
```

## Directory Purposes

**`frontend/src/app/`:**
- Purpose: Application-level wiring that isn't infrastructure (lib) or UI (components/features).
- Contains: `providers.tsx` — creates the Router + QueryClient providers.
- Key files: `frontend/src/app/providers.tsx`

**`frontend/src/components/`:**
- Purpose: Shared, cross-feature UI only. Per CLAUDE.md: "Don't put feature-specific components in `src/components/`".
- Contains: `layout/` (chrome like Header), `ornaments/` (decorative SVGs), `ui/` (reusable primitives).
- Key files: `frontend/src/components/layout/Header.tsx`, `frontend/src/components/ui/Polaroid.tsx`

**`frontend/src/features/`:**
- Purpose: Product slices. Everything specific to a feature lives here: components, feature-local hooks, pure utilities, seed/mock data.
- Structure: `features/<name>/{components/,hooks/,utils/,data/}` (subfolders optional — some features are single files like `method/Method.tsx`).
- Key files: see the full tree above.

**`frontend/src/lib/`:**
- Purpose: Cross-feature infrastructure. HTTP client, env parsing, auth helpers, query client.
- Contains: `api-client.ts`, `auth.ts`, `env.ts`, `query-client.ts`.
- Key files: `frontend/src/lib/api-client.ts`, `frontend/src/lib/env.ts`

**`frontend/src/routes/`:**
- Purpose: TanStack Router file-based routes. Each file is a `createFileRoute(path)` module.
- Contains: route modules + `__root.tsx` layout. Dot-named filenames encode nesting: `app.session.complete.tsx` → `/app/session/complete`. `$param` segments are dynamic: `tests.$testId.index.tsx` → `/tests/:testId`.
- Key files: `frontend/src/routes/__root.tsx`, `frontend/src/routes/app.tsx`

**`frontend/src/schemas/`:**
- Purpose: Frontend-local Zod schemas (rare — prefer `shared/schemas/` whenever both runtimes touch the shape).
- Current state: contains only `practice.ts` (near-empty shim). New schemas should default to `shared/schemas/`.

**`frontend/src/stores/`:**
- Purpose: Zustand stores, one per concern. NEVER feature-local.
- Contains: `auth-store.ts`, `test-runner-store.ts`.

**`frontend/src/styles/`:**
- Purpose: Global CSS. Tailwind v4 `@theme` tokens (ivory/bone/ink/claret/line/sage/ochre/ink-warm plus Fraunces/Geist/JetBrains Mono font families). Paper-grain SVG noise applied to `body`.
- Key files: `frontend/src/styles/globals.css`

**`backend/src/<module>/`:**
- Purpose: One Nest module per bounded context. Each holds its controller, service, Nest module, and Mongoose schema(s).
- Contains: `<name>.controller.ts`, `<name>.service.ts`, `<name>.module.ts`, `schemas/*.schema.ts`. Some modules add `data/` (seed content) or `prompts/` (AI system prompts).

**`backend/src/common/`:**
- Purpose: Cross-module guards, decorators, pipes, and shared services.
- Contains: guards (`jwt-auth.guard.ts`, `pro.guard.ts`), `current-user.decorator.ts`, `zod-validation.pipe.ts`, `daily-quota.service.ts` + `schemas/daily-quota.schema.ts`, `common.module.ts`.

**`shared/schemas/`:**
- Purpose: Source of truth for every wire-format shape. Consumed by both runtimes via `@shared/*`.
- Rule: When persisting locally (localStorage, API, rehydrate), version the key (`meridian-<feature>-v1`) and validate on rehydrate using the schema.

**`shared/utils/`:**
- Purpose: Pure cross-runtime utilities. Currently holds band-calculation logic (`band-calculator.ts`) shared by `PracticeService` (backend) and feature hooks (frontend).

**`shared/seeds/`:**
- Purpose: Static seed data shipped into the DB on boot.
- Contains: `tests/` (mock tests seeded by `TestsService`).

**`docs/superpowers/specs/`:**
- Purpose: Design-spec documents for feature areas (learn page, dashboard, writing backend, writing/speaking tests).
- Generated: No. Committed: Yes.

**`.planning/`:**
- Purpose: GSD planning artefacts, including this `codebase/` folder of architecture/convention/concerns docs consumed by `/gsd-plan-phase`.
- Generated: Yes (by GSD commands). Committed: Yes.

**`.claude/`:**
- Purpose: Claude Code GSD configuration — agents, slash commands, hooks.
- Generated: No. Committed: Yes (except secrets).

**`scripts/`:**
- Purpose: Ad-hoc build/codegen scripts.
- Current content: `generate-editions.mjs`.

## Key File Locations

**Entry Points:**
- `frontend/src/main.tsx`: React 19 root.
- `frontend/src/app/providers.tsx`: Router + Query providers.
- `frontend/src/routes/__root.tsx`: root layout.
- `frontend/index.html`: Vite HTML entry.
- `backend/src/main.ts`: NestFactory bootstrap.
- `backend/src/app.module.ts`: top-level DI graph.
- `backend/src/app.controller.ts`: `GET /` health.

**Configuration:**
- `frontend/vite.config.ts`: Vite plugins (`tanstackRouter`, `react`, `tailwindcss`), aliases `@` and `@shared`, dev port 5173.
- `frontend/tsr.config.json`: TanStack Router CLI — routes in `./src/routes`, output `./src/routeTree.gen.ts`, ignore prefix `-`.
- `frontend/tsconfig.app.json`: `paths` for `@/*` and `@shared/*`; `erasableSyntaxOnly: true` (no parameter-property constructors).
- `backend/tsconfig.json`: `paths` for `@shared/*` → `../shared/*`; NodeNext module resolution.
- `shared/tsconfig.json`: `include: ["schemas/**/*.ts"]`.
- Root `package.json`: Husky hooks + `format`/`lint`/`typecheck` orchestrators that delegate to each workspace.
- `.lintstagedrc.cjs`: cross-workspace lint-staged rules.

**Core Infrastructure:**
- `frontend/src/lib/api-client.ts`: single HTTP choke-point.
- `frontend/src/lib/env.ts`: Zod-validated env.
- `frontend/src/lib/auth.ts`: auth mutations + legacy migration.
- `frontend/src/lib/query-client.ts`: shared TanStack Query client.
- `frontend/src/stores/auth-store.ts`: persisted auth.
- `backend/src/common/zod-validation.pipe.ts`: Zod ↔ Nest bridge.
- `backend/src/common/jwt-auth.guard.ts`: JWT guard.
- `backend/src/common/pro.guard.ts`: paywall guard.
- `backend/src/common/daily-quota.service.ts`: rate limit.
- `backend/src/submissions/ai-grading.service.ts`: Anthropic boundary.

**Generated files — do NOT edit:**
- `frontend/src/routeTree.gen.ts` (regenerated by `npm run tsr:generate`, also auto-run on `predev`/`prebuild`/`pretypecheck`).
- `frontend/dist/`, `backend/dist/` (build outputs).

## Naming Conventions

**Files:**
- React components: **PascalCase.tsx** — `Hero.tsx`, `AppNav.tsx`, `QuestionRenderer.tsx`, `Polaroid.tsx`, `StepRouter.tsx`.
- Feature-local hooks: **kebab-case.ts** — `practice-queries.ts`, `use-session-blueprint.ts`, `grammar-queries.ts`. A few hook files use the `useXxxQuery.ts` camelCase pattern in `features/tests/hooks/` (`useTestQuery.ts`, `useTestsQuery.ts`, `useWritingTestSubmission.ts`) — prefer kebab-case for new files.
- Utilities: **kebab-case.ts** — `session-planner.ts`, `band-conversion.ts`, `format-time.ts`, `essay-drafts.ts`.
- Data/seeds: **kebab-case.ts** — `lesson-index.ts`, `lessons.ts`, `band-options.ts`, `grammar-seed.ts`.
- Routes: **kebab-case or dot-segmented** — `login.tsx`, `app.session.complete.tsx`, `tests.$testId.results.tsx`. Dynamic segments use `$param` prefix.
- Zustand stores: **kebab-case + `-store` suffix** — `auth-store.ts`, `test-runner-store.ts`.
- Zod schemas: **kebab-case / single-word lowercase** — `shared/schemas/auth.ts`, `shared/schemas/practice.ts`, `shared/schemas/test-ai-submission.ts`.
- NestJS modules: **kebab-case + role suffix** — `auth.module.ts`, `practice.controller.ts`, `users.service.ts`, `pro.guard.ts`, `current-user.decorator.ts`, `zod-validation.pipe.ts`, `jwt.strategy.ts`.
- NestJS Mongoose schemas: **`<entity>.schema.ts`** — `user.schema.ts`, `submission.schema.ts`, `noticing-item.schema.ts`, `daily-quota.schema.ts`.

**Directories:**
- All lowercase, kebab-case or single word — `features/`, `components/`, `hooks/`, `utils/`, `data/`, `schemas/`, `prompts/`, `test-submissions/`.
- Feature folders are singular nouns: `auth`, `grammar`, `landing`, `method`, `practice`, `review`, `session`, `study`, `tests`, `vocabulary`.

**Symbols (reference — see CONVENTIONS.md for full detail):**
- Zod schema constants: **PascalCase + `Schema` suffix** — `AuthResponseSchema`, `NoticingItemSchema`, `CreateSubmissionDtoSchema`.
- Inferred TS types: **PascalCase** — `type User = z.infer<typeof UserSchema>`.
- React hooks: **`useXxx`** camelCase (`usePracticeState`, `useDueItems`, `useSessionBlueprint`).
- QueryKeys: **arrays of string literals**, exported from the feature's `-queries.ts` — e.g. `practiceStateKey = ['practice','state'] as const`.

## Path Aliases

- `@/*` → `frontend/src/*` (defined in `frontend/vite.config.ts` + `frontend/tsconfig.app.json`). Example: `import { apiFetch } from '@/lib/api-client'`.
- `@shared/*` → `shared/*` (defined in `frontend/vite.config.ts`, `frontend/tsconfig.app.json`, `backend/tsconfig.json`). Example: `import { AuthResponseSchema } from '@shared/schemas/auth'`.
- No alias for `backend/src/*` — backend uses relative imports (`../common/jwt-auth.guard`).

## Where to Add New Code

**New route:**
- Primary: `frontend/src/routes/<kebab>.tsx` (top-level) or `frontend/src/routes/<parent>.<child>.tsx` (nested). Use `$param` for dynamic segments.
- Run `npm run tsr:generate` (auto-runs on `dev`/`build`/`typecheck` via `pre*` scripts).
- For Pro-gated routes: add a `beforeLoad` guard pattern like `routes/app.tsx`.

**New feature:**
- Primary code: `frontend/src/features/<name>/components/` (PascalCase), `frontend/src/features/<name>/hooks/` (`*-queries.ts`, `*-mutations.ts`), `frontend/src/features/<name>/utils/`, `frontend/src/features/<name>/data/`.
- Feature state (if persistent / truly global): new store at `frontend/src/stores/<name>-store.ts` — NOT inside the feature folder.
- Wire shapes: `shared/schemas/<name>.ts`. Don't put types inside the feature; infer them from the shared schema.

**New UI primitive (used by ≥2 features):**
- `frontend/src/components/ui/<PascalCase>.tsx`. If it's feature-specific, keep it under that feature instead.

**New Zustand store:**
- `frontend/src/stores/<name>-store.ts`. Export a `useXxxStore` hook. If persisted, version the localStorage key (`meridian-<name>-v1`) and validate on `merge`.

**New shared schema:**
- `shared/schemas/<name>.ts`. Name as `FooSchema`, export `type Foo = z.infer<typeof FooSchema>`. Import from both runtimes via `@shared/schemas/<name>`.

**New TanStack Query hook:**
- `frontend/src/features/<name>/hooks/<name>-queries.ts`. Export `queryKey = ['...'] as const` and a `useXxx` wrapper around `useQuery({ queryFn: () => apiFetch<T>('/path'), enabled: Boolean(token) })`.

**New API endpoint (backend):**
- If it belongs to an existing module, add a method to that controller + service.
- If it's a new bounded context: `backend/src/<name>/{<name>.module.ts, <name>.controller.ts, <name>.service.ts, schemas/<entity>.schema.ts}`, then register in `backend/src/app.module.ts`.
- DTO validation: add the schema to `shared/schemas/` and wire `@UsePipes(new ZodValidationPipe(Schema))`.
- Auth: apply `@UseGuards(JwtAuthGuard)`; add `@UseGuards(ProGuard)` for Pro-only endpoints (import `CommonModule` in the feature module to pick up `ProGuard` + `UsersService`).

**New AI-powered endpoint:**
- Controller + service live in the feature module; the Anthropic call goes in a dedicated service that mirrors `backend/src/submissions/ai-grading.service.ts` (construct `Anthropic` from `ConfigService`, fall back to deterministic mock when key is missing).
- System prompts: `backend/src/<module>/prompts/<name>.ts` as string exports.
- Rate-limit: call `DailyQuotaService.incrementOrThrow(userId)` BEFORE the Anthropic call.

**New seed content:**
- Backend-only seeds: `backend/src/<module>/data/<name>-seed.ts`.
- Cross-runtime seeds: `shared/seeds/<domain>/`.

**Shared pure utility (both runtimes):**
- `shared/utils/<name>.ts`. See `shared/utils/band-calculator.ts` as the reference shape.

## Special Directories

**`frontend/src/routeTree.gen.ts`:**
- Purpose: TanStack Router-generated union of all file-based routes.
- Generated: Yes (by `@tanstack/router-cli` / `@tanstack/router-plugin`).
- Committed: Yes.
- Regenerate: `npm run tsr:generate` (auto-runs before `dev`/`build`/`typecheck`).

**`frontend/.tanstack/`:**
- Purpose: Router plugin cache.
- Generated: Yes. Committed: No (gitignored).

**`frontend/dist/` and `backend/dist/`:**
- Purpose: Build output.
- Generated: Yes. Committed: No.

**`.husky/`:**
- Purpose: Git hooks.
- `pre-commit`: runs `lint-staged` via root `package.json`.
- `pre-push`: runs `typecheck` (frontend `tsc -b --noEmit` + backend `nest build`).
- Do NOT bypass with `--no-verify`.

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis docs (this directory). Consumed by `/gsd-plan-phase` and `/gsd-execute-phase`.
- Generated: Yes (by `gsd-codebase-mapper` agent). Committed: Yes.

**`.claude/`:**
- Purpose: GSD (Get Shit Done) agents, slash commands, workflow hooks.
- Generated: No. Committed: Yes.

**`node_modules/`:**
- Present at three levels: root (husky + lint-staged + zod + prettier + eslint), `frontend/`, `backend/`. All gitignored.

---

*Structure analysis: 2026-04-22*
