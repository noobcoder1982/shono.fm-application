import { useEffect, useState } from 'react'
import { ArrowDownToLine, Menu, X } from 'lucide-react'
import { NAV, REPO, type NavId } from '@/data/site'
import { GithubIcon } from './ui/Icons'

function useActiveSection() {
  const [active, setActive] = useState<NavId>('home')
  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      let cur: NavId = 'home'
      document.querySelectorAll<HTMLElement>('[data-nav]').forEach((s) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.dataset.nav as NavId
      })
      setActive(cur)
    }
    const on = () => !raf && (raf = requestAnimationFrame(calc))
    window.addEventListener('scroll', on, { passive: true })
    on()
    return () => window.removeEventListener('scroll', on)
  }, [])
  return active
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper">
        <div className="mx-auto flex h-14 max-w-[1700px] items-stretch">
          <a href="#home" aria-label="SHONO.FM home" className="flex items-center gap-3 border-r-2 border-ink pr-4 md:pr-6">
            <span className="grid h-full w-14 place-items-center border-r-2 border-ink bg-ink">
              <img src="/shono-logo.png" alt="" width={40} height={40} className="h-10 w-10" />
            </span>
            <span className="display text-xl">SHONO.FM</span>
            <span className="label hidden bg-orange px-1.5 py-0.5 sm:inline">v2.0.0</span>
          </a>

          <nav aria-label="Primary" className="hidden flex-1 lg:flex">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined} className={`label flex flex-1 items-center gap-2 border-r-2 border-ink px-4 hover:bg-ink hover:text-paper ${active === n.id ? 'bg-ink text-paper' : ''}`}>
                <span className="text-orange">{String(i).padStart(2, '0')}</span>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-stretch">
            <a href={REPO} target="_blank" rel="noopener noreferrer" aria-label="SHONO.FM on GitHub" className="grid w-14 place-items-center border-l-2 border-ink hover:bg-ink hover:text-paper lg:border-l-0 lg:border-r-2">
              <GithubIcon size={18} />
            </a>
            <a href="#download" className="label hidden items-center gap-2 border-l-0 bg-orange px-5 hover:bg-ink hover:text-orange sm:flex">
              <ArrowDownToLine size={15} /> Download
            </a>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)} className="grid w-14 place-items-center border-l-2 border-ink lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-14 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={`display flex items-baseline justify-between border-b-2 border-ink px-4 py-4 text-[clamp(2.4rem,12vw,4.5rem)] ${active === n.id ? 'bg-orange' : ''}`}>
                {n.label}
                <span className="label">{String(i).padStart(2, '0')}</span>
              </a>
            ))}
          </nav>
          <a href="#download" onClick={() => setOpen(false)} className="display m-4 flex items-center justify-between border-2 border-ink bg-ink p-4 text-2xl text-paper">
            Download <ArrowDownToLine />
          </a>
        </div>
      )}
    </>
  )
}
