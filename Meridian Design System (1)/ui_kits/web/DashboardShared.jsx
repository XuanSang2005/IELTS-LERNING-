// DashboardShared.jsx — mock data + AppNav + small building blocks
// used across the three dashboard variants.

// ─── Mock data ────────────────────────────────────────────────
// Shaped to match Ielts lerning/frontend/src/schemas/practice.ts (UserProfile,
// Discipline, SessionBlueprint) so every variant reads the same fixtures.

const MOCK_PROFILES = {
  'mid-phase': {
    name: 'Linh Nguyen',
    currentWeek: 7,
    phase: 2,
    currentBand: { level: 'advanced', range: [7.0, 7.5], confidence: 'high', setBy: 'algorithm' },
    targetBand: 8.0,
    disciplineProgress: {
      grammar:       { completed: 14, total: 24 },
      vocabulary:    { completed: 18, total: 30 },
      collocations:  { completed:  9, total: 20 },
      linking:       { completed: 11, total: 16 },
    },
  },
  'early-week': {
    name: 'Linh Nguyen',
    currentWeek: 2,
    phase: 1,
    currentBand: { level: 'intermediate', range: [5.5, 6.5], confidence: 'low', setBy: 'diagnostic' },
    targetBand: 7.5,
    disciplineProgress: {
      grammar:       { completed:  3, total: 24 },
      vocabulary:    { completed:  4, total: 30 },
      collocations:  { completed:  1, total: 20 },
      linking:       { completed:  2, total: 16 },
    },
  },
  'exam-ready': {
    name: 'Linh Nguyen',
    currentWeek: 11,
    phase: 4,
    currentBand: { level: 'mastery', range: [8.0, 8.5], confidence: 'high', setBy: 'algorithm' },
    targetBand: 8.5,
    disciplineProgress: {
      grammar:       { completed: 22, total: 24 },
      vocabulary:    { completed: 28, total: 30 },
      collocations:  { completed: 18, total: 20 },
      linking:       { completed: 15, total: 16 },
    },
  },
};

const PHASE_LABEL = {
  1: 'PHASE I — DIAGNOSIS',
  2: 'PHASE II — FOUNDATIONS',
  3: 'PHASE III — POLISH',
  4: 'PHASE IV — EXAMINATION',
};

const PHASE_NAME = {
  1: { numeral: 'I', name: 'Diagnosis', note: 'Find the ceiling. Understand the errors.' },
  2: { numeral: 'II', name: 'Foundations', note: 'Repair the grammar and lexis that score below seven.' },
  3: { numeral: 'III', name: 'Polish', note: 'Refine rhythm, register, and the habits of Band 8.' },
  4: { numeral: 'IV', name: 'Examination', note: 'Simulate the paper under test conditions.' },
};

const MOCK_SESSION = {
  'mid-phase': {
    title: 'The grammar of comparison, continued.',
    tagline: 'Today we return to comparatives — the subtle machinery Band 8 essays depend on, and the quiet place most Band 7 essays lose points.',
    totalMinutes: 42,
    focus: { discipline: 'grammar', level: 'advanced' },
    editorsNote: 'Yesterday\u2019s drills showed hesitation around than-clauses. We\u2019ll loop that before the writing task.',
    steps: [
      { id: 's1', title: 'Read the lesson',         minutes:  6 },
      { id: 's2', title: 'Notice in a model essay', minutes:  8 },
      { id: 's3', title: 'Recall yesterday\u2019s items', minutes:  5 },
      { id: 's4', title: 'Apply in a 250-word task', minutes: 18 },
      { id: 's5', title: 'Read the feedback',        minutes:  5 },
    ],
    stepsCompleted: 2,
  },
  'early-week': {
    title: 'The diagnostic, part two.',
    tagline: 'A short writing task and a listening section, graded by tomorrow morning, to place you precisely on the band scale.',
    totalMinutes: 35,
    focus: { discipline: 'vocabulary', level: 'intermediate' },
    editorsNote: 'Welcome. The diagnostic is not an exam \u2014 it is the first mirror.',
    steps: [
      { id: 's1', title: 'Diagnostic writing — Task 2', minutes: 20 },
      { id: 's2', title: 'Diagnostic listening — Part 3', minutes: 12 },
      { id: 's3', title: 'Plan the week',               minutes:  3 },
    ],
    stepsCompleted: 0,
  },
  'exam-ready': {
    title: 'Mock examination № III.',
    tagline: 'The last full paper before the test. Sit it unbroken, at the desk, with the paper clock running.',
    totalMinutes: 180,
    focus: { discipline: 'grammar', level: 'mastery' },
    editorsNote: 'Three mocks behind you. One remains. Treat it as the real thing.',
    steps: [
      { id: 's1', title: 'Listening paper',     minutes: 30 },
      { id: 's2', title: 'Reading paper',       minutes: 60 },
      { id: 's3', title: 'Writing Task 1',      minutes: 20 },
      { id: 's4', title: 'Writing Task 2',      minutes: 40 },
      { id: 's5', title: 'Speaking — recorded', minutes: 15 },
      { id: 's6', title: 'Read the feedback',   minutes: 15 },
    ],
    stepsCompleted: 3,
  },
};

