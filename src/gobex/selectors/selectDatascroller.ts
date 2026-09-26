import type { Datascroller } from '../types/Datascroller'

/** The RichFaces datascroller that pages the grid of form `formId`, when that grid has more than one page. */
export const selectDatascroller = (
  html: string,
  formId: string,
): Datascroller | undefined => {
  for (const match of html.matchAll(
    /new Richfaces\.Datascroller\('([^']+)', function\(event\)\{A4J\.AJAX\.Submit\('([^']+)'/g,
  )) {
    const [, scrollerId, submitForm] = match
    if (scrollerId && submitForm === formId)
      return { scrollerId, formId: submitForm }
  }
  return undefined
}
