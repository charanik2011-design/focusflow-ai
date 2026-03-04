import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerOptions {
  initialDuration: number
  onComplete?: () => void
}

export function useTimer({ initialDuration, onComplete }: UseTimerOptions) {
  const [duration, setDuration] = useState(initialDuration)
  const [remaining, setRemaining] = useState(initialDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clear()
            setIsRunning(false)
            setIsComplete(true)
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return clear
  }, [isRunning])

  const start = useCallback(() => {
    if (remaining > 0) setIsRunning(true)
  }, [remaining])

  const pause = useCallback(() => {
    setIsRunning(false)
    clear()
  }, [])

  const reset = useCallback((newDuration?: number) => {
    clear()
    const d = newDuration ?? duration
    setDuration(d)
    setRemaining(d)
    setIsRunning(false)
    setIsComplete(false)
  }, [duration])

  const progress = ((duration - remaining) / duration) * 100

  return { remaining, isRunning, isComplete, progress, start, pause, reset, duration }
}
