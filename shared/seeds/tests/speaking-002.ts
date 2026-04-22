import type { Test } from '../../schemas/test'

export const speaking002: Test = {
  id: 'speaking-002',
  skill: 'speaking',
  title: 'Speaking Test 02',
  description:
    'A full three-part interview around books, learning, and the cities we live in. Around fourteen minutes.',
  difficulty: 'advanced',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-19',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Books and reading',
      questions: [
        'Do you read often? What kinds of books do you prefer?',
        'Has the way you read changed in the last few years — paper, screen, audio?',
        'Do you have a favourite author or a book you return to?',
        'Is reading popular among your friends or family?',
        'If you could read in one other language, which would it be, and why?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a skill you would like to learn',
      questions: [
        'Describe a skill you would like to learn in the next five years.\n\nYou should say:\n— what the skill is\n— how you would learn it\n— how long you think it would take\n\nand explain why you want to learn this skill.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Learning, cities, and adulthood',
      questions: [
        'Do you think adults learn new skills differently than children?',
        'What role do cities play in offering opportunities to learn?',
        'Is it easier or harder to learn a new language as an adult? Why?',
        'Some say the internet has replaced traditional teachers. Do you agree?',
        'Will the skills valued by employers change in the next twenty years? In what ways?',
      ],
      prepSeconds: 0,
      speakSeconds: 300,
    },
  ],
  mockFeedback: {
    summary:
      'A thoughtful interview with strong content in Part 3. Fluency is steady; occasional hesitations when reaching for precise vocabulary. Pronunciation is clear with good control of word stress.',
    criteriaOffsets: [0, 0, 0.5, 0],
    criteriaFeedback: [
      'You hold the floor well across all three parts. A few hesitations mid-sentence suggest word-search rather than thought-search — broaden your active vocabulary to reduce these.',
      'Lexical range is wider than typical at this level: "bygone era", "pedagogical approach", "lifelong learning". A couple of slips in Part 1 ("do a mistake" → "make a mistake").',
      'Good control of complex structures including conditionals and subordinate clauses. Agreement is accurate.',
      'Stress and rhythm are well-managed. Intonation could fall more clearly at the end of declaratives; currently they sometimes end flat.',
    ],
  },
}
