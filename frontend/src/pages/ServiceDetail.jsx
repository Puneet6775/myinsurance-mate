import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Faq from '../components/Faq.jsx'
import HeroIntro, { HeroItem, HeroVisual } from '../components/HeroIntro.jsx'
import ParallaxImage from '../components/ParallaxImage.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import Reveal, { Stagger, StaggerItem } from '../components/Reveal.jsx'
import { getService } from '../data/content.js'
import useHeroGsap from '../hooks/useHeroGsap.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const heroRef = useRef(null)
  const service = getService(slug)
  useHeroGsap(heroRef, Boolean(service))

  if (!service) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1>We could not find that cover.</h1>
          <p className="lead">Choose motor, health or life from the services list.</p>
          <Button to="/services" variant="cream">Back to services</Button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero" ref={heroRef}>
        <div className="container hero-grid">
          <HeroIntro className="hero-copy">
            <HeroItem><div className="eyebrow">{service.eyebrow}</div></HeroItem>
            <HeroItem><h1>{service.name}</h1></HeroItem>
            <HeroItem><p className="lead">{service.tagline}</p></HeroItem>
            <HeroItem><p className="lead">{service.summary}</p></HeroItem>
            <HeroItem>
              <div className="hero-cta">
                <Button href="#review" variant="cream">Request a review</Button>
                <Button to="/services" variant="ghost">All services</Button>
              </div>
            </HeroItem>
          </HeroIntro>
          <HeroVisual className="hero-photo">
            <ParallaxImage src={service.heroImage} alt="" />
          </HeroVisual>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <Reveal className="section-head">
            <div className="section-kicker">Plans we place</div>
            <h2 className="section-title">The versions that actually exist in the Indian market.</h2>
          </Reveal>
          <Stagger className="trio">
            {(service.plans || []).map((p) => (
              <StaggerItem key={p.title}>
                <article className="feature">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-navy">
        <Stagger className="container cover-grid">
          {(service.coverage || []).map((block) => (
            <StaggerItem key={block.title}>
              <div className="cover-box">
                <h3>{block.title}</h3>
                <ul>
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section section-dark">
        <div className="container process-grid">
          <Reveal>
            <div className="section-kicker">How we work this line</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>A mate on the file, not a form on a website.</h2>
            <Stagger className="process-steps">
              {(service.process || []).map((step, i) => (
                <StaggerItem key={step}>
                  <div className="step">
                    <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                    <div><h4>{step}</h4></div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="process-photo">
              <ParallaxImage src={(service.gallery && service.gallery[1]) || service.cardImage} alt="" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container two-col">
          <Reveal>
            <div className="section-kicker">Questions</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>Asked before anyone signs.</h2>
            <Faq items={service.faqs || []} />
          </Reveal>
          <Reveal delay={0.1}>
            <div id="review">
              <QuoteForm defaultType={service.slug} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
