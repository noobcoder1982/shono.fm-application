import { Apple } from 'lucide-react'
import { MAC, VERSION, WINDOWS } from '@/data/site'
import { SHOT_A } from '@/lib/shots'
import { TRACKS } from '@/data/tracks'
import { Button } from '@/components/ui/Button'
import { WindowsIcon } from '@/components/ui/Icons'
import { BlurReveal } from '@/components/ui/BlurReveal'

const NAMES = Array.from(new Set(TRACKS.map((t) => t.artist)))

export function Hero() {
  return (
    <section id="home" data-nav="home" className="border-b-2 border-ink pt-14">
      <div className="mx-auto max-w-[1700px]">
        {/* meta strip */}
        <div className="label grid grid-cols-2 border-b-2 border-ink md:grid-cols-4">
          <div className="border-r-2 border-ink p-3 md:px-6">
            <span className="bg-orange px-1.5 py-0.5">v{VERSION}</span> Now available
          </div>
          <div className="p-3 md:border-r-2 md:border-ink md:px-6">Desktop music player</div>
          <div className="hidden border-r-2 border-ink p-3 md:block md:px-6">Windows · macOS</div>
          <div className="hidden p-3 md:block md:px-6">Open source · MIT</div>
        </div>

        <BlurReveal
          as="h1"
          duration={1.2}
          blur={16}
          y={28}
          start="top 98%"
          className="display px-4 pb-2 pt-6 text-[clamp(2.7rem,12.6vw,5.4rem)] md:px-6 md:pt-10 md:text-[9.6vw] min-[1700px]:text-[10.5rem]"
        >
          <span className="block">Precision sound.</span>
          <span className="block">
            Uncompromised <span className="bg-orange px-[0.06em]">archive.</span>
          </span>
        </BlurReveal>

        <div className="mt-6 grid border-y-2 border-ink md:mt-10 md:grid-cols-12">
          <BlurReveal
            as="p"
            duration={0.9}
            delay={0.15}
            blur={12}
            y={18}
            start="top 92%"
            className="border-b-2 border-ink p-4 text-[18px] leading-snug md:col-span-6 md:border-b-0 md:border-r-2 md:p-6 md:text-xl"
          >
            The open-source desktop music player built for people who care about their music. Explore your collection through beautiful album artwork, enjoy smooth playback, synchronized lyrics, and make the experience your own.
          </BlurReveal>

          <div className="flex flex-col justify-between gap-6 p-4 md:col-span-6 md:p-6">
            <div className="flex flex-wrap gap-4">
              <Button href={WINDOWS.url} variant="orange" download ariaLabel={`Download SHONO ${VERSION} for Windows, ${WINDOWS.size}`}>
                <WindowsIcon size={18} /> Download for Windows
              </Button>
              <Button href="#download-mac" variant="ink" ariaLabel="Download SHONO for macOS: choose Apple Silicon or Intel">
                <Apple size={18} /> Download for macOS
              </Button>
            </div>
            <p className="label">
              v{VERSION} · Windows 10/11 x64 · {WINDOWS.size}<br />
              macOS {MAC.arm64.name} ({MAC.arm64.size}) &amp; {MAC.x64.name} ({MAC.x64.size})
            </p>
          </div>
        </div>

        <figure className="p-4 md:p-6">
          <div className="border-2 border-ink bg-ink shadow-[10px_10px_0_0_var(--color-ink)] md:shadow-[16px_16px_0_0_var(--color-ink)]">
            <img src={SHOT_A.src} alt={SHOT_A.alt} width={1917} height={1137} fetchPriority="high" className="h-auto w-full" />
          </div>
          <figcaption className="label mt-6 flex flex-wrap justify-between gap-2">
            <span><span className="bg-orange px-1.5 py-0.5">Fig. A</span> SHONO Archive — actual application screenshot</span>
            <span className="opacity-60">Library · playlists · details · waveform transport</span>
          </figcaption>
        </figure>
      </div>

      {/* static ticker of the artists shown on this page */}
      <div className="label overflow-hidden whitespace-nowrap border-t-2 border-ink bg-ink py-3 text-paper" aria-label={`Artists shown on this page: ${NAMES.join(', ')}`}>
        <div className="mx-auto max-w-[1700px] px-4 md:px-6" aria-hidden="true">
          {NAMES.join('  /  ')}
        </div>
      </div>
    </section>
  )
}
