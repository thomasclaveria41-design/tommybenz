import type { BackupFile, Prices, Quote } from '../types'
import { normalizeQuote } from '../utils/quote'
import { isPrices } from './storage'

export function buildBackup(prices: Prices, quotes: Quote[]): string {
  const file: BackupFile = { v: 1, prices, quotes }
  return JSON.stringify(file)
}

export function parseBackup(text: string): { prices: Prices | null; quotes: Quote[] } {
  const o = JSON.parse(text) as Partial<BackupFile> | null
  if (!o || !Array.isArray(o.quotes)) throw new Error('Respaldo inválido')
  return {
    prices: isPrices(o.prices) ? o.prices : null,
    quotes: o.quotes.map(normalizeQuote).filter((x): x is Quote => x !== null),
  }
}
