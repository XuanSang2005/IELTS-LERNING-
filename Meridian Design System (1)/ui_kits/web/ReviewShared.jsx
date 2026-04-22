// ReviewShared.jsx — card fixtures + queue state + shared UI pieces for the Review page.
// Card types match product intent: cloze, vocab, collocation, grammar, rewrite, linking.

// ─── Card fixtures ───────────────────────────────────────────
// Each card declares its `type` so variants can render appropriately.
const REVIEW_CARDS = [
  {
    id: 'c01', type: 'cloze', discipline: 'grammar',
    prompt: 'The committee was ____ divided on the proposal, with barely half in favour.',
    answer: 'narrowly',
    alt: ['barely', 'marginally'],
    note: 'Adverbs of degree with passive participles. "Narrowly" carries closer-to-formal register than "barely" here.',
    sourceTask: 'Task 2 · Environment',
    seenTimes: 3, easeDays: 7,
  },
  {
    id: 'c02', type: 'vocab', discipline: 'vocabulary',
    prompt: 'innocuous',
    answer: 'not harmful or offensive',
    example: 'What seemed an innocuous remark caused considerable offence.',
    registerNote: 'Academic. Common in reviews and commentary — rare in conversation.',
    sourceTask: 'Reading Test 4',
    seenTimes: 1, easeDays: 3,
  },
  {
    id: 'c03', type: 'collocation', discipline: 'collocations',
    prompt: 'to ____ a decision',
    answer: 'reach',
    alt: ['make', 'take', 'arrive at'],
    note: '"Reach a decision" and "arrive at a decision" are both natural. "Take a decision" is British-formal; "make" is the everyday form you want to avoid in Band 8 writing.',
    sourceTask: 'Task 2 · Employment',
    seenTimes: 2, easeDays: 5,
  },
  {
    id: 'c04', type: 'grammar', discipline: 'grammar',
    prompt: 'Third conditional \u2014 hypothetical past.',
    rule: 'If + past perfect, would have + past participle. Used for unreal past conditions and their imagined consequences.',
    good: 'If the government had invested earlier, the crisis would have been avoided.',
    bad:  'If the government would have invested earlier, the crisis would be avoided.',
    note: 'The "would have" does not migrate into the if-clause. This error accounts for ~18% of Band 6.5 papers.',
    sourceTask: 'Task 2 · Policy',
    seenTimes: 4, easeDays: 10,
  },
  {
    id: 'c05', type: 'rewrite', discipline: 'vocabulary',
    prompt: 'Rewrite at Band 8.',
    original: 'Nowadays, a lot of young people are using social media a lot, and this is bad for their mental health.',
    answer:   'Contemporary patterns of social media use among adolescents are increasingly implicated in declining mental health.',
    note: 'Swap "nowadays / a lot of / a lot / bad for" for register-appropriate nominalisations. Note the agentless construction.',
    sourceTask: 'Task 2 · Technology',
    seenTimes: 1, easeDays: 2,
  },
  {
    id: 'c06', type: 'linking', discipline: 'linking',
    prompt: 'nevertheless',
    function: 'Concessive \u2014 introduces a contrast that does not undo the previous clause.',
    good: 'The policy was expensive. Nevertheless, its long-term effects have been widely praised.',
    bad:  'The policy was expensive, nevertheless its long-term effects have been widely praised.',
    note: 'Nevertheless is a sentence adverb, not a conjunction. It takes a full stop or semicolon before it \u2014 never a comma alone.',
    sourceTask: 'Task 2 · Health',
    seenTimes: 2, easeDays: 6,
  },
];

// Discipline labels reused from DashboardShared — fall back if not loaded yet.
const RVW_DISCIPLINE_LABELS = (window.DISCIPLINE_LABELS) || {
  grammar: 'Grammar', vocabulary: 'Vocabulary', collocations: 'Collocations', linking: 'Linking Devices',
};

const TYPE_META = {
  cloze:       { numeral: 'I',   label: 'Cloze' },
  vocab:       { numeral: 'II',  label: 'Vocabulary' },
  collocation: { numeral: 'III', label: 'Collocation' },
  grammar:     { numeral: 'IV',  label: 'Grammar rule' },
  rewrite:     { numeral: 'V',   label: 'Band 8 rewrite' },
  linking:     { numeral: 'VI',  label: 'Linking device' },
};

// Deterministic queue builder — filter + repeat so queueLength feels real.
function buildQueue({ length = 14, discipline = null, cardTypeFilter = null }) {
  let base = REVIEW_CARDS.slice();
  if (discipline) base = base.filter(c => c.discipline === discipline);
  if (cardTypeFilter) base = base.filter(c => c.type === cardTypeFilter);
  if (base.length === 0) base = REVIEW_CARDS.slice();
  const out = [];
  for (let i = 0; i < length; i++) out.push(base[i % base.length]);
  return out;
}

