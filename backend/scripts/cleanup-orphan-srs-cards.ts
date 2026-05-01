/**
 * Removes srs_cards rows whose `itemId` no longer exists in `lexicon_items`.
 * Safe to run repeatedly. The today-queue service already filters orphans on
 * read, but persistent orphans bloat retention metrics and `findEarliest-
 * IntroducedAt` results — clear them periodically.
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/cleanup-orphan-srs-cards.ts
 */
import 'dotenv/config'
import mongoose from 'mongoose'

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

  const cards = db.collection('srs_cards')
  const items = db.collection('lexicon_items')

  // Build the live item ID set. Slug is the canonical id field.
  const liveSlugs = (await items.distinct('slug')) as string[]
  console.log(`Live lexicon_items: ${liveSlugs.length}`)

  const orphanCount = await cards.countDocuments({ itemId: { $nin: liveSlugs } })
  console.log(`Orphan srs_cards: ${orphanCount}`)

  if (orphanCount === 0) {
    console.log('Nothing to clean.')
    await mongoose.disconnect()
    return
  }

  const result = await cards.deleteMany({ itemId: { $nin: liveSlugs } })
  console.log(`Deleted ${result.deletedCount} orphan srs_cards`)

  await mongoose.disconnect()
  console.log('Done.')
}

main().catch((err: unknown) => {
  console.error('Cleanup failed:', err)
  process.exit(1)
})
