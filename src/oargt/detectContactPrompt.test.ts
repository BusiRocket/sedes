import { describe, expect, it } from 'vitest'

import { detectContactPrompt } from './detectContactPrompt'

describe('detectContactPrompt', () => {
  it('detects the contact-data confirmation gate', () => {
    const html =
      '<p>Estos son los datos Personales...<br>Proceda a Validar los datos referentes a Medios de Contacto y Datos Identificativos.</p>'
    expect(detectContactPrompt(html)).toBe(true)
  })

  it('is false for the ordinary RECIBOS page', () => {
    expect(detectContactPrompt('<div id="LISTA_PENDIENTES"></div>')).toBe(false)
  })
})
