import type { Test } from '../../schemas/test'

export const listening001: Test = {
  id: 'listening-001',
  skill: 'listening',
  title: 'Listening Test 01',
  description:
    'A full four-section listening paper — accommodation enquiry, library tour, essay tutorial, and an academic lecture on urban rivers.',
  difficulty: 'foundation',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-01',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-001-s1',
      number: 1,
      title: 'Section 1 — Accommodation enquiry',
      audioUrl: null,
      transcript:
        "AGENT: Good morning, Cambridge Student Accommodation, this is Rebecca speaking. STUDENT: Hello. I'm calling about the private-room flat on Grange Road. AGENT: Certainly. May I take your name? STUDENT: Yes, it's Tomas — T-O-M-A-S — Ruiz. R-U-I-Z. AGENT: And your student ID? STUDENT: Eight, two, three, nine, one, four. AGENT: Lovely. The rent is two hundred and sixty-five pounds per week — that includes water and wifi, but not electricity. STUDENT: I see. And the deposit? AGENT: Four weeks' rent in advance. The earliest move-in date is the fifteenth of September. STUDENT: Could I leave my mobile? It's oh-seven-seven-four, three-three-nine, eight-two-one-oh. AGENT: And an email? STUDENT: tomas.ruiz at camnet dot uk. AGENT: The flat has three bedrooms total — you'd share the kitchen and bathroom with two others. Council tax is band C. And the nearest bus stop is on Huntingdon Road. Viewings are on Tuesdays, four to six pm. STUDENT: Perfect. I'll come next Tuesday.",
      groups: [
        {
          id: 'l001-s1-g1',
          instruction:
            'Questions 1–10 · Complete the booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          questions: [
            {
              id: 'l001-q1',
              number: 1,
              type: 'form-completion',
              template:
                'BOOKING FORM\n\nApplicant\n  Surname: Ruiz\n  Given name: {blank1}\n  Student ID: {blank2}\n  Mobile (last 4 digits): {blank3}\n  Email domain: @{blank4}\n\nFlat\n  Weekly rent (£): {blank5}\n  Not included in rent: {blank6}\n  Deposit: {blank7} weeks\n  Total bedrooms: {blank8}\n  Nearest bus stop: {blank9} Road\n  Earliest move-in: {blank10} September',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: 'Tomas',
                  acceptableVariants: ['Thomas'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '823914', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: '8210', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: 'camnet.uk',
                  acceptableVariants: ['camnet'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: '265', acceptableVariants: ['£265'], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'electricity', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'four', acceptableVariants: ['4'], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'three', acceptableVariants: ['3'], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'Huntingdon', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank10',
                  correctAnswer: '15th',
                  acceptableVariants: ['15', 'fifteenth'],
                  maxWords: 1,
                },
              ],
              explanation:
                'Each answer is stated directly in the call. Names and the ID are spelled or read digit by digit; the remaining figures and words are quoted verbatim.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-001-s2',
      number: 2,
      title: 'Section 2 — Guided tour of the Taylor Library',
      audioUrl: null,
      transcript:
        "GUIDE: Welcome to the Taylor Library. Before you explore, a few orientation points. As you come through the main entrance you will see the front desk directly ahead — that is where you collect a reader card and ask for help. To the left of the front desk, along the west wall, is the Reference Room; it is open access and holds most of our encyclopaedias and atlases. The study booths — our most popular feature — are in the north-east corner of the ground floor, near the large window overlooking the quadrangle. Opposite the booths, on the south-east side, is the café. The quiet reading room is tucked behind the stairs in the south-west corner. On the first floor you will find the Rare Books Room — access by appointment only, with forty-eight hours' notice. The Periodicals Room is on the second floor; current journals are shelved by subject, older issues by year. Printing is free for the first fifty pages per term, then five pence per page. Laptops may be borrowed for a maximum of four hours per loan; you will need your reader card and a photo ID. Please do not eat in any room except the café.",
      groups: [
        {
          id: 'l001-s2-g1',
          instruction: 'Questions 11–14 · Choose the correct letter, A, B, or C.',
          questions: [
            {
              id: 'l001-q11',
              number: 11,
              type: 'multiple-choice',
              prompt: 'What is held in the Reference Room?',
              options: [
                { key: 'A', text: 'Rare archival manuscripts' },
                { key: 'B', text: 'Encyclopaedias and atlases' },
                { key: 'C', text: 'Reserved textbooks for courses' },
              ],
              correctAnswer: 'B',
              explanation: 'The Reference Room "holds most of our encyclopaedias and atlases".',
            },
            {
              id: 'l001-q12',
              number: 12,
              type: 'multiple-choice',
              prompt: 'How is access to the Rare Books Room managed?',
              options: [
                { key: 'A', text: "By appointment, with 48 hours' notice" },
                { key: 'B', text: 'Walk-in between 10am and 4pm' },
                { key: 'C', text: 'By academic staff only' },
              ],
              correctAnswer: 'A',
              explanation: '"Access by appointment only, with forty-eight hours\' notice."',
            },
            {
              id: 'l001-q13',
              number: 13,
              type: 'multiple-choice',
              prompt: 'How are older journal issues in the Periodicals Room shelved?',
              options: [
                { key: 'A', text: 'By subject' },
                { key: 'B', text: 'Alphabetically by title' },
                { key: 'C', text: 'By year' },
              ],
              correctAnswer: 'C',
              explanation: '"Current journals are shelved by subject, older issues by year."',
            },
            {
              id: 'l001-q14',
              number: 14,
              type: 'multiple-choice',
              prompt: 'Which documents do you need to borrow a laptop?',
              options: [
                { key: 'A', text: 'Reader card only' },
                { key: 'B', text: 'Reader card and a photo ID' },
                { key: 'C', text: "A tutor's signed form" },
              ],
              correctAnswer: 'B',
              explanation: '"You will need your reader card and a photo ID."',
            },
          ],
        },
        {
          id: 'l001-s2-g2',
          instruction:
            'Questions 15–17 · Label the library map. Choose the correct letter A–D for each feature.',
          questions: [
            {
              id: 'l001-q15',
              number: 15,
              type: 'plan-map-diagram',
              imageUrl:
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" fill="%23EEE7D8" stroke="%23C9BFA8"/><text x="100" y="20" font-size="8" text-anchor="middle" font-family="monospace">TAYLOR LIBRARY — GROUND FLOOR</text><text x="12" y="110" font-size="7" font-family="monospace">WEST</text><text x="175" y="110" font-size="7" font-family="monospace">EAST</text><circle cx="50" cy="50" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="50" y="53" font-size="8" text-anchor="middle" font-family="monospace">A</text><circle cx="150" cy="50" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="150" y="53" font-size="8" text-anchor="middle" font-family="monospace">B</text><circle cx="150" cy="150" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="150" y="153" font-size="8" text-anchor="middle" font-family="monospace">C</text><circle cx="50" cy="150" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="50" y="153" font-size="8" text-anchor="middle" font-family="monospace">D</text></svg>',
              labels: [
                { id: 'study-booths', x: 150, y: 50 },
                { id: 'cafe', x: 150, y: 150 },
                { id: 'quiet-room', x: 50, y: 150 },
              ],
              options: [
                { key: 'A', text: 'North-west corner' },
                { key: 'B', text: 'North-east corner' },
                { key: 'C', text: 'South-east corner' },
                { key: 'D', text: 'South-west corner' },
              ],
              correctMapping: { 'study-booths': 'B', cafe: 'C', 'quiet-room': 'D' },
              explanation:
                'Study booths are in the north-east corner; the café is opposite, in the south-east; the quiet reading room is in the south-west corner.',
            },
          ],
        },
        {
          id: 'l001-s2-g3',
          instruction:
            'Questions 18–20 · Complete each sentence with NO MORE THAN TWO WORDS AND/OR A NUMBER.',
          questions: [
            {
              id: 'l001-q18',
              number: 18,
              type: 'sentence-completion',
              sentenceBefore: 'Printing is free for the first',
              sentenceAfter: 'pages per term.',
              correctAnswer: '50',
              acceptableVariants: ['fifty', '50 pages'],
              maxWords: 2,
              explanation: '"Printing is free for the first fifty pages per term."',
            },
            {
              id: 'l001-q19',
              number: 19,
              type: 'sentence-completion',
              sentenceBefore: 'After that, each page costs',
              sentenceAfter: 'pence.',
              correctAnswer: 'five',
              acceptableVariants: ['5', '5p'],
              maxWords: 1,
              explanation: '"Then five pence per page."',
            },
            {
              id: 'l001-q20',
              number: 20,
              type: 'sentence-completion',
              sentenceBefore: 'Laptop loans are capped at',
              sentenceAfter: 'hours.',
              correctAnswer: 'four',
              acceptableVariants: ['4'],
              maxWords: 1,
              explanation: '"For a maximum of four hours per loan."',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-001-s3',
      number: 3,
      title: 'Section 3 — Essay tutorial',
      audioUrl: null,
      transcript:
        "TUTOR: So, Tomas, you want to discuss your coursework essay — on which topic? STUDENT: The one about urbanisation and ageing populations. TUTOR: Right. Three comments on structure. First, your introduction tells me what you will argue, but not why the question matters. Ground the reader. Second, paragraph three — you claim the Tokyo case is decisive, but you cite only one source. Widen it. Third, your conclusion paraphrases the introduction. Push further. STUDENT: Understood. TUTOR: On the sources. Your bibliography uses Harvard style inconsistently — sometimes with page numbers, sometimes without. Be precise. Also, you rely heavily on Weaver 2015; I would balance that with Park and Shin 2019, who disagree with Weaver on the mortality projections. STUDENT: I have not read Park and Shin. TUTOR: The library has a copy. On the argument, your central claim is that Tokyo's approach to silver-economy housing is a model. I am less convinced. Consider Seoul, which deliberately rejected that model in 2014 on cost grounds. You should at least engage with the counter-case. STUDENT: I will add a paragraph on Seoul. TUTOR: And the word count — please keep it under two thousand words. You are three hundred over. Finally, please resubmit a draft on the fifteenth. Not the fourteenth, not the sixteenth — the fifteenth. That is two weeks from today.",
      groups: [
        {
          id: 'l001-s3-g1',
          instruction:
            "Questions 21–23 · Match each part of the essay with the tutor's advice. Write A, B, C, D, or E.",
          questions: [
            {
              id: 'l001-q21',
              number: 21,
              type: 'matching',
              items: [
                { id: 'intro', text: 'Introduction' },
                { id: 'body', text: 'Paragraph three (Tokyo case)' },
                { id: 'conclusion', text: 'Conclusion' },
              ],
              options: [
                { key: 'A', text: 'Cite a wider range of sources' },
                { key: 'B', text: 'Ground the reader in why the question matters' },
                { key: 'C', text: 'Use more technical vocabulary' },
                { key: 'D', text: 'Push further rather than restate the introduction' },
                { key: 'E', text: 'Reduce the word count' },
              ],
              correctMapping: { intro: 'B', body: 'A', conclusion: 'D' },
              explanation:
                'In order: the introduction lacks grounding, the body paragraph relies on one source, the conclusion paraphrases the introduction.',
            },
          ],
        },
        {
          id: 'l001-s3-g2',
          instruction: 'Questions 24–27 · Choose the correct letter, A, B, or C.',
          questions: [
            {
              id: 'l001-q24',
              number: 24,
              type: 'multiple-choice',
              prompt: "What is the tutor's criticism of the bibliography?",
              options: [
                { key: 'A', text: 'It is too short' },
                { key: 'B', text: 'It uses Harvard style inconsistently' },
                { key: 'C', text: 'It omits primary sources' },
              ],
              correctAnswer: 'B',
              explanation: '"Your bibliography uses Harvard style inconsistently."',
            },
            {
              id: 'l001-q25',
              number: 25,
              type: 'multiple-choice',
              prompt: 'Which author does the tutor recommend to balance Weaver 2015?',
              options: [
                { key: 'A', text: 'Park and Shin 2019' },
                { key: 'B', text: 'Tanaka 2018' },
                { key: 'C', text: 'Hartwell 2020' },
              ],
              correctAnswer: 'A',
              explanation: '"I would balance that with Park and Shin 2019."',
            },
            {
              id: 'l001-q26',
              number: 26,
              type: 'multiple-choice',
              prompt: "What does the tutor say about Seoul's 2014 decision?",
              options: [
                { key: 'A', text: 'It followed the Tokyo model closely' },
                { key: 'B', text: 'It rejected the Tokyo model on cost grounds' },
                { key: 'C', text: 'It has since been reversed' },
              ],
              correctAnswer: 'B',
              explanation:
                '"Seoul, which deliberately rejected that model in 2014 on cost grounds."',
            },
            {
              id: 'l001-q27',
              number: 27,
              type: 'multiple-choice',
              prompt: 'On which day should Tomas resubmit?',
              options: [
                { key: 'A', text: 'The fourteenth' },
                { key: 'B', text: 'The fifteenth' },
                { key: 'C', text: 'The sixteenth' },
              ],
              correctAnswer: 'B',
              explanation: '"Not the fourteenth, not the sixteenth — the fifteenth."',
            },
          ],
        },
        {
          id: 'l001-s3-g3',
          instruction:
            'Questions 28–30 · Complete each sentence with NO MORE THAN TWO WORDS AND/OR A NUMBER.',
          questions: [
            {
              id: 'l001-q28',
              number: 28,
              type: 'sentence-completion',
              sentenceBefore: 'The essay is currently',
              sentenceAfter: 'words over the word limit.',
              correctAnswer: '300',
              acceptableVariants: ['three hundred'],
              maxWords: 2,
              explanation: '"You are three hundred over."',
            },
            {
              id: 'l001-q29',
              number: 29,
              type: 'sentence-completion',
              sentenceBefore: 'The word-count limit is',
              sentenceAfter: 'words.',
              correctAnswer: '2000',
              acceptableVariants: ['two thousand', '2,000'],
              maxWords: 2,
              explanation: '"Please keep it under two thousand words."',
            },
            {
              id: 'l001-q30',
              number: 30,
              type: 'sentence-completion',
              sentenceBefore: 'The resubmission is due in',
              sentenceAfter: 'weeks.',
              correctAnswer: 'two',
              acceptableVariants: ['2'],
              maxWords: 1,
              explanation: '"That is two weeks from today."',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-001-s4',
      number: 4,
      title: 'Section 4 — Lecture on urban rivers',
      audioUrl: null,
      transcript:
        "LECTURER: Good afternoon. Today's lecture is on freshwater flow in urban rivers. I want to focus on three pressure points. First, channelisation — the nineteenth-century practice of straightening rivers in stone or concrete. It speeds flow but removes habitat. Second, impervious surfaces — the asphalt and roof cover of a modern city means rainwater cannot soak in; it rushes straight to the river. Third, culverts — sections of river forced underground through pipes. In London, the River Fleet has been culverted since the 1860s and still flows beneath Farringdon Road. Culverting is cheap to install but extremely expensive to reverse. A useful case study is the Cheonggyecheon in Seoul, which was decommissioned as a motorway in 2003 and restored as an open river over twenty months, at a cost of nine hundred million US dollars. The restored stream now carries two hundred thousand visitors a day. Biodiversity, measured by invertebrate species count, rose sevenfold within three years of reopening. A second case is the Saw Mill River in the state of New York, daylit in 2012 for a much more modest budget of thirty-four million dollars. And a third, smaller project is the Quaggy in south-east London, restored in 2007 — the first restoration in a major British city. The lessons are consistent: urban river restoration is politically difficult and financially serious, but the benefits — ecological, hydrological, and even economic — compound quickly. Remember, for your assessment, that the three pressures are the answers, not the restorations.",
      groups: [
        {
          id: 'l001-s4-g1',
          instruction:
            'Questions 31–35 · Complete the table. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          questions: [
            {
              id: 'l001-q31',
              number: 31,
              type: 'note-table-completion',
              tableHtml:
                '<table class="w-full text-sm"><thead><tr><th class="text-left pb-2 border-b border-line">Pressure</th><th class="text-left pb-2 border-b border-line">Consequence</th></tr></thead><tbody><tr><td class="py-2 pr-4">Channelisation (straightening in concrete)</td><td class="py-2">Speeds flow but removes {blank1}</td></tr><tr><td class="py-2 pr-4">{blank2} surfaces (asphalt, rooftops)</td><td class="py-2">Rainwater cannot soak in — it rushes to the river</td></tr><tr><td class="py-2 pr-4">Culverts (rivers underground)</td><td class="py-2">The River {blank3} runs beneath Farringdon Road in London</td></tr><tr><td class="py-2 pr-4">Culverting — installation cost</td><td class="py-2">Cheap, but very {blank4} to reverse</td></tr><tr><td class="py-2 pr-4">Pressures in total</td><td class="py-2">{blank5} distinct pressure points identified</td></tr></tbody></table>',
              blanks: [
                { id: 'blank1', correctAnswer: 'habitat', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'impervious', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'Fleet', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: 'expensive',
                  acceptableVariants: ['costly'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: 'three', acceptableVariants: ['3'], maxWords: 1 },
              ],
              explanation:
                'Each answer is spoken directly in the relevant sentence of the transcript.',
            },
          ],
        },
        {
          id: 'l001-s4-g2',
          instruction:
            'Questions 36–40 · Answer the questions. Write NO MORE THAN THREE WORDS AND/OR A NUMBER.',
          questions: [
            {
              id: 'l001-q36',
              number: 36,
              type: 'short-answer',
              question: 'In which year was the Cheonggyecheon decommissioned as a motorway?',
              correctAnswer: '2003',
              acceptableVariants: [],
              maxWords: 1,
              explanation: '"Decommissioned as a motorway in 2003."',
            },
            {
              id: 'l001-q37',
              number: 37,
              type: 'short-answer',
              question: 'How much did the Cheonggyecheon restoration cost, in US dollars?',
              correctAnswer: '900 million',
              acceptableVariants: ['$900 million', '900,000,000', 'nine hundred million'],
              maxWords: 3,
              explanation: '"At a cost of nine hundred million US dollars."',
            },
            {
              id: 'l001-q38',
              number: 38,
              type: 'short-answer',
              question:
                'By what factor did invertebrate species count rise within three years of the Cheonggyecheon reopening?',
              correctAnswer: 'sevenfold',
              acceptableVariants: ['seven-fold', 'seven times', 'seven'],
              maxWords: 1,
              explanation: '"Biodiversity … rose sevenfold within three years."',
            },
            {
              id: 'l001-q39',
              number: 39,
              type: 'short-answer',
              question: 'In which year was the Saw Mill River daylit?',
              correctAnswer: '2012',
              acceptableVariants: [],
              maxWords: 1,
              explanation: '"Daylit in 2012."',
            },
            {
              id: 'l001-q40',
              number: 40,
              type: 'short-answer',
              question:
                "In which south-east London borough's river, restored in 2007, was the first major British urban river restoration carried out?",
              correctAnswer: 'Quaggy',
              acceptableVariants: ['the Quaggy'],
              maxWords: 2,
              explanation: '"The Quaggy in south-east London, restored in 2007."',
            },
          ],
        },
      ],
    },
  ],
}
