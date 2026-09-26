/** The private page `pageCode` of the STA sede at `origin`. */
export const staPageUrl = (origin: string, pageCode: string): string =>
  `${origin}/sta/CarpetaPrivate/doEvent?APP_CODE=STA&PAGE_CODE=${pageCode}`
