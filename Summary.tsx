import type { LineType, Quote } from '../types'
import { calc, lineName, lineTotal } from '../utils/calc'
import { N, money } from '../utils/format'

const TITLES: Record<LineType, string> = { p: 'Piezas', b: 'Difuminados', d: 'Desabolladura', o: 'Otros trabajos' }
const ORDER: LineType[] = ['p', 'b', 'd', 'o']

/** Cuerpo del resumen: se usa en pantalla y en la hoja del PDF. */
export function SummaryBody({ quote }: { quote: Quote }) {
  const c = calc(quote)
  return (
    <>
      {quote.lines.length === 0 && <p className="mut">Aún no hay trabajos agregados.</p>}
      {ORDER.map((t) => {
        const ls = quote.lines.filter((l) => l.t === t)
        if (!ls.length) return null
        return (
          <div key={t}>
            <div className="gt">{TITLES[t]}</div>
            {ls.map((l) => {
              const k = N(l.qty)
              return (
                <div className="r" key={l.id}>
                  <span>
                    {lineName(l)}
                    {k !== 1 && <> ×{k} <small>({money(N(l.price))} c/u)</small></>}
                  </span>
                  <b>{money(lineTotal(l))}</b>
                </div>
              )
            })}
          </div>
        )
      })}
      <div className="r sub"><span>Subtotal</span><b>{money(c.sub)}</b></div>
      {c.d > 0 && (
        <div className="r">
          <span>Descuento{quote.disc.mode === '%' ? ` (${quote.disc.val}%)` : ''}</span>
          <b>-{money(c.d)}</b>
        </div>
      )}
      <div className="r tot"><span>TOTAL</span><b>{money(c.total)}</b></div>
      <div className="r"><span>Anticipo 50%</span><b>{money(c.ant)}</b></div>
      <div className="r"><span>Saldo al entregar (50%)</span><b>{money(c.rest)}</b></div>
    </>
  )
}

export function Summary({ quote }: { quote: Quote }) {
  return (
    <div className="card">
      <h2>Resumen</h2>
      <SummaryBody quote={quote} />
    </div>
  )
}
