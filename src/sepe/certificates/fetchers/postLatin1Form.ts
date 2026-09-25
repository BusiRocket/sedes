import type { HtmlForm } from '../../../html/types/HtmlForm'
import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpRequestOptions } from '../../../http/types/HttpRequestOptions'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { mapLatin1FormBody } from '../mappers/mapLatin1FormBody'

/**
 * Submit a sede form as the browser would, with the fields percent-encoded
 * in ISO-8859-1 and the answer decoded the same way unless it declares
 * otherwise. `overrides` replace or add fields.
 */
export const postLatin1Form = async (
  client: HttpClient,
  form: HtmlForm,
  overrides: Readonly<Record<string, string>>,
  options: Omit<HttpRequestOptions, 'form' | 'method' | 'body'> = {},
): Promise<HttpResponse> =>
  client.request(form.action, {
    ...options,
    method: 'POST',
    body: mapLatin1FormBody({ ...form.fields, ...overrides }),
    defaultCharset: 'iso-8859-1',
  })
