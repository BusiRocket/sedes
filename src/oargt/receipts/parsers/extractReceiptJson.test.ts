import { describe, expect, it } from 'vitest'

import { extractReceiptJson } from './extractReceiptJson'

const withDataset = (arrayLiteral: string): string => `
<script>
console.log('script for datatables');
var dataset_DEUDAPENDIENTE = ${arrayLiteral};
jQuery(document).ready(function () {});
</script>
`

describe('extractReceiptJson', () => {
  it('parses the dataset array out of a plain page script', () => {
    const rows = extractReceiptJson(
      withDataset('[{"referen":"117","importePrincipal":158.24}]'),
    )
    expect(rows).toEqual([{ referen: '117', importePrincipal: 158.24 }])
  })

  it('parses the dataset out of a CDATA-wrapped ajax answer', () => {
    const xml = `<?xml version="1.0"?><zones><zone name="DEUDAPENDIENTE"><![CDATA[<div></div>]]></zone><script><![CDATA[
      var dataset_DEUDAPENDIENTE = [{"referen":"6343HNW"}];
    ]]></script></zones>`
    expect(extractReceiptJson(xml)).toEqual([{ referen: '6343HNW' }])
  })

  it('survives a "];" substring inside a row field', () => {
    const rows = extractReceiptJson(
      withDataset('[{"otribdesc":"CL EJEMPLO]; 12","referen":"1"}]'),
    )
    expect(rows).toEqual([{ otribdesc: 'CL EJEMPLO]; 12', referen: '1' }])
  })

  it('answers an empty array when the tab has no rows and omits the script', () => {
    expect(extractReceiptJson('<div>no receipts here</div>')).toEqual([])
  })

  it('answers an empty array when the array never closes', () => {
    expect(extractReceiptJson('var dataset_DEUDAPENDIENTE = [{"a":1}')).toEqual(
      [],
    )
  })
})
