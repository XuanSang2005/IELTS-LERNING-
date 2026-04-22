// DashboardPlate.jsx — Variant C: plate & calendar
// 12-week calendar strip as masthead; oversized plate-framed lede card;
// three-column ledger footer for phase/disciplines/band.
// The most ornamental of the three variants — uses OrnamentPlate + OrnamentFeather.

// Ornamental 8-fold rosette plate (inline SVG — matches repo's OrnamentPlate.tsx)
function OrnamentRosette({ size = 120 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 120 120" fill="none" stroke="var(--claret)" style={{ opacity: 0.85 }}>
      <rect x="6" y="6" width="108" height="108" strokeWidth="0.7" opacity="0.5" />
      <rect x="14" y="14" width="92" height="92" strokeWidth="0.5" opacity="0.3" />
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1="60" y1="28" x2="60" y2="92" transform={`rotate(${i * 11.25} 60 60)`} strokeWidth="0.5" opacity="0.3" />
      ))}
      <circle cx="60" cy="60" r="22" strokeWidth="0.6" opacity="0.7" />
      <circle cx="60" cy="60" r="12" strokeWidth="0.6" opacity="0.5" />
      <circle cx="60" cy="60" r="2.5" fill="var(--claret)" stroke="none" />
    </svg>
  );
}

// 12-week calendar strip — primary masthead
function CalendarStrip({ profile }) {
  const phases = [
    { num: 'I',  weeks: [1, 2],          name: 'Diagnosis' },
    { num: 'II', weeks: [3, 4, 5, 6],    name: 'Foundations' },
    { num: 'III', weeks: [7, 8, 9, 10],  name: 'Polish' },
    { num: 'IV', weeks: [11, 12],        name: 'Examination' },
  ];
  return (
    <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      {/* Phase header row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 4fr 4fr 2fr', borderBottom: '1px solid var(--line)' }}>
        {phases.map((p, i) => {
          const isActive = p.weeks.includes(profile.currentWeek);
          return (
            <div key={p.num} style={{
              padding: '12px 20px',
              borderRight: i < phases.length - 1 ? '1px solid var(--line)' : 'none',
              background: isActive ? 'rgba(107,31,26,0.05)' : 'transparent',
              display: 'flex', alignItems: 'baseline', gap: 12,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: isActive ? 'var(--claret)' : 'var(--graphite)' }}>Phase {p.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: isActive ? 'var(--ink)' : 'var(--graphite)' }}>{p.name}</span>
            </div>
          );
        })}
      </div>

      {/* Week cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const wk = i + 1;
          const isCurrent = wk === profile.currentWeek;
          const isPast = wk < profile.currentWeek;
          return (
            <div key={wk} style={{
              padding: '20px 10px',
              borderRight: wk < 12 ? '1px solid var(--line)' : 'none',
              background: isCurrent ? 'var(--claret)' : isPast ? 'var(--bone)' : 'transparent',
              color: isCurrent ? 'var(--ivory)' : 'var(--ink)',
              minHeight: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.28em', opacity: isCurrent ? 0.8 : 0.55 }}>WK</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1, fontStyle: isCurrent ? 'normal' : 'italic', marginTop: 2 }}>
                {String(wk).padStart(2, '0')}
              </span>
              {isCurrent && (
                <span style={{ position: 'absolute', bottom: 6, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.25em' }}>TODAY</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Plate-framed lede session card
function PlateSessionCard({ session, due, library, profile }) {
  const done = session.stepsCompleted;
  return (
    <div style={{ position: 'relative', padding: '56px 0 16px' }}>
      {/* Feather ornament — floats at right gutter */}
      <div aria-hidden="true" style={{ position: 'absolute', right: -40, top: 40, opacity: 0.5 }}>
        <OrnamentFeather style={{}} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '108px 1fr', gap: 40, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
          <OrnamentRosette size={108} />
          <p style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--graphite)' }}>PL. I</p>
        </div>

        <div>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--claret)' }}>
            § I &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>TODAY'S SESSION</span>
            <span aria-hidden="true" style={{ color: 'var(--ochre)', margin: '0 10px' }}>◆</span>
            <span style={{ color: 'var(--graphite)', letterSpacing: '0.22em' }}>{session.totalMinutes} MIN · {session.steps.length} STEPS</span>
          </p>

          <h2 style={{
            margin: '18px 0 0',
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(52px, 5.4vw, 84px)', lineHeight: 0.96, letterSpacing: '-0.025em',
            color: 'var(--ink)', maxWidth: 900,
          }}>
            {session.title.replace(/\.$/, '')}<em style={{ fontStyle: 'italic', color: 'var(--claret)' }}>.</em>
          </h2>

          <p style={{ marginTop: 20, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: 'var(--graphite)', maxWidth: '52ch' }}>
            {session.tagline}
          </p>

          {/* Step rail */}
          <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: `repeat(${session.steps.length}, 1fr)`, gap: 2, maxWidth: 640 }}>
            {session.steps.map((s, i) => {
              const n = i + 1;
              const isDone = done >= n;
              const isCurrent = done + 1 === n;
              return (
                <div key={s.id} style={{
                  height: 4, background: isDone ? 'var(--claret)' : isCurrent ? 'rgba(107,31,26,0.5)' : 'var(--line)',
                }} title={`Step ${n}: ${s.title}`} />
              );
            })}
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', maxWidth: 640, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
            <span>{String(done).padStart(2, '0')} OF {String(session.steps.length).padStart(2, '0')} DONE</span>
            <span>NEXT — <span style={{ color: 'var(--claret)' }}>{session.steps[Math.min(done, session.steps.length - 1)].title}</span></span>
          </div>

          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
            <PrimaryButton>{done === 0 ? "Begin today's session" : `Resume at step ${done + 1}`}</PrimaryButton>
            <TextLink>Read the method</TextLink>
            <div style={{ marginLeft: 'auto', borderLeft: '1px solid var(--line)', paddingLeft: 20 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)' }}>NEXT LIBRARY</span>
              <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)' }}>{library.label}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--graphite)' }}>{library.topic}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Three-column footer ledger — phase / disciplines / band
