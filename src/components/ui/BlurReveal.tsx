import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface BlurTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  stagger?: number
  duration?: number
  delay?: number
}

/**
 * Splits text into individual words and reveals them sequentially with Gaussian blur + translation.
 */
export function BlurText({
  text,
  className = '',
  as: Component = 'span',
  stagger = 0.025,
  duration = 0.8,
  delay = 0,
}: BlurTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.blur-word')
    if (words.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          filter: 'blur(14px)',
          opacity: 0,
          y: 20,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [text, stagger, duration, delay])

  const words = text.split(' ')

  return (
    <Component ref={containerRef as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          <span className="blur-word inline-block will-change-[filter,opacity,transform]">{word}</span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  )
}

interface BlurRevealProps {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'section'
  duration?: number
  delay?: number
  y?: number
  blur?: number
  start?: string
}

/**
 * Blurs and reveals any container or element upon entering the viewport during scroll.
 */
export function BlurReveal({
  children,
  className = '',
  as: Component = 'div',
  duration = 0.9,
  delay = 0,
  y = 22,
  blur = 12,
  start = 'top 88%',
}: BlurRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          filter: `blur(${blur}px)`,
          opacity: 0,
          y,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [duration, delay, y, blur, start])

  return (
    <Component ref={ref as any} className={`will-change-[filter,opacity,transform] ${className}`}>
      {children}
    </Component>
  )
}
