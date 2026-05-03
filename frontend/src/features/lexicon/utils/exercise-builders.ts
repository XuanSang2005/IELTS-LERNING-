import {
  isCollocationItem,
  isLinkingItem,
  isVocabularyItem,
  type CollocationLexiconItem,
  type LexiconItem,
  type LinkingLexiconItem,
  type VocabularyLexiconItem,
} from '@shared/schemas/lexicon-items'
import type { LinkingFunction } from '@shared/schemas/linking-device'
import { pickN, shuffle } from './shuffle'

export type PracticeExerciseType =
  // Vocabulary
  | 'definition-to-word'
  | 'word-to-definition'
  | 'gap-fill'
  | 'word-to-synonym'
  // Collocations
  | 'colloc-phrase-to-def'
  | 'colloc-def-to-phrase'
  | 'colloc-gap-fill'
  | 'colloc-phrase-to-example'
  // Linking
  | 'linking-phrase-to-function'
  | 'linking-function-to-phrase'
  | 'linking-gap-fill'

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
const TARGET_EXERCISES_PER_DAY = 8

/**
 * Top-level dispatch. Detects discipline of the items passed in and routes
 * to the correct builder. Returns up to ~8 exercises.
 *
 * Vocabulary uses 4 question types (definition-to-word, word-to-definition,
 * gap-fill, word-to-synonym). Collocations use 4 (phrase-to-def,
 * def-to-phrase, gap-fill, phrase-to-example). Linking uses 3
 * (phrase-to-function, function-to-phrase, gap-fill).
 *
 * `distractorPool` lets the caller widen the pool used for wrong answers
 * without changing what counts as a "target". Necessary for linking, which
 * has only 2 items per day — the caller passes that day's items as targets
 * and the full week's 14 items as the distractor pool, so the builder can
 * produce questions that need ≥4 distinct phrases.
 *
 * Distractors prefer same-category siblings (POS for vocab, pattern for
 * collocations, function for linking) and fall back to the full pool when
 * the day's slice is too thin to match.
 */
export function buildPracticeExercises(
  items: LexiconItem[],
  distractorPool: LexiconItem[] = items,
): PracticeExercise[] {
  if (items.length === 0) return []
  const first = items[0]!
  if (isVocabularyItem(first)) {
    return buildVocabExercises(
      items.filter(isVocabularyItem),
      distractorPool.filter(isVocabularyItem),
    )
  }
  if (isCollocationItem(first)) {
    return buildCollocExercises(
      items.filter(isCollocationItem),
      distractorPool.filter(isCollocationItem),
    )
  }
  if (isLinkingItem(first)) {
    return buildLinkingExercises(
      items.filter(isLinkingItem),
      distractorPool.filter(isLinkingItem),
    )
  }
  return []
}

// ────────────────────────────────────────────────────────────────────────────
// Vocabulary
// ────────────────────────────────────────────────────────────────────────────

function buildVocabExercises(
  vocab: VocabularyLexiconItem[],
  pool: VocabularyLexiconItem[],
): PracticeExercise[] {
  if (vocab.length < 1 || pool.length < 4) return []
  const sampled = shuffle(vocab).slice(0, TARGET_EXERCISES_PER_DAY)
  const exercises: PracticeExercise[] = []
  sampled.forEach((target, idx) => {
    const type = VOCAB_ROTATION[idx % VOCAB_ROTATION.length]
    const exercise = buildVocabOne(target, pool, type)
    if (exercise) exercises.push(exercise)
  })
  return exercises
}

const VOCAB_ROTATION: PracticeExerciseType[] = [
  'definition-to-word',
  'word-to-synonym',
  'gap-fill',
  'word-to-definition',
  'definition-to-word',
  'word-to-synonym',
  'gap-fill',
  'word-to-definition',
]

function buildVocabOne(
  target: VocabularyLexiconItem,
  pool: VocabularyLexiconItem[],
  type: PracticeExerciseType,
): PracticeExercise | null {
  const exclude = new Set([target.id])
  const samePos = pool.filter(
    (it) => it.partOfSpeech === target.partOfSpeech && it.id !== target.id,
  )
  const distractorPool = samePos.length >= N_DISTRACTORS ? samePos : pool
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
      if (synonyms.length === 0) return buildVocabOne(target, pool, 'word-to-definition')
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

// ────────────────────────────────────────────────────────────────────────────
// Collocations
// ────────────────────────────────────────────────────────────────────────────

function buildCollocExercises(
  coll: CollocationLexiconItem[],
  pool: CollocationLexiconItem[],
): PracticeExercise[] {
  if (coll.length < 1 || pool.length < 4) return []
  const sampled = shuffle(coll).slice(0, TARGET_EXERCISES_PER_DAY)
  const exercises: PracticeExercise[] = []
  sampled.forEach((target, idx) => {
    const type = COLLOC_ROTATION[idx % COLLOC_ROTATION.length]
    const exercise = buildCollocOne(target, pool, type)
    if (exercise) exercises.push(exercise)
  })
  return exercises
}

const COLLOC_ROTATION: PracticeExerciseType[] = [
  'colloc-phrase-to-def',
  'colloc-gap-fill',
  'colloc-def-to-phrase',
  'colloc-phrase-to-example',
  'colloc-phrase-to-def',
  'colloc-gap-fill',
  'colloc-def-to-phrase',
  'colloc-phrase-to-example',
]

function buildCollocOne(
  target: CollocationLexiconItem,
  pool: CollocationLexiconItem[],
  type: PracticeExerciseType,
): PracticeExercise | null {
  const exclude = new Set([target.id])
  // Prefer same-pattern distractors so the wrong choices are structurally
  // similar (e.g. all verb-noun); fall back when the day's pool is thin.
  const samePattern = pool.filter(
    (it) => it.pattern === target.pattern && it.id !== target.id,
  )
  const distractorPool = samePattern.length >= N_DISTRACTORS ? samePattern : pool
  const distractors = pickN(distractorPool, N_DISTRACTORS, exclude)
  if (distractors.length < N_DISTRACTORS) return null

  switch (type) {
    case 'colloc-phrase-to-def':
      return {
        id: `${target.id}-phrase2def`,
        type,
        itemId: target.id,
        prompt: `Which definition matches "${target.phrase}"?`,
        options: shuffle([
          { id: target.id, text: target.definition, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.definition, isCorrect: false })),
        ]),
      }
    case 'colloc-def-to-phrase':
      return {
        id: `${target.id}-def2phrase`,
        type,
        itemId: target.id,
        prompt: 'Choose the collocation that matches this definition.',
        context: target.definition,
        options: shuffle([
          { id: target.id, text: target.phrase, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.phrase, isCorrect: false })),
        ]),
      }
    case 'colloc-gap-fill': {
      const masked = maskWord(target.example, target.phrase)
      // Skip if the phrase didn't actually appear in the example (rare seed
      // mismatch) — would render an unsolvable question.
      if (masked === target.example) return null
      return {
        id: `${target.id}-gap`,
        type,
        itemId: target.id,
        prompt: 'Choose the collocation that completes the sentence.',
        context: masked,
        options: shuffle([
          { id: target.id, text: target.phrase, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.phrase, isCorrect: false })),
        ]),
      }
    }
    case 'colloc-phrase-to-example':
      return {
        id: `${target.id}-phrase2ex`,
        type,
        itemId: target.id,
        prompt: `In which sentence is "${target.phrase}" used naturally?`,
        options: shuffle([
          { id: target.id, text: target.example, isCorrect: true },
          ...distractors.map((d) => ({ id: d.id, text: d.example, isCorrect: false })),
        ]),
      }
    default:
      return null
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Linking devices
// ────────────────────────────────────────────────────────────────────────────

const ALL_FUNCTIONS: LinkingFunction[] = [
  'addition',
  'contrast',
  'cause',
  'effect',
  'concession',
  'exemplification',
  'sequence',
  'summary',
]

const FUNCTION_LABEL: Record<LinkingFunction, string> = {
  addition: 'Addition',
  contrast: 'Contrast',
  cause: 'Cause',
  effect: 'Effect',
  concession: 'Concession',
  exemplification: 'Exemplification',
  sequence: 'Sequence',
  summary: 'Summary',
}

