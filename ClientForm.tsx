import type { InputHTMLAttributes } from 'react'
import type { Client } from '../types'

const FIELDS: { k: keyof Client; label: string; cls?: string; attrs?: InputHTMLAttributes<HTMLInputElement> }[] = [
  { k: 'nombre', label: 'Nombre del cliente', cls: 'full', attrs: { autoComplete: 'off' } },
  { k: 'tel', label: 'Teléfono', attrs: { inputMode: 'tel', placeholder: '9 1234 5678' } },
  { k: 'fecha', label: 'Fecha', attrs: { type: 'date' } },
  { k: 'marca', label: 'Marca' },
  { k: 'modelo', label: 'Modelo' },
  { k: 'anio', label: 'Año', attrs: { inputMode: 'numeric' } },
  { k: 'patente', label: 'Patente', attrs: { style: { textTransform: 'uppercase' } } },
]

export function ClientForm({ client, onChange }: { client: Client; onChange: (k: keyof Client, v: string) => void }) {
  return (
    <div className="card">
      <h2>Cliente y vehículo</h2>
      <div className="g2">
        {FIELDS.map((f) => (
          <label key={f.k} className={f.cls}>
            {f.label}
            <input {...f.attrs} value={client[f.k]} onChange={(e) => onChange(f.k, e.target.value)} />
          </label>
        ))}
        <label className="full">
          Descripción del trabajo
          <textarea value={client.desc} onChange={(e) => onChange('desc', e.target.value)} />
        </label>
      </div>
    </div>
  )
}
