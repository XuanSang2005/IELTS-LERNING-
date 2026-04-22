---
type: quick
slug: ui-and-db-cleanup
created: 2026-04-22
completed: 2026-04-22
status: complete
---

# Summary — UI & database cleanup

Code-hygiene pass. Backend build + lint clean, frontend typecheck + lint clean.

## UI dead code removed

| File | Reason |
| --- | --- |
| `frontend/src/features/practice/components/PhaseCard.tsx` | Zero importers — leftover from pre-Notebook dashboard |
| `frontend/src/features/practice/components/SrsCard.tsx` | Zero importers |
| `frontend/src/features/practice/components/DisciplineProgress.tsx` | Zero importers |
| `frontend/src/components/layout/Header.tsx` | Pre-editorial fallback nav; only used for `/about`, which is gone |
| `frontend/src/components/layout/` (dir) | Empty after Header removal |
| `frontend/src/routes/about.tsx` | Placeholder route, not linked from anywhere |
| `frontend/src/routes/app.notebook.tsx` | Legacy redirect shim pointing at deleted `/review` |

`frontend/src/routes/__root.tsx` simplified: every app route is full-bleed now, so the conditional `Header` wrapper and the `FULL_BLEED_ROUTES` branching were dead. Root renders only `<Outlet />` + devtools.

## Hardcoded values

- No hardcoded VND pricing, no `99k/month` or `499k/month` strings anywhere in the repo.
- No banned SaaS copy ("Get started", "Sign up now", "Join today") in user-facing strings.
- No hardcoded secrets. The only remote URLs are Unsplash images in `Method.tsx` + `FeaturedLesson.tsx` (editorial stock imagery — intended) and the Vite env default `VITE_API_URL=http://localhost:4000` in `lib/env.ts` (dev fallback, overridable).
- Two legitimate `TODO(backend-swap)` markers in `lib/auth.ts` and `tests/hooks/useTestHistoryQuery.ts` flagging known migration points — kept as-is.

## Tests collection split

**Before:** `tests` collection held writing + speaking; `listening_tests` + `reading_tests` were separate.
**After:** four per-skill collections, no generic collection.

Changes:
- [backend/src/tests/tests.constants.ts](backend/src/tests/tests.constants.ts) — added `WRITING_TEST` and `SPEAKING_TEST` tokens.
- [backend/src/tests/tests.module.ts](backend/src/tests/tests.module.ts) — registers four collections (`listening_tests`, `reading_tests`, `writing_tests`, `speaking_tests`); dropped the `Test.name` default registration.
- [backend/src/tests/tests.service.ts](backend/src/tests/tests.service.ts) — injects four models, `modelFor(skill)` routes via `switch` exhaustively; `allModels()` returns four; seed + `findAll` / `findById` fan out across all four.
- [backend/src/tests/schemas/test.schema.ts](backend/src/tests/schemas/test.schema.ts) — removed the `collection: 'tests'` default on the `@Schema` decorator so Mongoose never re-creates the legacy `tests` collection from this schema.
- [backend/src/lessons/schemas/lesson.schema.ts](backend/src/lessons/schemas/lesson.schema.ts) — same treatment; dropped `collection: 'lessons'` so the pre-split `lessons` collection stays gone.

## Database audit — what to drop in MongoDB

Collections in Mongo that NO backend model binds to any more. Run in `mongosh` or Compass:

```js
use meridian
db.tests.drop()               // replaced by listening_tests / reading_tests / writing_tests / speaking_tests
db.lessons.drop()             // orphaned from the per-discipline split (grammar/collocations/linking)
db.vocabulary_lessons.drop()  // removed in the prior cleanup — confirm it's gone
```

Bound collections (keep):

| Collection | Model |
| --- | --- |
| `users` | User |
| `noticingitems` | NoticingItem |
| `dailylogs` | DailyLog |
| `errorentries` | ErrorEntry (backend still serves `/practice/errors`; the UI page is gone but the contract lives) |
| `daily_quotas` | DailyQuota (AI-grading rate limiter) |
| `submissions` | Submission |
| `test_submissions` | TestSubmission |
| `listening_tests` | Test (LISTENING_TEST token) |
| `reading_tests` | Test (READING_TEST token) |
| `writing_tests` | Test (WRITING_TEST token) ← **new** |
| `speaking_tests` | Test (SPEAKING_TEST token) ← **new** |
| `grammar_lessons` | LessonDoc (GRAMMAR_LESSON) |
| `collocations_lessons` | LessonDoc (COLLOCATIONS_LESSON) |
| `linking_lessons` | LessonDoc (LINKING_LESSON) |
| `vocab_words` | VocabWordDoc |

## Verification

- `npm run build` in `backend/` — webpack compiled successfully (4.3 s)
- `npm run lint` in `backend/` — 0 errors, 0 warnings
- `npm run typecheck` in `frontend/` — passes
- `npm run lint` in `frontend/` — 0 errors, 0 warnings
