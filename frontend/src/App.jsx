import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import FloatingContact from './components/FloatingContact.jsx'
import Footer from './components/Footer.jsx'
import IntroSplash from './components/IntroSplash.jsx'
import Navbar from './components/Navbar.jsx'
import { ScrollTrigger } from './lib/gsap.js'
import { IntroProvider } from './lib/intro.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import Services from './pages/Services.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.classList.remove('nav-locked')
    document.body.classList.remove('nav-locked')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <IntroProvider>
      <IntroSplash />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="page-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingContact />
    </IntroProvider>
  )
}
