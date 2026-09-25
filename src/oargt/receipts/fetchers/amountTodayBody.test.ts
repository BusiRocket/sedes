import { describe, expect, it } from 'vitest'

import { amountTodayBody } from './amountTodayBody'

describe('amountTodayBody', () => {
  it('builds the CALCULAR_IMP form the page handler posts, keyed by the row dboid', () => {
    const body = amountTodayBody('100001069134')
    expect(body['eventScreenId']).toBe('DEUDAPENDIENTE')
    expect(body['eventAction']).toBe('CALCULAR_IMP')
    expect(body['eventArguments']).toBe('KEY=100001069134')
    expect(body['noPageCall']).toBe('true')
    expect(body['PAGE_CODE']).toBe('RECIBOS')
    expect(body['APP_CODE']).toBe('STA')
  })
})
