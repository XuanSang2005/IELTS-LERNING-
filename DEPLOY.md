# Deployment — Vercel (frontend) + Railway (backend)

This monorepo deploys as two services. Both use the **repo root** as build
context because `frontend/` and `backend/` import `shared/schemas/*` via the
`@shared/*` TypeScript path alias.

---

## 0. Prerequisites

- MongoDB Atlas cluster (free M0 tier is fine for MVP). Create a database user,
  add `0.0.0.0/0` to the IP allow-list (Railway IPs are dynamic), and copy the
  connection string.
- A GitHub repo with this code pushed to `main`.
- Vercel account (https://vercel.com) and Railway account (https://railway.app).

---

## 1. Backend → Railway

### 1.1 Create the service

1. Railway dashboard → **New Project** → **Deploy from GitHub repo** → pick this repo.
2. Once the service is created, open **Settings**:
   - **Root Directory** → leave as `/` (repo root). This is critical — the
     Dockerfile at `backend/Dockerfile` needs the whole repo as context so it
     can copy `shared/`.
   - **Builder** → Dockerfile (auto-detected from `railway.json`).
   - **Watch Paths** (optional) → `backend/**` and `shared/**` (avoid rebuilds
     on frontend-only changes).

### 1.2 Set environment variables

In Railway → **Variables**, add (mirror `backend/.env.example`):

| Name | Value |
|------|-------|
| `PORT` | Railway sets `$PORT` automatically — leave NestJS reading `process.env.PORT` |
| `MONGODB_URI` | `mongodb+srv://USER:PASS@cluster0.xxx.mongodb.net/meridian` |
| `JWT_SECRET` | **Rotate** — generate a fresh 64-char random string |
| `JWT_EXPIRES_IN` | `24h` |
| `CORS_ORIGIN` | Your Vercel URL — e.g. `https://meridian.vercel.app` (add custom domain later, comma-separated) |
| `NODE_ENV` | `production` |
| `ANTHROPIC_API_KEY` | Real key from console.anthropic.com (or leave blank for mock grading) |
| `PRO_MONTHLY_PRICE_VND` | `199000` (or your final price) |
| `PRO_COHORT_PRICE_VND` | `1499000` |
| `CASSO_WEBHOOK_SECRET` | From Casso dashboard, or leave blank to disable payments |
| `CASSO_WEBHOOK_MAX_AGE_SECONDS` | `300` |
| `MERIDIAN_BANK_*` | Real bank info (5 vars, see `.env.example`) |
| `PAYMENT_TTL_MINUTES` | `15` |

> **Important:** `CORS_ORIGIN` must exactly match your frontend origin
> (scheme + host, no trailing slash). Wrong CORS = browser console errors.

### 1.3 Networking

In Railway → **Settings → Networking** → **Generate Domain**. You'll get
`meridian-api-production.up.railway.app`. Save this URL — you'll paste it into
Vercel as `VITE_API_URL`.

### 1.4 First deploy

Railway auto-deploys when `main` is pushed. Watch the build logs:
- ✅ `npm --prefix backend ci` succeeds
- ✅ `nest build` produces `backend/dist/main.js`
- ✅ Runtime logs: `[meridian-api] listening on :PORT`
- ✅ Mongoose connects (no `MongoServerError`)
- ✅ Seeds run on first boot (lessons / tests / vocabulary)

If the seed fails, the app still starts — you can hit `POST /lessons/reseed`
later.

---

## 2. Frontend → Vercel

### 2.1 Create the project

1. Vercel dashboard → **Add New → Project** → import this GitHub repo.
2. **Framework Preset** → "Other" (the root `vercel.json` overrides everything).
3. **Root Directory** → leave as `./` (repo root). Do **not** point it at
   `frontend/` — Vite needs `../shared` to resolve.
4. Vercel will read `vercel.json` automatically:
   - Build: `npm --prefix frontend ci && npm --prefix frontend run build`
   - Output: `frontend/dist`
   - SPA rewrite: all paths fall back to `index.html` (TanStack Router)

### 2.2 Set environment variables

Vercel → **Settings → Environment Variables**:

| Name | Environment | Value |
|------|-------------|-------|
| `VITE_API_URL` | Production, Preview, Development | `https://meridian-api-production.up.railway.app` (your Railway domain) |

> **Important:** Vite inlines env vars at **build time**. After changing
> `VITE_API_URL`, redeploy.

### 2.3 First deploy

Push to `main` (or click **Deploy**). Watch:
- ✅ `tsr generate` runs (TanStack route tree)
- ✅ `tsc -b` typechecks
- ✅ `vite build` outputs to `frontend/dist`
- ✅ Visit the Vercel URL → landing page renders, no console errors,
  `/login` and `/app/*` routes survive a hard refresh (the SPA rewrite handles it)

### 2.4 Wire up CORS (back to Railway)

Once Vercel gives you a final URL (`https://meridian.vercel.app` or your
custom domain), go back to Railway and update `CORS_ORIGIN` to include it.
Railway will redeploy automatically.

---

## 3. Custom domain (optional, do this last)

1. **Vercel** → Settings → Domains → add `meridian.vn` (or whatever).
   Update DNS per Vercel's instructions.
2. **Railway** → Settings → Networking → add `api.meridian.vn`. Update DNS.
3. **Railway env** → set `CORS_ORIGIN=https://meridian.vn,https://www.meridian.vn`.
4. **Vercel env** → set `VITE_API_URL=https://api.meridian.vn`. Redeploy.

---

## 4. Smoke test checklist

After both services are live, walk this path in the browser:

- [ ] Landing page loads at the Vercel URL
- [ ] Hard-refresh `/method` and `/login` — no 404 (SPA rewrite working)
- [ ] DevTools → Network: `GET /pricing` returns 200 from Railway URL
- [ ] Sign up a test user → JWT comes back, `/app/dashboard` loads
- [ ] DevTools → Application: token persisted in `localStorage`
- [ ] Visit `/app/grammar` → lessons render (seed succeeded)
- [ ] No CORS errors in console

---

## 5. Pre-deploy hygiene (run once before first deploy)

- [ ] **Rotate `JWT_SECRET`** — the local `backend/.env` value must NOT be
      reused in production
- [ ] Confirm `backend/.env` is **not** tracked in git: `git ls-files backend/.env` → empty
- [ ] Commit or discard the 2 modified files in working tree:
      `frontend/src/features/practice/components/BandSelector.tsx` and
      `frontend/src/routes/onboarding.band.tsx`
- [ ] If using Casso: register the webhook URL `https://api.meridian.vn/payments/casso-webhook`
      in Casso dashboard
- [ ] MongoDB Atlas → Database User has `readWrite` on the `meridian` database

---

## 6. Common gotchas

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Origin … not allowed by CORS` in browser | `CORS_ORIGIN` mismatch | Set `CORS_ORIGIN` on Railway to exact Vercel origin (no trailing `/`) |
| Frontend shows white screen, console: "Invalid environment variables" | `VITE_API_URL` missing on Vercel | Add it, redeploy |
| Hard refresh on `/app/*` returns 404 | SPA rewrite broken | Check `vercel.json` is at repo root and committed |
| Railway build fails: `Cannot find module '@shared/...'` | Service Root Directory set to `backend` instead of `/` | Set to `/` in service settings |
| `MongoServerError: bad auth` | Atlas user/password wrong, or password contains `@` (URL-encode it) | Re-create user with simple password, update `MONGODB_URI` |
| Mongoose connects but lessons collection empty | Seed runs only on **empty** collection | Hit `POST /lessons/reseed` once; subsequent boots are no-ops |
