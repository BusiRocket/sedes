import { describe, expect, it } from 'vitest'

import { parseReportDocument } from './parseReportDocument'

describe('parseReportDocument', () => {
  it('prefers the PREVIEW, whatever the attribute order', () => {
    const xml =
      '<SCREEN_REPORTS><ATTACHMENTS><ATTACHMENT EXT="pdf" SECUENCIAL="1"/></ATTACHMENTS>' +
      '<PREVIEWS><PREVIEW SECUENCIAL="2" TYPE="INFORME" IDEMBEDDED="ID_INFORME"/></PREVIEWS></SCREEN_REPORTS>'

    expect(parseReportDocument(xml)).toEqual({
      secuencial: '2',
      typeView: 'INFORME',
    })
  })

  it('falls back to the first ATTACHMENT as a documento', () => {
    const xml =
      '<ATTACHMENTS><ATTACHMENT EXT="pdf" SECUENCIAL="3"><![CDATA[Informe]]></ATTACHMENT></ATTACHMENTS>'

    expect(parseReportDocument(xml)).toEqual({
      secuencial: '3',
      typeView: 'DOCUMENTO',
    })
  })

  it('is undefined when the screen carries no report', () => {
    expect(parseReportDocument('<ProsaXMLData/>')).toBeUndefined()
  })
})
