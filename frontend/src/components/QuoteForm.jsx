import { useState } from 'react'
import { api } from '../api.js'
import Button from './Button.jsx'

export default function QuoteForm({ defaultType = 'life' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    insuranceType: defaultType,
    notes: '',
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
      await api.quote(form)
      setStatus({ type: 'ok', text: 'Received. A mate will call you within one working day.' })
      setForm({ name: '', email: '', phone: '', city: '', insuranceType: defaultType, notes: '' })
    } catch (err) {
      setStatus({ type: 'err', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="quote-box" onSubmit={onSubmit}>
      <h3 style={{ marginBottom: 6, letterSpacing: '-0.02em' }}>Request a personal review</h3>
      <p className="muted" style={{ marginBottom: 18 }}>
        No spam. We read what you write and call with a point of view.
      </p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="q-name">Full name</label>
          <input id="q-name" required value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="q-city">City</label>
          <input id="q-city" required value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="q-email">Email</label>
          <input id="q-email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="q-phone">Phone</label>
          <input id="q-phone" required value={form.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="q-type">Cover</label>
          <select id="q-type" value={form.insuranceType} onChange={(e) => set('insuranceType', e.target.value)}>
            <option value="motor">Motor</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="q-notes">Anything we should know</label>
          <input id="q-notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        <Button type="submit" variant="gold">
          {busy ? 'Sending…' : 'Get a callback'}
        </Button>
      </div>
      {status.text && <div className={`alert ${status.type}`}>{status.text}</div>}
    </form>
  )
}
