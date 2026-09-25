import { describe, expect, it } from 'vitest'

import { prosaCommonFields } from './prosaCommonFields'

describe('prosaCommonFields', () => {
  it('carries the fixed fields plus the rotating ticket', () => {
    expect(prosaCommonFields('a66813372eac4554')).toEqual({
      'SPM.CONTEXT': 'internet',
      'ARQ.SPM.OUT': 'XML_STYLESHEET',
      ES_FW4: '1',
      'ARQ.SPM.IDIOMA': 'ES',
      'SPM.HAYJS': '1',
      'ARQ.SPM.TICKET': 'a66813372eac4554',
      'SPM.ISPOPUP': '0',
    })
  })
})
