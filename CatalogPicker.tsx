import type { CatalogItem, Prices } from '../types'
import { money } from '../utils/format'

interface Props {
  prices: Prices
  onAdd: (t: 'p' | 'b', item: CatalogItem) => void
  onBlank: (t: 'd' | 'o') => void
}

export function CatalogPicker({ prices, onAdd, onBlank }: Props) {
  return (
    <>
      <div className="card">
        <h2>Pintura por pieza</h2>
        <div className="pgrid">
          {prices.panels.map((x) => (
            <button key={x.n} className="pb" onClick={() => onAdd('p', x)}>
              <span>{x.n}</span>
              <b>{money(x.p)}</b>
            </button>
          ))}
        </div>
        <p className="mut" style={{ margin: '8px 0 0', fontSize: 12 }}>
          Incluye empapelado, lijado, preparación, primer, pintura, barniz y terminación. No incluye desabolladura.
        </p>
      </div>
      <div className="card">
        <h2>Difuminados</h2>
        <div className="pgrid">
          {prices.blur.map((x) => (
            <button key={x.n} className="pb" onClick={() => onAdd('b', x)}>
              <span>{x.n}</span>
              <b>{x.r ? `${money(x.p)} – ${money(prices.blurMax)}` : money(x.p)}</b>
            </button>
          ))}
        </div>
      </div>
      <div className="card">
        <h2>Desabolladura y otros</h2>
        <div className="row">
          <button className="btn s" onClick={() => onBlank('d')}>+ Desabolladura</button>
          <button className="btn s" onClick={() => onBlank('o')}>+ Otro trabajo</button>
        </div>
      </div>
    </>
  )
}
