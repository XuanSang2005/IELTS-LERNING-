/**
 * Standalone reseed of grammar_lessons — wipes the collection and inserts
 * every entry in LESSON_SEED. Intended for local dev after schema or content
 * changes.
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/reseed-lessons.ts
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { LESSON_SEED } from '../src/lessons/data/lesson-seed'

const COLLECTION = 'grammar_lessons'

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set in backend/.env')
    process.exit(1)
  }

  const grammarSeed = LESSON_SEED.filter((l) => l.discipline === 'grammar')
  console.log(`Connecting to MongoDB…`)
  await mongoose.connect(uri)
  console.log(`Connected.`)

  const db = mongoose.connection.db
  if (!db) throw new Error('Mongoose connection has no db handle')
  const coll = db.collection(COLLECTION)

  const before = await coll.estimatedDocumentCount()
  console.log(`${COLLECTION}: ${before} documents before reseed`)

  await coll.deleteMany({})
  console.log(`${COLLECTION}: wiped`)

  const docs = grammarSeed.map((l) => ({
    ...l,
    slug: l.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await coll.insertMany(docs)
  console.log(`${COLLECTION}: inserted ${result.insertedCount} lessons`)

  const byLevel: Record<string, number> = {}
  for (const l of grammarSeed) byLevel[l.level] = (byLevel[l.level] ?? 0) + 1
  console.log(`breakdown by level:`, byLevel)

  await mongoose.disconnect()
  console.log(`done.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
