import type { Lesson } from '@shared/schemas/lesson'

export const FOUNDATION_LESSONS: Lesson[] = [
  {
    id: 'f-w01-simple-sentence',
    day: 1,
    week: 1,
    phase: 1,
    discipline: 'grammar',
    level: 'foundation',
    title: 'The simple sentence.',
    subtitle: 'Subject. Verb. Object. Everything else is ornament.',
    hook: 'A sentence has a subject and a verb. Without both, you have a fragment. Vietnamese learners at Band 5 often write fragments they believe are sentences; the examiner counts them and the score falls.',
    theory:
      'Every English sentence needs a finite verb (a verb with tense) and a subject. Formula: [subject] + [verb] (+ [object] or [complement]). The children are sleeping. She bought a book. They seem tired. A fragment is missing one of these parts: "Because I was tired." is not a sentence — it needs a main clause: "I went home because I was tired." Avoid the four most common fragments: subordinator-only ("Although I tried."), participle-only ("Running to school."), noun phrase alone ("A big problem in our city."), and infinitive alone ("To improve the economy.").',
    examples: [
      { text: 'The shop opens at eight.', register: 'B1' },
      { text: 'My younger sister attends an international school in the city.', register: 'B2' },
      {
        text: 'The new curriculum emphasises critical reasoning across disciplines.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Because the weather was cold.',
        right: 'Because the weather was cold, I stayed inside.',
        why: 'A subordinate clause cannot stand alone. It needs a main clause to complete the sentence.',
      },
      {
        wrong: 'Running through the park every morning.',
        right: 'I run through the park every morning.',
        why: 'A participle phrase on its own is not a sentence. Supply a subject and a finite verb.',
      },
      {
        wrong: 'A serious problem in big cities.',
        right: 'Air pollution is a serious problem in big cities.',
        why: 'A noun phrase is not a sentence. Add a subject and verb — or turn the phrase into the subject of a new verb.',
      },
    ],
    practice: [
      {
        id: 'f1-1',
        kind: 'choice',
        prompt: 'Which of the following is a complete sentence?',
        choices: [
          'Although I was tired.',
          'Running in the rain.',
          'She closed the door quietly.',
          'A decision that changed everything.',
        ],
        answer: 'She closed the door quietly.',
        explanation: 'It has a subject (She), a finite verb (closed), and an object (the door).',
      },
      {
        id: 'f1-2',
        kind: 'rewrite',
        prompt: 'Rewrite as a complete sentence: "Because the examination starts at nine."',
        answer: 'Because the examination starts at nine, we should leave now.',
      },
      {
        id: 'f1-3',
        kind: 'gap-fill',
        prompt: 'Add a subject: "_____ teaches English at a secondary school in Hue."',
        answer: 'my mother',
        explanation: 'Any noun or pronoun that names the teacher is acceptable.',
      },
      {
        id: 'f1-4',
        kind: 'rewrite',
        prompt: 'Turn this fragment into a sentence: "A serious shortage of clean water."',
        answer: 'A serious shortage of clean water affects many provinces.',
      },
    ],
    extension: {
      prompt:
        'Write five complete sentences about your neighbourhood. Underline the subject and verb in each.',
      minWords: 50,
    },
    noticing: [
      {
        text: 'Subordinator needs a main clause',
        context: 'Because the weather was cold, I stayed inside.',
        note: 'Because, although, if, when — all require a second clause.',
      },
      {
        text: 'Participle cannot stand alone',
        context: 'I run through the park every morning.',
        note: 'Running through the park — add a subject and a finite verb.',
      },
      {
        text: 'Noun phrases need a verb',
        context: 'Air pollution is a serious problem in big cities.',
      },
      {
        text: 'Every sentence has a subject',
        context: 'The shop opens at eight.',
        note: 'Not "Opens at eight." on its own.',
      },
    ],
    estimatedMinutes: 30,
    publishedAt: '2026-04-22',
  },
  {
    id: 'f-w02-tense-triad',
    day: 2,
    week: 2,
    phase: 2,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Past, present, future — the three tenses.',
    subtitle: 'Time, without the decorations.',
    hook: 'Before the twelve tenses, there are three. Past, present, future. Vietnamese signals time with adverbs; English signals it with verb endings. The examiner hears the ending first.',
    theory:
      'Simple present for habits and general truths: She works in a hospital. Simple past for finished events: She worked there for five years. Simple future with will for predictions and decisions at the moment of speaking: She will retire next year. Vietnamese speakers often leave the verb in its base form and rely on adverbs (yesterday, tomorrow) to mark time — this produces sentences that examiners mark as Band 5 grammar. English requires the ending. Regular verbs: +s for he/she/it in present; +ed for past. Irregulars must be memorised.',
    examples: [
      { text: 'I walk to school every day.', register: 'B1' },
      { text: 'The council approved the new bus route last month.', register: 'B2' },
      {
        text: 'Analysts predict the market will stabilise by the end of the quarter.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'Yesterday I go to the market.',
        right: 'Yesterday I went to the market.',
        why: 'Yesterday marks past time, but the verb must also change — "go" becomes "went".',
      },
      {
        wrong: 'She work in Hanoi.',
        right: 'She works in Hanoi.',
        why: 'Third-person singular present tense requires -s on the verb.',
      },
      {
        wrong: 'Tomorrow I am go to see my grandmother.',
        right: 'Tomorrow I am going to see my grandmother.',
        why: '"Am go" is not a valid form. Use "am going to" for intention, or "will" for prediction.',
      },
    ],
    practice: [
      {
        id: 'f2-1',
        kind: 'gap-fill',
        prompt: 'Last year my family _____ (move) to a new apartment.',
        answer: 'moved',
      },
      {
        id: 'f2-2',
        kind: 'gap-fill',
        prompt: 'My brother _____ (study) medicine at the university.',
        answer: 'studies',
        explanation: 'Third-person singular present — add -s (or -ies after consonant + y).',
      },
      {
        id: 'f2-3',
        kind: 'choice',
        prompt: 'Select the correct form: "Next Saturday we _____ our grandparents."',
        choices: ['visited', 'visit', 'will visit', 'are visit'],
        answer: 'will visit',
      },
      {
        id: 'f2-4',
        kind: 'rewrite',
        prompt: 'Put into the simple past: "She teaches English in a primary school."',
        answer: 'She taught English in a primary school.',
      },
    ],
    extension: {
      prompt:
        'Write a 60-word paragraph describing a typical Sunday: what you did last Sunday, what you usually do, and what you will do next Sunday. Use all three simple tenses.',
      minWords: 60,
    },
    noticing: [
      {
        text: 'Past irregular verbs',
        context: 'Yesterday I went to the market.',
        note: 'go → went.',
      },
      { text: 'Third-person -s', context: 'She works in Hanoi.' },
      { text: 'Future with will', context: 'Analysts predict the market will stabilise.' },
      { text: 'Going to for intention', context: 'Tomorrow I am going to see my grandmother.' },
    ],
    estimatedMinutes: 32,
    publishedAt: '2026-04-29',
  },
  {
    id: 'f-w03-articles',
    day: 3,
    week: 3,
    phase: 2,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Articles and countability.',
    subtitle: 'A, an, the — and the quiet difference.',
    hook: 'Vietnamese has no articles. Every article you write in English is an invention. The examiner notices missing articles in the first paragraph; a paragraph without "the" is one of the clearest Band 5 markers.',
    theory:
      'Use "a" before singular countable nouns mentioned for the first time: a book, a problem. "An" before vowel sounds: an hour, an idea. "The" for specific or already-known nouns: the book you bought, the government. No article for general plurals and uncountable nouns: books are useful, water is life. Ten common IELTS topics with fixed usage: the environment, the economy, the government, the media, the internet, the air, the sea, education (no article), health (no article), society (no article when general).',
    examples: [
      { text: 'I bought a book yesterday. The book is about history.', register: 'B1' },
      {
        text: 'The government has introduced new policies to protect the environment.',
        register: 'B2',
      },
      {
        text: 'The inquiry concluded that the authorities had failed to anticipate the scale of the crisis.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'I need advice from my teacher.',
        right: 'I need advice from my teacher. (no change — "advice" is uncountable)',
        why: 'Advice is uncountable: no "an advice", no "advices". Say "a piece of advice" if you need a countable.',
      },
      {
        wrong: 'Government should invest in education.',
        right: 'The government should invest in education.',
        why: 'When referring to a specific, known institution, use "the". Education as a general concept takes no article.',
      },
      {
        wrong: 'An university student lives next door.',
        right: 'A university student lives next door.',
        why: '"University" begins with a consonant sound (y-), so use "a" not "an".',
      },
    ],
    practice: [
      {
        id: 'f3-1',
        kind: 'gap-fill',
        prompt: 'She is _____ honest person who works in _____ hospital near _____ river.',
        answer: 'an · a · the',
        explanation:
          '"Honest" starts with a vowel sound; a hospital is non-specific; the river is specific.',
      },
      {
        id: 'f3-2',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'Pollution is serious problem in cities.',
          'Pollution is a serious problem in cities.',
          'The pollution is a serious problem in cities.',
        ],
        answer: 'Pollution is a serious problem in cities.',
      },
      {
        id: 'f3-3',
        kind: 'gap-fill',
        prompt: '_____ government announced _____ new law on _____ education last month.',
        answer: 'the · a · — ',
        explanation:
          'Specific government → the. New law introduced → a. Education as a general field → no article.',
      },
      {
        id: 'f3-4',
        kind: 'rewrite',
        prompt: 'Correct the article use: "I gave her an useful information about a school."',
        answer: 'I gave her useful information about a school.',
      },
    ],
    extension: {
      prompt:
        'Write a 70-word paragraph describing your neighbourhood, using "a", "an", and "the" at least twice each, and three uncountable nouns without articles (water, air, traffic, advice, information, etc.).',
      minWords: 70,
    },
    noticing: [
      {
        text: '"An" before vowel sounds',
        context: 'She is an honest person.',
        note: 'Honest sounds like "onest" — vowel.',
      },
      {
        text: '"A" before consonant sounds',
        context: 'A university student.',
        note: 'University sounds like "you-".',
      },
      { text: 'Uncountable nouns take no article', context: 'I need advice from my teacher.' },
      {
        text: 'Specific institution takes "the"',
        context: 'The government has introduced new policies.',
      },
    ],
    estimatedMinutes: 35,
    publishedAt: '2026-05-06',
  },
  {
    id: 'f-w04-subject-verb-agreement',
    day: 4,
    week: 4,
    phase: 2,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Subject–verb agreement.',
    subtitle: 'The number lives in the verb.',
    hook: 'A plural subject takes a plural verb. A singular subject takes a singular verb. The rule is simple; the errors are frequent. Vietnamese has no agreement at all, so every match in English is a choice the writer must make.',
    theory:
      'Singular subject + singular verb (adds -s in present): The student writes. Plural subject + plural verb: The students write. Watch for the distractor phrase — a noun that sits between subject and verb but does not change agreement: "The box of chocolates is expensive" (box is the subject, not chocolates). Collective nouns usually take singular: the team is, the government is. Either…or / neither…nor agree with the nearer subject. "Each of" and "one of" always take a singular verb.',
    examples: [
      { text: 'My friends live in Da Nang.', register: 'B1' },
      { text: 'The box of chocolates on the table is a gift from my aunt.', register: 'B2' },
      {
        text: 'Each of the proposals under consideration addresses a distinct regulatory concern.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The list of students are on the board.',
        right: 'The list of students is on the board.',
        why: 'The subject is "list" (singular), not "students". The of-phrase does not change agreement.',
      },
      {
        wrong: 'Each of the candidates have prepared a statement.',
        right: 'Each of the candidates has prepared a statement.',
        why: '"Each of" is always singular — match the verb to "each", not to "candidates".',
      },
      {
        wrong: 'Neither the manager nor the employees is available.',
        right: 'Neither the manager nor the employees are available.',
        why: 'With neither…nor, the verb agrees with the nearer subject — "employees" is plural.',
      },
    ],
    practice: [
      {
        id: 'f4-1',
        kind: 'choice',
        prompt: 'Select the correct verb: "Every one of the students _____ attended the lecture."',
        choices: ['have', 'has'],
        answer: 'has',
      },
      {
        id: 'f4-2',
        kind: 'gap-fill',
        prompt: 'The team _____ (have) been training for three months.',
        answer: 'has',
        explanation: 'Collective noun — default to singular in British English.',
      },
      {
        id: 'f4-3',
        kind: 'rewrite',
        prompt: 'Correct: "The range of problems we face are significant."',
        answer: 'The range of problems we face is significant.',
      },
      {
        id: 'f4-4',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'Either the director or his assistants is lying.',
          'Either the director or his assistants are lying.',
        ],
        answer: 'Either the director or his assistants are lying.',
      },
    ],
    extension: {
      prompt:
        'Write a 70-word paragraph on a group or team you belong to, using at least one collective noun, one "each of" phrase, and one distractor-phrase sentence.',
      minWords: 70,
    },
    noticing: [
      { text: 'Of-phrase distractor', context: 'The list of students is on the board.' },
      { text: '"Each of" is singular', context: 'Each of the proposals addresses a concern.' },
      {
        text: 'Neither…nor agrees with the nearer subject',
        context: 'Neither the manager nor the employees are available.',
      },
      { text: 'Collective noun default', context: 'The team has been training for three months.' },
    ],
    estimatedMinutes: 32,
    publishedAt: '2026-05-13',
  },
  {
    id: 'f-w05-prepositions',
    day: 5,
    week: 5,
    phase: 2,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Prepositions of time, place, and movement.',
    subtitle: 'The small words that carry the weight.',
    hook: 'Prepositions are tiny and ruthless. The wrong one is invisible to your ear but obvious to the examiner. Learn them in collocations, not in lists.',
    theory:
      'Time: at (a clock time, noon, night), on (a day or date), in (a month, year, century, morning/afternoon/evening). Place: at (a specific point), on (a surface), in (an enclosed space or area). Movement: to (destination), from (origin), into (entering), through (crossing), across (from one side to the other). Twenty fixed collocations Vietnamese learners routinely mis-pair: at the weekend (UK) / on the weekend (US), on the bus, in the photo, at university, in the end vs at the end.',
    examples: [
      { text: 'We meet at six on Fridays.', register: 'B1' },
      { text: 'She has been studying at the university for three years.', register: 'B2' },
      {
        text: 'Throughout the decade, migration patterns shifted from coastal provinces to the interior.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'I will meet you in six o’clock.',
        right: 'I will meet you at six o’clock.',
        why: 'Clock times take "at", not "in".',
      },
      {
        wrong: 'She lives in the second floor.',
        right: 'She lives on the second floor.',
        why: 'Floors of a building take "on".',
      },
      {
        wrong: 'We discussed about the problem for two hours.',
        right: 'We discussed the problem for two hours.',
        why: '"Discuss" is transitive — no preposition before the object.',
      },
    ],
    practice: [
      {
        id: 'f5-1',
        kind: 'gap-fill',
        prompt: 'The conference begins _____ Monday _____ nine _____ the morning.',
        answer: 'on · at · in',
      },
      {
        id: 'f5-2',
        kind: 'choice',
        prompt: 'Which preposition is correct? "She walked _____ the bridge to the other side."',
        choices: ['on', 'over', 'across', 'through'],
        answer: 'across',
      },
      {
        id: 'f5-3',
        kind: 'rewrite',
        prompt: 'Correct: "He is waiting at the bus since eight."',
        answer: 'He has been waiting at the bus stop since eight.',
      },
      {
        id: 'f5-4',
        kind: 'gap-fill',
        prompt: 'The photograph _____ the wall was taken _____ 2015 _____ Hanoi.',
        answer: 'on · in · in',
      },
    ],
    extension: {
      prompt:
        'Write a 70-word paragraph describing your journey from home to school, using at least six prepositions of time, place, or movement.',
      minWords: 70,
    },
    noticing: [
      { text: 'at + clock time', context: 'We meet at six.' },
      { text: 'on + day/surface', context: 'She lives on the second floor.' },
      { text: 'discuss (no preposition)', context: 'We discussed the problem for two hours.' },
      { text: 'across + movement', context: 'She walked across the bridge.' },
    ],
    estimatedMinutes: 35,
    publishedAt: '2026-05-20',
  },
  {
    id: 'f-w06-conjunctions',
    day: 6,
    week: 6,
    phase: 3,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Coordinating conjunctions.',
    subtitle: 'And, but, or, so — the workhorses.',
    hook: 'A run-on sentence (two independent clauses with no join) is one of the top three errors examiners circle. The fix is often a single coordinating conjunction.',
    theory:
      'Seven coordinators: FANBOYS — for, and, nor, but, or, yet, so. They join two independent clauses, always preceded by a comma when the clauses are complete: "She studied hard, and she passed the exam." Without a comma, use a different structure (semicolon or subordinator). Do not start every sentence with "And" or "But" — it reads as spoken English. In Task 2, use "however", "moreover", or rebuild the sentence.',
    examples: [
      { text: 'I was tired, but I finished my homework.', register: 'B1' },
      { text: 'The project was delayed, yet the client remained supportive.', register: 'B2' },
      {
        text: 'Funding was cut mid-cycle, and several initiatives consequently stalled.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'I went to the store I bought some milk.',
        right:
          'I went to the store and bought some milk. (or: I went to the store, and I bought some milk.)',
        why: 'Two independent clauses need a conjunction or other join. Run-on.',
      },
      {
        wrong: 'She is clever but, lazy.',
        right: 'She is clever but lazy.',
        why: 'No comma between two adjectives joined by "but" when there is no new clause.',
      },
      {
        wrong: 'And in conclusion, education is important.',
        right: 'In conclusion, education is important.',
        why: 'Avoid starting a formal paragraph with "And". Use a conjunct like "In conclusion" or "Furthermore".',
      },
    ],
    practice: [
      {
        id: 'f6-1',
        kind: 'gap-fill',
        prompt: 'She studied hard, _____ she did not pass the examination.',
        answer: 'yet',
        explanation: '"Yet" and "but" both signal contrast; "yet" adds a slight surprise.',
      },
      {
        id: 'f6-2',
        kind: 'rewrite',
        prompt: 'Fix the run-on: "He was late the meeting had already started."',
        answer: 'He was late, and the meeting had already started.',
      },
      {
        id: 'f6-3',
        kind: 'choice',
        prompt: 'Which sentence is correctly punctuated?',
        choices: [
          'I wanted to leave but I waited.',
          'I wanted to leave, but I waited.',
          'I wanted to leave, but, I waited.',
        ],
        answer: 'I wanted to leave, but I waited.',
      },
      {
        id: 'f6-4',
        kind: 'rewrite',
        prompt: 'Combine with a coordinator: "The report was long. The reader gave up."',
        answer: 'The report was long, so the reader gave up.',
      },
    ],
    extension: {
      prompt:
        'Write a 60-word paragraph about a decision you made recently. Use three of the FANBOYS coordinators, each with a comma where appropriate.',
      minWords: 60,
    },
    noticing: [
      {
        text: 'Comma + coordinator joins two clauses',
        context: 'I was tired, but I finished my homework.',
      },
      { text: 'No comma between two adjectives', context: 'She is clever but lazy.' },
      {
        text: 'Run-on without coordinator is wrong',
        context: 'I went to the store and bought some milk.',
      },
      {
        text: 'Avoid starting formal sentences with "And" or "But"',
        context: 'In conclusion, education is important.',
      },
    ],
    estimatedMinutes: 32,
    publishedAt: '2026-05-27',
  },
  {
    id: 'f-w07-comparatives',
    day: 7,
    week: 7,
    phase: 3,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Comparatives and superlatives.',
    subtitle: 'Better, best, and everything between.',
    hook: '"More better" is heard every week in a Vietnamese classroom. Double-marking a comparative is one of the easiest errors to eliminate — and one of the fastest ways to move a paragraph off Band 5.',
    theory:
      'Short adjectives (one syllable, or two ending in -y): add -er / -est. Tall → taller, tallest. Happy → happier, happiest. Long adjectives: use more / most. Expensive → more expensive, most expensive. Irregulars: good → better → best; bad → worse → worst; far → farther/further → farthest/furthest. Use "than" with comparatives; "the" with superlatives: "taller than his brother", "the tallest in the class". Never combine -er with "more" ("more better" is not English).',
    examples: [
      { text: 'My sister is taller than I am.', register: 'B1' },
      {
        text: 'Online courses are often more affordable than traditional classroom programmes.',
        register: 'B2',
      },
      {
        text: 'The revised framework proved markedly more robust than its predecessor.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'She is more taller than her brother.',
        right: 'She is taller than her brother.',
        why: '"Taller" is already comparative. Don’t add "more".',
      },
      {
        wrong: 'This is the most good restaurant in the area.',
        right: 'This is the best restaurant in the area.',
        why: '"Good" has an irregular superlative: best. Not "most good".',
      },
      {
        wrong: 'My car is more expensive that yours.',
        right: 'My car is more expensive than yours.',
        why: '"Than" (with an n) is the comparison word. "That" is a relative pronoun.',
      },
    ],
    practice: [
      {
        id: 'f7-1',
        kind: 'gap-fill',
        prompt: 'This book is _____ (interesting) than the one I read last month.',
        answer: 'more interesting',
      },
      {
        id: 'f7-2',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'Today is hoter than yesterday.',
          'Today is more hot than yesterday.',
          'Today is hotter than yesterday.',
        ],
        answer: 'Today is hotter than yesterday.',
        explanation:
          'Short adjectives ending in a single consonant after a vowel double the consonant: hot → hotter.',
      },
      {
        id: 'f7-3',
        kind: 'gap-fill',
        prompt: 'Mount Fansipan is _____ (high) mountain in Vietnam.',
        answer: 'the highest',
      },
      {
        id: 'f7-4',
        kind: 'rewrite',
        prompt: 'Correct: "My English is more better than last year."',
        answer: 'My English is better than last year.',
      },
    ],
    extension: {
      prompt:
        'Write a 60-word paragraph comparing two cities you know. Use at least two comparatives and one superlative.',
      minWords: 60,
    },
    noticing: [
      { text: 'Short adjective + -er', context: 'My sister is taller than I am.' },
      { text: 'Long adjective + more', context: 'Online courses are more affordable.' },
      { text: 'Irregular superlative', context: 'The best restaurant in the area.' },
      { text: 'than vs that', context: 'More expensive than yours.' },
    ],
    estimatedMinutes: 30,
    publishedAt: '2026-06-03',
  },
  {
    id: 'f-w08-basic-modals',
    day: 8,
    week: 8,
    phase: 3,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Basic modal verbs.',
    subtitle: 'Can, should, must, will.',
    hook: 'Four modals do most of the work for a Band 5.5 writer: can (ability and possibility), should (advice), must (strong obligation), will (prediction and decision). Each has a shape you never decline.',
    theory:
      'Modals are followed by the base form: I can swim (not "I can to swim", not "I can swims"). They do not take -s in the third person: she should study (not "she shoulds"). Negate with "not": cannot, should not, must not, will not. Do not stack modals: "I will can" is wrong — use "I will be able to". Strong obligation = must (internal) or have to (external). Advice = should. Prohibition = must not. Absence of obligation = don’t have to (never "must not" for this meaning).',
    examples: [
      { text: 'You should call your mother more often.', register: 'B1' },
      { text: 'Travellers must present a valid visa at the border.', register: 'B2' },
      {
        text: 'Candidates may wish to consult the guidelines before submitting their application.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'She cans drive a truck.',
        right: 'She can drive a truck.',
        why: 'Modals never take -s in the third person singular.',
      },
      {
        wrong: 'You must not to smoke here.',
        right: 'You must not smoke here.',
        why: 'Modals are followed by the base form, without "to".',
      },
      {
        wrong: 'Tomorrow I will can finish the report.',
        right: 'Tomorrow I will be able to finish the report.',
        why: 'You cannot stack two modals. Replace "can" with "be able to".',
      },
    ],
    practice: [
      {
        id: 'f8-1',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'You must not to bring food into the library.',
          'You must not bring food into the library.',
          'You mustn’t to bring food into the library.',
        ],
        answer: 'You must not bring food into the library.',
      },
      {
        id: 'f8-2',
        kind: 'gap-fill',
        prompt: 'Students _____ (should) complete the reading before class.',
        answer: 'should',
      },
      {
        id: 'f8-3',
        kind: 'rewrite',
        prompt: 'Rewrite using "be able to": "I can will finish it tomorrow."',
        answer: 'I will be able to finish it tomorrow.',
      },
      {
        id: 'f8-4',
        kind: 'choice',
        prompt: 'Which sentence means "it is not necessary"?',
        choices: ['You must not work on weekends.', 'You don’t have to work on weekends.'],
        answer: 'You don’t have to work on weekends.',
      },
    ],
    extension: {
      prompt:
        'Write a 60-word paragraph of advice to a new student at your school, using at least three different modal verbs.',
      minWords: 60,
    },
    noticing: [
      { text: 'Modal + base verb, no -s', context: 'She can drive a truck.' },
      { text: 'must not vs don’t have to', context: 'You don’t have to work on weekends.' },
      { text: 'No stacked modals', context: 'I will be able to finish it tomorrow.' },
      { text: 'Modal negated with "not"', context: 'You must not smoke here.' },
    ],
    estimatedMinutes: 32,
    publishedAt: '2026-06-10',
  },
  {
    id: 'f-w09-first-conditional',
    day: 9,
    week: 9,
    phase: 3,
    discipline: 'grammar',
    level: 'foundation',
    title: 'The first conditional.',
    subtitle: 'If this happens, that follows.',
    hook: 'The first conditional is the workhorse of Task 2 predictions. If cities fail to plan, traffic will worsen. The shape is fixed and examinable.',
    theory:
      'Formula: If + present simple, will + base verb. Treats a real or likely future. "If the government invests, the economy will grow." The if-clause uses present (never will). The main clause uses will + base (or may, can, should, might for softer predictions). "Unless" means "if not": "Unless we act, nothing will change." "Provided that" and "as long as" are formal replacements for "if".',
    examples: [
      { text: 'If it rains tomorrow, we will stay at home.', register: 'B1' },
      {
        text: 'If the policy passes, local businesses will benefit within a year.',
        register: 'B2',
      },
      {
        text: 'Provided that funding is secured, the project will commence in the autumn.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'If it will rain, I will stay home.',
        right: 'If it rains, I will stay home.',
        why: 'No "will" in the if-clause of a first conditional.',
      },
      {
        wrong: 'Unless you don’t study, you will fail.',
        right: 'Unless you study, you will fail.',
        why: '"Unless" already means "if not". Don’t add another negation.',
      },
      {
        wrong: 'If I have time tomorrow, I would call you.',
        right: 'If I have time tomorrow, I will call you.',
        why: 'The first conditional uses "will", not "would", in the main clause.',
      },
    ],
    practice: [
      {
        id: 'f9-1',
        kind: 'gap-fill',
        prompt: 'If the traffic _____ (get) worse, the city _____ (need) to build a metro.',
        answer: 'gets · will need',
      },
      {
        id: 'f9-2',
        kind: 'rewrite',
        prompt: 'Rewrite using "unless": "If we do not act, pollution will increase."',
        answer: 'Unless we act, pollution will increase.',
      },
      {
        id: 'f9-3',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'If she will arrive early, we will start the meeting.',
          'If she arrives early, we will start the meeting.',
        ],
        answer: 'If she arrives early, we will start the meeting.',
      },
      {
        id: 'f9-4',
        kind: 'rewrite',
        prompt:
          'Replace "if" with "provided that": "If the budget is approved, construction will begin."',
        answer: 'Provided that the budget is approved, construction will begin.',
      },
    ],
    extension: {
      prompt:
        'Write a 70-word paragraph on what your city will look like in ten years. Use at least two first conditionals and one "unless" sentence.',
      minWords: 70,
    },
    noticing: [
      { text: 'If + present / will + base', context: 'If it rains, we will stay home.' },
      { text: 'unless = if not', context: 'Unless you study, you will fail.' },
      {
        text: 'Formal replacement for if',
        context: 'Provided that funding is secured, the project will commence.',
      },
      {
        text: 'Softer prediction with may',
        context: 'If she arrives early, we may start the meeting.',
      },
    ],
    estimatedMinutes: 32,
    publishedAt: '2026-06-17',
  },
  {
    id: 'f-w10-present-perfect-vs-past',
    day: 10,
    week: 10,
    phase: 4,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Present perfect vs past simple.',
    subtitle: 'Have done, or did?',
    hook: 'The present perfect describes an event connected to now: I have lived in Hanoi since 2019. The past simple describes a finished event at a finished time: I lived in Hanoi in 2019. The examiner looks at your time markers to check the match.',
    theory:
      'Present perfect = have/has + past participle. Use it for (1) experience at any time up to now: "I have visited Japan"; (2) unfinished actions starting in the past: "I have worked here for three years"; (3) recent actions with present relevance: "She has just arrived". Past simple = verb + ed (or irregular). Use it for finished events at a specific finished time: yesterday, last year, in 2018. Time markers that trigger present perfect: since, for, already, yet, ever, never, just, recently. Time markers that trigger past simple: yesterday, ago, in + year, last + period, when + clause.',
    examples: [
      { text: 'I have lived here for five years.', register: 'B1' },
      { text: 'The company has expanded its operations since 2020.', register: 'B2' },
      {
        text: 'Researchers have identified three distinct phases in the adoption curve.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'I have seen him yesterday.',
        right: 'I saw him yesterday.',
        why: '"Yesterday" is a finished time — requires past simple, not present perfect.',
      },
      {
        wrong: 'She lives in Paris since 2015.',
        right: 'She has lived in Paris since 2015.',
        why: 'With "since", use present perfect to connect the past start to now.',
      },
      {
        wrong: 'When did you have visited this museum before?',
        right: 'When did you visit this museum? (or: Have you visited this museum before?)',
        why: 'You cannot combine the question word "when" with a present perfect verb.',
      },
    ],
    practice: [
      {
        id: 'f10-1',
        kind: 'gap-fill',
        prompt: 'I _____ (live) in this apartment for three years.',
        answer: 'have lived',
      },
      {
        id: 'f10-2',
        kind: 'gap-fill',
        prompt: 'Last summer I _____ (visit) my relatives in Da Lat.',
        answer: 'visited',
      },
      {
        id: 'f10-3',
        kind: 'choice',
        prompt: 'Which is correct?',
        choices: [
          'She has been to China in 2019.',
          'She went to China in 2019.',
          'She has gone to China in 2019.',
        ],
        answer: 'She went to China in 2019.',
      },
      {
        id: 'f10-4',
        kind: 'rewrite',
        prompt: 'Correct: "How long do you learn English?"',
        answer: 'How long have you been learning English?',
      },
    ],
    extension: {
      prompt:
        'Write a 70-word paragraph about changes in your life over the last five years. Use at least two present perfects and two past simples, each with an appropriate time marker.',
      minWords: 70,
    },
    noticing: [
      { text: 'Present perfect + since', context: 'I have lived here since 2019.' },
      { text: 'Past simple + ago', context: 'I saw him yesterday.' },
      { text: 'Present perfect for experience', context: 'I have visited Japan.' },
      { text: 'No when + present perfect', context: 'When did you visit this museum?' },
    ],
    estimatedMinutes: 38,
    publishedAt: '2026-06-24',
  },
  {
    id: 'f-w11-intro-passive',
    day: 11,
    week: 11,
    phase: 4,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Introduction to the passive voice.',
    subtitle: 'When the agent steps aside.',
    hook: 'The passive is a tool for shifting attention from the doer to the done. At Foundation level, the aim is to form it correctly in present and past — nothing more.',
    theory:
      'Formula: subject + be (tense) + past participle (+ by + agent). The rice is eaten. The letter was sent. Use the passive when the agent is unknown ("The window was broken"), obvious ("She was arrested"), or less important than the result ("English is spoken here"). Regular past participles: +ed. Irregulars must be learned — the five most confused are written, broken, taken, seen, done. Avoid the passive when it would hide a responsible actor your reader needs to identify.',
    examples: [
      { text: 'The homework is marked by the teacher.', register: 'B1' },
      { text: 'A new policy was announced by the Ministry last week.', register: 'B2' },
      {
        text: 'The findings are currently being reviewed by an independent panel.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'The report is writed every month.',
        right: 'The report is written every month.',
        why: 'Past participle of "write" is "written", not "writed".',
      },
      {
        wrong: 'The house built in 1920.',
        right: 'The house was built in 1920.',
        why: 'Passive needs a form of "be" — was built, not "built" alone.',
      },
      {
        wrong: 'The cake was eat by the children.',
        right: 'The cake was eaten by the children.',
        why: 'Past participle of "eat" is "eaten", not "eat".',
      },
    ],
    practice: [
      {
        id: 'f11-1',
        kind: 'rewrite',
        prompt: 'Make passive: "The teacher writes the questions."',
        answer: 'The questions are written by the teacher.',
      },
      {
        id: 'f11-2',
        kind: 'rewrite',
        prompt: 'Make passive: "Someone stole my phone."',
        answer: 'My phone was stolen.',
      },
      {
        id: 'f11-3',
        kind: 'gap-fill',
        prompt: 'Rice _____ (grow) in the Mekong Delta for centuries.',
        answer: 'has been grown',
        explanation: 'Present perfect passive — has/have + been + past participle.',
      },
      {
        id: 'f11-4',
        kind: 'choice',
        prompt: 'Which sentence is correctly formed?',
        choices: [
          'The book was written by Nguyen Nhat Anh.',
          'The book writted by Nguyen Nhat Anh.',
          'The book is wrote by Nguyen Nhat Anh.',
        ],
        answer: 'The book was written by Nguyen Nhat Anh.',
      },
    ],
    extension: {
      prompt:
        'Write a 60-word paragraph describing how a traditional dish from your region is made. Use at least three passive constructions.',
      minWords: 60,
    },
    noticing: [
      { text: 'Passive present', context: 'The homework is marked by the teacher.' },
      { text: 'Passive past', context: 'The letter was sent yesterday.' },
      { text: 'Passive without agent', context: 'The window was broken.' },
      { text: 'Common irregular participle', context: 'The cake was eaten by the children.' },
    ],
    estimatedMinutes: 35,
    publishedAt: '2026-07-01',
  },
  {
    id: 'f-w12-cohesion-minimum',
    day: 12,
    week: 12,
    phase: 4,
    discipline: 'grammar',
    level: 'foundation',
    title: 'Paragraph cohesion, minimum viable.',
    subtitle: 'First, next, finally — then better.',
    hook: 'At Band 5.5, a paragraph is often a bag of sentences. The fastest way to lift it is the smallest change: three linking words in the right places.',
    theory:
      'A Task 2 paragraph opens with a topic sentence, develops with 2–3 supporting sentences, and closes with a concluding sentence. Link them with three families of connectors: addition (furthermore, moreover, in addition), contrast (however, on the other hand, although), and consequence (therefore, as a result, consequently). Rule of thumb at Foundation: use no more than one connector per sentence, and avoid repeating the same one within a paragraph. Never start three sentences in a row with "and" or "but".',
    examples: [
      {
        text: 'First, traffic is a problem. However, pollution is worse. Therefore, the city should act now.',
        register: 'B1',
      },
      {
        text: 'The programme has been expanded. Moreover, the budget has been increased. As a result, more students benefit.',
        register: 'B2',
      },
      {
        text: 'The legislation addresses industrial output. Furthermore, it introduces domestic incentives. Consequently, both supply and demand are regulated.',
        register: 'C1',
      },
    ],
    mistakes: [
      {
        wrong: 'I like Hanoi. And it is beautiful. And it is historic. And it is my home.',
        right: 'I like Hanoi because it is beautiful, historic, and my home.',
        why: 'Three "and" sentences in a row read as childish. Combine into one.',
      },
      {
        wrong: 'However, the policy is effective, however, it is expensive.',
        right: 'The policy is effective; however, it is expensive.',
        why: 'Don’t repeat the same connector twice in the same sentence.',
      },
      {
        wrong: 'In addition with the cost, the project is slow.',
        right: 'In addition to the cost, the project is slow.',
        why: 'The collocation is "in addition to", not "in addition with".',
      },
    ],
    practice: [
      {
        id: 'f12-1',
        kind: 'gap-fill',
        prompt: 'The tax has been cut. _____ , consumer spending has risen.',
        answer: 'As a result',
        explanation: 'Any consequence connector works: therefore, as a result, consequently.',
      },
      {
        id: 'f12-2',
        kind: 'rewrite',
        prompt: 'Combine: "The city is crowded. The public transport is poor."',
        answer:
          'The city is crowded, and the public transport is poor. (or: Not only is the city crowded, but the public transport is also poor.)',
      },
      {
        id: 'f12-3',
        kind: 'choice',
        prompt: 'Which is the most natural?',
        choices: [
          'In addition with the traffic, the pollution is severe.',
          'In addition to the traffic, the pollution is severe.',
          'Addition the traffic, the pollution is severe.',
        ],
        answer: 'In addition to the traffic, the pollution is severe.',
      },
      {
        id: 'f12-4',
        kind: 'rewrite',
        prompt: 'Rewrite to add contrast: "Public transport is cheap. It is also slow."',
        answer: 'Public transport is cheap; however, it is slow.',
      },
    ],
    extension: {
      prompt:
        'Write a 100-word paragraph arguing whether students should wear uniforms. Use one addition, one contrast, and one consequence connector.',
      minWords: 100,
    },
    noticing: [
      { text: 'Addition connector', context: 'Moreover, the budget has been increased.' },
      { text: 'Contrast connector', context: 'However, pollution is worse.' },
      { text: 'Consequence connector', context: 'As a result, more students benefit.' },
      {
        text: 'Collocation "in addition to"',
        context: 'In addition to the cost, the project is slow.',
      },
    ],
    estimatedMinutes: 40,
    publishedAt: '2026-07-08',
  },
]
