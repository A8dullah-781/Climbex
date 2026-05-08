import { createContext, useContext, useRef, useState } from 'react'

const TransitionContext = createContext(null)

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const resolveRef = useRef(null)

  const startTransition = () =>
    new Promise(resolve => {
      setIsTransitioning(true)
      resolveRef.current = resolve
    })

  const onCovered = () => {
    resolveRef.current?.()
  }

  const endTransition = () => {
    setIsTransitioning(false)
  }

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, onCovered, endTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)