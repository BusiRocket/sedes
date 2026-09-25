import { describe, expect, it } from 'vitest'

import { readFlowState } from './readFlowState'

describe('readFlowState', () => {
  it('reads the execution key and IdUnico', () => {
    const xml =
      '<IdUnico>77</IdUnico><Dato Nombre="flowExecutionKey">e2s3</Dato>'

    expect(readFlowState(xml, 'step')).toEqual({
      executionKey: 'e2s3',
      idUnico: '77',
    })
  })

  it('leaves the key undefined when the screen carries none', () => {
    expect(readFlowState('<IdUnico>1</IdUnico>', 'step').executionKey).toBe(
      undefined,
    )
  })

  it('throws on a page that is not an IAS screen', () => {
    expect(() => readFlowState('<html>URL rechazada</html>', 'Lista')).toThrow(
      /CIRBE: Lista did not answer an IAS screen/,
    )
  })
})
