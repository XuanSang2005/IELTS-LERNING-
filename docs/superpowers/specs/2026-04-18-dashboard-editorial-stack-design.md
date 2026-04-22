# Dashboard → Editorial Stack

**Date:** 2026-04-18
**Status:** Approved, implementing

## Problem

The `/app` dashboard is currently a 12-column grid with boxed cards on the left (8 cols) and right (4 cols). The boxed, two-column treatment reads as SaaS — not as the editorial magazine feel the brand demands.

## Solution

Replace the grid with a single vertical column. Each card becomes a full-width section separated by hairline dividers (`border-t border-line`) with generous vertical padding (`py-14 md:py-16`). Each section carries a mono section marker: `§ I — TODAY'S SESSION`, `§ II — SPACED REVIEW`, etc. No boxed chrome inside — content reads as typographic flow against the ivory background.

## Section order

| # | Title | Source component | Right-side meta |
|---|---|---|---|
| § I | TODAY'S SESSION | `TodaySessionCard` | `{totalMinutes} MIN · {totalSteps} STEPS` |
| § II | SPACED REVIEW | `DueReviewCard` | `{count} DUE` |
| § III | THE PHASE | `PhaseCard` | `WEEK {n} / XII` |
| § IV | THE FOUR DISCIPLINES | `DisciplineProgress` | `{completed} / {total} LESSONS` |
| § V | YOUR LEVEL | `LevelCard` | `BAND {low} – {high}` |

## Card refactor pattern

Each of the five cards drops:

- Outer `border border-line` (and `bg-bone` where present)
- Outer padding (`p-6`, `p-8`, `p-10`)
- Inner mono heading label (e.g. `◆ TODAY · YOUR SESSION`, `CURRENT PHASE`, `DISCIPLINE PROGRESS`, `YOUR LEVEL · CURRENT`, `◆ SPACED REVIEW · N DUE`) — replaced by the outer `§ N — TITLE` the dashboard renders

Each card keeps:

- Its `motion.section` wrapper and the existing `initial/animate/transition` stagger delays
- All internal content (headings, lists, CTAs, progress bars, dl blocks, etc.)

## New helper: `DashboardSection`

Local to `app.index.tsx` (~15 lines). Signature:

```tsx
<DashboardSection numeral="§ I" title="TODAY'S SESSION" meta={metaString}>
  <TodaySessionCard />
</DashboardSection>
```

Renders:

```tsx
<div className="border-t border-line py-14 md:py-16">
  <div className="mb-8 flex items-baseline justify-between gap-4">
    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-claret">
      {numeral} — {title}
    </p>
    {meta && (
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
        {meta}
      </p>
    )}
  </div>
  {children}
</div>
```

## Dashboard container

Page keeps its existing `mx-auto w-full max-w-[1540px] px-6 md:px-10 xl:px-14` shell. The header (greeting + due count + date bar + editorial photo) stays unchanged. The grid block is replaced with a `<div>` of stacked `DashboardSection` children.

## Files touched

- **Edit:** `frontend/src/routes/app.index.tsx` (add `DashboardSection`, replace grid)
- **Edit:** `frontend/src/features/session/components/TodaySessionCard.tsx`
- **Edit:** `frontend/src/features/practice/components/DueReviewCard.tsx`
- **Edit:** `frontend/src/features/practice/components/PhaseCard.tsx`
- **Edit:** `frontend/src/features/practice/components/DisciplineProgress.tsx`
- **Edit:** `frontend/src/features/practice/components/LevelCard.tsx`

Each card is only used on `/app` (verified via grep), so stripping its chrome does not affect other surfaces.

## Non-goals

- No changes to data shapes, hooks, or routing
- No changes to internal layouts of content within each section (lists, bars, dl blocks stay as-is)
- No changes to the editorial header with the PL. 01 photo

## Risks

- **Vertical length increases.** That's the point — the editorial calm over at-a-glance density. Today's session remains the first section, immediately below the fold-line header, so the primary CTA is still visible on first load.
- **Mobile already stacked** (from `grid-cols-1 lg:grid-cols-12`), so this is only a structural change on `lg+` breakpoints.

## Validation

- `npm run typecheck` passes
- `npm run lint` passes (no new errors beyond pre-existing ones)
- Manual check at 375px, 1280px, 1540px — each section hairline divider, mono numeral, meta on the right
