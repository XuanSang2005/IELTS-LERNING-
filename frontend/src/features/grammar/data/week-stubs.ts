import type { BandLevel } from '@shared/schemas/practice'
import {
  DEFAULT_GRAMMAR_LEVEL,
  GrammarWeekStubSchema,
  phaseForWeek,
  type GrammarWeekStub,
  type WeekNumber,
} from '@shared/schemas/grammar-plan'

interface RawStub {
  week: WeekNumber
  structureName: string
  tagline: string
  goalOneLiner: string
}

const foundationRaw: RawStub[] = [
  {
    week: 1,
    structureName: 'The simple sentence',
    tagline: 'Subject. Verb. Object. In that order.',
    goalOneLiner:
      'Identify subject and verb in any sentence; write ten complete simple sentences without fragments.',
  },
  {
    week: 2,
    structureName: 'The three tenses — past, present, future',
    tagline: 'Time, without the decorations.',
    goalOneLiner:
      'Form and distinguish simple past, simple present, and simple future; fix the five verb-tense slips Vietnamese candidates make most.',
  },
  {
    week: 3,
    structureName: 'Articles & countability',
    tagline: 'A, an, the — and the quiet difference.',
    goalOneLiner:
      'Use a / an / the correctly; recognise countable vs uncountable nouns in the ten IELTS topics you will see most.',
  },
  {
    week: 4,
    structureName: 'Subject-verb agreement',
    tagline: 'The number lives in the verb.',
    goalOneLiner:
      'Match singular and plural subjects with their verbs, including the tricky cases: collective nouns, either/or, each of.',
  },
  {
    week: 5,
    structureName: 'Prepositions of time, place, and movement',
    tagline: 'The small words that carry the weight.',
    goalOneLiner:
      'Use in / on / at / to / from without second-guessing; memorise the twenty collocations examiners mark as natural.',
  },
  {
    week: 6,
    structureName: 'Coordinating conjunctions',
    tagline: 'And, but, or, so — the workhorses.',
    goalOneLiner:
      'Join two independent clauses with a comma and a coordinator; stop writing run-on sentences.',
  },
  {
    week: 7,
    structureName: 'Comparatives & superlatives',
    tagline: 'Better, best, and everything between.',
    goalOneLiner:
      'Form comparative and superlative adjectives regularly and irregularly; compare two and three items without the "more better" error.',
  },
  {
    week: 8,
    structureName: 'Basic modal verbs',
    tagline: 'Can, should, must, will.',
    goalOneLiner:
      'Express ability, obligation, advice, and prediction using the four modals a Band 5.5 writer needs to control.',
  },
  {
    week: 9,
    structureName: 'First conditional',
    tagline: 'If this happens, that follows.',
    goalOneLiner:
      'Write real-future conditionals with correct verb forms; deploy unless, provided that, as long as.',
  },
  {
    week: 10,
    structureName: 'Present perfect vs past simple',
    tagline: 'Have done, or did?',
    goalOneLiner:
      'Choose present perfect for connected-to-now experiences and past simple for finished-time events; use the six time markers that decide.',
  },
  {
    week: 11,
    structureName: 'Introduction to the passive voice',
    tagline: 'When the agent steps aside.',
    goalOneLiner:
      'Form passive in present and past; recognise when to use it (unknown agent, general truth) rather than defaulting to active.',
  },
  {
    week: 12,
    structureName: 'Paragraph cohesion, minimum viable',
    tagline: 'First, next, finally — then better.',
    goalOneLiner:
      'Link three sentences into a paragraph using firstly / however / in conclusion without repetition; read examiner feedback on your own draft.',
  },
]

const intermediateRaw: RawStub[] = [
  {
    week: 1,
    structureName: 'Sentence shapes & the clause',
    tagline: 'Before grammar, architecture.',
    goalOneLiner:
      'Identify main and subordinate clauses; name the four sentence types used in Task 2.',
  },
  {
    week: 2,
    structureName: 'Conditionals, all four types',
    tagline: 'If, then — and when.',
    goalOneLiner:
      'Write zero, first, second, and third conditionals with correct verb forms and mixed-reference timelines.',
  },
  {
    week: 3,
    structureName: 'The passive voice, used with purpose',
    tagline: 'When the agent steps aside.',
    goalOneLiner:
      'Form passive voice in every tense and choose it only where the agent is unknown, obvious, or beside the point.',
  },
  {
    week: 4,
    structureName: 'Relative clauses, defining and non-defining',
    tagline: 'The clause that earns its comma.',
    goalOneLiner:
      'Attach relative clauses without the comma errors that collapse Band 7 writing back to Band 6.',
  },
  {
    week: 5,
    structureName: 'Noun phrases & academic nominalisation',
    tagline: 'The longest word is a noun.',
    goalOneLiner:
      'Compress full clauses into noun phrases and deploy nominalisation without losing the reader.',
  },
  {
    week: 6,
    structureName: 'Inversion for emphasis',
    tagline: 'Never before have examiners noticed so quickly.',
    goalOneLiner:
      'Construct negative and conditional inversion safely; recognise the two patterns examiners reward.',
  },
  {
    week: 7,
    structureName: 'Cleft sentences & focus structures',
    tagline: 'It is the structure, not the word, that matters.',
    goalOneLiner:
      'Reshape plain sentences with it-clefts and what-clefts to foreground an argument without losing clarity.',
  },
  {
    week: 8,
    structureName: 'Hedging, modality, and cautious claims',
    tagline: 'Certainty is a register, not a virtue.',
    goalOneLiner:
      'Temper claims with modal stacks and hedging phrases that raise the register of Task 2 argumentation.',
  },
  {
    week: 9,
    structureName: 'Cohesion devices beyond connectors',
    tagline: 'The sentence remembers the one before it.',
    goalOneLiner:
      'Use reference, substitution, and lexical chains to bind paragraphs together without overused connectors.',
  },
  {
    week: 10,
    structureName: 'Concession patterns under timed conditions',
    tagline: 'Although, despite, and while — used once each.',
    goalOneLiner:
      'Concede a counter-argument in one clean sentence without the although-but double-marking error.',
  },
  {
    week: 11,
    structureName: 'Cause, consequence, and the discipline of so',
    tagline: 'Because earns its place or it is cut.',
    goalOneLiner:
      'Link cause and effect with precision; reserve so for the final blow, never the opening move.',
  },
  {
    week: 12,
    structureName: 'The mixed-error drill',
    tagline: 'Every examiner looks for the same five mistakes.',
    goalOneLiner:
      'Rehearse under test-day conditions: forty sentences, twelve minutes, five error families to catch.',
  },
]

const advancedRaw: RawStub[] = [
  {
    week: 1,
    structureName: 'Clause architecture at depth',
    tagline: 'A sentence is a hierarchy, not a list.',
    goalOneLiner:
      'Diagram two- and three-level subordination; rewrite simple sentences as complex ones without loss of clarity.',
  },
  {
    week: 2,
    structureName: 'Advanced conditionals & mixed reference',
    tagline: 'If he had, she would now.',
    goalOneLiner:
      'Master mixed-time conditionals (past condition, present result; present condition, past result); deploy were it not for / had it not been for.',
  },
  {
    week: 3,
    structureName: 'The passive with modal stacks',
    tagline: 'Had to be considered, might have been argued.',
    goalOneLiner:
      'Combine passive voice with modal and perfect auxiliaries for hedged, high-register Task 2 prose.',
  },
  {
    week: 4,
    structureName: 'Non-finite clauses',
    tagline: 'The sentence inside the sentence.',
    goalOneLiner:
      'Use participial and gerundial clauses to compress and elevate prose; distinguish reduced relatives from adverbial participles.',
  },
  {
    week: 5,
    structureName: 'Nominalisation under register',
    tagline: 'The verb becomes a subject.',
    goalOneLiner:
      'Nominalise freely without killing rhythm; recognise when the verb form is the right choice for cohesion and weight.',
  },
  {
    week: 6,
    structureName: 'Inversion — all three patterns',
    tagline: 'Rarely, were, and not only.',
    goalOneLiner:
      'Deploy negative, conditional, and emphatic inversion in Task 2; recognise examiner band-7.5 rewards and overuse penalties.',
  },
  {
    week: 7,
    structureName: 'Cleft sentences in argumentation',
    tagline: 'What matters is not the fact but the frame.',
    goalOneLiner:
      'Construct it-clefts, what-clefts, and all-clefts for topic-fronting and contrast; argue counter-positions with cleft restructuring.',
  },
  {
    week: 8,
    structureName: 'Hedging stacks & epistemic layering',
    tagline: 'One might reasonably argue that it could be said.',
    goalOneLiner:
      'Layer modal hedges, reporting verbs, and stance adverbs to signal academic caution without becoming unreadable.',
  },
  {
    week: 9,
    structureName: 'Cohesion — reference, substitution, ellipsis',
    tagline: 'The pronoun that does three jobs.',
    goalOneLiner:
      'Bind paragraphs with anaphoric reference, substitution (one, do so), and ellipsis; reduce connector overload.',
  },
  {
    week: 10,
    structureName: 'Concession at C1 register',
    tagline: 'Granted that, admittedly, to be fair.',
    goalOneLiner:
      'Concede counter-arguments with the full range of C1 concessive markers; pair each with the cleanest rebuttal pivot.',
  },
  {
    week: 11,
    structureName: 'Lexical precision under grammar',
    tagline: 'Grammar carries only what the word chose.',
    goalOneLiner:
      'Match collocation-level word choice to the grammar frame; eliminate the ten most common C1 miscollocations.',
  },
  {
    week: 12,
    structureName: 'The Band 7.5 timed drill',
    tagline: 'Under the clock, with the examiner watching.',
    goalOneLiner:
      'Write a Task 2 in forty minutes with every Phase III structure used once and only once; self-assess against C&C and Grammar Range descriptors.',
  },
]

