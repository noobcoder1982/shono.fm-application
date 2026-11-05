import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { SHOT_A, SHOT_B } from '@/lib/shots'
import { Crop } from '@/components/ui/Crop'
import { Section } from '@/components/ui/Section'

const SAMPLE = 'Every word lights up the moment it is sung'.split(' ')

/** 04 — Lyrics. Real crops of the application, plus a clearly-labelled sample of the word-by-word fill. */
export function Lyrics() {
  const [run, setRun] = useState(0)
  return (
    <Section
      nav="features"
      n="04"
      title="Lyrics"
      intro="Animated lyrics follow playback word by word, with smooth transitions as each line comes into focus."
    >
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col border-b-2 border-ink lg:border-r-2">
          <figure className="border-b-2 border-ink p-4 md:p-6">
            <div className="border-2 border-ink bg-ink">
              <Crop shot={SHOT_B} r={{ x: 740, y: 60, w: 780, h: 560 }} />
            </div>
            <figcaption className="label mt-3"><span className="bg-orange px-1.5 py-0.5">Fig. B</span> Lyrics view — the active line is sharp, the rest recede</figcaption>
          </figure>
          <div className="flex flex-1 flex-col justify-between gap-6 p-4 md:p-6">
            <div className="label flex items-center justify-between">
              <span>Sample · word-by-word fill</span>
              <button type="button" onClick={() => setRun((r) => r + 1)} className="flex items-center gap-2 border-2 border-ink px-3 py-1.5 hover:bg-ink hover:text-paper">
                <RotateCcw size={12} /> Replay
              </button>
            </div>
            <p key={run} className="display text-[clamp(2.2rem,4.2vw,4rem)] !leading-[0.95]" aria-label={SAMPLE.join(' ')}>
              {SAMPLE.map((w, i) => (
                <span key={i} aria-hidden="true" className="sync-word mr-[0.2em] inline-block" style={{ animationDelay: `${0.3 + i * 0.4}s` }}>
                  {w}
                </span>
              ))}
            </p>
            <p className="label text-mute">Sample sentence written for this page — not a song lyric. Timing is a simple demo, not the app’s sync engine.</p>
          </div>
        </div>

        <figure className="p-4 md:p-6">
          <div className="mx-auto max-w-[26rem] border-2 border-ink bg-ink">
            <Crop shot={SHOT_A} r={{ x: 1228, y: 62, w: 330, h: 783 }} />
          </div>
          <figcaption className="label mt-3"><span className="bg-orange px-1.5 py-0.5">Fig. A</span> Side panel — Details · Lyrics · Queue tabs sit beside the track list</figcaption>
        </figure>
      </div>
    </Section>
  )
}
