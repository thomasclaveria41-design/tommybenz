import type { Tab } from '../types'

const TABS: { id: Tab; label: string }[] = [
  { id: 'q', label: 'Cotizar' },
  { id: 'h', label: 'Historial' },
  { id: 't', label: 'Tarifas' },
]

export function Header({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  return (
    <header>
      <h1>TOMMYBENZ</h1>
      <p>AUTOMOTRIZ</p>
      <nav>
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => onTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
