/**
 * Read-only audit. Reports current linking items grouped by `function` and
 * `register` per level — confirms every function has ≥14 items before we
 * re-bucket linking weeks by function.
 */
import 'dotenv/config'
import mongoose from 'mongoose'

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set')
    process.exit(1)
  }
  await mongoose.connect(uri)
  const db = mongoose.connection.db
  if (!db) throw new Error('No db handle')

  const items = db.collection('lexicon_items')

  const FUNCTIONS = [
    'addition',
    'contrast',
    'cause',
    'effect',
    'concession',
    'exemplification',
    'sequence',
    'summary',
  ]

  for (const level of ['foundation', 'intermediate', 'advanced', 'mastery']) {
    console.log(`\n========= ${level} =========`)

    const total = await items.countDocuments({ discipline: 'linking', level })
    console.log(`total: ${total}`)

    console.log('by function:')
    for (const fn of FUNCTIONS) {
      const n = await items.countDocuments({ discipline: 'linking', level, function: fn })
      const enough = n >= 14 ? '✓' : '⚠ short'
      console.log(`  ${fn.padEnd(16)} ${String(n).padStart(3)}  ${enough}`)
    }

    console.log('by register:')
    for (const reg of ['B1', 'B2', 'C1']) {
      const n = await items.countDocuments({ discipline: 'linking', level, register: reg })
      console.log(`  ${reg}  ${n}`)
    }
  }

  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
