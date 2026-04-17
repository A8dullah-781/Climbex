import React, { useState } from 'react'

const faqs = [
  {
    q: "WHAT IS THE AVERAGE BUILD TIME?",
    a: "Most projects are delivered within 2–4 weeks depending on scope. Launch Pad projects typically ship in 10–14 days. Elite Builds with custom functionality may take 3–6 weeks. You'll always get a clear timeline before we start."
  },
  {
    q: "DO YOU OFFER POST-LAUNCH MAINTENANCE?",
    a: "Yes. We offer ongoing retainer packages for clients who need continuous updates, performance monitoring, and feature additions. Think of us as your long-term engineering partner, not just a one-time vendor."
  },
  {
    q: "WHAT TECHNOLOGIES DO YOU USE?",
    a: "We build primarily with React, Next.js, Tailwind CSS, and Node.js. For backends we use Supabase, Firebase, or custom REST APIs. Every stack decision is made based on what will perform best for your specific project."
  },
  {
    q: "HOW DO I GET STARTED?",
    a: "Book a free discovery call. We'll understand your goals, walk you through the process, and propose the right engagement. No sales pressure — just clarity on whether we're the right fit for each other."
  },
  {
    q: "DO YOU WORK WITH STARTUPS OR ONLY ESTABLISHED BUSINESSES?",
    a: "Both. Our Launch Pad plan is built for founders and early-stage startups who need to move fast. Our Elite Build is for established businesses that need a premium digital presence. We meet you where you are."
  },
  {
    q: "WILL MY WEBSITE BE MOBILE RESPONSIVE?",
    a: "100%. Every single thing we build is fully responsive across all devices and screen sizes. We test on mobile, tablet, and desktop before any delivery — it's non-negotiable for us."
  },
  {
    q: "CAN I SEE EXAMPLES OF YOUR PREVIOUS WORK?",
    a: "Absolutely. We have a curated portfolio of live projects across industries. Book a call and we'll walk you through case studies relevant to your niche so you can see exactly what to expect."
  },
  {
    q: "WHAT IF I ALREADY HAVE A WEBSITE AND JUST NEED A REDESIGN?",
    a: "That's one of our most common engagements. We audit your existing site, identify what's costing you conversions, and rebuild it with precision. Old brand, new performance."
  },
  {
    q: "DO YOU HANDLE SEO AND PERFORMANCE OPTIMIZATION?",
    a: "Yes. Every project ships with clean semantic HTML, optimized assets, fast load times, and proper meta structure. For deeper SEO strategy and content, we offer that as an add-on service."
  },
  {
    q: "HOW MUCH INPUT DO I HAVE DURING THE PROCESS?",
    a: "A lot. We run collaborative checkpoints at design, development, and pre-launch stages. You're never in the dark — you'll always know exactly where we are and have the chance to give feedback."
  },
  {
    q: "WHAT MAKES DEVHOLIX DIFFERENT FROM OTHER AGENCIES?",
    a: "We don't use templates, generic layouts, or recycled code. Every project is engineered from scratch with a focus on speed, design quality, and conversion. We treat your business like it's our own."
  },
  {
    q: "HOW DO PAYMENTS WORK?",
    a: "We typically split projects into two milestones: 50% upfront to begin, 50% on delivery. For larger Elite Builds, we can arrange a three-stage payment schedule. Everything is transparent — no hidden fees."
  },
]

const Faqs = () => {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <div className="w-full py-16 md:py-24 flex flex-col items-center">

      {/* Header */}
      <div className="text-center mb-10 md:mb-14 w-[80%]">
        <p className="txtgreen robo tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-3">
          Knowledge Base
        </p>
        <h2 className="txtwhite fontone font-black uppercase text-4xl sm:text-5xl md:text-[4.5vw] leading-none">
          Inquiry Archive
        </h2>
        <p className="txtgray robo text-sm mt-4 max-w-md mx-auto leading-relaxed">
          Everything you need to know before we build something great together.
        </p>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-3 w-[80%]">
        {faqs.map((faq, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className={`rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
              open === i
                ? 'bg-[#1e1e1e] border-[#B8FF4F]/30'
                : 'bg-[#181818] border-[#2a2a2a] hover:border-[#3a3a3a]'
            }`}
          >
            {/* Question Row */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 gap-4">
              <span className="txtwhite fontone font-black uppercase text-xs sm:text-sm tracking-wide leading-snug">
                {faq.q}
              </span>

              {/* Icon — perfectly centered with flex */}
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  open === i
                    ? 'bg-[#B8FF4F] border-[#B8FF4F] rotate-45'
                    : 'border-[#3a3a3a] rotate-0'
                }`}
              >
                <span
                  className={`text-md -mt-1 font-light leading-none ${
                    open === i ? 'text-[#0f0f0f]' : 'text-white'
                  }`}
                  style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  +
                </span>
              </div>
            </div>

            {/* Answer */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                open === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 sm:px-7 pb-5 sm:pb-6">
                <div className="w-full h-[1px] bg-[#2a2a2a] mb-4" />
                <p className="txtgray robo text-md leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* CTA Block */}
      <div className="mt-14 md:mt-20 w-[80%] bg-[#B8FF4F] rounded-3xl px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div>
          <p className="text-black robo uppercase tracking-[0.2em] text-[16px] mb-2">
            Still have questions?
          </p>
          <h3 className="text-[#0f0f0f] fontone font-black uppercase text-2xl sm:text-3xl leading-tight">
            Let's talk it through.
          </h3>
          <p className="text-[#3a3a3a] robo text-xs sm:text-sm mt-2 max-w-xs leading-relaxed">
            No pitch. No pressure. Just a real conversation about your project.
          </p>
        </div>
        <button className="flex-shrink-0 bg-[#0f0f0f] text-[#B8FF4F] fontone font-black uppercase tracking-widest text-xs sm:text-sm px-8 sm:px-10 py-4 rounded-full hover:bg-[#1a1a1a] transition-colors duration-300 whitespace-nowrap w-full sm:w-auto">
          Book a Free Call 
        </button>
      </div>

    </div>
  )
}

export default Faqs