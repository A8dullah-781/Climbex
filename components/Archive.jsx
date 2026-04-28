import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

const PROJECTS = [
  {
    id: 2,
    title: 'LINEA',
    sub: 'Interior Studio',
    buildId: '#LN-0114-AR',
    img: '/images/linea.PNG',
    index: '02 / 03',
    url: 'https://linea-architects.vercel.app/',
  },
  {
    id: 1,
    title: 'VOID',
    sub: 'Interior Studio',
    buildId: '#V-004-B2',
    img: '/images/void.PNG',
    index: '01 / 03',
    url: 'https://studio-void.vercel.app/',
  },
  {
    id: 3,
    title: 'CHAPTER ONE',
    sub: 'Café & Community',
    buildId: '#CH-0226-CO',
    img: '/images/cafe.PNG',
    index: '03 / 03',
    url: 'https://a8dullah-chapter-one.vercel.app/',
  },
]

/* ─── useIsMobile ──────────────────────────────────────────────────────── */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

/* ─── Card (desktop) ───────────────────────────────────────────────────── */
const Card = React.memo(({ project, didDrag }) => {
  const cardRef = useRef(null)
  const imgRef  = useRef(null)
  const ctaRef  = useRef(null)

  const enter = useCallback(() => {
    const c = cardRef.current; if (!c) return
    c.style.transform   = 'translateY(-8px) scale(1.016)'
    c.style.borderColor = 'rgba(184,255,79,0.22)'
    const img = imgRef.current
    if (img) { img.style.transform = 'scale(1)'; img.style.filter = 'grayscale(.2) contrast(1.05) brightness(.68)' }
    const cta = ctaRef.current
    if (cta) { cta.style.opacity = '1'; cta.style.transform = 'translateX(0)' }
  }, [])

  const leave = useCallback(() => {
    const c = cardRef.current; if (!c) return
    c.style.transform   = 'translateY(0) scale(1)'
    c.style.borderColor = 'rgba(255,255,255,0.07)'
    const img = imgRef.current
    if (img) { img.style.transform = 'scale(1.07)'; img.style.filter = 'grayscale(1) contrast(1.08) brightness(.5)' }
    const cta = ctaRef.current
    if (cta) { cta.style.opacity = '0'; cta.style.transform = 'translateX(10px)' }
  }, [])

  return (
    <article
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className='relative w-[60vw] flex-none rounded-2xl overflow-hidden will-change-transform'
      style={{
        height: 'clamp(290px, 52vh, 600px)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform .45s cubic-bezier(.25,.46,.45,.94), border-color .4s ease',
      }}
    >
      <img
        ref={imgRef}
        src={project.img}
        alt={project.title}
        draggable={false}
        loading='lazy'
        decoding='async'
        className='absolute inset-0 w-full h-full object-cover pointer-events-none block'
        style={{
          filter: 'grayscale(1) contrast(1.08) brightness(.5)',
          transform: 'scale(1.07)',
          willChange: 'transform, filter',
          transition: 'transform .7s cubic-bezier(.25,.46,.45,.94), filter .6s ease',
        }}
      />
      <div
        className='absolute inset-0 pointer-events-none'
        style={{ background: 'linear-gradient(to top,rgba(10,10,10,.98) 0%,rgba(10,10,10,.4) 48%,transparent 100%)' }}
      />
      <span className='absolute top-[18px] left-5 robo text-[10px] uppercase font-bold text-white'>
        {project.index}
      </span>

      {/* ↓ Changed: div → button, removed pointer-events-none, added onClick */}
      <button
        ref={ctaRef}
        onClick={(e) => { e.stopPropagation(); window.open(project.url, '_blank') }}
        className='absolute top-[18px] right-5 flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer'
        style={{
          opacity: 0,
          transform: 'translateX(10px)',
          transition: 'opacity .35s ease, transform .4s cubic-bezier(.34,1.56,.64,1)',
        }}
      >
        <span className='w-[6px] h-[6px] rounded-full bg-[#B8FF4F] shadow-[0_0_8px_#B8FF4F]' />
        <span className='robo text-[15px] uppercase font-bold text-[#B8FF4F]'>View</span>
      </button>

      <div className='absolute bottom-0 left-0 right-0 z-10 px-6 pb-6'>
        <p className='robo text-[10px] uppercase text-[#DCDCDC] mb-[6px]'>{project.sub}</p>
        <h2 className='robo text-[4vw] text-white font-bold leading-none mb-3'>{project.title}</h2>
        <div className='flex items-center gap-2'>
          <span className='robo text-[9px] text-[#DCDCDC]'>{project.buildId}</span>
        </div>
      </div>
    </article>
  )
})
Card.displayName = 'Card'

