import { useEffect, useState } from 'react'
import type { Quote, Tab } from './types'
import { BottomBar } from './components/BottomBar'
import { Header } from './components/Header'
import { PrintSheet } from './components/PrintSheet'
import { Toast } from './components/Toast'
import { usePrices } from './hooks/usePrices'
import { useQuoteDraft } from './hooks/useQuoteDraft'
import { useQuotes } from './hooks/useQuotes'
import { useToast } from './hooks/useToast'
import { HistoryPage } from './pages/HistoryPage'
import { QuotePage } from './pages/QuotePage'
import { TariffsPage } from './pages/TariffsPage'
import { parseBackup } from './services/backup'
import { requestPersistence } from './services/storage'
import { calc } from './utils/calc'
import { uid } from './utils/format'

export default function App() {
  const [tab, setTab] = useState<Tab>('q')
  const { prices, setPrices, restoreDefaults } = usePrices()
  const store = useQuotes()
  const draft = useQuoteDraft()
  const toast = useToast()
  const notify = toast.show

  useEffect(() => { void requestPersistence() }, [])

  const go = (t: Tab) => { setTab(t); window.scrollTo(0, 0) }

  const save = async () => {
    const q = draft.quote
    if (!q.lines.length && !q.c.nombre.trim()) return notify('Agrega un trabajo o el nombre del cliente')
    const id = q.id ?? uid()
    const ok = await store.upsert({ ...q, id })
    draft.markSaved(id, ok)
    notify(ok ? 'Cotización guardada' : 'No se pudo guardar en este navegador. Copia un respaldo.')
  }

  const edit = (q: Quote) => { draft.load(q); go('q') }

  const remove = async (id: string) => {
    await store.remove(id)
    if (draft.quote.id === id) draft.detach()
    notify('Cotización eliminada')
  }

  const importBackup = async (text: string) => {
    try {
      const b = parseBackup(text)
      await store.merge(b.quotes)
      if (b.prices) setPrices(b.prices)
      notify('Respaldo importado')
    } catch {
      notify('El texto no es un respaldo válido')
    }
  }

  const status = draft.dirty ? 'Sin guardar' : draft.quote.id ? 'Guardada' : 'Nueva'

  return (
    <>
      <Header tab={tab} onTab={go} />
      <main>
        {tab === 'q' && <QuotePage draft={draft} prices={prices} notify={notify} />}
        {tab === 'h' && <HistoryPage quotes={store.quotes} onEdit={edit} onDelete={remove} />}
        {tab === 't' && (
          <TariffsPage
            prices={prices}
            quotes={store.quotes}
            onPrices={(fn) => setPrices(fn)}
            onRestore={restoreDefaults}
            onImport={importBackup}
            notify={notify}
          />
        )}
      </main>
      <BottomBar total={calc(draft.quote).total} status={status} onSave={save} />
      <Toast message={toast.message} on={toast.on} />
      <PrintSheet quote={draft.quote} />
    </>
  )
}
