import type { X509Certificate } from 'node:crypto'

/** The certificate serial number in decimal, as ds:X509SerialNumber wants it. */
export const decimalSerialNumber = (certificate: X509Certificate): string =>
  BigInt(`0x${certificate.serialNumber}`).toString(10)
