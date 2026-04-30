import type { Test } from '../../schemas/test'

export const listening007: Test = {
  id: 'listening-007',
  skill: 'listening',
  title: 'Listening Test 07',
  description:
    'An advanced paper — doctor appointment, charity walk briefing, lab report supervision, and a lecture on coral reefs.',
  difficulty: 'advanced',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-007-s1',
      number: 1,
      title: 'Section 1 — Doctor appointment booking',
      audioUrl: null,
      transcript:
        'RECEPTIONIST: Greenfield Surgery, can I help? CALLER: I need an appointment. Name is Daniel Otieno — O-T-I-E-N-O. RECEPTIONIST: Date of birth? CALLER: Eleventh of February, nineteen ninety-five. RECEPTIONIST: Reason? CALLER: Persistent cough. RECEPTIONIST: Nearest available is Tuesday at nine fifty with Dr Patel. Address on file? CALLER: Yes — Flat seven, Ridgemount House. Postcode N four, eight P L. Mobile? CALLER: Oh-seven-five-six-eight, two-four-zero, nine-one-three-two. RECEPTIONIST: NHS number? CALLER: Five-five-zero, two-eight-three, six-two-six-six.',
      groups: [
        {
          id: 'l007-s1-g1',
          instruction: 'Questions 1–10 · Complete the appointment record.',
          questions: [
            {
              id: 'l007-q1',
              number: 1,
              type: 'form-completion',
              template:
                'APPOINTMENT RECORD\n  Surname: {blank1}\n  DOB day: {blank2}\n  DOB month: {blank3}\n  Reason: persistent {blank4}\n  Day of appointment: {blank5}\n  Time: {blank6}\n  Doctor: Dr {blank7}\n  Flat number: {blank8}\n  Postcode: {blank9}\n  Mobile last 4: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Otieno', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '11th',
                  acceptableVariants: ['11', 'eleventh'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: 'February', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'cough', acceptableVariants: [], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'Tuesday', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: '9:50',
                  acceptableVariants: ['nine fifty', '950'],
                  maxWords: 2,
                },
                { id: 'blank7', correctAnswer: 'Patel', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: '7', acceptableVariants: ['seven'], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: 'N4 8PL',
                  acceptableVariants: ['n4 8pl'],
                  maxWords: 2,
                },
                { id: 'blank10', correctAnswer: '9132', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each detail is stated by the caller.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-007-s2',
      number: 2,
      title: 'Section 2 — Charity walk briefing',
      audioUrl: null,
      transcript:
        'ORGANISER: Thanks for joining the heart charity walk. The route is twenty-one kilometres around the lake. Walkers must be at the start by seven thirty. The course closes at two pm. There are five aid stations. Wear high-visibility tops; ours are yellow. The fundraising target is half a million pounds. Last year, two thousand four hundred walkers took part. Free coach back to town departs from the finish at three. Medals are bronze, silver, and gold according to time.',
      groups: [
        {
          id: 'l007-s2-g1',
          instruction: 'Questions 11–20 · Complete the briefing notes.',
          questions: [
            {
              id: 'l007-q11',
              number: 11,
              type: 'form-completion',
              template:
                'BRIEFING NOTES\n  Cause: {blank1} charity\n  Route length (km): {blank2}\n  Route shape: around the {blank3}\n  Start by: {blank4} am\n  Course closes: {blank5} pm\n  Aid stations: {blank6}\n  Top colour: {blank7}\n  Fundraising target: half a {blank8} pounds\n  Walkers last year: {blank9}\n  Coach back at: {blank10} pm',
              blanks: [
                { id: 'blank1', correctAnswer: 'heart', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '21',
                  acceptableVariants: ['twenty-one'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: 'lake', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: '7:30',
                  acceptableVariants: ['seven thirty', '730'],
                  maxWords: 2,
                },
                { id: 'blank5', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                { id: 'blank6', correctAnswer: '5', acceptableVariants: ['five'], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'yellow', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'million', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: '2400',
                  acceptableVariants: ['two thousand four hundred'],
                  maxWords: 1,
                },
                { id: 'blank10', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
              ],
              explanation: 'Each fact is stated by the organiser.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-007-s3',
      number: 3,
      title: 'Section 3 — Lab report supervision',
      audioUrl: null,
      transcript:
        'SUPERVISOR: Your lab report needs three changes. First, expand the abstract to two hundred words. Second, redraw figure four with error bars. Third, add a paragraph on limitations. The methods section should reference protocol nine. Update the calibration constant to zero point six four two. Submit by Friday five pm. The marking rubric weights data analysis at forty per cent. Keep the appendix under twelve pages. Use the chemistry department template version two.',
      groups: [
        {
          id: 'l007-s3-g1',
          instruction: 'Questions 21–30 · Complete the revision checklist.',
          questions: [
            {
              id: 'l007-q21',
              number: 21,
              type: 'form-completion',
              template:
                'REVISION CHECKLIST\n  Abstract length (words): {blank1}\n  Figure to redraw: figure {blank2}\n  Add paragraph on: {blank3}\n  Reference protocol number: {blank4}\n  Calibration constant: {blank5}\n  Submission day: {blank6}\n  Submission time: {blank7} pm\n  Data analysis weight (%): {blank8}\n  Appendix max pages: {blank9}\n  Template version: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '200',
                  acceptableVariants: ['two hundred'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'limitations', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: '9', acceptableVariants: ['nine'], maxWords: 1 },
                { id: 'blank5', correctAnswer: '0.642', acceptableVariants: ['.642'], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'Friday', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: '5', acceptableVariants: ['five'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '40', acceptableVariants: ['forty'], maxWords: 1 },
                { id: 'blank9', correctAnswer: '12', acceptableVariants: ['twelve'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
              ],
              explanation: 'Each instruction is given in turn.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-007-s4',
      number: 4,
      title: 'Section 4 — Lecture on coral reefs',
      audioUrl: null,
      transcript:
        'LECTURER: Coral reefs cover less than one per cent of the ocean floor yet support around twenty-five per cent of marine species. The Great Barrier Reef extends two thousand three hundred kilometres along the Australian coast. Bleaching events have intensified since the nineteen nineties. The optimal sea-surface temperature for hard coral is twenty-eight degrees Celsius. A two-degree rise causes mass bleaching. Restoration projects use coral nurseries, with one hectare yielding around forty thousand colonies. Marine protected areas now cover eight per cent of global oceans. Policymakers aim for thirty per cent by twenty thirty.',
      groups: [
        {
          id: 'l007-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture notes.',
          questions: [
            {
              id: 'l007-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE NOTES · Coral reefs\n  Reef share of ocean floor (%): {blank1}\n  Reef share of marine species (%): {blank2}\n  Great Barrier length (km): {blank3}\n  Bleaching intensified since (decade): {blank4}s\n  Optimal SST (°C): {blank5}\n  Bleaching threshold rise (°C): {blank6}\n  Colonies per hectare nursery (thousands): {blank7}\n  MPA coverage now (%): {blank8}\n  MPA target (%): {blank9}\n  Target year: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '1', acceptableVariants: ['one'], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '25',
                  acceptableVariants: ['twenty-five'],
                  maxWords: 1,
                },
                {
                  id: 'blank3',
                  correctAnswer: '2300',
                  acceptableVariants: ['two thousand three hundred'],
                  maxWords: 1,
                },
                {
                  id: 'blank4',
                  correctAnswer: '1990',
                  acceptableVariants: ['nineties', '1990s'],
                  maxWords: 1,
                },
                {
                  id: 'blank5',
                  correctAnswer: '28',
                  acceptableVariants: ['twenty-eight'],
                  maxWords: 1,
                },
                { id: 'blank6', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                { id: 'blank7', correctAnswer: '40', acceptableVariants: ['forty'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '8', acceptableVariants: ['eight'], maxWords: 1 },
                { id: 'blank9', correctAnswer: '30', acceptableVariants: ['thirty'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '2030', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each figure is stated directly.',
            },
          ],
        },
      ],
    },
  ],
}
