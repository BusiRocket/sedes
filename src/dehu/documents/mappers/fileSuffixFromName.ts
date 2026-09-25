/**
 * The extension of the portal's file name when it is a plausible one (four
 * characters or fewer), otherwise `pdf`, which is what the documents are.
 */
export const fileSuffixFromName = (name: string | undefined): string => {
  const maxSuffixLength = 4
  const suffix = (name ?? '').split('.').pop()?.toLowerCase() ?? ''
  return suffix !== '' &&
    suffix.length <= maxSuffixLength &&
    !suffix.includes('/')
    ? suffix
    : 'pdf'
}
