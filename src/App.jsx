/* Vite + React */
/* Main App component - orchestrates Hero, About, and Registration sections */

import React, { useRef } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Registration from './components/Registration'

export default function App() {
  // Reference to registration section for smooth scroll
  const registrationRef = useRef(null)

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IH</span>
            </div>
            <span className="font-bold text-lg text-gray-900">IntelliHack</span>
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
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 UCSC IntelliHack. Organized by IEEE Computer Society UCSC.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Artificial. But Intelligent.
          </p>
        </div>
      </footer>
    </div>
  )
}
