# Testing Patterns

**Analysis Date:** 2026-04-22

## Current state: no first-party tests exist

This is a pre-MVP codebase. **There are zero authored unit, integration, or E2E test files in `frontend/src/`, `backend/src/`, `backend/test/`, or `shared/`** as of this audit. The only tests on disk are inside `frontend/node_modules/zod/**` (library vendor tests, irrelevant).

- Root `package.json` has no test script.
- Frontend `package.json` has no test script and no `vitest` / `@testing-library/*` / `playwright` / `@playwright/test` dependency.
- Backend `package.json` ships the NestJS default Jest configuration and scripts, but zero `*.spec.ts` or `*.e2e-spec.ts` files have been written.
- `.playwright-mcp/` at the repo root is **not** a Playwright test suite — it is a Playwright MCP server artefact directory (console logs + page YAML snapshots + PNG screenshots used during interactive design review). It does not run automated tests.

Automated testing needs to be scaffolded before the "test with friends" MVP launch item 2 in `CLAUDE.md` §Roadmap.

## What is present

### Backend — NestJS default Jest setup (configured, unused)

**Runner:**
- `jest@^30.0.0` (see `backend/package.json:57`)
- `ts-jest@^29.2.5` transformer (see `backend/package.json:61`)
- `@nestjs/testing@^11.0.1` (Nest testing utilities — `backend/package.json:46`)
- `supertest@^7.0.0` + `@types/supertest@^7.0.0` (HTTP integration testing — `backend/package.json:52, 60`)
- `@types/jest@^30.0.0` (`backend/package.json:49`)

**Assertion library:** Jest built-in `expect` (no separate Chai / other).

**Unit-test config** — inlined in `backend/package.json:68-84`:
```json
"jest": {
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" },
  "collectCoverageFrom": ["**/*.(t|j)s"],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
}
```

**E2E config** — `backend/test/jest-e2e.json`:
```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" }
}
```

**Run commands (backend):**
```bash
cd backend
npm run test           # jest (unit) — currently finds 0 tests
npm run test:watch     # jest --watch
npm run test:cov       # jest --coverage → writes to backend/../coverage
npm run test:debug     # node --inspect-brk jest --runInBand
npm run test:e2e       # jest --config ./test/jest-e2e.json
```

**Expected file locations** (once tests are written):
- Unit tests co-located with source: `backend/src/**/<name>.spec.ts` (e.g. `backend/src/auth/auth.service.spec.ts`)
- E2E tests: `backend/test/**/<name>.e2e-spec.ts` (folder exists, empty except for `jest-e2e.json`)

**Expected coverage output:** `backend/../coverage/` (i.e. repo-root `coverage/`). The `.prettierignore` and `.gitignore` both exclude `coverage/`.

### Frontend — no runner installed

`frontend/package.json` scripts section has no `test` entry. DevDependencies contain no test runner. There is no `vitest.config.ts`, no `jest.config.*`, no `playwright.config.*`, no `.test.tsx` / `.spec.tsx` files under `frontend/src/`.

### Shared — no runner installed

`shared/` has only a `tsconfig.json` (used for ESLint type-aware linting) and schema/util source. No test setup.

### `.playwright-mcp/` — not a test suite

Directory contents are Playwright MCP server artefacts only:
- `console-*.log` — browser console captures from MCP-driven sessions
- `page-*.yml` — accessibility/DOM snapshots
- `page-*.png` — screenshots (e.g. `dashboard-current.png`, `dashboard-mine-1.png` at repo root came from this tooling)

The directory is gitignored (`.gitignore:32`) and is used for human-in-the-loop design review via the Playwright MCP, **not** for automated regression testing. No `@playwright/test` spec files exist.

## Test File Organization

**Location (once tests are added):**

| Layer | Pattern | Example |
| --- | --- | --- |
| Backend unit | Co-located with source under `backend/src/` | `backend/src/practice/practice.service.spec.ts` |
| Backend E2E | `backend/test/` | `backend/test/practice.e2e-spec.ts` |
| Frontend (not yet set up) | Co-located under `frontend/src/` | `frontend/src/features/practice/utils/sm2.test.ts` |
| Shared pure utils (not yet set up) | `shared/**/*.test.ts` | `shared/utils/band-rounding.test.ts` |

**Naming:**
- Backend unit: `<name>.spec.ts` (matches `testRegex: ".*\\.spec\\.ts$"`)
- Backend E2E: `<name>.e2e-spec.ts` (matches `testRegex: ".e2e-spec.ts$"`)
- Frontend (recommended when Vitest is added): `<name>.test.ts` / `<name>.test.tsx`

## Test Structure

**No real examples exist yet.** Recommended convention once tests start:

```ts
// backend/src/practice/practice.service.spec.ts (illustrative)
import { Test } from '@nestjs/testing'
import { PracticeService } from './practice.service'

describe('PracticeService', () => {
  let service: PracticeService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PracticeService, /* mocks */],
    }).compile()
    service = moduleRef.get(PracticeService)
  })

  it('applies SM-2 to a reviewed item', () => {
    // arrange / act / assert
  })
})
```

Patterns to carry over from the rest of the codebase:
- **Zod is the source of truth** — validate fixtures with `NoticingItemSchema.parse(...)` before passing them into services so fixtures cannot drift from the wire contract (`shared/schemas/practice.ts:34-53`)
- Pure utilities under `frontend/src/features/practice/utils/` (`sm2.ts`, `dates.ts`, `session-planner.ts`) are the natural first unit-test targets — they have no React, no network, no randomness except where injected

