import { describe, expect, it } from 'vitest'

import { parseHolderName } from './parseHolderName'

describe('parseHolderName', () => {
  it('joins the name and both surnames, ignoring the e-mail nombre', () => {
    const xml =
      '<CvgiTbCorreo><nombre>correo.local</nombre></CvgiTbCorreo>' +
      '<NOM_solicitante><![CDATA[NOMBRE]]></NOM_solicitante>' +
      '<AP1_solicitante>APELLIDO</AP1_solicitante><AP2_solicitante>DOS</AP2_solicitante>'

    expect(parseHolderName(xml)).toBe('NOMBRE APELLIDO DOS')
  })

  it('skips empty parts and is undefined without any', () => {
    expect(
      parseHolderName(
        '<NOM_solicitante>NOMBRE</NOM_solicitante><AP1_solicitante></AP1_solicitante>',
      ),
    ).toBe('NOMBRE')
    expect(parseHolderName('<ProsaXMLData/>')).toBeUndefined()
  })
})
