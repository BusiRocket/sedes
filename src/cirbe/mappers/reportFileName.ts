/** `cirbe-<tipo>-<referencia>.pdf`, with the tipo slugged (`informe-detallado`). */
export const reportFileName = (tipo: string, referencia: string): string => {
  const slug = (value: string): string =>
    value
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, '-')
      .replaceAll(/^-|-$/g, '')
  return `cirbe-${slug(tipo)}-${slug(referencia) || 'sin-referencia'}.pdf`
}
