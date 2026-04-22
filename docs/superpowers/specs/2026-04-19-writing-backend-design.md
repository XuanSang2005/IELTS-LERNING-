# Writing Tests — Backend & Database

**Date:** 2026-04-19
**Status:** Approved, implementing

## Goal

Wire the Writing test flow end-to-end through the backend and MongoDB:

- Tests live in the database (not just frontend seed files)
- Writing submissions are persisted per-user, rate-limited, and graded
- Grading uses Anthropic Claude when an API key is configured, and falls back to a deterministic server-side mock when it is not — so dev works without a key
- The frontend's client-side mock grading is removed; the backend is the source of truth

Speaking is explicitly out of scope for this spec.

## Flow

```
Student writes Task 1 + Task 2 in the existing WritingBody UI
                         ↓
Frontend: POST /test-submissions/writing { testId, task1Text, task2Text }
                         ↓
Backend: rate-limit check → create TestSubmission (status='submitted') → respond { id }
                         ↓
Background: call Anthropic (or mock-grade if no key) with a single prompt
containing both tasks, weighted Task 2 = 2× per IELTS rubric
                         ↓
Backend: validate JSON, store result, flip status='graded'
                         ↓
Frontend: poll GET /test-submissions/:id every 2s → render results on graded
```

## Shared changes

### Move seed data to shared

- `frontend/src/features/tests/data/seed/*.ts` → `shared/seeds/tests/*.ts`
- Frontend imports update to `@shared/seeds/tests/...`
- Backend uses the same files to seed MongoDB on first boot
- One source of truth; the frontend library and backend `tests` collection always match

### New DTO in `shared/schemas/test-ai-submission.ts`

```ts
CreateWritingTestSubmissionDtoSchema = z.object({
  testId: z.string().min(1),
  task1Text: z.string().min(50, 'Task 1 is too short'),
  task2Text: z.string().min(50, 'Task 2 is too short'),
})
```

## Backend: Tests module

New `backend/src/tests/`:

- `schemas/test.schema.ts` — Mongoose schema mirroring the shared Zod `Test`. One `tests` collection, all four skills, optional `sections` / `passages` / `tasks` / `parts` fields
- `tests.service.ts` — `findAll({ skill? })`, `findById(id)`
- `tests.controller.ts` — `GET /tests`, `GET /tests/:id` (JWT-required)
- Seed logic on module init: if `tests` collection is empty, insert all seed documents from `shared/seeds/tests/`
- Registered in `app.module.ts`

**Frontend:** `useTestsQuery` / `useTestQuery` switch to calling the backend. Loading and error states already exist; no UI changes required.

## Backend: TestSubmissions module

New `backend/src/test-submissions/`:

**Mongoose schema `TestSubmission`:**

```ts
{
  _id: ObjectId
  userId: string
  testId: string
  skill: 'writing' | 'speaking'   // speaking reserved for the next spec
  submittedAt: Date
  task1Text?: string              // Writing-specific
  task2Text?: string              // Writing-specific
  status: 'submitted' | 'grading' | 'graded' | 'failed'
  grading: WritingTestSubmission | null
  error: string | null
  gradedAt: Date | null
}
```

**Endpoints** (all JWT-required, owner-checked):

| Method | Path | Purpose |
|---|---|---|
| POST | `/test-submissions/writing` | Create + async-grade. Body validated via `CreateWritingTestSubmissionDtoSchema`. Returns new row. |
| GET | `/test-submissions/:id` | Owner fetch — used by the frontend polling loop |
| GET | `/test-submissions/latest?testId=xxx` | Deep-link fallback for results page |
| POST | `/test-submissions/:id/regrade` | Retry a failed grading |

**Pro-gating:** a new `ProGuard` checks `user.isPro || user.trialEndsAt > now`. Applied to the POST route. Returns 403 with a paywall-friendly payload when the guard fails.

**Rate limit:** a new `DailyQuotaService` tracks AI-grading calls per user per day. Both this module and the existing `SubmissionsService` decrement the same counter. Limit remains 10/day. Shared quota prevents students from bypassing the limit by mixing test submissions and essay submissions.

## Grading extension

Extend `backend/src/submissions/ai-grading.service.ts`:

- New method `gradeWritingTest(task1Prompt, task1Text, task2Prompt, task2Text)`
- New system prompt at `backend/src/submissions/prompts/writing-test-grading.ts`:
  > You are an IELTS Academic Writing examiner. Grade the candidate's Task 1 and Task 2 responses across the four criteria (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy). Weight **Task 2 at 2×** per IELTS rubric when computing the overall band. Return a single JSON object `{ overall, criteria: [4], summary }`.
