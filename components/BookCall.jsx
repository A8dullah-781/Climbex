import React, { useRef, useEffect, useState, useCallback } from 'react'

const GREEN = '#B8FF4F'
const BLUE  = '#9592FF'

/* ─── Styles injected once via a module-level constant (never re-injected) ── */
if (typeof document !== 'undefined' && !document.getElementById('bookcall-styles')) {
  const s = document.createElement('style')
  s.id = 'bookcall-styles'
  s.textContent = `
    @media (prefers-reduced-motion: no-preference) {
      @keyframes maskReveal { from { clip-path:inset(0 100% 0 0) } to { clip-path:inset(0 0% 0 0) } }
      @keyframes fadeLeft   { from { opacity:0; transform:translateX(-18px) } to { opacity:1; transform:translateX(0) } }
      @keyframes fadeRight  { from { opacity:0; transform:translateX(32px)  } to { opacity:1; transform:translateX(0) } }
      @keyframes fadeUp     { from { opacity:0; transform:translateY(20px)  } to { opacity:1; transform:translateY(0) } }
      @keyframes shimmer    { from { transform:translateX(-100%) } to { transform:translateX(300%) } }
      @keyframes ping       { 75%,100% { transform:scale(2); opacity:0 } }
      @keyframes borderBreath { 0%,100%{border-color:#1f1f1f} 50%{border-color:#9592FF28} }
    }
    /* Orbs: CSS-only, transform on compositor, single keyframe definition */
    @keyframes orbDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-28px)} }
    @keyframes orbDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-16px,24px)} }
    @keyframes orbDrift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,-18px)} }
    .bc-orb { position:absolute; border-radius:50%; pointer-events:none; will-change:transform; }
    .bc-orb1 { width:480px;height:480px;top:-12%;left:-6%; background:radial-gradient(circle,${GREEN}0d 0%,transparent 68%); animation:orbDrift1 12s ease-in-out infinite; }
    .bc-orb2 { width:360px;height:360px;top:4%;right:-4%;  background:radial-gradient(circle,${BLUE}12 0%,transparent 68%); animation:orbDrift2 15s ease-in-out infinite; }
    .bc-orb3 { width:260px;height:260px;bottom:6%;left:38%;background:radial-gradient(circle,${BLUE}0b 0%,transparent 68%); animation:orbDrift3 18s ease-in-out infinite; }
    .bc-ping { animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
  `
  document.head.appendChild(s)
}

/* ─── Single shared IntersectionObserver hook ─────────────────────────────── */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reuse a shared observer where possible via a simple registry
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─── Glow Line ───────────────────────────────────────────────────────────── */
const GlowLine = ({ inView, delay = 0, blue = false }) => {
  const color = blue ? BLUE : GREEN
  return (
    <div style={{ height: 1, width: '100%', background: '#222', position: 'relative', overflow: 'hidden', opacity: inView ? 1 : 0, transition: `opacity 0.3s ease ${delay}s` }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, height: '100%',
        background: color,
        boxShadow: `0 0 8px ${color}60`,
        width: inView ? '100%' : '0%',
        transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }} />
    </div>
  )
}

