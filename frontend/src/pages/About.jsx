import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { api } from '../api.js'
import Button from '../components/Button.jsx'
import CountUp from '../components/CountUp.jsx'
import HeroIntro, { HeroItem } from '../components/HeroIntro.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import Reveal, { Stagger, StaggerItem } from '../components/Reveal.jsx'
import Testimonials from '../components/Testimonials.jsx'
import useHeroGsap from '../hooks/useHeroGsap.js'

const fallbackTeam = [
  { name: 'Ajay Prasad', role: 'Founder & Principal Advisor', image: '/images/team-aarav.jpg' },
  { name: 'Priya Sharma', role: 'Head of Health Cover', image: '/images/team-priya.jpg' },
  { name: 'Rohan Kapoor', role: 'Motor Specialist', image: '/images/team-rohan.jpg' },
  { name: 'Ananya Iyer', role: 'Life & Retirement Planner', image: '/images/team-ananya.jpg' },
]

export default function About() {
  const heroRef = useRef(null)
  useHeroGsap(heroRef)
  const [team, setTeam] = useState(fallbackTeam)
  const [testimonials, setTestimonials] = useState([])
  const [insights, setInsights] = useState([])

  useEffect(() => {
    api.team().then((d) => d.items?.length && setTeam(d.items)).catch(() => {})
    api.testimonials().then((d) => setTestimonials(d.items || [])).catch(() => {})
    api.insights().then((d) => setInsights(d.items || [])).catch(() => {})
  }, [])

  return (
    <>
      <section className="page-hero" ref={heroRef}>
        <HeroIntro className="container">
          <HeroItem><div className="eyebrow">About the practice</div></HeroItem>
          <HeroItem><h1>Building cover that still works when a family is not at its best.</h1></HeroItem>
          <HeroItem>
            <p className="lead">
              myInsurancemates is an Indian insurance advisory for motor, health and life.
              We exist so you are not alone with a PDF, a waiting period, or a workshop estimate.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="hero-cta">
              <Button to="/contact" variant="cream">Book a conversation</Button>
            </div>
          </HeroItem>
        </HeroIntro>
      </section>

      <section className="section section-dark" style={{ paddingTop: 0 }}>
        <Stagger className="container mosaic">
          {['/images/about-team.jpg', '/images/handshake.jpg', '/images/about-meet.jpg', '/images/hero-advisor.jpg', '/images/india-city.jpg'].map((src) => (
            <StaggerItem key={src}>
              <img src={src} alt="" />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head center">
            <div className="section-kicker">Why choose us</div>
            <h2 className="section-title">Advice first. Product second. Claim always.</h2>
          </Reveal>
          <Stagger className="trio">
            {[
              ['01', 'Personalised strategies', 'Every household is a different mix of income, loans, parents and vehicles. We write a plan around that — not around this month’s contest.'],
              ['02', 'Plain communication', 'Waiting periods, IDV, NCB, lock-ins, 10(10D) — said in English you can repeat to a spouse. If we cannot explain it, we will not sell it.'],
              ['03', 'Ongoing partnership', 'Renewals, endorsements, a new baby, a new city. And a human being when the hospital desk asks for a pre-auth at 11pm.'],
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
        <div className="container split">
          <Reveal>
            <div className="section-kicker">Mission & vision</div>
            <h2 className="section-title">Har step pe, mates ka support.</h2>
            <p className="lead">
              Our mission is simple: every earning adult in a household we touch should have enough
              term cover, a health plan that will actually cashless in their city, and a vehicle that
              is legal and protected on Indian roads.
            </p>
            <p className="lead">
              We are not an insurer. Policies are issued by IRDAI-registered life and general
              insurers. We are the mate who helps you choose, buy and claim.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-media">
              <ParallaxImage src="/images/mission.jpg" alt="An advisor sitting with a family" />
            </div>
          </Reveal>
        </div>
        <div className="container" style={{ marginTop: 48 }}>
          <Stagger className="stats">
            <StaggerItem>
              <div className="stat-box"><div className="num"><CountUp to={2400} suffix="+" /></div><p>Households advised</p></div>
            </StaggerItem>
            <StaggerItem>
              <div className="stat-box"><div className="num"><CountUp to={3} /></div><p>Lines of cover, done properly</p></div>
            </StaggerItem>
            <StaggerItem>
              <div className="stat-box"><div className="num"><CountUp to={98} suffix="%" /></div><p>Clients who understand their policy</p></div>
            </StaggerItem>
            <StaggerItem>
              <div className="stat-box"><div className="num"><CountUp to={1} /></div><p>Named mate on every file</p></div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', maxWidth: 'none' }}>
            <Reveal>
              <div className="section-kicker">The desk</div>
              <h2 className="section-title">Meet the mates.</h2>
            </Reveal>
            <Button to="/contact" variant="cream">Work with us</Button>
          </div>
          <Stagger className="team-grid">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <motion.figure className="member" whileHover={{ y: -6 }}>
                  <img src={m.image} alt={m.name} />
                  <figcaption>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </figcaption>
                </motion.figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal className="section-head">
            <div className="section-kicker">Families</div>
            <h2 className="section-title">What it feels like on the other side of the table.</h2>
          </Reveal>
          <Testimonials items={testimonials} />
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head">
            <div className="section-kicker">Notes</div>
            <h2 className="section-title">How we think about money that only shows up in a crisis.</h2>
          </Reveal>
          <Stagger className="insight-grid">
            {insights.map((post) => (
              <StaggerItem key={post.slug}>
                <article className="insight">
                  <img src={post.image} alt="" />
                  <div className="insight-body">
                    <div className="meta">{post.author} · {post.read}</div>
                    <h3>{post.title}</h3>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
