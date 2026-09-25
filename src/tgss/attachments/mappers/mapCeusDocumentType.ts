/** The label CEUS shows for each `#tipoDocumentoOpcional` code. */
export const mapCeusDocumentType = (code: string): string => {
  const labels: Readonly<Record<string, string>> = {
    '1006': 'Comunicación',
    '1010': 'Justificante',
    '1008': 'Otros',
  }
  const label = labels[code]
  if (label === undefined)
    throw new Error(`unknown CEUS document type: ${code}`)
  return label
}
