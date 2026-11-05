import type { Region } from '@/lib/shots'

interface Shot {
  src: string
  w: number
  h: number
  alt: string
}

/**
 * Shows one region of a real screenshot, scaled to fill its box. Pure CSS background positioning,
 * so the pixels are the application's own — nothing is redrawn.
 */
export function Crop({ shot, r, className = '' }: { shot: Shot; r: Region; className?: string }) {
  const posX = shot.w === r.w ? 0 : (r.x / (shot.w - r.w)) * 100
  const posY = shot.h === r.h ? 0 : (r.y / (shot.h - r.h)) * 100
  return (
    <div
      role="img"
      aria-label={shot.alt}
      className={`w-full bg-no-repeat ${className}`}
      style={{
        aspectRatio: `${r.w} / ${r.h}`,
        backgroundImage: `url(${shot.src})`,
        backgroundSize: `${(shot.w / r.w) * 100}% auto`,
        backgroundPosition: `${posX}% ${posY}%`,
      }}
    />
  )
}
