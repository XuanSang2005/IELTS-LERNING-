# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Project

**Meridian** — a premium IELTS preparation platform for Vietnamese candidates targeting Band 7.0+.

The aesthetic is **editorial, not SaaS**. Think *The Gentlewoman* meets a Cambridge exam booklet. Aesop product pages. Kinfolk magazine. Quiet confidence. Every UI decision is filtered through this lens — if it looks like a typical SaaS dashboard, it's wrong.

- `frontend/` — React SPA (Vite + TypeScript). Scaffolded ✅
- `backend/` — NestJS + MongoDB + JWT auth + Anthropic wrapper. Scaffolded ✅
- `shared/schemas/` — Zod schemas imported by both sides via `@shared/*`

Folder-based monorepo. Root `package.json` holds Git hooks only.

---

## Founder & positioning

- **Built and taught by a Band 8.5 native Vietnamese IELTS tutor** — genuine competitive moat, referenced in marketing copy (landing hero, about, method)
- Target market: **Vietnam first**, English-speaking world later
- Audience: serious Band 6.0+ candidates aiming for 7.5+ — not casual learners
- Positioning: quiet, editorial, "one cohort of fourteen" feel — not mass-market gamified app

---

## Business model & pricing

### Tier structure

**FREE (trial):**
- Duration: **7 days OR 3 daily loops** — whichever comes first
- Full access to every Pro feature during trial
- After trial expires → auto-downgrades to Free (limited)

**FREE (limited, after trial):**
- ✅ Daily loops (unlimited, basic)
- ✅ Reading practice tests (answers only, NO detailed explanations)
- ✅ Listening practice tests (answers only, NO detailed explanations)
- ❌ Writing AI grading + feedback
- ❌ Speaking AI grading + feedback
- ❌ Detailed explanations for Reading/Listening
- ❌ Weekly Friday livestream access
- ❌ Personalized diagnostic + learning path
- ❌ Spaced repetition / Notebook / Error log

**PRO (paid):**
- Everything in Free unlocked
- AI-graded Writing with detailed examiner-style feedback
- AI-graded Speaking with pronunciation + fluency feedback
- Full diagnostic → band range estimate → personalized 12-week path
- Weekly Friday livestream with founder (8.5 Overall) — live test breakdown + Q&A
- Complete spaced repetition (notebook + error log)
- Detailed explanations for all practice tests

### Pricing — TBD, do NOT hardcode

Pricing is **not yet locked**. Use these conventions in code:

- Store tier prices in `backend/.env` → `PRO_MONTHLY_PRICE_VND`, `PRO_COHORT_PRICE_VND`
- Frontend reads from `/api/pricing` endpoint (never hardcode)
- In copy placeholders: `{PRICING_TBD}` or label sections "Pricing TBD"
- Do NOT write "99k/month" or "499k/month" in committed code or copy

### Unit economics (reference, not implementation)

- Target cost per Pro user: **~50k VND/month** (AI API + infra + storage)
- AI grading via Anthropic Claude API
- Livestream: founder-hosted on Facebook/YouTube Live (no per-stream cost)
- **No human teacher grading** — all feedback is AI-generated. This is a scope decision.

---

## Stack at a glance

See [`techstack.md`](./techstack.md) for full details.

- **Frontend:** Vite 8, React 19, TypeScript 6, Tailwind v4, TanStack Router/Query/Table/Form, Zod, Zustand, framer-motion, ESLint 9 flat, Prettier
- **Backend:** NestJS 11, MongoDB (Mongoose), Zod via `ZodValidationPipe`, JWT auth, `@anthropic-ai/sdk`, Casso webhook for VN bank-transfer payments
- **Git hooks:** Husky v9 — pre-commit `lint-staged`; pre-push `typecheck`

## Commands

```bash
# Frontend
cd frontend
npm run dev            # :5173 (auto tsr:generate first)
npm run build          # tsr -> tsc -b -> vite build
npm run typecheck      # tsr -> tsc -b --noEmit
npm run lint           # ESLint 9 flat
npm run lint:fix
npm run format
npm run tsr:generate

# Backend
cd backend
npm run start:dev      # :4000, watch mode
npm run build          # nest build
npm run lint
npm run lint:fix
npm run format
# One-off reseed of grammar_lessons (wipe + insert all 48 lessons)
npx ts-node -r tsconfig-paths/register scripts/reseed-lessons.ts
```

---

## Language strategy

**UI language: ENGLISH ONLY.**

- All navigation, buttons, labels, empty states, toasts: English
- All lesson content, articles, explanations: English (IELTS is taught in English)
- All error messages visible to users: English, editorial tone
- **No i18n setup** — do not install `react-i18next` or similar

