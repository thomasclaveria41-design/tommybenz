import { useState } from 'react'
import type { CatalogItem, Client, Discount, Line, Quote } from '../types'
import { N, clone, uid } from '../utils/format'
import { newQuote } from '../utils/quote'

/** Estado de la cotización que se está editando. */
export function useQuoteDraft() {
  const [quote, setQuote] = useState<Quote>(newQuote)
  const [dirty, setDirty] = useState(false)

  const edit = (fn: (q: Quote) => Quote) => { setQuote(fn); setDirty(true) }

  const load = (q: Quote) => { setQuote(clone(q)); setDirty(false) }
  const reset = () => { setQuote(newQuote()); setDirty(false) }
  const markSaved = (id: string, ok: boolean) => { setQuote((q) => ({ ...q, id })); if (ok) setDirty(false) }
  const detach = () => { setQuote((q) => ({ ...q, id: null })); setDirty(true) }

  const setClient = (k: keyof Client, v: string) => edit((q) => ({ ...q, c: { ...q.c, [k]: v } }))
  const setDisc = (patch: Partial<Discount>) => edit((q) => ({ ...q, disc: { ...q.disc, ...patch } }))

  const addCatalog = (t: 'p' | 'b', item: CatalogItem) =>
    edit((q) => {
      const found = q.lines.find((l) => l.t === t && l.n === item.n && N(l.price) === item.p)
      if (found) {
        return { ...q, lines: q.lines.map((l) => (l === found ? { ...l, qty: String(N(l.qty) + 1) } : l)) }
      }
      return { ...q, lines: [...q.lines, { id: uid(), t, n: item.n, qty: '1', price: String(item.p) }] }
    })
  const addBlank = (t: 'd' | 'o') =>
    edit((q) => ({ ...q, lines: [...q.lines, { id: uid(), t, n: '', qty: '1', price: '0' }] }))
  const patchLine = (id: string, patch: Partial<Line>) =>
    edit((q) => ({ ...q, lines: q.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) }))
  const removeLine = (id: string) => edit((q) => ({ ...q, lines: q.lines.filter((l) => l.id !== id) }))
  const stepQty = (id: string, d: number) =>
    edit((q) => ({
      ...q,
      lines: q.lines.map((l) => (l.id === id ? { ...l, qty: String(Math.max(1, N(l.qty) + d)) } : l)),
    }))

  return { quote, dirty, load, reset, markSaved, detach, setClient, setDisc, addCatalog, addBlank, patchLine, removeLine, stepQty }
}

export type QuoteDraft = ReturnType<typeof useQuoteDraft>
