import {
  isVocabularyItem,
  type LexiconItem,
  type VocabularyLexiconItem,
} from '@shared/schemas/lexicon-items'
import { pickN, shuffle } from './shuffle'

export type PracticeExerciseType =
  | 'definition-to-word'
  | 'word-to-definition'
  | 'gap-fill'
  | 'word-to-synonym'

export interface PracticeOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface PracticeExercise {
  id: string
  type: PracticeExerciseType
  /** The item the question is testing — used to mark progress on submit. */
  itemId: string
  /** Question prompt rendered above the options. */
  prompt: string
  /** Optional sub-prompt rendered as a quote (e.g. the masked sentence). */
  context?: string
  options: PracticeOption[]
}

const N_DISTRACTORS = 3

/**
 * Builds 8 exercises for a single day's practice session — 2 per type for
 * vocabulary. For collocations and linking the builder returns an empty list
 * (the disciplines need bespoke exercise types that ship in a later wave;
 * the Practice tab renders a stub when no exercises are available).
 */
export function buildPracticeExercises(items: LexiconItem[]): PracticeExercise[] {
  const vocab = items.filter(isVocabularyItem)
  if (vocab.length < 4) return []

  const sampled = shuffle(vocab).slice(0, 8)
  const exercises: PracticeExercise[] = []

  sampled.forEach((target, idx) => {
    const type = TYPE_ROTATION[idx % TYPE_ROTATION.length]
    const exercise = buildOne(target, vocab, type)
    if (exercise) exercises.push(exercise)
  })

  return exercises
}

const TYPE_ROTATION: PracticeExerciseType[] = [
  'definition-to-word',
  'word-to-synonym',
  'gap-fill',
  'word-to-definition',
  'definition-to-word',
  'word-to-synonym',
  'gap-fill',
  'word-to-definition',
]

function buildOne(
  target: VocabularyLexiconItem,
  pool: VocabularyLexiconItem[],
  type: PracticeExerciseType,
): PracticeExercise | null {
  const exclude = new Set([target.id])
  const distractorPool = pool.filter(
    (it) => it.partOfSpeech === target.partOfSpeech || pool.length < 8,
  )
  const distractors = pickN(distractorPool, N_DISTRACTORS, exclude)
  if (distractors.length < N_DISTRACTORS) return null

  switch (type) {
    case 'definition-to-word':
      return {
        id: `${target.id}-def2word`,
        type,
        itemId: target.id,
        prompt: 'Choose the word that best matches this definition.',
        context: target.definition,
        options: shuffle([
          { id: target.id, text: target.headword, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.headword, isCorrect: false })),
        ]),
      }

    case 'word-to-definition':
      return {
        id: `${target.id}-word2def`,
        type,
        itemId: target.id,
        prompt: `Which definition matches "${target.headword}"?`,
        options: shuffle([
          { id: target.id, text: target.definition, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.definition, isCorrect: false })),
        ]),
      }

    case 'gap-fill': {
      const masked = maskWord(target.example, target.headword)
      return {
        id: `${target.id}-gap`,
        type,
        itemId: target.id,
        prompt: 'Choose the word that completes the sentence.',
        context: masked,
        options: shuffle([
          { id: target.id, text: target.headword, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.headword, isCorrect: false })),
        ]),
      }
    }

    case 'word-to-synonym': {
      const synonyms = target.synonyms.map((s) => s.word)
      if (synonyms.length === 0) return buildOne(target, pool, 'word-to-definition')
      const correctSyn = synonyms[0]!
      const synDistractors = pickN(
        pool.filter((it) => it.id !== target.id && it.synonyms.length > 0),
        N_DISTRACTORS,
        exclude,
      ).map((d) => d.synonyms[0]!.word)
      if (synDistractors.length < N_DISTRACTORS) return null
      return {
        id: `${target.id}-syn`,
        type,
        itemId: target.id,
        prompt: `Closest synonym for "${target.headword}":`,
        options: shuffle([
          { id: `${target.id}-correct`, text: correctSyn, isCorrect: true },
          ...synDistractors.map((s, i) => ({
            id: `${target.id}-d-${i}`,
            text: s,
            isCorrect: false,
          })),
        ]),
      }
    }

    default:
      return null
  }
}

/** Replaces the headword (case-insensitive) in the sentence with a blank. */
function maskWord(sentence: string, headword: string): string {
  const escaped = headword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`\\b${escaped}\\w*\\b`, 'i')
  return sentence.replace(re, '_____')
}
