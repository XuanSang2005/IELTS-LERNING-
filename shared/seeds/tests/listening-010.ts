import type { Test } from '../../schemas/test'

export const listening010: Test = {
  id: 'listening-010',
  skill: 'listening',
  title: 'Listening Test 10',
  description:
    'An advanced paper — graduate job interview, walking tour of an industrial heritage site, case-study workshop, and a lecture on global migration patterns.',
  difficulty: 'advanced',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-010-s1',
      number: 1,
      title: 'Section 1 — Graduate scheme job interview',
      audioUrl: null,
      transcript:
        'RECRUITER: Welcome to the Northbank graduate scheme call. Name? CALLER: Iniko Bello — B-E-L-L-O. RECRUITER: Stream choice? CALLER: Operations. RECRUITER: Starting salary is twenty-eight thousand five hundred. Bonus up to ten per cent. Office in Manchester. Start date: the second of September. Probation six months. Annual leave: twenty-five days. Pension contribution five per cent. The first rotation is procurement. Your contact for onboarding is Helena. ID number: G-S-twenty-twenty-six-zero-four-five.',
      groups: [
        {
          id: 'l010-s1-g1',
          instruction: 'Questions 1–10 · Complete the offer summary.',
          questions: [
            {
              id: 'l010-q1',
              number: 1,
              type: 'form-completion',
              template:
                'OFFER SUMMARY\n  Surname: {blank1}\n  Stream: {blank2}\n  Starting salary (£, thousands): {blank3}\n  Bonus max (%): {blank4}\n  Office city: {blank5}\n  Start day: {blank6}\n  Start month: {blank7}\n  Probation (months): {blank8}\n  Leave (days): {blank9}\n  First rotation: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Bello', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'operations', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank3',
                  correctAnswer: '28.5',
                  acceptableVariants: ['28,500', '28500'],
                  maxWords: 1,
                },
                { id: 'blank4', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'Manchester', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: '2nd',
                  acceptableVariants: ['2', 'second'],
                  maxWords: 1,
                },
                { id: 'blank7', correctAnswer: 'September', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: '6', acceptableVariants: ['six'], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: '25',
                  acceptableVariants: ['twenty-five'],
                  maxWords: 1,
                },
                {
                  id: 'blank10',
                  correctAnswer: 'procurement',
                  acceptableVariants: [],
                  maxWords: 1,
                },
              ],
              explanation: 'Each detail is stated by the recruiter.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-010-s2',
      number: 2,
      title: 'Section 2 — Industrial heritage walking tour',
      audioUrl: null,
      transcript:
        'GUIDE: Welcome to the Old Mills heritage walk. The site dates from eighteen forty-one. At its peak it employed twelve hundred workers. The tallest chimney is sixty metres. Stop one is the spinning shed; stop two the engine house, which still contains the original beam engine. The mill stream powered eight water wheels. The chapel served as the community church. The walk is two kilometres long. Audio guides are three pounds. The site closes at five.',
      groups: [
        {
          id: 'l010-s2-g1',
          instruction: 'Questions 11–20 · Complete the heritage walk summary.',
          questions: [
            {
              id: 'l010-q11',
              number: 11,
              type: 'form-completion',
              template:
                'HERITAGE WALK\n  Site dates from (year): {blank1}\n  Peak workforce: {blank2}\n  Tallest chimney (m): {blank3}\n  Stop 1: {blank4} shed\n  Stop 2: {blank5} house\n  Engine type: {blank6}\n  Water wheels: {blank7}\n  Chapel role: community {blank8}\n  Walk length (km): {blank9}\n  Audio guide (£): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '1841', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '1200',
                  acceptableVariants: ['twelve hundred'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: '60', acceptableVariants: ['sixty'], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'spinning', acceptableVariants: [], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'engine', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'beam', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: '8', acceptableVariants: ['eight'], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'church', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '3', acceptableVariants: ['£3'], maxWords: 1 },
              ],
              explanation: 'Each datum is stated by the guide.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-010-s3',
      number: 3,
      title: 'Section 3 — Case-study workshop',
      audioUrl: null,
      transcript:
        'FACILITATOR: We have four cases on the table today. Each case takes thirty minutes. We work in pairs of two and rotate. Each pair produces one summary slide per case, totalling four. Case one is the Andersen merger; case two is the Riverford restructuring. Case three is the Lakra acquisition; case four is the Tomi divestiture. Slides are due by the close of session. Use the workshop template version three. The grading rubric weights analysis at sixty per cent. Bring printouts on Friday.',
      groups: [
        {
          id: 'l010-s3-g1',
          instruction: 'Questions 21–30 · Complete the workshop notes.',
          questions: [
            {
              id: 'l010-q21',
              number: 21,
              type: 'form-completion',
              template:
                'WORKSHOP NOTES\n  Number of cases: {blank1}\n  Time per case (mins): {blank2}\n  Pair size: {blank3}\n  Slides per pair (total): {blank4}\n  Case 1 type: {blank5}\n  Case 2 firm: {blank6}\n  Case 3 type: {blank7}\n  Case 4 type: {blank8}\n  Template version: {blank9}\n  Analysis weighting (%): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank2', correctAnswer: '30', acceptableVariants: ['thirty'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'merger', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'Riverford', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'acquisition', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'divestiture', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '60', acceptableVariants: ['sixty'], maxWords: 1 },
              ],
              explanation: 'Each detail is stated in turn.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-010-s4',
      number: 4,
      title: 'Section 4 — Lecture on global migration patterns',
      audioUrl: null,
      transcript:
        "LECTURER: At present, around two hundred and eighty million people live outside their country of birth — roughly three point six per cent of the world's population. The largest single migration corridor is from Mexico to the United States, with eleven million migrants. India is the largest country of origin overall. Remittances reached six hundred and forty-seven billion dollars in two thousand and twenty-two. Refugee numbers stand at thirty-six million. Climate displacement is projected to add a further two hundred million by twenty-fifty. The principal multilateral agency is the IOM, founded in nineteen fifty-one.",
      groups: [
        {
          id: 'l010-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture notes.',
          questions: [
            {
              id: 'l010-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE NOTES · Global migration\n  Migrants worldwide (millions): {blank1}\n  Share of world population (%): {blank2}\n  Largest corridor: {blank3} → US\n  Corridor size (millions): {blank4}\n  Largest origin country: {blank5}\n  Remittances year: {blank6}\n  Remittances ($ billions): {blank7}\n  Refugees (millions): {blank8}\n  Climate displaced by 2050 (millions): {blank9}\n  IOM founded (year): {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '280',
                  acceptableVariants: ['two hundred and eighty'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '3.6', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'Mexico', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: '11', acceptableVariants: ['eleven'], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'India', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: '2022', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: '647', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank8',
                  correctAnswer: '36',
                  acceptableVariants: ['thirty-six'],
                  maxWords: 1,
                },
                {
                  id: 'blank9',
                  correctAnswer: '200',
                  acceptableVariants: ['two hundred'],
                  maxWords: 1,
                },
                { id: 'blank10', correctAnswer: '1951', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each figure is stated directly in the lecture.',
            },
          ],
        },
      ],
    },
  ],
}
