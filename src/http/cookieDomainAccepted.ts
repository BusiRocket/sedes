/**
 * Whether a cookie's `Domain` attribute may be honoured for the host that set
 * it: the domain must be the host or one of its parents, and never a public
 * suffix, so a response cannot scope a cookie to every `gob.es` host.
 */
export const cookieDomainAccepted = (host: string, domain: string): boolean => {
  const publicSuffixes = [
    'es',
    'gob.es',
    'com.es',
    'org.es',
    'nom.es',
    'edu.es',
  ]
  if (!domain.includes('.') || publicSuffixes.includes(domain)) return false
  return host === domain || host.endsWith(`.${domain}`)
}
