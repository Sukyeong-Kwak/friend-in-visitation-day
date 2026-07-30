import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import Schedule from './components/Schedule'
import MapSection from './components/MapSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="page">
        <main className="card">
          <Hero />
          <EventDetails />
          <Schedule />
          <MapSection />
          <Footer />
        </main>
      </div>
      <Analytics />
    </>
  )
}
