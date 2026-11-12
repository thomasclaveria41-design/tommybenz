import type { Quote } from '../types'
import { ConfirmButton } from '../components/ConfirmButton'
import { calc } from '../utils/calc'
import { money } from '../utils/format'

interface Props { quotes: Quote[]; onEdit: (q: Quote) => void; onDelete: (id: string) => void }

export function HistoryPage({ quotes, onEdit, onDelete }: Props) {
  if (!quotes.length) return <p className="mut">Todavía no hay cotizaciones guardadas.</p>
  return (
    <>
      {quotes.map((h) => (
        <div className="hc" key={h.id}>
          <div>
            <b>{h.c.nombre || 'Sin nombre'}</b>
            <div className="mut">
              {[h.c.marca, h.c.modelo, h.c.anio].filter(Boolean).join(' ')}
              {h.c.patente ? ' · ' + h.c.patente.toUpperCase() : ''}
            </div>
            <div className="mut">{h.c.fecha} · {money(calc(h).total)}</div>
          </div>
          <div className="ha">
            <button onClick={() => onEdit(h)}>Editar</button>
            <ConfirmButton className="dg" armedLabel="¿Seguro?" onConfirm={() => h.id && onDelete(h.id)}>Eliminar</ConfirmButton>
          </div>
        </div>
      ))}
    </>
  )
}
