import type { Test } from '../../schemas/test'

export const speaking007: Test = {
  id: 'speaking-007',
  skill: 'speaking',
  title: 'Speaking Test 07',
  description:
    'A three-part interview on music, a song that matters to you, and the changing music industry. Around fourteen minutes.',
  difficulty: 'intermediate',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-29',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Music in everyday life',
      questions: [
        'What kinds of music do you usually listen to?',
        'When do you most often listen to music — at home, on the way somewhere, or while working?',
        'Have you ever learned to play a musical instrument?',
        'Do you prefer listening to music alone or with other people?',
        'Is live music important to you? Why or why not?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a song that means a lot to you',
      questions: [
        'Describe a song that has a special meaning for you.\n\nYou should say:\n— what the song is and who performs it\n— when and how you first heard it\n— where you usually listen to it now\n\nand explain why this song is meaningful to you.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'The music industry and listening habits',
      questions: [
        'How has the way people listen to music changed in the last twenty years?',
        'Why do you think certain songs become popular across many countries?',
        'Has streaming been good or bad for musicians, in your view?',
        'Should children learn music as a regular school subject?',
        'Do you think live concerts will become more or less common in the future?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
  ],
  mockFeedback: {
    summary:
      'A warm, personal response in Part 2 and substantive arguments in Part 3. Part 1 is fluent. Some Part 3 answers could push further by adding a brief counter-point before resolving.',
    criteriaOffsets: [0, 0, 0.5, 0],
    criteriaFeedback: [
      'Steady pace throughout. Part 3 answers averaged three sentences — strong shape. A brief concession ("though some would argue...") before your view would showcase higher discourse skill.',
      'Music-specific lexis is rich: "streaming royalties", "indie scene", "earworm", "soundtrack". Register matches the topic.',
      'Past tenses in Part 2 are accurate. Conditionals in Part 3 are handled well.',
      'Pronunciation of musical terms is clear. Watch stress on borrowed words from other languages — a small but recurring slip.',
    ],
  },
}
