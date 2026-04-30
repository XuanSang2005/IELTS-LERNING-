import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 05 · Environment. 70 items, 10/day across 7 days. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — Climate & weather
  v('w05-d1-01', 'climate', 1, { partOfSpeech: 'noun', definition: 'The general weather conditions in an area over a long period.', example: 'Vietnam\'s tropical climate shapes its agriculture.', synonyms: [['weather pattern', 'B2'], ['atmospheric conditions', 'C1']] }),
  v('w05-d1-02', 'temperature', 1, { partOfSpeech: 'noun', definition: 'How hot or cold something is.', example: 'Average temperatures have risen sharply over the past century.', synonyms: [['warmth', 'B1'], ['heat level', 'B2']] }),
  v('w05-d1-03', 'precipitation', 1, { partOfSpeech: 'noun', definition: 'Rain, snow, or other forms of water falling from the sky.', example: 'Annual precipitation has declined in many southern regions.', synonyms: [['rainfall', 'B2'], ['snowfall', 'B2']] }),
  v('w05-d1-04', 'drought', 1, { partOfSpeech: 'noun', definition: 'A long period without rain.', example: 'A three-year drought devastated cattle farms in the region.', synonyms: [['dry spell', 'B2'], ['arid period', 'C1']] }),
  v('w05-d1-05', 'flood', 1, { partOfSpeech: 'noun', definition: 'A large amount of water covering land that is usually dry.', example: 'Annual floods are now ten times more destructive than they were a century ago.', synonyms: [['deluge', 'C1'], ['inundation', 'C1']] }),
  v('w05-d1-06', 'humidity', 1, { partOfSpeech: 'noun', definition: 'The amount of water in the air.', example: 'High humidity makes thirty degrees feel like forty.', synonyms: [['dampness', 'B2'], ['moisture', 'B2']] }),
  v('w05-d1-07', 'arid', 1, { partOfSpeech: 'adjective', definition: 'Very dry because of low rainfall.', example: 'Arid regions are spreading northward each decade.', synonyms: [['dry', 'B1'], ['parched', 'C1']] }),
  v('w05-d1-08', 'tropical', 1, { partOfSpeech: 'adjective', definition: 'Of or relating to hot, wet regions near the equator.', example: 'Tropical storms have grown more frequent and severe.', synonyms: [['equatorial', 'C1'], ['humid', 'B2']] }),
  v('w05-d1-09', 'temperate', 1, { partOfSpeech: 'adjective', definition: 'Of climate that is mild, neither very hot nor very cold.', example: 'Most of Europe enjoys a temperate maritime climate.', synonyms: [['mild', 'B1'], ['moderate', 'B2']] }),
  v('w05-d1-10', 'volatile', 1, { partOfSpeech: 'adjective', definition: 'Likely to change suddenly and unpredictably.', example: 'Mountain weather is famously volatile in spring.', synonyms: [['unstable', 'B2'], ['unpredictable', 'B2']] }),

  // Day 2 — Pollution
  v('w05-d2-01', 'pollution', 2, { partOfSpeech: 'noun', definition: 'The presence of harmful substances in the environment.', example: 'Air pollution shortens life expectancy in major Asian cities.', synonyms: [['contamination', 'C1'], ['toxicity', 'C1']] }),
  v('w05-d2-02', 'contaminate', 2, { partOfSpeech: 'verb', definition: 'To make something dirty or harmful by adding pollution.', example: 'Industrial waste has contaminated the river for kilometres.', synonyms: [['pollute', 'B2'], ['taint', 'C1']] }),
  v('w05-d2-03', 'emissions', 2, { partOfSpeech: 'noun', definition: 'Substances released into the atmosphere.', example: 'Carbon emissions from transport account for a quarter of the total.', synonyms: [['discharge', 'C1'], ['release', 'B2']] }),
  v('w05-d2-04', 'toxic', 2, { partOfSpeech: 'adjective', definition: 'Poisonous; capable of causing harm or death.', example: 'Toxic runoff from the factory killed fish for ten kilometres downstream.', synonyms: [['poisonous', 'B2'], ['noxious', 'C1']] }),
  v('w05-d2-05', 'smog', 2, { partOfSpeech: 'noun', definition: 'A mixture of fog and smoke, usually in cities.', example: 'Winter smog forced schools to close for three days.', synonyms: [['haze', 'B2'], ['atmospheric pollution', 'C1']] }),
  v('w05-d2-06', 'particulate', 2, { partOfSpeech: 'noun', definition: 'A very small piece of solid matter in the air.', example: 'Fine particulates cause more deaths than road accidents in some cities.', synonyms: [['particle', 'B2'], ['fine matter', 'C1']] }),
  v('w05-d2-07', 'effluent', 2, { partOfSpeech: 'noun', definition: 'Liquid waste discharged into a river or sea.', example: 'The treatment plant filters effluent before it reaches the bay.', synonyms: [['wastewater', 'C1'], ['discharge', 'C1']] }),
  v('w05-d2-08', 'sewage', 2, { partOfSpeech: 'noun', definition: 'Liquid and solid waste carried away in drains.', example: 'Untreated sewage entering the ocean is a public health emergency.', synonyms: [['wastewater', 'B2'], ['effluent', 'C1']] }),
  v('w05-d2-09', 'noise pollution', 2, { partOfSpeech: 'phrase', definition: 'Excessive noise that disturbs human and animal life.', example: 'Noise pollution near airports lowers nearby property values.', synonyms: [['acoustic disturbance', 'C1'], ['sound nuisance', 'C1']] }),
  v('w05-d2-10', 'litter', 2, { partOfSpeech: 'noun', definition: 'Rubbish left lying in public places.', example: 'A city reduced its litter by half after fines were enforced.', synonyms: [['rubbish', 'B1'], ['refuse', 'C1']] }),

  // Day 3 — Conservation
  v('w05-d3-01', 'conservation', 3, { partOfSpeech: 'noun', definition: 'The protection of natural environments and species.', example: 'Conservation requires patient, decade-long thinking.', synonyms: [['preservation', 'B2'], ['protection', 'B1']] }),
  v('w05-d3-02', 'preserve', 3, { partOfSpeech: 'verb', definition: 'To keep something in its original or existing state.', example: 'A national park preserves both the species and the soundscape.', synonyms: [['protect', 'B1'], ['conserve', 'B2']] }),
  v('w05-d3-03', 'sanctuary', 3, { partOfSpeech: 'noun', definition: 'A place where birds or animals are protected.', example: 'The bird sanctuary attracts thousands of migrating species.', synonyms: [['reserve', 'B2'], ['refuge', 'C1']] }),
  v('w05-d3-04', 'biodiversity', 3, { partOfSpeech: 'noun', definition: 'The variety of plant and animal life in an area.', example: 'High biodiversity makes an ecosystem more resistant to shocks.', synonyms: [['variety of life', 'B2'], ['ecological diversity', 'C1']] }),
  v('w05-d3-05', 'ecosystem', 3, { partOfSpeech: 'noun', definition: 'A community of plants and animals interacting with their environment.', example: 'A coral ecosystem can take centuries to recover from bleaching.', synonyms: [['biome', 'C1'], ['ecological community', 'C1']] }),
  v('w05-d3-06', 'habitat', 3, { partOfSpeech: 'noun', definition: 'The natural home of a plant or animal.', example: 'Habitat loss is the leading cause of extinction.', synonyms: [['environment', 'B2'], ['natural setting', 'B2']] }),
  v('w05-d3-07', 'endangered', 3, { partOfSpeech: 'adjective', definition: 'At risk of becoming extinct.', example: 'The Asian elephant remains endangered despite forty years of effort.', synonyms: [['threatened', 'B2'], ['vulnerable', 'C1']] }),
  v('w05-d3-08', 'extinction', 3, { partOfSpeech: 'noun', definition: 'The state of a species no longer existing.', example: 'A million species face extinction within decades.', synonyms: [['dying out', 'B2'], ['eradication', 'C1']] }),
  v('w05-d3-09', 'rewild', 3, { partOfSpeech: 'verb', definition: 'To return land to its natural wild state.', example: 'A scheme to rewild abandoned farmland has restored beavers to the valley.', synonyms: [['restore', 'B2'], ['regenerate', 'C1']] }),
  v('w05-d3-10', 'reforestation', 3, { partOfSpeech: 'noun', definition: 'The replanting of forests in cleared areas.', example: 'Reforestation projects must use native species to succeed.', synonyms: [['afforestation', 'C1'], ['tree planting', 'B2']] }),

  // Day 4 — Energy
  v('w05-d4-01', 'renewable', 4, { partOfSpeech: 'adjective', definition: 'Capable of being replaced naturally over time.', example: 'Renewable energy now generates a third of the country\'s electricity.', synonyms: [['sustainable', 'B2'], ['inexhaustible', 'C1']] }),
  v('w05-d4-02', 'fossil fuel', 4, { partOfSpeech: 'phrase', definition: 'A fuel formed from the remains of ancient organisms.', example: 'Reducing dependence on fossil fuels is a generational task.', synonyms: [['hydrocarbons', 'C1'], ['non-renewable fuel', 'C1']] }),
  v('w05-d4-03', 'solar', 4, { partOfSpeech: 'adjective', definition: 'Relating to or using energy from the sun.', example: 'Solar panels have fallen sharply in price.', synonyms: [['photovoltaic', 'C1'], ['sun-powered', 'B2']] }),
  v('w05-d4-04', 'wind power', 4, { partOfSpeech: 'phrase', definition: 'Energy generated by wind turbines.', example: 'Offshore wind power supplies a tenth of the national grid.', synonyms: [['wind energy', 'B2'], ['turbine power', 'C1']] }),
  v('w05-d4-05', 'hydroelectric', 4, { partOfSpeech: 'adjective', definition: 'Producing electricity from the energy of moving water.', example: 'Hydroelectric dams provide cheap power but disrupt rivers.', synonyms: [['hydropower', 'C1'], ['water-driven', 'B2']] }),
  v('w05-d4-06', 'nuclear', 4, { partOfSpeech: 'adjective', definition: 'Using energy released by atomic reactions.', example: 'Nuclear power is low-carbon but politically divisive.', synonyms: [['atomic', 'C1'], ['fission-based', 'C1']] }),
  v('w05-d4-07', 'biomass', 4, { partOfSpeech: 'noun', definition: 'Plant or animal material used as fuel.', example: 'Biomass plants burn agricultural waste to generate heat.', synonyms: [['organic matter', 'C1'], ['biofuel', 'C1']] }),
  v('w05-d4-08', 'carbon footprint', 4, { partOfSpeech: 'phrase', definition: 'The amount of carbon dioxide an activity produces.', example: 'Each plane journey adds significantly to a person\'s carbon footprint.', synonyms: [['emissions impact', 'C1'], ['climate impact', 'C1']] }),
  v('w05-d4-09', 'energy-efficient', 4, { partOfSpeech: 'adjective', definition: 'Using less energy to do the same work.', example: 'Energy-efficient appliances pay for themselves within five years.', synonyms: [['low-consumption', 'C1'], ['conservation-grade', 'C1']] }),
  v('w05-d4-10', 'grid', 4, { partOfSpeech: 'noun', definition: 'A network for distributing electricity.', example: 'A modern grid handles supply from many small sources.', synonyms: [['power network', 'B2'], ['electricity system', 'B2']] }),

  // Day 5 — Waste & recycling
  v('w05-d5-01', 'landfill', 5, { partOfSpeech: 'noun', definition: 'A place where rubbish is buried under layers of earth.', example: 'Landfills produce methane decades after closing.', synonyms: [['dump', 'B2'], ['waste site', 'C1']] }),
  v('w05-d5-02', 'recycle', 5, { partOfSpeech: 'verb', definition: 'To process used materials so they can be used again.', example: 'Most paper can be recycled five to seven times.', synonyms: [['reuse', 'B2'], ['reprocess', 'C1']] }),
  v('w05-d5-03', 'compost', 5, { partOfSpeech: 'verb', definition: 'To allow organic matter to decay for use as fertiliser.', example: 'Householders who compost reduce their bin weight by a third.', synonyms: [['decompose', 'C1'], ['biodegrade', 'C1']] }),
  v('w05-d5-04', 'biodegradable', 5, { partOfSpeech: 'adjective', definition: 'Able to be broken down naturally by bacteria.', example: 'Biodegradable cups still need composting; they do not vanish in landfill.', synonyms: [['compostable', 'C1'], ['decomposable', 'C1']] }),
  v('w05-d5-05', 'single-use', 5, { partOfSpeech: 'adjective', definition: 'Designed to be used once and then thrown away.', example: 'Single-use plastics now face bans in dozens of countries.', synonyms: [['disposable', 'B2'], ['throwaway', 'B2']] }),
  v('w05-d5-06', 'plastic', 5, { partOfSpeech: 'noun', definition: 'A synthetic material made from petroleum.', example: 'Microscopic plastic particles have been found in human blood.', synonyms: [['polymer', 'C1'], ['synthetic', 'C1']] }),
  v('w05-d5-07', 'pollutant', 5, { partOfSpeech: 'noun', definition: 'A substance that causes pollution.', example: 'Several pollutants have been linked to childhood asthma.', synonyms: [['contaminant', 'C1'], ['toxin', 'C1']] }),
  v('w05-d5-08', 'circular economy', 5, { partOfSpeech: 'phrase', definition: 'An economy in which materials are kept in use as long as possible.', example: 'A circular economy treats waste as a design failure.', synonyms: [['closed-loop economy', 'C1'], ['regenerative economy', 'C1']] }),
  v('w05-d5-09', 'reuse', 5, { partOfSpeech: 'verb', definition: 'To use something again rather than throwing it away.', example: 'Reusing glass jars saves both money and material.', synonyms: [['repurpose', 'C1'], ['recycle', 'B2']] }),
  v('w05-d5-10', 'incinerate', 5, { partOfSpeech: 'verb', definition: 'To destroy something completely by burning.', example: 'Some cities incinerate non-recyclable waste to generate heat.', synonyms: [['burn', 'B1'], ['cremate', 'C1']] }),

  // Day 6 — Climate change
  v('w05-d6-01', 'global warming', 6, { partOfSpeech: 'phrase', definition: 'The gradual rise in global temperatures.', example: 'Global warming is now measured in fractions of a degree.', synonyms: [['climate heating', 'C1'], ['planetary warming', 'C1']] }),
  v('w05-d6-02', 'greenhouse gas', 6, { partOfSpeech: 'phrase', definition: 'A gas that traps heat in the atmosphere.', example: 'Methane is a more potent greenhouse gas than carbon dioxide in the short term.', synonyms: [['climate-warming gas', 'C1'], ['atmospheric pollutant', 'C1']] }),
  v('w05-d6-03', 'sea level rise', 6, { partOfSpeech: 'phrase', definition: 'The increase in the height of the world\'s oceans.', example: 'Sea level rise threatens forty per cent of the world\'s population.', synonyms: [['oceanic rise', 'C1'], ['rising waters', 'B2']] }),
  v('w05-d6-04', 'mitigation', 6, { partOfSpeech: 'noun', definition: 'Action to reduce the severity of something.', example: 'Mitigation measures must run in parallel with adaptation.', synonyms: [['reduction', 'B2'], ['alleviation', 'C1']] }),
  v('w05-d6-05', 'adaptation', 6, { partOfSpeech: 'noun', definition: 'A change that allows survival in new conditions.', example: 'Coastal cities are investing in adaptation against flooding.', synonyms: [['adjustment', 'B2'], ['acclimatisation', 'C1']] }),
  v('w05-d6-06', 'carbon neutral', 6, { partOfSpeech: 'phrase', definition: 'Producing no net carbon emissions overall.', example: 'The university aims to be carbon neutral by 2035.', synonyms: [['net zero', 'C1'], ['emission-balanced', 'C1']] }),
  v('w05-d6-07', 'offset', 6, { partOfSpeech: 'verb', definition: 'To balance the negative effects of something with positive ones.', example: 'Travellers can offset their flight emissions by funding tree planting.', synonyms: [['counterbalance', 'C1'], ['compensate', 'B2']] }),
  v('w05-d6-08', 'decarbonise', 6, { partOfSpeech: 'verb', definition: 'To stop or reduce the production of carbon emissions.', example: 'Decarbonising heavy industry is the hardest part of the transition.', synonyms: [['decarbonate', 'C1'], ['cut emissions', 'B2']] }),
  v('w05-d6-09', 'tipping point', 6, { partOfSpeech: 'phrase', definition: 'A moment when a small change causes a much larger one.', example: 'Several climate tipping points may already have been crossed.', synonyms: [['threshold', 'C1'], ['critical point', 'C1']] }),
  v('w05-d6-10', 'IPCC', 6, { partOfSpeech: 'noun', definition: 'The Intergovernmental Panel on Climate Change.', example: 'The IPCC report is updated every six to seven years.', synonyms: [['climate panel', 'B2'], ['UN climate body', 'B2']] }),

  // Day 7 — Sustainability
  v('w05-d7-01', 'sustainable', 7, { partOfSpeech: 'adjective', definition: 'Able to be maintained without damaging the future.', example: 'Sustainable fishing quotas allow stocks to recover.', synonyms: [['enduring', 'C1'], ['viable', 'C1']] }),
  v('w05-d7-02', 'sustainability', 7, { partOfSpeech: 'noun', definition: 'The quality of being sustainable.', example: 'Sustainability is now a board-level concern in most large firms.', synonyms: [['durability', 'C1'], ['endurance', 'C1']] }),
  v('w05-d7-03', 'eco-friendly', 7, { partOfSpeech: 'adjective', definition: 'Not harmful to the environment.', example: 'Eco-friendly packaging adds five per cent to the cost.', synonyms: [['green', 'B1'], ['environmentally sound', 'C1']] }),
  v('w05-d7-04', 'organic', 7, { partOfSpeech: 'adjective', definition: 'Produced without chemical fertilisers or pesticides.', example: 'Organic farming uses crop rotation rather than synthetic inputs.', synonyms: [['natural', 'B1'], ['chemical-free', 'B2']] }),
  v('w05-d7-05', 'green', 7, { partOfSpeech: 'adjective', definition: 'Concerned with protecting the environment.', example: 'Green policies have moved from the fringe to the mainstream.', synonyms: [['eco-friendly', 'B2'], ['sustainable', 'B2']] }),
  v('w05-d7-06', 'footprint', 7, { partOfSpeech: 'noun', definition: 'The effect of an activity on the environment.', example: 'A vegetarian diet shrinks one\'s ecological footprint significantly.', synonyms: [['impact', 'B2'], ['effect', 'B1']] }),
  v('w05-d7-07', 'finite', 7, { partOfSpeech: 'adjective', definition: 'Having a limited amount or extent.', example: 'Lithium and cobalt are finite resources for batteries.', synonyms: [['limited', 'B2'], ['exhaustible', 'C1']] }),
  v('w05-d7-08', 'depletion', 7, { partOfSpeech: 'noun', definition: 'The reduction or exhaustion of resources.', example: 'Aquifer depletion is invisible until wells run dry.', synonyms: [['exhaustion', 'C1'], ['reduction', 'B2']] }),
  v('w05-d7-09', 'self-sufficient', 7, { partOfSpeech: 'adjective', definition: 'Able to provide for one\'s own needs.', example: 'A self-sufficient eco-village produces most of its own food.', synonyms: [['independent', 'B2'], ['autarkic', 'C1']] }),
  v('w05-d7-10', 'stewardship', 7, { partOfSpeech: 'noun', definition: 'Responsible management of something entrusted to one\'s care.', example: 'Land stewardship across generations defines the best farming traditions.', synonyms: [['guardianship', 'C1'], ['care', 'B1']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'environment', frequency: input.frequency ?? 'high', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 5, day }
}

export const INTERMEDIATE_VOCAB_WEEK_05: VocabularyLexiconItem[] = items
