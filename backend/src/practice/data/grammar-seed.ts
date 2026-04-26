interface GrammarSeed {
  text: string
  /** The `context` field on the NoticingItem \u2014 a single canonical example sentence. */
  context: string
  /** Stored in `note`. Two lines: "Formula \u2014 \u2026" and "Use \u2014 \u2026". */
  note: string
  sourceRef: string
}

export const GRAMMAR_SYSTEM_ITEMS: GrammarSeed[] = [
  {
    text: 'Mixed conditionals',
    context:
      'If he had studied harder at university, he would be fluent in three languages by now.',
    note: 'Formula — If + past perfect, would/could/might + base verb.\nUse — A past cause with a present result.',
    sourceRef: 'Lesson № 001',
  },
  {
    text: 'Subordinate clauses',
    context: 'Although the evidence is compelling, caution is advised when drawing conclusions.',
    note: 'Formula — [Main clause] + subordinator (although, because, while, if) + [subordinate clause].\nUse — Signal hierarchy between two ideas; the subordinate one supports the main.',
    sourceRef: 'Lesson № 002',
  },
  {
    text: 'Inversion after negative adverbs',
    context: 'Rarely have I encountered a clearer example of academic writing.',
    note: 'Formula — Negative adverb (rarely, seldom, never, hardly, no sooner) + auxiliary + subject + verb.\nUse — Formal emphasis to open a sentence memorably.',
    sourceRef: 'Lesson № 003',
  },
  {
    text: 'Participle clauses',
    context: 'Having outlined the problem, the candidate now proposes a solution.',
    note: 'Formula — Having + past participle, [subject] + verb (or V-ing, …).\nUse — Compress two clauses into one for academic concision.',
    sourceRef: 'Lesson № 004',
  },
  {
    text: 'Cleft sentences',
    context: 'It is the quality of teaching that matters most, not the quantity.',
    note: 'Formula — It is/was + emphasised element + that/who + rest of the clause.\nUse — Focus attention on one element, usually to counter an expected claim.',
    sourceRef: 'Lesson № 005',
  },
  {
    text: 'Passive voice',
    context: 'A new environmental policy has been introduced by the government this year.',
    note: 'Formula — be + past participle (+ by + agent, when relevant).\nUse — Depersonalise a claim or shift focus from doer to action.',
    sourceRef: 'Lesson № 006',
  },
  {
    text: 'Reported speech',
    context: 'She claimed that climate change would affect every region by 2050.',
    note: 'Formula — reporting verb (said, claimed, argued) + (that) + clause with backshifted tense.\nUse — Summarise what someone said without quoting them directly.',
    sourceRef: 'Lesson № 007',
  },
  {
    text: 'Present perfect vs past simple',
    context:
      'Scientists have warned about this risk for decades; the first paper appeared in 1988.',
    note: 'Formula — have/has + past participle (unfinished time) vs V-ed (finished time).\nUse — Distinguish a period reaching into now from a closed past moment.',
    sourceRef: 'Lesson № 008',
  },
  {
    text: 'First, second, and third conditionals',
    context: 'If governments invest in education, society benefits over the long term.',
    note: 'Formula — If + present / past / past perfect, will / would / would have + verb.\nUse — Map real, hypothetical, and impossible possibilities.',
    sourceRef: 'Lesson № 009',
  },
  {
    text: 'Relative clauses (defining vs non-defining)',
    context:
      'Cities, which house two-thirds of the global population, require urgent infrastructure planning.',
    note: 'Formula — noun + who/which/that + clause (defining, no commas) vs noun, who/which, + clause (non-defining, commas).\nUse — Add information about a noun; commas change whether it is essential.',
    sourceRef: 'Lesson № 010',
  },
  {
    text: 'Articles (a / an / the)',
    context: 'The government must address the issue of poverty before addressing other priorities.',
    note: 'Formula — a/an (first mention, non-specific) · the (specific or shared) · ∅ (general plural or uncountable).\nUse — Signal whether a noun is new, known, or meant generally.',
    sourceRef: 'Lesson № 011',
  },
  {
    text: 'Modals of speculation (past)',
    context: 'The sudden drop in 2008 must have been caused by the financial crisis.',
    note: 'Formula — must/might/could + have + past participle.\nUse — Make a deduction about a past event with varying certainty.',
    sourceRef: 'Lesson № 012',
  },
  {
    text: 'Modals of obligation',
    context: 'Students should take responsibility for their own learning outside the classroom.',
    note: 'Formula — must / have to / should / ought to + base verb.\nUse — Mark external rule (must / have to) vs personal opinion (should / ought to).',
    sourceRef: 'Lesson № 013',
  },
  {
    text: 'Gerund vs infinitive',
    context: 'The minister refused to comment but admitted feeling concerned about the delay.',
    note: 'Formula — verb + V-ing vs verb + to + V (pattern memorised per verb: enjoy doing, refuse to do).\nUse — Match a verb to its required complement; changing form can change meaning (stop doing ≠ stop to do).',
    sourceRef: 'Lesson № 014',
  },
  {
    text: 'Future forms',
    context: 'By 2050, the global population will have surpassed nine billion.',
    note: 'Formula — will (prediction) · be going to (plan) · present continuous (arrangement) · will have + past participle (completion by a point).\nUse — Four futures for four registers; pick the one the sentence actually means.',
    sourceRef: 'Lesson № 015',
  },
  {
    text: 'Nominalisation',
    context:
      "The government's decision to invest in renewable energy sparked considerable public debate.",
    note: 'Formula — verb + clause → deverbal noun phrase (decide → the decision, govern → governance).\nUse — Compress spoken-feeling sentences into academic register.',
    sourceRef: 'Lesson № 016',
  },
  {
    text: 'Hedging language',
    context:
      'Technology may, to some extent, contribute to social isolation, though the evidence is mixed.',
    note: 'Formula — may / might / tend to / appear + base verb · arguably · to some extent.\nUse — Claim less so the reader trusts you more.',
    sourceRef: 'Lesson № 017',
  },
  {
    text: 'Concessive clauses',
    context:
      'Despite the considerable cost, the programme has proven valuable for rural communities.',
    note: 'Formula — Although / Even though / Whereas + clause, [main clause] · Despite / In spite of + noun phrase, [main clause].\nUse — Acknowledge the counter-view without conceding your position.',
    sourceRef: 'Lesson № 018',
  },
  {
    text: 'Cause and result structures',
    context:
      'The policy is so controversial that it has effectively split the parliamentary committee.',
    note: 'Formula — so + adjective/adverb + that + clause · such + noun phrase + that + clause · so as to / in order to + base verb.\nUse — Link intensity to a result, or cause to a purpose.',
    sourceRef: 'Lesson № 019',
  },
  {
    text: 'Comparatives in argument',
    context: 'The more society consumes, the more resources it inevitably wastes.',
    note: 'Formula — far / much / by far + comparative · the + comparative, the + comparative.\nUse — Emphatic or proportional comparison; reads as Band 7+.',
    sourceRef: 'Lesson № 020',
  },
  {
    text: 'Emphasis with auxiliary do',
    context: 'The government does recognise the urgency of the climate crisis.',
    note: 'Formula — do / does / did + base verb (stressed in speech, or used to contradict).\nUse — Insist on a contested claim without raising the volume.',
    sourceRef: 'Lesson № 021',
  },
  {
    text: 'Subject–verb agreement with quantifiers',
    context: 'A number of factors are involved in the decline of traditional industries.',
    note: 'Formula — A number of + plural noun → plural verb · The number of + plural noun → singular verb · None of / each of + singular verb (usually).\nUse — Match the verb to the semantic head, not the surface word.',
    sourceRef: 'Lesson № 022',
  },
  {
    text: 'Countable and uncountable nouns',
    context:
      'The latest research provides strong evidence for the link between diet and longevity.',
    note: 'Formula — advice · research · information · evidence · knowledge = uncountable (no plural, no a/an; use much / a piece of).\nUse — Avoid the single most common Band 6 error in Task 2.',
    sourceRef: 'Lesson № 023',
  },
  {
    text: 'Task 1 tense range',
    context:
      'Sales rose sharply in 2010 and have continued climbing ever since, reaching a record high last year.',
    note: 'Formula — past simple + past perfect (history) · present simple (constants) · future forms (projections).\nUse — Describe trends that move across time without tense-clash.',
    sourceRef: 'Lesson № 024',
  },
]
