export interface Track {
  id: string
  title: string
  artist: string
  album: string
  /** Self-hosted cover art, 640px. */
  art: string
  /** Track length in seconds, as listed by the catalogue source. */
  secs: number
}

/**
 * Real tracks and albums used to illustrate the library. Artwork belongs to its respective owners and is
 * shown here only to demonstrate how SHONO displays a collection. Nothing on this page plays these recordings.
 */
export const TRACKS: Track[] = [
  {
    "id": "t01",
    "title": "I Really Do...",
    "artist": "Karan Aujla",
    "album": "P-POP CULTURE",
    "art": "/art/p-pop-culture.jpg",
    "secs": 193
  },
  {
    "id": "t02",
    "title": "For A Reason",
    "artist": "Karan Aujla",
    "album": "P-POP CULTURE",
    "art": "/art/p-pop-culture.jpg",
    "secs": 180
  },
  {
    "id": "t03",
    "title": "Boyfriend",
    "artist": "Karan Aujla",
    "album": "P-POP CULTURE",
    "art": "/art/p-pop-culture.jpg",
    "secs": 160
  },
  {
    "id": "t04",
    "title": "HIM.",
    "artist": "Karan Aujla",
    "album": "P-POP CULTURE",
    "art": "/art/p-pop-culture.jpg",
    "secs": 191
  },
  {
    "id": "t05",
    "title": "Midnight City",
    "artist": "M83",
    "album": "Midnight City (Remix EP)",
    "art": "/art/midnight-city-remix-ep.jpg",
    "secs": 244
  },
  {
    "id": "t06",
    "title": "Nightcall",
    "artist": "Kavinsky",
    "album": "Nightcall",
    "art": "/art/nightcall.jpg",
    "secs": 259
  },
  {
    "id": "t07",
    "title": "Instant Crush (feat. Julian Casablancas)",
    "artist": "Daft Punk",
    "album": "Random Access Memories",
    "art": "/art/random-access-memories.jpg",
    "secs": 337
  },
  {
    "id": "t08",
    "title": "Nanchaku",
    "artist": "Seedhe Maut",
    "album": "न",
    "art": "/art/seedhe-maut-na.jpg",
    "secs": 193
  },
  {
    "id": "t09",
    "title": "The Less I Know The Better",
    "artist": "Tame Impala",
    "album": "Currents",
    "art": "/art/currents.jpg",
    "secs": 217
  },
  {
    "id": "t10",
    "title": "Nights",
    "artist": "Frank Ocean",
    "album": "Blonde",
    "art": "/art/blonde.jpg",
    "secs": 307
  },
  {
    "id": "t11",
    "title": "Nude",
    "artist": "Radiohead",
    "album": "In Rainbows",
    "art": "/art/in-rainbows.jpg",
    "secs": 255
  },
  {
    "id": "t12",
    "title": "Alright",
    "artist": "Kendrick Lamar",
    "album": "To Pimp A Butterfly",
    "art": "/art/to-pimp-a-butterfly.jpg",
    "secs": 219
  },
  {
    "id": "t13",
    "title": "Chamber Of Reflection",
    "artist": "Mac DeMarco",
    "album": "Salad Days",
    "art": "/art/salad-days.jpg",
    "secs": 232
  },
  {
    "id": "t14",
    "title": "goosebumps",
    "artist": "Travis Scott",
    "album": "Birds In The Trap Sing McKnight",
    "art": "/art/birds-in-the-trap-sing-mcknight.jpg",
    "secs": 243
  },
  {
    "id": "t15",
    "title": "Moonlight",
    "artist": "XXXTENTACION",
    "album": "?",
    "art": "/art/xxx-question.jpg",
    "secs": 135
  },
  {
    "id": "t16",
    "title": "EARFQUAKE",
    "artist": "Tyler, The Creator",
    "album": "IGOR",
    "art": "/art/igor.jpg",
    "secs": 190
  }
]

export interface Album {
  key: string
  album: string
  artist: string
  art: string
  tracks: Track[]
}

export const ALBUMS: Album[] = (() => {
  const map = new Map<string, Album>()
  for (const t of TRACKS) {
    const a = map.get(t.art) ?? { key: t.art, album: t.album, artist: t.artist, art: t.art, tracks: [] }
    a.tracks.push(t)
    map.set(t.art, a)
  }
  return [...map.values()]
})()
