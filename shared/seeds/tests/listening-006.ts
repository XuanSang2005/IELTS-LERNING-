import type { Test } from '../../schemas/test'

export const listening006: Test = {
  id: 'listening-006',
  skill: 'listening',
  title: 'Listening Test 06',
  description:
    'An intermediate paper — driving lesson booking, gallery audio guide, dissertation help session, and a lecture on ant colonies.',
  difficulty: 'intermediate',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-006-s1',
      number: 1,
      title: 'Section 1 — Driving lesson booking',
      audioUrl: null,
      transcript:
        "ADMIN: Greenway Driving School. CALLER: I'd like to book lessons. ADMIN: Name? CALLER: Hannah Pereira — P-E-R-E-I-R-A. ADMIN: Manual or automatic? CALLER: Manual. ADMIN: Lessons are thirty pounds each, or two hundred and seventy for ten. The first lesson is on the eighth of June at four pm. Pickup from your home. Theory test booking is a separate fee of twenty-three pounds. Practical test fee is sixty-two. Your provisional licence number, please. CALLER: Three-four-five-eight-nine-zero. ADMIN: Instructor will be Patrick.",
      groups: [
        {
          id: 'l006-s1-g1',
          instruction: 'Questions 1–10 · Complete the booking form.',
          questions: [
            {
              id: 'l006-q1',
              number: 1,
              type: 'form-completion',
              template:
                'BOOKING FORM\n  Surname: {blank1}\n  Transmission: {blank2}\n  Lesson price (£): {blank3}\n  Block of 10 price (£): {blank4}\n  First lesson day: {blank5}\n  First lesson month: {blank6}\n  First lesson time: {blank7} pm\n  Theory test fee (£): {blank8}\n  Practical test fee (£): {blank9}\n  Instructor: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Pereira', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'manual', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: '30', acceptableVariants: ['£30'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '270', acceptableVariants: ['£270'], maxWords: 1 },
                {
                  id: 'blank5',
                  correctAnswer: '8th',
                  acceptableVariants: ['8', 'eighth'],
                  maxWords: 1,
                },
                { id: 'blank6', correctAnswer: 'June', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '23', acceptableVariants: ['£23'], maxWords: 1 },
                { id: 'blank9', correctAnswer: '62', acceptableVariants: ['£62'], maxWords: 1 },
                { id: 'blank10', correctAnswer: 'Patrick', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each detail is stated directly.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-006-s2',
      number: 2,
      title: 'Section 2 — Audio guide for the modern art gallery',
      audioUrl: null,
      transcript:
        "GUIDE: Welcome to the audio tour. The gallery houses one hundred and thirty works across four floors. Begin in the atrium and proceed to the print room on level one. The largest canvas is by Tomas Esson — eighteen metres long. The most photographed sculpture is Kiri Dalena's iron tree. Floor two presents post-war abstraction. Floor three is reserved for temporary exhibitions, currently a retrospective of Lubaina Himid until November. The shop is on the ground floor. Tour total length is sixty minutes.",
      groups: [
        {
          id: 'l006-s2-g1',
          instruction: 'Questions 11–20 · Complete the gallery guide.',
          questions: [
            {
              id: 'l006-q11',
              number: 11,
              type: 'form-completion',
              template:
                'GALLERY GUIDE\n  Total works: {blank1}\n  Floors: {blank2}\n  Print room on level: {blank3}\n  Largest canvas length (m): {blank4}\n  Largest canvas artist: {blank5}\n  Most photographed sculpture material: {blank6}\n  Floor 2 theme: post-war {blank7}\n  Current retrospective ends in: {blank8}\n  Shop floor: {blank9}\n  Tour length (mins): {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '130',
                  acceptableVariants: ['one hundred and thirty'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '4', acceptableVariants: ['four'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '1', acceptableVariants: ['one'], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: '18',
                  acceptableVariants: ['eighteen'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: 'Esson', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'iron', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'abstraction', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'November', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'ground', acceptableVariants: [], maxWords: 1 },
                { id: 'blank10', correctAnswer: '60', acceptableVariants: ['sixty'], maxWords: 1 },
              ],
              explanation: 'Each fact is spoken in order.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-006-s3',
      number: 3,
      title: 'Section 3 — Dissertation troubleshooting',
      audioUrl: null,
      transcript:
        'TUTOR: Where are you stuck? STUDENT: My word count is too low — only seven thousand two hundred. TUTOR: You need ten thousand. Add a discussion section. STUDENT: My data is in spreadsheets. TUTOR: Move it to figures. Use SPSS for the regression. STUDENT: What about citations? TUTOR: Use Harvard style. STUDENT: When is the soft binding deadline? TUTOR: The fifteenth of April. Hardback by the sixth of May. Submission is to room three-zero-one. Print on both sides.',
      groups: [
        {
          id: 'l006-s3-g1',
          instruction: 'Questions 21–30 · Complete the troubleshooting checklist.',
          questions: [
            {
              id: 'l006-q21',
              number: 21,
              type: 'form-completion',
              template:
                'CHECKLIST\n  Current word count: {blank1}\n  Target word count: {blank2}\n  Section to add: {blank3}\n  Convert spreadsheets to: {blank4}\n  Software for regression: {blank5}\n  Citation style: {blank6}\n  Soft binding day: {blank7}\n  Soft binding month: {blank8}\n  Hardback by day: {blank9}\n  Submission room: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '7200',
                  acceptableVariants: ['seven thousand two hundred'],
                  maxWords: 1,
                },
                {
                  id: 'blank2',
                  correctAnswer: '10000',
                  acceptableVariants: ['ten thousand'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: 'discussion', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'figures', acceptableVariants: [], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'SPSS', acceptableVariants: ['spss'], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'Harvard', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank7',
                  correctAnswer: '15th',
                  acceptableVariants: ['15', 'fifteenth'],
                  maxWords: 1,
                },
                { id: 'blank8', correctAnswer: 'April', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank9',
                  correctAnswer: '6th',
                  acceptableVariants: ['6', 'sixth'],
                  maxWords: 1,
                },
                { id: 'blank10', correctAnswer: '301', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each datum is stated by the tutor.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-006-s4',
      number: 4,
      title: 'Section 4 — Lecture on ant colonies',
      audioUrl: null,
      transcript:
        'LECTURER: A typical mature ant colony contains between ten thousand and one million workers, depending on species. The largest known supercolony, found in southern Europe, stretches six thousand kilometres across the coast. Worker lifespan averages three years, while a queen may live for twenty. Communication is overwhelmingly chemical: workers deposit pheromone trails along foraging routes. Colony temperature is regulated by clustering and ventilation; the optimal nest temperature is twenty-five degrees Celsius. Ant biomass globally has been estimated at twenty quadrillion individuals.',
      groups: [
        {
          id: 'l006-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture summary.',
          questions: [
            {
              id: 'l006-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE SUMMARY · Ant colonies\n  Workers per mature colony (lower, thousands): {blank1}\n  Workers per mature colony (upper, millions): {blank2}\n  Largest supercolony location: southern {blank3}\n  Supercolony length (km): {blank4}\n  Worker lifespan (years): {blank5}\n  Queen lifespan (years): {blank6}\n  Main communication mode: {blank7}\n  Trail substance: {blank8}\n  Optimal nest temp (°C): {blank9}\n  Global ant population unit: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
                { id: 'blank2', correctAnswer: '1', acceptableVariants: ['one'], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'Europe', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank4',
                  correctAnswer: '6000',
                  acceptableVariants: ['six thousand'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank6', correctAnswer: '20', acceptableVariants: ['twenty'], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'chemical', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank8',
                  correctAnswer: 'pheromone',
                  acceptableVariants: ['pheromones'],
                  maxWords: 1,
                },
                {
                  id: 'blank9',
                  correctAnswer: '25',
                  acceptableVariants: ['twenty-five'],
                  maxWords: 1,
                },
                {
                  id: 'blank10',
                  correctAnswer: 'quadrillion',
                  acceptableVariants: [],
                  maxWords: 1,
                },
              ],
              explanation: 'Each figure is stated directly in the lecture.',
            },
          ],
        },
      ],
    },
  ],
}
