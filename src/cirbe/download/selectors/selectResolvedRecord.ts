/** The first listed request whose report can be downloaded (`Resuelta` or `Descargada`). */
export const selectResolvedRecord = (
  records: readonly Readonly<Record<string, string>>[],
): Readonly<Record<string, string>> | undefined =>
  records.find((record) =>
    ['resuelta', 'descargada'].includes((record['ESTADO'] ?? '').toLowerCase()),
  )
