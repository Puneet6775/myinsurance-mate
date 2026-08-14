import { useEffect } from 'react'
import { gsap } from '../lib/gsap.js'

export default function useHeroGsap(rootRef, ready = true) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to('.float-chip', {
        y: -10,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.stat-card', {
        y: 8,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-orb', {
        y: 18,
        x: 10,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.4,
      })
    }, root)

    return () => ctx.revert()
  }, [rootRef, ready])
}
