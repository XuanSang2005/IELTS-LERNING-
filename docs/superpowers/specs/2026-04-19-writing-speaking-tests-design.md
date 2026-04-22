# Writing & Speaking Practice Tests (Scaffold with Mock Grading)

**Date:** 2026-04-19
**Status:** Approved — implementing

## Goal

Add Writing and Speaking practice tests to the `/tests` library as full-format IELTS mocks, with all UI built end-to-end but grading stubbed by a client-side mock function. Real Claude AI grading will be dropped in later by replacing a single utility.

## Scope

**In:**

- Schema extension to support writing/speaking skills and submission shapes
- Two Writing tests + two Speaking tests in seed data
- Full runner UI: essay editor with timer and word count; sequential speaking parts with a fake recorder
- Full results UI: overall band + four criteria bars + per-criterion examiner prose
- Autosave of essay drafts to localStorage (keyed by `testId + taskNumber`)
- Mock grade function returning deterministic-ish band scores based on input length, with canned per-test prose

**Out:**

- Real Claude AI grading (wired later by replacing `mock-grade.ts`)
- Real audio recording and upload (Speaking uses `MockRecorder` — fake REC pill with a timer)
- Backend changes (this phase is entirely client-side)
- Inline essay annotations
- Multi-day draft recovery, submission history persistence

## Test structure

**Writing test** — 60 min total, two tasks sharing one clock:
- Task 1 (20 min): chart or process diagram prompt, 150-word min
- Task 2 (40 min): essay prompt, 250-word min
- Shared timer. User can switch between tasks freely via tabs.

**Speaking test** — ~14 min total, three parts in order:
- Part 1 (4–5 min): 4–5 short personal Q&A
- Part 2 (3–4 min): long-turn card with 1 min prep, 2 min speak
- Part 3 (4–5 min): 4–5 discussion Qs linked to Part 2
- Per-part timer. User cannot go back to earlier parts.

## Schema changes

[`shared/schemas/test.ts`](../../../shared/schemas/test.ts):

```ts
SkillSchema = z.enum(['listening', 'reading', 'writing', 'speaking'])

WritingPromptSchema = z.object({
  task: z.union([z.literal(1), z.literal(2)]),
  title: z.string(),
  prompt: z.string(),
  imageUrl: z.string().url().optional(),
  wordMin: z.number().int(),
  minutes: z.number().int(),
})

SpeakingPromptSchema = z.object({
  part: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  title: z.string(),
  questions: z.array(z.string()).min(1),
  prepSeconds: z.number().int(),
  speakSeconds: z.number().int(),
})
```

The `Test` discriminated union gains two new branches: `writing` (with `tasks: [WritingPrompt, WritingPrompt]`) and `speaking` (with `parts: [SpeakingPrompt, SpeakingPrompt, SpeakingPrompt]`).

New file [`shared/schemas/submission.ts`](../../../shared/schemas/submission.ts):

```ts
BandNumber = z.number().min(0).max(9).multipleOf(0.5)

CriterionFeedback = z.object({
  name: z.string(),
  band: BandNumber,
  feedback: z.string(),
})

WritingSubmissionSchema = z.object({
  skill: z.literal('writing'),
  overall: BandNumber,
  criteria: z.tuple([CriterionFeedback, CriterionFeedback, CriterionFeedback, CriterionFeedback]),
  summary: z.string(),
})

SpeakingSubmissionSchema = z.object({
  skill: z.literal('speaking'),
  overall: BandNumber,
  criteria: z.tuple([CriterionFeedback, CriterionFeedback, CriterionFeedback, CriterionFeedback]),
  summary: z.string(),
})
```

## New components (feature-local to `frontend/src/features/tests/components/`)

| Component | Purpose |
|---|---|
| `WritingBody.tsx` | Runs a Writing test. Task 1 / Task 2 tabs, shared 60-min timer, word counter, submit dialog. Wraps `EssayEditor`. |
| `EssayEditor.tsx` | Textarea + live word count. Autosaves to localStorage on change (debounced 500ms). |
| `SpeakingBody.tsx` | Runs a Speaking test. Part-by-part state machine: idle → prep → speaking → complete. Prompts displayed, MockRecorder on the right. |
| `MockRecorder.tsx` | Fake `● REC 00:42` pill with start/stop. No real audio — just increments a timer when active. Returns `{ durationSec }` on stop. |
| `CriteriaBar.tsx` | Shared 0–9 band ruler, reusing the § IV band-ruler visual language at a smaller scale. Takes `band`, `label`, and renders the target-less ruler. |
| `WritingResults.tsx` | Post-submission view for Writing. Overall band, four `CriteriaBar`s for Task Response / Coherence & Cohesion / Lexical Resource / Grammatical Range, examiner prose per criterion, summary. |
| `SpeakingResults.tsx` | Same shape. Criteria: Fluency & Coherence / Lexical Resource / Grammatical Range / Pronunciation. |

## Mock grading

`frontend/src/features/tests/utils/mock-grade.ts` exports:

```ts
gradeWriting(input: { task1: string; task2: string }, test: WritingTest): WritingSubmission
gradeSpeaking(input: { partDurations: number[] }, test: SpeakingTest): SpeakingSubmission
```

Behavior:

- Each seed test carries a canned `mockFeedback` payload (prose per criterion + summary)
- Band is derived by a short heuristic — word count for Writing, total speak duration for Speaking — clamped to 4–8 in half-steps, so longer/fuller answers get higher bands
- 300 ms artificial delay (`await new Promise(r => setTimeout(r, 300))`) for a "grading…" shimmer
- Pure deterministic: same input always returns same output

## Routes

No new route files. The existing `/tests/$testId` / `$testId/index` / `$testId/results` routes already handle all skills through `TestRunner` — we add branches for `writing` and `speaking` inside `TestRunner` and `TestResultsPage`.

## Flow (Writing)

1. `/tests/writing-001` — intro (reuses existing intro page, skill-aware copy)
2. "Begin the test" → `/tests/writing-001/run` mounts `TestRunner` → `WritingBody`
3. User writes in Task 1 / Task 2 tabs. Drafts autosave. Timer counts down.
4. Submit (manual or auto at 0:00) → calls `gradeWriting(...)` → navigates to `/tests/writing-001/results`
5. Results page renders `WritingResults` with the mock payload

## Flow (Speaking)

1. `/tests/speaking-001` — intro
2. "Begin the test" → mounts `SpeakingBody`
3. Part 1: questions shown, `MockRecorder` to the right. User "records" answers. Per-part timer.
4. Part 2: prep timer, then speak timer. Card prompt shown.
5. Part 3: discussion questions.
6. On completion, calls `gradeSpeaking(...)` → `/tests/speaking-001/results`
7. Results page renders `SpeakingResults`.

## Editorial treatment (brand compliance)

- Signature ink button for "Begin the test" / "Submit". Outlined secondary for "Save draft" / "Back to library".
- Timer: mono `57:42`, hairline progress bar, turns claret in the final 5 minutes.
- Word counter: mono `248 / 250 MIN`, claret when below minimum.
- `CriteriaBar` reuses § IV ruler language (hairline baseline, half-tick marks, claret fill).
- Results page top matches existing results shell (header, "Back to library" link).
- All copy in English, editorial voice.

## Files touched

### New

- `shared/schemas/submission.ts`
- `frontend/src/features/tests/utils/mock-grade.ts`
- `frontend/src/features/tests/components/WritingBody.tsx`
- `frontend/src/features/tests/components/EssayEditor.tsx`
- `frontend/src/features/tests/components/SpeakingBody.tsx`
- `frontend/src/features/tests/components/MockRecorder.tsx`
- `frontend/src/features/tests/components/CriteriaBar.tsx`
- `frontend/src/features/tests/components/WritingResults.tsx`
- `frontend/src/features/tests/components/SpeakingResults.tsx`
- `frontend/src/features/tests/data/seed/writing-001.ts`
- `frontend/src/features/tests/data/seed/writing-002.ts`
- `frontend/src/features/tests/data/seed/speaking-001.ts`
- `frontend/src/features/tests/data/seed/speaking-002.ts`

### Modified

- `shared/schemas/test.ts` (extend skill enum + union)
- `frontend/src/features/tests/components/TestRunner.tsx` (writing/speaking branches)
- `frontend/src/features/tests/components/TestCard.tsx` (skill-aware metadata)
- `frontend/src/features/tests/data/seed/index.ts` (register new seeds)
- `frontend/src/routes/tests.$testId.results.tsx` (branch to WritingResults / SpeakingResults)
- `frontend/src/routes/tests.$testId.index.tsx` (skill-aware intro copy if needed)

### Untouched

- `backend/` — entirely untouched this phase
- Auth / Pro gating — Pro flag on new tests flows through existing paywall logic

## Risks

- **Schema churn.** Extending the discriminated union may break existing tight type assumptions in `TestRunner`, `TestCard`, results. Mitigated by letting `tsc -b` drive the fixes.
- **Timer logic duplication.** Existing listening/reading have their own Timer component; rather than generalizing, we reuse `Timer.tsx` as-is and wrap it skill-specifically in the new bodies.
- **Seed prose length.** Each seed test carries four criterion paragraphs of mock examiner prose. Tempting to make this too long; cap each to ~50 words.

## Validation

- `npm run typecheck` passes after every step
- Happy path per skill manually traversed: intro → run → submit → results
- Autosave: write an essay, reload the page mid-session, draft is restored
- Timer auto-submit at 0:00 works (Writing)
- Speaking state transitions: prep → speak → next part → final submit
- Mock grade returns deterministic output for the same input
