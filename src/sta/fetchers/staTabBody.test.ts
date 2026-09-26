import { describe, expect, it } from 'vitest'

import { staTabBody } from './staTabBody'

describe('staTabBody', () => {
  it('reproduces the TABSEL fields of a tab click', () => {
    const body = staTabBody({
      pageCode: 'SINGLE_NOTIF',
      screenId: 'NOTIFICACIONES',
      tabber: 'REP_TABBER',
      tab: 'ACEPTADA',
    })
    expect(body).toMatchObject({
      aaxmlrequest: 'true',
      eventScreenId: 'NOTIFICACIONES',
      eventObject: 'REP_TABBER',
      eventAction: 'TABSEL',
      eventArguments: 'SELECTED=ACEPTADA',
      PAGE_CODE: 'SINGLE_NOTIF',
      HFC: 'HEADER#FOOTER',
      tabs_REP_TABBER: 'on',
    })
  })
})
