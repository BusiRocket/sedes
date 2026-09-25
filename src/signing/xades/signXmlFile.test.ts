/* eslint-disable security/detect-non-literal-fs-filename -- every path is a fixture or one this test built under its own temp dir */
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../fixtures/buildTestIdentity'
import { signXmlFile } from './signXmlFile'

describe('signXmlFile', () => {
  const dir = mkdtempSync(join(tmpdir(), 'papeleo-sign-'))
  const input = join(dir, 'factura.xml')
  writeFileSync(input, '<Facturae/>')
  const identity = buildTestIdentity()

  it('signs enveloped with the Facturae policy and reports it', async () => {
    const output = join(dir, 'factura.xsig')
    const result = await signXmlFile(
      { input, output, mode: 'enveloped', policy: 'facturae' },
      identity,
    )
    const written = readFileSync(output)
    expect(result).toMatchObject({
      out: output,
      mode: 'enveloped',
      policy: 'facturae',
      bytes: written.length,
      signer: 'CN=PAPELEO TEST',
      notes: [],
    })
    expect(written.toString()).toContain('politica_de_firma_formato_facturae')
  })

  it('references the input by file name when detached', async () => {
    const output = join(dir, 'factura.detached.xsig')
    const result = await signXmlFile(
      { input, output, mode: 'detached', policy: 'ninguna' },
      identity,
    )
    expect(readFileSync(output, 'utf8')).toContain('URI="factura.xml"')
    expect(result.notes).toHaveLength(1)
    expect(readFileSync(output, 'utf8')).not.toContain('SignaturePolicy')
  })
})
