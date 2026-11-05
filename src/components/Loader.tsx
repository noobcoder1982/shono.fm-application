import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Intro loader: smooth counter counting to 100 with progress bar and upward curtain exit.
 * Driven by GSAP with support for instant skip via Escape, Enter, Space, or Skip button.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const finish = (instant = false) => {
    if (doneRef.current) return
    doneRef.current = true

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    if (!containerRef.current) {
      document.documentElement.style.overflow = ''
      onDone()
      return
    }

    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: instant ? 0.35 : 0.75,
      ease: 'power3.inOut',
      onComplete: () => {
        document.documentElement.style.overflow = ''
        onDone()
      },
    })
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const counterObj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => finish(false), 120)
      },
    })
    timelineRef.current = tl

    // Smooth counter animation
    tl.to(counterObj, {
      val: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.round(counterObj.val)
        setPct(rounded)
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${rounded / 100})`
        }
      },
    })

    const onKey = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'Escape'].includes(e.key)) {
        e.preventDefault()
        finish(true)
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Loading SHONO.FM"
      className="fixed inset-0 z-[200] grid grid-rows-[auto_1fr_auto] bg-ink text-paper will-change-transform"
    >
      <div className="label flex justify-between border-b-2 border-paper p-4 md:px-6">
        <span>SHONO.FM</span>
        <span className="hidden sm:inline">Precision Audio Archive &amp; Desktop Music Player</span>
        <span>v2.0.0</span>
      </div>

      <div className="grid place-items-center">
        <div className="relative">
          <img
            src="/shono-logo.png"
            alt="SHONO.FM"
            width={659}
            height={659}
            className="aspect-square w-[min(55vw,22rem)] drop-shadow-[0_10px_30px_rgba(255,90,0,0.15)]"
          />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 border-t-2 border-paper p-4 md:px-6">
        <div className="display text-[clamp(4.5rem,16vw,12rem)] tabular-nums leading-[0.75]" aria-live="off">
          {String(pct).padStart(3, '0')}
        </div>
        <button
          type="button"
          onClick={() => finish(true)}
          className="label border-2 border-paper px-5 py-3 transition-colors hover:bg-orange hover:text-ink"
        >
          Skip [Esc]
        </button>
      </div>

      {/* Progress line */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-paper/20">
        <div
          ref={progressBarRef}
          className="h-full origin-left bg-orange transition-none"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
    </div>
  )
}