**Translation feature (per-item, in-context):**
- User can click any English word/phrase/sentence in lesson content
- Popover shows Vietnamese translation (on-demand)
- Implementation: Claude API translation endpoint with caching
- Translations are reactive helpers, not primary experience
- **Purpose:** immersion + safety net, not convenience

**Rationale:** Target audience has some English competence. Editorial tone doesn't translate well to Vietnamese without losing brand feel. Learning English by using an English app is pedagogically sound.

**Livestream language:** Vietnamese (separate from app — delivered on YouTube/Facebook Live outside the app UI).

---

## Design system

**This is the most important section. Every new UI must match it exactly.**

### Colors (in `styles/globals.css` under `@theme`)

```
ivory:    #F6F1E7   — warm paper, default background
bone:     #EEE7D8   — secondary surfaces
ink:      #141210   — primary text (NEVER pure #000)
ink-warm: #1A1815   — button fills (softer than ink)
graphite: #4A463E   — secondary text
claret:   #6B1F1A   — primary accent (used sparingly, 3-5 times per page)
sage:     #5A6B54   — tertiary green accent
ochre:    #B58A3C   — tertiary amber accent
line:     #C9BFA8   — hairline dividers
```

- Default background: `ivory` with subtle paper-grain SVG noise overlay
- No gradients. No glassmorphism. No neon.
- Claret is the ONLY saturated accent — 3-5 times per page max
- Ink is warm near-black, never pure `#000`

### Typography

- **Fraunces** — display + headlines, italic axis for emphasis
- **Geist** — body + UI, weights 400 + 500 only
- **JetBrains Mono** — figure labels, always `uppercase + tracking-[0.25em]`

Rules:
- Max 2 weights per font family visible at once
- Headlines: `leading-[0.95]`, `-tracking-[0.02em]`, italicize ONE word
- Headline scale: `text-[clamp(44px,6vw,88px)]`
- Figure labels (`FIG. 01`, `CH. II`, `№ 003`, `PL. 07`) decorate sections, cards, images

### Font-size scale (enforce on every new reader/session page)

Follow this scale on any new grammar / vocabulary / practice / review page. Older screens scaled too small for 1920px displays — default to the md values below.

**Section headers (mono):**
- Listing-page eyebrow: `text-[11-12px] tracking-[0.28-0.3em]`
- Reader section label (`§ II · THEORY` pattern): `text-[15px] md:text-[17px] tracking-[0.32em] font-semibold`
- Small mono labels inside cards (`◆ FORMAL`, `◆ WHY`, `◆ EXAMPLE`): `text-[11-12px]` — do NOT drop to 9-10px; they become illegible at reading distance

**Body prose (Geist):**
- Reader prose: `text-[17px] md:text-[19px] leading-[1.85]`
- Secondary note body: `text-[15px] md:text-[16px]`

**Emphasis + quotes (Fraunces italic):**
- Definition body / quoted example: `text-[19px] md:text-[22px]`
- Card rule / directive: `text-[18px] md:text-[20px]`
- Wrong/right mistake text: `text-[18px] md:text-[19px]`

**Card headlines / prompts (Fraunces):**
- Exercise prompt: `text-[22px] md:text-[26px]`
- Flashcard front (review): `text-[30px] md:text-[40px]`
- Lesson hook: `text-[24px] md:text-[30px]`
- CTA headline: `text-[24px] md:text-[28px]`

**Hero display:**
- Page H1: `text-[clamp(44-52px,6vw,88px)]`
- Chapter numeral (CH. I): `text-[64-80px]`
- Score / count display: `text-[64px] md:text-[88px]`
- Numbered-list numeral inside theory: `text-[32px] md:text-[38px]`

**Formulas (Mono):**
- Single rule: `text-[18px] md:text-[21px] leading-[1.75]`
- Multi rule (split on `;`): `text-[17px] md:text-[20px]`
- `+` operator (whitespace both sides): `text-[22px] md:text-[24px] font-bold text-claret`
- Suffix chip (`+s`, `+ed`, `-ing`): `bg-claret/10 rounded-sm px-1 font-mono font-semibold text-claret` — same font-size as surrounding text, no special size

**Inputs (practice / search):**
- Bordered input: `text-[20px] md:text-[22px] font-fraunces italic` with `border-2 border-line focus:border-claret`
- Choice option text: `text-[17px] md:text-[18px] font-geist`

**Progress bars:** `h-2` (8px) filled, not `h-px` — too thin to see.

### Layout max-widths (also enforce on every new page)

