import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 04 · Education chunks.
 * 49 items across 7 days. The triad of take a course / sit an exam /
 * attend a lecture, plus the chunks examiners expect to hear when
 * candidates discuss schools, universities, and study habits.
 */

const items: CollocationLexiconItem[] = [
  // Day 1 — Studying
  c('w04-d1-01', 'take a course', 1, 'verb-noun', 'enrol in and study a programme', 'I took a course on academic writing during my first year.', ['enrol on a course', 'sign up for']),
  c('w04-d1-02', 'do a degree', 1, 'verb-noun', 'study for a university qualification', 'She did a degree in economics before switching to law.', ['pursue a degree', 'study for']),
  c('w04-d1-03', 'sit an exam', 1, 'verb-noun', 'take a formal test', 'Most students sit at least two exams in their final term.', ['take an exam', 'do an exam']),
  c('w04-d1-04', 'pass an exam', 1, 'verb-noun', 'achieve a successful result in a test', 'Passing the exam was a relief, not a celebration.', ['get through', 'succeed in']),
  c('w04-d1-05', 'fail an exam', 1, 'verb-noun', 'not achieve a successful result', 'Failing the first exam taught her how to revise properly.', ['flunk an exam', 'come up short']),
  c('w04-d1-06', 'retake an exam', 1, 'verb-noun', 'take a test for a second time', 'She retook the exam in November and passed comfortably.', ['resit', 'do over']),
  c('w04-d1-07', 'cram for a test', 1, 'verb-preposition', 'study intensively at the last minute', 'Cramming for a test rarely helps long-term retention.', ['study intensively', 'rush revision']),

  // Day 2 — Lectures & classes
  c('w04-d2-01', 'attend a lecture', 2, 'verb-noun', 'be present at a formal talk', 'I attend every lecture, even when slides are shared.', ['go to a lecture', 'be in class']),
  c('w04-d2-02', 'miss a class', 2, 'verb-noun', 'be absent from a class', 'Missing a class often costs more than skipping a chapter.', ['skip a class', 'be absent']),
  c('w04-d2-03', 'take notes', 2, 'verb-noun', 'write down key points during a lecture', 'I take notes by hand because I remember more.', ['jot down', 'write down']),
  c('w04-d2-04', 'pay attention in class', 2, 'verb-preposition', 'concentrate during teaching', 'Paying attention in class halves the time needed for revision.', ['concentrate', 'focus']),
  c('w04-d2-05', 'ask a question', 2, 'verb-noun', 'request information or clarification', 'Asking a question shows curiosity, not weakness.', ['raise a question', 'put a question']),
  c('w04-d2-06', 'engage in discussion', 2, 'verb-preposition', 'take active part in a conversation', 'Students who engage in discussion remember twice as much.', ['take part in', 'participate in']),
  c('w04-d2-07', 'participate actively', 2, 'verb-adverb', 'take part with energy and effort', 'A class where most students participate actively rarely needs incentives.', ['contribute', 'be involved']),

  // Day 3 — Assignments
  c('w04-d3-01', 'submit an assignment', 3, 'verb-noun', 'hand in completed work', 'I submitted the assignment six hours before the deadline.', ['hand in', 'turn in']),
  c('w04-d3-02', 'do research', 3, 'verb-noun', 'investigate a topic in detail', 'Doing research before writing saves a great deal of editing later.', ['conduct research', 'investigate']),
  c('w04-d3-03', 'write an essay', 3, 'verb-noun', 'compose a formal piece of writing', 'Writing an essay teaches more than reading three textbooks.', ['compose an essay', 'draft a paper']),
  c('w04-d3-04', 'cite a source', 3, 'verb-noun', 'mention where information came from', 'You must cite a source for every statistic.', ['reference', 'acknowledge']),
  c('w04-d3-05', 'meet the word limit', 3, 'verb-noun', 'stay within the required word count', 'Meeting the word limit forces you to cut what does not earn its place.', ['stay within', 'observe the limit']),
  c('w04-d3-06', 'develop an argument', 3, 'verb-noun', 'build a reasoned position step by step', 'A good essay develops an argument over its full length.', ['build an argument', 'reason through']),
  c('w04-d3-07', 'draw a conclusion', 3, 'verb-noun', 'arrive at a final judgement', 'Examiners want to see candidates draw a conclusion from the evidence.', ['reach a conclusion', 'arrive at']),

  // Day 4 — Performance
  c('w04-d4-01', 'achieve good grades', 4, 'verb-noun', 'obtain high marks', 'She achieves good grades without sacrificing her music.', ['score highly', 'do well']),
  c('w04-d4-02', 'get high marks', 4, 'verb-noun', 'receive top scores', 'Students who plan their answers tend to get high marks.', ['score top marks', 'receive top grades']),
  c('w04-d4-03', 'fall behind in class', 4, 'verb-preposition', 'progress more slowly than the rest', 'A short illness made him fall behind in maths.', ['lag', 'lose ground']),
  c('w04-d4-04', 'catch up on work', 4, 'verb-preposition', 'do work you have missed', 'Catching up on work after a break takes a steady week.', ['make up', 'recover']),
  c('w04-d4-05', 'ace a test', 4, 'verb-noun', 'do extremely well in a test', 'He aced the listening test and was less sure about the writing.', ['nail it', 'score full marks']),
  c('w04-d4-06', 'show progress', 4, 'verb-noun', 'demonstrate improvement', 'A clear weekly review lets you show progress to yourself.', ['demonstrate improvement', 'make headway']),
  c('w04-d4-07', 'reach your potential', 4, 'verb-noun', 'achieve as much as you are capable of', 'Most students reach their potential only when feedback is fast.', ['fulfil potential', 'come into your own']),

  // Day 5 — Higher education
  c('w04-d5-01', 'apply to university', 5, 'verb-preposition', 'submit an application for a higher institution', 'She applied to four universities and accepted the third offer.', ['put in for', 'apply for university']),
  c('w04-d5-02', 'get accepted', 5, 'verb', 'receive an offer of a place', 'He got accepted to read engineering at his first choice.', ['be admitted', 'receive an offer']),
  c('w04-d5-03', 'graduate from university', 5, 'verb-preposition', 'complete a university course', 'She graduated from university with a first-class degree.', ['finish university', 'leave with a degree']),
  c('w04-d5-04', 'pursue further studies', 5, 'verb-noun', 'continue education beyond a first degree', 'She pursued further studies in linguistics in Edinburgh.', ['carry on with study', 'go on to postgraduate work']),
  c('w04-d5-05', 'earn a scholarship', 5, 'verb-noun', 'win financial support based on merit', 'Earning a scholarship made the move abroad possible.', ['win a scholarship', 'be awarded']),
  c('w04-d5-06', 'pay tuition fees', 5, 'verb-noun', 'cover the cost of being taught', 'Many students take loans to pay tuition fees.', ['cover fees', 'meet costs']),
  c('w04-d5-07', 'do an internship', 5, 'verb-noun', 'work for a short time to gain experience', 'She did an internship between her second and third year.', ['take up an internship', 'intern']),

  // Day 6 — Skills development
  c('w04-d6-01', 'develop a skill', 6, 'verb-noun', 'improve an ability over time', 'You develop a skill by daily practice, not weekly intensity.', ['build up', 'cultivate']),
  c('w04-d6-02', 'acquire knowledge', 6, 'verb-noun', 'gain understanding through study or experience', 'Acquiring knowledge is easy; arranging it is hard.', ['gain knowledge', 'learn']),
  c('w04-d6-03', 'broaden your horizons', 6, 'verb-noun', 'increase your range of experience and knowledge', 'A semester abroad broadens your horizons more than ten textbooks.', ['expand your outlook', 'open your mind']),
  c('w04-d6-04', 'gain experience', 6, 'verb-noun', 'develop knowledge or skill from doing something', 'A year of practical work to gain experience is rarely wasted.', ['get experience', 'build expertise']),
  c('w04-d6-05', 'pick up a habit', 6, 'verb-noun', 'develop a new regular practice', 'She picked up the habit of journaling during exam revision.', ['form a habit', 'adopt']),
  c('w04-d6-06', 'master a topic', 6, 'verb-noun', 'gain complete control of a subject', 'Mastering a topic takes longer than passing an exam on it.', ['get on top of', 'become expert in']),
  c('w04-d6-07', 'put theory into practice', 6, 'verb-preposition', 'apply ideas in real situations', 'A short placement lets students put theory into practice.', ['apply', 'use practically']),

  // Day 7 — Wider issues
  c('w04-d7-01', 'raise educational standards', 7, 'verb-noun', 'improve the quality of education', 'A focus on teacher training is the most efficient way to raise educational standards.', ['lift standards', 'improve quality']),
  c('w04-d7-02', 'narrow the achievement gap', 7, 'verb-noun', 'reduce the difference in results between groups', 'Targeted intervention has narrowed the achievement gap modestly.', ['close the gap', 'reduce disparity']),
  c('w04-d7-03', 'promote literacy', 7, 'verb-noun', 'encourage the ability to read and write', 'The library runs a programme to promote literacy in primary schools.', ['encourage reading', 'foster literacy']),
  c('w04-d7-04', 'access higher education', 7, 'verb-noun', 'be able to attend university', 'First-generation students need extra support to access higher education.', ['enter university', 'reach higher education']),
  c('w04-d7-05', 'foster critical thinking', 7, 'verb-noun', 'encourage independent analysis', 'Good schools foster critical thinking from an early age.', ['cultivate analysis', 'encourage independent thought']),
  c('w04-d7-06', 'invest in education', 7, 'verb-preposition', 'spend resources on schools and learning', 'Investing in education shows returns over a generation, not a quarter.', ['fund education', 'put money into']),
  c('w04-d7-07', 'tackle drop-out rates', 7, 'verb-noun', 'address the problem of students leaving early', 'Universities tackle drop-out rates with mentoring schemes.', ['address attrition', 'reduce withdrawal']),
]

function c(
  shortId: string,
  phrase: string,
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  pattern: CollocationLexiconItem['pattern'],
  definition: string,
  example: string,
  alternatives: string[],
  register: CollocationLexiconItem['register'] = 'B2',
): CollocationLexiconItem {
  return {
    discipline: 'collocations',
    id: `int-colloc-${shortId}`,
    phrase,
    pattern,
    definition,
    example,
    register,
    topic: 'education',
    alternatives,
    level: 'intermediate',
    week: 4,
    day,
  }
}

export const INTERMEDIATE_COLLOC_WEEK_04: CollocationLexiconItem[] = items
