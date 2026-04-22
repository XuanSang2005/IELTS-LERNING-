#!/usr/bin/env node
// One-off generator for the "Practice Hall" editorial hero photographs.
// Reads FAL_KEY from frontend/.env.local or process.env.
// Writes JPEGs to frontend/public/images/editions/edition-0N.jpg.
//
// Usage: node scripts/generate-editions.mjs

import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..')
const envPath = path.join(repoRoot, 'frontend', '.env.local')
const outDir = path.join(repoRoot, 'frontend', 'public', 'images', 'editions')

function loadKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(envPath)) throw new Error(`No FAL_KEY in env and ${envPath} missing`)
  for (const line of readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^FAL_KEY\s*=\s*(.+)\s*$/)
    if (m) return m[1].trim()
  }
  throw new Error(`FAL_KEY not found in ${envPath}`)
}

const SHARED = [
  'Editorial photograph, 35mm film aesthetic with visible fine grain,',
  'subtle natural vignette, shallow depth of field where appropriate.',
  'Warm incandescent or late-afternoon light only — brass lamps, candles, warm sun.',
  'No fluorescent light, no daylight blue cast, no cool tones.',
  'Quiet, contemplative, academic mood. Editorial stillness.',
  'Reference: Paris Review covers, Cereal magazine, Kinfolk interiors.',
  'Vertical 4:5 portrait composition.',
  'Exclude: visible faces, modern technology (laptops, phones, LEDs),',
  'legible text or signage, vibrant saturated color, contemporary clutter,',
  'any polaroid frame or border, any caption text.',
].join(' ')

const scenes = [
  {
    file: 'edition-01.jpg',
    name: 'The Stacks',
    prompt:
      `${SHARED} The scene: a narrow aisle between two tall, densely-packed ` +
      `bookshelves in an old library. Strict one-point perspective, camera ` +
      `looking straight down the aisle. A single warm pendant light or brass ` +
      `sconce glows at the far end, becoming the vanishing point. Leather and ` +
      `cloth book spines on both walls, slight variation in height and color. ` +
      `Warm amber glow, deep shadows on the flanking shelves.`,
  },
  {
    file: 'edition-02.jpg',
    name: 'The Desk',
    prompt:
      `${SHARED} The scene: overhead bird's-eye view looking straight down at ` +
      `a dark wooden writing desk. An open leather-bound book sits at ` +
      `center-left, a fountain pen rests across a half-written page. A small ` +
      `brass lamp casts a warm pool of light in the upper right corner. A ` +
      `folded linen cloth or small stack of cream paper sits nearby. ` +
      `Lived-in, not styled. Negative space around the objects.`,
  },
  {
    file: 'edition-03.jpg',
    name: 'The Window',
    prompt:
      `${SHARED} The scene: a tall arched Gothic or Georgian window in a ` +
      `study hall, photographed from inside. Late afternoon sun streams ` +
      `through the glass in visible beams with dust motes drifting in the ` +
      `light. A wooden sill holds two or three stacked cloth-bound books. ` +
      `The surrounding room falls into warm shadow. Wide, painterly, ` +
      `atmospheric.`,
  },
  {
    file: 'edition-04.jpg',
    name: 'The Hand',
    prompt:
      `${SHARED} The scene: a tight close-up crop of a single hand writing ` +
      `in a leather-bound notebook with a fountain pen. Hand and forearm ` +
      `only — no face, no identifying features, no wristwatch. Warm lamp ` +
      `light coming from one side. The notebook page shows handwriting but ` +
      `the text is soft and illegible. Razor focus on the pen nib meeting ` +
      `paper.`,
  },
]

const MODEL = 'fal-ai/flux-pro/v1.1'
const QUEUE = `https://queue.fal.run/${MODEL}`

async function postJson(url, key, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Key ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${url} -> ${res.status}: ${text}`)
  return JSON.parse(text)
}

async function getJson(url, key) {
  const res = await fetch(url, { headers: { Authorization: `Key ${key}` } })
  const text = await res.text()
  if (!res.ok) throw new Error(`${url} -> ${res.status}: ${text}`)
  return JSON.parse(text)
}

async function generate(key, { file, name, prompt }) {
  const stamp = () => new Date().toISOString().slice(11, 19)
  console.log(`\n[${stamp()}] ${file} (${name}): submitting…`)

  const submitted = await postJson(QUEUE, key, {
    prompt,
    image_size: { width: 1024, height: 1280 },
    num_inference_steps: 28,
    guidance_scale: 3.5,
    num_images: 1,
    output_format: 'jpeg',
    safety_tolerance: '2',
    enable_safety_checker: true,
  })

  const statusUrl = submitted.status_url
  const responseUrl = submitted.response_url
  if (!statusUrl || !responseUrl) {
    throw new Error(`Submit response missing status_url/response_url: ${JSON.stringify(submitted)}`)
  }
  console.log(`[${stamp()}] ${file}: queued as ${submitted.request_id}`)

  let attempt = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await new Promise((r) => setTimeout(r, 2500))
    attempt += 1
    const status = await getJson(statusUrl, key)
    if (attempt % 2 === 0) console.log(`[${stamp()}] ${file}: ${status.status}`)
    if (status.status === 'COMPLETED') break
    if (status.status === 'FAILED' || status.status === 'CANCELLED') {
      throw new Error(`${file}: ${status.status} — ${JSON.stringify(status)}`)
    }
    if (attempt > 120) throw new Error(`${file}: timeout after 5 min`)
  }

  const result = await getJson(responseUrl, key)
  const img = result.images?.[0]
  if (!img?.url) throw new Error(`${file}: no image url in result ${JSON.stringify(result)}`)
  console.log(`[${stamp()}] ${file}: downloading ${img.url}`)

  const imgRes = await fetch(img.url)
  if (!imgRes.ok) throw new Error(`${file}: download ${imgRes.status}`)
  const buf = Buffer.from(await imgRes.arrayBuffer())

  const outPath = path.join(outDir, file)
  await writeFile(outPath, buf)
  console.log(`[${stamp()}] ${file}: wrote ${buf.length.toLocaleString()} bytes -> ${outPath}`)
}

async function main() {
  const key = loadKey()
  await mkdir(outDir, { recursive: true })
  console.log(`Output directory: ${outDir}`)
  for (const scene of scenes) {
    await generate(key, scene)
  }
  console.log('\nAll four editions generated.')
}

main().catch((err) => {
  console.error('\nERROR:', err.message)
  process.exit(1)
})
