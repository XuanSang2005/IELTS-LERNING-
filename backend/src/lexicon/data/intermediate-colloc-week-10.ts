import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 10 · Cultural chunks. 49 items, 7/day. Cultural heritage, artistic expression, creative freedom. */

const items: CollocationLexiconItem[] = [
  c('w10-d1-01', 'cultural heritage', 1, 'adjective-noun', 'inherited cultural traditions and objects', 'Cultural heritage is fragile and rarely fully insurable.', ['cultural legacy', 'cultural patrimony']),
  c('w10-d1-02', 'cultural identity', 1, 'adjective-noun', 'sense of belonging to a culture', 'Migration shapes a cultural identity rather than erasing it.', ['cultural belonging', 'national character']),
  c('w10-d1-03', 'cultural diversity', 1, 'adjective-noun', 'variety of cultural traditions', 'Cultural diversity is a strength when institutions support it.', ['multiculturalism', 'cultural plurality']),
  c('w10-d1-04', 'cultural tradition', 1, 'adjective-noun', 'long-established cultural practice', 'A cultural tradition survives by being slightly reinvented.', ['cultural custom', 'cultural practice']),
  c('w10-d1-05', 'cultural exchange', 1, 'adjective-noun', 'sharing of culture between groups', 'A residency programme is a small but real cultural exchange.', ['cultural sharing', 'exchange programme']),
  c('w10-d1-06', 'preserve heritage', 1, 'verb-noun', 'protect cultural inheritance', 'Local groups preserve heritage that universities study only later.', ['protect tradition', 'safeguard heritage']),
  c('w10-d1-07', 'celebrate diversity', 1, 'verb-noun', 'honour the variety of cultures', 'A festival celebrates diversity through food and music.', ['honour difference', 'embrace plurality']),

  c('w10-d2-01', 'artistic expression', 2, 'adjective-noun', 'creative expression through art', 'Artistic expression flourishes in the unlikeliest places.', ['creative expression', 'artistic creation']),
  c('w10-d2-02', 'creative freedom', 2, 'adjective-noun', 'liberty to create without restriction', 'Creative freedom requires both legal protection and economic safety.', ['artistic liberty', 'creative liberty']),
  c('w10-d2-03', 'work of art', 2, 'noun-preposition', 'a creative artistic creation', 'A small work of art outlasted three building owners.', ['artwork', 'artistic piece']),
  c('w10-d2-04', 'modern art', 2, 'adjective-noun', 'contemporary or twentieth-century art', 'Modern art divides opinion more sharply than older work.', ['contemporary art', '20th-century art']),
  c('w10-d2-05', 'visit a museum', 2, 'verb-noun', 'go to view museum exhibits', 'I visit a museum at least twice a month.', ['go to a museum', 'tour a museum']),
  c('w10-d2-06', 'art gallery', 2, 'noun-noun', 'building exhibiting art', 'A new art gallery transformed the neighbourhood.', ['museum', 'exhibition space']),
  c('w10-d2-07', 'attend a concert', 2, 'verb-noun', 'be present at a musical performance', 'Attending a concert is now expensive but rewarding.', ['go to a concert', 'see a live performance']),

  c('w10-d3-01', 'classical music', 3, 'adjective-noun', 'European art music tradition', 'Classical music finds new audiences through film soundtracks.', ['art music', 'orchestral music']),
  c('w10-d3-02', 'popular music', 3, 'adjective-noun', 'music with mass appeal', 'Popular music shapes a generation more than any institution.', ['pop music', 'mainstream music']),
  c('w10-d3-03', 'play an instrument', 3, 'verb-noun', 'perform on a musical instrument', 'Children who play an instrument show better academic outcomes.', ['perform music', 'be musical']),
  c('w10-d3-04', 'compose music', 3, 'verb-noun', 'create musical works', 'A small income from composing music can sustain a careful life.', ['write music', 'create songs']),
  c('w10-d3-05', 'sing a song', 3, 'verb-noun', 'perform a song vocally', 'Choirs sing songs that bind communities across decades.', ['perform a song', 'render a song']),
  c('w10-d3-06', 'release an album', 3, 'verb-noun', 'publish a collection of songs', 'The band released an album every two years for a decade.', ['put out an album', 'launch an album']),
  c('w10-d3-07', 'live performance', 3, 'adjective-noun', 'music played for an in-person audience', 'A live performance makes a recording feel like a sketch.', ['concert', 'gig']),

  c('w10-d4-01', 'read a novel', 4, 'verb-noun', 'consume a long fictional work', 'Reading a novel a month is a low-effort, high-return habit.', ['read fiction', 'consume a book']),
  c('w10-d4-02', 'write a book', 4, 'verb-noun', 'compose a book', 'Writing a book takes longer than people expect, every time.', ['author a book', 'pen a book']),
  c('w10-d4-03', 'publish a book', 4, 'verb-noun', 'make a book available to the public', 'She published a book of essays after thirty years of journalism.', ['release a book', 'put out a book']),
  c('w10-d4-04', 'literary work', 4, 'adjective-noun', 'a piece of literature', 'A literary work earns its place in the canon over a century.', ['piece of writing', 'literary creation']),
  c('w10-d4-05', 'tell a story', 4, 'verb-noun', 'narrate a tale', 'A grandparent who tells a story well shapes a child\'s memory.', ['narrate', 'recount']),
  c('w10-d4-06', 'best-selling author', 4, 'adjective-noun', 'author of widely sold books', 'A best-selling author rarely needs another job.', ['popular author', 'top-selling writer']),
  c('w10-d4-07', 'short story', 4, 'adjective-noun', 'a brief work of fiction', 'A short story is harder to write well than a novel.', ['novella', 'tale']),

  c('w10-d5-01', 'watch a film', 5, 'verb-noun', 'view a motion picture', 'I watch a film once a week to clear the head.', ['see a movie', 'view a film']),
  c('w10-d5-02', 'film industry', 5, 'noun-noun', 'business of making films', 'The film industry is concentrated in a handful of cities.', ['movie industry', 'cinema sector']),
  c('w10-d5-03', 'box-office hit', 5, 'noun-noun', 'commercially successful film', 'A surprise box-office hit can change a studio\'s fortunes.', ['blockbuster', 'box-office success']),
  c('w10-d5-04', 'critically acclaimed', 5, 'adverb-adjective', 'widely praised by critics', 'A critically acclaimed film does not always reach a wide audience.', ['highly praised', 'celebrated']),
  c('w10-d5-05', 'play a role', 5, 'verb-noun', 'perform a part in a film or play', 'She played a role that defined her career.', ['perform a part', 'take a part']),
  c('w10-d5-06', 'star in a film', 5, 'verb-preposition', 'have a leading role in a film', 'He starred in a film that opened the festival.', ['lead a film', 'be in a film']),
  c('w10-d5-07', 'go to the theatre', 5, 'verb-noun', 'attend a theatre performance', 'I go to the theatre once a season; live drama still moves me.', ['see a play', 'attend a performance']),

  c('w10-d6-01', 'broaden your horizons', 6, 'verb-noun', 'expand range of experience', 'A semester abroad broadens your horizons more than ten textbooks.', ['expand your outlook', 'open your mind']),
  c('w10-d6-02', 'cross-cultural understanding', 6, 'adjective-noun', 'mutual understanding between cultures', 'Cross-cultural understanding starts with curiosity, not theory.', ['cultural understanding', 'intercultural awareness']),
  c('w10-d6-03', 'cultural shock', 6, 'noun-noun', 'disorientation from a new culture', 'Cultural shock arrives in waves, not all at once.', ['culture shock', 'cultural disorientation']),
  c('w10-d6-04', 'adapt to a new culture', 6, 'verb-preposition', 'adjust to unfamiliar cultural surroundings', 'Adapting to a new culture takes years, not months.', ['acclimatise to', 'integrate into']),
  c('w10-d6-05', 'embrace tradition', 6, 'verb-noun', 'enthusiastically accept tradition', 'Younger people embrace tradition once they leave home.', ['accept tradition', 'welcome custom']),
  c('w10-d6-06', 'reject tradition', 6, 'verb-noun', 'refuse to follow tradition', 'A few who reject tradition outright create new ones in turn.', ['break with tradition', 'discard custom']),
  c('w10-d6-07', 'religious belief', 6, 'adjective-noun', 'a belief in a religion', 'A religious belief shapes ethics differently across faiths.', ['religious faith', 'spiritual conviction']),

  c('w10-d7-01', 'Vietnamese culture', 7, 'adjective-noun', 'the cultural traditions of Vietnam', 'Vietnamese culture rewards visitors who arrive without a checklist.', ['Vietnamese tradition', 'Vietnamese heritage']),
  c('w10-d7-02', 'national identity', 7, 'adjective-noun', 'sense of belonging to a nation', 'National identity adapts more than nationalists admit.', ['national character', 'patriotic identity']),
  c('w10-d7-03', 'celebrate a festival', 7, 'verb-noun', 'mark a special day or event', 'Families celebrate Tet with the same care as a wedding.', ['mark a festival', 'observe a holiday']),
  c('w10-d7-04', 'observe a custom', 7, 'verb-noun', 'follow a traditional practice', 'Observing the custom of taking shoes off is a small test of respect.', ['follow a custom', 'keep a tradition']),
  c('w10-d7-05', 'pass down', 7, 'verb-adverb', 'give to the next generation', 'Recipes pass down more reliably than written records.', ['hand down', 'transmit']),
  c('w10-d7-06', 'lose touch with', 7, 'verb-preposition', 'fail to maintain connection with', 'Younger generations risk losing touch with regional dialects.', ['drift apart from', 'become distant from']),
  c('w10-d7-07', 'preserve language', 7, 'verb-noun', 'keep a language alive', 'Preserving language requires speakers, not just dictionaries.', ['protect language', 'maintain language']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'culture', alternatives, level: 'intermediate', week: 10, day }
}

export const INTERMEDIATE_COLLOC_WEEK_10: CollocationLexiconItem[] = items
