import { useEffect, useMemo, useState } from 'react'

const destinations = [
  { id: 1, name: 'Bali', country: 'Indonesia', price: 24999, emoji: '🌴', type: 'Beach', days: 4, description: 'Tropical beaches, temples and unforgettable sunsets.' },
  { id: 2, name: 'Paris', country: 'France', price: 45999, emoji: '🗼', type: 'City', days: 5, description: 'Romantic streets, iconic landmarks and cafe culture.' },
  { id: 3, name: 'Swiss Alps', country: 'Switzerland', price: 58999, emoji: '🏔️', type: 'Adventure', days: 6, description: 'Mountain views, scenic trains and alpine villages.' },
  { id: 4, name: 'Maldives', country: 'Maldives', price: 38999, emoji: '🏝️', type: 'Beach', days: 4, description: 'Crystal-clear water and peaceful island escapes.' },
  { id: 5, name: 'Tokyo', country: 'Japan', price: 42999, emoji: '🏯', type: 'City', days: 5, description: 'Modern skylines, local food and timeless traditions.' },
  { id: 6, name: 'Manali', country: 'India', price: 11999, emoji: '🏞️', type: 'Adventure', days: 3, description: 'Mountain air, riverside walks and scenic trails.' },
]

const flights = [
  { id: 'JT101', airline: 'Jet Airways Demo', from: 'Hyderabad', to: 'Goa', depart: '06:15', arrive: '07:35', duration: 80, price: 4299, stops: 'Non-stop' },
  { id: 'JT204', airline: 'Skyline Air Demo', from: 'Hyderabad', to: 'Goa', depart: '09:40', arrive: '12:10', duration: 150, price: 3199, stops: '1 stop' },
  { id: 'JT315', airline: 'AeroVista Demo', from: 'Hyderabad', to: 'Goa', depart: '14:20', arrive: '15:40', duration: 80, price: 4899, stops: 'Non-stop' },
  { id: 'JT428', airline: 'CloudNine Demo', from: 'Hyderabad', to: 'Goa', depart: '19:05', arrive: '21:25', duration: 140, price: 2799, stops: '1 stop' },
]

const money = (amount) => '₹' + Number(amount).toLocaleString('en-IN')
const readSaved = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

