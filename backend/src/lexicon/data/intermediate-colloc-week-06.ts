import type { CollocationLexiconItem } from '@shared/schemas/lexicon-items'

/** Intermediate · Week 06 · Technology chunks. 49 items, 7/day. Cutting-edge, state-of-the-art, user-friendly — the chunks of the press release. */

const items: CollocationLexiconItem[] = [
  // Day 1
  c('w06-d1-01', 'cutting-edge technology', 1, 'adjective-noun', 'most advanced technology available', 'Cutting-edge technology often takes a decade to reach the consumer.', ['leading-edge tech', 'state-of-the-art technology']),
  c('w06-d1-02', 'state-of-the-art', 1, 'adjective-noun', 'most modern and advanced', 'A state-of-the-art lab attracts students from across the country.', ['cutting-edge', 'most advanced']),
  c('w06-d1-03', 'user-friendly interface', 1, 'adjective-noun', 'easy-to-use design', 'A user-friendly interface needs no instructions on first use.', ['intuitive design', 'accessible interface']),
  c('w06-d1-04', 'wireless technology', 1, 'adjective-noun', 'technology working without cables', 'Wireless technology has freed factory layouts.', ['cable-free tech', 'remote technology']),
  c('w06-d1-05', 'mobile device', 1, 'adjective-noun', 'portable electronic device', 'Most internet traffic now comes from mobile devices.', ['handheld device', 'portable gadget']),
  c('w06-d1-06', 'technical issue', 1, 'adjective-noun', 'a problem related to technology', 'A small technical issue delayed the entire launch.', ['tech problem', 'technical fault']),
  c('w06-d1-07', 'high-tech', 1, 'adjective-noun', 'using or relating to advanced technology', 'A high-tech industry can shift its location overnight.', ['advanced-tech', 'sophisticated technology']),

  // Day 2
  c('w06-d2-01', 'browse the internet', 2, 'verb-noun', 'look at various websites for information', 'Most users browse the internet on their phone first.', ['surf the web', 'navigate online']),
  c('w06-d2-02', 'access the internet', 2, 'verb-noun', 'connect to the global network', 'Rural areas still struggle to access the internet at usable speeds.', ['connect online', 'get online']),
  c('w06-d2-03', 'high-speed internet', 2, 'adjective-noun', 'fast internet connection', 'High-speed internet is now considered essential infrastructure.', ['broadband', 'fast connection']),
  c('w06-d2-04', 'internet connection', 2, 'noun-noun', 'link to the global network', 'A reliable internet connection enables remote working.', ['network link', 'web access']),
  c('w06-d2-05', 'social network', 2, 'adjective-noun', 'online platform for social interaction', 'Each social network attracts a different demographic.', ['social platform', 'social media site']),
  c('w06-d2-06', 'online platform', 2, 'adjective-noun', 'website or application providing services', 'An online platform can scale faster than any traditional business.', ['digital platform', 'web service']),
  c('w06-d2-07', 'go online', 2, 'verb-adverb', 'connect to the internet', 'Most students go online before breakfast.', ['get online', 'log on']),

  // Day 3
  c('w06-d3-01', 'install software', 3, 'verb-noun', 'put software onto a computer', 'New employees install company software on their first day.', ['set up software', 'load programs']),
  c('w06-d3-02', 'update software', 3, 'verb-noun', 'install a new version of a program', 'Updating software promptly closes most security gaps.', ['upgrade software', 'patch software']),
  c('w06-d3-03', 'download a file', 3, 'verb-noun', 'transfer a file from a remote source', 'Downloading large files works best on a wired connection.', ['save a file', 'retrieve a document']),
  c('w06-d3-04', 'upload content', 3, 'verb-noun', 'transfer content to a remote server', 'Photographers upload thousands of images each week.', ['post content', 'transmit material']),
  c('w06-d3-05', 'computer program', 3, 'noun-noun', 'a set of instructions for a computer', 'A simple computer program can save hours of repetitive work.', ['software application', 'app']),
  c('w06-d3-06', 'fix a bug', 3, 'verb-noun', 'correct a software error', 'Engineers fix a bug faster when they can reproduce it.', ['resolve an error', 'patch a defect']),
  c('w06-d3-07', 'crash the system', 3, 'verb-noun', 'cause the computer to fail', 'A poorly written script crashed the system for an hour.', ['take down the system', 'break the system']),

  // Day 4
  c('w06-d4-01', 'artificial intelligence', 4, 'adjective-noun', 'simulation of human intelligence by machines', 'Artificial intelligence assists doctors in reading scans.', ['AI', 'machine intelligence']),
  c('w06-d4-02', 'machine learning', 4, 'noun-noun', 'computer systems that learn from data', 'Machine learning improves with more data, not better code.', ['ML', 'statistical learning']),
  c('w06-d4-03', 'big data', 4, 'adjective-noun', 'extremely large datasets', 'Big data enables doctors to predict outbreaks weeks in advance.', ['large-scale data', 'mass data']),
  c('w06-d4-04', 'data analysis', 4, 'noun-noun', 'inspection and modelling of data', 'Data analysis is now a core skill for any researcher.', ['data processing', 'analytics']),
  c('w06-d4-05', 'process information', 4, 'verb-noun', 'examine and act on information', 'Modern computers process information faster than humans can read it.', ['handle data', 'analyse information']),
  c('w06-d4-06', 'cloud storage', 4, 'noun-noun', 'remote data storage system', 'Cloud storage allows access to files from any device.', ['online storage', 'remote storage']),
  c('w06-d4-07', 'develop software', 4, 'verb-noun', 'create computer programs', 'A team of three developed the software in eight months.', ['build software', 'code applications']),

  // Day 5
  c('w06-d5-01', 'cyber security', 5, 'adjective-noun', 'protection against digital threats', 'Cyber security spending has doubled in five years.', ['digital security', 'IT security']),
  c('w06-d5-02', 'data breach', 5, 'noun-noun', 'unauthorised access to confidential data', 'A single data breach can cost a company millions.', ['data leak', 'security violation']),
  c('w06-d5-03', 'protect privacy', 5, 'verb-noun', 'safeguard personal information', 'Apps that protect privacy attract loyal users.', ['safeguard data', 'preserve confidentiality']),
  c('w06-d5-04', 'identity theft', 5, 'noun-noun', 'fraudulent use of personal information', 'Identity theft costs consumers billions annually.', ['ID fraud', 'impersonation']),
  c('w06-d5-05', 'computer virus', 5, 'noun-noun', 'malicious program that damages a computer', 'A new computer virus disabled hospitals across Europe.', ['malware', 'malicious software']),
  c('w06-d5-06', 'change password', 5, 'verb-noun', 'replace a password with a new one', 'Security guidelines say to change password regularly.', ['reset password', 'update password']),
  c('w06-d5-07', 'log in to account', 5, 'verb-preposition', 'enter credentials to access an account', 'You log in to account using two-factor authentication.', ['sign in', 'access account']),

  // Day 6
  c('w06-d6-01', 'send a text message', 6, 'verb-noun', 'transmit a written message via mobile', 'Younger users prefer to send a text message rather than call.', ['text', 'send an SMS']),
  c('w06-d6-02', 'make a video call', 6, 'verb-noun', 'have a face-to-face conversation via the internet', 'I make a video call to my parents every Sunday.', ['video chat', 'have a video conference']),
  c('w06-d6-03', 'voice command', 6, 'noun-noun', 'spoken instruction to a device', 'Voice commands work better on simple tasks than complex ones.', ['voice control', 'spoken instruction']),
  c('w06-d6-04', 'go viral', 6, 'verb-adjective', 'spread rapidly online', 'A short clip went viral within hours.', ['spread quickly', 'become widespread']),
  c('w06-d6-05', 'follow on social media', 6, 'verb-preposition', 'subscribe to someone\'s social media content', 'Many young people follow politicians on social media before reading the news.', ['subscribe to', 'connect with']),
  c('w06-d6-06', 'share online', 6, 'verb-adverb', 'post content on the internet', 'I share online only what I would say in person.', ['post', 'publish online']),
  c('w06-d6-07', 'screen time', 6, 'noun-noun', 'time spent looking at electronic screens', 'Reducing screen time before bed improves sleep quality.', ['device time', 'digital exposure']),

  // Day 7
  c('w06-d7-01', 'technological advancement', 7, 'adjective-noun', 'progress in technology', 'Technological advancement has transformed every industry.', ['tech progress', 'innovation']),
  c('w06-d7-02', 'digital transformation', 7, 'adjective-noun', 'shift from analog to digital systems', 'Digital transformation requires more than new software.', ['digitalisation', 'tech overhaul']),
  c('w06-d7-03', 'embrace technology', 7, 'verb-noun', 'adopt and use new technology willingly', 'Older industries are slow to embrace technology.', ['adopt tech', 'welcome innovation']),
  c('w06-d7-04', 'rely on technology', 7, 'verb-preposition', 'depend on technological systems', 'Modern hospitals rely on technology for diagnosis and treatment.', ['depend on tech', 'lean on technology']),
  c('w06-d7-05', 'keep up with technology', 7, 'verb-preposition', 'remain current with technological changes', 'Keeping up with technology is now part of every job.', ['stay current', 'remain up-to-date']),
  c('w06-d7-06', 'rapid development', 7, 'adjective-noun', 'fast progress', 'The rapid development of AI has surprised even its researchers.', ['quick progress', 'fast advancement']),
  c('w06-d7-07', 'replace human labour', 7, 'verb-noun', 'substitute machines for human workers', 'Automation has replaced human labour in many factory tasks.', ['supplant workers', 'mechanise tasks']),
]

function c(shortId: string, phrase: string, day: 1|2|3|4|5|6|7, pattern: CollocationLexiconItem['pattern'], definition: string, example: string, alternatives: string[], register: CollocationLexiconItem['register'] = 'B2'): CollocationLexiconItem {
  return { discipline: 'collocations', id: `int-colloc-${shortId}`, phrase, pattern, definition, example, register, topic: 'technology', alternatives, level: 'intermediate', week: 6, day }
}

export const INTERMEDIATE_COLLOC_WEEK_06: CollocationLexiconItem[] = items
