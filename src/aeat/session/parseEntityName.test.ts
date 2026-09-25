import { describe, expect, it } from 'vitest'

import { parseEntityName } from './parseEntityName'

describe('parseEntityName', () => {
  it('reads the name up to the debt table headers', () => {
    const html = `
      <ul class='AEAT_form'>
        <li><strong>NIF:</strong> 12345678Z</li>
        <li><strong>Nombre:</strong> JANE DOE</li>
      </ul>
      <table><tr><th>Clave de liquidación</th></tr></table>
    `
    expect(parseEntityName(html)).toBe('JANE DOE')
  })

  it('reads the name up to the Avisos section on a no-debts page', () => {
    const html = `
      <li><strong>NIF:</strong> B12345678</li>
      <li><strong>Nombre:</strong> ACME SL</li>
      Avisos No existen deudas para mostrar
    `
    expect(parseEntityName(html)).toBe('ACME SL')
  })

  it('returns undefined when the page carries no Nombre label', () => {
    expect(parseEntityName('<p>nothing here</p>')).toBeUndefined()
  })
})
