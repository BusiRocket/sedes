import { htmlToText } from '../../../html/htmlToText'

/** Every `<tr>` on a page, reduced to the plain text of its `<td>`/`<th>` cells. */
export const parseTableRowCells = (
  html: string,
): readonly (readonly string[])[] =>
  [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(([, inner = '']) =>
    [...inner.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(
      ([, cell = '']) => htmlToText(cell),
    ),
  )
