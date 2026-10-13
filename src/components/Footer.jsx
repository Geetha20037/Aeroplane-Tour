
import { ArrowUpRight, Instagram, Linkedin, Plane, Twitter } from 'lucide-react'

const footerLinks = {
  Explore: [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Flight search', href: '#flight-search' },
    { label: 'Travel offers', href: '#offers' },
  ],
  Company: [
    { label: 'About us', href: '#about' },
    { label: 'Our services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#041326] text-white">
      <div className="section-wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#61c9ff]">
                <Plane size={23} />
              </span>
              <span>
                <span className="font-heading block text-xl font-extrabold tracking-[2px]">
                  JETORA
                </span>
                <span className="block text-[9px] font-semibold tracking-[2px] text-slate-400">
                  YOUR JOURNEY. OUR SKY.
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Discover new horizons, find travel inspiration, and make room
              for extraordinary memories.
            </p>

            <div className="mt-5 flex gap-3">
              {[
                { label: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/' },
                { label: 'Twitter', Icon: Twitter, href: 'https://x.com/' },
                { label: 'LinkedIn', Icon: Linkedin, href: 'https://www.linkedin.com/' },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-sky-400 hover:bg-sky-400/10 hover:text-sky-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-heading font-bold">{heading}</h3>
              <ul className="mt-5 space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-[#61c9ff]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-heading font-bold">Ready to take off?</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Start planning your next adventure today.
            </p>
            <a href="#flight-search" className="primary-button mt-5">
              Plan a trip <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} JETORA. All rights reserved.</p>
          <p>Designed for explorers. Built for the journey.</p>
        </div>
      </div>
    </footer>
  )
}

