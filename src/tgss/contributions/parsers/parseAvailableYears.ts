/** The years the AESRCUS3 entry screen offers in its `cAnio` select. */
export const parseAvailableYears = (xml: string): readonly string[] => {
  const start = xml.indexOf('<cAnio')
  const end = xml.indexOf('</cAnio>', start)
  if (start === -1 || end === -1) return []
  const list = xml.slice(start, end)
  return [...list.matchAll(/<CODELEMENTO>(\d{4})<\/CODELEMENTO>/g)].map(
    (match) => match[1] ?? '',
  )
}
