import { useEffect, useState, type ReactNode } from 'react'

/** Botón de dos pasos: el primer toque pide confirmación, el segundo ejecuta. */
export function ConfirmButton(props: { children: ReactNode; armedLabel: string; onConfirm: () => void; className?: string }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!armed) return
    const t = setTimeout(() => setArmed(false), 3000)
    return () => clearTimeout(t)
  }, [armed])
  return (
    <button
      className={props.className}
      onClick={() => {
        if (armed) { setArmed(false); props.onConfirm() } else setArmed(true)
      }}
    >
      {armed ? props.armedLabel : props.children}
    </button>
  )
}
