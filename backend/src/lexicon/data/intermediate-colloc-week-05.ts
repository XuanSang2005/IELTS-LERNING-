import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 05 · Environmental chunks. 49 items, 7/day. Carbon footprint, renewable energy, biodiversity loss — the C1 environmental pairings. */

const items: CollocationLexiconItem[] = [
  // Day 1
  c('w05-d1-01', 'carbon emissions', 1, 'noun-noun', 'release of carbon-containing gases', 'Cutting carbon emissions has moved from optional to mandatory.', ['greenhouse gases', 'CO2 output']),
  c('w05-d1-02', 'global warming', 1, 'adjective-noun', 'gradual rise in average global temperatures', 'Global warming is now measured in fractions of a degree.', ['climate heating', 'planetary warming']),
  c('w05-d1-03', 'rising sea levels', 1, 'verb-noun', 'increase in oceanic height', 'Rising sea levels threaten coastal cities first.', ['oceanic rise', 'water level rise']),
  c('w05-d1-04', 'extreme weather', 1, 'adjective-noun', 'unusually severe weather events', 'Extreme weather events have doubled in frequency.', ['severe weather', 'volatile climate']),
  c('w05-d1-05', 'climate crisis', 1, 'noun-noun', 'urgent and dangerous global warming situation', 'The climate crisis demands action across every sector.', ['climate emergency', 'global emergency']),
  c('w05-d1-06', 'environmental impact', 1, 'adjective-noun', 'effect on the natural world', 'Every infrastructure project requires an environmental impact assessment.', ['ecological effect', 'environmental footprint']),
  c('w05-d1-07', 'natural disaster', 1, 'adjective-noun', 'catastrophic event caused by nature', 'A major natural disaster strikes the region every five years on average.', ['catastrophe', 'calamity']),

  // Day 2
  c('w05-d2-01', 'renewable energy', 2, 'adjective-noun', 'energy from inexhaustible sources', 'Renewable energy now provides a third of the country\'s electricity.', ['clean energy', 'sustainable power']),
  c('w05-d2-02', 'fossil fuels', 2, 'adjective-noun', 'energy sources from ancient organisms', 'Reducing fossil fuel use is a generational task.', ['hydrocarbons', 'non-renewable fuels']),
  c('w05-d2-03', 'solar power', 2, 'adjective-noun', 'electricity generated from sunlight', 'Solar power is now the cheapest new energy source.', ['photovoltaic energy', 'sun-derived power']),
  c('w05-d2-04', 'wind farm', 2, 'noun-noun', 'group of wind turbines for generating power', 'A new offshore wind farm powers half a million homes.', ['wind power station', 'turbine array']),
  c('w05-d2-05', 'energy consumption', 2, 'noun-noun', 'amount of energy used', 'Reducing household energy consumption starts with insulation.', ['power use', 'electricity usage']),
  c('w05-d2-06', 'energy efficient', 2, 'noun-adjective', 'using less energy for the same task', 'Energy-efficient appliances pay for themselves within five years.', ['low-consumption', 'power-saving']),
  c('w05-d2-07', 'reduce emissions', 2, 'verb-noun', 'lower the release of harmful gases', 'Reducing emissions requires both personal and structural change.', ['cut pollution', 'lower output']),

  // Day 3
  c('w05-d3-01', 'environmental protection', 3, 'adjective-noun', 'safeguarding of natural resources', 'Environmental protection laws have strengthened over the decades.', ['ecological safeguarding', 'nature conservation']),
  c('w05-d3-02', 'wildlife conservation', 3, 'noun-noun', 'protection of wild animals and plants', 'Wildlife conservation funding has tripled in twenty years.', ['nature preservation', 'species protection']),
  c('w05-d3-03', 'biodiversity loss', 3, 'noun-noun', 'reduction in the variety of species', 'Biodiversity loss is the slow companion of climate change.', ['species decline', 'ecological degradation']),
  c('w05-d3-04', 'endangered species', 3, 'adjective-noun', 'animals or plants at risk of extinction', 'A list of endangered species grows each year.', ['threatened species', 'at-risk wildlife']),
  c('w05-d3-05', 'natural habitat', 3, 'adjective-noun', 'environment where a species lives naturally', 'Natural habitat loss drives most extinction.', ['ecosystem', 'natural environment']),
  c('w05-d3-06', 'preserve nature', 3, 'verb-noun', 'protect natural environments', 'Preserving nature requires patient, decade-long work.', ['protect the environment', 'safeguard nature']),
  c('w05-d3-07', 'protect ecosystems', 3, 'verb-noun', 'safeguard interconnected biological communities', 'Protecting ecosystems matters more than saving single species.', ['preserve ecosystems', 'maintain habitats']),

  // Day 4
  c('w05-d4-01', 'recycle waste', 4, 'verb-noun', 'process waste into reusable materials', 'Recycling waste at home reduces landfill significantly.', ['reprocess', 'reclaim']),
  c('w05-d4-02', 'reduce waste', 4, 'verb-noun', 'lower the amount of waste produced', 'Reducing waste is more effective than recycling it.', ['minimise rubbish', 'cut refuse']),
  c('w05-d4-03', 'waste management', 4, 'noun-noun', 'collection and disposal of waste', 'Modern waste management starts with prevention.', ['refuse handling', 'rubbish disposal']),
  c('w05-d4-04', 'plastic pollution', 4, 'noun-noun', 'accumulation of plastic waste in the environment', 'Plastic pollution has reached the deepest ocean trenches.', ['plastic contamination', 'plastic waste crisis']),
  c('w05-d4-05', 'single-use plastic', 4, 'adjective-noun', 'plastic items used once and discarded', 'Bans on single-use plastic have spread across dozens of countries.', ['disposable plastic', 'one-time plastic']),
  c('w05-d4-06', 'biodegradable material', 4, 'adjective-noun', 'substance that breaks down naturally', 'Biodegradable materials still need composting conditions to decompose.', ['compostable material', 'degradable substance']),
  c('w05-d4-07', 'dispose of', 4, 'verb-preposition', 'get rid of waste properly', 'Hospitals must dispose of medical waste with great care.', ['get rid of', 'discard']),

  // Day 5
  c('w05-d5-01', 'air quality', 5, 'noun-noun', 'measure of how clean the air is', 'Urban air quality has improved in some cities but worsened in others.', ['atmospheric quality', 'air condition']),
  c('w05-d5-02', 'air pollution', 5, 'noun-noun', 'contamination of the atmosphere', 'Air pollution shortens life expectancy in many cities.', ['atmospheric contamination', 'smog']),
  c('w05-d5-03', 'water pollution', 5, 'noun-noun', 'contamination of water bodies', 'Industrial water pollution killed the river\'s fish for decades.', ['water contamination', 'aquatic pollution']),
  c('w05-d5-04', 'noise pollution', 5, 'noun-noun', 'excessive disturbing noise', 'Noise pollution near airports lowers nearby property values.', ['acoustic disturbance', 'sound nuisance']),
  c('w05-d5-05', 'soil erosion', 5, 'noun-noun', 'wearing away of topsoil', 'Soil erosion has accelerated since intensive farming began.', ['land degradation', 'topsoil loss']),
  c('w05-d5-06', 'deforestation rate', 5, 'noun-noun', 'speed at which forests are cleared', 'The deforestation rate has slowed but not stopped.', ['forest loss', 'tree-clearance rate']),
  c('w05-d5-07', 'environmental damage', 5, 'adjective-noun', 'harm to the natural world', 'Environmental damage often takes generations to repair.', ['ecological harm', 'nature damage']),

  // Day 6
  c('w05-d6-01', 'sustainable living', 6, 'adjective-noun', 'lifestyle minimising environmental impact', 'Sustainable living begins with small daily choices.', ['eco-friendly lifestyle', 'green living']),
  c('w05-d6-02', 'eco-friendly product', 6, 'adjective-noun', 'product designed to be environmentally safe', 'Eco-friendly products cost more but last longer.', ['green product', 'sustainable product']),
  c('w05-d6-03', 'green technology', 6, 'adjective-noun', 'technology designed to protect the environment', 'Green technology attracts the largest share of new investment.', ['cleantech', 'sustainable tech']),
  c('w05-d6-04', 'organic farming', 6, 'adjective-noun', 'farming without synthetic chemicals', 'Organic farming uses crop rotation rather than synthetic inputs.', ['natural farming', 'chemical-free agriculture']),
  c('w05-d6-05', 'environmental awareness', 6, 'adjective-noun', 'understanding of environmental issues', 'Environmental awareness has risen most among younger voters.', ['ecological consciousness', 'green awareness']),
  c('w05-d6-06', 'raise awareness', 6, 'verb-noun', 'increase public knowledge of an issue', 'A short campaign raised awareness across all age groups.', ['promote understanding', 'educate']),
  c('w05-d6-07', 'live sustainably', 6, 'verb-adverb', 'lead a life with low environmental impact', 'It is easier to live sustainably in a city with public transport.', ['live ecologically', 'live greenly']),

  // Day 7
  c('w05-d7-01', 'climate action', 7, 'noun-noun', 'measures to address climate change', 'Climate action requires both technology and policy.', ['climate response', 'environmental action']),
  c('w05-d7-02', 'tackle climate change', 7, 'verb-noun', 'address the problem of climate change', 'Tackling climate change requires global cooperation.', ['address climate change', 'combat global warming']),
  c('w05-d7-03', 'environmental policy', 7, 'adjective-noun', 'government plan for environmental protection', 'A coherent environmental policy outlasts any single administration.', ['ecological policy', 'green policy']),
  c('w05-d7-04', 'carbon footprint', 7, 'noun-noun', 'measure of greenhouse gas emissions caused by an activity', 'Each plane journey adds significantly to a carbon footprint.', ['emissions impact', 'climate footprint']),
  c('w05-d7-05', 'reduce carbon footprint', 7, 'verb-noun', 'lower personal or organisational emissions', 'Reducing your carbon footprint starts with diet and transport.', ['lower emissions', 'cut climate impact']),
  c('w05-d7-06', 'protect the planet', 7, 'verb-noun', 'safeguard Earth from harm', 'Protecting the planet is the framing argument of our generation.', ['save the earth', 'preserve nature']),
  c('w05-d7-07', 'go green', 7, 'verb', 'adopt environmentally friendly practices', 'Going green need not be expensive at the household level.', ['become eco-friendly', 'turn green']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'environment', alternatives, level: 'intermediate', week: 5, day }
}

export const INTERMEDIATE_COLLOC_WEEK_05: CollocationLexiconItem[] = items
