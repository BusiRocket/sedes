import type { HtmlForm } from '../html/types/HtmlForm'
import type { HttpClient } from './types/HttpClient'
import type { HttpRequestOptions } from './types/HttpRequestOptions'
import type { HttpResponse } from './types/HttpResponse'

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
