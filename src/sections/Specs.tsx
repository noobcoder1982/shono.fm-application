import { ArrowUpRight } from 'lucide-react'
import { REPO, RELEASE } from '@/data/site'
import { Section } from '@/components/ui/Section'

const ROWS: { k: string; v: string; href?: string }[] = [
  { k: 'Application', v: 'SHONO.FM' },
  { k: 'Version', v: '2.0.0', href: RELEASE },
  { k: 'Platform', v: 'Windows & macOS' },
  { k: 'Type', v: 'Desktop music player' },
  { k: 'License', v: 'Open source — MIT', href: REPO },
  { k: 'Repository', v: 'noobcoder1982/shono.fm', href: REPO },
]

/** Specifications — only facts verified against the repository and release page. */
export function Specs() {
  return (
    <Section id="specs" nav="specs" n="06" title="Specifications" titleSize="text-[clamp(1.9rem,2.8vw,3rem)]">
      <dl>
        {ROWS.map((r) => (
          <div key={r.k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b-2 border-ink p-4 md:grid-cols-[13rem_1fr] md:px-6 md:py-6">
            <dt className="label">{r.k}</dt>
            <dd className="display min-w-0 text-[clamp(1.4rem,3.6vw,3.6rem)] !leading-none semi [overflow-wrap:anywhere]">
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:bg-orange">
                  {r.v}
                  <ArrowUpRight className="shrink-0" size={28} />
                </a>
              ) : (
                r.v
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
