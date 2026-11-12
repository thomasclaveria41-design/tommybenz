export function Toast({ message, on }: { message: string; on: boolean }) {
  return <div id="toast" className={on ? 'on' : ''}>{message}</div>
}
