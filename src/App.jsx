import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FlightSearch from './components/FlightSearch'
import Destinations from './components/Destinations'
import Offers from './components/Offers'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import TravelHub from './components/TravelHub'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 6000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pt-[76px] text-slate-900">
      {isLoading && <LoadingScreen />}
      <Navbar />
      <main>
        <Hero />
        <FlightSearch />
        <Destinations />
        <TravelHub />
        <Offers />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}



