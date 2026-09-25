/** Every `CERTIFICATE` block of a PEM bundle, as DER, in file order. */
export const readPemCertificates = (pem: Buffer): readonly Buffer[] => {
  const blocks = pem
    .toString('latin1')
    .matchAll(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/g)
  return [...blocks].map((block) =>
    Buffer.from(block.slice(1).join('').replaceAll(/\s+/g, ''), 'base64'),
  )
}
