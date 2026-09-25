/** The charset a `Content-Type` header declares, or undefined. */
export const readCharset = (
  contentType: string | undefined,
): string | undefined => /charset=["']?([\w-]+)/i.exec(contentType ?? '')?.[1]
