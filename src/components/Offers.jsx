
import { ArrowRight, Check, Clock, Plane, Sparkles, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

const offers = [
  {
    id: 1,
    category: 'DOMESTIC ESCAPE',
    title: 'Explore India',
    subtitle: 'Your next city break is closer than you think.',
    price: '₹24,999',
    note: 'Illustrative starting fare',
    discount: 'UP TO 20% OFF',
    icon: Plane,
    color: 'from-sky-500 to-blue-700',
    points: ['Flexible travel dates', 'Multiple city choices', 'Easy trip planning'],
  },
  {
    id: 2,
    category: 'INTERNATIONAL',
    title: 'Beyond Borders',
    subtitle: 'Make your first international adventure memorable.',
    price: '₹14,999',
    note: 'Illustrative starting fare',
    discount: 'SPECIAL DEAL',
    icon: Sparkles,
    color: 'from-indigo-500 to-violet-700',
    points: ['Explore global destinations', 'Holiday inspiration', 'Travel support'],
  },
  {
    id: 3,
    category: 'HOLIDAY PACKAGE',
    title: 'Escape the Ordinary',
    subtitle: 'Take a break with a thoughtfully planned getaway.',
    price: '₹9,999',
    note: 'Illustrative package price',
    discount: 'TRAVEL MORE',
    icon: Tag,
    color: 'from-orange-400 to-rose-600',
    points: ['Destination suggestions', 'Flexible package options', 'Personalised enquiry'],
  },
]

export default function Offers() {
  return (
    <section id="offers" className="bg-[#f5f9fd] py-20 sm:py-24">
      <div className="section-wrap">
        <div className="mb-10 text-center">
          <span className="section-kicker">
            <Sparkles size={15} /> Specially for you
          </span>
          <h2 className="section-title mt-3">More adventure. Less planning.</h2>
          <p className="section-copy mx-auto mt-3 max-w-2xl">
            Find inspiration for your next getaway with our featured travel
            ideas and sample offers.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {offers.map((offer, index) => {
            const Icon = offer.icon

            return (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-br ${offer.color} p-6 text-white`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-extrabold tracking-widest">
                      {offer.category}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                      <Icon size={22} />
                    </span>
                  </div>
                  <h3 className="font-heading mt-7 text-2xl font-extrabold">
                    {offer.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-white/85">
                    {offer.subtitle}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-bold">
                    <Clock size={14} /> {offer.discount}
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="font-heading mt-1 text-3xl font-extrabold text-[#071b35]">
                    {offer.price}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{offer.note}</p>

                  <ul className="mt-5 space-y-3">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={16} className="shrink-0 text-emerald-500" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="primary-button mt-6 w-full">
                    Enquire about offers <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          All fares and discounts shown are illustrative examples for this
          website demonstration. Actual availability, terms, and prices must
          be confirmed before purchase.
        </p>
      </div>
    </section>
  )
}

