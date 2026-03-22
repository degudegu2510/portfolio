import { useEffect, useRef, useState } from "react"

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return { ref, isInView }
}
