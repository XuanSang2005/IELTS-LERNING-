import type { Test } from '../../schemas/test'

export const listening004: Test = {
  id: 'listening-004',
  skill: 'listening',
  title: 'Listening Test 04',
  description:
    'A foundation paper — gym membership enquiry, walking tour overview, group seminar, and a lecture on the science of sleep.',
  difficulty: 'foundation',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-004-s1',
      number: 1,
      title: 'Section 1 — Gym membership enquiry',
      audioUrl: null,
      transcript:
        "RECEPTIONIST: Park Lane Fitness, can I help? CALLER: I'd like to join. RECEPTIONIST: Name? CALLER: Marcus Hall — H-A-L-L. RECEPTIONIST: Membership? CALLER: Off-peak. RECEPTIONIST: Off-peak is forty pounds a month. Joining fee is twenty-five. Hours are five am to four pm and after seven pm. Locker hire is two pounds. Towel rental fifty pence. The pool is on the lower ground floor. The studio is on the first floor. The introductory class is held on Saturdays at nine.",
      groups: [
        {
          id: 'l004-s1-g1',
          instruction: 'Questions 1–10 · Complete the membership form.',
          questions: [
            {
              id: 'l004-q1',
              number: 1,
              type: 'form-completion',
              template:
                'MEMBERSHIP FORM\n  Surname: {blank1}\n  Membership type: {blank2}\n  Monthly fee (£): {blank3}\n  Joining fee (£): {blank4}\n  Off-peak ends at: {blank5} pm\n  Off-peak resumes at: {blank6} pm\n  Locker hire (£): {blank7}\n  Towel rental (p): {blank8}\n  Pool floor: lower {blank9}\n  Intro class day: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Hall', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: 'off-peak',
                  acceptableVariants: ['offpeak'],
                  maxWords: 1,
                },
                {
                  id: 'blank3',
                  correctAnswer: '40',
                  acceptableVariants: ['£40', 'forty'],
                  maxWords: 1,
                },
                {
                  id: 'blank4',
                  correctAnswer: '25',
                  acceptableVariants: ['£25', 'twenty-five'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank6', correctAnswer: '7', acceptableVariants: ['seven'], maxWords: 1 },
                {
                  id: 'blank7',
                  correctAnswer: '2',
                  acceptableVariants: ['£2', 'two'],
                  maxWords: 1,
                },
                { id: 'blank8', correctAnswer: '50', acceptableVariants: ['fifty'], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'ground', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank10',
                  correctAnswer: 'Saturday',
                  acceptableVariants: ['Saturdays'],
                  maxWords: 1,
                },
              ],
              explanation: 'Details are spoken in sequence by the receptionist.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-004-s2',
      number: 2,
      title: 'Section 2 — Old town walking tour',
      audioUrl: null,
      transcript:
        "GUIDE: Welcome to the old town walk. The walk lasts ninety minutes and ends at the cathedral. Stop one is the market square; stop two is the guildhall, which dates from fourteen seventy. We'll then pass the river bridge, built in eighteen ninety-two. The almshouses are next, currently under restoration. Photographs are welcome throughout. The toilets near the market are free; toilets at the cathedral cost twenty pence. The tour costs eight pounds, with a family ticket for twenty.",
      groups: [
        {
          id: 'l004-s2-g1',
          instruction: 'Questions 11–20 · Complete the tour information.',
          questions: [
            {
              id: 'l004-q11',
              number: 11,
              type: 'form-completion',
              template:
                'TOUR INFORMATION\n  Duration (mins): {blank1}\n  End point: the {blank2}\n  Stop 1: {blank3} square\n  Stop 2: the {blank4}\n  Guildhall built in (year): {blank5}\n  River bridge built in (year): {blank6}\n  Almshouses status: under {blank7}\n  Cathedral toilets cost (p): {blank8}\n  Adult tour price (£): {blank9}\n  Family ticket (£): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '90', acceptableVariants: ['ninety'], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'cathedral', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'market', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'guildhall', acceptableVariants: [], maxWords: 1 },
                { id: 'blank5', correctAnswer: '1470', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: '1892', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'restoration', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: '20', acceptableVariants: ['twenty'], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: '8',
                  acceptableVariants: ['£8', 'eight'],
                  maxWords: 1,
                },
                {
                  id: 'blank10',
                  correctAnswer: '20',
                  acceptableVariants: ['£20', 'twenty'],
                  maxWords: 1,
                },
              ],
              explanation: 'Each fact is stated by the guide.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-004-s3',
      number: 3,
      title: 'Section 3 — Group seminar planning',
      audioUrl: null,
      transcript:
        "TUTOR: We're meeting weekly on Wednesdays. STUDENT 1: I can't do mornings — afternoons only. TUTOR: Two pm works. We'll meet in room 204. The reading list has fourteen items; you're expected to cover ten before the first session. STUDENT 2: How long should the response paper be? TUTOR: Twelve hundred words. STUDENT 1: Submission format? TUTOR: Word file by email. The first seminar is on October the seventeenth. The final presentation is in week ten.",
      groups: [
        {
          id: 'l004-s3-g1',
          instruction: 'Questions 21–30 · Complete the seminar plan.',
          questions: [
            {
              id: 'l004-q21',
              number: 21,
              type: 'form-completion',
              template:
                'SEMINAR PLAN\n  Day of week: {blank1}\n  Time: {blank2} pm\n  Room: {blank3}\n  Reading list items (total): {blank4}\n  Required before session 1: {blank5}\n  Response paper (words): {blank6}\n  Submission format: {blank7} file\n  First seminar (day): {blank8}\n  First seminar (month): {blank9}\n  Final presentation in week: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: 'Wednesday',
                  acceptableVariants: ['Wednesdays'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '204', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: '14',
                  acceptableVariants: ['fourteen'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: '1200',
                  acceptableVariants: ['twelve hundred'],
                  maxWords: 1,
                },
                { id: 'blank7', correctAnswer: 'Word', acceptableVariants: ['word'], maxWords: 1 },
                {
                  id: 'blank8',
                  correctAnswer: '17th',
                  acceptableVariants: ['17', 'seventeenth'],
                  maxWords: 1,
                },
                { id: 'blank9', correctAnswer: 'October', acceptableVariants: [], maxWords: 1 },
                { id: 'blank10', correctAnswer: 'ten', acceptableVariants: ['10'], maxWords: 1 },
              ],
              explanation: 'Numerical and categorical details are stated in turn.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-004-s4',
      number: 4,
      title: 'Section 4 — Lecture on the science of sleep',
      audioUrl: null,
      transcript:
        'LECTURER: Sleep occupies roughly one third of human life. A typical adult requires between seven and nine hours nightly. The sleep cycle lasts approximately ninety minutes and contains four stages. REM sleep accounts for about twenty per cent of total sleep time and is associated with vivid dreams. The hormone melatonin rises sharply about two hours before sleep onset. Chronic sleep deprivation correlates with cardiovascular disease and impaired memory. The recommended bedroom temperature for optimal sleep is eighteen degrees Celsius. The World Sleep Society marks World Sleep Day in March.',
      groups: [
        {
          id: 'l004-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture notes.',
          questions: [
            {
              id: 'l004-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE NOTES · Sleep science\n  Fraction of life spent asleep: one {blank1}\n  Adult sleep need (min hours): {blank2}\n  Adult sleep need (max hours): {blank3}\n  Sleep cycle length (mins): {blank4}\n  Stages per cycle: {blank5}\n  REM share of sleep (%): {blank6}\n  Hormone rising before sleep: {blank7}\n  Hormone rises this many hours before: {blank8}\n  Optimal bedroom temperature (°C): {blank9}\n  World Sleep Day month: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'third', acceptableVariants: ['1/3'], maxWords: 1 },
                { id: 'blank2', correctAnswer: '7', acceptableVariants: ['seven'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '9', acceptableVariants: ['nine'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '90', acceptableVariants: ['ninety'], maxWords: 1 },
                { id: 'blank5', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank6', correctAnswer: '20', acceptableVariants: ['twenty'], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'melatonin', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: '18',
                  acceptableVariants: ['eighteen'],
                  maxWords: 1,
                },
                { id: 'blank10', correctAnswer: 'March', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each datum is stated directly in the lecture.',
            },
          ],
        },
      ],
    },
  ],
}
