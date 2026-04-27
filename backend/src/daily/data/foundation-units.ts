import type { DailyUnit } from '@shared/schemas/daily-unit'

/**
 * Foundation-level daily units (Band 4.5–5.5).
 *
 * Topic arc across the 5-day cycle:
 *   Day I   — Technology & daily life
 *   Day II  — Education & study habits
 *   Day III — Environment & the city
 *   Day IV  — Health & wellbeing
 *   Day V   — Work & first jobs
 *
 * Reading passages: 200–280 words, B1 register.
 * Listening transcripts: 180–250 words, conversational tone.
 * Each vocab deck pulls 10 items directly from the reading.
 * Writing prompts: 80-word minimum, topic-aligned with the reading.
 */
export const FOUNDATION_UNITS: DailyUnit[] = [
  /* ── DAY I — Technology ─────────────────────────────────────────────── */
  {
    id: 'foundation-day-1-technology',
    day: 1,
    level: 'foundation',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The phone in my pocket',
      topic: 'technology',
      wordCount: 240,
      body: `Every morning the first thing I touch is not my wife's hand or the kettle. It is my phone. I check the time, the weather, and three messages I missed during the night. This habit started slowly, but now it feels automatic.

My phone helps me in many small ways. I read the news on the bus. I take photographs of street signs in cities I visit. I listen to a language podcast at the gym. The screen is small, but the device is honest about what it can do — it connects me to the world.

There are problems too. I look at my phone in the queue at the shop. I look at it at red lights. Sometimes I look at it while a friend is speaking. The signal is good, but my attention is poor.

A friend told me to leave my phone in another room for one hour each evening. The first night I felt strange, almost lonely. The second night I read a book. The third night I noticed the kitchen tap was leaking, something I had walked past for two weeks without seeing.

Technology is a tool, not a problem. The problem is the way I use it. From this month I have a new rule: when I am at dinner, the phone stays in my bag. It is a small change. But small changes, repeated for a year, become a different life.`,
      questions: [
        {
          id: 'r1-1',
          number: 1,
          prompt: 'What is the first thing the writer does in the morning?',
          choices: [
            { key: 'A', text: 'They read a book.' },
            { key: 'B', text: 'They check their phone.' },
            { key: 'C', text: 'They make tea with the kettle.' },
            { key: 'D', text: 'They speak to their wife.' },
          ],
          correctKey: 'B',
          explanation:
            'The first paragraph states the first thing they touch is their phone, used to check the time, weather, and messages.',
        },
        {
          id: 'r1-2',
          number: 2,
          prompt: 'How does the writer use their phone on the bus?',
          choices: [
            { key: 'A', text: 'To take photos.' },
            { key: 'B', text: 'To read the news.' },
            { key: 'C', text: 'To listen to a podcast.' },
            { key: 'D', text: 'To play games.' },
          ],
          correctKey: 'B',
          explanation: 'The text says "I read the news on the bus."',
        },
        {
          id: 'r1-3',
          number: 3,
          prompt: 'According to the writer, what is the real problem with their phone?',
          choices: [
            { key: 'A', text: 'The signal is poor.' },
            { key: 'B', text: 'The screen is small.' },
            { key: 'C', text: 'The way they use it.' },
            { key: 'D', text: 'It runs out of battery.' },
          ],
          correctKey: 'C',
          explanation:
            'The final paragraph states "Technology is a tool, not a problem. The problem is the way I use it."',
        },
        {
          id: 'r1-4',
          number: 4,
          prompt: 'On the third night without their phone, the writer noticed:',
          choices: [
            { key: 'A', text: 'A leaking kitchen tap.' },
            { key: 'B', text: 'That they felt lonely.' },
            { key: 'C', text: 'That they could read a book.' },
            { key: 'D', text: 'A new shop nearby.' },
          ],
          correctKey: 'A',
          explanation:
            'On the third night they noticed the kitchen tap was leaking — a detail they had ignored for two weeks.',
        },
        {
          id: 'r1-5',
          number: 5,
          prompt: 'The new rule the writer makes is:',
          choices: [
            { key: 'A', text: 'No phone at the gym.' },
            { key: 'B', text: 'No phone at red lights.' },
            { key: 'C', text: 'No phone at dinner.' },
            { key: 'D', text: 'No phone in the morning.' },
          ],
          correctKey: 'C',
          explanation: '"When I am at dinner, the phone stays in my bag."',
        },
      ],
    },
    listening: {
      title: 'A library app',
      topic: 'technology',
      audioUrl: null,
      transcript: `Hello everyone, and welcome. I'm Anna from the library. Today I want to show you our new app. It's free, and you can download it onto your phone in two minutes.

So, why use the app? First, you can search for any book without coming to the library. You type the title, and the app tells you if it is on the shelf or borrowed. Second, you can renew your books. If you are not finished, just tap "renew" and you have another two weeks.

Third — and this is my favourite — the app has a notification feature. When a book you reserved arrives, the app sends a message to your phone. You don't need to phone us or check.

There are two small problems we are still fixing. The app does not work very well on older phones, so if your phone is more than five years old, you may have trouble. Also, the app sometimes shows the wrong opening hours during holidays. We are sorry. Always check our website during Christmas week.

To download, search for "Westgate Library" in your app store. The icon is a small green book. The first time you open it, you need your library card number. That's the long number on the back of your card.

If you have any questions, my colleague Tom is at the desk by the window. Thank you for listening, and welcome to the library.`,
      questions: [
        {
          id: 'l1-1',
          number: 1,
          prompt: 'According to Anna, the app is:',
          choices: [
            { key: 'A', text: 'Two pounds a year.' },
            { key: 'B', text: 'Free.' },
            { key: 'C', text: 'Free for the first month.' },
            { key: 'D', text: 'Five pounds.' },
          ],
          correctKey: 'B',
          explanation: 'Anna says: "It\'s free, and you can download it onto your phone in two minutes."',
        },
        {
          id: 'l1-2',
          number: 2,
          prompt: 'What can a user do when their book is reserved and arrives?',
          choices: [
            { key: 'A', text: 'Phone the library.' },
            { key: 'B', text: 'Wait two weeks.' },
            { key: 'C', text: 'Receive a notification on their phone.' },
            { key: 'D', text: 'Send a text to the library.' },
          ],
          correctKey: 'C',
          explanation: 'The app sends a notification when a reserved book arrives.',
        },
        {
          id: 'l1-3',
          number: 3,
          prompt: 'The app may not work well on:',
          choices: [
            { key: 'A', text: 'Phones more than five years old.' },
            { key: 'B', text: 'Computers.' },
            { key: 'C', text: 'Tablets.' },
            { key: 'D', text: 'Phones bought last year.' },
          ],
          correctKey: 'A',
          explanation: 'The transcript explicitly mentions phones older than five years may have trouble.',
        },
        {
          id: 'l1-4',
          number: 4,
          prompt: 'During Christmas week, users should check:',
          choices: [
            { key: 'A', text: 'The app for opening hours.' },
            { key: 'B', text: 'The library website.' },
            { key: 'C', text: 'The notice on the door.' },
            { key: 'D', text: 'A radio announcement.' },
          ],
          correctKey: 'B',
          explanation: '"Always check our website during Christmas week" — the app may show wrong holiday hours.',
        },
        {
          id: 'l1-5',
          number: 5,
          prompt: 'To use the app for the first time, users need:',
          choices: [
            { key: 'A', text: 'Their phone number.' },
            { key: 'B', text: 'A password.' },
            { key: 'C', text: 'Their library card number.' },
            { key: 'D', text: 'An email address.' },
          ],
          correctKey: 'C',
          explanation: 'Anna says they need the library card number, found on the back of the card.',
        },
      ],
    },
    vocabDeck: [
      { term: 'automatic', partOfSpeech: 'adjective', definition: 'Done without thinking, by habit.', example: 'Now it feels automatic.', register: 'B1', vi: 'tự động' },
      { term: 'queue', partOfSpeech: 'noun', definition: 'A line of people waiting.', example: 'I look at my phone in the queue at the shop.', register: 'B1', vi: 'hàng đợi' },
      { term: 'attention', partOfSpeech: 'noun', definition: 'The act of looking at or thinking about someone.', example: 'The signal is good, but my attention is poor.', register: 'B1', vi: 'sự chú ý' },
      { term: 'lonely', partOfSpeech: 'adjective', definition: 'Sad because you are alone.', example: 'The first night I felt strange, almost lonely.', register: 'B1', vi: 'cô đơn' },
      { term: 'connect', partOfSpeech: 'verb', definition: 'To link or join.', example: 'It connects me to the world.', register: 'B1', vi: 'kết nối' },
      { term: 'signal', partOfSpeech: 'noun', definition: 'The strength of a phone or wifi connection.', example: 'The signal is good, but my attention is poor.', register: 'B1', vi: 'tín hiệu' },
      { term: 'device', partOfSpeech: 'noun', definition: 'A piece of equipment or machine.', example: 'The screen is small, but the device is honest.', register: 'B2', vi: 'thiết bị' },
      { term: 'habit', partOfSpeech: 'noun', definition: 'Something you do often without thinking.', example: 'This habit started slowly.', register: 'B1', vi: 'thói quen' },
      { term: 'notice', partOfSpeech: 'verb', definition: 'To see or pay attention to.', example: 'I noticed the kitchen tap was leaking.', register: 'B1', vi: 'để ý' },
      { term: 'tool', partOfSpeech: 'noun', definition: 'Something used to do a job.', example: 'Technology is a tool, not a problem.', register: 'B1', vi: 'công cụ' },
    ],
    grammarFocus: {
      topic: 'Present simple for habits',
      ruleSummary:
        'Use the present simple to talk about routines and habits — things you do regularly. Add "-s" to the verb after he/she/it: I check my phone, she reads the news, he listens to music. Frequency adverbs (always, often, sometimes) usually come before the main verb.',
      examples: [
        'I check my phone every morning.',
        'She always reads the news on the bus.',
        'We sometimes leave our phones in another room at dinner.',
      ],
    },
    writing: {
      prompt:
        'Some people say smartphones make us less social with the people around us. Do you agree or disagree? Give one reason and one example from your own life.',
      minWords: 80,
      guidance: 'Use at least three present-simple verbs to describe your habits.',
    },
  },

  /* ── DAY II — Education ─────────────────────────────────────────────── */
  {
    id: 'foundation-day-2-education',
    day: 2,
    level: 'foundation',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The library at six',
      topic: 'education',
      wordCount: 230,
      body: `When my brother started university, he made a strange rule for himself. He went to the library every morning at six o'clock — long before the lectures started, long before most students even ate breakfast. I asked him why.

"Because the library is empty at six," he said. "And the empty library is a different building."

In his first month, he only studied for two hours each morning. By the end of the term, he was studying for four. He told me that the early hours were quiet — no friends asking questions, no phone messages, no queue at the coffee machine.

The plan worked. He passed his first-year exams with the highest marks in his group. But he also told me something I did not expect. He said the best part was not the marks. The best part was that he finished his work by lunchtime. In the afternoon, while other students rushed to revise, he walked in the park, played football, and sometimes did nothing at all.

Of course, getting up at five thirty is not for everyone. My brother is a morning person. I am not. But there is something in his rule that anyone can use: choose the quietest hour of your day, and protect it. For some people that is dawn. For others, it is the hour after dinner. The hour itself does not matter. The protection does.`,
      questions: [
        {
          id: 'r2-1',
          number: 1,
          prompt: 'What time did the brother go to the library?',
          choices: [
            { key: 'A', text: 'Six o\'clock in the morning.' },
            { key: 'B', text: 'Five o\'clock in the morning.' },
            { key: 'C', text: 'Just before lectures.' },
            { key: 'D', text: 'After breakfast.' },
          ],
          correctKey: 'A',
          explanation: 'The first paragraph mentions six o\'clock specifically.',
        },
        {
          id: 'r2-2',
          number: 2,
          prompt: 'In his first month, how long did the brother study each morning?',
          choices: [
            { key: 'A', text: 'One hour.' },
            { key: 'B', text: 'Two hours.' },
            { key: 'C', text: 'Three hours.' },
            { key: 'D', text: 'Four hours.' },
          ],
          correctKey: 'B',
          explanation: '"In his first month, he only studied for two hours each morning."',
        },
        {
          id: 'r2-3',
          number: 3,
          prompt: 'According to the brother, what is the best part of studying early?',
          choices: [
            { key: 'A', text: 'Getting high marks.' },
            { key: 'B', text: 'Beating other students.' },
            { key: 'C', text: 'Finishing work by lunchtime.' },
            { key: 'D', text: 'Drinking coffee alone.' },
          ],
          correctKey: 'C',
          explanation: '"The best part was that he finished his work by lunchtime."',
        },
        {
          id: 'r2-4',
          number: 4,
          prompt: 'What did the brother do in the afternoons?',
          choices: [
            { key: 'A', text: 'Studied more.' },
            { key: 'B', text: 'Walked, played football, or did nothing.' },
            { key: 'C', text: 'Worked at a café.' },
            { key: 'D', text: 'Slept until evening.' },
          ],
          correctKey: 'B',
          explanation: 'The text lists exactly these afternoon activities.',
        },
        {
          id: 'r2-5',
          number: 5,
          prompt: 'What is the writer\'s main lesson from the brother?',
          choices: [
            { key: 'A', text: 'Always wake up at five thirty.' },
            { key: 'B', text: 'Study for four hours every day.' },
            { key: 'C', text: 'Choose your quietest hour and protect it.' },
            { key: 'D', text: 'Avoid the library after lunch.' },
          ],
          correctKey: 'C',
          explanation: 'The closing paragraph states this directly.',
        },
      ],
    },
    listening: {
      title: 'A study tip from the tutor',
      topic: 'education',
      audioUrl: null,
      transcript: `Right, so before you go, I want to give you one tip for the rest of the term. It is very simple, but most students do not do it.

The tip is this: write a one-line summary of every lecture, in your own words, before you leave the room. One line. Twenty seconds.

Why? Because the moment you walk out of the lecture, your brain begins to forget. After thirty minutes, you have already forgotten about half of what was said. After twenty-four hours, even more is gone. But if you write a single sentence — "today's lecture was about why volcanoes explode" — that sentence helps you remember the whole lesson later.

Some students think they should write more. They write five pages of notes. That is fine, but the one-line summary is different. It is not about the details. It is about the main idea.

Try it for two weeks. At the end of two weeks, sit with your summaries — you should have about twenty of them — and read them all in order. You will be surprised. You will see the shape of the whole subject, not just the small parts.

This is not my idea. The professor who taught me thirty years ago used it. His professor used it before that. Sometimes the oldest tips are the best. Try it. See me next week and tell me how it went.`,
      questions: [
        {
          id: 'l2-1',
          number: 1,
          prompt: 'How long should the lecture summary be?',
          choices: [
            { key: 'A', text: 'A full page.' },
            { key: 'B', text: 'One line.' },
            { key: 'C', text: 'Five lines.' },
            { key: 'D', text: 'A paragraph.' },
          ],
          correctKey: 'B',
          explanation: '"Write a one-line summary." Twenty seconds.',
        },
        {
          id: 'l2-2',
          number: 2,
          prompt: 'According to the tutor, after thirty minutes you have already forgotten:',
          choices: [
            { key: 'A', text: 'Almost everything.' },
            { key: 'B', text: 'About half.' },
            { key: 'C', text: 'A small part.' },
            { key: 'D', text: 'Nothing.' },
          ],
          correctKey: 'B',
          explanation: '"After thirty minutes, you have already forgotten about half of what was said."',
        },
        {
          id: 'l2-3',
          number: 3,
          prompt: 'The summary should focus on:',
          choices: [
            { key: 'A', text: 'The details.' },
            { key: 'B', text: 'The names of professors.' },
            { key: 'C', text: 'The main idea.' },
            { key: 'D', text: 'Page numbers.' },
          ],
          correctKey: 'C',
          explanation: '"It is not about the details. It is about the main idea."',
        },
        {
          id: 'l2-4',
          number: 4,
          prompt: 'After two weeks, the student should:',
          choices: [
            { key: 'A', text: 'Throw the summaries away.' },
            { key: 'B', text: 'Read all the summaries in order.' },
            { key: 'C', text: 'Send them to the professor.' },
            { key: 'D', text: 'Translate them.' },
          ],
          correctKey: 'B',
          explanation: 'The tutor says: "sit with your summaries… and read them all in order."',
        },
        {
          id: 'l2-5',
          number: 5,
          prompt: 'How old is this study tip?',
          choices: [
            { key: 'A', text: 'A few years old.' },
            { key: 'B', text: 'New.' },
            { key: 'C', text: 'At least sixty years old.' },
            { key: 'D', text: 'One hundred years old.' },
          ],
          correctKey: 'C',
          explanation: 'Tutor used it 30 years ago, his professor before that — at least 60 years.',
        },
      ],
    },
    vocabDeck: [
      { term: 'rule', partOfSpeech: 'noun', definition: 'An instruction or law.', example: 'He made a strange rule for himself.', register: 'B1', vi: 'quy tắc' },
      { term: 'lecture', partOfSpeech: 'noun', definition: 'A talk given to students.', example: 'Long before the lectures started.', register: 'B1', vi: 'bài giảng' },
      { term: 'empty', partOfSpeech: 'adjective', definition: 'Containing nothing or no people.', example: 'The library is empty at six.', register: 'B1', vi: 'trống' },
      { term: 'mark', partOfSpeech: 'noun', definition: 'A grade or score in an exam.', example: 'He passed his first-year exams with the highest marks.', register: 'B1', vi: 'điểm số' },
      { term: 'rush', partOfSpeech: 'verb', definition: 'To hurry; to do something quickly.', example: 'Other students rushed to revise.', register: 'B1', vi: 'vội vàng' },
      { term: 'revise', partOfSpeech: 'verb', definition: 'To study again before an exam.', example: 'They rushed to revise.', register: 'B2', vi: 'ôn tập' },
      { term: 'protect', partOfSpeech: 'verb', definition: 'To keep safe.', example: 'Choose your quietest hour and protect it.', register: 'B1', vi: 'bảo vệ' },
      { term: 'dawn', partOfSpeech: 'noun', definition: 'The first light in the morning.', example: 'For some people that is dawn.', register: 'B2', vi: 'rạng đông' },
      { term: 'term', partOfSpeech: 'noun', definition: 'One of the periods in a school year.', example: 'By the end of the term, he was studying for four hours.', register: 'B1', vi: 'học kỳ' },
      { term: 'plan', partOfSpeech: 'noun', definition: 'An idea about how to do something.', example: 'The plan worked.', register: 'B1', vi: 'kế hoạch' },
    ],
    grammarFocus: {
      topic: 'Past simple — narrating one event',
      ruleSummary:
        'Use the past simple to describe a finished action in the past. Regular verbs add "-ed" (worked, started). Many common verbs are irregular and must be memorised: go → went, eat → ate, make → made, have → had, see → saw. Time markers like "yesterday", "last week", "in 2020" signal the past simple.',
      examples: [
        'My brother went to the library every morning at six.',
        'He passed his first-year exams.',
        'I asked him why.',
      ],
    },
    writing: {
      prompt:
        'Describe one study habit you have or want to start. Explain when you do it and why it helps you.',
      minWords: 80,
      guidance: 'Use at least three past-simple verbs to describe a time you used the habit.',
    },
  },

  /* ── DAY III — Environment ──────────────────────────────────────────── */
  {
    id: 'foundation-day-3-environment',
    day: 3,
    level: 'foundation',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The river behind my house',
      topic: 'environment',
      wordCount: 250,
      body: `The river behind my house is older than the village itself. As a child, I caught small silver fish there. My grandmother washed clothes on the flat stones. The water was cold, fast, and very clear.

In the year I left for university, the river started to change. A new factory was built upstream. At first, nobody complained. The factory gave jobs to twenty people from our village. My uncle was one of them. But by the end of the second year, the silver fish had disappeared. The water still ran fast, but it was now grey, and a strange smell came from it after rain.

When I came home for the holidays, the river was a different river. Children no longer played in it. The flat stones were still there, but my grandmother washed clothes inside the house, with water from the tap. The factory was bigger than before. So was the smell.

Last year the local government closed the factory. They gave the workers six months of pay and started cleaning the water. My uncle was angry, then sad, then quiet. He found a job at a smaller workshop, two hours by bus. The pay is less, but the air is clean.

I went home in March. I sat by the river for an hour. The water was still grey, but a small bird flew over it — the first I had seen there in three years. The river is healing. Slowly, slowly. But it is healing.`,
      questions: [
        {
          id: 'r3-1',
          number: 1,
          prompt: 'When the writer was a child, the river water was:',
          choices: [
            { key: 'A', text: 'Grey and slow.' },
            { key: 'B', text: 'Cold, fast, and clear.' },
            { key: 'C', text: 'Warm and dirty.' },
            { key: 'D', text: 'Empty of fish.' },
          ],
          correctKey: 'B',
          explanation: '"The water was cold, fast, and very clear."',
        },
        {
          id: 'r3-2',
          number: 2,
          prompt: 'Why did people in the village not complain at first?',
          choices: [
            { key: 'A', text: 'The river still had fish.' },
            { key: 'B', text: 'The factory gave jobs to twenty villagers.' },
            { key: 'C', text: 'The factory was small.' },
            { key: 'D', text: 'The smell was nice.' },
          ],
          correctKey: 'B',
          explanation: 'The factory provided jobs, including to the writer\'s uncle.',
        },
        {
          id: 'r3-3',
          number: 3,
          prompt: 'After the factory grew, where did the grandmother wash clothes?',
          choices: [
            { key: 'A', text: 'On the flat stones.' },
            { key: 'B', text: 'At a friend\'s house.' },
            { key: 'C', text: 'In the river.' },
            { key: 'D', text: 'Inside the house, with tap water.' },
          ],
          correctKey: 'D',
          explanation: 'The grandmother moved indoors and used the tap.',
        },
        {
          id: 'r3-4',
          number: 4,
          prompt: 'How does the writer\'s uncle feel now?',
          choices: [
            { key: 'A', text: 'Happy and busy.' },
            { key: 'B', text: 'Angry, then sad, then quiet.' },
            { key: 'C', text: 'Excited about the new job.' },
            { key: 'D', text: 'Proud of the river.' },
          ],
          correctKey: 'B',
          explanation: 'The text lists this exact emotional sequence.',
        },
        {
          id: 'r3-5',
          number: 5,
          prompt: 'What sign of recovery does the writer notice in March?',
          choices: [
            { key: 'A', text: 'A small bird flying over the river.' },
            { key: 'B', text: 'Children playing again.' },
            { key: 'C', text: 'The water turning clear.' },
            { key: 'D', text: 'New silver fish.' },
          ],
          correctKey: 'A',
          explanation: '"A small bird flew over it — the first I had seen there in three years."',
        },
      ],
    },
    listening: {
      title: 'A radio interview about recycling',
      topic: 'environment',
      audioUrl: null,
      transcript: `INTERVIEWER: Today on Morning Voices, we are joined by Liam, who runs a small recycling project in our city. Liam, welcome.

LIAM: Thank you, good to be here.

INTERVIEWER: Tell us how the project started.

LIAM: It started two years ago, very simply. Three friends and I noticed that on our street, glass bottles, cardboard, and plastic bags were all going into the same bin. We thought, this is a problem we can fix. So we asked the council for one separate bin per house. They said no.

INTERVIEWER: They said no? Why?

LIAM: They said it was too expensive. So we did it ourselves. We bought twenty plastic boxes, painted them three colours — green for glass, brown for paper, blue for plastic — and gave one to each house on our street. People started using them within a week.

INTERVIEWER: And now?

LIAM: Now we have one hundred and forty houses on the system. The council changed their mind last month and they have agreed to take over the collection. From January, every house in this neighbourhood will have proper recycling.

INTERVIEWER: What is the most important thing you have learned?

LIAM: That small steps work. We did not start with one hundred and forty houses. We started with twenty. We did not have a big plan or a budget. We had three friends and twenty plastic boxes.

INTERVIEWER: Liam, thank you so much for joining us.

LIAM: Thank you.`,
      questions: [
        {
          id: 'l3-1',
          number: 1,
          prompt: 'How long ago did the project start?',
          choices: [
            { key: 'A', text: 'Two years ago.' },
            { key: 'B', text: 'Five years ago.' },
            { key: 'C', text: 'Last month.' },
            { key: 'D', text: 'Last week.' },
          ],
          correctKey: 'A',
          explanation: '"It started two years ago."',
        },
        {
          id: 'l3-2',
          number: 2,
          prompt: 'Why did the council say no to one separate bin per house at first?',
          choices: [
            { key: 'A', text: 'It was illegal.' },
            { key: 'B', text: 'It was too expensive.' },
            { key: 'C', text: 'It was not popular.' },
            { key: 'D', text: 'It was unsafe.' },
          ],
          correctKey: 'B',
          explanation: 'Liam says: "They said it was too expensive."',
        },
        {
          id: 'l3-3',
          number: 3,
          prompt: 'What colour did Liam paint the boxes for plastic?',
          choices: [
            { key: 'A', text: 'Green.' },
            { key: 'B', text: 'Brown.' },
            { key: 'C', text: 'Blue.' },
            { key: 'D', text: 'Yellow.' },
          ],
          correctKey: 'C',
          explanation: '"Green for glass, brown for paper, blue for plastic."',
        },
        {
          id: 'l3-4',
          number: 4,
          prompt: 'How many houses are now on the system?',
          choices: [
            { key: 'A', text: 'Twenty.' },
            { key: 'B', text: 'Forty.' },
            { key: 'C', text: 'One hundred and forty.' },
            { key: 'D', text: 'Two hundred.' },
          ],
          correctKey: 'C',
          explanation: '"Now we have one hundred and forty houses on the system."',
        },
        {
          id: 'l3-5',
          number: 5,
          prompt: 'What is the main lesson Liam has learned?',
          choices: [
            { key: 'A', text: 'You need a big budget.' },
            { key: 'B', text: 'Small steps work.' },
            { key: 'C', text: 'Always ask the council first.' },
            { key: 'D', text: 'Recycling is too difficult.' },
          ],
          correctKey: 'B',
          explanation: '"Small steps work" — emphasised at the end.',
        },
      ],
    },
    vocabDeck: [
      { term: 'silver', partOfSpeech: 'adjective', definition: 'Of a shiny grey-white colour, like the metal.', example: 'I caught small silver fish there.', register: 'B1', vi: 'bạc' },
      { term: 'upstream', partOfSpeech: 'adverb', definition: 'In the opposite direction to which a river flows.', example: 'A new factory was built upstream.', register: 'B2', vi: 'thượng nguồn' },
      { term: 'complain', partOfSpeech: 'verb', definition: 'To say you are not happy about something.', example: 'At first, nobody complained.', register: 'B1', vi: 'phàn nàn' },
      { term: 'disappear', partOfSpeech: 'verb', definition: 'To stop being seen.', example: 'The silver fish had disappeared.', register: 'B1', vi: 'biến mất' },
      { term: 'smell', partOfSpeech: 'noun', definition: 'The way something is sensed by the nose.', example: 'A strange smell came from it after rain.', register: 'B1', vi: 'mùi' },
      { term: 'workshop', partOfSpeech: 'noun', definition: 'A small factory where things are made or repaired.', example: 'He found a job at a smaller workshop.', register: 'B1', vi: 'xưởng' },
      { term: 'close', partOfSpeech: 'verb', definition: 'To shut down or stop.', example: 'The local government closed the factory.', register: 'B1', vi: 'đóng cửa' },
      { term: 'pay', partOfSpeech: 'noun', definition: 'Money you receive for work.', example: 'They gave the workers six months of pay.', register: 'B1', vi: 'lương' },
      { term: 'heal', partOfSpeech: 'verb', definition: 'To recover; to become healthy again.', example: 'The river is healing.', register: 'B2', vi: 'lành lại' },
      { term: 'flat', partOfSpeech: 'adjective', definition: 'Smooth and level, with no high parts.', example: 'My grandmother washed clothes on the flat stones.', register: 'B1', vi: 'phẳng' },
    ],
    grammarFocus: {
      topic: 'Comparative adjectives — bigger / smaller',
      ruleSummary:
        'For one-syllable adjectives, add "-er": small → smaller, fast → faster. For adjectives ending in "-y", change to "-ier": busy → busier. For two-syllable adjectives or longer, use "more": expensive → more expensive. Use "than" to introduce the second thing being compared.',
      examples: [
        'The factory was bigger than before.',
        'The pay is less than at the old job, but the air is cleaner.',
        'The river was a different river.',
      ],
    },
    writing: {
      prompt:
        'Describe one change to the environment you have seen in your own town or village. Was the change positive or negative?',
      minWords: 80,
      guidance: 'Use at least two comparative adjectives (e.g. cleaner, busier, more polluted).',
    },
  },

  /* ── DAY IV — Health ────────────────────────────────────────────────── */
  {
    id: 'foundation-day-4-health',
    day: 4,
    level: 'foundation',
    publishedAt: '2026-04-27',
    reading: {
      title: 'Walking is enough',
      topic: 'health',
      wordCount: 240,
      body: `My doctor told me, very gently, that I should exercise more. I am thirty-eight years old. I sit at a desk for nine hours every day. The doctor did not look at my weight or my heart. She looked at my legs.

"How often do you walk?" she asked.
"To my car, every morning."
"How far is your car?"
"Twenty metres."

She smiled, but the smile was sad. She said I did not need a gym. I did not need a running coach. I needed thirty minutes of walking every day, and the thirty minutes did not have to be in one block. Five minutes here, ten minutes there.

I left her office feeling annoyed. Walking? Everybody walks. But I tried it. I parked my car a ten-minute walk from the office. I started taking the stairs to my floor — six floors, twice a day. I walked to the shop instead of driving.

After three months, I lost five kilograms. After six months, I noticed that I was not tired in the afternoons. I was sleeping better. My back, which had hurt for years, stopped hurting.

A friend from the gym laughed when I told him my plan. "Walking? That's not exercise. That's just moving." I did not argue. He has not lost weight in two years. I have. The cheapest medicine for my health turned out to be the one I already had: my legs.`,
      questions: [
        {
          id: 'r4-1',
          number: 1,
          prompt: 'How long does the writer sit at a desk each day?',
          choices: [
            { key: 'A', text: 'Six hours.' },
            { key: 'B', text: 'Seven hours.' },
            { key: 'C', text: 'Eight hours.' },
            { key: 'D', text: 'Nine hours.' },
          ],
          correctKey: 'D',
          explanation: '"I sit at a desk for nine hours every day."',
        },
        {
          id: 'r4-2',
          number: 2,
          prompt: 'How much walking did the doctor recommend?',
          choices: [
            { key: 'A', text: 'Ten minutes a day.' },
            { key: 'B', text: 'Twenty minutes a day.' },
            { key: 'C', text: 'Thirty minutes a day.' },
            { key: 'D', text: 'One hour a day.' },
          ],
          correctKey: 'C',
          explanation: '"Thirty minutes of walking every day."',
        },
        {
          id: 'r4-3',
          number: 3,
          prompt: 'How did the writer first feel about the doctor\'s advice?',
          choices: [
            { key: 'A', text: 'Excited.' },
            { key: 'B', text: 'Annoyed.' },
            { key: 'C', text: 'Sad.' },
            { key: 'D', text: 'Confused.' },
          ],
          correctKey: 'B',
          explanation: '"I left her office feeling annoyed."',
        },
        {
          id: 'r4-4',
          number: 4,
          prompt: 'After three months, the writer:',
          choices: [
            { key: 'A', text: 'Joined a gym.' },
            { key: 'B', text: 'Lost five kilograms.' },
            { key: 'C', text: 'Stopped taking the stairs.' },
            { key: 'D', text: 'Started running.' },
          ],
          correctKey: 'B',
          explanation: '"After three months, I lost five kilograms."',
        },
        {
          id: 'r4-5',
          number: 5,
          prompt: 'The writer\'s gym friend has:',
          choices: [
            { key: 'A', text: 'Lost weight too.' },
            { key: 'B', text: 'Started walking.' },
            { key: 'C', text: 'Not lost weight in two years.' },
            { key: 'D', text: 'Joined the same gym.' },
          ],
          correctKey: 'C',
          explanation: '"He has not lost weight in two years."',
        },
      ],
    },
    listening: {
      title: 'A nurse on sleep',
      topic: 'health',
      audioUrl: null,
      transcript: `Hi everyone. My name is Sara, and I have been a nurse for fifteen years. Today I want to talk about sleep, because almost every patient I see has a problem with it.

The first thing I tell people is this: there is no magic number. Some people need nine hours, some need six. The right amount of sleep is the amount that lets you wake up without an alarm, feel rested, and not need a coffee until eleven o'clock.

Now, three small habits that make a big difference. First, no screens for one hour before bed. The blue light from phones tells your brain it is still daytime. So your brain stays awake even when your body is tired. Read a paper book, or talk to your family.

Second, the bedroom should be cool, dark, and quiet. Cool means about eighteen degrees. Dark means real darkness — even small lights from a television or a phone charger can disturb your sleep. Quiet is harder in a city, but a cheap pair of earplugs costs less than a coffee.

Third, wake up at the same time every day. Yes, even on weekends. I know, I know. But your body has an internal clock, and that clock is happier when it knows what to expect.

If you do these three things for two weeks and you still sleep badly, then please come and see me. But for most people, these three habits are enough. Sleep is medicine. It is the cheapest medicine you have.`,
      questions: [
        {
          id: 'l4-1',
          number: 1,
          prompt: 'According to Sara, how much sleep does everyone need?',
          choices: [
            { key: 'A', text: 'Eight hours.' },
            { key: 'B', text: 'Nine hours.' },
            { key: 'C', text: 'There is no magic number.' },
            { key: 'D', text: 'Ten hours.' },
          ],
          correctKey: 'C',
          explanation: '"There is no magic number" — the right amount varies by person.',
        },
        {
          id: 'l4-2',
          number: 2,
          prompt: 'Why is screen use before bed bad?',
          choices: [
            { key: 'A', text: 'It hurts your eyes.' },
            { key: 'B', text: 'The blue light tells your brain it is daytime.' },
            { key: 'C', text: 'It uses too much battery.' },
            { key: 'D', text: 'It is too quiet.' },
          ],
          correctKey: 'B',
          explanation: 'Blue light makes the brain think it is still daytime.',
        },
        {
          id: 'l4-3',
          number: 3,
          prompt: 'The bedroom should be:',
          choices: [
            { key: 'A', text: 'Warm, bright, and quiet.' },
            { key: 'B', text: 'Cool, dark, and quiet.' },
            { key: 'C', text: 'Cool, bright, and noisy.' },
            { key: 'D', text: 'Warm, dark, and noisy.' },
          ],
          correctKey: 'B',
          explanation: '"Cool, dark, and quiet."',
        },
        {
          id: 'l4-4',
          number: 4,
          prompt: 'About what temperature should the bedroom be?',
          choices: [
            { key: 'A', text: 'Twelve degrees.' },
            { key: 'B', text: 'Eighteen degrees.' },
            { key: 'C', text: 'Twenty-two degrees.' },
            { key: 'D', text: 'Twenty-five degrees.' },
          ],
          correctKey: 'B',
          explanation: '"Cool means about eighteen degrees."',
        },
        {
          id: 'l4-5',
          number: 5,
          prompt: 'According to Sara, you should wake up at the same time:',
          choices: [
            { key: 'A', text: 'On weekdays only.' },
            { key: 'B', text: 'Every day, including weekends.' },
            { key: 'C', text: 'Only when you have work.' },
            { key: 'D', text: 'Once a week.' },
          ],
          correctKey: 'B',
          explanation: '"Even on weekends."',
        },
      ],
    },
    vocabDeck: [
      { term: 'gently', partOfSpeech: 'adverb', definition: 'In a soft, kind way.', example: 'My doctor told me, very gently, that I should exercise more.', register: 'B1', vi: 'nhẹ nhàng' },
      { term: 'block', partOfSpeech: 'noun', definition: 'A continuous period of time.', example: 'It did not have to be in one block.', register: 'B1', vi: 'khối/khoảng' },
      { term: 'metres', partOfSpeech: 'noun', definition: 'Units of length (1 m = 100 cm).', example: 'Twenty metres.', register: 'B1', vi: 'mét' },
      { term: 'annoyed', partOfSpeech: 'adjective', definition: 'Slightly angry.', example: 'I left her office feeling annoyed.', register: 'B1', vi: 'bực mình' },
      { term: 'stairs', partOfSpeech: 'noun', definition: 'Steps that go up or down.', example: 'I started taking the stairs to my floor.', register: 'B1', vi: 'cầu thang' },
      { term: 'lose', partOfSpeech: 'verb', definition: 'To have less of something.', example: 'I lost five kilograms.', register: 'B1', vi: 'mất/giảm' },
      { term: 'tired', partOfSpeech: 'adjective', definition: 'Needing rest or sleep.', example: 'I was not tired in the afternoons.', register: 'B1', vi: 'mệt' },
      { term: 'hurt', partOfSpeech: 'verb', definition: 'To feel pain.', example: 'My back, which had hurt for years, stopped hurting.', register: 'B1', vi: 'đau' },
      { term: 'argue', partOfSpeech: 'verb', definition: 'To disagree, often loudly.', example: 'I did not argue.', register: 'B1', vi: 'tranh cãi' },
      { term: 'medicine', partOfSpeech: 'noun', definition: 'Something used to treat illness.', example: 'The cheapest medicine for my health was my legs.', register: 'B1', vi: 'thuốc/y học' },
    ],
    grammarFocus: {
      topic: 'Modal verbs — should and must',
      ruleSummary:
        '"Should" gives advice or recommendation: I should exercise more. "Must" expresses strong necessity or rules: You must wear a seatbelt. Both are followed by the bare infinitive (no "to"): she should walk, he must stop. Negative forms: should not / shouldn\'t (advice against), must not / mustn\'t (forbidden).',
      examples: [
        'You should walk for thirty minutes every day.',
        'You must not look at your phone before bed.',
        'I should park further away.',
      ],
    },
    writing: {
      prompt:
        'Write about one healthy habit you would like to start. Why is it important, and what difficulties might you face?',
      minWords: 80,
      guidance: 'Use "should" and "must" at least once each.',
    },
  },

  /* ── DAY V — Work ───────────────────────────────────────────────────── */
  {
    id: 'foundation-day-5-work',
    day: 5,
    level: 'foundation',
    publishedAt: '2026-04-27',
    reading: {
      title: 'My first job',
      topic: 'work',
      wordCount: 245,
      body: `My first job was in a small bakery on a corner of King Street. I was sixteen. The hours were terrible — five o'clock in the morning until twelve — and the pay was just enough for one bus journey and one lunch. But I learned something in those eight weeks that I have used in every job since.

The owner was a woman called Mrs. Donald. She had run the bakery for thirty-one years. On my first morning, she gave me a list of seven tasks. By six o'clock, I had finished four. I felt proud. Mrs. Donald looked at the list and said, "You did them quickly. But did you do them well?"

She walked to the table where I had wrapped the bread. She unwrapped one loaf. The paper was loose. The label was upside down. She did not shout. She just rewrapped the loaf in front of me, slowly, and said, "Speed without care is just noise. The customer pays for the loaf. They also pay for how it sits in their bag."

After that, I worked slower for the first hour, then faster. By the end of the second week, I could finish seven tasks before six o'clock, and they were all done well.

Mrs. Donald sold the bakery last year. She is eighty-two now. I went to her retirement party and told her the story. She did not remember the morning. She remembered the bread.`,
      questions: [
        {
          id: 'r5-1',
          number: 1,
          prompt: 'What were the working hours at the bakery?',
          choices: [
            { key: 'A', text: 'From four until ten.' },
            { key: 'B', text: 'From five until twelve.' },
            { key: 'C', text: 'From six until two.' },
            { key: 'D', text: 'From seven until three.' },
          ],
          correctKey: 'B',
          explanation: '"Five o\'clock in the morning until twelve."',
        },
        {
          id: 'r5-2',
          number: 2,
          prompt: 'How long had Mrs. Donald run the bakery?',
          choices: [
            { key: 'A', text: 'Twenty years.' },
            { key: 'B', text: 'Twenty-five years.' },
            { key: 'C', text: 'Thirty-one years.' },
            { key: 'D', text: 'Forty years.' },
          ],
          correctKey: 'C',
          explanation: '"She had run the bakery for thirty-one years."',
        },
        {
          id: 'r5-3',
          number: 3,
          prompt: 'What was wrong with the wrapped loaf?',
          choices: [
            { key: 'A', text: 'It was burnt.' },
            { key: 'B', text: 'The paper was loose and the label was upside down.' },
            { key: 'C', text: 'It was the wrong size.' },
            { key: 'D', text: 'It was old bread.' },
          ],
          correctKey: 'B',
          explanation: 'Two specific faults are listed.',
        },
        {
          id: 'r5-4',
          number: 4,
          prompt: 'By the end of the second week, the writer could:',
          choices: [
            { key: 'A', text: 'Finish four tasks before six o\'clock.' },
            { key: 'B', text: 'Finish seven tasks well before six o\'clock.' },
            { key: 'C', text: 'Bake bread alone.' },
            { key: 'D', text: 'Open the shop.' },
          ],
          correctKey: 'B',
          explanation: '"I could finish seven tasks before six o\'clock, and they were all done well."',
        },
        {
          id: 'r5-5',
          number: 5,
          prompt: 'When the writer told the story at her retirement party, Mrs. Donald:',
          choices: [
            { key: 'A', text: 'Laughed.' },
            { key: 'B', text: 'Cried.' },
            { key: 'C', text: 'Did not remember the morning, but remembered the bread.' },
            { key: 'D', text: 'Did not remember the writer at all.' },
          ],
          correctKey: 'C',
          explanation: '"She did not remember the morning. She remembered the bread."',
        },
      ],
    },
    listening: {
      title: 'A career advisor on first jobs',
      topic: 'work',
      audioUrl: null,
      transcript: `Good afternoon. My name is Mr. Park, and for the last twelve years I have helped young people choose their first job. I want to share three tips that I give every student.

The first tip: your first job does not have to be your dream job. In fact, it almost never is. Your first job is a place to learn — how an office works, how to be on time, how to write an email to a manager. These skills will travel with you for forty years. The job itself probably won't.

The second tip: choose a small company over a big one. I know, this sounds wrong. Big companies pay more. They have nicer offices. But in a small company, you will see everything. You will help with the website, answer the phone, take the package to the post office. In two years, you will have learned what someone in a big company learns in five.

The third tip: ask boring questions. When you start, do not pretend you know things. Ask. "How do I save this file?" "Where do I find last month's report?" Boring questions make you look new. That is fine. You are new. The bad questions are the ones you do not ask.

One last thing. If your first job pays badly, that is normal. If your first job is unkind, leave. Bad pay teaches patience. Bad treatment teaches nothing. Thank you, and good luck.`,
      questions: [
        {
          id: 'l5-1',
          number: 1,
          prompt: 'According to Mr. Park, your first job is mainly:',
          choices: [
            { key: 'A', text: 'Your dream job.' },
            { key: 'B', text: 'A place to make money.' },
            { key: 'C', text: 'A place to learn.' },
            { key: 'D', text: 'A short break before university.' },
          ],
          correctKey: 'C',
          explanation: '"Your first job is a place to learn."',
        },
        {
          id: 'l5-2',
          number: 2,
          prompt: 'Why does Mr. Park recommend small companies?',
          choices: [
            { key: 'A', text: 'They pay more.' },
            { key: 'B', text: 'You see everything and learn faster.' },
            { key: 'C', text: 'They have nicer offices.' },
            { key: 'D', text: 'They have shorter hours.' },
          ],
          correctKey: 'B',
          explanation: 'You see and do everything; learn in two years what big-company workers learn in five.',
        },
        {
          id: 'l5-3',
          number: 3,
          prompt: 'According to Mr. Park, the bad questions are:',
          choices: [
            { key: 'A', text: 'Boring questions.' },
            { key: 'B', text: 'Long questions.' },
            { key: 'C', text: 'The ones you do not ask.' },
            { key: 'D', text: 'Questions about money.' },
          ],
          correctKey: 'C',
          explanation: '"The bad questions are the ones you do not ask."',
        },
        {
          id: 'l5-4',
          number: 4,
          prompt: 'What does Mr. Park say about bad pay vs bad treatment?',
          choices: [
            { key: 'A', text: 'Both are normal.' },
            { key: 'B', text: 'Bad pay is normal; bad treatment means leave.' },
            { key: 'C', text: 'Both mean leave immediately.' },
            { key: 'D', text: 'Bad pay means leave; bad treatment teaches patience.' },
          ],
          correctKey: 'B',
          explanation: 'Bad pay teaches patience; bad treatment is a reason to leave.',
        },
        {
          id: 'l5-5',
          number: 5,
          prompt: 'How long has Mr. Park been a career advisor?',
          choices: [
            { key: 'A', text: 'Five years.' },
            { key: 'B', text: 'Ten years.' },
            { key: 'C', text: 'Twelve years.' },
            { key: 'D', text: 'Twenty years.' },
          ],
          correctKey: 'C',
          explanation: '"For the last twelve years."',
        },
      ],
    },
    vocabDeck: [
      { term: 'corner', partOfSpeech: 'noun', definition: 'A point where two streets or walls meet.', example: 'A small bakery on a corner of King Street.', register: 'B1', vi: 'góc' },
      { term: 'task', partOfSpeech: 'noun', definition: 'A piece of work to be done.', example: 'She gave me a list of seven tasks.', register: 'B1', vi: 'nhiệm vụ' },
      { term: 'proud', partOfSpeech: 'adjective', definition: 'Pleased about something you did well.', example: 'I felt proud.', register: 'B1', vi: 'tự hào' },
      { term: 'wrap', partOfSpeech: 'verb', definition: 'To cover something in paper or plastic.', example: 'I had wrapped the bread.', register: 'B1', vi: 'gói' },
      { term: 'loose', partOfSpeech: 'adjective', definition: 'Not tight or fixed.', example: 'The paper was loose.', register: 'B2', vi: 'lỏng' },
      { term: 'label', partOfSpeech: 'noun', definition: 'A small paper that gives information.', example: 'The label was upside down.', register: 'B1', vi: 'nhãn' },
      { term: 'shout', partOfSpeech: 'verb', definition: 'To speak very loudly.', example: 'She did not shout.', register: 'B1', vi: 'la hét' },
      { term: 'noise', partOfSpeech: 'noun', definition: 'Loud or unpleasant sound.', example: 'Speed without care is just noise.', register: 'B1', vi: 'tiếng ồn' },
      { term: 'customer', partOfSpeech: 'noun', definition: 'A person who buys something.', example: 'The customer pays for the loaf.', register: 'B1', vi: 'khách hàng' },
      { term: 'retirement', partOfSpeech: 'noun', definition: 'The time after a person stops working for life.', example: 'I went to her retirement party.', register: 'B2', vi: 'nghỉ hưu' },
    ],
    grammarFocus: {
      topic: 'Future plans — going to and will',
      ruleSummary:
        'Use "be going to + infinitive" for plans and intentions you have already decided: I am going to apply for a job. Use "will + infinitive" for instant decisions, predictions, and offers: I will help you. The contraction "I\'ll" is normal in speech and informal writing.',
      examples: [
        'I am going to look for a small company.',
        'You will learn a lot in your first job.',
        'I will ask my manager tomorrow.',
      ],
    },
    writing: {
      prompt:
        'Describe one job you would like to do in the future. Why does it interest you? What will you need to learn first?',
      minWords: 80,
      guidance: 'Use "going to" and "will" at least once each to describe your plan.',
    },
  },
]
