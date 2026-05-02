import type { DiagnosticTest } from '../../schemas/diagnostic'

/**
 * Diagnostic v1 — single curated 30-minute test taken on first signup.
 *
 * Listening: Section 1-style accommodation enquiry, mixed question types.
 * Reading: ~750-word academic passage on the rise of urban beekeeping.
 * Writing: Task-2 discussion prompt, 150-word minimum.
 *
 * Difficulty progression A2 → C1 across each skill so the auto-grade output
 * separates true levels rather than ceiling at the top or floor at the bottom.
 */
export const diagnosticV1: DiagnosticTest = {
  id: 'diagnostic-v1',
  version: '1.0.0',
  estimatedMinutes: 30,

  // ── LISTENING (5 Q · ~8 min) — Hotel reservation enquiry ────────────────
  listening: {
    audioUrl: null,
    sectionTitle: 'Section 1 — Hotel reservation enquiry',
    instruction:
      'Questions 1–5. You will hear a telephone conversation between a customer and a hotel receptionist. Listen once and answer the questions below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for any short-answer questions.',
    transcript:
      'RECEPTIONIST: Good afternoon, the Brookwood Hotel, Sarah speaking. How may I help you? ' +
      "CALLER: Hello. I'd like to make a reservation for next month, please. " +
      'RECEPTIONIST: Certainly. May I take your name? ' +
      "CALLER: Yes, it's Daniel — D-A-N-I-E-L — Hartley. That's H-A-R-T-L-E-Y. " +
      'RECEPTIONIST: And your contact number, Mr Hartley? ' +
      "CALLER: It's oh-seven-nine-double-two, four-three-one, eight-five-six. " +
      'RECEPTIONIST: Lovely. Now, which dates were you looking at? ' +
      "CALLER: I'd like to arrive on the eighteenth of October and stay for three nights. " +
      'RECEPTIONIST: Of course. We have several room types available. The standard double is one hundred and forty pounds per night, the deluxe double is one hundred and seventy-five, and the junior suite is two hundred and twenty. All rates include breakfast. ' +
      "CALLER: I'll take the deluxe double, please. " +
      "RECEPTIONIST: An excellent choice. The deluxe rooms are on the third floor and overlook the garden. Would you like to add dinner to your booking? It's an additional thirty-two pounds per person per night. " +
      'CALLER: No, thank you, but could you tell me about parking? ' +
      "RECEPTIONIST: We have a private car park behind the hotel. It's free for guests, but you'll need to collect a permit from reception when you check in. The entrance is on Mill Lane, not on the main road. " +
      'CALLER: Perfect. And what time is check-in? ' +
      "RECEPTIONIST: Check-in is from two o'clock in the afternoon, and check-out is by eleven. If you arrive earlier, we can store your luggage. " +
      "CALLER: Wonderful. I'll see you on the eighteenth. " +
      'RECEPTIONIST: We look forward to it, Mr Hartley. Have a pleasant afternoon.',
    questions: [
      {
        id: 'diag-l-q1',
        number: 1,
        type: 'short-answer',
        question: "What is the caller's surname?",
        correctAnswer: 'Hartley',
        acceptableVariants: ['hartley', 'HARTLEY'],
        maxWords: 1,
        explanation: 'Spelled out: H-A-R-T-L-E-Y.',
      },
      {
        id: 'diag-l-q2',
        number: 2,
        type: 'short-answer',
        question: 'How many nights does the caller want to stay?',
        correctAnswer: '3',
        acceptableVariants: ['three', 'three nights', '3 nights'],
        maxWords: 2,
        explanation: 'Stated as "stay for three nights".',
      },
      {
        id: 'diag-l-q3',
        number: 3,
        type: 'multiple-choice',
        prompt: 'Which room does the caller book?',
        explanation: 'Caller says "I\'ll take the deluxe double".',
        options: [
          { key: 'A', text: 'Standard double — £140 per night' },
          { key: 'B', text: 'Deluxe double — £175 per night' },
          { key: 'C', text: 'Junior suite — £220 per night' },
          { key: 'D', text: 'Family room — not offered' },
        ],
        correctAnswer: 'B',
      },
      {
        id: 'diag-l-q4',
        number: 4,
        type: 'sentence-completion',
        sentenceBefore: 'The car-park entrance is on',
        sentenceAfter: '.',
        correctAnswer: 'Mill Lane',
        acceptableVariants: ['mill lane', 'mill ln', 'Mill ln'],
        maxWords: 2,
        explanation: 'Stated as "the entrance is on Mill Lane".',
      },
      {
        id: 'diag-l-q5',
        number: 5,
        type: 'true-false-not-given',
        statement: 'Dinner is included in the room price.',
        correctAnswer: 'FALSE',
        explanation:
          'Receptionist states dinner is "an additional thirty-two pounds per person per night".',
      },
    ],
  },

  // ── READING (5 Q · ~10 min) — Urban beekeeping passage ───────────────────
  reading: {
    passageTitle: 'The unexpected return of the urban beekeeper',
    instruction:
      'Questions 1–5. Read the passage and answer the questions below. For TRUE / FALSE / NOT GIVEN, write whether the statement agrees with the information in the text. For short-answer questions, write NO MORE THAN THREE WORDS AND/OR A NUMBER.',
    passageHtml: `
      <p>
        For most of the twentieth century, beekeeping was thought of as a rural craft — a
        hobby for retired farmers in straw hats, conducted in apple orchards or at the edges
        of country gardens. Cities, by contrast, were considered hostile to honeybees: too
        dirty, too dense, too short on flowers. Yet over the past two decades, this
        assumption has quietly inverted. Hives have proliferated on the rooftops of London
        offices, in the courtyards of Parisian apartment blocks, and on the terraces of
        American hotels. The Manhattan skyline alone is now home to several thousand
        registered colonies, with many more unregistered. The urban beekeeper, far from
        being a relic, has become a symbol of a particular kind of contemporary city life.
      </p>
      <p>
        Several factors explain this reversal. The first is botanical. A modern city,
        despite its concrete reputation, often offers honeybees a more varied diet than the
        countryside surrounding it. Public parks, private gardens, balcony plantings, and
        the deliberate planting of street trees together produce a long flowering season,
        from early-spring crocuses to late-autumn ivy. Agricultural land, by contrast, has
        in many regions been reduced to vast monocultures — fields of a single crop that
        flower for two or three weeks and then offer nothing for the rest of the year. The
        second factor is chemical. Cities tend to use far fewer of the systemic
        insecticides that have been implicated in the worldwide decline of pollinators.
        A bee in central Berlin is, paradoxically, less likely to encounter a poisoned
        flower than one foraging on a German wheat field.
      </p>
      <p>
        The economics of the trend are interesting. Urban honey commands a premium price
        because of the strong narrative attached to it: a jar from the rooftop of a London
        hotel may sell for ten times the price of supermarket honey. Hotels, restaurants,
        and corporate landlords have noticed. Several have installed hives less for the
        honey itself than for the marketing it generates — a single colony, well
        photographed, can produce thousands of pounds' worth of editorial coverage. Critics
        have called this <em>greenwashing</em>: the use of bees as a low-cost sustainability
        gesture by organisations whose other practices are far more damaging to the
        environment. Defenders point out that, whatever the motive, the hives themselves
        are real, and the bees inside them genuinely pollinate the surrounding green spaces.
      </p>
      <p>
        Not everyone is enthusiastic. Some entomologists argue that the rapid expansion of
        managed honeybee populations in cities is squeezing out the smaller, less famous
        wild bees — solitary bees, mason bees, bumblebees — that are far more important
        pollinators of native plants. A square mile can sustain only so many foragers, and
        a managed colony of perhaps fifty thousand individuals tips the balance steeply in
        the honeybee's favour. Several cities, including Munich and Melbourne, have
        responded by introducing licensing systems and density limits. Others have left the
        question to amateur self-regulation, with mixed results.
      </p>
      <p>
        What is striking, in any case, is how rapidly an activity considered eccentric a
        generation ago has become unremarkable. The urban beekeeper is no longer a curiosity
        but, increasingly, a feature of the city's working day — one more piece of evidence
        that the relationship between cities and the natural world is more complicated, and
        more reciprocal, than the old categories allow.
      </p>
    `,
    questions: [
      {
        id: 'diag-r-q1',
        number: 1,
        type: 'true-false-not-given',
        statement: 'In the twentieth century, urban beekeeping was widely regarded as impractical.',
        correctAnswer: 'TRUE',
        explanation:
          '"Cities, by contrast, were considered hostile to honeybees: too dirty, too dense, too short on flowers."',
      },
      {
        id: 'diag-r-q2',
        number: 2,
        type: 'true-false-not-given',
        statement:
          'Modern agricultural land typically provides bees with a longer flowering season than cities do.',
        correctAnswer: 'FALSE',
        explanation:
          'The text states monocultures "flower for two or three weeks and then offer nothing for the rest of the year", whereas cities have a long flowering season.',
      },
      {
        id: 'diag-r-q3',
        number: 3,
        type: 'short-answer',
        question:
          'According to the passage, what term has been used to criticise the use of hives by hotels and corporate landlords?',
        correctAnswer: 'greenwashing',
        acceptableVariants: ['Greenwashing'],
        maxWords: 1,
        explanation: 'The text says "Critics have called this greenwashing".',
      },
      {
        id: 'diag-r-q4',
        number: 4,
        type: 'sentence-completion',
        sentenceBefore: 'Cities such as Munich and Melbourne have introduced',
        sentenceAfter: 'to manage the density of urban hives.',
        correctAnswer: 'licensing systems',
        acceptableVariants: ['licensing systems and density limits', 'licensing'],
        maxWords: 4,
        explanation: 'The text states they "introduced licensing systems and density limits".',
      },
      {
        id: 'diag-r-q5',
        number: 5,
        type: 'yes-no-not-given',
        statement:
          'The author believes that managed honeybees are the most important pollinators in cities.',
        correctAnswer: 'NO',
        explanation:
          'The author cites entomologists who argue wild bees are "far more important pollinators of native plants".',
      },
    ],
  },

  // ── WRITING (1 prompt · ~12 min, min 150 words) ──────────────────────────
  writing: {
    prompt:
      'Some people believe that technology has made everyday life simpler and more efficient. Others argue that it has actually made life more complicated. Discuss both views and give your own opinion.',
    minWords: 150,
    taskType: 'task-2-discuss',
  },
}
