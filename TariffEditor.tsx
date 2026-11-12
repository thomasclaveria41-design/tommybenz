import { useEffect, useState } from 'react'
import type { Prices } from '../types'
import { N } from '../utils/format'

function PriceInput({ value, onChange }: { value: number; onChange: (v: string) => void }) {
  const [text, setText] = useState(String(value))
  useEffect(() => { if (N(text) !== value) setText(String(value)) }, [value]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <input inputMode="numeric" value={text} onChange={(e) => { setText(e.target.value); onChange(e.target.value) }} />
  )
}

export type PriceKind = 'p' | 'b' | 'max'
interface Props { prices: Prices; onPrice: (kind: PriceKind, index: number, value: string) => void }

export function TariffEditor({ prices, onPrice }: Props) {
  return (
    <>
      <div className="card">
        <h2>Tarifa por pieza</h2>
        {prices.panels.map((x, i) => (
          <label key={x.n} className="tr"><span>{x.n}</span><PriceInput value={x.p} onChange={(v) => onPrice('p', i, v)} /></label>
        ))}
      </div>
      <div className="card">
        <h2>Tarifa de difuminado</h2>
        {prices.blur.map((x, i) => (
          <label key={x.n} className="tr"><span>{x.n}{x.r ? ' (desde)' : ''}</span><PriceInput value={x.p} onChange={(v) => onPrice('b', i, v)} /></label>
        ))}
        <label className="tr"><span>Difuminado en dos paneles (hasta)</span><PriceInput value={prices.blurMax} onChange={(v) => onPrice('max', 0, v)} /></label>
      </div>
    </>
  )
}
