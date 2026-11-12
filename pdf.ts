import type { Quote } from '../types'

/** Abre el diálogo de impresión; en él se elige "Guardar como PDF". La hoja (#print) ya está en pantalla, oculta. */
export function printQuote(q: Quote): boolean {
  const old = document.title
  const k = q.c
  document.title = 'Cotizacion-' + (k.patente || k.nombre || 'TOMMYBENZ').replace(/\s+/g, '-')
  window.addEventListener('afterprint', () => { document.title = old }, { once: true })
  try {
    window.print()
    return true
  } catch {
    document.title = old
    return false
  }
}
