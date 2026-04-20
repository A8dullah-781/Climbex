import React, { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(SplitText, CustomEase)
CustomEase.create('expo.hard', '0.16, 1, 0.3, 1')

/* ── Magnetic hook — unchanged logic, cleaned up ── */
const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r  = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width  / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
    }
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.5)', overwrite: 'auto' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])
  return ref
}

const Home = ({ registerStart }) => {
  const tagRef          = useRef(null)
  const titleRef        = useRef(null)
  const descRef         = useRef(null)
  const btnsRowRef      = useRef(null)
  const cursorRef       = useRef(null)
  const primaryBtnRef   = useMagnetic(0.35)
  const secondaryBtnRef = useMagnetic(0.35)

  /* ─────────────────────────────────────────────
     Cursor: use CSS custom properties + one rAF
     instead of a permanent lerp loop.
     Glow follows via CSS transition (GPU-only).
  ───────────────────────────────────────────── */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mx = -500, my = -500
    let cx = -500, cy = -500
    let rafId = null
    let dirty = false

    const tick = () => {
      cx += (mx - cx) * 0.85
      cy += (my - cy) * 0.85
      cursor.style.transform = `translate3d(${cx - 6}px,${cy - 6}px,0) scale(var(--cs,1))`
      if (Math.abs(mx - cx) > 0.05 || Math.abs(my - cy) > 0.05) {
        rafId = requestAnimationFrame(tick)
      } else {
        dirty = false
        rafId  = null
      }
    }

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      /* also update glow via CSS var — pure GPU */
      document.documentElement.style.setProperty('--gx', `${mx - 200}px`)
      document.documentElement.style.setProperty('--gy', `${my - 200}px`)
      if (!dirty) { dirty = true; rafId = requestAnimationFrame(tick) }
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    /* cursor scale on hover */
    const onE = () => cursor.style.setProperty('--cs', '2.6')
    const onL = () => cursor.style.setProperty('--cs', '1')
    const t = setTimeout(() => {
      document.querySelectorAll('[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onE)
        el.addEventListener('mouseleave', onL)
      })
    }, 300)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      clearTimeout(t)
    }
  }, [])

  /* ── intro timeline ── */
  useEffect(() => {
    const tagEls     = Array.from(tagRef.current.querySelectorAll(':scope > div'))
    const titleSplit = new SplitText(titleRef.current, { type: 'chars' })
    const descSplit  = new SplitText(descRef.current,  { type: 'words' })

    gsap.set(tagEls,             { opacity: 0, y: 20 })
    gsap.set(titleSplit.chars,   { opacity: 0, y: 70, rotateX: -90, transformOrigin: '50% 50% -40px' })
    gsap.set(descSplit.words,    { opacity: 0, y: 13 })
    gsap.set(btnsRowRef.current, { opacity: 0, y: 24 })

    const playIntro = () => {
      const tl = gsap.timeline()

      tl.to(tagEls, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'expo.hard' })

      tl.to(titleSplit.chars, {
        opacity: 1, y: 0, rotateX: 0,
        stagger: { each: 0.05, ease: 'power2.in' },
        duration: 0.5, ease: 'expo.hard',
      }, '-=0.08')

      tl.to(descSplit.words,    { opacity: 1, y: 0, stagger: 0.02, duration: 0.46, ease: 'expo.hard' }, '-=0.2')
      tl.to(btnsRowRef.current, { opacity: 1, y: 0, duration: 0.6,  ease: 'expo.hard' }, '-=0.1')

      /* pulse + noise now handled by CSS — no GSAP tickers */
      tl.call(() => {
        titleRef.current?.classList.add('title-pulse')
      })
    }

    registerStart?.(playIntro)
    return () => { titleSplit.revert(); descSplit.revert() }
  }, [])

  return (
    <>
      {/* ── Global CSS injected once ── */}
      <style>{`
        @keyframes title-pulse {
          0%,100% { text-shadow: 0 0 70px rgba(210,255,154,0.25), 0 0 18px rgba(210,255,154,0.1); }
          50%      { text-shadow: 0 0 30px rgba(210,255,154,0.05), 0 0 6px rgba(210,255,154,0.03); }
        }
        .title-pulse { animation: title-pulse 2.4s ease-in-out infinite; }

        @keyframes noise-flicker {
          0%,100% { opacity: 0.04; }
          33%      { opacity: 0.07; }
          66%      { opacity: 0.03; }
        }
        .noise-layer { animation: noise-flicker 0.4s steps(1) infinite; }

        /* Glow follows CSS vars set by JS — CSS transition is compositor-only */
        .cursor-glow {
          transform: translate3d(var(--gx,-500px), var(--gy,-500px), 0);
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
      `}</style>

      {/* Cursor dot */}
      <div ref={cursorRef} style={{
        position:'fixed', top:0, left:0, width:12, height:12,
        background:'#D2FF9A', borderRadius:'50%',
        pointerEvents:'none', zIndex:9999,
        mixBlendMode:'difference', willChange:'transform',
        transform:'translate3d(-500px,-500px,0)',
      }}/>

      {/* Glow — GPU-only via CSS transition */}
      <div className='cursor-glow' style={{
        position:'fixed', top:0, left:0, width:400, height:400,
        background:'radial-gradient(circle, rgba(210,255,154,0.032) 0%, transparent 70%)',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
      }}/>

      {/* Noise — CSS keyframe, zero JS */}
      <div className='noise-layer' style={{
        position:'fixed', inset:0, pointerEvents:'none', zIndex:10,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'200px 200px', opacity:0.04, mixBlendMode:'overlay',
      }}/>

      {/* Scanlines */}
      <div style={{
        position:'fixed', inset:0, pointerEvents:'none', zIndex:5,
        background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.022) 2px,rgba(0,0,0,0.022) 4px)',
      }}/>

      {/* Main content */}
      <div className='h-screen flex justify-center items-center w-screen px-6'
        style={{ position:'relative', zIndex:20 }}>
        <div className='w-full'>

          <div ref={tagRef}
            className='robo text-[3vw] sm:text-[2vw] lg:mb-0 mb-5 md:text-[1.2vw] lg:text-[1vw] flex flex-row justify-center items-center gap-2 sm:gap-5 flex-wrap'
          >
            <div data-hover className='txtgreen bg-[#D2FF9A]/10 inline py-1 px-4 rounded-3xl'
              style={{ border:'1px solid rgba(210,255,154,0.2)', cursor:'default' }}>
              V1.0 // ARCHITECTURE
            </div>
            <div className='txtdgray hidden sm:block'>---------</div>
            <div className='txtblue' style={{ letterSpacing:'0.1em' }}>EST . 2026</div>
          </div>

          <div ref={titleRef}
            className='font-black fontone text-[18vw] sm:text-[15vw] md:text-[13vw] leading-none tracking-tighter txtwhite text-center'
            style={{ perspective:'800px', userSelect:'none' }}
          >
            DEVHOLIX
          </div>

          <div ref={descRef}
            className='txtgray text-[3.5vw] sm:text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] text-center py-4 px-4'
          >
            We curate digital experiences at the intersection of mathematical{' '}
            <br className='hidden md:block'/>
            precision and artistic rebellion. Elite engineering for the bold.
          </div>

          <div ref={btnsRowRef}
            className='flex justify-center items-center gap-4 sm:gap-8 py-4 robo flex-wrap'
          >
            <div
              ref={primaryBtnRef}
              data-hover
              className='text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[1vw] inline px-6 sm:px-8 py-3 sm:py-4 bg-[#D2FF9A] rounded-full'
              style={{ color:'#000', fontWeight:700, cursor:'pointer', willChange:'transform' }}
            >
              EXPLORE ARCHIVE
            </div>

            <div
              ref={secondaryBtnRef}
              data-hover
              className='text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[1vw] txtwhite inline px-6 sm:px-8 py-3 sm:py-4 border border-[#605F5F] rounded-full'
              style={{ cursor:'pointer', willChange:'transform' }}
            >
              THE PROTOCOL
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home