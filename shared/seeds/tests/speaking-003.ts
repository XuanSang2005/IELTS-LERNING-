import type { Test } from '../../schemas/test'

export const speaking003: Test = {
  id: 'speaking-003',
  skill: 'speaking',
  title: 'Speaking Test 03',
  description:
    'A three-part interview on food, hospitality, and how eating habits change. Around fourteen minutes.',
  difficulty: 'intermediate',
  fullDurationMinutes: 14,
  shortDurationMinutes: 10,
  totalQuestions: 3,
  isPro: true,
  publishedAt: '2026-04-19',
  tags: ['IELTS Academic', 'Speaking'],
  parts: [
    {
      part: 1,
      title: 'Food and eating habits',
      questions: [
        'Do you enjoy cooking, or do you prefer to eat out?',
        'What kinds of food are popular in your city?',
        'How have your eating habits changed since you were a child?',
        'Is there a dish you would recommend to a visitor? Why?',
        'Do you think traditional cooking is disappearing among young people?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a meal you enjoyed',
      questions: [
        'Describe a meal you particularly enjoyed in the last year.\n\nYou should say:\n— where and when you had it\n— who you were with\n— what you ate\n\nand explain why you enjoyed it.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Food culture, restaurants, and change',
      questions: [
        'Why do some cuisines travel well and others do not, in your view?',
        'Has the way people eat out changed in recent decades?',
        'Should governments do more to discourage unhealthy eating?',
        'Do restaurants play a role in preserving culture? In what ways?',
        'What impact has food delivery had on the restaurant industry?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
  ],
  mockFeedback: {
    summary:
      'A warm, fluent performance with strong anecdotal detail in Part 2. Part 3 answers could go further — engage the counter-view rather than dismissing it. Pronunciation is clear; watch word-stress on longer nouns.',
    criteriaOffsets: [0.5, 0, -0.5, 0],
    criteriaFeedback: [
      'Natural and easy through all three parts. You use fillers sparingly and self-correct well. Part 3 answers occasionally end before the idea is fully developed.',
      'Strong topical vocabulary ("comfort food", "street-food scene", "culinary heritage"). One slip ("make a cook" → "cook"). Push for one less-common item per answer in Part 3.',
      'Tense control is generally accurate; watch the past perfect when recounting "before that" sequences. Relative clauses are attempted and mostly successful.',
      'Individual sounds are clear. Word stress on "restaurant", "vegetable" is occasionally shifted. Intonation carries meaning well.',
    ],
  },
}