## Mocking

**No mocks exist.** When mocks are introduced, the recommended guidelines are:

- **Backend:** Use `@nestjs/testing` `Test.createTestingModule({ providers: [{ provide: X, useValue: mockX }] })` to swap Mongoose models / service collaborators. Do NOT reach into `mongoose` directly from tests — test through the service boundary.
- **Frontend (once a runner is added):** mock the network at the `apiFetch` boundary, not at `fetch`. Inject a fake `apiFetch` where feasible. For React Query–powered components, wrap the component under test in a `QueryClientProvider` with a fresh `QueryClient` per test (mirrors `frontend/src/app/providers.tsx:6-10`).
- **What NOT to mock:** Zod schemas, pure utils (`sm2`, `dates`), or the editorial design tokens — test them directly.
- **Never mock the Anthropic SDK in frontend tests** — the frontend never calls Anthropic directly (see `CLAUDE.md` §AI integration: "Never expose API key to frontend"); mock only the backend's AI-grading service at the service-collaborator level.

## Fixtures and Factories

**None exist.** `backend/src/lessons/data/`, `backend/src/practice/data/`, and `shared/seeds/` hold seed content rather than test fixtures. Suggested pattern once tests land:

- Co-locate fixture files under `<module>/__fixtures__/<name>.ts` on the backend
- Build factory helpers that return `z.infer<typeof Schema>` objects and immediately call `Schema.parse(...)` on the way out to guarantee validity

## Coverage

- **Backend:** `npm --prefix backend run test:cov` produces HTML + lcov in `coverage/` (gitignored). No threshold is enforced in `jest` config — coverage is advisory.
- **Frontend:** no coverage tooling configured.
- **CI:** no GitHub Actions / pipeline config checked in — coverage has no external reporting target yet.

## Test Types

- **Unit tests:** not written. Backend Jest is ready to accept `*.spec.ts` co-located with source.
- **Integration tests:** not written. Backend E2E runner (`test:e2e` + `supertest`) is ready to accept `backend/test/*.e2e-spec.ts`.
- **Component tests:** no frontend runner installed. Vitest + `@testing-library/react` is the recommended addition — it integrates cleanly with Vite 8 and TanStack Query without extra configuration.
- **E2E browser tests:** not written. Playwright MCP is installed for design review only; adding `@playwright/test` for scripted E2E would be a separate, explicit decision.

## Typecheck as a safety net (today's de-facto "test")

Until a real test suite exists, the **`pre-push` hook is the current quality gate**:

```sh
# .husky/pre-push
npm --prefix frontend run typecheck
```

`npm --prefix frontend run typecheck` runs `tsr generate` (regenerates `frontend/src/routeTree.gen.ts`) then `tsc -b --noEmit` with `strict`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, and `noFallthroughCasesInSwitch` all on (`frontend/tsconfig.app.json:18-23`). Combined with Zod runtime validation at every network and localStorage boundary, this catches a meaningful slice of bugs that tests would otherwise cover — but it is **not a substitute** for behavioural tests.

The root `npm run typecheck` script also runs `npm --prefix backend run build` (nest build), which surfaces backend TS errors. Running that locally before merging is recommended.

## Recommended scaffolding (not yet present — guidance for future work)

The MVP roadmap item "Backend scaffold + auth + practice API" is in progress; testing is conspicuously absent. Suggested additions, in priority order:

1. **Backend unit tests** — start with the pieces that already have rich domain logic and no framework coupling:
   - `backend/src/practice/sm2.ts` (spaced-repetition math)
   - `backend/src/common/daily-quota.service.ts` (rate-limit logic for AI grading)
   - `backend/src/common/zod-validation.pipe.ts` (pipe behaviour on valid + invalid payloads)
   - Use Jest (already wired); write `<name>.spec.ts` alongside source.
2. **Backend E2E tests** — add `backend/test/auth.e2e-spec.ts` and `backend/test/practice.e2e-spec.ts` using `supertest` + `@nestjs/testing` (both already installed). Seed an in-memory Mongo via `mongodb-memory-server` (needs to be added) so tests don't touch Atlas.
3. **Frontend unit tests** — add **Vitest** (`vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`). Vitest integrates with Vite 8 with almost no config and supports the existing `@/*` + `@shared/*` aliases through a tiny `vitest.config.ts` that re-exports the Vite resolve config. Target the pure utils first:
   - `frontend/src/features/practice/utils/sm2.ts`
   - `frontend/src/features/practice/utils/session-planner.ts`
   - `frontend/src/features/practice/utils/dates.ts`
4. **Frontend E2E tests** — if/when Playwright is adopted for automation, install `@playwright/test` separately from the MCP server. Store specs under `frontend/e2e/*.spec.ts` with a dedicated `playwright.config.ts`. The existing `.playwright-mcp/` directory stays for MCP and must not be reused as a test output directory.
5. **Shared schema round-trip tests** — tiny Vitest suite in `shared/` asserting that every `*Schema` in `shared/schemas/` round-trips a canonical fixture through `.parse(...)` → `.parse(...)`. Cheap, high-value insurance against drift.

Until those land, treat every PR's manual walkthrough (dev server + Playwright MCP review) as the test plan.

---

*Testing analysis: 2026-04-22*
