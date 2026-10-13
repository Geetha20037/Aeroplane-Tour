
import { ArrowRight, Compass, Globe2, Heart, PlaneTakeoff } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Compass,
    title: 'Thoughtful planning',
    text: 'Helpful information to make every stage of a journey easier to organise.',
  },
  {
    icon: Heart,
    title: 'Travel for everyone',
    text: 'Ideas and experiences for solo explorers, families, couples, and groups.',
  },
  {
    icon: Globe2,
    title: 'A world of inspiration',
    text: 'Explore new cultures, discover beautiful places, and create your own story.',
  },
]

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-[#071b35] py-20 text-white sm:py-24">
      <div className="section-wrap grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative"
        >
          <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-sky-400/20" />
          <img
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1100&q=85"
            alt="Beautiful green landscape and forest travel scenery"
            loading="lazy"
            className="relative h-[360px] w-full rounded-2xl object-cover shadow-2xl sm:h-[430px]"
          />
          <div className="hero-float absolute -bottom-5 right-4 rounded-2xl border border-white/15 bg-white p-5 text-[#071b35] shadow-xl sm:right-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-[#1686d9]">
                <PlaneTakeoff size={22} />
              </span>
              <div>
                <p className="font-heading text-lg font-extrabold">Go beyond</p>
                <p className="text-xs text-slate-500">The ordinary</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="pt-4 lg:pt-0"
        >
          <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[2px] text-[#61c9ff]">
            <Globe2 size={16} /> ABOUT JETORA
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Every great story begins with a journey.
          </h2>
          <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
            At JETORA, we believe travel is more than reaching a destination.
            It is about the experiences you discover, the people you meet, and
            the memories you bring home.
          </p>
          <p className="mt-3 text-sm leading-8 text-slate-300 sm:text-base">
            Our goal is to make travel inspiration and trip planning easier
            through a clear, friendly, and thoughtfully designed experience.
          </p>

          <div className="mt-8 space-y-5">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <div key={value.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#61c9ff]">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold">{value.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{value.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <a href="#contact" className="primary-button mt-8">
            Plan your journey <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

