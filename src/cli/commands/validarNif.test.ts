import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { validarNif } from './validarNif'

const request = vi.fn()
const client: HttpClient = { request, cookie: () => undefined }

describe('validarNif', () => {
  it('runs offline', () => {
    expect(validarNif.needsCertificate).toBe(false)
  })

  it('requires --nif', async () => {
    await expect(validarNif.run(client, {})).rejects.toThrow(
      /--nif is required/,
    )
  })

  it('validates a synthetic DNI without touching the client', async () => {
    await expect(validarNif.run(client, { nif: '00000001R' })).resolves.toEqual(
      {
        valor: '00000001R',
        normalizado: '00000001R',
        tipo: 'dni',
        valido: true,
      },
    )
    expect(request).not.toHaveBeenCalled()
  })
})
