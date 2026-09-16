import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'

gsap.registerPlugin(SplitText, CustomEase)
CustomEase.create('expo.hard', '0.16, 1, 0.3, 1')

const Footer = () => {
  const [hovered, setHovered]   = useState(null)
  const [visible, setVisible]   = useState(false)
  const footerRef  = useRef(null)
  const titleRef   = useRef(null)
  const hasPlayed  = useRef(false)

  /* ── Intersection observer → trigger once ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  /* ── SplitText animation — fires when visible flips true ── */
  useEffect(() => {
    if (!visible || !titleRef.current) return

    const split = new SplitText(titleRef.current, { type: 'chars' })

    gsap.set(split.chars, {
      opacity: 0,
      y: 60,
      rotateX: -80,
      transformOrigin: '50% 50% -40px',
    })

    gsap.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.04,
      duration: 0.5,
      ease: 'expo.hard',
      delay: 0.15,
      onComplete: () => split.revert(),
    })
  }, [visible])

  const links = [
    {
      label: 'LINKEDIN',
      icon: <FaLinkedinIn size={16} />,
      hoverColor: '#0A66C2',
      glowColor: 'rgba(10,102,194,0.5)',
    },
    {
      label: 'INFO@CLIMBEX.EX',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      hoverColor: '#FFC107',
      glowColor: 'rgba(255,193,7,0.5)',
    },
    {
      label: 'WHATSAPP',
      icon: <FaWhatsapp size={16} />,
      hoverColor: '#25D366',
      glowColor: 'rgba(37,211,102,0.5)',
    },
  ]

  return (
    <footer
      ref={footerRef}
      className="bg-[#0d0b0b4f] w-full overflow-hidden"
      style={{ paddingLeft: '7.5vw', paddingRight: '7.5vw' }}
    >
      {/* ── Top divider ── */}
      <div
        className="w-full h-px bg-gray-800 transition-all duration-1000"
        style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
      />

      {/* ── DEVHOLIX heading ── */}
      <div className="py-10 md:py-6 overflow-hidden">
        <h1
          ref={titleRef}
          className="robo font-black text-white leading-none select-none"
          style={{
            fontSize: 'clamp(60px, 13vw, 180px)',
            perspective: '800px',
          }}
        >
          CLIMBEX
        </h1>
      </div>

      {/* ── Bottom row ── */}
      <div
        className="pb-8 md:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.35s',
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-2 group transition-all duration-200"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.4 + i * 0.07}s, color 0.2s ease`,
                }}
              >
                <span
                  className="transition-all duration-300"
                  style={{
                    color: hovered === i ? link.hoverColor : '#6b7280',
                    filter: hovered === i ? `drop-shadow(0 0 6px ${link.glowColor})` : 'none',
                  }}
                >
                  {link.icon}
                </span>
                <span
                  className="robo text-sm tracking-widest"
                  style={{ color: 'white' }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="robo txtgray text-[10px] tracking-widest">VER_STABLE_001</span>
          <span className="robo txtgray text-[10px] tracking-widest">
            ©2026 CLIMBEX. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer