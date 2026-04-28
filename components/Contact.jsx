import React, { useState, useRef, useEffect } from 'react'

/* ─── Intersection Observer Hook ─────────────────────────────────────────── */
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

/* ─── Animated Field ──────────────────────────────────────────────────────── */
const AnimatedField = ({ label, children, delay = 0, inView }) => (
  <div
    className="flex flex-col gap-1"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
    }}
  >
    <label className="robo text-gray-500 text-[11px] tracking-[0.25em]">{label}</label>
    {children}
  </div>
)

/* ─── Glowing Line ────────────────────────────────────────────────────────── */
const GlowLine = ({ inView, delay = 0 }) => (
  <div
    className="h-[1px] w-full bg-[#2a2a2a] relative overflow-hidden"
    style={{
      opacity: inView ? 1 : 0,
      transition: `opacity 0.4s ease ${delay}s`,
    }}
  >
    <div
      className="absolute top-0 left-0 h-full bg-[#B8FF4F]"
      style={{
        width: inView ? '100%' : '0%',
        transition: `width 1.1s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
        boxShadow: '0 0 12px #B8FF4F88',
      }}
    />
  </div>
)

/* ─── Contact Row ─────────────────────────────────────────────────────────── */
const ContactRow = ({ href, icon, text, inView, delay }) => (
  <a
    href={href}
    className="flex items-center gap-4 group w-fit"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(-30px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
    }}
  >
    <div className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-[#B8FF4F] group-hover:bg-[#B8FF4F]/5 transition-all duration-300">
      {icon}
    </div>
    <span className="robo text-gray-400 text-xs tracking-[0.2em] group-hover:text-white transition-colors duration-300">
      {text}
    </span>
  </a>
)

/* ─── Main Component ──────────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const [leftRef, leftInView] = useInView(0.1)
  const [rightRef, rightInView] = useInView(0.1)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 10000)
  }

  const inputBase = "robo bg-[#161616] border-b border-[#2a2a2a] text-white text-sm placeholder-gray-600 px-2 py-3 focus:outline-none w-full transition-colors duration-300"
  const focusedBorder = (name) => ({ borderColor: focused === name ? '#B8FF4F' : undefined })

  return (
    <section id='contact'
      className="w-full min-h-[80vh] flex items-center py-20 md:py-28"
      style={{ paddingLeft: '7.5vw', paddingRight: '7.5vw' }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

        {/* ── Left Side ── */}
        <div ref={leftRef} className="flex flex-col gap-8">

          <p
            className="robo text-[#B8FF4F] text-[10px] tracking-[0.4em] uppercase"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s',
            }}
          >
            Get In Touch
          </p>

          <div className="overflow-hidden">
            <h2
              className="fontone uppercase text-5xl md:text-6xl lg:text-[5.5vw] font-black text-white leading-none tracking-tight"
              style={{
                opacity: leftInView ? 1 : 0,
                transform: leftInView ? 'translateY(0)' : 'translateY(60px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s',
              }}
            >
              Signal<br />
              <span className="text-[#B8FF4F]">Intent.</span>
            </h2>
          </div>

          <GlowLine inView={leftInView} delay={0.45} />

          <p
            className="robo text-gray-400 text-sm md:text-base leading-relaxed max-w-sm"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.6s ease 0.5s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.5s',
            }}
          >
            Submit your parameters. We'll analyze your requirements and respond within 24 hours.
          </p>

          <div className="flex flex-col gap-4">
            <ContactRow
              href="mailto:abdullah@devholix.com"
              inView={leftInView}
              delay={0.6}
              text="ABDULLAH@DEVHOLIX.COM"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 group-hover:text-[#B8FF4F] transition-colors duration-300">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
            />
            <ContactRow
              href="tel:+923104993978"
              inView={leftInView}
              delay={0.7}
              text="+92 310 4993978"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 group-hover:text-[#B8FF4F] transition-colors duration-300">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              }
            />
          </div>

          <div
            className="flex items-center gap-3 mt-2"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease 0.8s, transform 0.5s ease 0.8s',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8FF4F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8FF4F]" />
            </span>
            <span className="robo txtgray text-[10px]  uppercase">Available for new projects</span>
          </div>
        </div>

        {/* ── Right Side — Form ── */}
        <div
          ref={rightRef}
          className="w-full"
          style={{
            opacity: rightInView ? 1 : 0,
            transform: rightInView ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.15s',
          }}
        >
          <div className="relative rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-7 md:p-10 pl-9 md:pl-14 overflow-hidden">

            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-28 h-28 rounded-bl-[80px] bg-[#B8FF4F]/5 pointer-events-none"
              style={{
                opacity: rightInView ? 1 : 0,
                transition: 'opacity 0.8s ease 0.5s',
              }}
            />
            <div
              className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-[#B8FF4F]/40 rounded-tr-2xl pointer-events-none"
              style={{
                opacity: rightInView ? 1 : 0,
                transition: 'opacity 0.8s ease 0.6s',
              }}
            />

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatedField label="IDENTITY" delay={0.3} inView={rightInView}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputBase}
                    style={focusedBorder('name')}
                  />
                </AnimatedField>
                <AnimatedField label="ACCESS POINT" delay={0.38} inView={rightInView}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputBase}
                    style={focusedBorder('email')}
                  />
                </AnimatedField>
              </div>

              <AnimatedField label="SUBJECT" delay={0.46} inView={rightInView}>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputBase + ' appearance-none cursor-pointer pr-6'}
                    style={{ color: formData.subject ? 'white' : '#4b5563', ...focusedBorder('subject') }}
                  >
                    <option value="" disabled className="text-gray-600 bg-[#0d0d0d]">Select a path</option>
                    <option value="launchpad" className="text-white bg-[#0d0d0d]">Launch Pad</option>
                    <option value="elitebuild" className="text-white bg-[#0d0d0d]">Elite Build</option>
                    <option value="bookcall" className="text-white bg-[#0d0d0d]">Book A Call</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </AnimatedField>

              <AnimatedField label="TRANSMISSION" delay={0.54} inView={rightInView}>
                <textarea
                  name="message"
                  placeholder="Describe your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  rows={5}
                  className={inputBase + ' resize-none'}
                  style={focusedBorder('message')}
                />
              </AnimatedField>

              <div
                style={{
                  opacity: rightInView ? 1 : 0,
                  transform: rightInView ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.55s ease 0.65s, transform 0.55s cubic-bezier(0.23,1,0.32,1) 0.65s',
                }}
              >
                <button
                  type="submit"
                  className="relative w-full overflow-hidden group rounded-xl py-4 font-bold text-sm tracking-[0.2em] transition-all duration-300 active:scale-[0.98]"
                  style={{
                    background: submitted ? '#1a1a1a' : '#B8FF4F',
                    color: submitted ? '#B8FF4F' : '#0a0a0a',
                    border: submitted ? '1px solid #B8FF4F' : '1px solid transparent',
                  }}
                >
                  {!submitted && (
                    <span className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                  )}
                  <span
                    className="relative robo z-10 flex items-center justify-center gap-3 transition-colors duration-300"
                    style={{ color: submitted ? '#B8FF4F' : undefined }}
                  >
                    {!submitted && (
                      <span className="group-hover:text-[#B8FF4F] transition-colors duration-300">
                        TRANSMIT MESSAGE
                      </span>
                    )}
                    {submitted && (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        TRANSMITTED
                      </>
                    )}
                    {!submitted && (
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300 group-hover:stroke-[#B8FF4F]"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    )}
                  </span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact