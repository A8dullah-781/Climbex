import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from '@studio-freight/lenis'
import Navbar      from '../components/Navbar'
import Home        from '../components/Home'
import About       from '../components/About'
import Service     from '../components/Service'
import Sequence    from '../components/Sequence'
import Testimonail from '../components/Testimonail'
import Pricing     from '../components/Pricing'
import Faqs        from '../components/Faqs'
import Contact     from '../components/Contact'
import Footer      from '../components/Footer'
import Work from '../components/Work'

gsap.registerPlugin(CustomEase)
CustomEase.create('tile.drop',  '0.55, 0, 1, 0.45')
CustomEase.create('expo.hard',  '0.16, 1, 0.3, 1')
CustomEase.create('expo.soft',  '0.22, 1, 0.36, 1')

/* ── grid constants — unchanged ── */
const COLS  = 12
const ROWS  = 8
const TOTAL = COLS * ROWS

const ENTRY_DELAYS = Array.from({ length: TOTAL }, (_, i) => {
  const col  = i % COLS
  const row  = Math.floor(i / COLS)
  const wave = (col / COLS + row / ROWS) * 0.45
  const noise = (Math.sin(col * 127.1 + row * 311.7) * 0.5 + 0.5) * 0.2
  return wave + noise
})

const EXIT_DELAYS = Array.from({ length: TOTAL }, (_, i) => {
  const col  = i % COLS
  const row  = Math.floor(i / COLS)
  const wave = ((COLS - 1 - col) / COLS + (ROWS - 1 - row) / ROWS) * 0.5
  const noise = (Math.sin(col * 311.7 + row * 127.1) * 0.5 + 0.5) * 0.15
  return wave + noise
})

const MAX_ENTRY = Math.max(...ENTRY_DELAYS)
const MAX_EXIT  = Math.max(...EXIT_DELAYS)