/* ─── Stat Card ───────────────────────────────────────────────────────────── */
const StatCard = ({ value, label, inView, delay, accent = 'green' }) => {
  const color = accent === 'blue' ? BLUE : GREEN
  return (
    <div style={{
      background: '#0d0d0d',
      border: '1px solid #1f1f1f',
      borderRadius: 12,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {inView && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(90deg,transparent,${color}10,transparent)`,
          animation: `shimmer 0.8s ease ${delay}s 1 both`,
        }} />
      )}
      <div className="fontone text-3xl font-black" style={{ color, lineHeight: 1 }}>{value}</div>
      <div className="robo txtgray text-[10px] tracking-[0.25em] uppercase mt-1.5">{label}</div>
    </div>
  )
}

/* ─── Step Row ────────────────────────────────────────────────────────────── */
const StepRow = ({ number, title, desc, inView, delay, blue = false }) => {
  const color = blue ? BLUE : GREEN
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 18,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(-14px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      <div aria-hidden style={{
        flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
        border: `1px solid ${color}40`,
        background: `${color}08`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span className="robo font-bold" style={{ fontSize: 11, color }}>{number}</span>
      </div>
      <div style={{ paddingTop: 4 }}>
        <p className="robo text-sm font-medium text-white tracking-wide" style={{ margin: 0 }}>{title}</p>
        <p className="robo txtgray text-xs leading-relaxed mt-1" style={{ margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

/* ─── Lazy Calendly iframe ────────────────────────────────────────────────── */
/**
 * Only mounts the iframe once the container scrolls into view.
 * This removes Calendly's JS/network cost from the initial page load entirely.
 * A placeholder is shown until then — zero TBT impact on first paint.
 */
const LazyCalendly = ({ inView }) => {
  const [mounted, setMounted] = useState(false)

  // Mount only once inView becomes true
  useEffect(() => {
    if (inView && !mounted) setMounted(true)
  }, [inView, mounted])

  if (!mounted) {
    return (
      <div
        role="presentation"
        style={{
          width: '100%', minHeight: 420, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0a',
        }}
      >
        <span className="robo txtgray text-xs tracking-widest uppercase" style={{ opacity: 0.4 }}>
          Loading scheduler…
        </span>
      </div>
    )
  }

  return (
    <iframe
      src="https://calendly.com/abdullah-devholix/strategy-call?hide_gdpr_banner=1&background_color=0d0d0d&text_color=ffffff&primary_color=b8ff4f"
      width="100%"
      height="420"
      frameBorder="0"
      title="Book a free 30-minute strategy call with Devholix"
      style={{ display: 'block', background: 'transparent' }}
      /* No loading="lazy" needed — we control mounting ourselves */
    />
  )
}

/* ─── Main ────────────────────────────────────────────────────────────────── */
const BookCall = () => {
  const [heroRef,   heroInView]   = useInView(0.05)
  const [leftRef,   leftInView]   = useInView(0.08)
  const [rightRef,  rightInView]  = useInView(0.08)
  const [bottomRef, bottomInView] = useInView(0.1)

  return (
    /**
     * SEO / accessibility:
     * - <section> with aria-labelledby ties the landmark to the visible heading
     * - itemScope + itemType for Google's rich results (Service)
     * - The <h2> is used here (not h1) because this is a section within a page
     *   that already has an h1 hero. Change to h1 if this is the only heading.
     */
    <section
      id="book-call"
      aria-labelledby="book-call-heading"
      itemScope
      itemType="https://schema.org/Service"
      className="w-full min-h-screen flex flex-col justify-center py-20 md:py-28 relative"
      style={{ paddingLeft: '7.5vw', paddingRight: '7.5vw' }}
    >

      {/* ── Ambient orbs — pure CSS, no JS, composited layer per orb ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="bc-orb bc-orb1" />
        <div className="bc-orb bc-orb2" />
        <div className="bc-orb bc-orb3" />
      </div>

      {/* Dot grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle,#ffffff06 1px,transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ marginBottom: '3.5rem', position: 'relative', zIndex: 1 }}>

        <p className="robo text-[10px] pt-10 md:pt-0 uppercase" style={{
          color: BLUE, letterSpacing: '0.4em', marginBottom: 20,
          opacity: heroInView ? 1 : 0,
          animation: heroInView ? 'fadeLeft 0.55s ease 0.05s both' : 'none',
        }}>
          Schedule A Session
        </p>

        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          {/*
            SEO: id for aria-labelledby, itemProp for schema.
            Use h1 if this is the page's primary heading, h2 if below another heading.
          */}
          <h2
            id="book-call-heading"
            itemProp="name"
            className="fontone uppercase font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem,5.5vw,6rem)', margin: 0 }}
          >
            <span style={{
              display: 'block',
              opacity: heroInView ? 1 : 0,
              animation: heroInView ? 'maskReveal 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s both' : 'none',
            }}>
              Book A
            </span>
            <span style={{
              display: 'block', color: GREEN,
              opacity: heroInView ? 1 : 0,
              animation: heroInView ? 'maskReveal 0.75s cubic-bezier(0.16,1,0.3,1) 0.32s both' : 'none',
            }}>
              Free Call.
            </span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <GlowLine inView={heroInView} delay={0.5} />
          <GlowLine inView={heroInView} delay={0.65} blue />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start" style={{ position: 'relative', zIndex: 1 }}>

        {/* Left */}
        <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* SEO: itemProp description for schema.org/Service */}
          <p
            itemProp="description"
            className="robo txtgray text-sm md:text-base leading-relaxed"
            style={{
              maxWidth: 340,
              opacity: leftInView ? 1 : 0,
              animation: leftInView ? 'fadeLeft 0.55s ease 0.1s both' : 'none',
            }}
          >
            30 minutes. No pitch, no pressure. We'll look at your current site,
            identify gaps, and map out exactly what needs to happen.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <StatCard value="30 min" label="Session length"    inView={leftInView} delay={0.14} accent="green" />
            <StatCard value="Free"   label="No cost, no catch" inView={leftInView} delay={0.21} accent="blue"  />
            <StatCard value="24h"    label="Response window"   inView={leftInView} delay={0.28} accent="blue"  />
            <StatCard value="UK/US"  label="Timezone friendly" inView={leftInView} delay={0.35} accent="green" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="robo text-[10px] tracking-[0.3em] uppercase" style={{
              color: BLUE, margin: 0,
              opacity: leftInView ? 1 : 0,
              transition: `opacity 0.45s ease 0.4s`,
            }}>
              What happens on the call
            </p>
            {/* SEO: ordered steps help Google parse structured process content */}
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li><StepRow number="01" title="We audit your current site"       desc="Speed, design, conversion — we look at everything honestly."  inView={leftInView} delay={0.46} /></li>
              <li><StepRow number="02" title="We define what you actually need" desc="No upselling. Just the right scope for your goals."           inView={leftInView} delay={0.54} blue /></li>
              <li><StepRow number="03" title="You get a clear next step"        desc="Whether you hire us or not, you leave with clarity."          inView={leftInView} delay={0.62} /></li>
            </ol>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            opacity: leftInView ? 1 : 0,
            animation: leftInView ? 'fadeUp 0.45s ease 0.7s both' : 'none',
          }}>
            {/* Ping dot — CSS-only, no Tailwind animate-ping (avoids runtime class) */}
            <span aria-hidden="true" style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <span className="bc-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: GREEN, opacity: 0.55 }} />
              <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: GREEN, display: 'block' }} />
            </span>
            <span className="robo txtgray text-[10px] uppercase tracking-[0.2em]">Slots open this week</span>
            <span className="robo text-[9px]" style={{
              color: BLUE, border: `1px solid ${BLUE}28`, background: `${BLUE}09`,
              padding: '2px 10px', borderRadius: 99, letterSpacing: '0.15em',
            }}>FREE</span>
          </div>
        </div>

        {/* Right — Calendly (lazy-mounted) */}
        <div ref={rightRef} style={{
          opacity: rightInView ? 1 : 0,
          animation: rightInView ? 'fadeRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both' : 'none',
        }}>
          <div style={{
            position: 'relative', borderRadius: 16,
            border: '1px solid #1f1f1f', background: '#0d0d0d', overflow: 'hidden',
            animation: rightInView ? 'borderBreath 6s ease-in-out 1s infinite' : 'none',
          }}>
            {/* Corner glows */}
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, borderRadius: '0 0 0 70px', background: `radial-gradient(circle at top right,${GREEN}0c,transparent 70%)`, pointerEvents: 'none', zIndex: 1 }} />
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 56, height: 56, borderRadius: '0 0 0 50px', background: `radial-gradient(circle at top right,${BLUE}14,transparent 70%)`, pointerEvents: 'none', zIndex: 1 }} />
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 38, height: 38, borderRight: `1.5px solid ${GREEN}50`, borderTop: `1.5px solid ${GREEN}50`, borderRadius: '0 16px 0 0', pointerEvents: 'none', zIndex: 2 }} />

            {/* Header */}
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div aria-hidden="true" style={{ width: 32, height: 32, borderRadius: 8, background: `${GREEN}10`, border: `1px solid ${GREEN}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  {/* itemProp for schema.org/Service */}
                  <p className="robo text-xs font-medium text-white tracking-wide" style={{ margin: 0 }} itemProp="offers">30 min — Strategy Call</p>
                  <p className="robo text-[10px] tracking-widest uppercase" style={{ color: `${BLUE}88`, margin: 0 }} itemProp="provider">Abdullah · Devholix</p>
                </div>
              </div>
              <div role="status" aria-label="Booking available" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, border: `1px solid ${BLUE}28`, background: `${BLUE}08` }}>
                <span aria-hidden="true" style={{ position: 'relative', display: 'flex', width: 6, height: 6 }}>
                  <span className="bc-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: BLUE, opacity: 0.65 }} />
                  <span style={{ position: 'relative', width: 6, height: 6, borderRadius: '50%', background: BLUE, display: 'block' }} />
                </span>
                <span className="robo text-[9px] tracking-[0.25em] uppercase" style={{ color: BLUE }}>Live</span>
              </div>
            </header>

            {/* Lazy iframe — only mounts when section scrolls into view */}
            <LazyCalendly inView={rightInView} />

            {/* Footer */}
            <footer style={{ padding: '10px 22px', borderTop: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="robo txtgray text-[10px] tracking-[0.2em] uppercase">Powered by Calendly</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <span className="robo txtgray text-[10px] tracking-[0.2em] uppercase">Encrypted</span>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* ── Bottom ── */}
      <div ref={bottomRef} style={{ marginTop: '4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <GlowLine inView={bottomInView} delay={0.1} blue />
          <GlowLine inView={bottomInView} delay={0.25} />
        </div>
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="robo txtgray text-xs tracking-[0.2em] uppercase" style={{
            margin: 0,
            opacity: bottomInView ? 1 : 0,
            transition: 'opacity 0.5s ease 0.3s',
          }}>
            Prefer email?{' '}
            <a
              href="mailto:abdullah@devholix.com"
              style={{ color: GREEN }}
              className="hover:underline transition-colors duration-200"
              aria-label="Send email to Abdullah at Devholix"
            >
              abdullah@devholix.com
            </a>
          </p>
          <p className="robo txtgray text-xs tracking-[0.2em] uppercase" style={{
            margin: 0,
            opacity: bottomInView ? 1 : 0,
            transition: 'opacity 0.5s ease 0.42s',
          }}>
            <span style={{ color: `${BLUE}88` }}>No spam</span>
            {' · '}
            <span style={{ color: `${BLUE}88` }}>No pressure</span>
            {' · '}
            <span style={{ color: `${GREEN}88` }}>100% free</span>
          </p>
        </div>
      </div>

    </section>
  )
}

export default BookCall