import type { DailyUnit } from '@shared/schemas/daily-unit'

/**
 * Intermediate-level daily units (Band 5.5–6.5).
 *
 * Topic arc mirrors the foundation set so a candidate climbing from one
 * level to the next sees familiar themes treated more rigorously:
 *   Day I   — Technology & attention
 *   Day II  — Education & exam pressure
 *   Day III — Environment & cities
 *   Day IV  — Health & the mind
 *   Day V   — Work & a changing career
 *
 * Reading passages: 350–450 words, B2 register with occasional C1.
 * Listening transcripts: 300–400 words, lecture/interview tone.
 * Each vocab deck pulls 10 items from the reading; B2 dominates with
 * one or two C1 items per deck. Writing minimum: 120 words.
 */
export const INTERMEDIATE_UNITS: DailyUnit[] = [
  /* ── DAY I — Technology & attention ───────────────────────────────── */
  {
    id: 'intermediate-day-1-technology',
    day: 1,
    level: 'intermediate',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The cost of constant connection',
      topic: 'technology',
      wordCount: 380,
      body: `For most of human history, attention has been a private resource. We chose what to look at, what to think about, and how long to dwell on it. The smartphone — barely twenty years old as a mainstream device — has changed that quietly and almost completely.

The average adult now checks their phone around ninety times a day. Each check seems harmless. Each check breaks something less obvious: the thread of thought that takes minutes to spin, and seconds to drop. Researchers call this the cost of "switching". When attention is interrupted, even briefly, returning to the previous task takes about twenty-three minutes on average. Few of us have twenty-three minutes between interruptions any more.

The companies that build our apps are aware of this. Many of them employ teams whose job is to make their products more difficult to put down. The infinite scroll — a feed that never ends — was designed precisely so that users would not encounter a natural stopping point. Bright red notification dots are not red because that colour signals new information; they are red because red, evolutionarily, signals urgency.

It would be easy to blame the technology and stop there. But blame is not a strategy. The more useful question is: what would change if we treated our attention as we treat money — finite, valuable, and worth budgeting?

Some practical answers are emerging. Schools in Sweden and France have banned phones during lessons, citing measurable improvements in concentration. A growing number of professionals now schedule "deep work" blocks of two to three hours, during which all notifications are silenced. The author Cal Newport has argued that the ability to focus without distraction will be one of the most valuable skills of the next decade — partly because so few people will have it.

None of this requires throwing the phone in a drawer for ever. It requires a small change of mind. The phone is a tool, not an obligation. We do not need to be reachable in every minute of every day. The promise of technology was that it would give us more time. Whether it has done so depends, increasingly, on how carefully we guard the attention we have left.`,
      questions: [
        {
          id: 'r1-1',
          number: 1,
          prompt: 'According to the passage, the average adult checks their phone:',
          choices: [
            { key: 'A', text: 'Around fifty times a day.' },
            { key: 'B', text: 'Around ninety times a day.' },
            { key: 'C', text: 'Around two hundred times a day.' },
            { key: 'D', text: 'Less often than ten years ago.' },
          ],
          correctKey: 'B',
          explanation: '"The average adult now checks their phone around ninety times a day."',
        },
        {
          id: 'r1-2',
          number: 2,
          prompt: 'After an interruption, returning fully to the previous task takes about:',
          choices: [
            { key: 'A', text: 'Two to three minutes.' },
            { key: 'B', text: 'Twenty-three minutes on average.' },
            { key: 'C', text: 'An hour.' },
            { key: 'D', text: 'Half a day.' },
          ],
          correctKey: 'B',
          explanation: '"Returning to the previous task takes about twenty-three minutes on average."',
        },
        {
          id: 'r1-3',
          number: 3,
          prompt: 'Why are notification dots red, according to the passage?',
          choices: [
            { key: 'A', text: 'Red shows new information.' },
            { key: 'B', text: 'Red is the cheapest colour to design.' },
            { key: 'C', text: 'Red signals urgency to the human brain.' },
            { key: 'D', text: 'Red is the company logo colour.' },
          ],
          correctKey: 'C',
          explanation: 'The passage states red is used because, evolutionarily, it signals urgency.',
        },
        {
          id: 'r1-4',
          number: 4,
          prompt: 'The passage suggests we should treat our attention like:',
          choices: [
            { key: 'A', text: 'A renewable resource.' },
            { key: 'B', text: 'Money — finite and worth budgeting.' },
            { key: 'C', text: 'A muscle that needs daily use.' },
            { key: 'D', text: 'A skill that cannot be taught.' },
          ],
          correctKey: 'B',
          explanation: '"What would change if we treated our attention as we treat money — finite, valuable, and worth budgeting?"',
        },
        {
          id: 'r1-5',
          number: 5,
          prompt: 'According to Cal Newport, the ability to focus without distraction will be:',
          choices: [
            { key: 'A', text: 'A common skill in ten years.' },
            { key: 'B', text: 'A skill no one will need.' },
            { key: 'C', text: 'One of the most valuable skills, partly because few will have it.' },
            { key: 'D', text: 'Replaced entirely by AI.' },
          ],
          correctKey: 'C',
          explanation: 'Newport argues this skill will be valuable precisely because rare.',
        },
      ],
    },
    listening: {
      title: 'A psychologist on attention',
      topic: 'technology',
      audioUrl: null,
      transcript: `Thank you for having me. I'm Dr. Lin, and I have spent the last twelve years studying how attention works — and, more recently, how it breaks.

Let me start with a small experiment we ran in 2022. We asked one hundred university students to complete a written exam under three conditions. In the first condition, they had their phone on the desk, face up. In the second, the phone was face down. In the third, the phone was in another room entirely.

Now, all three groups were told their phone was on silent. None of them received a single notification during the exam. So you would expect similar results, right? You would be wrong.

Students with the phone face up scored, on average, twelve per cent lower than students whose phones were in another room. Even students with the phone face down scored six per cent lower. The mere physical presence of the device seemed to occupy mental space — even when the device did nothing.

We call this "phantom load". Your brain knows the phone is there. A small part of you is, all the time, thinking about whether to check it. That small part is not free for the task in front of you.

The good news is that phantom load disappears quickly. In our follow-up trial, students who left their phones in lockers for one hour before the exam performed almost identically to those who never had a phone in the building.

So if you take one thing from this talk, take this: you cannot simply ignore your phone. Distance matters. The phone is not in another room metaphorically. It needs to be in another room, literally. For an hour, even half an hour. The brain finds the rest. Thank you.`,
      questions: [
        {
          id: 'l1-1',
          number: 1,
          prompt: 'How many students participated in Dr. Lin\'s 2022 experiment?',
          choices: [
            { key: 'A', text: 'Fifty.' },
            { key: 'B', text: 'One hundred.' },
            { key: 'C', text: 'Two hundred.' },
            { key: 'D', text: 'A thousand.' },
          ],
          correctKey: 'B',
          explanation: '"We asked one hundred university students."',
        },
        {
          id: 'l1-2',
          number: 2,
          prompt: 'How much lower did students with the phone face up score?',
          choices: [
            { key: 'A', text: 'Six per cent.' },
            { key: 'B', text: 'Twelve per cent.' },
            { key: 'C', text: 'Twenty per cent.' },
            { key: 'D', text: 'No different.' },
          ],
          correctKey: 'B',
          explanation: '"Students with the phone face up scored, on average, twelve per cent lower."',
        },
        {
          id: 'l1-3',
          number: 3,
          prompt: 'What does Dr. Lin call the effect of an unused phone?',
          choices: [
            { key: 'A', text: 'Notification fatigue.' },
            { key: 'B', text: 'Phantom load.' },
            { key: 'C', text: 'Digital distraction.' },
            { key: 'D', text: 'Background noise.' },
          ],
          correctKey: 'B',
          explanation: '"We call this \'phantom load\'."',
        },
        {
          id: 'l1-4',
          number: 4,
          prompt: 'According to the follow-up trial, the effect disappears if students:',
          choices: [
            { key: 'A', text: 'Switch the phone off.' },
            { key: 'B', text: 'Leave the phone in lockers for an hour first.' },
            { key: 'C', text: 'Use noise-cancelling headphones.' },
            { key: 'D', text: 'Take a coffee break.' },
          ],
          correctKey: 'B',
          explanation: 'Leaving phones in lockers for one hour gave near-identical performance.',
        },
        {
          id: 'l1-5',
          number: 5,
          prompt: 'The main message of Dr. Lin\'s talk is that:',
          choices: [
            { key: 'A', text: 'You can focus with the phone next to you.' },
            { key: 'B', text: 'Notifications are the only problem.' },
            { key: 'C', text: 'Distance from the phone matters; ignoring it is not enough.' },
            { key: 'D', text: 'Phones should be banned at work.' },
          ],
          correctKey: 'C',
          explanation: '"Distance matters. The phone is not in another room metaphorically. It needs to be in another room, literally."',
        },
      ],
    },
    vocabDeck: [
      { term: 'dwell on', partOfSpeech: 'verb', definition: 'To spend time thinking about something.', example: 'How long to dwell on it.', register: 'B2', vi: 'nghĩ ngợi về' },
      { term: 'mainstream', partOfSpeech: 'adjective', definition: 'Used by most people; widely accepted.', example: 'Barely twenty years old as a mainstream device.', register: 'B2', vi: 'phổ biến' },
      { term: 'switching', partOfSpeech: 'noun', definition: 'Moving attention between tasks.', example: 'Researchers call this the cost of "switching".', register: 'B2', vi: 'chuyển đổi' },
      { term: 'infinite', partOfSpeech: 'adjective', definition: 'Without limit or end.', example: 'The infinite scroll — a feed that never ends.', register: 'B2', vi: 'vô hạn' },
      { term: 'urgency', partOfSpeech: 'noun', definition: 'The state of needing immediate attention.', example: 'Red, evolutionarily, signals urgency.', register: 'C1', vi: 'sự khẩn cấp' },
      { term: 'finite', partOfSpeech: 'adjective', definition: 'Limited in amount.', example: 'Finite, valuable, and worth budgeting.', register: 'C1', vi: 'có hạn' },
      { term: 'budget', partOfSpeech: 'verb', definition: 'To plan how to use a limited resource.', example: 'Worth budgeting.', register: 'B2', vi: 'phân bổ ngân sách' },
      { term: 'concentration', partOfSpeech: 'noun', definition: 'The ability to focus on something.', example: 'Citing measurable improvements in concentration.', register: 'B2', vi: 'sự tập trung' },
      { term: 'obligation', partOfSpeech: 'noun', definition: 'Something you must do.', example: 'The phone is a tool, not an obligation.', register: 'B2', vi: 'nghĩa vụ' },
      { term: 'guard', partOfSpeech: 'verb', definition: 'To protect.', example: 'How carefully we guard the attention we have left.', register: 'B2', vi: 'bảo vệ' },
    ],
    grammarFocus: {
      topic: 'Present perfect vs past simple',
      ruleSummary:
        'Use the present perfect (has/have + past participle) when the action connects to now: results, recent events, or experiences without a finished time. Use the past simple for finished actions at a specific past time. Time markers like "just", "already", "ever", "for", "since" pair with the perfect; "yesterday", "last week", "in 2020" pair with the simple past.',
      examples: [
        'The smartphone has changed our attention quietly.',
        'In 2022, researchers ran a small experiment.',
        'I have used this method for three years now.',
      ],
    },
    writing: {
      prompt:
        'Some people argue that mobile phones have improved our productivity, while others say they have made us more distracted. Discuss both views and give your own opinion.',
      minWords: 120,
      guidance:
        'Use at least two present-perfect verbs and two past-simple verbs to balance the time-frames in your argument.',
    },
  },

  /* ── DAY II — Education & exam pressure ───────────────────────────── */
  {
    id: 'intermediate-day-2-education',
    day: 2,
    level: 'intermediate',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The exam that does not measure you',
      topic: 'education',
      wordCount: 400,
      body: `Few institutions are as universally trusted, and as quietly flawed, as the standardised exam. From entrance tests for ten-year-olds to professional certifications for forty-year-olds, the same assumption underlies them all: that performance on a single morning, in a single room, under timed conditions, is a fair measure of years of study.

Examiners have known for decades that this assumption is fragile. A student who sleeps poorly the night before a paper can lose half a band. A candidate who has never seen a particular question type, no matter how well prepared in others, may freeze. Anxiety affects working memory directly, and working memory is exactly what the exam is measuring. The result is a peculiar feedback loop: the more pressure a candidate feels, the more their pressure-affected score appears to "prove" they did not deserve to pass.

This is not an argument against exams. Some assessment is necessary, and the alternative — judging students entirely on coursework — opens its own doors to grade inflation and unequal feedback. The argument is rather that any single exam result should be read with humility. It tells you something about the candidate, but only when read alongside their broader record.

In recent years, several reforms have tried to soften the all-or-nothing nature of high-stakes testing. Modular degrees split a final grade across many smaller assessments. Resit policies allow candidates to retake a paper if illness or accident is documented. The IELTS test, in particular, allows candidates to retake any single skill module under its newer one-skill retake policy — a recognition that a poor performance on one morning does not erase the work of months.

What candidates can do for themselves is harder, but more important. The first is to expect the unexpected: an unfamiliar question type, a strange room, a difficult invigilator. The second is to practise under realistic conditions — silent, timed, on paper if the real exam is on paper. The third is the hardest: to treat a result as a measurement, not a verdict. A 6.5 is information about one morning's performance. The next exam, with the same hours of study and a clearer head, may produce a 7.0. The candidate has not changed. The morning has.`,
      questions: [
        {
          id: 'r2-1',
          number: 1,
          prompt: 'According to the passage, the assumption underlying standardised exams is that:',
          choices: [
            { key: 'A', text: 'They are easier to mark than essays.' },
            { key: 'B', text: 'A single morning fairly measures years of study.' },
            { key: 'C', text: 'They are immune to anxiety.' },
            { key: 'D', text: 'Only intelligent students can pass them.' },
          ],
          correctKey: 'B',
          explanation: 'The opening states this assumption explicitly.',
        },
        {
          id: 'r2-2',
          number: 2,
          prompt: 'The "feedback loop" described in the passage refers to:',
          choices: [
            { key: 'A', text: 'Candidates teaching each other.' },
            { key: 'B', text: 'Examiners marking each other.' },
            { key: 'C', text: 'Pressure lowering scores, which appears to confirm the candidate is undeserving.' },
            { key: 'D', text: 'Tests that adapt to candidate performance.' },
          ],
          correctKey: 'C',
          explanation: 'The passage describes anxiety reducing working memory, then the result appearing to "prove" failure.',
        },
        {
          id: 'r2-3',
          number: 3,
          prompt: 'The author argues that judging students entirely on coursework would:',
          choices: [
            { key: 'A', text: 'Solve all problems with assessment.' },
            { key: 'B', text: 'Open doors to grade inflation and unequal feedback.' },
            { key: 'C', text: 'Be much cheaper.' },
            { key: 'D', text: 'Be impossible to administer.' },
          ],
          correctKey: 'B',
          explanation: 'These two specific risks are listed.',
        },
        {
          id: 'r2-4',
          number: 4,
          prompt: 'The IELTS one-skill retake policy reflects:',
          choices: [
            { key: 'A', text: 'A new exam type.' },
            { key: 'B', text: 'A recognition that one bad morning shouldn\'t erase months of work.' },
            { key: 'C', text: 'A way to charge candidates more.' },
            { key: 'D', text: 'Cooperation with universities.' },
          ],
          correctKey: 'B',
          explanation: 'The passage states this directly.',
        },
        {
          id: 'r2-5',
          number: 5,
          prompt: 'According to the author, the hardest thing a candidate can do is:',
          choices: [
            { key: 'A', text: 'Practise under realistic conditions.' },
            { key: 'B', text: 'Treat a result as a measurement, not a verdict.' },
            { key: 'C', text: 'Expect unfamiliar question types.' },
            { key: 'D', text: 'Choose the right exam centre.' },
          ],
          correctKey: 'B',
          explanation: '"The third is the hardest: to treat a result as a measurement, not a verdict."',
        },
      ],
    },
    listening: {
      title: 'A teacher on exam preparation',
      topic: 'education',
      audioUrl: null,
      transcript: `Right, today I want to talk about something most students get wrong. Not grammar, not vocabulary — something simpler. The way you practise.

Most students, when they start IELTS preparation, do this. They open a workbook. They read for ten minutes. They answer some questions. They check the answers. They think they have studied.

I'm going to suggest that what you have just done is reading. It is not practice.

Real practice for an exam has three features. First, it is timed. Second, it is uninterrupted. Third, it produces a result you cannot escape — a number, written down, that you cannot pretend was higher. Without all three, you are reading a textbook, which is fine, but it is not the thing that gets you to a 7.0.

The most common mistake I see is the un-timed test. A student does a reading paper at home, takes a phone break, makes a coffee, finishes ninety minutes later, scores 32 out of 40, and feels fine. In the actual exam, the same student would have scored 24. The clock is the test.

The second mistake is doing the same passage twice. After you check the answers once, the passage is no longer a test of your reading. It is a test of your memory. Use a fresh passage every time.

The third mistake is studying alone with no record. Buy a cheap notebook. After every practice paper, write three things: the score, the question type that hurt you most, and one specific phrase or word you want to learn. After ten papers, that notebook is more useful than any textbook. It is the textbook you wrote.

Practise like the exam, every time. The exam will then feel like another practice. That is the goal.`,
      questions: [
        {
          id: 'l2-1',
          number: 1,
          prompt: 'According to the teacher, what most students confuse with practice is:',
          choices: [
            { key: 'A', text: 'Watching videos.' },
            { key: 'B', text: 'Reading textbooks.' },
            { key: 'C', text: 'Asking questions.' },
            { key: 'D', text: 'Group discussion.' },
          ],
          correctKey: 'B',
          explanation: 'The teacher distinguishes "reading" from "practice".',
        },
        {
          id: 'l2-2',
          number: 2,
          prompt: 'How many features must real practice have?',
          choices: [
            { key: 'A', text: 'Two.' },
            { key: 'B', text: 'Three.' },
            { key: 'C', text: 'Four.' },
            { key: 'D', text: 'Five.' },
          ],
          correctKey: 'B',
          explanation: '"Real practice for an exam has three features."',
        },
        {
          id: 'l2-3',
          number: 3,
          prompt: 'The most common mistake the teacher sees is:',
          choices: [
            { key: 'A', text: 'Studying alone.' },
            { key: 'B', text: 'The un-timed test.' },
            { key: 'C', text: 'Skipping vocabulary.' },
            { key: 'D', text: 'Using free online tests.' },
          ],
          correctKey: 'B',
          explanation: '"The most common mistake I see is the un-timed test."',
        },
        {
          id: 'l2-4',
          number: 4,
          prompt: 'Why is repeating the same passage not real practice?',
          choices: [
            { key: 'A', text: 'It is boring.' },
            { key: 'B', text: 'It tests your memory of the answers, not your reading.' },
            { key: 'C', text: 'It is illegal.' },
            { key: 'D', text: 'It uses too much paper.' },
          ],
          correctKey: 'B',
          explanation: 'Once answers are checked, the passage tests memory.',
        },
        {
          id: 'l2-5',
          number: 5,
          prompt: 'After every practice paper, what three things should the student record?',
          choices: [
            { key: 'A', text: 'Time, mistakes, plan.' },
            { key: 'B', text: 'Score, weakest question type, one phrase to learn.' },
            { key: 'C', text: 'Date, place, mood.' },
            { key: 'D', text: 'Score, teacher, classroom.' },
          ],
          correctKey: 'B',
          explanation: 'These three are listed explicitly.',
        },
      ],
    },
    vocabDeck: [
      { term: 'fragile', partOfSpeech: 'adjective', definition: 'Easily broken or weakened.', example: 'This assumption is fragile.', register: 'B2', vi: 'mong manh' },
      { term: 'standardised', partOfSpeech: 'adjective', definition: 'Made the same for everyone.', example: 'The standardised exam.', register: 'B2', vi: 'chuẩn hoá' },
      { term: 'invigilator', partOfSpeech: 'noun', definition: 'A person who supervises an exam.', example: 'A difficult invigilator.', register: 'C1', vi: 'giám thị' },
      { term: 'verdict', partOfSpeech: 'noun', definition: 'A final judgement or decision.', example: 'Treat a result as a measurement, not a verdict.', register: 'C1', vi: 'phán quyết' },
      { term: 'high-stakes', partOfSpeech: 'adjective', definition: 'Having serious consequences.', example: 'High-stakes testing.', register: 'C1', vi: 'rủi ro cao' },
      { term: 'modular', partOfSpeech: 'adjective', definition: 'Made of separate parts.', example: 'Modular degrees split a final grade.', register: 'B2', vi: 'mô-đun' },
      { term: 'humility', partOfSpeech: 'noun', definition: 'A modest view of one\'s own importance.', example: 'Should be read with humility.', register: 'C1', vi: 'sự khiêm tốn' },
      { term: 'inflation', partOfSpeech: 'noun', definition: 'A general increase in something.', example: 'Grade inflation.', register: 'B2', vi: 'lạm phát' },
      { term: 'reform', partOfSpeech: 'noun', definition: 'A change made to improve something.', example: 'Several reforms have tried to soften the all-or-nothing nature.', register: 'B2', vi: 'cải cách' },
      { term: 'measurement', partOfSpeech: 'noun', definition: 'An act of finding the size or amount.', example: 'A measurement, not a verdict.', register: 'B2', vi: 'phép đo' },
    ],
    grammarFocus: {
      topic: 'Conditionals — zero and first',
      ruleSummary:
        'Zero conditional ("if + present, present") describes general truths and habits: If you don\'t sleep, your scores fall. First conditional ("if + present, will + infinitive") describes likely future situations: If I revise tonight, I will pass tomorrow. The "if" clause can come first or second; if it comes first, separate it with a comma.',
      examples: [
        'If you practise without a clock, you do not practise at all.',
        'If she retakes the writing module, she will probably get a 7.0.',
        'If a student feels anxious, working memory drops.',
      ],
    },
    writing: {
      prompt:
        'Some argue that high-stakes exams are necessary to maintain academic standards, while others believe they cause unnecessary stress and miss the bigger picture. Discuss both sides and give your view.',
      minWords: 120,
      guidance:
        'Use at least one zero conditional and one first conditional in your argument.',
    },
  },

  /* ── DAY III — Environment & cities ───────────────────────────────── */
  {
    id: 'intermediate-day-3-environment',
    day: 3,
    level: 'intermediate',
    publishedAt: '2026-04-27',
    reading: {
      title: 'Cities that breathe',
      topic: 'environment',
      wordCount: 410,
      body: `For most of the twentieth century, cities were planned around the car. Wide roads, generous car parks, and out-of-town shopping centres became the visible markers of progress. The cost of this planning was hidden because, for decades, nobody calculated it carefully. Air quality was treated as a local problem, not a measurable health crisis.

The cost is now clear. The World Health Organization estimates that exposure to outdoor air pollution causes around four million premature deaths each year, the majority in cities. Beyond mortality, polluted air has been linked to lower birth weights, reduced academic performance in children, and a measurable rise in cardiovascular disease. A child growing up beside a major road in a polluted city loses an average of twenty months of healthy life expectancy compared with a child in a rural area.

Some city governments have responded with policies that would have been politically impossible a generation ago. Paris has redesigned the banks of the Seine to remove cars entirely. Bogotá runs a weekly "ciclovía" that closes more than a hundred kilometres of streets to traffic every Sunday. Singapore charges drivers automatically when they enter the city centre during congested hours, with the fee adjusted in real time according to demand. London's ultra-low emission zone has been credited with measurable reductions in nitrogen dioxide.

Critics argue that such measures unfairly burden lower-income drivers, who are less able to switch to electric vehicles or to live closer to the centre. The criticism is fair, but partial. Where cities have invested simultaneously in cycling infrastructure and public transport, the benefits have spread more evenly. Copenhagen, for instance, expanded its cycle network and discovered that cycling rates rose fastest in the lowest-income districts, not the wealthiest.

The most successful cities have one thing in common: they treat air as a shared resource, like water or electricity, rather than an unlimited free good. They measure it. They publish the measurements. They respond to the data. The transformation does not happen in a single year — Copenhagen took thirty — but it happens.

What no city has yet found is a politically painless path. Reducing car use means asking some residents to change long-established habits. The argument worth making, repeatedly, is that the people who most benefit from cleaner air are the residents themselves. A measurement of one's own lungs is a stronger motivator than any policy paper.`,
      questions: [
        {
          id: 'r3-1',
          number: 1,
          prompt: 'For most of the twentieth century, cities were planned around:',
          choices: [
            { key: 'A', text: 'Public transport.' },
            { key: 'B', text: 'Walking.' },
            { key: 'C', text: 'The car.' },
            { key: 'D', text: 'Bicycles.' },
          ],
          correctKey: 'C',
          explanation: 'The opening sentence states this directly.',
        },
        {
          id: 'r3-2',
          number: 2,
          prompt: 'According to the WHO, outdoor air pollution causes around how many premature deaths annually?',
          choices: [
            { key: 'A', text: 'One million.' },
            { key: 'B', text: 'Two million.' },
            { key: 'C', text: 'Four million.' },
            { key: 'D', text: 'Eight million.' },
          ],
          correctKey: 'C',
          explanation: '"Around four million premature deaths each year."',
        },
        {
          id: 'r3-3',
          number: 3,
          prompt: 'How does Singapore manage congestion?',
          choices: [
            { key: 'A', text: 'It bans cars during the day.' },
            { key: 'B', text: 'It charges drivers automatically based on real-time demand.' },
            { key: 'C', text: 'It only allows electric vehicles.' },
            { key: 'D', text: 'It limits driving to even / odd plates.' },
          ],
          correctKey: 'B',
          explanation: 'The passage describes the dynamic congestion charge.',
        },
        {
          id: 'r3-4',
          number: 4,
          prompt: 'In Copenhagen, where did cycling rates rise fastest?',
          choices: [
            { key: 'A', text: 'In the wealthiest districts.' },
            { key: 'B', text: 'In the lowest-income districts.' },
            { key: 'C', text: 'In the city centre only.' },
            { key: 'D', text: 'Among university students.' },
          ],
          correctKey: 'B',
          explanation: 'The text specifies cycling grew fastest in the lowest-income districts.',
        },
        {
          id: 'r3-5',
          number: 5,
          prompt: 'According to the passage, the most successful cities:',
          choices: [
            { key: 'A', text: 'Have unlimited budgets.' },
            { key: 'B', text: 'Treat air as a shared resource and respond to data.' },
            { key: 'C', text: 'Outsource pollution to other regions.' },
            { key: 'D', text: 'Ban industries entirely.' },
          ],
          correctKey: 'B',
          explanation: 'The passage explicitly identifies this common feature.',
        },
      ],
    },
    listening: {
      title: 'A planner on bike lanes',
      topic: 'environment',
      audioUrl: null,
      transcript: `Good evening. My name is Hugo Eriksen, and I have spent the last fifteen years working on cycling infrastructure, mainly in northern Europe. I've been asked to share what works and what doesn't.

The first thing I want to challenge is a common assumption: that cycling cities have always been cycling cities. They haven't. In 1970, Amsterdam — yes, Amsterdam — was on the verge of demolishing entire neighbourhoods to make space for car traffic. The shift to cycling came after a public movement, not because the Dutch were "born to cycle."

So what works? Three things, in order.

First, separation. Painted lines on the road do almost nothing. Cyclists need a physical barrier — a kerb, a planter, a parked car — between them and motor traffic. Without separation, you get a few brave cyclists. With it, you get everyone: children, elderly people, parents with baskets.

Second, networks, not corridors. A single brilliant cycle lane that ends after two kilometres is almost useless. People will not ride to work if they have to dismount halfway and push their bike on the pavement. Cities that succeed build a connected network within five years, not over twenty.

Third, parking and theft prevention. This sounds dull. It is the difference between a system that works and one that doesn't. If a cyclist is afraid their bike will be stolen at the supermarket, they will drive. Covered, lit, secure parking near every shop changes the equation.

What does not work? Three quick things. One, telling drivers their behaviour is wrong. It alienates them. Two, building only for commuters. Children cycling to school is a stronger political case than adults cycling to work. Three, expecting cycling to grow without removing some space from cars. It will not. Every successful city has narrowed roads, slowed traffic, or removed parking. Honesty about that trade-off is part of the work.

Thank you. Questions next.`,
      questions: [
        {
          id: 'l3-1',
          number: 1,
          prompt: 'In 1970, Amsterdam was planning to:',
          choices: [
            { key: 'A', text: 'Build more cycle lanes.' },
            { key: 'B', text: 'Demolish neighbourhoods to make space for cars.' },
            { key: 'C', text: 'Ban all cars.' },
            { key: 'D', text: 'Build an underground.' },
          ],
          correctKey: 'B',
          explanation: 'Hugo says Amsterdam was on the verge of demolishing neighbourhoods for car traffic.',
        },
        {
          id: 'l3-2',
          number: 2,
          prompt: 'According to Hugo, what gets "almost everyone" cycling?',
          choices: [
            { key: 'A', text: 'Painted lines.' },
            { key: 'B', text: 'Cycling apps.' },
            { key: 'C', text: 'Physical separation between bikes and traffic.' },
            { key: 'D', text: 'Free helmets.' },
          ],
          correctKey: 'C',
          explanation: '"Cyclists need a physical barrier — a kerb, a planter, a parked car."',
        },
        {
          id: 'l3-3',
          number: 3,
          prompt: 'Hugo recommends building cycling networks within:',
          choices: [
            { key: 'A', text: 'One year.' },
            { key: 'B', text: 'Five years.' },
            { key: 'C', text: 'Ten years.' },
            { key: 'D', text: 'Twenty years.' },
          ],
          correctKey: 'B',
          explanation: '"A connected network within five years, not over twenty."',
        },
        {
          id: 'l3-4',
          number: 4,
          prompt: 'Why is parking and theft prevention important?',
          choices: [
            { key: 'A', text: 'It looks nice.' },
            { key: 'B', text: 'Without it, fearful cyclists switch to driving.' },
            { key: 'C', text: 'It is required by EU law.' },
            { key: 'D', text: 'It increases tourism.' },
          ],
          correctKey: 'B',
          explanation: '"If a cyclist is afraid their bike will be stolen at the supermarket, they will drive."',
        },
        {
          id: 'l3-5',
          number: 5,
          prompt: 'According to Hugo, every successful city has:',
          choices: [
            { key: 'A', text: 'Avoided removing space from cars.' },
            { key: 'B', text: 'Banned cars entirely.' },
            { key: 'C', text: 'Narrowed roads, slowed traffic, or removed parking.' },
            { key: 'D', text: 'Built large car parks for cyclists.' },
          ],
          correctKey: 'C',
          explanation: 'The trade-off requires reducing car space, in one of these forms.',
        },
      ],
    },
    vocabDeck: [
      { term: 'mortality', partOfSpeech: 'noun', definition: 'The state of being subject to death; death rate.', example: 'Beyond mortality, polluted air has been linked to lower birth weights.', register: 'C1', vi: 'tỷ lệ tử vong' },
      { term: 'cardiovascular', partOfSpeech: 'adjective', definition: 'Of or relating to the heart and blood vessels.', example: 'A measurable rise in cardiovascular disease.', register: 'C1', vi: 'tim mạch' },
      { term: 'congested', partOfSpeech: 'adjective', definition: 'Crowded; blocked.', example: 'Singapore charges drivers when they enter the city centre during congested hours.', register: 'B2', vi: 'tắc nghẽn' },
      { term: 'emission', partOfSpeech: 'noun', definition: 'A substance released into the air.', example: 'London\'s ultra-low emission zone.', register: 'B2', vi: 'khí thải' },
      { term: 'unfairly', partOfSpeech: 'adverb', definition: 'In a way that is not just.', example: 'Such measures unfairly burden lower-income drivers.', register: 'B2', vi: 'không công bằng' },
      { term: 'invest', partOfSpeech: 'verb', definition: 'To put resources into something for future benefit.', example: 'Where cities have invested in cycling infrastructure.', register: 'B2', vi: 'đầu tư' },
      { term: 'demolish', partOfSpeech: 'verb', definition: 'To pull down or destroy.', example: 'Demolishing entire neighbourhoods.', register: 'B2', vi: 'phá huỷ' },
      { term: 'corridor', partOfSpeech: 'noun', definition: 'A long narrow passage; here, a single route.', example: 'Networks, not corridors.', register: 'B2', vi: 'hành lang' },
      { term: 'alienate', partOfSpeech: 'verb', definition: 'To make someone unfriendly or unsupportive.', example: 'It alienates them.', register: 'C1', vi: 'làm xa lánh' },
      { term: 'trade-off', partOfSpeech: 'noun', definition: 'An exchange where one thing is given up for another.', example: 'Honesty about that trade-off is part of the work.', register: 'B2', vi: 'sự đánh đổi' },
    ],
    grammarFocus: {
      topic: 'Passive voice',
      ruleSummary:
        'Use the passive (be + past participle) when the action is more important than who did it, or when the doer is unknown / obvious. The agent is added with "by" only when needed: The road was built in 1980 (by whom — irrelevant). Common in academic writing because it focuses on processes rather than people.',
      examples: [
        'The banks of the Seine have been redesigned to remove cars.',
        'Polluted air has been linked to lower birth weights.',
        'A child is being asked to lose twenty months of healthy life.',
      ],
    },
    writing: {
      prompt:
        'Some people believe cities should ban private cars from their centres entirely; others say this is unrealistic. Discuss both views and give your own opinion.',
      minWords: 120,
      guidance: 'Use at least three passive structures (e.g. "has been linked", "was reduced", "is being introduced").',
    },
  },

  /* ── DAY IV — Health & the mind ───────────────────────────────────── */
  {
    id: 'intermediate-day-4-health',
    day: 4,
    level: 'intermediate',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The quiet rise of mental health',
      topic: 'health',
      wordCount: 405,
      body: `For most of the last century, mental health was the medical conversation nobody wanted to have. Doctors recognised it. Insurers minimised it. Most patients hid it. A diagnosis of depression in 1970 was likely to follow a person through their working life, blocking promotions and, in some professions, ending careers altogether.

That has begun to change, and faster than the official statistics suggest. Public surveys in the United Kingdom now find that more than three-quarters of adults under thirty consider mental health a topic that should be discussed openly, compared with about a third in 1995. Universities offer dedicated counselling. Companies advertise "wellbeing days". Footballers, once the least likely public figures to admit vulnerability, now regularly talk about therapy.

But the cultural shift has run ahead of the medical infrastructure. Waiting times for talking therapy on the National Health Service have lengthened, not shortened, in the last five years. Private therapists charge between sixty and one hundred and fifty pounds per session, placing them beyond the reach of most working-age adults outside the largest cities. The promise of openness — that a conversation about mental health would be met with a route to help — is, for many, only half-fulfilled.

A second concern, less often discussed, is the medicalisation of ordinary distress. The boundary between sadness and depression, between worry and anxiety disorder, was once drawn loosely. It is now drawn by a diagnostic manual that is, in fairness, an attempt at scientific clarity, but is also a commercial document. Pharmaceutical companies have a clear interest in the boundary moving outward. Some clinicians worry that the modern willingness to seek help has been accompanied by a quieter willingness to medicate experiences — grief, redundancy, exam stress — that previous generations would have weathered without prescription.

The honest position seems to be a middle one. Mental health treatment, where required, is among the most cost-effective interventions modern medicine offers. Cognitive-behavioural therapy in particular has a strong evidence base for mild to moderate cases. But not every uncomfortable feeling is an illness. The skill the next decade needs to teach is not when to talk — that battle has largely been won — but when, and when not, to reach for a clinical label. The first conversation should still happen. The second one, with a doctor, should be slower than it sometimes now is.`,
      questions: [
        {
          id: 'r4-1',
          number: 1,
          prompt: 'In 1970, a diagnosis of depression was likely to:',
          choices: [
            { key: 'A', text: 'Lead to immediate medication.' },
            { key: 'B', text: 'Block promotions and end some careers.' },
            { key: 'C', text: 'Be ignored entirely.' },
            { key: 'D', text: 'Be treated for free.' },
          ],
          correctKey: 'B',
          explanation: 'The first paragraph states this directly.',
        },
        {
          id: 'r4-2',
          number: 2,
          prompt: 'According to UK surveys, what proportion of adults under 30 now feel mental health should be discussed openly?',
          choices: [
            { key: 'A', text: 'About one third.' },
            { key: 'B', text: 'About half.' },
            { key: 'C', text: 'More than three-quarters.' },
            { key: 'D', text: 'Almost everyone.' },
          ],
          correctKey: 'C',
          explanation: 'The text specifies "more than three-quarters of adults under thirty".',
        },
        {
          id: 'r4-3',
          number: 3,
          prompt: 'According to the passage, NHS waiting times for talking therapy have:',
          choices: [
            { key: 'A', text: 'Shortened.' },
            { key: 'B', text: 'Stayed the same.' },
            { key: 'C', text: 'Lengthened.' },
            { key: 'D', text: 'Disappeared.' },
          ],
          correctKey: 'C',
          explanation: '"Lengthened, not shortened, in the last five years."',
        },
        {
          id: 'r4-4',
          number: 4,
          prompt: 'The "second concern" raised in the passage is about:',
          choices: [
            { key: 'A', text: 'The cost of private therapy.' },
            { key: 'B', text: 'Medicalising ordinary distress.' },
            { key: 'C', text: 'Stigma in the workplace.' },
            { key: 'D', text: 'A shortage of clinicians.' },
          ],
          correctKey: 'B',
          explanation: 'The second concern is the medicalisation of ordinary distress.',
        },
        {
          id: 'r4-5',
          number: 5,
          prompt: 'The passage concludes that the next decade should teach people:',
          choices: [
            { key: 'A', text: 'When to ignore distress.' },
            { key: 'B', text: 'When to talk and when not to.' },
            { key: 'C', text: 'When, and when not, to reach for a clinical label.' },
            { key: 'D', text: 'When to take medication.' },
          ],
          correctKey: 'C',
          explanation: 'The closing argument identifies this skill explicitly.',
        },
      ],
    },
    listening: {
      title: 'A clinical psychologist on stress',
      topic: 'health',
      audioUrl: null,
      transcript: `Good morning. I'm Dr. Naila Pereira, and for the next twenty minutes I want to talk about something I see almost every day in my clinic: stress that has been mistaken for an illness.

I want to be careful here. Real anxiety disorders exist, they are debilitating, and they respond well to treatment. I am not arguing the opposite. What I am noticing is a different pattern: ordinary, time-limited stress — exam pressure, a difficult deadline, a relationship ending — being interpreted by patients themselves as signs of pathology.

A typical case looks like this. A young professional comes in. She tells me she has been "anxious for six months". I ask what was happening six months ago. There was a job change. There was an aging parent. There was a flat move. Each one alone is something the human nervous system was built to handle. Three together is harder.

What this patient often needs is not a diagnosis. It is a structured conversation about whether her life, in this season, is asking too much. Sometimes the right answer is therapy. Sometimes it is reducing the load. Sometimes it is sleep, exercise, and patience.

There is a useful question I ask, and I'll share it with you. The question is: "If your circumstances changed tomorrow, would your symptoms change?" If the answer is yes — if losing the deadline would lift the chest tightness — then we are probably dealing with stress, not anxiety disorder. If the answer is no, if the symptoms persist regardless of context, then a longer assessment is reasonable.

I am not saying don't seek help. Seek help. But seek the right help. Sometimes the right help is a friend, a holiday, or a hard conversation with your manager. Sometimes it is a clinician. Pretending all distress is the same flattens the whole conversation, and it does not serve patients. Thank you.`,
      questions: [
        {
          id: 'l4-1',
          number: 1,
          prompt: 'Dr. Pereira is concerned about:',
          choices: [
            { key: 'A', text: 'Anxiety being underdiagnosed.' },
            { key: 'B', text: 'Ordinary stress being mistaken for anxiety disorder.' },
            { key: 'C', text: 'Therapists charging too much.' },
            { key: 'D', text: 'Patients refusing therapy.' },
          ],
          correctKey: 'B',
          explanation: 'The talk explicitly addresses this confusion.',
        },
        {
          id: 'l4-2',
          number: 2,
          prompt: 'In her example, the young professional had had:',
          choices: [
            { key: 'A', text: 'A single life change.' },
            { key: 'B', text: 'No life changes.' },
            { key: 'C', text: 'Three major life events.' },
            { key: 'D', text: 'A family illness.' },
          ],
          correctKey: 'C',
          explanation: 'Job change, aging parent, flat move = three.',
        },
        {
          id: 'l4-3',
          number: 3,
          prompt: 'The diagnostic question Dr. Pereira shares is:',
          choices: [
            { key: 'A', text: '"Have you tried meditation?"' },
            { key: 'B', text: '"How long have you felt this?"' },
            { key: 'C', text: '"If your circumstances changed tomorrow, would your symptoms change?"' },
            { key: 'D', text: '"Is anyone in your family anxious?"' },
          ],
          correctKey: 'C',
          explanation: 'Dr. Pereira states this question directly.',
        },
        {
          id: 'l4-4',
          number: 4,
          prompt: 'If the answer to that question is YES (symptoms would change), the issue is likely:',
          choices: [
            { key: 'A', text: 'A serious anxiety disorder.' },
            { key: 'B', text: 'Stress, not disorder.' },
            { key: 'C', text: 'A genetic condition.' },
            { key: 'D', text: 'Not real.' },
          ],
          correctKey: 'B',
          explanation: 'A "yes" suggests context-dependent stress, not a disorder.',
        },
        {
          id: 'l4-5',
          number: 5,
          prompt: 'Dr. Pereira concludes that:',
          choices: [
            { key: 'A', text: 'No one should seek mental-health help.' },
            { key: 'B', text: 'Everyone should seek therapy.' },
            { key: 'C', text: 'Seek the right help — sometimes a clinician, sometimes a friend or rest.' },
            { key: 'D', text: 'Therapy is overrated.' },
          ],
          correctKey: 'C',
          explanation: '"Seek the right help" — clinical when needed, but not always.',
        },
      ],
    },
    vocabDeck: [
      { term: 'minimise', partOfSpeech: 'verb', definition: 'To make something seem less important.', example: 'Insurers minimised it.', register: 'B2', vi: 'làm giảm thiểu' },
      { term: 'vulnerability', partOfSpeech: 'noun', definition: 'The quality of being open to harm or weakness.', example: 'The least likely figures to admit vulnerability.', register: 'C1', vi: 'sự dễ bị tổn thương' },
      { term: 'infrastructure', partOfSpeech: 'noun', definition: 'The basic structures and systems needed for something to work.', example: 'The cultural shift has run ahead of the medical infrastructure.', register: 'B2', vi: 'cơ sở hạ tầng' },
      { term: 'medicalisation', partOfSpeech: 'noun', definition: 'The act of treating something as a medical issue.', example: 'The medicalisation of ordinary distress.', register: 'C1', vi: 'sự y học hoá' },
      { term: 'diagnostic', partOfSpeech: 'adjective', definition: 'Used to identify an illness.', example: 'Drawn by a diagnostic manual.', register: 'B2', vi: 'chẩn đoán' },
      { term: 'pharmaceutical', partOfSpeech: 'adjective', definition: 'Of or relating to medicines.', example: 'Pharmaceutical companies have a clear interest.', register: 'C1', vi: 'dược phẩm' },
      { term: 'redundancy', partOfSpeech: 'noun', definition: 'Loss of a job because it is no longer needed.', example: 'Grief, redundancy, exam stress.', register: 'B2', vi: 'sa thải' },
      { term: 'weather', partOfSpeech: 'verb', definition: 'To get through a difficult period.', example: 'Previous generations would have weathered without prescription.', register: 'C1', vi: 'vượt qua' },
      { term: 'cost-effective', partOfSpeech: 'adjective', definition: 'Producing good results for the money spent.', example: 'Among the most cost-effective interventions.', register: 'B2', vi: 'hiệu quả về chi phí' },
      { term: 'evidence base', partOfSpeech: 'noun', definition: 'The body of research supporting a practice.', example: 'A strong evidence base for mild to moderate cases.', register: 'C1', vi: 'cơ sở bằng chứng' },
    ],
    grammarFocus: {
      topic: 'Reported speech (basics)',
      ruleSummary:
        'When reporting what someone said, the verb tense usually shifts back one step: present → past, present perfect → past perfect, will → would. Pronouns and time markers also change. "She said, \'I am tired.\'" → "She said she was tired." For reporting facts that are still true, the shift is optional.',
      examples: [
        'She said she had been anxious for six months.',
        'The doctor told me that ordinary stress is often mistaken for anxiety.',
        'He said the answer would depend on her circumstances.',
      ],
    },
    writing: {
      prompt:
        'Some people argue that the modern openness about mental health has gone too far, while others believe society should be even more accepting. Discuss both views and give your own opinion.',
      minWords: 120,
      guidance: 'Use at least two reported-speech structures (e.g. "the doctor said that…", "researchers found that…").',
    },
  },

  /* ── DAY V — Work & a changing career ─────────────────────────────── */
  {
    id: 'intermediate-day-5-work',
    day: 5,
    level: 'intermediate',
    publishedAt: '2026-04-27',
    reading: {
      title: 'The career that bends',
      topic: 'work',
      wordCount: 395,
      body: `For most of the post-war period, a career was something you chose at the end of school and held until the end of your working life. The expectation suited a labour market in which large employers offered training, progression, and pensions in exchange for forty years of loyalty. The bargain was so widely shared that the word "career" came to mean, almost synonymously, a single long arc within a single field.

That bargain has loosened considerably. Studies of workers born after 1985 suggest the average professional now changes employers eight to twelve times before retirement, and changes industry — not just employer — at least twice. The reasons are partly structural: companies merge, restructure, automate. They are partly personal: people now expect more meaning from work than salary alone, and they are willing to leave when they do not find it.

A century ago, this would have looked unstable. Today it can be reframed as portfolio thinking. A worker treats their career as a sequence of related projects: each role builds a new skill, the skills accumulate, and at any given point the worker is more employable than the one who has spent twenty years in the same job doing the same thing. Some of the most successful mid-career professionals are now those who have moved laterally between fields — finance to public policy, journalism to communications strategy, teaching to edtech — and brought a hybrid perspective with them.

The new flexibility has costs that are quieter than the benefits. Pension contributions, for instance, were designed for long tenures; people who change jobs frequently often retire with smaller pots than their parents did, even on higher salaries. Mentorship, which used to follow naturally from staying in one place, must now be sought out deliberately. And there is a psychological tax — the constant low-level work of redefining oneself with each transition.

The implication is not that nobody should change jobs. The pendulum has swung, and there is no going back to the forty-year contract. The implication is that workers must take on responsibilities employers used to handle: planning their own development, saving aggressively for retirement, and reading their own market value. The career still exists. It now has to be designed by the person living it, rather than received from the company that hired them.`,
      questions: [
        {
          id: 'r5-1',
          number: 1,
          prompt: 'According to the passage, post-war careers were characterised by:',
          choices: [
            { key: 'A', text: 'Frequent job changes.' },
            { key: 'B', text: 'A single long arc within one field.' },
            { key: 'C', text: 'Self-employment.' },
            { key: 'D', text: 'Short-term contracts.' },
          ],
          correctKey: 'B',
          explanation: 'The opening describes career as "a single long arc within a single field."',
        },
        {
          id: 'r5-2',
          number: 2,
          prompt: 'How many times does the average professional now change employers?',
          choices: [
            { key: 'A', text: 'Two to four times.' },
            { key: 'B', text: 'Five to seven times.' },
            { key: 'C', text: 'Eight to twelve times.' },
            { key: 'D', text: 'Twenty times.' },
          ],
          correctKey: 'C',
          explanation: '"Eight to twelve times before retirement."',
        },
        {
          id: 'r5-3',
          number: 3,
          prompt: 'The passage uses the term "portfolio thinking" to describe:',
          choices: [
            { key: 'A', text: 'Investment strategies.' },
            { key: 'B', text: 'Career as a sequence of related projects.' },
            { key: 'C', text: 'Online job applications.' },
            { key: 'D', text: 'Freelance work only.' },
          ],
          correctKey: 'B',
          explanation: 'Portfolio thinking treats roles as accumulating skills.',
        },
        {
          id: 'r5-4',
          number: 4,
          prompt: 'A "quieter cost" of the new flexibility is:',
          choices: [
            { key: 'A', text: 'Lower wages.' },
            { key: 'B', text: 'More taxes.' },
            { key: 'C', text: 'Smaller pension pots.' },
            { key: 'D', text: 'Less time for hobbies.' },
          ],
          correctKey: 'C',
          explanation: 'Pension contributions designed for long tenure work poorly with frequent moves.',
        },
        {
          id: 'r5-5',
          number: 5,
          prompt: 'The passage concludes that workers must now take on:',
          choices: [
            { key: 'A', text: 'Responsibilities employers used to handle (development, savings, market value).' },
            { key: 'B', text: 'Less responsibility than before.' },
            { key: 'C', text: 'The role of teaching their own children.' },
            { key: 'D', text: 'Government welfare paperwork.' },
          ],
          correctKey: 'A',
          explanation: 'The closing paragraph lists exactly these responsibilities.',
        },
      ],
    },
    listening: {
      title: 'A career coach on changing fields',
      topic: 'work',
      audioUrl: null,
      transcript: `Welcome back. I'm Mara Khoury, and today I want to address the most common question I get from professionals in their thirties: should I change fields entirely?

Let me tell you my honest answer. About sixty per cent of the people who ask me this question should not. They are bored, not stuck. The job is fine. The team is fine. They are tired. A holiday and a promotion would solve more than a career pivot.

But about forty per cent should. And among that forty per cent, the people who succeed do four things. I'll list them.

First, they audit their transferable skills before they speak to anyone. Not the skills the job description listed — the skills they actually use every day. Project management. Client communication. Negotiating budgets. These travel between industries far more than people realise.

Second, they take a small step before a large one. A teacher who wants to move into edtech does not quit her job and apply to every startup. She volunteers for a Saturday workshop. She writes one article. She does an unpaid weekend project. The bridge is built piece by piece, while the salary is still arriving.

Third, they accept a temporary pay cut. This is the part nobody likes hearing. When you change industry, you are essentially restarting the experience clock. The new field does not value your old title. Most successful career changers I know took a fifteen to twenty per cent cut for two to three years. They almost all earned more by year five than they would have done staying.

Fourth — and this is the easiest to skip — they get one mentor inside the new field before they jump. Someone willing to read a CV, give honest feedback, and warn them about the cultural mistakes outsiders make. One conversation a month. The cost is low. The information is irreplaceable.

If you are in the forty per cent, do those four things. If you are in the sixty per cent, take three weeks off. Most of you will discover the job was not the problem.`,
      questions: [
        {
          id: 'l5-1',
          number: 1,
          prompt: 'According to Mara, about what percentage of people asking about a career change should NOT change fields?',
          choices: [
            { key: 'A', text: 'Twenty per cent.' },
            { key: 'B', text: 'Forty per cent.' },
            { key: 'C', text: 'Sixty per cent.' },
            { key: 'D', text: 'Ninety per cent.' },
          ],
          correctKey: 'C',
          explanation: '"About sixty per cent of the people who ask me this question should not."',
        },
        {
          id: 'l5-2',
          number: 2,
          prompt: 'The first thing successful career changers do is:',
          choices: [
            { key: 'A', text: 'Quit their current job.' },
            { key: 'B', text: 'Audit their transferable skills.' },
            { key: 'C', text: 'Apply to twenty companies.' },
            { key: 'D', text: 'Hire a recruiter.' },
          ],
          correctKey: 'B',
          explanation: 'They audit their actual day-to-day skills, not the job description list.',
        },
        {
          id: 'l5-3',
          number: 3,
          prompt: 'The "small step before a large one" example is:',
          choices: [
            { key: 'A', text: 'Quitting and applying to startups.' },
            { key: 'B', text: 'A teacher volunteering for a Saturday workshop.' },
            { key: 'C', text: 'Taking out a loan.' },
            { key: 'D', text: 'Moving to another city.' },
          ],
          correctKey: 'B',
          explanation: 'Mara gives the teacher → edtech example.',
        },
        {
          id: 'l5-4',
          number: 4,
          prompt: 'The typical pay cut for a successful career change is:',
          choices: [
            { key: 'A', text: 'Five per cent for one year.' },
            { key: 'B', text: 'Fifteen to twenty per cent for two to three years.' },
            { key: 'C', text: 'Forty per cent indefinitely.' },
            { key: 'D', text: 'No pay cut at all.' },
          ],
          correctKey: 'B',
          explanation: 'Mara gives this exact range.',
        },
        {
          id: 'l5-5',
          number: 5,
          prompt: 'How often does Mara recommend speaking to a mentor in the new field?',
          choices: [
            { key: 'A', text: 'Once a week.' },
            { key: 'B', text: 'Once a month.' },
            { key: 'C', text: 'Twice a year.' },
            { key: 'D', text: 'Only at the end.' },
          ],
          correctKey: 'B',
          explanation: '"One conversation a month."',
        },
      ],
    },
    vocabDeck: [
      { term: 'arc', partOfSpeech: 'noun', definition: 'A curved path or shape; here, the shape of a career.', example: 'A single long arc within a single field.', register: 'C1', vi: 'cung/đường cong' },
      { term: 'progression', partOfSpeech: 'noun', definition: 'The process of advancing.', example: 'Training, progression, and pensions.', register: 'B2', vi: 'sự thăng tiến' },
      { term: 'restructure', partOfSpeech: 'verb', definition: 'To organise differently.', example: 'Companies merge, restructure, automate.', register: 'B2', vi: 'tái cấu trúc' },
      { term: 'reframe', partOfSpeech: 'verb', definition: 'To change the way something is seen or described.', example: 'It can be reframed as portfolio thinking.', register: 'C1', vi: 'tái định hình' },
      { term: 'lateral', partOfSpeech: 'adjective', definition: 'To the side; here, sideways between fields.', example: 'Moved laterally between fields.', register: 'C1', vi: 'theo chiều ngang' },
      { term: 'hybrid', partOfSpeech: 'adjective', definition: 'Made of mixed elements.', example: 'A hybrid perspective.', register: 'B2', vi: 'kết hợp' },
      { term: 'tenure', partOfSpeech: 'noun', definition: 'The period of holding a job or office.', example: 'Pension contributions were designed for long tenures.', register: 'C1', vi: 'nhiệm kỳ' },
      { term: 'mentorship', partOfSpeech: 'noun', definition: 'Guidance from an experienced person.', example: 'Mentorship must now be sought out deliberately.', register: 'B2', vi: 'sự hướng dẫn' },
      { term: 'pendulum', partOfSpeech: 'noun', definition: 'A weight that swings; here, the swing of a trend.', example: 'The pendulum has swung.', register: 'C1', vi: 'con lắc' },
      { term: 'aggressively', partOfSpeech: 'adverb', definition: 'In a forceful or determined way.', example: 'Saving aggressively for retirement.', register: 'B2', vi: 'một cách quyết liệt' },
    ],
    grammarFocus: {
      topic: 'Relative clauses (defining)',
      ruleSummary:
        'Defining relative clauses identify which person or thing you mean. Use "who" for people, "which" for things, "that" for both. No commas around the clause. The relative pronoun can sometimes be omitted when it is the object: "the job [that] she left" → "the job she left". For places, use "where"; for times, "when".',
      examples: [
        'A worker who treats their career as a portfolio is more employable.',
        'The skills that accumulate become a portfolio.',
        'The companies where she worked all paid into a pension.',
      ],
    },
    writing: {
      prompt:
        'Some argue that frequent career changes are a sign of progress, while others believe long-term loyalty to one employer remains valuable. Discuss both views and give your own opinion.',
      minWords: 120,
      guidance: 'Use at least three defining relative clauses (with who / which / that).',
    },
  },
]
