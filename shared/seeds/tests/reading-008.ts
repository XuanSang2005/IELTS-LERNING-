import type { Test } from '../../schemas/test'

export const reading008: Test = {
  id: 'reading-008',
  skill: 'reading',
  title: 'Reading Test 08',
  description:
    'Three Band 7+ passages on the economics of attention, the decipherment of the Rosetta Stone, and the editing of life with CRISPR.',
  difficulty: 'advanced',
  fullDurationMinutes: 60,
  shortDurationMinutes: 30,
  totalQuestions: 40,
  isPro: true,
  publishedAt: '2026-04-25',
  tags: ['IELTS Academic', 'Reading'],
  passages: [
    {
      id: 'reading-008-p1',
      number: 1,
      title: 'The Economics of Attention',
      wordCount: 540,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> "What information consumes is the attention of its recipients," wrote the American economist Herbert Simon in 1971. "A wealth of information creates a poverty of attention." The remark, made decades before the smartphone, has acquired the status of an unintended prophecy. Simon\'s insight was simply that attention, alone among economic resources, has remained roughly constant per capita while the volume of competing information has grown by orders of magnitude. The implications, he saw, were unflattering for any institution dependent on the considered judgement of its members.</p>
<p data-para="B"><strong>B.</strong> The dominant business model of contemporary digital media is built directly on Simon\'s insight, although few of its architects would have credited the source. The advertising-funded platform — search, social, video — does not sell content to users; it sells the attention of users to advertisers. Engagement, measured in time-on-site or in clicks, is the relevant unit of supply. The result is a competitive pressure that selects for content not on the criterion of usefulness or accuracy but on its capacity to retain attention. Outrage, novelty, intermittent reward — these are the textures most efficient at the engagement metric.</p>
<p data-para="C"><strong>C.</strong> The empirical literature is now substantial. A 2020 study published in <em>Nature Human Behaviour</em> tracked the spread of true and false stories across Twitter (now X) and found that false stories diffused six times faster, on average, than true ones, with the gap largest for politically charged content. The mechanism is not malevolence; it is selection. Content that elicits a strong emotional response is shared more, regardless of its accuracy. Platform algorithms, optimised for engagement, amplify rather than counterbalance the human pattern.</p>
<p data-para="D"><strong>D.</strong> Public-health analogies have proliferated. Several governments have begun treating compulsive social-media use as a substance-like behavioural disorder, particularly in adolescents. South Korea introduced statutory time limits on adolescent gaming as early as 2011 (since rescinded). The United Kingdom\'s Online Safety Act of 2023 obliges platforms to demonstrate "age-appropriate design" for minors. The American Psychological Association\'s 2023 advisory linked adolescent social-media use, at certain intensities, to depressive symptoms, although it stopped short of declaring social media generally harmful.</p>
<p data-para="E"><strong>E.</strong> Critics of the public-health framing are not few. The economist Tyler Cowen has argued that the decline in collective attention is exaggerated by adults nostalgic for an information environment they personally found congenial. Cross-national comparisons of teen well-being do not, they note, track smartphone penetration cleanly; the most-affected countries by some metrics are not those with the highest smartphone adoption. The relationship between platform exposure and outcome remains, in the technical literature, a correlation in search of a causal mechanism.</p>
<p data-para="F"><strong>F.</strong> What seems unlikely to be reversed is the asymmetry of the design problem. Hundreds of millions of dollars and dozens of behavioural scientists are deployed in optimising the attention-capture surfaces of major platforms; perhaps a handful of academic groups and underfunded regulators study the effects. The capture is professionalised; the resistance is amateur. Whether this asymmetry is a temporary feature of an immature regulatory environment, or a permanent feature of mass-market communication, is the open question of the field.</p>
`,
      vocabulary: [
        {
          term: 'engagement',
          definition:
            'In the platform-economy sense, the degree to which users interact with content (time, clicks, shares).',
          translation: 'mức độ tương tác',
        },
        {
          term: 'algorithm',
          definition:
            'A set of rules executed by a computer; here, the ranking systems that decide which content users see.',
        },
        {
          term: 'asymmetry',
          definition: 'Lack of equality or correspondence between two things.',
        },
        {
          term: 'malevolence',
          definition: 'The wish to harm others; ill will.',
          translation: 'ác ý',
        },
      ],
      groups: [
        {
          id: 'r008-p1-g1',
          instruction:
            'Questions 1–5 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r008-q1',
              number: 1,
              type: 'yes-no-not-given',
              statement:
                'Attention has remained roughly constant per capita as information has expanded.',
              correctAnswer: 'YES',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r008-q2',
              number: 2,
              type: 'yes-no-not-given',
              statement: 'Advertising platforms primarily sell content to their users.',
              correctAnswer: 'NO',
              explanation: 'Paragraph B says they sell attention to advertisers.',
            },
            {
              id: 'r008-q3',
              number: 3,
              type: 'yes-no-not-given',
              statement: 'False stories spread faster than true stories on social platforms.',
              correctAnswer: 'YES',
              explanation: 'Paragraph C cites a sixfold ratio.',
            },
            {
              id: 'r008-q4',
              number: 4,
              type: 'yes-no-not-given',
              statement:
                'The American Psychological Association declared social media generally harmful in 2023.',
              correctAnswer: 'NO',
              explanation: 'Paragraph D says the APA stopped short of that declaration.',
            },
            {
              id: 'r008-q5',
              number: 5,
              type: 'yes-no-not-given',
              statement:
                'Tyler Cowen believes adolescent smartphone use causes most teen depression.',
              correctAnswer: 'NO',
              explanation: 'Paragraph E says he is a critic of the public-health framing.',
            },
          ],
        },
        {
          id: 'r008-p1-g2',
          instruction: 'Questions 6–9 · Choose the correct heading for paragraphs B, C, D, F.',
          questions: [
            {
              id: 'r008-q6',
              number: 6,
              type: 'matching-headings',
              paragraphId: 'B',
              headings: [
                { key: 'i', text: 'Critics of the public-health framing' },
                { key: 'ii', text: 'The empirical evidence on misinformation' },
                { key: 'iii', text: 'A regulatory and clinical response' },
                { key: 'iv', text: "Simon's 1971 insight" },
                { key: 'v', text: 'Engagement as the platform business model' },
                { key: 'vi', text: 'A persistent asymmetry of resources' },
              ],
              correctAnswer: 'v',
              explanation: 'Paragraph B describes the engagement business model.',
            },
            {
              id: 'r008-q7',
              number: 7,
              type: 'matching-headings',
              paragraphId: 'C',
              headings: [
                { key: 'i', text: 'Critics of the public-health framing' },
                { key: 'ii', text: 'The empirical evidence on misinformation' },
                { key: 'iii', text: 'A regulatory and clinical response' },
                { key: 'iv', text: "Simon's 1971 insight" },
                { key: 'v', text: 'Engagement as the platform business model' },
                { key: 'vi', text: 'A persistent asymmetry of resources' },
              ],
              correctAnswer: 'ii',
              explanation: 'Paragraph C presents the misinformation evidence.',
            },
            {
              id: 'r008-q8',
              number: 8,
              type: 'matching-headings',
              paragraphId: 'D',
              headings: [
                { key: 'i', text: 'Critics of the public-health framing' },
                { key: 'ii', text: 'The empirical evidence on misinformation' },
                { key: 'iii', text: 'A regulatory and clinical response' },
                { key: 'iv', text: "Simon's 1971 insight" },
                { key: 'v', text: 'Engagement as the platform business model' },
                { key: 'vi', text: 'A persistent asymmetry of resources' },
              ],
              correctAnswer: 'iii',
              explanation: 'Paragraph D describes statutes and clinical advisories.',
            },
            {
              id: 'r008-q9',
              number: 9,
              type: 'matching-headings',
              paragraphId: 'F',
              headings: [
                { key: 'i', text: 'Critics of the public-health framing' },
                { key: 'ii', text: 'The empirical evidence on misinformation' },
                { key: 'iii', text: 'A regulatory and clinical response' },
                { key: 'iv', text: "Simon's 1971 insight" },
                { key: 'v', text: 'Engagement as the platform business model' },
                { key: 'vi', text: 'A persistent asymmetry of resources' },
              ],
              correctAnswer: 'vi',
              explanation: 'Paragraph F is the asymmetry of resources.',
            },
          ],
        },
        {
          id: 'r008-p1-g3',
          instruction: 'Questions 10–13 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r008-q10',
              number: 10,
              type: 'multiple-choice',
              prompt:
                'According to paragraph C, the gap between true and false story diffusion is largest for',
              options: [
                { key: 'A', text: 'sports stories.' },
                { key: 'B', text: 'health stories.' },
                { key: 'C', text: 'politically charged content.' },
                { key: 'D', text: 'celebrity gossip.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph C says the gap was largest for politically charged content.',
            },
            {
              id: 'r008-q11',
              number: 11,
              type: 'multiple-choice',
              prompt: 'What does the writer say about the cause of asymmetric story diffusion?',
              options: [
                { key: 'A', text: 'Deliberate malevolence by users.' },
                { key: 'B', text: 'Selection: emotional content is shared more.' },
                { key: 'C', text: 'Random chance.' },
                { key: 'D', text: 'Government propaganda.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph C says the mechanism is selection, not malevolence.',
            },
            {
              id: 'r008-q12',
              number: 12,
              type: 'multiple-choice',
              prompt: 'In what year did South Korea introduce its adolescent gaming time limits?',
              options: [
                { key: 'A', text: '2008.' },
                { key: 'B', text: '2011.' },
                { key: 'C', text: '2019.' },
                { key: 'D', text: '2023.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D states 2011.',
            },
            {
              id: 'r008-q13',
              number: 13,
              type: 'multiple-choice',
              prompt:
                'How does the writer characterise the resource asymmetry between platforms and regulators?',
              options: [
                { key: 'A', text: 'Capture and resistance are roughly equal.' },
                { key: 'B', text: 'Capture is professionalised; resistance is amateur.' },
                { key: 'C', text: 'Regulators have the larger budget.' },
                { key: 'D', text: 'No comparison is made.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-008-p2',
      number: 2,
      title: 'The Decipherment of the Rosetta Stone',
      wordCount: 530,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> Hieroglyphs were unread for almost fifteen hundred years. The last attested inscription dates from the temple of Philae in 394 AD; by the early Christian centuries, no one in Egypt could read them. Renaissance Europeans had inherited a tradition, descending from the Greek scholar Horapollo, that hieroglyphs were a purely symbolic script — each sign a self-contained allegorical idea. The tradition was wrong, but it was authoritative, and it shaped European study for three centuries.</p>
<p data-para="B"><strong>B.</strong> The Rosetta Stone, discovered by French soldiers near the town of el-Rashid in 1799, contained the same passage in three scripts: hieroglyphic, demotic (a cursive Egyptian) and ancient Greek. The Greek could be read. By 1814, the British physicist Thomas Young had identified the names of pharaohs in the hieroglyphic text by matching them to the Greek; the names, marked off by oval cartouches, were spelt phonetically. This was the first decisive evidence against the Horapollian view.</p>
<p data-para="C"><strong>C.</strong> Young\'s breakthrough was partial. He believed the phonetic principle applied only to foreign names — Ptolemy, Cleopatra — and that the rest of the script remained symbolic. The young French linguist Jean-François Champollion, working from the same stone and from copies of other inscriptions, took the decisive further step. Drawing on his unusual command of Coptic — the latest form of Egyptian, preserved as a liturgical language by Egyptian Christians — Champollion realised that ordinary Egyptian words, not just foreign names, were spelt phonetically.</p>
<p data-para="D"><strong>D.</strong> The 1822 paper in which Champollion announced his decipherment, the <em>Lettre à M. Dacier</em>, transformed the field. Within a decade, scholars across Europe were producing translations of Egyptian funerary texts, religious treatises and historical inscriptions. The recovery was not always graceful. Champollion died in 1832, aged forty-one, before he could publish a full grammar; rival German scholars accused him of professional vandalism for years. But his fundamental claim — that hieroglyphs were a mixed system of phonetic and ideographic signs, much like several other ancient scripts — has stood.</p>
<p data-para="E"><strong>E.</strong> The decipherment opened Egypt to study, and the speed of the opening had its own consequences. The European market for inscribed Egyptian objects exploded; tomb-robbery and unsystematic excavation followed; museums in London, Paris, Turin and Berlin acquired collections whose origins were, by modern standards of archaeological practice, scandalous. The current claims for repatriation of Egyptian antiquities are thus older than they appear: the moral problem was created, in essence, by the success of Champollion\'s work.</p>
<p data-para="F"><strong>F.</strong> The Rosetta Stone itself has remained at the British Museum since 1802. The Egyptian government has petitioned for its return; the British Museum has, for now, refused. Whatever the eventual disposition, the stone is unusual among contested antiquities in that its scholarly importance is genuinely incidental to the object\'s physical presence. The text it carries is now copied in every textbook of the language. The stone\'s home, in this sense, is no longer the museum and no longer Egypt; it is the philological tradition the stone made possible.</p>
`,
      vocabulary: [
        {
          term: 'cartouche',
          definition: 'An oval figure enclosing the hieroglyphic name of a sovereign.',
        },
        {
          term: 'demotic',
          definition: 'A simplified, cursive form of ancient Egyptian writing.',
        },
        {
          term: 'philological',
          definition: 'Relating to the historical and comparative study of languages and texts.',
        },
        {
          term: 'repatriation',
          definition:
            'The return of objects, especially cultural property, to their place of origin.',
          translation: 'hồi hương',
        },
      ],
      groups: [
        {
          id: 'r008-p2-g1',
          instruction:
            'Questions 14–18 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r008-q14',
              number: 14,
              type: 'yes-no-not-given',
              statement:
                'Renaissance Europeans correctly understood hieroglyphs as a phonetic script.',
              correctAnswer: 'NO',
              explanation: 'Paragraph A says they followed the wrong, symbolic tradition.',
            },
            {
              id: 'r008-q15',
              number: 15,
              type: 'yes-no-not-given',
              statement: 'Thomas Young identified phonetic spelling of pharaonic names by 1814.',
              correctAnswer: 'YES',
              explanation: 'Paragraph B.',
            },
            {
              id: 'r008-q16',
              number: 16,
              type: 'yes-no-not-given',
              statement: 'Champollion thought only foreign names were spelt phonetically.',
              correctAnswer: 'NO',
              explanation: "Paragraph C: that was Young's view; Champollion went further.",
            },
            {
              id: 'r008-q17',
              number: 17,
              type: 'yes-no-not-given',
              statement: 'Champollion published a complete grammar of ancient Egyptian.',
              correctAnswer: 'NO',
              explanation: 'Paragraph D says he died before he could publish a full grammar.',
            },
            {
              id: 'r008-q18',
              number: 18,
              type: 'yes-no-not-given',
              statement: 'The Rosetta Stone is currently held by the Egyptian Museum in Cairo.',
              correctAnswer: 'NO',
              explanation: 'Paragraph F places it in the British Museum.',
            },
          ],
        },
        {
          id: 'r008-p2-g2',
          instruction: 'Questions 19–22 · Match each contribution to its author or year.',
          questions: [
            {
              id: 'r008-q19',
              number: 19,
              type: 'matching',
              items: [
                { id: 'item-1', text: 'Identification of phonetic spelling of foreign names' },
                { id: 'item-2', text: 'Lettre à M. Dacier' },
                { id: 'item-3', text: 'Last attested hieroglyphic inscription' },
                { id: 'item-4', text: 'Discovery of the Rosetta Stone' },
              ],
              options: [
                { key: 'A', text: 'Thomas Young, 1814' },
                { key: 'B', text: 'Champollion, 1822' },
                { key: 'C', text: '394 AD' },
                { key: 'D', text: '1799' },
              ],
              correctMapping: {
                'item-1': 'A',
                'item-2': 'B',
                'item-3': 'C',
                'item-4': 'D',
              },
              explanation: 'Paragraphs A, B and D.',
            },
            {
              id: 'r008-q20',
              number: 20,
              type: 'short-answer',
              question:
                'Which liturgical language did Champollion use as a key to ancient Egyptian?',
              correctAnswer: 'Coptic',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph C.',
            },
            {
              id: 'r008-q21',
              number: 21,
              type: 'short-answer',
              question: 'What is the name of the oval enclosure marking pharaonic names?',
              correctAnswer: 'cartouche',
              acceptableVariants: ['cartouches'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r008-q22',
              number: 22,
              type: 'short-answer',
              question:
                'Which European tradition wrongly treated hieroglyphs as purely allegorical?',
              correctAnswer: 'Horapollian',
              acceptableVariants: ['Horapollo', 'Horapollian view'],
              maxWords: 2,
              explanation: 'Paragraph A names Horapollo and his tradition.',
            },
          ],
        },
        {
          id: 'r008-p2-g3',
          instruction: 'Questions 23–26 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r008-q23',
              number: 23,
              type: 'multiple-choice',
              prompt:
                'How does the writer characterise the speed of European Egyptology after 1822?',
              options: [
                { key: 'A', text: 'Slow, cautious and methodical.' },
                { key: 'B', text: 'Fast, with morally problematic consequences.' },
                { key: 'C', text: 'Halted by the death of Champollion.' },
                { key: 'D', text: 'Confined to the British Museum.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r008-q24',
              number: 24,
              type: 'multiple-choice',
              prompt:
                'According to the writer, the moral case for repatriation of Egyptian antiquities is',
              options: [
                { key: 'A', text: 'a recent development.' },
                { key: 'B', text: 'older than it appears, dating from the era of decipherment.' },
                { key: 'C', text: 'restricted to objects discovered after 1900.' },
                { key: 'D', text: 'unanimous among museums.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph E.',
            },
            {
              id: 'r008-q25',
              number: 25,
              type: 'multiple-choice',
              prompt:
                'How does the writer describe the scholarly importance of the physical Rosetta Stone today?',
              options: [
                { key: 'A', text: 'Indispensable to ongoing decipherment.' },
                { key: 'B', text: 'Genuinely incidental — the text is in every textbook.' },
                { key: 'C', text: 'Limited to symbolic value only.' },
                { key: 'D', text: 'Increasing as more scripts are found.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph F.',
            },
            {
              id: 'r008-q26',
              number: 26,
              type: 'multiple-choice',
              prompt: "The writer's overall tone in the passage is best described as",
              options: [
                { key: 'A', text: 'celebratory.' },
                { key: 'B', text: 'condemnatory.' },
                { key: 'C', text: 'measured, acknowledging both achievement and harm.' },
                { key: 'D', text: 'neutral and detached.' },
              ],
              correctAnswer: 'C',
              explanation:
                'The writer balances admiration for decipherment with acknowledgement of its colonial consequences.',
            },
          ],
        },
      ],
    },
    {
      id: 'reading-008-p3',
      number: 3,
      title: 'CRISPR and the Editing of Life',
      wordCount: 560,
      bodyHtml: `
<p data-para="A"><strong>A.</strong> The CRISPR-Cas9 system, awarded the Nobel Prize in Chemistry in 2020, is unusual among major biological tools in that it was not designed: it was discovered, and only later understood. Its existence was first reported by Japanese researchers in 1987, who noticed peculiar repeating sequences in the DNA of the bacterium <em>E. coli</em>. The function of the sequences remained obscure for almost two decades. They turned out to be a bacterial immune system — a record of the genetic material of viruses the cell had previously survived, paired with an enzyme capable of recognising and cutting any matching sequence on a future encounter.</p>
<p data-para="B"><strong>B.</strong> The transition from bacterial curiosity to laboratory tool came rapidly after 2012, when Jennifer Doudna and Emmanuelle Charpentier showed that the system could be programmed in vitro: a "guide RNA" matching any chosen target could direct the Cas9 enzyme to cut a specific DNA sequence. The breakthrough was in the simplicity. Earlier gene-editing methods (zinc fingers, TALENs) required elaborate protein engineering for each target; CRISPR required only the synthesis of a short RNA. The cost of editing a gene fell by roughly two orders of magnitude.</p>
<p data-para="C"><strong>C.</strong> The medical implications appeared, briefly, almost utopian. By 2023, the first commercial CRISPR therapy — Casgevy, for sickle-cell disease — received regulatory approval in the United Kingdom and the United States. Trials are underway for inherited retinal disease, transthyretin amyloidosis and certain cancers. The therapeutic principle is, in each case, similar: cells from the patient are edited in vitro and reintroduced. So-called <em>somatic</em> editing, applied only to body cells, raises few new ethical issues that conventional drug development does not.</p>
<p data-para="D"><strong>D.</strong> <em>Germline</em> editing — alteration of egg, sperm or embryo — is another matter. Changes to the germline are heritable: the descendants of the edited individual carry the alteration, indefinitely. The first announced germline editing in humans was carried out by the Chinese researcher He Jiankui in 2018, on twin embryos to confer resistance to HIV. The procedure was clinically unjustifiable — the parents already had effective protections — and the embryos appear to have suffered off-target effects. He was sentenced to three years in prison; the international scientific community imposed an effective moratorium.</p>
<p data-para="E"><strong>E.</strong> The moratorium does not amount to a ban. The 2020 international commission convened by the WHO recommended a path by which germline editing might one day proceed: only for severe monogenic disease, only when no alternative exists, only with international oversight. As of 2026, no such application has been authorised. But the relevant technical capacity exists, and several jurisdictions — including Russia and China — have research programmes whose adherence to international norms is uncertain.</p>
<p data-para="F"><strong>F.</strong> Beyond the human application, CRISPR is reshaping agriculture and ecosystem management. Genome-edited crops, in which a small change is made without inserting foreign DNA, occupy a regulatory grey area: in the European Union they are treated as conventional GMOs, while in the United States, Argentina and several Asian states they are not. Gene drives — engineered systems that bias inheritance to spread an edit through a wild population — have been proposed to suppress mosquito populations and eliminate invasive species. Whether the prudential case for such intervention will eventually outweigh the case against remains the policy question of the coming decade.</p>
`,
      vocabulary: [
        {
          term: 'germline',
          definition: 'Cells that give rise to gametes; alterations are heritable.',
          translation: 'tế bào dòng mầm',
        },
        {
          term: 'somatic',
          definition:
            "Relating to the body's cells other than reproductive cells; alterations are not heritable.",
          translation: 'tế bào cơ thể',
        },
        {
          term: 'monogenic',
          definition: 'Caused by a mutation in a single gene.',
        },
        {
          term: 'gene drive',
          definition:
            'An engineered genetic system that biases inheritance, allowing a trait to spread through a wild population faster than ordinary inheritance permits.',
        },
        {
          term: 'moratorium',
          definition: 'A temporary prohibition on an activity.',
          translation: 'lệnh tạm hoãn',
        },
      ],
      groups: [
        {
          id: 'r008-p3-g1',
          instruction:
            'Questions 27–32 · Do the following statements agree with the views of the writer? YES, NO, or NOT GIVEN.',
          questions: [
            {
              id: 'r008-q27',
              number: 27,
              type: 'yes-no-not-given',
              statement: 'CRISPR was deliberately designed by laboratory engineers.',
              correctAnswer: 'NO',
              explanation: 'Paragraph A says it was discovered and only later understood.',
            },
            {
              id: 'r008-q28',
              number: 28,
              type: 'yes-no-not-given',
              statement: 'The CRISPR system is naturally a bacterial immune system.',
              correctAnswer: 'YES',
              explanation: 'Paragraph A.',
            },
            {
              id: 'r008-q29',
              number: 29,
              type: 'yes-no-not-given',
              statement: 'CRISPR is more expensive than zinc-finger or TALEN methods.',
              correctAnswer: 'NO',
              explanation: 'Paragraph B says the cost fell roughly 100-fold.',
            },
            {
              id: 'r008-q30',
              number: 30,
              type: 'yes-no-not-given',
              statement: 'Casgevy was the first regulated CRISPR therapy.',
              correctAnswer: 'YES',
              explanation: 'Paragraph C.',
            },
            {
              id: 'r008-q31',
              number: 31,
              type: 'yes-no-not-given',
              statement:
                'The 2018 Jiankui procedure was clinically necessary for the parents involved.',
              correctAnswer: 'NO',
              explanation: 'Paragraph D states the procedure was clinically unjustifiable.',
            },
            {
              id: 'r008-q32',
              number: 32,
              type: 'yes-no-not-given',
              statement:
                'No germline-editing application had been authorised by the WHO commission as of 2026.',
              correctAnswer: 'YES',
              explanation: 'Paragraph E states this.',
            },
          ],
        },
        {
          id: 'r008-p3-g2',
          instruction: 'Questions 33–36 · Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'r008-q33',
              number: 33,
              type: 'multiple-choice',
              prompt: 'In what year did Doudna and Charpentier publish their key paper?',
              options: [
                { key: 'A', text: '1987.' },
                { key: 'B', text: '2010.' },
                { key: 'C', text: '2012.' },
                { key: 'D', text: '2020.' },
              ],
              correctAnswer: 'C',
              explanation: 'Paragraph B.',
            },
            {
              id: 'r008-q34',
              number: 34,
              type: 'multiple-choice',
              prompt: 'What distinguishes somatic from germline editing?',
              options: [
                { key: 'A', text: 'Somatic editing is more expensive.' },
                { key: 'B', text: 'Germline edits are heritable; somatic edits are not.' },
                { key: 'C', text: 'Somatic edits use Cas9; germline edits use Cas12.' },
                { key: 'D', text: 'There is no real difference.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
            {
              id: 'r008-q35',
              number: 35,
              type: 'multiple-choice',
              prompt:
                'How are genome-edited crops without inserted DNA treated in the European Union?',
              options: [
                { key: 'A', text: 'As conventionally bred plants.' },
                { key: 'B', text: 'As conventional GMOs.' },
                { key: 'C', text: 'They are banned outright.' },
                { key: 'D', text: 'They are unregulated.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph F.',
            },
            {
              id: 'r008-q36',
              number: 36,
              type: 'multiple-choice',
              prompt:
                'What does the writer mean by calling germline edits "indefinitely" heritable?',
              options: [
                { key: 'A', text: 'They are always reversible.' },
                { key: 'B', text: 'Their effects propagate to all subsequent descendants.' },
                { key: 'C', text: 'They last only one generation.' },
                { key: 'D', text: 'Their effects depend on environment.' },
              ],
              correctAnswer: 'B',
              explanation: 'Paragraph D.',
            },
          ],
        },
        {
          id: 'r008-p3-g3',
          instruction:
            'Questions 37–40 · Complete the summary. Choose NO MORE THAN TWO WORDS from the passage.',
          questions: [
            {
              id: 'r008-q37',
              number: 37,
              type: 'sentence-completion',
              sentenceBefore: 'The Cas9 enzyme is directed to a target by a programmed',
              sentenceAfter: '.',
              correctAnswer: 'guide RNA',
              acceptableVariants: ['guide-RNA', 'sgRNA'],
              maxWords: 2,
              explanation: 'Paragraph B.',
            },
            {
              id: 'r008-q38',
              number: 38,
              type: 'sentence-completion',
              sentenceBefore: 'The 2018 Jiankui procedure attempted to confer resistance to',
              sentenceAfter: '.',
              correctAnswer: 'HIV',
              acceptableVariants: ['the HIV virus'],
              maxWords: 2,
              explanation: 'Paragraph D.',
            },
            {
              id: 'r008-q39',
              number: 39,
              type: 'sentence-completion',
              sentenceBefore: 'The WHO commission recommended germline editing only for severe',
              sentenceAfter: 'disease.',
              correctAnswer: 'monogenic',
              acceptableVariants: [],
              maxWords: 1,
              explanation: 'Paragraph E.',
            },
            {
              id: 'r008-q40',
              number: 40,
              type: 'sentence-completion',
              sentenceBefore:
                'Engineered systems that bias inheritance to spread an edit through a wild population are called',
              sentenceAfter: '.',
              correctAnswer: 'gene drives',
              acceptableVariants: ['gene-drives'],
              maxWords: 2,
              explanation: 'Paragraph F.',
            },
          ],
        },
      ],
    },
  ],
}
