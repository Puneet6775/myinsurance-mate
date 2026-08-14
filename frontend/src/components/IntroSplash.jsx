import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIntro } from '../lib/intro.jsx'

const ease = [0.22, 1, 0.36, 1]
const lift = [0.76, 0, 0.24, 1]
const HOLD_MS = 2400

export default function IntroSplash() {
  const { ready, finish } = useIntro()
  const [show, setShow] = useState(() => !ready)

  useEffect(() => {
    if (!show) return
    document.documentElement.classList.add('intro-locked')
    document.body.classList.add('intro-locked')
    const onKey = (e) => {
      if (e.key === 'Escape') setShow(false)
    }
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => setShow(false), HOLD_MS)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
      document.documentElement.classList.remove('intro-locked')
      document.body.classList.remove('intro-locked')
    }
  }, [show])

  useEffect(() => {
    if (!show) {
      document.documentElement.classList.remove('intro-locked')
      document.body.classList.remove('intro-locked')
    }
  }, [show])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence onExitComplete={finish}>
      {show && (
        <motion.div
          className="intro-splash"
          role="dialog"
          aria-label="Welcome to myInsurancemates"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: lift }}
          onClick={() => setShow(false)}
        >
          <span className="intro-orb intro-orb-a" aria-hidden="true" />
          <span className="intro-orb intro-orb-b" aria-hidden="true" />

          <div className="intro-stage">
            <motion.span
              className="intro-flash"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.35, 1.15, 1.7] }}
              transition={{ duration: 1.15, ease, times: [0, 0.38, 1] }}
            />
            <motion.span
              className="intro-ring"
              aria-hidden="true"
              initial={{ opacity: 0.7, scale: 0.55 }}
              animate={{ opacity: 0, scale: 1.55 }}
              transition={{ duration: 1.2, ease }}
            />

            <motion.div
              className="intro-logo-wrap"
              initial={{ opacity: 0, scale: 0.82, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
            >
              <img src="/brand/logo-light.png" alt="myInsurancemates" />
              <span className="intro-shimmer" aria-hidden="true" />
            </motion.div>

            <motion.i
              className="intro-rule"
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 1.05, ease }}
            />

            <motion.p
              className="intro-lines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Motor · Health · Life
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
