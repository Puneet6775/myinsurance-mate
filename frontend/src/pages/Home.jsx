import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { api } from '../api.js'
import Button from '../components/Button.jsx'
import CountUp from '../components/CountUp.jsx'
import { PlayIcon } from '../components/Icons.jsx'
import Marquee from '../components/Marquee.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import HeroIntro, { HeroItem, HeroVisual } from '../components/HeroIntro.jsx'
import Reveal, { Stagger, StaggerItem } from '../components/Reveal.jsx'
import Testimonials from '../components/Testimonials.jsx'
import useHeroGsap from '../hooks/useHeroGsap.js'

const fallbackTestimonials = [
  {
    name: 'Neha Kulkarni',
    role: 'Product lead, Pune',
    quote: 'They refused to sell us a ULIP until the term cover was in place. That honesty is why we moved our parents’ health policy to them as well.',
    rating: 5,
    avatar: '/images/avatar-2.jpg',
  },
  {
    name: 'Arjun Malhotra',
    role: 'Founder, Gurugram',
    quote: 'Motor renewal used to be a last-day panic. Now a mate sends the comparison a week early, with IDV and garage network spelled out.',
    rating: 5,
    avatar: '/images/avatar-1.jpg',
  },
]

const fallbackServices = [
  {
    slug: 'motor',
    name: 'Motor Insurance',
    summary: 'Third-party, own-damage and comprehensive cover for cars, bikes and commercial vehicles.',
    tags: ['Third-party', 'Comprehensive', 'Own-damage'],
    cardImage: '/images/motor-car.jpg',
  },
  {
    slug: 'health',
    name: 'Health Insurance',
    summary: 'Individual, family floater and super top-up plans with cashless hospital networks.',
    tags: ['Family floater', 'Cashless', 'Critical illness'],
    cardImage: '/images/health-hospital.jpg',
  },
  {
    slug: 'life',
    name: 'Life Insurance',
    summary: 'Term, ULIP, endowment, child and retirement plans — protection first, then savings.',
    tags: ['Term cover', 'ULIP', 'Retirement'],
    cardImage: '/images/life-couple.jpg',
  },
]

