// HeroOriginal.jsx — faithful recreation of the codebase hero
// (Ielts lerning/frontend/src/features/landing/components/Hero.tsx)

function HeroOriginal() {
  return (
    <section style={{
      margin: '0 auto', width: '100%', maxWidth: 1720,
      display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'center',
      gap: 24, padding: '40px 56px 32px',
      flex: 1,
    }}>
      {/* Left column — text (cols 1-7) */}
      <div style={{ gridColumn: '1 / span 7' }}>
        <FadeUp delay={0}>
          <FigLabel fig="FIG. 01">IELTS preparation, refined</FigLabel>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h1 style={{
            marginTop: 20,
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(40px, 5.4vw, 80px)',
            lineHeight: 0.98, letterSpacing: '-0.02em',
            color: 'var(--ink)',
            wordBreak: 'keep-all', hyphens: 'none',
          }}>
            <span style={{ display: 'block' }}>The quiet craft of</span>
            <span style={{ display: 'block' }}>
              scoring <UnderlinedItalic>Band 9</UnderlinedItalic>,
            </span>
            <span style={{ display: 'block' }}>without the noise.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p style={{
            marginTop: 24, maxWidth: '42ch',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 1.1vw, 18px)',
            lineHeight: 1.65,
            color: 'var(--graphite)',
          }}>
            A considered programme for Band 7.5+ candidates.{' '}
            <span style={{ color: 'var(--ink)' }}>One cohort. Twelve weeks.</span>
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
            <PrimaryButton>Begin your assessment</PrimaryButton>
            <TextLink>Read the method</TextLink>
          </div>
        </FadeUp>

        <FadeUp delay={0.48}>
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 24 }}>
            <Polaroid
              src="../../assets/edition-02.jpg"
              alt="Fountain pen on handwritten notes"
              edition="PL. II — Writing"
              tint="claret"
              rotate={-3}
              orientation="landscape"
              width={150}
            />
            <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: 24 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--graphite)' }}>Available from</span>
              <span style={{ display: 'block', marginTop: 4, fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)' }}>07 May 2026</span>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Right column — specimen cluster (cols 8-12) */}
      <div style={{ gridColumn: '8 / span 5' }}>
        <div style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          paddingTop: 80, paddingLeft: 48,
          marginLeft: 'auto',
        }}>
          {/* Editorial background photo — books */}
          <div style={{
            position: 'absolute', right: -40, top: -24, zIndex: -1,
            width: 180, height: 240,
            overflow: 'hidden', border: '1px solid var(--line)',
            boxShadow: '0 30px 60px -20px rgba(20,18,16,0.35)',
            transform: 'rotate(4deg)',
          }}>
            <img
              src="../../assets/edition-01.jpg"
              alt="Vintage leather-bound books"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.2) sepia(0.2)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(107,31,26,0.1)', mixBlendMode: 'multiply' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <FadeUp delay={0.5}>
              <div style={{ position: 'absolute', left: -40, top: -40, zIndex: 20 }}>
                <Postmark cohort="04" />
              </div>
            </FadeUp>

            <FadeUp delay={0.55}>
              <SpecimenCard />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroOriginal });
