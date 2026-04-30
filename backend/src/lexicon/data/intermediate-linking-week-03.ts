import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 03 · Cause connectors.
 * 14 items across 7 days. The Band 6.5 staples plus their C1 cousins.
 */

const items: LinkingLexiconItem[] = [
  // Day 1
  l('w03-d1-01', 'because', 1, 'cause', 'B1', ['initial', 'medial'], 'I missed the train because I underestimated the queue.', ['since', 'as'], 'Joins clauses; usually mid-sentence.'),
  l('w03-d1-02', 'since', 1, 'cause', 'B2', ['initial'], 'Since the rules changed, fewer applications have been rejected.', ['because', 'as'], 'Often initial in formal writing.'),
  // Day 2
  l('w03-d2-01', 'as', 2, 'cause', 'B1', ['initial'], 'As the train was late, I read for half an hour.', ['since', 'because'], 'Slightly more formal than because; same grammar.'),
  l('w03-d2-02', 'owing to', 2, 'cause', 'C1', ['initial'], 'Owing to heavy rain, the festival closed an hour early.', ['due to', 'because of'], 'Followed by a noun phrase, not a clause.'),
  // Day 3
  l('w03-d3-01', 'due to', 3, 'cause', 'C1', ['initial', 'medial'], 'Delivery was delayed due to a strike at the port.', ['owing to', 'because of'], 'Same grammar as owing to.'),
  l('w03-d3-02', 'because of', 3, 'cause', 'B2', ['initial', 'medial'], 'The match was cancelled because of poor visibility.', ['due to', 'on account of'], 'Followed by noun or pronoun.'),
  // Day 4
  l('w03-d4-01', 'on account of', 4, 'cause', 'C1', ['initial'], 'On account of the bad weather, the talk was moved indoors.', ['because of', 'owing to'], 'Slightly heavy register; useful in essays.'),
  l('w03-d4-02', 'thanks to', 4, 'cause', 'B2', ['initial'], 'Thanks to a generous grant, the museum reopened in spring.', ['owing to', 'because of'], 'Carries a positive tone — use only for beneficial causes.'),
  // Day 5
  l('w03-d5-01', 'in light of', 5, 'cause', 'C1', ['initial'], 'In light of the new evidence, the policy was reviewed.', ['given', 'considering'], 'Useful for argument essays — flags reasoned response.'),
  l('w03-d5-02', 'given that', 5, 'cause', 'C1', ['initial'], 'Given that resources are limited, priorities matter most.', ['since', 'in light of the fact that'], 'Subordinator; needs a clause.'),
  // Day 6
  l('w03-d6-01', 'for this reason', 6, 'cause', 'B2', ['initial'], 'The committee was divided. For this reason, no decision was made.', ['that is why', 'on these grounds'], 'Initial; comma after.'),
  l('w03-d6-02', 'inasmuch as', 6, 'cause', 'C1', ['initial'], 'Inasmuch as the policy was experimental, mixed results were expected.', ['since', 'because'], 'Heavy formal register; reserve for the most academic tone.'),
  // Day 7
  l('w03-d7-01', 'seeing that', 7, 'cause', 'B2', ['initial'], 'Seeing that the rain has stopped, we may as well start.', ['since', 'given that'], 'Conversational; works in Speaking Part 3.'),
  l('w03-d7-02', 'in view of', 7, 'cause', 'C1', ['initial'], 'In view of the rising costs, the trip was postponed.', ['given', 'considering'], 'Followed by a noun; formal.'),
]

function l(
  shortId: string,
  phrase: string,
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  fn: LinkingLexiconItem['function'],
  register: LinkingLexiconItem['register'],
  positions: LinkingLexiconItem['positions'],
  example: string,
  _alternatives: string[],
  note?: string,
): LinkingLexiconItem {
  return {
    discipline: 'linking',
    id: `int-linking-${shortId}`,
    phrase,
    function: fn,
    register,
    positions,
    example,
    ...(note ? { note } : {}),
    level: 'intermediate',
    week: 3,
    day,
  }
}

export const INTERMEDIATE_LINKING_WEEK_03: LinkingLexiconItem[] = items
