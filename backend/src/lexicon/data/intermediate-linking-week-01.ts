import type { LinkingLexiconItem } from '@shared/schemas/lexicon-items'

/**
 * Intermediate · Week 01 · Addition connectors.
 * 14 items across 7 days (2/day). Beyond and / but / so — the C1
 * inventory of stacking ideas without sounding rehearsed.
 */

const items: LinkingLexiconItem[] = [
  // Day 1
  l('w01-d1-01', 'moreover', 1, 'addition', 'C1', ['initial'], 'The proposal is well-funded. Moreover, it has the backing of three universities.', ['in addition', 'furthermore'], 'Use sparingly: one per essay paragraph at most.'),
  l('w01-d1-02', 'furthermore', 1, 'addition', 'C1', ['initial'], 'Solar costs have fallen sharply. Furthermore, storage technology has matured.', ['moreover', 'additionally'], 'Slightly heavier in tone than moreover.'),
  // Day 2
  l('w01-d2-01', 'in addition', 2, 'addition', 'B2', ['initial', 'medial'], 'The library opens late on weekdays. In addition, it offers free study booths.', ['moreover', 'additionally'], 'Comma after; works at start or after subject.'),
  l('w01-d2-02', 'additionally', 2, 'addition', 'C1', ['initial'], 'Additionally, the city plans to expand its bus network.', ['moreover', 'in addition'], 'Heavier register; reserve for academic writing.'),
  // Day 3
  l('w01-d3-01', 'what is more', 3, 'addition', 'B2', ['initial'], 'The new policy is unpopular. What is more, it has not been costed.', ['moreover', 'on top of that'], 'Slightly more conversational than moreover.'),
  l('w01-d3-02', 'not only ... but also', 3, 'addition', 'C1', ['medial'], 'Not only does the museum offer guided tours, but it also runs evening classes.', ['as well as', 'plus'], 'Inversion follows not only at clause start.'),
  // Day 4
  l('w01-d4-01', 'as well as', 4, 'addition', 'B1', ['initial', 'medial'], 'As well as offering scholarships, the university funds research grants.', ['besides', 'in addition to'], 'Followed by a noun or -ing form.'),
  l('w01-d4-02', 'besides', 4, 'addition', 'B2', ['initial'], 'Besides being free, the workshop is held in the city centre.', ['as well as', 'apart from'], 'Often followed by -ing form when initial.'),
  // Day 5
  l('w01-d5-01', 'too', 5, 'addition', 'B1', ['final'], 'The flat is bright. It is well insulated, too.', ['as well', 'also'], 'Sentence-final; comma usually optional.'),
  l('w01-d5-02', 'also', 5, 'addition', 'B1', ['medial'], 'The course is also available online.', ['as well', 'too'], 'Mid-sentence between auxiliary and verb.'),
  // Day 6
  l('w01-d6-01', 'in the same way', 6, 'addition', 'C1', ['initial'], 'Solar power is taxed at the lower rate. In the same way, wind generation receives a rebate.', ['similarly', 'likewise'], 'Adds a parallel example.'),
  l('w01-d6-02', 'likewise', 6, 'addition', 'C1', ['initial'], 'The university supports its language students. Likewise, postgraduates receive funding.', ['similarly', 'in the same way'], 'Slightly formal; works at start of clause.'),
  // Day 7
  l('w01-d7-01', 'on top of that', 7, 'addition', 'B2', ['initial'], 'The flat is far from work. On top of that, the rent has risen.', ['moreover', 'what is more'], 'Conversational; avoid in the most formal essays.'),
  l('w01-d7-02', 'what is worse', 7, 'addition', 'B2', ['initial'], 'The new fees were unannounced. What is worse, they apply retroactively.', ['to make matters worse', 'on top of that'], 'Carries a negative tone — use only when adding a worse point.'),
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
    week: 1,
    day,
  }
}

export const INTERMEDIATE_LINKING_WEEK_01: LinkingLexiconItem[] = items
