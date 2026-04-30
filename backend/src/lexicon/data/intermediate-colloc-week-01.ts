import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 01 · High-frequency verb-noun pairings.
 * 49 items across 7 days (7/day). The make/do/take/have spine plus
 * common verb-noun chunks the candidate already half-knows.
 */

const items: CollocationLexiconItem[] = [
  // Day 1 — make + noun
  c('w01-d1-01', 'make a decision', 1, 'verb-noun', 'choose between options after consideration', 'It took her two weeks to make a decision about the offer.', ['reach a decision', 'come to a decision']),
  c('w01-d1-02', 'make an effort', 1, 'verb-noun', 'try hard to do something', 'You can see he is making an effort to reply in English.', ['put in effort', 'exert oneself']),
  c('w01-d1-03', 'make progress', 1, 'verb-noun', 'develop or improve over time', 'After two months she was making real progress with her speaking.', ['advance', 'move forward']),
  c('w01-d1-04', 'make a difference', 1, 'verb-noun', 'have an important effect on a situation', 'A daily ten-minute review can make a difference to band scores.', ['have an impact', 'count']),
  c('w01-d1-05', 'make sense', 1, 'verb-noun', 'be reasonable or easy to understand', 'The argument finally makes sense once you read the conclusion.', ['be logical', 'be coherent']),
  c('w01-d1-06', 'make a mistake', 1, 'verb-noun', 'do something wrong, often unintentionally', 'Most candidates make the same mistake on the second blank.', ['err', 'slip up']),
  c('w01-d1-07', 'make a point', 1, 'verb-noun', 'state an idea clearly to be understood', 'She made a point about register that the class needed to hear.', ['raise a point', 'argue']),

  // Day 2 — do + noun
  c('w01-d2-01', 'do research', 2, 'verb-noun', 'investigate a topic in depth', 'Doctoral students do research on a single, narrow question for years.', ['conduct research', 'investigate']),
  c('w01-d2-02', 'do business', 2, 'verb-noun', 'engage in commercial activity', 'The two firms have done business with each other for a decade.', ['trade', 'transact']),
  c('w01-d2-03', 'do harm', 2, 'verb-noun', 'cause damage or injury', 'Skipping breakfast every day does more harm than people realise.', ['cause damage', 'inflict harm']),
  c('w01-d2-04', 'do a favour', 2, 'verb-noun', 'help someone as a kindness', 'Could you do me a favour and proofread this paragraph?', ['help out', 'oblige']),
  c('w01-d2-05', 'do the housework', 2, 'verb-noun', 'perform regular cleaning at home', 'We split the housework so that no day belongs to one person.', ['clean the house', 'do chores']),
  c('w01-d2-06', 'do well', 2, 'verb-noun', 'achieve a good result', 'She always does well in listening but struggles with writing.', ['succeed', 'perform well']),
  c('w01-d2-07', 'do your best', 2, 'verb-noun', 'try as hard as you can', 'Just do your best in the practice test; the real one comes next month.', ['give it your all', 'try your hardest']),

  // Day 3 — take + noun
  c('w01-d3-01', 'take responsibility', 3, 'verb-noun', 'accept that you are accountable', 'Examiners reward writing that takes responsibility for a clear stance.', ['accept blame', 'be accountable']),
  c('w01-d3-02', 'take action', 3, 'verb-noun', 'do something to achieve a result', 'The government took action only after public pressure mounted.', ['act', 'intervene']),
  c('w01-d3-03', 'take a break', 3, 'verb-noun', 'stop working for a short rest', 'Take a break every fifty minutes to keep concentration up.', ['rest', 'pause']),
  c('w01-d3-04', 'take advantage of', 3, 'verb-noun', 'make good use of an opportunity', 'Take advantage of the morning hours when your focus is sharpest.', ['exploit', 'capitalise on']),
  c('w01-d3-05', 'take notes', 3, 'verb-noun', 'write down key points while listening', 'Effective candidates take notes during the long lecture in section four.', ['jot down', 'record']),
  c('w01-d3-06', 'take a chance', 3, 'verb-noun', 'do something risky in the hope of success', 'Taking a chance with an unusual essay structure can pay off.', ['take a risk', 'gamble']),
  c('w01-d3-07', 'take an interest in', 3, 'verb-noun', 'become interested in something', 'I took an interest in linguistics after one university lecture.', ['get into', 'become curious']),

  // Day 4 — have + noun
  c('w01-d4-01', 'have an impact on', 4, 'verb-noun', 'affect something significantly', 'Climate change has had a marked impact on coastal cities.', ['influence', 'shape']),
  c('w01-d4-02', 'have an effect on', 4, 'verb-noun', 'cause a result, often a change', 'A second cup of coffee has a smaller effect than the first.', ['affect', 'influence']),
  c('w01-d4-03', 'have access to', 4, 'verb-noun', 'be able to use or reach something', 'Most students now have access to academic journals online.', ['be able to use', 'enjoy']),
  c('w01-d4-04', 'have a conversation', 4, 'verb-noun', 'talk to someone, often at length', 'A long conversation with a tutor often clarifies more than a worksheet.', ['talk', 'discuss']),
  c('w01-d4-05', 'have a chance', 4, 'verb-noun', 'be possible or possible to succeed', 'You have every chance of reaching seven if you keep this pace.', ['stand a chance', 'be in with a chance']),
  c('w01-d4-06', 'have an influence on', 4, 'verb-noun', 'affect someone\'s thinking or behaviour', 'My grandmother had a lasting influence on my reading habits.', ['shape', 'mould']),
  c('w01-d4-07', 'have a discussion', 4, 'verb-noun', 'talk about a subject in detail', 'The class had a long discussion about Task 2 structure.', ['hold talks', 'debate']),

  // Day 5 — give + noun
  c('w01-d5-01', 'give an example', 5, 'verb-noun', 'illustrate a point with a specific case', 'The examiner asks you to give an example to support your view.', ['cite', 'illustrate']),
  c('w01-d5-02', 'give priority to', 5, 'verb-noun', 'treat as more important than other things', 'Sleep should be given priority over late-night cramming.', ['prioritise', 'put first']),
  c('w01-d5-03', 'give rise to', 5, 'verb-noun', 'cause something to happen', 'Industrialisation gave rise to a new urban middle class.', ['cause', 'lead to']),
  c('w01-d5-04', 'give consideration to', 5, 'verb-noun', 'think about something carefully', 'Examiners give consideration to risk-taking in essay structure.', ['consider', 'weigh up']),
  c('w01-d5-05', 'give an opinion', 5, 'verb-noun', 'state what you think about something', 'The discussion essay asks you to give an opinion in the conclusion.', ['express a view', 'state a position']),
  c('w01-d5-06', 'give the impression', 5, 'verb-noun', 'cause people to think something', 'A confident introduction gives the impression of preparation.', ['suggest', 'convey']),
  c('w01-d5-07', 'give credit', 5, 'verb-noun', 'acknowledge someone\'s achievement', 'Always give credit to the source you have paraphrased.', ['acknowledge', 'recognise']),

  // Day 6 — pay + noun
  c('w01-d6-01', 'pay attention to', 6, 'verb-noun', 'concentrate on something carefully', 'Pay attention to register: it costs marks twice over.', ['attend to', 'focus on']),
  c('w01-d6-02', 'pay a visit', 6, 'verb-noun', 'visit briefly', 'I paid a visit to the library before the writing class.', ['drop in', 'call on']),
  c('w01-d6-03', 'pay a compliment', 6, 'verb-noun', 'say something nice to someone', 'It costs nothing to pay a compliment to a colleague.', ['praise', 'commend']),
  c('w01-d6-04', 'pay tribute to', 6, 'verb-noun', 'show respect or admiration for someone', 'The speech paid tribute to the founder of the school.', ['honour', 'commemorate']),
  c('w01-d6-05', 'pay the price', 6, 'verb-noun', 'experience the consequences of an action', 'Skipping the warm-up means you pay the price in the second half.', ['suffer the consequences', 'bear the cost']),
  c('w01-d6-06', 'pay your respects', 6, 'verb-noun', 'show formal respect, often at a funeral', 'Hundreds came to pay their respects at the memorial.', ['honour', 'salute']),
  c('w01-d6-07', 'pay heed to', 6, 'verb-noun', 'pay attention to advice or warning', 'Successful candidates pay heed to feedback after every mock.', ['take notice of', 'heed']),

  // Day 7 — set + noun
  c('w01-d7-01', 'set a goal', 7, 'verb-noun', 'decide what you want to achieve', 'Set a goal for the week, not just for the month.', ['establish a goal', 'fix a target']),
  c('w01-d7-02', 'set an example', 7, 'verb-noun', 'behave in a way others should follow', 'Older students set an example for the new cohort.', ['lead by example', 'model']),
  c('w01-d7-03', 'set a precedent', 7, 'verb-noun', 'do something for the first time so it can be done again', 'The court ruling set a precedent for similar cases.', ['establish a precedent', 'pave the way']),
  c('w01-d7-04', 'set a deadline', 7, 'verb-noun', 'fix a date by which something must be done', 'Set a deadline for the first draft to avoid endless revision.', ['fix a date', 'set a cut-off']),
  c('w01-d7-05', 'set a record', 7, 'verb-noun', 'achieve the best result ever in something', 'The runner set a new record at last year\'s marathon.', ['break a record', 'establish a record']),
  c('w01-d7-06', 'set the tone', 7, 'verb-noun', 'establish the mood or character of something', 'A confident first paragraph sets the tone for the whole essay.', ['establish the mood', 'frame']),
  c('w01-d7-07', 'set aside', 7, 'verb-noun', 'reserve something for a particular purpose', 'Set aside thirty minutes a day for vocabulary review.', ['reserve', 'allocate']),
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
    topic: 'high-frequency',
    alternatives,
    level: 'intermediate',
    week: 1,
    day,
  }
}

export const INTERMEDIATE_COLLOC_WEEK_01: CollocationLexiconItem[] = items
