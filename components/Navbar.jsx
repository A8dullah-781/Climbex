import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null)

  const links = ['Work', 'Services', 'Process', 'About']

  const navRef = useRef(null)
  const lastScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (!navRef.current) return

      if (currentScroll > lastScroll.current && currentScroll > 50) {
        gsap.to(navRef.current, {
          y: '-100%',
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        gsap.to(navRef.current, {
          y: '0%',
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      lastScroll.current = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={navRef}
      className='h-[10vh] fixed top-0 left-0 w-screen z-50 px-[2vw] flex flex-row justify-between items-center'
    >
      <div className='text-white font-bold text-[1.3vw] cursor-default fontone'>
        Devholix
      </div>

      <div className='uppercase text-[1vw] flex flex-row justify-center items-center gap-10 robo'>
        {links.map((link) => (
          <div
            key={link}
            onClick={() => setActiveLink(link)}
            style={{ position: 'relative', paddingBottom: '4px', cursor: 'pointer' }}
            className={activeLink === link ? 'text-[#D2FF9A]' : 'txtgray'}
          >
            {link}

            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '1px',
                background: '#D2FF9A',
                width: activeLink === link ? '100%' : '0%',
                transition: 'width 0.3s ease-out',
              }}
            />
          </div>
        ))}
      </div>

      <div className='txtdgray cursor-pointer robo text-[1vw] rounded-3xl px-5 py-1 mt-1 bgwhite'>
        START PROJECT
      </div>
    </div>
  )
}

export default Navbar