/**
 * Replaces the four linking entries in `lexicon_plans` with the new
 * function-based 12-week plan. Vocabulary and collocations plans are left
 * untouched.
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/reseed-linking-plans.ts
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { LINKING_PLAN_SEED } from '../src/lexicon/data/linking-plan-seed'

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set')
    process.exit(1)
  }
  await mongoose.connect(uri)
  const db = mongoose.connection.db
  if (!db) throw new Error('No db handle')

  const plans = db.collection('lexicon_plans')

  const existing = await plans.countDocuments({ discipline: 'linking' })
  console.log(`existing linking plans: ${existing}`)

  const del = await plans.deleteMany({ discipline: 'linking' })
  console.log(`deleted: ${del.deletedCount}`)

  const docs = LINKING_PLAN_SEED.map((p) => ({
    discipline: p.discipline,
    level: p.level,
    weeks: p.weeks.map((w) => ({
      ...w,
      discipline: p.discipline,
      level: p.level,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const ins = await plans.insertMany(docs)
  console.log(`inserted: ${ins.insertedCount}`)

  // Sanity print
  for (const level of ['foundation', 'intermediate', 'advanced', 'mastery']) {
    const doc = await plans.findOne({ discipline: 'linking', level })
    if (doc?.weeks) {
      console.log(`\n${level}:`)
      for (const w of doc.weeks as Array<{ week: number; themeName: string }>) {
        console.log(`  wk${String(w.week).padStart(2, ' ')}  ${w.themeName}`)
      }
    }
  }

  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
