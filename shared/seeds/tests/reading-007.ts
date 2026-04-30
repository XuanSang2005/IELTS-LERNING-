import type { Test } from '../../schemas/test'

export const reading007: Test = {
  id: 'reading-007',
  skill: 'reading',
  title: 'Reading Test 07',
  description:
    'Three passages on coral reefs, the engineering of the Roman aqueduct, and the science of musical memory.',
  difficulty: 'intermediate',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-23',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-007-p1',
      number: 1,
      title: 'Coral Reefs Under Pressure',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Coral reefs occupy less than one-tenth of one per cent of the ocean floor, yet they support roughly a quarter of all marine species. They feed half a billion people directly. They protect coastlines from storm surges; their diversity has produced compounds now used in cancer therapy and antiviral medicine. By any reasonable measure, the reef is among the most productive ecosystems on the planet.</p>
<p data-para="B"><strong>B.</strong> The reef\'s productivity rests on a narrow biological partnership. The coral is a transparent animal — a polyp — that secretes a calcium-carbonate exoskeleton. Inside its tissues lives a microscopic algae, the zooxanthella, which photosynthesises and supplies the polyp with up to 90 per cent of its energy. The reef\'s vivid colours are largely the colours of the algae. The coral itself is colourless.</p>
<p data-para="C"><strong>C.</strong> The partnership is fragile. When water temperatures rise even one or two degrees Celsius above the regional summer maximum, the polyp expels its zooxanthellae. The exposed white skeleton beneath gives the phenomenon its name: <em>bleaching</em>. A bleached coral is not necessarily dead. If temperatures fall within a few weeks, the algae can recolonise and the coral recover. If temperatures remain elevated for longer, the coral starves.</p>
<p data-para="D"><strong>D.</strong> Mass bleaching events were essentially unknown before the 1980s. The first global event recorded by the International Society for Reef Studies was in 1998, in which approximately sixteen per cent of the world\'s reefs were lost. The 2014–2017 event was longer and more severe; the Great Barrier Reef alone lost roughly half its coral cover. A fourth global event was confirmed in 2024.</p>
<p data-para="E"><strong>E.</strong> The thermal threshold is not the only stressor. Ocean acidification — the dissolution of additional atmospheric carbon dioxide into seawater — slows the rate at which coral can secrete its skeleton. Nutrient runoff from agricultural land favours macroalgae that smother coral. Crown-of-thorns starfish, an aggressive predator of coral polyps, have undergone repeated population explosions, possibly linked to nutrient runoff. The reef faces a compound emergency.</p>
<p data-para="F"><strong>F.</strong> Conservation responses are necessarily varied. Reductions in atmospheric carbon dioxide are the only intervention that can address bleaching at scale; nothing else, in the long run, will do. Local interventions — protecting catchments, controlling fishing pressure, managing crown-of-thorns outbreaks — buy time. Selective breeding of heat-tolerant coral, attempted in research stations on the Great Barrier Reef, may transplant some resilience into wild populations. Whether the engineered solutions can keep pace with thermal stress is unknown. The honest answer, in 2026, is that they almost certainly cannot, but that they may slow the loss enough to matter.</p>
`,
      vocabulary: [
        {
          term: 'zooxanthella',
          definition: 'A microscopic algae living symbiotically inside coral tissue.',
        },
        {
          term: 'polyp',
          definition: 'The individual coral animal that secretes the reef-building skeleton.',
        },
        {
          term: 'bleaching',
          definition:
            'The expulsion by coral of its symbiotic algae, leaving the white skeleton exposed.',
          translation: 'sự tẩy trắng san hô',
        },
        {
          term: 'acidification',
          definition:
            'A decrease in pH; here, the gradual lowering of ocean pH due to absorbed CO₂.',
          translation: 'sự axit hoá',
        },
        {
          term: 'macroalgae',
          definition: 'Larger forms of algae, including seaweeds, which can smother coral.',
        },
      ],
      groups: [
        {
          id: 'r007-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r007-q1',
              number: 1,
              type: 'true-false-not-given',
              statement: 'Coral reefs support roughly a quarter of marine species.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r007-q2',
              number: 2,
              type: 'true-false-not-given',
              statement: 'The vivid colours of a reef come primarily from coral pigments.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B says the colours come from the algae.',
            },
            {
              id: 'r007-q3',
              number: 3,
              type: 'true-false-not-given',
              statement: 'A bleached coral is always dead.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph C says it can recover within a few weeks.',
            },
            {
              id: 'r007-q4',
              number: 4,
              type: 'true-false-not-given',
              statement: 'Mass bleaching events were common before the 1980s.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph D says they were essentially unknown before the 1980s.',
            },
            {
              id: 'r007-q5',
              number: 5,
              type: 'true-false-not-given',
              statement: 'Crown-of-thorns starfish prey on coral polyps.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph E names them as aggressive predators.',
            },
          ],
        },
        {
          id: 'r007-p1-g2',
          instruction: 'Questions 6–9 · Choose the correct heading for paragraphs B, C, E, F.',
          questions: [
            {
              id: 'r007-q6',
              number: 6,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'A history of mass bleaching events' },
                { key: 'ii', text: 'The biological partnership behind the reef' },
                { key: 'iii', text: 'Multiple stressors beyond temperature' },
                { key: 'iv', text: 'Why bleaching occurs' },
                { key: 'v', text: 'The complex global response' },
                { key: 'vi', text: "The reef's ecological importance" },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph B describes the symbiosis.',
            },
            {
              id: 'r007-q7',
              number: 7,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'A history of mass bleaching events' },
                { key: 'ii', text: 'The biological partnership behind the reef' },
                { key: 'iii', text: 'Multiple stressors beyond temperature' },
                { key: 'iv', text: 'Why bleaching occurs' },
                { key: 'v', text: 'The complex global response' },
                { key: 'vi', text: "The reef's ecological importance" },
              ],
              correctAnswer: 'iv',
              explanation: 'Paragraph C explains the bleaching mechanism.',
            },
            {
              id: 'r007-q8',
              number: 8,
              type: 'matching-headings',
              paragraphId: 'E',
              headings: [
                { key: 'i', text: 'A history of mass bleaching events' },
                { key: 'ii', text: 'The biological partnership behind the reef' },
                { key: 'iii', text: 'Multiple stressors beyond temperature' },
                { key: 'iv', text: 'Why bleaching occurs' },
                { key: 'v', text: 'The complex global response' },
                { key: 'vi', text: "The reef's ecological importance" },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph E lists multiple non-thermal stressors.',
            },
            {
              id: 'r007-q9',
              number: 9,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'A history of mass bleaching events' },
                { key: 'ii', text: 'The biological partnership behind the reef' },
                { key: 'iii', text: 'Multiple stressors beyond temperature' },
                { key: 'iv', text: 'Why bleaching occurs' },
                { key: 'v', text: 'The complex global response' },
                { key: 'vi', text: "The reef's ecological importance" },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph F discusses the response.',
            },
          ],
        },
        {
          id: 'r007-p1-g3',
          instruction:
            'Questions 10–13 · Answer the questions. NO MORE THAN THREE WORDS for each answer.',
          questions: [
            {
              id: 'r007-q10',
              number: 10,
              type: 'short-answer',
              question: 'What is the name of the algae living inside coral tissues?',
              correctAnswer: 'zooxanthella',
              acceptableVariants: ['zooxanthellae'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r007-q11',
              number: 11,
              type: 'short-answer',
              question: "Up to what percentage of the polyp's energy is supplied by the algae?",
              correctAnswer: '90 per cent',
              acceptableVariants: ['90%', '90 percent', 'ninety per cent'],
              maxWords: 3,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r007-q12',
              number: 12,
              type: 'short-answer',
              question: 'In which year did the first globally recorded mass bleaching event occur?',
              correctAnswer: '1998',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r007-q13',
              number: 13,
              type: 'short-answer',
              question:
                'Roughly how much coral cover did the Great Barrier Reef lose during the 2014–2017 event?',
              correctAnswer: 'half',
              acceptableVariants: ['roughly half', 'about half', 'fifty per cent'],
              maxWords: 3,
              explanation: 'Paragraph D.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-007-p2',
      number: 2,
      title: 'Engineering of the Roman Aqueduct',
      wordCount: 500,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> By the second century AD, the city of Rome was supplied with water through eleven aqueducts, drawing from springs and lakes as far as ninety kilometres from the city. The combined daily volume — variously estimated between 500,000 and 1,000,000 cubic metres — exceeded the per-capita consumption of most modern cities. The water was used not only for drinking but for the public baths, the latrines, the fountains, and the famously elaborate gardens of wealthy Romans.</p>
<p data-para="B"><strong>B.</strong> The engineering principle was unspectacular. Roman aqueducts moved water by gravity alone — there were no pumps. The slope from source to city was, on average, only three or four metres per kilometre. Maintaining such a slope across uneven terrain, while keeping the water clean and the channel shallow enough to avoid scouring, was a substantial cartographic and surveying problem. The Roman <em>chorobates</em>, a precision water-level several metres long, was the principal instrument.</p>
<p data-para="C"><strong>C.</strong> Most of the aqueduct\'s length, including the bulk of the famously long Aqua Marcia, ran underground or in covered stone channels. Arched bridges crossed valleys; siphons, in which water descended one slope and rose up another in a sealed pipe, crossed the deepest. The visible Roman aqueduct of popular memory — the Pont du Gard, the Segovia arches — was actually the rarer case. Where the engineer could keep the channel hidden and shallow, he did.</p>
<p data-para="D"><strong>D.</strong> Water quality was managed at the source and along the route. Settling tanks (<em>piscinae limariae</em>) at intervals slowed the flow and allowed silt to deposit. Calcareous deposits accumulated on channel walls — modern archaeologists use these layers, like tree rings, to date episodes of repair. Within the city, a distribution network of lead pipes (<em>fistulae</em>) supplied private homes, although most ordinary Romans collected water from public street fountains.</p>
<p data-para="E"><strong>E.</strong> The administrative apparatus was substantial. Frontinus, who served as <em>curator aquarum</em> (water commissioner) under Trajan, recorded in his treatise <em>De Aquaeductu</em> that hundreds of slaves and freedmen were employed in maintenance. He also catalogued an extensive culture of unauthorised tapping, citing illegal pipes drilled into the channels by both private homes and corrupt officials. His estimate that almost half of the supplied water was lost to leaks, theft and overflow may have been deliberately inflated for political purposes.</p>
<p data-para="F"><strong>F.</strong> The aqueducts continued to operate for centuries after the western empire\'s political collapse. They were partially destroyed during the Gothic siege of Rome in 537 AD, and never fully restored. The fountains of medieval and Renaissance Rome ran on patched fragments of the old system; some surviving sections supply water to this day, sixteen hundred years later. By any measure, they remain among the longest-functioning engineering works ever constructed.</p>
`,
      vocabulary: [
        {
          term: 'siphon',
          definition:
            'A pipe used to convey liquid up and over an obstacle by atmospheric pressure.',
        },
        {
          term: 'chorobates',
          definition: 'A precision Roman water-level used in surveying.',
        },
        {
          term: 'curator',
          definition:
            'A keeper or superintendent; here, the official in charge of the water supply.',
          translation: 'người phụ trách',
        },
        {
          term: 'calcareous',
          definition: 'Containing calcium carbonate; chalky.',
        },
      ],
      groups: [
        {
          id: 'r007-p2-g1',
          instruction: 'Questions 14–18 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r007-q14',
              number: 14,
              type: 'multiple-choice',
              prompt: 'Roughly how many aqueducts supplied Rome by the second century AD?',
              options: [
                { key: 'A', text: 'Three.' },
                { key: 'B', text: 'Eleven.' },
                { key: 'C', text: 'Twenty.' },
                { key: 'D', text: 'Fifty.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph A states eleven.',
            },
            {
              id: 'r007-q15',
              number: 15,
              type: 'multiple-choice',
              prompt: 'How was the water moved in Roman aqueducts?',
              options: [
                { key: 'A', text: 'By steam pumps.' },
                { key: 'B', text: 'By gravity alone.' },
                { key: 'C', text: 'By slave labour pulling chains.' },
                { key: 'D', text: 'By wind power.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph B states gravity alone, no pumps.',
            },
            {
              id: 'r007-q16',
              number: 16,
              type: 'multiple-choice',
              prompt: "Where was most of the aqueduct's length actually located?",
              options: [
                { key: 'A', text: 'On arched bridges high above the ground.' },
                { key: 'B', text: 'Under sealed pressurised pipes only.' },
                { key: 'C', text: 'Underground or in covered stone channels.' },
                { key: 'D', text: 'On open hillsides.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph C states most ran underground or in covered channels.',
            },
            {
              id: 'r007-q17',
              number: 17,
              type: 'multiple-choice',
              prompt: 'How did Romans use settling tanks?',
              options: [
                { key: 'A', text: 'To pump water uphill.' },
                { key: 'B', text: 'To slow the flow and allow silt to deposit.' },
                { key: 'C', text: 'To heat the water.' },
                { key: 'D', text: 'To purify water with chemicals.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r007-q18',
              number: 18,
              type: 'multiple-choice',
              prompt:
                "According to the passage, why might Frontinus's leakage estimate have been inflated?",
              options: [
                { key: 'A', text: 'For mathematical convenience.' },
                { key: 'B', text: 'For political reasons.' },
                { key: 'C', text: 'Because his measuring tools were poor.' },
                { key: 'D', text: 'Because he was paid by the leak.' },
              ],
              correctAnswer: 'B',
              explanation:
                'Paragraph E says it may have been "deliberately inflated for political purposes".',
            },
          ],
        },
        {
          id: 'r007-p2-g2',
          instruction:
            'Questions 19–22 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r007-q19',
              number: 19,
              type: 'true-false-not-given',
              statement: 'Most ordinary Romans had private home water supply.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph D says most collected from public fountains.',
            },
            {
              id: 'r007-q20',
              number: 20,
              type: 'true-false-not-given',
              statement: 'Calcareous deposits in the channels are used to date repairs.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D states this.',
            },
            {
              id: 'r007-q21',
              number: 21,
              type: 'true-false-not-given',
              statement: 'The Pont du Gard is in Italy.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage names it as an example but does not state location.',
            },
            {
              id: 'r007-q22',
              number: 22,
              type: 'true-false-not-given',
              statement: 'Some Roman aqueduct sections supply water in modern times.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph F states this.',
            },
          ],
        },
        {
          id: 'r007-p2-g3',
          instruction:
            'Questions 23–26 · Complete each sentence with NO MORE THAN THREE WORDS from the passage.',
          questions: [
            {
              id: 'r007-q23',
              number: 23,
              type: 'sentence-completion',
              sentenceBefore: 'The principal Roman surveying instrument was the',
              sentenceAfter: '.',
              correctAnswer: 'chorobates',
              acceptableVariants: ['chorobate'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r007-q24',
              number: 24,
              type: 'sentence-completion',
              sentenceBefore: 'Lead distribution pipes within the city were called',
              sentenceAfter: '.',
              correctAnswer: 'fistulae',
              acceptableVariants: ['fistula'],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r007-q25',
              number: 25,
              type: 'sentence-completion',
              sentenceBefore: "Frontinus's position was titled",
              sentenceAfter: '.',
              correctAnswer: 'curator aquarum',
              acceptableVariants: ['curator'],
              maxWords: 3,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r007-q26',
              number: 26,
              type: 'sentence-completion',
              sentenceBefore: 'The aqueducts were partially destroyed in 537 AD during the',
              sentenceAfter: 'of Rome.',
              correctAnswer: 'Gothic siege',
              acceptableVariants: ['Gothic siege of Rome', 'siege'],
              maxWords: 3,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-007-p3',
      number: 3,
      title: 'Music and Memory',
      wordCount: 520,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Most adults can sing fragments of songs they have not heard for decades. The melody of a primary-school anthem, the chorus of a piece of incidental film music, the jingle of a discontinued advertisement — these survive remarkably well in long-term memory, often more reliably than verbal information of comparable age. The reasons for this durability are now reasonably well understood, and they have begun to attract the attention of clinicians treating cognitive decline.</p>
<p data-para="B"><strong>B.</strong> Music is encoded redundantly. A song carries melodic, harmonic, rhythmic, lyric and emotional information simultaneously, and the brain processes these in partially overlapping but distinct networks. To recall the song requires only that one of these networks fire effectively; the others can follow. The auditory cortex contributes the melodic skeleton; the supplementary motor area contributes rhythm; the limbic system contributes emotional charge. The redundancy is the durability.</p>
<p data-para="C"><strong>C.</strong> Memory for music is also disproportionately formed during adolescence. Cross-cultural studies have repeatedly shown that the songs people remember most vividly were popular when they were between roughly fourteen and twenty-two. The phenomenon, sometimes called the "reminiscence bump," appears in autobiographical memory more generally, but it is especially pronounced for music. The bump may reflect the heightened emotional intensity, identity formation and social bonding of those years.</p>
<p data-para="D"><strong>D.</strong> Clinical observations have followed. Patients with advanced Alzheimer\'s disease, who may no longer recognise their own children, can often sing along with songs from their youth, sometimes flawlessly. The phenomenon was first systematically described by the British music therapist Concetta Tomaino in the 1980s and has since been documented in dozens of studies. The leading hypothesis is that the regions of the brain associated with the most-rehearsed musical memories — primarily the auditory cortex and adjacent areas — are among the last to be affected by Alzheimer\'s pathology.</p>
<p data-para="E"><strong>E.</strong> Therapeutic applications have followed clinical observation. The "Music & Memory" programme, founded in 2010 in the United States, distributes personalised playlists to nursing-home residents. Carers report calmer behaviour, improved engagement and, in some cases, the temporary return of conversational ability. The systematic evidence is mixed but generally encouraging. A 2018 Cochrane review concluded that music therapy probably reduces depressive symptoms in dementia patients and may improve quality of life.</p>
<p data-para="F"><strong>F.</strong> The neuroscience is unlikely to overturn the basic clinical picture. What it has done is render it less surprising. Memories that are encoded redundantly, in early adulthood, with strong emotional charge, in regions resistant to neurodegeneration, will tend to survive when other memories do not. The lesson, perhaps, is that the songs of one\'s youth are not merely sentimental: they are, in a quite literal neurological sense, among the last things to go.</p>
`,
      vocabulary: [
        {
          term: 'reminiscence bump',
          definition:
            'The tendency of older adults to recall a disproportionate number of memories from their adolescence and early adulthood.',
        },
        {
          term: 'limbic system',
          definition: 'A set of brain structures involved in emotion, motivation and memory.',
        },
        {
          term: 'pathology',
          definition:
            'The structural and functional disease processes occurring in body or brain tissue.',
        },
        {
          term: 'redundantly',
          definition:
            'In a manner that involves repetition or excess capacity, providing protection against loss.',
        },
      ],
      groups: [
        {
          id: 'r007-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r007-q27',
              number: 27,
              type: 'yes-no-not-given',
              statement: 'Music memories survive better than comparable verbal information.',
              correctAnswer: 'YES',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r007-q28',
              number: 28,
              type: 'yes-no-not-given',
              statement: 'Music is encoded in a single brain network.',
              correctAnswer: 'NO',
              explanation: 'Paragraph B describes overlapping but distinct networks.',
            },
            {
              id: 'r007-q29',
              number: 29,
              type: 'yes-no-not-given',
              statement:
                'Reminiscence-bump memories are most vivid for songs heard between ages fourteen and twenty-two.',
              correctAnswer: 'YES',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r007-q30',
              number: 30,
              type: 'yes-no-not-given',
              statement: 'Music & Memory was founded in 2005.',
              correctAnswer: 'NO',
              explanation: 'Paragraph E says 2010.',
            },
            {
              id: 'r007-q31',
              number: 31,
              type: 'yes-no-not-given',
              statement: 'The 2018 Cochrane review found music therapy cures dementia.',
              correctAnswer: 'NO',
              explanation: 'Paragraph E reports symptom reduction, not cure.',
            },
            {
              id: 'r007-q32',
              number: 32,
              type: 'yes-no-not-given',
              statement: 'Music therapy is universally available in nursing homes.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage does not address universal availability.',
            },
          ],
        },
        {
          id: 'r007-p3-g2',
          instruction: 'Questions 33–36 · Match each contribution to its brain region.',
          questions: [
            {
              id: 'r007-q33',
              number: 33,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Melodic skeleton' },
                { id: 'item-2', text: 'Rhythmic structure' },
                { id: 'item-3', text: 'Emotional charge' },
                { id: 'item-4', text: 'First systematic clinical description' },
              ],
              options: [
                { key: 'A', text: 'Auditory cortex' },
                { key: 'B', text: 'Supplementary motor area' },
                { key: 'C', text: 'Limbic system' },
                { key: 'D', text: 'Concetta Tomaino' },
              ],
              correctMapping: {
                'item-1': 'A',
                'item-2': 'B',
                'item-3': 'C',
                'item-4': 'D',
              },
              explanation: 'Paragraphs B and D.',
            },
            {
              id: 'r007-q34',
              number: 34,
              type: 'multiple-choice',
              prompt:
                'According to the passage, the durability of musical memory is best explained by',
              options: [
                { key: 'A', text: 'the simplicity of music.' },
                { key: 'B', text: 'redundant encoding across multiple brain networks.' },
                { key: 'C', text: 'the loudness of childhood music.' },
                { key: 'D', text: 'genetic predisposition.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph B describes redundant encoding.',
            },
            {
              id: 'r007-q35',
              number: 35,
              type: 'multiple-choice',
              prompt: 'Which group of patients can often still sing along with songs from youth?',
              options: [
                { key: 'A', text: 'Patients with mild stroke.' },
                { key: 'B', text: "Patients with advanced Alzheimer's disease." },
                { key: 'C', text: 'Patients with depression alone.' },
                { key: 'D', text: 'Patients with anxiety disorders.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r007-q36',
              number: 36,
              type: 'multiple-choice',
              prompt: "What is the writer's overall claim in paragraph F?",
              options: [
                { key: 'A', text: 'Music memory is sentimental rather than neurological.' },
                {
                  key: 'B',
                  text: 'Music memory is among the last things to be lost in cognitive decline.',
                },
                { key: 'C', text: 'Music memory is independent of emotional charge.' },
                { key: 'D', text: 'Music memory varies randomly between individuals.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r007-p3-g3',
          instruction:
            'Questions 37–40 · Complete the summary. Choose NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r007-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore:
                'The phenomenon by which adolescent and early-adult memories are disproportionately recalled is called the',
              sentenceAfter: '.',
              correctAnswer: 'reminiscence bump',
              acceptableVariants: [],
              maxWords: 2,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r007-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore:
                "The British music therapist who first systematically described the Alzheimer's phenomenon was",
              sentenceAfter: '.',
              correctAnswer: 'Concetta Tomaino',
              acceptableVariants: ['Tomaino'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r007-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore:
                'In 2018, a major review of music therapy in dementia was conducted by',
              sentenceAfter: '.',
              correctAnswer: 'Cochrane',
              acceptableVariants: ['the Cochrane review'],
              maxWords: 3,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r007-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore:
                'The brain regions associated with the most-rehearsed musical memories are among the last to be affected by',
              sentenceAfter: 'pathology.',
              correctAnswer: "Alzheimer's",
              acceptableVariants: ['Alzheimers', 'Alzheimer'],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
          ],
        },
      ],
    },
  ],
}
