import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { THEMES } from '@/data/themes'
import { TRACKS } from '@/data/tracks'
import { Section } from '@/components/ui/Section'

const T = TRACKS[0]

/** 05 — Palette specimen. Pick a palette or dial an accent; the specimen reads every colour from the selection. */
export function Themes() {
  const [id, setId] = useState('noir')
  const [hue, setHue] = useState<number | null>(null)
  const theme = THEMES.find((t) => t.id === id)!
  const acc = hue === null ? theme.acc : `hsl(${hue} 92% 56%)`
  const swatch = [
    ['Background', theme.bg],
    ['Panel', theme.panel],
    ['Text', theme.fg],
    ['Muted', theme.mut],
    ['Accent', hue === null ? theme.acc : acc],
  ] as const

  return (
    <Section
      id="themes"
      nav="themes"
      n="05"
      title="Themes"
      intro="Make it yours. Switch the whole look with a palette, then push the accent colour anywhere on the wheel."
    >
      <div className="grid xl:grid-cols-2">
        <div className="border-b-2 border-ink xl:border-b-0 xl:border-r-2">
          <div role="radiogroup" aria-label="Palette">
            {THEMES.map((t, i) => (
              <button key={t.id} role="radio" aria-checked={t.id === id} type="button" onClick={() => { setId(t.id); setHue(null) }} className={`flex w-full items-center gap-4 border-b-2 border-ink p-4 text-left md:px-6 ${t.id === id ? 'bg-ink text-paper' : 'hover:bg-chalk'}`}>
                <span className="label w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex h-9 w-16 shrink-0 border-2 border-current">
                  <span className="flex-1" style={{ background: t.bg }} />
                  <span className="w-1/3" style={{ background: t.acc }} />
                </span>
                <span className="display text-3xl">{t.name}</span>
                <span className="label ml-auto hidden sm:block">{t.note}</span>
              </button>
            ))}
          </div>
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <label htmlFor="accent" className="label">Custom accent</label>
              <button type="button" onClick={() => setHue(null)} disabled={hue === null} className="label flex items-center gap-1.5 border-2 border-ink px-2.5 py-1 hover:bg-ink hover:text-paper disabled:opacity-30">
                <RotateCcw size={11} /> Reset
              </button>
            </div>
            <input id="accent" type="range" min={0} max={360} value={hue ?? 20} onChange={(e) => setHue(Number(e.target.value))} className="mt-4 h-3 w-full" style={{ background: 'linear-gradient(90deg, hsl(0 92% 56%), hsl(60 92% 56%), hsl(120 92% 56%), hsl(180 92% 56%), hsl(240 92% 56%), hsl(300 92% 56%), hsl(360 92% 56%))' }} aria-label="Accent hue" />
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="border-2 border-ink" style={{ background: theme.bg, color: theme.fg }}>
            <div className="label flex justify-between border-b-2 p-3" style={{ borderColor: theme.fg + '33', color: theme.mut }}>
              <span>Palette specimen</span>
              <span style={{ color: acc }}>{theme.name}</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 p-4 sm:grid-cols-[9rem_1fr]">
              <img src={T.art} alt="" width={160} height={160} className="aspect-square w-full object-cover" />
              <div className="min-w-0">
                <div className="label" style={{ color: acc }}>Now playing</div>
                <div className="display mt-1 text-4xl !leading-[0.9] sm:text-5xl">{T.title}</div>
                <div className="mt-1" style={{ color: theme.mut }}>{T.artist}</div>
              </div>
            </div>
            <div className="mx-4 h-1.5" style={{ background: theme.panel }}>
              <div className="h-full w-2/5" style={{ background: acc }} />
            </div>
            <div className="m-4 flex gap-2">
              <span className="label px-3 py-2" style={{ background: acc, color: theme.accInk }}>Play all</span>
              <span className="label border-2 px-3 py-2" style={{ borderColor: theme.fg + '55' }}>Shuffle</span>
              <span className="label border-2 px-3 py-2" style={{ borderColor: theme.fg + '55' }}>Mixtape</span>
            </div>
          </div>
          <dl className="label mt-4 grid grid-cols-5 border-2 border-ink">
            {swatch.map(([k, v]) => (
              <div key={k} className="border-r-2 border-ink last:border-r-0">
                <div className="h-12" style={{ background: v }} />
                <div className="p-1.5"><dt>{k}</dt><dd className="text-mute">{v.startsWith('hsl') ? 'custom' : v}</dd></div>
              </div>
            ))}
          </dl>
          <p className="label mt-3 text-mute">Sample palettes and a simplified specimen — not a recolour of the application.</p>
        </div>
      </div>
    </Section>
  )
}
