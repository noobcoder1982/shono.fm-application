export interface Theme {
  id: string
  name: string
  note: string
  bg: string
  panel: string
  fg: string
  mut: string
  acc: string
  accInk: string
}

/** Sample palettes for the specimen in the Themes section. */
export const THEMES: Theme[] = [
  { id: 'noir', name: 'Noir', note: 'Black, amber', bg: '#0d0c0b', panel: '#1a1816', fg: '#f3eee4', mut: '#8a847a', acc: '#ff6a13', accInk: '#0a0908' },
  { id: 'concrete', name: 'Concrete', note: 'Grey, signal red', bg: '#c9c6c0', panel: '#dcd9d3', fg: '#1b1a18', mut: '#6b6760', acc: '#e4400a', accInk: '#f7f3ea' },
  { id: 'phosphor', name: 'Phosphor', note: 'Green on black', bg: '#031207', panel: '#07200e', fg: '#b6ffc9', mut: '#4c9a62', acc: '#39ff7a', accInk: '#031207' },
  { id: 'tapedeck', name: 'Tapedeck', note: 'Oxide brown, brass', bg: '#2a1d14', panel: '#35261b', fg: '#f1dfc2', mut: '#a58a68', acc: '#ffb02e', accInk: '#2a1d14' },
  { id: 'swiss', name: 'Swiss', note: 'White, one red', bg: '#f4f2ee', panel: '#ffffff', fg: '#111111', mut: '#777777', acc: '#e3001b', accInk: '#ffffff' },
  { id: 'stealth', name: 'Stealth', note: 'Midnight blue', bg: '#070b14', panel: '#0d1424', fg: '#dbe6ff', mut: '#6c7fa8', acc: '#4d8bff', accInk: '#070b14' },
]
