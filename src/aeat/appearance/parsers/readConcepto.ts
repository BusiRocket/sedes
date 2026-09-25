/** The text after `Concepto` up to the next label, on a page already reduced to text. */
export const readConcepto = (text: string): string | undefined => {
  const label = /Concepto:? /i.exec(text)
  if (!label) return undefined
  const after = text.slice(label.index + label[0].length)
  const next = after.search(
    /(?:^| )(?:Fecha|Tipo|Titular|Destinatario|Modo)\b/i,
  )
  const value = (next < 0 ? after : after.slice(0, next)).trim()
  return value === '' ? undefined : value
}
