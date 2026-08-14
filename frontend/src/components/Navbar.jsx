import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: true },
]

const serviceLinks = [
  { to: '/services', label: 'All cover' },
  { to: '/services/motor', label: 'Motor insurance' },
  { to: '/services/health', label: 'Health insurance' },
  { to: '/services/life', label: 'Life insurance' },
]

const overlayNav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    key: 'services',
    label: 'Services',
    children: [
      { to: '/services', label: 'All' },
      { to: '/services/motor', label: 'Motor' },
      { to: '/services/health', label: 'Health' },
      { to: '/services/life', label: 'Life' },
    ],
  },
  { to: '/contact', label: 'Contact' },
]

const lineEase = { duration: 0.4, ease: 'easeInOut' }
const overlayEase = [0.4, 0, 0.2, 1]
const itemEase = [0.22, 1, 0.36, 1]

const overlayItem = {
  closed: { opacity: 0, y: 20 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.45 + i * 0.12, duration: 0.6, ease: itemEase },
  }),
}

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [overlayServices, setOverlayServices] = useState(false)
  const dropRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
    setOverlayServices(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) setOverlayServices(false)
  }, [menuOpen])

  useEffect(() => {
    const onPointer = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('nav-locked', menuOpen)
    document.body.classList.toggle('nav-locked', menuOpen)
    return () => {
      document.documentElement.classList.remove('nav-locked')
      document.body.classList.remove('nav-locked')
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll()
    }
    const onResize = () => {
      if (window.innerWidth > 980) closeAll()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  function openServices() {
    clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }

  function closeServicesSoon() {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140)
  }

  function closeAll() {
    setMenuOpen(false)
    setServicesOpen(false)
    setOverlayServices(false)
  }

  const onServices = location.pathname.startsWith('/services')

  const overlay = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="mobile-overlay"
          className="mobile-overlay"
          initial={{ clipPath: 'circle(0% at 94% 4%)' }}
          animate={{ clipPath: 'circle(160% at 94% 4%)' }}
          exit={{ clipPath: 'circle(0% at 94% 4%)' }}
          transition={{ duration: 0.8, ease: overlayEase }}
        >
          <nav className="mobile-overlay-nav" aria-label="Mobile">
            {overlayNav.map((item, i) =>
              item.children ? (
                <motion.div
                  key={item.key}
                  className="mobile-overlay-group"
                  custom={i}
                  variants={overlayItem}
                  initial="closed"
                  animate="open"
                >
                  <button
                    type="button"
                    className={`mobile-overlay-link is-toggle ${onServices || overlayServices ? 'is-current' : ''}`}
                    aria-expanded={overlayServices}
                    onClick={() => setOverlayServices((v) => !v)}
                  >
                    <span>{item.label}</span>
                    <i className={`mobile-overlay-caret ${overlayServices ? 'is-open' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {overlayServices && (
                      <motion.div
                        className="mobile-overlay-subs"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: itemEase }}
                      >
                        {item.children.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={`mobile-overlay-sub ${location.pathname === sub.to ? 'is-current' : ''}`}
                            onClick={closeAll}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key={item.to}
                  custom={i}
                  variants={overlayItem}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    to={item.to}
                    className={`mobile-overlay-link ${location.pathname === item.to ? 'is-current' : ''}`}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ),
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'scrolled' : ''} ${menuOpen ? 'is-menu' : ''}`}>
        <div className="container-wide nav-inner">
          <Link to="/" className="brand" onClick={closeAll}>
            <img src="/brand/logo-light.png" alt="myInsurancemates" />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}>
                {l.label}
              </NavLink>
            ))}
            <div
              className={`nav-drop ${servicesOpen ? 'is-open' : ''}`}
              ref={dropRef}
              onMouseEnter={openServices}
              onMouseLeave={closeServicesSoon}
            >
              <NavLink
                to="/services"
                className={() => (onServices ? 'active' : undefined)}
                onClick={closeAll}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
              </NavLink>
              <div className="nav-drop-menu" hidden={!servicesOpen}>
                <div className="nav-drop-card">
                  {serviceLinks.map((item) => (
                    <Link key={item.to} to={item.to} onClick={closeAll}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="nav-actions">
            <span className="nav-contact">
              <Button to="/contact" variant="cream">
                Contact Us
              </Button>
            </span>
            <button
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <motion.i
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                transition={lineEase}
              />
              <motion.i
                animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 15 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.i
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                transition={lineEase}
              />
            </button>
          </div>
        </div>
      </header>
      {typeof document !== 'undefined' ? createPortal(overlay, document.body) : overlay}
    </>
  )
}
