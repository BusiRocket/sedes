import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import type { ZkDesktop } from '../types/ZkDesktop'
import { selectSearchCriteria } from './selectSearchCriteria'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://www1.agenciatributaria.gob.es/zkau',
  headers: {},
  body: Buffer.alloc(0),
  text,
})

const desktop: ZkDesktop = {
  desktopId: 'z_1',
  comboModelos: 'cM1',
  comboEjercicios: 'cE1',
  comboPeriodos: 'cP1',
  buttonBuscar: 'bB1',
}

const html = [
  "['zul.inp.Combobox','cM1',{id:'cbModelos'},[['zul.inp.Comboitem','iM303',{label:'303 - IVA'}]]],",
  "['zul.inp.Combobox','cE1',{id:'cbEjercicios'},[['zul.inp.Comboitem','iE2024',{label:'2024'}]]],",
  "['zul.inp.Combobox','cP1',{id:'cbPeriodos'},[['zul.inp.Comboitem','iP1T',{label:'1T'}]]]",
].join('')

const reloadedEjercicios =
  "['zul.inp.Comboitem','iE2025',{label:'2025'}],['zul.inp.Comboitem','iE2024',{label:'2024'}]"

const formOf = (
  request: ReturnType<typeof vi.fn<HttpClient['request']>>,
  call: number,
): Readonly<Record<string, string>> => request.mock.calls[call]?.[1]?.form ?? {}

describe('selectSearchCriteria', () => {
  it('selects modelo, then ejercicio from the reloaded combo, and skips periodo when absent', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(reloadedEjercicios))
      .mockResolvedValueOnce(page(''))
    const client: HttpClient = { request, cookie: () => undefined }

    await selectSearchCriteria(client, html, desktop, {
      modelo: '303',
      ejercicio: '2025',
    })

    expect(request).toHaveBeenCalledTimes(2)
    expect(formOf(request, 0)['uuid_0']).toBe('cM1')
    expect(formOf(request, 0)['data_0']).toContain('iM303')
    expect(formOf(request, 1)['uuid_0']).toBe('cE1')
    expect(formOf(request, 1)['data_0']).toContain('iE2025')
  })

  it('falls back to the page combos and selects the periodo when given', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue(page(''))
    const client: HttpClient = { request, cookie: () => undefined }

    await selectSearchCriteria(client, html, desktop, {
      modelo: '303',
      ejercicio: '2024',
      periodo: '1T',
    })

    expect(request).toHaveBeenCalledTimes(3)
    expect(formOf(request, 2)['uuid_0']).toBe('cP1')
    expect(formOf(request, 2)['data_0']).toContain('iP1T')
  })
})
