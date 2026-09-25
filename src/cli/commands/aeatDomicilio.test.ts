import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { aeatDomicilio } from './aeatDomicilio'

const request = vi.fn<HttpClient['request']>()
const client: HttpClient = { request, cookie: () => undefined }
const options = {
  nif: 'B00000000',
  'codigo-postal': '10001',
  via: 'MAYOR',
  numero: '3',
  'referencia-catastral': '0000000AA0000A0001AA',
  lugar: 'CACERES',
  firmado: 'ANA GARCIA LOPEZ',
  calidad: 'Representante',
}

describe('aeatDomicilio', () => {
  it('is a write command', () => {
    expect(aeatDomicilio.effect).toBe('write')
    expect(aeatDomicilio.options).toContain('referencia-catastral')
  })

  it('requires --nif', async () => {
    await expect(aeatDomicilio.run(client, {})).rejects.toThrow('--nif')
  })

  it('validates and plans offline, defaulting the number type', async () => {
    const result = (await aeatDomicilio.run(client, options)) as {
      executed: boolean
      notes: readonly string[]
      plan: readonly string[]
    }
    expect(result.executed).toBe(false)
    expect(result.notes).toEqual([])
    expect(result.plan[3]).toMatch(/NUMERO 3;/)
    expect(request).not.toHaveBeenCalled()
  })

  it('reports missing options as notes without sending anything', async () => {
    const result = (await aeatDomicilio.run(client, {
      nif: 'B00000000',
      confirmar: 'si',
    })) as { executed: boolean; notes: readonly string[] }
    expect(result.executed).toBe(false)
    expect(result.notes.length).toBeGreaterThan(0)
    expect(request).not.toHaveBeenCalled()
  })
})
