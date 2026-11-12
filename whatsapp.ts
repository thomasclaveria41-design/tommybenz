import type { Quote } from '../types'
import { calc, lineName } from '../utils/calc'
import { N, money } from '../utils/format'

export function normalizePhone(raw: string): string {
  let p = raw.replace(/\D/g, '')
  if (p.startsWith('00')) p = p.slice(2)
  else if (p.startsWith('0')) p = p.slice(1)
  if (p.length === 9 && p[0] === '9') p = '56' + p // celular chileno
  return p
}

export function buildQuoteText(q: Quote): string {
  const c = calc(q)
  const k = q.c
  let t = `*TOMMYBENZ AUTOMOTRIZ*\nCotización de pintura · ${k.fecha}\n`
  if (k.nombre) t += `Cliente: ${k.nombre}\n`
  const v = [k.marca, k.modelo, k.anio].filter(Boolean).join(' ')
  if (v || k.patente) t += `Vehículo: ${v}${k.patente ? ' · Patente ' + k.patente.toUpperCase() : ''}\n`
  if (k.desc) t += `Trabajo: ${k.desc}\n`
  t += '\n'
  for (const l of q.lines) {
    const n = N(l.qty)
    t += `• ${lineName(l)}${n !== 1 ? ' x' + n : ''}: ${money(n * N(l.price))}\n`
  }
  if (c.d > 0) t += `\nSubtotal: ${money(c.sub)}\nDescuento: -${money(c.d)}\n`
  t += `\n*TOTAL: ${money(c.total)}*\nAnticipo 50%: ${money(c.ant)}\nSaldo al entregar (50%): ${money(c.rest)}\n\n`
  t += 'Los precios incluyen empapelado, lijado, preparación, primer cuando corresponda, pintura, barniz y terminación. No incluyen desabolladura salvo que esté detallada.'
  return t
}

export function openWhatsApp(q: Quote): void {
  const a = document.createElement('a')
  a.href = `https://wa.me/${normalizePhone(q.c.tel)}?text=${encodeURIComponent(buildQuoteText(q))}`
  a.target = '_blank'
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
