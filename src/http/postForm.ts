import type { HtmlForm } from '../html/HtmlForm'
import type { HttpClient } from './HttpClient'
import type { HttpRequestOptions } from './HttpRequestOptions'
import type { HttpResponse } from './HttpResponse'

/** Submit a parsed form, optionally overriding or adding fields, as the browser's auto-submit would. */
export const postForm = async (
  client: HttpClient,
  form: HtmlForm,
  overrides: Readonly<Record<string, string>> = {},
  options: Omit<HttpRequestOptions, 'form' | 'method' | 'body'> = {},
): Promise<HttpResponse> =>
  client.request(form.action, {
    ...options,
    method: 'POST',
    form: { ...form.fields, ...overrides },
  })
