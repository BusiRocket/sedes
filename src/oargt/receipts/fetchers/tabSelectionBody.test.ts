import { describe, expect, it } from 'vitest'

import { tabSelectionBody } from './tabSelectionBody'

describe('tabSelectionBody', () => {
  it('selects PENDIENTES_EJECUTIVA for the ejecutiva tab', () => {
    expect(tabSelectionBody('ejecutiva')).toEqual({
      aaxmlrequest: 'true',
      eventScreenId: 'DEUDAPENDIENTE',
      eventComponent: '',
      eventObject: 'TABBER',
      eventAction: 'TABSEL',
      eventArguments: 'SELECTED=PENDIENTES_EJECUTIVA',
      PAGE_CODE: 'RECIBOS',
      APP_CODE: 'STA',
      PAGE_COMPLETE: '',
      ROOTID: '3',
      HFC: 'HEADER_OARGTCaceres#FOOTER_OARGTCaceres',
      SESSION_REQUIRED: 'false',
      tabs_TABBER: 'on',
    })
  })

  it('selects PAGADOS for the pagados tab', () => {
    expect(tabSelectionBody('pagados')['eventArguments']).toBe(
      'SELECTED=PAGADOS',
    )
  })

  it('produces the exact urlencoded body the portal sends', () => {
    const body = new URLSearchParams(tabSelectionBody('ejecutiva')).toString()
    expect(body).toBe(
      'aaxmlrequest=true&eventScreenId=DEUDAPENDIENTE&eventComponent=&eventObject=TABBER&eventAction=TABSEL&eventArguments=SELECTED%3DPENDIENTES_EJECUTIVA&PAGE_CODE=RECIBOS&APP_CODE=STA&PAGE_COMPLETE=&ROOTID=3&HFC=HEADER_OARGTCaceres%23FOOTER_OARGTCaceres&SESSION_REQUIRED=false&tabs_TABBER=on',
    )
  })
})
