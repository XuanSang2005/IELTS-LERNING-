import type { Test } from '../../schemas/test'

export const listening003: Test = {
  id: 'listening-003',
  skill: 'listening',
  title: 'Listening Test 03',
  description:
    'A foundation paper — sports club enrolment, museum tour, project tutorial, and a lecture on urban beekeeping.',
  difficulty: 'foundation',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-003-s1',
      number: 1,
      title: 'Section 1 — Sports club enrolment',
      audioUrl: null,
      transcript:
        "STAFF: Good morning, Riverside Sports. Can I help you? CALLER: Yes, I'd like to enrol. My name is Olivia Chen — that's C-H-E-N. STAFF: And your member type? CALLER: Standard. STAFF: Date of birth? CALLER: Twelfth of March, 1998. STAFF: Address? CALLER: Forty-two Maple Lane, Edinburgh. STAFF: Postcode? CALLER: E-H-three, four-A-B. STAFF: Mobile? CALLER: Oh-seven-seven-one-two, three-three-four, five-six-seven-eight. STAFF: Sport of interest? CALLER: Tennis. STAFF: Annual fee for standard members is two hundred and fifty pounds. STAFF: Preferred payment method? CALLER: Direct debit. STAFF: Emergency contact name? CALLER: My brother — David Chen.",
      groups: [
        {
          id: 'l003-s1-g1',
          instruction:
            'Questions 1–10 · Complete the enrolment form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          questions: [
            {
              id: 'l003-q1',
              number: 1,
              type: 'form-completion',
              template:
                'ENROLMENT FORM\n  Name: Olivia {blank1}\n  Member type: {blank2}\n  DOB: 12 {blank3} 1998\n  Address: 42 {blank4} Lane\n  Postcode: {blank5}\n  Mobile last 4: {blank6}\n  Sport: {blank7}\n  Annual fee (£): {blank8}\n  Payment: {blank9}\n  Emergency contact: {blank10} Chen',
              blanks: [
                { id: 'blank1', correctAnswer: 'Chen', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'standard', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'March', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'Maple', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank5',
                  correctAnswer: 'EH3 4AB',
                  acceptableVariants: ['eh3 4ab'],
                  maxWords: 2,
                },
                { id: 'blank6', correctAnswer: '5678', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'tennis', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: '250', acceptableVariants: ['£250'], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: 'direct debit',
                  acceptableVariants: [],
                  maxWords: 2,
                },
                { id: 'blank10', correctAnswer: 'David', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each detail is stated directly during the call.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-003-s2',
      number: 2,
      title: 'Section 2 — Museum welcome tour',
      audioUrl: null,
      transcript:
        'GUIDE: Welcome to the City History Museum. The cloakroom is on your left as you enter; the main exhibition begins on the first floor. The Roman gallery is at the eastern end, and the Tudor wing occupies the south side. Photography without flash is permitted in all galleries except the Manuscript Room. The café opens at ten and serves until four. Audio guides cost three pounds for adults, free for under-twelves. Late opening is on Thursdays until eight pm.',
      groups: [
        {
          id: 'l003-s2-g1',
          instruction: 'Questions 11–20 · Complete the visitor leaflet.',
          questions: [
            {
              id: 'l003-q11',
              number: 11,
              type: 'form-completion',
              template:
                'VISITOR LEAFLET\n  Cloakroom: on the {blank1}\n  Exhibition starts on the {blank2} floor\n  Roman gallery: {blank3} end\n  Tudor wing: {blank4} side\n  Photography forbidden in: the {blank5} Room\n  Café opens at: {blank6}\n  Café closes at: {blank7}\n  Audio guide (adult): £{blank8}\n  Audio guide free for: under-{blank9}\n  Late opening day: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'left', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'first', acceptableVariants: ['1st'], maxWords: 1 },
                {
                  id: 'blank3',
                  correctAnswer: 'eastern',
                  acceptableVariants: ['east'],
                  maxWords: 1,
                },
                {
                  id: 'blank4',
                  correctAnswer: 'south',
                  acceptableVariants: ['southern'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: 'Manuscript', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'ten', acceptableVariants: ['10'], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'four', acceptableVariants: ['4'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'twelve', acceptableVariants: ['12'], maxWords: 1 },
                {
                  id: 'blank10',
                  correctAnswer: 'Thursday',
                  acceptableVariants: ['Thursdays'],
                  maxWords: 1,
                },
              ],
              explanation: 'All facts are stated by the guide in order.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-003-s3',
      number: 3,
      title: 'Section 3 — Group project tutorial',
      audioUrl: null,
      transcript:
        "TUTOR: So, your project is on local food markets. STUDENT A: We've decided to focus on three sites. STUDENT B: We'll use surveys for the main data. TUTOR: How many surveys do you plan to gather? STUDENT B: One hundred and twenty in total. TUTOR: Who will analyse them? STUDENT A: I will. STUDENT B: I'll handle the photographs. TUTOR: And the report deadline is the fifth of November. STUDENT A: We'll present in week eleven. TUTOR: Submission format is a PDF, no longer than thirty pages.",
      groups: [
        {
          id: 'l003-s3-g1',
          instruction: 'Questions 21–30 · Complete the project notes.',
          questions: [
            {
              id: 'l003-q21',
              number: 21,
              type: 'form-completion',
              template:
                'PROJECT NOTES\n  Topic: local {blank1}\n  Number of sites: {blank2}\n  Main method: {blank3}\n  Surveys planned: {blank4}\n  Survey analysis: by Student {blank5}\n  Photographs: by Student {blank6}\n  Report deadline (day): {blank7}\n  Report deadline (month): {blank8}\n  Presentation week: {blank9}\n  Submission format: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: 'food markets',
                  acceptableVariants: ['markets'],
                  maxWords: 2,
                },
                { id: 'blank2', correctAnswer: 'three', acceptableVariants: ['3'], maxWords: 1 },
                {
                  id: 'blank3',
                  correctAnswer: 'surveys',
                  acceptableVariants: ['survey'],
                  maxWords: 1,
                },
                {
                  id: 'blank4',
                  correctAnswer: '120',
                  acceptableVariants: ['one hundred and twenty'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: 'A', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'B', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank7',
                  correctAnswer: '5th',
                  acceptableVariants: ['5', 'fifth'],
                  maxWords: 1,
                },
                { id: 'blank8', correctAnswer: 'November', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'eleven', acceptableVariants: ['11'], maxWords: 1 },
                { id: 'blank10', correctAnswer: 'PDF', acceptableVariants: ['pdf'], maxWords: 1 },
              ],
              explanation: 'Numerical and categorical answers spoken in sequence.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-003-s4',
      number: 4,
      title: 'Section 4 — Lecture on urban beekeeping',
      audioUrl: null,
      transcript:
        'LECTURER: Today we examine urban beekeeping. The first commercial city hive in the United Kingdom appeared in two thousand and four. A standard hive contains approximately fifty thousand bees. Workers forage within a radius of three kilometres. The honey yield from a healthy urban hive averages twenty-five kilograms per year. Common urban floral sources include lime trees, lavender, and clover. The principal threat to colonies is the varroa mite. New legislation in two thousand and twenty-one requires city beekeepers to register annually. The British Beekeepers Association estimates twenty-eight thousand registered hobbyists nationwide.',
      groups: [
        {
          id: 'l003-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture summary.',
          questions: [
            {
              id: 'l003-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE SUMMARY · Urban beekeeping\n  First UK commercial city hive: {blank1}\n  Bees per standard hive (thousands): {blank2}\n  Foraging radius (km): {blank3}\n  Average annual honey yield (kg): {blank4}\n  Floral source — trees: {blank5}\n  Floral source — herb: {blank6}\n  Floral source — clover-family: {blank7}\n  Principal threat: {blank8} mite\n  Year of registration legislation: {blank9}\n  Registered hobbyists nationally (thousands): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '2004', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: '50', acceptableVariants: ['fifty'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: '25',
                  acceptableVariants: ['twenty-five'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: 'lime', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'lavender', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'clover', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'varroa', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: '2021', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank10',
                  correctAnswer: '28',
                  acceptableVariants: ['twenty-eight'],
                  maxWords: 1,
                },
              ],
              explanation: 'Each figure or term is stated directly in the lecture.',
            },
          ],
        },
      ],
    },
  ],
}
