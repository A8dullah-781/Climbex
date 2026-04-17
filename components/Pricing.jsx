import React from 'react'

const Pricing = () => {
  return (
    <div className="w-screen px-[7.5vw] py-20 ">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="txtgreen robo tracking-[0.3em] mt-8 uppercase text-xs mb-3">
          Tiered Engagement
        </p>
        <h2 className="txtwhite fontone font-black uppercase text-[5vw] pb-6 leading-none">
          Select Your Path
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col justify-center items-center gap-10 md:flex-row gap-5 w-full">

        {/* Launch Pad */}
        <div className="flex flex-col justify-between bg-[#201F1F] rounded-3xl p-8 md:p-10 w-full md:w-1/3 min-h-[480px]">

          <div>
            <h3 className="txtwhite fontone font-black uppercase text-[3.5vw] md:text-[1.8vw] leading-none">
              Launch Pad
            </h3>
            <p className="txtgray robo text-[1.1vw] mt-1">
              Everything you need to launch
            </p>

            <p className="txtwhite fontone font-black text-[5vw] md:text-[3vw] mt-6 leading-none">
              From $999
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                'Built to get you online, not stuck in drafts',
                'Sharp design that actually converts',
                "Speed that doesn't kill your visitors",
                'Everything ready. Just hit launch',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="txtgreen text-lg leading-none">✓</span>
                  <span className="text-[#a0a0a0] robo text-[1vw] md:text-[0.85vw]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-10 w-full bg-white text-black fontone font-black uppercase tracking-widest text-sm py-4 rounded-full hover:bg-[#B8FF4F] transition-colors duration-300">
            Launch Now
          </button>

        </div>

        {/* Elite Build */}
        <div className="relative flex flex-col justify-between bg-[#D2FF9A]  rounded-3xl p-8 md:p-10 w-full md:w-1/3 min-h-[480px]">

          {/* Retainer Badge */}
          <span className="absolute top-5 right-5 bg-[#3D6500] text-[#B8FF4F] robo text-[0.6vw] uppercase px-3 py-2 rounded-lg robo">
            Retainer
          </span>

          <div>
            <h3 className="text-[#1a1a1a] fontone font-black uppercase text-[3.5vw] md:text-[1.8vw] leading-none">
              Elite Build
            </h3>
            <p className="text-[#3a3a3a] robo text-[1.1vw] mt-1">
              High-end builds for high-value businesses
            </p>

            <p className="text-[#1a1a1a] fontone font-black text-[5vw] md:text-[3vw] mt-6 leading-none">
              Custom Pricing
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                'Crafted from scratch, not recycled templates',
                'Every detail designed to dominate your niche',
                'Performance that scales with your ambition',
                'You imagine it. We engineer it',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[#1a1a1a] text-lg leading-none">✓</span>
                  <span className="text-[#2a2a2a] robo text-[1vw] md:text-[0.85vw]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-10 w-full bg-[#3D6500] text-[#B8FF4F] fontone font-black uppercase tracking-widest text-sm py-4 rounded-full hover:bg-[#0f0f0f] transition-colors duration-300">
            Book a Free Call
          </button>

        </div>

      </div>
    </div>
  )
}

export default Pricing