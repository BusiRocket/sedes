/** The `pUV` hex token a SRVO-JDIT page's handlers set before submitting to the next step. */
export const parsePuvToken = (html: string): string | undefined =>
  /jQuery\('#pUV'\)\.val\('([0-9A-F]+)'\)/i.exec(html)?.[1]
