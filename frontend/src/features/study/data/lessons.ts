export type Discipline = 'grammar' | 'vocabulary' | 'collocations' | 'linking'

export interface Lesson {
  id: string
  number: string
  title: string
  excerpt: string
  duration: string
  level: 'B1' | 'B2' | 'C1' | 'C2'
  discipline: Discipline
}

export const disciplineLabels: Record<Discipline, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  collocations: 'Collocations',
  linking: 'Linking Devices',
}

export const disciplineChapters: Record<Discipline, string> = {
  grammar: 'CH. I',
  vocabulary: 'CH. II',
  collocations: 'CH. III',
  linking: 'CH. IV',
}

export const progressData: Record<Discipline, { done: number; total: number }> = {
  grammar: { done: 12, total: 24 },
  vocabulary: { done: 18, total: 30 },
  collocations: { done: 7, total: 20 },
  linking: { done: 11, total: 14 },
}

export const lessons: Record<Discipline, Lesson[]> = {
  grammar: [
    {
      id: 'gr-001',
      number: '№ 001',
      title: 'Mixed conditionals for hypothetical Band 8 clarity',
      excerpt:
        'When the past reaches into the present, and the grammar has to follow. A guided tour of type 3 / type 2 hybrids.',
      duration: '25 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-002',
      number: '№ 002',
      title: 'Subordinate clauses: commas, colons, and control',
      excerpt:
        'The punctuation patterns that separate Band 6.5 writing from Band 7.5. Master the comma splice before it masters you.',
      duration: '20 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-003',
      number: '№ 003',
      title: 'Inversion for emphasis: hardly, seldom, rarely',
      excerpt:
        'Negative adverbials that trigger subject-auxiliary inversion. Used sparingly, they read as Band 8.',
      duration: '22 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-004',
      number: '№ 004',
      title: 'Participle clauses for concision',
      excerpt:
        'Having outlined the problem, the candidate now proposes a solution — present and past participles as opening gambits.',
      duration: '18 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-005',
      number: '№ 005',
      title: 'Cleft sentences: it-clefts and wh-clefts',
      excerpt:
        'What the examiner wants to see is a candidate who can reframe emphasis. Structures that do it naturally.',
      duration: '20 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-006',
      number: '№ 006',
      title: 'The passive voice for academic register',
      excerpt:
        'When depersonalising a claim raises the register — and when it sounds like evasion.',
      duration: '15 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-007',
      number: '№ 007',
      title: 'Reported speech: tense shifts that trip Band 7 candidates',
      excerpt:
        'Backshift rules, exceptions for ongoing truths, and the reporting verbs that imply stance.',
      duration: '24 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-008',
      number: '№ 008',
      title: 'Present perfect vs past simple: the finished / unfinished line',
      excerpt:
        'Since, for, yet, already — the time markers that tell the examiner you know which tense to reach for.',
      duration: '18 MIN',
      level: 'B1',
      discipline: 'grammar',
    },
    {
      id: 'gr-009',
      number: '№ 009',
      title: 'First, second, and third conditionals in argument',
      excerpt:
        'Real possibility, hypothetical present, impossible past. Where each sits in a Task 2 body paragraph.',
      duration: '22 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-010',
      number: '№ 010',
      title: 'Relative clauses: defining, non-defining, and reduced',
      excerpt:
        'Commas change meaning. Whose, of which, and the participial shortcut that reads as Band 7.5.',
      duration: '20 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-011',
      number: '№ 011',
      title: 'Articles: a, an, the, and the silent zero article',
      excerpt:
        'The single most common Band-6 error in Task 2 — and the rule that dissolves it in ten minutes.',
      duration: '16 MIN',
      level: 'B1',
      discipline: 'grammar',
    },
    {
      id: 'gr-012',
      number: '№ 012',
      title: 'Modals of speculation: must have, might have, could have',
      excerpt:
        'Reading between the lines of a Task 1 trend. The past-modal scale from certain to remote.',
      duration: '19 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-013',
      number: '№ 013',
      title: 'Obligation and permission: must, have to, should, ought to',
      excerpt:
        'External rule versus personal view. The modal that matches the argument, not just the meaning.',
      duration: '17 MIN',
      level: 'B1',
      discipline: 'grammar',
    },
    {
      id: 'gr-014',
      number: '№ 014',
      title: 'Gerund vs infinitive after verbs of intention and avoidance',
      excerpt:
        'Consider doing, refuse to do, stop smoking, stop to smoke. The patterns a memorised list cannot replace.',
      duration: '21 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-015',
      number: '№ 015',
      title: 'Future forms: will, going to, present continuous, future perfect',
      excerpt:
        'Prediction, plan, scheduled event, by-2050 completeness. Four futures, four grammatical registers.',
      duration: '19 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-016',
      number: '№ 016',
      title: 'Nominalisation: turning verbs into nouns for academic weight',
      excerpt:
        'Governments decide → government decisions. The single move that elevates Task 2 from spoken to written.',
      duration: '22 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-017',
      number: '№ 017',
      title: 'Hedging: may, might, tend to, appear, arguably',
      excerpt:
        'Claiming less, saying more. The academic art of leaving room for counter-evidence.',
      duration: '18 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-018',
      number: '№ 018',
      title: 'Concessive clauses: although, even though, whereas, despite',
      excerpt:
        'Acknowledging the other view without conceding your own. The hinge that scores in Coherence.',
      duration: '20 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-019',
      number: '№ 019',
      title: 'Cause and result structures: so...that, such...that, so as to',
      excerpt:
        'Intensity and purpose in one clause. Grammar the examiner notices when it is used accurately, and penalises when it is not.',
      duration: '17 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-020',
      number: '№ 020',
      title: 'Comparatives in argument: far more, by far, the more... the more...',
      excerpt:
        'Beyond bigger and smaller. Emphatic and proportional comparisons that carry a thesis.',
      duration: '16 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-021',
      number: '№ 021',
      title: 'Emphasis with auxiliary do and fronted adverbials',
      excerpt:
        'The government does face a choice. Rarely does an examiner reward a flat sentence.',
      duration: '15 MIN',
      level: 'C1',
      discipline: 'grammar',
    },
    {
      id: 'gr-022',
      number: '№ 022',
      title: 'Subject–verb agreement with tricky quantifiers',
      excerpt:
        'A number of, the number of, none of, each of. The subtle plurality that separates Band 6 from Band 7.',
      duration: '14 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
    {
      id: 'gr-023',
      number: '№ 023',
      title: 'Countable and uncountable nouns in academic writing',
      excerpt:
        'Advice, research, information, evidence — the nouns Vietnamese writers most often pluralise by mistake.',
      duration: '13 MIN',
      level: 'B1',
      discipline: 'grammar',
    },
    {
      id: 'gr-024',
      number: '№ 024',
      title: 'Task 1 tense range: describing trends across time',
      excerpt:
        'Past simple for the data, present perfect for the period, future forms for forecasts. The full palette.',
      duration: '18 MIN',
      level: 'B2',
      discipline: 'grammar',
    },
  ],

  vocabulary: [
    {
      id: 'vo-001',
      number: '№ 001',
      title: 'Academic synonyms for "increase" — and when each fits',
      excerpt:
        'Surge, escalate, proliferate, climb, ascend. Five words, five registers, five contexts.',
      duration: '15 MIN',
      level: 'B2',
      discipline: 'vocabulary',
    },
    {
      id: 'vo-002',
      number: '№ 002',
      title: 'Precise verbs for change: alter, modify, transform, overhaul',
      excerpt:
        'Every Band 7+ essay eventually describes change. Choose the verb that matches the scale.',
      duration: '18 MIN',
      level: 'B2',
      discipline: 'vocabulary',
    },
    {
      id: 'vo-003',
      number: '№ 003',
      title: 'Environmental lexicon: mitigate, offset, conserve, preserve',
      excerpt:
        'The four verbs every climate essay needs, with the exact nuance that separates them.',
      duration: '20 MIN',
      level: 'C1',
      discipline: 'vocabulary',
    },
    {
      id: 'vo-004',
      number: '№ 004',
      title: 'Education vocabulary beyond "learn" and "study"',
      excerpt:
        'Pedagogy, curriculum, rote learning, formative assessment. The words examiners expect in Task 2.',
      duration: '17 MIN',
      level: 'B2',
      discipline: 'vocabulary',
    },
    {
      id: 'vo-005',
      number: '№ 005',
      title: 'Abstract nouns for Task 2: notion, concept, phenomenon',
      excerpt:
        'Replacing "thing" and "idea" with the noun that does the intellectual work.',
      duration: '14 MIN',
      level: 'C1',
      discipline: 'vocabulary',
    },
    {
      id: 'vo-006',
      number: '№ 006',
      title: 'Describing charts: marginal, pronounced, steady, erratic',
      excerpt:
        'Task 1 rewards precision. A graded vocabulary of shape, speed, and magnitude.',
      duration: '16 MIN',
      level: 'B2',
      discipline: 'vocabulary',
    },
  ],

  collocations: [
    {
      id: 'co-001',
      number: '№ 001',
      title: 'Strong verb-noun pairs with "impact"',
      excerpt:
        'Have an impact, exert an impact, mitigate an impact — which verbs collocate, which do not, and why examiners notice.',
      duration: '18 MIN',
      level: 'B2',
      discipline: 'collocations',
    },
    {
      id: 'co-002',
      number: '№ 002',
      title: 'Collocations with "concern": raise, address, allay',
      excerpt:
        'A full semantic field of concern-verbs, from introducing worries to laying them to rest.',
      duration: '15 MIN',
      level: 'B2',
      discipline: 'collocations',
    },
    {
      id: 'co-003',
      number: '№ 003',
      title: 'Research collocations: conduct, undertake, publish, cite',
      excerpt:
        'The grammar of academic argument. Pairings examiners expect in Writing Task 2.',
      duration: '17 MIN',
      level: 'C1',
      discipline: 'collocations',
    },
    {
      id: 'co-004',
      number: '№ 004',
      title: 'Issue collocations: tackle, address, resolve, confront',
      excerpt:
        'Four verbs that look interchangeable — until you consider the intensity of the problem each implies.',
      duration: '14 MIN',
      level: 'B2',
      discipline: 'collocations',
    },
    {
      id: 'co-005',
      number: '№ 005',
      title: 'Adjective + noun for Task 1: marked increase, gradual decline',
      excerpt:
        'A compact lexicon of trend modifiers. Pair them with the verbs from lesson 006 and your Task 1 writes itself.',
      duration: '12 MIN',
      level: 'B2',
      discipline: 'collocations',
    },
    {
      id: 'co-006',
      number: '№ 006',
      title: 'Verb + preposition patterns: account for, result in, lead to',
      excerpt:
        'The preposition is half the meaning. Dependent prepositions that collocate with academic verbs.',
      duration: '19 MIN',
      level: 'C1',
      discipline: 'collocations',
    },
  ],

  linking: [
    {
      id: 'lin-001',
      number: '№ 001',
      title: 'Contrast connectors: however, nonetheless, nevertheless',
      excerpt:
        'Three connectors that look interchangeable but are not. Register, position, and punctuation.',
      duration: '15 MIN',
      level: 'B2',
      discipline: 'linking',
    },
    {
      id: 'lin-002',
      number: '№ 002',
      title: 'Sequencing in Task 2: initially, subsequently, ultimately',
      excerpt:
        'Temporal connectors that carry a Band 7 essay from introduction to conclusion.',
      duration: '20 MIN',
      level: 'B2',
      discipline: 'linking',
    },
    {
      id: 'lin-003',
      number: '№ 003',
      title: 'Conceding gracefully: granted, admittedly, whilst',
      excerpt:
        'Show the examiner you see both sides — and still make your point.',
      duration: '18 MIN',
      level: 'C1',
      discipline: 'linking',
    },
    {
      id: 'lin-004',
      number: '№ 004',
      title: 'Cause and effect: consequently, thereby, whereby',
      excerpt:
        'Three connectors that signal logical consequence with different degrees of formality.',
      duration: '16 MIN',
      level: 'C1',
      discipline: 'linking',
    },
    {
      id: 'lin-005',
      number: '№ 005',
      title: 'Addition with weight: moreover, furthermore, what is more',
      excerpt:
        'Layering arguments without sounding like a list. When each connector earns its place.',
      duration: '14 MIN',
      level: 'B2',
      discipline: 'linking',
    },
    {
      id: 'lin-006',
      number: '№ 006',
      title: 'Emphasis connectors: indeed, notably, in particular',
      excerpt:
        'Drawing attention without shouting. Three connectors that signal what matters most.',
      duration: '13 MIN',
      level: 'C1',
      discipline: 'linking',
    },
    {
      id: 'lin-007',
      number: '№ 007',
      title: 'Linking verbs for description: seem, appear, become',
      excerpt:
        'Verbs that carry predicative adjectives — and the hedging they permit in Task 2.',
      duration: '12 MIN',
      level: 'B2',
      discipline: 'linking',
    },
  ],
}

export const recentlyOpened: Array<{ number: string; title: string; seen: string }> = [
  { number: '№ 003', title: 'Conceding gracefully: granted, admittedly, whilst', seen: 'LAST SEEN · 2 DAYS AGO' },
  { number: '№ 002', title: 'Subordinate clauses: commas, colons, and control', seen: 'LAST SEEN · 4 DAYS AGO' },
  { number: '№ 001', title: 'Strong verb-noun pairs with "impact"', seen: 'LAST SEEN · 1 WEEK AGO' },
]