const masteryRaw: RawStub[] = [
  {
    week: 1,
    structureName: 'Stylistic variation at the clause',
    tagline: 'Three ways to say what you mean.',
    goalOneLiner:
      'Rewrite any clause in three registers (formal, semi-formal, literary) without changing its meaning; choose deliberately.',
  },
  {
    week: 2,
    structureName: 'Aspect — the perfective-continuous distinction',
    tagline: 'Have been reading, had been reading, will have been reading.',
    goalOneLiner:
      'Control perfect-continuous aspects across time; use them for duration, evidence, and narrative texture.',
  },
  {
    week: 3,
    structureName: 'Subjunctive and counterfactual mood',
    tagline: 'Were I to be examined tomorrow, I should write as follows.',
    goalOneLiner:
      'Deploy subjunctive forms (were, be, should) and counterfactual constructions for academic and literary precision.',
  },
  {
    week: 4,
    structureName: 'Discourse markers by register',
    tagline: 'Incidentally, by the same token, in a sense.',
    goalOneLiner:
      'Select discourse markers by register (neutral, formal, literary) and function (concession, elaboration, reservation).',
  },
  {
    week: 5,
    structureName: 'Fronting and left-dislocation',
    tagline: 'This much I can say.',
    goalOneLiner:
      'Front objects, prepositional phrases, and clauses to manage information flow and topic-comment structure.',
  },
  {
    week: 6,
    structureName: 'Inversion — the edge cases',
    tagline: 'So rarely does one see this that.',
    goalOneLiner:
      'Handle inversion with negative adverbials, conditional omissions, and emphatic fronting without overclaim.',
  },
  {
    week: 7,
    structureName: 'Cleft, pseudo-cleft, and all-cleft in argument',
    tagline: 'What the examiner wants is structure.',
    goalOneLiner:
      'Use all three cleft families to sequence argument, contrast, and topic return in timed writing.',
  },
  {
    week: 8,
    structureName: 'Grammatical metaphor',
    tagline: 'The process becomes a thing.',
    goalOneLiner:
      'Recognise grammatical metaphor in academic prose; use it for abstraction and density at Band 8+.',
  },
  {
    week: 9,
    structureName: 'Authorial stance & evidentiality',
    tagline: 'It seems, it appears, the evidence suggests.',
    goalOneLiner:
      'Position yourself in the text with stance markers and evidential constructions; avoid first-person overreach.',
  },
  {
    week: 10,
    structureName: 'Rhetorical structures under pressure',
    tagline: 'Tricolon, anaphora, controlled parallelism.',
    goalOneLiner:
      'Deploy three rhetorical devices in Task 2 without sliding into ornament; mark the line between elevation and excess.',
  },
  {
    week: 11,
    structureName: 'Final polish — the ten things examiners still catch',
    tagline: 'The gap between Band 8 and 8.5.',
    goalOneLiner:
      'Audit your own writing for the ten residual errors that separate 8.0 from 8.5 at this level.',
  },
  {
    week: 12,
    structureName: 'The examiner’s eye',
    tagline: 'Read as they read.',
    goalOneLiner:
      'Grade three anonymised Band 7.5–8.5 essays against the public descriptors; reconcile your score with the official one.',
  },
]

const ARC_SOURCES: Record<BandLevel, RawStub[]> = {
  foundation: foundationRaw,
  intermediate: intermediateRaw,
  advanced: advancedRaw,
  mastery: masteryRaw,
}

function buildArc(level: BandLevel, raws: RawStub[]): GrammarWeekStub[] {
  return raws.map((r) =>
    GrammarWeekStubSchema.parse({
      ...r,
      level,
      phase: phaseForWeek(r.week),
    }),
  )
}

export const GRAMMAR_ARCS: Record<BandLevel, readonly GrammarWeekStub[]> = {
  foundation: buildArc('foundation', ARC_SOURCES.foundation),
  intermediate: buildArc('intermediate', ARC_SOURCES.intermediate),
  advanced: buildArc('advanced', ARC_SOURCES.advanced),
  mastery: buildArc('mastery', ARC_SOURCES.mastery),
}

export function getArc(level: BandLevel): readonly GrammarWeekStub[] {
  return GRAMMAR_ARCS[level]
}

export function getStub(level: BandLevel, week: WeekNumber): GrammarWeekStub {
  const found = getArc(level).find((s) => s.week === week)
  if (!found) throw new Error(`No grammar week stub for ${level} week ${week}`)
  return found
}

/** Back-compat convenience: default arc used when no level is specified. */
export const GRAMMAR_WEEK_STUBS: readonly GrammarWeekStub[] = GRAMMAR_ARCS[DEFAULT_GRAMMAR_LEVEL]
