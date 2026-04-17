import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 10000)
  }

  return (
    <section className=" min-h-[80vh] w-full flex items-center py-16" style={{ paddingLeft: '7.5vw', paddingRight: '7.5vw' }}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <h2
            className="fontone uppercase text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight"
          >
            Signal Intent.
          </h2>

          <p className="fontone text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
            Submit your parameters. We will analyze your requirements and respond within 24 hours.
          </p>

          <div className="flex flex-col gap-4 mt-2">
            {/* Email */}
            <a
              href="mailto:ops@devholix.com"
              className="flex items-center gap-4 group w-fit"
            >
              <div className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-[#c8f135] transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 group-hover:text-[#c8f135] transition-colors duration-300">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span className="robo text-gray-300 text-sm tracking-widest group-hover:text-white transition-colors duration-300">
                ABDULLAH@DEVHOLIX.COM
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+923104993978"
              className="flex items-center gap-4 group w-fit"
            >
              <div className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-[#c8f135] transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 group-hover:text-[#c8f135] transition-colors duration-300">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <span className="robo text-gray-300 text-sm tracking-widest group-hover:text-white transition-colors duration-300">
                +92 310 4993978
              </span>
            </a>
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name + Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="robo text-gray-500 text-[15px] tracking-widest">IDENTITY</label>
                <input
                  type="text"
                  name="name"
                  placeholder="NAME_REQUIRED"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="robo bg-black border border-gray-800 text-white text-sm placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors duration-200 w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="robo text-gray-500 text-[15px] tracking-widest">ACCESS POINT</label>
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL_REQUIRED"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="robo bg-black border border-gray-800 text-white text-sm placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors duration-200 w-full"
                />
              </div>
            </div>

            {/* Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="robo text-gray-500 text-[15px] tracking-widest">SUBJECT</label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="robo bg-black border border-gray-800 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors duration-200 w-full appearance-none cursor-pointer"
                  style={{ color: formData.subject ? 'white' : '#4b5563' }}
                >
                  <option value="" disabled className="text-gray-600">DESCRIBE_PATH</option>
                  <option value="launchpad" className="text-white bg-black">Launch Pad</option>
                  <option value="elitebuild" className="text-white bg-black">Elite Build</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-1">
              <label className="robo text-gray-500 text-[15px] tracking-widest">TRANSMISSION</label>
              <textarea
                name="message"
                placeholder="DESCRIBE_PARAMETERS"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="robo bg-black border border-gray-800 text-white text-sm placeholder-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors duration-200 w-full resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="robo w-full bg-[#B8FF4F] text-black font-bold text-sm tracking-widest py-4 rounded-lg hover:bg-[#d4f550] active:scale-[0.98] transition-all duration-400 mt-1"
            >
              {submitted ? 'TRANSMITTED ✓' : 'TRANSMIT MESSAGE'}
            </button>

          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact