const path = require('node:path')

/**
 * Staged files arrive as absolute paths from lint-staged. Each workspace runs
 * its OWN eslint + prettier binary so per-project configs and plugins (e.g.
 * the frontend's prettier-plugin-tailwindcss) resolve correctly.
 */
const repoRoot = __dirname
const frontendDir = path.resolve(repoRoot, 'frontend')
const backendDir = path.resolve(repoRoot, 'backend')

const feESLint = path.join(frontendDir, 'node_modules', '.bin', 'eslint')
const fePrettier = path.join(frontendDir, 'node_modules', '.bin', 'prettier')
const beESLint = path.join(backendDir, 'node_modules', '.bin', 'eslint')
const bePrettier = path.join(backendDir, 'node_modules', '.bin', 'prettier')

function relativeTo(dir, files) {
  return files
    .filter((f) => f.startsWith(dir))
    .map((f) => path.relative(dir, f).replace(/\\/g, '/'))
}

function quote(list) {
  return list.map((f) => `"${f}"`).join(' ')
}

function inDir(dir, cmd) {
  const rel = path.relative(repoRoot, dir).replace(/\\/g, '/')
  return `cd ${rel} && ${cmd}`
}

module.exports = {
  // ── Frontend TS/TSX ──────────────────────────────────────────────
  'frontend/src/**/*.{ts,tsx}': (files) => {
    const rel = relativeTo(frontendDir, files)
    if (rel.length === 0) return []
    const list = quote(rel)
    return [
      inDir(frontendDir, `"${feESLint}" --fix ${list}`),
      inDir(frontendDir, `"${fePrettier}" --write ${list}`),
    ]
  },
  // ── Frontend CSS / JSON / MD ─────────────────────────────────────
  'frontend/src/**/*.{css,json,md}': (files) => {
    const rel = relativeTo(frontendDir, files)
    if (rel.length === 0) return []
    return [inDir(frontendDir, `"${fePrettier}" --write ${quote(rel)}`)]
  },
  // ── Backend TS ───────────────────────────────────────────────────
  'backend/src/**/*.ts': (files) => {
    const rel = relativeTo(backendDir, files)
    if (rel.length === 0) return []
    const list = quote(rel)
    return [
      inDir(backendDir, `"${beESLint}" --fix ${list}`),
      inDir(backendDir, `"${bePrettier}" --write ${list}`),
    ]
  },
  // ── Backend JSON / MD ────────────────────────────────────────────
  'backend/src/**/*.{json,md}': (files) => {
    const rel = relativeTo(backendDir, files)
    if (rel.length === 0) return []
    return [inDir(backendDir, `"${bePrettier}" --write ${quote(rel)}`)]
  },
  // ── Shared (formatted from the repo root) ────────────────────────
  'shared/**/*.{ts,json,md}': (files) => {
    if (files.length === 0) return []
    const rel = files.map((f) => path.relative(repoRoot, f).replace(/\\/g, '/'))
    return [`"${fePrettier}" --write ${quote(rel)}`]
  },
}
