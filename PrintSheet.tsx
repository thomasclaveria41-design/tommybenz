import type { Quote } from '../types'
import { SummaryBody } from './Summary'

/** Hoja que se imprime / guarda como PDF. En pantalla está oculta (ver global.css). */
export function PrintSheet({ quote }: { quote: Quote }) {
  const k = quote.c
  const vehicle = [k.marca, k.modelo, k.anio].filter(Boolean).join(' ')
  return (
    <div id="print">
      <h1>TOMMYBENZ AUTOMOTRIZ</h1>
      <p className="sb">Cotización de pintura automotriz · {k.fecha}</p>
      <div className="pg">
        <div><b>Cliente:</b> {k.nombre}</div>
        <div><b>Teléfono:</b> {k.tel}</div>
        <div><b>Vehículo:</b> {vehicle}</div>
        <div><b>Patente:</b> {k.patente.toUpperCase()}</div>
      </div>
      {k.desc && <p><b>Trabajo:</b> {k.desc}</p>}
      <SummaryBody quote={quote} />
      <div className="cond">
        Los precios incluyen empapelado, lijado, preparación, primer cuando corresponda, aplicación de pintura, barniz y
        terminación. No incluyen desabolladura salvo que esté detallada en esta cotización. Condiciones de pago: 50% de
        anticipo y 50% restante al entregar el vehículo.
      </div>
    </div>
  )
}
