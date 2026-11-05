import { useEffect, useRef, useState } from 'react'
import { Apple, ArrowDownToLine, Check, Copy, ExternalLink, Terminal } from 'lucide-react'
import { MAC, RELEASE, VERSION, WINDOWS, XATTR, type MacArch } from '@/data/site'
import { WindowsIcon } from '@/components/ui/Icons'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for insecure contexts or blocked clipboard permissions.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

function CopyCommand() {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const onCopy = async () => {
    setState((await copyText(XATTR)) ? 'ok' : 'fail')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2400)
  }
  return (
    <div>
      <div className="flex items-stretch border-2 border-ink bg-ink text-paper">
        <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
          <Terminal size={16} className="shrink-0 text-orange" />
          <code className="whitespace-nowrap font-mono text-[13px] md:text-sm">
            <span className="opacity-50">$ </span>
            {XATTR}
          </code>
        </div>
        <button type="button" onClick={onCopy} aria-label="Copy Terminal command" className={`label flex w-32 shrink-0 items-center justify-center gap-2 border-l-2 border-paper font-bold ${state === 'ok' ? 'bg-orange text-ink' : 'hover:bg-orange hover:text-ink'}`}>
          {state === 'ok' ? <Check size={14} /> : <Copy size={14} />}
          {state === 'ok' ? 'Copied' : state === 'fail' ? 'Select it' : 'Copy'}
        </button>
      </div>
      <p className="label mt-3 min-h-4" role="status" aria-live="polite">
        {state === 'ok' && 'Copied to clipboard — paste it into Terminal.'}
        {state === 'fail' && 'Clipboard blocked — select the command above and copy it manually.'}
      </p>
    </div>
  )
}

const dt = 'label border-b-2 border-ink py-2.5 pr-4'
const dd = 'border-b-2 border-ink py-2.5 text-[15px]'

/** Downloads. Every URL comes from data/site.ts and was verified on the v2.0.0 release page. */
export function Download() {
  const [arch, setArch] = useState<MacArch>('arm64')
  const [flash, setFlash] = useState(false)
  const mac = MAC[arch]

  // Landing on #download-mac (hero button) briefly inverts the macOS header.
  useEffect(() => {
    const check = () => {
      if (window.location.hash !== '#download-mac') return
      setFlash(true)
      window.setTimeout(() => setFlash(false), 1600)
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  return (
    <section id="download" data-nav="download" className="border-b-2 border-ink bg-orange">
      <div className="mx-auto max-w-[1700px]">
        <div className="flex items-end justify-between gap-6 border-b-2 border-ink p-4 md:p-6">
          <h2 className="display text-[clamp(4rem,17vw,17rem)] !leading-[0.78]">Download</h2>
          <div className="label hidden pb-2 text-right md:block">
            <span className="bg-ink px-1.5 py-0.5 text-paper">10</span>
            <div className="mt-2">v{VERSION}<br />Free · Open source</div>
          </div>
        </div>
        <p className="max-w-[60ch] border-b-2 border-ink p-4 text-lg leading-snug md:p-6 md:text-xl">
          SHONO.FM {VERSION} for Windows and macOS. Downloads come straight from the GitHub release.
        </p>

        <div className="grid lg:grid-cols-2">
          {/* Windows */}
          <article className="flex flex-col justify-between border-b-2 border-ink bg-paper lg:border-r-2">
            <div>
              <header className="flex items-center justify-between border-b-2 border-ink bg-ink p-4 text-paper md:px-6">
                <span className="display text-4xl">Windows</span>
                <WindowsIcon size={30} />
              </header>
              <dl className="grid grid-cols-[8rem_1fr] px-4 md:px-6">
                <dt className={dt}>Platform</dt><dd className={dd}>{WINDOWS.platform}</dd>
                <dt className={dt}>Architecture</dt><dd className={dd}>{WINDOWS.arch}</dd>
                <dt className={dt}>File</dt>
                <dd className={`${dd} break-all`}>{WINDOWS.label}<span className="label block opacity-60 normal-case">{WINDOWS.file}</span></dd>
                <dt className={dt}>Size</dt><dd className={dd}>≈ {WINDOWS.size}</dd>
              </dl>
            </div>
            <div className="p-4 md:p-6">
              <a href={WINDOWS.url} download className="hard flex items-center justify-between gap-4 border-2 border-ink bg-orange px-5 py-5 font-display text-lg font-extrabold uppercase">
                Download for Windows <ArrowDownToLine />
              </a>
            </div>
          </article>

          {/* macOS */}
          <article id="download-mac" className="flex scroll-mt-16 flex-col justify-between border-b-2 border-ink bg-paper">
            <div>
              <header className={`flex items-center justify-between border-b-2 border-ink p-4 md:px-6 ${flash ? 'bg-orange text-ink' : 'bg-ink text-paper'}`}>
                <span className="display text-4xl">macOS</span>
                <Apple size={30} />
              </header>
              <div role="radiogroup" aria-label="Mac architecture" className="mx-4 mt-4 grid grid-cols-2 border-2 border-ink md:mx-6">
                {(Object.keys(MAC) as MacArch[]).map((k) => (
                  <button key={k} role="radio" aria-checked={arch === k} type="button" onClick={() => setArch(k)} className={`border-r-2 border-ink p-3 text-left last:border-r-0 ${arch === k ? 'bg-ink text-paper' : 'hover:bg-chalk'}`}>
                    <span className="display block text-2xl !leading-none semi">{MAC[k].name}</span>
                    <span className="label mt-1 block opacity-70">{MAC[k].hint}</span>
                  </button>
                ))}
              </div>
              <dl className="grid grid-cols-[8rem_1fr] px-4 md:px-6">
                <dt className={dt}>File</dt><dd className={`${dd} break-all font-mono text-[13px]`}>{mac.file}</dd>
                <dt className={dt}>Size</dt><dd className={dd}>≈ {mac.size}</dd>
                <dt className={dt}>Also</dt>
                <dd className={dd}><a href={mac.zipUrl} className="underline decoration-2 underline-offset-4 hover:bg-orange">{mac.zipFile}</a> <span className="opacity-60">({mac.zipSize})</span></dd>
              </dl>
            </div>
            <div className="p-4 md:p-6">
              <a href={mac.url} download className="hard flex items-center justify-between gap-4 border-2 border-ink bg-ink px-5 py-5 font-display text-lg font-extrabold uppercase text-paper">
                Download for {mac.name} <ArrowDownToLine />
              </a>
            </div>
          </article>
        </div>

        <div className="grid bg-paper lg:grid-cols-12">
          <div className="min-w-0 border-b-2 border-ink p-4 md:p-6 lg:col-span-5 lg:border-r-2">
            <div className="label"><span className="bg-orange px-1.5 py-0.5">macOS installation</span></div>
            <h3 className="display mt-4 text-[clamp(1.8rem,3vw,3rem)] !leading-[0.92]">Unidentified developer warning?</h3>
            <p className="mt-3">Run this command once in Terminal if macOS displays an unidentified developer warning.</p>
          </div>
          <div className="min-w-0 border-b-2 border-ink p-4 md:p-6 lg:col-span-7 lg:self-center lg:border-b-0">
            <CopyCommand />
          </div>
        </div>

        <a href={RELEASE} target="_blank" rel="noopener noreferrer" className="label flex items-center justify-between gap-2 border-t-2 border-ink bg-ink p-4 text-paper hover:bg-paper hover:text-ink md:px-6">
          <span>All assets and release notes on GitHub</span> <ExternalLink size={14} />
        </a>
      </div>
    </section>
  )
}
