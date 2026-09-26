import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { loginWithClave } from './loginWithClave'

const answer = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const access = answer(
  'https://sede.gobex.es/SEDE/estructura/accesoClave.jsf',
  '<form id="j" action="accesoClave.jsf"><input type="hidden" name="j" value="j"/><input type="image" src="/i/bt_continuar.gif" name="j:go"/></form>',
)
const entry = answer(
  'https://sede.gobex.es/SEDE/estructura/accesoClave.jsf',
  '<form action="https://pasarela.clave.gob.es/Proxy2/ServiceProvider"><input type="hidden" name="SAMLRequest" value="r"/></form>',
)
const chooser = answer(
  'https://pasarela.clave.gob.es/Proxy2/ServiceProvider',
  '<form name="idpRedirect" action="ServiceRedirect"><input type="hidden" name="SAMLRequest" value="r"/></form>',
)

const client = (...answers: HttpResponse[]): HttpClient => {
  const request = vi.fn<HttpClient['request']>()
  for (const item of answers) request.mockResolvedValueOnce(item)
  return { request, cookie: () => undefined }
}

describe('loginWithClave', () => {
  it('walks access, pasarela and chooser to the private area', async () => {
    const landed = answer(
      'https://sede.gobex.es/SEDE/privado/ciudadanos/MisDatos.jsf',
      '<form action="/SEDE/estructura/logout.jsp"></form>',
    )
    await expect(
      loginWithClave(client(access, entry, chooser, landed)),
    ).resolves.toBeUndefined()
  })

  it('refuses a relay that does not land in the private area', async () => {
    const lost = answer('https://sede.gobex.es/SEDE/', '<p>Acceso</p>')
    await expect(
      loginWithClave(client(access, entry, chooser, lost)),
    ).rejects.toThrow('did not reach the Carpeta Ciudadana')
  })

  it('refuses a missing entry form or chooser', async () => {
    const empty = answer('https://sede.gobex.es/', '<p/>')
    await expect(loginWithClave(client(access, empty))).rejects.toThrow(
      'no Cl@ve entry form',
    )
    await expect(loginWithClave(client(access, entry, empty))).rejects.toThrow(
      'no IdP chooser',
    )
  })
})
