import { describe, expect, it } from 'vitest'

import { parseTableRows } from './parseTableRows'

describe('parseTableRows', () => {
  it('reads the rows of one table only', () => {
    const html = `<table class="rich-table" id="a:t"><tbody><tr class="rich-table-row rich-table-firstrow "><td class="c">1</td><td><span title="x">Inspecci&oacute;n</span></td></tr></tbody></table>
<table class="rich-table" id="b:t"><tbody><tr class="rich-table-row "><td>2</td></tr></tbody></table>`
    expect(parseTableRows(html, 'a:t')).toEqual([['1', 'Inspección']])
    expect(parseTableRows(html, 'b:t')).toEqual([['2']])
    expect(parseTableRows(html, 'c:t')).toEqual([])
  })
})
