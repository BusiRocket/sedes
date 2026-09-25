import { describe, expect, it } from 'vitest'

import { parseComboItems } from './parseComboItems'
import { parseCsvCode } from './parseCsvCode'
import { parseResultRows } from './parseResultRows'
import { parseZkDesktop } from './parseZkDesktop'

const searchPage = [
  "zk.load('zul.inp');",
  String.raw`zkmx([['zul.wnd.Window','wA1',{},[`,
  String.raw`['zul.inp.Combobox','cM1',{id:'cbModelos'},[['zul.inp.Comboitem','iM100',{label:'100 - Renta'}],['zul.inp.Comboitem','iM303',{label:'303 - IVA. Autoliquidación'}]]],`,
  String.raw`['zul.inp.Combobox','cE1',{id:'cbEjercicios'},[['zul.inp.Comboitem','iE2025',{label:'2025'}]]],`,
  String.raw`['zul.inp.Combobox','cP1',{id:'cbPeriodos'},[]],`,
  String.raw`['zul.wgt.Button','bB1',{id:'btnBuscar',label:'Buscar'}]]]],{dt:'z_1hIcQx\x2DaFqdpE7q9bkQN4A'});`,
].join('\n')

const gridResponse = [
  String.raw`['zul.grid.Row','r1',{},[['zul.wgt.Label','l1',{label:'2025303000012345 '}],['zul.wgt.Button','v1',{$onClick:true,tabindex:0,prolog:' ',label:'Ver'}],['zul.wgt.Button','v1b',{$onClick:true,prolog:' ',label:'Ver'}]]],`,
  String.raw`['zul.grid.Row','r2',{},[['zul.wgt.Label','l2',{label:'2025303000022222 '}],['zul.wgt.Button','v2',{$onClick:true,prolog:' ',label:'Ver'}],['zul.wgt.Button','v2b',{$onClick:true,prolog:' ',label:'Ver'}]]],`,
  String.raw`itemsInvalid_ ['zul.wgt.Label','l1x',{label:'2025303000012345 '}],['zul.wgt.Button','vX',{$onClick:true,prolog:' ',label:'Ver'}]`,
].join('')

describe('parseZkDesktop', () => {
  it('reads the unescaped desktop id, the three combos and the Buscar button', () => {
    expect(parseZkDesktop(searchPage)).toEqual({
      desktopId: 'z_1hIcQx-aFqdpE7q9bkQN4A',
      comboModelos: 'cM1',
      comboEjercicios: 'cE1',
      comboPeriodos: 'cP1',
      buttonBuscar: 'bB1',
    })
  })

  it('names what is missing', () => {
    expect(() => parseZkDesktop('<html>no mount</html>')).toThrow(
      /no ZK desktop id/,
    )
    expect(() =>
      parseZkDesktop(
        String.raw`dt:'z_a' ['zul.wgt.Button','b',{label:'Buscar'}]`,
      ),
    ).toThrow(/widget cbModelos not found/)
    expect(() =>
      parseZkDesktop(searchPage.replace("label:'Buscar'", "label:'Limpiar'")),
    ).toThrow(/Buscar button not found/)
  })
})

describe('parseComboItems', () => {
  it('lists the items of one combo from its own declaration onwards', () => {
    expect(parseComboItems(searchPage, 'cE1')).toEqual([
      { uuid: 'iE2025', label: '2025' },
    ])
    expect(parseComboItems(searchPage, 'cM1').map((item) => item.uuid)).toEqual(
      ['iM100', 'iM303', 'iE2025'],
    )
  })

  it('scans the whole text when the combo is not found or not given', () => {
    expect(parseComboItems(searchPage, 'missing')).toHaveLength(3)
    expect(parseComboItems('nothing here')).toEqual([])
  })
})

describe('parseResultRows', () => {
  it('cuts at the echo marker, dedupes expedientes and keeps the first Ver per row', () => {
    expect(parseResultRows(gridResponse)).toEqual({
      expedientes: ['2025303000012345', '2025303000022222'],
      verButtons: ['v1', 'v2'],
    })
  })

  it('answers empty for a grid without rows', () => {
    expect(
      parseResultRows("['zul.wgt.Label','l',{label:'Sin resultados'}]"),
    ).toEqual({
      expedientes: [],
      verButtons: [],
    })
  })
})

describe('parseCsvCode', () => {
  it('reads the CSV of the opened receipt', () => {
    expect(
      parseCsvCode(
        "['zul.wgt.Iframe','f',{src:'/wlpl/KATA-APLI/cotejo/CotejoDocIdSv?CSV=ABC123DEF456'}]",
      ),
    ).toBe('ABC123DEF456')
    expect(parseCsvCode('no csv here')).toBeUndefined()
  })
})
