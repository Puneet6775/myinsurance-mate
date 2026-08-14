import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const IntroContext = createContext({
  ready: true,
  finish: () => {},
})

function prefersReduced() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function IntroProvider({ children }) {
  const [ready, setReady] = useState(() => prefersReduced())
  const finish = useCallback(() => setReady(true), [])
  const value = useMemo(() => ({ ready, finish }), [ready, finish])
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
  return useContext(IntroContext)
}
