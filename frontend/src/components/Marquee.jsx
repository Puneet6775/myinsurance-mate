import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

const items = [
  'Term life',
  'Family floater',
  'Comprehensive motor',
  'Critical illness',
  'ULIP',
  'Two-wheeler',
  'Super top-up',
  'Child plans',
  'Zero depreciation',
  'Retirement income',
  'Cashless health',
  'Own-damage',
]

export default function Marquee({ label = 'Cover we place every week' }) {
  const track = useRef(null)
  const row = [...items, ...items]

  useEffect(() => {
    const el = track.current
    if (!el) return
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })
    const pause = () => tween.pause()
    const play = () => tween.play()
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', play)
    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', play)
      tween.kill()
    }
  }, [])

  return (
    <div className="marquee-wrap">
      <div className="marquee-label">{label}</div>
      <div className="marquee" ref={track}>
        {row.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
