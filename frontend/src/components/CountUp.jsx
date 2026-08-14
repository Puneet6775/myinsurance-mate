import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

export default function CountUp({ to, suffix = '', prefix = '', className = '', duration = 1.6 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.n).toLocaleString('en-IN')}${suffix}`
        },
      })
    }, el)
    return () => ctx.revert()
  }, [to, suffix, prefix, duration])

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>
}
