import { cookieDomainAccepted } from './cookieDomainAccepted'

/**
 * Where a cookie set by `host` is kept: the host itself without a `Domain`
 * attribute, the named domain when `cookieDomainAccepted` allows it, and
 * nowhere (undefined) otherwise.
 */
export const cookieScope = (
  host: string,
  attributes: readonly string[],
): string | undefined => {
  const domain = attributes
    .map((attribute) => attribute.trim())
    .find((attribute) => attribute.toLowerCase().startsWith('domain='))
    ?.slice('domain='.length)
    .replace(/^\./, '')
    .toLowerCase()
  if (domain === undefined || domain === '') return host
  return cookieDomainAccepted(host, domain) ? domain : undefined
}
