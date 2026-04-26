import type { Lesson } from '@shared/schemas/lesson'

export const ADVANCED_LESSONS: Lesson[] = [
  {
    id: 'a-w01-clause-depth',
    day: 25,
    week: 1,
    phase: 1,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Clause architecture at depth.',
    subtitle: 'A sentence is a hierarchy, not a list.',
    hook: 'At Band 7.5, a sentence is a three-level structure: main clause on top, one or two subordinate clauses below, each potentially embedding a further clause. Diagram your own sentences and the depth shows.',
    theory:
      'A complex sentence can subordinate at multiple levels. Level 1: main clause. Level 2: subordinate clause (because, although, which, that). Level 3: a clause nested inside the level-2 subordinate. Example: "The council approved the plan [that the committee had proposed [when funding became available]]." Overly deep nesting loses readers; the sweet spot is two levels, with occasional three. At Band 7.5, deliberate use of subordination markers (whereas, albeit, inasmuch as, in so far as) demonstrates grammar range.',
    examples: [
      {
        text: 'The reform, which was welcomed by educators, survived the political change that followed.',
        register: 'B1',
      },
      {
        text: 'The committee, whose recommendations were ignored when the budget was cut, has since reconvened.',
        register: 'B2',
      },
      {
        text: 'Whereas earlier proposals addressed only the tariffs that had proved contentious, the present draft extends its scope to the non-tariff measures that had, until recently, escaped scrutiny.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong:
          'The plan that was approved which the committee recommended which had been drafted last year was finally enacted.',
        right:
          'The plan — recommended by the committee and drafted last year — was finally enacted.',
        why: 'Three nested relative clauses. Refactor with parenthetical dashes or a participial phrase.',
      },
      {
        wrong: 'Albeit the proposal was controversial, it was approved.',
        right:
          'Albeit controversial, the proposal was approved. (or: Although the proposal was controversial, it was approved.)',
        why: '"Albeit" introduces an adjectival phrase, not a full clause.',
      },
      {
        wrong: 'In so far as that the evidence is limited, the claim needs caution.',
        right: 'In so far as the evidence is limited, the claim needs caution.',
        why: '"In so far as" is already a complete subordinator — do not add "that".',
      },
    ],
    practice: [
      {
        id: 'a1-1',
        kind: 'rewrite',
        prompt:
          'Refactor to reduce nesting: "The report that was commissioned by the council that received funding from the ministry was delayed."',
        answer:
          'The ministry-funded council commissioned the report, which was delayed. (or: The report, commissioned by the council with ministry funding, was delayed.)',
      },
      {
        id: 'a1-2',
        kind: 'rewrite',
        prompt:
          'Use "whereas" for contrast: "Earlier proposals addressed tariffs. The present draft also addresses non-tariff measures."',
        answer:
          'Whereas earlier proposals addressed only tariffs, the present draft also addresses non-tariff measures.',
      },
      {
        id: 'a1-3',
        kind: 'choice',
        prompt: 'Which sentence uses "albeit" correctly?',
        choices: [
          'Albeit the proposal was controversial, it was approved.',
          'Albeit controversial, the proposal was approved.',
          'The proposal was approved, albeit it was controversial.',
        ],
        answer: 'Albeit controversial, the proposal was approved.',
      },
      {
        id: 'a1-4',
        kind: 'rewrite',
        prompt:
          'Combine into a two-level complex sentence: "The committee reconvened. Its recommendations had been ignored. The budget had been cut."',
        answer:
          'The committee, whose recommendations had been ignored when the budget was cut, has since reconvened.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on an institutional decision. Include one two-level complex sentence, one "whereas" clause, and one "albeit" phrase.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'Two-level subordination',
        context:
          'The committee, whose recommendations were ignored when the budget was cut, has since reconvened.',
      },
      {
        text: 'Whereas for formal contrast',
        context: 'Whereas earlier proposals addressed only tariffs…',
      },
      { text: 'Albeit + adjective', context: 'Albeit controversial, the proposal was approved.' },
      {
        text: 'Limits on nesting',
        context: 'The ministry-funded council commissioned the report, which was delayed.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-04-22',
  },
  {
    id: 'a-w02-mixed-conditionals',
    day: 26,
    week: 2,
    phase: 2,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Advanced conditionals and mixed reference.',
    subtitle: 'If he had, she would now.',
    hook: 'Mixed conditionals tie a past cause to a present result — the precise grammar of counterfactual argument. "Had the council approved earlier, the city would today have a working metro." Examiners reward the shape because it signals causal reasoning.',
    theory:
      'Past → present: If + past perfect, would + base. (If the minister had resigned, the crisis would now be contained.) Present → past: If + past, would have + past participle. (If he were more decisive, he would have acted sooner.) Inverted forms: Had + subject + past participle; Were + subject + infinitive; Should + subject + base. These drop "if" for a formal tone. Conditional alternatives: were it not for, had it not been for — both accept a noun phrase. "Were it not for the funding delay, the project would be complete."',
    examples: [
      { text: 'If she had taken the earlier train, she would be home by now.', register: 'B1' },
      {
        text: 'If the policy had been introduced ten years ago, we would today have a different infrastructure.',
        register: 'B2',
      },
      {
        text: 'Were it not for the sustained investment of the preceding decade, the region would now exhibit far deeper vulnerabilities.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'If he had been more decisive, the crisis is now contained.',
        right: 'If he had been more decisive, the crisis would now be contained.',
        why: 'The present consequence of a past unreal condition requires "would + base", not a plain present.',
      },
      {
        wrong: 'Had the minister did resigned, the crisis would have been avoided.',
        right: 'Had the minister resigned, the crisis would have been avoided.',
        why: 'In the inverted form, drop the auxiliary "did" — inversion replaces the "if".',
      },
      {
        wrong:
          'Were it not for the fact that the funding was delayed, the project would be complete.',
        right: 'Were it not for the funding delay, the project would be complete.',
        why: '"Were it not for" takes a clean noun phrase — no "the fact that".',
      },
    ],
    practice: [
      {
        id: 'a2-1',
        kind: 'gap-fill',
        prompt:
          'Had the committee _____ (review) the proposal annually, the weakness _____ (identify) sooner.',
        answer: 'reviewed · would have been identified',
      },
      {
        id: 'a2-2',
        kind: 'rewrite',
        prompt:
          'Rewrite with "were it not for": "If the sustained investment of the last decade had not been there, the region would be vulnerable."',
        answer:
          'Were it not for the sustained investment of the last decade, the region would be vulnerable.',
      },
      {
        id: 'a2-3',
        kind: 'rewrite',
        prompt:
          'Rewrite as a mixed conditional: "The road was not built earlier. Traffic is bad today."',
        answer: 'If the road had been built earlier, traffic would not be bad today.',
      },
      {
        id: 'a2-4',
        kind: 'choice',
        prompt:
          'Which correctly inverts "If the council should reject the proposal, we would revise it"?',
        choices: [
          'Should the council reject the proposal, we would revise it.',
          'If should the council reject the proposal, we would revise it.',
          'The council should reject the proposal, we would revise it.',
        ],
        answer: 'Should the council reject the proposal, we would revise it.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph arguing that a past policy would have produced a different present. Use one mixed conditional (past→present), one inverted conditional, and one "were it not for" structure.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'Past cause, present result',
        context:
          'If the policy had been introduced ten years ago, we would today have a different infrastructure.',
      },
      {
        text: 'Inverted third conditional',
        context: 'Had the minister resigned, the crisis would have been avoided.',
      },
      {
        text: 'Were it not for + NP',
        context: 'Were it not for the funding delay, the project would be complete.',
      },
      {
        text: 'Inverted first conditional with should',
        context: 'Should the council reject the proposal, we would revise it.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-04-29',
  },
  {
    id: 'a-w03-passive-modal-stacks',
    day: 27,
    week: 3,
    phase: 2,
    discipline: 'grammar',
    level: 'advanced',
    title: 'The passive with modal stacks.',
    subtitle: 'Had to be considered, might have been argued.',
    hook: 'Combining passive voice with modal and perfect auxiliaries produces the hedged, high-register prose Task 2 examiners reward. "Might have been argued" beats "some people argued" in three bands.',
    theory:
      'Modal passive: modal + be + past participle. (The proposal may be rejected.) Perfect modal passive: modal + have been + past participle. (The proposal might have been rejected.) Continuous modal passive: modal + be being + past participle — rare but used for in-progress hypothetical action. (The proposal may be being reviewed.) Combine with epistemic hedging to produce high-register claims: "It may well have been argued that the proposal was premature."',
    examples: [
      { text: 'The proposal may be rejected.', register: 'B1' },
      {
        text: 'The proposal might have been accepted if it had been submitted earlier.',
        register: 'B2',
      },
      {
        text: 'It may well be argued that the reform, if implemented, would have been undermined by the very political instability it was designed to resolve.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The law should be implement next year.',
        right: 'The law should be implemented next year.',
        why: 'Modal passive needs the past participle, not the base verb.',
      },
      {
        wrong: 'The proposal might been rejected.',
        right: 'The proposal might have been rejected.',
        why: 'The perfect modal passive requires "have" between the modal and "been".',
      },
      {
        wrong: 'It can be argued that the reform would had been undermined.',
        right: 'It can be argued that the reform would have been undermined.',
        why: 'Perfect conditional requires "have", not "had", after "would".',
      },
    ],
    practice: [
      {
        id: 'a3-1',
        kind: 'rewrite',
        prompt: 'Rewrite with a modal passive: "Someone may have leaked the document."',
        answer: 'The document may have been leaked.',
      },
      {
        id: 'a3-2',
        kind: 'gap-fill',
        prompt: 'The protocol _____ (could + review) annually to ensure relevance.',
        answer: 'could be reviewed',
      },
      {
        id: 'a3-3',
        kind: 'choice',
        prompt: 'Which sentence is correctly formed?',
        choices: [
          'The reform might has been undermined.',
          'The reform might have been undermined.',
          'The reform might had been undermined.',
        ],
        answer: 'The reform might have been undermined.',
      },
      {
        id: 'a3-4',
        kind: 'rewrite',
        prompt:
          'Convert to a high-register hedged passive: "Some may argue that the proposal is premature."',
        answer: 'It may well be argued that the proposal is premature.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a hypothetical policy outcome. Use one modal passive, one perfect modal passive, and one "it may well be argued that" opener.',
      minWords: 100,
    },
    noticing: [
      { text: 'Modal passive base', context: 'The proposal may be rejected.' },
      { text: 'Perfect modal passive', context: 'The proposal might have been rejected.' },
      {
        text: 'Hedged C1 passive opener',
        context: 'It may well be argued that the proposal is premature.',
      },
      {
        text: 'Modal + have + been + participle',
        context: 'The reform might have been undermined.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-05-06',
  },
  {
    id: 'a-w04-non-finite-clauses',
    day: 28,
    week: 4,
    phase: 2,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Non-finite clauses.',
    subtitle: 'The sentence inside the sentence.',
    hook: 'Non-finite clauses (participle, gerund, infinitive) compress a second idea into the main sentence. They lift register and tighten prose — and they signal to the examiner that you can reduce clauses you could also have written out in full.',
    theory:
      'Participial clauses: Arriving at the airport, she noticed the flight had been delayed. (= When she arrived…) Use -ing for active simultaneous action; -ed for passive or completed state (The plan, approved last month, has met resistance.). Gerund clauses: Introducing the reform required careful consultation. Infinitive clauses: To succeed in Task 2, you must plan before writing. Caveat: a dangling participle produces absurdity — make sure the implied subject of the participial clause matches the main-clause subject.',
    examples: [
      { text: 'Arriving late, I missed the opening.', register: 'B1' },
      {
        text: 'Having reviewed the proposal, the committee approved it unanimously.',
        register: 'B2',
      },
      {
        text: 'Introduced in 2018 and subsequently revised, the legislation continues to shape the regulatory landscape.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Walking to school, the rain started.',
        right:
          'Walking to school, I felt the rain start. (or: While I was walking to school, the rain started.)',
        why: 'Dangling participle — the rain wasn’t walking. Match the implied subject to the main clause.',
      },
      {
        wrong: 'After to eat, we went for a walk.',
        right: 'After eating, we went for a walk.',
        why: 'After the preposition "after", use a gerund, not an infinitive.',
      },
      {
        wrong: 'Having been approved the plan, the council moved to implementation.',
        right: 'The plan having been approved, the council moved to implementation.',
        why: 'An absolute participial phrase needs its own subject — "the plan" — before the participle.',
      },
    ],
    practice: [
      {
        id: 'a4-1',
        kind: 'rewrite',
        prompt:
          'Reduce to a participial clause: "Because he had finished the report, he left the office."',
        answer: 'Having finished the report, he left the office.',
      },
      {
        id: 'a4-2',
        kind: 'rewrite',
        prompt:
          'Reduce to a participial clause (passive): "The plan, which was approved last month, has met resistance."',
        answer: 'The plan, approved last month, has met resistance.',
      },
      {
        id: 'a4-3',
        kind: 'choice',
        prompt: 'Which sentence has a dangling participle?',
        choices: [
          'Looking out of the window, the garden was beautiful.',
          'Looking out of the window, she saw the garden.',
        ],
        answer: 'Looking out of the window, the garden was beautiful.',
      },
      {
        id: 'a4-4',
        kind: 'rewrite',
        prompt:
          'Use an absolute participial phrase: "The committee had approved the proposal. The chairman moved to close the meeting."',
        answer: 'The proposal having been approved, the chairman moved to close the meeting.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a recent institutional decision, using at least one participial clause, one gerund clause, and one infinitive clause. Verify none dangles.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'Participial clause (active)',
        context: 'Having reviewed the proposal, the committee approved it unanimously.',
      },
      {
        text: 'Reduced passive relative',
        context: 'The plan, approved last month, has met resistance.',
      },
      {
        text: 'Absolute participial phrase',
        context: 'The proposal having been approved, the chairman moved to close the meeting.',
      },
      { text: 'Gerund after preposition', context: 'After eating, we went for a walk.' },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-05-13',
  },
  {
    id: 'a-w05-nominalisation-register',
    day: 29,
    week: 5,
    phase: 2,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Nominalisation under register.',
    subtitle: 'The verb becomes a subject.',
    hook: 'At Band 6, a writer uses verbs. At Band 7.5, a writer nominalises the verb, makes it the subject of the next sentence, and uses that sentence to say something new. Nominalisation is not decoration — it is paragraph management.',
    theory:
      'Nominalised subject sets up a paragraph topic. "The council approved the plan. This approval was unexpected." The nominalisation "approval" becomes the hook for the next clause. Writers at C1 chain two or three nominalisations to manage a topic across several sentences. Watch two traps: (1) false nominalisation with "give/make" weakens the verb ("gave an approval" = approved); (2) over-nominalisation produces fog — keep one live verb per clause.',
    examples: [
      { text: 'The city grew quickly. This growth caused problems.', register: 'B1' },
      {
        text: 'The council approved the plan. The approval signalled a broader shift.',
        register: 'B2',
      },
      {
        text: 'The government’s decision to subsidise domestic production generated both immediate relief and longer-term concerns about market distortion.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The committee made a discussion of the proposal.',
        right:
          'The committee discussed the proposal. (or: The committee’s discussion of the proposal was inconclusive.)',
        why: 'False nominalisation — use the verb directly, or nominalise into a full subject.',
      },
      {
        wrong:
          'The introduction of the reform implementation caused the completion of the process.',
        right:
          'Introducing the reform completed the process. (or: The reform’s implementation completed the process.)',
        why: 'Over-nominalisation — three abstract nouns where one verb and one noun would do.',
      },
      {
        wrong: 'The government’s deciding caused controversy.',
        right: 'The government’s decision caused controversy.',
        why: 'Use the nominalised noun (decision), not the gerund (deciding), when a formal nominal subject is wanted.',
      },
    ],
    practice: [
      {
        id: 'a5-1',
        kind: 'rewrite',
        prompt:
          'Nominalise the second clause to become the subject of a new sentence: "The council approved the plan. It surprised observers."',
        answer: 'The council approved the plan. The approval surprised observers.',
      },
      {
        id: 'a5-2',
        kind: 'rewrite',
        prompt: 'Fix the false nominalisation: "She made a decision to resign."',
        answer: 'She decided to resign. (or: Her decision to resign was unexpected.)',
      },
      {
        id: 'a5-3',
        kind: 'choice',
        prompt: 'Which is the cleanest C1 form?',
        choices: [
          'The government made a subsidisation of domestic production.',
          'The government subsidised domestic production.',
          'The government’s subsidisation of domestic production provoked debate.',
        ],
        answer: 'The government’s subsidisation of domestic production provoked debate.',
      },
      {
        id: 'a5-4',
        kind: 'rewrite',
        prompt:
          'Chain two nominalisations across two sentences: "The team rejected the proposal. People were surprised."',
        answer:
          'The team’s rejection of the proposal was surprising. The surprise quickly spread beyond the committee.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph that uses a nominalised noun to open the second sentence and carry the topic forward. Include at least one verb-strong sentence to balance the register.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Nominalisation carries the topic',
        context: 'The council approved the plan. The approval signalled a broader shift.',
      },
      {
        text: 'Nominalised subject with possessive',
        context:
          'The government’s decision to subsidise domestic production generated both relief and concerns.',
      },
      { text: 'Avoid false nominalisation', context: 'She decided to resign.' },
      {
        text: 'Noun > gerund for formal subject',
        context: 'The government’s decision caused controversy.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-05-20',
  },
  {
    id: 'a-w06-inversion-three',
    day: 30,
    week: 6,
    phase: 3,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Inversion — all three patterns.',
    subtitle: 'Rarely, were, and not only.',
    hook: 'Inversion has three live patterns in formal English: negative-adverbial, conditional, and emphatic-fronting. Deploy one of each per Task 2 — the examiner reads them as range.',
    theory:
      'Negative-adverbial: after rarely, seldom, never, hardly, no sooner, not only, little, on no account, the auxiliary moves before the subject. "Rarely have we seen such a shift." Conditional: Had / Were / Should + subject + rest. "Had the minister resigned, the crisis would have been avoided." Emphatic-fronting: after so / such + that-clause. "So rapidly did the situation develop that intervention became impossible." Overuse reads as affectation — one per paragraph at most.',
    examples: [
      { text: 'Rarely have I seen such dedication.', register: 'B1' },
      { text: 'Not only did the policy fail, but it also eroded public trust.', register: 'B2' },
      {
        text: 'So rapidly did the epidemic spread across the region that a coordinated response became impossible to mount.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Rarely I have seen such dedication.',
        right: 'Rarely have I seen such dedication.',
        why: 'Negative-adverbial fronting triggers inversion.',
      },
      {
        wrong: 'So rapidly the situation developed that intervention became impossible.',
        right: 'So rapidly did the situation develop that intervention became impossible.',
        why: 'After "so + adverb", invert the auxiliary.',
      },
      {
        wrong: 'If had the committee approved earlier, the plan would be complete.',
        right: 'Had the committee approved earlier, the plan would be complete.',
        why: 'Conditional inversion replaces "if"; do not use both.',
      },
    ],
    practice: [
      {
        id: 'a6-1',
        kind: 'rewrite',
        prompt: 'Invert: "We have seldom encountered such a clear case."',
        answer: 'Seldom have we encountered such a clear case.',
      },
      {
        id: 'a6-2',
        kind: 'rewrite',
        prompt:
          'Invert the conditional: "If the ministry had acted sooner, the crisis would be contained."',
        answer: 'Had the ministry acted sooner, the crisis would be contained.',
      },
      {
        id: 'a6-3',
        kind: 'rewrite',
        prompt:
          'Convert to emphatic-fronting: "The policy failed so completely that the minister resigned."',
        answer: 'So completely did the policy fail that the minister resigned.',
      },
      {
        id: 'a6-4',
        kind: 'choice',
        prompt: 'Which opening is correctly inverted?',
        choices: [
          'No sooner the committee had convened, they adjourned.',
          'No sooner had the committee convened than they adjourned.',
          'No sooner the committee convened than they adjourned.',
        ],
        answer: 'No sooner had the committee convened than they adjourned.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a regulatory response to a crisis. Use one negative-adverbial inversion, one conditional inversion, and one emphatic-fronting inversion. No more.',
      minWords: 100,
    },
    noticing: [
      { text: 'Rarely / seldom inversion', context: 'Rarely have we seen such a shift.' },
      {
        text: 'No sooner … than',
        context: 'No sooner had the committee convened than they adjourned.',
      },
      {
        text: 'So + adv + aux + subject',
        context: 'So rapidly did the epidemic spread across the region.',
      },
      {
        text: 'Had + subject conditional',
        context: 'Had the ministry acted sooner, the crisis would be contained.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-05-27',
  },
  {
    id: 'a-w07-clefts-in-argument',
    day: 31,
    week: 7,
    phase: 3,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Cleft sentences in argumentation.',
    subtitle: 'What matters is not the fact but the frame.',
    hook: 'In an argument, a cleft sentence foregrounds the element you want the reader to evaluate. "It is not the policy itself that is flawed — it is the implementation." The emphasis is structural, not lexical.',
    theory:
      'Three cleft families. It-cleft: It + be + X + that/who… It was the implementation that failed. What-cleft: What + clause + be + X. What failed was the implementation. All-cleft: All + clause + be + X. All that failed was the implementation. Clefts allow you to open a paragraph by foregrounding a topic, to rebut by foregrounding a mis-focus, and to contrast by pairing two clefts. The examiner reads them as precision.',
    examples: [
      { text: 'It was the implementation that failed.', register: 'B1' },
      {
        text: 'What distinguishes successful reforms is sustained political will.',
        register: 'B2',
      },
      {
        text: 'It is precisely the ambiguity of the legislation — not its intent — that has made its enforcement so inconsistent.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'It was because of the weather the reason the event was cancelled.',
        right: 'It was because of the weather that the event was cancelled.',
        why: '"The reason" is redundant inside an it-cleft; the "that" carries the frame.',
      },
      {
        wrong: 'What the delay caused was the funding cut.',
        right: 'What caused the delay was the funding cut.',
        why: 'The word order in the what-clause must match the active order of the clause it replaces.',
      },
      {
        wrong: 'It were the committee who approved the plan.',
        right: 'It was the committee who approved the plan.',
        why: 'In it-clefts, the copula always agrees with "it" (singular), not the fronted element.',
      },
    ],
    practice: [
      {
        id: 'a7-1',
        kind: 'rewrite',
        prompt:
          'Rebut with a cleft: "The policy is flawed." (claim that it is the implementation that is flawed)',
        answer: 'It is not the policy itself that is flawed, but the implementation.',
      },
      {
        id: 'a7-2',
        kind: 'rewrite',
        prompt:
          'Foreground with a what-cleft: "Sustained political will distinguishes successful reforms."',
        answer: 'What distinguishes successful reforms is sustained political will.',
      },
      {
        id: 'a7-3',
        kind: 'rewrite',
        prompt: 'Convert to an all-cleft: "The committee only rejected one recommendation."',
        answer: 'All the committee rejected was one recommendation.',
      },
      {
        id: 'a7-4',
        kind: 'choice',
        prompt: 'Which cleft correctly foregrounds cause?',
        choices: [
          'It was because of cost that the plan was abandoned.',
          'It was because of cost the reason the plan was abandoned.',
          'What was abandoned the plan because of cost.',
        ],
        answer: 'It was because of cost that the plan was abandoned.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph rebutting a common misidentification of cause. Use one it-cleft to rebut and one what-cleft to foreground the real cause.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'It-cleft for cause',
        context: 'It was because of cost that the plan was abandoned.',
      },
      {
        text: 'What-cleft for topic foregrounding',
        context: 'What distinguishes successful reforms is sustained political will.',
      },
      {
        text: 'All-cleft for scope limitation',
        context: 'All the committee rejected was one recommendation.',
      },
      {
        text: 'Paired clefts for contrast',
        context: 'It is not the policy that is flawed, but the implementation.',
      },
    ],
    estimatedMinutes: 45,
    publishedAt: '2026-06-03',
  },
  {
    id: 'a-w08-hedging-stacks',
    day: 32,
    week: 8,
    phase: 3,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Hedging stacks and epistemic layering.',
    subtitle: 'One might reasonably argue that it could be said.',
    hook: 'Hedging stacks layer modal verbs, stance adverbs, and reporting verbs to signal exactly how confident you are. At Band 7.5, the hedge is calibrated — each layer adds one degree of caution.',
    theory:
      'Layer 1: modal verb — may, might, could, would. Layer 2: stance adverb — arguably, possibly, apparently, evidently. Layer 3: reporting verb — suggest, indicate, appear, seem, imply. Combine layers for a polished academic claim: "It may reasonably be argued that the data suggest a limited effect." Too many layers produce timidity; two is confident, three is cautious, four is evasive. Never pair a hedge with an absolute (possibly certainly, might definitely).',
    examples: [
      { text: 'The policy may be effective.', register: 'B1' },
      { text: 'The data appear to suggest a modest improvement.', register: 'B2' },
      {
        text: 'It may reasonably be argued that the available evidence points towards, rather than confirms, a causal relationship.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The policy possibly might could succeed.',
        right: 'The policy may succeed. (or: The policy could plausibly succeed.)',
        why: 'Three modal-weight hedges in one verb phrase — pick one.',
      },
      {
        wrong: 'It is obvious that the reform possibly works.',
        right: 'It appears that the reform is producing modest results.',
        why: 'Never pair "obvious" with "possibly". Choose one register.',
      },
      {
        wrong: 'The data shows undoubtedly that the policy might fail.',
        right: 'The data suggest that the policy may be failing.',
        why: '"Undoubtedly" + "might" is contradictory. Replace "shows" with "suggest"; drop the absolute.',
      },
    ],
    practice: [
      {
        id: 'a8-1',
        kind: 'rewrite',
        prompt: 'Add calibrated hedging: "The policy is working."',
        answer: 'The policy appears to be working.',
      },
      {
        id: 'a8-2',
        kind: 'rewrite',
        prompt: 'Build a three-layer hedge: "The reform produces results in rural areas."',
        answer: 'The reform may, in rural areas, be producing modest results.',
      },
      {
        id: 'a8-3',
        kind: 'choice',
        prompt: 'Which is the cleanest C1 hedge?',
        choices: [
          'The evidence obviously suggests that the policy may succeed.',
          'The evidence suggests that the policy may succeed.',
          'The evidence possibly definitely suggests that the policy may succeed.',
        ],
        answer: 'The evidence suggests that the policy may succeed.',
      },
      {
        id: 'a8-4',
        kind: 'rewrite',
        prompt: 'Convert to impersonal hedge: "I think the policy works."',
        answer: 'It may reasonably be argued that the policy is working.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a contested research finding. Use at least four hedges across three families — and no absolutes.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'Modal + reporting verb',
        context: 'The evidence suggests that the policy may succeed.',
      },
      {
        text: 'Three-layer hedge',
        context: 'The reform may, in rural areas, be producing modest results.',
      },
      {
        text: 'Impersonal hedged claim',
        context: 'It may reasonably be argued that the policy is working.',
      },
      {
        text: 'Never pair with absolutes',
        context: 'The evidence suggests that the policy may succeed.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-06-10',
  },
  {
    id: 'a-w09-cohesion-reference',
    day: 33,
    week: 9,
    phase: 3,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Cohesion — reference, substitution, ellipsis.',
    subtitle: 'The pronoun that does three jobs.',
    hook: 'Connectors ("however", "therefore") are noisy; reference and substitution are quiet. At Band 7.5, the invisible cohesion does most of the work — the examiner feels it before they can name it.',
    theory:
      'Reference: pronouns (it, they, this, that, these, those) point backward to named items; the reader must be able to identify the referent without effort. Substitution: one(s), do so, did so, did the same — replace a repeated noun or verb phrase. "Some candidates prepare for weeks; others do not." Ellipsis: omit a repeated element entirely. "She passed the exam, and her sister [passed] too." Over-connector prose sounds adolescent; under-referenced prose sounds bureaucratic. The balance is one cohesion device per clause — but rarely two of the same kind.',
    examples: [
      { text: 'The council approved the plan. They did so unanimously.', register: 'B1' },
      { text: 'Some reforms produced measurable results; others did not.', register: 'B2' },
      {
        text: 'The committee reviewed three proposals; two were approved, the third deferred to the next session.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The council approved the plan. The council did so unanimously.',
        right: 'The council approved the plan. They did so unanimously.',
        why: 'Repeat "the council" → replace with a pronoun to tighten.',
      },
      {
        wrong:
          'I prefer the new textbooks. The new textbooks are clearer than the textbooks from last year.',
        right: 'I prefer the new textbooks; they are clearer than the ones from last year.',
        why: 'Two repetitions — replace with pronoun + "ones" to substitute.',
      },
      {
        wrong: 'She passed the exam, and her sister passed the exam too.',
        right: 'She passed the exam, and her sister did too.',
        why: 'Use "did" (pro-verb) to ellipt the repeated verb phrase.',
      },
    ],
    practice: [
      {
        id: 'a9-1',
        kind: 'rewrite',
        prompt:
          'Use "do so": "The committee rejected the proposal. The committee rejected the proposal firmly."',
        answer: 'The committee rejected the proposal. They did so firmly.',
      },
      {
        id: 'a9-2',
        kind: 'rewrite',
        prompt:
          'Use substitution: "Some candidates prepare for weeks. Some candidates do not prepare at all."',
        answer: 'Some candidates prepare for weeks; others do not.',
      },
      {
        id: 'a9-3',
        kind: 'rewrite',
        prompt: 'Use ellipsis: "She arrived at noon, and her brother arrived at noon."',
        answer: 'She arrived at noon, and her brother did too.',
      },
      {
        id: 'a9-4',
        kind: 'choice',
        prompt: 'Which revision is tightest?',
        choices: [
          'The reform was welcomed by educators. The reform was resisted by politicians.',
          'The reform was welcomed by educators but resisted by politicians.',
          'The reform — welcomed by educators and resisted by politicians — entered force last year.',
        ],
        answer:
          'The reform — welcomed by educators and resisted by politicians — entered force last year.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a debate in which two sides respond to the same issue. Use at least one instance each of reference, substitution, and ellipsis. Limit connectors to one.',
      minWords: 100,
    },
    noticing: [
      {
        text: 'Pronoun reference',
        context: 'The council approved the plan. They did so unanimously.',
      },
      {
        text: 'Substitution with "others"',
        context: 'Some candidates prepare for weeks; others do not.',
      },
      { text: 'Ellipsis with "did too"', context: 'She arrived at noon, and her brother did too.' },
      {
        text: 'Compressed parenthetical',
        context:
          'The reform — welcomed by educators and resisted by politicians — entered force last year.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-06-17',
  },
  {
    id: 'a-w10-concession-c1',
    day: 34,
    week: 10,
    phase: 4,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Concession at C1 register.',
    subtitle: 'Granted that, admittedly, to be fair.',
    hook: 'At Band 6, you concede with "although". At Band 7.5, you concede with "granted that", "admittedly", "to be fair", "it is true that", "while it is the case that" — each subtly different. The examiner reads the range.',
    theory:
      'Six C1 concessive pivots. "Granted that + clause, …" — formal, academic. "Admittedly, …" — acknowledges fact. "To be fair, …" — signals balance. "It is true that X; nevertheless, Y" — two-step concession and rebuttal. "While it is the case that X, Y" — alternative to "although". "For all its strengths, X has Y" — limits praise. Pair each with a clean rebuttal pivot (nevertheless, nonetheless, even so, that said) to complete the concession–rebuttal move.',
    examples: [
      { text: 'Admittedly, the policy was expensive, but it worked.', register: 'B1' },
      {
        text: 'Granted that the initiative has met its targets, its social impact remains contested.',
        register: 'B2',
      },
      {
        text: 'For all its strengths, the legislation has failed to address the underlying structural inequity that motivated its introduction.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Granted the policy was expensive, but it worked.',
        right: 'Granted that the policy was expensive, it worked.',
        why: 'Use "granted that" + clause. Do not pair with "but" in the same sentence.',
      },
      {
        wrong: 'It is true that the policy failed, nevertheless but it was necessary.',
        right: 'It is true that the policy failed; nevertheless, it was necessary.',
        why: 'Use either "nevertheless" or "but", not both. A semicolon and "nevertheless" is the C1 form.',
      },
      {
        wrong: 'For all of its strengths the legislation has failed.',
        right: 'For all its strengths, the legislation has failed.',
        why: '"For all" takes no "of" in this concessive idiom.',
      },
    ],
    practice: [
      {
        id: 'a10-1',
        kind: 'rewrite',
        prompt:
          'Use "granted that": "The policy has met its targets. Its impact remains contested."',
        answer: 'Granted that the policy has met its targets, its impact remains contested.',
      },
      {
        id: 'a10-2',
        kind: 'rewrite',
        prompt:
          'Use the two-step "it is true that … nevertheless …": "The policy failed. It was necessary."',
        answer: 'It is true that the policy failed; nevertheless, it was necessary.',
      },
      {
        id: 'a10-3',
        kind: 'rewrite',
        prompt:
          'Use "for all its strengths": "The legislation is strong but it has failed to address inequity."',
        answer: 'For all its strengths, the legislation has failed to address inequity.',
      },
      {
        id: 'a10-4',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'Admittedly the policy was costly but it worked.',
          'Admittedly, the policy was costly; even so, it worked.',
          'Admittedly the policy was costly, even so, but it worked.',
        ],
        answer: 'Admittedly, the policy was costly; even so, it worked.',
      },
    ],
    extension: {
      prompt:
        'Write a 110-word paragraph defending a controversial policy. Use three different C1 concessive pivots, each paired with a rebuttal.',
      minWords: 110,
    },
    noticing: [
      {
        text: 'Granted that + clause',
        context:
          'Granted that the initiative has met its targets, its broader impact remains contested.',
      },
      {
        text: 'Two-step it is true / nevertheless',
        context: 'It is true that the policy failed; nevertheless, it was necessary.',
      },
      {
        text: 'For all its strengths',
        context: 'For all its strengths, the legislation has failed to address inequity.',
      },
      {
        text: 'Admittedly + even so',
        context: 'Admittedly, the policy was costly; even so, it worked.',
      },
    ],
    estimatedMinutes: 42,
    publishedAt: '2026-06-24',
  },
  {
    id: 'a-w11-lexical-precision',
    day: 35,
    week: 11,
    phase: 4,
    discipline: 'grammar',
    level: 'advanced',
    title: 'Lexical precision under grammar.',
    subtitle: 'Grammar carries only what the word chose.',
    hook: 'Grammar can be perfect and the sentence still fail — the wrong word leaks through. At Band 7.5, lexical precision is the last gate. The examiner catches the miscollocation before the grammar.',
    theory:
      'Ten frequent C1 miscollocations Vietnamese writers carry from B2: "make a research" (do research), "discuss about" (discuss), "many informations" (much information / many pieces of information), "heavy traffic" (correct) vs "crowded traffic" (wrong), "make a decision" (correct) vs "make a choice" (correct) vs "do a decision" (wrong), "strong rain" (heavy rain), "fast food" (correct) vs "quick food" (wrong), "open the light" (turn on the light), "pay attention" (correct preposition: pay attention to), "take part in" (correct; not "join in" in formal contexts).',
    examples: [
      { text: 'We need to do more research.', register: 'B1' },
      { text: 'The committee discussed the proposal for three hours.', register: 'B2' },
      {
        text: 'The research team has gathered substantial information on market trends, much of which supports the initial hypothesis.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The team made a research on the topic.',
        right:
          'The team carried out research on the topic. (or: The team conducted research on the topic.)',
        why: 'Research collocates with "do" or "carry out" or "conduct" — never "make".',
      },
      {
        wrong: 'The traffic was crowded this morning.',
        right: 'The traffic was heavy this morning.',
        why: 'Traffic is heavy, light, or slow — never crowded.',
      },
      {
        wrong: 'We discussed about the proposal for two hours.',
        right: 'We discussed the proposal for two hours.',
        why: '"Discuss" is transitive — takes no preposition before its object.',
      },
    ],
    practice: [
      {
        id: 'a11-1',
        kind: 'choice',
        prompt: 'Which collocation is correct in a Task 2 essay?',
        choices: [
          'The government did research on the impact.',
          'The government made research on the impact.',
          'The government conducted research on the impact.',
        ],
        answer: 'The government conducted research on the impact.',
      },
      {
        id: 'a11-2',
        kind: 'rewrite',
        prompt: 'Correct: "The committee discussed about the new policy."',
        answer: 'The committee discussed the new policy.',
      },
      {
        id: 'a11-3',
        kind: 'rewrite',
        prompt: 'Correct: "Please open the air conditioner and close the light."',
        answer: 'Please turn on the air conditioner and turn off the light.',
      },
      {
        id: 'a11-4',
        kind: 'choice',
        prompt: 'Which is the natural C1 collocation?',
        choices: ['Heavy rain damaged the crops.', 'Strong rain damaged the crops.'],
        answer: 'Heavy rain damaged the crops.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph on a recent study or report. Include at least three collocations drilled this week (research, information, heavy, discuss, take part in).',
      minWords: 100,
    },
    noticing: [
      {
        text: 'do/conduct/carry out research',
        context: 'The team conducted research on the topic.',
      },
      { text: 'discuss (no preposition)', context: 'The committee discussed the proposal.' },
      { text: 'heavy (not strong) rain/traffic', context: 'Heavy rain damaged the crops.' },
      { text: 'turn on/off (not open/close)', context: 'Please turn on the air conditioner.' },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-07-01',
  },
  {
    id: 'a-w12-timed-drill-75',
    day: 36,
    week: 12,
    phase: 4,
    discipline: 'grammar',
    level: 'advanced',
    title: 'The Band 7.5 timed drill.',
    subtitle: 'Under the clock, with the examiner watching.',
    hook: 'Week XII of the Advanced arc is not a new topic — it is the examination rehearsal. Forty minutes, 280 words, every Phase III structure used once and only once. Self-assessed against the descriptors.',
    theory:
      'A Band 7.5 Task 2 contains: (1) one inverted conditional or negative-adverbial inversion; (2) one cleft sentence foregrounding a topic; (3) one C1 concession with rebuttal; (4) one nominalised subject carrying across two sentences; (5) one hedged claim using a modal + reporting verb; (6) one compound-complex sentence with two-level subordination. Overuse any one and the prose reads as rehearsed. The discipline is deployment — each once. Mark your own draft against a C&C / Grammar Range checklist; the gap between 7.0 and 7.5 lives in the self-review.',
    examples: [
      {
        text: 'Had the policy been introduced earlier, its impact would be broader.',
        register: 'B1',
      },
      {
        text: 'What the reform revealed was not a failure of intent but a failure of coordination.',
        register: 'B2',
      },
      {
        text: 'Granted that the initiative has achieved measurable gains, it may reasonably be argued that its most lasting effect is the institutional habit of evidence-based review, rather than any single metric the legislation was designed to produce.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong:
          'Granted that the initiative has achieved its targets, admittedly, it is true that even so it may reasonably be argued that it has not worked.',
        right:
          'Granted that the initiative has achieved its targets, it may nevertheless be argued that deeper change has not yet occurred.',
        why: 'Stacking five hedges in one sentence is overkill. Choose one concessive pivot and one hedging layer.',
      },
      {
        wrong: 'In the final paragraph, I used three inversions, two clefts, and four hedges.',
        right: 'In the final paragraph, one inversion, one cleft, and one hedge are enough.',
        why: 'Range is shown by the variety across paragraphs, not density within one. Band 7.5 is deliberate, not ornamental.',
      },
      {
        wrong: 'The reform was welcomed however nevertheless it was expensive.',
        right: 'The reform was welcomed; nevertheless, it was expensive.',
        why: 'Do not pair "however" and "nevertheless" in the same pivot — one is enough.',
      },
    ],
    practice: [
      {
        id: 'a12-1',
        kind: 'rewrite',
        prompt:
          'Combine into one Band 7.5 sentence (inversion + cleft): "The council did not approve the plan. The committee did not recommend it."',
        answer:
          'Had the committee recommended the plan, the council would have approved it — but it was the committee, not the council, that hesitated.',
      },
      {
        id: 'a12-2',
        kind: 'rewrite',
        prompt:
          'Rewrite with one concession + one hedge: "The policy is working. It does not solve everything."',
        answer:
          'Granted that the policy appears to be working, it may not address every aspect of the problem.',
      },
      {
        id: 'a12-3',
        kind: 'rewrite',
        prompt:
          'Self-correct: "Although the reform was expensive, but nevertheless, it succeeded, however, it needs review."',
        answer: 'Although the reform was expensive, it succeeded; it now needs review.',
      },
      {
        id: 'a12-4',
        kind: 'rewrite',
        prompt:
          'Compress two sentences into a nominalised chain: "The minister resigned. The resignation was unexpected. Observers were surprised."',
        answer:
          'The minister’s unexpected resignation surprised observers. The surprise fed broader speculation about the government’s direction.',
      },
    ],
    extension: {
      prompt:
        'Write a full 280-word Task 2 on an assigned prompt in forty minutes. Then mark your own draft: count your uses of each Phase III structure. Target: each used once.',
      minWords: 280,
    },
    noticing: [
      {
        text: 'Inversion + cleft combined',
        context: 'Had the committee recommended the plan, the council would have approved it.',
      },
      {
        text: 'Concession + hedge paired',
        context: 'Granted that the policy appears to be working, it may not address every aspect.',
      },
      { text: 'Connector discipline', context: 'Although the reform was expensive, it succeeded.' },
      {
        text: 'Nominalised chain',
        context: 'The minister’s unexpected resignation surprised observers.',
      },
      {
        text: 'Self-review is Band 7.5',
        context: 'One inversion, one cleft, one hedge per paragraph.',
      },
    ],
    estimatedMinutes: 60,
    publishedAt: '2026-07-08',
  },
]
