import { useEffect, useRef, useState } from 'react'

const KEY = 'shono:intro-seen'
export const introSeen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const MIN_MS = 1100

/**
 * Intro: a counter that waits on real assets (fonts, logo, first screenshot), then the screen lifts away.
 * Skippable by click, Enter, Space or Escape. Shown once per session.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    try {
      sessionStorage.setItem('shono:intro-seen', '1')
    } catch {
      /* storage unavailable: the intro simply replays next visit */
    }
    setLeaving(true)
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    let ready = false
    const load = (src: string) =>
      new Promise<void>((r) => {
        const i = new Image()
        i.onload = i.onerror = () => r()
        i.src = src
      })
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => undefined)
    Promise.race([Promise.all([load('/shono-logo.png'), load('/app/shot-a.webp'), fonts]), new Promise((r) => setTimeout(r, 4000))]).then(() => (ready = true))

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / MIN_MS)
      const v = Math.min(ready ? 100 : 96, Math.round(t * 100))
      setPct(v)
      if (v >= 100) {
        setTimeout(finish, 150)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onKey = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'Escape'].includes(e.key)) {
        e.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      role="dialog"
      aria-label="Loading SHONO.FM"
      className="fixed inset-0 z-[200] grid grid-rows-[auto_1fr_auto] bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]"
      style={{ transform: leaving ? 'translateY(-100%)' : 'none' }}
      onTransitionEnd={() => leaving && onDone()}
    >
      <div className="label flex justify-between border-b-2 border-paper p-4 md:px-6">
        <span>SHONO.FM</span>
        <span>Precision Audio Archive &amp; Desktop Music Player</span>
        <span>v2.0.0</span>
      </div>
      <div className="grid place-items-center">
        <img src="/shono-logo.png" alt="" width={659} height={659} className="aspect-square w-[min(60vw,24rem)]" />
      </div>
      <div className="flex items-end justify-between gap-4 border-t-2 border-paper p-4 md:px-6">
        <div className="display text-[clamp(5rem,18vw,14rem)] tabular-nums leading-[0.75]" aria-live="off">
          {String(pct).padStart(3, '0')}
        </div>
        <button type="button" onClick={finish} className="label border-2 border-paper px-5 py-3 hover:bg-orange hover:text-ink">
          Skip [Esc]
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-paper/20">
        <div className="h-full origin-left bg-orange" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  )
}
