import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function HeroIntro({ children, className = '' }) {
  return (
    <motion.div className={className} variants={parent} initial="hidden" animate="show">
      {children}
    </motion.div>
  )
}

export function HeroItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

export const photoAnim = {
  initial: { opacity: 0, scale: 1.06 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1, ease },
}
