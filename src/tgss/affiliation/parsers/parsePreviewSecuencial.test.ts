import { describe, expect, it } from 'vitest'

import { parsePreviewSecuencial } from './parsePreviewSecuencial'

describe('parsePreviewSecuencial', () => {
  it('prefers the PREVIEW embedded as Informe', () => {
    const xml =
      '<SCREEN_REPORTS><PREVIEWS><PREVIEW SECUENCIAL="1" IDEMBEDDED="Resguardo"/>' +
      '<PREVIEW IDEMBEDDED="Informe" SECUENCIAL="3"/></PREVIEWS></SCREEN_REPORTS>'

    expect(parsePreviewSecuencial(xml)).toBe('3')
  })

  it('falls back to the first PREVIEW', () => {
    expect(parsePreviewSecuencial('<PREVIEW SECUENCIAL="2"/>')).toBe('2')
  })

  it('answers undefined without a PREVIEW', () => {
    expect(parsePreviewSecuencial('<ProsaXMLData/>')).toBeUndefined()
  })
})
