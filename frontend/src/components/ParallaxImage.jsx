import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

export default function ParallaxImage({ src, alt = '', className = '' }) {
  const wrap = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    const node = wrap.current
    const image = img.current
    if (!node || !image) return
    const tween = gsap.fromTo(
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
        },
      },
    )
    return () => tween.kill()
  }, [src])

  return (
    <div ref={wrap} className={`parallax ${className}`}>
      <img ref={img} src={src} alt={alt} />
    </div>
  )
}