export default function Home() {
  const heroRef = useRef(null)
  useHeroGsap(heroRef)
  const [services, setServices] = useState(fallbackServices)
  const [testimonials, setTestimonials] = useState(fallbackTestimonials)
  const [insights, setInsights] = useState([
    { slug: 'how-much-term-cover', title: 'How much term cover does an Indian household actually need?', author: 'Ananya Iyer', read: '4 min read', image: '/images/insight-1.jpg' },
    { slug: 'family-floater-vs-individual', title: 'Family floater or individual health policies?', author: 'Priya Sharma', read: '3 min read', image: '/images/insight-2.jpg' },
    { slug: 'zero-dep-worth-it', title: 'Is zero-depreciation motor cover worth the extra premium?', author: 'Rohan Kapoor', read: '3 min read', image: '/images/insight-3.jpg' },
  ])

  useEffect(() => {
    api.services().then((d) => d.items?.length && setServices(d.items)).catch(() => {})
    api.testimonials().then((d) => setTestimonials(d.items || [])).catch(() => {})
    api.insights().then((d) => setInsights(d.items || [])).catch(() => {})
  }, [])

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-orb a" />
        <div className="hero-orb b" />
        <div className="container hero-grid">
          <HeroIntro className="hero-copy">
            <HeroItem><div className="eyebrow">India · Motor · Health · Life</div></HeroItem>
            <HeroItem>
              <h1>
                Build a stable life<br />with <em>mates</em> beside you.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="lead">
                Har step pe, mates ka support. We help Indian families choose motor, health and life
                cover from IRDAI-registered insurers — then stay on the file when a claim actually arrives.
              </p>
            </HeroItem>
            <HeroItem>
              <div className="hero-cta">
                <Button to="/contact" variant="cream">Get a personal review</Button>
                <Button to="/services" variant="ghost">Explore cover</Button>
              </div>
            </HeroItem>
            <HeroItem>
              <div className="trust-row">
                <div className="avatars">
                  <img src="/images/avatar-1.jpg" alt="" />
                  <img src="/images/avatar-2.jpg" alt="" />
                  <img src="/images/avatar-3.jpg" alt="" />
                  <img src="/images/avatar-4.jpg" alt="" />
                </div>
                <div className="trust-copy">
                  <strong>Trusted by <CountUp to={2400} suffix="+" /> families</strong>
                  Across metros and hometowns — one mate, three lines of cover.
                </div>
              </div>
            </HeroItem>
          </HeroIntro>

          <HeroVisual className="hero-visual">
            <div className="hero-photo">
              <ParallaxImage src="/images/hero-family.jpg" alt="A family walking together" />
            </div>
            <div className="float-chip">
              <img src="/images/avatar-2.jpg" alt="" />
              <div>
                <strong>Priya Sharma</strong>
                <span>Health cover, on your side</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="num"><CountUp to={98} suffix="%" /></div>
              <div className="bars">
                <i style={{ height: '40%' }} />
                <i style={{ height: '62%' }} />
                <i style={{ height: '48%' }} />
                <i style={{ height: '86%' }} />
                <i style={{ height: '70%' }} />
                <i style={{ height: '100%' }} />
              </div>
              <p>Clients who say their policy finally makes sense.</p>
            </div>
          </HeroVisual>
        </div>
      </section>

      <Marquee />

      <section className="section section-dark">
        <div className="container split">
          <Reveal>
            <div className="about-media">
              <ParallaxImage src="/images/about-team.jpg" alt="Advisors in conversation" />
              <motion.span
                className="play"
                aria-hidden="true"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PlayIcon />
              </motion.span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="section-kicker">The practice</div>
            <h2 className="section-title">Insurance should feel like a person, not a portal.</h2>
            <p className="lead">
              myInsurancemates was built for Indian households that are tired of being sold a product
              before anyone asked what they were afraid of. We start with motor, health and life —
              the three covers that actually keep a family standing.
            </p>
            <p className="lead">
              You get a named mate, a written recommendation, and help when the hospital or the
              workshop asks for a form at the worst possible hour.
            </p>
            <div style={{ marginTop: 28 }}>
              <Button to="/about" variant="cream">About more</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <Reveal className="section-head">
            <div className="section-kicker">Services</div>
            <h2 className="section-title">Three lines of cover. The rest is noise.</h2>
          </Reveal>
          <Stagger className="service-list">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <motion.article className="service-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                  <div className="service-card-copy">
                    <div className="tag-row">
                      {(s.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}
                    </div>
                    <h3>{s.name}</h3>
                    <p>{s.summary}</p>
                    <Button to={`/services/${s.slug}`} variant="ghost">View cover</Button>
                  </div>
                  <div className="service-card-media">
                    <img src={s.cardImage} alt="" />
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container process-grid">
          <Reveal>
            <div className="section-kicker">How it works</div>
            <h2 className="section-title" style={{ marginBottom: 28 }}>Four steps. Then we stay.</h2>
            <Stagger className="process-steps">
              {[
                ['01', 'Share the household', 'Who depends on whom, which vehicles, which city, which policies you already hold.'],
                ['02', 'We map the gaps', 'Under-insurance, overlapping covers, waiting periods already served, nominations that are blank.'],
                ['03', 'You choose, we place', 'A shortlist from IRDAI-registered insurers. You sign. We chase medicals and documents.'],
                ['04', 'Claim with a mate', 'Intimation, cashless, surveyor, follow-up. This is the part most brokers disappear for.'],
              ].map(([n, t, b]) => (
                <StaggerItem key={n}>
                  <div className="step">
                    <div className="step-num">{n}</div>
                    <div>
                      <h4>{t}</h4>
                      <p>{b}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="process-photo">
              <ParallaxImage src="/images/process.jpg" alt="Reviewing a family plan" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head center">
            <div className="section-kicker">How we work with you</div>
            <h2 className="section-title">Simple, transparent, built to get claims paid.</h2>
          </Reveal>
          <Stagger className="plan-grid">
            <StaggerItem>
              <article className="plan">
                <div className="section-kicker">Start</div>
                <h3>First conversation</h3>
                <div className="price">Free</div>
                <p className="muted">A 30-minute review of what you already hold.</p>
                <ul>
                  <li>Motor, health and life scan</li>
                  <li>Written gap note</li>
                  <li>No product push</li>
                  <li>Pan-India on video</li>
                </ul>
                <Button to="/contact" variant="dark">Book a call</Button>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="plan featured">
                <div className="section-kicker">Most families</div>
                <h3>Household brief</h3>
                <div className="price">On us <span>when we place cover</span></div>
                <p>Full architecture across the three lines, then issuance.</p>
                <ul>
                  <li>Term sizing and insurer shortlist</li>
                  <li>Floater vs individual health</li>
                  <li>Motor IDV, add-ons, NCB</li>
                  <li>A named mate on WhatsApp</li>
                </ul>
                <Button to="/contact" variant="gold">Get started</Button>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="plan">
                <div className="section-kicker">Ongoing</div>
                <h3>Yearly review</h3>
                <div className="price">Included</div>
                <p className="muted">Life changes. Policies should follow, not rot in a drawer.</p>
                <ul>
                  <li>Renewals without last-day panic</li>
                  <li>New child, new car, new city</li>
                  <li>Claim desk when you need it</li>
                  <li>Nominee and document hygiene</li>
                </ul>
                <Button to="/contact" variant="outline-dark">Talk to us</Button>
              </article>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <Reveal className="section-head">
            <div className="section-kicker">Families</div>
            <h2 className="section-title">Hear from people we sit with.</h2>
          </Reveal>
          <Testimonials items={testimonials} />
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head">
            <div className="section-kicker">Notes</div>
            <h2 className="section-title">Clear writing on cover that is usually sold in a hurry.</h2>
          </Reveal>
          <Stagger className="insight-grid">
            {insights.map((post) => (
              <StaggerItem key={post.slug}>
                <motion.article className="insight" whileHover={{ y: -6 }}>
                  <img src={post.image} alt="" />
                  <div className="insight-body">
                    <div className="meta">{post.author} · {post.read}</div>
                    <h3>{post.title}</h3>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <div>
                <div className="eyebrow">Har step pe</div>
                <h2>Do the responsible thing. Keep a mate on the file.</h2>
              </div>
              <Button to="/contact" variant="gold">Talk to myInsurancemates</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
