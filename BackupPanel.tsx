import { useState } from 'react'
import { ClipboardCopy, Upload } from 'lucide-react'
import type { Prices, Quote } from '../types'
import { buildBackup } from '../services/backup'
import { copyText } from '../utils/clipboard'

interface Props { prices: Prices; quotes: Quote[]; onImport: (text: string) => void; notify: (m: string) => void }

export function BackupPanel({ prices, quotes, onImport, notify }: Props) {
  const [text, setText] = useState('')
  const backup = async () => {
    const t = buildBackup(prices, quotes)
    setText(t)
    notify((await copyText(t)) ? 'Respaldo copiado' : 'Selecciona y copia el texto manualmente')
  }
  return (
    <div className="card">
      <h2>Respaldo</h2>
      <p className="mut" style={{ fontSize: 13, marginTop: 0 }}>
        Los datos se guardan en este navegador y dispositivo. Copia un respaldo y guárdalo en tus notas o envíatelo por WhatsApp.
        Para recuperarlo, pégalo aquí y toca Importar.
      </p>
      <div className="row">
        <button className="btn s" onClick={backup}><ClipboardCopy size={16} /> Copiar respaldo</button>
        <button className="btn s" onClick={() => onImport(text)}><Upload size={16} /> Importar respaldo</button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Aquí aparece el respaldo. Para importar, pega el texto y toca Importar." />
    </div>
  )
}
