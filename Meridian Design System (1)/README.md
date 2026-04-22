# The Meridian — Design System

> *"The quiet craft of scoring Band 9, without the noise."*

**Meridian** is a premium IELTS preparation platform for Vietnamese candidates targeting Band 7.0+. The founder is an 8.5 Overall native Vietnamese tutor; the product is built and edited in her voice. Target: Vietnam first, English-speaking world later.

This design system encodes the brand so any design agent or engineer can produce on-brand Meridian interfaces, decks, print, and throwaway prototypes without re-reading the product source.

---

## THE VIBE, IN ONE LINE

Editorial, not SaaS. Cambridge exam booklet × *The Gentlewoman* × Aesop product pages × Kinfolk. If it looks like a typical SaaS dashboard, it's wrong. Every decision is filtered through this lens.

---

## SOURCES

All assets and conventions in this system derive from the Meridian monorepo and its `CLAUDE.md` brand bible. The reader of this file likely does not have access; everything essential has been distilled or copied here.

- **Codebase** — `Ielts lerning/` (mounted via File System Access API)
  - `Ielts lerning/CLAUDE.md` — authoritative brand + product bible (≈ 577 lines)
  - `Ielts lerning/frontend/` — Vite + React 19 + TanStack Router + Tailwind v4
  - `Ielts lerning/frontend/src/styles/globals.css` — canonical `@theme` tokens
  - `Ielts lerning/frontend/src/features/landing/` — Nav, Hero, SpecimenCard, TrustStrip
  - `Ielts lerning/frontend/src/features/method/Method.tsx` — long-form method page
  - `Ielts lerning/frontend/src/components/ornaments/` — feather, orbits, plate SVGs
- **Imagery** — `Ielts lerning/frontend/public/images/editions/` (4 JPGs, copied into `assets/`)
- **Icon sheet** — `Ielts lerning/frontend/public/icons.svg` (copied; generic social icons — Meridian uses typographic + editorial ornaments in preference to icons)

---

## INDEX

| File / folder | What it holds |
| --- | --- |
| `README.md` | This file. The brand bible. |
| `SKILL.md` | Skill manifest for Claude Code — read this file first when invoked as a Skill. |
| `colors_and_type.css` | CSS custom properties: palette, semantic colors, type scale, motion. Import this and you have the tokens. |
| `fonts/` | *(empty)* — Meridian fonts load from Google Fonts CDN. See `colors_and_type.css`. |
| `assets/` | Logo, favicon, edition imagery, social icon sprite. |
| `preview/` | Static HTML cards for the Design System tab. |
| `ui_kits/web/` | React recreations of the marketing site — Nav, two Hero variants (codebase-faithful and an editorial "attractive" variant), SpecimenCard, Polaroid, Postmark, TrustStrip, ornaments — presented together on a design canvas. |

---

## CONTENT FUNDAMENTALS

### Voice

- **Editorial, not transactional.** The product is a programme you enrol in, not an app you sign up for.
- **Quiet confidence.** Never exclamatory. No `!!!`. No hype.
- **Second-person but restrained.** "Your writing, graded within minutes." Not "Get instant feedback!"
- **British spelling** — programme, enrol, organisation, centre. Titles use British date format: `07 May 2026`.
- **Editorial verbs, not SaaS verbs.** Use *Begin, Enter, Attend, Consider, Read, Notice, Return*. Never *Start, Join, Get, Unlock, Boost, Supercharge*.
- **Italicize one word per headline.** Fraunces italic is the brand's emphasis mechanic — see "italicize-one-word" in *Visual Foundations*.
- **Reference printed matter.** Chapter (CH. IV), plate (PL. 03), figure (FIG. 01), edition (№ 08), volume (VOL. VII), programme, cohort, library.
- **Roman numerals or `№`** for numbering: `№ 003`, `CH. IV`, `MMXXIV`.
- **First person plural** for the founder's voice in editorial notes; otherwise, no "we" / "I". The brand speaks as a published programme, not a chatty team.
- **English only in UI.** The audience is Vietnamese but the app teaches English; editorial tone does not translate. Vietnamese appears only in the live Friday YouTube/Facebook stream (outside the app).
- **No emoji.** Anywhere. Ever.
- **No exclamation marks** in UI copy.

### Casing

- **Body & headlines** — sentence case (Fraunces). Never Title Case Everything.
- **Mono labels** — ALL CAPS, 0.25em tracking. Always.
- **Button label** — UPPERCASE, 0.22em tracking, Geist medium.
- **Discipline/level** — `B2 / C1 / C2` in mono, never "Beginner/Intermediate/Advanced".

### Copy comparison

| ❌ Generic SaaS | ✅ Meridian |
| --- | --- |
| Sign up for free | Begin your assessment |
| Get started today | Enter the programme |
| No items yet | Nothing here yet. Notice something first. |
| Our Features | The Four Disciplines · Method |
| Free Trial | Seven days. Three loops. Full access. |
| Upgrade to Pro | Continue the programme |
| You've run out of credits | Your trial has closed. The library remains open. |
| About Us | Editorial Note · The Method |
| Advanced level | `C1` (mono, tracked) |
| Dashboard | *(never seen in copy — just the content)* |
| Click here | *(banned — always specific: "Read the method ↗")* |

