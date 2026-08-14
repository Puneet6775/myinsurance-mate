import { useRef, useState } from 'react'
import { api } from '../api.js'
import Button from '../components/Button.jsx'
import Faq from '../components/Faq.jsx'
import HeroIntro, { HeroItem } from '../components/HeroIntro.jsx'
import Reveal from '../components/Reveal.jsx'
import { FAQS } from '../data/content.js'
import useHeroGsap from '../hooks/useHeroGsap.js'

export default function Contact() {
  const heroRef = useRef(null)
  useHeroGsap(heroRef)
  const faqs = FAQS
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Family insurance review',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [busy, setBusy] = useState(false)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setStatus({ type: '', text: '' })
    try {
      await api.contact(form)
      setStatus({ type: 'ok', text: 'Thank you. A mate will reply within one working day.' })
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Family insurance review',
        message: '',
      })
    } catch (err) {
      setStatus({ type: 'err', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <section className="page-hero" ref={heroRef}>
        <HeroIntro className="container">
          <HeroItem><div className="eyebrow">Contact</div></HeroItem>
          <HeroItem><h1>Let’s put a mate on your file.</h1></HeroItem>
          <HeroItem>
            <p className="lead">
              Have a policy to review, a claim stuck, or a family that has never been properly covered?
              Write to us. We reply within one working day.
            </p>
          </HeroItem>
        </HeroIntro>
      </section>

      <section className="section section-dark" style={{ paddingTop: 10 }}>
        <div className="container two-col">
          <Reveal>
            <div className="stat-box" style={{ marginBottom: 14 }}>
              <div className="section-kicker">Write</div>
              <p style={{ marginTop: 8 }}>
                <a href="mailto:hello@myinsurancemates.com">hello@myinsurancemates.com</a>
              </p>
            </div>
            <div className="stat-box" style={{ marginBottom: 14 }}>
              <div className="section-kicker">Call</div>
              <p style={{ marginTop: 8 }}>
                <a href="tel:+919876543210">+91 98765 43210</a><br />
                Mon–Sat, 10:00–19:00 IST
              </p>
            </div>
            <div className="stat-box">
              <div className="section-kicker">Meet</div>
              <p style={{ marginTop: 8 }}>
                Pan-India on video. In-person reviews in Delhi NCR by appointment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="form-card" onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" required value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </div>
                <div className="field full">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" required value={form.subject} onChange={(e) => set('subject', e.target.value)} />
                </div>
                <div className="field full">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" required value={form.message} onChange={(e) => set('message', e.target.value)} />
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <Button type="submit" variant="cream">{busy ? 'Sending…' : 'Send message'}</Button>
              </div>
              {status.text && <div className={`alert ${status.type}`}>{status.text}</div>}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container" style={{ maxWidth: 860 }}>
          <Reveal className="section-head center">
            <div className="section-kicker">FAQ</div>
            <h2 className="section-title">Questions families ask before they trust us.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
