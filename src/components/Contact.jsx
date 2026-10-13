
import { useState } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  travellers: '1',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')
  const today = new Date().toLocaleDateString('en-CA')

  function update(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
    setStatus('')
  }

  function submit(event) {
    event.preventDefault()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('Please enter a valid email address.')
      return
    }

    if (form.phone.replace(/\D/g, '').length < 7) {
      setStatus('Please enter a valid contact number.')
      return
    }

    if (form.travelDate && form.travelDate < today) {
      setStatus('Please select a future travel date.')
      return
    }

    const enquiry = {
      ...form,
      submittedAt: new Date().toISOString(),
    }

    try {
      const previous = JSON.parse(
        localStorage.getItem('jetora-enquiries') || '[]',
      )
      const enquiries = Array.isArray(previous) ? previous : []

      localStorage.setItem(
        'jetora-enquiries',
        JSON.stringify([...enquiries, enquiry]),
      )

      setStatus(
        'Your enquiry passed validation and was saved in this browser. No email was sent. Our demo form is not connected to a booking service.',
      )
      setForm(initialForm)
    } catch {
      setStatus(
        'Your enquiry passed validation, but browser storage is unavailable. No email was sent.',
      )
    }
  }

  return (
    <section id="contact" className="section-wrap py-20 sm:py-24">
      <div className="mb-10 text-center">
        <span className="section-kicker">
          <MessageCircle size={15} /> Let's plan something wonderful
        </span>
        <h2 className="section-title mt-3">Your next journey starts here.</h2>
        <p className="section-copy mx-auto mt-3 max-w-xl">
          Tell us what you have in mind. Fill out the enquiry form to get
          started with your travel plans.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-slate-100 shadow-[0_15px_55px_rgba(7,27,53,0.07)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="bg-[#071b35] p-7 text-white sm:p-10">
          <span className="text-xs font-extrabold tracking-[2px] text-[#61c9ff]">
            GET IN TOUCH
          </span>
          <h3 className="font-heading mt-4 text-3xl font-extrabold leading-tight">
            Let's make your travel dreams happen.
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Questions about destinations or packages? Send us your details
            using the form and explore your next adventure.
          </p>

          <div className="mt-9 space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#61c9ff]">
                <Mail size={20} />
              </span>
              <div>
                <p className="font-semibold">Email</p>
                <p className="mt-1 break-all text-sm text-slate-300">
                  hello@jetora.example
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#61c9ff]">
                <Phone size={20} />
              </span>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="mt-1 text-sm text-slate-300">
                  Demo contact — not yet configured
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#61c9ff]">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-semibold">Travel with confidence</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Explore travel inspiration from destinations around the world.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Clock size={19} className="mt-0.5 shrink-0 text-[#61c9ff]" />
              <p className="text-xs leading-6 text-slate-300">
                This is a demonstration website. Contact information and
                booking integrations must be configured before going live.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="p-6 sm:p-10">
          <h3 className="font-heading text-xl font-extrabold text-[#071b35]">
            Send a travel enquiry
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Fields marked with * are required.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">
                Full name *
              </label>
              <input
                id="contact-name"
                className="form-control"
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Enter your name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">
                Email address *
              </label>
              <input
                id="contact-email"
                className="form-control"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold">
                Phone number *
              </label>
              <input
                id="contact-phone"
                className="form-control"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={update}
                placeholder="Your contact number"
                autoComplete="tel"
                minLength={7}
                maxLength={20}
                required
              />
            </div>

            <div>
              <label htmlFor="contact-destination" className="mb-2 block text-sm font-semibold">
                Destination *
              </label>
              <select
                id="contact-destination"
                className="form-control"
                name="destination"
                value={form.destination}
                onChange={update}
                required
              >
                <option value="">Choose destination</option>
                <option>Bali</option>
                <option>Paris</option>
                <option>Dubai</option>
                <option>Maldives</option>
                <option>Swiss Alps</option>
                <option>Singapore</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-date" className="mb-2 block text-sm font-semibold">
                Preferred travel date
              </label>
              <input
                id="contact-date"
                className="form-control"
                name="travelDate"
                type="date"
                min={today}
                value={form.travelDate}
                onChange={update}
              />
            </div>

            <div>
              <label htmlFor="contact-travellers" className="mb-2 block text-sm font-semibold">
                Travellers
              </label>
              <select
                id="contact-travellers"
                className="form-control"
                name="travellers"
                value={form.travellers}
                onChange={update}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? 'traveller' : 'travellers'}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">
                Tell us about your trip
              </label>
              <textarea
                id="contact-message"
                className="form-control min-h-28 resize-y"
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Share your preferences or questions..."
                maxLength={1000}
              />
            </div>
          </div>

          <button type="submit" className="primary-button mt-6 w-full">
            Submit enquiry <Send size={16} />
          </button>

          {status && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 flex items-start gap-2 rounded-xl bg-sky-50 p-4 text-sm leading-6 text-sky-900"
            >
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <span>{status}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

