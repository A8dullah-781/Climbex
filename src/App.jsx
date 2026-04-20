import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from '@studio-freight/lenis'
import Navbar from '../components/Navbar'   
import Home from '../components/Home'   // ← adjust to your path
import About from '../components/About' 
import Service from '../components/Service' 
import Sequence from '../components/Sequence' 
import Testimonail from '../components/Testimonail' 
import Pricing from '../components/Pricing' 
import Faqs from '../components/Faqs' 
import Contact from '../components/Contact' 
import Footer from '../components/Footer' 
const sec = bg => ({
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: bg, color: '#fff', fontFamily: 'monospace', fontSize: '4vw', letterSpacing: '0.3em',
})

gsap.registerPlugin(CustomEase)
CustomEase.create('tile.drop', '0.55, 0, 1, 0.45')
CustomEase.create('expo.hard', '0.16, 1, 0.3, 1')

const COLS = 12
const ROWS = 8
const TOTAL = COLS * ROWS

const ENTRY_DELAYS = Array.from({ length: TOTAL }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const wave = (col / COLS + row / ROWS) * 0.45
  const noise = (Math.sin(col * 127.1 + row * 311.7) * 0.5 + 0.5) * 0.2
  return wave + noise
})

const EXIT_DELAYS = Array.from({ length: TOTAL }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const wave = ((COLS - 1 - col) / COLS + (ROWS - 1 - row) / ROWS) * 0.5
  const noise = (Math.sin(col * 311.7 + row * 127.1) * 0.5 + 0.5) * 0.15
  return wave + noise
})

const MAX_ENTRY = Math.max(...ENTRY_DELAYS)
const MAX_EXIT  = Math.max(...EXIT_DELAYS)

/* ═══════════════════════
   LOADER
═══════════════════════ */
const Loader = ({ onComplete }) => {
  const wrapRef = useRef(null)
  const gridRef = useRef(null)
  const logoRef = useRef(null)
  const tagRef  = useRef(null)
  const dotRef  = useRef(null)
  const cntRef  = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const wrap  = wrapRef.current
    const tiles = Array.from(gridRef.current.querySelectorAll('.t'))
    const tl    = gsap.timeline()

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
      tl.to(tile, {
        x: 0, y: 0, opacity: 1,
        duration: 0.5,
        ease: 'expo.hard',
      }, ENTRY_DELAYS[i])
    })

    const ENTRY_END = MAX_ENTRY + 0.5

    tl.fromTo(logoRef.current,
      { opacity: 0, letterSpacing: '1.4em' },
      { opacity: 1, letterSpacing: '0.6em', duration: 1.0, ease: 'expo.hard' },
      ENTRY_END - 0.3
    )
    tl.fromTo(tagRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'expo.hard' },
      `<+0.35`
    )
    tl.fromTo(cntRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'none' },
      `<`
    )

    const c = { v: 0 }
    tl.to(c, {
      v: 100, duration: 1.8, ease: 'power1.inOut',
      onUpdate() { setPct(Math.round(c.v)) },
    }, `<+0.1`)

    const breathTween = gsap.to(logoRef.current, {
      opacity: 0.5, duration: 1.3,
      yoyo: true, repeat: -1, ease: 'sine.inOut',
      delay: ENTRY_END,
    })
    const dotTween = gsap.to(dotRef.current, {
      scale: 1.7, opacity: 0.25, duration: 0.65,
      yoyo: true, repeat: -1, ease: 'sine.inOut',
      delay: ENTRY_END + 0.15,
      transformOrigin: 'center',
    })

    tl.to({}, { duration: 0.35 })

    tl.call(() => {
      breathTween.kill()
      dotTween.kill()
    })
    tl.to([logoRef.current, tagRef.current, cntRef.current, dotRef.current], {
      opacity: 0, duration: 0.25, ease: 'none', stagger: 0.03,
    })

    const exitStart = tl.duration()
    tiles.forEach((tile, i) => {
      tl.to(tile, {
        scaleY: 0, opacity: 0,
        duration: 0.35,
        ease: 'tile.drop',
        transformOrigin: 'center bottom',
      }, exitStart + EXIT_DELAYS[i])
    })

    // Fade out wrapper, then call onComplete — home animates directly
    const exitEnd = exitStart + MAX_EXIT + 0.35
    tl.to(wrap, { opacity: 0, duration: 0.25, ease: 'none' }, exitEnd)
    tl.call(() => {
      wrap.style.display = 'none'
      onComplete?.()
    })

  }, [])

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden',
    }}>

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
            <div key={i} className="t" style={{
              background: `hsl(0,0%,${l}%)`,
              willChange: 'transform, opacity',
            }} />
          )
        })}
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 2, gap: 0,
      }}>
        <div ref={logoRef} style={{
          fontSize: 'clamp(1.2rem, 4vw, 3.6rem)',
          fontWeight: 100,
          letterSpacing: '0.6em',
          textIndent: '0.6em',
          color: '#fff',
          fontFamily: 'inherit',
          lineHeight: 1,
          opacity: 0,
          mixBlendMode: 'difference',
        }}>
          DEVHOLIX
        </div>

        <div ref={dotRef} style={{
          width: 4, height: 4, borderRadius: '50%',
          background: '#D2FF9A', marginTop: '1.6rem',
        }} />

        <div ref={tagRef} style={{
          marginTop: '1rem',
          fontSize: '0.5rem',
          fontFamily: 'monospace',
          color: 'rgba(210,255,154,0.35)',
          letterSpacing: '0.28em',
          textIndent: '0.28em',
          opacity: 0,
        }}>
          ELITE ENGINEERING FOR THE BOLD
        </div>
      </div>

      <div ref={cntRef} style={{
        position: 'absolute', bottom: '2rem', right: '2.2rem',
        fontFamily: 'monospace', fontWeight: 100,
        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
        color: 'rgba(255,255,255,0.055)',
        lineHeight: 1, letterSpacing: '-0.04em',
        userSelect: 'none', opacity: 0, zIndex: 3,
      }}>
        {String(pct).padStart(3, '0')}
      </div>

      {[
        { top: '1.4rem',    left: '1.4rem',    r: 0   },
        { top: '1.4rem',    right: '1.4rem',   r: 90  },
        { bottom: '1.4rem', left: '1.4rem',    r: -90 },
        { bottom: '1.4rem', right: '1.4rem',   r: 180 },
      ].map(({ r, ...s }, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18"
          style={{ position: 'absolute', opacity: 0.3, zIndex: 4,
            transform: `rotate(${r}deg)`, ...s }}>
          <path d="M0 18 L0 0 L18 0" stroke="#D2FF9A" strokeWidth="1" fill="none"/>
        </svg>
      ))}
    </div>
  )
}

/* ═══════════════════════
   APP
═══════════════════════ */
const App = () => {
  const [ready, setReady]  = useState(false)
  const startHomeAnim      = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    const raf = time => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  const handleLoaderDone = () => {
    setReady(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startHomeAnim.current?.()
      })
    })
  }

  return (
    <>
      <Loader onComplete={handleLoaderDone} />

      <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
        <Navbar/>
        <Home    registerStart={fn => { startHomeAnim.current = fn }} />
        <About/>
        <Service/>
        <Sequence/>
        <Testimonail/>
        <Pricing/>
        <Faqs/>
        <Contact/>
        <Footer/>
      </div>
    </>
  )
}

export default App