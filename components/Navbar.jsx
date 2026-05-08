import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useLocation } from 'react-router-dom'
import { usePageNavigate } from '../src/hooks/usePageNavigate'

const links = [
  { label: 'Home',     id: 'home'    },
  { label: 'Projects', id: 'archive' },
  { label: 'Services', id: 'service' },
  { label: 'About',    id: 'about'   },
  { label: 'Contact',  id: 'contact', page: '/contact' }, // ← has a page route
]

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null)
  const [menuOpen, setMenuOpen]     = useState(false)
  const go                          = usePageNavigate()
  const location                    = useLocation()
  const isHome                      = location.pathname === '/'

  const navRef         = useRef(null)
  const mobileMenuRef  = useRef(null)
  const mobileItemRefs = useRef([])
  const mobileCTARef   = useRef(null)
  const lastScroll     = useRef(0)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavLink = (link) => {
    setActiveLink(link.label)
    setMenuOpen(false)

    // Contact → always navigate to /contact page
    if (link.page) {
      go(link.page)
      return
    }

    if (isHome) {
      // Already on home: just scroll to section
      scrollTo(link.id)
    } else {
      // On any other page: tile transition → go home → scroll to section
      go('/', link.id)
    }
  }

  // START PROJECT → scroll to #pricing on home, or navigate home then scroll
  const handleStartProject = () => {
    setMenuOpen(false)
    if (isHome) {
      scrollTo('pricing')
    } else {
      go('/', 'pricing')
    }
  }

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
      className='fixed top-0 left-0 w-screen z-50 h-[10vh] px-[2vw] flex flex-row justify-between items-center backdrop-blur-md bg-[#171616]/5 border-b border-white/5'
    >
      {/* Brand */}
      <div
        onClick={() => handleNavLink({ label: 'Home', id: 'home' })}
        className='fontone font-bold text-white text-[5vw] pr-4 lg:pr-0 lg:text-[1.3vw] cursor-pointer select-none'
      >
        Devholix
        <span className='inline-block w-[6px] h-[6px] bg-[#D2FF9A] rounded-full ml-[2px] mb-[2px] align-middle animate-pulse' />
      </div>

      {/* Desktop links */}
      <div className='hidden md:flex flex-row gap-10 robo uppercase text-[1vw]'>
        {links.map(link => (
          <div
            key={link.label}
            onClick={() => handleNavLink(link)}
            className={`relative cursor-pointer pb-1 overflow-hidden group ${activeLink === link.label ? 'text-[#D2FF9A]' : 'txtgray'}`}
          >
            <span className='block md:transition-none md:group-hover:translate-y-0 lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:-translate-y-full transition-transform duration-300 ease-out group-hover:-translate-y-full'>
              {link.label}
            </span>
            <span className='absolute top-0 left-0 text-[#D2FF9A] translate-y-full md:translate-y-0 md:hidden lg:flex lg:translate-y-full lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:translate-y-0 transition-transform duration-300 ease-out group-hover:translate-y-0'>
              {link.label}
            </span>
            <span className='absolute bottom-0 left-0 h-px bg-[#D2FF9A] w-0 md:hidden lg:block transition-all duration-300 ease-out group-hover:w-full' />
          </div>
        ))}
      </div>

      {/* Desktop CTA — now scrolls to pricing */}
      <div
        onClick={handleStartProject}
        className='hidden md:block robo text-black text-[1vw] bgwhite rounded-3xl px-5 py-1 cursor-pointer relative overflow-hidden group'
      >
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
              key={link.label}
              ref={el => (mobileItemRefs.current[i] = el)}
              onClick={() => handleNavLink(link)}
              className={`flex items-center justify-between py-4 cursor-pointer robo uppercase text-[3vw] tracking-widest border-b border-white/5 transition-all duration-200 hover:text-[#D2FF9A] hover:pl-3 ${activeLink === link.label ? 'text-[#D2FF9A] pl-3' : 'txtgray'}`}
            >
              {link.label}
              <span className='text-[10px] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>→</span>
            </div>
          ))}
          <button
            ref={mobileCTARef}
            onClick={handleStartProject}
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