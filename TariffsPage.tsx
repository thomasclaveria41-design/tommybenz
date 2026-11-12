import type { CatalogItem, Prices, Quote } from '../types'
import { BackupPanel } from '../components/BackupPanel'
import { ConfirmButton } from '../components/ConfirmButton'
import { TariffEditor, type PriceKind } from '../components/TariffEditor'
import { N } from '../utils/format'

interface Props {
  prices: Prices
  quotes: Quote[]
  onPrices: (fn: (p: Prices) => Prices) => void
  onRestore: () => void
  onImport: (text: string) => void
  notify: (m: string) => void
}

export function TariffsPage({ prices, quotes, onPrices, onRestore, onImport, notify }: Props) {
  const setPrice = (kind: PriceKind, index: number, value: string) =>
    onPrices((p) => {
      const n = N(value)
      const upd = (a: CatalogItem[]) => a.map((x, j) => (j === index ? { ...x, p: n } : x))
      if (kind === 'max') return { ...p, blurMax: n }
      if (kind === 'p') return { ...p, panels: upd(p.panels) }
      return { ...p, blur: upd(p.blur) }
    })
  return (
    <>
      <TariffEditor prices={prices} onPrice={setPrice} />
      <div className="card">
        <ConfirmButton className="btn s dg" armedLabel="¿Restaurar? Toca otra vez" onConfirm={() => { onRestore(); notify('Precios originales restaurados') }}>
          Restaurar precios originales
        </ConfirmButton>
        <p className="mut" style={{ fontSize: 12 }}>
          Los precios nunca cambian solos. Cambiar una tarifa no modifica cotizaciones ya guardadas.
        </p>
      </div>
      <BackupPanel prices={prices} quotes={quotes} onImport={onImport} notify={notify} />
    </>
  )
}