function buildLinkingExercises(
  targets: LinkingLexiconItem[],
  pool: LinkingLexiconItem[],
): PracticeExercise[] {
  if (targets.length < 1) return []
  // Targets are the day's items (usually 2). The pool widens to the week so
  // we have ≥4 distinct phrases for distractor-heavy types like
  // function-to-phrase and gap-fill. phrase-to-function works regardless —
  // its distractors come from the 8-value function enum.
  //
  // After the function-based curriculum migration, weeks 1-8 each contain a
  // single function. On those weeks the pool is mono-function, so
  // `function-to-phrase` ("which linker signals contrast?") collapses into
  // a trivial question — every option in the day pool is the right answer.
  // We skip it when we detect a single-function pool.
  const poolFunctions = new Set(pool.map((p) => p.function))
  const isMonoFunctionPool = poolFunctions.size <= 1

  const sampled = shuffle(targets)
  const exercises: PracticeExercise[] = []

  for (const target of sampled) {
    const phraseToFn = buildLinkingPhraseToFunction(target)
    if (phraseToFn) exercises.push(phraseToFn)

    if (!isMonoFunctionPool) {
      const fnToPhrase = buildLinkingFunctionToPhrase(target, pool)
      if (fnToPhrase) exercises.push(fnToPhrase)
    }

    const gap = buildLinkingGapFill(target, pool)
    if (gap) exercises.push(gap)

    if (exercises.length >= TARGET_EXERCISES_PER_DAY) break
  }
  return exercises
}

function buildLinkingPhraseToFunction(
  target: LinkingLexiconItem,
): PracticeExercise | null {
  const otherFns = ALL_FUNCTIONS.filter((f) => f !== target.function)
  const distractorFns = pickN(
    otherFns.map((f) => ({ id: f })),
    N_DISTRACTORS,
    new Set<string>(),
  )
  if (distractorFns.length < N_DISTRACTORS) return null
  return {
    id: `${target.id}-phrase2fn`,
    type: 'linking-phrase-to-function',
    itemId: target.id,
    prompt: `What is the discourse function of "${target.phrase}"?`,
    options: shuffle([
      {
        id: `${target.id}-${target.function}`,
        text: FUNCTION_LABEL[target.function],
        isCorrect: true,
      },
      ...distractorFns.map((d) => ({
        id: `${target.id}-${d.id}`,
        text: FUNCTION_LABEL[d.id as LinkingFunction],
        isCorrect: false,
      })),
    ]),
  }
}

function buildLinkingFunctionToPhrase(
  target: LinkingLexiconItem,
  pool: LinkingLexiconItem[],
): PracticeExercise | null {
  // Prefer distractors with a DIFFERENT function so the wrong answers are
  // unambiguously wrong. Fall back to anything else from the pool.
  const exclude = new Set([target.id])
  const differentFn = pool.filter(
    (it) => it.function !== target.function && it.id !== target.id,
  )
  const distractors = pickN(
    differentFn.length >= N_DISTRACTORS ? differentFn : pool,
    N_DISTRACTORS,
    exclude,
  )
  if (distractors.length < N_DISTRACTORS) return null
  return {
    id: `${target.id}-fn2phrase`,
    type: 'linking-function-to-phrase',
    itemId: target.id,
    prompt: `Which linking phrase signals ${FUNCTION_LABEL[target.function].toLowerCase()}?`,
    options: shuffle([
      { id: target.id, text: target.phrase, isCorrect: true },
      ...distractors.map((d) => ({ id: d.id, text: d.phrase, isCorrect: false })),
    ]),
  }
}

function buildLinkingGapFill(
  target: LinkingLexiconItem,
  pool: LinkingLexiconItem[],
): PracticeExercise | null {
  const exclude = new Set([target.id])
  const distractors = pickN(pool, N_DISTRACTORS, exclude)
  if (distractors.length < N_DISTRACTORS) return null
  const masked = maskWord(target.example, target.phrase)
  if (masked === target.example) return null
  return {
    id: `${target.id}-link-gap`,
    type: 'linking-gap-fill',
    itemId: target.id,
    prompt: 'Choose the linker that fits the gap.',
    context: masked,
    options: shuffle([
      { id: target.id, text: target.phrase, isCorrect: true },
      ...distractors.map((d) => ({ id: d.id, text: d.phrase, isCorrect: false })),
    ]),
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Replaces the first whole-phrase occurrence (case-insensitive) in the
 * sentence with a blank. Works for single-word headwords, multi-word
 * collocations, and multi-word linking phrases. Word-boundary anchored only
 * for single-word matches; multi-word phrases use a literal substring match.
 */
function maskWord(sentence: string, phrase: string): string {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const isMultiWord = /\s/.test(phrase)
  const pattern = isMultiWord ? escaped : `\\b${escaped}\\w*\\b`
  const re = new RegExp(pattern, 'i')
  return sentence.replace(re, '_____')
}
