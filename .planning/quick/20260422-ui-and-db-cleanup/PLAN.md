---
type: quick
slug: ui-and-db-cleanup
created: 2026-04-22
---

# Plan — UI & database cleanup

Ad-hoc cleanup pass covering four concerns requested in a single go:

1. **UI dead code** — find and remove orphan components, stale routes, unused imports left over from prior redesigns.
2. **Hardcoded values** — audit for pricing, SaaS-speak copy, and secrets that violate CLAUDE.md guardrails.
3. **Tests collection split** — replace the monolithic `tests` Mongo collection with four per-skill physical collections (listening, reading, writing, speaking). Previously `tests` held writing + speaking; now nothing is written to it.
4. **Unused databases** — drop any collection no model binds to.

## Task list

- [x] Grep the frontend for importers of every component file under `src/components/` and `src/features/practice/components/` — flag zero-import files.
- [x] Grep for `TODO`/`FIXME`, hardcoded prices (`99k`, `499k`, `VND`), and banned SaaS copy.
- [x] Check every `@Schema({ collection: '...' })` declaration vs `MongooseModule.forFeature` registration.
- [x] Introduce `WRITING_TEST` and `SPEAKING_TEST` constants in `tests.constants.ts`.
- [x] Register `writing_tests` and `speaking_tests` physical collections in `tests.module.ts`; drop the default `tests` registration.
- [x] Update `TestsService` to inject 4 per-skill models, route `modelFor(skill)` into writing / speaking, seed each skill into its own collection.
- [x] Strip the stale `collection: 'tests'` default from `test.schema.ts` and `collection: 'lessons'` from `lesson.schema.ts` so Mongoose never re-creates those legacy collections.
- [x] Delete orphan UI files: `PhaseCard.tsx`, `SrsCard.tsx`, `DisciplineProgress.tsx`, `Header.tsx`, `about.tsx`, `app.notebook.tsx`.
- [x] Remove the empty `components/layout/` directory.
- [x] Simplify `__root.tsx` — drop the `Header` fallback and the `/review`, `/profile`, `/onboarding` branches in `FULL_BLEED_ROUTES` (every route is full-bleed now).
- [x] Run backend build + lint and frontend typecheck + lint.

## Out of scope

- Physically dropping collections in Mongo — code changes don't delete data. Drop commands are listed in SUMMARY.md for the user to run in `mongosh`.
- Any UI redesign — this is code-hygiene only.
