import { generateKeyPairSync, verify } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { signPkcs1Sha256 } from './signPkcs1Sha256'

describe('signPkcs1Sha256', () => {
  it('produces a signature the public key verifies', () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
    })
    const key = Buffer.from(privateKey.export({ type: 'pkcs8', format: 'pem' }))
    const data = Buffer.from('hash prepared by the portal')
    const signature = signPkcs1Sha256({ cert: Buffer.alloc(0), key }, data)
    expect(verify('sha256', data, publicKey, signature)).toBe(true)
  })
})
