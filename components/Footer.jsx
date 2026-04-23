import React, { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const links = [
    {
      label: '+92 310 4993978',
      href: 'tel:+923104993978',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      )
    },
    {
      label: 'ABDULLAH@DEVHOLIX.COM',
      href: 'mailto:abdullah@devholix.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      label: '+92 327 1563383',
      href: 'https://wa.me/923271563383?text=I%E2%80%99m%20looking%20to%20build%20a%20high-impact%20digital%20presence.%20Let%E2%80%99s%20schedule%20a%20call%20and%20move%20forward%20with%20clarity.',
      icon: <FaWhatsapp size={16} />
    }
  ]

  return (
    <footer
      ref={footerRef}
      className="bg-black w-full overflow-hidden"
      style={{ paddingLeft: '7.5vw', paddingRight: '7.5vw' }}
    >
      <div
        className="w-full h-px bg-gray-800 transition-all duration-1000"
        style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
      />

      <div className="py-10 md:py-14 overflow-hidden">
        <h1
          className="robo font-black text-white leading-none select-none"
          style={{
            fontSize: 'clamp(60px, 13vw, 180px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.1s'
          }}
        >
          DEVHOLIX
        </h1>
      </div>

      <div
        className="pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.35s'
        }}
      >
        <div className="flex flex-col gap-3">
          <span className="robo text-[#c8f135] text-[10px] tracking-widest">NAV_CLUSTER</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-2 group transition-all duration-200"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.4 + i * 0.07}s, color 0.2s ease`,
                }}
              >
                <span
                  className="transition-colors duration-200"
                  style={{ color: hovered === i ? '#c8f135' : '#6b7280' }}
                >
                  {link.icon}
                </span>
                <span
                  className="robo text-sm tracking-widest transition-colors duration-200"
                  style={{ color: hovered === i ? '#9592FF' : 'white' }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="robo text-gray-600 text-[10px] tracking-widest">VER_STABLE_001</span>
          <span className="robo text-gray-600 text-[10px] tracking-widest">
            ©2025 DEVHOLIX ARCHIVE. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer