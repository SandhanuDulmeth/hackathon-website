/* Vite + React */
/* Main App component - orchestrates Hero, About, and Registration sections */
/* Initializes Vanta Birds effect on full-page background */

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Registration from './components/Registration'
import IntelliHackLogo from './images/intelliHack5.0.png'
import IEEECSLogo from './images/IEEECSLogo.png'

export default function App() {
  const vantaInstance = useRef(null)
  const headerRef = useRef(null)
  const navContainerRef = useRef(null)
  const navItemRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [indicator, setIndicator] = useState({ width: 0, left: 0 })

  // Shared nav configuration for bubble indicator + smooth scroll targeting
  const navItems = useMemo(() => (
    [
      { label: 'Competition', target: 'competition' },
      { label: 'Timeline', target: 'timeline' },
      { label: 'Prizes', target: 'prizes' },
      { label: 'FAQ', target: 'faq' },
      { label: 'Register Now', target: 'register' },
      { label: 'Sponsors', target: 'sponsors' },
    ]
  ), [])

  // Lightweight FAQ copy to align with new navigation anchor
  const faqs = useMemo(() => (
    [
      {
        question: 'Who can participate in IntelliHack?',
        answer: 'The hackathon welcomes undergraduates, postgraduates, and industry enthusiasts. You can join solo or assemble a team ahead of the event.',
      },
      {
        question: 'How large can a team be?',
        answer: 'Teams can have up to five members. We also host a team formation mixer on day one to help solo hackers find collaborators.',
      },
      {
        question: 'What should we bring on-site?',
        answer: 'Bring your laptop, chargers, and any specialized hardware you plan to prototype with. We’ll provide meals, snacks, and overnight lounge space.',
      },
    ]
  ), [])

  const sponsors = useMemo(() => (
    [
      { name: 'Sponsor 1', logo: 'https://via.placeholder.com/100x50?text=Sponsor+1' },
      { name: 'Sponsor 2', logo: 'https://via.placeholder.com/100x50?text=Sponsor+2' },
      { name: 'Sponsor 3', logo: 'https://via.placeholder.com/100x50?text=Sponsor+3' },
      { name: 'Sponsor 4', logo: 'https://via.placeholder.com/100x50?text=Sponsor+4' },
    ]
  ), [])

  const updateIndicator = useCallback((index) => {
    const item = navItemRefs.current[index]
    if (!item || !navContainerRef.current) return
    const { offsetLeft, offsetWidth } = item
    setIndicator({ left: offsetLeft, width: offsetWidth })
  }, [])

  const scrollToTarget = useCallback((target) => {
    const element = document.getElementById(target)
    if (!element) return

    const headerHeight = headerRef.current?.offsetHeight ?? 88
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = Math.max(elementTop - headerHeight - 12, 0)

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }, [])

  const handleNavClick = useCallback((item, index) => {
    setActiveIndex(index)
    updateIndicator(index)
    scrollToTarget(item.target)
  }, [scrollToTarget, updateIndicator])

  const scrollToRegistration = useCallback(() => {
    const registerIndex = navItems.findIndex(item => item.target === 'register')
    if (registerIndex >= 0) {
      setActiveIndex(registerIndex)
      updateIndicator(registerIndex)
    }
    scrollToTarget('register')
  }, [navItems, scrollToTarget, updateIndicator])

  useEffect(() => {
    requestAnimationFrame(() => updateIndicator(activeIndex))
  }, [activeIndex, updateIndicator])

  useEffect(() => {
    const handleResize = () => updateIndicator(activeIndex)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex, updateIndicator])

  useEffect(() => {
    const onScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 88
      const scrollPos = window.scrollY + headerHeight + 24

      // If we're at (or very near) the bottom, force "Sponsors" active
      const doc = document.documentElement
      const nearBottom = window.innerHeight + window.scrollY >= (doc.scrollHeight - 2)
      if (nearBottom) {
        const lastIndex = navItems.length - 1
        if (activeIndex !== lastIndex) {
          setActiveIndex(lastIndex)
          updateIndicator(lastIndex)
        }
        return
      }

      let currentIndex = 0
      for (let i = 0; i < navItems.length; i++) {
        const el = document.getElementById(navItems[i].target)
        if (!el) continue
        const top = el.offsetTop
        if (scrollPos >= top) {
          currentIndex = i
        } else {
          break
        }
      }

      if (currentIndex !== activeIndex) {
        setActiveIndex(currentIndex)
        updateIndicator(currentIndex)
      }
    }

    // Initial run to set correct active on load/refresh
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navItems, activeIndex, updateIndicator])

  // Initialize Vanta Birds on full-page background
  useEffect(() => {
    const initVanta = () => {
      if (typeof window.VANTA !== 'undefined' && typeof window.VANTA.BIRDS === 'function') {
        const bgElement = document.getElementById('my-background')
        if (bgElement && !vantaInstance.current) {
          try {
            vantaInstance.current = window.VANTA.BIRDS({
              el: bgElement,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              backgroundAlpha: 1.0,
              color1: 0x1e40af, // Tailwind blue-800
              color2: 0xdc2626, // Tailwind red-600
              birdSize: 1.2,
              wingSpan: 25.0,
              separation: 40.0,
              cohesion: 20.0,
              quantity: 3.0,
            })
            console.log('Vanta Birds initialized on full page')
          } catch (e) {
            console.warn('Vanta init error:', e)
          }
        }
      }
    }

    // Retry loop: scripts load with defer, may not be ready on first mount
    const id = setInterval(() => {
      if (typeof window.VANTA !== 'undefined' && typeof window.VANTA.BIRDS === 'function') {
        initVanta()
        clearInterval(id)
      }
    }, 50)

    return () => {
      clearInterval(id)
      if (vantaInstance.current && typeof vantaInstance.current.destroy === 'function') {
        vantaInstance.current.destroy()
        vantaInstance.current = null
      }
    }
  }, [])
  return (
    <div className="w-full">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-cyan-500/30 via-fuchsia-500/30 to-amber-500/30 scale-125" />

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur border-b border-white/20 shadow-lg z-50"
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-6 lg:px-8 py-4"
          aria-label="Primary"
        >
          <div className="flex items-center gap-3">
            <img
              src={IntelliHackLogo}
              alt="IntelliHack logo"
              className="h-12 w-auto cursor-pointer object-contain drop-shadow-md"
              onClick={() => {
                setActiveIndex(0)
                updateIndicator(0)
                scrollToTarget('competition')
              }}
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2212%22 fill=%22%231e40af%22/><text x=%2232%22 y=%2238%22 font-size=%2224%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial,Helvetica,sans-serif%22>IH</text></svg>'
              }}
            />
          </div>

          <div ref={navContainerRef} className="bubble-nav">
            <div
              className="bubble-nav-indicator"
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.width ? 1 : 0,
              }}
            />
            {navItems.map((item, index) => (
              <button
                key={item.target}
                ref={(el) => {
                  navItemRefs.current[index] = el
                }}
                type="button"
                className={`bubble-nav-item ${activeIndex === index ? 'bubble-nav-item-active' : ''}`}
                onClick={() => handleNavClick(item, index)}
                aria-pressed={activeIndex === index}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="pt-24 mb-20">
        <Hero id="competition" onRegisterClick={scrollToRegistration} />
        <About id="timeline" />

        <section id="faq" className="relative w-full py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title text-white">Frequently Asked Questions</h2>
              <p className="section-subtitle text-white/70">
                A quick rundown of the essentials before you arrive on-site.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="faq-card">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Registration id="register" />
      </main>

            <footer
        id="sponsors"
        className="bg-black/40 backdrop-blur-xl border-t border-white/10 text-white/90 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Our Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className="sponsor-card">
                  <img src={sponsor.logo} alt={sponsor.name} className="w-full h-12 object-contain" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/70">
                © 2026 UCSC IntelliHack. Organized by IEEE Computer Society UCSC.
              </p>
              <p className="mt-2 text-sm text-white/60">
                Artificial. But Intelligent.
              </p>
            </div>
            <img
              src={IEEECSLogo}
              alt="Organizer logo"
              className="h-16 w-auto object-contain drop-shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 40%22><rect width=%22160%22 height=%2240%22 rx=%228%22 fill=%22000000%22 fill-opacity=%220.5%22/><text x=%2280%22 y=%2226%22 font-size=%2216%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial,Helvetica,sans-serif%22>UCSC IEEE</text></svg>'
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
