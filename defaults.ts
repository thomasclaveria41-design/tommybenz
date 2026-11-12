import type { Prices } from '../types'

/** Tarifario oficial. Solo cambia si tú lo editas en la pestaña Tarifas. */
export const DEFAULT_PRICES = (): Prices => ({
  panels: [
    { n: 'Parachoques', p: 150000 },
    { n: 'Puerta delantera', p: 170000 },
    { n: 'Puerta trasera', p: 160000 },
    { n: 'Tapabarro delantero', p: 120000 },
    { n: 'Costado trasero (cuarto trasero)', p: 190000 },
    { n: 'Capó', p: 190000 },
    { n: 'Portalón', p: 170000 },
    { n: 'Techo', p: 230000 },
  ],
  blur: [
    { n: 'Panel contiguo pequeño', p: 50000 },
    { n: 'Puerta', p: 60000 },
    { n: 'Tapabarro trasero', p: 70000 },
    { n: 'Capó', p: 80000 },
    { n: 'Difuminado en dos paneles', p: 90000, r: true },
  ],
  blurMax: 120000,
})
