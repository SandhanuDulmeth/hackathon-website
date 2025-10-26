import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = true,
  } = options

  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref: elementRef, isVisible }
}

export function useMultipleScrollAnimations(count, options = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = true,
    staggerDelay = 100,
  } = options

  const elementRefs = useRef([])
  const [visibleStates, setVisibleStates] = useState(Array(count).fill(false))

  useEffect(() => {
    const observers = []

    elementRefs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleStates((prev) => {
                  const newStates = [...prev]
                  newStates[index] = true
                  return newStates
                })
              }, index * staggerDelay)

              if (triggerOnce) {
                observer.unobserve(entry.target)
              }
            } else if (!triggerOnce) {
              setVisibleStates((prev) => {
                const newStates = [...prev]
                newStates[index] = false
                return newStates
              })
            }
          })
        },
        {
          threshold,
          rootMargin,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [count, threshold, rootMargin, triggerOnce, staggerDelay])

  const setRef = (index) => (el) => {
    elementRefs.current[index] = el
  }

  return { setRef, visibleStates }
}
