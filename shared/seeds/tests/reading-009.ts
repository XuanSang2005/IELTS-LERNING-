import type { Test } from '../../schemas/test'

export const reading009: Test = {
  id: 'reading-009',
  skill: 'reading',
  title: 'Reading Test 09',
  description:
    'Three passages on the Library of Alexandria, the formation of volcanoes, and the small but stubborn science of yawning.',
  difficulty: 'foundation',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-26',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-009-p1',
      number: 1,
      title: 'The Library of Alexandria',
      wordCount: 490,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Founded in the third century BC by the early Ptolemaic kings of Egypt, the Library of Alexandria was, for almost three centuries, the largest collection of written knowledge in the ancient world. Estimates of its holdings vary wildly — between 200,000 and 700,000 scrolls, depending on the source — but even the lower figure made it an unprecedented institution. Few collections of comparable size would exist anywhere in the world before the printing press.</p>
<p data-para="B"><strong>B.</strong> The library was not a building in the modern sense. It was a network of reading rooms, archives and lecture halls attached to the Mouseion, a temple of the Muses where scholars lived at royal expense. The architectural details — colonnaded walks, dining halls, gardens — survive only in second-hand descriptions. The papyrus scrolls themselves, of course, do not survive at all.</p>
<p data-para="C"><strong>C.</strong> The Ptolemies were aggressive collectors. According to Galen, ships entering the harbour at Alexandria were searched for books, which were copied — sometimes only the copies were returned. A standing royal order, possibly fictional but widely repeated, instructed the librarians to acquire any text in any language that crossed their path. The famous Hebrew translation of the Pentateuch, the Septuagint, was reportedly produced under this scheme.</p>
<p data-para="D"><strong>D.</strong> The scholarly output was prodigious. Eratosthenes, third librarian, calculated the circumference of the earth. Aristarchus of Samothrace edited the standard text of the Homeric poems. Euclid composed his <em>Elements</em> in the city. The astronomer Hipparchus produced the first known catalogue of stars; the anatomist Herophilus made the first systematic dissections of the human body. The library was less a passive repository than the centre of an active research programme — perhaps the first such programme in history.</p>
<p data-para="E"><strong>E.</strong> The story of its destruction is muddier than is usually told. There was no single fire. Julius Caesar accidentally burned part of the collection when he set fire to a hostile fleet in the harbour in 48 BC. A second portion was lost during the third-century AD anti-pagan campaigns. A third was destroyed when the Christian patriarch Theophilus dismantled the temple of Serapis, which housed a daughter library, in 391 AD. The Arab conquest of Alexandria in 642 AD probably had little to do with the library, although a long-standing legend, since discredited, attributed the final destruction to Caliph Umar.</p>
<p data-para="F"><strong>F.</strong> What was lost is difficult to compute. The works of Sappho, Sophocles, Aeschylus, Euripides — most of which we have only in fragmentary form — were collected complete in Alexandria. The historians of pre-Roman Africa wrote in libraries we no longer can read. The fall of the library was not a single event but the slow erosion of three centuries of cumulative loss. The lesson, perhaps, is institutional: civilisations preserve what they actively maintain, and lose what they merely store.</p>
`,
      vocabulary: [
        {
          term: 'papyrus',
          definition: 'A material similar to thick paper that ancient Egyptians used for writing.',
          translation: 'giấy cói',
        },
        {
          term: 'Mouseion',
          definition:
            'A research institution and temple of the Muses, attached to the Library of Alexandria.',
        },
        {
          term: 'Pentateuch',
          definition: 'The first five books of the Hebrew Bible.',
        },
        {
          term: 'erosion',
          definition: 'The gradual destruction or wearing-away of something.',
        },
      ],
      groups: [
        {
          id: 'r009-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r009-q1',
              number: 1,
              type: 'true-false-not-given',
              statement:
                "Estimates of the library's holdings range from 200,000 to 700,000 scrolls.",
              correctAnswer: 'TRUE',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r009-q2',
              number: 2,
              type: 'true-false-not-given',
              statement: 'The library was a single building.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B says it was a network of rooms.',
            },
            {
              id: 'r009-q3',
              number: 3,
              type: 'true-false-not-given',
              statement: 'Ships in the harbour at Alexandria were searched for books.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph C cites Galen.',
            },
            {
              id: 'r009-q4',
              number: 4,
              type: 'true-false-not-given',
              statement: 'Caliph Umar ordered the final destruction of the library.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph E says the legend has been discredited.',
            },
            {
              id: 'r009-q5',
              number: 5,
              type: 'true-false-not-given',
              statement: 'Pre-Roman African historians lived in Alexandria.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage refers to texts, not residence.',
            },
          ],
        },
        {
          id: 'r009-p1-g2',
          instruction: 'Questions 6–9 · Match each scholar with his contribution.',
          questions: [
            {
              id: 'r009-q6',
              number: 6,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Eratosthenes' },
                { id: 'item-2', text: 'Aristarchus of Samothrace' },
                { id: 'item-3', text: 'Euclid' },
                { id: 'item-4', text: 'Hipparchus' },
              ],
              options: [
                { key: 'A', text: 'First catalogue of stars' },
                { key: 'B', text: "Calculation of Earth's circumference" },
                { key: 'C', text: 'Edited Homeric poems' },
                { key: 'D', text: 'Composed the Elements' },
              ],
              correctMapping: {
                'item-1': 'B',
                'item-2': 'C',
                'item-3': 'D',
                'item-4': 'A',
              },
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q7',
              number: 7,
              type: 'short-answer',
              question: 'In what year did Julius Caesar accidentally burn part of the collection?',
              correctAnswer: '48 BC',
              acceptableVariants: ['48 BCE', '48bc'],
              maxWords: 2,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r009-q8',
              number: 8,
              type: 'short-answer',
              question: 'Which patriarch dismantled the temple of Serapis in 391 AD?',
              correctAnswer: 'Theophilus',
              acceptableVariants: ['Patriarch Theophilus'],
              maxWords: 2,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r009-q9',
              number: 9,
              type: 'short-answer',
              question: 'What is the name of the temple that housed scholars at royal expense?',
              correctAnswer: 'Mouseion',
              acceptableVariants: ['the Mouseion'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
          ],
        },
        {
          id: 'r009-p1-g3',
          instruction: 'Questions 10–13 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r009-q10',
              number: 10,
              type: 'multiple-choice',
              prompt:
                'According to the passage, which kind of institution best describes the library?',
              options: [
                { key: 'A', text: 'A passive repository.' },
                { key: 'B', text: 'A military archive.' },
                { key: 'C', text: 'An active research programme.' },
                { key: 'D', text: "A merchant's bookstore." },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q11',
              number: 11,
              type: 'multiple-choice',
              prompt: 'Which Greek translation of Hebrew scripture is named in the passage?',
              options: [
                { key: 'A', text: 'The Vulgate.' },
                { key: 'B', text: 'The Septuagint.' },
                { key: 'C', text: 'The Targum.' },
                { key: 'D', text: 'The Mishnah.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r009-q12',
              number: 12,
              type: 'multiple-choice',
              prompt: 'How does the writer characterise the destruction of the library?',
              options: [
                { key: 'A', text: 'A single famous fire.' },
                { key: 'B', text: 'A series of partial losses across centuries.' },
                { key: 'C', text: 'A natural disaster.' },
                { key: 'D', text: 'A deliberate Roman decree.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E and F.',
            },
            {
              id: 'r009-q13',
              number: 13,
              type: 'multiple-choice',
              prompt: "What is the writer's closing thought in paragraph F?",
              options: [
                { key: 'A', text: 'Civilisations preserve what they actively maintain.' },
                { key: 'B', text: 'Libraries are always doomed.' },
                { key: 'C', text: 'Most ancient texts are unimportant.' },
                { key: 'D', text: 'Modern libraries are immune to destruction.' },
              ],
              correctAnswer: 'A',
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-009-p2',
      number: 2,
      title: 'How Volcanoes Form',
      wordCount: 490,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> A volcano is, in essence, a vent in the Earth\'s crust through which molten rock, gases and ash escape from below. The surface form of the volcano — a steep cone, a low shield, a flat crater — depends on the chemistry of the magma and the speed at which it reaches the surface. The deep cause is, however, almost everywhere the same: the slow movement of the planet\'s tectonic plates.</p>
<p data-para="B"><strong>B.</strong> The Earth\'s surface is divided into roughly fifteen rigid plates, which float on a slowly convecting layer of hot, ductile rock called the asthenosphere. Where two plates pull apart — at <em>divergent</em> boundaries — molten rock from below rises to fill the gap, forming chains of volcanoes most of which lie at the bottom of the oceans. The Mid-Atlantic Ridge is the longest such chain on Earth.</p>
<p data-para="C"><strong>C.</strong> Where two plates collide — at <em>convergent</em> boundaries — the denser of the two, usually an oceanic plate, dives beneath the lighter one in a process called subduction. As the descending plate sinks into the mantle, it heats and releases water; the water lowers the melting point of the surrounding rock and produces magma. The magma rises, often violently, through the overlying continental plate. The famous "Ring of Fire" around the Pacific Ocean is a chain of subduction-zone volcanoes — Mount Fuji in Japan, Mount St Helens in the United States, Mount Pinatubo in the Philippines.</p>
<p data-para="D"><strong>D.</strong> A third class of volcano forms at <em>hotspots</em>, where a stationary plume of hot mantle rock pushes through the crust regardless of plate boundary. The Hawaiian Islands are the textbook example. As the Pacific Plate has slid northwest across the stationary Hawaiian hotspot over millions of years, a chain of volcanoes has formed, the older ones extinct and weathered, the newest still active.</p>
<p data-para="E"><strong>E.</strong> Eruption styles differ widely. The fluid, low-silica basalt magmas of Hawaiian volcanoes flow rather than explode; entire islands have been built by their slow accumulation. The thick, gas-rich andesite and rhyolite magmas of subduction-zone volcanoes can clog the vent and erupt explosively, producing pyroclastic flows of incandescent ash and gas that travel at speeds exceeding 100 km/h. The eruption of Mount Pelée in Martinique in 1902 destroyed the city of Saint-Pierre and killed 30,000 people in roughly two minutes.</p>
<p data-para="F"><strong>F.</strong> Predicting eruptions has become routine but remains imprecise. Modern monitoring relies on tracking ground deformation by GPS, on detecting gas emissions, and on measuring the thousands of small earthquakes that accompany the rise of magma. The 2010 eruption of Iceland\'s Eyjafjallajökull was forecast within hours; the 2014 eruption of Mount Ontake in Japan, in contrast, occurred without warning and killed sixty-three hikers. The honest characterisation, in 2026, is that monitoring tells us when an eruption is becoming likely, not when it will start.</p>
`,
      vocabulary: [
        {
          term: 'magma',
          definition: "Hot fluid or semi-fluid material below or within the Earth's crust.",
          translation: 'mắc-ma',
        },
        {
          term: 'subduction',
          definition: 'The process by which one tectonic plate descends beneath another.',
        },
        {
          term: 'pyroclastic',
          definition: 'Composed of fragments of rock formed by volcanic explosion.',
        },
        {
          term: 'asthenosphere',
          definition: "The semi-fluid layer of the Earth's upper mantle, beneath the rigid plates.",
        },
      ],
      groups: [
        {
          id: 'r009-p2-g1',
          instruction: 'Questions 14–18 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r009-q14',
              number: 14,
              type: 'multiple-choice',
              prompt: "Approximately how many tectonic plates make up the Earth's surface?",
              options: [
                { key: 'A', text: 'Three.' },
                { key: 'B', text: 'Seven.' },
                { key: 'C', text: 'Roughly fifteen.' },
                { key: 'D', text: 'Hundreds.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph B.',
            },
            {
              id: 'r009-q15',
              number: 15,
              type: 'multiple-choice',
              prompt: 'Most divergent-boundary volcanoes are located',
              options: [
                { key: 'A', text: 'in deserts.' },
                { key: 'B', text: 'on the seafloor.' },
                { key: 'C', text: 'in Antarctica.' },
                { key: 'D', text: 'on tropical islands only.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph B.',
            },
            {
              id: 'r009-q16',
              number: 16,
              type: 'multiple-choice',
              prompt: 'What lowers the melting point of mantle rock at subduction zones?',
              options: [
                { key: 'A', text: 'Pressure increase.' },
                { key: 'B', text: 'Released water from the descending plate.' },
                { key: 'C', text: 'Solar radiation.' },
                { key: 'D', text: 'Earthquakes.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r009-q17',
              number: 17,
              type: 'multiple-choice',
              prompt: 'The Hawaiian volcanic chain is an example of',
              options: [
                { key: 'A', text: 'a divergent boundary.' },
                { key: 'B', text: 'a convergent boundary.' },
                { key: 'C', text: 'a hotspot.' },
                { key: 'D', text: 'a hot subduction.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q18',
              number: 18,
              type: 'multiple-choice',
              prompt: 'Which volcano destroyed Saint-Pierre in 1902?',
              options: [
                { key: 'A', text: 'Mount Vesuvius.' },
                { key: 'B', text: 'Mount Pelée.' },
                { key: 'C', text: 'Mount Fuji.' },
                { key: 'D', text: 'Eyjafjallajökull.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E.',
            },
          ],
        },
        {
          id: 'r009-p2-g2',
          instruction: 'Questions 19–22 · Match each volcano with its boundary or feature.',
          questions: [
            {
              id: 'r009-q19',
              number: 19,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Mid-Atlantic Ridge' },
                { id: 'item-2', text: 'Mount Fuji' },
                { id: 'item-3', text: 'Hawaiian Islands' },
                { id: 'item-4', text: 'Eyjafjallajökull (2010)' },
              ],
              options: [
                { key: 'A', text: 'Subduction zone' },
                { key: 'B', text: 'Hotspot' },
                { key: 'C', text: 'Divergent boundary' },
                { key: 'D', text: 'Forecast within hours' },
              ],
              correctMapping: {
                'item-1': 'C',
                'item-2': 'A',
                'item-3': 'B',
                'item-4': 'D',
              },
              explanation: 'Paragraphs B–F.',
            },
            {
              id: 'r009-q20',
              number: 20,
              type: 'short-answer',
              question:
                'What name is given to the chain of subduction-zone volcanoes around the Pacific?',
              correctAnswer: 'Ring of Fire',
              acceptableVariants: ['the Ring of Fire'],
              maxWords: 4,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r009-q21',
              number: 21,
              type: 'short-answer',
              question: 'How many people did the 1902 Pelée eruption kill?',
              correctAnswer: '30,000',
              acceptableVariants: ['thirty thousand', '30000'],
              maxWords: 2,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r009-q22',
              number: 22,
              type: 'short-answer',
              question: 'How many hikers died in the unannounced 2014 Mount Ontake eruption?',
              correctAnswer: 'sixty-three',
              acceptableVariants: ['63'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r009-p2-g3',
          instruction:
            'Questions 23–26 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r009-q23',
              number: 23,
              type: 'true-false-not-given',
              statement: 'Hawaiian-style basalt magma typically erupts explosively.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph E says it flows rather than explodes.',
            },
            {
              id: 'r009-q24',
              number: 24,
              type: 'true-false-not-given',
              statement: 'GPS measurements of ground deformation are used in eruption monitoring.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph F.',
            },
            {
              id: 'r009-q25',
              number: 25,
              type: 'true-false-not-given',
              statement: 'Pyroclastic flows can travel at speeds over 100 km/h.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r009-q26',
              number: 26,
              type: 'true-false-not-given',
              statement: 'Modern monitoring can predict the exact moment an eruption begins.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-009-p3',
      number: 3,
      title: 'Why We Yawn',
      wordCount: 480,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Most adults yawn between five and twenty times a day. Almost all vertebrates do — fish, reptiles, birds, mammals — although the social character of yawning is most developed in primates and a small number of social mammals. Despite the universality of the behaviour, the question of <em>why</em> we yawn has not been settled to anyone\'s satisfaction. Several plausible hypotheses compete; none has decisive evidence in its favour.</p>
<p data-para="B"><strong>B.</strong> The oldest hypothesis, going back to Hippocrates, is that yawning increases oxygen intake. The idea has intuitive appeal — a yawn is, after all, a deep inhalation — but the evidence is weak. Studies in which subjects breathed air with elevated carbon dioxide or reduced oxygen failed to find an increase in yawning. The "ventilation" hypothesis, in its simple form, has been quietly abandoned by most researchers.</p>
<p data-para="C"><strong>C.</strong> A more recent hypothesis is thermal. The neurologist Andrew Gallup has proposed that yawning is a form of brain cooling: the deep inhalation draws cool air over the nasal passages, and the wide stretch increases blood flow to the cranium. In support, Gallup has shown that subjects yawn more in moderately warm conditions and less when their foreheads are cooled. The thermal hypothesis fits the timing of yawning — most common during transitions between sleep and wakefulness, when the brain temperature changes — but it has been challenged on quantitative grounds by other researchers.</p>
<p data-para="D"><strong>D.</strong> The social character of yawning is well documented. A 2005 study showed that a person watching a video of someone yawning is roughly 50 per cent more likely to yawn within the next minute than a control. The effect is stronger between people who know each other and weaker between strangers; it is essentially absent in young children, autism-spectrum populations, and chimpanzees raised in isolation from conspecifics. The contagiousness has been interpreted as a primitive form of social bonding or empathy.</p>
<p data-para="E"><strong>E.</strong> The contagiousness even crosses species. Domestic dogs yawn when their owners yawn, and laboratory rats yawn when they observe other rats yawning. The behaviour appears to be among the oldest social signals in vertebrate biology. Whether it actually performs a coordinating function — synchronising arousal levels in a group, perhaps — or is merely an evolutionary side-effect of mirror-neuron activity, remains disputed.</p>
<p data-para="F"><strong>F.</strong> The medical relevance of yawning is modest but real. Excessive yawning, defined as more than three times in fifteen minutes, can be a symptom of multiple sclerosis, vasovagal syncope, certain medications, and brain-stem strokes. The clinical advice is unromantic: a yawning frequency that is suddenly and substantially elevated, especially with neurological symptoms, deserves investigation. Routine yawning, however, is unremarkable. As a final note, yawning while reading about yawning is statistically more common than chance — readers may have noticed.</p>
`,
      vocabulary: [
        {
          term: 'contagious',
          definition: 'Tending to spread from one individual to another, especially socially.',
          translation: 'có tính lan truyền',
        },
        {
          term: 'conspecific',
          definition: 'A member of the same species.',
        },
        {
          term: 'vasovagal syncope',
          definition:
            'A common cause of fainting, in which a sudden drop in blood pressure causes loss of consciousness.',
        },
        {
          term: 'mirror neuron',
          definition:
            'A neuron that fires both when an animal performs an action and when it observes the same action.',
        },
      ],
      groups: [
        {
          id: 'r009-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r009-q27',
              number: 27,
              type: 'true-false-not-given',
              statement: 'Yawning is unique to primates.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph A says nearly all vertebrates yawn.',
            },
            {
              id: 'r009-q28',
              number: 28,
              type: 'true-false-not-given',
              statement:
                'The oxygen-intake hypothesis has been confirmed by oxygen-deprivation studies.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B says the hypothesis has been abandoned by most.',
            },
            {
              id: 'r009-q29',
              number: 29,
              type: 'true-false-not-given',
              statement: 'Forehead cooling reduces the rate of yawning in studies.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r009-q30',
              number: 30,
              type: 'true-false-not-given',
              statement: 'Contagious yawning is essentially absent in autistic populations.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q31',
              number: 31,
              type: 'true-false-not-given',
              statement: 'Domestic dogs yawn in response to their owners yawning.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r009-q32',
              number: 32,
              type: 'true-false-not-given',
              statement: 'Excessive yawning is always a sign of brain-stem stroke.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph F lists multiple possible causes.',
            },
          ],
        },
        {
          id: 'r009-p3-g2',
          instruction: 'Questions 33–36 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r009-q33',
              number: 33,
              type: 'multiple-choice',
              prompt:
                'According to the 2005 study, watching a video of yawning increases the chance of a yawn within the next minute by approximately',
              options: [
                { key: 'A', text: '5 per cent.' },
                { key: 'B', text: '20 per cent.' },
                { key: 'C', text: '50 per cent.' },
                { key: 'D', text: '90 per cent.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q34',
              number: 34,
              type: 'multiple-choice',
              prompt: "How does Gallup's hypothesis explain the timing of yawning?",
              options: [
                { key: 'A', text: 'It correlates with mealtimes.' },
                { key: 'B', text: 'It occurs during transitions in brain temperature.' },
                { key: 'C', text: 'It correlates with social isolation.' },
                { key: 'D', text: 'It is unrelated to time of day.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r009-q35',
              number: 35,
              type: 'multiple-choice',
              prompt: 'Among whom is contagious yawning weakest?',
              options: [
                { key: 'A', text: 'Adults who know each other well.' },
                {
                  key: 'B',
                  text: 'Young children, isolated chimpanzees and autism-spectrum populations.',
                },
                { key: 'C', text: 'Domestic dogs.' },
                { key: 'D', text: 'Laboratory rats.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q36',
              number: 36,
              type: 'multiple-choice',
              prompt: 'What does the writer say about routine yawning?',
              options: [
                { key: 'A', text: 'It is alarming and should be investigated.' },
                { key: 'B', text: 'It is medically unremarkable.' },
                { key: 'C', text: 'It indicates respiratory disease.' },
                { key: 'D', text: 'It is unique to primates.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r009-p3-g3',
          instruction:
            'Questions 37–40 · Complete the summary. Choose NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r009-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore: 'The oldest hypothesis about yawning concerns oxygen and',
              sentenceAfter: '.',
              correctAnswer: 'ventilation',
              acceptableVariants: ['oxygen intake'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r009-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore: 'Andrew Gallup proposes that yawning is a form of brain',
              sentenceAfter: '.',
              correctAnswer: 'cooling',
              acceptableVariants: ['cooling mechanism'],
              maxWords: 2,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r009-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore:
                'The contagiousness of yawning has been interpreted as a primitive form of social bonding or',
              sentenceAfter: '.',
              correctAnswer: 'empathy',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r009-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore: 'Excessive yawning is defined as more than',
              sentenceAfter: 'in fifteen minutes.',
              correctAnswer: 'three times',
              acceptableVariants: ['three'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
  ],
}
