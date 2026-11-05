import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href: string
  variant?: 'ink' | 'orange' | 'paper' | 'line'
  className?: string
  external?: boolean
  download?: boolean
  ariaLabel?: string
}

const variants = {
  ink: 'bg-ink text-paper border-ink hard',
  orange: 'bg-orange text-ink border-ink hard',
  paper: 'bg-paper text-ink border-ink hard',
  line: 'bg-transparent text-ink border-ink hard',
}

/** Rectangular, bordered, hard-shadowed link. Every call-to-action on the page is one of these. */
export function Button({ children, href, variant = 'ink', className = '', external, download, ariaLabel }: Props) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
      className={`inline-flex items-center justify-between gap-4 border-2 px-5 py-4 font-display text-[15px] font-bold uppercase tracking-tight ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
