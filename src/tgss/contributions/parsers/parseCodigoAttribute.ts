/** The `CODIGO` attribute of an element such as `<NAF CODIGO="...">`. */
export const parseCodigoAttribute = (
  xml: string,
  tag: string,
): string | undefined => {
  const marker = `<${tag} CODIGO="`
  const start = xml.indexOf(marker)
  if (start === -1) return undefined
  const from = start + marker.length
  const end = xml.indexOf('"', from)
  if (end === -1) return undefined
  const value = xml.slice(from, end).trim()
  return value === '' ? undefined : value
}
