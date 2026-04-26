# Build context = repo root (set Railway service Root Directory to "/")
# Why: backend imports shared/ via @shared/* TypeScript path alias.
#
#   docker build -f backend/Dockerfile -t meridian-api .

FROM node:22-alpine AS builder
WORKDIR /repo

# Root deps (zod) — needed so shared/schemas/*.ts can resolve `import { z } from 'zod'`
# via Node module lookup. Without this, the backend webpack build emits 50+ TS errors
# because every Zod schema collapses to `any` and downstream inferred types fail.
# --omit=dev skips ESLint/Husky etc; --ignore-scripts skips the `prepare: husky` hook
# which fails inside Docker (no .git context).
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY backend/package.json backend/package-lock.json ./backend/
RUN npm --prefix backend ci --ignore-scripts

COPY shared ./shared
COPY backend ./backend
# Webpack bundling NestJS modules can spike past Node's default 512MB
# heap and get OOM-killed silently inside Docker (exit 1 with no output).
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm --prefix backend run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /repo/backend/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
