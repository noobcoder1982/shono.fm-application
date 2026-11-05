/**
 * Audio engine for the visualizer. Two sources only, both honest:
 *  - a file the visitor loads from their own computer (decoded locally, never uploaded)
 *  - a short generated demo tone, so the visualizer can be tried without a file
 * Neither plays the real recordings listed elsewhere on the page.
 */
export type Source = 'none' | 'demo' | 'file'
export interface EngineState {
  source: Source
  playing: boolean
  label: string
  error: string | null
}

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)
const BPM = 96
const STEP = 30 / BPM
const ROOT = 57
const SCALE = [0, 3, 5, 7, 10, 12, 15]
const CHORDS = [0, -4, -2, -5]
const PATTERN = [0, -1, 2, -1, 4, -1, 3, 2, -1, 4, -1, 5, 3, -1, 2, -1]
const LOOKAHEAD = 1.0

class Engine {
  private ctx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private noise: AudioBuffer | null = null
  private session: { out: GainNode } | null = null
  private timer = 0
  private nextStep = 0
  private nextTime = 0
  private el: HTMLAudioElement | null = null
  private url: string | null = null
  private freq = new Uint8Array(512)
  private wave = new Uint8Array(1024)
  private listeners = new Set<() => void>()
  private state: EngineState = { source: 'none', playing: false, label: '', error: null }

  subscribe = (l: () => void) => {
    this.listeners.add(l)
    return () => {
      this.listeners.delete(l)
    }
  }
  getState = () => this.state
  private set(p: Partial<EngineState>) {
    this.state = { ...this.state, ...p }
    this.listeners.forEach((l) => l())
  }

  private ensure() {
    if (this.ctx) return this.ctx
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctor()
    const an = ctx.createAnalyser()
    an.fftSize = 1024
    an.smoothingTimeConstant = 0.8
    an.connect(ctx.destination)
    this.ctx = ctx
    this.analyser = an
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.2), ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    this.noise = buf
    return ctx
  }

  /** Stops everything currently sounding. */
  stop() {
    window.clearInterval(this.timer)
    if (this.session) {
      this.session.out.disconnect()
      this.session = null
    }
    if (this.el) {
      this.el.pause()
      this.el.removeAttribute('src')
      this.el = null
    }
    if (this.url) {
      URL.revokeObjectURL(this.url)
      this.url = null
    }
    this.set({ source: 'none', playing: false, label: '', error: null })
  }

  startDemo() {
    this.stop()
    const ctx = this.ensure()
    void ctx.resume()
    const out = ctx.createGain()
    out.gain.value = 0.55
    out.connect(this.analyser!)
    this.session = { out }
    this.nextTime = ctx.currentTime + 0.06
    this.nextStep = 0
    this.timer = window.setInterval(() => this.pump(), 40)
    this.pump()
    this.set({ source: 'demo', playing: true, label: 'Generated demo tone', error: null })
  }

  async playFile(file: File) {
    this.stop()
    if (!file.type.startsWith('audio/') && !/\.(mp3|m4a|aac|wav|flac|ogg|opus|weba)$/i.test(file.name)) {
      this.set({ error: 'That file does not look like audio.' })
      return
    }
    const ctx = this.ensure()
    await ctx.resume()
    const el = new Audio()
    this.url = URL.createObjectURL(file)
    el.src = this.url
    el.loop = true
    const src = ctx.createMediaElementSource(el)
    src.connect(this.analyser!)
    this.el = el
    try {
      await el.play()
      this.set({ source: 'file', playing: true, label: file.name, error: null })
    } catch {
      this.stop()
      this.set({ error: 'Your browser could not decode that file.' })
    }
  }

  /** Pause or resume the current source. */
  toggle() {
    const s = this.state
    if (s.source === 'file' && this.el) {
      if (this.el.paused) void this.el.play().then(() => this.set({ playing: true }))
      else {
        this.el.pause()
        this.set({ playing: false })
      }
    } else if (s.source === 'demo') {
      this.stop()
    } else {
      this.startDemo()
    }
  }

  readBands(out: Float32Array): boolean {
    if (!this.analyser || !this.state.playing) return false
    this.analyser.getByteFrequencyData(this.freq)
    const n = out.length
    const lo = 2
    const hi = this.freq.length * 0.62
    for (let i = 0; i < n; i++) {
      const a = Math.floor(lo * Math.pow(hi / lo, i / n))
      const b = Math.max(a + 1, Math.floor(lo * Math.pow(hi / lo, (i + 1) / n)))
      let peak = 0
      for (let k = a; k < b; k++) peak = Math.max(peak, this.freq[k])
      out[i] = Math.min(1, Math.pow(peak / 255, 1.35) * 1.15)
    }
    return true
  }

  readWave(out: Float32Array): boolean {
    if (!this.analyser || !this.state.playing) return false
    this.analyser.getByteTimeDomainData(this.wave)
    const n = out.length
    for (let i = 0; i < n; i++) out[i] = (this.wave[Math.floor((i / n) * this.wave.length)] - 128) / 128
    return true
  }

  // ---- demo synth ---------------------------------------------------------
  private pump() {
    const ctx = this.ctx
    if (!ctx || !this.session) return
    while (this.nextTime < ctx.currentTime + LOOKAHEAD) {
      this.playStep(this.nextStep, this.nextTime)
      this.nextTime += STEP
      this.nextStep++
    }
  }

  private playStep(step: number, t: number) {
    const p = step % 16
    const chord = CHORDS[Math.floor(step / 16) % 4]
    if (p % 4 === 0) this.kick(t)
    if (p % 2 === 1) this.hat(t, p % 4 === 3 ? 0.13 : 0.07)
    if (p % 8 === 0) this.tone('triangle', ROOT - 24 + chord, t, STEP * 7, 0.42, 600)
    const deg = PATTERN[p]
    if (deg >= 0) this.tone('triangle', ROOT + 12 + chord + SCALE[deg % SCALE.length], t, STEP * 3, 0.14, 2800)
  }

  private env(t: number, peak: number, attack: number, dur: number) {
    const g = this.ctx!.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(peak, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    return g
  }

  private kick(t: number) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const g = this.env(t, 0.9, 0.003, 0.32)
    o.frequency.setValueAtTime(150, t)
    o.frequency.exponentialRampToValueAtTime(42, t + 0.17)
    o.connect(g).connect(this.session!.out)
    o.start(t)
    o.stop(t + 0.34)
  }

  private hat(t: number, level: number) {
    const ctx = this.ctx!
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 7200
    const g = this.env(t, level, 0.002, 0.06)
    src.connect(hp).connect(g).connect(this.session!.out)
    src.start(t)
    src.stop(t + 0.08)
  }

  private tone(type: OscillatorType, midi: number, t: number, dur: number, peak: number, cutoff: number) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.value = mtof(midi)
    const f = ctx.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = cutoff
    const g = this.env(t, peak, 0.008, dur)
    o.connect(f).connect(g).connect(this.session!.out)
    o.start(t)
    o.stop(t + dur + 0.05)
  }
}

export const engine = new Engine()
