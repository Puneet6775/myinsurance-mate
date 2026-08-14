import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons.jsx'

export default function Button({ to, href, children, variant = 'cream', type = 'button', onClick, className = '' }) {
  const cls = `btn btn-${variant} ${className}`
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        <span className="arr arr-out"><ArrowIcon /></span>
        <span className="arr arr-in"><ArrowIcon /></span>
      </span>
    </>
  )
  if (to) return <Link className={cls} to={to}>{inner}</Link>
  if (href) return <a className={cls} href={href}>{inner}</a>
  return (
    <button className={cls} type={type} onClick={onClick}>
      {inner}
    </button>
  )
}
