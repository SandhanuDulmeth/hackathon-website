/* Vite + React */
/* Main App component - orchestrates Hero, About, and Registration sections */
/* Initializes Vanta Birds effect on full-page background */

import React, { useRef, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Registration from './components/Registration'
import IntelliHackLogo from './images/intelliHack5.0.png'
import IEEECSLogo from './images/IEEECSLogo.png'

export default function App() {
  // Reference to registration section for smooth scroll
  const registrationRef = useRef(null)
  const vantaInstance = useRef(null)

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

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full ">
      {/* Color wash overlay between Vanta and content */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10"></div>
      {/* Navigation Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
          <img
            src={IntelliHackLogo}
            alt="IntelliHack logo"
            className="h-10 w-auto object-contain drop-shadow-md cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onError={(e)=>{e.currentTarget.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2212%22 fill=%22%231e40af%22/><text x=%2232%22 y=%2238%22 font-size=%2224%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial,Helvetica,sans-serif%22>IH</text></svg>';}}
            />
          </div>
          <button
            onClick={scrollToRegistration}
            className="btn-primary text-sm"
          >
            Register Now
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Hero onRegisterClick={scrollToRegistration} />
        <About />
        <div ref={registrationRef}>
          <Registration />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 text-white/90 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/70">
                © 2026 UCSC IntelliHack. Organized by IEEE Computer Society UCSC.
              </p>
              <p className="text-white/60 text-sm mt-2">
                Artificial. But Intelligent.
              </p>
            </div>
            <img
              src={IEEECSLogo}
              alt="Organizer logo"
              className="h-10 w-auto object-contain drop-shadow-md"
              onError={(e)=>{e.currentTarget.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 40%22><rect width=%22160%22 height=%2240%22 rx=%228%22 fill=%22000000%22 fill-opacity=%220.5%22/><text x=%2280%22 y=%2226%22 font-size=%2216%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Arial,Helvetica,sans-serif%22>UCSC IEEE</text></svg>';}}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
