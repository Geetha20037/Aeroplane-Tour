
import { useState } from 'react'
import { ArrowRight, Clock3, MapPin, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'

export default function Destinations() {
  const [selected, setSelected] = useState(null)

  function enquire(destination) {
    setSelected(destination)
    const contact = document.getElementById('contact')
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="destinations" className="section-wrap py-20 sm:py-24">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="section-kicker">
            <MapPin size={15} /> Explore the world
          </span>
          <h2 className="section-title mt-3">Places that stay with you.</h2>
          <p className="section-copy mt-3 max-w-xl">
            Discover extraordinary escapes, vibrant cities, and unforgettable
            experiences handpicked for your next adventure.
          </p>
        </div>
        <a href="#offers" className="outline-button self-start sm:self-auto">
          Explore our offers <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <motion.article
            key={destination.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="surface-card group overflow-hidden"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#071b35] shadow-sm">
                {destination.tag}
              </span>
              <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#071b35]/80 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {destination.rating}
              </span>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
              <h3 className="font-heading absolute bottom-4 left-5 text-2xl font-extrabold text-white">
                {destination.name}
              </h3>
            </div>

            <div className="p-5">
              <p className="text-sm text-slate-500">{destination.country}</p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                {destination.description}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Package from</p>
                  <p className="font-heading text-xl font-extrabold text-[#071b35]">
                    ₹{destination.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1 text-xs text-slate-500">
                    <Clock3 size={13} /> {destination.duration}
                  </p>
                  <button
                    type="button"
                    onClick={() => enquire(destination)}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#1686d9] hover:underline"
                  >
                    Enquire now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {selected && (
        <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
          You selected <strong>{selected.name}</strong>. Complete the contact form
          below to enquire about this package. Displayed prices are illustrative
          starting prices, not live quotes.
        </div>
      )}
    </section>
  )
}

