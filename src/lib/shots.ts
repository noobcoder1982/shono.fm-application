/** The two real application screenshots, with their natural dimensions for region cropping. */
export const SHOT_A = { src: '/app/shot-a.webp', w: 1568, h: 930, alt: 'SHONO Archive: the library view with the album ledger, playlists, details panel and waveform transport.' }
export const SHOT_B = { src: '/app/shot-b.webp', w: 1568, h: 924, alt: 'SHONO full-screen player: large artwork, transport controls and synchronized lyrics with the active line in focus.' }

export interface Region {
  x: number
  y: number
  w: number
  h: number
}
