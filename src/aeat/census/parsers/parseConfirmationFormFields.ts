import { readAttribute } from '../../../html/readAttribute'
import type { FormFieldPair } from '../types/FormFieldPair'

/**
 * Every `hidden` and `text` input of `<form id='Form'>`, in document order.
 * AEAT answers "datos inconsistentes" unless the signed body repeats all of
 * them, so nothing is filtered here.
 */
export const parseConfirmationFormFields = (
  html: string,
): readonly FormFieldPair[] => {
  const form = /<form[^>]*\sid=['"]Form['"][\s\S]*?<\/form>/i.exec(html)?.[0]
  if (!form) throw new Error("AEAT: no <form id='Form'> in the response")
  const pairs: FormFieldPair[] = []
  for (const [tag] of form.matchAll(/<input[^>]*>/gi)) {
    const type = readAttribute(tag, 'type')?.toLowerCase()
    const name = readAttribute(tag, 'name')
    if (!name || (type !== 'hidden' && type !== 'text')) continue
    pairs.push([name, readAttribute(tag, 'value') ?? ''])
  }
  return pairs
}
