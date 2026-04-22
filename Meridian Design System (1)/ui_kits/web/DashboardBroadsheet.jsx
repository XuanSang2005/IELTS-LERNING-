// DashboardBroadsheet.jsx — Variant A: the broadsheet newspaper
// 7-column lede + 5-column sidebar; running masthead, drop cap, column rules.

function BroadMasthead({ profile, due }) {
  const date = formatUKDate();
  const weekStr = String(profile.currentWeek).padStart(2, '0');
  return (
    <header style={{ borderTop: '3px solid var(--ink)', borderBottom: '1px solid var(--line)', padding: '22px 0 10px', position: 'relative' }}>
      {/* Running tiny label */}
      <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.35em', color: 'var(--graphite)', textAlign: 'center' }}>
        The Meridian Daily · Vol. MMXXVI · No. {String(profile.currentWeek * 7).padStart(3, '0')}
      </p>

      <h1 style={{
        margin: '4px 0 0',
        fontFamily: 'var(--font-display)', fontWeight: 500,
        fontSize: 'clamp(72px, 8.5vw, 132px)', lineHeight: 0.9,
        letterSpacing: '-0.03em', color: 'var(--ink)', textAlign: 'center',
      }}>
        <span style={{ color: 'var(--claret)' }}>The </span>Programme.
      </h1>

      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginTop: 8, padding: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--graphite)' }}>
        <span>TODAY · <span style={{ color: 'var(--ink)', letterSpacing: '0.22em' }}>{date}</span></span>
        <span style={{ color: 'var(--ochre)' }}>◆</span>
        <span>WEEK <span style={{ color: 'var(--ink)' }}>{weekStr}</span> OF XII</span>
        <span style={{ color: 'var(--ochre)' }}>◆</span>
        <span>{PHASE_LABEL[profile.phase]}</span>
        <span style={{ color: 'var(--ochre)' }}>◆</span>
        <span>DUE <span style={{ color: 'var(--claret)' }}>{String(due).padStart(2, '0')}</span></span>
      </div>
    </header>
  );
}

