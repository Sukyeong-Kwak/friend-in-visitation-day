import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero'
import EventDetails from './components/EventDetails'
import Schedule from './components/Schedule'
import Program from './components/Program'
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
          <Program />
          <MapSection />
          <Footer />
        </main>
      </div>
      <Analytics />
    </>
  )
}
