import type { VocabularyLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 06 · Technology. 70 items, 10/day across 7 days. */

const items: VocabularyLexiconItem[] = [
  // Day 1 — Devices
  v('w06-d1-01', 'device', 1, { partOfSpeech: 'noun', definition: 'A piece of equipment designed for a particular purpose.', example: 'The average household owns nine connected devices.', synonyms: [['gadget', 'B2'], ['appliance', 'B2']] }),
  v('w06-d1-02', 'gadget', 1, { partOfSpeech: 'noun', definition: 'A small electronic device, often new and clever.', example: 'A new kitchen gadget lasts about two years before being replaced.', synonyms: [['device', 'B2'], ['contraption', 'C1']] }),
  v('w06-d1-03', 'wearable', 1, { partOfSpeech: 'noun', definition: 'A device worn on the body, like a smartwatch.', example: 'Wearables now monitor heart rhythm continuously.', synonyms: [['fitness tracker', 'B2'], ['smart device', 'B2']] }),
  v('w06-d1-04', 'smartphone', 1, { partOfSpeech: 'noun', definition: 'A mobile phone with internet and computing features.', example: 'Most teenagers spend over three hours a day on a smartphone.', synonyms: [['mobile', 'B1'], ['handset', 'B2']] }),
  v('w06-d1-05', 'tablet', 1, { partOfSpeech: 'noun', definition: 'A small flat portable computer with a touchscreen.', example: 'A tablet has replaced the textbook in many classrooms.', synonyms: [['pad', 'B2'], ['slate', 'C1']] }),
  v('w06-d1-06', 'laptop', 1, { partOfSpeech: 'noun', definition: 'A small portable computer.', example: 'Most postgraduate students bring their own laptop to class.', synonyms: [['notebook', 'B2'], ['portable computer', 'B2']] }),
  v('w06-d1-07', 'console', 1, { partOfSpeech: 'noun', definition: 'A specialised computer for playing video games.', example: 'A new console releases every five to seven years.', synonyms: [['gaming system', 'B2'], ['games machine', 'B1']] }),
  v('w06-d1-08', 'peripheral', 1, { partOfSpeech: 'noun', definition: 'A device connected to a computer.', example: 'A good keyboard is the cheapest peripheral upgrade.', synonyms: [['accessory', 'B2'], ['attachment', 'B2']] }),
  v('w06-d1-09', 'obsolete', 1, { partOfSpeech: 'adjective', definition: 'No longer used because something better has replaced it.', example: 'Yesterday\'s flagship phone is obsolete within four years.', synonyms: [['outdated', 'B2'], ['antiquated', 'C1']] }),
  v('w06-d1-10', 'cutting-edge', 1, { partOfSpeech: 'adjective', definition: 'At the most advanced stage of development.', example: 'Cutting-edge research often takes a decade to reach the consumer.', synonyms: [['state-of-the-art', 'C1'], ['leading-edge', 'C1']] }),

  // Day 2 — Internet & networks
  v('w06-d2-01', 'broadband', 2, { partOfSpeech: 'noun', definition: 'A high-speed internet connection.', example: 'Rural broadband remains slower than urban broadband in most countries.', synonyms: [['high-speed internet', 'B2'], ['fixed-line internet', 'C1']] }),
  v('w06-d2-02', 'wifi', 2, { partOfSpeech: 'noun', definition: 'A wireless internet connection.', example: 'Public wifi is convenient but rarely secure.', synonyms: [['wireless', 'B2'], ['hotspot', 'B2']] }),
  v('w06-d2-03', 'bandwidth', 2, { partOfSpeech: 'noun', definition: 'The amount of data a network can transmit in a given time.', example: 'Video conferences consume bandwidth four times faster than voice calls.', synonyms: [['capacity', 'B2'], ['throughput', 'C1']] }),
  v('w06-d2-04', 'server', 2, { partOfSpeech: 'noun', definition: 'A computer that stores and shares data with other computers.', example: 'Each website runs on at least one server somewhere in the world.', synonyms: [['host', 'C1'], ['data centre node', 'C1']] }),
  v('w06-d2-05', 'cloud', 2, { partOfSpeech: 'noun', definition: 'Remote servers used to store and process data.', example: 'Most companies have moved their data to the cloud.', synonyms: [['remote storage', 'B2'], ['hosted service', 'C1']] }),
  v('w06-d2-06', 'streaming', 2, { partOfSpeech: 'noun', definition: 'Watching or listening to media as it is delivered over the internet.', example: 'Streaming has overtaken broadcast as the dominant form of viewing.', synonyms: [['live broadcasting', 'B2'], ['on-demand viewing', 'C1']] }),
  v('w06-d2-07', 'download', 2, { partOfSpeech: 'verb', definition: 'To transfer data from a remote computer to one\'s own.', example: 'I downloaded the document for offline reading.', synonyms: [['save', 'B1'], ['retrieve', 'B2']] }),
  v('w06-d2-08', 'upload', 2, { partOfSpeech: 'verb', definition: 'To transfer data to a remote computer.', example: 'Photographs upload faster on a wired connection.', synonyms: [['send', 'B1'], ['transmit', 'C1']] }),
  v('w06-d2-09', 'firewall', 2, { partOfSpeech: 'noun', definition: 'Software that prevents unauthorised access to a network.', example: 'A corporate firewall blocks personal cloud storage by default.', synonyms: [['security barrier', 'B2'], ['network shield', 'C1']] }),
  v('w06-d2-10', 'VPN', 2, { partOfSpeech: 'noun', definition: 'A secure connection between a user and the internet.', example: 'A VPN encrypts traffic between the laptop and the server.', synonyms: [['virtual private network', 'C1'], ['secure tunnel', 'C1']] }),

  // Day 3 — Software & apps
  v('w06-d3-01', 'application', 3, { partOfSpeech: 'noun', definition: 'A program designed for a particular task on a phone or computer.', example: 'A note-taking application is the cheapest productivity tool.', synonyms: [['app', 'B1'], ['program', 'B2']] }),
  v('w06-d3-02', 'platform', 3, { partOfSpeech: 'noun', definition: 'A system on which other software can run.', example: 'A successful platform attracts millions of small developers.', synonyms: [['system', 'B2'], ['ecosystem', 'C1']] }),
  v('w06-d3-03', 'interface', 3, { partOfSpeech: 'noun', definition: 'The way a person interacts with a machine or program.', example: 'A clean interface hides complexity from the user.', synonyms: [['front end', 'C1'], ['user interface', 'B2']] }),
  v('w06-d3-04', 'user-friendly', 3, { partOfSpeech: 'adjective', definition: 'Easy to use, especially without technical knowledge.', example: 'A user-friendly app needs no instructions on first use.', synonyms: [['intuitive', 'C1'], ['accessible', 'B2']] }),
  v('w06-d3-05', 'update', 3, { partOfSpeech: 'noun', definition: 'A new version of software with improvements.', example: 'A security update should be installed within twenty-four hours.', synonyms: [['patch', 'C1'], ['release', 'B2']] }),
  v('w06-d3-06', 'bug', 3, { partOfSpeech: 'noun', definition: 'An error in a computer program.', example: 'A small bug delayed the launch by a week.', synonyms: [['fault', 'B2'], ['glitch', 'B2']] }),
  v('w06-d3-07', 'glitch', 3, { partOfSpeech: 'noun', definition: 'A small problem that causes something to fail temporarily.', example: 'A glitch in the payment system locked thousands of accounts.', synonyms: [['hiccup', 'C1'], ['fault', 'B2']] }),
  v('w06-d3-08', 'compatibility', 3, { partOfSpeech: 'noun', definition: 'The ability of one device or program to work with another.', example: 'Compatibility between operating systems remains uneven.', synonyms: [['interoperability', 'C1'], ['fit', 'B2']] }),
  v('w06-d3-09', 'open-source', 3, { partOfSpeech: 'adjective', definition: 'With source code freely available for modification.', example: 'Open-source tools power most of the modern internet.', synonyms: [['free software', 'B2'], ['community-driven', 'C1']] }),
  v('w06-d3-10', 'proprietary', 3, { partOfSpeech: 'adjective', definition: 'Owned by a company and protected by copyright.', example: 'A proprietary format makes data hard to migrate later.', synonyms: [['licensed', 'C1'], ['exclusive', 'C1']] }),

  // Day 4 — AI & automation
  v('w06-d4-01', 'artificial intelligence', 4, { partOfSpeech: 'phrase', definition: 'The simulation of human intelligence by machines.', example: 'Artificial intelligence assists doctors in reading scans.', synonyms: [['AI', 'B2'], ['machine intelligence', 'C1']] }),
  v('w06-d4-02', 'algorithm', 4, { partOfSpeech: 'noun', definition: 'A set of rules a computer follows to solve a problem.', example: 'A search algorithm decides which pages you see first.', synonyms: [['procedure', 'B2'], ['ruleset', 'C1']] }),
  v('w06-d4-03', 'machine learning', 4, { partOfSpeech: 'phrase', definition: 'Computer systems that learn from data without explicit programming.', example: 'Machine learning improves with more data, not better code.', synonyms: [['ML', 'B2'], ['statistical learning', 'C1']] }),
  v('w06-d4-04', 'automation', 4, { partOfSpeech: 'noun', definition: 'The use of machines to perform tasks once done by people.', example: 'Automation has reshaped factory work in two decades.', synonyms: [['mechanisation', 'C1'], ['robotisation', 'C1']] }),
  v('w06-d4-05', 'robotics', 4, { partOfSpeech: 'noun', definition: 'The branch of technology that designs and builds robots.', example: 'Robotics graduates remain in heavy demand.', synonyms: [['robot engineering', 'B2'], ['mechatronics', 'C1']] }),
  v('w06-d4-06', 'chatbot', 4, { partOfSpeech: 'noun', definition: 'A program that simulates conversation with humans.', example: 'A first-line chatbot resolves about a third of customer queries.', synonyms: [['conversational AI', 'C1'], ['virtual assistant', 'B2']] }),
  v('w06-d4-07', 'data', 4, { partOfSpeech: 'noun', definition: 'Information collected for analysis.', example: 'Personal data is the fuel of the modern web.', synonyms: [['information', 'B1'], ['statistics', 'B2']] }),
  v('w06-d4-08', 'big data', 4, { partOfSpeech: 'phrase', definition: 'Extremely large datasets analysed by computers.', example: 'Big data enables doctors to predict outbreaks weeks in advance.', synonyms: [['large-scale data', 'C1'], ['mass data', 'C1']] }),
  v('w06-d4-09', 'predictive', 4, { partOfSpeech: 'adjective', definition: 'Able to forecast future events from current data.', example: 'Predictive algorithms decide which adverts you see.', synonyms: [['forecasting', 'C1'], ['anticipatory', 'C1']] }),
  v('w06-d4-10', 'deep learning', 4, { partOfSpeech: 'phrase', definition: 'A type of machine learning using layered neural networks.', example: 'Deep learning has transformed image recognition in a decade.', synonyms: [['neural networks', 'C1'], ['layered learning', 'C1']] }),

  // Day 5 — Privacy & security
  v('w06-d5-01', 'privacy', 5, { partOfSpeech: 'noun', definition: 'The state of being free from public attention or observation.', example: 'Online privacy has become a luxury rather than a default.', synonyms: [['confidentiality', 'C1'], ['secrecy', 'B2']] }),
  v('w06-d5-02', 'encryption', 5, { partOfSpeech: 'noun', definition: 'The conversion of data into a coded form for security.', example: 'End-to-end encryption protects messages even from the platform.', synonyms: [['ciphering', 'C1'], ['encoding', 'C1']] }),
  v('w06-d5-03', 'breach', 5, { partOfSpeech: 'noun', definition: 'An act of breaking through a security system.', example: 'A single data breach can cost a company millions.', synonyms: [['violation', 'C1'], ['leak', 'B2']] }),
  v('w06-d5-04', 'hack', 5, { partOfSpeech: 'verb', definition: 'To gain unauthorised access to a computer system.', example: 'A teenage student hacked the school grading system.', synonyms: [['breach', 'C1'], ['penetrate', 'C1']] }),
  v('w06-d5-05', 'malware', 5, { partOfSpeech: 'noun', definition: 'Software designed to damage or gain access to a system.', example: 'Most malware enters through a careless click on an email link.', synonyms: [['virus', 'B2'], ['malicious software', 'C1']] }),
  v('w06-d5-06', 'phishing', 5, { partOfSpeech: 'noun', definition: 'Fraud in which deceptive emails trick people into revealing data.', example: 'Phishing attacks now mimic banks with worrying accuracy.', synonyms: [['scam', 'B2'], ['social engineering', 'C1']] }),
  v('w06-d5-07', 'password', 5, { partOfSpeech: 'noun', definition: 'A secret string used to authenticate a user.', example: 'A unique password for each site is non-negotiable advice.', synonyms: [['passphrase', 'C1'], ['credential', 'C1']] }),
  v('w06-d5-08', 'authentication', 5, { partOfSpeech: 'noun', definition: 'The process of verifying a user\'s identity.', example: 'Two-factor authentication blocks most account takeovers.', synonyms: [['verification', 'C1'], ['identification', 'B2']] }),
  v('w06-d5-09', 'identity theft', 5, { partOfSpeech: 'phrase', definition: 'The fraudulent use of someone\'s personal information.', example: 'Identity theft costs consumers billions annually.', synonyms: [['ID fraud', 'C1'], ['impersonation', 'C1']] }),
  v('w06-d5-10', 'surveillance', 5, { partOfSpeech: 'noun', definition: 'Close observation, especially of a suspect or group.', example: 'Public surveillance has spread faster than its legal framework.', synonyms: [['monitoring', 'B2'], ['watching', 'B1']] }),

  // Day 6 — Communication & social media
  v('w06-d6-01', 'social media', 6, { partOfSpeech: 'phrase', definition: 'Websites and applications that enable users to share content.', example: 'Social media has shortened the attention span of an entire generation.', synonyms: [['social networks', 'B2'], ['online platforms', 'B2']] }),
  v('w06-d6-02', 'platform', 6, { partOfSpeech: 'noun', definition: 'An online service hosting communication.', example: 'Each platform attracts a different age group.', synonyms: [['network', 'B2'], ['service', 'B1']] }),
  v('w06-d6-03', 'follower', 6, { partOfSpeech: 'noun', definition: 'A person subscribed to another\'s content on a social network.', example: 'Followers count less than the engagement they show.', synonyms: [['subscriber', 'B2'], ['fan', 'B1']] }),
  v('w06-d6-04', 'influencer', 6, { partOfSpeech: 'noun', definition: 'A person whose recommendations affect others\' choices online.', example: 'A small influencer can sell more than a celebrity.', synonyms: [['content creator', 'C1'], ['opinion leader', 'C1']] }),
  v('w06-d6-05', 'viral', 6, { partOfSpeech: 'adjective', definition: 'Spreading rapidly online.', example: 'A viral post brings traffic but rarely loyalty.', synonyms: [['rapidly shared', 'B2'], ['widely-circulated', 'C1']] }),
  v('w06-d6-06', 'meme', 6, { partOfSpeech: 'noun', definition: 'An image, video, or idea that spreads through online culture.', example: 'A meme can capture a political moment more sharply than an article.', synonyms: [['internet joke', 'B2'], ['cultural reference', 'C1']] }),
  v('w06-d6-07', 'feed', 6, { partOfSpeech: 'noun', definition: 'A stream of content updated continuously.', example: 'My feed is curated to show only what I have engaged with.', synonyms: [['stream', 'B2'], ['timeline', 'B2']] }),
  v('w06-d6-08', 'echo chamber', 6, { partOfSpeech: 'phrase', definition: 'An environment where one only hears opinions agreeing with one\'s own.', example: 'An echo chamber feels comforting but narrows judgement.', synonyms: [['filter bubble', 'C1'], ['ideological cocoon', 'C1']] }),
  v('w06-d6-09', 'misinformation', 6, { partOfSpeech: 'noun', definition: 'False information spread without intent to deceive.', example: 'Misinformation about vaccines spread faster than the virus itself.', synonyms: [['falsehood', 'C1'], ['disinformation', 'C1']] }),
  v('w06-d6-10', 'disinformation', 6, { partOfSpeech: 'noun', definition: 'False information deliberately spread to mislead.', example: 'State-backed disinformation campaigns target election cycles.', synonyms: [['propaganda', 'C1'], ['fake news', 'B2']] }),

  // Day 7 — Future tech
  v('w06-d7-01', 'innovation', 7, { partOfSpeech: 'noun', definition: 'A new method, product, or idea.', example: 'Real innovation requires many failed prototypes.', synonyms: [['invention', 'B2'], ['breakthrough', 'B2']] }),
  v('w06-d7-02', 'disruption', 7, { partOfSpeech: 'noun', definition: 'A radical change that displaces an established practice.', example: 'Digital photography was a disruption that destroyed an industry.', synonyms: [['upheaval', 'C1'], ['transformation', 'B2']] }),
  v('w06-d7-03', 'virtual reality', 7, { partOfSpeech: 'phrase', definition: 'A computer-generated simulation of an environment.', example: 'Virtual reality is finding wider use in surgical training.', synonyms: [['VR', 'B2'], ['immersive simulation', 'C1']] }),
  v('w06-d7-04', 'augmented reality', 7, { partOfSpeech: 'phrase', definition: 'Technology that adds digital information to the real world.', example: 'Augmented reality apps overlay translations onto street signs.', synonyms: [['AR', 'C1'], ['mixed reality', 'C1']] }),
  v('w06-d7-05', 'blockchain', 7, { partOfSpeech: 'noun', definition: 'A distributed digital ledger of records.', example: 'Blockchain underpins both cryptocurrencies and supply-chain tracking.', synonyms: [['distributed ledger', 'C1'], ['decentralised database', 'C1']] }),
  v('w06-d7-06', 'cryptocurrency', 7, { partOfSpeech: 'noun', definition: 'A digital currency secured by cryptography.', example: 'Cryptocurrency volatility makes it a poor unit of account.', synonyms: [['digital currency', 'B2'], ['crypto', 'C1']] }),
  v('w06-d7-07', 'quantum computing', 7, { partOfSpeech: 'phrase', definition: 'Computing based on the principles of quantum mechanics.', example: 'Quantum computing promises to break current encryption.', synonyms: [['quantum systems', 'C1'], ['next-generation computing', 'C1']] }),
  v('w06-d7-08', 'autonomous vehicle', 7, { partOfSpeech: 'phrase', definition: 'A vehicle capable of driving without human input.', example: 'Autonomous vehicles must handle rare situations safely.', synonyms: [['self-driving car', 'B2'], ['driverless car', 'B2']] }),
  v('w06-d7-09', 'biotech', 7, { partOfSpeech: 'noun', definition: 'Technology that uses biology to make products.', example: 'Modern biotech has compressed years of crop breeding into months.', synonyms: [['biotechnology', 'C1'], ['life sciences', 'C1']] }),
  v('w06-d7-10', 'sustainability tech', 7, { partOfSpeech: 'phrase', definition: 'Technology designed to support environmental sustainability.', example: 'Sustainability tech attracts the largest share of climate venture capital.', synonyms: [['green tech', 'B2'], ['cleantech', 'C1']] }),
]

interface VocabInput { partOfSpeech: VocabularyLexiconItem['partOfSpeech']; definition: string; example: string; register?: VocabularyLexiconItem['register']; topic?: string; frequency?: VocabularyLexiconItem['frequency']; synonyms: Array<[string, VocabularyLexiconItem['register'], string?]> }
function v(shortId: string, headword: string, day: 1|2|3|4|5|6|7, input: VocabInput): VocabularyLexiconItem {
  return { discipline: 'vocabulary', id: `int-vocab-${shortId}`, headword, partOfSpeech: input.partOfSpeech, definition: input.definition, example: input.example, register: input.register ?? 'B2', topic: input.topic ?? 'technology', frequency: input.frequency ?? 'high', synonyms: input.synonyms.map(([word, register, nuance]) => ({ word, register, ...(nuance ? { nuance } : {}) })), level: 'intermediate', week: 6, day }
}

export const INTERMEDIATE_VOCAB_WEEK_06: VocabularyLexiconItem[] = items
