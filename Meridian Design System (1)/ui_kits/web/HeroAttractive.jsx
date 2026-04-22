// HeroAttractive.jsx — a more attractive, on-brand hero for The Meridian.
//
// Keeps every rule from CLAUDE.md: ivory paper, warm ink, claret used 3–5×,
// italicized one word with the hand-drawn underline, mono figure labels,
// square corners, no gradients. Adds editorial weight:
//   • A full-width masthead rule with running date + issue markers
//   • A larger, asymmetric typographic grid (headline breaks across columns)
//   • A 3-photo polaroid stack with the specimen card nested inside
//   • A drifting feather ornament in the right margin
//   • Chapter-of-contents strip ("I · II · III · IV — The Four Disciplines")
//     doubling as a subtle progress device

const MASTHEAD_ITEMS = [
  { label: 'TODAY', value: 'FRI 17 APR' },
  { label: 'ISSUE', value: '№ 008' },
  { label: 'SECTION', value: 'PROGRAMME GUIDE' },
  { label: 'VOL.', value: 'MMXXVI · II' },
];

const DISCIPLINES = [
  { num: 'I', label: 'Listening' },
  { num: 'II', label: 'Reading' },
  { num: 'III', label: 'Writing', accent: true },
  { num: 'IV', label: 'Speaking' },
];

function MastheadRule() {
  return (
    <div style={{
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
      padding: '10px 0',
    }}>
      <div style={{
        margin: '0 auto', maxWidth: 1540, padding: '0 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32,
        flexWrap: 'wrap',
      }}>
        {MASTHEAD_ITEMS.map((it, i) => (
          <React.Fragment key={it.label}>
            {i > 0 && <span aria-hidden="true" style={{ color: 'var(--ochre)', fontSize: 9 }}>◆</span>}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--graphite)' }}>{it.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--ink)' }}>{it.value}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Ornamental plate — hairline rosette with figure number
function OrnamentPlate({ figure = 'PL. I', size = 96 }) {
  return (
    <div style={{ pointerEvents: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 120 120" style={{ color: 'var(--claret)' }} fill="none" stroke="currentColor">
        <rect x="6" y="6" width="108" height="108" strokeWidth="0.7" opacity="0.5" />
        <rect x="14" y="14" width="92" height="92" strokeWidth="0.5" opacity="0.35" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="60" y1="34" x2="60" y2="86" transform={`rotate(${i * 22.5} 60 60)`} strokeWidth="0.6" opacity="0.35" />
        ))}
        <circle cx="60" cy="60" r="14" strokeWidth="0.7" opacity="0.7" />
        <circle cx="60" cy="60" r="2.4" fill="currentColor" stroke="none" />
      </svg>
      <p style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--graphite)', textAlign: 'center' }}>
        {figure}
      </p>
    </div>
  );
}

// Quill / feather ornament drifting in right margin
function OrnamentFeather({ style }) {
  const { motion } = window.Motion || {};
  const Wrap = motion ? motion.div : 'div';
  const anim = motion ? {
    animate: { y: [0, -8, 0], rotate: [-2, 0, -2] },
    transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
  } : {};
  return (
    <Wrap {...anim} style={{ ...style }}>
      <svg aria-hidden="true" width="96" height="170" viewBox="0 0 160 260" fill="none" stroke="var(--claret)" strokeWidth="0.9" strokeLinecap="round" style={{ opacity: 0.5 }}>
        <path d="M 100 12 C 80 80, 62 150, 40 240" />
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const x1 = 100 - 40 * t;
          const y1 = 12 + 228 * t;
          const len = 22 + (1 - t) * 12;
          const ang = -62 + t * 10;
          const rad = (ang * Math.PI) / 180;
          return <line key={`L-${i}`} x1={x1} y1={y1} x2={x1 + Math.cos(rad) * len} y2={y1 + Math.sin(rad) * len} opacity={0.45 - t * 0.2} />;
        })}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const x1 = 100 - 40 * t;
          const y1 = 12 + 228 * t;
          const len = 20 + (1 - t) * 10;
          const ang = 42 - t * 8;
          const rad = (ang * Math.PI) / 180;
          return <line key={`R-${i}`} x1={x1} y1={y1} x2={x1 + Math.cos(rad) * len} y2={y1 + Math.sin(rad) * len} opacity={0.4 - t * 0.18} />;
        })}
        <path d="M 40 240 L 34 252 L 30 246 Z" fill="var(--claret)" opacity="0.7" stroke="none" />
      </svg>
    </Wrap>
  );
}

// Chapter-of-contents strip — Four Disciplines
function DisciplineStrip() {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      {DISCIPLINES.map((d, i) => {
        const isHover = hover === i;
        const accent = d.accent || isHover;
        return (
          <a key={d.num} href="#"
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            onClick={(e) => e.preventDefault()}
            style={{
              flex: 1, padding: '16px 20px',
              display: 'flex', alignItems: 'baseline', gap: 14,
              borderRight: i < DISCIPLINES.length - 1 ? '1px solid var(--line)' : 'none',
              textDecoration: 'none',
              background: accent ? 'rgba(107,31,26,0.04)' : 'transparent',
              transition: 'background 300ms cubic-bezier(0.22,1,0.36,1)',
            }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 28, lineHeight: 1,
              color: accent ? 'var(--claret)' : 'var(--graphite)',
              transition: 'color 300ms',
            }}>{d.num}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.25em',
              color: accent ? 'var(--ink)' : 'var(--graphite)',
              transition: 'color 300ms',
            }}>{d.label}</span>
            {d.accent && (
              <span style={{
                marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9,
                textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--claret)',
              }}>Begin here ↓</span>
            )}
          </a>
        );
      })}
    </div>
  );
}

// Polaroid-cluster — three rotated photos fanned behind the specimen
function PolaroidStack() {
  return (
    <div style={{ position: 'relative', width: 420, height: 560 }}>
      {/* Back polaroid */}
      <div style={{ position: 'absolute', top: 0, left: 10 }}>
        <Polaroid src="../../assets/edition-01.jpg" alt="Library stacks" edition="Edition № I" tint="claret" rotate={-6} width={180} />
      </div>
      {/* Middle polaroid */}
      <div style={{ position: 'absolute', top: 70, right: 0 }}>
        <Polaroid src="../../assets/edition-03.jpg" alt="Fountain pen" edition="Edition № II" tint="sage" rotate={5} orientation="landscape" width={200} />
      </div>
      {/* Specimen card — front/center */}
      <div style={{ position: 'absolute', bottom: 0, left: 20, right: 20 }}>
        <SpecimenCard />
      </div>
      {/* Postmark pinned top-left of specimen */}
      <div style={{ position: 'absolute', bottom: 440, left: -20, zIndex: 20 }}>
        <Postmark cohort="04" />
      </div>
    </div>
  );
}

function HeroAttractive() {
  return (
    <div style={{ position: 'relative' }}>
      <MastheadRule />

      <section style={{
        position: 'relative',
        margin: '0 auto', width: '100%', maxWidth: 1540,
        padding: '56px 56px 40px',
      }}>
        {/* Floating feather in right gutter */}
        <OrnamentFeather style={{ position: 'absolute', right: 24, top: 80, pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'start', position: 'relative', zIndex: 1 }}>
          {/* LEFT — 7 cols */}
          <div style={{ gridColumn: '1 / span 7' }}>
            <FadeUp delay={0}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 12 }}>
                <OrnamentPlate figure="PL. I" size={84} />
                <div style={{ paddingTop: 14 }}>
                  <FigLabel fig="CH. 00">The programme</FigLabel>
                  <p style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, color: 'var(--graphite)', lineHeight: 1.4, maxWidth: '38ch', margin: '8px 0 0' }}>
                    Being, in brief, an editorial approach to the examination —
                    for candidates who have read the guides and remained stuck.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1 style={{
                marginTop: 28, marginBottom: 0,
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(56px, 6.4vw, 104px)',
                lineHeight: 0.92, letterSpacing: '-0.025em',
                color: 'var(--ink)',
              }}>
                <span style={{ display: 'block' }}>The quiet craft</span>
                <span style={{ display: 'block', paddingLeft: '12%' }}>of scoring</span>
                <span style={{ display: 'block' }}>
                  <UnderlinedItalic>Band&nbsp;9</UnderlinedItalic>,
                </span>
                <span style={{ display: 'block', paddingLeft: '24%', color: 'var(--graphite)', fontStyle: 'italic', fontSize: '0.62em', letterSpacing: '-0.015em' }}>
                  without the noise.
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.32}>
              <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end', maxWidth: 720 }}>
                <div style={{ borderLeft: '2px solid var(--claret)', paddingLeft: 20 }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6, color: 'var(--graphite)' }}>
                    A considered programme for Band 7.5+ candidates.{' '}
                    <span style={{ color: 'var(--ink)' }}>One cohort of fourteen. Twelve weeks. Same-day written feedback.</span>
                  </p>
                </div>
                <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: 20, minWidth: 140 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>Enrolment closes</span>
                  <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ink)' }}>07 May</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--graphite)' }}>
                    nineteen places remain
                  </span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.42}>
              <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
                <PrimaryButton>Begin your assessment</PrimaryButton>
                <TextLink>Read the method</TextLink>
                <TextLink arrow="→">Attend Friday library</TextLink>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — 5 cols, polaroid stack */}
          <div style={{ gridColumn: '8 / span 5', display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
            <FadeUp delay={0.55}>
              <PolaroidStack />
            </FadeUp>
          </div>
        </div>
      </section>

      <FadeUp delay={0.7}>
        <div style={{ margin: '0 auto', maxWidth: 1540, padding: '0 56px', marginTop: 8 }}>
          <DisciplineStrip />
        </div>
      </FadeUp>
    </div>
  );
}

Object.assign(window, { HeroAttractive, MastheadRule, OrnamentPlate, OrnamentFeather, DisciplineStrip });
