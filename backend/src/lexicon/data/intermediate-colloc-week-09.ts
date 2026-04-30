import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 09 · Economic chunks. 49 items, 7/day. Economic downturn, fiscal stimulus, vested interests — financial-press collocations. */

const items: CollocationLexiconItem[] = [
  // Day 1
  c('w09-d1-01', 'economic growth', 1, 'adjective-noun', 'expansion of the economy', 'Sustained economic growth lifts incomes broadly.', ['economic expansion', 'GDP growth']),
  c('w09-d1-02', 'economic downturn', 1, 'adjective-noun', 'period of declining economic activity', 'An economic downturn affects services before manufacturing.', ['recession', 'slowdown']),
  c('w09-d1-03', 'economic recovery', 1, 'adjective-noun', 'return to growth after a downturn', 'A jobless economic recovery is little comfort to the unemployed.', ['economic rebound', 'revival']),
  c('w09-d1-04', 'economic crisis', 1, 'adjective-noun', 'severe economic problem', 'The 2008 economic crisis reshaped financial regulation.', ['financial crisis', 'monetary crisis']),
  c('w09-d1-05', 'economic policy', 1, 'adjective-noun', 'government plan for the economy', 'A coherent economic policy outlasts any single administration.', ['fiscal policy', 'monetary plan']),
  c('w09-d1-06', 'sustained growth', 1, 'adjective-noun', 'long-term continuous expansion', 'Sustained growth requires investment in human capital.', ['lasting expansion', 'enduring growth']),
  c('w09-d1-07', 'boost the economy', 1, 'verb-noun', 'stimulate economic activity', 'Tax cuts can boost the economy in the short term.', ['stimulate the economy', 'invigorate']),

  // Day 2
  c('w09-d2-01', 'create jobs', 2, 'verb-noun', 'generate new employment opportunities', 'Investment in infrastructure creates jobs across regions.', ['generate employment', 'add positions']),
  c('w09-d2-02', 'cut jobs', 2, 'verb-noun', 'reduce employment', 'The factory cut jobs as automation increased.', ['lay off workers', 'reduce headcount']),
  c('w09-d2-03', 'unemployment rate', 2, 'noun-noun', 'percentage of workforce without jobs', 'The unemployment rate fell to a four-year low.', ['jobless rate', 'workforce inactivity']),
  c('w09-d2-04', 'minimum wage', 2, 'adjective-noun', 'lowest legal hourly pay', 'A modest minimum wage rise raised employment, not lowered it.', ['wage floor', 'statutory minimum']),
  c('w09-d2-05', 'job market', 2, 'noun-noun', 'supply and demand for paid work', 'A tight job market favours younger workers.', ['labour market', 'employment market']),
  c('w09-d2-06', 'labour shortage', 2, 'noun-noun', 'lack of available workers', 'A labour shortage in agriculture is now permanent in some regions.', ['worker shortage', 'staff deficit']),
  c('w09-d2-07', 'workforce participation', 2, 'noun-noun', 'percentage of people in or seeking work', 'Female workforce participation has risen sharply.', ['labour force participation', 'workforce engagement']),

  // Day 3
  c('w09-d3-01', 'rising prices', 3, 'adjective-noun', 'increasing costs of goods', 'Rising prices in food hit poorer households first.', ['price increases', 'inflation']),
  c('w09-d3-02', 'price hike', 3, 'noun-noun', 'sudden significant price increase', 'A price hike in fuel rippled through the entire economy.', ['price rise', 'sudden increase']),
  c('w09-d3-03', 'high inflation', 3, 'adjective-noun', 'rapid increase in general price level', 'High inflation erodes savings faster than most can adjust.', ['rapid inflation', 'price surge']),
  c('w09-d3-04', 'curb inflation', 3, 'verb-noun', 'restrict the rise in prices', 'Central banks raised rates to curb inflation.', ['control inflation', 'check price rises']),
  c('w09-d3-05', 'cost of living', 3, 'noun-preposition', 'amount needed for basic necessities', 'The rising cost of living has eroded real wages.', ['living costs', 'household expenses']),
  c('w09-d3-06', 'purchasing power', 3, 'noun-noun', 'amount goods money can buy', 'Inflation reduces purchasing power even when wages rise.', ['buying power', 'spending capacity']),
  c('w09-d3-07', 'reduce inflation', 3, 'verb-noun', 'lower the rate of price increases', 'Reducing inflation is rarely possible without short-term pain.', ['lower inflation', 'cut inflation']),

  // Day 4
  c('w09-d4-01', 'invest in', 4, 'verb-preposition', 'put money or resources into', 'Long-term investment in education shows results in a generation.', ['put money into', 'commit funds to']),
  c('w09-d4-02', 'foreign investment', 4, 'adjective-noun', 'money invested by foreign companies', 'Foreign investment created a million jobs in the export zone.', ['FDI', 'inward investment']),
  c('w09-d4-03', 'attract investment', 4, 'verb-noun', 'draw money for investment', 'Special economic zones attract investment from across Asia.', ['draw funding', 'lure investors']),
  c('w09-d4-04', 'make a profit', 4, 'verb-noun', 'earn money from a business activity', 'Most startups fail to make a profit in their first three years.', ['earn money', 'turn a profit']),
  c('w09-d4-05', 'incur losses', 4, 'verb-noun', 'experience financial losses', 'The company incurred losses for two consecutive years.', ['suffer losses', 'lose money']),
  c('w09-d4-06', 'raise capital', 4, 'verb-noun', 'collect money for a business', 'The startup raised capital from three venture funds.', ['secure funding', 'obtain finance']),
  c('w09-d4-07', 'go bankrupt', 4, 'verb-adjective', 'become unable to pay debts', 'The chain went bankrupt after a decade of declining sales.', ['fail financially', 'collapse']),

  // Day 5
  c('w09-d5-01', 'budget deficit', 5, 'noun-noun', 'shortfall of revenue against spending', 'A persistent budget deficit raises borrowing costs.', ['fiscal deficit', 'spending shortfall']),
  c('w09-d5-02', 'budget surplus', 5, 'noun-noun', 'excess of revenue over spending', 'A budget surplus allowed extra investment in infrastructure.', ['fiscal surplus', 'positive balance']),
  c('w09-d5-03', 'public spending', 5, 'adjective-noun', 'government expenditure', 'Public spending on health rose during the pandemic.', ['government expenditure', 'state outlay']),
  c('w09-d5-04', 'national debt', 5, 'adjective-noun', 'total debt owed by a national government', 'National debt has reached postwar highs in several countries.', ['sovereign debt', 'public debt']),
  c('w09-d5-05', 'pay tax', 5, 'verb-noun', 'give money to the government in tax', 'Larger firms increasingly use schemes to avoid paying tax.', ['be taxed', 'remit taxes']),
  c('w09-d5-06', 'raise taxes', 5, 'verb-noun', 'increase taxation', 'Governments raise taxes only when no other option remains.', ['hike taxes', 'increase taxation']),
  c('w09-d5-07', 'tax break', 5, 'noun-noun', 'reduction in tax', 'A tax break for first-time buyers stimulated the housing market.', ['tax relief', 'tax incentive']),

  // Day 6
  c('w09-d6-01', 'free market', 6, 'adjective-noun', 'economy with little government interference', 'A free market needs sharp regulation as much as freedom.', ['market economy', 'open market']),
  c('w09-d6-02', 'open market', 6, 'adjective-noun', 'market with few barriers to entry', 'An open market lowers prices but exposes weak sectors.', ['free market', 'liberalised market']),
  c('w09-d6-03', 'market forces', 6, 'noun-noun', 'economic factors of supply and demand', 'Market forces alone cannot deliver public goods.', ['supply and demand', 'economic forces']),
  c('w09-d6-04', 'supply and demand', 6, 'noun-noun', 'amount available and amount wanted', 'Supply and demand meet to set prices in a free market.', ['market dynamics', 'economic balance']),
  c('w09-d6-05', 'market share', 6, 'noun-noun', 'percentage of total sales held by one company', 'The firm captured ten per cent market share in two years.', ['sales percentage', 'market portion']),
  c('w09-d6-06', 'gain market share', 6, 'verb-noun', 'increase percentage of sales', 'Smaller competitors gained market share at the giants\' expense.', ['win business', 'capture sales']),
  c('w09-d6-07', 'enter the market', 6, 'verb-noun', 'begin operating in a market', 'A foreign brand entered the market with a clever local partnership.', ['launch in a market', 'start trading']),

  // Day 7
  c('w09-d7-01', 'global economy', 7, 'adjective-noun', 'economic system of the world', 'A global economy means a recession spreads more quickly.', ['world economy', 'international economy']),
  c('w09-d7-02', 'developing country', 7, 'adjective-noun', 'a country with lower economic development', 'A developing country needs both investment and stable institutions.', ['emerging economy', 'developing nation']),
  c('w09-d7-03', 'developed country', 7, 'adjective-noun', 'a country with high economic development', 'A developed country is not immune to economic shocks.', ['advanced economy', 'wealthy nation']),
  c('w09-d7-04', 'emerging economy', 7, 'adjective-noun', 'rapidly growing developing economy', 'Emerging economies have grown faster than rich ones for two decades.', ['developing economy', 'rising economy']),
  c('w09-d7-05', 'income inequality', 7, 'noun-noun', 'unfair distribution of income', 'Income inequality has widened in most rich countries.', ['wealth gap', 'income disparity']),
  c('w09-d7-06', 'standard of living', 7, 'noun-preposition', 'level of material wellbeing', 'A rising standard of living masks unequal distribution.', ['quality of life', 'living standards']),
  c('w09-d7-07', 'narrow the gap', 7, 'verb-noun', 'reduce a difference', 'Targeted policies have narrowed the gap modestly.', ['close the gap', 'reduce disparity']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'economy', alternatives, level: 'intermediate', week: 9, day }
}

export const INTERMEDIATE_COLLOC_WEEK_09: CollocationLexiconItem[] = items