/* ════════════════════════════════
   LOADER
════════════════════════════════ */
const Loader = ({ onComplete }) => {
  const wrapRef    = useRef(null)
  const gridRef    = useRef(null)
  const lettersRef = useRef([])   // per-letter refs
  const tagRef     = useRef(null)
  const dotRef     = useRef(null)
  const cntRef     = useRef(null)
  const lineRef    = useRef(null)
  const [pct, setPct] = useState(0)

  const LETTERS = ['D','E','V','H','O','L','I','X']

  useEffect(() => {
    const wrap  = wrapRef.current
    const tiles = Array.from(gridRef.current.querySelectorAll('.t'))
    const tl    = gsap.timeline()

    /* ── tile entry — identical to original ── */
    tiles.forEach((tile, i) => {
      const col  = i % COLS
      const row  = Math.floor(i / COLS)
      const dirs = [
        { x:   0, y: -80 },
        { x:   0, y:  80 },
        { x: -80, y:   0 },
        { x:  80, y:   0 },
      ]
      const { x, y } = dirs[(col * 2 + row * 3) % 4]
      gsap.set(tile, { x, y, opacity: 0, scaleY: 1 })
    })
    tiles.forEach((tile, i) => {
      tl.to(tile, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'expo.hard' }, ENTRY_DELAYS[i])
    })

    const ENTRY_END = MAX_ENTRY + 0.5

    /* ── DEVHOLIX: letters drop in one by one with scramble ── */
    const els = lettersRef.current.filter(Boolean)
    gsap.set(els, { y: -60, opacity: 0, rotateX: -90, transformOrigin: '50% 50% -30px' })

    els.forEach((el, i) => {
      tl.to(el, {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.55, ease: 'expo.hard',
      }, ENTRY_END - 0.1 + i * 0.06)

      /* brief glitch flash on each letter after it lands */
      tl.to(el, {
        color: '#D2FF9A', skewX: gsap.utils.random(-8, 8),
        duration: 0.04, ease: 'none', yoyo: true, repeat: 3,
      }, ENTRY_END - 0.1 + i * 0.06 + 0.55)
      tl.to(el, { color: '#fff', skewX: 0, duration: 0.06, ease: 'none' })
    })


    /* ── progress bar ── */
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.8, ease: 'power1.inOut', transformOrigin: 'left center' },
      `<-0.1`
    )

    /* ── counter ── */
    tl.fromTo(cntRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'none' },
      `<`
    )

    const c = { v: 0 }
    tl.to(c, {
      v: 100, duration: 1.8, ease: 'power1.inOut',
      onUpdate() { setPct(Math.round(c.v)) },
    }, `<`)



    tl.to({}, { duration: 0.3 })

    /* ── fade out content ── */
    tl.to([...els, tagRef.current, cntRef.current, dotRef.current, lineRef.current], {
      opacity: 0, y: -10, duration: 0.3, ease: 'power2.in', stagger: 0.02,
    })

    /* ── tile exit — identical to original ── */
    const exitStart = tl.duration()
    tiles.forEach((tile, i) => {
      tl.to(tile, {
        scaleY: 0, opacity: 0,
        duration: 0.35, ease: 'tile.drop',
        transformOrigin: 'center bottom',
      }, exitStart + EXIT_DELAYS[i])
    })

    const exitEnd = exitStart + MAX_EXIT + 0.35
    tl.to(wrap, { opacity: 0, duration: 0.2, ease: 'none' }, exitEnd)
    tl.call(() => {
      wrap.style.display = 'none'
      onComplete?.()
    })
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden' }}>

      {/* ── tile grid — untouched ── */}
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows:    `repeat(${ROWS}, 1fr)`,
        gap: '1px',
      }}>
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const l   = 2 + (col + row) % 4
          return (
            <div key={i} className='t' style={{
              background: `hsl(0,0%,${l}%)`,
              willChange: 'transform, opacity',
            }} />
          )
        })}
      </div>

      {/* ── center content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', gap: 0,
      }}>

        {/* DEVHOLIX — per-letter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.04em', perspective: '600px' }}>
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              ref={el => (lettersRef.current[i] = el)}
              style={{
                display: 'inline-block',
                fontSize: 'clamp(2.4rem, 7vw, 6.5rem)',
                fontWeight: 500,
                color: '#fff',
                fontFamily: 'inherit',
                lineHeight: 1,
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
              {ch}
            </span>
          ))}
        </div>


    

        {/* progress bar */}
        <div style={{
          marginTop: '2.5rem',
          width: 'clamp(120px, 18vw, 220px)',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div ref={lineRef} style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #D2FF9A, rgba(210,255,154,0.4))',
            transformOrigin: 'left center',
            opacity: 0,
          }} />
        </div>
      </div>

      {/* counter */}
      <div ref={cntRef} style={{
        position: 'absolute', bottom: '2rem', right: '2.2rem',
        fontFamily: 'monospace', fontWeight: 100,
        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
        color: '#605F5F',
        lineHeight: 1, letterSpacing: '-0.04em',
        userSelect: 'none', opacity: 0, zIndex: 3,
      }}>
        {String(pct).padStart(3, '0')}
      </div>

      {/* corner brackets — unchanged */}
      {[
        { top: '1.4rem',    left: '1.4rem',    r: 0   },
        { top: '1.4rem',    right: '1.4rem',   r: 90  },
        { bottom: '1.4rem', left: '1.4rem',    r: -90 },
        { bottom: '1.4rem', right: '1.4rem',   r: 180 },
      ].map(({ r, ...s }, i) => (
        <svg key={i} width='18' height='18' viewBox='0 0 18 18'
          style={{ position: 'absolute', opacity: 0.3, zIndex: 4, transform: `rotate(${r}deg)`, ...s }}>
          <path d='M0 18 L0 0 L18 0' stroke='#D2FF9A' strokeWidth='1' fill='none'/>
        </svg>
      ))}

  
    </div>
  )
}

/* ════════════════════════════════
   APP
════════════════════════════════ */
const App = () => {
  const [ready, setReady] = useState(false)
  const startHomeAnim     = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    let rafId
    const raf = time => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    return () => { lenis.destroy(); cancelAnimationFrame(rafId) }
  }, [])

  const handleLoaderDone = () => {
    setReady(true)
    requestAnimationFrame(() => requestAnimationFrame(() => startHomeAnim.current?.()))
  }

  return (
    <>
      <Loader onComplete={handleLoaderDone} />
      <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
        <Navbar />
        <Home    registerStart={fn => { startHomeAnim.current = fn }} />
        <About />
         <Service />
        <Sequence />
       
        <Work/>
        <Pricing />
        <Testimonail />
        <Faqs />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App