export default function TravelHub() {
  const [activeTab, setActiveTab] = useState('Explore')
  const [wishlist, setWishlist] = useState(() => readSaved('jetora-wishlist'))
  const [trips, setTrips] = useState(() => readSaved('jetora-trips'))
  const [notice, setNotice] = useState('')
  const [destinationQuery, setDestinationQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [flightSort, setFlightSort] = useState('price')
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [flightFrom, setFlightFrom] = useState('Hyderabad')
  const [flightTo, setFlightTo] = useState('Goa')
  const [travelDate, setTravelDate] = useState('')
  const [plannerPlace, setPlannerPlace] = useState('Bali')
  const [plannerDays, setPlannerDays] = useState('4')
  const [plannerBudget, setPlannerBudget] = useState('30000')
  const [travelStyle, setTravelStyle] = useState('Relaxation')
  const [itinerary, setItinerary] = useState(null)
  const [budgetDestination, setBudgetDestination] = useState('Bali')
  const [budgetDays, setBudgetDays] = useState(4)
  const [budgetPeople, setBudgetPeople] = useState(2)
  const [budgetHotel, setBudgetHotel] = useState(3500)
  const [budgetActivities, setBudgetActivities] = useState(1500)

  useEffect(() => {
    localStorage.setItem('jetora-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('jetora-trips', JSON.stringify(trips))
  }, [trips])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const filteredDestinations = useMemo(() => destinations.filter((item) => {
    const matchesQuery = `${item.name} ${item.country}`.toLowerCase().includes(destinationQuery.toLowerCase())
    return matchesQuery && (category === 'All' || item.type === category)
  }), [destinationQuery, category])

  const sortedFlights = useMemo(() => [...flights].sort((a, b) => {
    if (flightSort === 'duration') return a.duration - b.duration
    if (flightSort === 'departure') return a.depart.localeCompare(b.depart)
    return a.price - b.price
  }), [flightSort])

  const toggleWishlist = (place) => {
    const exists = wishlist.some((item) => item.id === place.id)
    setWishlist((current) => exists ? current.filter((item) => item.id !== place.id) : [...current, place])
    setNotice(exists ? `${place.name} removed from wishlist` : `${place.name} saved to wishlist`)
  }

  const saveTrip = (trip) => {
    setTrips((current) => [{ ...trip, savedAt: new Date().toLocaleDateString('en-IN'), tripId: `${Date.now()}-${Math.random().toString(16).slice(2, 7)}` }, ...current])
    setNotice('Trip saved to My Trips')
  }

  const makeItinerary = (event) => {
    event.preventDefault()
    const place = destinations.find((item) => item.name === plannerPlace) || destinations[0]
    const days = Math.max(1, Math.min(10, Number(plannerDays) || 1))
    const activities = travelStyle === 'Adventure'
      ? ['Explore a scenic trail', 'Try a local outdoor adventure', 'Visit a viewpoint and discover local food']
      : travelStyle === 'Culture'
        ? ['Visit a landmark or museum', 'Explore a historic neighbourhood', 'Enjoy a local food and culture walk']
        : travelStyle === 'Food'
          ? ['Try a local breakfast spot', 'Explore a food market', 'Enjoy a regional speciality']
          : ['Enjoy a relaxed morning', 'Explore a popular local attraction', 'Watch the sunset and unwind']
    setItinerary({
      place: place.name,
      days,
      budget: Number(plannerBudget) || 0,
      style: travelStyle,
      schedule: Array.from({ length: days }, (_, index) => ({
        day: index + 1,
        activity: activities[index % activities.length],
        extra: index === 0 ? `Start exploring ${place.name}` : index === days - 1 ? 'Keep time for shopping and your return journey' : 'Leave room for a spontaneous discovery',
      })),
    })
  }

  const baseCost = (destinations.find((item) => item.name === budgetDestination)?.price || 20000) * budgetPeople
  const hotelCost = budgetHotel * budgetDays
  const activityCost = budgetActivities * budgetDays * budgetPeople
  const totalBudget = baseCost + hotelCost + activityCost
  const perPerson = totalBudget / Math.max(1, budgetPeople)

  const tabs = [
    { label: 'Explore', icon: '🌍' },
    { label: 'Compare Flights', icon: '✈️' },
    { label: 'Trip Planner', icon: '🧭' },
    { label: 'Budget', icon: '💰' },
    { label: `My Trips (${trips.length})`, icon: '🧳', key: 'My Trips' },
    { label: `Wishlist (${wishlist.length})`, icon: '♡', key: 'Wishlist' },
  ]

  return (
    <section id="travel-hub" className="jh-section">
      <div className="jh-container">
        <div className="jh-heading">
          <div>
            <span className="jh-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>Make every journey <span>count.</span></h2>
            <p>Discover places, compare sample flights and plan a trip that fits you.</p>
          </div>
        </div>

        <div className="jh-tabs" role="tablist" aria-label="Travel tools">
          {tabs.map((tab) => {
            const key = tab.key || tab.label
            return <button type="button" role="tab" aria-selected={activeTab === key} className={`jh-tab ${activeTab === key ? 'is-active' : ''}`} key={key} onClick={() => setActiveTab(key)}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          })}
        </div>

        {activeTab === 'Explore' && <div className="jh-panel">
          <div className="jh-panel-head">
            <div><h3>Find your kind of somewhere</h3><p>Save your favourite places and come back to them anytime.</p></div>
            <input className="jh-input jh-search" value={destinationQuery} onChange={(e) => setDestinationQuery(e.target.value)} placeholder="Search destinations..." aria-label="Search destinations" />
          </div>
          <div className="jh-filters">
            {['All', 'Beach', 'City', 'Adventure'].map((type) => <button type="button" key={type} onClick={() => setCategory(type)} className={`jh-filter ${category === type ? 'selected' : ''}`}>{type}</button>)}
          </div>
          <div className="jh-destination-grid">
            {filteredDestinations.map((place) => {
              const saved = wishlist.some((item) => item.id === place.id)
              return <article className="jh-destination-card" key={place.id}>
                <div className="jh-place-art"><span className="jh-place-emoji">{place.emoji}</span><span className="jh-place-type">{place.type}</span><button type="button" className={`jh-heart ${saved ? 'saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Add'} ${place.name} ${saved ? 'from' : 'to'} wishlist`} onClick={() => toggleWishlist(place)}>{saved ? '♥' : '♡'}</button></div>
                <div className="jh-place-content"><div className="jh-place-location">{place.country}</div><h4>{place.name}</h4><p>{place.description}</p><div className="jh-place-bottom"><div><small>EST. FROM</small><strong>{money(place.price)}</strong></div><button type="button" className="jh-small-btn" onClick={() => { setPlannerPlace(place.name); setActiveTab('Trip Planner') }}>Plan trip ↗</button></div></div>
              </article>
            })}
          </div>
          {filteredDestinations.length === 0 && <div className="jh-empty">No destinations match that search. Try another place.</div>}
        </div>}

        {activeTab === 'Compare Flights' && <div className="jh-panel">
          <div className="jh-panel-head"><div><h3>Compare before you take off</h3><p>Sample flight options for planning practice — not live fares.</p></div><span className="jh-demo-label">DEMO DATA</span></div>
          <form className="jh-flight-form" onSubmit={(e) => { e.preventDefault(); setNotice(`Showing sample flights from ${flightFrom} to ${flightTo}`) }}>
            <label>From<input className="jh-input" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} required /></label>
            <label>To<input className="jh-input" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} required /></label>
            <label>Travel date<input className="jh-input" type="date" min={new Date().toISOString().slice(0, 10)} value={travelDate} onChange={(e) => setTravelDate(e.target.value)} /></label>
            <button className="jh-primary-btn" type="submit">Search sample flights</button>
          </form>
          <div className="jh-results-head"><span>{flights.length} sample options</span><label>Sort by <select className="jh-select" value={flightSort} onChange={(e) => setFlightSort(e.target.value)}><option value="price">Lowest price</option><option value="duration">Shortest duration</option><option value="departure">Departure time</option></select></label></div>
          <div className="jh-flight-list">{sortedFlights.map((flight) => <article className={`jh-flight-card ${selectedFlight?.id === flight.id ? 'chosen' : ''}`} key={flight.id}>
            <div className="jh-airline-mark">✈</div><div className="jh-airline-info"><strong>{flight.airline}</strong><small>{flight.id} · {flight.stops}</small></div>
            <div className="jh-flight-time"><strong>{flight.depart}</strong><small>{flightFrom}</small></div><div className="jh-flight-route"><span>{flight.duration < 100 ? '1h 20m' : `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`}</span><i /><small>{flight.stops}</small></div><div className="jh-flight-time"><strong>{flight.arrive}</strong><small>{flightTo}</small></div>
            <div className="jh-flight-price"><strong>{money(flight.price)}</strong><small>per person</small><button type="button" className="jh-small-btn" onClick={() => setSelectedFlight(flight)}>{selectedFlight?.id === flight.id ? 'Selected ✓' : 'Select'}</button></div>
          </article>)}</div>
          {selectedFlight && <div className="jh-selection-box"><div><strong>{selectedFlight.airline} selected</strong><p>{flightFrom} → {flightTo}{travelDate ? ` · ${travelDate}` : ''} · {money(selectedFlight.price)} per person</p></div><button type="button" className="jh-primary-btn" onClick={() => saveTrip({ type: 'Sample flight', title: `${flightFrom} to ${flightTo}`, date: travelDate || 'Date not selected', price: selectedFlight.price, details: `${selectedFlight.airline} · ${selectedFlight.depart} departure` })}>Save to My Trips</button></div>}
        </div>}

        {activeTab === 'Trip Planner' && <div className="jh-panel">
          <div className="jh-panel-head"><div><h3>Your trip, your way</h3><p>Create a simple day-by-day starter itinerary around your travel style.</p></div><span className="jh-demo-label">INSTANT PLANNER</span></div>
          <form className="jh-planner-form" onSubmit={makeItinerary}>
            <label>Destination<select className="jh-input" value={plannerPlace} onChange={(e) => setPlannerPlace(e.target.value)}>{destinations.map((place) => <option key={place.id}>{place.name}</option>)}</select></label>
            <label>Number of days<select className="jh-input" value={plannerDays} onChange={(e) => setPlannerDays(e.target.value)}>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>)}</select></label>
            <label>Budget per person (₹)<input className="jh-input" type="number" min="0" value={plannerBudget} onChange={(e) => setPlannerBudget(e.target.value)} required /></label>
            <label>Travel style<select className="jh-input" value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)}><option>Relaxation</option><option>Adventure</option><option>Culture</option><option>Food</option></select></label>
            <button className="jh-primary-btn jh-full-btn" type="submit">✨ Create my itinerary</button>
          </form>
          {itinerary && <div className="jh-itinerary"><div className="jh-itinerary-head"><div><span className="jh-eyebrow">YOUR TRIP OUTLINE</span><h4>{itinerary.days}-day escape to {itinerary.place}</h4><p>{itinerary.style} · Budget {money(itinerary.budget)} per person</p></div><button type="button" className="jh-small-btn" onClick={() => saveTrip({ type: 'Itinerary', title: `${itinerary.days}-day ${itinerary.place} trip`, price: itinerary.budget, details: `${itinerary.style} itinerary`, schedule: itinerary.schedule })}>Save itinerary</button></div>
            <div className="jh-itinerary-days">{itinerary.schedule.map((day) => <div className="jh-itinerary-day" key={day.day}><span>DAY {String(day.day).padStart(2, '0')}</span><div><strong>{day.activity}</strong><p>{day.extra}</p></div></div>)}</div>
            <p className="jh-disclaimer">Suggested outline only. Check local opening times, travel requirements and actual prices before booking.</p>
          </div>}
        </div>}

        {activeTab === 'Budget' && <div className="jh-panel">
          <div className="jh-panel-head"><div><h3>Know your number</h3><p>Estimate your trip total and split it per traveller.</p></div><span className="jh-demo-label">COST ESTIMATE</span></div>
          <div className="jh-budget-layout"><div className="jh-budget-form">
            <label>Destination<select className="jh-input" value={budgetDestination} onChange={(e) => setBudgetDestination(e.target.value)}>{destinations.map((place) => <option key={place.id}>{place.name}</option>)}</select></label>
            <label>Trip duration <strong>{budgetDays} days</strong><input className="jh-range" type="range" min="1" max="14" value={budgetDays} onChange={(e) => setBudgetDays(Number(e.target.value))} /></label>
            <label>Travellers <strong>{budgetPeople}</strong><input className="jh-range" type="range" min="1" max="10" value={budgetPeople} onChange={(e) => setBudgetPeople(Number(e.target.value))} /></label>
            <label>Hotel per night (₹)<input className="jh-input" type="number" min="0" value={budgetHotel} onChange={(e) => setBudgetHotel(Math.max(0, Number(e.target.value)))} /></label>
            <label>Activities per person/day (₹)<input className="jh-input" type="number" min="0" value={budgetActivities} onChange={(e) => setBudgetActivities(Math.max(0, Number(e.target.value)))} /></label>
          </div><div className="jh-budget-result"><span>ESTIMATED TOTAL</span><strong>{money(totalBudget)}</strong><p>Approximate costs for {budgetPeople} {budgetPeople === 1 ? 'traveller' : 'travellers'}</p><div className="jh-cost-row"><span>Destination travel allowance</span><strong>{money(baseCost)}</strong></div><div className="jh-cost-row"><span>Accommodation</span><strong>{money(hotelCost)}</strong></div><div className="jh-cost-row"><span>Activities</span><strong>{money(activityCost)}</strong></div><div className="jh-cost-per-person"><span>Estimated per person</span><strong>{money(perPerson)}</strong></div><button type="button" className="jh-primary-btn jh-full-btn" onClick={() => saveTrip({ type: 'Budget plan', title: `${budgetDestination} budget plan`, price: totalBudget, details: `${budgetDays} days · ${budgetPeople} traveller(s) · ${money(perPerson)} per person` })}>Save budget plan</button></div></div>
          <p className="jh-disclaimer">Planning estimate only. The destination allowance is a rough placeholder, not a live ticket quote. Actual costs can vary.</p>
        </div>}

        {activeTab === 'My Trips' && <div className="jh-panel">
          <div className="jh-panel-head"><div><h3>Your travel collection</h3><p>Trips and plans you saved on this device.</p></div><span className="jh-count-bubble">{trips.length} saved</span></div>
          {trips.length ? <div className="jh-saved-list">{trips.map((trip) => <article className="jh-saved-card" key={trip.tripId}><div className="jh-saved-icon">{trip.type === 'Sample flight' ? '✈️' : trip.type === 'Budget plan' ? '💰' : '🧳'}</div><div className="jh-saved-info"><span>{trip.type} · Saved {trip.savedAt}</span><h4>{trip.title}</h4><p>{trip.details}{trip.date && trip.date !== 'Date not selected' ? ` · ${trip.date}` : ''}</p></div><div className="jh-saved-price">{money(trip.price || 0)}<button type="button" onClick={() => { setTrips((current) => current.filter((item) => item.tripId !== trip.tripId)); setNotice('Trip removed') }}>Remove</button></div></article>)}</div> : <div className="jh-empty"><span>🧳</span><h4>Your next adventure belongs here</h4><p>Save a destination plan, sample flight or budget to see it here.</p><button type="button" className="jh-primary-btn" onClick={() => setActiveTab('Explore')}>Explore destinations</button></div>}
          <p className="jh-disclaimer">Saved locally in this browser. These entries are not confirmed reservations or purchased tickets.</p>
        </div>}

        {activeTab === 'Wishlist' && <div className="jh-panel">
          <div className="jh-panel-head"><div><h3>Places to dream about</h3><p>Your favourite destinations, saved in one place.</p></div><span className="jh-count-bubble">{wishlist.length} saved</span></div>
          {wishlist.length ? <div className="jh-destination-grid">{wishlist.map((place) => <article className="jh-destination-card" key={place.id}><div className="jh-place-art"><span className="jh-place-emoji">{place.emoji}</span><span className="jh-place-type">{place.type}</span><button type="button" className="jh-heart saved" onClick={() => toggleWishlist(place)} aria-label={`Remove ${place.name} from wishlist`}>♥</button></div><div className="jh-place-content"><div className="jh-place-location">{place.country}</div><h4>{place.name}</h4><p>{place.description}</p><div className="jh-place-bottom"><div><small>EST. FROM</small><strong>{money(place.price)}</strong></div><button type="button" className="jh-small-btn" onClick={() => { setPlannerPlace(place.name); setActiveTab('Trip Planner') }}>Plan trip ↗</button></div></div></article>)}</div> : <div className="jh-empty"><span>♡</span><h4>Save the places that inspire you</h4><p>Tap the heart on any destination to build your travel wishlist.</p><button type="button" className="jh-primary-btn" onClick={() => setActiveTab('Explore')}>Discover places</button></div>}
        </div>}
        {notice && <div className="jh-toast" role="status">{notice}</div>}
      </div>
    </section>
  )
}





