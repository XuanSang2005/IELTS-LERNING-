import type { Test } from '../../schemas/test'

export const listening009: Test = {
  id: 'listening-009',
  skill: 'listening',
  title: 'Listening Test 09',
  description:
    'An advanced paper — home insurance enquiry, botanical garden tour, group presentation prep, and a lecture on circadian rhythms.',
  difficulty: 'advanced',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-009-s1',
      number: 1,
      title: 'Section 1 — Home insurance enquiry',
      audioUrl: null,
      transcript:
        "AGENT: Sterling Insurance, good morning. CALLER: I'd like a quote. Name: Idris Larsen — L-A-R-S-E-N. AGENT: Building or contents? CALLER: Both. AGENT: Property type? CALLER: Terraced. Three bedrooms. AGENT: Year built? CALLER: Nineteen oh six. AGENT: Annual premium estimate is three hundred and twenty pounds. Excess is two hundred. Cover includes accidental damage as standard. Bicycle cover is an add-on at thirty-five pounds. The renewal date will be the first of August. Policy reference: SL-six-five-four-three.",
      groups: [
        {
          id: 'l009-s1-g1',
          instruction: 'Questions 1–10 · Complete the quote summary.',
          questions: [
            {
              id: 'l009-q1',
              number: 1,
              type: 'form-completion',
              template:
                'QUOTE SUMMARY\n  Surname: {blank1}\n  Cover: building and {blank2}\n  Property type: {blank3}\n  Bedrooms: {blank4}\n  Year built: {blank5}\n  Annual premium (£): {blank6}\n  Excess (£): {blank7}\n  Standard inclusion: accidental {blank8}\n  Bike add-on (£): {blank9}\n  Renewal day: {blank10} August',
              blanks: [
                { id: 'blank1', correctAnswer: 'Larsen', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'contents', acceptableVariants: [], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'terraced', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank5', correctAnswer: '1906', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: '320', acceptableVariants: ['£320'], maxWords: 1 },
                { id: 'blank7', correctAnswer: '200', acceptableVariants: ['£200'], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'damage', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: '35', acceptableVariants: ['£35'], maxWords: 1 },
                {
                  id: 'blank10',
                  correctAnswer: '1st',
                  acceptableVariants: ['1', 'first'],
                  maxWords: 1,
                },
              ],
              explanation: 'Each detail is stated by the agent.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-009-s2',
      number: 2,
      title: 'Section 2 — Botanical garden guided walk',
      audioUrl: null,
      transcript:
        'GUIDE: Welcome to the botanical gardens. We hold three thousand species across twenty-five hectares. The walk starts at the rose garden, then the alpine house, the temperate glasshouse, and ends at the herbarium. Plant labels carry both common and Latin names. Photography is permitted; tripods only with permission. The orchid house re-opens in May after refurbishment. Wheelchairs are available free at the entrance. The café is just past the main lawn. The garden closes at six pm in summer.',
      groups: [
        {
          id: 'l009-s2-g1',
          instruction: 'Questions 11–20 · Complete the visitor info.',
          questions: [
            {
              id: 'l009-q11',
              number: 11,
              type: 'form-completion',
              template:
                'VISITOR INFO\n  Species held (thousands): {blank1}\n  Area (hectares): {blank2}\n  Stop 1: {blank3} garden\n  Stop 2: alpine {blank4}\n  Stop 3: temperate {blank5}\n  Stop 4: {blank6}\n  Tripods need: {blank7}\n  Orchid house reopens (month): {blank8}\n  Wheelchair cost: {blank9}\n  Summer closing: {blank10} pm',
              blanks: [
                { id: 'blank1', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '25',
                  acceptableVariants: ['twenty-five'],
                  maxWords: 1,
                },
                { id: 'blank3', correctAnswer: 'rose', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'house', acceptableVariants: [], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'glasshouse', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'herbarium', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'permission', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'May', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'free', acceptableVariants: [], maxWords: 1 },
                { id: 'blank10', correctAnswer: '6', acceptableVariants: ['six'], maxWords: 1 },
              ],
              explanation: 'Each fact is stated by the guide.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-009-s3',
      number: 3,
      title: 'Section 3 — Group presentation preparation',
      audioUrl: null,
      transcript:
        'TUTOR: How long will the presentation be? STUDENT 1: Twenty minutes plus ten for Q and A. TUTOR: Slides? STUDENT 1: Sixteen. TUTOR: Three speakers, three sections each? STUDENT 2: Yes — introduction, evidence, and recommendations. STUDENT 1: Visuals — one chart and two photographs. TUTOR: Rehearsal on Thursday at three in room four-twelve. Marking covers content, design, and delivery — equal thirds. The rubric weights timing as bonus only. Submit slides as PDF by Wednesday five pm.',
      groups: [
        {
          id: 'l009-s3-g1',
          instruction: 'Questions 21–30 · Complete the presentation plan.',
          questions: [
            {
              id: 'l009-q21',
              number: 21,
              type: 'form-completion',
              template:
                'PRESENTATION PLAN\n  Talk length (mins): {blank1}\n  Q&A length (mins): {blank2}\n  Slide count: {blank3}\n  Speakers: {blank4}\n  Section names (3): intro, evidence, {blank5}\n  Charts: {blank6}\n  Photographs: {blank7}\n  Rehearsal day: {blank8}\n  Rehearsal room: {blank9}\n  Slides format: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '20', acceptableVariants: ['twenty'], maxWords: 1 },
                { id: 'blank2', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '16', acceptableVariants: ['sixteen'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                {
                  id: 'blank5',
                  correctAnswer: 'recommendations',
                  acceptableVariants: [],
                  maxWords: 1,
                },
                { id: 'blank6', correctAnswer: '1', acceptableVariants: ['one'], maxWords: 1 },
                { id: 'blank7', correctAnswer: '2', acceptableVariants: ['two'], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'Thursday', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: '412', acceptableVariants: [], maxWords: 1 },
                { id: 'blank10', correctAnswer: 'PDF', acceptableVariants: ['pdf'], maxWords: 1 },
              ],
              explanation: 'Each detail is stated in turn.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-009-s4',
      number: 4,
      title: 'Section 4 — Lecture on circadian rhythms',
      audioUrl: null,
      transcript:
        'LECTURER: Circadian rhythms are roughly twenty-four-hour cycles regulated by a small region of the brain called the suprachiasmatic nucleus. Light is the principal external cue, or zeitgeber. Body temperature peaks in the late afternoon at approximately thirty-seven point two degrees. Cortisol peaks shortly after waking. Disruptions are common in shift workers; chronic disruption raises cardiovascular risk by roughly forty per cent. The most influential study on this topic appeared in the journal Science in two thousand and seventeen. Treatments include timed light exposure of around ten thousand lux for thirty minutes.',
      groups: [
        {
          id: 'l009-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture notes.',
          questions: [
            {
              id: 'l009-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE NOTES · Circadian rhythms\n  Cycle length (hours): {blank1}\n  Brain region (acronym): {blank2}\n  Main cue (German term): {blank3}\n  Body temp peak time: late {blank4}\n  Body temp peak (°C): {blank5}\n  Hormone peaking after waking: {blank6}\n  Cardiovascular risk rise (%): {blank7}\n  Key journal: {blank8}\n  Year of key study: {blank9}\n  Light therapy lux (thousands): {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '24',
                  acceptableVariants: ['twenty-four'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: 'SCN', acceptableVariants: ['scn'], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'zeitgeber', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: 'afternoon', acceptableVariants: [], maxWords: 1 },
                { id: 'blank5', correctAnswer: '37.2', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: 'cortisol', acceptableVariants: [], maxWords: 1 },
                { id: 'blank7', correctAnswer: '40', acceptableVariants: ['forty'], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'Science', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: '2017', acceptableVariants: [], maxWords: 1 },
                { id: 'blank10', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
              ],
              explanation: 'Each datum is stated directly in the lecture.',
            },
          ],
        },
      ],
    },
  ],
}
