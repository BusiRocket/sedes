import { describe, expect, it } from 'vitest'

import { formatDistinguishedName } from './formatDistinguishedName'

describe('formatDistinguishedName', () => {
  it('reverses the RDNs and joins them without spaces', () => {
    expect(
      formatDistinguishedName(
        'C=ES\nO=FNMT-RCM\nOU=Ceres\nCN=AC FNMT Usuarios\n',
      ),
    ).toBe('CN=AC FNMT Usuarios,OU=Ceres,O=FNMT-RCM,C=ES')
  })
})