- Listing page outer (tests, atlas, vocabulary, grammar roadmap): `max-w-[1720px]`
- Reader/session outer (lesson, practice, review): `max-w-[1720px]`
- Reader/session inner content (exercise body, flashcard row): `max-w-[1100px]`
- Theory frame: `max-w-[900px]`
- Reader prose column (hook, theory prose): `max-w-[60-68ch]` inside the frame
- Centered masthead text block: `max-w-[920px]`
- Flashcard inner text (review): `max-w-[800px]`

Padding convention: `px-6 py-12 md:px-10 md:py-16 xl:px-14` on outer containers.

### Signature button

Every primary CTA uses this exact pattern. No exceptions.

```tsx
<Link
  to="/..."
  className="group relative inline-flex items-center gap-3 bg-ink-warm text-ivory
             px-9 py-[17px] font-sans text-[12px] uppercase tracking-[0.22em]
             font-medium overflow-hidden transition-all duration-300
             hover:bg-ink hover:-translate-y-0.5
             hover:shadow-[0_10px_25px_-8px_rgba(107,31,26,0.35)]"
>
  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-claret" />
  <span className="relative z-10">Begin your assessment</span>
  <span className="relative z-10 text-claret text-[13px] transition-transform
                   duration-300 group-hover:translate-x-1">→</span>
</Link>
```

Rules:
- **Only ONE filled ink button per page.** All other CTAs outlined or text links.
- **2px claret bottom rule** is the signature motif — ties to hand-drawn underline under italicized words
- Arrow is claret at rest (not white)
- Hover shadow is claret-tinted (not black)

Outlined secondary (e.g. nav Sign up):

```tsx
<Link className="font-sans text-[12px] uppercase tracking-[0.18em] font-medium text-ink
                 px-5 py-2.5 border border-ink transition-colors duration-200
                 hover:bg-ink hover:text-ivory" />
```

Text link tertiary (e.g. `Read the method ↗`):

```tsx
<Link className="group inline-flex items-center gap-2 font-sans text-[14px] text-ink">
  <span className="relative">
    Read the method
    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-line
                     transition-colors duration-200 group-hover:bg-ink" />
  </span>
  <span className="text-[13px] transition-all duration-200
                   group-hover:text-claret group-hover:translate-x-0.5">↗</span>
</Link>
```

### Motion (framer-motion)

