import { Section } from '@/components/ui/Section'

const ROWS: { n: string; fig: 'A' | 'B'; t: string; d: string }[] = [
  { n: '01', fig: 'A', t: 'Navigation', d: 'Home, Library, Albums, Genres, Artists and Favorites.' },
  { n: '02', fig: 'A', t: 'Playlists', d: 'A playlist list with cover thumbnails, plus create and import buttons.' },
  { n: '03', fig: 'A', t: 'Equalizer', d: 'A power switch and a preset badge (BASS+) right in the sidebar.' },
  { n: '04', fig: 'A', t: 'Shuffle · Keys', d: 'One-tap shuffle and a keyboard-shortcuts panel.' },
  { n: '05', fig: 'A', t: 'Search & Import', d: 'Paste a link or search YouTube, with Paste and Import buttons.' },
  { n: '06', fig: 'A', t: 'Collection actions', d: 'Play All, Shuffle and Mixtape for any album or playlist.' },
  { n: '07', fig: 'A', t: 'Details · Lyrics · Queue', d: 'A tabbed side panel for the current track.' },
  { n: '08', fig: 'A', t: 'Waveform transport', d: 'A waveform scrubber with PCM, stereo and sample-rate readouts and a dB meter.' },
  { n: '09', fig: 'B', t: 'Ambient', d: 'A header toggle that tints the window from the artwork.' },
  { n: '10', fig: 'B', t: 'Audio Enhance', d: 'A dedicated header control for sound shaping.' },
  { n: '11', fig: 'B', t: 'Lyric source', d: 'A selector for where lyrics come from, plus translate, hide, download and search.' },
  { n: '12', fig: 'B', t: 'Playback controls', d: 'Shuffle, previous, play, next, repeat, volume, favourite and more.' },
]

/** 07 — Customization, itemised from what is visible in the two real screenshots. */
export function Customize() {
  return (
    <Section
      nav="features"
      n="07"
      title="Customization"
      intro="Ambient colour, equalizer, lyric sources and playback controls. Twelve controls, each one visible in the real screenshots."
    >
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3">
        {ROWS.map((r) => (
          <li key={r.n} className="flex min-h-48 flex-col justify-between border-b-2 border-ink p-4 sm:border-r-2 md:p-5">
            <div className="flex items-start justify-between">
              <span className="display text-6xl">{r.n}</span>
              <span className="label border-2 border-ink px-1.5 py-0.5">Fig. {r.fig}</span>
            </div>
            <div>
              <h3 className="display mt-6 text-2xl !leading-none semi">{r.t}</h3>
              <p className="mt-2 text-[15px] leading-snug">{r.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
