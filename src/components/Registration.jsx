/* Vite + React */
/* Registration section - client-side form with validation, checkboxes, and success state */

import React, { useState, useRef, useEffect } from 'react'

// Inline SVG Check Icon
const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
)

export default function Registration() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    teamSize: '1',
    interests: [],
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    // IntersectionObserver for entrance animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const interestOptions = [
    'Machine Learning',
    'Web Development',
    'Mobile Apps',
    'Data Science',
    'Cloud Computing',
    'Cybersecurity',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required'
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate successful submission
      console.log('Form submitted:', formData)
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          institution: '',
          teamSize: '1',
          interests: [],
        })
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 md:py-32 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="section-title">Register for IntelliHack 2026</h2>
          <p className="section-subtitle">
            Join us for an unforgettable 48-hour innovation experience
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className={`mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-xl transition-all duration-500 transform ${submitted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="flex items-center gap-4">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-bold text-green-700">Registration Successful!</h3>
                <p className="text-green-600">
                  Thank you for registering, {formData.name}! Check your email for confirmation details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className={`bg-gray-50 p-8 md:p-12 rounded-2xl shadow-lg transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Name Field */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Institution Field */}
            <div className="mb-6">
              <label htmlFor="institution" className="block text-sm font-semibold text-gray-900 mb-2">
                Institution *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="UCSC / Your University"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.institution ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.institution && <p className="text-red-600 text-sm mt-1">{errors.institution}</p>}
            </div>

            {/* Team Size Field */}
            <div className="mb-6">
              <label htmlFor="teamSize" className="block text-sm font-semibold text-gray-900 mb-2">
                Team Size
              </label>
              <select
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
              >
                <option value="1">Solo (1 person)</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5+ people</option>
              </select>
            </div>

            {/* Interests Checkboxes */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Areas of Interest * (Select at least one)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interestOptions.map(interest => (
                  <label key={interest} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className="text-red-600 text-sm mt-2">{errors.interests}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary text-lg font-semibold"
            >
              Complete Registration
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              By registering, you agree to our terms and conditions.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
