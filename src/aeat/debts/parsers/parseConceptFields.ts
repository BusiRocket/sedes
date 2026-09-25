import type { ConceptFields } from '../types/ConceptFields'

/**
 * Pull year, tax form and period out of a concepto such as
 * "0A   2025 100 TT-IRPF - DEC.OR EJER:2025 PER:ANUAL".
 */
export const parseConceptFields = (concepto: string): ConceptFields => {
  const yearAndModelo = /^\s*\S+\s+(\d{4})\s+(\d{3})\b/.exec(concepto)
  const ejercicio = /EJER:(\d{4})/.exec(concepto)?.[1] ?? yearAndModelo?.[1]
  const periodo = /PER:(\w+)/.exec(concepto)?.[1]
  if (!yearAndModelo?.[2] && /INTERESES/i.test(concepto))
    return { ejercicio, modelo: 'INT', periodo: periodo ?? 'ANUAL' }
  return { ejercicio, modelo: yearAndModelo?.[2], periodo }
}
