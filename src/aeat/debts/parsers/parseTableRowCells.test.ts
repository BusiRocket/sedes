import { describe, expect, it } from 'vitest'

import { parseTableRowCells } from './parseTableRowCells'

describe('parseTableRowCells', () => {
  it('reduces every tr to the plain text of its td/th cells', () => {
    const html = `
      <table>
        <thead><tr><th>A</th><th>B</th></tr></thead>
        <tbody>
          <tr></tr>
          <tr><td>1</td><td>&nbsp;2&nbsp;</td></tr>
        </tbody>
      </table>
    `
    expect(parseTableRowCells(html)).toEqual([['A', 'B'], [], ['1', '2']])
  })

  it('returns an empty array for a page with no table rows', () => {
    expect(parseTableRowCells('<p>no rows here</p>')).toEqual([])
  })
})
