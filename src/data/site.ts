export const REPO = 'https://github.com/noobcoder1982/shono.fm'
export const RELEASES = `${REPO}/releases`
export const RELEASE = `${REPO}/releases/tag/v2.0.0`
const DL = `${REPO}/releases/download/v2.0.0`

export const VERSION = '2.0.0'

/**
 * Asset names and sizes were verified against the v2.0.0 release page.
 * Any asset not listed here must link to RELEASE instead of guessing a URL.
 */
export const WINDOWS = {
  platform: 'Windows 10 / 11',
  arch: 'x64',
  label: 'SHONO Setup 2.0.0.exe',
  file: 'shono.fm.Setup.2.0.0.exe',
  size: '193 MB',
  url: `${DL}/shono.fm.Setup.2.0.0.exe`,
}

export type MacArch = 'arm64' | 'x64'

export const MAC: Record<
  MacArch,
  { name: string; hint: string; file: string; size: string; url: string; zipFile: string; zipSize: string; zipUrl: string }
> = {
  arm64: {
    name: 'Apple Silicon',
    hint: 'M1 / M2 / M3 / M4',
    file: 'shono.fm-2.0.0-arm64.dmg',
    size: '135 MB',
    url: `${DL}/shono.fm-2.0.0-arm64.dmg`,
    zipFile: 'shono.fm-2.0.0-arm64-mac.zip',
    zipSize: '135 MB',
    zipUrl: `${DL}/shono.fm-2.0.0-arm64-mac.zip`,
  },
  x64: {
    name: 'Intel',
    hint: 'x64',
    file: 'shono.fm-2.0.0.dmg',
    size: '139 MB',
    url: `${DL}/shono.fm-2.0.0.dmg`,
    zipFile: 'shono.fm-2.0.0-mac.zip',
    zipSize: '139 MB',
    zipUrl: `${DL}/shono.fm-2.0.0-mac.zip`,
  },
}

export const XATTR = 'xattr -cr /Applications/SHONO.app'

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'themes', label: 'Themes' },
  { id: 'specs', label: 'Specifications' },
  { id: 'download', label: 'Downloads' },
] as const

export type NavId = (typeof NAV)[number]['id']
