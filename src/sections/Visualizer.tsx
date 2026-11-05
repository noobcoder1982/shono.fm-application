import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, Upload, Square } from 'lucide-react'
import { engine } from '@/lib/engine'
import { useEngine } from '@/lib/hooks'
import { Section } from '@/components/ui/Section'

type Mode = 'spectrum' | 'radial' | 'scope'
const MODES: { id: Mode; label: string }[] = [
  { id: 'spectrum', label: 'Spectrum' },
  { id: 'radial', label: 'Radial' },
  { id: 'scope', label: 'Scope' },
]
const ORANGE = '#ff5a00'
const PAPER = '#ecebe5'

/** 06 — Canvas visualizations driven by Web Audio analysis of a file you choose, or a generated demo tone. */
export function Visualizer() {
  const [mode, setMode] = useState<Mode>('spectrum')
  const st = useEngine()
  const canvas = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef(mode)
  modeRef.current = mode
  const bands = useMemo(() => new Float32Array(64), [])
  const smooth = useMemo(() => new Float32Array(64), [])
  const peaks = useMemo(() => new Float32Array(64), [])
  const wave = useMemo(() => new Float32Array(512), [])
  const file = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const cv = canvas.current!
    let w = 0, h = 0, dpr = 1, visible = false, raf = 0
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      w = r.width; h = r.height
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)
    const c = cv.getContext('2d')!

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, w, h)
      const live = engine.readBands(bands)
      if (!live) bands.fill(0.025)
      for (let i = 0; i < bands.length; i++) smooth[i] += (bands[i] - smooth[i]) * (bands[i] > smooth[i] ? 0.6 : 0.15)
      const m = modeRef.current
      if (m === 'spectrum') {
        const n = 64
        const gap = Math.max(2, w / n / 4)
        const bw = (w - gap * (n - 1)) / n
        for (let i = 0; i < n; i++) {
          const k = Math.abs(i - (n - 1) / 2) / ((n - 1) / 2)
          const v = smooth[Math.min(n - 1, Math.floor(k * (n - 1)))]
          const bh = Math.max(4, v * h * 0.86)
          const x = i * (bw + gap)
          c.fillStyle = ORANGE
          c.fillRect(x, h / 2 - bh / 2, bw, bh)
          peaks[i] = Math.max(peaks[i] - 0.004, v)
          c.fillStyle = PAPER
          const ph = peaks[i] * h * 0.86
          c.fillRect(x, h / 2 - ph / 2 - 8, bw, 3)
          c.fillRect(x, h / 2 + ph / 2 + 5, bw, 3)
        }
      } else if (m === 'radial') {
        const cx = w / 2, cy = h / 2
        const r0 = Math.min(w, h) * 0.2
        const n = 96
        c.lineWidth = Math.max(3, w / 300)
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const k = Math.abs(i / n - 0.5) * 2
          const v = smooth[Math.min(63, Math.floor(k * 63))]
          const len = 6 + v * Math.min(w, h) * 0.32
          c.strokeStyle = i % 8 === 0 ? PAPER : ORANGE
          c.beginPath()
          c.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)
          c.lineTo(cx + Math.cos(a) * (r0 + len), cy + Math.sin(a) * (r0 + len))
          c.stroke()
        }
        c.strokeStyle = PAPER
        c.lineWidth = 2
        c.strokeRect(cx - r0 * 0.4, cy - r0 * 0.4, r0 * 0.8, r0 * 0.8)
      } else {
        const live2 = engine.readWave(wave)
        if (!live2) wave.fill(0)
        c.strokeStyle = 'rgba(236,235,229,0.18)'
        c.lineWidth = 1
        for (let i = 1; i < 10; i++) {
          c.beginPath(); c.moveTo((w / 10) * i, 0); c.lineTo((w / 10) * i, h); c.stroke()
        }
        c.beginPath(); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke()
        c.strokeStyle = ORANGE
        c.lineWidth = Math.max(3, w / 350)
        c.lineJoin = 'miter'
        c.beginPath()
        for (let i = 0; i < wave.length; i++) {
          const x = (i / (wave.length - 1)) * w
          const y = h / 2 + wave[i] * h * 0.42
          i ? c.lineTo(x, y) : c.moveTo(x, y)
        }
        c.stroke()
      }
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [bands, smooth, peaks, wave])

  useEffect(() => () => engine.stop(), [])

  const btn = 'label flex items-center gap-2 border-2 border-paper px-4 py-3 hover:bg-orange hover:text-ink hover:border-orange'
  const status = st.error ?? (st.playing ? `Live analysis · ${st.label}` : st.source === 'file' ? `Paused · ${st.label}` : 'No signal — load a file or play the demo tone')

  return (
    <Section nav="features" n="06" title="Audio visualizations" titleSize="text-[clamp(1.9rem,2.8vw,3rem)]" intro="Visual elements that respond to the music. Load a track from your own computer, or try the generated demo tone." dark>
      <div className="flex flex-wrap items-stretch border-b-2 border-paper">
        <div role="radiogroup" aria-label="Visualization style" className="flex border-r-2 border-paper">
          {MODES.map((m) => (
            <button key={m.id} role="radio" aria-checked={mode === m.id} type="button" onClick={() => setMode(m.id)} className={`label border-r-2 border-paper px-5 py-4 last:border-r-0 ${mode === m.id ? 'bg-orange text-ink' : 'hover:bg-paper hover:text-ink'}`}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 p-3">
          <button type="button" className={btn} onClick={() => (st.source === 'none' ? engine.startDemo() : engine.toggle())}>
            {st.playing ? <Pause size={14} /> : <Play size={14} />} {st.source === 'none' ? 'Demo tone' : st.playing ? 'Pause' : 'Resume'}
          </button>
          <button type="button" className={btn} onClick={() => file.current?.click()}>
            <Upload size={14} /> Load audio file
          </button>
          {st.source !== 'none' && (
            <button type="button" className={btn} onClick={() => engine.stop()}>
              <Square size={14} /> Stop
            </button>
          )}
          <input ref={file} type="file" accept="audio/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void engine.playFile(f); e.target.value = '' }} />
        </div>
      </div>

      <div className="relative h-[min(60vh,34rem)] min-h-[16rem]">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" role="img" aria-label={`${mode} audio visualization`} />
      </div>

      <div className="label flex flex-wrap justify-between gap-2 border-t-2 border-paper p-3 md:px-6" role="status" aria-live="polite">
        <span className={st.error ? 'text-orange' : ''}>{status}</span>
        <span className="opacity-60">Files are analysed locally in your browser and never uploaded</span>
      </div>
    </Section>
  )
}
