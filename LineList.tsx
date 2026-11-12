import { Minus, Plus, X } from 'lucide-react'
import type { Discount, Line } from '../types'
import { lineTotal } from '../utils/calc'
import { money } from '../utils/format'

interface Props {
  lines: Line[]
  disc: Discount
  onChange: (id: string, patch: Partial<Line>) => void
  onRemove: (id: string) => void
  onStep: (id: string, d: number) => void
  onDisc: (patch: Partial<Discount>) => void
}

export function LineList({ lines, disc, onChange, onRemove, onStep, onDisc }: Props) {
  return (
    <div className="card">
      <h2>Trabajos de la cotización</h2>
      {lines.length === 0 && <p className="mut">Toca una pieza o difuminado para agregarlo.</p>}
      {lines.map((l) => {
        const editable = l.t === 'd' || l.t === 'o'
        return (
          <div className="ln" key={l.id}>
            <div className="lh">
              {editable ? (
                <input
                  value={l.n}
                  placeholder={l.t === 'd' ? 'Desabolladura (ej. puerta)' : 'Descripción del trabajo'}
                  onChange={(e) => onChange(l.id, { n: e.target.value })}
                />
              ) : (
                <strong>{l.n}</strong>
              )}
              <button className="x" aria-label="Quitar" onClick={() => onRemove(l.id)}><X size={22} /></button>
            </div>
            <div className="lc">
              <label>
                Cantidad
                <div className="qs">
                  <button aria-label="Menos" onClick={() => onStep(l.id, -1)}><Minus size={16} /></button>
                  <input inputMode="numeric" value={l.qty} onChange={(e) => onChange(l.id, { qty: e.target.value })} />
                  <button aria-label="Más" onClick={() => onStep(l.id, 1)}><Plus size={16} /></button>
                </div>
              </label>
              <label>
                Precio unitario
                <input inputMode="numeric" value={l.price} onChange={(e) => onChange(l.id, { price: e.target.value })} />
              </label>
              <div className="stw">Subtotal<b>{money(lineTotal(l))}</b></div>
            </div>
          </div>
        )
      })}
      <div className="g2" style={{ marginTop: 10 }}>
        <label>
          Descuento
          <select value={disc.mode} onChange={(e) => onDisc({ mode: e.target.value === '%' ? '%' : '$' })}>
            <option value="$">Monto en $</option>
            <option value="%">Porcentaje %</option>
          </select>
        </label>
        <label>
          Valor del descuento
          <input inputMode="decimal" placeholder="0" value={disc.val} onChange={(e) => onDisc({ val: e.target.value })} />
        </label>
      </div>
    </div>
  )
}
