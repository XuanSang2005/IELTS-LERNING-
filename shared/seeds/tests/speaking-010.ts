import type { Test } from '../../schemas/test'

export const speaking010: Test = {
  id: 'speaking-010',
  skill: 'speaking',
  title: 'Speaking Test 10',
  description:
    'An advanced three-part interview on books and reading, a book that influenced you, and the future of literary culture. Around fourteen minutes.',
  difficulty: 'advanced',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Reading habits',
      questions: [
        'Do you read books in your free time?',
        'What kinds of books do you most enjoy?',
        'Do you prefer print books or e-books? Why?',
        'How often do you read in English?',
        'Has your reading habit changed since you finished school?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a book that influenced you',
      questions: [
        'Describe a book that has had an influence on you.\n\nYou should say:\n— what the book is and who wrote it\n— when you first read it\n— what it is about\n\nand explain the influence it has had on you.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Books, libraries, and the future of reading',
      questions: [
        'Why do some people read less than they used to, in your view?',
        'How important are public libraries today?',
        'Has digital reading improved or worsened the experience of literature?',
        'Should governments subsidise local bookshops?',
        'Will books in physical form survive the next fifty years?',
      ],
      prepSeconds: 0,
      speakSeconds: 300,
    },
  ],
  mockFeedback: {
    summary:
      'A thoughtful, articulate interview. Part 2 is shaped clearly — context, content, and reflection. Part 3 takes positions and engages counter-views. Pronunciation is consistent and intelligible.',
    criteriaOffsets: [0.5, 0, 0.5, 0],
    criteriaFeedback: [
      'Strong extension across all three parts. Part 3 answers run three to four sentences with reasoning and example.',
      'Wide range: "literary canon", "readerly attention", "long-form prose", "subsidised access". Register matches the topic.',
      'Conditionals are well-controlled. Past perfect is accurate when recounting first reading. A few preposition slips ("in literature" vs "of literature").',
      'Pronunciation of literary and abstract terms is clear. Sentence stress is well-placed.',
    ],
  },
}
