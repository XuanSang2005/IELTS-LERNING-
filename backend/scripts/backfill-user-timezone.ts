/**
 * One-shot backfill: set userTimezone='Asia/Ho_Chi_Minh' for all users where
 * the field is missing, empty, or still defaulted to 'UTC'. Vietnamese cohort
 * is the launch market; UTC was a temporary fallback that misaligns daily
 * SRS quota resets and progress derivation by 7 hours.
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/backfill-user-timezone.ts
 *
 * Idempotent — running twice is safe; second run reports 0 modified.
 */
import 'dotenv/config'
import mongoose from 'mongoose'

const TARGET_TIMEZONE = 'Asia/Ho_Chi_Minh'
const COLLECTION = 'users'

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

  const candidateFilter = {
    $or: [
      { userTimezone: { $exists: false } },
      { userTimezone: '' },
      { userTimezone: 'UTC' },
    ],
  }

  const candidateCount = await coll.countDocuments(candidateFilter)
  console.log(`Candidates for backfill: ${candidateCount}`)

  if (candidateCount === 0) {
    console.log('Nothing to do.')
    await mongoose.disconnect()
    return
  }

  const result = await coll.updateMany(candidateFilter, {
    $set: { userTimezone: TARGET_TIMEZONE },
  })

  console.log(`Backfilled ${result.modifiedCount} users with timezone '${TARGET_TIMEZONE}'`)
  await mongoose.disconnect()
  console.log('Done.')
}

main().catch((err: unknown) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
