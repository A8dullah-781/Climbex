import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Lenis from '@studio-freight/lenis'

import { TransitionProvider, useTransition } from '../src/context/TransitionContext'
import Scrolltotop from '../components/Scrolltotop'

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
import Work        from '../components/Work'
import Archive     from '../components/Archive'
import BookCall    from '../components/BookCall'

gsap.registerPlugin(CustomEase)
CustomEase.create('tile.drop', '0.55, 0, 1, 0.45')
CustomEase.create('expo.hard', '0.16, 1, 0.3, 1')
CustomEase.create('expo.soft', '0.22, 1, 0.36, 1')

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
   WAVE PATH BUILDER
════════════════════════════════ */
const W   = 400
const H   = 32
const CY  = H / 2
const AMP = 9
const SEG = 40

const buildWavePath = () => {
  const steps = W / SEG
  let d = `M 0 ${CY}`
  for (let i = 0; i < steps; i++) {
    const x0  = i * SEG
    const x1  = x0 + SEG
    const cp1y = i % 2 === 0 ? CY - AMP : CY + AMP
    const cp2y = i % 2 === 0 ? CY - AMP : CY + AMP
    d += ` C ${x0 + SEG * 0.3} ${cp1y}, ${x0 + SEG * 0.7} ${cp2y}, ${x1} ${CY}`
  }
  return d
}

const WAVE_PATH_D = buildWavePath()

const getPathSampler = () => {
  if (typeof document === 'undefined') return () => ({ x: 0, y: CY })
  const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', WAVE_PATH_D)
  svg.appendChild(path)
  document.body.appendChild(svg)
  svg.style.position = 'absolute'
  svg.style.opacity  = '0'
  svg.style.pointerEvents = 'none'
  const len = path.getTotalLength()
  document.body.removeChild(svg)
  return (progress) => {
    const pt = path.getPointAtLength(progress * len)
    return { x: pt.x, y: pt.y }
  }
}

/* ════════════════════════════════
   WAVY BAR COMPONENT
════════════════════════════════ */
const WavyBar = React.forwardRef(({ width = '400px', initiallyHidden = false }, ref) => {
  const uid      = useRef(`wb-${Math.random().toString(36).slice(2)}`)
  const clipRect = useRef(null)
  const trackDiv = useRef(null)
  const ballRef  = useRef(null)

  React.useImperativeHandle(ref, () => ({
    clipRect: clipRect.current,
    track:    trackDiv.current,
    ball:     ballRef.current,
  }))

  return (
    <div
      ref={trackDiv}
      // FIX: hide from first paint when initiallyHidden=true so no flash before GSAP runs
      style={{ width, position: 'relative', lineHeight: 0, opacity: initiallyHidden ? 0 : 1 }}
    >
      <svg
        width='100%'
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio='none'
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <clipPath id={uid.current}>
            <rect
              ref={clipRect}
              x='0' y='0'
              width={W} height={H}
              style={{ transformOrigin: 'left center' }}
            />
          </clipPath>
          <linearGradient id={`grad-${uid.current}`} x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%'   stopColor='#D2FF9A' />
            <stop offset='100%' stopColor='rgba(210,255,154,0.5)' />
          </linearGradient>
          <filter id={`glow-${uid.current}`} x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='2.5' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        <path
          d={WAVE_PATH_D}
          fill='none'
          stroke='rgba(255,255,255,0.1)'
          strokeWidth='1.5'
          strokeLinecap='round'
        />

        <path
          d={WAVE_PATH_D}
          fill='none'
          stroke={`url(#grad-${uid.current})`}
          strokeWidth='2'
          strokeLinecap='round'
          clipPath={`url(#${uid.current})`}
        />

        <circle
          ref={ballRef}
          cx='0'
          cy={CY}
          r='4'
          fill='#D2FF9A'
          filter={`url(#glow-${uid.current})`}
        />
      </svg>
    </div>
  )
})

