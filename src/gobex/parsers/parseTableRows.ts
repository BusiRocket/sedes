import { htmlToText } from '../../html/htmlToText'

/** The cells of every row of the rich-table `<table id="tableId">`, as text. */
export const parseTableRows = (html: string, tableId: string): string[][] => {
  const start = html.indexOf(`id="${tableId}"`)
  if (start === -1) return []
  const end = html.indexOf('</table>', start)
  const table = html.slice(start, end === -1 ? undefined : end)
  return [
    ...table.matchAll(
      /<tr\s[^>]*class="rich-table-row[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi,
    ),
  ].map(([, row = '']) =>
    [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(([, cell = '']) =>
      htmlToText(cell),
    ),
  )
}
