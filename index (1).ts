import { useEffect } from 'react'
import { onAuthChange } from '../services/auth'
import { useStore } from '../store'

export function useAuth() {
  const { user, setUser } = useStore()

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u)
    })
    return unsubscribe
  }, [setUser])

  return { user, isAuthenticated: !!user }
}
