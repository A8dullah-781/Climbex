import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(SplitText, CustomEase)
CustomEase.create('expo.hard', '0.16, 1, 0.3, 1')

const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength,
        duration: 0.3, ease: 'power2.out', overwrite: 'auto',
      })
    }
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)', overwrite: 'auto' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const Home = ({ registerStart }) => {
  const tagRef          = useRef(null)
  const titleRef        = useRef(null)
  const descRef         = useRef(null)
  const btnsRowRef      = useRef(null)
  const cursorRef       = useRef(null)
  const primaryBtnRef   = useMagnetic(0.3)
  const secondaryBtnRef = useMagnetic(0.3)

  /* ── cursor (rAF only when moving) ── */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    let mx = -500, my = -500, cx = -500, cy = -500
    let rafId = null, moving = false

    const tick = () => {
      cx += (mx - cx) * 0.18
      cy += (my - cy) * 0.18
      cursor.style.transform = `translate3d(${cx - 6}px,${cy - 6}px,0)`
      if (Math.abs(mx - cx) > 0.1 || Math.abs(my - cy) > 0.1) {
        rafId = requestAnimationFrame(tick)
      } else {
        moving = false
        rafId = null
      }
    }

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (!moving) { moving = true; rafId = requestAnimationFrame(tick) }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── intro ── */
  useEffect(() => {
    const tagEls     = Array.from(tagRef.current.querySelectorAll(':scope > div'))
    const titleSplit = new SplitText(titleRef.current, { type: 'chars' })
    const descSplit  = new SplitText(descRef.current,  { type: 'words' })

    gsap.set(tagEls,             { opacity: 0, y: 20 })
    gsap.set(titleSplit.chars,   { opacity: 0, y: 60, rotateX: -80, transformOrigin: '50% 50% -40px' })
    gsap.set(descSplit.words,    { opacity: 0, y: 12 })
    gsap.set(btnsRowRef.current, { opacity: 0, y: 20 })

    const playIntro = () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.hard' } })
      tl.to(tagEls,             { opacity: 1, y: 0, stagger: 0.08, duration: 0.55 })
        .to(titleSplit.chars,   { opacity: 1, y: 0, rotateX: 0, stagger: 0.04, duration: 0.5 }, '-=0.1')
        .to(descSplit.words,    { opacity: 1, y: 0, stagger: 0.02, duration: 0.4 }, '-=0.15')
        .to(btnsRowRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1')
    }

    registerStart?.(playIntro)
    return () => { titleSplit.revert(); descSplit.revert() }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div
        ref={cursorRef}
        className='hidden lg:block fixed top-0 left-0 w-3 h-3 bg-[#D2FF9A] rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform'
        style={{ transform: 'translate3d(-500px,-500px,0)' }}
      />

      {/* Noise overlay */}
      <div
        className='fixed inset-0 pointer-events-none z-10 opacity-[0.04] mix-blend-overlay animate-[noise_0.4s_steps(1)_infinite]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Scanlines */}
      <div
        className='fixed inset-0 pointer-events-none z-[5]'
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.022) 2px,rgba(0,0,0,0.022) 4px)' }}
      />

      {/* Content */}
      <div className='relative z-20 h-screen w-screen flex justify-center items-center px-6'>
        <div className='w-full'>

          <div ref={tagRef} className='robo text-[3vw] sm:text-[2vw] md:text-[1.2vw] lg:text-[1vw] flex flex-row justify-center items-center gap-2 sm:gap-5 flex-wrap mb-5 lg:mb-0'>
            <div data-hover className='txtgreen bg-[#D2FF9A]/10 py-1 px-4 rounded-3xl border border-[#D2FF9A]/20 cursor-default'>
              V1.0 // ARCHITECTURE
            </div>
            <div className='txtdgray hidden sm:block'>---------</div>
            <div className='txtblue tracking-[0.1em]'>EST . 2026</div>
          </div>

          <div
            ref={titleRef}
            className='font-black fontone text-[18vw] sm:text-[15vw] md:text-[13vw] leading-none tracking-tighter txtwhite text-center select-none'
            style={{ perspective: '800px' }}
          >
            DEVHOLIX
          </div>

          <div ref={descRef} className='txtgray text-[3.5vw] sm:text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] text-center py-4 px-4'>
            We curate digital experiences at the intersection of mathematical{' '}
            <br className='hidden md:block' />
            precision and artistic rebellion. Elite engineering for the bold.
          </div>

          <div ref={btnsRowRef} className='flex justify-center items-center gap-4 sm:gap-8 py-4 robo flex-wrap'>
            <div
              ref={primaryBtnRef}
              data-hover
              onClick={() => scrollTo('archive')}
              className='text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[1vw] px-6 sm:px-8 py-3 sm:py-4 bg-[#D2FF9A] rounded-full font-bold cursor-pointer will-change-transform'
              style={{ color: '#000' }}
            >
              EXPLORE ARCHIVE
            </div>
            <div
              ref={secondaryBtnRef}
              data-hover
              onClick={() => scrollTo('pricing')}
              className='text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[1vw] txtwhite px-6 sm:px-8 py-3 sm:py-4 border border-[#605F5F] rounded-full cursor-pointer will-change-transform'
            >
              SEE PRICING
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home