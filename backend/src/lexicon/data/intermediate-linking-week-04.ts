import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 04 · Effect connectors.
 * 14 items across 7 days. The natural close to a causal chain — moving
 * beyond so when an effect needs weight.
 */

const items: LinkingLexiconItem[] = [
  // Day 1
  l('w04-d1-01', 'therefore', 1, 'effect', 'B2', ['initial', 'medial'], 'Costs have risen sharply. Therefore, the project will be delayed.', ['hence', 'consequently'], 'Use a comma after; works at clause start.'),
  l('w04-d1-02', 'consequently', 1, 'effect', 'C1', ['initial'], 'The funding was withdrawn. Consequently, the launch was postponed indefinitely.', ['therefore', 'as a result'], 'Heavier register than therefore.'),
  // Day 2
  l('w04-d2-01', 'as a result', 2, 'effect', 'B2', ['initial'], 'The supplier raised prices. As a result, our margin shrank.', ['consequently', 'thus'], 'Initial; comma follows.'),
  l('w04-d2-02', 'as a consequence', 2, 'effect', 'C1', ['initial'], 'The building was unsafe. As a consequence, classes were moved.', ['as a result', 'consequently'], 'Slightly more formal than as a result.'),
  // Day 3
  l('w04-d3-01', 'thus', 3, 'effect', 'C1', ['initial', 'medial'], 'The two parties failed to agree, thus delaying the policy.', ['therefore', 'hence'], 'Often used to introduce -ing clause.'),
  l('w04-d3-02', 'hence', 3, 'effect', 'C1', ['initial'], 'The data is incomplete, hence the cautious conclusion.', ['therefore', 'thus'], 'Often used without a verb following — implies the result.'),
  // Day 4
  l('w04-d4-01', 'so', 4, 'effect', 'B1', ['initial', 'medial'], 'The library was closed, so we worked at the cafe.', ['therefore', 'consequently'], 'Conversational; avoid in the most formal essays.'),
  l('w04-d4-02', 'this means that', 4, 'effect', 'B2', ['initial'], 'The deadline has shifted. This means that the second draft is also delayed.', ['as a result', 'so'], 'Useful when explaining implications in clear prose.'),
  // Day 5
  l('w04-d5-01', 'with the result that', 5, 'effect', 'C1', ['initial'], 'The budget was halved, with the result that several positions were cut.', ['so that', 'leading to'], 'Joins clauses tightly; comma before.'),
  l('w04-d5-02', 'in consequence', 5, 'effect', 'C1', ['initial'], 'The treaty was unsigned. In consequence, no aid arrived.', ['as a result', 'consequently'], 'Slightly older formal register; use sparingly.'),
  // Day 6
  l('w04-d6-01', 'leading to', 6, 'effect', 'C1', ['medial'], 'A change in policy may follow, leading to broader reforms.', ['resulting in', 'causing'], 'Used as a participle phrase; no comma needed before.'),
  l('w04-d6-02', 'resulting in', 6, 'effect', 'C1', ['medial'], 'The river broke its banks, resulting in widespread flooding.', ['leading to', 'producing'], 'Same pattern as leading to.'),
  // Day 7
  l('w04-d7-01', 'such that', 7, 'effect', 'C1', ['medial'], 'The penalty was structured such that repeat offenders paid double.', ['so that', 'with the result that'], 'Formal academic register; introduces a result clause.'),
  l('w04-d7-02', 'so much so that', 7, 'effect', 'C1', ['initial'], 'The tutorial was popular, so much so that a second slot was added.', ['to the extent that', 'so that'], 'Emphatic — use when the result deserves stress.'),
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
    week: 4,
    day,
  }
}

export const INTERMEDIATE_LINKING_WEEK_04: LinkingLexiconItem[] = items
