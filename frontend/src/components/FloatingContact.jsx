import { PhoneIcon, WhatsAppIcon } from './Icons.jsx'

const PHONE = '+919876543210'
const TEL = 'tel:+919876543210'
const WHATSAPP = `https://wa.me/919876543210?text=${encodeURIComponent('Hi myInsurancemates, I would like help with insurance.')}`

export default function FloatingContact() {
  return (
    <div className="float-actions" aria-label="Quick contact">
      <a className="float-btn float-wa" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <i className="float-ring" aria-hidden="true" />
        <span className="float-ico"><WhatsAppIcon /></span>
        <em>WhatsApp</em>
      </a>
      <a className="float-btn float-call" href={TEL} aria-label={`Call ${PHONE}`}>
        <i className="float-ring" aria-hidden="true" />
        <span className="float-ico"><PhoneIcon /></span>
        <em>Call now</em>
      </a>
    </div>
  )
}
