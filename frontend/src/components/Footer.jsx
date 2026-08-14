import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import Reveal from './Reveal.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setNote('')
    try {
      await api.newsletter(email)
      setNote('You are on the list. A mate will write when it is useful.')
      setEmail('')
    } catch (err) {
      setNote(err.message)
    }
  }

  return (
    <footer className="footer">
      <Reveal>
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link to="/" className="brand">
                <img src="/brand/logo-light.png" alt="myInsurancemates" />
              </Link>
              <p>Har step pe, mates ka support.</p>
              
              <p>
                <a href="mailto:hello@myinsurancemates.com">hello@myinsurancemates.com</a>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </div>
            <div>
              <h5>Pages</h5>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
            <div>
              <h5>Cover</h5>
              <Link to="/services/motor">Motor insurance</Link>
              <Link to="/services/health">Health insurance</Link>
              <Link to="/services/life">Life insurance</Link>
            </div>
            <div>
              <h5>Write to us</h5>
              <p>Family briefings, product notes, and IRDAI changes — no spam.</p>
              <form className="news" onSubmit={onSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-gold" type="submit" style={{ paddingRight: 16 }}>
                  Join
                </button>
              </form>
              {note && <p style={{ marginTop: 10 }}>{note}</p>}
            </div>
          </div>
          <div className="footer-bottom">
            <p className="disclaimer">
              myInsurancemates is an insurance advisory. Policies are issued by IRDAI-registered insurers.{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </p>
            <p className="credit">
              © {new Date().getFullYear()} myInsurancemates · Powered by{' '}
              <a href="https://webnestmedia.in" target="_blank" rel="noreferrer">
                Webnest Media
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
