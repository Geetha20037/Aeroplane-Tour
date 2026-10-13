import { motion } from 'framer-motion'
import { Plane, Ticket, MapPin, Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.div
      className="jetora-cinematic-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{ duration: 6, times: [0, 0.84, 0.94, 1], ease: 'linear' }}
      role="status"
      aria-label="JETORA is preparing your journey"
    >
      <div className="jc-stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{
            left: `${(i * 37 + 9) % 100}%`,
            top: `${(i * 23 + 7) % 100}%`,
            animationDelay: `${(i % 6) * 0.3}s`
          }}>✦</span>
        ))}
      </div>

      <div className="jc-brand">
        <span className="jc-brand-icon"><Plane size={22} /></span>
        JETORA
      </div>

      <div className="jc-stage">
        <div className="jc-sun" />
        <div className="jc-horizon" />

        <motion.div
          className="jc-route"
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: [0, 1, 1], scaleX: [0.2, 1, 1] }}
          transition={{ duration: 2, delay: 2.7, ease: 'easeInOut' }}
        />

        <motion.div
          className="jc-ticket"
          initial={{ opacity: 0, y: 18, x: '-50%', rotate: -3, scale: 0.92 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [18, 0, 0, -12],
            x: '-50%',
            rotate: [-3, 0, 0, 2],
            scale: [0.92, 1, 1, 0.97]
          }}
          transition={{
            duration: 3.1,
            times: [0, 0.18, 0.82, 1],
            ease: 'easeInOut'
          }}
        >
          <div className="jc-ticket-top">
            <span><Ticket size={15} /> BOARDING PASS</span>
            <span className="jc-ticket-code">JT · 026</span>
          </div>

          <div className="jc-ticket-cities">
            <div>
              <strong>HYD</strong>
              <small>Hyderabad</small>
            </div>
            <span className="jc-ticket-arrow"><Plane size={21} /></span>
            <div className="jc-city-right">
              <strong>ANYWHERE</strong>
              <small>Your next adventure</small>
            </div>
          </div>

          <div className="jc-ticket-bottom">
            <span>YOUR JOURNEY STARTS HERE</span>
            <Sparkles size={15} />
          </div>
          <div className="jc-ticket-stamp">READY</div>
        </motion.div>

        {/* Runway and plane appear after the boarding pass */}
        <motion.div
          className="jc-runway"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: [0, 1, 1, 0.5], scaleX: [0.4, 1, 1, 1] }}
          transition={{ duration: 3.1, delay: 2.5, ease: 'easeInOut' }}
        >
          <span />
          <span />
          <span />
        </motion.div>

        <motion.div
          className="jc-takeoff-plane"
          initial={{ opacity: 0, x: -105, y: 58, rotate: 0, scale: 0.75 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            x: [-105, -105, -80, -25, 100],
            y: [58, 58, 52, 15, -90],
            rotate: [0, 0, -3, -10, -20],
            scale: [0.75, 0.75, 0.82, 0.95, 1.12]
          }}
          transition={{
            duration: 3.3,
            delay: 2.5,
            times: [0, 0.1, 0.35, 0.7, 1],
            ease: [0.45, 0, 0.55, 1]
          }}
        >
          <Plane size={55} strokeWidth={1.7} />
        </motion.div>

        <motion.div
          className="jc-destination"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 0, 1], y: [12, 12, 0] }}
          transition={{ duration: 1, delay: 4.5 }}
        >
          <span className="jc-destination-pin"><MapPin size={19} /></span>
          <span>
            <small>DESTINATION UNLOCKED</small>
            <strong>Adventure awaits.</strong>
          </span>
        </motion.div>
      </div>

      <motion.div
        className="jc-copy"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -5] }}
        transition={{ duration: 5.8, times: [0, 0.12, 0.9, 1] }}
      >
        <h1>Your world is waiting.</h1>
        <p>Every great story begins with a journey.</p>
      </motion.div>

      <div className="jc-progress">
        <motion.span
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5.8, ease: 'linear' }}
        />
      </div>

      <p className="jc-caption">DISCOVER MORE <i /> TRAVEL BETTER</p>
    </motion.div>
  )
}