/* ─── MobileCard (inside Swiper slide) ────────────────────────────────── */
const MobileCard = ({ project }) => (
  <div
    className='relative w-full rounded-2xl overflow-hidden'
    onClick={() => window.open(project.url, '_blank')}
    style={{
      height: '45vh',
      border: '1px solid rgba(255,255,255,0.07)',
    }}
  >
    <img
      src={project.img}
      alt={project.title}
      draggable={false}
      loading='lazy'
      decoding='async'
      className='absolute inset-0 w-full h-full object-cover pointer-events-none block'
      style={{ filter: 'grayscale(1) contrast(1.08) brightness(.5)' }}
    />
    <div
      className='absolute inset-0 pointer-events-none'
      style={{ background: 'linear-gradient(to top,rgba(10,10,10,.98) 0%,rgba(10,10,10,.4) 48%,transparent 100%)' }}
    />
    <span className='absolute top-[18px] left-5 robo text-[10px] uppercase font-bold text-white'>
      {project.index}
    </span>
    <div className='absolute bottom-0 left-0 right-0 z-10 px-6 pb-6'>
      <p className='robo text-[10px] uppercase text-[#DCDCDC] mb-[6px]'>{project.sub}</p>
      <h2 className='robo text-[11vw] text-white font-bold leading-none mb-3'>{project.title}</h2>
      <span className='robo text-[9px] text-[#DCDCDC]'>{project.buildId}</span>
    </div>
  </div>
)

