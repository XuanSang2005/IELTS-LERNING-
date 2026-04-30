import type { Test } from '../../schemas/test'

export const reading005: Test = {
  id: 'reading-005',
  skill: 'reading',
  title: 'Reading Test 05',
  description:
    'Three Band 7+ passages on crowd dynamics, anonymous authorship, and antibiotic resistance.',
  difficulty: 'advanced',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-18',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-005-p1',
      number: 1,
      title: 'The Mathematics of Crowds',
      wordCount: 540,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The pedestrian crowd is one of the few collective phenomena that allows itself to be filmed, counted and replayed. Unlike a flock of starlings or a school of herring, it is composed of agents who can be interviewed afterwards. Unlike a traffic jam, it negotiates two dimensions, not one. For roughly thirty years, it has been the favoured laboratory of an interdisciplinary field that calls itself, with deliberate imprecision, the science of collective motion.</p>
<p data-para="B"><strong>B.</strong> The simplest model is also among the most successful. The "social force" framework, formulated by the German physicist Dirk Helbing in 1995, treats each pedestrian as a particle subject to a small set of attractive and repulsive forces — toward a destination, away from walls, away from other pedestrians at uncomfortably close range. Run the model in a confined corridor with two-way flow, and stripes emerge: pedestrians self-sort into counter-flowing lanes within seconds, without any agent intending to. The lanes are remarkably stable, and they appear in the data of real corridors at almost identical densities.</p>
<p data-para="C"><strong>C.</strong> What makes such models valuable is not their predictive precision — pedestrians, after all, can be willful — but the fact that they exhibit phase transitions. Below a critical density, flow is laminar and predictable. Above it, the same architectural geometry produces what Helbing has called "stop-and-go waves": clusters of motionless people separated by small bands of moving ones, perceptible only from above. Above a still higher critical density, the system can collapse into "crowd turbulence" — a regime in which individuals are pushed in directions unrelated to their intentions, and in which serious injuries become statistically likely.</p>
<p data-para="D"><strong>D.</strong> The 2010 Love Parade disaster in Duisburg, Germany, in which twenty-one people were killed, was a textbook crowd-turbulence event. Forensic reconstructions, drawing on more than five hundred sources of video footage, established that the local density at the access ramp had risen to roughly nine people per square metre — well into the turbulent regime. No individual stampede or panic event was identifiable. The deaths were a statistical consequence of a density profile.</p>
<p data-para="E"><strong>E.</strong> This finding has had implications for the design of mass-participation events. Pre-modelled flow simulations — once a curiosity — are now mandatory for major venues in much of the European Union. Door widths, ramp gradients, signage placements and stewarding densities are calibrated against the threshold values produced by social-force models. The "rule of three" — that an event should be designed so that local density never exceeds three persons per square metre, even at peak — has entered planning ordinance in several jurisdictions.</p>
<p data-para="F"><strong>F.</strong> The science is not without its critics. Sociologists have argued that the particle metaphor strips out exactly what makes a crowd a crowd: shared purpose, shared affect, the fluid alternation between cooperation and panic. Crowd researcher John Drury and others have contributed an alternative tradition emphasising "social identity" — the way crowds, especially in emergencies, often help one another rather than trample. The two traditions are not, in the end, incompatible. The social-force model describes the geometry of survival; the social-identity model describes who, within that geometry, looks out for whom.</p>
`,
      vocabulary: [
        {
          term: 'laminar',
          definition: 'Flowing smoothly in parallel layers without disruption between them.',
        },
        {
          term: 'phase transition',
          definition:
            'A change between states of matter, or by analogy a sharp shift in the behaviour of a system at a critical value.',
        },
        {
          term: 'stewarding',
          definition: 'The supervision and direction of a crowd at an event by trained personnel.',
        },
        {
          term: 'forensic',
          definition:
            'Relating to the use of scientific methods to investigate something, especially an incident or crime.',
          translation: 'pháp y / điều tra',
        },
      ],
      groups: [
        {
          id: 'r005-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r005-q1',
              number: 1,
              type: 'yes-no-not-given',
              statement:
                'The social-force model is valued primarily for its precise predictions of individual movement.',
              correctAnswer: 'NO',
              explanation:
                'Paragraph C says it is valued for showing phase transitions, not predictive precision.',
            },
            {
              id: 'r005-q2',
              number: 2,
              type: 'yes-no-not-given',
              statement:
                'Counter-flowing lanes in two-way corridors form deliberately, by agreement among pedestrians.',
              correctAnswer: 'NO',
              explanation: 'Paragraph B says lanes form "without any agent intending to".',
            },
            {
              id: 'r005-q3',
              number: 3,
              type: 'yes-no-not-given',
              statement: 'The 2010 Love Parade disaster was caused mainly by a panic stampede.',
              correctAnswer: 'NO',
              explanation: 'Paragraph D says no panic event was identifiable; it was statistical.',
            },
            {
              id: 'r005-q4',
              number: 4,
              type: 'yes-no-not-given',
              statement:
                'Some EU jurisdictions limit local crowd density to three persons per square metre.',
              correctAnswer: 'YES',
              explanation: 'Paragraph E describes the "rule of three".',
            },
            {
              id: 'r005-q5',
              number: 5,
              type: 'yes-no-not-given',
              statement:
                'Sociological critics argue that crowds invariably help rather than trample one another.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'Paragraph F says crowds "often help" — not invariably.',
            },
          ],
        },
        {
          id: 'r005-p1-g2',
          instruction: 'Questions 6–9 · Match each density regime with the correct description.',
          questions: [
            {
              id: 'r005-q6',
              number: 6,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Below the first critical density' },
                { id: 'item-2', text: 'Above the first critical density' },
                { id: 'item-3', text: 'Above the second critical density' },
                { id: 'item-4', text: 'Approximately 9 persons per square metre' },
              ],
              options: [
                { key: 'A', text: 'Stop-and-go waves' },
                { key: 'B', text: 'Crowd turbulence' },
                { key: 'C', text: 'Laminar, predictable flow' },
                { key: 'D', text: 'Density observed at the Duisburg disaster' },
              ],
              correctMapping: {
                'item-1': 'C',
                'item-2': 'A',
                'item-3': 'B',
                'item-4': 'D',
              },
              explanation: 'See paragraphs C and D.',
            },
            {
              id: 'r005-q7',
              number: 7,
              type: 'short-answer',
              question: 'In which year did Helbing formulate the social-force framework?',
              correctAnswer: '1995',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph B states 1995.',
            },
            {
              id: 'r005-q8',
              number: 8,
              type: 'short-answer',
              question:
                'What name did Helbing give to the regime of clustered, intermittently moving crowd flow?',
              correctAnswer: 'stop-and-go waves',
              acceptableVariants: ['stop and go waves', 'stop-and-go'],
              maxWords: 4,
              explanation: 'Paragraph C names them.',
            },
            {
              id: 'r005-q9',
              number: 9,
              type: 'short-answer',
              question:
                'How many video sources informed the forensic reconstruction of the Duisburg event?',
              correctAnswer: 'more than five hundred',
              acceptableVariants: ['five hundred', '500', 'over 500'],
              maxWords: 4,
              explanation: 'Paragraph D states "more than five hundred".',
            },
          ],
        },
        {
          id: 'r005-p1-g3',
          instruction: 'Questions 10–13 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r005-q10',
              number: 10,
              type: 'multiple-choice',
              prompt: 'According to the passage, what determines the value of crowd-flow models?',
              options: [
                { key: 'A', text: 'Their precise prediction of where individuals will walk.' },
                {
                  key: 'B',
                  text: 'Their identification of phase transitions and critical densities.',
                },
                { key: 'C', text: 'Their ability to predict panic events.' },
                { key: 'D', text: 'Their replication of architectural style.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C makes the phase-transition argument.',
            },
            {
              id: 'r005-q11',
              number: 11,
              type: 'multiple-choice',
              prompt: 'How is the "rule of three" implemented?',
              options: [
                { key: 'A', text: 'As a guideline only.' },
                { key: 'B', text: 'As planning ordinance in several jurisdictions.' },
                { key: 'C', text: 'As a Helbing personal preference.' },
                { key: 'D', text: 'As an EU directive.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E says it has entered planning ordinance.',
            },
            {
              id: 'r005-q12',
              number: 12,
              type: 'multiple-choice',
              prompt:
                'How does the writer characterise the relationship between social-force and social-identity models?',
              options: [
                { key: 'A', text: 'Mutually exclusive.' },
                { key: 'B', text: 'Identical.' },
                {
                  key: 'C',
                  text: 'Complementary, describing different aspects of the same phenomenon.',
                },
                { key: 'D', text: 'The writer takes no position.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph F says the two are not incompatible.',
            },
            {
              id: 'r005-q13',
              number: 13,
              type: 'multiple-choice',
              prompt: "The writer's tone in paragraph A is best described as",
              options: [
                { key: 'A', text: 'admiring.' },
                { key: 'B', text: 'sceptical.' },
                { key: 'C', text: 'precise and slightly wry.' },
                { key: 'D', text: 'alarmed.' },
              ],
              correctAnswer: 'C',
              explanation:
                '"With deliberate imprecision" and the comparisons signal a wry, precise tone.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-005-p2',
      number: 2,
      title: 'Anonymous Authorship and Stylometry',
      wordCount: 530,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The pamphlet is one of the more durable casualties of the digital age. For three centuries it was the favoured medium of political dissent — short, cheap, anonymous, frequently libellous. The English Civil War alone produced an estimated 22,000 pamphlets, the great majority unsigned or signed only with a pseudonym. The question of who wrote what was, for the historians of those wars, not an academic curiosity but a foundational research problem.</p>
<p data-para="B"><strong>B.</strong> The earliest attempts at attribution were impressionistic. A scholar would read a disputed text alongside a confirmed one, note the recurrence of distinctive phrases, and pronounce the question settled. The method worked unevenly. Skilled writers can imitate; conscientious ones can vary their style; the absence of a phrase proves nothing. By the late nineteenth century the more scrupulous attributions had begun to fall, leaving disputes that had once seemed settled — Junius, the authorship of certain Federalist Papers, the "Shakespeare apocrypha" — once again open.</p>
<p data-para="C"><strong>C.</strong> The first quantitative attempt at attribution is usually credited to the American physicist T.C. Mendenhall, who in 1887 measured the distribution of word lengths in disputed and confirmed Shakespeare texts. The method was crude but suggestive: word-length distributions, although obviously affected by genre and topic, are not easily forged. Mendenhall's larger ambitions were premature. The decisive step came almost a century later.</p>
<p data-para="D"><strong>D.</strong> In 1964, Frederick Mosteller and David Wallace published their analysis of the disputed Federalist Papers — the twelve essays known to be by either Hamilton or Madison but contested between them. They counted the rates at which the two authors used short, unconscious "function words": <em>upon, while, by, also, an, of, on</em>. Hamilton used <em>upon</em> at roughly six times the rate of Madison; the difference was statistically significant; the disputed twelve fell decisively on Madison's side. The book they published has since been read as much for its statistics as for its history.</p>
<p data-para="E"><strong>E.</strong> The technique they pioneered, now called stylometry, has matured. Modern stylometric tools count not just function words but n-grams of letters, parts of speech, sentence-length distributions, and a wide range of other statistical features. Machine-learning classifiers, trained on a few thousand words of confirmed text, can identify a contested writer with an accuracy above 90 per cent in most languages. In 2013 the technique unmasked a debut crime novelist as J. K. Rowling within hours of publication; in 2018 it was used to identify the anonymous "Op-Ed by a senior official" in the New York Times.</p>
<p data-para="F"><strong>F.</strong> Stylometry has limits. It works on substantial samples — a few hundred words of disputed text are usually too few. It struggles with deliberate stylistic disguise by a sufficiently sophisticated author, and it produces probabilities, not proofs. Above all, it is at its weakest where intuitive attribution was always at its weakest: where the candidate authors are stylistically similar, work in similar genres, and have small confirmed samples. In other words, the cases that most resist intuition are also those that most resist stylometry. The promise of the discipline lies less in solving every dispute than in disciplining the conversation around the disputes that remain.</p>
`,
      vocabulary: [
        {
          term: 'pseudonym',
          definition: 'A fictitious name, especially one used by an author.',
          translation: 'bút danh',
        },
        {
          term: 'attribution',
          definition: 'The action of regarding a work as belonging to a particular author.',
        },
        {
          term: 'n-gram',
          definition: 'A contiguous sequence of n items from a given text or speech sample.',
        },
        {
          term: 'libellous',
          definition: 'Containing or constituting a libel; defamatory in published form.',
          translation: 'mang tính phỉ báng',
        },
      ],
      groups: [
        {
          id: 'r005-p2-g1',
          instruction: 'Questions 14–18 · Choose the correct heading for paragraphs B, C, D, E, F.',
          questions: [
            {
              id: 'r005-q14',
              number: 14,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'Mendenhall and the first quantitative attempt' },
                { key: 'ii', text: 'The decisive Federalist study' },
                { key: 'iii', text: 'Modern stylometry and machine learning' },
                { key: 'iv', text: 'Limits of the technique' },
                { key: 'v', text: 'The unreliability of impressionistic attribution' },
                { key: 'vi', text: 'A foundational problem of the pamphlet age' },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph B describes the unreliable early method.',
            },
            {
              id: 'r005-q15',
              number: 15,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'Mendenhall and the first quantitative attempt' },
                { key: 'ii', text: 'The decisive Federalist study' },
                { key: 'iii', text: 'Modern stylometry and machine learning' },
                { key: 'iv', text: 'Limits of the technique' },
                { key: 'v', text: 'The unreliability of impressionistic attribution' },
                { key: 'vi', text: 'A foundational problem of the pamphlet age' },
              ],
              correctAnswer: 'i',
              explanation: 'Paragraph C is about Mendenhall.',
            },
            {
              id: 'r005-q16',
              number: 16,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'Mendenhall and the first quantitative attempt' },
                { key: 'ii', text: 'The decisive Federalist study' },
                { key: 'iii', text: 'Modern stylometry and machine learning' },
                { key: 'iv', text: 'Limits of the technique' },
                { key: 'v', text: 'The unreliability of impressionistic attribution' },
                { key: 'vi', text: 'A foundational problem of the pamphlet age' },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph D is the Mosteller-Wallace study.',
            },
            {
              id: 'r005-q17',
              number: 17,
              type: 'matching-headings',
              paragraphId: 'E',
              headings: [
                { key: 'i', text: 'Mendenhall and the first quantitative attempt' },
                { key: 'ii', text: 'The decisive Federalist study' },
                { key: 'iii', text: 'Modern stylometry and machine learning' },
                { key: 'iv', text: 'Limits of the technique' },
                { key: 'v', text: 'The unreliability of impressionistic attribution' },
                { key: 'vi', text: 'A foundational problem of the pamphlet age' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph E describes modern tools and ML.',
            },
            {
              id: 'r005-q18',
              number: 18,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'Mendenhall and the first quantitative attempt' },
                { key: 'ii', text: 'The decisive Federalist study' },
                { key: 'iii', text: 'Modern stylometry and machine learning' },
                { key: 'iv', text: 'Limits of the technique' },
                { key: 'v', text: 'The unreliability of impressionistic attribution' },
                { key: 'vi', text: 'A foundational problem of the pamphlet age' },
              ],
              correctAnswer: 'iv',
              explanation: 'Paragraph F discusses limits.',
            },
          ],
        },
        {
          id: 'r005-p2-g2',
          instruction:
            'Questions 19–23 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r005-q19',
              number: 19,
              type: 'true-false-not-given',
              statement:
                'Mendenhall measured the rates of "function words" in Shakespeare\'s plays.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph C says he measured word-length distributions.',
            },
            {
              id: 'r005-q20',
              number: 20,
              type: 'true-false-not-given',
              statement:
                'Mosteller and Wallace concluded the disputed Federalist papers were by Madison.',
              correctAnswer: 'TRUE',
              explanation: "Paragraph D says they fell on Madison's side.",
            },
            {
              id: 'r005-q21',
              number: 21,
              type: 'true-false-not-given',
              statement: 'Modern stylometric tools require novel-length samples to function.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph E says a few thousand words of training text suffice.',
            },
            {
              id: 'r005-q22',
              number: 22,
              type: 'true-false-not-given',
              statement:
                'The 2018 New York Times Op-Ed was anonymously written by a senior official.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph E identifies it.',
            },
            {
              id: 'r005-q23',
              number: 23,
              type: 'true-false-not-given',
              statement: 'Stylometry can be defeated by sophisticated stylistic disguise.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph F: it "struggles with deliberate stylistic disguise".',
            },
          ],
        },
        {
          id: 'r005-p2-g3',
          instruction:
            'Questions 24–26 · Answer the questions. NO MORE THAN THREE WORDS for each answer.',
          questions: [
            {
              id: 'r005-q24',
              number: 24,
              type: 'short-answer',
              question: 'In what year did Mosteller and Wallace publish their Federalist analysis?',
              correctAnswer: '1964',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph D states 1964.',
            },
            {
              id: 'r005-q25',
              number: 25,
              type: 'short-answer',
              question:
                'Which short word did Hamilton use roughly six times more frequently than Madison?',
              correctAnswer: 'upon',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph D names "upon".',
            },
            {
              id: 'r005-q26',
              number: 26,
              type: 'short-answer',
              question:
                'Which novelist did stylometry unmask in 2013, hours after the book was published?',
              correctAnswer: 'J. K. Rowling',
              acceptableVariants: ['JK Rowling', 'Rowling', 'J K Rowling'],
              maxWords: 3,
              explanation: 'Paragraph E.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-005-p3',
      number: 3,
      title: 'Antibiotic Resistance — A Slow Catastrophe',
      wordCount: 560,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The discovery of penicillin in 1928 is conventionally treated as the founding moment of the antibiotic era. The half-century that followed, from 1940 to 1990, is sometimes called the antibiotic golden age — a period in which entire categories of bacterial infection were rendered, for practical purposes, curable. The mortality of bacterial pneumonia in young adults fell from around 30 per cent to under 5. Surgery became routinely safe; childbirth ceased to be a leading cause of female death.</p>
<p data-para="B"><strong>B.</strong> Resistance was, however, present from the beginning. Alexander Fleming, in his 1945 Nobel acceptance speech, warned that under-dosing penicillin would select for resistant strains and "make penicillin useless." The first reports of penicillin-resistant <em>Staphylococcus aureus</em> appeared in 1947 — three years after the drug's wide release. The pattern repeated for every subsequent antibiotic class. Resistance has, on average, emerged within ten years of clinical introduction; for some agents, within months.</p>
<p data-para="C"><strong>C.</strong> The mechanisms are diverse but share a logic. Bacteria have short generations and large populations, two conditions that compress evolutionary timescales. Mutations conferring even partial resistance are amplified by the selective pressure of antibiotic exposure. Worse, resistance genes can be transferred horizontally, between bacterial species, on small circular DNA molecules called plasmids. A gene that arises in livestock can move into a human pathogen by a route as banal as a shared drinking trough. The standard models of vertical inheritance from a parent organism do not apply.</p>
<p data-para="D"><strong>D.</strong> The practical situation in 2024 is grim. The World Health Organization estimates that drug-resistant infections directly killed 1.27 million people in 2019, and contributed to nearly 5 million further deaths. The economic cost — productivity lost, hospital stays prolonged, surgeries postponed — runs to roughly one trillion US dollars annually by some projections. <em>Acinetobacter baumannii</em>, <em>Pseudomonas aeruginosa</em> and several Enterobacteriaceae routinely resist every antibiotic in standard hospital arsenals. The clinical term, "pan-resistant," is no longer rhetorical.</p>
<p data-para="E"><strong>E.</strong> Drug development has not kept pace. No genuinely novel class of antibiotic has been brought to market since the lipopeptides in 1987. The pharmaceutical economics are unforgiving. A new antibiotic, by the moment it succeeds, will be reserved for use against the small subset of patients for whom no alternative exists. Reserved use means small sales; small sales mean small return on investment; investment has accordingly retreated. Several mid-sized firms with promising antibiotics in the pipeline went bankrupt in the 2010s.</p>
<p data-para="F"><strong>F.</strong> The policy response has been threefold. Stewardship programmes, restricting prescription practices in hospitals, have demonstrably slowed the spread of resistance where they are well-implemented. Surveillance systems, including the WHO's GLASS network, now collate resistance data across more than ninety countries. And new financial mechanisms — "subscription" payments that pay developers a fixed annual sum independent of sales volume — have been piloted in Britain, Sweden and the United States to break the unfavourable economics. Whether these measures collectively will outpace the evolution of resistance is, at present, an open question. The optimistic case is that they buy decades; the pessimistic case is that they buy years.</p>
`,
      vocabulary: [
        {
          term: 'plasmid',
          definition:
            'A small circular DNA molecule, separate from chromosomal DNA, often carrying resistance genes between bacteria.',
        },
        {
          term: 'horizontal gene transfer',
          definition:
            'The movement of genetic material between organisms other than by descent from parent to offspring.',
        },
        {
          term: 'stewardship',
          definition:
            'Careful and responsible management of a resource — here, antibiotic prescribing.',
          translation: 'quản lý có trách nhiệm',
        },
        {
          term: 'pathogen',
          definition: 'An organism that causes disease.',
          translation: 'mầm bệnh',
        },
        {
          term: 'pan-resistant',
          definition: 'Resistant to all available antibiotic classes for that organism.',
        },
      ],
      groups: [
        {
          id: 'r005-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r005-q27',
              number: 27,
              type: 'yes-no-not-given',
              statement: 'Penicillin resistance was unforeseen by its discoverer.',
              correctAnswer: 'NO',
              explanation: "Paragraph B notes Fleming's 1945 warning.",
            },
            {
              id: 'r005-q28',
              number: 28,
              type: 'yes-no-not-given',
              statement:
                'Resistance to a new antibiotic typically emerges within decades of release.',
              correctAnswer: 'NO',
              explanation: 'Paragraph B says on average within ten years; sometimes months.',
            },
            {
              id: 'r005-q29',
              number: 29,
              type: 'yes-no-not-given',
              statement: 'Resistance genes can move between bacterial species.',
              correctAnswer: 'YES',
              explanation: 'Paragraph C describes horizontal transfer via plasmids.',
            },
            {
              id: 'r005-q30',
              number: 30,
              type: 'yes-no-not-given',
              statement: 'No new antibiotic class has reached the market for nearly four decades.',
              correctAnswer: 'YES',
              explanation: 'Paragraph E states the lipopeptides of 1987.',
            },
            {
              id: 'r005-q31',
              number: 31,
              type: 'yes-no-not-given',
              statement: 'Pharmaceutical economics favour antibiotic development.',
              correctAnswer: 'NO',
              explanation: 'Paragraph E describes the economics as unforgiving.',
            },
            {
              id: 'r005-q32',
              number: 32,
              type: 'yes-no-not-given',
              statement:
                'Subscription payment models have replaced traditional drug pricing in most countries.',
              correctAnswer: 'NOT GIVEN',
              explanation:
                'The passage names three pilot countries but says nothing about replacement elsewhere.',
            },
          ],
        },
        {
          id: 'r005-p3-g2',
          instruction: 'Questions 33–36 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r005-q33',
              number: 33,
              type: 'multiple-choice',
              prompt:
                'In the cited 2019 estimates, drug-resistant infections directly killed approximately',
              options: [
                { key: 'A', text: '127,000 people.' },
                { key: 'B', text: '1.27 million people.' },
                { key: 'C', text: '5 million people.' },
                { key: 'D', text: '12.7 million people.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r005-q34',
              number: 34,
              type: 'multiple-choice',
              prompt: 'Which two factors compress the evolutionary timescale of bacteria?',
              options: [
                { key: 'A', text: 'Their slow metabolism and large size.' },
                { key: 'B', text: 'Their short generations and large populations.' },
                { key: 'C', text: 'Their fragility and isolation.' },
                { key: 'D', text: 'Their preference for cool temperatures.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C names short generations and large populations.',
            },
            {
              id: 'r005-q35',
              number: 35,
              type: 'multiple-choice',
              prompt:
                'What does the writer mean by saying that "pan-resistant" is no longer rhetorical?',
              options: [
                { key: 'A', text: 'The term has lost its meaning.' },
                { key: 'B', text: 'Truly pan-resistant strains exist in clinical reality.' },
                { key: 'C', text: 'The term has been redefined.' },
                { key: 'D', text: 'The term refers only to laboratory strains.' },
              ],
              correctAnswer: 'B',
              explanation:
                'The writer indicates that strains resisting every available antibiotic now exist in hospitals.',
            },
            {
              id: 'r005-q36',
              number: 36,
              type: 'multiple-choice',
              prompt:
                "In paragraph F, what is the writer's view of the prospects for current policy?",
              options: [
                { key: 'A', text: 'Optimistic.' },
                { key: 'B', text: 'Pessimistic.' },
                { key: 'C', text: 'Cautious — the question is open.' },
                { key: 'D', text: 'The writer does not say.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph F states the question is "open".',
            },
          ],
        },
        {
          id: 'r005-p3-g3',
          instruction:
            'Questions 37–40 · Complete the summary. Choose NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r005-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore:
                'Resistance genes are transmitted between species on small DNA molecules called',
              sentenceAfter: '.',
              correctAnswer: 'plasmids',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r005-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore:
                'Hospital prescribing programmes that aim to slow resistance are known as',
              sentenceAfter: 'programmes.',
              correctAnswer: 'stewardship',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph F.',
            },
            {
              id: 'r005-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore: "The WHO's global resistance-monitoring system is called",
              sentenceAfter: '.',
              correctAnswer: 'GLASS',
              acceptableVariants: ['the GLASS network'],
              maxWords: 3,
              explanation: 'Paragraph F.',
            },
            {
              id: 'r005-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore:
                'New financial mechanisms in which firms are paid a fixed annual sum are known as',
              sentenceAfter: 'payments.',
              correctAnswer: 'subscription',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
  ],
}