const DISCIPLINE_LABELS = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  collocations: 'Collocations',
  linking: 'Linking Devices',
};
const DISCIPLINE_ORDER = ['grammar', 'vocabulary', 'collocations', 'linking'];

// Due items fixture — count only; used in greeting strap.
const DUE_COUNTS = { 'mid-phase': 14, 'early-week': 0, 'exam-ready': 31 };

// Next library date (Friday evenings, Vietnam time)
const NEXT_LIBRARY = {
  label: 'FRI 24 APR · 19:00 ICT',
  topic: 'Band 8 rewrites, live.',
};

// British date formatter
function formatUKDate(d = new Date('2026-04-17T09:00:00')) {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

function useDashboardData(stateKey = 'mid-phase') {
  const profile = MOCK_PROFILES[stateKey];
  const session = MOCK_SESSION[stateKey];
  const due = DUE_COUNTS[stateKey];
  return { profile, session, due, library: NEXT_LIBRARY };
}

// ─── AppNav — reuse of frontend's component, simplified ────────
function AppNav({ profile, active = 'Dashboard' }) {
  const links = ['Dashboard', 'Tests', 'Review', 'Errors'];
  const initials = profile.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const weekStr = String(profile.currentWeek).padStart(2, '0');
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--ivory)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, padding: '20px 32px' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1, letterSpacing: '-0.01em' }}>
            <span style={{ color: 'var(--claret)' }}>M</span><span style={{ color: 'var(--ink)' }}>eridian</span>
          </span>
          <span style={{ position: 'absolute', left: 0, top: '100%', marginTop: 4, whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
            STUDENT · COHORT IV · WEEK {weekStr} / XII
          </span>
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', gap: 40 }}>
          {links.map((label) => {
            const isActive = label === active;
            return (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} style={{ position: 'relative', fontFamily: 'var(--font-body)', fontSize: 20, fontWeight: 500, color: isActive ? 'var(--claret)' : 'var(--ink)', textDecoration: 'none' }}>
                {label}
                {isActive && <span style={{ position: 'absolute', left: 0, bottom: -4, height: 2, width: '100%', background: 'var(--claret)' }} />}
              </a>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--bone)', fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)' }}>
          {initials}
        </div>
      </div>
    </nav>
  );
}

// ─── Small building blocks ────────────────────────────────────

// Section masthead: claret 2px top rule + eyebrow + figure + meta
function SectionMast({ numeral, title, meta, align = 'left' }) {
  return (
    <div style={{ borderBottom: '1px solid var(--line)', borderTop: '2px solid var(--claret)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, padding: '14px 0', flexDirection: align === 'right' ? 'row-reverse' : 'row' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)' }}>
          {numeral}
          <span aria-hidden="true" style={{ margin: '0 10px', color: 'var(--ochre)' }}>◆</span>
          <span style={{ color: 'var(--ink)' }}>{title}</span>
        </p>
        {meta && (
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>{meta}</p>
        )}
      </div>
    </div>
  );
}

// Due badge
function DueStrap({ count }) {
  if (count === 0) {
    return (
      <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--sage)' }}>
        Nothing due today.
      </span>
    );
  }
  return (
    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--graphite)' }}>
      <span style={{ fontStyle: 'normal', color: 'var(--claret)' }}>{count}</span> {count === 1 ? 'item' : 'items'} due for review.
    </span>
  );
}

Object.assign(window, {
  MOCK_PROFILES, MOCK_SESSION, PHASE_LABEL, PHASE_NAME, DISCIPLINE_LABELS, DISCIPLINE_ORDER,
  DUE_COUNTS, NEXT_LIBRARY, formatUKDate, useDashboardData,
  AppNav, SectionMast, DueStrap,
});