- One Claude call graded both tasks together (cheaper than two calls, and Claude can compare register across the tasks)

**Mock fallback:** when `ANTHROPIC_API_KEY` is empty, `gradeWritingTest` returns a deterministic response derived from the combined word count. Same heuristic the frontend mock uses today, ported to the server. Logged as `[ai-grading] no key, returning mock`. No thrown 503 — the server keeps working.

## Frontend migration

**Delete:**

- `frontend/src/features/tests/utils/mock-grade.ts` — backend grades now
- Server-side submission storage replaces `ai-submissions.ts` submission CRUD — keep only the essay draft autosave helpers, moved into a slimmer `essay-drafts.ts`

**Modify:**

- `WritingBody.tsx` — submit via `apiFetch('/test-submissions/writing', { method: 'POST', body })`. Grading "loading" overlay stays. On response, navigate to `/tests/:testId/results?resultId=:id`.
- New hook `useWritingTestSubmissionQuery(id)` — React Query with 2-second polling while `status === 'submitted' | 'grading'`, stops at `graded | failed`
- `tests.$testId.results.tsx` — the Writing/Speaking branch reads from the new hook, not localStorage. On `failed`, show a "Try again" button hitting `POST /test-submissions/:id/regrade`
- `useTestsQuery`, `useTestQuery` — switch source from local array to backend API

## Env vars

`backend/.env.example`:

```
MONGODB_URI=mongodb://localhost:27017/meridian
JWT_SECRET=change-me-in-prod
ANTHROPIC_API_KEY=                # optional — mock grading used when empty
```

## Files touched

**New (backend):**

- `backend/src/tests/{tests.module,controller,service,schemas/test.schema}.ts`
- `backend/src/test-submissions/{test-submissions.module,controller,service,schemas/test-submission.schema}.ts`
- `backend/src/submissions/prompts/writing-test-grading.ts`
- `backend/src/common/daily-quota.service.ts`
- `backend/src/common/pro.guard.ts`

**Modified:**

- `backend/src/app.module.ts` (register new modules)
- `backend/src/submissions/ai-grading.service.ts` (add `gradeWritingTest`, add mock fallback, remove hard 503 when key missing)
- `backend/src/submissions/submissions.service.ts` (use `DailyQuotaService`)
- `shared/schemas/test-ai-submission.ts` (add `CreateWritingTestSubmissionDtoSchema`)
- Frontend: `WritingBody.tsx`, `tests.$testId.results.tsx`, `useTestsQuery`, `useTestQuery`, new `useWritingTestSubmissionQuery`

**Moved:**

- `frontend/src/features/tests/data/seed/*.ts` → `shared/seeds/tests/*.ts`

**Deleted:**

- `frontend/src/features/tests/utils/mock-grade.ts`
- `frontend/src/features/tests/utils/ai-submissions.ts` (replaced by slimmer `essay-drafts.ts` with only the localStorage draft helpers)

## Non-goals

- Speaking (separate spec)
- Audio handling (separate spec)
- Moving Listening/Reading submissions server-side — they still use the existing client-side scoring pipeline
- Admin UI for creating tests (seed script only)
- Submission history UI / analytics

## Risks

- **Moving seed data** touches every test-seed import across the frontend. `tsc -b` will drive the fixes.
- **Fire-and-forget grading.** The background grade runs in the Node event loop. If the server restarts mid-grade, that submission stays stuck in `grading`. Acceptable for MVP; a proper job queue (BullMQ) is a later concern. A "Try again" button lets the user recover manually.
- **Rate limit coupling.** Shared quota across two modules needs atomic decrements. Use a single Mongo `findOneAndUpdate` with `$inc` to avoid races.
- **Mock fallback in prod.** The mock path must be guarded only by `!process.env.ANTHROPIC_API_KEY`. No feature flag that could accidentally leave mocks on when a key IS configured.

## Validation

- `npm run typecheck` passes in both workspaces
- `npm run start:dev` in `backend/` boots against local Mongo
- Manual happy path: log in → pick Writing 01 → submit two essays → poll sees `graded` → results page renders the mock response
- Set `ANTHROPIC_API_KEY` → re-submit → response comes from Claude, not mock
- Rate limit: submit 10 times in one day → 11th returns 429 with a friendly message
- Unauthenticated POST → 401
- Pro-gated route as non-Pro, non-trial user → 403
