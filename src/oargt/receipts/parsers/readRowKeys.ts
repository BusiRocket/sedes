import { readStringField } from './readStringField'

/**
 * The `dboid` of each raw `dataset_DEUDAPENDIENTE` row, in row order, which
 * is the key the page's tooltip passes to `CALCULAR_IMP`. Rows that are not
 * objects get an empty key, mirroring how `parseReceiptRows` drops them.
 */
export const readRowKeys = (rows: readonly unknown[]): readonly string[] =>
  rows.flatMap((row): readonly string[] => {
    if (typeof row !== 'object' || row === null || Array.isArray(row)) return []
    return [readStringField(row as Readonly<Record<string, unknown>>, 'dboid')]
  })
