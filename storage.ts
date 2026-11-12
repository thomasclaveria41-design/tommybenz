import type { Prices, Quote } from '../types'
import { DEFAULT_PRICES } from '../utils/defaults'
import { normalizeQuote } from '../utils/quote'

/**
 * Contrato de almacenamiento. Toda la app habla SOLO con `repository`.
 * Para pasar a la nube (Supabase, Firebase, etc.) crea otra implementación de
 * `Repository` y cámbiala en la línea `export const repository` al final del archivo.
 */
export interface Repository {
  loadPrices(): Promise<Prices>
  savePrices(p: Prices): Promise<void>
  loadQuotes(): Promise<Quote[]>
  saveQuotes(q: Quote[]): Promise<void>
}

const KP = 'tb_prices_v1'
const KQ = 'tb_quotes_v1'

function read(key: string): unknown {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}

export function isPrices(x: unknown): x is Prices {
  const p = x as Prices | null
  return !!p && Array.isArray(p.panels) && Array.isArray(p.blur) && typeof p.blurMax === 'number'
}

export const localRepository: Repository = {
  async loadPrices() {
    const p = read(KP)
    return isPrices(p) ? p : DEFAULT_PRICES()
  },
  async savePrices(p) {
    localStorage.setItem(KP, JSON.stringify(p))
  },
  async loadQuotes() {
    const q = read(KQ)
    return Array.isArray(q) ? q.map(normalizeQuote).filter((x): x is Quote => x !== null) : []
  },
  async saveQuotes(q) {
    localStorage.setItem(KQ, JSON.stringify(q))
  },
}

export const repository: Repository = localRepository

/** Pide al navegador no borrar los datos automáticamente cuando falte espacio. */
export async function requestPersistence(): Promise<boolean> {
  try {
    return (await navigator.storage?.persist?.()) ?? false
  } catch {
    return false
  }
}