### Empty states

Editorial, always. "Nothing here yet. Notice something first." "The library remains open." Never "No data" or "Get started".

### Paywall copy pattern

> **Mono label:** `PRO — MEMBERSHIP REQUIRED`
> **Fraunces h3:** Beyond this point, the examiner reads.
> **Body:** Your writing, graded within minutes. The diagnostic that finds your ceiling. Friday evenings in the live library. Meridian Pro continues the programme.
> **CTA:** `Continue the programme →`

---

## VISUAL FOUNDATIONS

### Colors

All values live in `colors_and_type.css`. Palette in order of use:

| Name | Hex | Role |
| --- | --- | --- |
| `--ivory` | `#F6F1E7` | Default background — warm paper. **Never white.** |
| `--bone` | `#EEE7D8` | Secondary surfaces (section stripes, loop cards). |
| `--ink` | `#141210` | Primary text. Warm near-black. **Never `#000`.** |
| `--ink-warm` | `#2A2622` | Button fills; softer than ink. |
| `--graphite` | `#4A463E` | Secondary text, captions. |
| `--claret` | `#6B1F1A` | THE accent. 2px bottom rules, italic underlines, ribbons, figure-label accents. **3–5 uses per page max.** |
| `--sage` | `#6B7F5A` | Tertiary green — duotone alt, sparingly. |
| `--ochre` | `#B58A3C` | Tertiary amber — rosettes, ribbon inner borders. |
| `--line` | `#C9BFA8` | Hairline dividers, card borders. **Not grey — warm.** |

**Rules:**
- No gradients. No glassmorphism. No neon. No 3D blobs.
- Claret is the only saturated accent. Overuse ruins the brand instantly.
- Functional colors are *not invented* — errors use claret, ok uses sage, warn uses ochre. Never green-for-success blue-for-info.

### Type

Three families. That's it.

- **Fraunces** — display, headlines, editorial pull-quotes. Italic axis is the emphasis mechanic. Weights 400 + 500 only; italic 400.
- **Geist** — body + UI. Weights 400 + 500 only. No 300, no 700.
- **JetBrains Mono** — figure labels, dates, band ranges. Always `uppercase + tracking-[0.25em] + 10-12px`.

Max 2 weights per family visible at once. Never Inter / Roboto / Arial / system-ui — those read as SaaS instantly.

**Headlines:**
- `leading-[0.95]`, `-tracking-[0.02em]`
- Italicize ONE word per headline (not two, not zero)
- Claret hand-drawn underline under the italicized word — see `.underline-claret` in CSS
- Scale: `clamp(44px, 6vw, 88px)` for hero, `clamp(36px, 4vw, 60px)` for section h2

**Figure labels** (mono):
- `FIG. 01`, `CH. II`, `№ 003`, `PL. 07`, `VOL. IV`, `§ III`
- Always precede meaningful sections, cards, images
- Structure: `<span text-graphite>CH. II —</span> <span text-claret>Disciplines</span>`

### Backgrounds

- Every surface sits on **ivory paper with a subtle grain noise overlay** (SVG feTurbulence, 0.10 opacity). See `--paper-grain` in CSS.
- Bone (`#EEE7D8`) stripes break sections — never a white card on ivory. Section bands are full-bleed and separated by hairline `border-top: 1px solid var(--line)`.
- **No full-bleed hero photo backgrounds.** Imagery is a rotated polaroid/plate *within* the layout, not behind it.
- Soft radial color washes (claret 12% + ochre 18%) in heavy blur are permitted as ambient ornamentation in corners — see `BackgroundOrnaments.tsx`. These are the *only* colored backgrounds.

### Imagery

- **Always duotone-treated.** Wrap photo in `bg-claret` or `bg-sage`, apply `mix-blend-mode: multiply` + `filter: grayscale(0.9) sepia(0.3) contrast(1.18) brightness(1.05)`.
- Warm, never cool. Sepia over neutral. Reference: library stacks, leather-bound books, fountain pens, arched windows, examination booklets.
- Presented as **polaroids** — bone paper frame, edition banner in claret, rotated `-4deg` to `3deg`. Never square-crop flat.
- Hover: un-rotate and scale slightly (`rotate: 0, scale: 1.04`), duration `0.4s`, ease editorial.
- No generic stock people. No neutral-expression laptop users.

### Animation

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — editorial ease. Named `--ease-editorial`.
- Entrance: fade up 12px, duration 700ms, stagger 80-120ms.
- Continuous float: sine wave, `5s / 7s / 9s` durations, **never synchronised** — elements drift independently.
- Parallax on mouse-move: layered, 8-30px max displacement.
- **No scroll-jacking. No auto-playing video. No purposeless hover.** No bouncing. No confetti.

### Hover + press states

