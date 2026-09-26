import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { selectImageButtonForm } from '../selectors/selectImageButtonForm'

/**
 * Click an image button of a JSF page: post its form, with `filters` over its
 * fields (select values the form parser does not read), and the button's
 * click coordinates.
 */
export const submitImageButton = async (
  client: HttpClient,
  page: HttpResponse,
  image: string,
  filters: Readonly<Record<string, string>> = {},
): Promise<HttpResponse> => {
  const target = selectImageButtonForm(page.text, page.url, image)
  if (!target) throw new Error(`Junta: no ${image} button at ${page.url}`)
  return client.request(target.form.action, {
    method: 'POST',
    form: {
      ...target.form.fields,
      ...filters,
      [`${target.button}.x`]: '10',
      [`${target.button}.y`]: '10',
    },
    referer: page.url,
  })
}
