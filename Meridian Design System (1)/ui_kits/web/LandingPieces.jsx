// LandingPieces.jsx — Nav, BackgroundOrnaments, TrustStrip, SpecimenCard, Polaroid, Postmark.
// Recreations of components in Ielts lerning/frontend/src/features/landing/ and /components/ui/.

const { motion: motionLP } = window.Motion || {};

// ────────────────────────────────────────────────────────────
// Nav — wordmark · nav links · log in + sign up
// Matches Nav.tsx structure.
// ────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Programme', active: true },
  { label: 'Method' },
  { label: 'Stories' },
  { label: 'Journal' },
];

function Nav({ onNav }) {
  const [hover, setHover] = React.useState(null);
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--ivory)', borderBottom: '1px solid transparent' }}>
      <div style={{
        margin: '0 auto', maxWidth: 1540,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', gap: 40,
      }}>
        <Wordmark size={32} />
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', gap: 44 }}>
          {NAV_ITEMS.map((item) => {
            const showBar = item.active || hover === item.label;
            return (
              <a key={item.label} href="#"
                onMouseEnter={() => setHover(item.label)}
                onMouseLeave={() => setHover(null)}
                onClick={(e) => { e.preventDefault(); onNav && onNav(item.label); }}
                style={{ position: 'relative', fontFamily: 'var(--font-body)', fontSize: 18, fontWeight: 500, color: item.active ? 'var(--claret)' : 'var(--ink)', textDecoration: 'none' }}>
                {item.label}
                <span style={{
                  position: 'absolute', left: 0, bottom: -4,
                  height: item.active ? 2 : 1,
                  width: showBar ? '100%' : 0,
                  background: item.active ? 'var(--claret)' : 'var(--ink)',
                  transition: 'width 200ms cubic-bezier(0.22,1,0.36,1)',
                }} />
              </a>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink)', textDecoration: 'none' }}>Log in</a>
          <OutlineButton size="sm">Sign up</OutlineButton>
        </div>
      </div>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────
// BackgroundOrnaments — two drifting radial washes (ochre + claret)
// ────────────────────────────────────────────────────────────
function BackgroundOrnaments() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {motionLP && (
        <>
          <motionLP.div
            style={{
              position: 'absolute', bottom: -128, left: -128,
              width: 480, height: 480,
              borderRadius: '50%',
              opacity: 0.18,
              filter: 'blur(64px)',
              background: 'radial-gradient(circle, #B58A3C 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.08, 1], x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motionLP.div
            style={{
              position: 'absolute', top: -80, right: -128,
              width: 420, height: 420,
              borderRadius: '50%',
              opacity: 0.12,
              filter: 'blur(64px)',
              background: 'radial-gradient(circle, #6B1F1A 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], x: [0, -12, 0], y: [0, 8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TrustStrip — bottom-aligned stats row
// ────────────────────────────────────────────────────────────
const STATS = [
  { label: 'AVG. GAIN', value: '+1.7 BANDS' },
  { label: 'COHORT SIZE', value: '14 CANDIDATES' },
  { label: 'PASS RATE (7.0+)', value: '94%' },
  { label: 'FEATURED IN', value: 'THE TIMES · FT · MONOCLE' },
];

function TrustStrip() {
  return (
    <section style={{ borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
      <div style={{
        margin: '0 auto', maxWidth: 1280,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap',
        padding: '20px 56px',
      }}>
        {STATS.map(({ label, value }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <span aria-hidden="true" style={{ margin: '0 20px', color: 'var(--claret)', fontSize: 10 }}>◆</span>}
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>{label}</span>
              <span style={{ display: 'block', marginTop: 2, fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)' }}>{value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// SpecimenCard — tilt-on-mouse, rotated bone card with scores
// ────────────────────────────────────────────────────────────
const SCORES = [
  { label: 'TASK RESPONSE', score: '8.5' },
  { label: 'COHERENCE', score: '9.0' },
  { label: 'LEXICAL', score: '8.0' },
  { label: 'GRAMMAR', score: '8.5' },
];

function SpecimenCard() {
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setTilt({ rx: Math.max(-6, Math.min(6, -y / 10)), ry: Math.max(-8, Math.min(8, x / 10)) });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div style={{ perspective: 1200 }}>
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: 'relative', width: '100%', maxWidth: 380,
          transform: `rotate(-1.5deg) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          border: '1px solid var(--line)',
          background: 'var(--bone)',
          padding: 32,
          boxShadow: 'var(--shadow-card)',
          transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Ribbon */}
        <div style={{
          position: 'absolute', top: -12, right: -12,
          transform: 'rotate(8deg)',
          background: 'var(--claret)',
          padding: '4px 12px',
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em',
          color: 'var(--ivory)',
          boxShadow: '0 4px 10px -4px rgba(20,18,16,0.4)',
        }}>Intake № 01</div>

        {/* Corner flourish */}
        <svg aria-hidden="true" style={{ position: 'absolute', left: 12, top: 12, opacity: 0.4 }} width="28" height="28" viewBox="0 0 28 28">
          <path d="M2 2 L10 2 M2 2 L2 10 M14 14 Q18 10 22 14 Q18 18 14 14" stroke="var(--claret)" strokeWidth="1" fill="none" />
        </svg>

        <span style={{ marginLeft: 40, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
          SPECIMEN № 004 / WRITING TASK 2
        </span>

        <p style={{ marginTop: 20, fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--ink)' }}>
          "Some believe that the quality of education is more important than its availability…"
        </p>

        <div style={{ margin: '20px 0', borderTop: '1px solid var(--line)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SCORES.map(({ label, score }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)' }}>{score}</span>
            </div>
          ))}
        </div>

        <div style={{ margin: '20px 0', borderTop: '1px solid var(--line)' }} />

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <span style={{ color: 'var(--ochre)', fontSize: 18 }}>◆</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 1, color: 'var(--claret)' }}>Band 8.5</span>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Polaroid — rotated bone frame, duotone photo, claret edition banner
// ────────────────────────────────────────────────────────────
function Polaroid({ src, alt, edition = 'Edition № I', tint = 'claret', rotate = 0, orientation = 'portrait', width = 200 }) {
  const [hover, setHover] = React.useState(false);
  const tintBg = tint === 'sage' ? 'var(--sage)' : 'var(--claret)';
  const aspect = orientation === 'landscape' ? '5/4' : '4/5';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', width,
        transform: `rotate(${hover ? 0 : rotate}deg) scale(${hover ? 1.04 : 1})`,
        transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Backing frame */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--ink-warm)', transform: 'translate(8px, 8px)' }} />
      <figure style={{ position: 'relative', background: '#F2EDE0', padding: '12px 12px 56px', boxShadow: 'var(--shadow-photo)', margin: 0 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: aspect, overflow: 'hidden', background: tintBg }}>
          <img src={src} alt={alt} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', filter: 'grayscale(0.9) sepia(0.3) contrast(1.18) brightness(1.05)' }}
          />
        </div>
        <figcaption style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', background: 'var(--claret)', padding: '8px 22px',
          boxShadow: '0 4px 10px -4px rgba(20,18,16,0.4)',
        }}>
          <span aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute', inset: 4, border: '1px solid rgba(181,138,60,0.6)' }} />
          <span style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--ivory)' }}>{edition}</span>
        </figcaption>
      </figure>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Postmark — circular cohort stamp (over-corner ornament)
// ────────────────────────────────────────────────────────────
function Postmark({ cohort = '04', size = 96, style }) {
  const Wrap = motionLP ? motionLP.div : 'div';
  const anim = motionLP ? {
    animate: { y: [0, -6, 0], rotate: [-8, -5, -8] },
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  } : {};
  return (
    <Wrap
      {...anim}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: '50%',
        border: '2px solid var(--claret)', background: 'rgba(246,241,231,0.7)',
        backdropFilter: 'blur(4px)',
        fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase',
        lineHeight: 1.2, letterSpacing: '0.15em', color: 'var(--claret)',
        opacity: 0.95, boxShadow: '0 1px 2px rgba(20,18,16,0.1)',
        ...style,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        Cohort<br />№ {cohort}<br />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>est.</span><br />
        MMXXIV
      </div>
    </Wrap>
  );
}

Object.assign(window, { Nav, BackgroundOrnaments, TrustStrip, SpecimenCard, Polaroid, Postmark });
