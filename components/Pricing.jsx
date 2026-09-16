import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageNavigate } from '../src/hooks/usePageNavigate'

gsap.registerPlugin(ScrollTrigger)

const MagneticBtn = ({ children, dark, className, onClick }) => {
  const btnRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    const txt = textRef.current
    const strength = 0.35

    const move = (e) => {
      const r = btn.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' })
      gsap.to(txt, { x: x * strength * 0.5, y: y * strength * 0.5, duration: 0.4, ease: 'power2.out' })
    }
    const leave = () => {
      gsap.to([btn, txt], { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    btn.addEventListener('mousemove', move)
    btn.addEventListener('mouseleave', leave)
    return () => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave) }
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`mt-10 w-full fontone font-black uppercase tracking-widest text-sm py-4 rounded-full transition-colors duration-300 ${className}`}
    >
      <span ref={textRef} className="block">{children}</span>
    </button>
  )
}

const Pricing = () => {
  const secRef   = useRef(null)
  const labelRef = useRef(null)
  const headRef  = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)

  const go = usePageNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 78%', once: true },
      })

      tl.fromTo(labelRef.current,
        { autoAlpha: 0, y: 12, letterSpacing: '0.6em' },
        { autoAlpha: 1, y: 0, letterSpacing: '0.3em', duration: 0.7, ease: 'power3.out' }
      )
      tl.fromTo(headRef.current,
        { autoAlpha: 0, y: 48, skewY: 4 },
        { autoAlpha: 1, y: 0, skewY: 0, duration: 0.9, ease: 'expo.out' },
        '-=0.4'
      )
      tl.fromTo(card1Ref.current,
        { autoAlpha: 0, x: -50, y: 30 },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.5'
      )
      tl.fromTo(card2Ref.current,
        { autoAlpha: 0, x: 50, y: 30, scale: 0.97 },
        { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.75'
      )
    }, secRef)

    return () => ctx.revert()
  }, [])

  // Launch Pad → /contact page (with tile transition)
  const handleLaunchNow = () => go('/contact')

  // Elite Build → /book-call page (unchanged)
  const handleBookCall = () => go('/book-call')

  const features1 = [
    'Live results in 30–45 days',
    'Strategy built around your market',
    "Full technical & on-page audit",
    'Transparent monthly reporting',
  ]
  const features2 = [
    'Built from scratch, nothing templated',
    'Custom strategy for your industry',
    'Link building & authority growth',
    'Ongoing support available',
  ]

  return (
    <div id='pricing' ref={secRef} className="w-full px-[7.5vw] py-16 sm:py-20">

      <div className="text-center mb-10 sm:mb-14">
        <p ref={labelRef} className="txtgreen robo tracking-[0.3em] uppercase text-xs mb-4 mt-8">
          Tiered Engagement
        </p>
        <h2 ref={headRef} className="txtwhite fontone font-black uppercase leading-none pb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
          Select Your Path
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 w-full">

        {/* Launch Pad */}
        <div ref={card1Ref}
          className="flex flex-col justify-between bg-[#201F1F] rounded-3xl p-8 md:p-10 w-full md:w-1/2 lg:w-[38%]"
          style={{ minHeight: 'clamp(420px, 55vh, 560px)' }}>
          <div>
            <h3 className="txtwhite fontone font-black uppercase leading-none"
              style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2rem)' }}>
              Launch Pad
            </h3>
            <p className="txtgray robo mt-1" style={{ fontSize: 'clamp(0.72rem, 1vw, 0.9rem)' }}>
              Everything you need to start ranking
            </p>
            <p className="txtwhite fontone font-black mt-6 leading-none"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}>
              From $999
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {features1.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="txtgreen text-base leading-snug">✓</span>
                  <span className="text-[#a0a0a0] robo leading-snug"
                    style={{ fontSize: 'clamp(0.7rem, 0.88vw, 0.82rem)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Launch Now → /contact page */}
          <MagneticBtn onClick={handleLaunchNow} className="bg-white text-black hover:bg-[#B8FF4F]">
            Launch Now
          </MagneticBtn>
        </div>

        {/* Elite Build */}
        <div ref={card2Ref}
          className="relative flex flex-col justify-between bg-[#D2FF9A] rounded-3xl p-8 md:p-10 w-full md:w-1/2 lg:w-[38%]"
          style={{ minHeight: 'clamp(420px, 55vh, 560px)' }}>

          <span className="absolute top-5 right-5 bg-[#3D6500] text-[#B8FF4F] robo uppercase px-3 py-2 rounded-lg"
            style={{ fontSize: 'clamp(9px, 0.65vw, 11px)' }}>
            Retainer
          </span>

          <div>
            <h3 className="text-[#1a1a1a] fontone font-black uppercase leading-none"
              style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2rem)' }}>
              Elite Build
            </h3>
            <p className="text-[#3a3a3a] robo mt-1" style={{ fontSize: 'clamp(0.72rem, 1vw, 0.9rem)' }}>
              Full-scale SEO for high-value businesses
            </p>
            <p className="text-[#1a1a1a] fontone font-black mt-6 leading-none"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}>
              Custom Pricing
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {features2.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#1a1a1a] text-base leading-snug">✓</span>
                  <span className="text-[#2a2a2a] robo leading-snug"
                    style={{ fontSize: 'clamp(0.7rem, 0.88vw, 0.82rem)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Let's Start → /book-call (unchanged) */}
          <MagneticBtn onClick={handleLaunchNow} className="bg-[#3D6500] text-[#B8FF4F] hover:bg-[#0f0f0f]">
            Let's Start
          </MagneticBtn>
        </div>

      </div>
    </div>
  )
}

export default Pricing