/* Vite + React */
/* Hero section - transparent so Vanta Birds remain visible. 
   Implements a cyberpunk-style continuously scrolling headline with RGB split + glitch.
   Palette: cohesive cyan → fuchsia flow, glassy accents. */

import React, { useEffect, useRef, useState } from 'react'

// Inline SVG Brain Icon Component
const BrainIcon = () => (
  <svg className="w-16 h-16 md:w-20 md:h-20 text-cyan-300/90" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

export default function Hero({ onRegisterClick, id }) {
  const textRefs = useRef([])
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  const [rgbSplit, setRgbSplit] = useState(0)

  useEffect(() => {
    let animationId
    let scrollPosition = 0
    const speed = 0.8
    let glitchTimer = 0

    const animate = () => {
      scrollPosition += speed
      glitchTimer += 1

      // Random glitch burst every ~60 frames
      if (glitchTimer % 60 === 0) {
        setGlitchOffset({ x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 5 })
        setRgbSplit(Math.random() * 5)
        setTimeout(() => {
          setGlitchOffset({ x: 0, y: 0 })
          setRgbSplit(0)
        }, 100)
      }

      if (textRefs.current.length > 1) {
        const stroke1 = textRefs.current[0]
        const stroke2 = textRefs.current[1]
        if (stroke1 && stroke2) {
          const height = stroke1.offsetHeight || 80

          // subtle jitter
          const jitter1 = Math.sin(scrollPosition * 0.1) * 2
          const jitter2 = Math.cos(scrollPosition * 0.15) * 2

          // move stroke layers vertically in a loop
          stroke1.style.transform = `translate(${jitter1}px, ${scrollPosition}px)`
          const stroke2Position = scrollPosition - height
          stroke2.style.transform = `translate(${jitter2}px, ${stroke2Position}px)`

          // loop the cycle
          if (scrollPosition >= height * 2) {
            scrollPosition = 0
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id={id} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* translucent color flow overlay to unify palette without hiding birds */}

      {/* liquid blobs (very light) */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl mix-blend-screen" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl mix-blend-screen" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <BrainIcon />
        </div>

        {/* Scrolling Headline with glitch + RGB split */}
        <div className="overflow-hidden h-28 md:h-36 w-full mb-3 flex items-center justify-center relative">
          <div className="relative w-full text-center">
            {/* RGB Split Layers */}
            <div
              className="text-5xl md:text-7xl font-black leading-tight py-1 absolute inset-0 mix-blend-screen text-cyan-400/80 pointer-events-none"
              style={{ transform: `translate(${rgbSplit}px, 0px)` }}
            >
              UCSC IntelliHack 2026
            </div>
            <div
              className="text-5xl md:text-7xl font-black leading-tight py-1 absolute inset-0 mix-blend-screen text-fuchsia-400/80 pointer-events-none"
              style={{ transform: `translate(${-rgbSplit}px, 0px)` }}
            >
              UCSC IntelliHack 2026
            </div>

            {/* Stroke layers that vertically scroll and loop */}
            <div
              ref={(el) => (textRefs.current[0] = el)}
              className="text-5xl md:text-7xl font-black leading-tight py-1 absolute inset-0"
              style={{
                transform: 'translate(0px, 0px)',
                WebkitTextStroke: '2px rgba(34,211,238,0.9)', // cyan-400
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 18px rgba(34,211,238,0.6)'
              }}
            >
              UCSC IntelliHack 2026
            </div>
            <div
              ref={(el) => (textRefs.current[1] = el)}
              className="text-5xl md:text-7xl font-black leading-tight py-1 absolute inset-0"
              style={{
                transform: 'translate(0px, 0px)',
                WebkitTextStroke: '2px rgba(217,70,239,0.9)', // fuchsia-500
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 18px rgba(217,70,239,0.5)'
              }}
            >
              UCSC IntelliHack 2026
            </div>

            {/* Filled glow layer */}
            <div
              className="text-5xl md:text-7xl font-black leading-tight py-1 text-white relative"
              style={{
                transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
                textShadow:
                  '0 0 24px rgba(255,255,255,0.8), 0 0 48px rgba(34,211,238,0.5), 0 0 72px rgba(217,70,239,0.45)'
              }}
            >
              UCSC IntelliHack 2026
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-2xl text-cyan-200/90 mb-6 font-light drop-shadow">
          Artificial. But Intelligent.
        </p>

        {/* Date and Details */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-12 text-white text-base md:text-lg">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
            <span>March 15-16, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-fuchsia-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>48-Hour Innovation Sprint</span>
          </div>
        </div>

        {/* CTA Button - glassy cyan */}
        <button
          onClick={onRegisterClick}
          className="relative group bg-white/5 backdrop-blur border border-cyan-300/50 text-cyan-200 font-semibold py-3 px-8 text-lg md:text-xl rounded-xl overflow-hidden hover:text-black transition-colors"
        >
          <span className="relative z-10">Join the Hackathon</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-fuchsia-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-xl"></div>
        </button>

        {/* Subtle scan line overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 h-2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[scan_3s_linear_infinite]"></div>
        </div>
      </div>

      {/* Inline keyframes for scan animation to keep file self-contained */}
      <style>{`
        @keyframes scan { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
      `}</style>
    </section>
  )
}
