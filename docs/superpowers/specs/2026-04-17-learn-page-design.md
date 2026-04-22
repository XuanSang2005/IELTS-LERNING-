# Learn Page — Design Spec

**Date:** 2026-04-17
**Status:** Approved for planning
**Route:** `/learn`

---

## 1. Context

The IELTS.learn frontend scaffold is live (Vite + React 19 + TanStack
ecosystem + Tailwind v4 + Zustand) with two demo routes (`/`, `/about`). The
backend does not yet exist, so any learning content must be seeded statically
inside the frontend.

The user wants a **Learn** page exposing four pillars of IELTS preparation:

1. **Grammar**
2. **Vocabulary**
3. **Collocations** (common word pairings, e.g. "make a decision")
4. **Linking phrases** (discourse markers for Writing/Speaking)

Visual direction (provided by the user as a reference image): a modern
pricing-page aesthetic — a soft pastel gradient hero, a large heading with an
inline emoji, and four cards side-by-side where one is visually elevated as
the "featured" option. The four cards map 1:1 to the four sections, so the
page is a single scrollable landing with no tabs.

## 2. Goals

- Let a visitor land on `/learn` and grasp the four pillars at a single glance.
- List the concrete topics inside each pillar so the visitor can see what
  they'll study — analogous to the feature list inside a pricing card.
- Keep the data swappable to a backend later: parse every topic through Zod
  at module-load time so the type and runtime shape match.

## 3. Non-goals (explicit)

- **No topic detail pages.** Clicking a topic's CTA logs to `console.log` for
  v1. Real detail routes are a follow-up task.
- **No search, filter, or level toggle.** The pill toggle from the reference
  image is dropped for v1.
- **No backend integration.** All content is static. No `useQuery`, no API
  call.
- **No progress tracking, bookmarks, or user state.** Purely presentational.
- **No authentication gate.** Page is public.

## 4. Route & navigation

- New route file: `frontend/src/routes/learn.tsx` (file-based; becomes
  `/learn` after `tsr generate`).
- `Header.tsx` gains a third nav link: `Learn`, placed between `Home` and
  `About`. Uses the same `activeProps` pattern as the existing links.
- No search params, no loader, no route context needs. The route component
  simply imports `SECTIONS` from the feature slice and renders.

## 5. Feature slice layout

```
frontend/src/features/learn/
├─ schemas.ts                 # Zod: SectionId, LearnTopic, LearnSection
├─ sections.ts                # SECTIONS: LearnSection[] (the single source of truth)
├─ data/
│  ├─ grammar.ts              # export const grammarTopics: LearnTopic[]
│  ├─ vocabulary.ts
│  ├─ collocations.ts
│  └─ linking-phrases.ts
└─ components/
   ├─ LearnHero.tsx           # gradient hero + tag + heading + subtitle
   ├─ SectionCard.tsx         # one pricing-card; toggles featured style
   └─ SectionGrid.tsx         # responsive 4-up grid
```

## 6. Data model

### 6.1 Schemas (`features/learn/schemas.ts`)

```ts
export const SectionId = z.enum([
  'grammar',
  'vocabulary',
  'collocations',
  'linking-phrases',
])
export type SectionId = z.infer<typeof SectionId>

export const LearnTopic = z.object({
  slug: z.string().min(1),                   // stable id, e.g. 'present-perfect'
  title: z.string().min(1),                  // display title
  summary: z.string().min(1),                // one-line description
})
export type LearnTopic = z.infer<typeof LearnTopic>

export const LearnSection = z.object({
  id: SectionId,
  label: z.string().min(1),                  // 'Grammar'
  tagline: z.string().min(1),                // short sentence shown on card
  emoji: z.string().min(1),                  // visual anchor in the hero/card
  featured: z.boolean(),                     // exactly one section is featured
  topics: z.array(LearnTopic).min(1),
})
export type LearnSection = z.infer<typeof LearnSection>
```

