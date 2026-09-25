import { describe, expect, it } from 'vitest'

import { readAuthData } from './readAuthData'

describe('readAuthData', () => {
  it('reads authData from an absolute URL', () => {
    expect(
      readAuthData(
        'https://dehu.redsara.es/es/login?authData=JWT123',
        'https://dehu.redsara.es/api/login/login-check',
      ),
    ).toBe('JWT123')
  })

  it('resolves a relative Location header against the request URL', () => {
    expect(
      readAuthData(
        '/es/login?authData=JWT456',
        'https://dehu.redsara.es/api/login/login-check?selectedLanguage=es',
      ),
    ).toBe('JWT456')
  })

  it('returns undefined when there is no authData parameter', () => {
    expect(
      readAuthData(
        'https://dehu.redsara.es/es/login?error=denied',
        'https://dehu.redsara.es/',
      ),
    ).toBeUndefined()
  })
})
