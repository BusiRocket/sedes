/** The bearer JWT DEHU's login-check hands back as the `authData` query parameter of a URL. */
export const readAuthData = (
  location: string,
  base: string,
): string | undefined =>
  new URL(location, base).searchParams.get('authData') ?? undefined
