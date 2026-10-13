
import { useState } from 'react'
import { Menu, X, Plane, ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Offers', href: '#offers' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="jetora-navbar fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <nav className="section-wrap flex min-h-[76px] items-center justify-between gap-4">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="JETORA home"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071b35] text-[#61c9ff]">
            <Plane size={22} />
          </span>
          <span>
            <span className="jetora-brand-title font-heading block text-xl font-extrabold tracking-[2px] text-[#071b35]">
              JETORA
            </span>
            <span className="jetora-brand-tagline block text-[9px] font-bold tracking-[2px] text-slate-400">
              YOUR JOURNEY. OUR SKY.
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="jetora-nav-link text-sm font-semibold text-slate-600 transition hover:text-[#1686d9]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="#flight-search" className="primary-button hidden !px-4 !py-3 sm:inline-flex">
          Book a flight <ArrowUpRight size={17} />
        </a>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#071b35] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="jetora-mobile-menu border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-none flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="jetora-mobile-link rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#flight-search"
              onClick={() => setOpen(false)}
              className="primary-button mt-2"
            >
              Book a flight <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}



