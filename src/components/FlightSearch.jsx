import { useState } from 'react'
import {
  ArrowLeftRight, CalendarDays, Plane, Search, Users,
  Clock, CheckCircle2, ArrowRight, ArrowLeft, X, Ticket,
  Printer, ShieldCheck
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const flightOptions = [
  { airline: 'JETORA Airways', code: 'JT 204', depart: '06:15', arrive: '07:25', duration: '1h 10m', stops: 'Non-stop', price: 4299 },
  { airline: 'Skyline Air', code: 'SL 618', depart: '10:40', arrive: '12:05', duration: '1h 25m', stops: 'Non-stop', price: 5199 },
  { airline: 'AeroConnect', code: 'AC 352', depart: '16:20', arrive: '17:35', duration: '1h 15m', stops: 'Non-stop', price: 4799 },
]

const formatDate = (date) => date
  ? new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : 'Not selected'

const money = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function FlightSearch() {
  const [trip, setTrip] = useState('round')
  const [from, setFrom] = useState('Hyderabad (HYD)')
  const [to, setTo] = useState('Tirupati (TIR)')
  const [depart, setDepart] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [cabin, setCabin] = useState('Economy')
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState('search')
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [passengerName, setPassengerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [passengerAge, setPassengerAge] = useState('')
  const [booking, setBooking] = useState(null)

  const today = new Date().toLocaleDateString('en-CA')
  const total = selectedFlight
    ? selectedFlight.price * Number(passengers) * (trip === 'round' ? 2 : 1)
    : 0

  function swapCities() {
    setFrom(to)
    setTo(from)
    setMessage('')
  }

  function searchFlights(event) {
    event.preventDefault()

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setMessage('Please choose different departure and arrival cities.')
      return
    }
    if (!depart || depart < today) {
      setMessage('Please choose a valid departure date.')
      return
    }
    if (trip === 'round' && (!returnDate || returnDate < depart)) {
      setMessage('Return date must be on or after your departure date.')
      return
    }

    setMessage('')
    setSelectedFlight(null)
    setBooking(null)
    setStage('results')
  }

  function confirmBooking(event) {
    event.preventDefault()

    const reference = `JT${Date.now().toString().slice(-8)}`
    setBooking({
      reference,
      passengerName: passengerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      age: passengerAge,
      from,
      to,
      depart,
      returnDate: trip === 'round' ? returnDate : '',
      trip,
      passengers,
      cabin,
      flight: selectedFlight,
      total,
      bookedAt: new Date().toLocaleString('en-IN'),
    })
    setStage('confirmed')
  }

  function resetBooking() {
    setStage('search')
    setSelectedFlight(null)
    setBooking(null)
    setMessage('')
  }

  return (
    <section id="flight-search" className="relative z-10 -mt-8 pb-16">
      <div className="section-wrap">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_65px_rgba(7,27,53,0.12)] sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[#1686d9]">
                <Plane size={20} />
              </span>
              <div>
                <h2 className="font-heading text-lg font-extrabold text-[#071b35]">
                  {stage === 'search' ? 'Find your flight' : stage === 'results' ? 'Choose your flight' : stage === 'passenger' ? 'Passenger details' : stage === 'review' ? 'Review your booking' : 'Booking confirmed'}
                </h2>
                <p className="text-xs text-slate-500">
                  {stage === 'confirmed' ? 'Your JETORA demo ticket is ready' : 'Your next journey starts here'}
                </p>
              </div>
            </div>
            {stage !== 'search' && stage !== 'confirmed' && (
              <button type="button" onClick={resetBooking} className="text-sm font-semibold text-slate-500 hover:text-[#1686d9]">
                Start again
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {stage === 'search' && (
              <motion.form key="search" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onSubmit={searchFlights}>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-600">Choose your trip type</span>
                  <div className="flex rounded-lg bg-slate-100 p-1">
                    {[{ value: 'round', label: 'Round trip' }, { value: 'one', label: 'One way' }].map((option) => (
                      <button key={option.value} type="button" onClick={() => { setTrip(option.value); setMessage('') }} className={`rounded-md px-4 py-2 text-sm font-semibold transition ${trip === option.value ? 'bg-white text-[#1686d9] shadow-sm' : 'text-slate-500'}`}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-12">
                  <div className="relative lg:col-span-3">
                    <label htmlFor="flight-from" className="mb-2 block text-xs font-bold text-slate-600">FROM</label>
                    <input id="flight-from" className="form-control pr-10" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Departure city" required />
                    <button type="button" onClick={swapCities} className="absolute -right-3 top-[37px] z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1686d9] shadow-sm hover:bg-sky-50 lg:flex" aria-label="Swap departure and arrival"><ArrowLeftRight size={15} /></button>
                  </div>
                  <div className="lg:col-span-3">
                    <label htmlFor="flight-to" className="mb-2 block text-xs font-bold text-slate-600">TO</label>
                    <input id="flight-to" className="form-control" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Arrival city" required />
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="flight-depart" className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-600"><CalendarDays size={14} /> DEPARTURE</label>
                    <input id="flight-depart" className="form-control" type="date" min={today} value={depart} onChange={(e) => { setDepart(e.target.value); if (returnDate && e.target.value > returnDate) setReturnDate('') }} required />
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="flight-return" className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-600"><CalendarDays size={14} /> RETURN</label>
                    <input id="flight-return" className="form-control" type="date" min={depart || today} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} disabled={trip === 'one'} required={trip === 'round'} />
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="flight-passengers" className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-600"><Users size={14} /> TRAVELLERS</label>
                    <select id="flight-passengers" className="form-control" value={passengers} onChange={(e) => setPassengers(e.target.value)}>{[1,2,3,4,5,6,7,8,9].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'traveller' : 'travellers'}</option>)}</select>
                  </div>
                  <div className="sm:col-span-1 lg:col-span-4">
                    <label htmlFor="flight-cabin" className="mb-2 block text-xs font-bold text-slate-600">CABIN CLASS</label>
                    <select id="flight-cabin" className="form-control" value={cabin} onChange={(e) => setCabin(e.target.value)}><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select>
                  </div>
                  <div className="sm:col-span-1 lg:col-span-8">
                    <button type="submit" className="primary-button w-full !py-[13px]"><Search size={18} /> Search flights</button>
                  </div>
                </div>
                {message && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
              </motion.form>
            )}

            {stage === 'results' && (
              <motion.div key="results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="mb-5 rounded-xl bg-sky-50 p-4">
                  <p className="font-bold text-[#071b35]">{from} <ArrowRight className="mx-1 inline" size={16} /> {to}</p>
                  <p className="mt-1 text-sm text-slate-600">{formatDate(depart)}{trip === 'round' ? ` — Return ${formatDate(returnDate)}` : ' — One way'} · {passengers} traveller(s) · {cabin}</p>
                  <p className="mt-2 text-xs font-semibold text-sky-800">DEMO FLIGHTS · Sample fares, not live airline availability</p>
                </div>
                <div className="space-y-3">
                  {flightOptions.map((flight) => (
                    <div key={flight.code} className="rounded-xl border border-slate-200 p-4 transition hover:border-sky-300 sm:p-5">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#1686d9]"><Plane size={21} /></span>
                          <div><p className="font-bold text-[#071b35]">{flight.airline}</p><p className="text-xs text-slate-500">{flight.code} · {cabin}</p></div>
                        </div>
                        <div className="flex flex-1 items-center justify-between gap-3 sm:justify-center">
                          <div><p className="text-lg font-extrabold text-[#071b35]">{flight.depart}</p><p className="text-xs text-slate-500">{from}</p></div>
                          <div className="text-center"><p className="text-xs text-slate-500"><Clock size={12} className="mr-1 inline" />{flight.duration}</p><div className="my-1 flex items-center gap-1 text-sky-500"><span className="h-px flex-1 bg-sky-200" /><Plane size={14} /><span className="h-px flex-1 bg-sky-200" /></div><p className="text-[11px] text-emerald-700">{flight.stops}</p></div>
                          <div><p className="text-lg font-extrabold text-[#071b35]">{flight.arrive}</p><p className="text-xs text-slate-500">{to}</p></div>
                        </div>
                        <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                          <div><p className="text-xl font-extrabold text-[#071b35]">{money(flight.price * Number(passengers) * (trip === 'round' ? 2 : 1))}</p><p className="text-[11px] text-slate-500">Sample total fare</p></div>
                          <button type="button" onClick={() => { setSelectedFlight(flight); setStage('passenger') }} className="primary-button !px-4 !py-2.5">Select flight</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setStage('search')} className="outline-button mt-5"><ArrowLeft size={16} /> Edit search</button>
              </motion.div>
            )}

            {stage === 'passenger' && selectedFlight && (
              <motion.form key="passenger" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onSubmit={(event) => { event.preventDefault(); setStage('review') }}>
                <div className="mb-5 rounded-xl bg-sky-50 p-4">
                  <p className="font-bold text-[#071b35]">{selectedFlight.airline} · {selectedFlight.code}</p>
                  <p className="mt-1 text-sm text-slate-600">{from} → {to} · {formatDate(depart)}</p>
                  <p className="mt-2 text-lg font-extrabold text-[#1686d9]">{money(total)} <span className="text-xs font-medium text-slate-500">sample demo fare</span></p>
                </div>
                <h3 className="mb-4 font-heading text-lg font-extrabold text-[#071b35]">Lead passenger details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="passenger-name" className="mb-2 block text-sm font-semibold text-slate-600">Full name</label><input id="passenger-name" className="form-control" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} autoComplete="name" placeholder="As shown on ID" required minLength={2} /></div>
                  <div><label htmlFor="passenger-age" className="mb-2 block text-sm font-semibold text-slate-600">Age</label><input id="passenger-age" className="form-control" type="number" min="1" max="110" value={passengerAge} onChange={(e) => setPassengerAge(e.target.value)} placeholder="Passenger age" required /></div>
                  <div><label htmlFor="passenger-email" className="mb-2 block text-sm font-semibold text-slate-600">Email address</label><input id="passenger-email" className="form-control" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
                  <div><label htmlFor="passenger-phone" className="mb-2 block text-sm font-semibold text-slate-600">Phone number</label><input id="passenger-phone" className="form-control" type="tel" autoComplete="tel" pattern="[0-9+() -]{8,18}" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact number" required /></div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">Demo only: details stay in this page's current session and are not sent to an airline.</p>
                <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => setStage('results')} className="outline-button"><ArrowLeft size={16} /> Back to flights</button><button type="submit" className="primary-button">Review booking <ArrowRight size={16} /></button></div>
              </motion.form>
            )}

            {stage === 'review' && selectedFlight && (
              <motion.div key="review" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="mb-5 rounded-xl border border-slate-200 p-5">
                  <p className="mb-4 flex items-center gap-2 font-bold text-[#071b35]"><Ticket size={19} /> Booking summary <span className="ml-auto rounded-full bg-amber-50 px-2 py-1 text-[10px] font-extrabold tracking-wider text-amber-700">DEMO</span></p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><p className="text-xs text-slate-500">PASSENGER</p><p className="mt-1 font-bold">{passengerName}</p><p className="text-sm text-slate-600">Age {passengerAge}</p></div>
                    <div><p className="text-xs text-slate-500">CONTACT</p><p className="mt-1 break-all font-semibold">{email}</p><p className="text-sm text-slate-600">{phone}</p></div>
                    <div><p className="text-xs text-slate-500">FLIGHT</p><p className="mt-1 font-bold">{selectedFlight.airline} · {selectedFlight.code}</p><p className="text-sm text-slate-600">{selectedFlight.depart} – {selectedFlight.arrive} · {selectedFlight.duration}</p></div>
                    <div><p className="text-xs text-slate-500">JOURNEY</p><p className="mt-1 font-bold">{from} → {to}</p><p className="text-sm text-slate-600">{formatDate(depart)}{trip === 'round' ? ` · Return ${formatDate(returnDate)}` : ''}</p></div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div><p className="font-bold text-[#071b35]">{passengers} traveller(s) · {cabin}</p><p className="text-xs text-slate-500">Sample fare · no payment collected</p></div><p className="text-xl font-extrabold text-[#1686d9]">{money(total)}</p></div>
                </div>
                <div className="mb-5 flex gap-3 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-900"><ShieldCheck size={19} className="mt-0.5 shrink-0" /><p>This is a demonstration only. Confirming creates a local demo reference, not a real reservation, airline PNR, or paid ticket.</p></div>
                <div className="flex flex-wrap gap-3"><button type="button" onClick={() => setStage('passenger')} className="outline-button"><ArrowLeft size={16} /> Edit details</button><button type="button" onClick={() => setStage('confirmed') || setBooking({ reference: `JT${Date.now().toString().slice(-8)}`, passengerName: passengerName.trim(), email: email.trim(), phone: phone.trim(), age: passengerAge, from, to, depart, returnDate: trip === 'round' ? returnDate : '', trip, passengers, cabin, flight: selectedFlight, total, bookedAt: new Date().toLocaleString('en-IN') })} className="primary-button"><CheckCircle2 size={17} /> Confirm demo booking</button></div>
              </motion.div>
            )}

            {stage === 'confirmed' && booking && (
              <motion.div key="confirmed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center sm:p-8">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><CheckCircle2 size={34} /></span>
                  <p className="mt-4 text-xs font-extrabold tracking-[0.2em] text-emerald-700">DEMO BOOKING CREATED</p>
                  <h3 className="font-heading mt-2 text-2xl font-extrabold text-[#071b35]">Your trip summary is ready!</h3>
                  <p className="mt-2 text-sm text-slate-600">This is a demo confirmation, not an actual airline ticket.</p>
                </div>
                <div id="jetora-ticket" className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between gap-3 bg-[#071b35] p-5 text-white"><div><p className="text-xs font-bold tracking-widest text-sky-200">JETORA</p><p className="mt-1 text-lg font-extrabold">Travel demo ticket</p></div><Plane size={27} /></div>
                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-slate-200 pb-5"><div><p className="text-xs text-slate-500">DEMO REFERENCE</p><p className="mt-1 text-lg font-extrabold tracking-wider text-[#1686d9]">{booking.reference}</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">NOT VALID FOR TRAVEL</span></div>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-6"><div><p className="text-2xl font-extrabold text-[#071b35]">{booking.from}</p><p className="mt-2 text-sm text-slate-500">{formatDate(booking.depart)}</p><p className="mt-1 text-lg font-bold">{booking.flight.depart}</p></div><div className="text-center text-sky-500"><Plane size={22} className="mx-auto" /><p className="mt-1 text-[10px] text-slate-500">{booking.flight.duration}</p><ArrowRight size={25} className="mx-auto mt-1" /></div><div className="text-right"><p className="text-2xl font-extrabold text-[#071b35]">{booking.to}</p><p className="mt-2 text-sm text-slate-500">{formatDate(booking.depart)}</p><p className="mt-1 text-lg font-bold">{booking.flight.arrive}</p></div></div>
                    {booking.trip === 'round' && <div className="mb-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">Return journey: <strong>{formatDate(booking.returnDate)}</strong> · Return flight details are not assigned in this demo.</div>}
                    <div className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2"><div><p className="text-xs text-slate-500">PASSENGER</p><p className="mt-1 font-bold">{booking.passengerName}</p><p className="text-sm text-slate-500">Age {booking.age}</p></div><div><p className="text-xs text-slate-500">FLIGHT</p><p className="mt-1 font-bold">{booking.flight.airline} · {booking.flight.code}</p><p className="text-sm text-slate-500">{booking.cabin} · {booking.passengers} traveller(s)</p></div><div><p className="text-xs text-slate-500">CONTACT</p><p className="mt-1 break-all font-semibold">{booking.email}</p><p className="text-sm text-slate-500">{booking.phone}</p></div><div><p className="text-xs text-slate-500">DEMO TOTAL</p><p className="mt-1 text-xl font-extrabold text-[#1686d9]">{money(booking.total)}</p><p className="text-xs text-slate-500">No payment collected</p></div></div>
                  </div>
                  <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs leading-5 text-slate-500">Created {booking.bookedAt}. This demo reference is not an airline PNR, ticket, or proof of payment.</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 print:hidden"><button type="button" onClick={() => window.print()} className="primary-button"><Printer size={17} /> Print / Save PDF</button><button type="button" onClick={resetBooking} className="outline-button"><Search size={16} /> New search</button></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style>{`@media print { body * { visibility: hidden !important; } #jetora-ticket, #jetora-ticket * { visibility: visible !important; } #jetora-ticket { position: absolute; left: 0; top: 0; width: 100%; border: 0 !important; } }`}</style>
    </section>
  )
}
