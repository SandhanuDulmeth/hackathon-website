/* Vite + React */
/* About section - two-column layout with highlights and event details card */

import React from 'react'
import { useScrollAnimation, useMultipleScrollAnimations } from '../hooks/useScrollAnimation'

// Inline SVG Icons
const LightbulbIcon = () => (
  <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-20C5.9 1 3 3.9 3 7c0 2.46 1.45 4.6 3.54 5.68.09.48.23.94.4 1.42-.16.5-.26 1.02-.26 1.56 0 3.59 2.24 6.69 5.5 8.08.26.12.54.12.8 0 3.26-1.39 5.5-4.49 5.5-8.08 0-.54-.1-1.06-.26-1.56.17-.48.31-.94.4-1.42C19.55 11.6 21 9.46 21 7c0-3.1-2.9-6-6-6zm0 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
)

const NetworkIcon = () => (
  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
)

const TrophyIcon = () => (
  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1h2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h2V7c0-1.1-.9-2-2-2zm-2 14H7V8h10v11zm-6-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L6.6 6 0 12l6.6 6 2.8-2.4zm5.2 0l4.6-4.6-4.6-4.6 2.8-2.8L24 12l-6.6 6 2.8 2.4z" />
  </svg>
)

export default function About({ id }) {
  const headerAnimation = useScrollAnimation({ threshold: 0.2 })
  const leftColumnAnimation = useScrollAnimation({ threshold: 0.2 })
  const cardAnimations = useMultipleScrollAnimations(4, { threshold: 0.2, staggerDelay: 100 })
  const detailsCardAnimation = useScrollAnimation({ threshold: 0.2 })

  const highlights = [
    {
      icon: <LightbulbIcon />,
      title: 'Innovation First',
      description: 'Build cutting-edge AI and intelligent solutions that push boundaries.',
    },
    {
      icon: <NetworkIcon />,
      title: 'Collaborate & Connect',
      description: 'Network with talented developers, designers, and tech enthusiasts.',
    },
    {
      icon: <TrophyIcon />,
      title: 'Win Big',
      description: 'Compete for prizes, recognition, and opportunities with top companies.',
    },
    {
      icon: <CodeIcon />,
      title: 'Learn & Grow',
      description: 'Gain hands-on experience with the latest technologies and frameworks.',
    },
  ]

  return (
    <section id={id} className="w-full py-20 md:py-32 bg-gradient-to-b from-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 scroll-animate ${headerAnimation.isVisible ? 'scroll-animate-visible' : ''}`}
        >
          <h2 className="section-title">About IntelliHack 2026</h2>
          <p className="section-subtitle">
            A 48-hour innovation sprint where artificial intelligence meets human creativity.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Description */}
          <div
            ref={leftColumnAnimation.ref}
            className={`scroll-animate ${leftColumnAnimation.isVisible ? 'scroll-animate-visible' : ''}`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What is IntelliHack?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              IntelliHack is UCSC's premier hackathon event, bringing together the brightest minds to solve real-world problems using artificial intelligence and intelligent systems. Over 48 hours, teams collaborate to build innovative projects, learn from industry experts, and compete for exciting prizes.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">✓</span>
                <span className="text-gray-700"><strong>Open to all skill levels</strong> - Beginners to experts welcome</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">✓</span>
                <span className="text-gray-700"><strong>Free to participate</strong> - Meals and refreshments provided</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-xl mt-1">✓</span>
                <span className="text-gray-700"><strong>Mentorship available</strong> - Industry professionals on-site</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                ref={cardAnimations.setRef(index)}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 scroll-animate-fast ${cardAnimations.visibleStates[index] ? 'scroll-animate-visible' : ''}`}
              >
                <div className="mb-4">{highlight.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h4>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details Card */}
        <div
          id="prizes"
          ref={detailsCardAnimation.ref}
          className={`bg-gradient-to-r from-blue-50 to-red-50 border-2 border-blue-200 rounded-2xl p-8 md:p-12 scroll-animate-slow ${detailsCardAnimation.isVisible ? 'scroll-animate-visible' : ''}`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">48</div>
              <p className="text-gray-700 font-semibold">Hours to Create</p>
              <p className="text-gray-600 text-sm">Non-stop innovation and collaboration</p>
            </div>
            <div className="text-center border-l border-r border-gray-300">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <p className="text-gray-700 font-semibold">Expected Participants</p>
              <p className="text-gray-600 text-sm">From UCSC and partner institutions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-500 mb-2">$10K+</div>
              <p className="text-gray-700 font-semibold">In Prizes</p>
              <p className="text-gray-600 text-sm">For winning teams and categories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
