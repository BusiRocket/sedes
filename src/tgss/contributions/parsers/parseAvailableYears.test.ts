import { describe, expect, it } from 'vitest'

import { parseAvailableYears } from './parseAvailableYears'

describe('parseAvailableYears', () => {
  it('lists the CODELEMENTO years inside cAnio only', () => {
    const xml =
      '<otro><CODELEMENTO>1990</CODELEMENTO></otro>' +
      '<cAnio arqobj="ec" id="CANIO"><ELEMENTO><CODELEMENTO>2026</CODELEMENTO><DESCCORTA><![CDATA[2026]]></DESCCORTA></ELEMENTO>' +
      '<ELEMENTO><CODELEMENTO>2025</CODELEMENTO></ELEMENTO></cAnio>'

    expect(parseAvailableYears(xml)).toEqual(['2026', '2025'])
  })

  it('is empty without the select', () => {
    expect(parseAvailableYears('<ProsaXMLData/>')).toEqual([])
  })
})
