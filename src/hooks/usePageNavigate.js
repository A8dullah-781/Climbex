import { useNavigate } from 'react-router-dom'
import { useTransition } from '../context/TransitionContext'

export const usePageNavigate = () => {
  const navigate = useNavigate()
  const { startTransition } = useTransition()

  return async (to, scrollTarget = null) => {
    await startTransition()
    navigate(to)
    if (scrollTarget) {
      window.__scrollTarget = scrollTarget
    }
  }
}