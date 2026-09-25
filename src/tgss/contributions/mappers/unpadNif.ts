/** The portal pads a NIF to ten characters with zeros; the holder writes its nine. */
export const unpadNif = (value: string): string => {
  let nif = value
  while (nif.length > 9 && nif.startsWith('0')) nif = nif.slice(1)
  return nif
}
