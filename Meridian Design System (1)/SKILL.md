---
name: meridian-design
description: Use this skill to generate well-branded interfaces and assets for The Meridian (a premium, editorial IELTS preparation platform), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files — `colors_and_type.css` (tokens), `ui_kits/web/` (React component recreations), `assets/` (logos, imagery, icon sprite), and `preview/` (rendered design-system cards).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. Import `colors_and_type.css` directly — every token is defined there. If working on production code, you can copy assets and read the rules in `README.md` to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface, fidelity, whether it's editorial long-form or a dashboard screen), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Cardinal rules for Meridian work:**
- Editorial, never SaaS. If it looks like a dashboard template, it's wrong.
- Ivory paper, warm ink, claret accent used 3–5 times per page max.
- Fraunces + Geist + JetBrains Mono. No Inter, no Roboto, no system fonts.
- Italicize one word per headline with the claret hand-drawn underline.
- Mono figure labels (`FIG. 01`, `CH. II`, `§ III`) above every meaningful block.
- Corners square (≤ 2px radius). No gradients, no glass, no rounded-2xl, no emoji.
- British spelling, editorial verbs (*Begin, Enter, Attend*), no exclamation marks.
