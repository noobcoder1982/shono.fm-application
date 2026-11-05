import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { Loader, introSeen } from '@/components/Loader'
import { Nav } from '@/components/Nav'
import { Albums } from '@/sections/Albums'
import { Customize } from '@/sections/Customize'
import { Download } from '@/sections/Download'
import { Hero } from '@/sections/Hero'
import { Interface } from '@/sections/Interface'
import { Library } from '@/sections/Library'
import { Lyrics } from '@/sections/Lyrics'
import { Player } from '@/sections/Player'
import { Specs } from '@/sections/Specs'
import { Themes } from '@/sections/Themes'
import { Visualizer } from '@/sections/Visualizer'

export default function App() {
  const [ready, setReady] = useState(introSeen)
  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Nav />
      <main id="main">
        <Hero />
        <Library />
        <Albums />
        <Player />
        <Lyrics />
        <Themes />
        <Visualizer />
        <Customize />
        <Interface />
        <Specs />
        <Download />
      </main>
      <Footer />
    </>
  )
}
