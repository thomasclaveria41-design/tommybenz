import { Save } from 'lucide-react'
import { money } from '../utils/format'

export function BottomBar(props: { total: number; status: string; onSave: () => void }) {
  return (
    <div className="bar">
      <div>
        <small>{props.status}</small>
        <b>{money(props.total)}</b>
      </div>
      <button className="btn" onClick={props.onSave}><Save size={16} /> Guardar</button>
    </div>
  )
}
