import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 10 · Arts and culture. 70 items. Aesthetic vocabulary that lifts an essay above the generic. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — The visual arts
  v('w10-d1-01', 'aesthetic', 1, { partOfSpeech: 'adjective', definition: 'Concerned with beauty or the appreciation of beauty.', example: 'The aesthetic choices of a building outlive its function.', register: 'C1', synonyms: [['artistic', 'B2'], ['stylistic', 'C1']] }),
  v('w10-d1-02', 'composition', 1, { partOfSpeech: 'noun', definition: 'The arrangement of elements in a work of art.', example: 'A balanced composition draws the eye to the figure first.', synonyms: [['arrangement', 'B2'], ['layout', 'B2']] }),
  v('w10-d1-03', 'medium', 1, { partOfSpeech: 'noun', definition: 'The material an artist uses.', example: 'Watercolour as a medium punishes hesitation.', synonyms: [['material', 'B2'], ['means', 'B2']] }),
  v('w10-d1-04', 'sculpture', 1, { partOfSpeech: 'noun', definition: 'Three-dimensional art made by carving or modelling.', example: 'A small sculpture in the lobby outlasted three renovations.', synonyms: [['statue', 'B1'], ['carving', 'B2']] }),
  v('w10-d1-05', 'portrait', 1, { partOfSpeech: 'noun', definition: 'A painting or photograph of a person.', example: 'A formal portrait reveals more than a candid photograph.', synonyms: [['likeness', 'C1'], ['picture', 'B1']] }),
  v('w10-d1-06', 'landscape', 1, { partOfSpeech: 'noun', definition: 'A picture representing natural scenery.', example: 'Romantic landscapes dominated the early nineteenth century.', synonyms: [['scenery', 'B2'], ['vista', 'C1']] }),
  v('w10-d1-07', 'palette', 1, { partOfSpeech: 'noun', definition: 'The range of colours used by an artist.', example: 'Her muted palette gives the work a quiet authority.', register: 'C1', synonyms: [['colour range', 'B2'], ['scheme', 'B2']] }),
  v('w10-d1-08', 'gallery', 1, { partOfSpeech: 'noun', definition: 'A building or room for displaying art.', example: 'The new gallery reaches twice as many visitors as the old.', synonyms: [['museum', 'B1'], ['exhibition space', 'B2']] }),
  v('w10-d1-09', 'curator', 1, { partOfSpeech: 'noun', definition: 'A person who selects art for an exhibition.', example: 'A confident curator can lift a small collection.', register: 'C1', synonyms: [['organiser', 'B2'], ['custodian', 'C1']] }),
  v('w10-d1-10', 'masterpiece', 1, { partOfSpeech: 'noun', definition: 'A work of outstanding skill.', example: 'A masterpiece is recognised by the next generation more reliably.', synonyms: [['classic', 'B2'], ['magnum opus', 'C1']] }),

  // Day 2 — Music
  v('w10-d2-01', 'composer', 2, { partOfSpeech: 'noun', definition: 'A person who writes music.', example: 'A composer\'s life is rarely as serene as the music.', synonyms: [['songwriter', 'B2'], ['musician', 'B1']] }),
  v('w10-d2-02', 'orchestra', 2, { partOfSpeech: 'noun', definition: 'A large group of musicians playing different instruments.', example: 'A live orchestra changes a film\'s emotional weight.', synonyms: [['ensemble', 'C1'], ['symphony', 'B2']] }),
  v('w10-d2-03', 'genre', 2, { partOfSpeech: 'noun', definition: 'A category of music or art.', example: 'Each genre has its own conventions and its own subversions.', register: 'C1', synonyms: [['category', 'B2'], ['style', 'B1']] }),
  v('w10-d2-04', 'lyric', 2, { partOfSpeech: 'noun', definition: 'The words of a song.', example: 'A great lyric carries the song after the melody fades.', synonyms: [['words', 'B1'], ['verse', 'B2']] }),
  v('w10-d2-05', 'rhythm', 2, { partOfSpeech: 'noun', definition: 'A regular pattern of beats in music.', example: 'A simple rhythm is harder to write than a complex one.', synonyms: [['beat', 'B1'], ['cadence', 'C1']] }),
  v('w10-d2-06', 'harmony', 2, { partOfSpeech: 'noun', definition: 'The combination of musical notes sung or played at the same time.', example: 'Three-part harmony lifted an ordinary chorus.', register: 'C1', synonyms: [['accord', 'C1'], ['melody', 'B1']] }),
  v('w10-d2-07', 'melody', 2, { partOfSpeech: 'noun', definition: 'A pleasing succession of musical notes.', example: 'A memorable melody outlives every fashion.', synonyms: [['tune', 'B1'], ['air', 'C1']] }),
  v('w10-d2-08', 'concerto', 2, { partOfSpeech: 'noun', definition: 'A musical work for a solo instrument and orchestra.', example: 'A late-period concerto rewards the patient listener.', register: 'C1', synonyms: [['solo work', 'C1'], ['classical piece', 'B2']] }),
  v('w10-d2-09', 'streaming service', 2, { partOfSpeech: 'phrase', definition: 'A digital platform that delivers music or video.', example: 'A streaming service reshapes how musicians earn within a decade.', synonyms: [['platform', 'B2'], ['service', 'B1']] }),
  v('w10-d2-10', 'live performance', 2, { partOfSpeech: 'phrase', definition: 'Music played for an audience in person.', example: 'A live performance makes a recording feel like a sketch.', synonyms: [['concert', 'B1'], ['gig', 'B2']] }),

  // Day 3 — Literature
  v('w10-d3-01', 'novel', 3, { partOfSpeech: 'noun', definition: 'A long fictional story.', example: 'A patient novel asks more of the reader than a brilliant one.', synonyms: [['book', 'B1'], ['fiction', 'B1']] }),
  v('w10-d3-02', 'protagonist', 3, { partOfSpeech: 'noun', definition: 'The main character in a story.', example: 'A flawed protagonist is harder to write but easier to remember.', register: 'C1', synonyms: [['hero', 'B1'], ['lead', 'B2']] }),
  v('w10-d3-03', 'plot', 3, { partOfSpeech: 'noun', definition: 'The sequence of events in a story.', example: 'A taut plot can carry weak prose; the reverse is harder.', synonyms: [['storyline', 'B1'], ['narrative', 'C1']] }),
  v('w10-d3-04', 'narrative', 3, { partOfSpeech: 'noun', definition: 'A spoken or written account of events.', example: 'A first-person narrative changes what the reader can see.', register: 'C1', synonyms: [['story', 'B1'], ['account', 'B2']] }),
  v('w10-d3-05', 'metaphor', 3, { partOfSpeech: 'noun', definition: 'A figure of speech describing one thing as another.', example: 'A precise metaphor outweighs a paragraph of explanation.', register: 'C1', synonyms: [['comparison', 'B2'], ['figure of speech', 'C1']] }),
  v('w10-d3-06', 'symbol', 3, { partOfSpeech: 'noun', definition: 'Something that represents something else.', example: 'The lighthouse is the novel\'s central symbol.', synonyms: [['emblem', 'C1'], ['sign', 'B1']] }),
  v('w10-d3-07', 'theme', 3, { partOfSpeech: 'noun', definition: 'The central idea of a work.', example: 'The novel\'s theme is grief without sentimentality.', synonyms: [['motif', 'C1'], ['subject', 'B1']] }),
  v('w10-d3-08', 'genre fiction', 3, { partOfSpeech: 'phrase', definition: 'Fiction belonging to a recognisable category.', example: 'Genre fiction often outsells the literary sort.', register: 'C1', synonyms: [['popular fiction', 'B2'], ['commercial fiction', 'C1']] }),
  v('w10-d3-09', 'memoir', 3, { partOfSpeech: 'noun', definition: 'A non-fiction account of personal experience.', example: 'A frank memoir lasts longer than a flattering one.', register: 'C1', synonyms: [['autobiography', 'B2'], ['personal account', 'B2']] }),
  v('w10-d3-10', 'literary canon', 3, { partOfSpeech: 'phrase', definition: 'The set of works considered most important in a tradition.', example: 'Each generation revises the literary canon a little.', register: 'C1', synonyms: [['standard works', 'C1'], ['established texts', 'C1']] }),

  // Day 4 — Cinema & theatre
  v('w10-d4-01', 'cinema', 4, { partOfSpeech: 'noun', definition: 'The art of making and showing films.', example: 'European cinema rewards patient watching.', synonyms: [['film', 'B1'], ['movies', 'B1']] }),
  v('w10-d4-02', 'director', 4, { partOfSpeech: 'noun', definition: 'A person who supervises the making of a film or play.', example: 'A confident director earns trust on the first day of shooting.', synonyms: [['filmmaker', 'B2'], ['producer', 'B2']] }),
  v('w10-d4-03', 'screenplay', 4, { partOfSpeech: 'noun', definition: 'The written script for a film.', example: 'A clean screenplay is easier to direct than to write.', register: 'C1', synonyms: [['script', 'B2'], ['text', 'B1']] }),
  v('w10-d4-04', 'cast', 4, { partOfSpeech: 'noun', definition: 'The actors in a film or play.', example: 'A small cast often shines brighter than a large one.', synonyms: [['ensemble', 'C1'], ['players', 'B2']] }),
  v('w10-d4-05', 'production', 4, { partOfSpeech: 'noun', definition: 'A particular performance or staging.', example: 'A modern-dress production lets the language carry the play.', synonyms: [['staging', 'C1'], ['performance', 'B1']] }),
  v('w10-d4-06', 'rehearsal', 4, { partOfSpeech: 'noun', definition: 'A practice of a play, dance, or music.', example: 'Two weeks of rehearsal turns text into theatre.', synonyms: [['practice', 'B1'], ['run-through', 'B2']] }),
  v('w10-d4-07', 'audience', 4, { partOfSpeech: 'noun', definition: 'The people watching a performance.', example: 'A warm audience can lift a dull script.', synonyms: [['viewers', 'B1'], ['spectators', 'C1']] }),
  v('w10-d4-08', 'box office', 4, { partOfSpeech: 'phrase', definition: 'The earnings of a film or theatre production.', example: 'Box-office success rarely guarantees critical respect.', synonyms: [['earnings', 'B2'], ['takings', 'C1']] }),
  v('w10-d4-09', 'documentary', 4, { partOfSpeech: 'noun', definition: 'A non-fiction film recording real events.', example: 'A short documentary about local floods reached the national news.', synonyms: [['factual film', 'B2'], ['non-fiction film', 'B2']] }),
  v('w10-d4-10', 'adaptation', 4, { partOfSpeech: 'noun', definition: 'A film or play based on a book or other source.', example: 'A faithful adaptation can disappoint by being too faithful.', register: 'C1', synonyms: [['version', 'B2'], ['rendering', 'C1']] }),

  // Day 5 — Cultural heritage
  v('w10-d5-01', 'heritage', 5, { partOfSpeech: 'noun', definition: 'Valuable objects and practices passed down from previous generations.', example: 'Cultural heritage is fragile and rarely insurable at full value.', synonyms: [['legacy', 'C1'], ['tradition', 'B2']] }),
  v('w10-d5-02', 'tradition', 5, { partOfSpeech: 'noun', definition: 'A long-established custom or belief.', example: 'A tradition survives by being slightly reinvented in each generation.', synonyms: [['custom', 'B2'], ['practice', 'B2']] }),
  v('w10-d5-03', 'custom', 5, { partOfSpeech: 'noun', definition: 'A traditional way of behaving.', example: 'It is the custom to bring a small gift on a first visit.', synonyms: [['tradition', 'B2'], ['practice', 'B2']] }),
  v('w10-d5-04', 'ritual', 5, { partOfSpeech: 'noun', definition: 'A series of actions performed in a particular order.', example: 'A weekly family ritual binds three generations.', register: 'C1', synonyms: [['ceremony', 'C1'], ['practice', 'B2']] }),
  v('w10-d5-05', 'preserve', 5, { partOfSpeech: 'verb', definition: 'To keep something in its original state.', example: 'Local groups preserve dialects that universities study only later.', synonyms: [['protect', 'B1'], ['conserve', 'B2']] }),
  v('w10-d5-06', 'restore', 5, { partOfSpeech: 'verb', definition: 'To return something to its earlier condition.', example: 'A patient team restored the temple over fifteen years.', synonyms: [['renovate', 'B2'], ['rehabilitate', 'C1']] }),
  v('w10-d5-07', 'monument', 5, { partOfSpeech: 'noun', definition: 'A structure built to commemorate a person or event.', example: 'A simple monument outlasts a grand one.', synonyms: [['memorial', 'B2'], ['landmark', 'B2']] }),
  v('w10-d5-08', 'artefact', 5, { partOfSpeech: 'noun', definition: 'An object made by humans, often of historical interest.', example: 'A single artefact rewrote the museum\'s timeline.', register: 'C1', synonyms: [['object', 'B1'], ['relic', 'C1']] }),
  v('w10-d5-09', 'antiquity', 5, { partOfSpeech: 'noun', definition: 'The ancient past.', example: 'Antiquity speaks loudest when one stands inside the ruin.', register: 'C1', synonyms: [['ancient times', 'B2'], ['old age', 'B1']] }),
  v('w10-d5-10', 'indigenous', 5, { partOfSpeech: 'adjective', definition: 'Originating in and characteristic of a particular region.', example: 'Indigenous languages have lost speakers fastest in cities.', register: 'C1', synonyms: [['native', 'B2'], ['original', 'B1']] }),

  // Day 6 — Aesthetic verbs
  v('w10-d6-01', 'evoke', 6, { partOfSpeech: 'verb', definition: 'To bring a feeling or memory to mind.', example: 'A simple folk tune can evoke a whole childhood.', register: 'C1', synonyms: [['summon', 'C1'], ['call up', 'B2']] }),
  v('w10-d6-02', 'capture', 6, { partOfSpeech: 'verb', definition: 'To express the essence of something.', example: 'A short essay captured what the museum could not.', synonyms: [['portray', 'C1'], ['convey', 'C1']] }),
  v('w10-d6-03', 'depict', 6, { partOfSpeech: 'verb', definition: 'To show or represent in a picture or words.', example: 'The painting depicts a quiet quarrel rather than a battle.', register: 'C1', synonyms: [['portray', 'C1'], ['show', 'B1']] }),
  v('w10-d6-04', 'portray', 6, { partOfSpeech: 'verb', definition: 'To describe or represent in a particular way.', example: 'The novel portrays its villain with surprising sympathy.', register: 'C1', synonyms: [['depict', 'C1'], ['represent', 'B2']] }),
  v('w10-d6-05', 'convey', 6, { partOfSpeech: 'verb', definition: 'To communicate or express something.', example: 'A glance can convey what a paragraph cannot.', register: 'C1', synonyms: [['communicate', 'B2'], ['transmit', 'C1']] }),
  v('w10-d6-06', 'craft', 6, { partOfSpeech: 'verb', definition: 'To make skilfully by hand.', example: 'A novelist crafts every sentence at least twice.', synonyms: [['fashion', 'C1'], ['shape', 'B1']] }),
  v('w10-d6-07', 'curate', 6, { partOfSpeech: 'verb', definition: 'To select and organise items for an exhibition.', example: 'She curated three rooms around a single theme.', register: 'C1', synonyms: [['organise', 'B2'], ['select', 'B1']] }),
  v('w10-d6-08', 'exhibit', 6, { partOfSpeech: 'verb', definition: 'To put on public display.', example: 'The artist exhibits abroad more often than at home.', synonyms: [['display', 'B1'], ['showcase', 'C1']] }),
  v('w10-d6-09', 'commission', 6, { partOfSpeech: 'verb', definition: 'To formally request a piece of work.', example: 'The city commissioned a sculpture for the new square.', register: 'C1', synonyms: [['order', 'B1'], ['engage', 'C1']] }),
  v('w10-d6-10', 'critique', 6, { partOfSpeech: 'verb', definition: 'To evaluate critically.', example: 'A peer can critique a draft more usefully than a friend.', register: 'C1', synonyms: [['review', 'B2'], ['evaluate', 'B2']] }),

  // Day 7 — Cultural debate
  v('w10-d7-01', 'highbrow', 7, { partOfSpeech: 'adjective', definition: 'Intellectual; appealing to a refined taste.', example: 'A highbrow festival can survive only with public money.', register: 'C1', synonyms: [['intellectual', 'B2'], ['cultivated', 'C1']] }),
  v('w10-d7-02', 'lowbrow', 7, { partOfSpeech: 'adjective', definition: 'Without intellectual pretension.', example: 'A lowbrow comedy can carry political weight.', register: 'C1', synonyms: [['popular', 'B1'], ['mainstream', 'B2']] }),
  v('w10-d7-03', 'patronage', 7, { partOfSpeech: 'noun', definition: 'The financial support given to artists.', example: 'Royal patronage shaped European music for two centuries.', register: 'C1', synonyms: [['sponsorship', 'C1'], ['support', 'B2']] }),
  v('w10-d7-04', 'censorship', 7, { partOfSpeech: 'noun', definition: 'The suppression of speech or art deemed objectionable.', example: 'Censorship rarely silences; it usually amplifies.', register: 'C1', synonyms: [['suppression', 'C1'], ['restriction', 'B2']] }),
  v('w10-d7-05', 'avant-garde', 7, { partOfSpeech: 'adjective', definition: 'New and experimental in art.', example: 'Today\'s avant-garde becomes next decade\'s mainstream.', register: 'C1', synonyms: [['cutting-edge', 'C1'], ['experimental', 'B2']] }),
  v('w10-d7-06', 'mainstream', 7, { partOfSpeech: 'adjective', definition: 'Considered normal or popular.', example: 'A mainstream film can still take risks with its ending.', synonyms: [['conventional', 'B2'], ['popular', 'B1']] }),
  v('w10-d7-07', 'subsidy', 7, { partOfSpeech: 'noun', definition: 'Money given to support an activity.', example: 'A small subsidy keeps regional theatres running.', synonyms: [['grant', 'B2'], ['funding', 'B2']] }),
  v('w10-d7-08', 'philistine', 7, { partOfSpeech: 'noun', definition: 'A person who is hostile to culture and the arts.', example: 'It is too easy to call sceptics of arts funding philistines.', register: 'C1', synonyms: [['anti-intellectual', 'C1'], ['boor', 'C1']] }),
  v('w10-d7-09', 'cultural exchange', 7, { partOfSpeech: 'phrase', definition: 'The sharing of culture between groups.', example: 'A residency programme is a small but real cultural exchange.', synonyms: [['cross-cultural sharing', 'C1'], ['exchange', 'B1']] }),
  v('w10-d7-10', 'commercialise', 7, { partOfSpeech: 'verb', definition: 'To turn something into a commercial enterprise.', example: 'A festival can commercialise quickly without changing its name.', register: 'C1', synonyms: [['monetise', 'C1'], ['market', 'B2']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'culture', frequency: input.frequency ?? 'medium', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 10, day }
}

export const INTERMEDIATE_VOCAB_WEEK_10: VocabularyLexiconItem[] = items
