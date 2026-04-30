import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 12 · Global chunks. 49 items, 7/day. Cross-border trade, cultural exchange, mutual understanding — integrative across all four skills. */

const items: CollocationLexiconItem[] = [
  c('w12-d1-01', 'global village', 1, 'adjective-noun', 'idea of the world as interconnected', 'The global village is closer than ever in commerce, slower than ever in trust.', ['interconnected world', 'small world']),
  c('w12-d1-02', 'global market', 1, 'adjective-noun', 'worldwide market for goods and services', 'A global market punishes complacency faster than a local one.', ['world market', 'international market']),
  c('w12-d1-03', 'international community', 1, 'adjective-noun', 'all the nations of the world collectively', 'The international community responded slowly to the crisis.', ['world community', 'global community']),
  c('w12-d1-04', 'world leader', 1, 'noun-noun', 'leader of significant global influence', 'A handful of world leaders shape decisions far beyond their borders.', ['global leader', 'international leader']),
  c('w12-d1-05', 'developed nation', 1, 'adjective-noun', 'an economically advanced country', 'Most patents originate in a small group of developed nations.', ['advanced country', 'rich country']),
  c('w12-d1-06', 'developing nation', 1, 'adjective-noun', 'a country with lower economic development', 'A developing nation needs both stability and investment.', ['emerging nation', 'developing country']),
  c('w12-d1-07', 'face challenges', 1, 'verb-noun', 'confront difficult situations', 'All countries face common challenges of climate and migration.', ['confront challenges', 'meet challenges']),

  c('w12-d2-01', 'cross-border trade', 2, 'adjective-noun', 'commerce between countries', 'Cross-border trade requires aligned regulations more than aligned interests.', ['international trade', 'transnational trade']),
  c('w12-d2-02', 'free trade', 2, 'adjective-noun', 'trade with few restrictions', 'A free-trade agreement still leaves many barriers in place.', ['open trade', 'liberal trade']),
  c('w12-d2-03', 'trade agreement', 2, 'noun-noun', 'formal pact governing trade', 'A new trade agreement covered services as well as goods.', ['trade pact', 'commercial treaty']),
  c('w12-d2-04', 'trade barrier', 2, 'noun-noun', 'restriction on international trade', 'Trade barriers rise quickly and fall slowly.', ['import barrier', 'tariff']),
  c('w12-d2-05', 'global trade', 2, 'adjective-noun', 'worldwide commerce', 'Global trade has grown faster than global GDP for half a century.', ['international trade', 'world commerce']),
  c('w12-d2-06', 'export market', 2, 'noun-noun', 'foreign market for goods', 'A diverse export market reduces dependence on any one region.', ['overseas market', 'foreign market']),
  c('w12-d2-07', 'import goods', 2, 'verb-noun', 'bring goods from other countries', 'The country imports goods worth more than it exports.', ['bring in goods', 'source goods']),

  c('w12-d3-01', 'cultural exchange', 3, 'adjective-noun', 'sharing of culture between groups', 'A residency programme is a small but real cultural exchange.', ['cultural sharing', 'intercultural exchange']),
  c('w12-d3-02', 'mutual understanding', 3, 'adjective-noun', 'understanding shared between parties', 'Mutual understanding precedes any agreement that holds.', ['shared understanding', 'common understanding']),
  c('w12-d3-03', 'cross-cultural', 3, 'adjective', 'involving different cultures', 'Cross-cultural collaboration takes longer to set up but produces stronger work.', ['intercultural', 'multicultural']),
  c('w12-d3-04', 'foreign culture', 3, 'adjective-noun', 'culture of another country', 'Living in a foreign culture changes how you read your own.', ['other culture', 'overseas culture']),
  c('w12-d3-05', 'experience another culture', 3, 'verb-noun', 'live within or come to know another culture', 'A summer abroad is the cheapest way to experience another culture.', ['live in another culture', 'immerse oneself']),
  c('w12-d3-06', 'learn a foreign language', 3, 'verb-noun', 'acquire a language not native to you', 'Learning a foreign language well takes a decade, not a year.', ['study a language', 'pick up a language']),
  c('w12-d3-07', 'become bilingual', 3, 'verb-adjective', 'develop fluency in two languages', 'Children become bilingual easily; adults pay a price for the same outcome.', ['speak two languages', 'be bilingual']),

  c('w12-d4-01', 'foreign aid', 4, 'adjective-noun', 'help given to another country', 'Foreign aid works best when locals lead the projects.', ['international aid', 'overseas aid']),
  c('w12-d4-02', 'humanitarian aid', 4, 'adjective-noun', 'help given to relieve human suffering', 'Humanitarian aid arrives quickly but rarely matches the need.', ['relief aid', 'emergency aid']),
  c('w12-d4-03', 'provide assistance', 4, 'verb-noun', 'give help', 'NGOs provide assistance during natural disasters.', ['offer help', 'give support']),
  c('w12-d4-04', 'international cooperation', 4, 'adjective-noun', 'working together across countries', 'International cooperation on health survived the pandemic intact.', ['global cooperation', 'cross-border cooperation']),
  c('w12-d4-05', 'global cooperation', 4, 'adjective-noun', 'working together across the world', 'Global cooperation on the climate is the test of the century.', ['international cooperation', 'worldwide cooperation']),
  c('w12-d4-06', 'work together', 4, 'verb-adverb', 'collaborate', 'Countries work together more easily on technical issues than political ones.', ['collaborate', 'cooperate']),
  c('w12-d4-07', 'join forces', 4, 'verb-noun', 'combine efforts', 'NGOs joined forces to lobby for the new treaty.', ['unite efforts', 'collaborate']),

  c('w12-d5-01', 'environmental challenges', 5, 'adjective-noun', 'difficult environmental problems', 'Environmental challenges respect no national boundary.', ['ecological challenges', 'green challenges']),
  c('w12-d5-02', 'global warming', 5, 'adjective-noun', 'rise in global temperatures', 'Global warming is now measured in fractions of a degree.', ['climate heating', 'planetary warming']),
  c('w12-d5-03', 'address climate change', 5, 'verb-noun', 'tackle the issue of climate change', 'Addressing climate change requires both technology and policy.', ['tackle climate change', 'combat global warming']),
  c('w12-d5-04', 'global pandemic', 5, 'adjective-noun', 'worldwide outbreak of disease', 'A global pandemic exposed every fragility in the world\'s health systems.', ['worldwide pandemic', 'international outbreak']),
  c('w12-d5-05', 'spread of disease', 5, 'noun-preposition', 'movement of illness across populations', 'Air travel changes the spread of disease beyond all previous experience.', ['disease transmission', 'contagion']),
  c('w12-d5-06', 'food shortage', 5, 'noun-noun', 'lack of available food', 'A food shortage in one region affects prices everywhere.', ['food deficit', 'food crisis']),
  c('w12-d5-07', 'water scarcity', 5, 'noun-noun', 'shortage of fresh water', 'Urban water scarcity arrives faster than projections suggest.', ['water shortage', 'drought']),

  c('w12-d6-01', 'live abroad', 6, 'verb-adverb', 'reside in another country', 'Many young people live abroad for work or study.', ['reside overseas', 'be an expatriate']),
  c('w12-d6-02', 'travel internationally', 6, 'verb-adverb', 'go to other countries', 'I travel internationally for work twice a year.', ['travel overseas', 'travel abroad']),
  c('w12-d6-03', 'study abroad', 6, 'verb-adverb', 'pursue education in another country', 'Studying abroad costs more than studying at home but builds a different network.', ['go to university overseas', 'study overseas']),
  c('w12-d6-04', 'work overseas', 6, 'verb-adverb', 'be employed in another country', 'A short stint working overseas can transform a career.', ['work abroad', 'have a foreign posting']),
  c('w12-d6-05', 'gain international experience', 6, 'verb-noun', 'acquire experience working in other countries', 'Recruiters value candidates who have gained international experience.', ['get global experience', 'develop overseas exposure']),
  c('w12-d6-06', 'broaden perspective', 6, 'verb-noun', 'widen one\'s outlook', 'Travel broadens perspective in ways books can only hint at.', ['widen outlook', 'open mind']),
  c('w12-d6-07', 'overcome barriers', 6, 'verb-noun', 'get past obstacles', 'Migrants overcome barriers that locals do not see.', ['surmount obstacles', 'get past hurdles']),

  c('w12-d7-01', 'embrace globalisation', 7, 'verb-noun', 'enthusiastically accept globalisation', 'Cities that embrace globalisation grow faster but unequally.', ['welcome globalisation', 'support globalisation']),
  c('w12-d7-02', 'reject globalisation', 7, 'verb-noun', 'oppose the integration of the world', 'Communities that reject globalisation often retain stronger identities.', ['oppose globalisation', 'resist global integration']),
  c('w12-d7-03', 'global awareness', 7, 'adjective-noun', 'understanding of global issues', 'Global awareness has risen most among younger generations.', ['international awareness', 'world consciousness']),
  c('w12-d7-04', 'common interest', 7, 'adjective-noun', 'shared concerns or benefits', 'A common interest in clean air should outweigh national rivalries.', ['shared interest', 'mutual concern']),
  c('w12-d7-05', 'shared values', 7, 'adjective-noun', 'beliefs held in common', 'Alliances rest on shared values more than shared interests.', ['common values', 'common beliefs']),
  c('w12-d7-06', 'global citizen', 7, 'adjective-noun', 'person who identifies with humanity rather than one country', 'A global citizen still pays taxes somewhere.', ['world citizen', 'cosmopolitan']),
  c('w12-d7-07', 'world peace', 7, 'noun-noun', 'global peace and harmony', 'World peace is an aspiration that gives politics its long-term direction.', ['global peace', 'international peace']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'globalisation', alternatives, level: 'intermediate', week: 12, day }
}

export const INTERMEDIATE_COLLOC_WEEK_12: CollocationLexiconItem[] = items
