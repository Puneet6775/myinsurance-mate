import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

export default function ParallaxImage({ src, alt = '', className = '' }) {
  const wrap = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    const node = wrap.current
    const image = img.current
    if (!node || !image) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Scrubbed transforms on touch devices fight the scroll and feel stuck.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -10, scale: 1.12 },
        {
          yPercent: 10,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }, node)

    return () => ctx.revert()
  }, [src])

  return (
    <div ref={wrap} className={`parallax ${className}`}>
      <img ref={img} src={src} alt={alt} />
    </div>
  )
}
