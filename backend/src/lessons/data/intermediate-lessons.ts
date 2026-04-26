import type { Lesson } from '@shared/schemas/lesson'

export const INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 'i-w01-clause-architecture',
    day: 13,
    week: 1,
    phase: 1,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Sentence shapes and the clause.',
    subtitle: 'Before grammar, architecture.',
    hook: 'The four sentence types examiners recognise are simple, compound, complex, and compound-complex. A Band 6.5 essay with only simple sentences reads as thin. A Band 7 essay shows all four, deployed deliberately.',
    theory:
      'A clause has a subject and a finite verb. Simple sentence: one independent clause (The policy failed.). Compound: two independent clauses joined by a coordinator (The policy failed, but the minister remained.). Complex: one independent + one subordinate clause (The policy failed because funding was cut.). Compound-complex: two independent + at least one subordinate (The policy failed because funding was cut, and the minister resigned.). Subordinators introduce subordinate clauses: because, although, if, when, while, since, unless, after, before, whereas. Every Task 2 body paragraph benefits from at least one complex sentence.',
    examples: [
      { text: 'The bill passed, although the opposition voted against it.', register: 'B1' },
      {
        text: 'Although the legislation was controversial, it was eventually ratified by a narrow margin.',
        register: 'B2',
      },
      {
        text: 'Whereas earlier reforms targeted tariffs alone, the present proposal addresses both tariffs and non-tariff barriers, and it has therefore drawn broader support.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The plan was approved, it was expensive.',
        right: 'The plan was approved, although it was expensive.',
        why: 'A comma splice — two independent clauses joined by a comma alone. Add a coordinator or subordinator.',
      },
      {
        wrong: 'Because he was late therefore he missed the meeting.',
        right: 'Because he was late, he missed the meeting.',
        why: 'Do not pair a subordinator with a conjunctive adverb (therefore). One is enough.',
      },
      {
        wrong: 'While I agree with the policy. I doubt its implementation.',
        right: 'While I agree with the policy, I doubt its implementation.',
        why: 'A subordinate clause cannot stand alone as a sentence. Join it to the main clause with a comma.',
      },
    ],
    practice: [
      {
        id: 'i1-1',
        kind: 'choice',
        prompt: 'Which sentence is compound-complex?',
        choices: [
          'The team arrived late, and they missed the opening speech.',
          'The team arrived late, and they missed the opening speech because traffic was heavy.',
          'Because traffic was heavy, the team arrived late.',
        ],
        answer:
          'The team arrived late, and they missed the opening speech because traffic was heavy.',
      },
      {
        id: 'i1-2',
        kind: 'rewrite',
        prompt:
          'Combine into a complex sentence: "The investment was significant. The returns were modest."',
        answer: 'Although the investment was significant, the returns were modest.',
      },
      {
        id: 'i1-3',
        kind: 'rewrite',
        prompt: 'Correct the comma splice: "The deadline was strict, we submitted early."',
        answer: 'The deadline was strict, so we submitted early.',
      },
      {
        id: 'i1-4',
        kind: 'gap-fill',
        prompt: '_____ funding is limited, the programme has reached more schools than expected.',
        answer: 'Although',
        explanation: '"Although" introduces concession — the main clause carries the surprise.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph on the impact of smartphones on education, using at least one of each sentence type (simple, compound, complex, compound-complex).',
      minWords: 90,
    },
    noticing: [
      {
        text: 'Comma splice fix with subordinator',
        context: 'Although the plan was approved, it was expensive.',
      },
      {
        text: 'Subordinator + comma + main clause',
        context: 'While I agree with the policy, I doubt its implementation.',
      },
      { text: 'Whereas for contrast', context: 'Whereas earlier reforms targeted tariffs alone…' },
      {
        text: 'Compound-complex shape',
        context:
          'The team arrived late, and they missed the opening speech because traffic was heavy.',
      },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-04-22',
  },
  {
    id: 'i-w02-four-conditionals',
    day: 14,
    week: 2,
    phase: 2,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Conditionals, all four types.',
    subtitle: 'If, then — and when.',
    hook: 'Zero for general truths, first for real futures, second for unreal presents, third for unreal pasts. The examiner expects all four in a Band 7 repertoire — and the mixed conditional on top.',
    theory:
      'Zero: If + present, present. (If water boils, it turns to steam.) First: If + present, will + base. (If it rains, the match will be postponed.) Second: If + past, would + base. (If I were rich, I would travel.) Third: If + past perfect, would have + past participle. (If we had left earlier, we would have caught the train.) Mixed: past condition, present result — If + past perfect, would + base. (If he had studied medicine, he would be a doctor now.) Use "were" (not "was") in second conditionals of hypothesis.',
    examples: [
      { text: 'If I had more time, I would learn another language.', register: 'B1' },
      {
        text: 'If the policy had been implemented earlier, the crisis would have been less severe.',
        register: 'B2',
      },
      {
        text: 'Were the council to approve the proposal, construction would commence within six months.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'If I would have money, I would travel.',
        right: 'If I had money, I would travel.',
        why: 'Never "would have" in the if-clause of a second conditional. Use simple past.',
      },
      {
        wrong: 'If she was the president, she would reform the system.',
        right: 'If she were the president, she would reform the system.',
        why: 'In formal conditionals of hypothesis, use "were" for all persons.',
      },
      {
        wrong: 'If it will rain, we will cancel the event.',
        right: 'If it rains, we will cancel the event.',
        why: 'The if-clause of a first conditional uses present simple, not "will".',
      },
    ],
    practice: [
      {
        id: 'i2-1',
        kind: 'gap-fill',
        prompt:
          'If the committee _____ (approve) the plan last year, construction _____ (be) complete by now.',
        answer: 'had approved · would be',
        explanation: 'Mixed: past cause, present result.',
      },
      {
        id: 'i2-2',
        kind: 'rewrite',
        prompt: 'Rewrite as a third conditional: "She did not study. She failed the exam."',
        answer: 'If she had studied, she would not have failed the exam.',
      },
      {
        id: 'i2-3',
        kind: 'rewrite',
        prompt:
          'Invert: "If the government were to announce new measures, markets would react quickly."',
        answer: 'Were the government to announce new measures, markets would react quickly.',
      },
      {
        id: 'i2-4',
        kind: 'choice',
        prompt: 'Which is a mixed conditional?',
        choices: [
          'If I had more time, I would travel.',
          'If he had studied medicine, he would be a doctor now.',
          'If she is late, we will leave without her.',
        ],
        answer: 'If he had studied medicine, he would be a doctor now.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph arguing that earlier action on climate policy would have produced different outcomes. Use at least one third conditional and one mixed conditional.',
      minWords: 90,
    },
    noticing: [
      { text: 'Zero conditional truth', context: 'If water boils, it turns to steam.' },
      {
        text: 'Second conditional with "were"',
        context: 'If she were the president, she would reform the system.',
      },
      {
        text: 'Mixed conditional shape',
        context: 'If he had studied medicine, he would be a doctor now.',
      },
      {
        text: 'Inverted conditional',
        context: 'Were the government to announce new measures, markets would react.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-04-29',
  },
  {
    id: 'i-w03-passive-purpose',
    day: 15,
    week: 3,
    phase: 2,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'The passive voice, used with purpose.',
    subtitle: 'When the agent steps aside.',
    hook: 'At Band 7, the passive is no longer a formula to memorise but a choice to make. Three clean reasons to prefer it; one clean reason to reject it.',
    theory:
      'Form the passive across every tense: is done, was done, is being done, was being done, has been done, had been done, will be done, will have been done, would be done. Choose it when (1) the agent is unknown or irrelevant, (2) you need to keep the topic consistent across sentences, or (3) you want to foreground the result. Reject it when the sentence would be shorter and clearer in the active — especially the padded reporting passive ("It has been suggested by many people that…").',
    examples: [
      { text: 'The report was submitted late.', register: 'B1' },
      {
        text: 'Several safety measures have been introduced in response to the incident.',
        register: 'B2',
      },
      {
        text: 'Had the protocols been reviewed annually, the vulnerability would have been identified sooner.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'It is believed by many people that the economy will recover soon.',
        right:
          'Many believe the economy will recover soon. (or: The economy is widely believed to be recovering.)',
        why: 'The padded reporting passive adds words without clarity. Prefer the active or a subject-level passive.',
      },
      {
        wrong: 'A decision was reached by the committee after debate.',
        right: 'The committee reached a decision after debate.',
        why: 'If the agent is important and short, keep the active voice.',
      },
      {
        wrong: 'The report was wrote last week.',
        right: 'The report was written last week.',
        why: 'Past participle of "write" is "written", not "wrote".',
      },
    ],
    practice: [
      {
        id: 'i3-1',
        kind: 'rewrite',
        prompt: 'Make passive (and drop the agent if unnecessary): "Someone has cleaned the room."',
        answer: 'The room has been cleaned.',
      },
      {
        id: 'i3-2',
        kind: 'rewrite',
        prompt:
          'Make active and concise: "It has been reported by analysts that inflation will rise."',
        answer: 'Analysts report that inflation will rise.',
      },
      {
        id: 'i3-3',
        kind: 'gap-fill',
        prompt: 'The legislation _____ (introduce) next March.',
        answer: 'will be introduced',
      },
      {
        id: 'i3-4',
        kind: 'choice',
        prompt: 'Which is most appropriate in formal academic prose?',
        choices: [
          'The policy is thought to be effective.',
          'People think the policy is effective.',
          'The policy is being thought as effective.',
        ],
        answer: 'The policy is thought to be effective.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph about recent changes to public transport in a city you know, using three passive constructions naturally, at least one without an agent.',
      minWords: 90,
    },
    noticing: [
      { text: 'Perfect passive', context: 'Several safety measures have been introduced.' },
      {
        text: 'Subject-level reporting passive',
        context: 'The policy is thought to be effective.',
      },
      {
        text: 'Inverted third-conditional passive',
        context:
          'Had the protocols been reviewed annually, the vulnerability would have been identified sooner.',
      },
      { text: 'Agentless passive', context: 'The report was submitted late.' },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-05-06',
  },
  {
    id: 'i-w04-relative-clauses',
    day: 16,
    week: 4,
    phase: 2,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Relative clauses — defining and non-defining.',
    subtitle: 'The single comma that moves a sentence from Band 6 to Band 7.',
    hook: 'A relative clause identifies or informs. The comma decides which. Miss the comma and your examiner notices — often in the first paragraph.',
    theory:
      'Defining relative clauses identify the noun and take no commas: The man who lives next door is a doctor. Non-defining relative clauses add extra information and are enclosed in commas: My father, who is a doctor, lives next door. Use who for people, which for things, that for either (but only in defining clauses), whose for possession, where for places, when for times. Drop the relative pronoun in defining clauses when it is the object: the book I read (= the book that I read).',
    examples: [
      { text: 'The woman who lives next door is a teacher.', register: 'B1' },
      { text: 'The policy, which was introduced in 2018, has had mixed results.', register: 'B2' },
      {
        text: 'The novelist, whose earlier work won the Booker, has since retreated from public life.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'My mother who is a teacher lives in Hue.',
        right: 'My mother, who is a teacher, lives in Hue.',
        why: 'There is only one mother — the clause is non-defining and needs commas.',
      },
      {
        wrong: 'The book, that I bought yesterday, is fascinating.',
        right: 'The book that I bought yesterday is fascinating.',
        why: 'Do not use "that" in a non-defining clause, and do not use commas in a defining clause.',
      },
      {
        wrong: 'She moved to a city where is very cold.',
        right: 'She moved to a city where the winters are very cold.',
        why: '"Where" introduces a clause — the clause needs a subject and a verb.',
      },
    ],
    practice: [
      {
        id: 'i4-1',
        kind: 'gap-fill',
        prompt: 'The novelist _____ won the prize is from Hanoi.',
        answer: 'who',
      },
      {
        id: 'i4-2',
        kind: 'rewrite',
        prompt: 'Combine: "I have a friend. She works in Paris."',
        answer: 'I have a friend who works in Paris.',
      },
      {
        id: 'i4-3',
        kind: 'choice',
        prompt: 'Which suggests there is only one sister?',
        choices: [
          'My sister who lives in Tokyo is a doctor.',
          'My sister, who lives in Tokyo, is a doctor.',
        ],
        answer: 'My sister, who lives in Tokyo, is a doctor.',
      },
      {
        id: 'i4-4',
        kind: 'rewrite',
        prompt:
          'Reduce to a defining clause without the pronoun: "The report that she wrote was convincing."',
        answer: 'The report she wrote was convincing.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph about a place that has changed over time, using at least two defining and one non-defining relative clause.',
      minWords: 90,
    },
    noticing: [
      { text: 'Defining — no commas', context: 'The woman who lives next door is a teacher.' },
      {
        text: 'Non-defining — commas',
        context: 'The policy, which was introduced in 2018, has had mixed results.',
      },
      { text: 'Whose + noun', context: 'The novelist, whose earlier work won the Booker.' },
      { text: 'Object pronoun dropped', context: 'The report she wrote was convincing.' },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-05-13',
  },
  {
    id: 'i-w05-noun-phrases',
    day: 17,
    week: 5,
    phase: 2,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Noun phrases and academic nominalisation.',
    subtitle: 'The longest word is a noun.',
    hook: 'Academic writing moves information from verbs to nouns. "The government decided rapidly" becomes "The government’s rapid decision". Packaged, topic-ready, and paragraph-linkable.',
    theory:
      'A noun phrase consists of a head noun and its modifiers (determiners, adjectives, prepositional phrases, relative clauses). Nominalisation converts a verb or adjective into a noun: decide → decision, rapid → rapidity. Academic writing prefers nominalisation for three reasons: it compresses ideas, it makes the idea the subject (better for topic management), and it lifts the register. Overuse produces fog — nominalise selectively, keep verbs for the main action.',
    examples: [
      { text: 'The city’s growth has caused traffic.', register: 'B1' },
      {
        text: 'The rapid expansion of the tourism industry has transformed coastal economies.',
        register: 'B2',
      },
      {
        text: 'The government’s systematic reduction of tariffs has produced a measurable increase in cross-border trade.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong:
          'The government decided that the policy should be changed, and this decision was made rapidly.',
        right:
          'The government’s rapid decision to change the policy took the industry by surprise.',
        why: 'The original sentence states and then restates. Nominalise to tighten.',
      },
      {
        wrong: 'The discussion of the proposal was had by the committee.',
        right:
          'The committee discussed the proposal. (or: The committee’s discussion of the proposal produced no consensus.)',
        why: 'Padded nominalisation with a weak verb ("was had") is worse than a clean active sentence.',
      },
      {
        wrong: 'The prime minister gave an approval to the project.',
        right:
          'The prime minister approved the project. (or: The prime minister’s approval of the project was unconditional.)',
        why: '"Give an approval" is false nominalisation — either keep the verb or nominalise fully.',
      },
    ],
    practice: [
      {
        id: 'i5-1',
        kind: 'rewrite',
        prompt: 'Nominalise: "The company grew rapidly, which surprised investors."',
        answer: 'The company’s rapid growth surprised investors.',
      },
      {
        id: 'i5-2',
        kind: 'rewrite',
        prompt:
          'Nominalise: "The council introduced new rules, and this affected local businesses."',
        answer: 'The council’s introduction of new rules affected local businesses.',
      },
      {
        id: 'i5-3',
        kind: 'choice',
        prompt: 'Which is the cleanest academic form?',
        choices: [
          'The government made a decision to invest in solar energy.',
          'The government’s decision to invest in solar energy was welcomed.',
          'The government gave an investment decision about solar energy.',
        ],
        answer: 'The government’s decision to invest in solar energy was welcomed.',
      },
      {
        id: 'i5-4',
        kind: 'rewrite',
        prompt:
          'Convert to a noun phrase subject: "The teachers were trained effectively. This improved student outcomes."',
        answer: 'The effective training of teachers improved student outcomes.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph on a recent policy change. Use at least three nominalisations, but keep the main verb in each sentence alive.',
      minWords: 90,
    },
    noticing: [
      {
        text: 'Possessive + nominalised head',
        context: 'The government’s rapid decision to change the policy.',
      },
      {
        text: 'Nominalised verb as subject',
        context: 'The rapid expansion of the tourism industry has transformed coastal economies.',
      },
      {
        text: 'False nominalisation to avoid',
        context: 'The prime minister approved the project.',
      },
      {
        text: 'Nominalisation packaged with "of"',
        context: 'The council’s introduction of new rules.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-05-20',
  },
  {
    id: 'i-w06-inversion',
    day: 18,
    week: 6,
    phase: 3,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Inversion for emphasis.',
    subtitle: 'Never before have examiners noticed so quickly.',
    hook: 'Inversion flips the usual subject–verb order to mark emphasis. Used once per paragraph, it earns Band 7.5. Used more often, it earns suspicion.',
    theory:
      'Two core patterns. Negative inversion: after a fronted negative adverbial (rarely, never, seldom, not only, little, no sooner), the auxiliary moves before the subject: Rarely have I seen such clarity. Conditional inversion: replace "if" with the auxiliary: Had the council approved earlier, the road would be complete. (= If the council had approved earlier…). Note the shape: Had/Were/Should + subject + rest. Do not combine "if" with inversion — it is one or the other.',
    examples: [
      { text: 'Never before have I read such a clear explanation.', register: 'B1' },
      { text: 'Not only did the policy fail, but it also damaged public trust.', register: 'B2' },
      {
        text: 'Had the treaty been ratified earlier, the coastal region would today exhibit a markedly reduced erosion profile.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'If had the council approved earlier, the road would be complete.',
        right: 'Had the council approved earlier, the road would be complete.',
        why: 'Do not use "if" with an inverted conditional — drop "if" and keep the inversion.',
      },
      {
        wrong: 'Rarely I have seen such dedication.',
        right: 'Rarely have I seen such dedication.',
        why: 'After a fronted negative adverbial, invert the auxiliary and subject.',
      },
      {
        wrong: 'Not only she was late, but she forgot the documents.',
        right: 'Not only was she late, but she forgot the documents.',
        why: 'Negative fronting requires inversion: was she, not she was.',
      },
    ],
    practice: [
      {
        id: 'i6-1',
        kind: 'rewrite',
        prompt: 'Invert: "I have never seen such a clear explanation."',
        answer: 'Never have I seen such a clear explanation.',
      },
      {
        id: 'i6-2',
        kind: 'rewrite',
        prompt:
          'Invert the conditional: "If the minister had resigned earlier, the crisis would have been avoided."',
        answer: 'Had the minister resigned earlier, the crisis would have been avoided.',
      },
      {
        id: 'i6-3',
        kind: 'choice',
        prompt: 'Which is correctly inverted?',
        choices: [
          'Not only the policy failed, but it damaged trust.',
          'Not only did the policy fail, but it damaged trust.',
          'Not only failed the policy, but it damaged trust.',
        ],
        answer: 'Not only did the policy fail, but it damaged trust.',
      },
      {
        id: 'i6-4',
        kind: 'rewrite',
        prompt: 'Rewrite with "little": "We knew very little about the risks."',
        answer: 'Little did we know about the risks.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph on a recent policy decision, using one negative inversion and one conditional inversion. Mark each with a brief note.',
      minWords: 90,
    },
    noticing: [
      { text: 'Negative inversion after "never"', context: 'Never have I seen such dedication.' },
      {
        text: 'Conditional inversion without "if"',
        context: 'Had the minister resigned earlier, the crisis would have been avoided.',
      },
      {
        text: '"Not only" inversion',
        context: 'Not only did the policy fail, but it damaged trust.',
      },
      { text: '"Little" as negative fronting', context: 'Little did we know about the risks.' },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-05-27',
  },
  {
    id: 'i-w07-clefts',
    day: 19,
    week: 7,
    phase: 3,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Cleft sentences and focus structures.',
    subtitle: 'It is the structure, not the word, that matters.',
    hook: 'A cleft sentence splits one clause into two and foregrounds the part you want to emphasise. It sounds natural only when the emphasis is real — otherwise it sounds ornamental.',
    theory:
      'It-cleft: It + be + X + that/who clause. It was the funding cut that caused the delay. What-cleft: What + clause + be + X. What caused the delay was the funding cut. Clefts foreground the element you want the reader to focus on. Use them to contrast, to introduce a topic, or to rebut. Do not use them when a plain sentence already puts the emphasis in the right place — "The funding cut caused the delay" is fine if that is the topic.',
    examples: [
      { text: 'It was the teacher who inspired me.', register: 'B1' },
      {
        text: 'What convinced the council was the economic analysis, not the public pressure.',
        register: 'B2',
      },
      {
        text: 'It is precisely the ambiguity of the legislation that has made its enforcement so inconsistent.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'It was he who he told me the news.',
        right: 'It was he who told me the news.',
        why: 'Do not repeat the subject inside the relative clause.',
      },
      {
        wrong: 'What the delay caused was the funding cut.',
        right: 'What caused the delay was the funding cut.',
        why: 'Word order in the what-clause must match the active clause it replaces.',
      },
      {
        wrong: 'It was because of the weather that the reason the trip was cancelled.',
        right: 'It was because of the weather that the trip was cancelled.',
        why: 'Do not add "the reason" after a because-clause in a cleft — the it-cleft already supplies the frame.',
      },
    ],
    practice: [
      {
        id: 'i7-1',
        kind: 'rewrite',
        prompt: 'Rewrite as an it-cleft foregrounding "the teacher": "The teacher inspired me."',
        answer: 'It was the teacher who inspired me.',
      },
      {
        id: 'i7-2',
        kind: 'rewrite',
        prompt:
          'Rewrite as a what-cleft foregrounding "the economic analysis": "The economic analysis convinced the council."',
        answer: 'What convinced the council was the economic analysis.',
      },
      {
        id: 'i7-3',
        kind: 'choice',
        prompt: 'Which is a correctly formed cleft?',
        choices: [
          'It was the minister that she resigned yesterday.',
          'It was the minister who resigned yesterday.',
          'It was the minister that who resigned yesterday.',
        ],
        answer: 'It was the minister who resigned yesterday.',
      },
      {
        id: 'i7-4',
        kind: 'rewrite',
        prompt: 'Convert to an it-cleft foregrounding "in 2020": "The project began in 2020."',
        answer: 'It was in 2020 that the project began.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph on a debate in which the real cause is misidentified. Use one it-cleft and one what-cleft.',
      minWords: 90,
    },
    noticing: [
      { text: 'It-cleft foregrounding a noun', context: 'It was the teacher who inspired me.' },
      {
        text: 'What-cleft foregrounding a subject',
        context: 'What convinced the council was the economic analysis.',
      },
      { text: 'It-cleft foregrounding time', context: 'It was in 2020 that the project began.' },
      {
        text: 'It-cleft for emphasis of cause',
        context:
          'It is precisely the ambiguity of the legislation that has made its enforcement inconsistent.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-06-03',
  },
  {
    id: 'i-w08-hedging',
    day: 20,
    week: 8,
    phase: 3,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Hedging, modality, and cautious claims.',
    subtitle: 'Certainty is a register, not a virtue.',
    hook: 'At Band 5, a writer is certain of everything. At Band 7, a writer is certain of one or two things, and carefully hedges the rest. Examiners reward measured claims — they mistrust absolute ones.',
    theory:
      'Three hedge families. Modal verbs: may, might, could, would, should. Epistemic adverbs: possibly, probably, arguably, apparently. Hedging verbs: seem, appear, suggest, indicate, tend to. Combine one from each family for a C1 register: It would appear that the policy may be producing mixed results. Avoid stacking too many — two is confident hedging, three is timid hedging. Never combine a hedge with an absolute (possibly definitely, probably certainly) — the reader notices.',
    examples: [
      { text: 'The policy may succeed.', register: 'B1' },
      { text: 'The data suggest that the policy is probably reducing emissions.', register: 'B2' },
      {
        text: 'It would appear that the reform, while welcome, may not address the underlying structural concerns.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The policy possibly definitely will succeed.',
        right: 'The policy will probably succeed. (or: The policy may well succeed.)',
        why: 'Possibly and definitely contradict each other. Choose one register.',
      },
      {
        wrong: 'Many people thinks that the economy will probably recovers.',
        right: 'Many believe that the economy will probably recover.',
        why: 'Modal + base verb (will recover). Also "think", not "thinks", for a plural subject.',
      },
      {
        wrong: 'The data shows obviously that the policy fails.',
        right: 'The data suggest that the policy is failing.',
        why: '"Obviously" and "fails" together remove all hedge. In academic writing, suggest + continuous is cleaner.',
      },
    ],
    practice: [
      {
        id: 'i8-1',
        kind: 'rewrite',
        prompt: 'Add appropriate hedging: "The policy is effective."',
        answer: 'The policy appears to be largely effective.',
      },
      {
        id: 'i8-2',
        kind: 'choice',
        prompt: 'Which is the most natural hedged claim?',
        choices: [
          'The economy maybe will possibly recover.',
          'The economy may recover within a year.',
          'The economy will definitely possibly recover.',
        ],
        answer: 'The economy may recover within a year.',
      },
      {
        id: 'i8-3',
        kind: 'rewrite',
        prompt: 'Rewrite using "it would appear that": "The policy fails in rural areas."',
        answer: 'It would appear that the policy is failing in rural areas.',
      },
      {
        id: 'i8-4',
        kind: 'gap-fill',
        prompt: 'The findings _____ that further investigation is warranted.',
        answer: 'suggest',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph on a contested topic (e.g. the benefits of social media for young people). Make no unqualified claims — use at least four hedges across three families.',
      minWords: 90,
    },
    noticing: [
      { text: 'Epistemic modal', context: 'The policy may succeed.' },
      {
        text: 'Hedging verb',
        context: 'The data suggest that the policy is probably reducing emissions.',
      },
      {
        text: 'Stacked C1 hedge',
        context: 'It would appear that the reform may not address the underlying concerns.',
      },
      { text: 'Never stack hedge + absolute', context: 'The policy will probably succeed.' },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-06-10',
  },
  {
    id: 'i-w09-cohesion-beyond',
    day: 21,
    week: 9,
    phase: 3,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Cohesion beyond connectors.',
    subtitle: 'The sentence remembers the one before it.',
    hook: 'Band 6 writers lean on connectors (however, moreover, therefore). Band 7 writers bind paragraphs with reference, substitution, and lexical chains — the quieter cohesion examiners reward.',
    theory:
      'Reference: pronouns and demonstratives that point backward. "The council approved the plan. This marked a reversal." (this = the approval). Substitution: one, ones, do so, did so — replace repeated nouns or verb phrases. "Some candidates prepare for weeks; others do not." Lexical chains: repeat a topic using synonyms and related terms (policy → reform → initiative → measure). Use connectors sparingly — no more than one per paragraph at C1. Over-connected prose feels chopped.',
    examples: [
      { text: 'The team finished the report. They submitted it on Monday.', register: 'B1' },
      {
        text: 'The council approved the plan in March. This marked a decisive shift from earlier policy.',
        register: 'B2',
      },
      {
        text: 'The reform encountered opposition. Detractors argued it would harm small businesses; supporters countered that the same measure would, over time, benefit them.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong:
          'The council approved the plan. Then, however, moreover, the council implemented it.',
        right: 'The council approved the plan and, within weeks, implemented it.',
        why: 'Connector pile-up. Merge into one clause.',
      },
      {
        wrong: 'Some students prefer online courses. Other students prefer traditional courses.',
        right: 'Some students prefer online courses; others prefer traditional ones.',
        why: 'Substitute "students" with "others" and "courses" with "ones" to avoid repetition.',
      },
      {
        wrong: 'The teacher explained the topic. The topic was difficult.',
        right: 'The teacher explained the topic, which was difficult.',
        why: 'Bind with a relative clause rather than restating the noun.',
      },
    ],
    practice: [
      {
        id: 'i9-1',
        kind: 'rewrite',
        prompt:
          'Replace the repetition with substitution: "I prefer the new textbooks. The new textbooks are clearer."',
        answer:
          'I prefer the new textbooks; they are clearer. (or: I prefer the new textbooks — the ones introduced this year are clearer.)',
      },
      {
        id: 'i9-2',
        kind: 'rewrite',
        prompt:
          'Use reference: "The government announced new regulations. The new regulations took effect in July."',
        answer: 'The government announced new regulations, which took effect in July.',
      },
      {
        id: 'i9-3',
        kind: 'choice',
        prompt: 'Which demonstrative is most natural?',
        choices: [
          'The plan was approved in March. That marked a shift.',
          'The plan was approved in March. This marked a shift.',
          'The plan was approved in March. It marked a shift.',
        ],
        answer: 'The plan was approved in March. This marked a shift.',
      },
      {
        id: 'i9-4',
        kind: 'rewrite',
        prompt:
          'Use a lexical chain (synonym): "The legislation was controversial. The legislation was eventually passed."',
        answer: 'The legislation was controversial; the bill was nonetheless passed.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a change in your city. Use at least one demonstrative, one substitution, and a two-step lexical chain. No more than one connector.',
      minWords: 100,
    },
    noticing: [
      { text: 'Demonstrative reference', context: 'The plan was approved. This marked a shift.' },
      { text: 'Substitution with "one"', context: 'Some prefer the new ones.' },
      {
        text: 'Substitution with "do so"',
        context: 'Others chose to resign; some did so reluctantly.',
      },
      {
        text: 'Lexical chain across sentences',
        context: 'The legislation was controversial; the bill was nonetheless passed.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-06-17',
  },
  {
    id: 'i-w10-concession-timed',
    day: 22,
    week: 10,
    phase: 4,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Concession patterns under timed conditions.',
    subtitle: 'Although, despite, and while — used once each.',
    hook: 'Concession is not agreement. It acknowledges a counter-position and then pivots. The examiner expects at least one clean concession in a Band 7 essay — and at most one "although-but" error before the score drops.',
    theory:
      'Three concession forms. Subordinator + clause: Although the policy is costly, it has produced results. Preposition + noun phrase: Despite the cost, the policy has produced results. Contrastive conjunct: The policy is costly; however, it has produced results. Key rule: never pair "although" with "but" in the same sentence. The Vietnamese tuy…nhưng… carries over; English keeps only one marker.',
    examples: [
      { text: 'Although it was raining, we walked.', register: 'B1' },
      {
        text: 'Despite the initial resistance, the reform was eventually welcomed.',
        register: 'B2',
      },
      {
        text: 'Granted that the initiative has met certain targets, its broader social impact remains contested.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Although the policy was expensive, but it produced results.',
        right: 'Although the policy was expensive, it produced results.',
        why: 'Never pair "although" with "but" in the same sentence.',
      },
      {
        wrong: 'Despite of the cost, the policy succeeded.',
        right: 'Despite the cost, the policy succeeded.',
        why: '"Despite" takes no "of". The preposition is already there.',
      },
      {
        wrong: 'While I agree with the policy but I doubt its implementation.',
        right: 'While I agree with the policy, I doubt its implementation.',
        why: '"While" is already concessive. Do not add "but".',
      },
    ],
    practice: [
      {
        id: 'i10-1',
        kind: 'rewrite',
        prompt: 'Rewrite with "despite": "The weather was bad. We continued the hike."',
        answer: 'Despite the bad weather, we continued the hike.',
      },
      {
        id: 'i10-2',
        kind: 'rewrite',
        prompt:
          'Rewrite with "although": "Despite the delays, the project was completed on budget."',
        answer: 'Although there were delays, the project was completed on budget.',
      },
      {
        id: 'i10-3',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'Although he was tired but he kept working.',
          'Although he was tired, he kept working.',
          'Despite he was tired, he kept working.',
        ],
        answer: 'Although he was tired, he kept working.',
      },
      {
        id: 'i10-4',
        kind: 'rewrite',
        prompt:
          'Use "granted that": "The policy has met its targets. Its social impact remains contested."',
        answer: 'Granted that the policy has met its targets, its social impact remains contested.',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph on a controversial policy. Include one "although" concession, one "despite" concession, and one "however" pivot.',
      minWords: 90,
    },
    noticing: [
      {
        text: 'Although + clause',
        context: 'Although the policy was expensive, it produced results.',
      },
      { text: 'Despite + noun phrase', context: 'Despite the cost, the policy succeeded.' },
      {
        text: 'Granted that (C1)',
        context:
          'Granted that the initiative has met its targets, its broader impact remains contested.',
      },
      { text: 'Never pair although with but', context: 'Although he was tired, he kept working.' },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-06-24',
  },
  {
    id: 'i-w11-cause-consequence',
    day: 23,
    week: 11,
    phase: 4,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'Cause, consequence, and the discipline of so.',
    subtitle: 'Because earns its place or it is cut.',
    hook: 'Cause-and-consequence linking is one of the four Task 2 band descriptors. The examiner is counting: how many causes do you link, and how precisely?',
    theory:
      'Four cause-marker families. Subordinators: because, since, as, given that. Prepositions: due to, owing to, on account of. Conjuncts: therefore, consequently, as a result, thus. Verbs: cause, result in, lead to, give rise to, bring about. Rule of thumb for Task 2: use "because" for clauses, "due to" for noun phrases, "therefore" for conclusions, and a causal verb when the cause-effect pairing is the topic of the sentence. Reserve "so" for spoken or simple registers — avoid it in a formal body paragraph.',
    examples: [
      { text: 'The traffic is heavy, so I left early.', register: 'B1' },
      { text: 'Owing to the funding cut, the programme was scaled back.', register: 'B2' },
      {
        text: 'The legislation gave rise to a broader debate over the balance between innovation and regulation.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Because of the company expanded, profits rose.',
        right: 'Because the company expanded, profits rose.',
        why: '"Because of" takes a noun phrase; "because" takes a clause. You cannot combine them.',
      },
      {
        wrong: 'Due to he was late, the meeting started without him.',
        right: 'Because he was late, the meeting started without him.',
        why: '"Due to" is a preposition — it takes a noun phrase, not a clause.',
      },
      {
        wrong: 'The strike caused to the delay.',
        right: 'The strike caused the delay.',
        why: '"Cause" is transitive — no "to" before the object.',
      },
    ],
    practice: [
      {
        id: 'i11-1',
        kind: 'rewrite',
        prompt:
          'Rewrite with "owing to": "The flights were cancelled because the weather was severe."',
        answer: 'The flights were cancelled owing to severe weather.',
      },
      {
        id: 'i11-2',
        kind: 'gap-fill',
        prompt: 'The strike _____ (lead) to a significant loss of revenue.',
        answer: 'led',
      },
      {
        id: 'i11-3',
        kind: 'choice',
        prompt: 'Which is formally correct in a Task 2 body paragraph?',
        choices: ['So the policy succeeded.', 'Therefore, the policy succeeded.'],
        answer: 'Therefore, the policy succeeded.',
      },
      {
        id: 'i11-4',
        kind: 'rewrite',
        prompt: 'Correct: "Due to he didn’t study, he failed."',
        answer:
          'Because he did not study, he failed. (or: Due to his lack of preparation, he failed.)',
      },
    ],
    extension: {
      prompt:
        'Write a 90-word paragraph explaining one major social change in your country. Use at least one "owing to", one "as a result", and one causal verb (lead to, result in, give rise to).',
      minWords: 90,
    },
    noticing: [
      { text: 'because + clause', context: 'Because the company expanded, profits rose.' },
      { text: 'due to + noun phrase', context: 'Due to his lack of preparation, he failed.' },
      {
        text: 'causal verb "give rise to"',
        context: 'The legislation gave rise to a broader debate.',
      },
      { text: 'Reserve "so" for low register', context: 'The traffic is heavy, so I left early.' },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-07-01',
  },
  {
    id: 'i-w12-mixed-error-drill',
    day: 24,
    week: 12,
    phase: 4,
    discipline: 'grammar',
    level: 'intermediate',
    title: 'The mixed-error drill.',
    subtitle: 'Every examiner looks for the same five mistakes.',
    hook: 'Five errors account for most of the gap between Band 6 and Band 7 in Vietnamese candidates: verb tense, article, subject-verb agreement, connector pairing, and nominalisation misfire. Find them in your writing, fix them in drafts, and they stop appearing.',
    theory:
      'The five families in order of frequency. (1) Tense drift — past narrative slipping into present. (2) Article misuse — missing "the" on specific referents. (3) Subject-verb agreement — distractor phrases fooling the verb. (4) Connector pairing — although/but, because/so, despite/but. (5) False nominalisation — "gave an approval" instead of "approved". Drill the five every week of Phase IV. In the examination, a single pass over your draft looking only for these five lifts the band by 0.5 on average.',
    examples: [
      { text: 'She went to the market and she buy fish.', register: 'B1' },
      {
        text: 'The government has introduced new policies, which have had mixed results.',
        register: 'B2',
      },
      {
        text: 'Although the committee reviewed the proposal, it did not grant formal approval, and a revised draft was subsequently requested.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The policy was successful although it was expensive but it needs review.',
        right: 'Although the policy was successful, it was expensive and now requires review.',
        why: 'Connector chain: although + but is a pairing error. Rebuild.',
      },
      {
        wrong: 'Every one of the students were prepared.',
        right: 'Every one of the students was prepared.',
        why: 'Subject-verb agreement with "every one" — always singular.',
      },
      {
        wrong: 'Government announced decision yesterday.',
        right: 'The government announced the decision yesterday.',
        why: 'Two missing articles: "the" before government (specific) and "the" before decision (already known).',
      },
    ],
    practice: [
      {
        id: 'i12-1',
        kind: 'rewrite',
        prompt:
          'Correct all errors: "Because he was late so he miss the meeting and he didn’t received any information."',
        answer: 'Because he was late, he missed the meeting and did not receive any information.',
      },
      {
        id: 'i12-2',
        kind: 'rewrite',
        prompt: 'Correct: "Government decision about new law are controversial."',
        answer: 'The government’s decision about the new law is controversial.',
      },
      {
        id: 'i12-3',
        kind: 'rewrite',
        prompt:
          'Correct the tense drift: "Yesterday the council meets and decide to approve the budget."',
        answer: 'Yesterday the council met and decided to approve the budget.',
      },
      {
        id: 'i12-4',
        kind: 'rewrite',
        prompt: 'Correct the nominalisation: "She made a suggestion to improve the programme."',
        answer:
          'She suggested improvements to the programme. (or: Her suggestion to improve the programme was adopted.)',
      },
    ],
    extension: {
      prompt:
        'Write a 120-word paragraph arguing whether governments should subsidise renewable energy. After writing, run the five-error check and list every correction you made.',
      minWords: 120,
    },
    noticing: [
      { text: 'Tense drift into present', context: 'Yesterday the council met and decided.' },
      { text: 'Missing "the" on specific', context: 'The government announced the decision.' },
      { text: 'Agreement with "every one of"', context: 'Every one of the students was prepared.' },
      {
        text: 'Although/but pairing error',
        context: 'Although the policy was successful, it was expensive.',
      },
      { text: 'Verb over nominalisation', context: 'She suggested improvements to the programme.' },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-07-08',
  },
]
