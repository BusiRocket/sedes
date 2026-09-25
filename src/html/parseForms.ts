import type { HtmlForm } from './HtmlForm'
import { readAttribute } from './readAttribute'
import { unescapeHtml } from './unescapeHtml'

/**
 * Every `<form>` on a page, in document order, with its `<input>` fields. The
 * action is resolved against `baseUrl`; a form without one posts back to it.
 */
export const parseForms = (html: string, baseUrl: string): HtmlForm[] =>
  [...html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)].map((match) => {
    const [, formTag = '', inner = ''] = match
    const rawAction = readAttribute(`<form ${formTag}>`, 'action') ?? ''
    const fields: Record<string, string> = {}
    for (const [input] of inner.matchAll(/<input\b[^>]*>/gi)) {
      const name = readAttribute(input, 'name')
      if (name) fields[name] = unescapeHtml(readAttribute(input, 'value') ?? '')
    }
    return {
      action: new URL(unescapeHtml(rawAction), baseUrl).toString(),
      fields,
    }
  })