- Entrance stagger: `0.08s`, duration `0.7s`, ease `[0.22, 1, 0.36, 1]`
- Layered mouse parallax: different elements move different amounts (8-30px max)
- Continuous float: sine wave, durations `5s / 7s / 9s` (don't sync)
- No scroll-jacking. No auto-playing videos. No purposeless hover.

### Editorial details

- **Hairline dividers** (`border-t border-line`) separate sections
- **Figure labels** above every meaningful element
- **Italic emphasis** on single words per headline
- **Small rotations** on cards/photos (`rotate-[-1.5deg]`, `rotate-[3deg]`)
- **Duotone photography** — always wrapped in `bg-claret` or `bg-sage` with `mix-blend-mode: multiply` + grayscale/sepia filter

---

## Anti-patterns (NEVER do these)

- ❌ `rounded-2xl` everywhere. Corners are **square, max 2px radius**
- ❌ Purple/blue gradients, glassmorphism, neon, 3D blobs
- ❌ Inter, Roboto, Arial, system fonts — strictly Fraunces + Geist + JetBrains Mono
- ❌ Pure `#000` — use `ink` or `ink-warm`
- ❌ SaaS copy: "Get started free", "Sign up now", "Join today"
- ❌ Features sections with 3 icons in a row
- ❌ Generic black drop shadows — use warm claret-tinted
- ❌ Emoji in UI copy
- ❌ Beginner/Intermediate/Advanced colored pills — use Mono `B2 / C1 / C2`
- ❌ Progress rings or gamification badges — hairline bars only
- ❌ Center-aligned long body text
- ❌ Hard-coded pricing values
- ❌ Vietnamese in UI strings
- ❌ Streaks, XP, levels, badges, confetti — brand forbids gamification

---

## Pedagogy — The Meridian Method

Methodology the product implements. Every feature ladders up to these principles.

### 5 core principles

1. **Diagnose before prescribe.** No two candidates plateau for the same reason.
2. **Chunks, not words.** Teach multi-word units (collocations, linking phrases).
3. **Feedback within 24 hours.** AI grading returns in seconds → same-day review.
4. **Grade yourself like an examiner.** Teach users to read band descriptors.
5. **Less breadth, more repetition.** 30% less material, revisited 4-5 times.

### The 12-week arc

- **Phase I · Week 01** — Orientation: diagnostic, error taxonomy, band descriptor masterclass
- **Phase II · Weeks 02-05** — Foundations: 4 disciplines rotation, template mastery, receptive strategy
- **Phase III · Weeks 06-09** — Refinement: complex arguments, error drills, 2 mocks
- **Phase IV · Weeks 10-12** — Examination: weekly mocks, test-day rehearsal, examiner's eye

### Band scoring — range-based, not point-based

- Show users `Band 5.5 – 6.5` ranges, NOT `Band 6.2`
- 4 learning paths based on range: 5.0-5.5, 6.0-6.5, 7.0-7.5, 8.0+
- Overall = average of 4 skills, **official IELTS rounding rules**:
  - End in .25 → round up to .5 (e.g. 5.75 → 6.0)
  - End in .75 → round up to next whole (5.375 → 5.5)
- Writing/Speaking band variance across submissions is NORMAL: *"Today's essay grades at 6.0. Yesterday's was 5.5. This is normal. Your working range is 5.5-6.5."*

### The 4 disciplines

1. **Grammar** — structural foundations (conditionals, complex sentences, inversion)
2. **Vocabulary** — academic lexis (synonyms, topic clusters, C1 register)
3. **Collocations** — natural word pairings
4. **Linking Devices** — connectors for C&C + linking verbs (seem, appear, become)

### Daily Loop — 2 modes

- **Essential Loop (30 min, 3 steps):** Input → Apply → Review
- **Complete Loop (90 min, 6 steps):** Input → Notice → Recall → Apply → Feedback → Review

Users pick per session. Both tracked identically in progress.

### Content strategy

- **AI-drafted, founder-edited** (founder is Band 8.5, edits personally)
- Target: 1 new lesson every 2-3 days (~120 lessons across 12 weeks, 4 disciplines)
- Lesson template (matches `LessonSchema` in `shared/schemas/lesson.ts`):
  1. Hook — why this matters for IELTS (2-3 sentences)
  2. Theory — rule + explanation (150-200 words). Do NOT include full example sentences here — they belong in §III. Keep formulas crisp (`Label: body + more.`) so the Theory parser can extract them.
  3. Examples — exactly 3, one each at B1/B2/C1 registers
  4. Common mistakes — exactly 3 wrong/right/why triples, drawn from Vietnamese-learner errors
  5. Practice — 3–8 exercises (gap-fill / rewrite / choice) with answer + optional explanation
  6. Extension — 1 Task 2 prompt + `minWords`
  7. Noticing — 3–7 items feeding the week's review flashcards

### Grammar feature — the live reference arc

`/app/grammar` is the canonical example of how a discipline is structured end-to-end. New disciplines (Vocabulary, Collocations, Linking) should follow the same skeleton.

- **Four level arcs** — Foundation (B4.5–5.5), Intermediate (B5.5–6.5), Advanced (B6.5–7.5), Mastery (B7.5+). Each 12 weeks, one structure per week.
- **State** — `useGrammarLevel` (persisted level choice) and `useGrammarProgress` (byLevel → byWeek → `{lessonRead, practiceScore, reviewPassed}`) in `frontend/src/stores/`.
- **Schemas** — `shared/schemas/grammar-plan.ts` (stubs, phase descriptors) + `shared/schemas/lesson.ts` (full lesson shape).
- **Routes** — `routes/app.grammar.tsx` is a layout with `<Outlet />`; `app.grammar.index.tsx` renders the roadmap; `app.grammar.$week.tsx` renders `<WeekPage>` with `?tab=lesson|practice|review` search param.
- **Theory rendering** — `LessonReader` parses the theory paragraph into semantic blocks: `formula` (Label: body with `+`), `numberedList` (`Label: (1) …; (2) …`), `rule` (starts with Use/Never/Avoid/…), and `prose`. Formulas render as lifted ivory cards with keyword pills + oversized claret `+` operators. Inline `+s` / `+ed` / `-ing` suffixes render as small claret chips. Standalone example sentences in theory are auto-stripped to avoid duplicating §III.
- **Level + progress keyed together** — changing level swaps the entire arc and the progress dots on roadmap tiles re-read from the new level's bucket. Legacy flat progress (pre-level) migrates under `intermediate` on first rehydrate.

When adding a new discipline page, mirror this architecture: level selector → phases roadmap → week page (lesson/practice/review tabs) → session components.

---

## Retention strategy

Meridian balances brand purity with honest engagement. The founder lives livestream on Fridays and runs social campaigns to drive self-study motivation.

### Subtle retention features (build these)

1. **Daily 7 AM email** — editorial tone, subject like *"The library opens — 15 April"*. One item of the day + `Begin loop →` link. NEVER "Don't break your streak!"
2. **"Day N of 84" label** — Mono style on dashboard. Technical, not cheesy.
3. **Weekly Sunday digest** — *"This week in review"*. Items captured, words written, livestream attendance.
4. **Cohort median progress** (anonymized) — *"Your cohort median: 18/30. You're at 20."* Peer pressure without names.
5. **Calendar integration** — add "Meridian Daily Loop · 8 PM" to Google/Apple Calendar.
6. **"Consecutive days" framing** — *"Your consecutive days of practice: 12. Miss a day and the library resets the count."* Same mechanic as streaks, editorial voice.
7. **Friday livestream** — 8-9:30 PM Vietnam time, founder-hosted (8.5 Overall), 3 segments:
   - 0-30m: Writing Task 2 breakdown from Pro submissions (annotated on-screen)
   - 30-60m: Grammar/vocab Q&A from cohort chat
   - 60-90m: Common mistake of the week
8. **Social campaigns** (founder-driven) — TikTok/Facebook/YouTube content to drive top-of-funnel + community

### NEVER build (violate brand)

- Streak counter with fire emoji
- Push notification "Don't break your streak!"
- Public leaderboard with names
- XP/levels/badges
- Daily challenges with countdown timers
- "You're losing your streak!" modals
- Confetti on lesson complete

---

## Feature architecture

Features live in `frontend/src/features/<n>/`:

```
features/<n>/
├─ components/          # UI, PascalCase
├─ hooks/               # feature-local (useXxxQuery, etc.)
├─ utils/               # pure functions
└─ data/                # seed data, mocks, static content
```

**Not feature-local** (top-level):
- Zustand stores → `frontend/src/stores/<n>-store.ts`
- Zod schemas → `frontend/src/schemas/<n>.ts`

**Shared between FE and BE:**
- Zod schemas → `shared/schemas/` at repo root
- Both reference via `@shared/*` path alias

### Current features

- `features/landing/` ✅ — marketing (Nav, Hero, SpecimenCard, TrustStrip, BackgroundOrnaments)
- `features/method/` ✅ — `/method` page
- `features/study/` ✅ — `/study` catalog
- `features/dashboard/` ✅ — `/app/` editorial dashboard (Hero / Roadmap / Today's Session / Four Disciplines / Band Scale / Archive). Composed in `routes/app.index.tsx`.
- `features/practice/` ✅ — `/app/session` daily-loop runner + supporting hooks (`useProfile`, `useDueItems`, `useTodayLog`)
- `features/auth/` ✅ — login + signup
- `features/tests/` ✅ — listening / reading / writing / speaking practice tests
- `features/grammar/` ✅ — `/app/grammar/*` 4-level arc (Foundation → Mastery), lesson/practice/review tabs
- `features/lexicon/` ✅ — `/app/lexicon/*` 12-week × 3-discipline (vocabulary / collocations / linking) with Leitner SRS
- `features/atlas/` ✅ — `/atlas` editorial catalogue of Vietnamese-learner mistakes
- `features/translation/` ✅ — selection-triggered EN → VN popover (Claude Haiku, Mongo cache). Used by Atlas of Mistakes only; expand to other lesson surfaces by wrapping in `<TranslatableArea>`. Excluded from grammar / lexicon / practice / quiz / diagnostic by design.
- `features/payment/` ✅ — `/pay/$paymentId` QR + bank-transfer flow (Casso webhook)
- `features/diagnostic/` ✅ — `/onboarding/diagnostic/*` 4-step placement (5 listening + 5 reading + 1 writing → result). Speaking estimated as `writing - 0.5` until real audio capture lands. Hard gate at `/app/*` redirects first-time users.
- `features/livestream/` — Friday session embed + archive (planned)

### Dashboard data — current state

The `/app/` dashboard reads from `useProfile()` (`UserProfile` schema in `shared/schemas/practice.ts`). Some sections render **stub data** because the backend doesn't yet aggregate per-discipline progress:

- **The Four Disciplines** (`features/dashboard/components/DisciplineGrid.tsx`) — `total` is hardcoded to `12` weeks (curriculum constant). `completed` reads from `profile.disciplineProgress[d].completed`, which is **always 0** until per-discipline completion is wired to backend aggregation:
  - Grammar: should derive from `lessons` collection — count lessons read by user at current level.
  - Vocabulary / Collocations / Linking: should derive from `lexicon_progress` aggregation — count weeks where `daysCompleted.length === 7`.
- **From Yesterday** band in Today's Session (`TodaySession.tsx`) — items are a hardcoded `YESTERDAY_ITEMS` constant. Should pull from the user's last-session capture / SRS introductions in the previous user-local day.
- **Archive Strip** (`ArchiveStrip.tsx`) — 3 polaroids with hardcoded captions ("Last writing — graded 6.5", etc.). Should pull last 3 user activities from a unified `recent-activity` endpoint.
- **Editorial quote** in DashboardHero — `dueCount` is real (from `useDueItems()`); the framing copy is static.
- **Band descriptor strip** in `BandScale.tsx` — descriptors derived from `bandDescriptor()` lookup keyed by `currentBand.range[0]`. Real data, no stub.
- **Roadmap THIS WEEK / NEXT WEEK / PHASE ENDS** copy in `PhaseStrip.tsx` — `WEEK_THEMES` constant, hardcoded. Content team can revise without touching layout; revisit when per-week themes move to the backend curriculum schema.

When wiring real progress, prefer **derive-on-read aggregation** over persisted progress fields (matches the Lexicon `daysCompleted` pattern — cache 60s, query `srs_cards` / `lexicon_progress`).

---

## Zod is the source of truth

Schemas come first. Types inferred.

```ts
export const NoticingItemSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  category: DisciplineSchema,
});
export type NoticingItem = z.infer<typeof NoticingItemSchema>;
```

When persisting (localStorage, API, rehydrate):
- Version the key: `meridian-<feature>-v1`
- Validate on rehydrate with the schema
- On invalid → fall back to seed/empty, never crash

---

## Key technical conventions

- **Path alias:** `@/*` → `frontend/src/*`, `@shared/*` → `shared/*`
- **Route tree generated:** `frontend/src/routeTree.gen.ts` by `@tanstack/router-cli`. Don't edit. `npm run tsr:generate` if stale.
- **File-based routes:** `routes/listening.tsx` → `/listening`
- **Env vars:** browser-exposed must start with `VITE_`. Parsed via Zod in `lib/env.ts` — missing vars throw at startup
- **HTTP:** `apiFetch<T>()` from `lib/api-client.ts`. No axios.
- **Forms:** TanStack Form + Zod. No react-hook-form.
- **Server state:** TanStack Query. Stable queryKeys co-located with feature.
- **Client state:** Zustand, one store per concern.
- **Styling:** Tailwind utility. Add tokens to `@theme { }` in `styles/globals.css`.

---

## AI integration

### Anthropic Claude — primary AI provider

- **Grading tasks:** `claude-sonnet-4-6` (cost/quality balance, current generation)
- **Translation feature:** `claude-haiku-4-5-20251001` (cheap, fast)
- **Never expose API key to frontend** — all calls through backend
- Backend wraps Anthropic SDK, frontend calls `apiFetch('/api/grade/writing', ...)`
- Update model IDs here whenever a new Claude generation is promoted to default — don't let them drift

### Use cases

1. **Writing grading** — Task 1 + Task 2, returns per-criterion band + annotations
2. **Speaking grading** — transcribed audio + analysis (Parts 1-3)
3. **Translation** — on-demand EN → VN for lesson content
4. **Diagnostic** — Listening + Reading auto-graded, Writing + Speaking AI-graded

### Cost discipline

- Cache translations aggressively (same phrase → same translation)
- Rate-limit AI endpoints: max 10 Writing gradings / user / day
- `max_tokens` sensible (Writing grading ~1500 output, not 4096)
- Track cost per user for margin analysis

### Text-to-speech (listening audio)

Listening audio for tests + diagnostic comes from one of three sources, in this order of preference:

1. **Recorded MP3** at `frontend/public/audio/<id>.mp3` — placed manually or generated by a TTS script. `AudioPlayer` uses this when `audioUrl` is set.
2. **Web Speech API fallback** — when `audioUrl` is null, `AudioPlayer` synthesises from the transcript in-browser. Quality: very good on macOS/iOS (Siri), acceptable on Windows, variable on Linux/Android. Free, zero infra. Default for unfinished content.
3. **Voice actor** — premium positioning for ≤10 showcase tests post-launch.

**TTS service benchmarks for a 50-test batch (~1M chars total)** — for choosing when generating MP3s:

| Service | Cost (1M chars) | Quality | Multi-voice | Notes |
|---|---|---|---|---|
| Google Cloud TTS Neural2 | $14.40 (or $0 spread over 2 months — 1M/mo free tier forever) | ⭐⭐⭐⭐ | ✅ 38 EN voices | Best $/quality |
| OpenAI TTS HD | $30 | ⭐⭐⭐⭐ | 6 voices | **MVP default** — simplest setup, likely already have key |
| OpenAI TTS standard | $15 | ⭐⭐⭐½ | 6 voices | Skip — go HD for $15 more |
| Azure Speech Neural | ~$8 (after 0.5M/mo free) | ⭐⭐⭐⭐ | ✅ Many | Setup more complex |
| ElevenLabs Creator/Pro | $99-198 | ⭐⭐⭐⭐⭐ | ✅ Voice cloning | Premium tier — use for 5-10 showcase tests, not full batch |

**Default strategy**: OpenAI TTS HD for the full 50-test catalogue (~$30 one-time), then re-generate 5-10 "Pro showcase" tests with ElevenLabs (~$99) once paying cohort exists. Total audio investment ~$130 for first launch.

**Re-generation cost**: ~$0.30 per test when transcript changes. Generate-once, host on Vercel/Cloudflare CDN free tier. No per-play cost.

**Implementation**: TTS scripts live at `scripts/generate-audio-*.ts`, write MP3s into `frontend/public/audio/`. Update the test seed's `audioUrl` to `/audio/<id>.mp3`. Never call TTS at runtime — it's a build-time / on-demand-by-author task.

---

## Roadmap

### MVP launch (test with friends first)

1. ✅ Landing + Method + Study pages
2. ✅ Practice feature (dashboard, daily loop, notebook, errors)
3. ✅ Backend scaffold (NestJS + Mongoose + JWT auth + lessons/tests/payments)
4. ✅ Grammar feature — 4-level arc × 12 weeks × lesson/practice/review
5. ✅ Atlas of Mistakes — editorial catalogue of VN-learner errors
6. ✅ Listening / Reading / Writing / Speaking practice tests (scaffold)
7. ✅ Payment flow — Casso bank-transfer + QR (VNPay/Momo deferred)
8. 🔨 Free vs Pro paywall logic — tier checks wired, upsell copy in progress
9. 🔨 AI Writing grading (Anthropic integration; mock grading fallback live)
10. AI Speaking grading
11. ✅ Translation feature (per-phrase VN popover) — Atlas of Mistakes only; wrap any other surface in `<TranslatableArea>` to enable
12. Weekly livestream embed + archive

### Post-launch

13. ✅ Diagnostic onboarding flow — 5 L + 5 R + 1 W (speaking estimated until v2 audio capture)
14. Full content fill — 48+ grammar lessons seeded, vocab/collocations/linking pending
15. Cohort view (median progress, anonymized)
16. Email automation (daily 7 AM, weekly digest)
17. Referral program (editorial rewards)

---

## When adding a new route

1. Create `routes/<n>.tsx` with `createFileRoute('/<n>')({ component: ... })`
2. Run `npm run tsr:generate` or restart dev
3. Add `<Link to="/<n>">` somewhere visible
4. If Pro-gated: wrap with `requirePro` loader (see `lib/auth.ts`)

## When adding a new API call

1. Define response shape with Zod schema in `shared/schemas/`
2. Feature-local hook wrapping `useQuery` + `apiFetch` + `schema.parse(data)`
3. Consume from route component
4. If AI-powered: add to backend `/ai/*` with rate limiting

## When adding a new feature

1. Create `features/<n>/{components,hooks,utils,data}/`
2. State: `stores/<n>-store.ts`. Server data: `shared/schemas/<n>.ts`
3. Add route(s)
4. Reuse signature button — never create new variants
5. Check if Pro-only → add paywall gate
6. Run editorial checklist below

## Editorial checklist (for every new component)

- [ ] Uses only `@theme` tokens — no hex in JSX
- [ ] Uses Fraunces / Geist / Mono — no Inter / Roboto / Arial
- [ ] Mono figure label above it if section-level
- [ ] Primary CTA uses signature button; others outlined or text links
- [ ] Decorative elements rotated slightly
- [ ] Photos duotone-treated (Polaroid component in `components/ui/Polaroid.tsx`)
- [ ] Corners square or ≤2px
- [ ] Shadows claret-tinted, not black
- [ ] Empty state is editorial copy, not "No data"
- [ ] Responsive to 375px
- [ ] Pro-gated features show locked state with upsell copy
- [ ] All copy in English, editorial voice
- [ ] No hardcoded prices
- [ ] Section separators use a single full-width `border-t border-line` (not `border-y`, not double hairlines)
- [ ] Page content max-width is `1720px`
- [ ] Don't stack TanStack layout routes without an `<Outlet />` — `app.X.tsx` next to `app.X.$Y.tsx` makes the first a layout, and it MUST render `<Outlet />` or the child never mounts

---

## Things to avoid

- Don't install `react-router-dom` — TanStack Router
- Don't install `axios` — use `apiFetch`
- Don't re-add `postcss.config.js` or `autoprefixer` — Tailwind v4 Vite plugin handles both
- Don't add parameter-property constructors — `erasableSyntaxOnly` is on
- Don't bypass Git hooks with `--no-verify`
- Don't commit `.env` or `.env.local`
- Don't introduce a new button style
- Don't put feature-specific components in `src/components/`
- Don't put types in feature folders — infer from Zod schemas in `shared/schemas/`
- Don't install `react-i18next` — English-only UI
- Don't hardcode pricing — read from env/API
- Don't expose Anthropic API keys to frontend
- Don't use human teacher grading — all feedback is AI
- Don't add gamification — brand forbids

---

## Backend (live)

Built on NestJS 11 + Mongoose. Root at `backend/`.

**Modules present:**
- `auth/` — login, register, JWT (24h access tokens)
- `lessons/` — grammar lessons (48 seeded across 4 levels × 12 weeks) with `POST /lessons/reseed`
- `tests/` — listening / reading / writing / speaking practice tests
- `pricing/` — `GET /pricing` reads from env, never hardcoded
- `payments/` — Casso webhook verification + session TTL
- `common/` — `ZodValidationPipe`, `JwtAuthGuard`

**Conventions:**
- Shared schemas live in `shared/schemas/` at repo root, imported via `@shared/*`
- DTO validation via `ZodValidationPipe` (custom, not `nestjs-zod`)
- Passwords: bcrypt cost 12
- CORS allow-list from `CORS_ORIGIN`
- Anthropic SDK wrapped in a service; frontend NEVER calls Anthropic directly
- Seed-on-empty pattern: `LessonsService.onModuleInit()` seeds from `data/lesson-seed.ts` only if collection is empty. Use `POST /lessons/reseed` (or the `scripts/reseed-lessons.ts` standalone) to force-replace.

**Env keys:** see `backend/.env.example` — MongoDB URI, JWT secret, Anthropic key, pricing in VND, Casso webhook secret, Meridian bank account for VietQR.

---

## Copy voice (for any UI text)

### Rules

- **Editorial verbs**: "Begin", "Enter", "Attend to", "Consider", "Read" — never "Start", "Join", "Get"
- **Italicize a single key word** per headline
- **Reference printed matter**: chapter, edition, plate, figure, volume, programme (British spelling)
- **Roman or `№`**: `№ 003`, `CH. IV`, `VOL. VII`
- **Dates**: `07 May 2026` or `MMXXIV` or `Fri 17 Apr`
- **Never "Click here", "Learn more", "Read more"** — banned
- **Empty states** get editorial writing
- **English only**

### Examples

| ❌ Generic                    | ✅ Meridian                                            |
| ----------------------------- | ------------------------------------------------------ |
| "Sign up for free"            | "Begin your assessment"                                |
| "Get started"                 | "Enter the programme"                                  |
| "No items yet"                | "Nothing here yet. Notice something first."            |
| "Our Features"                | "The Four Disciplines" / "Method"                      |
| "Advanced level"              | `C1` (Mono, uppercase, tracked)                        |
| "About us"                    | "The Method" / "Editorial Note"                        |
| "Free Trial"                  | "Seven days. Three loops. Full access."                |
| "Upgrade to Pro"              | "Continue the programme"                               |
| "You've run out of credits"   | "Your trial has closed. The library remains open."     |

### Paywall copy pattern

When a Free user hits a Pro-gated feature:

> **Mono label:** PRO — MEMBERSHIP REQUIRED
> **Fraunces h3:** Beyond this point, the examiner reads.
> **Body:** Your writing, graded within minutes. The diagnostic that finds your ceiling. Friday evenings in the live library. Meridian Pro continues the programme.
> **CTA:** Continue the programme →

Never "UNLOCK NOW!!!" or "Limited offer!!!". Quiet confidence.

---

## Deployment (planned)

- Frontend: **Vercel** (free tier during MVP)
- Backend: **Railway** or **Render** (~$5-10/month)
- Database: **MongoDB Atlas M0** (free during MVP, migrate to M10 post-launch)
- Email: **Resend** (3000/month free)
- Analytics: **Plausible** or **PostHog** (privacy-friendly)
- Payment: **VNPay** or **Momo** for VN
- Domain: TBD, placeholder in env

---

## Open questions (do NOT implement speculatively)

- Pricing structure (monthly vs cohort vs tiered) — TBD before public launch
- Cohort enrollment windows (fixed every 4 weeks, or rolling) — TBD
- Refund policy — TBD
- Affiliate/referral mechanics — post-launch
- Mobile native apps — web-first, native later
- B2B offering (corporate English training) — out of MVP scope


"after the change, take a screenshot and verify the layout matches the spec"
REMEMBER: The code you write will be reviewed by CHATGPT 5.4
