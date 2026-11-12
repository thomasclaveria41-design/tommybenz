import type { Quote } from '../types'
import { today, uid } from './format'

export const newQuote = (): Quote => ({
  id: null,
  c: { nombre: '', tel: '', marca: '', modelo: '', anio: '', patente: '', fecha: today(), desc: '' },
  lines: [],
  disc: { mode: '$', val: '' },
})

/** Valida y repara una cotización leída del disco o de un respaldo (incluye los de la versión HTML). */
export function normalizeQuote(raw: unknown): Quote | null {
  const r = raw as Partial<Quote> | null
  if (!r || typeof r !== 'object' || typeof r.id !== 'string' || !r.c || !Array.isArray(r.lines)) return null
  return {
    id: r.id,
    c: { ...newQuote().c, ...r.c },
    lines: r.lines.map((l) => ({
      id: l.id || uid(),
      t: l.t,
      n: String(l.n ?? ''),
      qty: String(l.qty ?? '1'),
      price: String(l.price ?? '0'),
    })),
    disc: { mode: r.disc?.mode === '%' ? '%' : '$', val: String(r.disc?.val ?? '') },
    total: r.total,
    upd: r.upd,
  }
}

export function mergeQuotes(current: Quote[], incoming: Quote[]): Quote[] {
  const out = [...current]
  for (const q of incoming) {
    const i = out.findIndex((x) => x.id === q.id)
    if (i < 0) out.push(q)
    else if ((q.upd ?? 0) > (out[i].upd ?? 0)) out[i] = q
  }
  return out
}