function PlateFooter({ profile }) {
  const phase = PHASE_NAME[profile.phase];
  const b = profile.currentBand;
  return (
    <section style={{ borderTop: '2px solid var(--ink)', paddingTop: 24, marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 48 }}>
      {/* Phase */}
      <div>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--claret)' }}>§ II &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>THE PHASE</span></p>
        <h3 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 44, lineHeight: 1, color: 'var(--ink)' }}>
          <span style={{ color: 'var(--claret)' }}>{phase.numeral}</span> · {phase.name}<em style={{ color: 'var(--claret)', fontStyle: 'italic' }}>.</em>
        </h3>
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.5, color: 'var(--graphite)' }}>{phase.note}</p>
      </div>

      {/* Disciplines */}
      <div>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--claret)' }}>§ III &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>THE FOUR DISCIPLINES</span></p>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {DISCIPLINE_ORDER.map((d) => {
            const { completed, total } = profile.disciplineProgress[d];
            const pct = total ? Math.round(completed / total * 100) : 0;
            const r = 32;
            const circ = 2 * Math.PI * r;
            return (
              <div key={d} style={{ textAlign: 'center' }}>
                {/* radial dial */}
                <svg width="78" height="78" viewBox="0 0 78 78" style={{ display: 'block', margin: '0 auto' }}>
                  <circle cx="39" cy="39" r={r} fill="none" stroke="var(--line)" strokeWidth="1" />
                  <circle
                    cx="39" cy="39" r={r}
                    fill="none" stroke="var(--claret)" strokeWidth="2.5"
                    strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                    transform="rotate(-90 39 39)"
                    strokeLinecap="square"
                  />
                  <text x="39" y="44" textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fill="var(--ink)">{pct}</text>
                </svg>
                <span style={{ display: 'block', marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--ink)' }}>{DISCIPLINE_LABELS[d]}</span>
                <span style={{ display: 'block', marginTop: 2, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
                  {completed} / {total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Band */}
      <div>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--claret)' }}>§ IV &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>YOUR LEVEL</span></p>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 60, lineHeight: 1, color: 'var(--claret)' }}>{b.range[0].toFixed(1)}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--graphite)' }}>– {b.range[1].toFixed(1)}</span>
        </div>
        <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
          TARGET <span style={{ color: 'var(--ink)' }}>{profile.targetBand.toFixed(1)}</span>
        </p>
        {/* Vertical arrow-to-target visual */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${((b.range[1] - 4) / 5) * 100}%`, background: 'var(--claret)' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--claret)' }}>→ {profile.targetBand.toFixed(1)}</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <TextLink>Recalibrate your band</TextLink>
        </div>
      </div>
    </section>
  );
}

function DashboardPlate({ stateKey = 'mid-phase', showGreeting = true }) {
  const { profile, session, due, library } = useDashboardData(stateKey);
  return (
    <div className="meridian-surface" style={{ minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
      <AppNav profile={profile} />
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '32px 56px 80px' }}>
        {showGreeting && (
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 32, padding: '12px 0 24px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--graphite)' }}>
                THE MERIDIAN ◆ PROGRAMME LEDGER ◆ {formatUKDate()}
              </p>
              <h1 style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 44, lineHeight: 1, color: 'var(--ink)' }}>
                Good afternoon, <span style={{ color: 'var(--claret)' }}>{profile.name.split(' ')[0]}</span>.
              </h1>
            </div>
            <DueStrap count={due} />
          </div>
        )}

        <CalendarStrip profile={profile} />

        <PlateSessionCard session={session} due={due} library={library} profile={profile} />

        <PlateFooter profile={profile} />
      </div>
    </div>
  );
}

Object.assign(window, { DashboardPlate, CalendarStrip, OrnamentRosette });
