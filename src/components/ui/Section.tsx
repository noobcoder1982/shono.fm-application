import type { ReactNode } from 'react'
import type { NavId } from '@/data/site'

interface Props {
  id?: string
  nav: NavId
  n: string
  title: string
  titleSize?: string
  intro?: ReactNode
  aside?: ReactNode
  dark?: boolean
  children: ReactNode
  className?: string
}

/**
 * Every section shares one skeleton: a numbered, sticky label column on the left and content on the right,
 * divided by a 2px rule. The repetition is the layout system.
 */
export function Section({ id, nav, n, title, titleSize = 'text-[clamp(2.6rem,4.6vw,5rem)]', intro, aside, dark, children, className = '' }: Props) {
  const rule = dark ? 'border-paper' : 'border-ink'
  return (
    <section id={id} data-nav={nav} className={`border-b-2 ${rule} ${dark ? 'bg-ink text-paper' : ''} ${className}`}>
      <div className="mx-auto grid max-w-[1700px] lg:grid-cols-12">
        <header className={`border-b-2 p-4 md:p-6 lg:col-span-3 lg:border-b-0 lg:border-r-2 ${rule}`}>
          <div className="lg:sticky lg:top-20">
            <div className="label flex items-center gap-2">
              <span className="inline-block bg-orange px-1.5 py-0.5 text-ink">{n}</span>
            </div>
            <h2 className={`display mt-6 ${titleSize}`}>{title}</h2>
            {intro && <div className="mt-6 max-w-[34ch] text-[17px] leading-snug">{intro}</div>}
            {aside && <div className="mt-8">{aside}</div>}
          </div>
        </header>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}
