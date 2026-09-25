import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpRequestOptions } from '../../http/types/HttpRequestOptions'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { listAeatFilings } from './listAeatFilings'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://www1.agenciatributaria.gob.es/x',
  headers: {},
  body: Buffer.alloc(0),
  text,
})

const searchPage = [
  String.raw`['zul.inp.Combobox','cM1',{id:'cbModelos'},[['zul.inp.Comboitem','iM303',{label:'303 - IVA'}]]],`,
  String.raw`['zul.inp.Combobox','cE1',{id:'cbEjercicios'},[['zul.inp.Comboitem','iE2025',{label:'2025'}]]],`,
  String.raw`['zul.inp.Combobox','cP1',{id:'cbPeriodos'},[]],`,
  String.raw`['zul.wgt.Button','bB1',{label:'Buscar'}] dt:'z_ab\x2Dcd'`,
].join('')

const grid =
  "['zul.wgt.Label','l1',{label:'2025303000012345 '}],['zul.wgt.Button','v1',{$onClick:true,prolog:' ',label:'Ver'}],['zul.wgt.Button','v1b',{$onClick:true,prolog:' ',label:'Ver'}]" +
  "['zul.wgt.Label','l2',{label:'2025303000022222 '}],['zul.wgt.Button','v2',{$onClick:true,prolog:' ',label:'Ver'}],['zul.wgt.Button','v2b',{$onClick:true,prolog:' ',label:'Ver'}]"

describe('listAeatFilings', () => {
  it('opens the session, drives the search on a fresh desktop and resolves each receipt CSV', async () => {
    const zkau: string[] = []
    const request = vi.fn<HttpClient['request']>(
      async (url: string, options?: HttpRequestOptions) => {
        if (url.endsWith('/MdcAcceso')) return Promise.resolve(page(''))
        if (url.endsWith('/index.zul')) return Promise.resolve(page(searchPage))
        const form = options?.form ?? {}
        zkau.push(`${form['cmd_0'] ?? ''}:${form['uuid_0'] ?? ''}`)
        if (form['uuid_0'] === 'bB1') return Promise.resolve(page(grid))
        if (form['uuid_0'] === 'v1')
          return Promise.resolve(page("src:'x?CSV=CSV1'"))
        if (form['uuid_0'] === 'v2') return Promise.resolve(page('no csv'))
        return Promise.resolve(page(''))
      },
    )
    const client: HttpClient = { request, cookie: () => undefined }

    const report = await listAeatFilings(client, '12345678Z', {
      modelo: '303',
      ejercicio: '2025',
    })

    expect(zkau).toEqual([
      'onSelect:cM1',
      'onSelect:cE1',
      'onClick:bB1',
      'onClick:v1',
      'onClick:v2',
    ])
    expect(request.mock.calls[2]?.[1]?.form?.['dtid']).toBe('z_ab-cd')
    expect(report).toMatchObject({
      nif: '12345678Z',
      query: { modelo: '303', ejercicio: '2025' },
      count: 2,
      filings: [
        { expediente: '2025303000012345', csv: 'CSV1' },
        { expediente: '2025303000022222', csv: undefined },
      ],
    })
    expect(report.notes[0]).toMatch(/autoliquidaciones only/)
  })

  it('keeps an expediente whose Ver button the grid did not carry', async () => {
    const request = vi.fn<HttpClient['request']>(
      async (url: string, options?: HttpRequestOptions) => {
        if (url.endsWith('/index.zul')) return Promise.resolve(page(searchPage))
        if (options?.form?.['uuid_0'] === 'bB1')
          return Promise.resolve(
            page("['zul.wgt.Label','l1',{label:'2025303000012345 '}]"),
          )
        return Promise.resolve(page(''))
      },
    )
    const client: HttpClient = { request, cookie: () => undefined }

    const report = await listAeatFilings(client, '12345678Z', {
      modelo: '303',
      ejercicio: '2025',
    })

    expect(report.filings).toEqual([{ expediente: '2025303000012345' }])
  })
})
