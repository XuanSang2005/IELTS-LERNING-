import type { Test } from '../../schemas/test'

export const reading006: Test = {
  id: 'reading-006',
  skill: 'reading',
  title: 'Reading Test 06',
  description:
    'Three passages on the history of mapmaking, the navigation of birds, and the origins of yoga.',
  difficulty: 'foundation',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: false,
  publishedAt: '2026-04-21',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-006-p1',
      number: 1,
      title: 'The Art of the Map',
      wordCount: 480,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Maps were drawn long before they were drawn to scale. The earliest surviving cartographic objects — Babylonian clay tablets from around 600 BC, Polynesian stick charts woven from coconut palm — were practical instruments, but they were also statements of belief about the shape of the world. Coastlines were stylised; oceans were named; the home territory was, almost without exception, placed at the centre.</p>
<p data-para="B"><strong>B.</strong> The mathematical map arrived with the Greeks. Eratosthenes, a librarian at Alexandria in the third century BC, measured the angle of the noon sun at two cities a known distance apart and used the difference to calculate the circumference of the earth — within five per cent of the modern value. Claudius Ptolemy, in the second century AD, produced a coordinate system of latitude and longitude that survived as the European standard for a thousand years, though most copies of his Geographia were lost during that period.</p>
<p data-para="C"><strong>C.</strong> Medieval European maps were rarely meant to navigate. The mappa mundi at Hereford Cathedral, drawn around 1300, places Jerusalem at the centre of a circular world surrounded by the ocean, with the Garden of Eden in the upper east. It is more theology than topography. The maps used by sailors of the same period — portolan charts, drawn on vellum and crossed by rhumb lines — were quite different. They were practical and, when checked against modern coastlines, often startlingly accurate.</p>
<p data-para="D"><strong>D.</strong> The age of European exploration produced new problems. The Mercator projection, devised by Gerardus Mercator in 1569, solved the problem of preserving compass bearings on a flat sheet — invaluable for navigation — but at the cost of grossly enlarging the polar regions. Greenland appears the size of Africa on a Mercator map; in fact it is about a fourteenth of Africa\'s area. Subsequent projections (the Gall-Peters in 1973, the Robinson in 1963) trade off different distortions, but no flat map can preserve every property of a sphere.</p>
<p data-para="E"><strong>E.</strong> The twentieth century brought a final transformation: photography from above. Aerial surveys of the 1920s and satellite imagery from the 1970s onwards made cartography, for the first time, a discipline of measurement rather than drawing. Modern atlases derive their coastlines, their elevations and their political boundaries from compiled satellite data, processed by software, almost untouched by hand.</p>
<p data-para="F"><strong>F.</strong> The persistence of the printed map, despite ubiquitous digital alternatives, is sometimes attributed to nostalgia. A more interesting explanation is that the printed map presents the whole at once: every relationship visible, no zoom required. The phone-screen map shows where you are; the wall map shows where you are in relation to everywhere else.</p>
`,
      vocabulary: [
        {
          term: 'projection',
          definition:
            'A method of representing the curved surface of the Earth on a flat map; each method introduces some distortion.',
        },
        {
          term: 'portolan',
          definition:
            'A late-medieval nautical chart, characterised by lines radiating from compass roses.',
        },
        {
          term: 'mappa mundi',
          definition: 'A medieval European map of the known world; literally "map of the world".',
        },
        {
          term: 'topography',
          definition: 'The arrangement of natural and artificial physical features of an area.',
          translation: 'địa hình',
        },
      ],
      groups: [
        {
          id: 'r006-p1-g1',
          instruction: 'Questions 1–5 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r006-q1',
              number: 1,
              type: 'multiple-choice',
              prompt: 'According to the passage, the earliest maps were primarily',
              options: [
                { key: 'A', text: 'mathematical and to scale.' },
                { key: 'B', text: 'practical, but also statements of belief.' },
                { key: 'C', text: 'astronomical charts.' },
                { key: 'D', text: 'engineering diagrams.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r006-q2',
              number: 2,
              type: 'multiple-choice',
              prompt: 'How accurately did Eratosthenes calculate the circumference of the Earth?',
              options: [
                { key: 'A', text: 'Within fifty per cent.' },
                { key: 'B', text: 'Within twenty per cent.' },
                { key: 'C', text: 'Within five per cent.' },
                { key: 'D', text: 'Within one per cent.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph B states "within five per cent".',
            },
            {
              id: 'r006-q3',
              number: 3,
              type: 'multiple-choice',
              prompt: 'What was the principal purpose of the Hereford mappa mundi?',
              options: [
                { key: 'A', text: 'Navigation by sea.' },
                { key: 'B', text: 'Theological and symbolic representation.' },
                { key: 'C', text: 'Military planning.' },
                { key: 'D', text: 'Trade route documentation.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C calls it "more theology than topography".',
            },
            {
              id: 'r006-q4',
              number: 4,
              type: 'multiple-choice',
              prompt: 'What problem did the Mercator projection solve?',
              options: [
                { key: 'A', text: 'It preserved compass bearings on a flat sheet.' },
                { key: 'B', text: 'It preserved the area of every region.' },
                { key: 'C', text: 'It eliminated all distortion.' },
                { key: 'D', text: 'It made the equator look longer.' },
              ],
              correctAnswer: 'A',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r006-q5',
              number: 5,
              type: 'multiple-choice',
              prompt: "How does the writer explain the printed map's survival?",
              options: [
                { key: 'A', text: 'Pure nostalgia.' },
                { key: 'B', text: 'Cost — printed maps are cheaper.' },
                { key: 'C', text: 'It shows the whole at once, with all relationships visible.' },
                { key: 'D', text: 'Better resolution than digital screens.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r006-p1-g2',
          instruction: 'Questions 6–9 · Match each map type with the correct description.',
          questions: [
            {
              id: 'r006-q6',
              number: 6,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Portolan chart' },
                { id: 'item-2', text: 'Mappa mundi' },
                { id: 'item-3', text: 'Mercator projection' },
                { id: 'item-4', text: 'Modern atlas' },
              ],
              options: [
                { key: 'A', text: 'Theological circular world map' },
                { key: 'B', text: 'Practical sailing chart with rhumb lines' },
                { key: 'C', text: 'Compiled from satellite data and processed by software' },
                { key: 'D', text: 'Preserves compass bearings; distorts polar areas' },
              ],
              correctMapping: {
                'item-1': 'B',
                'item-2': 'A',
                'item-3': 'D',
                'item-4': 'C',
              },
              explanation: 'See paragraphs C, D and E.',
            },
            {
              id: 'r006-q7',
              number: 7,
              type: 'short-answer',
              question: 'Which library employed Eratosthenes?',
              correctAnswer: 'Alexandria',
              acceptableVariants: ['Alexandria library', 'the Library of Alexandria'],
              maxWords: 3,
              explanation: 'Paragraph B places him at Alexandria.',
            },
            {
              id: 'r006-q8',
              number: 8,
              type: 'short-answer',
              question:
                'Which Roman-era astronomer produced a coordinate system of latitude and longitude?',
              correctAnswer: 'Claudius Ptolemy',
              acceptableVariants: ['Ptolemy'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r006-q9',
              number: 9,
              type: 'short-answer',
              question: 'In which year was the Robinson projection devised?',
              correctAnswer: '1963',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
          ],
        },
        {
          id: 'r006-p1-g3',
          instruction:
            'Questions 10–13 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r006-q10',
              number: 10,
              type: 'true-false-not-given',
              statement: 'Greenland is comparable in area to Africa.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph D says it is about a fourteenth of Africa.',
            },
            {
              id: 'r006-q11',
              number: 11,
              type: 'true-false-not-given',
              statement: 'No flat map can preserve every property of a sphere.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D states this.',
            },
            {
              id: 'r006-q12',
              number: 12,
              type: 'true-false-not-given',
              statement:
                "Most copies of Ptolemy's Geographia survived intact through the medieval period.",
              correctAnswer: 'FALSE',
              explanation: 'Paragraph B says most copies were lost.',
            },
            {
              id: 'r006-q13',
              number: 13,
              type: 'true-false-not-given',
              statement: 'Modern phone-screen maps are larger than wall maps.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'Size of phone screens vs wall maps is not discussed.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-006-p2',
      number: 2,
      title: 'How Birds Navigate',
      wordCount: 510,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Each spring and autumn, several billion birds cross between continents. Some species — the Arctic tern is the most extreme — fly the length of the planet twice a year. They do so without compasses, without maps and, in most cases, without parental guidance: many young birds make their first migration alone, several weeks after the adults have departed. The question of how they orient themselves has occupied biologists for more than a century, and the answer turns out to involve at least four distinct mechanisms.</p>
<p data-para="B"><strong>B.</strong> The first is the sun. By day, many migratory species use the position of the sun in the sky as a reference, compensated by an internal circadian clock for the sun\'s movement across the sky. A bird that wishes to fly south will hold the morning sun on its left and the afternoon sun on its right; if the clock is artificially shifted, as in classical experiments by Gustav Kramer in the 1950s, the bird flies in a predictable wrong direction.</p>
<p data-para="C"><strong>C.</strong> The second is the stars. Indigo buntings, raised in a planetarium, learn the rotational centre of the night sky during their first months of life and use it as a north reference. Unlike the sun system, the star system does not require a clock; the bird only needs to identify which constellations sit nearest the rotational centre. Steven Emlen demonstrated this in the 1960s by altering the planetarium dome to rotate around a different star, and finding that the buntings adopted that star as their new pole.</p>
<p data-para="D"><strong>D.</strong> The third is the magnetic field. Many bird species can detect the direction and angle of the Earth\'s magnetic lines. The mechanism is debated. One leading theory locates the receptor in iron-rich cells in the upper beak; another, more recently favoured, locates it in cryptochrome proteins in the retina, which respond to magnetic fields when stimulated by blue light. Evidence for both mechanisms exists, and they may co-occur.</p>
<p data-para="E"><strong>E.</strong> A fourth, less heroic mechanism is olfactory. Pigeons released from unfamiliar starting points return home with greater accuracy if their nasal passages are intact. The strongest version of the theory holds that olfactory landscapes — distinct distributions of scent compounds carried on prevailing winds — provide a kind of low-resolution map. Sceptics argue that olfaction supplements other systems rather than supplanting them. The argument is not yet settled.</p>
<p data-para="F"><strong>F.</strong> Most species combine these methods. A young pied flycatcher migrating from Scandinavia to West Africa will use a magnetic compass to set its initial course, the stars on cloudless nights to maintain it, the sun by day, and — once close to the wintering ground — landmarks and scent. The redundancy is what makes the system robust. Take away any one mechanism and the bird still arrives, although less precisely. Take away two and it begins to drift. Take away three and the system fails.</p>
`,
      vocabulary: [
        {
          term: 'cryptochrome',
          definition:
            'A class of light-sensitive proteins thought to mediate magnetic sensing in birds.',
        },
        {
          term: 'olfactory',
          definition: 'Relating to the sense of smell.',
          translation: 'khứu giác',
        },
        {
          term: 'circadian',
          definition: 'Relating to biological cycles that recur approximately every 24 hours.',
          translation: 'nhịp sinh học',
        },
        {
          term: 'planetarium',
          definition: 'A domed building in which images of the night sky are projected.',
        },
      ],
      groups: [
        {
          id: 'r006-p2-g1',
          instruction:
            'Questions 14–18 · Match each navigation mechanism with the correct experimenter or experimental setup.',
          questions: [
            {
              id: 'r006-q14',
              number: 14,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Sun compass' },
                { id: 'item-2', text: 'Star compass' },
                { id: 'item-3', text: 'Magnetic compass' },
                { id: 'item-4', text: 'Olfactory map' },
              ],
              options: [
                { key: 'A', text: 'Indigo buntings raised in a planetarium' },
                { key: 'B', text: 'Iron-rich beak cells or retinal cryptochromes' },
                { key: 'C', text: 'Pigeons released from unfamiliar starting points' },
                { key: 'D', text: "Gustav Kramer's clock-shift experiments" },
              ],
              correctMapping: {
                'item-1': 'D',
                'item-2': 'A',
                'item-3': 'B',
                'item-4': 'C',
              },
              explanation: 'See paragraphs B–E.',
            },
            {
              id: 'r006-q15',
              number: 15,
              type: 'short-answer',
              question: 'Which species is named as the most extreme migrator?',
              correctAnswer: 'Arctic tern',
              acceptableVariants: ['the Arctic tern', 'Arctic terns'],
              maxWords: 3,
              explanation: 'Paragraph A.',
            },
            {
              id: 'r006-q16',
              number: 16,
              type: 'short-answer',
              question: 'In which decade did Steven Emlen run his planetarium experiments?',
              correctAnswer: '1960s',
              acceptableVariants: ['the 1960s', 'sixties'],
              maxWords: 2,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r006-q17',
              number: 17,
              type: 'short-answer',
              question:
                'Which proteins, found in the retina, are proposed to detect magnetic fields when stimulated by blue light?',
              correctAnswer: 'cryptochromes',
              acceptableVariants: ['cryptochrome', 'cryptochrome proteins'],
              maxWords: 3,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r006-q18',
              number: 18,
              type: 'short-answer',
              question:
                'Which species is described as combining all four navigation methods on a Scandinavia-to-Africa migration?',
              correctAnswer: 'pied flycatcher',
              acceptableVariants: ['pied flycatchers', 'flycatcher'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
          ],
        },
        {
          id: 'r006-p2-g2',
          instruction:
            'Questions 19–22 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r006-q19',
              number: 19,
              type: 'true-false-not-given',
              statement: 'Most young birds make their first migration alongside their parents.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph A says many fly alone several weeks after adults.',
            },
            {
              id: 'r006-q20',
              number: 20,
              type: 'true-false-not-given',
              statement: 'The star compass requires a circadian clock.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph C states the star system does not require a clock.',
            },
            {
              id: 'r006-q21',
              number: 21,
              type: 'true-false-not-given',
              statement:
                'The retinal mechanism for magnetic sensing requires light of a particular colour.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph D specifies blue light.',
            },
            {
              id: 'r006-q22',
              number: 22,
              type: 'true-false-not-given',
              statement: 'The role of olfaction in bird navigation is conclusively established.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph E says the argument is not settled.',
            },
          ],
        },
        {
          id: 'r006-p2-g3',
          instruction:
            'Questions 23–26 · Complete each sentence with NO MORE THAN THREE WORDS from the passage.',
          questions: [
            {
              id: 'r006-q23',
              number: 23,
              type: 'sentence-completion',
              sentenceBefore:
                "In Kramer's experiments, an artificially-shifted clock made the bird fly",
              sentenceAfter: '.',
              correctAnswer: 'in a predictable wrong direction',
              acceptableVariants: [
                'wrong direction',
                'in the wrong direction',
                'predictable wrong direction',
              ],
              maxWords: 5,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r006-q24',
              number: 24,
              type: 'sentence-completion',
              sentenceBefore: 'Indigo buntings learn the',
              sentenceAfter: 'of the night sky during their first months.',
              correctAnswer: 'rotational centre',
              acceptableVariants: ['rotational center'],
              maxWords: 2,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r006-q25',
              number: 25,
              type: 'sentence-completion',
              sentenceBefore:
                "One leading theory of magnetic detection locates the receptor in iron-rich cells in the bird's",
              sentenceAfter: '.',
              correctAnswer: 'upper beak',
              acceptableVariants: ['beak'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r006-q26',
              number: 26,
              type: 'sentence-completion',
              sentenceBefore:
                'According to paragraph F, the migration system is robust because of its',
              sentenceAfter: '.',
              correctAnswer: 'redundancy',
              acceptableVariants: ['redundant systems'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-006-p3',
      number: 3,
      title: 'The Origins of Yoga',
      wordCount: 500,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The yoga taught in Western studios — a sequence of choreographed postures, often set to music — bears only a partial resemblance to its historical antecedents. The word <em>yoga</em>, derived from a Sanskrit root meaning "to yoke," appears in Indian scriptures from the second millennium BC, but its earliest meanings are not predominantly physical. The Bhagavad Gita, composed around the second century BC, treats yoga as a discipline of mind and devotion, with little emphasis on bodily posture.</p>
<p data-para="B"><strong>B.</strong> The systematic codification of yoga is usually attributed to Patanjali, whose Yoga Sutras were composed roughly between 200 BC and AD 400. The Sutras describe an "eightfold path" of which the physical postures, the <em>asanas</em>, are only the third limb. Five of the other seven limbs — restraints, observances, breath control, withdrawal of the senses, and concentration — concern mental and ethical discipline. The remaining two are deeper meditative states.</p>
<p data-para="C"><strong>C.</strong> The vigorous, posture-centred yoga familiar to modern Westerners is in fact a relatively recent invention. Most historians trace it to a single school in early-twentieth-century Mysore, in southern India, where the teacher Tirumalai Krishnamacharya taught a synthesis of traditional asanas, breathing exercises and elements of European gymnastics — including movements borrowed from the British military physical culture of the day. His students, including B. K. S. Iyengar and Pattabhi Jois, would later carry distinct versions of this practice to Europe and North America.</p>
<p data-para="D"><strong>D.</strong> Yoga\'s modern Western expansion can be dated almost to the year. In 1893, Swami Vivekananda spoke at the Parliament of the World\'s Religions in Chicago, introducing American audiences to a philosophical version of yoga. In 1947, Indra Devi opened the first commercial yoga studio in Hollywood, attracting film stars. By the 1980s, yoga was taught in thousands of municipal recreation centres across North America. Annual practitioner counts now stand at roughly 300 million worldwide.</p>
<p data-para="E"><strong>E.</strong> Modern yoga has, however, drifted from its philosophical origins. Surveys of Western practitioners report that physical fitness and stress relief are the dominant motivations; only a small minority cite spiritual or ethical practice. The eightfold path of Patanjali is rarely taught in commercial studios; the asanas, originally one of eight limbs, have effectively become the whole.</p>
<p data-para="F"><strong>F.</strong> Whether this drift constitutes a loss is disputed. Critics describe modern yoga as a "fitness shell" stripped of context. Defenders point out that traditions evolve, and that millions of practitioners report benefits — measurable in lower blood pressure, improved flexibility and reduced anxiety — even from a purely physical practice. The historical record suggests, in any case, that yoga has been many things across its three thousand years; the studio version is simply the most recent.</p>
`,
      vocabulary: [
        {
          term: 'asana',
          definition: 'A bodily posture in yoga practice.',
        },
        {
          term: 'codification',
          definition: 'The arrangement of laws or rules into a systematic code.',
        },
        {
          term: 'antecedent',
          definition: 'A thing or event that existed or came before another.',
          translation: 'tiền thân',
        },
        {
          term: 'synthesis',
          definition: 'The combination of components or elements to form a connected whole.',
        },
      ],
      groups: [
        {
          id: 'r006-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the information in the passage? TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              id: 'r006-q27',
              number: 27,
              type: 'true-false-not-given',
              statement: 'The Sanskrit word "yoga" originally meant a system of physical exercise.',
              correctAnswer: 'FALSE',
              explanation:
                'Paragraph A says its earliest meanings were not predominantly physical.',
            },
            {
              id: 'r006-q28',
              number: 28,
              type: 'true-false-not-given',
              statement: "The asanas constitute the third of Patanjali's eight limbs.",
              correctAnswer: 'TRUE',
              explanation: 'Paragraph B states this.',
            },
            {
              id: 'r006-q29',
              number: 29,
              type: 'true-false-not-given',
              statement:
                'The Mysore school of Krishnamacharya took some elements from European gymnastics.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph C states this.',
            },
            {
              id: 'r006-q30',
              number: 30,
              type: 'true-false-not-given',
              statement: 'Indra Devi was a student of Krishnamacharya.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'The passage does not state this.',
            },
            {
              id: 'r006-q31',
              number: 31,
              type: 'true-false-not-given',
              statement:
                'A small minority of modern Western practitioners cite spiritual practice as their main motivation.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r006-q32',
              number: 32,
              type: 'true-false-not-given',
              statement:
                'Modern yoga is taught in roughly 300 municipal recreation centres in North America.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph D says "thousands".',
            },
          ],
        },
        {
          id: 'r006-p3-g2',
          instruction: 'Questions 33–36 · Choose the correct heading for paragraphs A, C, D, F.',
          questions: [
            {
              id: 'r006-q33',
              number: 33,
              type: 'matching-headings',
              paragraphId: 'A',
              headings: [
                { key: 'i', text: 'Mysore and the modern posture-centred school' },
                { key: 'ii', text: 'A drift from philosophical origins' },
                { key: 'iii', text: 'A debate about authenticity' },
                { key: 'iv', text: "Patanjali's eightfold path" },
                { key: 'v', text: 'Western expansion and a Hollywood studio' },
                { key: 'vi', text: 'Earliest meanings and the Bhagavad Gita' },
              ],
              correctAnswer: 'vi',
              explanation: 'Paragraph A discusses earliest meanings and the Gita.',
            },
            {
              id: 'r006-q34',
              number: 34,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'Mysore and the modern posture-centred school' },
                { key: 'ii', text: 'A drift from philosophical origins' },
                { key: 'iii', text: 'A debate about authenticity' },
                { key: 'iv', text: "Patanjali's eightfold path" },
                { key: 'v', text: 'Western expansion and a Hollywood studio' },
                { key: 'vi', text: 'Earliest meanings and the Bhagavad Gita' },
              ],
              correctAnswer: 'i',
              explanation: 'Paragraph C is the Mysore section.',
            },
            {
              id: 'r006-q35',
              number: 35,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'Mysore and the modern posture-centred school' },
                { key: 'ii', text: 'A drift from philosophical origins' },
                { key: 'iii', text: 'A debate about authenticity' },
                { key: 'iv', text: "Patanjali's eightfold path" },
                { key: 'v', text: 'Western expansion and a Hollywood studio' },
                { key: 'vi', text: 'Earliest meanings and the Bhagavad Gita' },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph D names the Hollywood studio and Western adoption.',
            },
            {
              id: 'r006-q36',
              number: 36,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'Mysore and the modern posture-centred school' },
                { key: 'ii', text: 'A drift from philosophical origins' },
                { key: 'iii', text: 'A debate about authenticity' },
                { key: 'iv', text: "Patanjali's eightfold path" },
                { key: 'v', text: 'Western expansion and a Hollywood studio' },
                { key: 'vi', text: 'Earliest meanings and the Bhagavad Gita' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph F is the authenticity debate.',
            },
          ],
        },
        {
          id: 'r006-p3-g3',
          instruction:
            'Questions 37–40 · Answer the questions. NO MORE THAN THREE WORDS for each answer.',
          questions: [
            {
              id: 'r006-q37',
              number: 37,
              type: 'short-answer',
              question: 'In which Indian city did Krishnamacharya teach his synthesis?',
              correctAnswer: 'Mysore',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r006-q38',
              number: 38,
              type: 'short-answer',
              question:
                "Who introduced American audiences to yoga at the 1893 Parliament of the World's Religions?",
              correctAnswer: 'Swami Vivekananda',
              acceptableVariants: ['Vivekananda'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r006-q39',
              number: 39,
              type: 'short-answer',
              question: 'In which year did Indra Devi open her Hollywood studio?',
              correctAnswer: '1947',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r006-q40',
              number: 40,
              type: 'short-answer',
              question: 'How many practitioners is yoga estimated to have worldwide today?',
              correctAnswer: '300 million',
              acceptableVariants: ['three hundred million', '300m'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
          ],
        },
      ],
    },
  ],
}
