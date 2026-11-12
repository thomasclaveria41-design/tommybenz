import { Copy, FilePlus, FileText, MessageCircle } from 'lucide-react'
import type { Quote } from '../types'
import { printQuote } from '../services/pdf'
import { buildQuoteText, openWhatsApp } from '../services/whatsapp'
import { copyText } from '../utils/clipboard'
import { ConfirmButton } from './ConfirmButton'

interface Props { quote: Quote; dirty: boolean; onNew: () => void; notify: (m: string) => void }

export function QuoteActions({ quote, dirty, onNew, notify }: Props) {
  const pdf = () => {
    if (!quote.lines.length) return notify('Agrega trabajos primero')
    if (!printQuote(quote)) notify('Tu navegador bloqueó la impresión')
  }
  const copy = async () => notify((await copyText(buildQuoteText(quote))) ? 'Texto copiado' : 'No se pudo copiar')
  const fresh = () => { onNew(); window.scrollTo(0, 0) }
  return (
    <div className="card">
      <div className="row">
        <button className="btn" onClick={pdf}><FileText size={16} /> Generar PDF</button>
        <button className="btn" onClick={() => openWhatsApp(quote)}><MessageCircle size={16} /> WhatsApp</button>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn s" onClick={copy}><Copy size={16} /> Copiar texto</button>
        {dirty ? (
          <ConfirmButton className="btn s" armedLabel="Hay cambios sin guardar: toca otra vez" onConfirm={fresh}>
            <FilePlus size={16} /> Nueva cotización
          </ConfirmButton>
        ) : (
          <button className="btn s" onClick={fresh}><FilePlus size={16} /> Nueva cotización</button>
        )}
      </div>
    </div>
  )
}
