import type { Lesson } from '@shared/schemas/lesson'

export const MASTERY_LESSONS: Lesson[] = [
  {
    id: 'm-w01-stylistic-variation',
    day: 37,
    week: 1,
    phase: 1,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Stylistic variation at the clause.',
    subtitle: 'Three ways to say what you mean.',
    hook: 'At Band 8, grammar ceases to be about correctness and becomes about choice. Every sentence can be written in at least three ways; the question is which one earns its place in the paragraph.',
    theory:
      'Three registers for the same clause. Formal: "The committee formally rejected the proposal." Semi-formal: "The committee turned down the proposal." Literary: "The proposal found no welcome at the committee." Shift register to signal emphasis or to break rhythm — three sentences in a row at the same register read as flat. At Mastery level, register choice is a rhetorical tool, not a stylistic accident. Verb choice carries most of the register weight (reject > turn down > refuse welcome to); syntax does the rest.',
    examples: [
      { text: 'The committee formally rejected the proposal.', register: 'B1' },
      {
        text: 'The committee declined to endorse the proposal, citing concerns over feasibility.',
        register: 'B2',
      },
      {
        text: 'The proposal, for all its ingenuity, found no welcome at the committee — a silence more damaging than any explicit rebuke.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong:
          'The committee rejected the proposal. The committee also rejected the revision. The committee finally rejected the appeal.',
        right:
          'The committee rejected the proposal, turned down the revision, and found no reason to entertain the appeal.',
        why: 'Three identical verbs in three identical shapes. Vary both the verb and the structure.',
      },
      {
        wrong:
          'The proposal was of insufficient merit to warrant consideration, it being the case that the committee had other priorities.',
        right:
          'The proposal lacked the merit to warrant consideration; the committee had other priorities.',
        why: 'Mock-Victorian syntax. Register lift should come from verb choice, not baroque subordination.',
      },
      {
        wrong: 'The committee turn down the proposal yesterday.',
        right: 'The committee turned down the proposal yesterday.',
        why: 'Style cannot cover a tense error. Get the grammar right first, then vary the register.',
      },
    ],
    practice: [
      {
        id: 'm1-1',
        kind: 'rewrite',
        prompt: 'Lift the register: "The government said no to the proposal."',
        answer: 'The government declined to endorse the proposal.',
      },
      {
        id: 'm1-2',
        kind: 'rewrite',
        prompt: 'Rewrite three ways (formal, semi-formal, literary): "The minister disagreed."',
        answer:
          'The minister formally dissented. / The minister pushed back against the plan. / The minister’s disagreement was quiet but unmistakable.',
      },
      {
        id: 'm1-3',
        kind: 'choice',
        prompt: 'Which register best matches a Task 2 body paragraph?',
        choices: [
          'The government said no to the proposal.',
          'The government formally declined the proposal.',
          'The proposal found, in the government, only polite refusal.',
        ],
        answer: 'The government formally declined the proposal.',
      },
      {
        id: 'm1-4',
        kind: 'rewrite',
        prompt:
          'Vary verb and structure: "The team rejected the idea. The team rejected the plan. The team rejected the appeal."',
        answer: 'The team rejected the idea, set aside the plan, and declined to hear the appeal.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph on an institutional decision. Use three different registers across three sentences, at least one of them literary.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Register shift via verb choice',
        context: 'The government declined to endorse the proposal.',
      },
      { text: 'Literary register', context: 'The proposal found no welcome at the committee.' },
      {
        text: 'Three varied rejections',
        context: 'rejected the idea, set aside the plan, and declined to hear the appeal.',
      },
      {
        text: 'Clean syntax lifts register',
        context:
          'The proposal lacked the merit to warrant consideration; the committee had other priorities.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-04-22',
  },
  {
    id: 'm-w02-aspect',
    day: 38,
    week: 2,
    phase: 2,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Aspect — the perfective-continuous distinction.',
    subtitle: 'Have been reading, had been reading, will have been reading.',
    hook: 'Perfect-continuous tenses carry three jobs simultaneously: duration, evidence, and narrative texture. At Band 8.5, a single "has been" replaces a whole sentence of explanation.',
    theory:
      'Present perfect continuous: has/have been + -ing. (She has been studying for three hours.) Past perfect continuous: had been + -ing. (She had been studying before the call came.) Future perfect continuous: will have been + -ing. (By December, she will have been studying here for a decade.) Function: (1) duration with attention to process, not completion; (2) evidence — "your hair is wet — have you been swimming?"; (3) texture — inserted into narrative to show what was happening before or during another event. Stative verbs (know, believe, contain) rarely take continuous aspect.',
    examples: [
      { text: 'I have been reading this novel for weeks.', register: 'B1' },
      {
        text: 'The team had been working on the project for three months before the funding was cut.',
        register: 'B2',
      },
      {
        text: 'By the end of the decade, researchers will have been tracking the variant for over twenty years, producing the longest continuous dataset of its kind.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'She has been knowing him for years.',
        right: 'She has known him for years.',
        why: 'Stative verb "know" does not take continuous aspect. Use the perfect simple.',
      },
      {
        wrong: 'They have been building the bridge since 2018 and it was completed last month.',
        right: 'They had been building the bridge since 2018; it was completed last month.',
        why: 'The perfect continuous clashes with a finished past event. Shift to past perfect continuous.',
      },
      {
        wrong: 'By next year, I would have been studying here for a decade.',
        right: 'By next year, I will have been studying here for a decade.',
        why: 'Future perfect continuous uses "will have been", not "would have been".',
      },
    ],
    practice: [
      {
        id: 'm2-1',
        kind: 'gap-fill',
        prompt: 'By December, the team _____ (work) on this project for five years.',
        answer: 'will have been working',
      },
      {
        id: 'm2-2',
        kind: 'rewrite',
        prompt:
          'Convert to perfect continuous: "The researcher studies the virus for a long time."',
        answer: 'The researcher has been studying the virus for a long time.',
      },
      {
        id: 'm2-3',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'She has been knowing the truth for months.',
          'She has known the truth for months.',
          'She had been knowing the truth for months.',
        ],
        answer: 'She has known the truth for months.',
      },
      {
        id: 'm2-4',
        kind: 'rewrite',
        prompt:
          'Shift to past perfect continuous: "Before the call came, she was studying for three hours."',
        answer: 'Before the call came, she had been studying for three hours.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word narrative about a long-running project. Use at least one present perfect continuous, one past perfect continuous, and one future perfect continuous.',
      minWords: 100,
    },
    noticing: [
      { text: 'Present perfect continuous', context: 'I have been reading this novel for weeks.' },
      {
        text: 'Past perfect continuous in narrative',
        context:
          'The team had been working on the project for three months before funding was cut.',
      },
      {
        text: 'Future perfect continuous for horizon',
        context:
          'By the end of the decade, researchers will have been tracking the variant for over twenty years.',
      },
      { text: 'Stative verbs do not take continuous', context: 'She has known him for years.' },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-04-29',
  },
  {
    id: 'm-w03-subjunctive',
    day: 39,
    week: 3,
    phase: 2,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Subjunctive and counterfactual mood.',
    subtitle: 'Were I to be examined tomorrow, I should write as follows.',
    hook: 'The subjunctive is small, old, and precise. It appears in three places in modern English: after certain verbs ("insist that he be present"), in fixed phrases ("be that as it may"), and in counterfactual conditionals ("If I were you"). Band 8.5 writers use all three.',
    theory:
      'Present subjunctive: bare infinitive after "that"-clauses of suggestion, recommendation, demand, order, insistence. "It is essential that every candidate submit the form by Friday." (not "submits"). Past subjunctive: "were" for all persons in counterfactuals. "If I were rich, I would…" Fixed expressions: be that as it may, come what may, God bless, so be it. In counterfactual narration, "would have", "should have", and "might have" carry different weights — "should have" hedges harder than "would have".',
    examples: [
      { text: 'If I were you, I would accept the offer.', register: 'B1' },
      {
        text: 'The committee insisted that the proposal be reviewed by an independent panel.',
        register: 'B2',
      },
      {
        text: 'Were the council to reconsider its stance, the district would benefit, although it is equally possible that a different administration would reach the opposite conclusion.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The committee insisted that the proposal is reviewed.',
        right: 'The committee insisted that the proposal be reviewed.',
        why: 'Verbs of insistence, suggestion, demand take the subjunctive (bare infinitive) after "that".',
      },
      {
        wrong: 'If I was rich, I would travel.',
        right: 'If I were rich, I would travel.',
        why: 'In formal counterfactuals, use "were" for all persons.',
      },
      {
        wrong: 'Were the minister resigned, the crisis would be contained.',
        right: 'Were the minister to resign, the crisis would be contained.',
        why: 'Inverted subjunctive takes "were + subject + to + base verb", not a past participle.',
      },
    ],
    practice: [
      {
        id: 'm3-1',
        kind: 'gap-fill',
        prompt: 'It is essential that every candidate _____ (submit) the form by Friday.',
        answer: 'submit',
      },
      {
        id: 'm3-2',
        kind: 'rewrite',
        prompt: 'Rewrite counterfactually: "I am not the minister, so I cannot decide."',
        answer: 'If I were the minister, I could decide.',
      },
      {
        id: 'm3-3',
        kind: 'rewrite',
        prompt:
          'Invert the subjunctive conditional: "If the minister were to resign, the crisis would be contained."',
        answer: 'Were the minister to resign, the crisis would be contained.',
      },
      {
        id: 'm3-4',
        kind: 'choice',
        prompt: 'Which sentence uses the present subjunctive correctly?',
        choices: [
          'The doctor recommended that she takes three days off.',
          'The doctor recommended that she take three days off.',
          'The doctor recommended that she taking three days off.',
        ],
        answer: 'The doctor recommended that she take three days off.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a recommendation from an institution. Use one present subjunctive, one counterfactual with "were", and one fixed expression.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'Present subjunctive after "insist"',
        context: 'The committee insisted that the proposal be reviewed.',
      },
      { text: '"Were" for all persons', context: 'If I were you, I would accept.' },
      {
        text: 'Inverted subjunctive with "to"',
        context: 'Were the minister to resign, the crisis would be contained.',
      },
      { text: 'Fixed subjunctive phrase', context: 'Be that as it may, the deadline stands.' },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-05-06',
  },
  {
    id: 'm-w04-discourse-markers',
    day: 40,
    week: 4,
    phase: 2,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Discourse markers by register.',
    subtitle: 'Incidentally, by the same token, in a sense.',
    hook: 'A discourse marker tells the reader what kind of move is coming — elaboration, concession, reservation, pivot. At Band 8.5, the marker is chosen not for emphasis but for register precision.',
    theory:
      'Four marker families. Elaboration: incidentally, in passing, for that matter, in this regard. Reservation: in a sense, to a degree, in some respects, up to a point. Pivot: that said, having said that, with that in mind, for all that. Emphasis: above all, not least, most importantly, if anything. Match marker to register — "for that matter" is conversational; "in this regard" is formal; both are valid, but not in the same paragraph. Over-use produces fussiness — one marker per sentence-connection, never two.',
    examples: [
      { text: 'The policy works. Above all, it is fair.', register: 'B1' },
      {
        text: 'The reform has succeeded; in this regard, it exceeds its original targets.',
        register: 'B2',
      },
      {
        text: 'The programme has, in some respects, overshot its brief; that said, the broader aims remain largely intact, and the early data are, if anything, encouraging.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'By the way the policy is working however incidentally it is expensive.',
        right: 'The policy is working; incidentally, it is also expensive.',
        why: 'Stacking "by the way" + "however" + "incidentally" produces marker pile-up.',
      },
      {
        wrong: 'For that matter, the report was submitted to the Ministry on time.',
        right: 'In this regard, the report was submitted to the Ministry on time.',
        why: '"For that matter" is conversational; "in this regard" is the matching formal marker.',
      },
      {
        wrong: 'Having said this, the policy might fail.',
        right: 'That said, the policy might fail.',
        why: '"That said" is the standard idiom; "having said this" is a variant but less natural at C1 register.',
      },
    ],
    practice: [
      {
        id: 'm4-1',
        kind: 'choice',
        prompt: 'Which marker is best in a formal paragraph?',
        choices: [
          'By the way, the report was submitted on time.',
          'Incidentally, the report was submitted on time.',
          'In this regard, the report was submitted on time.',
        ],
        answer: 'In this regard, the report was submitted on time.',
      },
      {
        id: 'm4-2',
        kind: 'rewrite',
        prompt: 'Use a reservation marker: "The policy works. It does not solve everything."',
        answer: 'The policy works; to a degree, however, it does not solve everything.',
      },
      {
        id: 'm4-3',
        kind: 'rewrite',
        prompt: 'Replace informal with C1: "Anyway, the report was clear enough."',
        answer: 'That said, the report was clear enough.',
      },
      {
        id: 'm4-4',
        kind: 'choice',
        prompt: 'Which is correctly positioned?',
        choices: [
          'The reform has succeeded, in this regard it exceeds its targets.',
          'The reform has succeeded; in this regard, it exceeds its targets.',
          'The reform has succeeded, however, in this regard, it exceeds its targets.',
        ],
        answer: 'The reform has succeeded; in this regard, it exceeds its targets.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph on a mixed outcome. Use one elaboration marker, one reservation marker, and one pivot marker — all at C1 register.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Elaboration marker (formal)',
        context: 'In this regard, the report was submitted on time.',
      },
      {
        text: 'Reservation marker',
        context: 'In some respects, the reform has overshot its brief.',
      },
      { text: 'Pivot marker', context: 'That said, the broader aims remain intact.' },
      { text: 'Emphasis marker', context: 'The early data are, if anything, encouraging.' },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-05-13',
  },
  {
    id: 'm-w05-fronting',
    day: 41,
    week: 5,
    phase: 2,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Fronting and left-dislocation.',
    subtitle: 'This much I can say.',
    hook: 'Fronting moves an element to the start of the sentence to manage topic and flow. It is the grammar of paragraph management — what the sentence is about before you say what it does.',
    theory:
      'Three front-able elements. Object fronting: "This, I understand." (The object becomes the topic.) Prepositional fronting: "To the committee, the proposal was premature." Adverbial fronting: "With considerable reluctance, the council approved the bill." Related: left-dislocation, where a fronted element is echoed by a pronoun — "That policy, it has never worked." This is informal; in Task 2, prefer clean fronting without the pronoun echo. Fronting signals contrast or continuation between sentences — use deliberately.',
    examples: [
      { text: 'This, I can tell you with confidence.', register: 'B1' },
      { text: 'With some reluctance, the council approved the new regulations.', register: 'B2' },
      {
        text: 'To the critics of the reform, the legislation appeared hasty; to its supporters, overdue; to most observers, unremarkable.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'That policy it has never worked.',
        right:
          'That policy has never worked. (or formally: That policy, in any context, has never worked.)',
        why: 'Left-dislocation with a pronoun echo is spoken English. Drop the pronoun in Task 2.',
      },
      {
        wrong: 'With reluctance the council approved considerable the bill.',
        right: 'With considerable reluctance, the council approved the bill.',
        why: 'The adverb "considerable" belongs inside the fronted prepositional phrase.',
      },
      {
        wrong: 'This, I understand it.',
        right: 'This, I understand.',
        why: 'Do not add a pronoun "it" when the fronted object is already the object of the verb.',
      },
    ],
    practice: [
      {
        id: 'm5-1',
        kind: 'rewrite',
        prompt: 'Front the object: "I can tell you this with confidence."',
        answer: 'This, I can tell you with confidence.',
      },
      {
        id: 'm5-2',
        kind: 'rewrite',
        prompt: 'Front the prepositional phrase: "The proposal was premature to the committee."',
        answer: 'To the committee, the proposal was premature.',
      },
      {
        id: 'm5-3',
        kind: 'choice',
        prompt: 'Which is the cleanest formal fronting?',
        choices: [
          'That policy it has never worked.',
          'That policy, it has never worked.',
          'That policy has never worked.',
        ],
        answer: 'That policy has never worked.',
      },
      {
        id: 'm5-4',
        kind: 'rewrite',
        prompt:
          'Use parallel fronting: "The legislation appeared hasty to critics. The legislation appeared overdue to supporters."',
        answer: 'To the critics, the legislation appeared hasty; to its supporters, overdue.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph using one object fronting, one prepositional fronting, and one parallel fronting across three audiences (critics, supporters, observers).',
      minWords: 100,
    },
    noticing: [
      { text: 'Object fronting', context: 'This, I can tell you with confidence.' },
      { text: 'Prepositional fronting', context: 'To the committee, the proposal was premature.' },
      {
        text: 'Adverbial fronting',
        context: 'With considerable reluctance, the council approved the bill.',
      },
      { text: 'Parallel fronting', context: 'To the critics, hasty; to supporters, overdue.' },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-05-20',
  },
  {
    id: 'm-w06-inversion-edges',
    day: 42,
    week: 6,
    phase: 3,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Inversion — the edge cases.',
    subtitle: 'So rarely does one see this that.',
    hook: 'Beyond the three core patterns, inversion has edge cases that only Band 8 writers deploy correctly: "not until", "only after", "hardly had …", "in no way", "nowhere". Each has a specific shape and each carries emphasis.',
    theory:
      'Edge-case triggers for inversion: "Not until + clause/NP, did …" (Not until the budget was secured did construction begin.); "Only after + clause, did …" (Only after the committee approved did work resume.); "Hardly had + subject + past participle + when …" (Hardly had the meeting begun when the fire alarm sounded.); "In no way + aux + subject" (In no way does this reflect official policy.); "Nowhere + aux + subject" (Nowhere is this more visible than in rural regions.). Overuse reads as affectation. One edge-case inversion per Task 2, and only if the fronted element earns its emphasis.',
    examples: [
      { text: 'Not until the reform passed did the economy improve.', register: 'B1' },
      {
        text: 'Only after the committee reviewed the evidence did they reverse their decision.',
        register: 'B2',
      },
      {
        text: 'Hardly had the legislation taken effect when its architects began to seek amendments, a sequence that speaks less to drafting failure than to the speed at which the underlying conditions shifted.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Not until the reform passed the economy improved.',
        right: 'Not until the reform passed did the economy improve.',
        why: 'After "not until + clause", invert the auxiliary.',
      },
      {
        wrong: 'Hardly the meeting had begun when the alarm sounded.',
        right: 'Hardly had the meeting begun when the alarm sounded.',
        why: '"Hardly" requires inversion of subject and auxiliary.',
      },
      {
        wrong: 'Nowhere this is more visible than in rural regions.',
        right: 'Nowhere is this more visible than in rural regions.',
        why: 'After "nowhere" as a negative adverbial, invert.',
      },
    ],
    practice: [
      {
        id: 'm6-1',
        kind: 'rewrite',
        prompt: 'Invert with "not until": "The economy improved only after the reform passed."',
        answer: 'Not until the reform passed did the economy improve.',
      },
      {
        id: 'm6-2',
        kind: 'rewrite',
        prompt:
          'Invert with "hardly … when": "The meeting had barely begun. The fire alarm sounded."',
        answer: 'Hardly had the meeting begun when the fire alarm sounded.',
      },
      {
        id: 'm6-3',
        kind: 'rewrite',
        prompt: 'Invert with "in no way": "This does not reflect official policy in any way."',
        answer: 'In no way does this reflect official policy.',
      },
      {
        id: 'm6-4',
        kind: 'choice',
        prompt: 'Which sentence is correctly inverted?',
        choices: [
          'Nowhere this is more visible than in rural regions.',
          'Nowhere is this more visible than in rural regions.',
          'This is nowhere more visible than in rural regions.',
        ],
        answer: 'Nowhere is this more visible than in rural regions.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph on a policy change, using one "not until" inversion, one "hardly … when" inversion, and one "nowhere" inversion. Use each deliberately.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Not until + inversion',
        context: 'Not until the reform passed did the economy improve.',
      },
      { text: 'Hardly … when', context: 'Hardly had the meeting begun when the alarm sounded.' },
      {
        text: 'In no way + aux + subject',
        context: 'In no way does this reflect official policy.',
      },
      { text: 'Nowhere + aux', context: 'Nowhere is this more visible than in rural regions.' },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-05-27',
  },
  {
    id: 'm-w07-cleft-argument',
    day: 43,
    week: 7,
    phase: 3,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Cleft, pseudo-cleft, and all-cleft in argument.',
    subtitle: 'What the examiner wants is structure.',
    hook: 'At Band 8, cleft sentences sequence an argument. It-cleft opens the rebuttal; what-cleft foregrounds the positive claim; all-cleft limits the scope of a concession. Used together, they move a paragraph with the precision of a score.',
    theory:
      'Cleft sequence for argument. Opening rebuttal: "It is not X that matters — it is Y." Positive claim: "What distinguishes Y from X is Z." Concession scope: "All that X does is A; what Y does is B." Use the sequence when you need to distinguish two competing explanations, rebut a common misreading, or limit a concession before pivoting. Do not use all three in a single paragraph — two is the natural pairing. Three feels rehearsed.',
    examples: [
      { text: 'It is not the policy that failed — it was the implementation.', register: 'B1' },
      {
        text: 'What distinguishes successful reforms from failed ones is sustained political will.',
        register: 'B2',
      },
      {
        text: 'All that the original legislation did was codify existing practice; what the current reform adds is a genuine enforcement mechanism, and it is this, rather than the statutory language itself, that has provoked the most sustained opposition.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'What is the policy that failed is the implementation.',
        right: 'What failed in the policy was the implementation.',
        why: 'The what-clause must be the subject; word order should match the active clause it replaces.',
      },
      {
        wrong: 'All what the reform does is codify practice.',
        right: 'All that the reform does is codify practice.',
        why: 'All-cleft uses "that", not "what".',
      },
      {
        wrong: 'It was not the policy but the implementation which was failed.',
        right: 'It was not the policy but the implementation that failed.',
        why: '"Which was failed" is ungrammatical — "failed" is intransitive. Use "that failed".',
      },
    ],
    practice: [
      {
        id: 'm7-1',
        kind: 'rewrite',
        prompt:
          'Open with a paired it-cleft rebuttal: "The policy is not the problem. The implementation is the problem."',
        answer: 'It is not the policy that is the problem — it is the implementation.',
      },
      {
        id: 'm7-2',
        kind: 'rewrite',
        prompt:
          'Foreground with a what-cleft: "Sustained political will distinguishes successful reforms."',
        answer: 'What distinguishes successful reforms is sustained political will.',
      },
      {
        id: 'm7-3',
        kind: 'rewrite',
        prompt: 'Limit with an all-cleft: "The reform only codifies existing practice."',
        answer: 'All the reform does is codify existing practice.',
      },
      {
        id: 'm7-4',
        kind: 'choice',
        prompt: 'Which ordered pair best moves an argument?',
        choices: [
          'It was the implementation that failed. What distinguished the reform from predecessors was sustained will.',
          'All the reform did was codify practice. Nowhere did it introduce enforcement.',
          'What distinguished the reform was enforcement. It is not the policy that matters.',
        ],
        answer:
          'It was the implementation that failed. What distinguished the reform from predecessors was sustained will.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph that rebuts a common misidentification and then foregrounds the real cause, using one it-cleft and one what-cleft in sequence.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Paired it-cleft rebuttal',
        context: 'It is not the policy but the implementation that failed.',
      },
      {
        text: 'What-cleft for positive claim',
        context: 'What distinguishes successful reforms is sustained political will.',
      },
      {
        text: 'All-cleft for scope limit',
        context: 'All the reform does is codify existing practice.',
      },
      {
        text: 'Cleft sequence in argument',
        context:
          'It was the implementation that failed. What distinguished the reform was sustained will.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-06-03',
  },
  {
    id: 'm-w08-grammatical-metaphor',
    day: 44,
    week: 8,
    phase: 3,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Grammatical metaphor.',
    subtitle: 'The process becomes a thing.',
    hook: 'Grammatical metaphor compresses a clause into a noun phrase that can serve as the subject of the next sentence. "Globalisation has reshaped economies" packages an entire process (many goods moving across borders) into a single abstract noun. At Band 8+, this is the dominant move of academic prose.',
    theory:
      'Three types. (1) Nominalisation of a process — decide → decision; grow → growth; move → movement. (2) Nominalisation of a quality — rapid → rapidity; warm → warmth; efficient → efficiency. (3) Abstraction of an agent — the carmakers → the industry; farmers → agriculture. Each converts a clause-level event into a noun that can re-enter the next sentence as subject. The examiner reads this as ideational density. Risk: when the nominalisation hides the agent responsibly — "mistakes were made" — the reader notices the evasion.',
    examples: [
      { text: 'Cities grow quickly. This growth causes traffic.', register: 'B1' },
      {
        text: 'The rapid expansion of the tourism industry has transformed coastal economies.',
        register: 'B2',
      },
      {
        text: 'The acceleration of technological change has, in a single generation, compressed cycles of innovation that previously extended across decades.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Mistakes were made on the project.',
        right: 'The project team made several mistakes.',
        why: 'When nominalisation hides an actor the reader needs to identify, restore the agent.',
      },
      {
        wrong: 'The rapidity of the growth of the city has caused a problem of traffic.',
        right:
          'The city’s rapid growth has caused traffic problems. (or: The rapid growth of the city has caused traffic problems.)',
        why: 'Three nominalisations stacked. Reduce to one per clause.',
      },
      {
        wrong: 'The acceleratation of technological change.',
        right: 'The acceleration of technological change.',
        why: 'Nominalised form: accelerate → acceleration. Watch the -ion ending.',
      },
    ],
    practice: [
      {
        id: 'm8-1',
        kind: 'rewrite',
        prompt: 'Nominalise the process: "Technology changes rapidly, which affects industries."',
        answer:
          'The rapid change of technology affects industries. (or: Rapid technological change affects industries.)',
      },
      {
        id: 'm8-2',
        kind: 'rewrite',
        prompt: 'Nominalise into an abstract agent: "Farmers are losing income."',
        answer: 'Agriculture is experiencing a decline in income.',
      },
      {
        id: 'm8-3',
        kind: 'choice',
        prompt: 'Which is the densest C1 form?',
        choices: [
          'Cities are growing quickly and this causes a lot of traffic.',
          'The rapid urban growth has produced significant traffic.',
          'The rapidity of the growth of cities has led to problems with traffic.',
        ],
        answer: 'The rapid urban growth has produced significant traffic.',
      },
      {
        id: 'm8-4',
        kind: 'rewrite',
        prompt: 'Restore agent: "Decisions have been reached regarding the curriculum."',
        answer: 'The committee has reached decisions regarding the curriculum.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph on a rapid change in your field. Use at least two grammatical metaphors, including one abstraction of an agent. Verify no clause hides a necessary actor.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Process nominalised',
        context: 'The rapid growth of the tourism industry has transformed coastal economies.',
      },
      {
        text: 'Quality nominalised',
        context: 'The rapidity of the change compressed cycles of innovation.',
      },
      { text: 'Agent abstracted', context: 'Agriculture is experiencing a decline.' },
      {
        text: 'Restore agent when needed',
        context: 'The committee has reached decisions regarding the curriculum.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-06-10',
  },
  {
    id: 'm-w09-stance-evidentiality',
    day: 45,
    week: 9,
    phase: 3,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Authorial stance and evidentiality.',
    subtitle: 'It seems, it appears, the evidence suggests.',
    hook: 'Where B2 writers assert, C1 writers report. "The policy fails" → "The evidence suggests the policy may be failing". The shift is small; the credibility gain is large.',
    theory:
      'Three stance families. Evidentiality: the evidence suggests, the data indicate, studies show, research points to. Personal stance: I would argue, in my view, it seems to me, arguably. Impersonal hedge: it may be argued, it is sometimes suggested, it appears. Task 2 rewards impersonal stance over personal — "it may be argued" outscores "I think". Use "I would argue" sparingly for an explicit claim you want to own. Never combine "obviously" with a hedge verb — it contradicts the epistemic layering.',
    examples: [
      { text: 'In my view, the policy is too slow.', register: 'B1' },
      { text: 'The evidence suggests that the policy is producing mixed results.', register: 'B2' },
      {
        text: 'While studies indicate a measurable short-term benefit, the long-term effects are, as yet, uncertain; it may reasonably be argued that conclusions drawn at this stage are premature.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'In my opinion, the data obviously shows that the policy is working.',
        right: 'The data suggest that the policy is working.',
        why: 'Drop the personal hedge and the absolute "obviously"; let the evidentiality carry the stance.',
      },
      {
        wrong: 'Studies shows that the policy fails.',
        right:
          'Studies show that the policy is failing. (or: Studies suggest that the policy may be failing.)',
        why: 'Subject-verb agreement: "studies" is plural. Choose continuous or hedged form for academic register.',
      },
      {
        wrong: 'I would argue that it may be argued that the policy works.',
        right: 'I would argue that the policy is working.',
        why: 'Do not stack a personal stance marker with an impersonal one — choose one.',
      },
    ],
    practice: [
      {
        id: 'm9-1',
        kind: 'rewrite',
        prompt: 'Convert to evidentiality: "I think the policy works."',
        answer: 'The evidence suggests that the policy is working.',
      },
      {
        id: 'm9-2',
        kind: 'rewrite',
        prompt: 'Use impersonal stance: "I will argue that earlier action would have been better."',
        answer: 'It may be argued that earlier action would have been preferable.',
      },
      {
        id: 'm9-3',
        kind: 'choice',
        prompt: 'Which is the highest-register stance?',
        choices: [
          'In my opinion, the reform is good.',
          'I would argue that the reform has merit.',
          'The reform has produced measurable benefits, although their long-term reach remains contested.',
        ],
        answer:
          'The reform has produced measurable benefits, although their long-term reach remains contested.',
      },
      {
        id: 'm9-4',
        kind: 'rewrite',
        prompt:
          'Remove the contradicted absolute: "Obviously, the data suggest the policy may work."',
        answer: 'The data suggest the policy may work.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph on a contested finding. Use one evidentiality marker, one impersonal hedge, and no more than one explicit "I would argue" claim.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Evidentiality marker',
        context: 'The evidence suggests that the policy is producing mixed results.',
      },
      {
        text: 'Impersonal stance',
        context: 'It may reasonably be argued that conclusions are premature.',
      },
      {
        text: 'Measured personal stance',
        context: 'I would argue that earlier action would have been preferable.',
      },
      { text: 'Agreement with "studies"', context: 'Studies show that the policy is failing.' },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-06-17',
  },
  {
    id: 'm-w10-rhetoric-structures',
    day: 46,
    week: 10,
    phase: 4,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Rhetorical structures under pressure.',
    subtitle: 'Tricolon, anaphora, controlled parallelism.',
    hook: 'Rhetorical structures are precise tools. Tricolon: three parallel elements. Anaphora: repeated opening word or phrase. Controlled parallelism: matched grammatical forms across two or three sentences. Used once per essay, they read as mastery. Used twice, they read as ornament.',
    theory:
      'Tricolon: "The reform is rapid, targeted, and enforceable." Three parallel adjectives. Anaphora: "We build, because we must. We teach, because we must. We endure, because we must." Three sentences opening with the same verb. Parallelism: match grammatical form — not "rapid, targeting, to be enforced" but "rapid, targeted, enforceable". The discipline is control — each device demands that every element be grammatically symmetric. Asymmetry collapses the effect.',
    examples: [
      { text: 'The reform is fast, fair, and strong.', register: 'B1' },
      { text: 'The legislation is rapid, targeted, and enforceable.', register: 'B2' },
      {
        text: 'What the reform achieves is threefold: it replaces an outdated framework, it addresses long-standing inequities, and it provides the enforcement mechanism its predecessors lacked.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The policy is fast, targeting, and will be enforced.',
        right: 'The policy is fast, targeted, and enforceable.',
        why: 'Parallelism requires the same grammatical form — three adjectives, not adjective + gerund + passive future.',
      },
      {
        wrong:
          'We build because we must and teaching because we must and we endure because we must.',
        right: 'We build, because we must. We teach, because we must. We endure, because we must.',
        why: 'Anaphora needs repeated full structure across sentences. The second element ("teaching") broke the pattern.',
      },
      {
        wrong: 'The reform is rapid and targeting and will be enforced.',
        right: 'The reform is rapid, targeted, and enforceable.',
        why: 'Three "and"s read as a list-of-three-failed-at. Use commas and final "and" for a tricolon.',
      },
    ],
    practice: [
      {
        id: 'm10-1',
        kind: 'rewrite',
        prompt:
          'Fix the parallelism: "The policy is ambitious, to reach every region, and it will be enforced."',
        answer: 'The policy is ambitious, region-wide, and enforceable.',
      },
      {
        id: 'm10-2',
        kind: 'rewrite',
        prompt: 'Use anaphora: "We build. We teach. We endure. Each action is necessary."',
        answer: 'We build, because we must. We teach, because we must. We endure, because we must.',
      },
      {
        id: 'm10-3',
        kind: 'choice',
        prompt: 'Which is a correctly parallel tricolon?',
        choices: [
          'The plan is rapid, targeted, and to be enforced.',
          'The plan is rapid, targeted, and enforceable.',
          'The plan is rapidly, targeted, and will enforce.',
        ],
        answer: 'The plan is rapid, targeted, and enforceable.',
      },
      {
        id: 'm10-4',
        kind: 'rewrite',
        prompt:
          'Build a three-element parallel claim: "The reform replaces the framework. The reform addresses inequities. The reform provides enforcement."',
        answer:
          'The reform replaces the outdated framework, addresses long-standing inequities, and provides enforcement.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph defending a reform. Use one tricolon, one clean parallelism, and — optionally — one instance of anaphora across two sentences.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Tricolon with parallel adjectives',
        context: 'The legislation is rapid, targeted, and enforceable.',
      },
      {
        text: 'Anaphora across sentences',
        context: 'We build, because we must. We teach, because we must.',
      },
      {
        text: 'What-cleft + parallel list',
        context: 'What the reform achieves is threefold: it replaces… it addresses… it provides…',
      },
      {
        text: 'Parallelism requires symmetric form',
        context:
          'The reform replaces the framework, addresses inequities, and provides enforcement.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-06-24',
  },
  {
    id: 'm-w11-final-polish',
    day: 47,
    week: 11,
    phase: 4,
    discipline: 'grammar',
    level: 'mastery',
    title: 'Final polish — the ten things examiners still catch.',
    subtitle: 'The gap between Band 8 and 8.5.',
    hook: 'At Band 8, grammar is essentially correct. At Band 8.5, the residual errors are tiny but recurrent: article drift, preposition collocation, agreement under complex subjects, tense-shift in reported speech, comma before "that" in restrictive clauses, and six others. Know them. Hunt them.',
    theory:
      'The ten residual errors. (1) Article drift across a long noun phrase. (2) Preposition after noun: interest in, focus on, lack of, reliance on. (3) Agreement with "a number of" (plural) vs "the number of" (singular). (4) Backshift in reported speech when the reported claim is still true. (5) No comma before restrictive "that". (6) "Which" vs "that" after comma. (7) Dangling modifier in long sentences. (8) Misused "literally". (9) Hypercorrection: "whom" where "who" is correct. (10) Pronoun reference ambiguity — which of two nouns does "it" refer to?',
    examples: [
      { text: 'A number of students are absent today.', register: 'B1' },
      { text: 'The number of applicants has doubled since last year.', register: 'B2' },
      {
        text: 'Reported findings — that the intervention had produced lasting gains — were subsequently revised in light of longer-term follow-up.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'A number of students is absent today.',
        right: 'A number of students are absent today.',
        why: '"A number of" is plural; "the number of" is singular.',
      },
      {
        wrong: 'She is interested on modern art.',
        right: 'She is interested in modern art.',
        why: 'Preposition collocation: interested in, not on.',
      },
      {
        wrong: 'The report said that the policy was working. (The policy is still in force.)',
        right: 'The report said that the policy is working.',
        why: 'Backshift is not required when the reported claim remains true at the time of speaking.',
      },
    ],
    practice: [
      {
        id: 'm11-1',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'A number of students is absent today.',
          'A number of students are absent today.',
        ],
        answer: 'A number of students are absent today.',
      },
      {
        id: 'm11-2',
        kind: 'rewrite',
        prompt: 'Correct: "She is focused in her research."',
        answer: 'She is focused on her research.',
      },
      {
        id: 'm11-3',
        kind: 'rewrite',
        prompt:
          'Fix the dangling modifier: "Walking through the old city, the buildings were beautiful."',
        answer:
          'Walking through the old city, we found the buildings beautiful. (or: The buildings of the old city were beautiful.)',
      },
      {
        id: 'm11-4',
        kind: 'choice',
        prompt:
          'Which sentence handles the reported claim correctly, given the claim is still true?',
        choices: [
          'The report said that the policy was working.',
          'The report said that the policy is working.',
        ],
        answer: 'The report said that the policy is working.',
      },
    ],
    extension: {
      prompt:
        'Write a 120-word paragraph and then audit it for all ten residual errors listed. Report the count of each error you had to correct. Target: zero.',
      minWords: 120,
    },
    noticing: [
      { text: '"A number of" is plural', context: 'A number of students are absent today.' },
      { text: 'Preposition collocation', context: 'She is interested in modern art.' },
      { text: 'Optional backshift', context: 'The report said that the policy is working.' },
      {
        text: 'Pronoun reference',
        context: 'The minister and the deputy disagreed, but the minister prevailed.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-07-01',
  },
  {
    id: 'm-w12-examiner-eye',
    day: 48,
    week: 12,
    phase: 4,
    discipline: 'grammar',
    level: 'mastery',
    title: 'The examiner’s eye.',
    subtitle: 'Read as they read.',
    hook: 'Band 8.5 is not a technique; it is a point of view. The writer who reaches it stops writing and starts reading — three anonymised essays a week, graded against the public descriptors, reconciled with the official score. The gap closes in the reconciliation.',
    theory:
      'The four Task 2 descriptors at Band 8.5. Task Response: fully addresses all parts; position is clear; ideas are fully developed; all claims are supported. Coherence and Cohesion: logical progression; referencing and substitution varied; paragraphing sufficient and appropriate. Lexical Resource: wide range, natural and sophisticated; flexible use of rare items; errors are rare. Grammatical Range and Accuracy: wide range of structures with full flexibility and accuracy; errors rare and minor. The Band 8.5 writer grades their own work against each descriptor on a scale, justifies every score, and revises before submission.',
    examples: [
      { text: 'The essay is clear. The argument flows. The vocabulary fits.', register: 'B1' },
      {
        text: 'The essay addresses both parts of the prompt, supports its claims with examples, and maintains a clear position throughout.',
        register: 'B2',
      },
      {
        text: 'While the essay fully addresses the prompt and supports its argument with appropriate examples, the argument in paragraph three relies on a single unsupported assertion — a descriptor-level weakness at 8.5, though not at 8.0.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'My essay is Band 8.5 because I used many advanced structures.',
        right:
          'My essay is Band 8.5 because it fully addresses the prompt, supports every claim, uses varied referencing, and maintains flexible grammatical range with rare errors.',
        why: 'Band 8.5 self-grading must cite the four descriptors — not a count of advanced structures.',
      },
      {
        wrong: 'The essay is well written and clear. Band 8.',
        right:
          'The essay addresses both parts of the prompt, supports its claims, and maintains cohesion with varied referencing — meeting the Band 8 descriptors for Task Response and Coherence.',
        why: 'Self-assessment must map to descriptors by name, not to impressions.',
      },
      {
        wrong: 'I graded the essay as 8.5 because my English teacher also graded it as 8.5.',
        right:
          'I graded the essay as 8.5 against the four Task 2 descriptors; this matched the official assessment, which I take as calibration for future essays.',
        why: 'Calibration is the point: reconcile your grading with the official one, don’t defer to it.',
      },
    ],
    practice: [
      {
        id: 'm12-1',
        kind: 'rewrite',
        prompt:
          'Convert to descriptor-based self-grading: "The essay is well-argued and reads smoothly."',
        answer:
          'The essay addresses both parts of the prompt; its argument progresses logically across paragraphs; cohesion is achieved without over-reliance on connectors.',
      },
      {
        id: 'm12-2',
        kind: 'choice',
        prompt: 'Which is the most useful self-assessment sentence?',
        choices: [
          'My essay feels like a Band 8.',
          'My essay addresses both parts of the prompt but the second paragraph relies on an unsupported assertion — this is a Band 8 weakness for Task Response.',
          'My essay has many advanced structures and should be Band 8.5.',
        ],
        answer:
          'My essay addresses both parts of the prompt but the second paragraph relies on an unsupported assertion — this is a Band 8 weakness for Task Response.',
      },
      {
        id: 'm12-3',
        kind: 'rewrite',
        prompt: 'Identify a Band 8 vs Band 8.5 gap in this claim: "The reform has succeeded."',
        answer:
          'Band 8.5 requires supporting evidence: "The reform, which reduced emissions by twelve per cent in the first year, has succeeded in its narrow target, although broader benefits remain to be demonstrated."',
      },
      {
        id: 'm12-4',
        kind: 'rewrite',
        prompt:
          'Self-grade this sentence against Coherence and Cohesion at Band 8.5: "The policy worked. The policy failed. The minister resigned."',
        answer:
          'At Band 8.5, three short sentences in sequence fail C&C: logical progression is implied but not shown. Rewrite: "The policy initially worked but later failed, and in response the minister resigned."',
      },
    ],
    extension: {
      prompt:
        'Read an anonymised Band 7.5–8.5 Task 2 essay you have not seen before. Grade it against the four descriptors on a scale of 7.0–9.0 for each, with one sentence of justification per score. Compare with the official band and record where your grading differed.',
      minWords: 200,
    },
    noticing: [
      {
        text: 'Descriptor-based self-grading',
        context:
          'Addresses the prompt; supports every claim; varies referencing; keeps flexible grammar range.',
      },
      {
        text: 'Reconciliation is the point',
        context: 'I take the official assessment as calibration for future essays.',
      },
      {
        text: 'Band 8 vs 8.5 gap',
        context: 'The second paragraph relies on an unsupported assertion.',
      },
      {
        text: 'C&C fail in short sequences',
        context: 'Rewrite as: "The policy initially worked but later failed."',
      },
      {
        text: 'Evidence lifts a claim',
        context:
          'The reform, which reduced emissions by twelve per cent in the first year, has succeeded in its narrow target.',
      },
    ],
    estimatedMinutes: 60,
    publishedAt: '2026-07-08',
  },
]
