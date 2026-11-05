import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Search } from 'lucide-react'
import { TRACKS } from '@/data/tracks'
import { fmtTime } from '@/lib/hooks'
import { Section } from '@/components/ui/Section'

type Key = 'title' | 'artist' | 'album' | 'secs'
const COLS: { key: Key; label: string; cls: string }[] = [
  { key: 'title', label: 'Title', cls: '' },
  { key: 'artist', label: 'Artist', cls: 'hidden md:flex' },
  { key: 'album', label: 'Album', cls: 'hidden lg:flex' },
  { key: 'secs', label: 'Time', cls: 'justify-end' },
]
const GRID = 'grid-cols-[2.25rem_3.25rem_1fr_3.5rem] md:grid-cols-[2.75rem_3.5rem_1.3fr_1fr_4rem] lg:grid-cols-[2.75rem_3.5rem_1.3fr_1fr_1fr_4rem]'

/** 01 — The ledger. Real tracks, real covers; sort, search and select like the app's own track list. */
export function Library() {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 } | null>(null)
  const [sel, setSel] = useState(TRACKS[0].id)
  const current = TRACKS.find((t) => t.id === sel)!

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const list = TRACKS.filter((t) => !needle || [t.title, t.artist, t.album].some((s) => s.toLowerCase().includes(needle)))
    if (!sort) return list
    return [...list].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      return (typeof av === 'number' ? av - (bv as number) : String(av).localeCompare(String(bv))) * sort.dir
    })
  }, [q, sort])

  return (
    <Section
      id="features"
      nav="features"
      n="01"
      title="Music library"
      intro="Your local collection, laid out with its artwork and metadata intact. Browse by title, artist, album or time."
      aside={
        <div className="border-2 border-ink">
          <img src={current.art} alt={`${current.album} cover`} width={640} height={640} className="aspect-square w-full object-cover" />
          <div className="border-t-2 border-ink p-3">
            <div className="label text-mute">Selected</div>
            <div className="display mt-1 text-3xl !leading-[0.9] [overflow-wrap:anywhere]">{current.title}</div>
            <div className="mt-1 text-[15px]">{current.artist}</div>
            <div className="label mt-1 text-mute">{current.album}</div>
          </div>
        </div>
      }
    >
      <label className="flex items-center gap-3 border-b-2 border-ink p-4 focus-within:bg-orange md:px-6">
        <Search size={18} />
        <span className="sr-only">Search the sample library</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, artist or album" className="w-full bg-transparent text-lg font-medium outline-none placeholder:text-ink/45" />
        <span className="label whitespace-nowrap">{rows.length} / {TRACKS.length}</span>
      </label>

      <div role="table" aria-label="Sample library">
        <div role="row" className={`label grid items-center gap-3 border-b-2 border-ink bg-chalk px-4 py-2.5 md:px-6 ${GRID}`}>
          <span role="columnheader">#</span>
          <span role="columnheader" className="sr-only">Cover</span>
          {COLS.map((c) => (
            <button key={c.key} role="columnheader" type="button" onClick={() => setSort((s) => ({ key: c.key, dir: s?.key === c.key ? (s.dir === 1 ? -1 : 1) : 1 }))} className={`items-center gap-1 text-left hover:text-orange ${c.cls.includes('hidden') ? c.cls : 'flex ' + c.cls}`} aria-label={`Sort by ${c.label}`}>
              {c.label}
              {sort?.key === c.key && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
            </button>
          ))}
        </div>

        {rows.map((t, n) => {
          const active = t.id === sel
          return (
            <button key={t.id} role="row" type="button" aria-selected={active} onClick={() => setSel(t.id)} className={`grid w-full items-center gap-3 border-b-2 border-ink px-4 py-2 text-left md:px-6 ${GRID} ${active ? 'bg-orange' : 'hover:bg-ink hover:text-paper'}`}>
              <span className="label">{String(n + 1).padStart(3, '0')}</span>
              <img src={t.art} alt="" width={56} height={56} loading="lazy" className="h-12 w-12 border-2 border-ink object-cover md:h-14 md:w-14" />
              <span className="min-w-0">
                <span className="block truncate font-display text-[clamp(1.1rem,2.2vw,1.9rem)] font-bold leading-none tracking-tight semi">{t.title}</span>
                <span className="mt-0.5 block truncate text-[13px] opacity-70 md:hidden">{t.artist}</span>
              </span>
              <span className="hidden truncate md:block">{t.artist}</span>
              <span className="hidden truncate opacity-70 lg:block">{t.album}</span>
              <span className="label text-right">{fmtTime(t.secs)}</span>
            </button>
          )
        })}
        {rows.length === 0 && <p className="p-8 text-center text-lg">Nothing in the sample library matches “{q}”.</p>}
      </div>

      <p className="label p-4 md:px-6">Sample ledger · {TRACKS.length} real tracks from {new Set(TRACKS.map((t) => t.album)).size} albums · for illustration only, nothing here plays</p>
    </Section>
  )
}