// ─── Self-grade — four buttons, editorial copy ───────────────
const GRADES = [
  { key: 'again', label: 'Again',    helper: 'show me sooner',    ease: 'claret', ms: '1m' },
  { key: 'hard',  label: 'Hard',     helper: 'I had to think',    ease: 'ochre',  ms: '4d' },
  { key: 'good',  label: 'Good',     helper: 'I knew it',         ease: 'sage',   ms: '10d' },
  { key: 'easy',  label: 'Easy',     helper: 'too easy, space out',ease: 'graphite', ms: '28d' },
];

function GradeBar({ onGrade, variant = 'broadsheet' }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: variant === 'notebook' ? 14 : 0,
      borderTop: variant === 'notebook' ? 'none' : '1px solid var(--ink)',
    }}>
      {GRADES.map((g, i) => {
        const colorMap = { claret: 'var(--claret)', ochre: 'var(--ochre)', sage: 'var(--sage)', graphite: 'var(--graphite)' };
        const c = colorMap[g.ease];
        return (
          <button
            key={g.key}
            onClick={() => onGrade && onGrade(g)}
            style={{
              position: 'relative',
              background: 'transparent',
              border: variant === 'notebook' ? `1px solid ${c}` : 'none',
              borderRight: variant === 'notebook' ? `1px solid ${c}` : (i < 3 ? '1px solid var(--line)' : 'none'),
              padding: variant === 'notebook' ? '16px 12px' : '22px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              color: 'var(--ink)',
              transition: 'background 180ms',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = `color-mix(in oklab, ${c} 8%, transparent)`}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--ink)' }}>{g.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: c }}>{i + 1}</span>
            </span>
            <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, color: 'var(--graphite)' }}>
              {g.helper}
            </span>
            <span style={{ display: 'block', marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: c }}>
              + {g.ms}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Queue engine — keeps current card, progress, grade counts, session ─
function useReviewSession({ queueLength = 14, discipline = null, cardTypeFilter = null } = {}) {
  const [queue] = React.useState(() => buildQueue({ length: queueLength, discipline, cardTypeFilter }));
  const [idx, setIdx] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);
  const [counts, setCounts] = React.useState({ again: 0, hard: 0, good: 0, easy: 0 });

  const card = queue[idx];
  const total = queue.length;
  const done = idx;
  const complete = idx >= total;

  const reveal = () => setRevealed(true);
  const grade = (g) => {
    setCounts(c => ({ ...c, [g.key]: c[g.key] + 1 }));
    setRevealed(false);
    setIdx(i => i + 1);
  };
  const reset = () => { setIdx(0); setRevealed(false); setCounts({ again: 0, hard: 0, good: 0, easy: 0 }); };

  return { queue, card, idx, total, done, complete, revealed, counts, reveal, grade, reset };
}

// ─── Small shared atoms ──────────────────────────────────────

// Progress rail — dots per card, coloured by whether we've passed them
function ProgressRail({ queue, idx, style }) {
  return (
    <div style={{ display: 'flex', gap: 3, ...style }}>
      {queue.map((_, i) => {
        const isPast = i < idx;
        const isCurrent = i === idx;
        return (
          <span key={i} style={{
            flex: 1,
            height: 4,
            background: isPast ? 'var(--claret)' : isCurrent ? 'rgba(107,31,26,0.45)' : 'var(--line)',
            transition: 'background 200ms',
          }} />
        );
      })}
    </div>
  );
}

// Monospaced progress count "03 / 14"
function ProgressCount({ done, total, separator = '/', accent = 'var(--claret)' }) {
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--graphite)' }}>
      <span style={{ color: accent }}>{String(done).padStart(2, '0')}</span>
      <span style={{ margin: '0 8px', color: 'var(--graphite)' }}>{separator}</span>
      <span>{String(total).padStart(2, '0')}</span>
    </span>
  );
}

// Keyboard hint pill
function KeyHint({ keys, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--graphite)' }}>
      {keys.map((k, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: 'var(--line)' }}>+</span>}
          <kbd style={{
            display: 'inline-block', padding: '3px 7px',
            border: '1px solid var(--line)', borderBottomWidth: 2,
            background: 'var(--bone)', color: 'var(--ink)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            borderRadius: 2,
          }}>{k}</kbd>
        </React.Fragment>
      ))}
      <span style={{ color: 'var(--graphite)', letterSpacing: '0.22em' }}>{label}</span>
    </span>
  );
}

// Fallback link (if AppNav from DashboardShared hasn't loaded for some reason)
function useReviewNavShim() {
  return typeof window !== 'undefined' && window.AppNav ? window.AppNav : () => null;
}

Object.assign(window, {
  REVIEW_CARDS, TYPE_META, buildQueue, GRADES, GradeBar,
  useReviewSession, ProgressRail, ProgressCount, KeyHint,
  RVW_DISCIPLINE_LABELS,
  CardQuestion, CardAnswer,
});
