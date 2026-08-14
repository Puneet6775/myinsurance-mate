import { motion } from 'framer-motion'
import CountUp from './CountUp.jsx'

export default function Testimonials({ items = [] }) {
  const [first, ...rest] = items
  if (!first) return null
  return (
    <div className="testi-grid">
      <motion.article
        className="testi-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="stars">{'★'.repeat(first.rating || 5)}</div>
        <h4>{first.quote.split('.')[0]}.</h4>
        <p>“{first.quote}”</p>
        <div className="testi-person">
          <img src={first.avatar} alt="" />
          <div>
            <strong>{first.name}</strong>
            <div className="muted">{first.role}</div>
          </div>
        </div>
      </motion.article>
      <div style={{ display: 'grid', gap: 18 }}>
        {rest[0] && (
          <motion.article
            className="testi-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="stars">{'★'.repeat(rest[0].rating || 5)}</div>
            <p>“{rest[0].quote}”</p>
            <div className="testi-person">
              <img src={rest[0].avatar} alt="" />
              <div>
                <strong>{rest[0].name}</strong>
                <div className="muted">{rest[0].role}</div>
              </div>
            </div>
          </motion.article>
        )}
        <motion.div
          className="result-card"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="big"><CountUp to={98} suffix="%" /></div>
          <p>Families who say they finally understand what they bought.</p>
        </motion.div>
      </div>
    </div>
  )
}
