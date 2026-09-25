/**
 * A Node X509Certificate `subject`/`issuer` (one RDN per line, least specific
 * first, values already RFC 2253-escaped) as an RFC 2253 string, most
 * specific first and no spaces after commas: `CN=AC FNMT Usuarios,OU=Ceres,
 * O=FNMT-RCM,C=ES`, the form Java's `getName()` (so AutoFirma) writes.
 */
export const formatDistinguishedName = (lines: string): string =>
  lines.split('\n').filter(Boolean).toReversed().join(',')
