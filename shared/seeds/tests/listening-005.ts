import type { Test } from '../../schemas/test'

export const listening005: Test = {
  id: 'listening-005',
  skill: 'listening',
  title: 'Listening Test 05',
  description:
    'An intermediate paper — hotel booking, food festival information, postgraduate supervision, and a lecture on ocean acoustics.',
  difficulty: 'intermediate',
  fullDurationMinutes: 30,
  shortDurationMinutes: 20,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Listening'],
  sections: [
    {
      id: 'listening-005-s1',
      number: 1,
      title: 'Section 1 — Hotel booking by phone',
      audioUrl: null,
      transcript:
        "AGENT: Bridgewater Hotel, good evening. CALLER: I'd like to book a room. Name is Sara Whitehouse — W-H-I-T-E-H-O-U-S-E. AGENT: Number of nights? CALLER: Three. AGENT: Room type? CALLER: Double, sea view. AGENT: That's one hundred and forty pounds per night. Breakfast is included. Check-in from three pm; check-out by eleven. Parking is fifteen pounds for the stay. The wifi code is changed weekly — the desk will print it. The pool is open six am to ten pm. Booking reference: B-W-eight-two-six-zero.",
      groups: [
        {
          id: 'l005-s1-g1',
          instruction: 'Questions 1–10 · Complete the booking record.',
          questions: [
            {
              id: 'l005-q1',
              number: 1,
              type: 'form-completion',
              template:
                'BOOKING RECORD\n  Surname: {blank1}\n  Number of nights: {blank2}\n  Room: {blank3} (sea view)\n  Rate per night (£): {blank4}\n  Included: {blank5}\n  Check-in from: {blank6} pm\n  Check-out by: {blank7} am\n  Parking (£): {blank8}\n  Pool closes at: {blank9} pm\n  Booking ref ends in: {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'Whitehouse', acceptableVariants: [], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'three', acceptableVariants: ['3'], maxWords: 1 },
                { id: 'blank3', correctAnswer: 'double', acceptableVariants: [], maxWords: 1 },
                { id: 'blank4', correctAnswer: '140', acceptableVariants: ['£140'], maxWords: 1 },
                { id: 'blank5', correctAnswer: 'breakfast', acceptableVariants: [], maxWords: 1 },
                { id: 'blank6', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank7', correctAnswer: '11', acceptableVariants: ['eleven'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '15', acceptableVariants: ['£15'], maxWords: 1 },
                { id: 'blank9', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '8260', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each detail is stated by the agent.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-005-s2',
      number: 2,
      title: 'Section 2 — Summer food festival',
      audioUrl: null,
      transcript:
        'ORGANISER: Welcome to the summer food festival, now in its tenth year. The festival runs for four days. Tickets are twelve pounds for adults; children under ten enter free. There are forty-five food stalls and six demonstration kitchens. The headline chef this year is Selma Akbar, who will appear on Saturday at three. Live music plays on the main stage from noon. The wine garden requires a separate ticket of five pounds. The waste from the event is composted on site.',
      groups: [
        {
          id: 'l005-s2-g1',
          instruction: 'Questions 11–20 · Complete the festival programme.',
          questions: [
            {
              id: 'l005-q11',
              number: 11,
              type: 'form-completion',
              template:
                'FESTIVAL PROGRAMME\n  Edition number (anniversary): {blank1}\n  Duration (days): {blank2}\n  Adult ticket (£): {blank3}\n  Free for children under: {blank4}\n  Food stalls: {blank5}\n  Demo kitchens: {blank6}\n  Headline chef: Selma {blank7}\n  Headline chef appears on: {blank8}\n  Live music starts at: {blank9}\n  Wine garden ticket (£): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: 'tenth', acceptableVariants: ['10th'], maxWords: 1 },
                { id: 'blank2', correctAnswer: 'four', acceptableVariants: ['4'], maxWords: 1 },
                { id: 'blank3', correctAnswer: '12', acceptableVariants: ['£12'], maxWords: 1 },
                { id: 'blank4', correctAnswer: '10', acceptableVariants: ['ten'], maxWords: 1 },
                {
                  id: 'blank5',
                  correctAnswer: '45',
                  acceptableVariants: ['forty-five'],
                  maxWords: 1,
                },
                { id: 'blank6', correctAnswer: '6', acceptableVariants: ['six'], maxWords: 1 },
                { id: 'blank7', correctAnswer: 'Akbar', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: 'Saturday', acceptableVariants: [], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'noon', acceptableVariants: ['12'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '5', acceptableVariants: ['£5'], maxWords: 1 },
              ],
              explanation: 'Each fact is stated by the organiser.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-005-s3',
      number: 3,
      title: 'Section 3 — Postgraduate supervision meeting',
      audioUrl: null,
      transcript:
        "SUPERVISOR: How is your literature review progressing? STUDENT: I've covered seventy sources. SUPERVISOR: Good — aim for one hundred. The review chapter should be eight thousand words. Your draft is due on the twentieth of February. The methodology chapter follows in March. We meet fortnightly. Your fieldwork begins in May, with three field sites in mind. Ethics approval needs to be submitted by the end of January. The viva is provisional for next October.",
      groups: [
        {
          id: 'l005-s3-g1',
          instruction: 'Questions 21–30 · Complete the supervision notes.',
          questions: [
            {
              id: 'l005-q21',
              number: 21,
              type: 'form-completion',
              template:
                'SUPERVISION NOTES\n  Sources covered so far: {blank1}\n  Target sources: {blank2}\n  Lit review words: {blank3}\n  Lit review draft date: {blank4} February\n  Methodology chapter month: {blank5}\n  Meeting frequency: {blank6}\n  Fieldwork starts (month): {blank7}\n  Number of field sites: {blank8}\n  Ethics deadline (month): {blank9}\n  Viva provisional (month): {blank10}',
              blanks: [
                { id: 'blank1', correctAnswer: '70', acceptableVariants: ['seventy'], maxWords: 1 },
                {
                  id: 'blank2',
                  correctAnswer: '100',
                  acceptableVariants: ['one hundred'],
                  maxWords: 1,
                },
                {
                  id: 'blank3',
                  correctAnswer: '8000',
                  acceptableVariants: ['eight thousand'],
                  maxWords: 1,
                },
                {
                  id: 'blank4',
                  correctAnswer: '20th',
                  acceptableVariants: ['20', 'twentieth'],
                  maxWords: 1,
                },
                { id: 'blank5', correctAnswer: 'March', acceptableVariants: [], maxWords: 1 },
                {
                  id: 'blank6',
                  correctAnswer: 'fortnightly',
                  acceptableVariants: ['biweekly'],
                  maxWords: 1,
                },
                { id: 'blank7', correctAnswer: 'May', acceptableVariants: [], maxWords: 1 },
                { id: 'blank8', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank9', correctAnswer: 'January', acceptableVariants: [], maxWords: 1 },
                { id: 'blank10', correctAnswer: 'October', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'All deadlines and figures are spoken in turn.',
            },
          ],
        },
      ],
    },
    {
      id: 'listening-005-s4',
      number: 4,
      title: 'Section 4 — Lecture on ocean acoustics',
      audioUrl: null,
      transcript:
        'LECTURER: Sound travels through seawater at roughly fifteen hundred metres per second — almost five times faster than in air. Whales communicate using low-frequency calls that can carry hundreds of kilometres in deep water. Shipping noise has risen by a factor of three since the nineteen sixties. The most affected band is between ten and one thousand hertz. Sonar frequencies sit around fifty kilohertz. Quiet zones have been proposed in three regions of the North Atlantic. New ship hull designs reduce noise by up to twelve decibels. The International Maritime Organization adopted voluntary noise guidelines in two thousand and fourteen.',
      groups: [
        {
          id: 'l005-s4-g1',
          instruction: 'Questions 31–40 · Complete the lecture notes.',
          questions: [
            {
              id: 'l005-q31',
              number: 31,
              type: 'form-completion',
              template:
                'LECTURE NOTES · Ocean acoustics\n  Sound speed in seawater (m/s): {blank1}\n  Speed multiple vs air: {blank2}\n  Whale calls carry (units): hundreds of {blank3}\n  Shipping noise has risen by factor of: {blank4}\n  Noise rise since (decade): {blank5}s\n  Most affected upper bound (Hz): {blank6}\n  Sonar frequency (kHz): {blank7}\n  Quiet zones proposed: {blank8}\n  Hull designs cut noise by (dB): {blank9}\n  IMO guidelines year: {blank10}',
              blanks: [
                {
                  id: 'blank1',
                  correctAnswer: '1500',
                  acceptableVariants: ['fifteen hundred'],
                  maxWords: 1,
                },
                { id: 'blank2', correctAnswer: '5', acceptableVariants: ['five'], maxWords: 1 },
                {
                  id: 'blank3',
                  correctAnswer: 'kilometres',
                  acceptableVariants: ['kilometers', 'km'],
                  maxWords: 1,
                },
                { id: 'blank4', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                {
                  id: 'blank5',
                  correctAnswer: '1960',
                  acceptableVariants: ['sixties', '1960s'],
                  maxWords: 1,
                },
                {
                  id: 'blank6',
                  correctAnswer: '1000',
                  acceptableVariants: ['one thousand'],
                  maxWords: 1,
                },
                { id: 'blank7', correctAnswer: '50', acceptableVariants: ['fifty'], maxWords: 1 },
                { id: 'blank8', correctAnswer: '3', acceptableVariants: ['three'], maxWords: 1 },
                { id: 'blank9', correctAnswer: '12', acceptableVariants: ['twelve'], maxWords: 1 },
                { id: 'blank10', correctAnswer: '2014', acceptableVariants: [], maxWords: 1 },
              ],
              explanation: 'Each figure is stated directly in the lecture.',
            },
          ],
        },
      ],
    },
  ],
}
