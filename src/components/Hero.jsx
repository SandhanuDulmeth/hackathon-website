/* Vite + React */
/* Hero section - energetic gradient background, headline, date, tagline, and CTA button */

import React, { useEffect, useRef, useState } from 'react'

// Inline SVG Brain Icon Component
const BrainIcon = () => (
  <svg className="w-24 h-24 md:w-32 md:h-32 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

export default function Hero({ onRegisterClick }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger content animation on mount
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Liquid-glass blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <BrainIcon />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          UCSC IntelliHack 2026
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white mb-2 font-light drop-shadow-md">
          Artificial. But Intelligent.
        </p>

        {/* Date and Details */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-12 text-white text-lg">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
            <span>March 15-16, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>48-Hour Innovation Sprint</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onRegisterClick}
          className="btn-primary text-lg md:text-xl mb-8 inline-block"
        >
          Join the Hackathon
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
