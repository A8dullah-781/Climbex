import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const links = ['Work', 'Services', 'Process', 'About']

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null)
  const [menuOpen, setMenuOpen]     = useState(false)

  const navRef          = useRef(null)
  const mobileMenuRef   = useRef(null)
  const mobileItemRefs  = useRef([])
  const mobileCTARef    = useRef(null)
  const lastScroll      = useRef(0)

  /* ── hide/show on scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (!navRef.current) return
      gsap.to(navRef.current, {
        y: y > lastScroll.current && y > 50 ? '-100%' : '0%',
        duration: 0.35, ease: 'power2.out', overwrite: 'auto',
      })
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── entry animation ── */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: '-100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  /* ── mobile menu ── */
  useEffect(() => {
    if (!mobileMenuRef.current) return
    const items = mobileItemRefs.current.filter(Boolean)

    if (menuOpen) {
      gsap.to(mobileMenuRef.current, { height: 'auto', duration: 0.4, ease: 'power3.out' })
      gsap.fromTo(items,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, delay: 0.06, duration: 0.3, ease: 'power2.out' }
      )
      if (mobileCTARef.current)
        gsap.fromTo(mobileCTARef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, delay: 0.3, duration: 0.3, ease: 'power2.out' }
        )
    } else {
      gsap.to(items, { y: -6, opacity: 0, stagger: 0.03, duration: 0.18, ease: 'power2.in' })
      gsap.to(mobileMenuRef.current, { height: 0, delay: 0.12, duration: 0.3, ease: 'power3.in' })
    }
  }, [menuOpen])

  return (
    <div
      ref={navRef}
      className='fixed top-0 left-0 w-screen z-50 h-[10vh] px-[2vw] flex flex-row justify-between items-center'
    >
      {/* Brand */}
      <div className='fontone font-bold text-white text-[5vw] pr-4 lg:pr-0 lg:text-[1.3vw] cursor-default select-none'>
        Devholix
        <span className='inline-block w-[6px] h-[6px] bg-[#D2FF9A] rounded-full ml-[2px] mb-[2px] align-middle animate-pulse' />
      </div>

      {/* Desktop links */}
      <div className='hidden md:flex flex-row gap-10 robo uppercase text-[1vw]'>
        {links.map(link => (
          <div
            key={link}
            onClick={() => setActiveLink(link)}
            className={`relative cursor-pointer pb-1 overflow-hidden group ${activeLink === link ? 'text-[#D2FF9A]' : 'txtgray'}`}
          >
            <span className='block transition-transform duration-300 ease-out group-hover:-translate-y-full'>
              {link}
            </span>
            <span className='absolute top-0 left-0 text-[#D2FF9A] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0'>
              {link}
            </span>
            <span className='absolute bottom-0 left-0 h-px bg-[#D2FF9A] w-0 transition-all duration-300 ease-out group-hover:w-full' />
          </div>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className='hidden md:block robo text-black text-[1vw] bgwhite rounded-3xl px-5 py-1 cursor-pointer relative overflow-hidden group'>
        <span className='relative z-10 transition-colors duration-300 mt-0.5 group-hover:text-black'>START PROJECT</span>
        <span className='absolute inset-0 bg-[#D2FF9A] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 rounded-3xl' />
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(p => !p)}
        className='md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] border border-[#D2FF9A]/20 rounded-lg hover:border-[#D2FF9A]/40 hover:bg-[#D2FF9A]/5 transition-all duration-200'
        aria-label='Toggle menu'
      >
        <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`block w-3 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 translate-x-3' : ''}`} />
        <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className='md:hidden absolute top-[10vh] left-0 w-screen overflow-hidden h-0'
        style={{ background: 'rgba(17,17,16,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(210,255,154,0.08)' }}
      >
        <div className='flex flex-col px-6 py-3 pb-7 gap-1'>
          {links.map((link, i) => (
            <div
              key={link}
              ref={el => (mobileItemRefs.current[i] = el)}
              onClick={() => { setActiveLink(link); setTimeout(() => setMenuOpen(false), 200) }}
              className={`flex items-center justify-between py-4 cursor-pointer robo uppercase text-[3vw] tracking-widest border-b border-white/5 transition-all duration-200 hover:text-[#D2FF9A] hover:pl-3 ${activeLink === link ? 'text-[#D2FF9A] pl-3' : 'txtgray'}`}
            >
              {link}
              <span className='text-[10px] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>→</span>
            </div>
          ))}
          <button
            ref={mobileCTARef}
            className='robo uppercase tracking-widest text-[2.5vw] rounded-3xl px-6 py-3 mt-4 w-full bgwhite text-black relative overflow-hidden group cursor-pointer'
          >
            <span className='relative z-10 transition-colors duration-300 group-hover:text-black'>START PROJECT</span>
            <span className='absolute inset-0 bg-[#D2FF9A] -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 rounded-3xl' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar