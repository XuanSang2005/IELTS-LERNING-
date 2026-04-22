# The Atlas of Mistakes — Phase 1 Design

**Date:** 2026-04-22
**Phase:** 1 — Skeleton
**Route:** `/atlas`

## Intent

A reference volume of Vietnamese-learner IELTS errors, presented as an editorial atlas (plant/anatomy taxonomy, not a SaaS error list). Moat is content + visual language, not interactivity. Phase 1 ships the skeleton and 10 founder-draftable specimens so the founder can author against a real visual.

## Scope

**In Phase 1:**

- `shared/schemas/atlas.ts` — Zod schemas (`FamilySchema`, `SpecimenSchema`, `AtlasVolumeSchema`)
- `frontend/src/features/atlas/` — page, family index, specimen card, filter bar, seed data
- `frontend/src/routes/atlas.tsx` — file-based route
- `Nav` — replace `#atlas` hash with `to: '/atlas'`
- Seed: 10 specimens across all 5 families (Option A — I draft, founder edits later)

**Out of Phase 1:**

- Map visualization (Phase 3)
- `/atlas/:id` permalink pages (Phase 3)
- Free-text search (deferred)
- Submission form (Phase 4)
- SEO meta per entry (Phase 3)

## Data model

```ts
// shared/schemas/atlas.ts
FamilySchema = z.enum(['I','II','III','IV','V'])  // Translations Literal, False Cognates, Phantom Collocations, Register Drift, Structural Echoes
FrequencySchema = z.number().int().min(1).max(5)
BandCostSchema = z.union([z.literal(-0.25), z.literal(-0.5), z.literal(-0.75), z.literal(-1)])

SpecimenSchema = z.object({
  id: z.string(),                // e.g. "037"
  plate: z.number().int().min(1),// renders as PL. 037
  family: FamilySchema,
  wrong: z.string(),
  right: z.string(),
  note: z.string().min(40),      // founder's note, Fraunces italic
  frequency: FrequencySchema,
  bandCost: BandCostSchema,
  seeAlso: z.array(z.string()).default([]),
})

FamilyDescriptorSchema = z.object({
  roman: z.enum(['I','II','III','IV','V']),
  name: z.string(),              // "Translations Literal"
  tagline: z.string(),           // "The Vietnamese sentence, in English dress."
})
```

Seed data lives in `features/atlas/data/seed-specimens.ts` and is parsed through `AtlasVolumeSchema.parse()` at import time. Invalid seed throws at build/import — deliberate.

## Component tree

```
AtlasPage
├─ Masthead                 (reuses tests-page layout: mono eyebrow, Fraunces headline, blockquote, Polaroid)
├─ Colophon                 (short "how to use this volume" para)
├─ FamilyIndex              (5 cards, clicking filters the list)
├─ FilterBar (sticky)       (All + I..V chips + specimen counter)
└─ SpecimenGrid
   └─ SpecimenCard[]        (plate no, family tag, freq dots, band cost, wrong/right pair, note, see-also)
```

## Visual contract

Each component follows CLAUDE.md rules:

- Colors: ivory/bone/ink/claret/line only — no new tokens
- Fonts: Fraunces (headlines, italic note), Geist (body), JetBrains Mono (plate/family/freq labels)
- Mono labels: `◆ ATLAS OF MISTAKES · VOLUME I`, `PL. 037`, `FAMILY III`, `FREQUENCY`, `BAND COST`
- Frequency dots: 5 chars, filled `●` claret, unfilled `○` line-color
- Band cost: hairline bar with proportional width
- Wrong line: `text-claret line-through`, Fraunces italic
- Right line: Fraunces italic with claret underline decoration
- Founder note: `border-l-2 border-claret pl-5 font-fraunces italic`
- Specimen card: small rotation (`rotate-[-0.5deg]` on even, `rotate-[0.5deg]` on odd) to break grid uniformity
- CTA: none on specimen cards (reference volume, not action); only masthead has a signature button if needed — Phase 1 omits it

## Filtering behaviour

- Default: all 5 families shown
- Chips at top: `ALL · I · II · III · IV · V` (single-select)
- Click a FamilyIndex card → sets chip
- Counter updates: `23 specimens shown`
- Empty state: *"No specimens in this family yet. Volume II is in preparation."*

## Routing

- `routes/atlas.tsx` — creates `/atlas` route with `<AtlasPage />`
- `routeTree.gen.ts` — regenerated via `tsr:generate` (do not hand-edit)
- Nav: `{ label: 'Atlas', to: '/atlas' as const }` — stops being a hash anchor

## Seed content plan (10 specimens)

Distribution across families so the index looks complete:

- Family I (Translations Literal): 2 — `make homework`, `Because…, so…`
- Family II (False Cognates): 2 — `sympathy`, `actually`
- Family III (Phantom Collocations): 3 — `crowded traffic`, `strong rain`, `fast food restaurant` misuse
- Family IV (Register Drift): 2 — `kids` in Task 2, `stuff` / `things` vagueness
- Family V (Structural Echoes): 1 — `Although…, but…` double connector

All drafted by Claude; founder re-edits during Phase 2.

## What "done" looks like

- [ ] `npm run typecheck` passes in `frontend/`
- [ ] `npm run lint` passes in `frontend/`
- [ ] Visiting `/atlas` renders: masthead, colophon, 5 family cards, filter bar, 10 specimen cards
- [ ] Clicking a family card filters the grid
- [ ] Clicking `ALL` restores full list
- [ ] Nav Atlas link routes to `/atlas` (no more hash)
- [ ] Responsive to 375px

## Deferred to later phases (explicit list to avoid scope creep)

- Map view (x=frequency, y=band cost) — Phase 3
- Entry permalinks `/atlas/037` — Phase 3
- Per-entry SEO — Phase 3
- Full-text search — Phase 3
- Submission form — Phase 4
- Auto-tagging via Claude API — Phase 4