function LedeColumn({ session, greeting, showGreeting }) {
  const firstName = 'Linh';
  const done = session.stepsCompleted;
  const all = session.steps.length;
  return (
    <article style={{ columnRule: '1px solid var(--line)', paddingRight: 24 }}>
      {showGreeting && (
        <p style={{ margin: '0 0 18px', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--claret)' }}>
          §&nbsp;I &nbsp;◆&nbsp; Today's session &nbsp;◆&nbsp; by the editor
        </p>
      )}

      <h2 style={{
        margin: 0,
        fontFamily: 'var(--font-display)', fontWeight: 400,
        fontSize: 'clamp(40px, 4.5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.02em',
        color: 'var(--ink)',
      }}>
        {session.title}
      </h2>

      <p style={{ marginTop: 16, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.5, color: 'var(--graphite)', maxWidth: '48ch' }}>
        {session.tagline}
      </p>

      {/* Drop-cap body — editor's note */}
      <p style={{ margin: '28px 0 0', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink)' }}>
        <span style={{
          float: 'left',
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 96, lineHeight: 0.85,
          color: 'var(--claret)',
          paddingRight: 10, paddingTop: 4, marginBottom: -8,
        }}>{firstName[0]}</span>
        <span style={{ fontStyle: 'italic', color: 'var(--graphite)' }}>— Editor's note. </span>
        {session.editorsNote}
      </p>

      {/* Steps table */}
      <div style={{ marginTop: 28, borderTop: '2px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--graphite)' }}>THE DAY, IN FIVE BEATS</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>{session.totalMinutes} MIN TOTAL</span>
        </div>
        {session.steps.map((s, i) => {
          const stepNumber = i + 1;
          const isDone = done >= stepNumber;
          const isCurrent = done + 1 === stepNumber;
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)', opacity: isDone ? 0.55 : 1 }}>
              <span style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: isCurrent ? 'var(--claret)' : 'var(--graphite)' }}>
                  {isDone ? '◆' : isCurrent ? '▶' : '○'} {String(stepNumber).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: isDone ? 'var(--sage)' : 'var(--ink)', textDecoration: isDone ? 'line-through' : 'none', textDecorationColor: 'var(--line)' }}>
                  {s.title}
                </span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>
                {s.minutes} MIN
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
        <PrimaryButton>{done === 0 ? "Begin today's session" : `Resume at step ${done + 1} of ${all}`}</PrimaryButton>
        <TextLink>Read the method</TextLink>
      </div>
    </article>
  );
}

function BroadSidebar({ profile, library }) {
  const phase = PHASE_NAME[profile.phase];
  const overallPct = (() => {
    const d = profile.disciplineProgress;
    const tot = DISCIPLINE_ORDER.reduce((a, k) => a + d[k].total, 0);
    const done = DISCIPLINE_ORDER.reduce((a, k) => a + d[k].completed, 0);
    return tot ? Math.round((done / tot) * 100) : 0;
  })();
  const band = profile.currentBand;

  return (
    <aside style={{ borderLeft: '1px solid var(--line)', paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 36 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--graphite)' }}>Also in this week's issue</p>

      {/* § II — Phase */}
      <section>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)' }}>§ II &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>THE PHASE</span></p>
        <h3 style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, lineHeight: 1, color: 'var(--ink)' }}>
          <span style={{ color: 'var(--claret)' }}>{phase.numeral}</span> · {phase.name}<em style={{ color: 'var(--claret)', fontStyle: 'italic' }}>.</em>
        </h3>
        <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, color: 'var(--graphite)', lineHeight: 1.5 }}>{phase.note}</p>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          {[1, 2, 3, 4].map(n => (
            <span key={n} style={{ width: 10, height: 10, borderRadius: '50%', background: n === profile.phase ? 'var(--claret)' : 'transparent', border: '1px solid var(--line)' }} />
          ))}
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>
            WEEK {String(profile.currentWeek).padStart(2, '0')} / XII
          </span>
        </div>
      </section>

      {/* § III — Disciplines (compact) */}
      <section>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)' }}>§ III &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>THE FOUR DISCIPLINES</span></p>
        <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0 }}>
          {DISCIPLINE_ORDER.map((d) => {
            const { completed, total } = profile.disciplineProgress[d];
            const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
            return (
              <li key={d} style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)' }}>{DISCIPLINE_LABELS[d]}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--graphite)' }}>
                    {completed} / {total}
                  </span>
                </div>
                <div style={{ marginTop: 6, height: 1, background: 'var(--line)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: 'var(--claret)' }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* § IV — Band */}
      <section>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)' }}>§ IV &nbsp;—&nbsp; <span style={{ color: 'var(--ink)' }}>YOUR LEVEL</span></p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, color: 'var(--claret)' }}>{band.range[0].toFixed(1)}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--graphite)' }}>– {band.range[1].toFixed(1)}</span>
        </div>
        <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
          TARGET <span style={{ color: 'var(--ink)' }}>{profile.targetBand.toFixed(1)}</span> &nbsp;◆&nbsp; CONFIDENCE <span style={{ color: 'var(--ink)' }}>{band.confidence.toUpperCase()}</span>
        </p>
        {/* Mini ruler */}
        <div style={{ marginTop: 18, position: 'relative', height: 42 }}>
          <div style={{ position: 'absolute', top: 16, left: 0, right: 0, height: 1, background: 'var(--line)' }} />
          {Array.from({ length: 11 }).map((_, i) => {
            const v = 4 + i * 0.5;
            const isMajor = v % 1 === 0;
            const l = ((v - 4) / 5) * 100;
            return <div key={i} style={{ position: 'absolute', top: 12, left: `${l}%`, width: 1, height: isMajor ? 8 : 4, background: 'var(--line)' }} />;
          })}
          {/* current range */}
          <div style={{
            position: 'absolute', top: 13, left: `${((band.range[0] - 4) / 5) * 100}%`,
            width: `${((band.range[1] - band.range[0]) / 5) * 100}%`, height: 6, background: 'var(--claret)',
          }} />
          {/* target */}
          <div style={{ position: 'absolute', top: 6, left: `${((profile.targetBand - 4) / 5) * 100}%`, width: 2, height: 18, background: 'var(--claret)', transform: 'translateX(-1px)' }} />
          <span style={{ position: 'absolute', top: 28, left: `${((profile.targetBand - 4) / 5) * 100}%`, transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)' }}>TARGET</span>
        </div>
      </section>

      {/* Small ad plate — Friday library */}
      <section style={{ border: '1px solid var(--ink)', padding: 18, background: 'var(--bone)' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--claret)' }}>CLASSIFIED ◆ LIVE LIBRARY</p>
        <h4 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.2, color: 'var(--ink)' }}>
          {library.topic}
        </h4>
        <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--ink)' }}>
          {library.label}
        </p>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ marginTop: 12, display: 'inline-flex', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>
          Reserve a seat <span style={{ color: 'var(--claret)' }}>↗</span>
        </a>
      </section>
    </aside>
  );
}

function DashboardBroadsheet({ stateKey = 'mid-phase', showGreeting = true }) {
  const { profile, session, due, library } = useDashboardData(stateKey);
  return (
    <div className="meridian-surface" style={{ minHeight: '100%', position: 'relative' }}>
      <AppNav profile={profile} />
      <div style={{ maxWidth: 1640, margin: '0 auto', padding: '0 40px 80px' }}>
        <BroadMasthead profile={profile} due={due} />

        {/* Greeting ribbon */}
        {showGreeting && (
          <div style={{ padding: '20px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 32, color: 'var(--ink)' }}>
              Good afternoon, {profile.name.split(' ')[0]}.
            </h2>
            <DueStrap count={due} />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 36, marginTop: 28 }}>
          <LedeColumn session={session} showGreeting={showGreeting} />
          <BroadSidebar profile={profile} library={library} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardBroadsheet });
