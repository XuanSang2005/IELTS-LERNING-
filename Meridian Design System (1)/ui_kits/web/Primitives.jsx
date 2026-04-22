// Primitives.jsx — shared Meridian building blocks
// Every element in this file maps 1:1 to something in
// Ielts lerning/frontend/src/features/landing/ or /components/.

const EASE = [0.22, 1, 0.36, 1];
const { motion } = window.Motion || {};

// FadeUp — the canonical entry animation used across the site.
function FadeUp({ children, delay = 0, className, style }) {
  if (!motion) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// FigLabel — <span class="eyebrow">CH. 00 — <span class="accent">Title</span></span>
function FigLabel({ fig, children, style }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.25em', margin: 0, ...style }}>
      <span style={{ color: 'var(--graphite)' }}>{fig} —</span>{' '}
      <span style={{ color: 'var(--claret)' }}>{children}</span>
    </p>
  );
}

// Claret hand-drawn underline beneath italicized Fraunces word.
function UnderlinedItalic({ children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <em style={{ fontStyle: 'italic', fontWeight: 400 }}>{children}</em>
      <svg
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, right: 0, bottom: -4, width: '100%', height: 10 }}
      >
        <path d="M2,6 Q50,2 100,5 T198,4" stroke="#6B1F1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Wordmark — claret M + ink eridian, eyebrow subtitle.
function Wordmark({ size = 32, subtitle = true }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: size, lineHeight: 1, letterSpacing: '-0.01em' }}>
        <span style={{ color: 'var(--claret)' }}>M</span>
        <span style={{ color: 'var(--ink)' }}>eridian</span>
      </span>
      {subtitle && (
        <span style={{ position: 'absolute', left: 0, top: '100%', marginTop: 4, whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>
          IELTS · EST. MMXXIV
        </span>
      )}
    </div>
  );
}

// PrimaryButton — ink-warm fill, 2px claret bottom rule, arrow nudges on hover.
function PrimaryButton({ children, arrow = true, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        background: hover ? 'var(--ink)' : 'var(--ink-warm)',
        color: 'var(--ivory)',
        padding: '16px 32px',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        textDecoration: 'none',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? 'var(--shadow-hover)' : 'none',
        transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <span>{children}</span>
      {arrow && (
        <span style={{ color: 'var(--claret)', transition: 'transform 300ms', transform: hover ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
      )}
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--claret)' }} />
    </a>
  );
}

// TextLink — "Read the method ↗"
function TextLink({ children, arrow = '↗' }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.preventDefault()}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)' }}
    >
      <span style={{ borderBottom: `1px solid ${hover ? 'var(--ink)' : 'var(--line)'}`, paddingBottom: 2, transition: 'border-color 200ms' }}>{children}</span>
      <span style={{ color: hover ? 'var(--claret)' : 'var(--ink)', transform: hover ? 'translateX(2px)' : 'translateX(0)', transition: 'all 200ms' }}>{arrow}</span>
    </a>
  );
}

// Outline button — "Sign up" in nav
function OutlineButton({ children, size = 'md', onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const pad = size === 'sm' ? '8px 18px' : '12px 24px';
  const fs = size === 'sm' ? 13 : 14;
  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      style={{
        display: 'inline-flex', alignItems: 'center',
        border: '1px solid var(--ink)',
        background: hover ? 'var(--ink)' : 'transparent',
        color: hover ? 'var(--ivory)' : 'var(--ink)',
        padding: pad,
        fontFamily: 'var(--font-body)',
        fontSize: fs,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textDecoration: 'none',
        transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        ...style,
      }}
    >{children}</a>
  );
}

Object.assign(window, { FadeUp, FigLabel, UnderlinedItalic, Wordmark, PrimaryButton, TextLink, OutlineButton, EASE });
