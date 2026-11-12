import type { Prices } from '../types'
import type { QuoteDraft } from '../hooks/useQuoteDraft'
import { CatalogPicker } from '../components/CatalogPicker'
import { ClientForm } from '../components/ClientForm'
import { LineList } from '../components/LineList'
import { QuoteActions } from '../components/QuoteActions'
import { Summary } from '../components/Summary'

export function QuotePage({ draft, prices, notify }: { draft: QuoteDraft; prices: Prices; notify: (m: string) => void }) {
  const { quote } = draft
  return (
    <>
      <ClientForm client={quote.c} onChange={draft.setClient} />
      <CatalogPicker prices={prices} onAdd={draft.addCatalog} onBlank={draft.addBlank} />
      <LineList
        lines={quote.lines}
        disc={quote.disc}
        onChange={draft.patchLine}
        onRemove={draft.removeLine}
        onStep={draft.stepQty}
        onDisc={draft.setDisc}
      />
      <Summary quote={quote} />
      <QuoteActions quote={quote} dirty={draft.dirty} onNew={draft.reset} notify={notify} />
    </>
  )
}
