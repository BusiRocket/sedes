import { unescapeHtml } from './unescapeHtml'

/** Strip scripts, styles and tags, decode entities and collapse whitespace. */
export const htmlToText = (html: string): string =>
  unescapeHtml(
    html
      .replaceAll(/<script[\s\S]*?<\/script>/gi, ' ')
      .replaceAll(/<style[\s\S]*?<\/style>/gi, ' ')
      .replaceAll(/<[^>]+>/g, ' '),
  )
    .replaceAll(/\s+/g, ' ')
    .trim()
