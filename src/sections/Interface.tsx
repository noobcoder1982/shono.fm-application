import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { SHOT_A, type Region } from '@/lib/shots'
import { Crop } from '@/components/ui/Crop'
import { Section } from '@/components/ui/Section'

interface Part {
  id: string
  label: string
  title: string
  body: string
  r: Region
  /** Max width of the crop, so tall crops don't balloon. */
  max: string
  wide?: boolean
}

const PARTS: Part[] = [
  { id: 'nav', label: 'Sidebar', title: 'Navigation and playlists', body: 'Six top-level destinations, numbered. Below them your playlists with cover thumbnails and track counts, and the equalizer with Shuffle and Keys at the foot.', r: { x: 0, y: 0, w: 224, h: 860 }, max: '19rem' },
  { id: 'import', label: 'Search & Import', title: 'One bar for finding and importing', body: 'Paste a link or search YouTube from the same field, then import straight into the archive. The header names the collection you are in.', r: { x: 225, y: 50, w: 990, h: 215 }, max: '100%', wide: true },
  { id: 'ledger', label: 'Ledger', title: 'The track ledger', body: 'A dense, numbered list: thumbnail, title, artist, album, year and time. The playing row is marked, and tags beside each title carry extra metadata.', r: { x: 225, y: 258, w: 990, h: 575 }, max: '100%', wide: true },
  { id: 'details', label: 'Details panel', title: 'Details, Lyrics, Queue', body: 'The current track with large artwork, its album, and tabs for lyrics and the queue — always docked on the right.', r: { x: 1228, y: 62, w: 330, h: 783 }, max: '22rem' },
  { id: 'transport', label: 'Transport', title: 'Waveform transport', body: 'Play controls, a waveform scrubber with technical readouts, volume and queue buttons, always on screen.', r: { x: 0, y: 857, w: 1568, h: 73 }, max: '100%', wide: true },
]

/** Interface — explore the real application one region at a time. Every pixel is from the screenshot. */
export function Interface() {
  const [id, setId] = useState(PARTS[0].id)
  const p = PARTS.find((x) => x.id === id)!
  return (
    <Section
      id="interface"
      nav="interface"
      n="08"
      title="Interface"
      intro="Pick a part of the console. Each view is a close crop of the real application screenshot, not a mock-up."
      dark
    >
      <div role="tablist" aria-label="Interface regions" className="flex flex-wrap border-b-2 border-paper">
        {PARTS.map((x, i) => (
          <button key={x.id} role="tab" aria-selected={x.id === id} type="button" onClick={() => setId(x.id)} className={`label flex items-center gap-2 border-r-2 border-paper px-4 py-4 ${x.id === id ? 'bg-orange text-ink' : 'hover:bg-paper hover:text-ink'}`}>
            <span className="opacity-70">{String(i + 1).padStart(2, '0')}</span> {x.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className={`grid gap-6 p-4 md:p-6 ${p.wide ? '' : 'md:grid-cols-[var(--crop-w)_1fr]'}`} style={{ ['--crop-w' as string]: p.max }}>
        <div className="border-2 border-paper bg-ink">
          <Crop shot={SHOT_A} r={p.r} />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="label text-orange">Fig. A · {p.label}</div>
            <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3.4rem)] !leading-[0.92]">{p.title}</h3>
            <p className="mt-4 max-w-[52ch] text-lg leading-snug">{p.body}</p>
          </div>
          <a href={SHOT_A.src} target="_blank" rel="noopener noreferrer" className="label inline-flex w-fit items-center gap-2 border-2 border-paper px-3 py-2 hover:bg-paper hover:text-ink">
            Open the full screenshot <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </Section>
  )
}
