import type { Test } from '../../schemas/test'

export const listening008: Test = {
  id: 'listening-008',
  skill: 'listening',
  title: 'Listening Test 08',
  description:
    'An advanced paper — phone contract enquiry, train station tour, supervisor meeting, and a lecture on the science of volcanism.',
  difficulty: 'advanced',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-008-s1',
      number: 1,
      title: 'Section 1 — Mobile phone contract enquiry',
      audioUrl: null,
      transcript:
        "AGENT: BlueWave Mobile, hi. CALLER: I'd like a SIM-only plan. Name: Anika Roy — R-O-Y. AGENT: Plan size? CALLER: Twenty gigabytes. AGENT: That's eighteen pounds a month, twelve-month contract. International calls add four pounds. Number portability free. Address? CALLER: Twenty-three Linden Avenue. Postcode: B-S-eight, two-D-W. AGENT: Email? CALLER: anika.roy at hostmail dot net. Activation by Wednesday. The SIM ships next day. PIN code: zero-zero-three-three.",
      groups: [
        {
          id: 'l008-s1-g1',
          instruction: 'Questions 1–10 · Complete the customer record.',
          questions: [
            {
              id: 'l008-q1',
              number: 1,
              type: 'form-completion',
              template:
                'CUSTOMER RECORD\n  Surname: {blank1}\n  Plan size (GB): {blank2}\n  Monthly cost (£): {blank3}\n  Contract length (months): {blank4}\n  International add-on (£): {blank5}\n  Address number: {blank6}\n  Street: {blank7} Avenue\n  Postcode: {blank8}\n  Email host: {blank9}\n  PIN: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Roy', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: '20', acceptableVariants: ['twenty'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '18', acceptableVariants: ['£18'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '12', acceptableVariants: ['twelve'], maxWords: 1 },
                { id: 'blank5', correctAnswer: '4', acceptableVariants: ['£4'], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: '23',
                  acceptableVariants: ['twenty-three'],
                  maxWords: 1,
                },
                { id: 'blank7', correctAnswer: 'Linden', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank8',
                  correctAnswer: 'BS8 2DW',
                  acceptableVariants: ['bs8 2dw'],
                  maxWords: 2,
                },
                {
                  id: 'blank9',
                  correctAnswer: 'hostmail.net',
                  acceptableVariants: ['hostmail'],
                  maxWords: 1,
                },
                { id: 'blank10', correctAnswer: '0033', acceptableVariants: ['33'], maxWords: 1 },
              ],
              explanation: 'Each detail is stated directly in the call.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-008-s2',
      number: 2,
      title: 'Section 2 — Train station tour briefing',
      audioUrl: null,
      transcript:
        "GUIDE: Welcome to the Victorian station tour. We'll spend forty-five minutes on platforms one, two and three, then thirty minutes on the upper concourse. The clock tower dates from eighteen sixty-eight. The booking hall ceiling is forty metres high. Please stay behind the yellow line on platforms. Toilets are by gate fifteen. Lifts are out of order at gate eight. The shop closes at six. Tour souvenirs are five pounds. Re-entry today only with stamped wristband.",
      groups: [
        {
          id: 'l008-s2-g1',
          instruction: 'Questions 11–20 · Complete the tour information.',
          questions: [
            {
              id: 'l008-q11',
              number: 11,
              type: 'form-completion',
              template:
                'TOUR INFORMATION\n  Platforms part length (mins): {blank1}\n  Concourse part length (mins): {blank2}\n  Clock tower year: {blank3}\n  Booking hall height (m): {blank4}\n  Stay behind line colour: {blank5}\n  Toilets by gate: {blank6}\n  Lifts out at gate: {blank7}\n  Shop closes at: {blank8} pm\n  Souvenir price (£): {blank9}\n  Re-entry token: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '45',
                  acceptableVariants: ['forty-five'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '30', acceptableVariants: ['thirty'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '1868', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: '40', acceptableVariants: ['forty'], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'yellow', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: '15', acceptableVariants: ['fifteen'], maxWords: 1 },
                { id: 'blank7', correctAnswer: '8', acceptableVariants: ['eight'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '6', acceptableVariants: ['six'], maxWords: 1 },
                { id: 'blank9', correctAnswer: '5', acceptableVariants: ['£5'], maxWords: 1 },
                { id: 'blank10', correctAnswer: 'wristband', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each fact is stated by the guide.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-008-s3',
      number: 3,
      title: 'Section 3 — Supervisor meeting',
      audioUrl: null,
      transcript:
        "SUPERVISOR: Where are you on the methodology chapter? STUDENT: It's at four thousand words. SUPERVISOR: Aim for six thousand. Add a section on case selection. Use the comparative case method. The number of cases should be six. STUDENT: Interview transcripts? SUPERVISOR: Anonymise them. The ethics form is HRA-twelve. Submit by Tuesday. Your data appendix should be in CSV. The full draft is due before reading week — that's the eleventh of November. Office hours next week are by appointment only.",
      groups: [
        {
          id: 'l008-s3-g1',
          instruction: 'Questions 21–30 · Complete the meeting notes.',
          questions: [
            {
              id: 'l008-q21',
              number: 21,
              type: 'form-completion',
              template:
                'MEETING NOTES\n  Current methodology words: {blank1}\n  Target words: {blank2}\n  Section to add: {blank3} selection\n  Method: comparative {blank4}\n  Number of cases: {blank5}\n  Transcripts must be: {blank6}\n  Ethics form code: HRA-{blank7}\n  Appendix format: {blank8}\n  Full draft day: {blank9}\n  Full draft month: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '4000',
                  acceptableVariants: ['four thousand'],
                  maxWords: 1,
                },
                {
                  id: 'blank2',
                  correctAnswer: '6000',
                  acceptableVariants: ['six thousand'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: 'case', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'case', acceptableVariants: ['cases'], maxWords: 1 },
                { id: 'blank5', correctAnswer: '6', acceptableVariants: ['six'], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: 'anonymised',
                  acceptableVariants: ['anonymized'],
                  maxWords: 1,
                },
                { id: 'blank7', correctAnswer: '12', acceptableVariants: ['twelve'], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'CSV', acceptableVariants: ['csv'], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: '11th',
                  acceptableVariants: ['11', 'eleventh'],
                  maxWords: 1,
                },
                { id: 'blank10', correctAnswer: 'November', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'All instructions are spoken in turn.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-008-s4',
      number: 4,
      title: 'Section 4 — Lecture on volcanism',
      audioUrl: null,
      transcript:
        "LECTURER: Volcanoes occur at three principal tectonic settings: divergent margins, convergent margins, and intraplate hotspots. Approximately one thousand five hundred volcanoes are classified as currently active. The Volcanic Explosivity Index runs from zero to eight. Mount Pinatubo's nineteen ninety-one eruption was a six on this scale. Magma viscosity rises sharply with silica content above seventy per cent. The lahar from Nevado del Ruiz in nineteen eighty-five killed twenty-three thousand people. Monitoring relies on three principal techniques: seismicity, gas emissions, and ground deformation. Early-warning systems now cover roughly thirty per cent of high-risk volcanoes globally.",
      groups: [
        {
          id: 'l008-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture summary.',
          questions: [
            {
              id: 'l008-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE SUMMARY · Volcanism\n  Tectonic settings: {blank1}\n  Active volcanoes (approx, thousands): {blank2}\n  VEI scale max: {blank3}\n  Pinatubo VEI: {blank4}\n  Pinatubo year: {blank5}\n  Silica viscosity threshold (%): {blank6}\n  Nevado del Ruiz year: {blank7}\n  Deaths (thousands): {blank8}\n  Monitoring techniques (count): {blank9}\n  Early-warning coverage (%): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '1500',
                  acceptableVariants: ['one thousand five hundred'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: '8', acceptableVariants: ['eight'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '6', acceptableVariants: ['six'], maxWords: 1 },
                { id: 'blank5', correctAnswer: '1991', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: '70', acceptableVariants: ['seventy'], maxWords: 1 },
                { id: 'blank7', correctAnswer: '1985', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank8',
                  correctAnswer: '23',
                  acceptableVariants: ['twenty-three'],
                  maxWords: 1,
                },
                { id: 'blank9', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '30', acceptableVariants: ['thirty'], maxWords: 1 },
              ],
              explanation: 'Each datum is stated by the lecturer.',
            },
          ],
        },
      ],
    },
  ],
}
