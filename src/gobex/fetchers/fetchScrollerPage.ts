import { parseForms } from '../../html/parsers/parseForms'
import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { gobexTimeoutMs } from '../session/gobexTimeoutMs'
import type { Datascroller } from '../types/Datascroller'

/**
 * Ask a RichFaces datascroller for page `page`, as its A4J submit does: the
 * scroller's form, `AJAXREQUEST` and the page label. The answer is an XHTML
 * fragment carrying the grid rows.
 */
export const fetchScrollerPage = async (
  client: HttpClient,
  results: HttpResponse,
  scroller: Datascroller,
  page: number,
): Promise<HttpResponse> => {
  const form = parseForms(results.text, results.url).find(
    (candidate) => candidate.fields[scroller.formId] !== undefined,
  )
  if (!form) throw new Error(`Junta: no form ${scroller.formId} to page with`)
  return client.request(form.action, {
    timeoutMs: gobexTimeoutMs,
    method: 'POST',
    form: {
      ...form.fields,
      AJAXREQUEST: '_viewRoot',
      [scroller.scrollerId]: String(page),
      ajaxSingle: scroller.scrollerId,
    },
    referer: results.url,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
}
