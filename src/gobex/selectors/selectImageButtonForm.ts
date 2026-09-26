import { parseForms } from '../../html/parsers/parseForms'
import { readAttribute } from '../../html/readAttribute'
import type { ImageButtonForm } from '../types/ImageButtonForm'

/**
 * The form holding the image button whose `src` contains `image` (JSF names
 * change from page to page; the button images do not). Every other button
 * (image, submit, plain button) is dropped from the fields, since JSF reads a
 * posted one as a click: some pages carry "Emitir certificado" buttons.
 */
export const selectImageButtonForm = (
  html: string,
  baseUrl: string,
  image: string,
): ImageButtonForm | undefined => {
  for (const [block] of html.matchAll(/<form\b[\s\S]*?<\/form>/gi)) {
    const buttons = [...block.matchAll(/<input\b[^>]*>/gi)]
      .map(([tag]) => tag)
      .filter((tag) =>
        ['image', 'submit', 'button', 'reset'].includes(
          readAttribute(tag, 'type')?.toLowerCase() ?? '',
        ),
      )
    const button = buttons.find((tag) =>
      (readAttribute(tag, 'src') ?? '').includes(image),
    )
    const name = button ? readAttribute(button, 'name') : undefined
    const form = parseForms(block, baseUrl)[0]
    if (!name || !form) continue
    const buttonNames = new Set(
      buttons.map((tag) => readAttribute(tag, 'name')),
    )
    const fields = Object.fromEntries(
      Object.entries(form.fields).filter(([key]) => !buttonNames.has(key)),
    )
    return { form: { action: form.action, fields }, button: name }
  }
  return undefined
}
