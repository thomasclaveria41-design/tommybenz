export type Tab = 'q' | 'h' | 't'
export type LineType = 'p' | 'b' | 'd' | 'o' // pieza, difuminado, desabolladura, otro

export interface Line { id: string; t: LineType; n: string; qty: string; price: string }
export interface Client { nombre: string; tel: string; marca: string; modelo: string; anio: string; patente: string; fecha: string; desc: string }
export interface Discount { mode: '$' | '%'; val: string }
export interface Quote { id: string | null; c: Client; lines: Line[]; disc: Discount; total?: number; upd?: number }
export interface CatalogItem { n: string; p: number; r?: boolean }
export interface Prices { panels: CatalogItem[]; blur: CatalogItem[]; blurMax: number }
export interface Totals { sub: number; d: number; total: number; ant: number; rest: number }
export interface BackupFile { v: number; prices?: Prices; quotes: Quote[] }