/* ─── Archive ─────────────────────────────────────────────────────────── */
const Archive = () => {
  const isMobile = useIsMobile()

  /* desktop drag refs */
  const outerRef    = useRef(null)
  const trackRef    = useRef(null)
  const progressRef = useRef(null)
  const posX        = useRef(0)
  const targetX     = useRef(0)
  const velX        = useRef(0)
  const dragging    = useRef(false)
  const didDrag     = useRef(false)   // ← NEW: true if pointer moved enough to be a drag
  const dragStartClientX = useRef(0)
  const dragStartPosX    = useRef(0)
  const prevClientX      = useRef(0)
  const rafId            = useRef(null)
  const isLooping        = useRef(false)
  const hintDone         = useRef(false)

  const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
  const getMinX  = useCallback(() => {
    const track = trackRef.current; const outer = outerRef.current
    if (!track || !outer) return 0
    return -(track.scrollWidth - outer.clientWidth)
  }, [])

  const syncProgress = useCallback(() => {
    const bar = progressRef.current; if (!bar) return
    const mn  = getMinX()
    if (mn >= 0) { bar.style.width = '0%'; return }
    bar.style.width = Math.min(1, Math.max(0, -posX.current / mn)) * 100 + '%'
  }, [getMinX])

  const startLoop = useCallback(() => {
    if (isLooping.current) return
    isLooping.current = true
    const track = trackRef.current
    const tick = () => {
      const diff = targetX.current - posX.current
      posX.current += diff * 0.1
      if (track) track.style.transform = `translateX(${posX.current}px)`
      syncProgress()
      if (!dragging.current && Math.abs(diff) < 0.05) {
        posX.current = targetX.current
        if (track) track.style.transform = `translateX(${posX.current}px)`
        isLooping.current = false; rafId.current = null
      } else {
        rafId.current = requestAnimationFrame(tick)
      }
    }
    rafId.current = requestAnimationFrame(tick)
  }, [syncProgress])

  /* desktop events */
  useEffect(() => {
    if (isMobile) return
    const outer = outerRef.current; if (!outer) return

    const onDown = (e) => {
      outer.setPointerCapture(e.pointerId)
      dragging.current = true
      didDrag.current  = false          // ← reset on each press
      dragStartClientX.current = e.clientX
      dragStartPosX.current    = posX.current
      prevClientX.current      = e.clientX
      velX.current             = 0
      hintDone.current         = true
      outer.style.cursor       = 'grabbing'
      startLoop()
    }
    const onMove = (e) => {
      if (!dragging.current) return
      const delta = e.clientX - dragStartClientX.current
      if (Math.abs(delta) > 5) didDrag.current = true   // ← mark as drag
      const mn    = getMinX()
      let next    = dragStartPosX.current + delta
      if (next > 0)  next = next * 0.12
      if (next < mn) next = mn + (next - mn) * 0.12
      targetX.current     = next
      velX.current        = e.clientX - prevClientX.current
      prevClientX.current = e.clientX
    }
    const onUp = (e) => {
      if (!dragging.current) return
      dragging.current   = false
      outer.style.cursor = 'grab'
      if (!didDrag.current) {
        outer.releasePointerCapture(e.pointerId)
        targetX.current = posX.current
        return
      }
      targetX.current = clamp(posX.current + velX.current * 8, getMinX(), 0)
      startLoop()
      // reset didDrag after a short delay so the click event (which fires after pointerup) is suppressed
      setTimeout(() => { didDrag.current = false }, 50)
    }
    const onWheel = (e) => {
      e.preventDefault()
      targetX.current = clamp(targetX.current - e.deltaY * 1.4, getMinX(), 0)
      startLoop()
    }

    outer.style.cursor = 'grab'
    outer.addEventListener('pointerdown',   onDown)
    outer.addEventListener('pointermove',   onMove)
    outer.addEventListener('pointerup',     onUp)
    outer.addEventListener('pointercancel', onUp)
    outer.addEventListener('wheel',         onWheel, { passive: false })

    const hint = setTimeout(() => {
      if (!hintDone.current && posX.current === 0) {
        targetX.current = -36; startLoop()
        setTimeout(() => { targetX.current = 0; startLoop() }, 650)
      }
    }, 1800)

    return () => {
      outer.removeEventListener('pointerdown',   onDown)
      outer.removeEventListener('pointermove',   onMove)
      outer.removeEventListener('pointerup',     onUp)
      outer.removeEventListener('pointercancel', onUp)
      outer.removeEventListener('wheel',         onWheel)
      clearTimeout(hint)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isMobile, getMinX, startLoop])

  /* desktop card stagger */
  useEffect(() => {
    if (isMobile) return
    const cards = Array.from(trackRef.current?.querySelectorAll('article') ?? [])
    cards.forEach((card, i) => {
      card.style.opacity    = '0'
      card.style.transform  = 'translateY(50px) scale(.96)'
      card.style.transition = `opacity .8s ease ${.1 + i * .13}s, transform .85s cubic-bezier(.23,1,.32,1) ${.1 + i * .13}s`
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.style.opacity   = '1'
        card.style.transform = 'translateY(0) scale(1)'
      }))
    })
  }, [isMobile])

  /* ── Shared decorations ── */
  const Decorations = () => (
    <>
      <div className='fixed w-[400px] h-[400px] rounded-full pointer-events-none -top-24 -left-20 blur-[90px] bg-[#B8FF4F]/[0.04]' />
      <div className='fixed w-[300px] h-[300px] rounded-full pointer-events-none bottom-0 right-0 blur-[90px] bg-[#2dd4bf]/[0.03]' />
      <div
        className='fixed inset-0 pointer-events-none z-50 opacity-50'
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }}
      />
    </>
  )

  /* ── MOBILE layout ── */
  if (isMobile) {
    return (
      <div id='archive' className='relative w-full h-full flex flex-col overflow-hidden select-none' >
        <Decorations />
        <header className='px-6 pt-7 pb-0 flex-none relative z-20'>
          <p className='robo text-[10px] tracking-normal uppercase text-[#9592FF] mb-[6px]'>Repository</p>
          <h1 className='fontone mb-3 text-white font-bold leading-none uppercase' style={{ fontSize: 'clamp(32px, 11vw, 56px)' }}>
            The archive
          </h1>
        </header>
        <div className='relative z-20 py-12'>
          <Swiper
            effect='cards'
            grabCursor
            modules={[EffectCards]}
            className='w-[78vw] !py-0 mx-auto'
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 3,
              rotate: true,
              slideShadows: false,
            }}
          >
            {PROJECTS.map(p => (
              <SwiperSlide key={p.id}>
                <MobileCard project={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <footer className='mx-6 mb-7 flex-none flex items-center gap-4 relative z-20'>
          <span className='robo text-[14px] uppercase text-[#868585] whitespace-nowrap'>Swipe to explore</span>
          <svg width={18} height={10} viewBox='0 0 18 10' fill='none' className='shrink-0'>
            <path d='M1 5h16M12 1l5 4-5 4' stroke='#868585' strokeWidth={1.3} strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </footer>
      </div>
    )
  }

  /* ── DESKTOP / TABLET layout ── */
  return (
    <div id='archive' className='relative w-full h-screen px-[4vw] flex flex-col overflow-hidden select-none' >
      <Decorations />
      <header className='px-11 pt-7 pb-0 flex-none relative z-20'>
        <p className='robo text-[10px] tracking-normal uppercase text-[#9592FF] mb-[6px] flex items-center gap-3'>
          Repository
        </p>
        <h1 className='fontone mb-10 text-white font-bold leading-none uppercase' style={{ fontSize: 'clamp(32px, 7vw, 80px)' }}>
          The archive
        </h1>
      </header>
      <div
        ref={outerRef}
        className='flex-1 overflow-hidden relative z-20 flex items-center touch-none'
        style={{ cursor: 'inherit' }}
      >
        <div
          ref={trackRef}
          className='flex items-center gap-5 pl-11 pr-40 pb-6 pt-4 will-change-transform'
          style={{ userSelect: 'none' }}
        >
          {PROJECTS.map(p => <Card key={p.id} project={p} didDrag={didDrag} />)}
        </div>
      </div>
      <footer className='mx-11 mb-7 flex-none flex items-center gap-4 relative z-20'>
        <span className='robo text-[14px] uppercase text-[#868585] whitespace-nowrap'>Drag to explore</span>
        <svg width={18} height={10} viewBox='0 0 18 10' fill='none' className='shrink-0'>
          <path d='M1 5h16M12 1l5 4-5 4' stroke='#868585' strokeWidth={1.3} strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </footer>
    </div>
  )
}

export default Archive