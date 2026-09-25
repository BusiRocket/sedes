import { describe, expect, it } from 'vitest'

import { offlineHttpClient } from './offlineHttpClient'
import { runCli } from './runCli'
import type { Command } from './types/Command'

describe('offline commands', () => {
  it('run without a certificate and cannot reach a portal', async () => {
    const offline: Command = {
      portal: 'validar',
      action: 'demo',
      description: 'offline',
      options: ['nif'],
      needsCertificate: false,
      run: async (_client, options) => Promise.resolve({ nif: options['nif'] }),
    }
    const out: string[] = []
    const code = await runCli(
      ['validar', 'demo', '--nif', 'X'],
      [offline],
      (text) => out.push(text),
    )
    expect(code).toBe(0)
    expect(out.join('')).toContain('"nif": "X"')
    await expect(offlineHttpClient.request('https://x.es')).rejects.toThrow(
      'offline command',
    )
    expect(offlineHttpClient.cookie('x', 'y')).toBeUndefined()
  })
})
