/**
 * Re-tags `lexicon_items` linking docs by `function` so each function lives
 * in a dedicated week (1-8). Spillover items (when a function has >14
 * items at a level) flow into wk 9-12 consolidation slots.
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/restructure-linking.ts --dry-run
 *   npx ts-node -r tsconfig-paths/register scripts/restructure-linking.ts
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { FUNCTION_TO_WEEK } from '../src/lexicon/data/linking-plan-seed'

const ITEMS_PER_DAY = 2
const ITEMS_PER_WEEK = 14
const FUNCTION_ORDER = [
  'addition',
  'contrast',
  'cause',
  'effect',
  'concession',
  'exemplification',
  'sequence',
  'summary',
] as const
const CONSOLIDATION_WEEKS = [9, 10, 11, 12] as const
const LEVELS = ['foundation', 'intermediate', 'advanced', 'mastery'] as const

interface ItemDoc {
  _id: mongoose.Types.ObjectId
  slug: string
  level: string
  week: number
  day: number
  function: string
  register?: string
  phrase?: string
}

function dayFor(indexZeroBased: number): number {
  // 14 items / 7 days = 2/day. Item 0,1 → day 1; item 2,3 → day 2; …
  return Math.floor(indexZeroBased / ITEMS_PER_DAY) + 1
}

function chooseConsolidationWeek(item: ItemDoc, fillCounts: Record<number, number>): number {
  // Wk 10 = academic register (prefer C1).
  // Wk 11 = speaking markers (prefer short phrase as proxy for informal).
  // Wk 9, 12 = mixed.
  const isC1 = item.register === 'C1'
  const phraseLen = (item.phrase ?? '').split(/\s+/).length
  const isShort = phraseLen <= 1

  const candidates: number[] = []
  if (isC1 && fillCounts[10]! < ITEMS_PER_WEEK) candidates.push(10)
  if (isShort && fillCounts[11]! < ITEMS_PER_WEEK) candidates.push(11)
  // Default fillers in priority order.
  for (const w of [9, 12, 11, 10] as const) {
    if (fillCounts[w]! < ITEMS_PER_WEEK && !candidates.includes(w)) candidates.push(w)
  }
  if (candidates.length === 0) {
    // All consolidation weeks full — overflow into wk 12 (examiner's drill is the catch-all).
    return 12
  }
  return candidates[0]!
}

interface PlannedUpdate {
  _id: mongoose.Types.ObjectId
  slug: string
  oldWeek: number
  oldDay: number
  newWeek: number
  newDay: number
  function: string
}

async function planLevel(
  items: ItemDoc[],
  level: string,
): Promise<{ updates: PlannedUpdate[]; weekFill: Record<number, number> }> {
  const byFn = new Map<string, ItemDoc[]>()
  for (const fn of FUNCTION_ORDER) byFn.set(fn, [])
  for (const it of items) {
    if (byFn.has(it.function)) byFn.get(it.function)!.push(it)
  }
  // Stable sort by slug so re-runs are idempotent.
  for (const list of byFn.values()) list.sort((a, b) => a.slug.localeCompare(b.slug))

  const updates: PlannedUpdate[] = []
  const weekFill: Record<number, number> = {}
  for (let w = 1; w <= 12; w++) weekFill[w] = 0

  // Wks 1-8: take up to 14 from each function in canonical order.
  const overflow: ItemDoc[] = []
  for (const fn of FUNCTION_ORDER) {
    const list = byFn.get(fn) ?? []
    const targetWeek = FUNCTION_TO_WEEK[fn]
    const dedicated = list.slice(0, ITEMS_PER_WEEK)
    const rest = list.slice(ITEMS_PER_WEEK)
    dedicated.forEach((item, idx) => {
      const newDay = dayFor(idx)
      if (item.week !== targetWeek || item.day !== newDay) {
        updates.push({
          _id: item._id,
          slug: item.slug,
          oldWeek: item.week,
          oldDay: item.day,
          newWeek: targetWeek,
          newDay,
          function: item.function,
        })
      }
      weekFill[targetWeek]!++
    })
    overflow.push(...rest)
  }

  // Wks 9-12: distribute overflow with priority (C1 → wk 10, short → wk 11).
  // Sort overflow stably for idempotency.
  overflow.sort((a, b) => a.slug.localeCompare(b.slug))
  // Track per-week index to compute day.
  const perWeekIndex: Record<number, number> = { 9: 0, 10: 0, 11: 0, 12: 0 }
  for (const item of overflow) {
    const week = chooseConsolidationWeek(item, weekFill)
    const idx = perWeekIndex[week]!
    perWeekIndex[week] = idx + 1
    const newDay = Math.min(7, dayFor(idx))
    if (item.week !== week || item.day !== newDay) {
      updates.push({
        _id: item._id,
        slug: item.slug,
        oldWeek: item.week,
        oldDay: item.day,
        newWeek: week,
        newDay,
        function: item.function,
      })
    }
    weekFill[week]!++
  }

  console.log(`\n  ${level} fill per week:`)
  for (let w = 1; w <= 12; w++) {
    const cap = w <= 8 ? FUNCTION_ORDER[w - 1] : 'consolidation'
    const flag = weekFill[w]! < ITEMS_PER_WEEK ? '⚠ short' : weekFill[w]! > ITEMS_PER_WEEK ? '+overflow' : '✓'
    console.log(`    wk${String(w).padStart(2, ' ')} (${cap.padEnd(15)}) → ${weekFill[w]} items  ${flag}`)
  }

  return { updates, weekFill }
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes('--dry-run')
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set')
    process.exit(1)
  }

  await mongoose.connect(uri)
  const db = mongoose.connection.db
  if (!db) throw new Error('No db handle')

  const items = db.collection('lexicon_items')

  let totalUpdates = 0
  for (const level of LEVELS) {
    console.log(`\n========= ${level} =========`)
    const docs = (await items
      .find({ discipline: 'linking', level })
      .toArray()) as unknown as ItemDoc[]
    console.log(`fetched ${docs.length} items`)

    const { updates } = await planLevel(docs, level)
    console.log(`  → ${updates.length} (week, day) changes`)
    totalUpdates += updates.length

    if (!dryRun && updates.length > 0) {
      // Bulk update.
      const ops = updates.map((u) => ({
        updateOne: {
          filter: { _id: u._id },
          update: { $set: { week: u.newWeek, day: u.newDay } },
        },
      }))
      const res = await items.bulkWrite(ops)
      console.log(`  applied: matched=${res.matchedCount} modified=${res.modifiedCount}`)
    }
  }

  console.log(`\nTotal planned updates: ${totalUpdates}`)
  if (dryRun) console.log('Dry run — no writes made. Re-run without --dry-run to apply.')

  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
