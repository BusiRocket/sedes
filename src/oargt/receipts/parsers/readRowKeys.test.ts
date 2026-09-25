import { describe, expect, it } from 'vitest'

import { readRowKeys } from './readRowKeys'

describe('readRowKeys', () => {
  it('reads each row dboid in order and skips rows that are not objects', () => {
    expect(
      readRowKeys([
        { dboid: '1' },
        null,
        'x',
        [],
        { dboid: 2 },
        { dboid: '3' },
      ]),
    ).toEqual(['1', '', '3'])
  })
})