- Buttons: `hover:-translate-y-0.5` + shadow grows + `bg` darkens from `ink-warm` → `ink`. Press: no shrink — the shadow tightens.
- Text links: hairline under text darkens from `line` → `ink`; trailing arrow tints `claret` and nudges right `+2px`.
- Cards: hover rotates decorative polaroids to 0°; regular cards do not lift.
- **Never** a hover that changes background from light to a blue/purple — accent-on-hover is always `claret`.

### Borders

- **Hairline** `1px solid var(--line)` for dividers.
- **Strong** `2px solid var(--ink)` for card tops ("pull-rule") to open a section.
- **Signature** `2px solid var(--claret)` — appears ONLY as: button bottom rule, quote left border.
- **Corners square, radius ≤ 2px.** `rounded-2xl` is banned.

### Shadows

- Cards: `0 30px 60px -30px rgba(20, 18, 16, 0.25)` — warm and tall, not puffy.
- Hover: claret-tinted — `0 10px 25px -8px rgba(107, 31, 26, 0.35)`. **Never** `rgba(0,0,0,*)`.
- Polaroids: `0 30px 60px -20px rgba(20, 18, 16, 0.35)`, with a subtle ink-warm backing frame offset `+2px +2px` to fake stacked-photo depth.

### Layout

- Max content width: `1540px` nav, `1720px` dashboard. Generous side gutters (`px-6` → `px-14`).
- Body text: max `62ch`. Headlines: max `54ch`. Long body is left-aligned — never centered.
- Sections separated by `border-top: 1px solid var(--line)` (a hairline), never by whitespace alone.
- Figure label → hairline → content is the canonical rhythm.

### Transparency & blur

- Reserved: the backing ornament washes (`blur-3xl`, opacity 0.12–0.18).
- The "Cohort № 04" postmark uses `backdrop-blur-sm` + `bg-ivory/70` — this is the only glass-like surface and it's circular + 96px, not a panel.

### Signature motifs

1. **Italic-one-word headline** with claret hand-drawn underline. This is the strongest Meridian signal.
2. **Mono figure label** above every meaningful block.
3. **2px claret bottom rule** on the primary CTA — the button's only ornament.
4. **Rotated polaroid** with edition banner — imagery is always *artifact*, never decoration.
5. **Hairline dividers** between sections, ochre diamond `◆` as the only inline separator.

---

## ICONOGRAPHY

**Meridian does not use an icon set.** This is deliberate — icons read as SaaS. The editorial brand prefers:

- **Typography for wayfinding** — "Read the method ↗", "Begin your assessment →"
- **Roman numerals** (`CH. IV`, `§ II`, `MMXXIV`) as visual markers
- **Ornamental SVG plates** — see `OrnamentPlate.tsx` (8-fold rosette in hairline), `OrnamentFeather.tsx` (quill with vane lines), `OrnamentOrbits.tsx` (three concentric orbits for spaced-repetition imagery). These live in `assets/ornaments/` — they are *decorations*, not functional icons.
- **Single-character symbols** — `◆` (ochre diamond separator), `↗` `→` `←` `↓` (claret arrows in CTAs), `§` `№`.
- **The `M` mark** — wordmark uses claret `M` + ink `eridian`. Favicon is `assets/meridian-favicon.svg` (⚠ see caveat below).
- **Social icons** — `assets/icons.svg` (SVG sprite: bluesky, discord, github, x, documentation, social). Only used in footer; not in the primary UI.

**Emoji: forbidden.** Unicode symbols only (`◆`, `§`, `№`, `↗`).

**If you genuinely need a functional glyph** — stroked 1px arrows, checkmarks for completed items — author them inline as SVG with `stroke="currentColor"` and match the 0.8–1px stroke weight of `OrnamentFeather`. Do not pull in Lucide / Heroicons — their visual density will clash with the editorial type.

### ⚠ Favicon caveat

The `meridian-favicon.svg` copied from the repo is a **generic Vite starter favicon** (purple diamond) — not a Meridian brand mark. The real favicon has not yet been designed. Use the typographic `M` wordmark in place of a logo wherever possible, and flag this to the user for a proper mark.

---

## ⚠ SUBSTITUTIONS & CAVEATS

- **Fonts** — Fraunces, Geist, and JetBrains Mono load from Google Fonts CDN (matching the repo's `index.html`). No local `.woff2` files were bundled. If you need offline use, download the families into `fonts/` and swap the `@import` for `@font-face`.
- **Favicon / logo mark** — the repo ships a generic purple Vite template favicon; Meridian has no real logotype beyond the claret-M + ink-eridian wordmark. Use the wordmark; flag to the user that a proper mark is outstanding.
- **Photographs** — the four `edition-0N.jpg` images are the only brand-approved photographs in the repo. Hero & Method pages also reference Unsplash URLs (library stacks, fountain pens, arched windows) — these are hotlinked, not owned. For production work, licensed equivalents should be sourced and duotone-treated.
- **Icon system** — there is no formal icon set. Only the social-icon SVG sprite and three hand-drawn ornament components. Do not invent new icons without running them past the editorial direction.
