// DashboardNotebook.jsx — Variant B: bound notebook / ledger
// Ruled paper, handwritten-style ornaments, stitched-tape chapter dividers.
// Asymmetric column widths; each section feels like a new chapter.

function ChapterDivider({ numeral, title, meta }) {
  return (
    <div style={{ position: 'relative', padding: '36px 0 18px' }}>
      {/* stitched tape */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%) rotate(-1.4deg)',
        width: 260, height: 28, background: 'var(--claret)', boxShadow: '0 6px 12px -6px rgba(20,18,16,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span aria-hidden="true" style={{ position: 'absolute', inset: 3, border: '1px dashed rgba(246,241,231,0.5)' }} />
        <span style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--ivory)' }}>
          CHAPTER {numeral}
        </span>
      </div>
      <div style={{ marginTop: 44, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 10 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 36, lineHeight: 1, color: 'var(--ink)' }}>
          {title}<em style={{ color: 'var(--claret)' }}>.</em>
        </h3>
        {meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>{meta}</span>}
      </div>
    </div>
  );
}

function RuledPage({ children, style }) {
  return (
    <div style={{
      position: 'relative',
      backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 31px, rgba(201,191,168,0.45) 31px 32px)',
      backgroundSize: '100% 32px',
      padding: '0 20px 28px 60px',
      ...style,
    }}>
      {/* left margin rule */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 40, width: 1, background: 'var(--claret)', opacity: 0.55 }} />
      {children}
    </div>
  );
}

function NotebookSession({ session, profile }) {
  const done = session.stepsCompleted;
  return (
    <section>
      <ChapterDivider numeral="I" title={session.title.replace(/\.$/, '')} meta={`${session.totalMinutes} MIN · ${session.steps.length} STEPS`} />
      <RuledPage style={{ paddingTop: 8 }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: 'var(--graphite)', maxWidth: '52ch', paddingTop: 4 }}>
          {session.tagline}
        </p>

        {/* Editor's note — margin annotation style */}
        <div style={{ marginTop: 24, position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--claret)' }}>
          <span style={{ position: 'absolute', left: -36, top: -2, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--claret)', transform: 'rotate(-90deg)', transformOrigin: 'left top' }}>NOTE</span>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--ink)' }}>
            {session.editorsNote}
          </p>
        </div>

        {/* Checklist — handwritten-style */}
        <ol style={{ listStyle: 'none', margin: '32px 0 0', padding: 0 }}>
          {session.steps.map((s, i) => {
            const n = i + 1;
            const isDone = done >= n;
            const isCurrent = done + 1 === n;
            return (
              <li key={s.id} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '10px 0', borderBottom: '1px dashed var(--line)' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  border: `1.5px solid ${isDone ? 'var(--sage)' : isCurrent ? 'var(--claret)' : 'var(--line)'}`,
                  background: isDone ? 'var(--sage)' : isCurrent ? 'rgba(107,31,26,0.1)' : 'transparent',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: isDone ? 'var(--ivory)' : 'var(--claret)',
                  fontFamily: 'var(--font-display)', fontSize: 14, flexShrink: 0,
                }}>
                  {isDone ? '✓' : isCurrent ? '●' : ''}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: isDone ? 'var(--sage)' : 'var(--ink)', textDecoration: isDone ? 'line-through' : 'none', textDecorationColor: 'var(--line)' }}>
                    {s.title}
                  </span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>
                  {s.minutes} MIN
                </span>
              </li>
            );
          })}
        </ol>

        <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28 }}>
          <PrimaryButton>{done === 0 ? "Begin today's session" : `Resume at step ${done + 1}`}</PrimaryButton>
          <TextLink>Read the method</TextLink>
        </div>
      </RuledPage>
    </section>
  );
}

function NotebookPhase({ profile }) {
  const phase = PHASE_NAME[profile.phase];
  return (
    <section>
      <ChapterDivider numeral="II" title={`The phase — ${phase.name}`} meta={`WEEK ${String(profile.currentWeek).padStart(2, '0')} / XII`} />
      <RuledPage style={{ paddingTop: 8 }}>
        <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: 'var(--graphite)', maxWidth: '54ch' }}>
          {phase.note}
        </p>
        {/* Week strip — 12 week boxes */}
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const wk = i + 1;
            const isCurrent = wk === profile.currentWeek;
            const isPast = wk < profile.currentWeek;
            const phaseOf = wk <= 2 ? 1 : wk <= 6 ? 2 : wk <= 10 ? 3 : 4;
            return (
              <div key={wk} style={{ textAlign: 'center' }}>
                <div style={{
                  height: 56, border: '1px solid var(--line)',
                  background: isCurrent ? 'var(--claret)' : isPast ? 'var(--bone)' : 'transparent',
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: isCurrent ? 'var(--ivory)' : isPast ? 'var(--graphite)' : 'var(--graphite)', fontStyle: isCurrent ? 'normal' : 'italic' }}>
                    {String(wk).padStart(2, '0')}
                  </span>
                  {isCurrent && <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', color: 'var(--claret)', fontSize: 10 }}>▲</span>}
                </div>
                <span style={{ display: 'block', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: isCurrent ? 'var(--claret)' : 'var(--graphite)' }}>
                  Ph.{PHASE_NAME[phaseOf].numeral}
                </span>
              </div>
            );
          })}
        </div>
      </RuledPage>
    </section>
  );
}

function NotebookDisciplines({ profile }) {
  return (
    <section>
      <ChapterDivider numeral="III" title="The four disciplines" meta="LEDGER" />
      <RuledPage style={{ paddingTop: 8 }}>
        {/* Ledger-style table */}
        <div style={{ marginTop: 4 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr 60px', gap: 0, padding: '8px 0', borderBottom: '2px solid var(--ink)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>Discipline</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>Lessons</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>Completion</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)', textAlign: 'right' }}>%</span>
          </div>
          {DISCIPLINE_ORDER.map((d, i) => {
            const { completed, total } = profile.disciplineProgress[d];
            const pct = total ? Math.round(completed / total * 100) : 0;
            const ticks = 16;
            return (
              <div key={d} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr 60px', gap: 0, padding: '14px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ink)' }}>
                  <span style={{ color: 'var(--claret)', marginRight: 10 }}>№ {String(i + 1).padStart(2, '0')}</span>{DISCIPLINE_LABELS[d]}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', color: 'var(--ink)' }}>
                  {completed} / {total}
                </span>
                {/* tick marks — hand-drawn ledger style */}
                <span style={{ display: 'flex', gap: 3 }}>
                  {Array.from({ length: ticks }).map((_, k) => {
                    const filled = k < Math.round((completed / total) * ticks);
                    return <span key={k} style={{ display: 'inline-block', width: 2, height: 14, background: filled ? 'var(--claret)' : 'var(--line)', transform: `rotate(${k % 2 ? 3 : -3}deg)` }} />;
                  })}
                </span>
                <span style={{ textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--claret)' }}>{pct}<span style={{ fontSize: 14, color: 'var(--graphite)' }}>%</span></span>
              </div>
            );
          })}
        </div>
      </RuledPage>
    </section>
  );
}

function NotebookBand({ profile }) {
  const b = profile.currentBand;
  return (
    <section>
      <ChapterDivider numeral="IV" title="Your level" meta="FOLDOUT PLATE" />
      <RuledPage style={{ paddingTop: 8 }}>
        <div style={{
          marginTop: 8, border: '1px solid var(--ink)', padding: '32px 40px', background: 'var(--bone)',
          position: 'relative',
        }}>
          <span aria-hidden="true" style={{ position: 'absolute', inset: 6, border: '1px solid var(--line)', pointerEvents: 'none' }} />
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--claret)' }}>FOLDOUT ◆ BAND SCALE</p>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24 }}>
            <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 72, lineHeight: 1, color: 'var(--ink)' }}>
              <span style={{ color: 'var(--claret)' }}>{b.range[0].toFixed(1)}</span><span style={{ fontStyle: 'italic', color: 'var(--graphite)', fontSize: 40 }}> – {b.range[1].toFixed(1)}</span>
            </h4>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>TARGET</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--claret)' }}>{profile.targetBand.toFixed(1)}</span>
            </div>
          </div>
          <div style={{ marginTop: 32, position: 'relative', height: 60 }}>
            <div style={{ position: 'absolute', top: 20, left: 0, right: 0, height: 1, background: 'var(--ink)' }} />
            {Array.from({ length: 11 }).map((_, i) => {
              const v = 4 + i * 0.5;
              const isMajor = v % 1 === 0;
              const l = ((v - 4) / 5) * 100;
              return (
                <React.Fragment key={i}>
                  <div style={{ position: 'absolute', top: isMajor ? 12 : 16, left: `${l}%`, width: 1, height: isMajor ? 16 : 8, background: 'var(--ink)' }} />
                  {isMajor && <span style={{ position: 'absolute', top: 32, left: `${l}%`, transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--graphite)' }}>{v.toFixed(1)}</span>}
                </React.Fragment>
              );
            })}
            <div style={{
              position: 'absolute', top: 18, left: `${((b.range[0] - 4) / 5) * 100}%`,
              width: `${((b.range[1] - b.range[0]) / 5) * 100}%`, height: 5, background: 'var(--claret)',
            }} />
            <div style={{ position: 'absolute', top: 8, left: `${((profile.targetBand - 4) / 5) * 100}%`, width: 2, height: 24, background: 'var(--claret)', transform: 'translateX(-1px)' }} />
          </div>
          <p style={{ margin: '18px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
            CONFIDENCE <span style={{ color: 'var(--ink)' }}>{b.confidence.toUpperCase()}</span> &nbsp;◆&nbsp;
            SOURCE <span style={{ color: 'var(--ink)' }}>{b.setBy.toUpperCase()}</span>
          </p>
        </div>

        <div style={{ marginTop: 24 }}>
          <PrimaryButton>Recalibrate your band</PrimaryButton>
        </div>
      </RuledPage>
    </section>
  );
}

function DashboardNotebook({ stateKey = 'mid-phase', showGreeting = true }) {
  const { profile, session, due } = useDashboardData(stateKey);
  return (
    <div className="meridian-surface" style={{ minHeight: '100%' }}>
      <AppNav profile={profile} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '44px 72px 80px' }}>
        {showGreeting && (
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', borderBottom: '2px solid var(--ink)', paddingBottom: 20 }}>
            <div>
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--graphite)' }}>
                THE NOTEBOOK · {formatUKDate()} · WEEK {String(profile.currentWeek).padStart(2, '0')} / XII
              </p>
              <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 52, lineHeight: 1, color: 'var(--ink)' }}>
                Good afternoon, {profile.name.split(' ')[0]}.
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <DueStrap count={due} />
              <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>
                LIBRARY · FRI 24 APR · 19:00 ICT
              </p>
            </div>
          </header>
        )}

        <NotebookSession session={session} profile={profile} />
        <NotebookPhase profile={profile} />
        <NotebookDisciplines profile={profile} />
        <NotebookBand profile={profile} />
      </div>
    </div>
  );
}

Object.assign(window, { DashboardNotebook });
