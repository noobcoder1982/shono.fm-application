import { useState } from 'react'
import { ALBUMS } from '@/data/tracks'
import { fmtTime } from '@/lib/hooks'
import { Section } from '@/components/ui/Section'

/** 02 — A contact sheet of covers. Hover or focus to preview, click to pin. */
export function Albums() {
  const [pinned, setPinned] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const shown = ALBUMS[hover ?? pinned]

  return (
    <Section
      nav="features"
      n="02"
      title="Album browsing"
      intro="High-resolution artwork gets the space it deserves. In SHONO, covers can be browsed in 3D; here they sit on a flat sheet."
      aside={
        <div className="border-2 border-ink">
          <img src={shown.art} alt={`${shown.album} cover`} width={640} height={640} className="aspect-square w-full object-cover" />
          <div className="border-t-2 border-ink p-3">
            <div className="display text-3xl !leading-[0.9] [overflow-wrap:anywhere]">{shown.album}</div>
            <div className="mt-1">{shown.artist}</div>
            <ul className="label mt-3 border-t-2 border-ink pt-2">
              {shown.tracks.map((t, i) => (
                <li key={t.id} className="flex justify-between gap-3 py-0.5">
                  <span className="truncate">{String(i + 1).padStart(2, '0')} {t.title}</span>
                  <span>{fmtTime(t.secs)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" role="listbox" aria-label="Albums">
        {ALBUMS.map((a, i) => {
          const on = i === pinned
          return (
            <button
              key={a.key}
              role="option"
              aria-selected={on}
              type="button"
              onClick={() => setPinned(i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={`group relative border-b-2 border-r-2 border-ink text-left ${on ? 'bg-orange' : 'hover:bg-ink hover:text-paper'}`}
            >
              <img src={a.art} alt="" width={320} height={320} loading="lazy" className="aspect-square w-full object-cover" />
              <span className="label absolute left-0 top-0 bg-ink px-1.5 py-1 text-paper">{String(i + 1).padStart(2, '0')}</span>
              <span className="block border-t-2 border-ink p-2.5">
                <span className="block truncate font-display text-lg font-bold leading-tight tracking-tight">{a.album}</span>
                <span className="label block truncate opacity-75">{a.artist}</span>
              </span>
            </button>
          )
        })}
        <div className="flex min-h-40 flex-col justify-between border-b-2 border-ink bg-orange p-4 sm:col-span-2 xl:col-span-3 md:p-6">
          <span className="label">+ Your collection</span>
          <span className="display text-[clamp(2rem,4vw,4rem)] !leading-[0.9]">Point SHONO at your own music.</span>
        </div>
      </div>
    </Section>
  )
}
