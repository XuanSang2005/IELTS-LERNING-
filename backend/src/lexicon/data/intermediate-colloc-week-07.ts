import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 07 · Trend and change pairings. 49 items, 7/day. The chart-reader's vocabulary — Task 1 and Speaking Part 3. */

const items: CollocationLexiconItem[] = [
  // Day 1 — Increase
  c('w07-d1-01', 'steady increase', 1, 'adjective-noun', 'consistent rise over time', 'There has been a steady increase in renewable energy capacity.', ['gradual rise', 'consistent growth']),
  c('w07-d1-02', 'sharp rise', 1, 'adjective-noun', 'sudden and significant increase', 'The chart shows a sharp rise in fuel prices last quarter.', ['sudden surge', 'dramatic increase']),
  c('w07-d1-03', 'gradual growth', 1, 'adjective-noun', 'slow and steady expansion', 'Gradual growth has carried the firm through three downturns.', ['slow expansion', 'steady increase']),
  c('w07-d1-04', 'significant rise', 1, 'adjective-noun', 'a notable increase', 'There has been a significant rise in online learning enrolment.', ['marked rise', 'considerable increase']),
  c('w07-d1-05', 'rapid growth', 1, 'adjective-noun', 'fast expansion', 'Rapid growth in tourism has transformed the coastal economy.', ['fast expansion', 'swift increase']),
  c('w07-d1-06', 'climb steadily', 1, 'verb-adverb', 'rise consistently', 'Property prices climbed steadily for a decade.', ['rise consistently', 'increase gradually']),
  c('w07-d1-07', 'reach a peak', 1, 'verb-noun', 'arrive at the highest point', 'Sales reached a peak in the final quarter.', ['hit a high', 'top out']),

  // Day 2 — Decrease
  c('w07-d2-01', 'sharp decline', 2, 'adjective-noun', 'sudden significant decrease', 'There was a sharp decline in newspaper sales after 2008.', ['steep fall', 'sudden drop']),
  c('w07-d2-02', 'gradual decrease', 2, 'adjective-noun', 'slow reduction over time', 'A gradual decrease in smoking rates began in the 1970s.', ['slow reduction', 'steady decline']),
  c('w07-d2-03', 'marked drop', 2, 'adjective-noun', 'noticeable fall', 'The figures show a marked drop in unemployment.', ['notable fall', 'significant decrease']),
  c('w07-d2-04', 'slight fall', 2, 'adjective-noun', 'small decrease', 'There was a slight fall in attendance during the cold spell.', ['minor drop', 'small decrease']),
  c('w07-d2-05', 'decline steadily', 2, 'verb-adverb', 'decrease consistently', 'The bird population has declined steadily for thirty years.', ['fall gradually', 'decrease slowly']),
  c('w07-d2-06', 'plummet sharply', 2, 'verb-adverb', 'fall very rapidly', 'The shares plummeted sharply after the announcement.', ['drop sharply', 'plunge']),
  c('w07-d2-07', 'hit a low', 2, 'verb-noun', 'reach the lowest point', 'Confidence in the institution hit a low last spring.', ['reach a trough', 'bottom out']),

  // Day 3 — Stability
  c('w07-d3-01', 'remain stable', 3, 'verb-adjective', 'stay at the same level', 'Inflation has remained stable for three quarters.', ['stay constant', 'hold steady']),
  c('w07-d3-02', 'level off', 3, 'verb-adverb', 'reach a stable level after change', 'Demand has begun to level off after years of growth.', ['plateau', 'stabilise']),
  c('w07-d3-03', 'reach a plateau', 3, 'verb-noun', 'arrive at a stable level', 'Most learners reach a plateau around band six.', ['plateau', 'level off']),
  c('w07-d3-04', 'stabilise prices', 3, 'verb-noun', 'keep prices steady', 'The intervention helped stabilise prices in volatile markets.', ['steady prices', 'fix prices']),
  c('w07-d3-05', 'show no change', 3, 'verb-noun', 'remain the same as before', 'The figures show no change since the last report.', ['remain unchanged', 'stay flat']),
  c('w07-d3-06', 'fluctuate slightly', 3, 'verb-adverb', 'change a little but unpredictably', 'Customer numbers fluctuate slightly depending on the season.', ['vary a little', 'oscillate']),
  c('w07-d3-07', 'maintain a level', 3, 'verb-noun', 'keep at the same level', 'The athlete maintains a level of fitness through cross-training.', ['sustain', 'preserve']),

  // Day 4 — Magnitude
  c('w07-d4-01', 'considerable amount', 4, 'adjective-noun', 'a large quantity', 'A considerable amount of time was spent on the report.', ['substantial amount', 'large quantity']),
  c('w07-d4-02', 'significant proportion', 4, 'adjective-noun', 'an important share', 'A significant proportion of the budget goes to research.', ['large share', 'important percentage']),
  c('w07-d4-03', 'vast majority', 4, 'adjective-noun', 'almost all', 'The vast majority of citizens supported the reform.', ['great majority', 'overwhelming majority']),
  c('w07-d4-04', 'tiny minority', 4, 'adjective-noun', 'a very small group', 'Only a tiny minority opposed the new building.', ['small minority', 'fraction']),
  c('w07-d4-05', 'a great deal of', 4, 'noun', 'a large amount of', 'A great deal of effort went into the proposal.', ['a lot of', 'much']),
  c('w07-d4-06', 'a fraction of', 4, 'noun-preposition', 'a small part of', 'Only a fraction of the audience stayed for the discussion.', ['a small portion of', 'a percentage of']),
  c('w07-d4-07', 'roughly equal', 4, 'adverb-adjective', 'approximately the same', 'The two groups were roughly equal in size.', ['about the same', 'comparable']),

  // Day 5 — Comparison
  c('w07-d5-01', 'in stark contrast', 5, 'preposition', 'in clear opposition', 'In stark contrast, the rural figure rose by half.', ['in marked contrast', 'unlike']),
  c('w07-d5-02', 'compared with', 5, 'verb-preposition', 'when measured against', 'Output is high compared with the previous year.', ['versus', 'as against']),
  c('w07-d5-03', 'on a par with', 5, 'preposition', 'at the same level as', 'The new product is on a par with the established brands.', ['equivalent to', 'comparable to']),
  c('w07-d5-04', 'far exceed', 5, 'verb', 'be much greater than', 'Demand far exceeds the available supply.', ['greatly surpass', 'outstrip']),
  c('w07-d5-05', 'fall short of', 5, 'verb-preposition', 'fail to reach', 'The numbers fell short of the original target.', ['miss', 'fail to meet']),
  c('w07-d5-06', 'closely resemble', 5, 'adverb-verb', 'be very similar to', 'The new policy closely resembles the one introduced last year.', ['be very like', 'mirror']),
  c('w07-d5-07', 'differ significantly', 5, 'verb-adverb', 'be very different', 'Outcomes differ significantly between the two regions.', ['vary widely', 'be markedly different']),

  // Day 6 — Pace of change
  c('w07-d6-01', 'rapid change', 6, 'adjective-noun', 'fast transformation', 'Rapid change has reshaped the high street.', ['quick transformation', 'fast shift']),
  c('w07-d6-02', 'slow progress', 6, 'adjective-noun', 'gradual advancement', 'Slow progress is still progress.', ['gradual advancement', 'incremental gain']),
  c('w07-d6-03', 'sudden shift', 6, 'adjective-noun', 'abrupt change', 'A sudden shift in policy caught the markets unprepared.', ['abrupt change', 'unexpected change']),
  c('w07-d6-04', 'gradual transition', 6, 'adjective-noun', 'slow change from one state to another', 'A gradual transition to renewable energy is under way.', ['slow shift', 'incremental change']),
  c('w07-d6-05', 'undergo change', 6, 'verb-noun', 'experience transformation', 'The industry has undergone change at unprecedented speed.', ['experience transformation', 'go through change']),
  c('w07-d6-06', 'witness growth', 6, 'verb-noun', 'observe expansion', 'The region has witnessed growth in three consecutive quarters.', ['observe expansion', 'see growth']),
  c('w07-d6-07', 'pick up pace', 6, 'verb-noun', 'become faster', 'Recovery is finally picking up pace this year.', ['accelerate', 'gain momentum']),

  // Day 7 — Trends
  c('w07-d7-01', 'follow a trend', 7, 'verb-noun', 'continue an established pattern', 'Sales followed a familiar trend through the holiday period.', ['continue a pattern', 'go with the flow']),
  c('w07-d7-02', 'reverse a trend', 7, 'verb-noun', 'turn around a pattern', 'New policies aim to reverse the trend of falling birth rates.', ['turn around', 'change direction']),
  c('w07-d7-03', 'set a trend', 7, 'verb-noun', 'establish a pattern others follow', 'The pioneering company set a trend the industry copied.', ['lead the way', 'pioneer']),
  c('w07-d7-04', 'buck the trend', 7, 'verb-noun', 'go against the prevailing pattern', 'A small region bucked the trend with rising employment.', ['defy the trend', 'go against the grain']),
  c('w07-d7-05', 'continuing trend', 7, 'adjective-noun', 'an ongoing pattern', 'A continuing trend is more useful than a single data point.', ['ongoing pattern', 'persistent trend']),
  c('w07-d7-06', 'emerging trend', 7, 'adjective-noun', 'a new pattern beginning to develop', 'Remote working is no longer an emerging trend.', ['developing pattern', 'new trend']),
  c('w07-d7-07', 'long-term trend', 7, 'adjective-noun', 'a pattern over many years', 'The long-term trend is more reliable than monthly figures.', ['multi-year trend', 'enduring pattern']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'trends', alternatives, level: 'intermediate', week: 7, day }
}

export const INTERMEDIATE_COLLOC_WEEK_07: CollocationLexiconItem[] = items
