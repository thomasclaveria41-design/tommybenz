import type { Line, Quote, Totals } from '../types'
import { N } from './format'

export const lineTotal = (l: Line): number => N(l.qty) * N(l.price)

export const lineName = (l: Line): string =>
  l.n || (l.t === 'd' ? 'Desabolladura' : l.t === 'o' ? 'Trabajo adicional' : '')

export function calc(q: Pick<Quote, 'lines' | 'disc'>): Totals {
  const sub = q.lines.reduce((a, l) => a + lineTotal(l), 0)
  const pct = parseFloat(String(q.disc.val).replace(',', '.')) || 0
  let d = q.disc.mode === '%' ? Math.round((sub * pct) / 100) : N(q.disc.val)
  d = Math.max(0, Math.min(d, sub))
  const total = sub - d
  const ant = Math.round(total / 2)
  return { sub, d, total, ant, rest: total - ant }
}
