import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = ['Work', 'Services', 'Process', 'About']

  const navRef = useRef(null)
  const lastScroll = useRef(0)
  const mobileMenuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const mobileItemRefs = useRef([])
  const mobileCTARef = useRef(null)

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (!navRef.current) return

      if (currentScroll > lastScroll.current && currentScroll > 50) {
        gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'power2.out' })
      } else {
        gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' })
      }

      lastScroll.current = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
      gsap.from('.nav-desktop-link', {
        y: -10,
        opacity: 0,
        stagger: 0.08,
        delay: 0.25,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.from('.cta-btn', {
        scale: 0.88,
        opacity: 0,
        delay: 0.55,
        duration: 0.45,
        ease: 'back.out(1.7)',
      })
    })
    return () => ctx.revert()
  }, [])

  // Mobile menu open/close animation
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (menuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: 'auto',
        duration: 0.45,
        ease: 'power3.out',
      })
      gsap.fromTo(
        mobileItemRefs.current.filter(Boolean),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, delay: 0.08, duration: 0.35, ease: 'power2.out' }
      )
      if (mobileCTARef.current) {
        gsap.fromTo(
          mobileCTARef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, delay: 0.38, duration: 0.35, ease: 'power2.out' }
        )
      }
    } else {
      gsap.to(mobileItemRefs.current.filter(Boolean), {
        y: -8,
        opacity: 0,
        stagger: 0.04,
        duration: 0.2,
        ease: 'power2.in',
      })
      gsap.to(mobileMenuRef.current, {
        height: 0,
        delay: 0.15,
        duration: 0.35,
        ease: 'power3.in',
      })
    }
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const handleMobileLinkClick = (link) => {
    setActiveLink(link)
    setTimeout(() => setMenuOpen(false), 220)
  }

  return (
    <>
      <style>{`
        /* ── FONTS ── */
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        /* ── NAV LINK FLIP ── */
        .nav-desktop-link {
          position: relative;
          cursor: pointer;
          padding-bottom: 4px;
          overflow: hidden;
          line-height: 1.2;
        }

        .nav-desktop-link .link-visible {
          display: inline-block;
          transition: transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      color 0.25s ease;
        }

        .nav-desktop-link .link-hover {
          position: absolute;
          top: -100%;
          left: 0;
          color: #D2FF9A;
          transition: top 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          white-space: nowrap;
          font-size: inherit;
          letter-spacing: inherit;
        }

        .nav-desktop-link:hover .link-hover,
        .nav-desktop-link.active-link .link-hover {
          top: 0;
        }

        .nav-desktop-link:hover .link-visible,
        .nav-desktop-link.active-link .link-visible {
          transform: translateY(110%);
          color: #D2FF9A;
        }

        .link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          background: #D2FF9A;
          width: 0%;
          transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-desktop-link:hover .link-underline,
        .nav-desktop-link.active-link .link-underline {
          width: 100%;
        }

        /* ── BRAND ── */
        .brand-wrap {
          display: inline-block;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .brand-wrap:hover {
          transform: skewX(-8deg) scale(1.04);
        }
        .brand-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #D2FF9A;
          border-radius: 50%;
          margin-left: 2px;
          margin-bottom: 2px;
          vertical-align: middle;
          animation: devholix-pulse 2.4s ease-in-out infinite;
        }
        @keyframes devholix-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.55; }
        }

        /* ── CTA BUTTON ── */
        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #D2FF9A;
          border-radius: inherit;
          transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .cta-btn:hover::after { transform: translateX(0); }
        .cta-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 22px rgba(210,255,154,0.25);
        }
        .cta-btn:active { transform: scale(0.96); }
        .cta-btn span { position: relative; z-index: 1; }

        /* ── HAMBURGER BARS ── */
        .hbar {
          width: 20px;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.3s ease,
                      width 0.3s ease;
          transform-origin: center;
        }
        .hbar-mid { width: 13px; }
        .ham-open .hbar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham-open .hbar-mid           { opacity: 0; transform: translateX(10px); }
        .ham-open .hbar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── HAMBURGER BUTTON ── */
        .ham-btn {
          border: 1px solid rgba(210,255,154,0.15);
          border-radius: 8px;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .ham-btn:hover {
          border-color: rgba(210,255,154,0.4);
          background: rgba(210,255,154,0.06);
        }

        /* ── MOBILE MENU ── */
        .mobile-menu-wrap {
          overflow: hidden;
          height: 0;
        }

        /* ── MOBILE LINK ── */
        .mobile-nav-link {
          position: relative;
          transition: color 0.25s ease, padding-left 0.25s ease;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .mobile-nav-link::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 2px; height: 100%;
          background: #D2FF9A;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active-link { color: #D2FF9A; padding-left: 12px; }
        .mobile-nav-link:hover::before,
        .mobile-nav-link.active-link::before { transform: scaleY(1); }

        .mobile-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          font-size: 10px;
        }
        .mobile-nav-link:hover .mobile-arrow,
        .mobile-nav-link.active-link .mobile-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── SCAN LINE ── */
        .menu-scan {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, #D2FF9A, transparent);
          pointer-events: none;
          opacity: 0;
        }
        .scan-run { animation: scan-sweep 0.5s ease forwards; }
        @keyframes scan-sweep {
          0%   { opacity: 0.9; transform: translateY(0); }
          100% { opacity: 0;   transform: translateY(280px); }
        }

        /* ── MOBILE CTA ── */
        .mobile-cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .mobile-cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #D2FF9A;
          border-radius: inherit;
          transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .mobile-cta-btn:hover::after { transform: translateX(0); }
        .mobile-cta-btn:active { transform: scale(0.97); }
        .mobile-cta-btn span { position: relative; z-index: 1; }

        @media (min-width: 769px) {
          .ham-btn, .mobile-menu-wrap { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-links, .cta-btn { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <div
        ref={navRef}
        className='h-[10vh] fixed top-0 left-0 w-screen z-50 px-[2vw] flex flex-row justify-between items-center'
      >
        {/* BRAND */}
        <div className='text-white font-bold text-[1.3vw] cursor-default fontone'>
          <span className='brand-wrap'>
            Devholix
          </span>
          <span className='brand-dot' />
        </div>

        {/* DESKTOP LINKS */}
        <div className='desktop-links uppercase text-[1vw] flex flex-row justify-center items-center gap-10 robo'>
          {links.map((link) => (
            <div
              key={link}
              onClick={() => setActiveLink(link)}
              className={`nav-desktop-link ${activeLink === link ? 'active-link text-[#D2FF9A]' : 'txtgray'}`}
            >
              <span className='link-hover'>{link}</span>
              <span className='link-visible'>{link}</span>
              <span className='link-underline' />
            </div>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <div className='cta-btn txtdgray cursor-pointer robo text-[1vw] rounded-3xl px-5 py-1 mt-1 bgwhite'>
          <span>START PROJECT</span>
        </div>

        {/* HAMBURGER */}
        <button
          ref={hamburgerRef}
          onClick={toggleMenu}
          className={`ham-btn hidden flex-col justify-center items-center w-10 h-10 cursor-pointer gap-[5px] ${menuOpen ? 'ham-open' : ''}`}
          aria-label='Toggle menu'
        >
          <div className='hbar' />
          <div className='hbar hbar-mid' />
          <div className='hbar' />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className='mobile-menu-wrap fixed top-[10vh] left-0 w-screen z-40'
        style={{ background: 'rgba(17,17,16,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(210,255,154,0.08)' }}
      >
        {/* Scan line effect */}
        <div className={`menu-scan ${menuOpen ? 'scan-run' : ''}`} key={menuOpen ? 'open' : 'closed'} />

        <div className='flex flex-col px-6 py-3 pb-7 gap-1'>
          {links.map((link, i) => (
            <div
              key={link}
              ref={(el) => (mobileItemRefs.current[i] = el)}
              onClick={() => handleMobileLinkClick(link)}
              className={`mobile-nav-link flex items-center justify-between py-4 cursor-pointer robo uppercase text-[3vw] tracking-widest ${
                activeLink === link ? 'active-link text-[#D2FF9A]' : 'txtgray'
              }`}
            >
              {link}
              <span className='mobile-arrow'>→</span>
            </div>
          ))}

          <button
            ref={mobileCTARef}
            className='mobile-cta-btn txtdgray robo uppercase tracking-widest text-[2.5vw] rounded-3xl px-6 py-3 mt-4 w-full bgwhite'
          >
            <span>START PROJECT</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar