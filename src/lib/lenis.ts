import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}

  // Clean up any existing instance
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.25,
  })

  lenisInstance = lenis

  // Synchronize ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update)

  const rafCallback = (time: number) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(rafCallback)
  gsap.ticker.lagSmoothing(0)

  // Smooth scroll interceptor for hash links
  const handleAnchorClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a')
    if (!a) return

    const href = a.getAttribute('href')
    if (href && href.startsWith('#') && href.length > 1) {
      const targetEl = document.querySelector(href)
      if (targetEl) {
        e.preventDefault()
        lenis.scrollTo(targetEl as HTMLElement, { offset: -56, duration: 1.2 })
      }
    }
  }

  document.addEventListener('click', handleAnchorClick)

  return () => {
    document.removeEventListener('click', handleAnchorClick)
    gsap.ticker.remove(rafCallback)
    lenis.destroy()
    lenisInstance = null
  }
}

export function useSmoothScroll(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return
    const cleanup = initSmoothScroll()
    return cleanup
  }, [enabled])
}
