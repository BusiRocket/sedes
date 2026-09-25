/** The `fIslw` hidden value of the request form; absent when the certificate did not authenticate. */
export const parseIslwToken = (html: string): string | undefined =>
  /name=['"]fIslw['"]\s+value=['"]([^'"]*)['"]/.exec(html)?.[1]
