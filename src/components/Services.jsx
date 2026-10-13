import { useState } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarCheck,
  Headset,
  Hotel,
  MapPinned,
  ShieldCheck,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    icon: CalendarCheck,
    title: 'Flight Planning',
    description: 'Compare trip options, organise your itinerary, and prepare for your next departure.',
    details: 'Plan your journey by reviewing travel dates, departure and arrival cities, preferred timings, and itinerary options before booking.',
    points: ['Organise your travel itinerary', 'Review departure and arrival details', 'Prepare your trip checklist'],
  },
  {
    icon: Hotel,
    title: 'Stay & Explore',
    description: 'Discover accommodation ideas and destinations that suit your travel style.',
    details: 'Explore accommodation ideas and plan the places you want to visit based on your destination, budget, and travel preferences.',
    points: ['Explore accommodation options', 'Plan nearby attractions', 'Match your stay to your travel style'],
  },
  {
    icon: MapPinned,
    title: 'Holiday Packages',
    description: 'Find inspiration for beach holidays, cultural escapes, and exciting adventures.',
    details: 'Build a holiday plan around the experiences you enjoy, from relaxing beach breaks to cultural trips and outdoor adventures.',
    points: ['Explore holiday ideas', 'Plan activities and sightseeing', 'Organise your travel schedule'],
  },
  {
    icon: BriefcaseBusiness,
    title: 'Business Travel',
    description: 'Plan work trips with organised schedules and practical travel arrangements.',
    details: 'Keep business travel organised with a clear itinerary, planned connections, accommodation arrangements, and meeting schedules.',
    points: ['Coordinate travel dates', 'Organise meetings and schedules', 'Prepare an efficient itinerary'],
  },
  {
    icon: ShieldCheck,
    title: 'Travel Guidance',
    description: 'Get guidance on travel documents, preparation checklists, and trip essentials.',
    details: 'Prepare for your journey with a checklist of important documents, destination requirements to verify, and essential items to pack.',
    points: ['Review document requirements', 'Prepare a packing checklist', 'Check destination-specific guidance'],
  },
  {
    icon: Headset,
    title: 'Travel Assistance',
    description: 'Send us your questions and let our contact team help you plan your journey.',
    details: 'Need help planning your trip? Contact the JETORA team with your travel questions and preferred arrangements.',
    points: ['Ask travel-planning questions', 'Discuss your travel preferences', 'Request assistance with next steps'],
    contact: true,
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <>
      <section id="services" className="section-wrap py-20 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <span className="section-kicker">
            <MapPinned size={15} /> Travel made simpler
          </span>
          <h2 className="section-title mt-3">Everything for your next journey.</h2>
          <p className="section-copy mt-3">
            From the first idea to your travel checklist, JETORA brings useful
            planning services together in one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="surface-card group p-6 sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#1686d9] transition group-hover:bg-[#1686d9] group-hover:text-white">
                    <Icon size={23} />
                  </span>
                  <ArrowUpRight
                    size={19}
                    className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1686d9]"
                  />
                </div>
                <h3 className="font-heading mt-6 text-lg font-extrabold text-[#071b35]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {service.description}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1686d9] hover:text-[#071b35]"
                >
                  Learn more <ArrowUpRight size={15} />
                </button>
              </motion.article>
            )
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071b35]/65 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedService(null)
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-dialog-title"
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close service details"
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>

              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#1686d9]">
                <selectedService.icon size={24} />
              </span>
              <h2 id="service-dialog-title" className="font-heading mt-5 pr-8 text-2xl font-extrabold text-[#071b35]">
                {selectedService.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {selectedService.details}
              </p>

              <ul className="mt-5 space-y-3">
                {selectedService.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#1686d9]" />
                    {point}
                  </li>
                ))}
              </ul>

              {selectedService.contact && (
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="primary-button mt-7 w-full"
                >
                  Contact JETORA <ArrowUpRight size={16} />
                </a>
              )}
              {!selectedService.contact && (
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="primary-button mt-7 w-full"
                >
                  Got it
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
