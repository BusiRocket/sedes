import { describe, expect, it } from 'vitest'

import { debtDetailForm } from './debtDetailForm'
import { finalPaymentForm } from './finalPaymentForm'
import { partialPaymentForm } from './partialPaymentForm'
import { paymentSummaryForm } from './paymentSummaryForm'

const input = { nif: '00000000T', clave: 'A0000000000000001', puv: 'AB12' }

describe('SRVO-JDIT step forms', () => {
  it('builds PagarParcial', () => {
    expect(partialPaymentForm('00000000T', 'AB12')).toEqual({
      fnif: '00000000T',
      faccion: 'PAGAR_PARCIAL_DDAS',
      faccionorigen: 'CONS_DDAS',
      pUV: 'AB12',
    })
  })

  it('builds DetalleDda', () => {
    expect(debtDetailForm(input)).toMatchObject({
      fliquidacion: 'A0000000000000001',
      faccion: 'DETALLE_DDA',
      faccionorigen: 'PAGAR_PARCIAL_DDAS',
      fnddasemb: '1',
      fmigas: '4',
      pUV: 'AB12',
    })
  })

  it('builds ResumenDdas with the pending cents', () => {
    expect(paymentSummaryForm(input, 123456)).toMatchObject({
      faccion: 'PAGAR',
      fimptotalemb: '123456',
      faccionorigen2: 'PAGAR_PARCIAL_DDAS',
      fmigas: '45',
    })
  })

  it('builds FinalPago with the selected amount split', () => {
    expect(finalPaymentForm(input, 123456, 10050)).toMatchObject({
      faccion: 'DETALLE_PAGO',
      fimpselecc: '100',
      fimpseleccdec: '50',
      fimptotal: '123456',
      fimptotalemb: '123456',
      fcaracterizacion: '2',
      fmodoseleccion: 'DETALLE_DDA',
      fmigas: '456',
    })
  })
})
