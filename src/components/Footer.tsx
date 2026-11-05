import { MAC, RELEASE, RELEASES, REPO, VERSION, WINDOWS } from '@/data/site'
import { GithubIcon } from './ui/Icons'

const link = 'flex items-center gap-2 border-b-2 border-paper/25 py-2.5 hover:bg-orange hover:text-ink hover:border-orange'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1700px]">
        <div className="grid border-b-2 border-paper md:grid-cols-12">
          <div className="border-b-2 border-paper p-4 md:col-span-4 md:border-b-0 md:border-r-2 md:p-6">
            <div className="flex items-center gap-3">
              <img src="/shono-logo.png" alt="" width={56} height={56} className="h-14 w-14" loading="lazy" />
              <div>
                <div className="display text-3xl">SHONO.FM</div>
                <div className="label opacity-70">Version {VERSION}</div>
              </div>
            </div>
            <p className="mt-6 max-w-[32ch] opacity-80">Precision Audio Archive &amp; Desktop Music Player. Open source, for Windows and macOS.</p>
          </div>

          <nav aria-label="Repository" className="border-b-2 border-paper p-4 md:col-span-3 md:border-b-0 md:border-r-2 md:p-6">
            <div className="label mb-3 text-orange">GitHub</div>
            <a className={link} href={REPO} target="_blank" rel="noopener noreferrer"><GithubIcon size={14} /> Repository</a>
            <a className={link} href={RELEASES} target="_blank" rel="noopener noreferrer">Releases</a>
            <a className={link} href={RELEASE} target="_blank" rel="noopener noreferrer">Release v{VERSION}</a>
          </nav>

          <nav aria-label="Downloads" className="border-b-2 border-paper p-4 md:col-span-3 md:border-b-0 md:border-r-2 md:p-6">
            <div className="label mb-3 text-orange">Download v{VERSION}</div>
            <a className={link} href={WINDOWS.url}>Windows 10 / 11 · x64</a>
            <a className={link} href={MAC.arm64.url}>macOS · Apple Silicon</a>
            <a className={link} href={MAC.x64.url}>macOS · Intel</a>
          </nav>

          <nav aria-label="Site" className="p-4 md:col-span-2 md:p-6">
            <div className="label mb-3 text-orange">Index</div>
            {[['Features', '#features'], ['Themes', '#themes'], ['Specifications', '#specs'], ['Downloads', '#download']].map(([l, h]) => (
              <a key={h} className={link} href={h}>{l}</a>
            ))}
          </nav>
        </div>

        <div className="display select-none overflow-hidden px-4 pt-6 text-[clamp(4.5rem,21.5vw,24rem)] leading-[0.78] md:px-6" aria-hidden="true">
          SHONO<span className="text-orange">.</span>FM
        </div>

        <div className="label flex flex-wrap justify-between gap-3 border-t-2 border-paper p-4 md:px-6">
          <span>© {new Date().getFullYear()} SHONO.FM contributors. Released under the MIT License.</span>
          <span>Artwork shown belongs to its respective owners.</span>
        </div>
      </div>
    </footer>
  )
}
