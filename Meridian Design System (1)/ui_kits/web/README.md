# Meridian — Web UI Kit

High-fidelity recreations of the Meridian marketing site (Ielts lerning/frontend).

## Files

- `index.html` — design canvas showing heroes + components.
- `design-canvas.jsx` — starter canvas shell (pan/zoom, reorderable artboards, focus mode).
- `Primitives.jsx` — `FadeUp`, `FigLabel`, `UnderlinedItalic`, `Wordmark`, `PrimaryButton`, `OutlineButton`, `TextLink`.
- `LandingPieces.jsx` — `Nav`, `BackgroundOrnaments`, `TrustStrip`, `SpecimenCard`, `Polaroid`, `Postmark`.
- `HeroOriginal.jsx` — faithful recreation of `Hero.tsx` from the codebase.
- `HeroAttractive.jsx` — the proposed more attractive hero (see below).

## The "attractive" hero — what's new

The ask was to make the hero more attractive. Every CLAUDE.md rule still holds (ivory paper, warm ink, claret used 3–5 times, italic-one-word with hand-drawn claret underline, mono figure labels, square corners, British spelling, no emoji), but the editorial weight is turned up:

1. **Masthead rule** — a thin hairline bar above the hero with `TODAY · ISSUE № 008 · SECTION · VOL.` — the newspaper masthead metaphor pulled in more literally.
2. **Ornamental plate** — the 8-fold rosette from `OrnamentPlate.tsx` anchors the top-left of the headline as a figure marker, replacing the thin eyebrow alone.
3. **Asymmetric typographic grid** — the headline breaks across four lines with ascending indentation: "The quiet craft / of scoring / Band 9, / without the noise." The last line is demoted to italic graphite at 62% of size — a subhead tucked into the headline rather than beside it.
4. **Pull-quote lede** — the claret-left-border pull-quote pattern (from the Method page) applied to the hero subhead, paired with a right-side "Enrolment closes" plate.
5. **Polaroid stack** — three rotated polaroids (library · fountain pen · specimen card) fanned together, the cohort postmark pinned over the cluster. Replaces the single-image + single-card composition.
6. **Drifting feather ornament** — the quill from `OrnamentFeather.tsx` floating in the right gutter at 50% opacity, slowly animating.
7. **Four Disciplines strip** — a chapter-of-contents rule under the hero surfacing the programme's structure (`I Listening · II Reading · III Writing · IV Speaking`), with Writing highlighted as the entry point. This doubles as a subtle progress / navigation device.
8. **Quiet copy upgrades** — "One cohort of fourteen. Twelve weeks. Same-day written feedback." and "nineteen places remain" (italic graphite, numerals spelled) to deepen the editorial register.

## Dependencies

- React 18.3.1 (pinned UMD)
- framer-motion 11.11.17 (UMD — available as `window.Motion`)
- colors_and_type.css (from project root)
- assets/edition-0N.jpg (from project root)

## Known caveats

- Framer Motion UMD lazily exposes `window.Motion` — `Nav`, `BackgroundOrnaments`, `SpecimenCard`, and `OrnamentFeather` fall back to static versions if it hasn't loaded, which is intentional.
- The hero backdrop photo (vintage books) hotlinks to Unsplash in the repo; we use the local `edition-01.jpg` instead, duotone-treated the same way.
- The original hero's dynamic `[zoom:0.78]` responsive scaling is skipped — within the canvas, each hero renders at its natural 1440px width.
