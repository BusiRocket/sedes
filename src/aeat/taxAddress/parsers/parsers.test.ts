import { describe, expect, it } from 'vitest'

import { findAddressSearchButton } from './findAddressSearchButton'
import { findButtonUuid } from './findButtonUuid'
import { findWidgetUuid } from './findWidgetUuid'
import { parseM036DesktopId } from './parseM036DesktopId'
import { parseM036Errors } from './parseM036Errors'
import { parsePresenvaliPayload } from './parsePresenvaliPayload'
import { parseStreetItems } from './parseStreetItems'
import { parseTaxAddressReceipt } from './parseTaxAddressReceipt'

describe('036 parsers', () => {
  it('reads and decodes the desktop id', () => {
    expect(parseM036DesktopId("{dt:'z_ab\\x2Dcd'}")).toBe('z_ab-cd')
    expect(() => parseM036DesktopId('<p/>')).toThrow('no ZK desktop id')
  })

  it('finds a widget in the newest answer that declares it', () => {
    const blobs = ["['T','old',{id:'w1'}]", "['T','new',{id:'w1'}]", 'x']
    expect(findWidgetUuid(blobs, 'w1')).toBe('new')
    expect(() => findWidgetUuid(blobs, 'w2')).toThrow('widget w2 not found')
    expect(() => findWidgetUuid([",{id:'w3'"], 'w3')).toThrow('w3')
  })

  it('finds a button by label prefix', () => {
    const html =
      "Button','b1',{label:'Otro'} Button','b2',{label:'Firmar y Enviar'}"
    expect(findButtonUuid(html, 'Firmar')).toBe('b2')
    expect(() => findButtonUuid(html, 'Validar')).toThrow('not found')
  })

  it('finds the last address search button before the PJ block', () => {
    const html =
      "Button','a',{label:'Buscar direcci'} Button','b',{label:'Buscar direcci'} id:'IDEN_PJ_DOMI_FIS_TIPO_VIA_B11'"
    expect(findAddressSearchButton(html)).toBe('b')
    expect(() => findAddressSearchButton('<p/>')).toThrow('no legal-entity')
    expect(() =>
      findAddressSearchButton("id:'IDEN_PJ_DOMI_FIS_TIPO_VIA_B11'"),
    ).toThrow('button not found')
  })

  it('lists street items', () => {
    expect(parseStreetItems("Listitem','l1' Listitem','l2'")).toEqual([
      'l1',
      'l2',
    ])
  })

  it('pairs error codes with messages', () => {
    expect(
      parseM036Errors("value:'12345' value:'Mal \\u00e1' value:'54321'"),
    ).toEqual([
      { code: '12345', message: 'Mal á' },
      { code: '54321', message: '' },
    ])
  })

  it('parses the onPresenvali payload or refuses', () => {
    expect(
      parsePresenvaliPayload("['onPresenvali',[{'kls':'k','codErr':'0'}]]"),
    ).toEqual({
      kls: 'k',
      codErr: '0',
    })
    expect(() => parsePresenvaliPayload('[]')).toThrow('no onPresenvali')
  })

  it('reads receipt labels and links', () => {
    expect(
      parseTaxAddressReceipt(
        "{label:'Hecho \\'ok\\''},{value:' '} '/wlpl/A/b?c=1'",
      ),
    ).toEqual({ labels: ["Hecho 'ok'"], urls: ['/wlpl/A/b?c=1'] })
  })
})
