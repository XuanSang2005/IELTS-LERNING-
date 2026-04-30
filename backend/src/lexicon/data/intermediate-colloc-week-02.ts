import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 02 · People and behaviour collocations.
 * 49 items across 7 days. Adjective-noun, verb-noun, and adverb-adjective
 * pairings useful in Speaking Part 1/3 and Writing Task 2 essays on
 * society and personality.
 */

const items: CollocationLexiconItem[] = [
  // Day 1 — strong adjective-noun pairings about character
  c('w02-d1-01', 'strong personality', 1, 'adjective-noun', 'a noticeable, often dominant character', 'A strong personality is an asset only if it leaves room for others.', ['forceful character', 'commanding presence']),
  c('w02-d1-02', 'kind heart', 1, 'adjective-noun', 'a generous and caring nature', 'She has a kind heart, but she does not show it easily.', ['generous nature', 'warm soul']),
  c('w02-d1-03', 'sharp mind', 1, 'adjective-noun', 'quick and clear thinking', 'A sharp mind matters less than a steady one in long exams.', ['keen intellect', 'quick wit']),
  c('w02-d1-04', 'open-minded approach', 1, 'adjective-noun', 'a willingness to consider new ideas', 'Examiners reward an open-minded approach to controversial topics.', ['receptive attitude', 'tolerant view']),
  c('w02-d1-05', 'positive outlook', 1, 'adjective-noun', 'an optimistic attitude towards life', 'A positive outlook helps when revision feels endless.', ['optimistic view', 'sunny disposition']),
  c('w02-d1-06', 'good sense of humour', 1, 'adjective-noun', 'the ability to enjoy or make jokes', 'A good sense of humour eases the long parts of preparation.', ['quick wit', 'playful nature']),
  c('w02-d1-07', 'quick temper', 1, 'adjective-noun', 'a tendency to become angry easily', 'A quick temper costs friendships and exam answers alike.', ['short fuse', 'hot temper']),

  // Day 2 — verb-noun about behaviour
  c('w02-d2-01', 'show respect', 2, 'verb-noun', 'demonstrate that you value someone', 'Showing respect to the examiner sets a calm tone.', ['display respect', 'pay regard']),
  c('w02-d2-02', 'lose your temper', 2, 'verb-noun', 'become suddenly angry', 'Try not to lose your temper when the speaking question repeats.', ['fly off the handle', 'snap']),
  c('w02-d2-03', 'keep your word', 2, 'verb-noun', 'do what you promised', 'Tutors trust a candidate who keeps his word about practice.', ['honour a promise', 'follow through']),
  c('w02-d2-04', 'take offence', 2, 'verb-noun', 'feel hurt or angry at something said', 'It is easy to take offence at corrections; harder to use them.', ['be insulted', 'feel slighted']),
  c('w02-d2-05', 'break a promise', 2, 'verb-noun', 'fail to do what you promised', 'A teacher who breaks a promise loses the room for weeks.', ['go back on', 'renege on']),
  c('w02-d2-06', 'hold a grudge', 2, 'verb-noun', 'remain angry about a past wrong', 'Holding a grudge against an examiner only weighs on you.', ['bear ill-will', 'carry resentment']),
  c('w02-d2-07', 'speak your mind', 2, 'verb-noun', 'say what you think frankly', 'In Speaking Part 3, do speak your mind; the examiner expects it.', ['be candid', 'voice an opinion']),

  // Day 3 — adverb-adjective intensifiers about people
  c('w02-d3-01', 'highly motivated', 3, 'adverb-adjective', 'very strongly driven to achieve', 'Highly motivated candidates revise even when no one is watching.', ['deeply driven', 'strongly committed']),
  c('w02-d3-02', 'deeply committed', 3, 'adverb-adjective', 'strongly devoted to a cause or person', 'She is deeply committed to her students\' progress.', ['fully invested', 'wholly devoted']),
  c('w02-d3-03', 'genuinely curious', 3, 'adverb-adjective', 'authentically interested in finding out about something', 'A genuinely curious learner reads beyond the syllabus.', ['truly interested', 'authentically inquisitive']),
  c('w02-d3-04', 'remarkably patient', 3, 'adverb-adjective', 'unusually able to wait without irritation', 'My old maths teacher was remarkably patient with my errors.', ['unusually tolerant', 'extraordinarily forbearing']),
  c('w02-d3-05', 'fundamentally honest', 3, 'adverb-adjective', 'honest at the most basic level', 'A fundamentally honest essay outweighs a clever but false one.', ['inherently truthful', 'innately sincere']),
  c('w02-d3-06', 'incredibly resilient', 3, 'adverb-adjective', 'extremely able to bounce back', 'Older candidates tend to be incredibly resilient under pressure.', ['exceptionally tough', 'remarkably hardy']),
  c('w02-d3-07', 'terribly shy', 3, 'adverb-adjective', 'very nervous in social situations', 'A terribly shy speaker can still earn seven on Speaking with practice.', ['painfully timid', 'extremely reserved']),

  // Day 4 — relationships and family chunks
  c('w02-d4-01', 'close-knit family', 4, 'adjective-noun', 'a family whose members support each other strongly', 'A close-knit family is a quiet kind of advantage.', ['tightly-bonded family', 'supportive family']),
  c('w02-d4-02', 'lifelong friend', 4, 'adjective-noun', 'a friend you have known for most of your life', 'A lifelong friend hears your worries before they form sentences.', ['old friend', 'enduring companion']),
  c('w02-d4-03', 'distant relative', 4, 'adjective-noun', 'a member of an extended family rarely seen', 'Tet brings distant relatives back into the same room.', ['far-flung relation', 'remote kin']),
  c('w02-d4-04', 'mutual respect', 4, 'adjective-noun', 'respect that two parties show each other equally', 'Long marriages run on mutual respect more than on chemistry.', ['shared esteem', 'reciprocal regard']),
  c('w02-d4-05', 'deep affection', 4, 'adjective-noun', 'a strong feeling of love or fondness', 'There was a deep affection between the two old colleagues.', ['warm regard', 'strong fondness']),
  c('w02-d4-06', 'family ties', 4, 'noun-noun', 'the bonds and obligations between relatives', 'Family ties pull many graduates back to their hometowns.', ['kinship bonds', 'family bonds']),
  c('w02-d4-07', 'shared values', 4, 'adjective-noun', 'beliefs that two or more people hold in common', 'A friendship built on shared values is hard to break.', ['common beliefs', 'common ground']),

  // Day 5 — communication chunks
  c('w02-d5-01', 'have a heart-to-heart', 5, 'verb-noun', 'have a frank, intimate conversation', 'They had a long heart-to-heart at the airport.', ['open up', 'speak frankly']),
  c('w02-d5-02', 'strike up a conversation', 5, 'verb-noun', 'begin a conversation, often with a stranger', 'I struck up a conversation with the person beside me on the train.', ['start chatting', 'open dialogue']),
  c('w02-d5-03', 'change the subject', 5, 'verb-noun', 'start talking about something different', 'When the topic gets uncomfortable he changes the subject.', ['switch topic', 'move on']),
  c('w02-d5-04', 'lose track of time', 5, 'verb-noun', 'forget what time it is, often while engrossed', 'I lost track of time discussing the article with him.', ['get carried away', 'be absorbed']),
  c('w02-d5-05', 'speak highly of', 5, 'verb-preposition', 'praise someone strongly', 'Her colleagues all speak highly of her teaching.', ['commend', 'praise']),
  c('w02-d5-06', 'put across an argument', 5, 'verb-noun', 'communicate an argument clearly', 'Putting across an argument requires more than vocabulary; it requires shape.', ['articulate', 'present a case']),
  c('w02-d5-07', 'voice concerns', 5, 'verb-noun', 'express worries or objections', 'Several parents voiced concerns at the meeting.', ['raise concerns', 'air objections']),

  // Day 6 — emotional reactions
  c('w02-d6-01', 'lift your spirits', 6, 'verb-noun', 'make you feel happier', 'A walk by the river always lifts my spirits.', ['cheer up', 'boost morale']),
  c('w02-d6-02', 'break the ice', 6, 'verb-noun', 'do or say something to relieve tension when meeting', 'A small joke broke the ice on the first day of class.', ['ease tension', 'warm things up']),
  c('w02-d6-03', 'lend an ear', 6, 'verb-noun', 'listen sympathetically to someone', 'Sometimes a tutor just needs to lend an ear, not give an answer.', ['listen', 'hear out']),
  c('w02-d6-04', 'lose face', 6, 'verb-noun', 'lose the respect of others', 'Asking the right question avoids losing face later.', ['be embarrassed', 'be shamed']),
  c('w02-d6-05', 'save face', 6, 'verb-noun', 'avoid losing the respect of others', 'A graceful concession lets both sides save face.', ['preserve dignity', 'avoid embarrassment']),
  c('w02-d6-06', 'fall out with', 6, 'verb-preposition', 'have a quarrel that ends a friendship', 'The two friends fell out over a misunderstanding about money.', ['quarrel with', 'have a row with']),
  c('w02-d6-07', 'make up with', 6, 'verb-preposition', 'be friends again after a quarrel', 'They made up with each other after a long silence.', ['reconcile with', 'patch things up with']),

  // Day 7 — collaboration & influence
  c('w02-d7-01', 'work side by side', 7, 'verb-preposition', 'work next to each other in close cooperation', 'The two researchers have worked side by side for fifteen years.', ['collaborate closely', 'work in tandem']),
  c('w02-d7-02', 'play a key role', 7, 'verb-noun', 'be very important in something', 'Mentors play a key role in early careers.', ['be central', 'be pivotal']),
  c('w02-d7-03', 'set a high standard', 7, 'verb-noun', 'do something so well that others have to match it', 'The first speaker set a high standard for the rest.', ['raise the bar', 'lead the way']),
  c('w02-d7-04', 'pull your weight', 7, 'verb-noun', 'do your fair share of the work', 'Everyone in the project pulled their weight, which is why it ran on time.', ['do your share', 'contribute fairly']),
  c('w02-d7-05', 'share the load', 7, 'verb-noun', 'divide work or responsibility fairly', 'A good team shares the load instead of admiring the leader.', ['split the work', 'distribute responsibility']),
  c('w02-d7-06', 'win someone over', 7, 'verb-preposition', 'persuade someone to support you', 'A short demonstration won the committee over.', ['convince', 'sway']),
  c('w02-d7-07', 'gain support', 7, 'verb-noun', 'obtain backing for an idea or cause', 'The proposal gained support after a single open meeting.', ['attract backing', 'secure approval']),
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
    topic: 'people-behaviour',
    alternatives,
    level: 'intermediate',
    week: 2,
    day,
  }
}

export const INTERMEDIATE_COLLOC_WEEK_02: CollocationLexiconItem[] = items
