import { z } from 'zod'
import { CollocationSchema } from './collocation'
import { LexiconDayNumberSchema, LexiconWeekNumberSchema } from './lexicon-plan'
import { LinkingDeviceSchema } from './linking-device'
import { BandLevelSchema } from './practice'
import { VocabWordSchema } from './vocabulary'

/**
 * Curriculum metadata attached to every lexicon item — locks each item to a
 * (level, week, day) slot in the 12-week plan. Required because the same
 * vocabulary pool is partitioned by discipline AND scheduled by curriculum
 * position; the SRS scheduler reads from this slot when surfacing new items.
 */
export const LexiconCurriculumMetaSchema = z.object({
  level: BandLevelSchema,
  week: LexiconWeekNumberSchema,
  day: LexiconDayNumberSchema,
})
export type LexiconCurriculumMeta = z.infer<typeof LexiconCurriculumMetaSchema>

export const VocabularyLexiconItemSchema = VocabWordSchema.merge(
  LexiconCurriculumMetaSchema,
).extend({
  discipline: z.literal('vocabulary'),
})
export type VocabularyLexiconItem = z.infer<typeof VocabularyLexiconItemSchema>

export const CollocationLexiconItemSchema = CollocationSchema.merge(
  LexiconCurriculumMetaSchema,
).extend({
  discipline: z.literal('collocations'),
})
export type CollocationLexiconItem = z.infer<typeof CollocationLexiconItemSchema>

export const LinkingLexiconItemSchema = LinkingDeviceSchema.merge(
  LexiconCurriculumMetaSchema,
).extend({
  discipline: z.literal('linking'),
})
export type LinkingLexiconItem = z.infer<typeof LinkingLexiconItemSchema>

/**
 * Discriminated union — backend Mongoose uses the `discipline` discriminator
 * key on a single `lexicon_items` collection. Trade-off documented in plan
 * Decision #12: cross-discipline queries (today's queue) win over per-item
 * type safety in the Mongoose layer.
 */
export const LexiconItemSchema = z.discriminatedUnion('discipline', [
  VocabularyLexiconItemSchema,
  CollocationLexiconItemSchema,
  LinkingLexiconItemSchema,
])
export type LexiconItem = z.infer<typeof LexiconItemSchema>

export function isVocabularyItem(item: LexiconItem): item is VocabularyLexiconItem {
  return item.discipline === 'vocabulary'
}

export function isCollocationItem(item: LexiconItem): item is CollocationLexiconItem {
  return item.discipline === 'collocations'
}

export function isLinkingItem(item: LexiconItem): item is LinkingLexiconItem {
  return item.discipline === 'linking'
}
