/** A JSON key for a grid column title; unknown titles become lower camel case. */
export const gridColumnKey = (title: string): string => {
  const known: Readonly<Record<string, string>> = {
    'Nº. carta de pago': 'paymentLetter',
    'Nº. carta pago': 'paymentLetter',
    'Nº. liquidación': 'settlement',
    Estado: 'status',
    Concepto: 'concept',
    Importe: 'amount',
    'Fecha devengo': 'accruedOn',
    'Fecha ingreso': 'paidOn',
    'Ejerc.': 'year',
    Documento: 'document',
    'Centro gestor': 'managingCentre',
    'F. contable': 'bookedOn',
    'Imp. bruto': 'grossAmount',
    'Imp. líquido': 'netAmount',
    'F. prev. pago': 'expectedPaymentOn',
    'F. pago': 'paidOn',
    Descripción: 'description',
    Código: 'code',
    Nombre: 'name',
    'Tipo incidencia': 'incidentType',
    'Imp. pendiente': 'pendingAmount',
  }
  const key = known[title]
  if (key) return key
  const words = title
    .normalize('NFD')
    .replaceAll(/[^\w\s]/g, '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  return words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('')
}
