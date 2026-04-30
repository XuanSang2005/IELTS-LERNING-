import { Schema } from 'mongoose'
import type { HydratedDocument } from 'mongoose'
import type {
  CollocationLexiconItem,
  LinkingLexiconItem,
  VocabularyLexiconItem,
} from '@shared/schemas/lexicon-items'

/**
 * Mongoose discriminator pattern (plan Decision #12).
 *
 * One physical collection `lexicon_items` with `discipline` as the
 * discriminator key. Three sub-schemas hold the discipline-specific shape.
 * Cross-discipline queries (today's queue) hit one collection; per-discipline
 * queries filter by `discipline`.
 */

const SynonymSubSchema = new Schema(
  {
    word: { type: String, required: true },
    register: { type: String, enum: ['B1', 'B2', 'C1'], required: true },
    nuance: { type: String },
  },
  { _id: false },
)

/** Base shape — contains only the curriculum-meta fields shared across disciplines. */
export const LexiconItemBaseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    discipline: {
      type: String,
      enum: ['vocabulary', 'collocations', 'linking'],
      required: true,
      index: true,
    },
    level: {
      type: String,
      enum: ['foundation', 'intermediate', 'advanced', 'mastery'],
      required: true,
      index: true,
    },
    week: { type: Number, required: true, min: 1, max: 12, index: true },
    day: { type: Number, required: true, min: 1, max: 7, index: true },
  },
  {
    timestamps: true,
    collection: 'lexicon_items',
    discriminatorKey: 'discipline',
  },
)

LexiconItemBaseSchema.index({ discipline: 1, level: 1, week: 1, day: 1 })

/** Vocabulary item — extends VocabWord shape. */
export const VocabularyItemSubSchema = new Schema(
  {
    headword: { type: String, required: true, index: true },
    partOfSpeech: {
      type: String,
      enum: ['noun', 'verb', 'adjective', 'adverb', 'phrase'],
      required: true,
    },
    definition: { type: String, required: true },
    example: { type: String, required: true },
    register: { type: String, enum: ['B1', 'B2', 'C1'], required: true },
    topic: { type: String },
    frequency: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'high',
      required: true,
    },
    synonyms: { type: [SynonymSubSchema], required: true },
  },
  { _id: false, discriminatorKey: 'discipline' },
)

/** Collocation item — extends CollocationSchema shape. */
export const CollocationItemSubSchema = new Schema(
  {
    phrase: { type: String, required: true, index: true },
    pattern: {
      type: String,
      enum: [
        'verb-noun',
        'adjective-noun',
        'noun-noun',
        'verb-preposition',
        'adjective-preposition',
        'adverb-adjective',
        'verb-adverb',
        'verb',
      ],
      required: true,
    },
    definition: { type: String, required: true },
    example: { type: String, required: true },
    register: { type: String, enum: ['B1', 'B2', 'C1'], required: true },
    topic: { type: String },
    alternatives: { type: [String], default: [] },
    note: { type: String },
  },
  { _id: false, discriminatorKey: 'discipline' },
)

/** Linking item — extends LinkingDeviceSchema shape. */
export const LinkingItemSubSchema = new Schema(
  {
    phrase: { type: String, required: true, index: true },
    function: {
      type: String,
      enum: [
        'addition',
        'contrast',
        'cause',
        'effect',
        'concession',
        'exemplification',
        'sequence',
        'summary',
      ],
      required: true,
    },
    register: { type: String, enum: ['B1', 'B2', 'C1'], required: true },
    positions: {
      type: [String],
      enum: ['initial', 'medial', 'final'],
      required: true,
    },
    example: { type: String, required: true },
    note: { type: String },
  },
  { _id: false, discriminatorKey: 'discipline' },
)

export interface LexiconItemBaseDoc {
  slug: string
  discipline: 'vocabulary' | 'collocations' | 'linking'
  level: 'foundation' | 'intermediate' | 'advanced' | 'mastery'
  week: number
  day: number
}

export type LexiconItemDocument = HydratedDocument<LexiconItemBaseDoc>

export const LEXICON_ITEM_MODEL_NAME = 'LexiconItem'
export const LEXICON_ITEM_DISCRIMINATORS = {
  vocabulary: 'vocabulary',
  collocations: 'collocations',
  linking: 'linking',
} as const

/**
 * Helpers to convert raw Mongo plain objects (from `.lean()`) back to the
 * shared discriminated-union shape. Caller is expected to have filtered by
 * the discipline discriminator already.
 */
export interface RawLexiconDoc {
  slug: string
  discipline: 'vocabulary' | 'collocations' | 'linking'
  level: 'foundation' | 'intermediate' | 'advanced' | 'mastery'
  week: number
  day: number
  [field: string]: unknown
}

export function docToVocabularyItem(doc: RawLexiconDoc): VocabularyLexiconItem {
  return {
    discipline: 'vocabulary',
    id: doc.slug,
    headword: doc.headword as string,
    partOfSpeech: doc.partOfSpeech as VocabularyLexiconItem['partOfSpeech'],
    definition: doc.definition as string,
    example: doc.example as string,
    register: doc.register as VocabularyLexiconItem['register'],
    topic: doc.topic as string | undefined,
    frequency: doc.frequency as VocabularyLexiconItem['frequency'],
    synonyms: doc.synonyms as VocabularyLexiconItem['synonyms'],
    level: doc.level,
    week: doc.week as VocabularyLexiconItem['week'],
    day: doc.day as VocabularyLexiconItem['day'],
  }
}

export function docToCollocationItem(doc: RawLexiconDoc): CollocationLexiconItem {
  return {
    discipline: 'collocations',
    id: doc.slug,
    phrase: doc.phrase as string,
    pattern: doc.pattern as CollocationLexiconItem['pattern'],
    definition: doc.definition as string,
    example: doc.example as string,
    register: doc.register as CollocationLexiconItem['register'],
    topic: doc.topic as string | undefined,
    alternatives: (doc.alternatives as string[]) ?? [],
    note: doc.note as string | undefined,
    level: doc.level,
    week: doc.week as CollocationLexiconItem['week'],
    day: doc.day as CollocationLexiconItem['day'],
  }
}

export function docToLinkingItem(doc: RawLexiconDoc): LinkingLexiconItem {
  return {
    discipline: 'linking',
    id: doc.slug,
    phrase: doc.phrase as string,
    function: doc.function as LinkingLexiconItem['function'],
    register: doc.register as LinkingLexiconItem['register'],
    positions: doc.positions as LinkingLexiconItem['positions'],
    example: doc.example as string,
    note: doc.note as string | undefined,
    level: doc.level,
    week: doc.week as LinkingLexiconItem['week'],
    day: doc.day as LinkingLexiconItem['day'],
  }
}
