import type { Test } from '../../schemas/test'

export const speaking006: Test = {
  id: 'speaking-006',
  skill: 'speaking',
  title: 'Speaking Test 06',
  description:
    'A three-part interview on food, a memorable meal, and food culture. Around fourteen minutes.',
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
      title: 'Food and cooking',
      questions: [
        'Do you enjoy cooking? Why or why not?',
        'What kinds of food do you usually eat at home?',
        'Has your taste in food changed since you were a child?',
        'Do you prefer eating at home or in restaurants? Why?',
        'How often do you try food from other countries?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
    {
      part: 2,
      title: 'Describe a meal you particularly remember',
      questions: [
        'Describe a meal that you particularly remember.\n\nYou should say:\n— where you were and who you were with\n— what you ate\n— what made the occasion special\n\nand explain why you remember this meal so clearly.',
      ],
      prepSeconds: 60,
      speakSeconds: 120,
    },
    {
      part: 3,
      title: 'Food culture and society',
      questions: [
        'Why is food such an important part of national culture, in your view?',
        'Has the way people eat changed in your country in recent decades?',
        'Do you think fast food has had a positive or negative effect on society?',
        'Should governments do more to encourage healthy eating?',
        'How might the food we eat change as the global population grows?',
      ],
      prepSeconds: 0,
      speakSeconds: 270,
    },
  ],
  mockFeedback: {
    summary:
      'A friendly, fluent response in Parts 1 and 2; Part 3 shows good ideas but ideas occasionally arrive faster than the language to express them. Pronunciation carries meaning well.',
    criteriaOffsets: [0, 0.5, 0, 0],
    criteriaFeedback: [
      'Comfortable pace across all three parts. A few mid-sentence pauses in Part 3 when reaching for abstract vocabulary — drilling topic phrases would help.',
      'Strong food-specific lexis: "home-cooked", "ultra-processed", "comfort food", "regional cuisine". Register is consistent.',
      'Past tenses in Part 2 were accurate. Watch the present perfect in Part 3 ("food has changed" not "food changed").',
      'Individual sounds are clear. Linking between words is natural. Stress on long topic words ("traditionally", "industrially") is mostly correct.',
    ],
  },
}
