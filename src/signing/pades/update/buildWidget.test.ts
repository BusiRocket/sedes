import { describe, expect, it } from 'vitest'

import { pdfRefTo } from '../objects/pdfRefTo'
import { serializePdfValue } from '../objects/serializePdfValue'
import { buildWidget } from './buildWidget'

describe('buildWidget', () => {
  const parts = {
    signature: pdfRefTo(8),
    page: pdfRefTo(3),
    fieldName: 'Signature9',
  }

  it('is an invisible locked signature widget by default', () => {
    const text = serializePdfValue(buildWidget(parts))
    expect(text).toContain(
      '/FT /Sig /T (Signature9) /V 8 0 R /F 132 /Rect [0 0 0 0] /P 3 0 R',
    )
    expect(text).not.toContain('/AP')
  })

  it('points at the stamp appearance when visible', () => {
    const stamp = { rect: [1, 2, 3, 4], appearance: pdfRefTo(11) }
    expect(serializePdfValue(buildWidget({ ...parts, stamp }))).toContain(
      '/Rect [1 2 3 4] /P 3 0 R /AP << /N 11 0 R >>',
    )
  })
})
