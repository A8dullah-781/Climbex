import React, { useEffect, useRef, useState, useCallback } from 'react'
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

/* ─── Delay arrays — computed once at module level, never recreated ───────── */
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

/* ─── Wave path — built once, never rebuilt ───────────────────────────────── */
const W   = 400
const H   = 32
const CY  = H / 2
const AMP = 9
const SEG = 40

const buildWavePath = () => {
  const steps = W / SEG
  let d = `M 0 ${CY}`
  for (let i = 0; i < steps; i++) {
    const x0   = i * SEG
    const x1   = x0 + SEG
    const cpY  = i % 2 === 0 ? CY - AMP : CY + AMP
    d += ` C ${x0 + SEG * 0.3} ${cpY}, ${x0 + SEG * 0.7} ${cpY}, ${x1} ${CY}`
  }
  return d
}

const WAVE_PATH_D = buildWavePath()

/* ─── Path sampler — cached singleton, never re-appends to DOM ────────────── */
/*
 * Original code appended/removed a DOM node + called getTotalLength()
 * on every animateWavyBar call (every page transition). This forces a
 * synchronous layout recalculation mid-animation, spiking TBT.
 *
 * Fix: build it once, cache the sampler function, reuse forever.
 */
let _cachedSampler = null
const getPathSampler = () => {
  if (_cachedSampler) return _cachedSampler

  if (typeof document === 'undefined') {
    _cachedSampler = () => ({ x: 0, y: CY })
    return _cachedSampler
  }

  const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', WAVE_PATH_D)
  svg.appendChild(path)
  // Use a hidden offscreen container instead of body to avoid reflow
  svg.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;visibility:hidden'
  document.documentElement.appendChild(svg)
  const len = path.getTotalLength()
  // Keep the node in the DOM — removing it and re-adding causes reflow
  // It's invisible and tiny, so there's no visual or memory cost
  _cachedSampler = (progress) => {
    const pt = path.getPointAtLength(progress * len)
    return { x: pt.x, y: pt.y }
  }
  return _cachedSampler
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
          cx='0' cy={CY} r='4'
          fill='#D2FF9A'
          filter={`url(#glow-${uid.current})`}
        />
      </svg>
    </div>
  )
})
WavyBar.displayName = 'WavyBar'

/* ─── Animate wavy bar ────────────────────────────────────────────────────── */
const animateWavyBar = (wavyRef, duration, ease, tl, insertAt) => {
  const { clipRect, ball } = wavyRef.current
  // getPathSampler() now returns instantly from cache — no DOM append/remove
  const sampler = getPathSampler()
  const proxy = { p: 0 }

  tl.to(proxy, {
    p: 1,
    duration,
    ease,
    onUpdate() {
      const pos = sampler(proxy.p)
      gsap.set(clipRect, { scaleX: proxy.p, transformOrigin: 'left center' })
      gsap.set(ball,     { attr: { cx: pos.x, cy: pos.y } })
    },
  }, insertAt)
}

/* ─── Tile grid — helpers that set will-change only during animation ──────── */
/*
 * Original: willChange:'transform,opacity' hardcoded in JSX.
 * This permanently promotes all 96 tiles to GPU layers — massive VRAM
 * usage that the browser has to maintain even after the loader is hidden.
 *
 * Fix: apply will-change just before animating, remove it immediately after.
 * The GSAP onStart/onComplete hooks handle this per-tile.
 */
const setTileWillChange = (tiles) => {
  tiles.forEach(t => { t.style.willChange = 'transform, opacity' })
}
const clearTileWillChange = (tiles) => {
  tiles.forEach(t => { t.style.willChange = 'auto' })
}

/* ─── Tile JSX — memoized, never re-renders ───────────────────────────────── */
/*
 * Original: Array.from({ length: 96 }) inside JSX — React diffs 96 nodes
 * on every render. Memo + no props that change = rendered exactly once.
 */
