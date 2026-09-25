import { unescapeHtml } from '../../html/unescapeHtml'

/** The `<DatoRegistro Nombre="name">` rows of an IAS answer, each as field name to unescaped value. */
export const readDatoRecords = (
  xml: string,
  name: string,
): Record<string, string>[] => {
  const rowPattern =
    /<DatoRegistro Nombre="([^"]+)">([\s\S]*?)<\/DatoRegistro>/g
  const fieldPattern = /<Dato Nombre="([^"]+)">([^<]*)<\/Dato>/g
  return [...xml.matchAll(rowPattern)]
    .filter((row) => row[1] === name)
    .map((row) =>
      Object.fromEntries(
        [...String(row[2]).matchAll(fieldPattern)].map((field) => [
          String(field[1]),
          unescapeHtml(String(field[2])),
        ]),
      ),
    )
}
