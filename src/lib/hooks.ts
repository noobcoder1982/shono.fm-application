import { useSyncExternalStore } from 'react'
import { engine } from './engine'

export function useEngine() {
  return useSyncExternalStore(engine.subscribe, engine.getState, engine.getState)
}

export function fmtTime(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}
