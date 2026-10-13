
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Globe2, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#071b35] text-white"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=90')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06172f]/95 via-[#071b35]/75 to-[#071b35]/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071b35]/60 via-transparent to-[#071b35]/10" />

      <div className="section-wrap grid min-h-[590px] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-sky-100 backdrop-blur-md">
            <Sparkles size={15} className="text-[#ffb16d]" />
            YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.08] tracking-[-2px] sm:text-6xl lg:text-[72px]">
            The world is
            <br />
            yours to <span className="text-[#61c9ff]">discover.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-200 sm:text-lg">
            From spontaneous weekend escapes to once-in-a-lifetime adventures,
            find the journey that moves you with JETORA.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#flight-search" className="primary-button !rounded-xl !px-3 !py-4">
              Explore flights <ArrowRight size={18} />
            </a>
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-3 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Discover places <ArrowDown size={17} />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/20 pt-6">
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Globe2 size={19} className="text-[#61c9ff]" />
              Global destinations
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <ShieldCheck size={19} className="text-[#61c9ff]" />
              Travel support
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden min-h-[360px] items-center justify-center lg:flex"
        >
          <div className="hero-float absolute right-4 top-4 rounded-2xl border border-white/25 bg-white/15 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#61c9ff] text-[#071b35]">
                <Globe2 size={23} />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold">100+</p>
                <p className="text-xs text-slate-200">Places to discover</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-2 rounded-2xl border border-white/20 bg-[#071b35]/65 p-5 backdrop-blur-xl">
            <p className="text-xs font-semibold tracking-widest text-sky-200">
              THE JOURNEY MATTERS
            </p>
            <p className="mt-2 font-heading text-lg font-bold">
              Make every mile memorable.
            </p>
          </div>

          <svg
            viewBox="0 0 420 320"
            className="w-full max-w-[410px] drop-shadow-2xl"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="210" cy="160" r="125" stroke="#61c9ff" strokeOpacity=".22" strokeWidth="1.5" />
            <circle cx="210" cy="160" r="94" stroke="#ffffff" strokeOpacity=".24" strokeDasharray="5 8" />
            <path d="M72 193 C115 72, 287 61, 344 153" stroke="#61c9ff" strokeWidth="2" strokeDasharray="6 8" />
            <path d="M328 143 L344 153 L336 170" stroke="#61c9ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <g transform="translate(140 120) rotate(-17 70 40)">
              <path
                d="M15 45 L64 40 L105 5 Q113 0 118 7 L100 39 L139 43 Q149 45 148 52 L146 58 L96 56 L73 88 Q69 94 62 91 L72 56 L18 60 L3 72 L-1 67 L8 49 L1 35 L6 31 Z"
                fill="#ffffff"
              />
              <path d="M65 43 L97 14 L104 14 L87 40 Z" fill="#61c9ff" />
            </g>
            <circle cx="72" cy="193" r="5" fill="#61c9ff" />
            <circle cx="344" cy="153" r="5" fill="#ffb16d" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

