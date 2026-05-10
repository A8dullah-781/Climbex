import React, { useState, useRef, useEffect, useCallback } from 'react'
import { usePageNavigate } from '../src/hooks/usePageNavigate'

const faqs = [
  {
    q: "What's the average build time?",
    a: "Most projects ship in 2–4 weeks depending on scope. Launch Pad projects typically deliver in 10–14 days. Elite Builds with custom functionality may take 3–6 weeks. You'll always get a clear timeline before we start — no guessing."
  },
  {
    q: "How do I get started?",
    a: "Book a free discovery call. We'll understand your goals, walk you through the process, and recommend the right engagement. No sales pressure — just an honest conversation about whether we're the right fit."
  },
  {
    q: "What makes Devholix different from other agencies?",
    a: "We don't use templates, generic layouts, or recycled code. Every project is engineered from scratch with a focus on speed, design quality, and conversion. We treat your business like it's our own — and the work reflects that."
  },
  {
    q: "Do you work with startups or only established businesses?",
    a: "Both. Our Launch Pad plan is built for founders and early-stage startups who need to move fast. Our Elite Build is for established businesses that need a premium digital presence. We meet you where you are."
  },
  {
    q: "I already have a website — can you just redesign it?",
    a: "That's one of our most common engagements. We audit your existing site, identify what's costing you conversions, and rebuild it with precision. Old brand, new performance."
  },
  {
    q: "Will my website be mobile responsive?",
    a: "100%. Everything we build is fully responsive across all devices and screen sizes. We test on mobile, tablet, and desktop before any delivery — it's non-negotiable."
  },
  {
    q: "Do you handle SEO and performance optimization?",
    a: "Yes. Every project ships with clean semantic HTML, optimized assets, fast load times, and proper meta structure. For deeper SEO strategy and content, we offer that as an add-on."
  },
  {
    q: "Can I see examples of your previous work?",
    a: "Absolutely. We have a curated portfolio of live projects across industries. Book a call and we'll walk you through case studies relevant to your niche so you can see exactly what to expect."
  },
  {
    q: "Do you offer post-launch maintenance?",
    a: "Yes. We offer ongoing retainer packages for clients who need continuous updates, performance monitoring, and feature additions. Think of us as your long-term engineering partner, not a one-time vendor."
  },
  {
    q: "How much input do I have during the process?",
    a: "A lot. We run collaborative checkpoints at design, development, and pre-launch stages. You'll always know exactly where we are and have the chance to give feedback — you're never in the dark."
  },
]

const MagneticButton = ({ children, className, onClick }) => {
  const btnRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const radius = 120

    if (dist < radius) {
      const strength = (1 - dist / radius) * 0.5
      const tx = dx * strength
      const ty = dy * strength
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setPos({ x: tx, y: ty }))
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setPos({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const el = btnRef.current
    if (!el) return
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove])

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: hovered
          ? 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </button>
  )
}

const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}

const FaqItem = ({ faq, index, isOpen, onToggle }) => {
  const [ref, inView] = useInView(0.1)
  const answerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      ref={ref}
      onClick={onToggle}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0px)' : 'translateX(-36px)',
        transition: `opacity 0.55s ease ${index * 0.055}s, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${index * 0.055}s`,
      }}
      className={`rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-300 ${
        isOpen
          ? 'bg-[#1e1e1e] border-[#B8FF4F]/30'
          : 'bg-[#181818] border-[#2a2a2a] hover:border-[#3a3a3a]'
      }`}
    >
      <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 gap-4">
        <span className="txtwhite fontone font-black uppercase text-xs sm:text-sm tracking-wide leading-snug">
          {faq.q}
        </span>
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border"
          style={{
            background: isOpen ? '#B8FF4F' : 'transparent',
            borderColor: isOpen ? '#B8FF4F' : '#3a3a3a',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), background 0.25s ease, border-color 0.25s ease',
          }}
        >
          <span
            className={`text-md font-light ${isOpen ? 'text-[#0f0f0f]' : 'text-white'}`}
            style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px', transition: 'color 0.25s ease' }}
          >
            +
          </span>
        </div>
      </div>

      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.45s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div ref={answerRef} className="px-5 sm:px-7 pb-5 sm:pb-6">
          <div
            className="w-full h-[1px] bg-[#2a2a2a] mb-4"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scaleX(1)' : 'scaleX(0.6)',
              transformOrigin: 'left',
              transition: 'opacity 0.3s ease 0.1s, transform 0.4s ease 0.1s',
            }}
          />
          <p
            className="txtgray robo text-md leading-relaxed"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.35s ease 0.15s, transform 0.4s ease 0.15s',
            }}
          >
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

const Faqs = () => {
  const [open, setOpen] = useState(null)
  const [headerRef, headerInView] = useInView(0.2)
  const [ctaRef, ctaInView] = useInView(0.2)
  const go = usePageNavigate()

  useEffect(() => {
    const rogue = document.getElementById('faq-schema')
    if (rogue) rogue.remove()
  }, [])

  const toggle = (i) => setOpen(open === i ? null : i)

  const handleBookCall = () => go('/book-call')

  return (
    <div className="w-full py-16 md:py-24 flex flex-col items-center">

      <div ref={headerRef} className="text-center mb-10 md:mb-14 w-[92%] sm:w-[88%] lg:w-[82%]">
        <p
          className="txtgreen robo tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-3"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.1s',
          }}
        >
          Knowledge Base
        </p>
        <h2
          className="txtwhite fontone font-black uppercase text-4xl sm:text-5xl md:text-[4.5vw] leading-none"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s',
          }}
        >
         COMMON QUESTIONS
        </h2>
        <p
          className="txtgray robo text-sm mt-4 max-w-md mx-auto leading-relaxed"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.6s ease 0.35s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.35s',
          }}
        >
          Everything you need to know before we build something great together.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-[92%] sm:w-[88%] lg:w-[82%]">
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            faq={faq}
            index={i}
            isOpen={open === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      <div
        ref={ctaRef}
        className="mt-14 md:mt-20 w-[92%] sm:w-[88%] lg:w-[82%] bg-[#B8FF4F] rounded-3xl px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-8"
        style={{
          opacity: ctaInView ? 1 : 0,
          transform: ctaInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
          transition: 'opacity 0.75s cubic-bezier(0.23,1,0.32,1), transform 0.75s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div
          className="text-left"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s',
          }}
        >
          <p className="text-black robo uppercase tracking-[0.2em] text-[14px] sm:text-[16px] mb-2">
            Still have questions?
          </p>
          <h3 className="text-[#0f0f0f] fontone font-black uppercase text-2xl sm:text-3xl leading-tight">
           Ready to build something that actually works?
          </h3>
          <p className="text-[#3a3a3a] robo text-xs sm:text-sm mt-2 max-w-xs leading-relaxed">
            No pitch. No pressure. Just a real conversation about your project.
          </p>
        </div>

        <div
          className="flex-shrink-0 w-full sm:w-auto flex sm:justify-end"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 0.7s ease 0.35s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.35s',
          }}
        >
          <MagneticButton
            onClick={handleBookCall}
            className="bg-[#0f0f0f] text-[#B8FF4F] fontone font-black uppercase tracking-widest text-xs sm:text-sm px-8 sm:px-10 py-4 rounded-full hover:bg-[#1a1a1a] w-full sm:w-auto whitespace-nowrap"
          >
            Book a Free Call
          </MagneticButton>
        </div>
      </div>

    </div>
  )
}

export default Faqs