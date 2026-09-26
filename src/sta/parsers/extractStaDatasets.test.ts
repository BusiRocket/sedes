import { describe, expect, it } from 'vitest'

import { extractStaDatasets } from './extractStaDatasets'

describe('extractStaDatasets', () => {
  it('reads every ds_ array, brackets inside strings included', () => {
    const text = `<script>var ds_A = [{"x":"a]b"}];</script>
<zones><![CDATA[var ds_B_C = [{"y":1},{"y":2}];]]></zones>`
    expect(extractStaDatasets(text)).toEqual({
      A: [{ x: 'a]b' }],
      B_C: [{ y: 1 }, { y: 2 }],
    })
  })

  it('skips unclosed arrays and non-object rows', () => {
    expect(
      extractStaDatasets('var ds_A = [1, {"k":2}, null]; var ds_B = ['),
    ).toEqual({
      A: [{ k: 2 }],
    })
  })

  it('answers nothing for a page without datasets', () => {
    expect(
      extractStaDatasets('<div class="no-records">No tiene</div>'),
    ).toEqual({})
  })
})
