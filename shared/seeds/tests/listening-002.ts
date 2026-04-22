import type { Test } from '../../schemas/test'

export const listening002: Test = {
  id: 'listening-002',
  skill: 'listening',
  title: 'Listening Test 02',
  description:
    'Four sections — a marine charity volunteer registration, an orientation walk, a dissertation supervision, and a public lecture on the Gulf Stream.',
  difficulty: 'intermediate',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-03',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-002-s1',
      number: 1,
      title: 'Section 1 — Volunteer registration',
      audioUrl: null,
      transcript:
        "COORDINATOR: Welcome to the Marine Conservation Society. Have you volunteered with a marine charity before? VOLUNTEER: Not with a marine one, no. But I spent a summer monitoring puffins in the Orkneys. COORDINATOR: Lovely. Could I take your details? VOLUNTEER: Yes, it's Priya — P-R-I-Y-A — Menon, M-E-N-O-N. COORDINATOR: Age? VOLUNTEER: Twenty-six. COORDINATOR: Occupation? VOLUNTEER: Junior architect. COORDINATOR: Mobile? VOLUNTEER: Oh-seven-eight-one-two, four-four-nine, six-oh-two-one. COORDINATOR: Email? VOLUNTEER: priya dot menon at proton dot me. COORDINATOR: Three volunteering roles right now — beach surveys, data entry for our cetacean sightings database, and public outreach at weekends. Public outreach is the most urgent; we are short-handed every Saturday until August. Beach surveys suit anyone who likes an early start — we meet at six-fifteen by the lighthouse. Data entry is weekday evenings, Monday and Wednesday, seven to nine. VOLUNTEER: I can do Saturdays and the data entry. COORDINATOR: Perfect. The induction session is on the fourth of May, one hour, at our Wapping office — the address is 14 Swan Lane. A formal ID will be required at the door. Annual membership, if you wish to join, is twenty-eight pounds; it covers insurance for fieldwork. VOLUNTEER: Sign me up for membership too.",
      groups: [
        {
          id: 'l002-s1-g1',
          instruction:
            'Questions 1–10 · Complete the registration form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          questions: [
            {
              id: 'l002-q1',
              number: 1,
              type: 'form-completion',
              template:
                'REGISTRATION FORM\n\nApplicant\n  Given name: {blank1}\n  Surname: {blank2}\n  Age: {blank3}\n  Occupation: {blank4}\n  Mobile (last 4 digits): {blank5}\n  Email provider: {blank6}\n\nVolunteering\n  Beach survey meeting point: {blank7}\n  Data-entry days: Mon and {blank8}\n  Induction date: {blank9} May\n  Annual membership (£): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Priya', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'Menon', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank3',
                  correctAnswer: '26',
                  acceptableVariants: ['twenty-six'],
                  maxWords: 1,
                },
                {
                  id: 'blank4',
                  correctAnswer: 'junior architect',
                  acceptableVariants: ['architect'],
                  maxWords: 2,
                },
                { id: 'blank5', correctAnswer: '6021', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: 'proton.me',
                  acceptableVariants: ['proton'],
                  maxWords: 1,
                },
                {
                  id: 'blank7',
                  correctAnswer: 'lighthouse',
                  acceptableVariants: ['the lighthouse'],
                  maxWords: 2,
                },
                {
                  id: 'blank8',
                  correctAnswer: 'Wednesday',
                  acceptableVariants: ['Wed'],
                  maxWords: 1,
                },
                {
                  id: 'blank9',
                  correctAnswer: '4th',
                  acceptableVariants: ['4', 'fourth'],
                  maxWords: 1,
                },
                {
                  id: 'blank10',
                  correctAnswer: '28',
                  acceptableVariants: ['£28', 'twenty-eight'],
                  maxWords: 1,
                },
              ],
              explanation:
                'Each answer is spoken directly — names and phone digits are spelled out; other items are stated verbatim.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-002-s2',
      number: 2,
      title: 'Section 2 — Orientation walk through the harbour station',
      audioUrl: null,
      transcript:
        "GUIDE: Welcome, everyone, to the harbour station. Let's walk through the site. Just past the main gate is the visitor centre — that's where you pick up a laminated day-pass and the safety sheet. To the north of the visitor centre, along the quayside, is the main research pier; all the tide gauges are there, and most of our outreach happens from the pier head. To the east, on the far side of the car park, is the boatshed — that's where dinghies are kept, and also where our boat licensing runs every second Saturday. South of the car park is the seawater aquarium; it's open to the public on Sundays. And the small green cabin at the western edge is the data office — don't go in unless you have been invited; the servers run hot and the door is usually closed. A tidal measurement begins at a gauge — a fixed sensor in a stilling well on the pier. From the gauge, the signal is transmitted by cable to the shore station, where it is filtered for wave noise. The filtered signal is then uploaded to the regional hub, which compares it with predicted astronomical tide curves. Any difference between the reading and the prediction is called the residual, and residuals are forwarded to the national marine service for archive and flood-risk analysis.",
      groups: [
        {
          id: 'l002-s2-g1',
          instruction:
            'Questions 11–15 · Label the site map. Choose the correct letter A–E for each location.',
          questions: [
            {
              id: 'l002-q11',
              number: 11,
              type: 'plan-map-diagram',
              imageUrl:
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" fill="%23EEE7D8" stroke="%23C9BFA8"/><text x="100" y="20" font-size="7" text-anchor="middle" font-family="monospace">HARBOUR STATION</text><text x="95" y="108" font-size="6" text-anchor="middle" font-family="monospace">CAR PARK</text><text x="95" y="115" font-size="6" text-anchor="middle" font-family="monospace">(centre)</text><circle cx="100" cy="40" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="100" y="43" font-size="8" text-anchor="middle" font-family="monospace">A</text><circle cx="160" cy="100" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="160" y="103" font-size="8" text-anchor="middle" font-family="monospace">B</text><circle cx="100" cy="160" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="100" y="163" font-size="8" text-anchor="middle" font-family="monospace">C</text><circle cx="40" cy="100" r="9" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="40" y="103" font-size="8" text-anchor="middle" font-family="monospace">D</text><circle cx="100" cy="75" r="7" fill="%23FAF7EF" stroke="%236B1F1A" stroke-width="2"/><text x="100" y="78" font-size="7" text-anchor="middle" font-family="monospace">E</text></svg>',
              labels: [
                { id: 'research-pier', x: 100, y: 40 },
                { id: 'boatshed', x: 160, y: 100 },
                { id: 'aquarium', x: 100, y: 160 },
                { id: 'data-office', x: 40, y: 100 },
                { id: 'visitor-centre', x: 100, y: 75 },
              ],
              options: [
                { key: 'A', text: 'Research pier (north)' },
                { key: 'B', text: 'Boatshed (east, far side of car park)' },
                { key: 'C', text: 'Seawater aquarium (south of car park)' },
                { key: 'D', text: 'Data office (western edge, green cabin)' },
                { key: 'E', text: 'Visitor centre (just past main gate)' },
              ],
              correctMapping: {
                'research-pier': 'A',
                boatshed: 'B',
                aquarium: 'C',
                'data-office': 'D',
                'visitor-centre': 'E',
              },
              explanation:
                'The guide places each building by its cardinal direction relative to the visitor centre and car park.',
            },
          ],
        },
        {
          id: 'l002-s2-g2',
          instruction:
            'Questions 16–20 · Complete the flow-chart. Write NO MORE THAN TWO WORDS for each answer.',
          questions: [
            {
              id: 'l002-q16',
              number: 16,
              type: 'flow-chart-completion',
              steps: [
                { id: 's1', text: 'Gauge in a {blank1} records tide height', hasBlank: true },
                { id: 's2', text: 'Signal transmitted by cable to the {blank2}', hasBlank: true },
                { id: 's3', text: 'Raw signal is filtered for {blank3}', hasBlank: true },
                {
                  id: 's4',
                  text: 'Filtered signal uploaded to the {blank4}, compared with astronomical tide predictions',
                  hasBlank: true,
                },
                {
                  id: 's5',
                  text: 'Any {blank5} is forwarded to the national marine service',
                  hasBlank: true,
                },
              ],
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: 'stilling well',
                  acceptableVariants: ['still well'],
                  maxWords: 2,
                },
                {
                  id: 'blank2',
                  correctAnswer: 'shore station',
                  acceptableVariants: ['shore'],
                  maxWords: 2,
                },
                {
                  id: 'blank3',
                  correctAnswer: 'wave noise',
                  acceptableVariants: ['noise'],
                  maxWords: 2,
                },
                {
                  id: 'blank4',
                  correctAnswer: 'regional hub',
                  acceptableVariants: ['hub'],
                  maxWords: 2,
                },
                {
                  id: 'blank5',
                  correctAnswer: 'residual',
                  acceptableVariants: ['residuals'],
                  maxWords: 1,
                },
              ],
              explanation:
                'Each step in the flow-chart lifts a noun phrase directly from the transcript.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-002-s3',
      number: 3,
      title: 'Section 3 — Dissertation supervision',
      audioUrl: null,
      transcript:
        'SUPERVISOR: Your proposal on the Gulf Stream is ambitious — I would narrow it. What is your core question? STUDENT: Whether the stream is weakening. SUPERVISOR: Then do not try to cover three centuries. Focus on the satellite era — 1993 onward. The literature you have collected is strong on physical oceanography but thin on atmospheric forcing; balance that. Your methods section currently proposes mooring data only. Add reanalysis products — ORA-S5, say. And your timeline shows eight months for fieldwork that you will not need if you commit to remote data. Plan twelve weeks for writing, not six. STUDENT: I have a question about structure. Should the literature review be its own chapter? SUPERVISOR: In this department, yes. Two sub-sections inside it: one on observational records, one on model studies. About twenty pages each is normal. Reference count: between eighty and one hundred. Primary sources at the top of your list should be Bryden 2020 and Caesar 2022. STUDENT: And the ethics form — is it required? SUPERVISOR: Yes, for any fieldwork. Even remote-data projects need a declaration. Submit it six weeks before your start date. STUDENT: One last thing — presentation date? SUPERVISOR: You are scheduled for the second of June, at eleven in the morning, room 3.12. Fifteen minutes of talk, ten of questions. Bring a one-page handout — printed on both sides is fine. Good luck.',
      groups: [
        {
          id: 'l002-s3-g1',
          instruction: 'Questions 21–25 · Choose the correct letter, A, B, or C.',
          questions: [
            {
              id: 'l002-q21',
              number: 21,
              type: 'multiple-choice',
              prompt: "What is the student's main weakness in the literature collected?",
              options: [
                { key: 'A', text: 'It is too narrow in time period' },
                { key: 'B', text: 'It under-covers atmospheric forcing' },
                { key: 'C', text: 'It relies too much on reanalysis products' },
              ],
              correctAnswer: 'B',
              explanation: '"Strong on physical oceanography but thin on atmospheric forcing."',
            },
            {
              id: 'l002-q22',
              number: 22,
              type: 'multiple-choice',
              prompt: 'Which reanalysis product does the supervisor specifically name?',
              options: [
                { key: 'A', text: 'ORA-S5' },
                { key: 'B', text: 'ERA5' },
                { key: 'C', text: 'GLORYS' },
              ],
              correctAnswer: 'A',
              explanation: '"Add reanalysis products — ORA-S5, say."',
            },
            {
              id: 'l002-q23',
              number: 23,
              type: 'multiple-choice',
              prompt: 'How long does the supervisor recommend for the writing phase?',
              options: [
                { key: 'A', text: 'Six weeks' },
                { key: 'B', text: 'Eight weeks' },
                { key: 'C', text: 'Twelve weeks' },
              ],
              correctAnswer: 'C',
              explanation: '"Plan twelve weeks for writing, not six."',
            },
            {
              id: 'l002-q24',
              number: 24,
              type: 'multiple-choice',
              prompt: 'According to the supervisor, the literature review should be',
              options: [
                { key: 'A', text: 'integrated into the introduction' },
                { key: 'B', text: 'a standalone chapter with two sub-sections' },
                { key: 'C', text: 'omitted in favour of annotated citations' },
              ],
              correctAnswer: 'B',
              explanation:
                '"In this department, yes. Two sub-sections inside it: one on observational records, one on model studies."',
            },
            {
              id: 'l002-q25',
              number: 25,
              type: 'multiple-choice',
              prompt: 'How far in advance of the start date must the ethics form be submitted?',
              options: [
                { key: 'A', text: 'Two weeks' },
                { key: 'B', text: 'Four weeks' },
                { key: 'C', text: 'Six weeks' },
              ],
              correctAnswer: 'C',
              explanation: '"Submit it six weeks before your start date."',
            },
          ],
        },
        {
          id: 'l002-s3-g2',
          instruction:
            'Questions 26–30 · Complete each sentence with NO MORE THAN TWO WORDS AND/OR A NUMBER.',
          questions: [
            {
              id: 'l002-q26',
              number: 26,
              type: 'sentence-completion',
              sentenceBefore:
                'The student is instructed to focus on data from the satellite era, that is, from',
              sentenceAfter: 'onward.',
              correctAnswer: '1993',
              acceptableVariants: [],
              maxWords: 1,
              explanation: '"Focus on the satellite era — 1993 onward."',
            },
            {
              id: 'l002-q27',
              number: 27,
              type: 'sentence-completion',
              sentenceBefore: 'Each sub-section of the literature review should be roughly',
              sentenceAfter: 'pages.',
              correctAnswer: 'twenty',
              acceptableVariants: ['20'],
              maxWords: 1,
              explanation: '"About twenty pages each is normal."',
            },
            {
              id: 'l002-q28',
              number: 28,
              type: 'sentence-completion',
              sentenceBefore: 'The expected total reference count is between eighty and',
              sentenceAfter: '.',
              correctAnswer: 'one hundred',
              acceptableVariants: ['100', 'a hundred'],
              maxWords: 2,
              explanation: '"Between eighty and one hundred."',
            },
            {
              id: 'l002-q29',
              number: 29,
              type: 'sentence-completion',
              sentenceBefore: 'The presentation date is the',
              sentenceAfter: 'of June.',
              correctAnswer: 'second',
              acceptableVariants: ['2nd', '2'],
              maxWords: 1,
              explanation: '"You are scheduled for the second of June."',
            },
            {
              id: 'l002-q30',
              number: 30,
              type: 'sentence-completion',
              sentenceBefore: 'The presentation slot comprises fifteen minutes of talk and',
              sentenceAfter: 'minutes of questions.',
              correctAnswer: 'ten',
              acceptableVariants: ['10'],
              maxWords: 1,
              explanation: '"Fifteen minutes of talk, ten of questions."',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-002-s4',
      number: 4,
      title: 'Section 4 — Public lecture · "Why the Gulf Stream matters"',
      audioUrl: null,
      transcript:
        "LECTURER: The Gulf Stream is a band of warm Atlantic water flowing north along the eastern seaboard of North America, then east toward Europe. It carries roughly thirty times the volume of the world's combined rivers and is responsible for mild winters in western Europe. Without it, Glasgow would resemble Labrador. The stream is driven partly by wind, partly by the density contrast between warm salty tropical water and cold fresh polar water — the so-called thermohaline circulation. The thermohaline loop was first described in the modern form by Wallace Broecker in 1987. Observational records since 2004 suggest a gradual weakening of about fifteen percent, though uncertainty remains high. The main risk, if weakening accelerates, is a sudden shift in the storm track over north-western Europe. Models differ on the timescale: some project significant disruption within the present century, others not for three hundred years. The paleoclimate record tells us the stream has collapsed before — most famously around 12,800 years ago, an event called the Younger Dryas, which dropped regional temperatures by six degrees Celsius in less than a decade. The warning, from that record, is not that the stream can collapse — it has — but that when it does, the change can be exceedingly rapid.",
      groups: [
        {
          id: 'l002-s4-g1',
          instruction:
            'Questions 31–35 · Complete the summary. Choose your answers from the word bank A–G.',
          questions: [
            {
              id: 'l002-q31',
              number: 31,
              type: 'summary-completion',
              summaryTemplate:
                "The Gulf Stream carries about thirty times the volume of the world's combined {blank1}. Without it, the climate of western Europe would resemble {blank2}. The current is driven by {blank3} and the density contrast known as {blank4}. Since {blank5}, observational records suggest a weakening of around fifteen percent.",
              wordBank: [
                { key: 'A', text: 'rivers' },
                { key: 'B', text: 'oceans' },
                { key: 'C', text: 'Labrador' },
                { key: 'D', text: 'Iceland' },
                { key: 'E', text: 'wind' },
                { key: 'F', text: 'thermohaline circulation' },
                { key: 'G', text: '2004' },
              ],
              blanks: [
                { id: 'blank1', correctAnswer: 'A', acceptableVariants: ['rivers'], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'C', acceptableVariants: ['Labrador'], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'E', acceptableVariants: ['wind'], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: 'F',
                  acceptableVariants: ['thermohaline circulation', 'thermohaline'],
                  maxWords: 2,
                },
                { id: 'blank5', correctAnswer: 'G', acceptableVariants: ['2004'], maxWords: 1 },
              ],
              explanation:
                'Each blank lifts a noun or year directly from the transcript — the word bank removes spelling ambiguity.',
            },
          ],
        },
        {
          id: 'l002-s4-g2',
          instruction:
            'Questions 36–40 · Answer the questions. Write NO MORE THAN THREE WORDS AND/OR A NUMBER.',
          questions: [
            {
              id: 'l002-q36',
              number: 36,
              type: 'short-answer',
              question: 'Who is credited with describing the thermohaline loop in its modern form?',
              correctAnswer: 'Wallace Broecker',
              acceptableVariants: ['Broecker'],
              maxWords: 2,
              explanation: '"Wallace Broecker in 1987."',
            },
            {
              id: 'l002-q37',
              number: 37,
              type: 'short-answer',
              question: "In what year did Broecker's description appear?",
              correctAnswer: '1987',
              acceptableVariants: [],
              maxWords: 1,
              explanation: '"Wallace Broecker in 1987."',
            },
            {
              id: 'l002-q38',
              number: 38,
              type: 'short-answer',
              question:
                "What region's storm track does the lecturer say is most at risk from accelerated weakening?",
              correctAnswer: 'north-western Europe',
              acceptableVariants: ['northwestern Europe', 'NW Europe'],
              maxWords: 3,
              explanation: '"A sudden shift in the storm track over north-western Europe."',
            },
            {
              id: 'l002-q39',
              number: 39,
              type: 'short-answer',
              question:
                'What is the name of the event around 12,800 years ago when the stream collapsed?',
              correctAnswer: 'Younger Dryas',
              acceptableVariants: ['the Younger Dryas'],
              maxWords: 3,
              explanation: '"An event called the Younger Dryas."',
            },
            {
              id: 'l002-q40',
              number: 40,
              type: 'short-answer',
              question:
                'By how many degrees Celsius did regional temperatures drop during that event?',
              correctAnswer: 'six',
              acceptableVariants: ['6', 'six degrees'],
              maxWords: 2,
              explanation: '"Six degrees Celsius in less than a decade."',
            },
          ],
        },
      ],
    },
  ],
}