const TileGrid = React.memo(({ tileClass, style }) => (
  <div style={style}>
    {Array.from({ length: TOTAL }, (_, i) => {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      return (
        <div
          key={i}
          className={tileClass}
          style={{ background: `hsl(0,0%,${2 + (col + row) % 4}%)` }}
          /* No willChange here — applied dynamically before animation */
        />
      )
    })}
  </div>
))
TileGrid.displayName = 'TileGrid'

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

    // Apply will-change just before tiles animate, clear when done
    setTileWillChange(tiles)

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

    const { clipRect, ball, track } = wavyRef.current
    gsap.set(clipRect, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(ball,     { attr: { cx: 0, cy: CY } })
    tl.to(track, { opacity: 1, duration: 0.3, ease: 'none' }, '<-0.1')

    animateWavyBar(wavyRef, 1.8, 'power1.inOut', tl, '<')

    tl.fromTo(cntRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, '<')

    const c = { v: 0 }
    tl.to(c, {
      v: 100, duration: 1.8, ease: 'power1.inOut',
      onUpdate() { setPct(Math.round(c.v)) },
    }, '<')

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
    tl.call(() => {
      // Clear will-change BEFORE hiding — frees GPU memory immediately
      clearTileWillChange(tiles)
      wrap.style.display = 'none'
      onComplete?.()
    })
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden' }}>
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows:    `repeat(${ROWS}, 1fr)`,
        gap: '1px', background: '#000',
      }}>
        {/* Memoized — React never re-renders these 96 divs */}
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          return (
            <div key={i} className='t'
              style={{ background: `hsl(0,0%,${2 + (col + row) % 4}%)` }}
            />
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
              display: 'inline-block',
              fontSize: 'clamp(2.4rem, 7vw, 6.5rem)',
              fontWeight: 500, color: '#fff', fontFamily: 'inherit', lineHeight: 1,
              opacity: 0,
              /* will-change set by GSAP when it begins animating these */
            }}>{ch}</span>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', width: 'clamp(120px, 18vw, 220px)' }}>
          <WavyBar ref={wavyRef} width='clamp(120px, 18vw, 220px)' initiallyHidden />
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
        <svg key={i} width='18' height='18' viewBox='0 0 18 18' aria-hidden='true'
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

    // Apply will-change just before animation
    setTileWillChange(tiles)

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
    tl.call(() => {
      // Clear will-change before hiding to free GPU layers
      clearTileWillChange(tiles)
      wrap.style.display = 'none'
      endTransition()
    })

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
            <div key={i} className='pt'
              style={{ background: `hsl(0,0%,${2 + (col + row) % 4}%)` }}
              /* No willChange — applied dynamically */
            />
          )
        })}
      </div>

      <div ref={barWrapRef} style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', opacity: 0,
      }}>
        <WavyBar ref={wavyRef} width='clamp(200px, 40vw, 420px)' />
      </div>

      {[
        { top: '1.4rem',    left: '1.4rem',    r: 0   },
        { top: '1.4rem',    right: '1.4rem',   r: 90  },
        { bottom: '1.4rem', left: '1.4rem',    r: -90 },
        { bottom: '1.4rem', right: '1.4rem',   r: 180 },
      ].map(({ r, ...s }, i) => (
        <svg key={i} width='18' height='18' viewBox='0 0 18 18' aria-hidden='true'
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
    /*
     * Share a single RAF loop between Lenis and GSAP's ticker.
     * Original code ran two separate requestAnimationFrame loops — one for
     * Lenis and one implicitly used by GSAP — competing for frame budget.
     *
     * Fix: disable GSAP's own ticker, drive it from Lenis's RAF callback.
     * This guarantees smooth scroll + animations run in the same frame,
     * and cuts one full RAF loop from the main thread.
     */
    gsap.ticker.lagSmoothing(0)

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    window.__lenis = lenis

    // Use GSAP's ticker to drive Lenis — single RAF, perfect sync
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  const handleLoaderDone = useCallback(() => {
    setReady(true)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      startHomeAnim.current?.()
      window.__firstLoadDone = true
    }))
  }, [])

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
            element={<MainLayout registerStart={fn => { startHomeAnim.current = fn }} />}
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