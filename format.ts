export const money = (n: number): string =>
  (n < 0 ? '-' : '') + '$' + Math.abs(Math.round(n)).toLocaleString('es-CL')

/** Convierte lo que escribe el usuario ("150.000", "150000") en un entero. */
export const N = (v: unknown): number => {
  const x = parseInt(String(v ?? '').replace(/[^\d-]/g, ''), 10)
  return Number.isFinite(x) ? x : 0
}

export const uid = (): string => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

export const today = (): string => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T
