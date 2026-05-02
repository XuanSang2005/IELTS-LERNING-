/**
 * One-shot backfill: tag all existing Intermediate lexicon_items with a
 * default frequencyTier. Per LEXICON-LEVEL-SPEC.md §9, K2 is the correct
 * default for ~80% of Intermediate vocabulary; manual spot-check after
 * deployment can adjust outliers (K3/K4/AWL).
 *
 * Idempotent — only updates docs missing the field.
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/backfill-frequency-tier.ts
 */
import 'dotenv/config'
import mongoose from 'mongoose'

const COLLECTION = 'lexicon_items'
const DEFAULT_TIER = 'K2'

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set in backend/.env')
    process.exit(1)
  }

  console.log(`Connecting to MongoDB…`)
  await mongoose.connect(uri)
  console.log(`Connected.`)

  const db = mongoose.connection.db
  if (!db) throw new Error('Mongoose connection has no db handle')
  const coll = db.collection(COLLECTION)

  // Vocab + collocations only — linking schema doesn't carry frequencyTier.
  const filter = {
    discipline: { $in: ['vocabulary', 'collocations'] },
    level: 'intermediate',
    $or: [{ frequencyTier: { $exists: false } }, { frequencyTier: null }, { frequencyTier: '' }],
  }

  const candidateCount = await coll.countDocuments(filter)
  console.log(`Candidates for backfill: ${candidateCount}`)

  if (candidateCount === 0) {
    console.log('Nothing to do.')
    await mongoose.disconnect()
    return
  }

  const result = await coll.updateMany(filter, {
    $set: { frequencyTier: DEFAULT_TIER },
  })

  console.log(
    `Backfilled ${result.modifiedCount} items with frequencyTier='${DEFAULT_TIER}'`,
  )

  // Spot-check sampler — print 5 random docs so the founder can eyeball quality.
  const samples = await coll
    .aggregate([
      { $match: { discipline: { $in: ['vocabulary', 'collocations'] }, level: 'intermediate' } },
      { $sample: { size: 5 } },
      { $project: { discipline: 1, headword: 1, phrase: 1, frequencyTier: 1 } },
    ])
    .toArray()
  console.log('\nSpot-check samples:')
  for (const s of samples) {
    const term = s.headword ?? s.phrase
    console.log(`  [${s.frequencyTier}] ${s.discipline}: ${term}`)
  }

  await mongoose.disconnect()
  console.log('\nDone.')
}

main().catch((err: unknown) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
