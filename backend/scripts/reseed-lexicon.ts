/**
 * Standalone reseed of the lexicon collections — wipes lexicon_items and
 * lexicon_plans, then inserts every entry from the Intermediate seeds
 * (840 vocab + 588 collocations + 168 linking + 3 plans).
 *
 * Usage (from backend/):
 *   npx ts-node -r tsconfig-paths/register scripts/reseed-lexicon.ts
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { INTERMEDIATE_COLLOC_WEEK_01 } from '../src/lexicon/data/intermediate-colloc-week-01'
import { INTERMEDIATE_COLLOC_WEEK_02 } from '../src/lexicon/data/intermediate-colloc-week-02'
import { INTERMEDIATE_COLLOC_WEEK_03 } from '../src/lexicon/data/intermediate-colloc-week-03'
import { INTERMEDIATE_COLLOC_WEEK_04 } from '../src/lexicon/data/intermediate-colloc-week-04'
import { INTERMEDIATE_COLLOC_WEEK_05 } from '../src/lexicon/data/intermediate-colloc-week-05'
import { INTERMEDIATE_COLLOC_WEEK_06 } from '../src/lexicon/data/intermediate-colloc-week-06'
import { INTERMEDIATE_COLLOC_WEEK_07 } from '../src/lexicon/data/intermediate-colloc-week-07'
import { INTERMEDIATE_COLLOC_WEEK_08 } from '../src/lexicon/data/intermediate-colloc-week-08'
import { INTERMEDIATE_COLLOC_WEEK_09 } from '../src/lexicon/data/intermediate-colloc-week-09'
import { INTERMEDIATE_COLLOC_WEEK_10 } from '../src/lexicon/data/intermediate-colloc-week-10'
import { INTERMEDIATE_COLLOC_WEEK_11 } from '../src/lexicon/data/intermediate-colloc-week-11'
import { INTERMEDIATE_COLLOC_WEEK_12 } from '../src/lexicon/data/intermediate-colloc-week-12'
import { INTERMEDIATE_LINKING_WEEK_01 } from '../src/lexicon/data/intermediate-linking-week-01'
import { INTERMEDIATE_LINKING_WEEK_02 } from '../src/lexicon/data/intermediate-linking-week-02'
import { INTERMEDIATE_LINKING_WEEK_03 } from '../src/lexicon/data/intermediate-linking-week-03'
import { INTERMEDIATE_LINKING_WEEK_04 } from '../src/lexicon/data/intermediate-linking-week-04'
import { INTERMEDIATE_LINKING_WEEK_05 } from '../src/lexicon/data/intermediate-linking-week-05'
import { INTERMEDIATE_LINKING_WEEK_06 } from '../src/lexicon/data/intermediate-linking-week-06'
import { INTERMEDIATE_LINKING_WEEK_07 } from '../src/lexicon/data/intermediate-linking-week-07'
import { INTERMEDIATE_LINKING_WEEK_08 } from '../src/lexicon/data/intermediate-linking-week-08'
import { INTERMEDIATE_LINKING_WEEK_09 } from '../src/lexicon/data/intermediate-linking-week-09'
import { INTERMEDIATE_LINKING_WEEK_10 } from '../src/lexicon/data/intermediate-linking-week-10'
import { INTERMEDIATE_LINKING_WEEK_11 } from '../src/lexicon/data/intermediate-linking-week-11'
import { INTERMEDIATE_LINKING_WEEK_12 } from '../src/lexicon/data/intermediate-linking-week-12'
import { INTERMEDIATE_PLANS } from '../src/lexicon/data/intermediate-plans'
import { INTERMEDIATE_VOCAB_WEEK_01 } from '../src/lexicon/data/intermediate-vocab-week-01'
import { INTERMEDIATE_VOCAB_WEEK_02 } from '../src/lexicon/data/intermediate-vocab-week-02'
import { INTERMEDIATE_VOCAB_WEEK_03 } from '../src/lexicon/data/intermediate-vocab-week-03'
import { INTERMEDIATE_VOCAB_WEEK_04 } from '../src/lexicon/data/intermediate-vocab-week-04'
import { INTERMEDIATE_VOCAB_WEEK_05 } from '../src/lexicon/data/intermediate-vocab-week-05'
import { INTERMEDIATE_VOCAB_WEEK_06 } from '../src/lexicon/data/intermediate-vocab-week-06'
import { INTERMEDIATE_VOCAB_WEEK_07 } from '../src/lexicon/data/intermediate-vocab-week-07'
import { INTERMEDIATE_VOCAB_WEEK_08 } from '../src/lexicon/data/intermediate-vocab-week-08'
import { INTERMEDIATE_VOCAB_WEEK_09 } from '../src/lexicon/data/intermediate-vocab-week-09'
import { INTERMEDIATE_VOCAB_WEEK_10 } from '../src/lexicon/data/intermediate-vocab-week-10'
import { INTERMEDIATE_VOCAB_WEEK_11 } from '../src/lexicon/data/intermediate-vocab-week-11'
import { INTERMEDIATE_VOCAB_WEEK_12 } from '../src/lexicon/data/intermediate-vocab-week-12'

const ITEMS_COLLECTION = 'lexicon_items'
const PLANS_COLLECTION = 'lexicon_plans'

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

  const itemsColl = db.collection(ITEMS_COLLECTION)
  const plansColl = db.collection(PLANS_COLLECTION)

  const itemsBefore = await itemsColl.estimatedDocumentCount()
  const plansBefore = await plansColl.estimatedDocumentCount()
  console.log(`${ITEMS_COLLECTION}: ${itemsBefore} docs before reseed`)
  console.log(`${PLANS_COLLECTION}: ${plansBefore} docs before reseed`)

  await itemsColl.deleteMany({})
  await plansColl.deleteMany({})
  console.log(`Wiped both collections.`)

  // Plans
  const planDocs = INTERMEDIATE_PLANS.map((p) => ({
    ...p,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  await plansColl.insertMany(planDocs)
  console.log(`${PLANS_COLLECTION}: inserted ${planDocs.length} plans`)

  // Vocab items
  const vocab = [
    ...INTERMEDIATE_VOCAB_WEEK_01,
    ...INTERMEDIATE_VOCAB_WEEK_02,
    ...INTERMEDIATE_VOCAB_WEEK_03,
    ...INTERMEDIATE_VOCAB_WEEK_04,
    ...INTERMEDIATE_VOCAB_WEEK_05,
    ...INTERMEDIATE_VOCAB_WEEK_06,
    ...INTERMEDIATE_VOCAB_WEEK_07,
    ...INTERMEDIATE_VOCAB_WEEK_08,
    ...INTERMEDIATE_VOCAB_WEEK_09,
    ...INTERMEDIATE_VOCAB_WEEK_10,
    ...INTERMEDIATE_VOCAB_WEEK_11,
    ...INTERMEDIATE_VOCAB_WEEK_12,
  ]
  const colloc = [
    ...INTERMEDIATE_COLLOC_WEEK_01,
    ...INTERMEDIATE_COLLOC_WEEK_02,
    ...INTERMEDIATE_COLLOC_WEEK_03,
    ...INTERMEDIATE_COLLOC_WEEK_04,
    ...INTERMEDIATE_COLLOC_WEEK_05,
    ...INTERMEDIATE_COLLOC_WEEK_06,
    ...INTERMEDIATE_COLLOC_WEEK_07,
    ...INTERMEDIATE_COLLOC_WEEK_08,
    ...INTERMEDIATE_COLLOC_WEEK_09,
    ...INTERMEDIATE_COLLOC_WEEK_10,
    ...INTERMEDIATE_COLLOC_WEEK_11,
    ...INTERMEDIATE_COLLOC_WEEK_12,
  ]
  const linking = [
    ...INTERMEDIATE_LINKING_WEEK_01,
    ...INTERMEDIATE_LINKING_WEEK_02,
    ...INTERMEDIATE_LINKING_WEEK_03,
    ...INTERMEDIATE_LINKING_WEEK_04,
    ...INTERMEDIATE_LINKING_WEEK_05,
    ...INTERMEDIATE_LINKING_WEEK_06,
    ...INTERMEDIATE_LINKING_WEEK_07,
    ...INTERMEDIATE_LINKING_WEEK_08,
    ...INTERMEDIATE_LINKING_WEEK_09,
    ...INTERMEDIATE_LINKING_WEEK_10,
    ...INTERMEDIATE_LINKING_WEEK_11,
    ...INTERMEDIATE_LINKING_WEEK_12,
  ]

  const itemDocs = [
    ...vocab.map((it) => ({
      slug: it.id,
      discipline: it.discipline,
      level: it.level,
      week: it.week,
      day: it.day,
      headword: it.headword,
      partOfSpeech: it.partOfSpeech,
      definition: it.definition,
      example: it.example,
      register: it.register,
      topic: it.topic,
      frequency: it.frequency,
      synonyms: it.synonyms,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    ...colloc.map((it) => ({
      slug: it.id,
      discipline: it.discipline,
      level: it.level,
      week: it.week,
      day: it.day,
      phrase: it.phrase,
      pattern: it.pattern,
      definition: it.definition,
      example: it.example,
      register: it.register,
      topic: it.topic,
      alternatives: it.alternatives,
      note: it.note,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    ...linking.map((it) => ({
      slug: it.id,
      discipline: it.discipline,
      level: it.level,
      week: it.week,
      day: it.day,
      phrase: it.phrase,
      function: it.function,
      register: it.register,
      positions: it.positions,
      example: it.example,
      note: it.note,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ]

  const result = await itemsColl.insertMany(itemDocs)
  console.log(
    `${ITEMS_COLLECTION}: inserted ${result.insertedCount} items ` +
      `(${vocab.length} vocab + ${colloc.length} collocations + ${linking.length} linking)`,
  )

  await mongoose.disconnect()
  console.log(`done.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