Each data file (`data/grammar.ts` etc.) exports a constant and runs it
through `z.array(LearnTopic).parse(...)` at module scope so invalid seed data
throws at startup rather than silently rendering broken UI.

### 6.2 Seed content

Each section ships with **6–8 topics** for v1. Concrete seeds:

- **Grammar:** Present Perfect, Past Perfect, Conditionals (types 0–3),
  Passive Voice, Reported Speech, Modals of Probability, Relative Clauses,
  Articles (a/an/the).
- **Vocabulary:** Education & Study, Environment & Climate, Technology,
  Health & Lifestyle, Work & Careers, Travel & Tourism, Crime & Law, Media.
- **Collocations:** Strong Collocations, Verb + Noun (make/do/take), Adjective
  + Noun, Adverb + Adjective, Collocations for Writing Task 2, Collocations
  for Speaking Part 3.
- **Linking phrases:** Adding Ideas, Contrasting, Giving Examples, Cause &
  Effect, Sequencing, Conclusions, Hedging & Tentative Language.

`sections.ts` flags **Vocabulary** as `featured: true`; the other three are
`false`. Swapping the featured section later is a one-line change.

## 7. UI & visual design

### 7.1 Hero (`LearnHero.tsx`)

- Full-bleed soft gradient background (top-to-bottom, `brand-50` → white)
  clipped to the hero's vertical band; does not extend to the cards section.
- Centered content, max-width 48rem:
  - Small uppercase tag: `Learn`.
  - H1 heading: `Master the four pillars of <emoji> IELTS English` — inline
    emoji rendered as a text character (`📚`). The heading uses
    `text-4xl md:text-5xl font-bold tracking-tight text-slate-900`.
  - Subtitle paragraph: one sentence, `text-slate-600`.

### 7.2 Section grid (`SectionGrid.tsx`)

- Responsive grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6`.
- Container max-width 72rem, horizontal padding matches the existing layout.
- The featured card is visually elevated (scale / shadow) only on screens
  ≥ `xl`; on smaller viewports it sits inline with the others to avoid
  layout instability.

### 7.3 Section card (`SectionCard.tsx`)

Props: `section: LearnSection`.

Layout, top to bottom:

1. Emoji inside a soft-filled circle.
2. Section label (`text-lg font-semibold`).
3. Tagline (`text-sm text-slate-600`, 2-line clamp).
4. Headline metric: the topic count, e.g. `8 lessons` — big, bold, takes the
   position the price occupies in the reference image.
5. CTA button: `Start learning` (primary for non-featured; inverse colors for
   featured). Click → `console.log({ section: section.id })` for v1.
6. Divider.
7. Topic list — `<ul>` of `<li>` items, each showing a small check icon + the
   topic title. Up to 6 topics visible; if more exist, show `+N more lessons`
   as the final line.

Featured variant differences (driven by `section.featured`):

- Background: `bg-brand-dark` (dark accent, new token), text: `text-white`.
- "Most studied" badge pinned to the top-right corner of the card.
- Button uses inverse contrast (white bg, dark text).
- Elevated shadow + slight `xl:-translate-y-2`.

### 7.4 Design tokens

Add to `frontend/src/styles/globals.css` inside the existing `@theme { ... }`
block:

- `--color-brand-50` (already exists) — reused for the hero gradient's top stop.
- `--color-brand-dark: oklch(0.32 0.08 250)` — the featured card background.
- `--color-brand-accent: oklch(0.74 0.14 145)` — check-icon green, matches
  the reference image's accent.

No new runtime dependencies.

## 8. Component interfaces

- `<LearnHero />` — zero props; hard-coded copy via constants at the top of
  the file. Consumers never need to customize.
- `<SectionCard section={...} />` — pure, deterministic from its prop. No
  internal state.
- `<SectionGrid sections={...} />` — maps sections to `<SectionCard>`. No
  sorting or filtering inside; callers pass an already-ordered array.
 
The ordering responsibility lives in `sections.ts`, which is the single
source of truth.

## 9. File-by-file change list

| Path | Change |
|---|---|
| `frontend/src/routes/learn.tsx` | **New.** Declares the route, renders hero + grid. |
| `frontend/src/components/layout/Header.tsx` | **Edit.** Add `Learn` nav link. |
| `frontend/src/features/learn/schemas.ts` | **New.** Zod schemas + inferred types. |
| `frontend/src/features/learn/sections.ts` | **New.** Exports `SECTIONS: LearnSection[]`, parsed via Zod. |
| `frontend/src/features/learn/data/grammar.ts` | **New.** Topics array. |
| `frontend/src/features/learn/data/vocabulary.ts` | **New.** Topics array. |
| `frontend/src/features/learn/data/collocations.ts` | **New.** Topics array. |
| `frontend/src/features/learn/data/linking-phrases.ts` | **New.** Topics array. |
| `frontend/src/features/learn/components/LearnHero.tsx` | **New.** Hero component. |
| `frontend/src/features/learn/components/SectionCard.tsx` | **New.** Card component. |
| `frontend/src/features/learn/components/SectionGrid.tsx` | **New.** Grid component. |
| `frontend/src/styles/globals.css` | **Edit.** Add two brand tokens. |
| `frontend/src/routeTree.gen.ts` | **Regenerated** by `tsr generate`. |

## 10. Accessibility

- Hero heading uses `<h1>`. Each card's section label is `<h2>`. Topic items
  are in a `<ul>` of `<li>`. Semantic HTML, no ARIA hacks needed.
- The CTA is a real `<button>` with `type="button"`.
- The heading emoji is decorative; wrap it in `<span aria-hidden="true">` and
  omit any sr-only fallback text (the surrounding words carry the meaning).
- Check icons in the topic list are SVG with `aria-hidden="true"`; each `<li>`
  carries the topic title as its only visible text.
- Featured card's contrast (white on `brand-dark`) must meet WCAG AA — the
  chosen `oklch(0.32 …)` background gives a contrast ratio > 7:1 against
  white, verified before merge.

## 11. Verification

Manual browser checks after `npm run dev`:

1. `/learn` loads without console errors or warnings.
2. Hero gradient visible; heading + subtitle + tag render.
3. Four cards render in a row ≥ 1280px viewport, stack to two columns at
   `md`, single column on mobile.
4. Exactly one card (Vocabulary) shows the featured styling + "Most studied"
   badge.
5. Every card lists 6+ topic rows with a check icon.
6. Clicking any CTA logs the correct section id to the console.
7. `Learn` link appears in the header, activates (brand color) when on
   `/learn`, and navigates via TanStack Router without full reload.
8. `npm run typecheck`, `npm run lint`, `npm run build` all exit 0.
9. Lighthouse accessibility score ≥ 95 on the `/learn` page.

## 12. Risks & open questions

- **Emoji rendering across platforms.** On Windows/Chromium the `📚` glyph
  renders as a colored emoji; on older Linux distros it may fall back to
  monochrome. Acceptable for v1.
- **Featured section identity.** We chose Vocabulary arbitrarily; the
  business owner may want to highlight a different pillar. Changing it is a
  single boolean flip in `sections.ts`.
- **Topic click target.** Whole card vs. just the button. v1: only the button
  is interactive, to keep the feature list clickable (future: each topic row
  becomes a link to its own detail page).

## 13. Follow-ups (not in this spec)

- Topic detail routes (`/learn/$sectionId/$topicSlug`) with rich content.
- Moving `SECTIONS` behind a backend endpoint (`GET /learn/sections`) with
  the same Zod schema on both sides.
- Level filter toggle once we have enough topics to justify it.
- Progress tracking tied to the Zustand auth store.
