import type { HtmlForm } from '../../html/types/HtmlForm'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { selectFormByName } from './selectors/selectFormByName'

/** The named form on a page, or an error naming the page the chain broke on. */
export const requireFormByName = (
  page: HttpResponse,
  name: string,
): HtmlForm => {
  const form = selectFormByName(page.text, name, page.url)
  if (!form)
    throw new Error(
      `SEPE: no ${name} form at ${page.url} (${String(page.status)})`,
    )
  return form
}
