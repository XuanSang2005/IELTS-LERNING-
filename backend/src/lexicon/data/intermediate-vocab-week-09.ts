import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 09 · Economy and work. 70 items. The lexis of growth, decline, and intervention — the language of the leading article. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — Markets & trade
  v('w09-d1-01', 'market', 1, { partOfSpeech: 'noun', definition: 'A system in which goods and services are bought and sold.', example: 'A free market needs sharp regulation as much as freedom.', synonyms: [['marketplace', 'B2'], ['exchange', 'B2']] }),
  v('w09-d1-02', 'demand', 1, { partOfSpeech: 'noun', definition: 'The desire for goods or services backed by ability to pay.', example: 'Demand for electric vehicles has grown sharply.', synonyms: [['need', 'B1'], ['appetite', 'C1']] }),
  v('w09-d1-03', 'supply', 1, { partOfSpeech: 'noun', definition: 'The amount of goods available for sale.', example: 'A supply shock raises prices faster than higher demand.', synonyms: [['provision', 'B2'], ['inventory', 'C1']] }),
  v('w09-d1-04', 'commerce', 1, { partOfSpeech: 'noun', definition: 'The activity of buying and selling on a large scale.', example: 'Commerce now flows online faster than over the borders themselves.', register: 'C1', synonyms: [['trade', 'B2'], ['business', 'B1']] }),
  v('w09-d1-05', 'consumer', 1, { partOfSpeech: 'noun', definition: 'A person who buys goods or services.', example: 'A confident consumer is the engine of the modern economy.', synonyms: [['buyer', 'B2'], ['customer', 'B1']] }),
  v('w09-d1-06', 'merchandise', 1, { partOfSpeech: 'noun', definition: 'Goods to be bought and sold.', example: 'Imported merchandise still pays a small tariff at the port.', register: 'C1', synonyms: [['goods', 'B1'], ['products', 'B1']] }),
  v('w09-d1-07', 'tariff', 1, { partOfSpeech: 'noun', definition: 'A tax on imports or exports.', example: 'A new tariff raised steel prices across three industries.', register: 'C1', synonyms: [['duty', 'C1'], ['levy', 'C1']] }),
  v('w09-d1-08', 'export', 1, { partOfSpeech: 'noun', definition: 'A good sold to another country.', example: 'Coffee remains the country\'s most valuable export.', synonyms: [['overseas sale', 'C1'], ['outbound trade', 'C1']] }),
  v('w09-d1-09', 'import', 1, { partOfSpeech: 'noun', definition: 'A good bought from another country.', example: 'A weak currency makes imports more expensive.', synonyms: [['inbound goods', 'C1'], ['foreign purchase', 'C1']] }),
  v('w09-d1-10', 'commodity', 1, { partOfSpeech: 'noun', definition: 'A raw material or primary product traded in bulk.', example: 'Commodity prices respond first to supply shocks.', register: 'C1', synonyms: [['product', 'B1'], ['good', 'B1']] }),

  // Day 2 — Growth & decline
  v('w09-d2-01', 'expand', 2, { partOfSpeech: 'verb', definition: 'To become larger in size, number, or importance.', example: 'The service sector has expanded faster than industry.', synonyms: [['grow', 'B1'], ['enlarge', 'B2']] }),
  v('w09-d2-02', 'contract', 2, { partOfSpeech: 'verb', definition: 'To become smaller or shorter.', example: 'The economy contracted for two consecutive quarters.', synonyms: [['shrink', 'B2'], ['diminish', 'C1']] }),
  v('w09-d2-03', 'recession', 2, { partOfSpeech: 'noun', definition: 'A period of significant economic decline.', example: 'A recession is officially declared after two falling quarters.', register: 'C1', synonyms: [['downturn', 'C1'], ['slump', 'C1']] }),
  v('w09-d2-04', 'recovery', 2, { partOfSpeech: 'noun', definition: 'A return to normal economic activity.', example: 'A jobless recovery is little comfort to the unemployed.', synonyms: [['rebound', 'C1'], ['revival', 'C1']] }),
  v('w09-d2-05', 'inflation', 2, { partOfSpeech: 'noun', definition: 'A general rise in prices over time.', example: 'High inflation erodes savings faster than most can adjust.', register: 'C1', synonyms: [['price rise', 'B2'], ['cost increase', 'B2']] }),
  v('w09-d2-06', 'deflation', 2, { partOfSpeech: 'noun', definition: 'A general fall in prices.', example: 'Sustained deflation makes consumers postpone purchases.', register: 'C1', synonyms: [['price fall', 'B2'], ['decline', 'B2']] }),
  v('w09-d2-07', 'GDP', 2, { partOfSpeech: 'noun', definition: 'Gross Domestic Product, the total value of goods and services produced.', example: 'GDP per head matters more than total GDP for most comparisons.', synonyms: [['national output', 'C1'], ['economic output', 'B2']] }),
  v('w09-d2-08', 'stimulus', 2, { partOfSpeech: 'noun', definition: 'Action by a government to encourage economic activity.', example: 'A targeted stimulus can lift employment quickly.', register: 'C1', synonyms: [['boost', 'B2'], ['injection', 'C1']] }),
  v('w09-d2-09', 'austerity', 2, { partOfSpeech: 'noun', definition: 'Severe limits on government spending.', example: 'A decade of austerity weakened public services.', register: 'C1', synonyms: [['cuts', 'B2'], ['fiscal restraint', 'C1']] }),
  v('w09-d2-10', 'boom', 2, { partOfSpeech: 'noun', definition: 'A period of rapid economic growth.', example: 'A property boom in the capital pushed first-time buyers out.', synonyms: [['surge', 'C1'], ['upswing', 'C1']] }),

  // Day 3 — Labour & employment
  v('w09-d3-01', 'workforce', 3, { partOfSpeech: 'noun', definition: 'The people available for or engaged in work.', example: 'The female workforce has doubled in three decades.', synonyms: [['labour force', 'C1'], ['staff', 'B1']] }),
  v('w09-d3-02', 'employment', 3, { partOfSpeech: 'noun', definition: 'The state of having paid work.', example: 'Full employment is a stated aim of most governments.', synonyms: [['work', 'B1'], ['occupation', 'B2']] }),
  v('w09-d3-03', 'unemployment', 3, { partOfSpeech: 'noun', definition: 'The state of being without paid work.', example: 'Youth unemployment remains stubbornly high in some regions.', synonyms: [['joblessness', 'C1'], ['out of work', 'B2']] }),
  v('w09-d3-04', 'wage', 3, { partOfSpeech: 'noun', definition: 'A regular payment, usually weekly, for work done.', example: 'Real wages have stagnated since the 2008 crisis.', synonyms: [['pay', 'B1'], ['earnings', 'B2']] }),
  v('w09-d3-05', 'minimum wage', 3, { partOfSpeech: 'phrase', definition: 'The lowest hourly pay allowed by law.', example: 'A modest minimum wage rise raised employment, not lowered it.', synonyms: [['wage floor', 'C1'], ['statutory wage', 'C1']] }),
  v('w09-d3-06', 'pension', 3, { partOfSpeech: 'noun', definition: 'A regular payment after retirement.', example: 'Private pensions now cover gaps left by state schemes.', synonyms: [['retirement income', 'B2'], ['superannuation', 'C1']] }),
  v('w09-d3-07', 'labour market', 3, { partOfSpeech: 'phrase', definition: 'The supply and demand for paid work.', example: 'A tight labour market lifts wages even without policy.', register: 'C1', synonyms: [['job market', 'B2'], ['employment market', 'B2']] }),
  v('w09-d3-08', 'gig economy', 3, { partOfSpeech: 'phrase', definition: 'A labour market based on short-term contracts.', example: 'The gig economy offers flexibility but few protections.', register: 'C1', synonyms: [['contract economy', 'C1'], ['platform economy', 'C1']] }),
  v('w09-d3-09', 'redundancy', 3, { partOfSpeech: 'noun', definition: 'Loss of a job because it is no longer required.', example: 'Compulsory redundancy is the last step in most restructurings.', register: 'C1', synonyms: [['lay-off', 'B2'], ['dismissal', 'C1']] }),
  v('w09-d3-10', 'productivity', 3, { partOfSpeech: 'noun', definition: 'The rate at which work is produced.', example: 'Productivity growth has slowed across the rich world.', synonyms: [['efficiency', 'B2'], ['output', 'B2']] }),

  // Day 4 — Money & finance
  v('w09-d4-01', 'currency', 4, { partOfSpeech: 'noun', definition: 'A system of money in general use.', example: 'A reserve currency allows cheaper borrowing abroad.', synonyms: [['money', 'B1'], ['legal tender', 'C1']] }),
  v('w09-d4-02', 'investment', 4, { partOfSpeech: 'noun', definition: 'The act of putting money into something to earn a return.', example: 'Long-term investment in education shows results in a generation.', synonyms: [['outlay', 'C1'], ['stake', 'B2']] }),
  v('w09-d4-03', 'capital', 4, { partOfSpeech: 'noun', definition: 'Wealth used or available to start a business.', example: 'Working capital is what keeps a small business alive.', synonyms: [['funds', 'B2'], ['assets', 'B2']] }),
  v('w09-d4-04', 'profit', 4, { partOfSpeech: 'noun', definition: 'The financial gain from a business activity.', example: 'A small annual profit beats a one-off windfall.', synonyms: [['gain', 'B2'], ['return', 'B2']] }),
  v('w09-d4-05', 'loss', 4, { partOfSpeech: 'noun', definition: 'A financial deficit.', example: 'Two years of losses forced the firm into administration.', synonyms: [['deficit', 'C1'], ['shortfall', 'C1']] }),
  v('w09-d4-06', 'asset', 4, { partOfSpeech: 'noun', definition: 'A useful or valuable thing or person.', example: 'A reliable employee is the firm\'s greatest asset.', synonyms: [['resource', 'B2'], ['holding', 'C1']] }),
  v('w09-d4-07', 'liability', 4, { partOfSpeech: 'noun', definition: 'A financial debt or obligation.', example: 'Pension liabilities now exceed many corporate market values.', register: 'C1', synonyms: [['debt', 'B2'], ['obligation', 'C1']] }),
  v('w09-d4-08', 'debt', 4, { partOfSpeech: 'noun', definition: 'Money owed to others.', example: 'Household debt has risen faster than wages.', synonyms: [['borrowing', 'B2'], ['arrears', 'C1']] }),
  v('w09-d4-09', 'interest rate', 4, { partOfSpeech: 'phrase', definition: 'The cost of borrowing money.', example: 'A small interest-rate rise quietly slows house prices.', synonyms: [['borrowing cost', 'C1'], ['rate', 'B1']] }),
  v('w09-d4-10', 'shareholder', 4, { partOfSpeech: 'noun', definition: 'A person who owns part of a company.', example: 'A shareholder vote blocked the chief executive\'s pay rise.', synonyms: [['stockholder', 'B2'], ['investor', 'B2']] }),

  // Day 5 — Industry & sectors
  v('w09-d5-01', 'industry', 5, { partOfSpeech: 'noun', definition: 'Economic activity in producing goods or services.', example: 'Heavy industry has shrunk; knowledge industry has grown.', synonyms: [['sector', 'B2'], ['business', 'B1']] }),
  v('w09-d5-02', 'sector', 5, { partOfSpeech: 'noun', definition: 'A part of the economy with shared characteristics.', example: 'The service sector now employs three-quarters of the workforce.', synonyms: [['industry', 'B2'], ['branch', 'B2']] }),
  v('w09-d5-03', 'manufacturing', 5, { partOfSpeech: 'noun', definition: 'The production of goods on a large scale.', example: 'Manufacturing has migrated east; services stayed west.', synonyms: [['production', 'B2'], ['fabrication', 'C1']] }),
  v('w09-d5-04', 'agriculture', 5, { partOfSpeech: 'noun', definition: 'The science and practice of farming.', example: 'Modern agriculture employs ten times fewer people than a century ago.', synonyms: [['farming', 'B1'], ['cultivation', 'C1']] }),
  v('w09-d5-05', 'service', 5, { partOfSpeech: 'noun', definition: 'A non-physical activity provided to a customer.', example: 'A small accountancy service can outlast its founders.', synonyms: [['offering', 'B2'], ['provision', 'C1']] }),
  v('w09-d5-06', 'tourism', 5, { partOfSpeech: 'noun', definition: 'The business of providing for travellers.', example: 'Tourism revives quickly but takes the longest to plan.', synonyms: [['travel industry', 'B2'], ['hospitality', 'B2']] }),
  v('w09-d5-07', 'logistics', 5, { partOfSpeech: 'noun', definition: 'The detailed organisation of an operation.', example: 'Modern logistics moves a parcel in fewer days than a letter once took.', register: 'C1', synonyms: [['supply chain', 'C1'], ['operations', 'B2']] }),
  v('w09-d5-08', 'real estate', 5, { partOfSpeech: 'phrase', definition: 'Property in the form of land or buildings.', example: 'Real estate accounts for most household wealth.', synonyms: [['property', 'B2'], ['landed assets', 'C1']] }),
  v('w09-d5-09', 'retail', 5, { partOfSpeech: 'noun', definition: 'The sale of goods to the public.', example: 'Online retail eats into high-street margins year after year.', synonyms: [['selling', 'B1'], ['commerce', 'C1']] }),
  v('w09-d5-10', 'wholesale', 5, { partOfSpeech: 'noun', definition: 'The sale of goods in large quantities to retailers.', example: 'A wholesale market still shapes prices for small grocers.', register: 'C1', synonyms: [['bulk supply', 'C1'], ['distribution', 'B2']] }),

  // Day 6 — Business
  v('w09-d6-01', 'enterprise', 6, { partOfSpeech: 'noun', definition: 'A business or company, especially one founded by an entrepreneur.', example: 'A small enterprise can outpace a large one in agility.', synonyms: [['venture', 'C1'], ['firm', 'B2']] }),
  v('w09-d6-02', 'entrepreneur', 6, { partOfSpeech: 'noun', definition: 'A person who starts a business and takes financial risks.', example: 'A first-time entrepreneur fails more often than they succeed.', synonyms: [['founder', 'B2'], ['businessperson', 'B1']] }),
  v('w09-d6-03', 'venture', 6, { partOfSpeech: 'noun', definition: 'A risky business undertaking.', example: 'A joint venture spread the cost of entering a new market.', register: 'C1', synonyms: [['enterprise', 'C1'], ['undertaking', 'C1']] }),
  v('w09-d6-04', 'startup', 6, { partOfSpeech: 'noun', definition: 'A newly established business.', example: 'A startup outgrows its founders within five years if it succeeds.', synonyms: [['new business', 'B2'], ['young company', 'B2']] }),
  v('w09-d6-05', 'merger', 6, { partOfSpeech: 'noun', definition: 'The combining of two companies into one.', example: 'A merger of equals usually has a clear winner within a year.', register: 'C1', synonyms: [['amalgamation', 'C1'], ['consolidation', 'C1']] }),
  v('w09-d6-06', 'acquisition', 6, { partOfSpeech: 'noun', definition: 'The purchase of one company by another.', example: 'A friendly acquisition is rare in competitive industries.', register: 'C1', synonyms: [['takeover', 'B2'], ['purchase', 'B1']] }),
  v('w09-d6-07', 'monopoly', 6, { partOfSpeech: 'noun', definition: 'Exclusive control of a supply or trade.', example: 'A monopoly raises prices and slows innovation.', register: 'C1', synonyms: [['exclusive control', 'B2'], ['stranglehold', 'C1']] }),
  v('w09-d6-08', 'competition', 6, { partOfSpeech: 'noun', definition: 'Rivalry between firms for customers.', example: 'Real competition keeps quality high and prices honest.', synonyms: [['rivalry', 'B2'], ['contest', 'B1']] }),
  v('w09-d6-09', 'profitable', 6, { partOfSpeech: 'adjective', definition: 'Yielding financial profit.', example: 'A profitable second year is the test of a startup\'s model.', synonyms: [['lucrative', 'C1'], ['successful', 'B1']] }),
  v('w09-d6-10', 'overhead', 6, { partOfSpeech: 'noun', definition: 'A cost not directly tied to production.', example: 'Lower overheads helped the small firm undercut the big one.', register: 'C1', synonyms: [['running cost', 'B2'], ['fixed cost', 'C1']] }),

  // Day 7 — Macro forces
  v('w09-d7-01', 'globalisation', 7, { partOfSpeech: 'noun', definition: 'The spread of business and culture worldwide.', example: 'Globalisation lowered prices at the cost of regional jobs.', register: 'C1', synonyms: [['internationalisation', 'C1'], ['integration', 'C1']] }),
  v('w09-d7-02', 'outsource', 7, { partOfSpeech: 'verb', definition: 'To arrange for work to be done outside the company.', example: 'Many firms outsource customer service to lower-cost regions.', register: 'C1', synonyms: [['contract out', 'B2'], ['delegate', 'B2']] }),
  v('w09-d7-03', 'offshoring', 7, { partOfSpeech: 'noun', definition: 'Moving operations to another country.', example: 'A wave of offshoring in the 2000s reshaped industrial regions.', register: 'C1', synonyms: [['relocation', 'B2'], ['outsourcing abroad', 'C1']] }),
  v('w09-d7-04', 'trade deficit', 7, { partOfSpeech: 'phrase', definition: 'When imports exceed exports in value.', example: 'A persistent trade deficit pressures the currency.', register: 'C1', synonyms: [['negative balance', 'C1'], ['import gap', 'C1']] }),
  v('w09-d7-05', 'trade surplus', 7, { partOfSpeech: 'phrase', definition: 'When exports exceed imports in value.', example: 'A trade surplus funded years of public investment.', register: 'C1', synonyms: [['positive balance', 'C1'], ['export gain', 'C1']] }),
  v('w09-d7-06', 'sanctions', 7, { partOfSpeech: 'noun', definition: 'Penalties imposed by one country on another.', example: 'Sanctions take longer to bite than headlines suggest.', register: 'C1', synonyms: [['penalties', 'B2'], ['restrictions', 'B2']] }),
  v('w09-d7-07', 'subsidy', 7, { partOfSpeech: 'noun', definition: 'Government money to support an industry or activity.', example: 'A small subsidy made electric vehicles competitive.', synonyms: [['grant', 'B2'], ['financial aid', 'B2']] }),
  v('w09-d7-08', 'regulation', 7, { partOfSpeech: 'noun', definition: 'A rule made by an authority.', example: 'Smart regulation supports innovation without stifling it.', synonyms: [['rule', 'B1'], ['ordinance', 'C1']] }),
  v('w09-d7-09', 'deregulation', 7, { partOfSpeech: 'noun', definition: 'The removal of regulations from an industry.', example: 'Airline deregulation lowered fares and concentrated routes.', register: 'C1', synonyms: [['liberalisation', 'C1'], ['easing', 'B2']] }),
  v('w09-d7-10', 'sovereign debt', 7, { partOfSpeech: 'phrase', definition: 'Debt owed by a national government.', example: 'A sovereign debt crisis can spread across a region in months.', register: 'C1', synonyms: [['national debt', 'B2'], ['public borrowing', 'C1']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'economy', frequency: input.frequency ?? 'medium', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 9, day }
}

export const INTERMEDIATE_VOCAB_WEEK_09: VocabularyLexiconItem[] = items