/* ════════════════════════════════
   ANIMATE WAVY BAR HELPER
════════════════════════════════ */
const animateWavyBar = (wavyRef, duration, ease, tl, insertAt) => {
  const { clipRect, ball } = wavyRef.current
  const sampler = getPathSampler()

  const proxy = { p: 0 }

  tl.to(proxy, {
    p: 1,
    duration,
    ease,
    onUpdate() {
      const t   = proxy.p
      const pos = sampler(t)
      gsap.set(clipRect, { scaleX: t, transformOrigin: 'left center' })
      gsap.set(ball, { attr: { cx: pos.x, cy: pos.y } })
    },
  }, insertAt)
}

/* ════════════════════════════════
   INITIAL LOADER
════════════════════════════════ */
const InitialLoader = ({ onComplete }) => {
  const wrapRef    = useRef(null)
  const gridRef    = useRef(null)
  const lettersRef = useRef([])
  const tagRef     = useRef(null)
  const dotRef     = useRef(null)
  const cntRef     = useRef(null)
  const wavyRef    = useRef(null)
  const [pct, setPct] = useState(0)

  const LETTERS = ['D','E','V','H','O','L','I','X']

  useEffect(() => {
    const wrap  = wrapRef.current
    const tiles = Array.from(gridRef.current.querySelectorAll('.t'))
    const tl    = gsap.timeline()

    tiles.forEach((tile, i) => {
      const col  = i % COLS
      const row  = Math.floor(i / COLS)
      const dirs = [{ x: 0, y: -80 }, { x: 0, y: 80 }, { x: -80, y: 0 }, { x: 80, y: 0 }]
      const { x, y } = dirs[(col * 2 + row * 3) % 4]
      gsap.set(tile, { x, y, opacity: 0, scaleY: 1 })
    })

    tiles.forEach((tile, i) => {
      tl.to(tile, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'expo.hard' }, ENTRY_DELAYS[i])
    })

    const ENTRY_END = MAX_ENTRY + 0.5
    const els = lettersRef.current.filter(Boolean)
    gsap.set(els, { y: -60, opacity: 0, rotateX: -90, transformOrigin: '50% 50% -30px' })

    els.forEach((el, i) => {
      tl.to(el, { y: 0, opacity: 1, rotateX: 0, duration: 0.55, ease: 'expo.hard' },
        ENTRY_END - 0.1 + i * 0.06)
      tl.to(el, { color: '#D2FF9A', skewX: gsap.utils.random(-8, 8), duration: 0.04, ease: 'none', yoyo: true, repeat: 3 },
        ENTRY_END - 0.1 + i * 0.06 + 0.55)
      tl.to(el, { color: '#fff', skewX: 0, duration: 0.06, ease: 'none' })
    })

    // FIX: clipRect and ball reset before fade-in — track is already opacity:0 from inline style
    const { clipRect, ball, track } = wavyRef.current
    gsap.set(clipRect, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(ball,     { attr: { cx: 0, cy: CY } })

    // Now fade the track in (it starts at opacity:0 from the initiallyHidden prop)
    tl.to(track, { opacity: 1, duration: 0.3, ease: 'none' }, `<-0.1`)

    animateWavyBar(wavyRef, 1.8, 'power1.inOut', tl, `<`)

    tl.fromTo(cntRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, `<`)

    const c = { v: 0 }
    tl.to(c, {
      v: 100, duration: 1.8, ease: 'power1.inOut',
      onUpdate() { setPct(Math.round(c.v)) },
    }, `<`)

    tl.to({}, { duration: 0.15 })

    tl.to(track, { opacity: 0, duration: 0.25, ease: 'power2.in' })

    tl.to([...els, tagRef.current, cntRef.current, dotRef.current], {
      opacity: 0, y: -10, duration: 0.3, ease: 'power2.in', stagger: 0.02,
    }, '<0.05')

    const exitStart = tl.duration()
    tiles.forEach((tile, i) => {
      tl.to(tile, {
        scaleY: 0, opacity: 0, duration: 0.35,
        ease: 'tile.drop', transformOrigin: 'center bottom',
      }, exitStart + EXIT_DELAYS[i])
    })

    const exitEnd = exitStart + MAX_EXIT + 0.35
    tl.to(wrap, { opacity: 0, duration: 0.2, ease: 'none' }, exitEnd)
    tl.call(() => { wrap.style.display = 'none'; onComplete?.() })
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden' }}>
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`, gap: '1px',
        background: '#000',
      }}>
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          return (
            <div key={i} className='t' style={{
              background: `hsl(0,0%,${2 + (col + row) % 4}%)`,
              willChange: 'transform, opacity',
            }} />
          )
        })}
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.04em', perspective: '600px' }}>
          {LETTERS.map((ch, i) => (
            <span key={i} ref={el => (lettersRef.current[i] = el)} style={{
              display: 'inline-block', fontSize: 'clamp(2.4rem, 7vw, 6.5rem)',
              fontWeight: 500, color: '#fff', fontFamily: 'inherit', lineHeight: 1,
              opacity: 0, willChange: 'transform, opacity',
            }}>{ch}</span>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', width: 'clamp(120px, 18vw, 220px)' }}>
          {/* FIX: initiallyHidden=true so opacity:0 is set before first paint */}
          <WavyBar ref={wavyRef} width='clamp(120px, 18vw, 220px)' initiallyHidden={true} />
        </div>
      </div>

      <div ref={cntRef} style={{
        position: 'absolute', bottom: '2rem', right: '2.2rem',
        fontFamily: 'monospace', fontWeight: 100,
        fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: '#605F5F',
        lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', opacity: 0, zIndex: 3,
      }}>
        {String(pct).padStart(3, '0')}
      </div>

      {[
        { top: '1.4rem',    left: '1.4rem',    r: 0   },
        { top: '1.4rem',    right: '1.4rem',   r: 90  },
        { bottom: '1.4rem', left: '1.4rem',    r: -90 },
        { bottom: '1.4rem', right: '1.4rem',   r: 180 },
      ].map(({ r, ...s }, i) => (
        <svg key={i} width='18' height='18' viewBox='0 0 18 18'
          style={{ position: 'absolute', opacity: 0.3, zIndex: 4, transform: `rotate(${r}deg)`, ...s }}>
          <path d='M0 18 L0 0 L18 0' stroke='#D2FF9A' strokeWidth='1' fill='none' />
        </svg>
      ))}
    </div>
  )
}

/* ════════════════════════════════
   PAGE TRANSITION
════════════════════════════════ */
const PageTransition = () => {
  const { isTransitioning, onCovered, endTransition } = useTransition()
  const wrapRef       = useRef(null)
  const gridRef       = useRef(null)
  const barWrapRef    = useRef(null)
  const wavyRef       = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
  }, [])

  useEffect(() => {
    if (!isTransitioning) return

    const wrap    = wrapRef.current
    const barWrap = barWrapRef.current
    const tiles   = Array.from(gridRef.current.querySelectorAll('.pt'))
    const tl      = gsap.timeline()

    wrap.style.display    = 'block'
    wrap.style.opacity    = '1'
    barWrap.style.opacity = '0'

    const { clipRect, ball, track } = wavyRef.current
    gsap.set(track,    { opacity: 1 })
    gsap.set(clipRect, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(ball,     { attr: { cx: 0, cy: CY } })

    tiles.forEach((tile, i) => {
      const col  = i % COLS
      const row  = Math.floor(i / COLS)
      const dirs = [{ x: 0, y: -80 }, { x: 0, y: 80 }, { x: -80, y: 0 }, { x: 80, y: 0 }]
      const { x, y } = dirs[(col * 2 + row * 3) % 4]
      gsap.set(tile, { x, y, opacity: 0, scaleY: 1 })
    })

    tiles.forEach((tile, i) => {
      tl.to(tile, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'expo.hard' }, ENTRY_DELAYS[i])
    })

    const coveredAt = MAX_ENTRY + 0.5

    tl.call(() => onCovered(), [], coveredAt)
    tl.to(barWrap, { opacity: 1, duration: 0.2, ease: 'none' }, coveredAt)

    animateWavyBar(wavyRef, 0.5, 'power2.inOut', tl, coveredAt + 0.2)

    tl.to(barWrap, { opacity: 0, duration: 0.2, ease: 'power2.in' })

    const exitStart = tl.duration()
    tiles.forEach((tile, i) => {
      tl.to(tile, {
        scaleY: 0, opacity: 0, duration: 0.3,
        ease: 'tile.drop', transformOrigin: 'center bottom',
      }, exitStart + EXIT_DELAYS[i])
    })

    const exitEnd = exitStart + MAX_EXIT + 0.3
    tl.to(wrap, { opacity: 0, duration: 0.15, ease: 'none' }, exitEnd)
    tl.call(() => { wrap.style.display = 'none'; endTransition() })

  }, [isTransitioning])

  return (
    <div ref={wrapRef} style={{
      display: 'none', position: 'fixed', inset: 0, zIndex: 99998, overflow: 'hidden',
    }}>
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows:    `repeat(${ROWS}, 1fr)`,
        gap: '1px', background: '#000',
      }}>
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          return (
            <div key={i} className='pt' style={{
              background: `hsl(0,0%,${2 + (col + row) % 4}%)`,
              willChange: 'transform, opacity',
            }} />
          )
        })}
      </div>

      <div ref={barWrapRef} style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        opacity: 0,
      }}>
        <WavyBar ref={wavyRef} width='clamp(200px, 40vw, 420px)' />
      </div>

      {[
        { top: '1.4rem',    left: '1.4rem',    r: 0   },
        { top: '1.4rem',    right: '1.4rem',   r: 90  },
        { bottom: '1.4rem', left: '1.4rem',    r: -90 },
        { bottom: '1.4rem', right: '1.4rem',   r: 180 },
      ].map(({ r, ...s }, i) => (
        <svg key={i} width='18' height='18' viewBox='0 0 18 18'
          style={{ position: 'absolute', opacity: 0.3, zIndex: 4, transform: `rotate(${r}deg)`, ...s }}>
          <path d='M0 18 L0 0 L18 0' stroke='#D2FF9A' strokeWidth='1' fill='none' />
        </svg>
      ))}
    </div>
  )
}

/* ════════════════════════════════
   MAIN LAYOUT
════════════════════════════════ */
const MainLayout = ({ registerStart }) => {
  useEffect(() => {
    const target = window.__scrollTarget
    if (!target) return
    window.__scrollTarget = null

    const attempt = (tries = 0) => {
      const el = document.getElementById(target)
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (tries < 10) {
        setTimeout(() => attempt(tries + 1), 100)
      }
    }
    setTimeout(() => attempt(), 300)
  }, [])

  return (
    <>
      <Home registerStart={registerStart} />
      <About />
      <Service />
      <Sequence />
      <Work />
      <Pricing />
      <Archive />
      <Testimonail />
      <Faqs />
    </>
  )
}

/* ════════════════════════════════
   APP INNER
════════════════════════════════ */
const AppInner = () => {
  const [ready, setReady] = useState(false)
  const startHomeAnim     = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    window.__lenis = lenis
    let rafId
    const raf = time => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); window.__lenis = null }
  }, [])

  const handleLoaderDone = () => {
    setReady(true)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      startHomeAnim.current?.()
      window.__firstLoadDone = true
    }))
  }

  return (
    <>
      <InitialLoader onComplete={handleLoaderDone} />
      <PageTransition />
       <Scrolltotop />  
      <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <MainLayout registerStart={fn => { startHomeAnim.current = fn }} />
            }
          />
          <Route path='/book-call' element={<BookCall />} />
          <Route path='/contact'   element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

/* ════════════════════════════════
   APP
════════════════════════════════ */
const App = () => (
  <TransitionProvider>
    <AppInner />
  </TransitionProvider>
)

export default App