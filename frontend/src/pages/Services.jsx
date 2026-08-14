import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { api } from '../api.js'
import Button from '../components/Button.jsx'
import HeroIntro, { HeroItem } from '../components/HeroIntro.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import Reveal, { Stagger, StaggerItem } from '../components/Reveal.jsx'
import useHeroGsap from '../hooks/useHeroGsap.js'

export default function Services() {
  const heroRef = useRef(null)
  useHeroGsap(heroRef)
  const [services, setServices] = useState([])

  useEffect(() => {
    api.services().then((d) => setServices(d.items || [])).catch(() => {})
  }, [])

  return (
    <>
      <section className="page-hero" ref={heroRef}>
        <HeroIntro className="container">
          <HeroItem><div className="eyebrow">Services</div></HeroItem>
          <HeroItem><h1>Motor. Health. Life. The only three covers most families need to get right.</h1></HeroItem>
          <HeroItem>
            <p className="lead">
              Everything else is a variation. We compare IRDAI-registered insurers, write down why a
              plan fits, and stay with you through issuance and claim.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="hero-cta">
              <Button to="/contact" variant="cream">Request a review</Button>
              <Button to="/services/life" variant="ghost">Start with life</Button>
            </div>
          </HeroItem>
        </HeroIntro>
      </section>

      <section className="section section-navy" style={{ paddingTop: 20 }}>
        <Stagger className="container service-list">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <motion.article className="service-card" whileHover={{ y: -6 }}>
                <div className="service-card-copy">
                  <div className="tag-row">
                    {(s.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                  <ul style={{ margin: '16px 0 22px', paddingLeft: 18, color: 'var(--muted)' }}>
                    {(s.highlights || []).slice(0, 4).map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  <Button to={`/services/${s.slug}`} variant="ghost">Explore {s.name}</Button>
                </div>
                <div className="service-card-media">
                  <img src={s.heroImage || s.cardImage} alt="" />
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head center">
            <div className="section-kicker">How we choose</div>
            <h2 className="section-title">Not the cheapest PDF. The plan that will pay.</h2>
          </Reveal>
          <Stagger className="trio">
            {[
              ['IRDAI', 'Registered insurers only', 'Every product we place is from a life or general insurer regulated by the Insurance Regulatory and Development Authority of India.'],
              ['CSR', 'Settlement, not slogans', 'We look at claim settlement quality, network hospitals, cashless behaviour and how an insurer treats a messy file — not just the brochure.'],
              ['Fit', 'Your facts first', 'Age, city, parents, a two-wheeler, a home loan. The recommendation is a function of that, not of what is easy to issue this week.'],
            ].map(([n, t, b]) => (
              <StaggerItem key={n}>
                <article className="feature">
                  <div className="icon-blob">{n}</div>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-col">
          <Reveal>
            <div className="section-kicker">Begin here</div>
            <h2 className="section-title">Tell us the household. We will tell you the gaps.</h2>
            <p className="lead">Typical first call: 30 minutes. You leave with a written note, not a login.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <QuoteForm defaultType="life" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
