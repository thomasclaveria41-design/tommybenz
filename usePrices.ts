import { useEffect, useState } from 'react'
import type { Prices } from '../types'
import { repository } from '../services/storage'
import { DEFAULT_PRICES } from '../utils/defaults'

export function usePrices() {
  const [prices, setPrices] = useState<Prices>(DEFAULT_PRICES)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    repository.loadPrices().then((p) => {
      if (alive) { setPrices(p); setReady(true) }
    })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (ready) repository.savePrices(prices).catch(() => undefined)
  }, [prices, ready])

  const restoreDefaults = () => setPrices(DEFAULT_PRICES())
  return { prices, setPrices, restoreDefaults }
}
