import { useState } from 'react'
import { SHOT_B } from '@/lib/shots'
import { Section } from '@/components/ui/Section'

/** Hotspots are placed in screenshot coordinates (1568 x 924) and converted to percentages. */
const SPOTS = [
  { n: 1, x: 1048, y: 33, t: 'Ambient', d: 'Ambient mode, shown in the header as “[ AMBIENT ACTIVE ]”. In this capture the window takes on the artwork’s warm tones.' },
  { n: 2, x: 1279, y: 33, t: 'Audio Enhance', d: 'An Audio Enhance control in the header, beside a mixer-style button.' },
  { n: 3, x: 838, y: 92, t: 'Lyric tools', d: 'Icon buttons for the lyric view (globe, eye, download), a lyric-source selector, an expand button and search.' },
  { n: 4, x: 180, y: 158, t: 'Artwork', d: 'The cover is shown large and sharp, with elapsed time, scrubber, title, artist and the album it is playing from.' },
  { n: 5, x: 214, y: 771, t: 'Transport', d: 'Shuffle, previous, play, next and repeat; below them volume, favourite and more.' },
  { n: 6, x: 778, y: 236, t: 'Lyrics in focus', d: 'The active line is sharp and large; lines further away soften progressively so your eye stays on what is being sung.' },
  { n: 7, x: 1423, y: 806, t: 'Lyrics / Queue', d: 'A two-way switch in the corner moves between synchronized lyrics and the play queue.' },
]

/** 03 — The full-screen player: the real screenshot, annotated. */
export function Player() {
  const [on, setOn] = useState<number | null>(null)
  return (
    <Section
      nav="features"
      n="03"
      title="Full-screen player"
      intro="An immersive playback view: the artwork leads, the lyrics follow, and everything else steps back."
      dark
    >
      <div className="p-4 md:p-6">
        <div className="relative border-2 border-paper">
          <img src={SHOT_B.src} alt={SHOT_B.alt} width={1917} height={1130} loading="lazy" className="h-auto w-full" />
          {SPOTS.map((s) => (
            <button
              key={s.n}
              type="button"
              aria-label={`${s.n}: ${s.t}`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setOn(s.n)}
              onPointerLeave={() => setOn(null)}
              onFocus={() => setOn(s.n)}
              onBlur={() => setOn(null)}
              onClick={() => setOn(s.n)}
              className={`label absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-ink font-bold md:h-7 md:w-7 ${on === s.n ? 'bg-paper text-ink' : 'bg-orange text-ink'}`}
              style={{ left: `${(s.x / SHOT_B.w) * 100}%`, top: `${(s.y / SHOT_B.h) * 100}%` }}
            >
              {s.n}
            </button>
          ))}
        </div>
        <p className="label mt-3 flex flex-wrap justify-between gap-2">
          <span><span className="bg-orange px-1.5 py-0.5 text-ink">Fig. B</span> SHONO full-screen player — actual application screenshot</span>
          <span className="opacity-60">Hover or tap a marker</span>
        </p>
      </div>

      <ol className="grid border-t-2 border-paper sm:grid-cols-2 xl:grid-cols-4">
        {SPOTS.map((s) => (
          <li key={s.n} className={`border-b-2 border-paper p-4 sm:border-r-2 md:p-5 ${on === s.n ? 'bg-orange text-ink' : ''}`}>
            <div className="flex items-baseline gap-3">
              <span className="display text-4xl">{s.n}</span>
              <span className="display text-xl">{s.t}</span>
            </div>
            <p className="mt-2 text-[15px] leading-snug opacity-90">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
