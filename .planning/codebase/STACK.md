# Technology Stack

**Analysis Date:** 2026-04-22

## Languages

**Primary:**
- TypeScript — used across both workspaces
  - Frontend: `~6.0.2` (see `frontend/package.json`)
  - Backend: `^5.7.3` (see `backend/package.json`)
  - Shared: consumed via path alias `@shared/*` (see `shared/tsconfig.json`)

**Secondary:**
- CSS — Tailwind v4 single-file design system in `frontend/src/styles/globals.css` (uses `@theme { }` tokens, no PostCSS config)
- HTML — single entry at `frontend/index.html` (loads Fraunces / Geist / JetBrains Mono from Google Fonts)

## Runtime

**Environment:**
- Node.js `v22.x` (local dev machine reports v22.19.0). No `.nvmrc` is committed.
- Backend compiles to Node (`target: ES2023`, `module: nodenext` — see `backend/tsconfig.json`)
- Frontend targets browsers via Vite (`target: es2023`, `moduleResolution: bundler` — see `frontend/tsconfig.app.json`)

**Package Manager:**
- npm (lockfiles: `package-lock.json` at root, `frontend/package-lock.json`, `backend/package-lock.json`)
- Folder-based monorepo via directory npm scripts (`npm --prefix frontend run ...`); NOT npm workspaces
- Root `package.json` holds only cross-workspace tooling (husky, lint-staged, prettier, eslint) plus the `zod` dependency shared by `shared/`

## Frameworks

**Core — Frontend (`frontend/package.json`):**
- React `^19.2.4` + React DOM `^19.2.4`
- Vite `^8.0.4` with `@vitejs/plugin-react` `^6.0.1` (see `frontend/vite.config.ts`)
- TanStack Router `^1.168.22` + router-cli `^1.166.33` + router-plugin `^1.167.22` + react-router-devtools `^1.166.13`
  - File-based routing in `frontend/src/routes/`
  - Generated tree at `frontend/src/routeTree.gen.ts` (do not edit; regenerate via `npm run tsr:generate`)
  - CLI config: `frontend/tsr.config.json`
- TanStack Query `^5.99.0` + `@tanstack/react-query-devtools` `^5.99.0`
- TanStack Form `^1.29.0`
- TanStack Table `^8.21.3`

**Core — Backend (`backend/package.json`):**
- NestJS `^11.0.1` (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- `@nestjs/config` `^4.0.4` — `ConfigModule.forRoot({ isGlobal: true })` in `backend/src/app.module.ts`
- `@nestjs/mongoose` `^11.0.4` + `mongoose` `^9.4.1` (connection wired async in `backend/src/app.module.ts`)
- `@nestjs/jwt` `^11.0.2` + `@nestjs/passport` `^11.0.5` + `passport` `^0.7.0` + `passport-jwt` `^4.0.1`
- `reflect-metadata` `^0.2.2`, `rxjs` `^7.8.1`
- Nest CLI config: `backend/nest-cli.json` (webpack build, `deleteOutDir: true`, tsconfig `tsconfig.build.json`)

**State / Forms:**
- Zustand `^5.0.12` — client state, persisted auth store in `frontend/src/stores/auth-store.ts` (key `meridian-auth-v1`, validated via Zod on rehydrate)
- TanStack Query for server state; QueryClient in `frontend/src/lib/query-client.ts`

**Validation:**
- Zod `^4.3.6` — single source of truth across all three workspaces (root, frontend, backend)
  - Shared schemas live in `shared/schemas/*.ts` (`auth.ts`, `lesson.ts`, `practice.ts`, `study.ts`, `submission.ts`, `test.ts`, `test-ai-submission.ts`, `vocabulary.ts`)
  - Frontend env parsed via Zod in `frontend/src/lib/env.ts`
  - Backend DTO validation via custom `ZodValidationPipe` in `backend/src/common/zod-validation.pipe.ts`

**Styling:**
- Tailwind CSS `^4.2.2` via `@tailwindcss/vite` `^4.2.2` plugin (no `tailwind.config.*`, no `postcss.config.*`)
- Design tokens declared in `@theme { }` block inside `frontend/src/styles/globals.css`
- `prettier-plugin-tailwindcss` `^0.7.2` sorts utility classes
- `clsx` `^2.1.1` for conditional classnames
- Paper-grain SVG noise overlay applied on `body` in `globals.css`

**Motion:**
- framer-motion `^12.38.0`

**Testing:**
- Backend: Jest `^30.0.0` + `ts-jest` `^29.2.5` + `supertest` `^7.0.0` (unit `*.spec.ts`, e2e via `backend/test/jest-e2e.json`)
- Frontend: **no test runner installed yet** (no vitest/jest present in `frontend/package.json`)
- Shared: no dedicated runner

**Build / Dev:**
- Frontend: `vite` (dev + build), `tsc -b` (typecheck), `tsr generate` (pre-hook before `dev` / `build` / `typecheck`)
- Backend: `nest build` (webpack), `nest start --watch` (dev), `node dist/main` (prod)

## Key Dependencies

**Critical:**
- `@anthropic-ai/sdk` `^0.90.0` — server-side AI client, used in `backend/src/submissions/ai-grading.service.ts`. Falls back to deterministic mock grading when `ANTHROPIC_API_KEY` is unset.
- `bcrypt` `^6.0.0` — password hashing (cost factor `12` in `backend/src/auth/auth.service.ts`)
- `mongoose` `^9.4.1` — MongoDB ODM; Nest schemas live alongside feature modules in `backend/src/**/schemas/`
- `zod` `^4.3.6` — schema validation across stack

**Infrastructure / Dev:**
- `husky` `^9.1.7` — Git hooks installed via root `npm run prepare`
- `lint-staged` `^16.4.0` — per-workspace eslint/prettier, config at `.lintstagedrc.cjs`
- `prettier` `^3.8.3` (frontend+root) / `^3.4.2` (backend)
- `eslint` `^9.39.4` (flat config — `eslint.config.mjs` at root, `frontend/eslint.config.js`, `backend/eslint.config.mjs`)
- `typescript-eslint` `^8.58.0` (root/frontend) / `^8.20.0` (backend)
- `eslint-plugin-react-hooks` `^7.0.1`, `eslint-plugin-react-refresh` `^0.5.2` (frontend)
- `eslint-config-prettier` `^10.0.1` + `eslint-plugin-prettier` `^5.2.2` (backend)
- `globals` `^17.4.0`

## Configuration

**Environment:**
- Frontend env parsed by Zod in `frontend/src/lib/env.ts` — throws at startup if invalid. Vite requires `VITE_` prefix for browser exposure.
  - `VITE_API_URL` — string URL, defaults to `http://localhost:4000`
  - `.env.example` at `frontend/.env.example`; local overrides in `frontend/.env.local` (gitignored)
- Backend env via `@nestjs/config`, read through `ConfigService` (e.g. `backend/src/app.module.ts`, `backend/src/auth/auth.module.ts`, `backend/src/submissions/ai-grading.service.ts`).
  - Template: `backend/.env.example`
  - Keys: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`, `ANTHROPIC_API_KEY`

**Build:**
- `frontend/vite.config.ts` — plugin order: `tanstackRouter` → `react` → `tailwindcss`; aliases `@` → `frontend/src`, `@shared` → `shared`; dev port `5173`
- `frontend/tsconfig.app.json` — `strict`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly: true`, `verbatimModuleSyntax: true`
- `frontend/tsconfig.node.json` — for Vite config + Node tooling
- `backend/tsconfig.json` — decorators enabled (`experimentalDecorators`, `emitDecoratorMetadata`), `module: nodenext`, `paths: { "@shared/*": ["../shared/*"] }`
- `backend/tsconfig.build.json` — referenced by `nest-cli.json`
- `backend/nest-cli.json` — `webpack: true`, `deleteOutDir: true`

**Formatting / Linting:**
- Root Prettier: `.prettierrc.json` (semi: false, single quotes, trailing comma all, printWidth 100, LF)
- Frontend Prettier: `frontend/.prettierrc` — same plus `prettier-plugin-tailwindcss`
- Backend Prettier: `backend/.prettierrc`
- Prettier ignore lists: `.prettierignore`, `frontend/.prettierignore`, `backend/.prettierignore`
- ESLint 9 flat configs (one per workspace, see Frameworks/Dev above)

**Git Hooks:**
- `.husky/pre-commit` → `npx lint-staged`
- `.husky/pre-push` → `npm --prefix frontend run typecheck`
- `.lintstagedrc.cjs` — routes staged files to the correct workspace's local `eslint`/`prettier` binary

## Platform Requirements

**Development:**
- Node 22.x + npm
- MongoDB reachable at `MONGODB_URI` (local default `mongodb://localhost:27017/meridian`)
- Optional Anthropic API key (feature falls back to deterministic mock grading if missing — see `backend/src/submissions/ai-grading.service.ts`)
- Ports: frontend Vite dev server `:5173`, backend Nest `:4000`

**Production (planned, per `CLAUDE.md`):**
- Frontend: Vercel (free tier for MVP)
- Backend: Railway or Render
- Database: MongoDB Atlas (M0 for MVP)
- Deployment not yet wired — no Dockerfile, no `vercel.json`, no `render.yaml`, no CI workflows present in the tree

---

*Stack analysis: 2026-04-22*
