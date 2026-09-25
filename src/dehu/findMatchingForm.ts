/** The first `<form>...</form>` block on a page whose raw markup satisfies `isMatch`. */
export const findMatchingForm = (
  html: string,
  isMatch: (formBlock: string) => boolean,
): string | undefined => {
  const forms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/gi)].map(
    (match) => match[0],
  )
  return forms.find(isMatch)
}
